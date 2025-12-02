// web/app/admin/email-test/page.tsx
'use client'

import { useState } from 'react'
import { PageShell } from '@/app/_components/PageShell'

export default function EmailTestPage() {
  const [to, setTo] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setResult(null)
    setError(null)

    if (!to.trim()) {
      setError('테스트로 받을 이메일 주소를 입력해주세요.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/email-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: to.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.error || '이메일 발송 중 오류가 발생했습니다.')
      } else {
        setResult(
          `테스트 메일을 ${to.trim()} 주소로 발송했습니다. 메일함(스팸함 포함)을 확인해주세요.`
        )
      }
    } catch (err) {
      console.error(err)
      setError('서버와 통신 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell
      title="관리자 - 이메일 발송 테스트"
      subtitle="Resend 설정이 정상인지 테스트 메일을 보내 확인합니다."
    >
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm text-sm">
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              수신 이메일 주소
            </label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: hongyohn@gmail.com"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}
          {result && (
            <p className="text-xs text-green-600">
              {result}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? '발송 중...' : '테스트 메일 보내기'}
          </button>
        </form>
      </div>
    </PageShell>
  )
}
