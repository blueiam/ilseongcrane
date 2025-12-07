'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  // 어드민 페이지인지 확인 (pathname이 있고 /admin으로 시작하는 경우만)
  const isAdminPage = pathname && typeof pathname === 'string' && pathname.startsWith('/admin')

  // 어드민 페이지일 때는 Header와 Footer 없이 children만 표시
  if (isAdminPage) {
    return <>{children}</>
  }

  // 어드민 페이지가 아닐 때는 Header와 Footer 표시 (기본값)
  return (
    <>
      {/* 헤더 고정 */}
      <Header />
      {/* 헤더 높이만큼 여백 주기 */}
      <div className="pt-16">
        {children}
      </div>
      <Footer />
    </>
  )
}

