// web/app/admin/layout.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

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

  const isLoginPage = pathname === '/admin/login'

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
        router.replace('/admin/dashboard')
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
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-gray-600">
        관리자 인증 확인 중입니다...
      </div>
    )
  }

  return <>{children}</>
}
