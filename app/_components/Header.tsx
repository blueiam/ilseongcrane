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
      { label: '회사연혁', href: '/company/history' },
      { label: '조직도', href: '/company/organization' },
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
      { label: 'QHSE 경영', href: '/sustainability/qshe' },
      { label: '윤리경영', href: '/sustainability/ethics' },
      { label: 'SGC경영', href: '/sustainability/hr' },
      { label: '비상경영', href: '/sustainability/emergency' },
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
  const isLandingPage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 10)
    }
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

  // [수정] 클래스 로직을 변수로 분리하여 가독성 확보
  // 모바일 스크롤 전: 투명, 스크롤 시: 반투명 (비디오가 보임)
  // 데스크톱(lg 이상): 스크롤 전 투명, 스크롤 시 반투명 glass 효과
  // 랜딩 페이지가 아닌 경우: 다크모드 적용
  const headerClass = isLandingPage
    ? isScrolled
      ? 'bg-white/40 backdrop-blur-md lg:bg-white/40 lg:backdrop-blur-xl shadow-md lg:shadow-2xl border-b border-white/30 lg:border-white/40' // 스크롤 시: 모바일/데스크톱 모두 반투명 glass 효과
      : 'bg-transparent lg:bg-transparent border-b-0 lg:border-b-0 shadow-none lg:shadow-none' // 스크롤 전: 모바일/데스크톱 모두 투명
    : isScrolled
      ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl border-b border-white/10'
      : 'bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/5'

  // 스크롤 전 landing page에서 완전히 투명하게 처리 (데스크톱만)
  const isAtTop = isLandingPage && !isScrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${headerClass} ${
        !isLandingPage && isScrolled ? 'shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''
      }`}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      {/* 다크모드 배경 그리드 효과 (랜딩 페이지가 아닐 때) */}
      {!isLandingPage && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-30"></div>
      )}
      {/* GNB Main Bar */}
      <div 
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 font-sans relative z-10"
        onMouseEnter={() => setIsMenuOpen(true)}
      >
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <img
            src="/Header/logo.svg"
            alt="일성크레인 주식회사"
            className={`h-11 w-auto transition-all duration-300 ${
              isLandingPage 
                ? isScrolled
                  ? 'brightness-0 invert lg:brightness-0 lg:invert' // 스크롤 시: 모바일/데스크톱 모두 흰색
                  : 'brightness-0 invert lg:brightness-0 lg:invert' // 스크롤 전: 모바일/데스크톱 모두 흰색
                : 'brightness-0 invert group-hover:scale-105'
            }`}
          />
        </Link>

        {/* PC GNB (Grid Layout 적용) */}
        {/* ml-auto를 주어 로고와 떨어뜨리고 우측에 붙입니다 */}
        <nav className={`hidden lg:grid ${GRID_CLASS} ml-auto text-base font-bold ${
          isLandingPage 
            ? isScrolled
              ? 'text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]' // 스크롤 시 가독성 향상을 위한 텍스트 그림자
              : 'text-white'
            : 'text-white'
        }`}>
          {navItems.map((item) => {
            const active = isLinkActive(item.href)
            return (
              <div key={item.label} className="text-center"> {/* text-center 필수 */}
                <Link
                  href={item.href || '#'}
                  className={`relative inline-block border-b-2 pb-1 transition-all duration-300 ${
                    isLandingPage
                      ? active
                        ? isScrolled
                          ? 'border-b-white text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]'
                          : 'border-b-white text-white'
                        : isScrolled
                          ? 'border-transparent hover:border-b-white/80 hover:text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]'
                          : 'border-transparent hover:border-b-white/80 hover:text-white/90'
                      : active
                        ? 'border-b-blue-500 text-blue-400 font-bold hover:text-blue-300'
                        : 'border-transparent text-gray-300 hover:border-b-blue-500/50 hover:text-white hover:scale-105'
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
          className={`inline-flex items-center justify-center rounded-md p-2 focus:outline-none lg:hidden transition-all duration-300 ${
            isLandingPage 
              ? isScrolled
                ? 'text-white hover:bg-white/20 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]' // 스크롤 시: 반투명 배경이므로 흰색 텍스트 + 그림자
                : 'text-white hover:bg-white/10' // 스크롤 전: 투명 배경이므로 흰색 텍스트
              : 'text-white hover:bg-white/10 hover:scale-110 active:scale-95'
          }`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 transition-transform duration-300 rotate-90" /> // 닫기 아이콘
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300" /> // 햄버거 아이콘
          )}
        </button>
      </div>

      {/* PC용 전체 메가 메뉴 (Dropdown) */}
      <div 
        // [수정] 메가 메뉴의 배경색 처리
        className={`hidden lg:block absolute left-0 w-full border-t overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100 visible translate-y-0' : 'max-h-0 opacity-0 invisible -translate-y-2'
        } ${
          // 랜딩페이지이면서 메뉴가 열렸을 때만 배경색 적용 (데스크톱 전용)
          isLandingPage
             ? isMenuOpen
               ? isScrolled
                 ? 'bg-black/80 backdrop-blur-xl border-white/30 text-white shadow-2xl' // 스크롤 시: 검정색 계열
                 : 'bg-white/70 backdrop-blur-xl border-white/50 text-white shadow-2xl' // 스크롤 전: 흰색 계열
               : 'bg-transparent border-transparent'
             : 'bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10 text-white shadow-2xl'
        }`}
        onMouseEnter={() => setIsMenuOpen(true)}
      >
        {/* 다크모드 배경 효과 (랜딩 페이지가 아닐 때) */}
        {!isLandingPage && (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none"></div>
          </>
        )}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            {/* 정렬 핵심: 상단 Nav와 동일한 너비와 Grid 구조를 가짐 */}
            <div className={`flex justify-end`}> {/* 우측 정렬을 위한 Flex Wrapper */}
                
                {/* 상단 nav와 똑같은 GRID_CLASS 적용 */}
                <div className={`${GRID_CLASS}`}> 
                    {navItems.map((item) => (
                    <div key={item.label} className="flex flex-col text-center">
                        {/* Title 중복 제거됨 */}
                        
                        {/* 서브메뉴 리스트 */}
                        {item.children && (
                        <ul className={`space-y-3 text-sm ${
                          isLandingPage 
                            ? isScrolled 
                              ? 'text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]' // 스크롤 시: 흰색
                              : 'text-white/80' // 스크롤 전: 흰색
                            : 'text-gray-400'
                        }`}>
                            {item.children.map((child) => {
                              const isChildActive = pathname === child.href;
                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className={`block transition-all duration-300 hover:translate-x-1 ${
                                      isLandingPage
                                        ? isScrolled
                                          ? 'hover:text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]'
                                          : 'hover:text-white'
                                        : isChildActive
                                          ? 'text-blue-400 font-semibold hover:text-blue-300'
                                          : 'hover:text-white hover:font-medium'
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                        )}
                        {!item.children && <div>&nbsp;</div>}
                    </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* 모바일 메뉴 영역 (다크모드 적용) */}
      {mobileOpen && (
        <div className={`border-t lg:hidden h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-500 ${
          isLandingPage 
            ? 'border-gray-200 bg-white'
            : 'border-white/10 bg-[#0a0a0a] backdrop-blur-xl'
        }`}>
          <nav className={`mx-auto max-w-6xl pl-[80px] pr-4 py-3 text-sm font-noto ${
            isLandingPage ? '' : 'text-white'
          }`}>
            <div className="flex flex-col gap-6 pt-4">
              {navItems.map((item, index) => {
                const isItemActive = isLinkActive(item.href);
                return (
                  <div key={item.label} className={`transition-all duration-300 ${
                    index === navItems.length - 1 ? 'pb-[60px]' : ''
                  }`}>
                    <Link
                      href={item.href || '#'}
                      className={`block text-lg font-bold mb-2 transition-all duration-300 hover:translate-x-2 ${
                        isLandingPage
                          ? 'text-black'
                          : isItemActive
                            ? 'text-blue-400'
                            : 'text-white hover:text-blue-300'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className={`flex flex-col gap-2 pl-2 transition-all duration-300 ${
                        isLandingPage ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`py-1 transition-all duration-300 hover:translate-x-2 ${
                                isLandingPage
                                  ? isChildActive
                                    ? 'text-[#003978] font-medium'
                                    : 'hover:text-[#003978]'
                                  : isChildActive
                                    ? 'text-blue-400 font-semibold'
                                    : 'hover:text-white hover:font-medium'
                              }`}
                              onClick={() => setMobileOpen(false)}
                            >
                              - {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}