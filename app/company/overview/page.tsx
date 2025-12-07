'use client';

import { useState } from 'react';
import Image from 'next/image';

// =============================================================================
// 1. DATA: 2030 VISION
// =============================================================================
const visionSteps = [
  {
    id: 1,
    step: '1단계',
    period: '2025 ~ 2026',
    title: '안정적 사업기반 확보',
    goals: [
      '핵심장비 및 인프라 확보',
      '영업과 숙련된 기술 인력 육성',
      '통합경영안전관리 시스템 구축'
    ],
    strategies: [
      {
        category: '건설기계 대여업 고도화',
        items: [
          '크레인 역량과 인프라 확충',
          '크레인 영업역량 강화',
          '크레인 운영관리시스템 구축',
          '크레인 정비, 검사, 자격 내부역량 확보'
        ]
      },
      {
        category: '풍력 T&I 경쟁기반 확보',
        items: [
          '풍력 핵심장비 확보',
          '풍력 제조사/EPC사와 협력체계 강화'
        ]
      },
      {
        category: 'QSHE 통합경영체계 정착',
        items: [
          'ISO 9001/14001/45001 통합인증',
          '안전관리시스템 구축',
          '면허, 등록, 특허 확보'
        ]
      }
    ],
    majorBusiness: [
      '1. 건설기계대여업',
      '2. 장비운송 및 주선업'
    ]
  },
  {
    id: 2,
    step: '2단계',
    period: '2027 ~ 2028',
    title: '고부가가치 사업다각화',
    goals: [
      '중량물 설치 및 해체사업 진출',
      '종합 검사·정비·엔지니어링 플랫폼 사업진출',
      '풍력 O&M 사업진출'
    ],
    strategies: [
      {
        category: '중량물 설치해체 전문기업',
        items: [
          '공장, 플랜트, 풍력 중량물 이설 전문화',
          'Lifting 엔지니어링 및 기술역량 확보'
        ]
      },
      {
        category: '스마트 장비운영 플랫폼 구축',
        items: [
          'IoT, GPS장비 실시간 모니터링시스템 구축',
          '장비운영관리 통합클라우드서비스 개발 (운전, 점검, 검사, 정비, 운전원 등)'
        ]
      },
      {
        category: '친환경 전기·하이브리드 장비 전환',
        items: []
      },
      {
        category: '풍력 T&I 전문화와 O&M 진출',
        items: [
          '풍력 통합서비스 제공',
          '풍력 O&M 시장 진출',
          '경쟁우위 핵심장비 확보'
        ]
      }
    ],
    majorBusiness: [
      '3. 중량물 설치 및 구조물 해체업',
      '4. 토목건설, 플랜트 특수공사업 지원',
      '5. 부품, 유류판매업 및 해외대리점업',
      '6. 검사대행 및 정비수리업'
    ]
  },
  {
    id: 3,
    step: '3단계',
    period: '2029 ~ 2030',
    title: '글로벌 종합리프팅 기업 도약',
    goals: [
      '중량물 종합솔루션 기업으로 도약',
      '육해상 풍력 T&I 종합솔루션 기업',
      '하이테크 및 친환경 기업'
    ],
    strategies: [
      {
        category: '종합 리프팅·물류 엔지니어링 기업으로 성장',
        items: [
          '중량물 설치운송 일괄 수행',
          '해상크레인, 해상풍력설치지원선 확보'
        ]
      },
      {
        category: '건설기계 통합 플랫폼 사업화',
        items: [
          '중량물 설치운송사업 해외진출',
          '건설기계 대여 플랫폼 운영',
          '현지 파트너와 합작, 장비파견모델 구축'
        ]
      },
      {
        category: '엔지니어링 연구소 개설',
        items: [
          '리프팅 시뮬레이션 기술',
          '무인조종, 원격제어 기술 개발',
          '특허 등 지적재산권 개발, 확보'
        ]
      }
    ],
    majorBusiness: [
      '7. 기술용역 및 엔지니어링',
      '8. ISO, SHE, QSHE시스템 용역',
      '9. 장비 매매, 리스 및 중개 플랫폼',
      '10. 장비 교육, 인력육성 및 컨설팅'
    ]
  }
];

