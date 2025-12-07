// web/app/admin/layout.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { ArrowLeftIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  const isLoginPage = pathname === '/admin/login'
  const isDashboardPage = pathname === '/admin'

  const handleLogout = async () => {
    if (loggingOut) return
    
    setLoggingOut(true)
    try {
      await supabase.auth.signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('로그아웃 오류:', error)
      alert('로그아웃 중 오류가 발생했습니다.')
    } finally {
      setLoggingOut(false)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // 로그인 안 했고, 로그인 페이지가 아니면 → 로그인 페이지로
      if (!user && !isLoginPage) {
        router.replace('/admin/login')
        setChecking(false)
        return
      }

      // 이미 로그인 했는데 /admin/login 이면 → 대시보드로
      if (user && isLoginPage) {
        router.replace('/admin')
        setChecking(false)
        return
      }

      setChecking(false)
    }

    checkAuth()
  }, [isLoginPage, pathname, router])

  // 로그인 페이지는 바로 렌더 (체크는 백그라운드에서)
  if (isLoginPage) {
    return <>{children}</>
  }

  // 다른 /admin/* 페이지들은 인증 결과 나올 때까지 로딩 표시
  if (checking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-gray-400 bg-[#1a1a1a]">
        관리자 인증 확인 중입니다...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* 관리자 상단 네비게이션 바 */}
      <div className="bg-[#222] border-b border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 좌측: 관리자 대시보드로 돌아가기 버튼 (대시보드 페이지 제외) */}
          {!isDashboardPage && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              관리자 대시보드로 돌아가기
            </Link>
          )}
          {isDashboardPage && <div></div>}
          
          {/* 우측: 로그아웃 버튼 */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            {loggingOut ? '로그아웃 중...' : '로그아웃'}
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}
