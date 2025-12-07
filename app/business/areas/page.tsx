import Image from 'next/image';

export default function BusinessAreasPage() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. 상단 타이틀 & 다이어그램 섹션 */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Total Lifting Solution Service/Provider
          </h1>
          <p className="text-xl text-gray-600 font-medium">Business Field</p>
        </div>

        {/* 다이어그램 (Grid Layout) */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold text-white text-lg md:text-xl text-center shadow-sm p-4 rounded-3xl bg-gray-50/50">
            
            {/* --- Central Box (Main Topic) --- */}
            {/* 모바일: 1번 순서 / PC: 중앙 */}
            <div className="order-first md:order-none md:col-span-2 relative bg-gray-100 border-4 border-white text-gray-700 p-8 rounded-lg shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)] flex items-center justify-center min-h-[140px] z-10">
              <span className="text-2xl md:text-3xl font-extrabold text-gray-500 tracking-tight">
                Total Lifting Solution Service/Provider
              </span>
              
              {/* PC용 우측 화살표 (-> Logistics) */}
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-gray-300 md:block hidden"></div>

              {/* [모바일용] 하단 화살표 (↓) */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-gray-200 block md:hidden"></div>
            </div>


            {/* --- Top Row --- */}
            
            {/* Civil & Construction (Yellow) */}
            <div className="relative bg-gradient-to-br from-yellow-500 to-yellow-600 p-8 rounded-lg shadow-md flex items-center justify-center min-h-[140px]">
              Civil & Construction Field
              
              {/* PC용 하단 화살표 */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-yellow-600 md:block hidden"></div>
              
              {/* 모바일용 하단 화살표 */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-yellow-600 block md:hidden"></div>
            </div>

            {/* Factor & Plant (Orange) */}
            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-lg shadow-md flex items-center justify-center min-h-[140px]">
              Factor & Plant Field
              
              {/* PC용 하단 화살표 */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-orange-600 md:block hidden"></div>
              
              {/* 모바일용 하단 화살표 */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-orange-600 block md:hidden"></div>
            </div>

            {/* Power station (Blue) */}
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-lg shadow-md flex items-center justify-center min-h-[140px]">
              Power station &<br/>On/offshore<br/>Windpower Field
              
              {/* PC용 좌측 화살표 (기존 유지) */}
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[12px] border-r-blue-600 md:block hidden"></div>
              
              {/* 모바일용 하단 화살표 */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-blue-600 block md:hidden"></div>
            </div>


            {/* --- Middle Row (나머지) --- */}
            
            {/* Logistics (Green) */}
            <div className="relative bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-lg shadow-md flex items-center justify-center min-h-[140px]">
              Logistics & Port Field
              
              {/* PC용 좌측 화살표 (기존 유지) */}
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[12px] border-r-green-600 md:block hidden"></div>
              
              {/* 모바일용 하단 화살표 */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-green-600 block md:hidden"></div>
            </div>


            {/* --- Bottom Row --- */}

            {/* Engineering (Teal) */}
            <div className="relative bg-gradient-to-br from-teal-600 to-teal-700 p-8 rounded-lg shadow-md flex items-center justify-center min-h-[140px]">
              Engineering &<br/>Consulting Field
              
              {/* PC용 우측 화살표 (-> Specialty) */}
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-teal-600 md:block hidden"></div>
              
              {/* 모바일용 하단 화살표 */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-teal-600 block md:hidden"></div>
            </div>

            {/* Specialty (Purple) */}
            <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 p-8 rounded-lg shadow-md flex items-center justify-center min-h-[140px]">
              Specialty Field
              
              {/* PC용 우측 화살표 (-> Shipbuilding) */}
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-purple-700 md:block hidden"></div>
              
              {/* 모바일용 하단 화살표 */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-purple-700 block md:hidden"></div>
            </div>

            {/* Shipbuilding (Red) */}
            <div className="relative bg-gradient-to-br from-red-600 to-red-800 p-8 rounded-lg shadow-md flex items-center justify-center min-h-[140px]">
              Shipbuilding &<br/>Offshore Field
              
              {/* [삭제됨] PC용 화살표 삭제 */}
              {/* [모바일용] 화살표 없음 */}
            </div>

          </div>
        </div>
      </section>


      {/* 2. 하단 상세 이미지 섹션 (유지) */}
      <section className="w-full">
        <div className="relative w-full h-[60vh] min-h-[500px] group overflow-hidden">
          <Image
            src="/images/business/construction02.jpg"
            alt="토목건설"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 container mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">토목건설</h2>
            <p className="text-xl md:text-2xl text-gray-100 font-medium drop-shadow-md max-w-2xl">교량, 대형지붕 골조 설치, PC빔, 조립식 주차장 공사 등</p>
          </div>
        </div>

        <div className="relative w-full h-[60vh] min-h-[500px] group overflow-hidden">
          <Image
            src="/images/business/factor03.jpg"
            alt="공장플랜트"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 container mx-auto text-right md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">공장플랜트</h2>
            <p className="text-xl md:text-2xl text-gray-100 font-medium drop-shadow-md">각종 타워 설치, 공장 설비, 철골 구조물 및 탱크류</p>
          </div>
        </div>

        <div className="relative w-full h-[60vh] min-h-[500px] group overflow-hidden">
          <Image
            src="/images/business/windpower04.jpg"
            alt="풍력에너지"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 container mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">풍력에너지</h2>
            <p className="text-xl md:text-2xl text-gray-100 font-medium drop-shadow-md">육상/해상 풍력 발전소, 자켓/설치용 T&I</p>
          </div>
        </div>
      </section>
    </main>
  );
}