'use client';

import { useEffect, useRef, useState } from 'react';

// 1. 연혁 데이터
const historyData = [
  // 섹션 제목: 2020년 Vision 2030 종합 리프팅 풍력T&I 솔루션 대표기업
  { type: 'section', title: '2020년 Vision 2030 종합 리프팅 풍력T&I 솔루션 대표기업' },
  {
    type: 'year',
    year: '2026',
    events: [
      { month: '01', desc: 'Vision 2030 : ［종합 리프팅 솔루션 대표기업］ 발표' },
    ]
  },
  {
    type: 'year',
    year: '2025',
    events: [
      { month: '12', desc: '풍력T&I 전략적 제휴(ENLsolution, WindPower korea)' },
      { month: '12', desc: 'ISO 45001 안전보건시스템 구축' },
      { month: '12', desc: '스마트 안전관리시스템(QHSE 통합 플랫폼) 본격 도입' },
      { month: '09', desc: 'Sany800톤 4호기 도입' },
      { month: '08', desc: 'Sany250톤 Hybrid 크레인 도입' },
      { month: '07', desc: '사옥 준공(충북 음성)' },
      { month: '07', desc: '기술팀을 ［ISC Lifting/Logistics 연구소］ 확대 개편' },
      { month: '03', desc: 'ISO 9001/14001 품질환경 경영시스템 구축 및 인증' },
      { month: '03', desc: '국내 민간 최대 해상풍력단지, 영광낙월해상풍력 마샬링작업 착수' },
    ]
  },
  {
    type: 'year',
    year: '2024',
    events: [
      { month: '05', desc: '［범한건설중기주식회사］ 설립' },
    ]
  },
  {
    type: 'year',
    year: '2023',
    events: [
      { month: '11', desc: '［승원씨엔에스주식회사］ 설립' },
      { month: '05', desc: 'Sany800톤 크롤러크레인 1호기 도입' },
    ]
  },
  {
    type: 'year',
    year: '2022',
    events: [
      { month: '09', desc: '주기장 확장 준공(충북 음성)' },
    ]
  },
  {
    type: 'year',
    year: '2021',
    events: [
      { month: '12', desc: '［일성크레인주식회사］ 상호 변경' },
    ]
  },
  // 섹션 제목: 2010년 크롤러크레인 시장 신규 본격 진출
  { type: 'section', title: '2010년 크롤러크레인 시장 신규 본격 진출' },
  {
    type: 'year',
    year: '2018',
    events: [
      { month: '', desc: 'SOC 인프라, 공장플랜트 등 대형 구조물 사업 진출' },
      { month: '', desc: '풍력기자재 운송·설치 T&I 서비스 기초 구축' },
      { month: '', desc: '사내 기술팀 신설 → 리깅플랜, 리프트플랜 자체 설계 체계 완성' },
    ]
  },
  {
    type: 'year',
    year: '2016',
    events: [
      { month: '', desc: '전국 네트워크 구축(충청, 전라, 경상권 협력사 및 파트너사 정비)' },
    ]
  },
  {
    type: 'year',
    year: '2014',
    events: [
      { month: '', desc: '중대형 크롤러크레인 250톤급 도입 → 중량물 설치 전문화' },
    ]
  },
  // 섹션 제목: 2000년 회사 기반 확립 & 장비 확대
  { type: 'section', title: '2000년 회사 기반 확립 & 장비 확대' },
  {
    type: 'year',
    year: '2008',
    events: [
      { month: '', desc: '특수구조물 설치 및 교량 가설 지원 사업 진출' },
    ]
  },
  {
    type: 'year',
    year: '2001',
    events: [
      { month: '', desc: '장비 확충: 35톤 ~ 100톤급 하이드로 크레인 도입' },
      { month: '', desc: '경기 남부 지역 정비센터 및 장비 기지(주기장) 확보' },
    ]
  },
  // 섹션 제목: 1992년 "오로지 성공" 일념으로 ［一星］ 창업
  { type: 'section', title: '1992년 "오로지 성공" 일념으로 ［一星］ 창업' },
  {
    type: 'year',
    year: '1992',
    events: [
      { month: '', desc: '25톤 하이드로크레인 1대로 수도권에서 토목,건축현장 작업시작' },
    ]
  }
];

