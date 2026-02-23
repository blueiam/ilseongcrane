// web/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'no-reply@ilseongcrane.com' // Resend에서 인증한 발신 주소
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY

const TO_EMAIL_BY_CATEGORY: Record<'equipment' | 'wind', string> = {
  equipment: 'ilseongcrane@ilseongcrane.com',
  wind: 'windpower@ilseongcrane.com',
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      company,
      name,
      phone,
      email,
      message,
      category,
      recaptchaToken,
    }: {
      company?: string
      name: string
      phone?: string
      email: string
      message: string
      category: 'equipment' | 'wind'
      recaptchaToken?: string
    } = body

    if (!name || !email || !message || !category) {
      return NextResponse.json(
        { error: '필수 값이 누락되었습니다.' },
        { status: 400 }
      )
    }

    // ✅ 1) reCAPTCHA 토큰 검증
    if (!RECAPTCHA_SECRET_KEY) {
      console.error('RECAPTCHA_SECRET_KEY is not set')
      return NextResponse.json(
        { error: '서버 reCAPTCHA 설정이 누락되었습니다.' },
        { status: 500 }
      )
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA 토큰이 없습니다.' },
        { status: 400 }
      )
    }

    const verifyRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: `secret=${encodeURIComponent(
          RECAPTCHA_SECRET_KEY
        )}&response=${encodeURIComponent(recaptchaToken)}`,
      }
    )

    const verifyData = await verifyRes.json()

    if (!verifyData.success) {
      console.error('reCAPTCHA verify failed:', verifyData)
      return NextResponse.json(
        { error: '스팸 방지 검증(reCAPTCHA)에 실패했습니다.' },
        { status: 400 }
      )
    }

    // ✅ 2) Supabase contacts 테이블에 저장
    const { error: dbError } = await supabase.from('contacts').insert([
      {
        company: company || null,
        name,
        phone: phone || null,
        email,
        message,
        category,
        status: 'new',
      },
    ])

    if (dbError) {
      console.error('DB insert error:', dbError)
      return NextResponse.json(
        { error: '문의 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    // ✅ 3) 이메일 발송 (선택적 - 실패해도 문의는 이미 저장됨)
    if (process.env.RESEND_API_KEY) {
      const to = TO_EMAIL_BY_CATEGORY[category] ?? TO_EMAIL_BY_CATEGORY.equipment
      const subjectPrefix = category === 'equipment' ? '[장비 문의]' : '[풍력 문의]'
      const subject = `${subjectPrefix} ${company || name} 문의`

      const text = `
문의 유형: ${category === 'equipment' ? '장비' : '풍력'}
회사명: ${company || '-'}
담당자: ${name}
연락처: ${phone || '-'}
이메일: ${email}

문의 내용:
${message}
      `.trim()

      const { error: mailError } = await resend.emails.send({
        from: `ILSEONG CRANE <${FROM_EMAIL}>`,
        to,
        subject,
        text,
      })

      if (mailError) {
        // 문의는 저장됨. 이메일 실패 시에도 사용자에게 성공 반환.
        // Resend 도메인(ilseongcrane.com) 인증 필요. 로그로만 기록.
        console.error('[contact] Resend 이메일 발송 실패 (문의는 저장됨):', mailError)
        // fallback: 관리자는 Supabase contacts 테이블에서 확인 가능
      }
    } else {
      console.warn('[contact] RESEND_API_KEY 미설정 - 이메일 발송 생략')
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('API /contact error:', err)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
