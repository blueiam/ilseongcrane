'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type NavItem = {
  label: string
  href?: string
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: '회사소개',
    href: '/company/about',
    children: [
      { label: '회사소개(인사말·개요)', href: '/company/about' },
      { label: '회사연혁', href: '/company/history' },
      { label: '회사개요', href: '/company/overview' },
      { label: '네트워크', href: '/company/network' },
      { label: '오시는길', href: '/company/location' },
    ],
  },
  {
    label: '사업영역',
    href: '/business/areas',
    children: [
      { label: '사업영역', href: '/business/areas' },
      { label: '주요실적', href: '/business/projects' },
      { label: '연도별 실적', href: '/business/projects/yearly' },
    ],
  },
  {
    label: '장비',
    href: '/equipment',
    children: [
      { label: '보유장비', href: '/equipment' },
      { label: '운영장비', href: '/equipment/operation' },
      { label: '기타 도구/부자재', href: '/equipment/tools' },
      { label: '장비운송/조립·해체', href: '/equipment/transport-assembly' },
      { label: '법정검사/보수유지', href: '/equipment/maintenance' },
    ],
  },
  {
    label: '지속가능경영',
    href: '/sustainability/qshe',
    children: [
      { label: 'QSHE 경영', href: '/sustainability/qshe' },
      { label: '윤리경영', href: '/sustainability/ethics' },
      { label: '인사·교육·채용', href: '/sustainability/hr' },
      { label: '위기비상경영', href: '/sustainability/emergency' },
      { label: '등록/면허/인증', href: '/sustainability/certifications' },
    ],
  },
  {
    label: '정보자료실',
    href: '/archive/notice',
    children: [
      { label: '공지/뉴스', href: '/archive/notice' },
      { label: '일반자료실', href: '/archive/data' },
      { label: '기술자료실', href: '/archive/tech' },
      { label: '문서자료실', href: '/archive/docs' },
      { label: '인사자료실', href: '/archive/hr' },
      { label: '관련법규', href: '/archive/law' },
    ],
  },
  {
    label: '견적/문의',
    href: '/contact',
  },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors ${
        isScrolled ? 'bg-white/95 shadow-sm backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-600" />
          <span className="text-sm font-bold tracking-tight sm:text-base">
            ILSEONG CRANE
          </span>
        </Link>

        {/* PC GNB */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-800 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href || '')

            if (item.children && item.children.length > 0) {
              return (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href || '#'}
                    className={`inline-flex items-center gap-1 border-b-2 pb-1 transition-colors ${
                      isActive
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {/* Depth2 */}
                  <div className="invisible absolute left-0 mt-2 w-52 translate-y-2 rounded-xl bg-white p-2 text-xs text-gray-700 opacity-0 shadow-lg ring-1 ring-black/5 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block rounded-md px-3 py-2 hover:bg-gray-50 ${
                          pathname === child.href
                            ? 'bg-blue-50 text-blue-700'
                            : ''
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href || '#'}
                className={`border-b-2 pb-1 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="inline-flex items-center rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? '닫기' : '메뉴'}
        </button>
      </div>

      {/* 모바일 메뉴 영역 */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-3 text-sm">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href || '#'}
                    className="block font-semibold text-gray-900"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-1 flex flex-col gap-1 pl-3 text-xs text-gray-700">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`rounded px-2 py-1 ${
                            pathname === child.href
                              ? 'bg-blue-50 text-blue-700'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
