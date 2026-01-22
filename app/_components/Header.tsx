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
      // 추 후 다시 공개
      // { label: '운영장비', href: '/equipment/operation' },
      // { label: '기타 도구/부자재', href: '/equipment/tools' },
      { label: '운송/조립해체', href: '/equipment/transport-assembly' },
      // 추 후 다시 공개
      // { label: '검사/유지관리', href: '/equipment/maintenance' },
    ],
  },
  {
    label: '지속가능경영',
    href: '/sustainability/qshe',
    children: [
      { label: 'QHSE 경영', href: '/sustainability/qshe' },
      { label: '윤리경영', href: '/sustainability/ethics' },
      { label: 'SGC경영', href: '/sustainability/hr' },
      // 추 후 다시 공개
      // { label: '비상경영', href: '/sustainability/emergency' },
      { label: '등록/면허/인증', href: '/sustainability/certifications' },
    ],
  },
  {
    label: '정보자료실',
    href: '/archive/notice',
    children: [
      { label: '공지/소식', href: '/archive/notice' },
      { label: '일반자료실', href: '/archive/data' },
      // 임시 비활성화
      // { label: '기술자료실', href: '/archive/tech' },
      // { label: '문서자료실', href: '/archive/docs' },
      // { label: '인사자료실', href: '/archive/hr' },
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
  const [logoPath, setLogoPath] = useState('/images/logo/isc_logo.svg')
  const isLandingPage = pathname === '/'
  const isAdminPage = pathname?.startsWith('/admin')
  
  // 클라이언트에서만 타임스탬프 추가하여 캐시 무효화 (개발 환경)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setLogoPath(`/images/logo/isc_logo.svg?t=${Date.now()}`)
    }
  }, [])

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
  // 전체 사이트 라이트 테마 적용 (어드민 페이지 제외)
  // 랜딩 페이지: 스크롤 전 투명, 스크롤 시 반투명 glass 효과
  // 일반 페이지: 항상 라이트 테마
  const headerClass = isAdminPage
    ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl border-b border-white/10' // 어드민은 다크 모드 유지
    : isLandingPage
      ? isScrolled
        ? 'bg-white/80 backdrop-blur-md lg:bg-white/80 lg:backdrop-blur-xl shadow-md lg:shadow-2xl border-b border-slate-200 lg:border-slate-200' // 스크롤 시: 모바일/데스크톱 모두 반투명 glass 효과
        : 'bg-transparent lg:bg-transparent border-b-0 lg:border-b-0 shadow-none lg:shadow-none' // 스크롤 전: 모바일/데스크톱 모두 투명
      : isScrolled
        ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-lg'
        : 'bg-white/80 backdrop-blur-md border-b border-slate-200'

  // 스크롤 전 landing page에서 완전히 투명하게 처리 (데스크톱만)
  const isAtTop = isLandingPage && !isScrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${headerClass} ${
        !isLandingPage && isScrolled ? 'shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''
      }`}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      {/* 배경 그리드 효과 (어드민 페이지만 다크 그리드) */}
      {isAdminPage && (
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
            src={logoPath}
            alt="일성크레인 주식회사"
            width={85}
            height={44}
            onError={(e) => {
              // 폴백: 로고 로드 실패 시 기존 로고로 대체
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('/Header/logo.svg')) {
                target.src = '/Header/logo.svg';
              }
            }}
            className={`h-11 w-auto transition-all duration-300 ${
              isAdminPage
                ? 'brightness-0 invert group-hover:scale-105' // 어드민: 다크 모드 로고 (흰색)
                : isLandingPage 
                  ? isScrolled
                    ? 'group-hover:scale-105' // 스크롤 시: 원본 색상 (파란 그라데이션)
                    : 'brightness-0 invert lg:brightness-0 lg:invert group-hover:scale-105' // 스크롤 전: 흰색 로고
                  : 'group-hover:scale-105' // 일반 페이지: 원본 색상 (파란 그라데이션)
            }`}
            style={{ imageRendering: 'auto' }}
          />
        </Link>

        {/* PC GNB (Grid Layout 적용) */}
        {/* ml-auto를 주어 로고와 떨어뜨리고 우측에 붙입니다 */}
        <nav className={`hidden lg:grid ${GRID_CLASS} ml-auto text-base font-bold ${
          isAdminPage
            ? 'text-white'
            : isLandingPage 
              ? isScrolled
                ? 'text-slate-900' // 스크롤 시 라이트 텍스트
                : 'text-white'
              : 'text-slate-700'
        }`}>
          {navItems.map((item) => {
            const active = isLinkActive(item.href)
            return (
              <div key={item.label} className="text-center"> {/* text-center 필수 */}
                <Link
                  href={item.href || '#'}
                  className={`relative inline-block border-b-2 pb-1 transition-all duration-300 ${
                    isAdminPage
                      ? active
                        ? 'border-b-blue-500 text-blue-400 font-bold hover:text-blue-300'
                        : 'border-transparent text-gray-300 hover:border-b-blue-500/50 hover:text-white hover:scale-105'
                      : isLandingPage
                        ? active
                          ? isScrolled
                            ? 'border-b-blue-600 text-slate-900 font-bold hover:text-blue-600'
                            : 'border-b-white text-white'
                          : isScrolled
                            ? 'border-transparent hover:border-b-blue-600/50 hover:text-slate-900'
                            : 'border-transparent hover:border-b-white/80 hover:text-white/90'
                        : active
                          ? 'border-b-blue-600 text-blue-600 font-bold hover:text-blue-700'
                          : 'border-transparent text-slate-700 hover:border-b-blue-600/50 hover:text-blue-600 hover:scale-105'
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
            isAdminPage
              ? 'text-white hover:bg-white/10 hover:scale-110 active:scale-95'
              : isLandingPage 
                ? isScrolled
                  ? 'text-slate-900 hover:bg-slate-100' // 스크롤 시: 라이트 텍스트
                  : 'text-white hover:bg-white/10' // 스크롤 전: 투명 배경이므로 흰색 텍스트
                : 'text-slate-900 hover:bg-slate-100 hover:scale-110 active:scale-95'
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
          // 어드민 페이지일 때
          isAdminPage
            ? isMenuOpen
              ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10 text-white shadow-2xl'
              : 'bg-transparent border-transparent'
            : // 랜딩페이지이면서 메뉴가 열렸을 때만 배경색 적용 (데스크톱 전용)
              isLandingPage
                ? isMenuOpen
                  ? isScrolled
                    ? 'bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900 shadow-2xl' // 스크롤 시: 라이트 배경
                    : 'bg-white/70 backdrop-blur-xl border-white/50 text-white shadow-2xl' // 스크롤 전: 흰색 계열
                  : 'bg-transparent border-transparent'
                : 'bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900 shadow-2xl'
        }`}
        onMouseEnter={() => setIsMenuOpen(true)}
      >
        {/* 다크모드 배경 효과 (어드민 페이지만) */}
        {isAdminPage && (
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
                          isAdminPage
                            ? 'text-gray-400'
                            : isLandingPage 
                              ? isScrolled 
                                ? 'text-slate-600' // 스크롤 시: 라이트 텍스트
                                : 'text-white/80' // 스크롤 전: 흰색
                              : 'text-slate-600'
                        }`}>
                            {item.children.map((child) => {
                              const isChildActive = pathname === child.href;
                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className={`block transition-all duration-300 hover:translate-x-1 ${
                                      isAdminPage
                                        ? isChildActive
                                          ? 'text-blue-400 font-semibold hover:text-blue-300'
                                          : 'hover:text-white hover:font-medium'
                                        : isLandingPage
                                          ? isScrolled
                                            ? isChildActive
                                              ? 'text-blue-600 font-semibold hover:text-blue-700'
                                              : 'hover:text-slate-900 hover:font-medium'
                                            : 'hover:text-white'
                                          : isChildActive
                                            ? 'text-blue-600 font-semibold hover:text-blue-700'
                                            : 'hover:text-slate-900 hover:font-medium'
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

      {/* 모바일 메뉴 영역 */}
      {mobileOpen && (
        <div className={`border-t lg:hidden h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-500 ${
          isAdminPage
            ? 'border-white/10 bg-[#0a0a0a] backdrop-blur-xl'
            : isLandingPage 
              ? 'border-gray-200 bg-white'
              : 'border-slate-200 bg-white backdrop-blur-xl'
        }`}>
          <nav className={`mx-auto max-w-6xl pl-[80px] pr-4 py-3 text-sm font-noto ${
            isAdminPage
              ? 'text-white'
              : isLandingPage ? 'text-slate-900' : 'text-slate-900'
          }`}>
            <div className="flex flex-col gap-6 pt-4">
              {navItems.map((item, index) => {
                const isItemActive = isLinkActive(item.href);
                return (
                  <div key={item.label} className={`transition-all duration-300 ${
                    index === navItems.length - 1 ? 'pb-[120px]' : ''
                  }`}>
                    <Link
                      href={item.href || '#'}
                      className={`block text-xl font-bold mb-2 transition-all duration-300 hover:translate-x-2 ${
                        isAdminPage
                          ? isItemActive
                            ? 'text-blue-400'
                            : 'text-white hover:text-blue-300'
                          : isLandingPage
                            ? isItemActive
                              ? 'text-blue-600'
                              : 'text-slate-900 hover:text-blue-600'
                            : isItemActive
                              ? 'text-blue-600'
                              : 'text-slate-700 hover:text-blue-600'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className={`flex flex-col gap-2 pl-2 transition-all duration-300 ${
                        isAdminPage
                          ? 'text-gray-400'
                          : isLandingPage ? 'text-gray-600' : 'text-slate-600'
                      }`}>
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`py-1 text-base transition-all duration-300 hover:translate-x-2 ${
                                isAdminPage
                                  ? isChildActive
                                    ? 'text-blue-400 font-semibold'
                                    : 'hover:text-white hover:font-medium'
                                  : isLandingPage
                                    ? isChildActive
                                      ? 'text-blue-600 font-medium'
                                      : 'hover:text-blue-600'
                                    : isChildActive
                                      ? 'text-blue-600 font-semibold'
                                      : 'hover:text-blue-600 hover:font-medium'
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