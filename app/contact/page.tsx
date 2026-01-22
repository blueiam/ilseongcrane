// web/app/contact/page.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
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
  const [imageZoomed, setImageZoomed] = useState(false)

  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageZoomed(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

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
    <>
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[450px] lg:h-[500px] w-full overflow-hidden z-30">
        {/* Background Image */}
        <Image
          src="/hero/contact.jpeg"
          alt="Contact Us"
          fill
          className={`object-cover object-center transition-transform duration-[10000ms] ease-out ${
            imageZoomed ? 'scale-100' : 'scale-125'
          }`}
          priority
          quality={100}
        />

        {/* Title Content */}
        <div className="relative flex h-full items-center justify-center z-20">
          <h1
            className="text-5xl md:text-6xl font-bold text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            style={{ color: '#FFFFFF', textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            견적 / 문의
          </h1>
        </div>
      </div>

    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* 배경 패턴 (은은한 그리드) */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
        {/* 헤더 영역 */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest mb-4 uppercase">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">
            견적 / 문의
          </h1>
          <p className="text-slate-800 text-lg max-w-2xl mx-auto font-light">
            장비 및 풍력 관련 문의를 남겨주시면 담당자가 확인 후 연락드립니다.
          </p>
        </div>

        {/* 폼 영역 */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 문의 유형 선택 */}
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  문의 유형 <span className="text-blue-600">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value="equipment"
                      checked={category === 'equipment'}
                      onChange={() => setCategory('equipment')}
                      className="h-4 w-4 text-blue-600 bg-white border-slate-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-slate-700 group-hover:text-blue-600 transition-colors">장비 문의</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value="wind"
                      checked={category === 'wind'}
                      onChange={() => setCategory('wind')}
                      className="h-4 w-4 text-blue-600 bg-white border-slate-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-slate-700 group-hover:text-blue-600 transition-colors">풍력 문의</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  회사명
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-lg border-2 border-slate-400 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-600 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  placeholder="예: 일성크레인(주)"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  담당자명 <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border-2 border-slate-400 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-600 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  placeholder="예: 홍길동"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  연락처
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border-2 border-slate-400 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-600 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  placeholder="예: 010-1234-5678"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  이메일 <span className="text-blue-600">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border-2 border-slate-400 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-600 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  placeholder="예: contact@ilseongcrane.com"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  문의 내용 <span className="text-blue-600">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full rounded-lg border-2 border-slate-400 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-600 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all resize-none"
                  placeholder="장비명, 현장 위치, 일정 등 문의 내용을 자세히 적어주세요."
                  required
                />
              </div>

              {/* reCAPTCHA 영역 */}
              <div className="pt-2">
                {RECAPTCHA_SITE_KEY ? (
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={(token) => {
                        setRecaptchaToken(token)
                        setError(null)
                      }}
                      theme="light"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                    reCAPTCHA Site Key가 설정되지 않았습니다. NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                    환경변수를 확인해주세요.
                  </p>
                )}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                ※ 개인정보는 문의 응답을 위해서만 사용되며, 목적 달성 후 지체 없이
                파기됩니다.
              </p>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}
              {success && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm text-green-600 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {success}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !RECAPTCHA_SITE_KEY}
                className="mt-4 w-full rounded-lg border-2 border-blue-600 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-sm font-bold text-white hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    전송 중...
                  </span>
                ) : (
                  '문의 보내기'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
