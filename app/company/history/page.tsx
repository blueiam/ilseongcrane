'use client';

// 1. 연혁 데이터
const historyData = [
  {
    year: '2024',
    events: [
      { month: '03', desc: '평택 삼성반도체 P4 현장 장비 투입' },
      { month: '01', desc: 'ISO 45001 안전보건경영시스템 인증 획득' },
    ]
  },
  {
    year: '2023',
    events: [
      { month: '11', desc: '음성 주기장 확장 이전' },
      { month: '07', desc: '800톤급 크롤러 크레인(SANY SCE8000A) 도입' },
      { month: '05', desc: '풍력 발전소 유지보수 전담팀 신설' },
    ]
  },
  {
    year: '2022',
    events: [
      { month: '12', desc: '연간 매출 100억 달성' },
      { month: '09', desc: 'SK 하이닉스 M16 프로젝트 참여' },
      { month: '04', desc: '기업부설연구소 설립' },
    ]
  },
  {
    year: '2021',
    events: [
      { month: '10', desc: '주식회사 법인 전환' },
      { month: '06', desc: '중장비 임대업 등록' },
    ]
  },
  {
    year: '2020',
    events: [
      { month: '02', desc: '일성크레인 설립' },
    ]
  }
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* ====================================================================
            SECTION 1: 회사연혁 (Company History)
           ==================================================================== */}
        <section className="mb-40">
          <div className="text-center mb-20">
            <span className="block text-blue-500 font-bold text-sm tracking-widest mb-3 uppercase">
              History
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              회사연혁
            </h1>
            <p className="text-gray-400 text-lg">
              일성크레인이 걸어온 도전과 성장의 발자취입니다.
            </p>
          </div>

          <div className="relative border-l-2 border-gray-800 ml-4 md:ml-1/2 space-y-20">
            {historyData.map((item, index) => (
              <div key={index} className="relative flex flex-col md:flex-row gap-8 md:gap-0 group">
                {/* 타임라인 점 */}
                <div className="absolute top-2 left-[-9px] md:left-1/2 md:-ml-[9px] w-4 h-4 rounded-full bg-[#1a1a1a] border-4 border-blue-600 group-hover:bg-blue-600 transition-colors duration-300"></div>
                {/* 연도 */}
                <div className="md:w-1/2 md:pr-16 md:text-right pl-8 md:pl-0">
                  <h3 className="text-5xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">{item.year}</h3>
                </div>
                {/* 상세 내용 */}
                <div className="md:w-1/2 md:pl-16 pl-8">
                  <ul className="space-y-6">
                    {item.events.map((event, idx) => (
                      <li key={idx} className="flex items-start text-lg md:text-xl">
                        <span className="text-blue-400 font-bold mr-4 shrink-0 mt-1">{event.month}.</span>
                        <span className="text-gray-300 font-light leading-relaxed">{event.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ====================================================================
            SECTION 2: 조직도 (Organization Chart)
           ==================================================================== */}
        <section className="pt-20 border-t border-gray-800">
          <div className="text-center mb-20">
            <span className="block text-blue-500 font-bold text-sm tracking-widest mb-3 uppercase">
              Organization
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">
              조직도
            </h2>
            <p className="text-gray-400 text-lg">
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
              <div className="bg-gray-200 text-black font-bold text-xl w-64 py-4 rounded shadow-lg text-center border-2 border-gray-400">
                대 표
              </div>
            </div>
            
            {/* 연결선 (중앙) */}
            <div className="flex justify-center -mt-8 mb-0">
              <div className="h-8 w-px bg-gray-600"></div>
            </div>

            {/* Level 2: 장비사업 & 풍력사업 (Stack) */}
            <div className="space-y-12 relative px-4">
              {/* 왼쪽 전체 연결선 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600 -translate-x-1/2"></div>

              {/* Group 1: 장비사업 */}
              <div className="relative bg-[#222] border border-gray-700 p-6 rounded-xl z-10">
                <div className="bg-white text-black font-bold text-lg py-3 rounded text-center mb-6">
                  장비사업 (CEO)
                </div>
                
                {/* Sub Group: QSHE */}
                <div className="flex justify-end mb-6">
                  <div className="bg-gray-300 text-black font-bold text-sm py-2 px-4 rounded w-auto inline-block">
                    QSHE실 (CSO)
                  </div>
                </div>

                {/* Teams */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['영업팀', '운영팀', '경영지원팀', '해외사업팀'].map((team) => (
                    <div key={team} className="bg-gray-800 text-gray-200 py-2 rounded text-center text-sm border border-gray-600">
                      {team}
                    </div>
                  ))}
                </div>

                {/* Branches */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['서울지점', '평택지점', '호남지점', '동해지점'].map((branch) => (
                    <div key={branch} className="bg-gray-700 text-gray-300 py-2 rounded text-center text-sm border border-gray-600">
                      {branch}
                    </div>
                  ))}
                </div>

                {/* Family Company */}
                <div className="pt-6 border-t border-gray-600">
                  <p className="text-gray-400 text-sm italic mb-3 text-center">Family Company</p>
                  <div className="flex flex-col gap-3">
                    <div className="bg-gray-600 text-white font-bold py-3 rounded shadow text-center border border-gray-500">
                      승원싸앤에스(주)
                    </div>
                    <div className="bg-gray-600 text-white font-bold py-3 rounded shadow text-center border border-gray-500">
                      범한건설중기(주)
                    </div>
                  </div>
                </div>
              </div>

              {/* Group 2: 풍력사업 */}
              <div className="relative bg-[#222] border border-gray-700 p-6 rounded-xl z-10">
                <span className="absolute top-2 right-4 text-xs text-gray-500 italic">Outsourcing</span>
                <div className="bg-white text-black font-bold text-lg py-3 rounded text-center mb-6 border-2 border-dashed border-gray-400">
                  풍력사업 (CEO)
                </div>
                
                <div className="space-y-3">
                  {['기획설계', '물류팀', '장비설치팀'].map((team) => (
                    <div key={team} className="bg-gray-800 text-gray-200 py-2 rounded text-center text-sm border border-gray-600">
                      {team}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>


          {/* ================= Desktop View (Simple Layout) ================= */}
          <div className="hidden lg:block pb-12">
            <div className="max-w-6xl mx-auto space-y-12">
              
              {/* Level 1: 대표 */}
              <div className="flex justify-center">
                <div className="bg-gray-200 text-black font-bold text-xl w-48 py-4 rounded shadow-lg text-center border-2 border-gray-400">
                  대 표
                </div>
              </div>

              {/* Level 2: 장비사업 & 풍력사업 */}
              <div className="grid grid-cols-2 gap-8">
                
                {/* Left Column: 장비사업 */}
                <div className="bg-[#222] border border-gray-700 p-8 rounded-xl">
                  <div className="bg-white text-black font-bold text-lg py-3 rounded text-center mb-6 mt-4">
                    장비사업 (CEO)
                  </div>
                  
                  {/* QSHE실 */}
                  <div className="flex justify-end mb-6">
                    <div className="bg-gray-300 text-black font-bold text-sm py-2 px-4 rounded w-auto inline-block">
                      QSHE실 (CSO)
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {['영업팀', '운영팀', '경영지원팀', '해외사업팀'].map((team) => (
                      <div key={team} className="bg-gray-800 text-gray-200 py-2 rounded text-center text-sm border border-gray-600">
                        {team}
                      </div>
                    ))}
                  </div>

                  {/* Branches */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {['서울지점', '평택지점', '호남지점', '동해지점'].map((branch) => (
                      <div key={branch} className="bg-gray-700 text-gray-300 py-2 rounded text-center text-sm border border-gray-600">
                        {branch}
                      </div>
                    ))}
                  </div>

                  {/* Family Company */}
                  <div className="pt-6 border-t border-gray-600">
                    <p className="text-gray-400 text-sm italic mb-3 text-center">Family Company</p>
                    <div className="flex flex-col gap-3">
                      <div className="bg-gray-600 text-white font-bold px-6 py-3 rounded shadow text-center border border-gray-500">
                        승원싸앤에스(주)
                      </div>
                      <div className="bg-gray-600 text-white font-bold px-6 py-3 rounded shadow text-center border border-gray-500">
                        범한건설중기(주)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: 풍력사업 */}
                <div className="bg-[#222] border border-gray-700 p-8 rounded-xl relative">
                  <span className="absolute top-4 right-6 text-xs text-gray-500 italic">Outsourcing</span>
                  <div className="bg-white text-black font-bold text-lg py-3 rounded text-center mb-6 border-2 border-dashed border-gray-400 mt-4">
                    풍력사업 (CEO)
                  </div>
                  
                  <div className="space-y-3">
                    {['기획설계', '물류팀', '장비설치팀'].map((team) => (
                      <div key={team} className="bg-gray-800 text-gray-200 py-2 rounded text-center text-sm border border-gray-600">
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