// =============================================================================
// 2. DATA: Corporate Philosophy
// =============================================================================
const philosophies = [
  {
    title: '신뢰',
    eng: 'Trust',
    desc: '모든 약속은 곧 우리의 신용입니다.\n투명한 운영과 성실한 서비스를 통해\n고객의 신뢰를 쌓아갑니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30'
  },
  {
    title: '안전',
    eng: 'Safety',
    desc: '모든 현장의 기본은 안전입니다.\n엄격한 관리와 전문 인력의 체계적인 운영으로\n완벽한 안전을 지향합니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/30'
  },
  {
    title: '혁신',
    eng: 'Innovation',
    desc: '변화하는 산업 환경 속에서\n지속적인 기술 혁신과 장비 현대화를 통해\n경쟁력을 강화합니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'text-green-400',
    borderColor: 'border-green-500/30'
  },
  {
    title: '상생',
    eng: 'Sustainability',
    desc: '고객, 협력사, 임직원, 지역사회와 함께 성장하며\n모두에게 이익이 돌아가는\n지속 가능한 미래를 만들어갑니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30'
  }
];

export default function OverviewPage() {
  const [activeStep, setActiveStep] = useState<number | null>(1);

  const toggleStep = (id: number) => {
    setActiveStep(activeStep === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* ========================================================================
            SECTION 1: 2030 VISION
           ======================================================================== */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="block text-blue-500 font-bold text-sm tracking-widest mb-3 uppercase">
              Future Roadmap
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              2030 VISION
            </h1>
            <p className="text-gray-400 text-lg">
              일성크레인의 단계별 성장 전략과 미래 비전입니다.
            </p>
          </div>

          <div className="space-y-6 mb-20">
            {visionSteps.map((item) => (
              <div 
                key={item.id} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden
                  ${activeStep === item.id 
                    ? 'bg-[#222] border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.15)]' 
                    : 'bg-[#1f1f1f] border-gray-800 hover:border-gray-600'
                  }`}
              >
                {/* Header */}
                <button
                  onClick={() => toggleStep(item.id)}
                  className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-6">
                    <div className={`shrink-0 px-4 py-2 rounded-lg font-bold text-lg 
                      ${activeStep === item.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-bold mb-2 transition-colors
                        ${activeStep === item.id ? 'text-white' : 'text-gray-400'}`}>
                        {item.title}
                      </h3>
                      <p className="text-blue-400 font-medium">{item.period}</p>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-300 ${activeStep === item.id ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {/* Body */}
                <div className={`transition-all duration-500 ease-in-out px-6 md:px-8
                    ${activeStep === item.id ? 'max-h-[2000px] opacity-100 pb-8' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                  <hr className="border-gray-700 mb-8" />
                  <div className="grid grid-cols-1 gap-10">
                    
                    {/* 핵심 목표 */}
                    <div className="bg-[#2a2a2a] p-6 rounded-xl border border-gray-700">
                      <h4 className="text-blue-400 font-bold mb-4 text-sm uppercase tracking-wider">핵심 목표 (Core Goals)</h4>
                      <ul className="space-y-3">
                        {item.goals.map((goal, idx) => (
                          <li key={idx} className="flex items-start text-white text-lg font-medium">
                            <span className="mr-3 text-blue-500 mt-1">✓</span> {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* 주요 전략 */}
                      <div>
                        <h4 className="text-white font-bold text-xl mb-6 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          주요 전략
                        </h4>
                        <div className="space-y-6">
                          {item.strategies.map((strategy, idx) => (
                            <div key={idx} className="pl-4 border-l-2 border-gray-700">
                              <h5 className="text-gray-200 font-bold mb-2">{strategy.category}</h5>
                              {strategy.items.length > 0 && (
                                <ul className="space-y-1">
                                  {strategy.items.map((subItem, sIdx) => (
                                    <li key={sIdx} className="text-gray-400 text-sm pl-2 relative">
                                      <span className="absolute left-0 top-2 w-1 h-1 bg-gray-500 rounded-full"></span>
                                      {subItem}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 주요 사업 */}
                      <div>
                        <h4 className="text-white font-bold text-xl mb-6 flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          주요 사업
                        </h4>
                        <div className="bg-[#1a1a1a] p-5 rounded-lg border border-gray-800">
                          <ul className="space-y-3">
                            {item.majorBusiness.map((biz, idx) => (
                              <li key={idx} className="text-gray-300">
                                {biz}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 공통 고객산업 */}
          <div className="bg-[#222] p-8 rounded-2xl border border-gray-700 text-center">
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-blue-400">
              주요 고객 산업 (Client Industries)
            </h4>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              토목·건설 등 인프라산업, 석유화학·공장·제철·시멘트 등 중후장대 플랜트산업,<br className="hidden md:block"/>
              조선업, 에너지산업, 해운·항만·물류산업
            </p>
          </div>
        </section>


        {/* ========================================================================
            SECTION 2: Corporate Philosophy
           ======================================================================== */}
        <section className="mb-32 pt-16 border-t border-gray-800">
          <div className="text-center mb-16">
            <span className="block text-blue-500 font-bold text-sm tracking-widest mb-3 uppercase">
              Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
              Corporate Philosophy
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              일성크레인이 지키고자 하는 4가지 핵심 가치입니다.<br/>
              투명하고 안전한 경영을 통해 지속 가능한 미래를 만듭니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophies.map((item, index) => (
              <div 
                key={index}
                className={`bg-[#222] p-8 rounded-2xl border ${item.borderColor} hover:bg-[#2a2a2a] transition-all duration-300 group`}
              >
                <div className="flex items-start gap-6">
                  <div className={`shrink-0 w-16 h-16 rounded-xl bg-[#1a1a1a] flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                      {item.title}
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wider opacity-60">
                        {item.eng}
                      </span>
                    </h3>
                    <div className="w-10 h-1 bg-gray-700 rounded-full mb-4 mt-2 group-hover:bg-blue-600 transition-colors"></div>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ========================================================================
            SECTION 3: Corporate Identity (CI) - [신규 통합]
           ======================================================================== */}
        <section className="pt-16 border-t border-gray-800">
          <div className="text-center mb-16">
            <span className="block text-blue-500 font-bold text-sm tracking-widest mb-3 uppercase">
              Corporate Identity
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-white">
              CI 소개
            </h2>
            
            <div className="text-gray-300 leading-relaxed text-lg max-w-3xl mx-auto space-y-2">
              <p>
                일성크레인의 CI는 <span className="text-white font-bold">‘신뢰(Trust)’</span>와 <span className="text-white font-bold">‘연결(Connection)’</span>을 모티브로 하여,<br className="hidden md:block"/>
                고객과 함께 성장하고자 하는 굳건한 의지를 형상화했습니다.
              </p>
              <p className="text-gray-400 text-base mt-4 font-light">
                굵고 단단한 서체는 중장비 산업의 핵심 가치인 <strong>안전성</strong>을 상징하며,<br className="hidden md:block"/>
                진취적인 <strong>블루(Blue)</strong> 컬러는 대한민국을 넘어 글로벌 리딩 기업으로 도약하는<br className="hidden md:block"/>
                일성크레인의 혁신적인 미래 비전을 담고 있습니다.
              </p>
            </div>
          </div>

          {/* 로고 비주얼 영역 (Grid Background) */}
          <div className="bg-white rounded-2xl p-8 md:p-16 mb-12 shadow-2xl relative overflow-hidden">
            {/* 모눈종이 배경 효과 */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md mb-4 flex items-center justify-center">
                <Image
                  src="/images/about/ci_logo.png" 
                  alt="일성크레인 로고"
                  width={400}
                  height={160}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 컬러 시스템 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#222] p-8 rounded-2xl border border-gray-800 flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#00427A] shadow-lg shrink-0 border-4 border-[#1a1a1a]"></div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">Ilseong Blue</h4>
                <p className="text-gray-400 text-sm mb-2">Main Color</p>
                <p className="text-blue-400 font-mono text-sm">#00427A</p>
                <p className="text-gray-500 text-xs mt-1">C100 M80 Y10 K0</p>
              </div>
            </div>
            <div className="bg-[#222] p-8 rounded-2xl border border-gray-800 flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#002845] shadow-lg shrink-0 border-4 border-[#1a1a1a]"></div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">Deep Navy</h4>
                <p className="text-gray-400 text-sm mb-2">Sub Color</p>
                <p className="text-blue-400 font-mono text-sm">#002845</p>
                <p className="text-gray-500 text-xs mt-1">C100 M80 Y40 K40</p>
              </div>
            </div>
          </div>

          {/* 다운로드 버튼 */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/images/about/ci_logo.ai" 
              download="ci_logo.ai"
              className="flex items-center justify-center px-8 py-4 bg-[#00427A] hover:bg-[#003366] text-white rounded-lg transition-all duration-300 shadow-lg group"
            >
              <span className="font-bold mr-3">AI 다운로드</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-y-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3.375-3.375M12 12.75l3.375-3.375M12 12.75V3" />
              </svg>
            </a>
            <a 
              href="/images/about/ci_logos.png" 
              download="ci_logos.png"
              className="flex items-center justify-center px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 shadow-lg group"
            >
              <span className="font-bold mr-3">PNG 다운로드</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-y-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3.375-3.375M12 12.75l3.375-3.375M12 12.75V3" />
              </svg>
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}