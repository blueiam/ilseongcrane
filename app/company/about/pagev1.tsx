import Image from 'next/image';

export default function CompanyAboutPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      
      {/* ==================================================================
          SECTION 1: CEO Message (인사말)
      ================================================================== */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          {/* 1-1. 상단 영역: 이미지와 원이 겹치고, 텍스트가 원 위로 겹침 */}
          <div className="relative flex flex-col md:flex-row items-center justify-center mb-24 min-h-[500px] md:min-h-[600px] group">
            
            {/* 배경 원 (Circle) - 마우스 오버 시 Glow 효과 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-[#2a2a2a] transition-all duration-500 ease-in-out group-hover:bg-[#333] group-hover:shadow-[0_0_60px_rgba(255,255,255,0.1)] z-0"></div>
            
            {/* CEO 이미지 - 우측으로 이동하여 원 위에 겹쳐서 배치 */}
            <div className="relative w-80 h-auto md:w-[400px] z-20 md:translate-x-[15%]">
              <Image
                src="/images/about/ceo.png"
                alt="CEO 박철민"
                width={400}
                height={500}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            
            {/* CEO 타이틀과 About 텍스트 - 원 위로 15% 정도 겹치게 배치 (왼쪽 하단) */}
            <div className="absolute bottom-[15%] left-[5%] md:bottom-[20%] md:left-[10%] text-left z-30">
              {/* About 텍스트 - CEO 바로 위에 파란색으로 */}
              <span className="block text-blue-500 font-bold text-sm tracking-wider mb-2">About</span>
              <h2 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
                CEO<br />
                <span className="text-white">박 철 민</span>
              </h2>
            </div>
          </div>


          {/* 1-2. 하단 메시지 텍스트 영역 */}
          {/* 모바일: 이미지 아래로 자연스럽게 배치됨 */}
          <div className="max-w-4xl">
            <span className="block text-gray-400 font-bold text-sm tracking-wider mb-2">인사말</span>
            <h3 className="text-5xl md:text-6xl font-extrabold mb-12 text-white tracking-tight">
              CEO Message
            </h3>
            
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light tracking-wide">
              <p>안녕하십니까.</p>
              <p>
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
              <p>
                여러분의 변함없는 성원에 깊이 감사드리며, 늘 함께 성장하는 든든한 파트너가 될 것을 약속드립니다.
              </p>
              <p>
                감사합니다.
              </p>
              <p className="mt-12 text-white font-medium">
                일성크레인 주식회사<br />
                대표이사 박철민 드림
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* 구분선 (디자인에 맞춰 여백 조정) */}
      <div className="container mx-auto px-6 max-w-6xl">
        <hr className="border-[#333]" />
      </div>


      {/* ==================================================================
          SECTION 2: Company Overview (회사개요)
      ================================================================== */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* 2-1. 개요 소개글 */}
          <div className="mb-20">
            <span className="block text-gray-400 font-bold text-sm tracking-wider mb-2">회사개요</span>
            <h3 className="text-5xl md:text-6xl font-extrabold mb-10 text-white tracking-tight">
              Company Overview
            </h3>
            
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light max-w-4xl tracking-wide">
              <p>
                일성크레인은 2020년 2월 13일 설립 이후,<br className="hidden md:block" />
                풍력·플랜트 설치사업 및 장치산업 분야를 중심으로 성장해온 국내 최대 규모<br className="hidden md:block" />
                의 중장비 임대 전문 기업입니다.
              </p>
              <p>
                다양한 산업 현장에서 쌓아온 실행 경험과 전문 인력을 기반으로<br className="hidden md:block" />
                복잡하고 대형화된 건설·설치 프로젝트를 성공적으로 수행해왔으며,<br className="hidden md:block" />
                국내 중장비 업계를 선도해 왔다는 자부심을 가지고 있습니다.
              </p>
              <p>
                앞으로도 일성크레인은 축적된 기술력과 안정적인 운영 시스템을 토대로<br className="hidden md:block" />
                고객의 신뢰에 부응하는 대한민국 대표 중장비 솔루션 기업으로 성장해 나가<br className="hidden md:block" />
                겠습니다.
              </p>
            </div>
          </div>

          {/* 2-2. 정보 테이블 (깔끔한 리스트 형태) */}
          <div className="border-t border-[#333] pt-10">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-6 text-lg font-light">
              
              <div className="text-gray-500 font-medium">회 사 명</div>
              <div className="text-gray-300">일성크레인(주)</div>

              <div className="text-gray-500 font-medium">설립 연도</div>
              <div className="text-gray-300">2020년</div>

              <div className="text-gray-500 font-medium">본 사</div>
              <div className="text-gray-300">경기도 평택시 고덕갈평6길 25, 813호</div>

              <div className="text-gray-500 font-medium">음성 사옥/사업소</div>
              <div className="text-gray-300">충청북도 음성군 맹동면 초금로 288</div>

              <div className="text-gray-500 font-medium">주요 사업</div>
              <div className="text-gray-300">건설기계 및 중장비 임대업</div>

              <div className="text-gray-500 font-medium">사업 분야</div>
              <div className="text-gray-300">풍력, 철골, PC, 플랜트, 조선, 건설, 교량 등</div>

              <div className="text-gray-500 font-medium">직원 수</div>
              <div className="text-gray-300">20명</div>

              <div className="text-gray-500 font-medium">주요 시장</div>
              <div className="text-gray-300">한국</div>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
