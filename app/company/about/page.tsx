'use client';

import Image from 'next/image';

export default function CompanyAboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      {/* 배경 그리드 효과 (연혁 페이지와 동일) */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">

        {/* ==================================================================
            SECTION 1: CEO Message (인사말)
        ================================================================== */}
        <section className="mb-40">
          
          {/* 헤더 영역 */}
          <div className="text-center mb-20">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest mb-4 uppercase">
              CEO Message
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                인사말
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* 1-1. CEO 이미지 및 타이틀 영역 (Left Column) */}
            <div className="lg:col-span-5 relative group">
              {/* 배경 Glow 효과 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
              
              <div className="relative z-10 text-center lg:text-left">
                {/* 이미지 프레임 */}
                <div className="relative inline-block rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/images/about/ceo.png"
                    alt="CEO 박철민"
                    width={500}
                    height={600}
                    className="object-cover w-full h-auto max-w-[400px] lg:max-w-full"
                    priority
                  />
                  {/* 하단 그라데이션 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
                  
                  {/* 이미지 내부 텍스트 */}
                  <div className="absolute bottom-8 left-8 text-left">
                    <span className="block text-blue-400 font-bold text-sm tracking-widest mb-1">CEO</span>
                    <h2 className="text-4xl font-black text-white leading-none">
                      박 철 민
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* 1-2. 메시지 텍스트 영역 (Right Column) */}
            <div className="lg:col-span-7">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-md relative overflow-hidden">
                {/* 장식용 따옴표 */}
                <div className="absolute top-8 left-8 text-blue-500/10 text-9xl font-serif leading-none select-none">“</div>

                <div className="relative z-10 space-y-6 text-gray-300 leading-relaxed text-lg font-light tracking-wide break-keep">
                  <p className="text-2xl text-white font-bold mb-8">
                    안녕하십니까.<br />
                    일성크레인을 찾아주신 여러분께 깊은 감사의 인사를 드립니다.
                  </p>
                  <p>
                    1992년 작은 25톤 하이드로 크레인 한 대로 시작한 일성크레인은<br className="hidden md:block"/>
                    30여년 동안 대한민국 산업의 성장과 함께 호흡하며 고객 여러분의 신뢰를 가장 값진 자산으로 삼아 오늘에 이르렀습니다.
                  </p>
                  <p>
                    이제 우리는 또 한 번의 과감한 도전과 도약을 시작합니다.<br className="hidden md:block"/>
                    급변하는 산업 환경 속에서 SOC인프라, 플랜트, 풍력설치 등 기존 장비 임대 사업을 넘어 조선해양, 물류항만 및 장비 엔지니어링과 컨설팅부문까지 강화해 나갈 예정이며,<br className="hidden md:block"/>
                    장비운영의 경험과 전문성을 기반으로 육·해상 풍력 T&I 영역까지 사업을 확장하여 대한민국 리프팅 산업의 새로운 이정표를 세우고자 합니다.
                  </p>
                  <p>
                    특히 에너지 전환 시대에 맞춰 추진 중인 육·해상 풍력T&I 부문의 전략적 제휴는<br className="hidden md:block"/>
                    일성크레인의 미래를 여는 또 하나의 중요한 발걸음입니다. 고객의 수요에 적극이고 신속하게 대응하기 위하여 전국적 장비 네트워크를 구축하고 최첨단 자동화 리프팅 기술과 시뮬레이션 역량을 바탕으로 고객이 기대하는 수준을 넘어서는 Total Heavy Lift & Wind T&I 전문기업으로 성장하겠습니다.
                  </p>
                  <p>
                    이 모든 여정의 중심에는 언제나 고객과의 신뢰, 그리고 더 나은 미래를 향한 우리의 의지가 있습니다. 앞으로도 일성크레인은 대한민국을 넘어 글로벌 시장에서도 인정받는<br className="hidden md:block"/>
                    기술력과 책임감을 갖춘 기업으로 정직하게, 묵묵히, 그러나 흔들림 없이 앞으로 나아가겠습니다.
                  </p>
                  <p className="font-medium text-white">
                    여러분의 변함없는 성원에 깊이 감사드리며, 늘 함께 성장하는 든든한 파트너가 될 것을 약속드립니다.
                  </p>
                  <p>
                    감사합니다.
                  </p>
                  
                  <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-end gap-4">
                    <div className="text-right">
                      <span className="block text-sm text-gray-500 mb-1">일성크레인 주식회사 대표이사</span>
                      <span className="text-xl text-white font-bold font-serif">박 철 민</span>
                    </div>
                    {/* 서명 이미지가 있다면 여기에 추가 가능 */}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ==================================================================
            SECTION 2: Company Overview (회사개요)
        ================================================================== */}
        <section className="pt-20 border-t border-white/10">
          
          <div className="text-center mb-20">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest mb-4 uppercase">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
              회사개요
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              고객의 신뢰에 부응하는 대한민국 대표 중장비 솔루션 기업
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            
            {/* 2-1. 개요 텍스트 (Left) */}
            <div>
              <div className="sticky top-32">
                <h3 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-6 leading-tight">
                  국내 최대 규모의<br />
                  <span className="text-blue-500">중장비 임대 전문 기업</span>
                </h3>
                
                <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light tracking-wide break-keep">
                  <p>
                    일성크레인은 2020년 2월 13일 설립 이후, 풍력·플랜트 설치사업 및 장치산업 분야를 중심으로 성장해온 국내 최대 규모의 중장비 임대 전문 기업입니다.
                  </p>
                  <p>
                    다양한 산업 현장에서 쌓아온 실행 경험과 전문 인력을 기반으로 복잡하고 대형화된 건설·설치 프로젝트를 성공적으로 수행해왔으며, 국내 중장비 업계를 선도해 왔다는 자부심을 가지고 있습니다.
                  </p>
                  <p>
                    앞으로도 일성크레인은 축적된 기술력과 안정적인 운영 시스템을 토대로 고객의 신뢰에 부응하는 대한민국 대표 중장비 솔루션 기업으로 성장해 나가겠습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 2-2. 정보 테이블 - Modern Bento Grid Style (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Full Width Card */}
              <div className="md:col-span-2 bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <p className="text-xs text-blue-400 font-bold uppercase mb-2">Company Name</p>
                <p className="text-xl text-white font-bold">일성크레인(주)</p>
              </div>

              {/* Half Cards */}
              <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Establishment</p>
                <p className="text-lg text-white">2020년 2월 13일</p>
              </div>
              <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">CEO</p>
                <p className="text-lg text-white">박 철 민</p>
              </div>

              {/* Address Card (Full) */}
              <div className="md:col-span-2 bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase mb-2">Headquarter</p>
                    <p className="text-base text-gray-300">경기도 평택시 고덕갈평6길 25, 813호</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase mb-2">Factory & Office</p>
                    <p className="text-base text-gray-300">충청북도 음성군 맹동면 초금로 288</p>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="md:col-span-2 bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Main Business</p>
                <p className="text-lg text-white">건설기계 및 중장비 임대업</p>
              </div>

              <div className="md:col-span-2 bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Business Fields</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['풍력', '철골', 'PC', '플랜트', '조선', '건설', '교량'].map((field) => (
                    <span key={field} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Employees</p>
                <p className="text-lg text-white">20명</p>
              </div>
              <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Market</p>
                <p className="text-lg text-white">대한민국</p>
              </div>

            </div>
          </div>
        </section>

      </div>
    </main>
  );
}