'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// [수정 완료] 평택/음성 위치 재조정
const networks = [
  // 서울: 기존 유지
  { id: 1, name: '서울 지점', type: 'Branch', top: '23%', left: '35%', isMain: false, tooltipPos: 'right' },
  
  // 평택: 더 위로 이동 (34.5% -> 29%)
  // 서울(23%)과 가까워졌지만 아래쪽에 위치합니다.
  { id: 2, name: '평택 본사', type: 'Headquarters', top: '29%', left: '32%', isMain: true, tooltipPos: 'left' },
  
  // 음성: 평택(29%)보다 "살짝 아래"로 설정 (38.5% -> 33%)
  // 평택과 비슷한 위도대이지만 약간 아래, 내륙 쪽입니다.
  { id: 3, name: '음성 주기장', type: 'Depot', top: '33%', left: '44%', isMain: true, tooltipPos: 'right' },
  
  // 동해: 레이블을 오른쪽으로 변경
  { id: 4, name: '동해 지점', type: 'Branch', top: '29.5%', left: '71.5%', isMain: false, tooltipPos: 'right' },
  
  // 호남(광주): 기존 유지
  { id: 5, name: '호남 지점', type: 'Branch', top: '62%', left: '28%', isMain: false, tooltipPos: 'right' },
];

export default function NetworkPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setImageZoomed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getTooltipClass = (pos: string) => {
    const baseClass = "absolute bg-white backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 whitespace-nowrap opacity-100 z-20 pointer-events-none shadow-xl flex flex-col items-center justify-center hidden lg:flex";
    
    switch (pos) {
      case 'left': return `${baseClass} right-9 top-1/2 -translate-y-1/2`;
      case 'right': return `${baseClass} left-9 top-1/2 -translate-y-1/2`;
      case 'top': return `${baseClass} bottom-9 left-1/2 -translate-x-1/2`;
      case 'bottom': return `${baseClass} top-9 left-1/2 -translate-x-1/2`;
      default: return `${baseClass} left-9 top-1/2 -translate-y-1/2`;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[450px] lg:h-[500px] w-full overflow-hidden z-30">
        {/* Background Image */}
        <Image
          src="/hero/network.jpg"
          alt="네트워크"
          fill
          className={`object-cover object-center transition-transform duration-[10000ms] ease-out ${
            imageZoomed ? 'scale-100' : 'scale-125'
          }`}
          priority
          quality={100}
        />

        {/* Title Content */}
        <div className="relative flex h-full items-center justify-center z-20">
          <h1
            className="text-7xl font-bold text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            style={{ color: '#FFFFFF', textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            네트워크
          </h1>
        </div>
      </div>

    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* 배경 패턴 (은은한 그리드) */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24 max-w-7xl">
        
        {/* 헤더 영역 */}
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest mb-4 uppercase">
            Local Network
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">
            네트워크
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light">
            전국 주요 거점을 연결하여 <span className="text-slate-900 font-medium">신속하고 효율적인</span> 서비스를 제공합니다.
          </p>
        </div>

        {/* 지도 영역 */}
        <div className="w-full max-w-6xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 shadow-lg overflow-hidden mb-16 py-6 md:py-12 lg:py-20">
          
          <div className="relative w-full max-w-[700px] h-[400px] md:h-[600px] lg:h-[900px] mx-auto">
            
            <Image
              src="/images/about/map_dot.svg"
              alt="대한민국 네트워크 지도"
              fill
              className="object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.5)]"
              priority
            />

            {/* 네트워크 점 (Dots) */}
            {networks.map((site, index) => {
              const isEumseong = site.id === 3; // 음성 주기장
              return (
                <div 
                  key={site.id}
                  className="absolute w-6 h-6 md:w-8 md:h-8 flex items-center justify-center group z-10 hover:z-30 cursor-pointer"
                  style={{ 
                    top: site.top, 
                    left: site.left,
                    transform: 'translate(-50%, -50%)',
                    animation: `dropIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute w-full h-full rounded-full animate-ping opacity-60
                    ${isEumseong 
                      ? 'bg-purple-500 animation-duration-2s' 
                      : site.isMain 
                        ? 'bg-red-500 animation-duration-2s' 
                        : 'bg-blue-400 animation-duration-3s'}`} 
                  />
                  
                  {/* Solid Dot */}
                  <div className={`relative w-3 h-3 md:w-4 md:h-4 rounded-full shadow-lg border-[2px] border-[#1a1a1a] transition-transform duration-300 group-hover:scale-125
                    ${isEumseong
                      ? 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                      : site.isMain 
                        ? 'bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.6)]' 
                        : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                    }`}
                  />

                  {/* Tooltip */}
                  <div className={getTooltipClass(site.tooltipPos)}>
                    <span className={`font-bold text-sm md:text-base tracking-wide
                      ${isEumseong 
                        ? 'text-purple-400' 
                        : site.isMain 
                          ? 'text-red-400' 
                          : 'text-blue-400'}`}>
                      {site.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 리스트 영역 - 모바일 전용 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
          {networks.map((site) => {
            const isEumseong = site.id === 3; // 음성 주기장
            return (
              <div 
                key={site.id} 
                className={`p-6 rounded-2xl border transition-all duration-300 flex items-center gap-4 group hover:-translate-y-1 hover:shadow-lg
                  ${isEumseong
                    ? 'bg-white border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                    : site.isMain 
                      ? 'bg-white border-red-200 hover:border-red-400 hover:bg-red-50' 
                      : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50'}`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold shadow-lg transition-all duration-300 group-hover:scale-110
                  ${isEumseong
                    ? 'bg-purple-100 text-purple-600 border border-purple-300 group-hover:bg-purple-200 group-hover:border-purple-400'
                    : site.isMain 
                      ? 'bg-red-100 text-red-600 border border-red-300 group-hover:bg-red-200 group-hover:border-red-400' 
                      : 'bg-blue-100 text-blue-600 border border-blue-300 group-hover:bg-blue-200 group-hover:border-blue-400'}`}>
                  {site.id}
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-0.5 ${
                    isEumseong 
                      ? 'text-purple-600' 
                      : 'text-slate-900'
                  }`}>
                    {site.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style jsx global>{`
        @keyframes dropIn {
          0% {
            opacity: 0;
            margin-top: -40px;
          }
          100% {
            opacity: 1;
            margin-top: 0;
          }
        }
        .animation-duration-2s { animation-duration: 2s; }
        .animation-duration-3s { animation-duration: 3s; }
      `}</style>
    </main>
    </>
  );
}