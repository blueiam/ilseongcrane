'use client';

import { useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------
// 1. 연혁 데이터 (기존 데이터 유지)
// ----------------------------------------------------------------------
const historyData = [
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
  { type: 'section', title: '1992년 "오로지 성공" 일념으로 ［一星］ 창업' },
  {
    type: 'year',
    year: '1992',
    events: [
      { month: '', desc: '25톤 하이드로크레인 1대로 수도권에서 토목,건축현장 작업시작' },
    ]
  }
];

// ----------------------------------------------------------------------
// 2. 유틸리티 및 훅
// ----------------------------------------------------------------------
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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

// ----------------------------------------------------------------------
// 3. 메인 페이지 컴포넌트
// ----------------------------------------------------------------------
export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      {/* 배경 그리드 효과 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
        
        {/* ====================================================================
            SECTION 1: 회사연혁 (Company History)
           ==================================================================== */}
        <section className="mb-40">
          <div className="text-center mb-24">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest mb-4 uppercase animate-fade-in">
              Milestones
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                HISTORY
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              일성크레인이 걸어온 <span className="text-white font-medium">도전</span>과 <span className="text-white font-medium">성장</span>의 기록입니다.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* 중앙 타임라인 선 */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 md:-translate-x-1/2 h-full z-0" />

            <div className="space-y-12">
              {historyData.map((item, index) => {
                const { ref, isVisible } = useScrollAnimation();

                if (item.type === 'section') {
                  return (
                    <div 
                      key={index} 
                      ref={ref}
                      className={`relative z-10 flex items-center justify-center py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    >
                      <div className="bg-[#0a0a0a] border border-blue-500/30 px-8 py-3 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-xl">
                        <h4 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center break-keep">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  );
                }
                
                if (item.type === 'year' && item.events) {
                  return (
                    <div 
                      key={index} 
                      ref={ref}
                      className={`relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                      <div className="w-full md:w-1/2 md:text-right pl-16 md:pl-0 order-1 md:order-1 flex md:block items-center">
                        <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white/10 to-white/50 group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-500">
                          {item.year}
                        </h3>
                      </div>

                      <div className="absolute left-[23px] md:left-1/2 w-4 h-4 bg-[#0a0a0a] border-2 border-blue-500 rounded-full md:-translate-x-1/2 z-20 shadow-[0_0_10px_blue] order-2 md:order-2 mt-2 md:mt-0">
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                      </div>

                      <div className="w-full md:w-1/2 pl-16 md:pl-0 order-3 md:order-3">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-lg backdrop-blur-sm group w-full">
                          <ul className="space-y-3">
                            {item.events.map((event, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                {event.month && (
                                  <span className="shrink-0 text-xs font-bold text-blue-400 py-1 px-2 rounded bg-blue-500/10 border border-blue-500/20">
                                    {event.month}월
                                  </span>
                                )}
                                <span className={`text-gray-300 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors break-keep ${event.desc.includes('Vision 2030') ? 'md:whitespace-nowrap' : ''}`}>
                                  {event.desc}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}