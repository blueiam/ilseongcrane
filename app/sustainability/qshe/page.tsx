'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function QSHEPage() {
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
          alt="QSHE Sustainability"
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
            QSHE 경영
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen bg-white text-gray-900 py-24">
        <div className="container mx-auto px-4 max-w-6xl">


        {/* ====================================================================
            SECTION 2: 4대 핵심 축 (4 Core Pillars)
           ==================================================================== */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">QSHE 4대 핵심 축</h2>
            <p className="text-gray-600">각 영역별 명확한 목표와 전략을 수립하여 실천합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            
            {/* 1. Quality */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-t-4 border-blue-500 shadow-lg hover:bg-gray-50 transition-all border border-gray-200 min-w-0">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Quality (품질)</h3>
              <ul className="text-gray-700 text-sm space-y-3">
                <li className="flex items-start"><span className="mr-2 text-blue-600 shrink-0 mt-0.5">▪</span><span>ISO 9001 기반 품질관리체계 운영</span></li>
                <li className="flex items-start"><span className="mr-2 text-blue-600 shrink-0 mt-0.5">▪</span><span>표준 작업절차(SOP) 준수</span></li>
                <li className="flex items-start"><span className="mr-2 text-blue-600 shrink-0 mt-0.5">▪</span><span>고객만족 극대화 및 무결점 시공</span></li>
              </ul>
            </div>

            {/* 2. Safety */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-t-4 border-yellow-500 shadow-lg hover:bg-gray-50 transition-all border border-gray-200 min-w-0">
              <h3 className="text-xl font-bold text-yellow-600 mb-4">Safety (안전)</h3>
              <ul className="text-gray-700 text-sm space-y-3">
                <li className="flex items-start"><span className="mr-2 text-yellow-600 shrink-0 mt-0.5">▪</span><span>위험성평가 중심 자율안전관리</span></li>
                <li className="flex items-start"><span className="mr-2 text-yellow-600 shrink-0 mt-0.5">▪</span><span>IoT 기반 실시간 모니터링</span></li>
                <li className="flex items-start"><span className="mr-2 text-yellow-600 shrink-0 mt-0.5">▪</span><span>Zero Accident (무재해) 달성</span></li>
              </ul>
            </div>

            {/* 3. Health */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-t-4 border-green-500 shadow-lg hover:bg-gray-50 transition-all border border-gray-200 min-w-0">
              <h3 className="text-xl font-bold text-green-600 mb-4">Health (보건)</h3>
              <ul className="text-gray-700 text-sm space-y-3">
                <li className="flex items-start"><span className="mr-2 text-green-600 shrink-0 mt-0.5">▪</span><span>근로자 건강보호 및 작업환경 개선</span></li>
                <li className="flex items-start"><span className="mr-2 text-green-600 shrink-0 mt-0.5">▪</span><span>고위험 작업자 집중 관리</span></li>
                <li className="flex items-start"><span className="mr-2 text-green-600 shrink-0 mt-0.5">▪</span><span>직업병 예방 프로그램 운영</span></li>
              </ul>
            </div>

            {/* 4. Environment */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-t-4 border-teal-500 shadow-lg hover:bg-gray-50 transition-all border border-gray-200 min-w-0">
              <h3 className="text-xl font-bold text-teal-600 mb-4">Environment (환경)</h3>
              <ul className="text-gray-700 text-sm space-y-3">
                <li className="flex items-start"><span className="mr-2 text-teal-600 shrink-0 mt-0.5">▪</span><span>친환경 장비(전기/하이브리드) 도입</span></li>
                <li className="flex items-start"><span className="mr-2 text-teal-600 shrink-0 mt-0.5">▪</span><span>온실가스 감축 및 에너지 절감</span></li>
                <li className="flex items-start"><span className="mr-2 text-teal-600 shrink-0 mt-0.5">▪</span><span>폐기물 관리 강화</span></li>
              </ul>
            </div>

          </div>
        </section>


        {/* ====================================================================
            SECTION 3: 비전 및 운영체계 (Vision & System)
           ==================================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 mb-12">
          
          {/* 왼쪽: QSHE 비전 */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl border border-gray-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-4">
              Vision 2030과 함께하는 QSHE
            </h3>
            <p className="text-gray-700 leading-relaxed mb-8">
              일성크레인은 2030년까지 안정적 사업기반을 넘어 고부가가치 사업다각화와 글로벌 리프팅 기업 도약을 목표로 하고 있습니다.
              QSHE 통합경영체계는 이 목표를 실현하는 핵심 실행 프레임입니다.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-300">1</div>
                <div>
                  <p className="text-blue-600 text-xs font-bold uppercase">Step 1</p>
                  <p className="text-gray-900 font-medium">안정적 사업기반 & 안전관리 시스템 구축</p>
                </div>
              </div>
              <div className="w-0.5 h-6 bg-gray-300 ml-6"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-300">2</div>
                <div>
                  <p className="text-blue-600 text-xs font-bold uppercase">Step 2</p>
                  <p className="text-gray-900 font-medium">스마트 운영 & 고부가가치 사업 확장</p>
                </div>
              </div>
              <div className="w-0.5 h-6 bg-gray-300 ml-6"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)]">3</div>
                <div>
                  <p className="text-blue-600 text-xs font-bold uppercase">Step 3</p>
                  <p className="text-gray-900 font-medium">글로벌 종합 리프팅 & 친환경 리딩 기업</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 운영 체계 (PDCA Cycle) */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl border border-gray-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-4">
              QSHE 운영 체계
            </h3>
            <p className="text-gray-700 leading-relaxed mb-8">
              계획 수립부터 교육·점검·성과관리까지, 전사적인 통합관리 프로세스(PDCA)를 운영합니다.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">01. Plan</p>
                <p className="font-bold text-gray-900">정책 및 목표 수립</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">02. Do</p>
                <p className="font-bold text-gray-900">시스템 구축 및 교육</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">03. Check</p>
                <p className="font-bold text-gray-900">점검 및 모니터링</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">04. Action</p>
                <p className="font-bold text-gray-900">성과 분석 및 개선</p>
              </div>
            </div>
          </div>

        </section>


        {/* ====================================================================
            SECTION 4: 성과 및 인증 현황 (Certifications)
           ==================================================================== */}
        <section className="bg-gray-50 rounded-3xl p-10 md:p-16 text-center border border-gray-300">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">QSHE 성과 및 인증 현황</h2>
          <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
            일성크레인은 ISO 통합인증 추진과 무재해 목표 달성을 통해<br/>
            고객과 사회로부터 신뢰받는 파트너가 되기 위해 노력하고 있습니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="bg-white px-8 py-4 rounded-full border border-gray-300 text-gray-700 font-medium shadow-sm">
              🏆 중대재해 Zero 목표 운영
            </div>
            <div className="bg-white px-8 py-4 rounded-full border border-gray-300 text-gray-700 font-medium shadow-sm">
              📜 ISO 9001 / 14001 통합 인증
            </div>
            <div className="bg-white px-8 py-4 rounded-full border border-gray-300 text-gray-700 font-medium shadow-sm">
              🛡️ 안전보건경영시스템 확립
            </div>
          </div>
        </section>

      </div>
    </main>
    </>
  )
}