// 스크롤 애니메이션 훅
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-24">
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        {/* ====================================================================
            SECTION 1: 회사연혁 (Company History)
           ==================================================================== */}
        <section className="mb-40">
          <div className="text-center mb-20">
            <span className="block text-blue-500 font-bold text-sm tracking-widest mb-3 uppercase animate-fade-in">
              History
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-fade-in-up">
              회사연혁
            </h1>
            <p className="text-gray-400 text-lg animate-fade-in-up delay-100">
              일성크레인이 걸어온 도전과 성장의 발자취입니다.
            </p>
          </div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {historyData.map((item, index) => {
              // 섹션 제목인 경우
              if (item.type === 'section') {
                const { ref, isVisible } = useScrollAnimation();
                return (
                  <div 
                    key={index} 
                    ref={ref}
                    className={`flex flex-col md:flex-row gap-8 md:gap-0 transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {/* 빈 공간 (연도 영역) */}
                    <div className="md:w-[200px] md:pr-8"></div>
                    {/* 섹션 제목 */}
                    <div className="md:flex-1">
                      <h4 className="text-2xl md:text-3xl font-bold text-white leading-relaxed relative group cursor-default pl-4 md:pl-6 border-l-4 border-blue-500 py-2 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent rounded-r-lg transition-all duration-300 hover:from-blue-500/20 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20">
                        <span className="relative z-10 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                          {item.title}
                        </span>
                      </h4>
                    </div>
                  </div>
                );
              }
              
              // 연도별 데이터인 경우
              if (item.type === 'year' && item.events) {
                const { ref, isVisible } = useScrollAnimation();
                return (
                  <div 
                    key={index} 
                    ref={ref}
                    className={`flex flex-col md:flex-row gap-8 md:gap-0 group transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                  >
                    {/* 연도 */}
                    <div className="md:w-[200px] md:pr-8">
                      <h3 className="text-3xl md:text-5xl font-bold mb-2 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500 cursor-default">
                        <span className="bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent">
                          {item.year}년
                        </span>
                      </h3>
                    </div>
                    {/* 상세 내용 */}
                    <div className="md:flex-1">
                      <ul className="space-y-4">
                        {item.events.map((event, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-start text-lg md:text-xl group/item transition-all duration-300 hover:translate-x-2 hover:opacity-100 opacity-90"
                          >
                            {event.month && (
                              <span className="text-blue-400 font-bold mr-4 shrink-0 mt-1 group-hover/item:text-blue-300 transition-colors">
                                {event.month}월
                              </span>
                            )}
                            <span className="text-gray-300 font-light leading-relaxed group-hover/item:text-white transition-colors">
                              {event.desc}
                            </span>
                            <div className="ml-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }
              
              return null;
            })}
          </div>
        </section>


        {/* ====================================================================
            SECTION 2: 조직도 (Organization Chart)
           ==================================================================== */}
        <section className="pt-20 border-t border-gray-800">
          <div className="text-center mb-20">
            <span className="block text-blue-500 font-bold text-sm tracking-widest mb-3 uppercase animate-fade-in">
              Organization
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-fade-in-up">
              조직도
            </h2>
            <p className="text-gray-400 text-lg animate-fade-in-up delay-100">
              효율적이고 체계적인 조직 운영으로 최상의 시너지를 창출합니다.
            </p>
          </div>

          {/* [반응형 분기점]
            1. Mobile View (lg:hidden): 수직형 트리 (모바일 최적화)
            2. Desktop View (hidden lg:block): 수평형 트리 (PC 최적화)
          */}

          {/* ================= Mobile View (Vertical Stack) ================= */}
          <div className="block lg:hidden space-y-8">
            
            {/* Level 1: 대표 */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-gray-200 via-white to-gray-200 text-black font-bold text-xl w-64 py-4 rounded-lg shadow-lg text-center border-2 border-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:via-white hover:to-blue-50">
                <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
                  대 표
                </span>
              </div>
            </div>
            
            {/* 연결선 (중앙) */}
            <div className="flex justify-center -mt-8 mb-0">
              <div className="h-8 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500"></div>
            </div>

            {/* Level 2: 장비사업 & 풍력사업 (Stack) */}
            <div className="space-y-12 relative px-4">
              {/* 왼쪽 전체 연결선 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500 -translate-x-1/2"></div>

              {/* Group 1: 장비사업 */}
              <div className="relative bg-[#222] border-l-4 border-blue-500 border-r border-y border-gray-700 p-6 rounded-r-xl z-10 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent">
                <div className="bg-gradient-to-r from-white via-blue-50 to-white text-black font-bold text-lg py-3 rounded-lg text-center mb-6 transition-all duration-300 hover:from-blue-100 hover:via-white hover:to-blue-100 shadow-md">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
                    장비사업 (CEO)
                  </span>
                </div>
                
                {/* Sub Group: QSHE */}
                <div className="flex justify-end mb-6">
                  <div className="bg-gradient-to-r from-gray-300 via-blue-100 to-gray-300 text-black font-bold text-sm py-2 px-4 rounded-lg w-auto inline-block transition-all duration-300 hover:from-blue-200 hover:via-blue-100 hover:to-blue-200 hover:scale-105 shadow-md">
                    <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
                      QSHE실 (CSO)
                    </span>
                  </div>
                </div>

                {/* Teams */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['영업팀', '운영팀', '경영지원팀', '해외사업팀'].map((team) => (
                    <div key={team} className="bg-gray-800 text-gray-200 py-2 rounded-lg text-center text-sm border border-gray-600 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-900 hover:via-blue-800 hover:to-blue-900 hover:border-blue-500 hover:text-white hover:scale-105 cursor-pointer shadow-md hover:shadow-blue-500/30">
                      {team}
                    </div>
                  ))}
                </div>

                {/* Branches */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['서울지점', '평택지점', '호남지점', '동해지점'].map((branch) => (
                    <div key={branch} className="bg-gray-700 text-gray-300 py-2 rounded-lg text-center text-sm border border-gray-600 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-800 hover:via-blue-700 hover:to-blue-800 hover:border-blue-500 hover:text-white hover:scale-105 cursor-pointer shadow-md hover:shadow-blue-500/30">
                      {branch}
                    </div>
                  ))}
                </div>

                {/* Family Company */}
                <div className="pt-6 border-t border-gray-600">
                  <p className="text-gray-400 text-sm italic mb-3 text-center">Family Company</p>
                  <div className="flex flex-col gap-3">
                    <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 text-gray-300 text-sm py-2 rounded-lg shadow-md text-center border border-gray-600 transition-all duration-300 hover:from-blue-600 hover:via-blue-500 hover:to-blue-600 hover:border-blue-400 hover:text-white hover:scale-105 cursor-pointer hover:shadow-blue-500/30">
                      승원싸앤에스(주)
                    </div>
                    <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 text-gray-300 text-sm py-2 rounded-lg shadow-md text-center border border-gray-600 transition-all duration-300 hover:from-blue-600 hover:via-blue-500 hover:to-blue-600 hover:border-blue-400 hover:text-white hover:scale-105 cursor-pointer hover:shadow-blue-500/30">
                      범한건설중기(주)
                    </div>
                  </div>
                </div>
              </div>

              {/* Group 2: 풍력사업 */}
              <div className="relative bg-[#222] border-l-4 border-blue-500 border-r border-y border-gray-700 p-6 rounded-r-xl z-10 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent">
                <span className="absolute top-2 right-4 text-xs text-blue-400 italic font-semibold">Outsourcing</span>
                <div className="bg-gradient-to-r from-white via-blue-50 to-white text-black font-bold text-lg py-3 rounded-lg text-center mb-6 border-2 border-dashed border-blue-400/50 mt-4 transition-all duration-300 hover:from-blue-100 hover:via-white hover:to-blue-100 hover:border-blue-400 shadow-md">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
                    풍력사업 (CEO)
                  </span>
                </div>
                
                <div className="space-y-3">
                  {['기획설계', '물류팀', '장비설치팀'].map((team) => (
                    <div key={team} className="bg-gray-800 text-gray-200 py-2 rounded-lg text-center text-sm border border-gray-600 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-900 hover:via-blue-800 hover:to-blue-900 hover:border-blue-500 hover:text-white hover:scale-105 cursor-pointer shadow-md hover:shadow-blue-500/30">
                      {team}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>


          {/* ================= Desktop View (Simple Layout) ================= */}
          <div className="hidden lg:block pb-12">
            <div className="max-w-6xl mx-auto space-y-12 relative">
              
              {/* Level 1: 대표 */}
              <div className="flex justify-center relative z-10">
                <div className="bg-gradient-to-br from-gray-200 via-white to-gray-200 text-black font-bold text-xl w-48 py-4 rounded-lg shadow-lg text-center border-2 border-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:via-white hover:to-blue-50">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
                    대 표
                  </span>
                </div>
              </div>

              {/* 연결선: 대표에서 장비사업 & 풍력사업으로 */}
              <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                {/* 중앙에서 위로 올라가는 세로선 (대표 box 하단으로) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500"></div>
                {/* 중앙에서 왼쪽으로 가는 가로선 */}
                <div className="absolute top-20 left-[25%] w-[calc(25%-0.25rem)] h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"></div>
                {/* 중앙에서 오른쪽으로 가는 가로선 */}
                <div className="absolute top-20 right-[25%] w-[calc(25%-0.25rem)] h-0.5 bg-gradient-to-l from-blue-500 via-blue-400 to-blue-500"></div>
                {/* 왼쪽 세로선 - 가로선 왼쪽 끝에서 아래로 끝까지 */}
                <div className="absolute top-20 left-[25%] w-0.5 h-[calc(100%-5rem)] bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500"></div>
                {/* 오른쪽 세로선 - 가로선 오른쪽 끝에서 아래로 끝까지 */}
                <div className="absolute top-20 right-[25%] w-0.5 h-[calc(100%-5rem)] bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500"></div>
              </div>

              {/* Level 2: 장비사업 & 풍력사업 */}
              <div className="grid grid-cols-2 gap-8 relative z-10">
                
                {/* Left Column: 장비사업 */}
                <div className="bg-[#222] border-l-4 border-blue-500 border-r border-y border-gray-700 p-8 rounded-r-xl transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent">
                  <div className="bg-gradient-to-r from-white via-blue-50 to-white text-black font-bold text-lg py-3 rounded-lg text-center mb-6 mt-4 transition-all duration-300 hover:from-blue-100 hover:via-white hover:to-blue-100 shadow-md">
                    <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
                      장비사업 (CEO)
                    </span>
                  </div>
                  
                  {/* QSHE실 */}
                  <div className="flex justify-end mb-6">
                    <div className="bg-gradient-to-r from-gray-300 via-blue-100 to-gray-300 text-black font-bold text-sm py-2 px-4 rounded-lg w-auto inline-block transition-all duration-300 hover:from-blue-200 hover:via-blue-100 hover:to-blue-200 hover:scale-105 shadow-md">
                      <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
                        QSHE실 (CSO)
                      </span>
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {['영업팀', '운영팀', '경영지원팀', '해외사업팀'].map((team) => (
                      <div key={team} className="bg-gray-800 text-gray-200 py-2 rounded-lg text-center text-sm border border-gray-600 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-900 hover:via-blue-800 hover:to-blue-900 hover:border-blue-500 hover:text-white hover:scale-105 cursor-pointer shadow-md hover:shadow-blue-500/30">
                        {team}
                      </div>
                    ))}
                  </div>

                  {/* Branches */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {['서울지점', '평택지점', '호남지점', '동해지점'].map((branch) => (
                      <div key={branch} className="bg-gray-700 text-gray-300 py-2 rounded-lg text-center text-sm border border-gray-600 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-800 hover:via-blue-700 hover:to-blue-800 hover:border-blue-500 hover:text-white hover:scale-105 cursor-pointer shadow-md hover:shadow-blue-500/30">
                        {branch}
                      </div>
                    ))}
                  </div>

                  {/* Family Company */}
                  <div className="pt-6 border-t border-gray-600">
                    <p className="text-gray-400 text-sm italic mb-3 text-center">Family Company</p>
                    <div className="flex flex-col gap-3">
                      <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 text-gray-300 text-sm px-6 py-2 rounded-lg shadow-md text-center border border-gray-600 transition-all duration-300 hover:from-blue-600 hover:via-blue-500 hover:to-blue-600 hover:border-blue-400 hover:text-white hover:scale-105 cursor-pointer hover:shadow-blue-500/30">
                        승원싸앤에스(주)
                      </div>
                      <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 text-gray-300 text-sm px-6 py-2 rounded-lg shadow-md text-center border border-gray-600 transition-all duration-300 hover:from-blue-600 hover:via-blue-500 hover:to-blue-600 hover:border-blue-400 hover:text-white hover:scale-105 cursor-pointer hover:shadow-blue-500/30">
                        범한건설중기(주)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: 풍력사업 */}
                <div className="bg-[#222] border-l-4 border-blue-500 border-r border-y border-gray-700 p-8 rounded-r-xl relative transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent">
                  <span className="absolute top-4 right-6 text-xs text-blue-400 italic font-semibold">Outsourcing</span>
                  <div className="bg-gradient-to-r from-white via-blue-50 to-white text-black font-bold text-lg py-3 rounded-lg text-center mb-6 border-2 border-dashed border-blue-400/50 mt-4 transition-all duration-300 hover:from-blue-100 hover:via-white hover:to-blue-100 hover:border-blue-400 shadow-md">
                    <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
                      풍력사업 (CEO)
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {['기획설계', '물류팀', '장비설치팀'].map((team) => (
                      <div key={team} className="bg-gray-800 text-gray-200 py-2 rounded-lg text-center text-sm border border-gray-600 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-900 hover:via-blue-800 hover:to-blue-900 hover:border-blue-500 hover:text-white hover:scale-105 cursor-pointer shadow-md hover:shadow-blue-500/30">
                        {team}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </section>

      </div>
    </main>
  );
}