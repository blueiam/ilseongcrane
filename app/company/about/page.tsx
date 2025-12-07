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
          <div className="max-w-3xl">
            <span className="block text-gray-400 font-bold text-sm tracking-wider mb-2">인사말</span>
            <h3 className="text-5xl md:text-6xl font-extrabold mb-12 text-white tracking-tight">
              CEO Message
            </h3>
            
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light tracking-wide">
              <p>안녕하십니까.</p>
              <p>
                일성크레인 주식회사를 찾아주신 모든 분들께 깊은 감사의 말씀을 드립니다.<br />
                일성크레인은 중장비 임대 및 건설 크레인 설치·유지보수에 특화된 전문 기업으로,
              </p>
              <p>
                <strong className="text-white">"안전이 최우선인 현장 구현"</strong>, <strong className="text-white">"기술과 신뢰로 고객과 함께 성장"</strong>이라는 두 가지 가치 아래<br className="hidden md:block"/>
                대한민국 건설 산업의 새로운 기준을 만들어가고 있습니다.
              </p>
              <p>
                저희는 단순히 장비를 공급하는 회사가 아닙니다.<br />
                현장의 안전·효율·완성도를 함께 설계하는 파트너로서,<br />
                축적된 경험과 기술력, 체계적인 품질 관리 시스템을 기반으로<br />
                고객이 안심하고 맡길 수 있는 믿음직한 Total Crane Solution Provider가<br className="hidden md:block"/>
                되기 위해 매일 노력하고 있습니다.
              </p>
              <p>
                일성크레인이 존재하는 이유는 분명합니다.<br />
                <span className="text-gray-200">"안전하고 효율적인 건설 환경을 조성함으로써 산업과 사회에 기여하는 것."</span><br />
                이 설립 목적을 바탕으로 변화하는 산업 환경 속에서도<br />
                초심을 잃지 않는 원칙, 도전을 두려워하지 않는 자세로<br />
                건설 현장의 안정성과 생산성을 높이는 데 앞장서겠습니다.
              </p>
              <p>
                앞으로도 일성크레인은 젊고 혁신적인 사고로<br />
                고객의 기대를 넘어서는 솔루션을 제공하며,<br />
                대한민국 건설 산업의 미래를 선도하는 기업으로 성장하겠습니다.
              </p>
              <p>
                여러분의 관심과 신뢰가 저희에게 큰 힘이 됩니다.<br />
                감사합니다.
              </p>
              <p className="mt-12 text-white font-medium">
                일성크레인 주식회사 임직원 일동
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