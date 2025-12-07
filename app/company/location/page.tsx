'use client';

import { useState } from 'react';

// 위치 데이터 정의
const locations = [
  {
    id: 'headquarters',
    name: '평택 본사 (Headquarters)',
    address: '경기도 평택시 고덕갈평6길 25, 813호',
    mapQuery: '경기도 평택시 고덕갈평6길 25', 
    tel: '031-683-4235',
    fax: '031-683-4236',
    email: 'ilseongcrane@naver.com',
    hours: '평일 08:00 ~ 18:00' // 영업시간 추가
  },
  {
    id: 'eumseong',
    name: '주기장 (Depot)', // 요청에 따라 '주기장'으로 명칭 변경됨 (이전 코드 반영)
    address: '충청북도 음성군 맹동면 초금로 288', 
    mapQuery: '충청북도 음성군 맹동면 초금로 288',
    tel: '031-683-4235',
    fax: '031-683-4236',
    email: 'ilseongcrane@naver.com',
    hours: '평일 08:00 ~ 18:00' // 영업시간 추가
  }
];

export default function LocationPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* 1. 헤더 */}
        <div className="text-center mb-16">
          <span className="block text-blue-500 font-bold text-sm tracking-widest mb-3 uppercase">
            Location
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            찾아오시는 길
          </h1>
          <p className="text-gray-400 text-lg">
            일성크레인의 주요 사업장 위치를 안내해 드립니다.
          </p>
        </div>

        {/* 2. 탭 버튼 */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#222] p-1 rounded-xl border border-gray-700">
            {locations.map((loc, index) => (
              <button
                key={loc.id}
                onClick={() => setActiveTab(index)}
                className={`px-8 py-3 rounded-lg text-sm md:text-base font-bold transition-all duration-300
                  ${activeTab === index 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-[#333]'
                  }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 상세 정보 및 지도 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* 좌측: 텍스트 정보 카드 */}
          <div className="bg-[#222] border border-gray-700 rounded-2xl p-8 shadow-xl h-full">
            <h3 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
              {locations[activeTab].name}
            </h3>
            
            <div className="space-y-8">
              {/* 주소 */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-gray-700 group-hover:border-blue-500 transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-bold">ADDRESS</p>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {locations[activeTab].address}
                  </p>
                </div>
              </div>

              {/* 연락처 */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-gray-700 group-hover:border-blue-500 transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-bold">CONTACT</p>
                  <p className="text-gray-300"><span className="text-gray-500 w-12 inline-block">TEL.</span> {locations[activeTab].tel}</p>
                  <p className="text-gray-300"><span className="text-gray-500 w-12 inline-block">FAX.</span> {locations[activeTab].fax}</p>
                </div>
              </div>

              {/* 영업시간 (신규 추가) */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-gray-700 group-hover:border-blue-500 transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-bold">BUSINESS HOURS</p>
                  <p className="text-gray-300">{locations[activeTab].hours}</p>
                </div>
              </div>

              {/* 이메일 */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-gray-700 group-hover:border-blue-500 transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-bold">E-MAIL</p>
                  <p className="text-gray-300">{locations[activeTab].email}</p>
                </div>
              </div>

            </div>
          </div>

          {/* 우측: 구글 지도 (Embed Iframe) */}
          <div className="lg:col-span-2 h-[400px] lg:h-[600px] bg-[#222] rounded-2xl overflow-hidden shadow-xl border border-gray-700 relative">
            {/* 지도 로딩 중일 때 표시될 스켈레톤 UI */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-0">
              <span className="text-gray-500">Loading Map...</span>
            </div>
            
            {/* Google Map Iframe */}
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }} // [수정됨] 흑백 필터(grayscale) 제거 -> 컬러 지도
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(locations[activeTab].mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="relative z-10"
            ></iframe>
          </div>

        </div>
      </div>
    </main>
  );
}