// web/app/api/email-test/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ✅ 이 from 주소는 Resend에서 인증된 주소로 바꿔주세요!
const FROM_EMAIL = 'no-reply@ilseongcrane.com'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { to } = body as { to?: string }

    if (!to) {
      return NextResponse.json(
        { error: '수신 이메일 주소(to)가 없습니다.' },
        { status: 400 }
      )
    }

    const { error } = await resend.emails.send({
      from: `ILSEONG CRANE <${FROM_EMAIL}>`,
      to,
      subject: '[테스트] Resend 이메일 발송 테스트',
      text: '이 메일이 도착했다면 Resend 설정이 정상입니다.',
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Resend 발송 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('API /email-test error:', err)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
