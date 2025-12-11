'use client';

import Image from 'next/image';

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
  const getTooltipClass = (pos: string) => {
    const baseClass = "absolute bg-black/90 backdrop-blur-md px-3 py-2 rounded-lg border border-gray-700 whitespace-nowrap opacity-100 z-20 pointer-events-none shadow-xl flex flex-col items-center justify-center hidden lg:flex";
    
    switch (pos) {
      case 'left': return `${baseClass} right-9 top-1/2 -translate-y-1/2`;
      case 'right': return `${baseClass} left-9 top-1/2 -translate-y-1/2`;
      case 'top': return `${baseClass} bottom-9 left-1/2 -translate-x-1/2`;
      case 'bottom': return `${baseClass} top-9 left-1/2 -translate-x-1/2`;
      default: return `${baseClass} left-9 top-1/2 -translate-y-1/2`;
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      {/* 배경 그리드 효과 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24 max-w-7xl">
        
        {/* 헤더 영역 */}
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest mb-4 uppercase">
            Local Network
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
              네트워크
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            전국 주요 거점을 연결하여 <span className="text-white font-medium">신속하고 효율적인</span> 서비스를 제공합니다.
          </p>
        </div>

        {/* 지도 영역 - 모바일에서 숨김 */}
        <div className="hidden md:block w-full max-w-6xl mx-auto bg-[#222] rounded-3xl border border-gray-800 shadow-2xl overflow-hidden mb-16 py-12 md:py-20">
          
          <div className="relative w-full max-w-[700px] h-[700px] md:h-[900px] mx-auto">
            
            <Image
              src="/images/about/map_dot.svg"
              alt="대한민국 네트워크 지도"
              fill
              className="object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.5)]"
              priority
            />

            {/* 네트워크 점 (Dots) */}
            {networks.map((site, index) => (
              <div 
                key={site.id}
                className="absolute w-8 h-8 flex items-center justify-center group z-10 hover:z-30 cursor-pointer"
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
                  ${site.isMain ? 'bg-red-500 animation-duration-2s' : 'bg-blue-400 animation-duration-3s'}`} 
                />
                
                {/* Solid Dot */}
                <div className={`relative w-4 h-4 rounded-full shadow-lg border-[2px] border-[#1a1a1a] transition-transform duration-300 group-hover:scale-125
                  ${site.isMain 
                    ? 'bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.6)]' 
                    : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                  }`}
                />

                {/* Tooltip */}
                <div className={getTooltipClass(site.tooltipPos)}>
                  <span className={`font-bold text-base tracking-wide
                    ${site.isMain ? 'text-red-400' : 'text-blue-400'}`}>
                    {site.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 리스트 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {networks.map((site) => (
            <div 
              key={site.id} 
              className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 flex items-center gap-4 group hover:-translate-y-1 hover:shadow-lg
                ${site.isMain 
                  ? 'bg-white/5 border-red-500/30 hover:border-red-500/50 hover:bg-white/8' 
                  : 'bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-white/8'}`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold shadow-lg transition-all duration-300 group-hover:scale-110
                ${site.isMain ? 'bg-red-500/20 text-red-400 border border-red-500/30 group-hover:bg-red-500/30 group-hover:border-red-500/50' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:bg-blue-500/30 group-hover:border-blue-500/50'}`}>
                {site.id}
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-0.5 ${site.isMain ? 'text-red-300' : 'text-white'}`}>
                  {site.name}
                </h3>
              </div>
            </div>
          ))}
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
  );
}