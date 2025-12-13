// web/app/contact/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Mail, Send } from 'lucide-react'

type Category = 'equipment' | 'wind'

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!

// 스크롤 애니메이션 훅
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return { ref, isVisible };
}

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

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
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
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      {/* 배경 그리드 효과 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
        
        {/* 헤더 섹션 */}
        {(() => {
          const { ref, isVisible } = useScrollAnimation();
          return (
            <section ref={ref} className={`mb-16 text-center max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gray-300 mb-8">
                <Mail className="w-4 h-4 text-blue-400" />
                Contact Us
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                  견적 / 문의
                </span>
              </h1>
              
              <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                장비 및 풍력 관련 문의를 남겨주시면 담당자가 확인 후 연락드립니다.
              </p>
            </section>
          );
        })()}

        {/* 폼 섹션 */}
        {(() => {
          const { ref, isVisible } = useScrollAnimation();
          return (
            <div ref={ref} className={`max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm">

                {/* 폼 */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 문의 유형 선택 */}
                  <div>
                    <label className="mb-3 block text-sm font-bold text-gray-200 uppercase tracking-wider">
                      문의 유형 *
                    </label>
                    <div className="flex gap-6">
                      <label className="inline-flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value="equipment"
                          checked={category === 'equipment'}
                          onChange={() => setCategory('equipment')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-white/10 border-white/20"
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors">장비 문의</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value="wind"
                          checked={category === 'wind'}
                          onChange={() => setCategory('wind')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-white/10 border-white/20"
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors">풍력 문의</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-200 uppercase tracking-wider">
                      회사명
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="예: 일성크레인(주)"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-200 uppercase tracking-wider">
                      담당자명 *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="예: 홍길동"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-200 uppercase tracking-wider">
                      연락처
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="예: 010-1234-5678"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-200 uppercase tracking-wider">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="예: contact@ilseong-crane.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-200 uppercase tracking-wider">
                      문의 내용 *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      maxLength={2000}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                      placeholder="장비명, 현장 위치, 일정 등 문의 내용을 자세히 적어주세요."
                      required
                    />
                    <div className="mt-1 text-right text-xs text-gray-400">
                      {message.length} / 2000자
                    </div>
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
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-red-400">
                        reCAPTCHA Site Key가 설정되지 않았습니다. NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                        환경변수를 확인해주세요.
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    ※ 개인정보는 문의 응답을 위해서만 사용되며, 목적 달성 후 지체 없이
                    파기됩니다.
                  </p>

                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                      <p className="text-sm text-red-400">
                        {error}
                      </p>
                    </div>
                  )}
                  {success && (
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                      <p className="text-sm text-green-400">
                        {success}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || !RECAPTCHA_SITE_KEY}
                    className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-4 text-base font-bold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                  >
                    {submitting ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>전송 중...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>문의 보내기</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          );
        })()}
      </div>
    </main>
  )
}
