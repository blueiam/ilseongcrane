'use client';

import { useEffect, useRef, useState } from 'react';
import { Wrench, ArrowRight, RotateCcw } from 'lucide-react';

// ----------------------------------------------------------------------
// 1. 데이터 정의 (파일명 및 확장자 주의)
// ----------------------------------------------------------------------
const processes = [
  {
    step: '01',
    title: 'CARBODY 운송',
    image: '001.png', // 확장자 확인 필요
  },
  {
    step: '02',
    title: 'CARBODY 잭 상승',
    image: '002.png',
  },
  {
    step: '03',
    title: 'CARBODY FRAME 운송',
    image: '003.png', // 순서상 004가 002 다음 장면으로 보임
  },
  {
    step: '04',
    title: 'CARBODY 잭 다운',
    image: '004.png',
  },
  {
    step: '05',
    title: 'FRAME 조립',
    image: '005.png', // 트랙 결합 장면
  },
  {
    step: '06',
    title: 'Crane 작동',
    desc: 'Service Crane 이용',
    image: '006.png',
  },
  {
    step: '07',
    title: 'Crawler 조립',
    image: '007.png',
  },
  {
    step: '08',
    title: 'Crawler 조립',
    image: '008.png', // 전체 조감도
  },
  {
    step: '09',
    title: 'Counter weight 조립',
    image: '009.png', // 전체 조감도
  },
  // 009, 010 파일이 있다면 아래에 추가 (예시)
  /*
  {
    step: '09',
    title: '해체 준비',
    desc: '작업 종료 후 해체 모드 전환',
    image: '009.jpg',
  },
  */
];

// ----------------------------------------------------------------------
// 2. 애니메이션 훅
// ----------------------------------------------------------------------
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return { ref, isVisible };
}

// ----------------------------------------------------------------------
// 3. 메인 컴포넌트
// ----------------------------------------------------------------------
export default function TransportAssemblyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      {/* 배경 그리드 효과 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
        
        {/* 헤더 섹션 */}
        <section className="mb-20 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest mb-4 uppercase animate-fade-in">
            Process
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white animate-fade-in-up">
            Transport & Assembly
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light animate-fade-in-up delay-100">
            일성크레인의 대형 장비는 <span className="text-white font-medium">Self-Assembly System</span>을 통해
            별도의 보조 장비 없이 신속하고 효율적으로 설치 및 해체가 가능합니다.
          </p>
        </section>

        {/* 프로세스 흐름 표시 (조립 -> 해체) */}
        <div className="flex justify-center items-center gap-4 mb-16 animate-fade-in-up delay-200">
          <div className="flex items-center gap-2 px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 font-bold">
            <Wrench className="w-5 h-5" />
            <span>조립 (Assembly)</span>
            <ArrowRight className="w-5 h-5 ml-2 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-orange-600/20 border border-orange-500/30 rounded-full text-orange-300 font-bold">
            <RotateCcw className="w-5 h-5" />
            <span>해체 (Disassembly)</span>
          </div>
        </div>

        {/* 메인 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          
          {/* Start Card (Intro) */}
          <div className="group relative bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-500/30 rounded-2xl p-8 flex flex-col justify-center items-center text-center aspect-[4/3] hover:border-blue-400 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
            <ArrowRight className="w-16 h-16 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-black text-white mb-2">START</h3>
            <p className="text-blue-200 text-sm">현장 도착 및<br/>작업 개시</p>
          </div>

          {/* Process Cards */}
          {processes.map((item, index) => (
            <ProcessCard key={index} item={item} index={index} />
          ))}

          {/* End Card (Outro) */}
          <div className="group relative bg-gradient-to-br from-orange-900/40 to-orange-900/10 border border-orange-500/30 rounded-2xl p-8 flex flex-col justify-center items-center text-center aspect-[4/3] hover:border-orange-400 transition-all duration-300 shadow-[0_0_30px_rgba(234,88,12,0.1)]">
            <RotateCcw className="w-16 h-16 text-orange-400 mb-6 group-hover:-rotate-90 transition-transform duration-500" />
            <h3 className="text-2xl font-black text-white mb-2">END</h3>
            <p className="text-orange-200 text-sm">작업 완료 후<br/>역순 해체</p>
          </div>

        </div>

      </div>
    </main>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 프로세스 카드
// ----------------------------------------------------------------------
function ProcessCard({ item, index }: { item: any, index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative bg-[#151515] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Step Number Badge */}
      <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
        STEP {item.step}
      </div>

      {/* Image Area */}
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full">
          <img
            src={`/images/transport_assembly/${item.image}`}
            alt={item.title}
            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Overlay gradient for readability */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#151515] to-transparent opacity-80 pointer-events-none"></div>
      </div>

      {/* Text Area */}
      <div className="w-full bg-[#151515] p-5 border-t border-white/5 flex flex-col justify-center">
        <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs line-clamp-2">
          {item.desc}
        </p>
      </div>
    </div>
  );
}