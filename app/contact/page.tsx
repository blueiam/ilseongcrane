// web/app/contact/page.tsx
'use client'

import { useRef, useState } from 'react'
import { PageShell } from '@/app/_components/PageShell'
import ReCAPTCHA from 'react-google-recaptcha'

type Category = 'equipment' | 'wind'

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!

export default function ContactPage() {
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState<Category>('equipment')

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('담당자명, 이메일, 문의 내용을 입력해주세요.')
      return
    }

    if (!recaptchaToken) {
      setError('스팸 방지를 위해 reCAPTCHA 인증을 완료해주세요.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: company.trim() || null,
          name: name.trim(),
          phone: phone.trim() || null,
          email: email.trim(),
          message: message.trim(),
          category,
          recaptchaToken, // ✅ 서버로 토큰 전송
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(
          data?.error ||
            '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        )
      } else {
        setSuccess(
          '문의가 정상적으로 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.'
        )
        setCompany('')
        setName('')
        setPhone('')
        setEmail('')
        setMessage('')
        setCategory('equipment')
        setRecaptchaToken(null)
        // reCAPTCHA 체크박스 리셋
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
      }
    } catch (err) {
      console.error(err)
      setError('서버와 통신 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell
      title="견적 / 문의"
      subtitle="장비 및 풍력 관련 문의를 남겨주시면 담당자가 확인 후 연락드립니다."
    >
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* 문의 유형 선택 */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              문의 유형 *
            </label>
            <div className="flex gap-4 text-xs">
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="category"
                  value="equipment"
                  checked={category === 'equipment'}
                  onChange={() => setCategory('equipment')}
                  className="h-3 w-3 text-blue-600 focus:ring-blue-500"
                />
                <span>장비 문의</span>
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="category"
                  value="wind"
                  checked={category === 'wind'}
                  onChange={() => setCategory('wind')}
                  className="h-3 w-3 text-blue-600 focus:ring-blue-500"
                />
                <span>풍력 문의</span>
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              회사명
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 일성크레인(주)"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              담당자명 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 홍길동"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              연락처
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 010-1234-5678"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              이메일 *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: contact@ilseong-crane.com"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              문의 내용 *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="장비명, 현장 위치, 일정 등 문의 내용을 자세히 적어주세요."
              required
            />
          </div>

          {/* reCAPTCHA 영역 */}
          <div className="pt-2">
            {RECAPTCHA_SITE_KEY ? (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => {
                  setRecaptchaToken(token)
                  setError(null)
                }}
              />
            ) : (
              <p className="text-[11px] text-red-500">
                reCAPTCHA Site Key가 설정되지 않았습니다. NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                환경변수를 확인해주세요.
              </p>
            )}
          </div>

          <p className="text-[11px] text-gray-500">
            ※ 개인정보는 문의 응답을 위해서만 사용되며, 목적 달성 후 지체 없이
            파기됩니다.
          </p>

          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}
          {success && (
            <p className="text-xs text-green-600">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !RECAPTCHA_SITE_KEY}
            className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? '전송 중...' : '문의 보내기'}
          </button>
        </form>
      </div>
    </PageShell>
  )
}
