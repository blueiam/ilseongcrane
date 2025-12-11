'use client';

import { useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------
// 1. 애니메이션 훅
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
// 2. 위치 데이터 정의
// ----------------------------------------------------------------------
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
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      {/* 배경 그리드 효과 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
        
        {/* 1. 헤더 */}
        {(() => {
          const { ref, isVisible } = useScrollAnimation();
          return (
            <div 
              ref={ref}
              className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest mb-4 uppercase animate-fade-in">
                Location
              </span>
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                  찾아오시는 길
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                일성크레인의 주요 사업장 위치를 안내해 드립니다.
              </p>
            </div>
          );
        })()}

        {/* 2. 탭 버튼 */}
        {(() => {
          const { ref, isVisible } = useScrollAnimation();
          return (
            <div 
              ref={ref}
              className={`flex justify-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="inline-flex bg-white/5 backdrop-blur-sm p-1 rounded-xl border border-white/10">
                {locations.map((loc, index) => (
                  <button
                    key={loc.id}
                    onClick={() => setActiveTab(index)}
                    className={`px-8 py-3 rounded-lg text-sm md:text-base font-bold transition-all duration-300
                      ${activeTab === index 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })()}

        {/* 3. 상세 정보 및 지도 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* 좌측: 텍스트 정보 카드 */}
          {(() => {
            const { ref, isVisible } = useScrollAnimation();
            return (
              <div 
                ref={ref}
                className={`bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl backdrop-blur-sm hover:bg-white/8 hover:border-blue-500/30 transition-all duration-300 h-full ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">
                  {locations[activeTab].name}
                </h3>
                
                <div className="space-y-8">
                  {/* 주소 */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-blue-400 mb-1 font-bold uppercase tracking-wider">ADDRESS</p>
                      <p className="text-base text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                        {locations[activeTab].address}
                      </p>
                    </div>
                  </div>

                  {/* 연락처 */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-blue-400 mb-1 font-bold uppercase tracking-wider">CONTACT</p>
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors"><span className="text-gray-500 w-12 inline-block">TEL.</span> {locations[activeTab].tel}</p>
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors"><span className="text-gray-500 w-12 inline-block">FAX.</span> {locations[activeTab].fax}</p>
                    </div>
                  </div>

                  {/* 영업시간 */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-blue-400 mb-1 font-bold uppercase tracking-wider">BUSINESS HOURS</p>
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{locations[activeTab].hours}</p>
                    </div>
                  </div>

                  {/* 이메일 */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-blue-400 mb-1 font-bold uppercase tracking-wider">E-MAIL</p>
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{locations[activeTab].email}</p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })()}

          {/* 우측: 구글 지도 (Embed Iframe) */}
          {(() => {
            const { ref, isVisible } = useScrollAnimation();
            return (
              <div 
                ref={ref}
                className={`lg:col-span-2 h-[400px] lg:h-[600px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 relative ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* 지도 로딩 중일 때 표시될 스켈레톤 UI */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/50 z-0">
                  <span className="text-gray-400">Loading Map...</span>
                </div>
                
                {/* Google Map Iframe */}
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(locations[activeTab].mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="relative z-10"
                ></iframe>
              </div>
            );
          })()}

        </div>
      </div>
    </main>
  );
}