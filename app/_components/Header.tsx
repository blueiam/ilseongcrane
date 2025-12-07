// web/app/_components/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
// import { cn } from '@/lib/utils' // 필요 시 사용

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
      { label: '인사말 / 회사개요', href: '/company/about' },
      { label: '비전 /기업이념/CI', href: '/company/overview' },
      { label: '회사연혁/조직도', href: '/company/history' },
      { label: '네트워크', href: '/company/network' },
      { label: '찾아오시는 길', href: '/company/location' },
    ],
  },
  {
    label: '사업',
    href: '/business/areas',
    children: [
      { label: '사업영역', href: '/business/areas' },
      { label: '사업실적', href: '/business/projects' },
      { label: '주요 고객', href: '/business/projects/yearly' },
    ],
  },
  {
    label: '장비',
    href: '/equipment',
    children: [
      { label: '보유장비', href: '/equipment' },
      { label: '운영장비', href: '/equipment/operation' },
      { label: '기타 도구/부자재', href: '/equipment/tools' },
      { label: '운송/조립해체', href: '/equipment/transport-assembly' },
      { label: '검사/유지관리', href: '/equipment/maintenance' },
    ],
  },
  {
    label: '지속가능경영',
    href: '/sustainability/qshe',
    children: [
      { label: 'QSHE 경영', href: '/sustainability/qshe' },
      { label: '윤리경영', href: '/sustainability/ethics' },
      { label: '인사교육채용', href: '/sustainability/hr' },
      { label: '위기비상경영', href: '/sustainability/emergency' },
      { label: '등록/면허/인증', href: '/sustainability/certifications' },
    ],
  },
  {
    label: '정보자료실',
    href: '/archive/notice',
    children: [
      { label: '공지/소식', href: '/archive/notice' },
      { label: '일반자료실', href: '/archive/data' },
      { label: '기술자료실', href: '/archive/tech' },
      { label: '문서자료실', href: '/archive/docs' },
      { label: '인사자료실', href: '/archive/hr' },
      { label: '관련법규', href: '/archive/law' },
    ],
  },
  {
    label: '견적문의',
    href: '/contact',
    children: [{ label: '문의하기', href: '/contact' }],
  },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setIsMenuOpen(false)
  }, [pathname])

  const isLinkActive = (href?: string) => {
    if (!href) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Grid 설정값 (메뉴 개수에 맞춰 6칸 설정)
  // w-[840px]는 메뉴 전체가 차지할 너비입니다. 화면 크기에 맞춰 조정 가능합니다.
  const GRID_CLASS = "grid grid-cols-6 gap-2 w-[840px]"

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-white/95 shadow-md backdrop-blur border-b border-gray-200'
          : 'bg-white border-b border-transparent'
      }`}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      {/* GNB Main Bar */}
      <div 
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 font-sans"
        onMouseEnter={() => setIsMenuOpen(true)}
      >
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/Header/logo.svg"
            alt="일성크레인 주식회사"
            className="h-11 w-auto"
          />
        </Link>

        {/* PC GNB (Grid Layout 적용) */}
        {/* ml-auto를 주어 로고와 떨어뜨리고 우측에 붙입니다 */}
        <nav className={`hidden lg:grid ${GRID_CLASS} ml-auto text-base font-bold text-black`}>
          {navItems.map((item) => {
            const active = isLinkActive(item.href)
            return (
              <div key={item.label} className="text-center"> {/* text-center 필수 */}
                <Link
                  href={item.href || '#'}
                  className={`relative inline-block border-b-2 pb-1 transition-colors ${
                    active
                      ? 'border-b-[#003978] text-[#003978]'
                      : 'border-transparent hover:border-b-[#003978] hover:text-[#003978]'
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            )
          })}
        </nav>

        {/* 모바일 메뉴 버튼 */}
{/* 모바일 메뉴 버튼 (텍스트 -> 아이콘 변경) */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 focus:outline-none lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" /> // 닫기 아이콘
          ) : (
            <Menu className="h-6 w-6" /> // 햄버거 아이콘
          )}
        </button>
      </div>

      {/* PC용 전체 메가 메뉴 (Dropdown) */}
      <div 
        className={`hidden lg:block absolute left-0 w-full border-t border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
        onMouseEnter={() => setIsMenuOpen(true)}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {/* 정렬 핵심: 상단 Nav와 동일한 너비와 Grid 구조를 가짐 */}
            <div className={`flex justify-end`}> {/* 우측 정렬을 위한 Flex Wrapper */}
                
                {/* 상단 nav와 똑같은 GRID_CLASS 적용 */}
                <div className={`${GRID_CLASS}`}> 
                    {navItems.map((item) => (
                    <div key={item.label} className="flex flex-col text-center">
                        {/* Title 중복 제거됨 */}
                        
                        {/* 서브메뉴 리스트 */}
                        {item.children && (
                        <ul className="space-y-3 text-sm text-gray-500">
                            {item.children.map((child) => (
                            <li key={child.href}>
                                <Link
                                href={child.href}
                                className="block hover:text-[#003978] hover:font-bold transition-colors"
                                >
                                {child.label}
                                </Link>
                            </li>
                            ))}
                        </ul>
                        )}
                        {!item.children && <div>&nbsp;</div>}
                    </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* 모바일 메뉴 영역 (변동 없음) */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="mx-auto max-w-6xl pl-[80px] pr-4 py-3 text-sm font-noto">
            <div className="flex flex-col gap-6 pt-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href || '#'}
                    className="block text-lg font-bold text-black mb-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="flex flex-col gap-2 pl-2 text-gray-600">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`py-1 hover:text-[#003978] ${
                            pathname === child.href ? 'text-[#003978] font-medium' : ''
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          - {child.label}
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