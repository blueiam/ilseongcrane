'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function EthicsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 컴포넌트 마운트 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/sustainability/section4.png"
          alt="Ethics Management"
          fill
          className="object-cover object-center"
          priority
          quality={80}
        />

        {/* Title Content with Animation */}
        <div className="relative flex h-full items-center justify-center">
          <h1
            className={`text-5xl font-bold text-white transition-all duration-[2000ms] ease-out translate-y-[80px] ${
              isVisible
                ? 'scale-100 opacity-100'
                : 'scale-[2] opacity-0'
            }`}
          >
            윤리경영
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen bg-white text-gray-900 py-24">
        <div className="container mx-auto px-4 max-w-6xl">


        {/* ====================================================================
            SECTION 2: 윤리경영 체계도 (System Diagram)
           ==================================================================== */}
        <section className="mb-32">
          <div className="bg-gray-50 rounded-3xl p-10 md:p-16 border border-gray-300 text-center relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-12 relative z-10 text-gray-900">일성크레인 윤리경영 체계</h2>
            
            {/* 체계도 시각화 (CSS Circle Layout) */}
            <div className="relative max-w-5xl mx-auto flex flex-col items-center justify-center gap-8 md:gap-0 z-10 min-h-[600px] md:min-h-[500px]">
              
              {/* Center Core */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)] z-20 border-4 border-white">
                <div className="text-center">
                  <p className="text-sm text-blue-100 mb-1 tracking-wider uppercase">Core Value</p>
                  <p className="text-2xl font-extrabold text-white">정도경영</p>
                </div>
              </div>

              {/* Connected Items - Circular Layout */}
              {/* Mobile: Vertical Stack / Desktop: Absolute positioning relative to center */}
              <div className="md:absolute md:w-full md:h-full md:top-0 md:left-0 pointer-events-none">
                
                {/* Item 1 - Top */}
                <div className="md:absolute md:top-[5%] md:left-1/2 md:-translate-x-1/2 flex items-center gap-4 bg-white border border-gray-300 px-6 py-4 rounded-xl shadow-lg w-64 md:w-auto pointer-events-auto">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">01</div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">윤리규범 체계</p>
                    <p className="text-xs text-gray-600">윤리헌장, 실천지침</p>
                  </div>
                </div>

                {/* Item 2 - Top Right */}
                <div className="md:absolute md:top-[15%] md:right-[15%] flex items-center gap-4 bg-white border border-gray-300 px-6 py-4 rounded-xl shadow-lg w-64 md:w-auto pointer-events-auto">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">02</div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">윤리경영 교육</p>
                    <p className="text-xs text-gray-600">규정 및 법규준수, 기업윤리 가치 인식</p>
                  </div>
                </div>

                {/* Item 3 - Right */}
                <div className="md:absolute md:top-1/2 md:right-[5%] md:-translate-y-1/2 flex items-center gap-4 bg-white border border-gray-300 px-6 py-4 rounded-xl shadow-lg w-64 md:w-auto pointer-events-auto">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">03</div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">제보채널 운영</p>
                    <p className="text-xs text-gray-600">윤리위반 신고 및 처리</p>
                  </div>
                </div>

                {/* Item 4 - Bottom Right */}
                <div className="md:absolute md:bottom-[15%] md:right-[15%] flex items-center gap-4 bg-white border border-gray-300 px-6 py-4 rounded-xl shadow-lg w-64 md:w-auto pointer-events-auto">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">04</div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">사규</p>
                    <p className="text-xs text-gray-600">내부회계관리, 정보보호, 리스크관리</p>
                  </div>
                </div>

                {/* Item 5 - Bottom Left */}
                <div className="md:absolute md:bottom-[15%] md:left-[15%] flex items-center gap-4 bg-white border border-gray-300 px-6 py-4 rounded-xl shadow-lg w-64 md:w-auto pointer-events-auto">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">05</div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">실천 시스템</p>
                    <p className="text-xs text-gray-600">제보채널, 교육, 서약</p>
                  </div>
                </div>

                {/* Connector Lines (Desktop Only) - Dashed lines from center to items */}
                <svg className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10" overflow="visible">
                  {/* Top */}
                  <path d="M 400 0 L 400 100" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                  {/* Top Right */}
                  <path d="M 550 100 L 650 150" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                  {/* Right */}
                  <path d="M 750 250 L 650 250" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                  {/* Bottom Right */}
                  <path d="M 650 350 L 550 400" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                  {/* Bottom Left */}
                  <path d="M 250 400 L 150 350" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                </svg>

              </div>
            </div>
          </div>
        </section>


        {/* ====================================================================
            SECTION 3: 윤리헌장 (Code of Ethics)
           ==================================================================== */}
        <section className="mb-32">
          <div className="flex items-end justify-between mb-12 border-b border-gray-300 pb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              윤리헌장
            </h2>
            <p className="text-gray-600 hidden md:block">올바른 의사결정과 행동의 기준이 됩니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group bg-white p-8 rounded-2xl border border-gray-300 hover:border-blue-500 hover:bg-gray-50 transition-all duration-300 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">정직과 신뢰</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                모든 업무에서 진실과 신뢰를 바탕으로 행동하며, 기업의 명예와 개인의 품위를 지킵니다.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-8 rounded-2xl border border-gray-300 hover:border-blue-500 hover:bg-gray-50 transition-all duration-300 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">법규 준수</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                국내외 모든 법령, 규정, 사회적 책임 기준을 철저히 준수하고 불법·부당한 행위를 배격합니다.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-8 rounded-2xl border border-gray-300 hover:border-blue-500 hover:bg-gray-50 transition-all duration-300 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">공정한 거래</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                협력업체 및 고객과의 모든 관계에서 상호 존중과 공정한 경쟁을 원칙으로 합니다.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group bg-white p-8 rounded-2xl border border-gray-300 hover:border-blue-500 hover:bg-gray-50 transition-all duration-300 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">고객 중심</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                고객의 의견을 존중하고 약속을 성실히 이행하며, 최고의 품질과 서비스를 제공합니다.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group bg-white p-8 rounded-2xl border border-gray-300 hover:border-blue-500 hover:bg-gray-50 transition-all duration-300 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">존중과 상생</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                임직원에게 공평한 기회를 부여하고, 서로 존중하며 함께 성장하는 조직문화를 조성합니다.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group bg-white p-8 rounded-2xl border border-gray-300 hover:border-blue-500 hover:bg-gray-50 transition-all duration-300 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">사회적 책임</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                지역사회 발전과 환경보호에 적극 참여하며 지속가능한 미래를 만들어갑니다.
              </p>
            </div>
          </div>
        </section>


        {/* ====================================================================
            SECTION 4: 윤리행동강령 (Code of Conduct)
           ==================================================================== */}
        <section>
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-300">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 border-l-4 border-blue-600 pl-6">
              윤리행동강령
            </h2>
            
            <div className="space-y-6">
              {/* List Item 1 */}
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-300 hover:border-gray-400 transition-colors shadow-sm">
                <div className="md:w-1/4">
                  <h4 className="text-lg font-bold text-blue-600">01. 부패 방지</h4>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-900 font-medium mb-1">금품·향응 수수 금지</p>
                  <p className="text-sm text-gray-600">금품, 향응, 특혜 등 어떠한 형태의 부당 이익도 취하지 않습니다.</p>
                </div>
              </div>

              {/* List Item 2 */}
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-300 hover:border-gray-400 transition-colors shadow-sm">
                <div className="md:w-1/4">
                  <h4 className="text-lg font-bold text-blue-600">02. 투명 경영</h4>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-900 font-medium mb-1">객관적이고 공정한 의사결정</p>
                  <p className="text-sm text-gray-600">모든 업무는 객관적 근거와 공정한 절차에 따라 투명하게 수행합니다.</p>
                </div>
              </div>

              {/* List Item 3 */}
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-300 hover:border-gray-400 transition-colors shadow-sm">
                <div className="md:w-1/4">
                  <h4 className="text-lg font-bold text-blue-600">03. 정보 보안</h4>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-900 font-medium mb-1">정보의 보호와 관리</p>
                  <p className="text-sm text-gray-600">회사 및 고객의 정보를 철저히 보호하며, 승인 없이 무단으로 사용하거나 유출하지 않습니다.</p>
                </div>
              </div>

              {/* List Item 4 */}
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-300 hover:border-gray-400 transition-colors shadow-sm">
                <div className="md:w-1/4">
                  <h4 className="text-lg font-bold text-blue-600">04. 조직 문화</h4>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-900 font-medium mb-1">상호 존중과 배려</p>
                  <p className="text-sm text-gray-600">상호 존중, 배려, 협력을 기반으로 한 차별 없는 건전한 근무환경을 유지합니다.</p>
                </div>
              </div>

              {/* List Item 5 */}
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-300 hover:border-gray-400 transition-colors shadow-sm">
                <div className="md:w-1/4">
                  <h4 className="text-lg font-bold text-blue-600">05. 사회 공헌</h4>
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-900 font-medium mb-1">사회적 책임 실천</p>
                  <p className="text-sm text-gray-600">윤리경영 실천을 통해 기업의 사회적 책임을 다하고, 깨끗하고 투명한 기업문화를 확립합니다.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </main>
    </>
  )
}