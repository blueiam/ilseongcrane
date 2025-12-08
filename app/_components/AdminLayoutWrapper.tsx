'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  // 어드민 페이지 확인
  const isAdminPage = pathname && typeof pathname === 'string' && pathname.startsWith('/admin')
  
  // [추가] 랜딩 페이지인지 확인
  const isLandingPage = pathname === '/'

  if (isAdminPage) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {/* [수정] 랜딩 페이지가 아닐 때만 상단 여백 적용 */}
      {/* Header가 h-20(80px)이라면 pt-20이 정확하지만, 기존 pt-16을 유지하거나 필요시 pt-20으로 변경하세요 */}
      <div className={isLandingPage ? '' : 'pt-20'}>
        {children}
      </div>
      <Footer />
    </>
  )
}