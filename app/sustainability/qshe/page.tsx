'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, Leaf, Quote, CheckCircle2 } from 'lucide-react';

// ----------------------------------------------------------------------
// 1. 애니메이션 훅
// ----------------------------------------------------------------------
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return { ref, isVisible };
}

// 애니메이션 래퍼 컴포넌트
function FadeInUp({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. 메인 컴포넌트
// ----------------------------------------------------------------------
export default function QSHEPage() {
  const [scrollY, setScrollY] = useState(0);

  // 패럴랙스 효과를 위한 스크롤 위치 추적
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      {/* 배경 그리드 효과 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />

      {/* ==================================================================
          HERO SECTION: 인터랙티브 배경 및 타이틀
      ================================================================== */}
      <section className="relative h-[90vh] md:h-screen overflow-hidden flex items-center justify-center">
        
        {/* 배경 이미지 (Parallax Effect) */}
        <div 
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }} // 스크롤 속도의 절반으로 이동
        >
          <Image
            src="/images/sustainability/bg.jpg"
            alt="QHSE 경영방침 배경"
            fill
            className="object-cover scale-110 brightness-100" // 밝게 표시
            priority
          />
        </div>

        {/* 히어로 콘텐츠 */}
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <FadeInUp>
            <span className="inline-block py-1 px-4 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-bold tracking-widest mb-6 uppercase animate-pulse drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Sustainability
            </span>
          </FadeInUp>
          
          <FadeInUp delay={200}>
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              QHSE경영방침<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-blue-400 to-green-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                (안전·품질·환경)
              </span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={400}>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto font-light leading-relaxed mb-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              안전은 기본, 품질은 약속, 환경은 책임입니다.
            </p>
          </FadeInUp>

          {/* 스크롤 유도 아이콘 */}
          <FadeInUp delay={600}>
            <div className="flex justify-center animate-bounce">
              <Image
                src="/images/sustainability/mouse.svg"
                alt="스크롤 유도"
                width={31}
                height={50}
                className="opacity-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              />
            </div>
          </FadeInUp>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-32">

        {/* =================================================================
            1. 헤더 및 개요 (Intro)
           ================================================================= */}
        <section className="mb-32 text-center max-w-4xl mx-auto">
          <FadeInUp>
            <div className="space-y-6 text-lg md:text-xl font-light text-gray-300 leading-relaxed break-keep">
              <p>
                일성크레인은 안전한 현장, 완벽한 품질, 지속가능한 환경을 핵심 경영 가치로 삼고 있습니다.
              </p>
              <p>
                모든 임직원은 안전수칙을 철저히 준수하고, 고객 만족과 사회적 책임을 동시에 실현하기 위해<br className="hidden md:block"/>
                <strong className="text-white border-b-2 border-blue-500/50">안전·보건·품질·환경 경영시스템(SQHES)</strong>을 지속적으로 강화하고 있습니다.
              </p>
            </div>
          </FadeInUp>
        </section>


        {/* =================================================================
            2. 핵심 3대 방침 (Policies - 3 Columns)
           ================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          
          {/* 1. 안전보건경영방침 */}
          <PolicyCard 
            id="01"
            title="안전보건경영방침"
            icon={<ShieldCheck className="w-10 h-10 text-orange-500" />}
            accentColor="border-orange-500/50 hover:shadow-orange-500/20"
            delay={0}
          >
            <ul className="space-y-4 text-gray-400 text-sm md:text-base">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />모든 현장의 무재해 실현을 최우선 목표로 합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />체계적인 위험성 평가 및 예방활동을 통해 안전사고를 근본적으로 차단합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />전 임직원이 참여하는 안전문화 정착을 추진하며, 정기적인 교육과 점검을 통해 자율안전관리체계를 운영합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />협력업체와의 상생안전관리를 통해 안전한 산업 생태계를 구축합니다.</li>
            </ul>
          </PolicyCard>

          {/* 2. 품질경영방침 */}
          <PolicyCard 
            id="02"
            title="품질경영방침"
            icon={<Award className="w-10 h-10 text-blue-500" />}
            accentColor="border-blue-500/50 hover:shadow-blue-500/20"
            delay={100}
          >
            <ul className="space-y-4 text-gray-400 text-sm md:text-base">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />고객 요구사항을 정확히 이해하고, 최고 수준의 품질로 보답합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />ISO 품질경영시스템을 기반으로, 프로세스 중심의 시공 및 관리체계를 유지합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />장비와 기술력의 지속적인 개선을 통해 서비스 경쟁력과 신뢰성을 확보합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />품질 불만 발생 시 즉각적인 원인 분석 및 재발 방지 활동을 실시합니다.</li>
            </ul>
          </PolicyCard>

          {/* 3. 환경경영방침 */}
          <PolicyCard 
            id="03"
            title="환경경영방침"
            icon={<Leaf className="w-10 h-10 text-green-500" />}
            accentColor="border-green-500/50 hover:shadow-green-500/20"
            delay={200}
          >
            <ul className="space-y-4 text-gray-400 text-sm md:text-base">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />환경보호를 경영의 필수 가치로 인식하고, 친환경 경영체계를 실천합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />에너지 절감, 자원 재활용, 오염물질 최소화를 통해 지속가능한 현장 운영을 지향합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />친환경 장비 도입과 효율적 운용으로 탄소배출 저감에 앞장섭니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />모든 임직원이 환경보전에 대한 책임과 의무를 자발적으로 실천하도록 교육합니다.</li>
            </ul>
          </PolicyCard>

        </section>


        {/* =================================================================
            3. 경영이념 및 실천 다짐 (Closing)
           ================================================================= */}
        <ClosingSection />

      </div>
    </main>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 정책 카드
// ----------------------------------------------------------------------
function PolicyCard({ id, title, icon, children, accentColor, delay }: any) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative p-8 rounded-3xl bg-[#121212] border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gray-500 to-transparent group-hover:via-white transition-all duration-500`}></div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
          {id}
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
        {title}
      </h3>

      <div className="leading-relaxed break-keep">
        {children}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 하단 다짐 섹션
// ----------------------------------------------------------------------
function ClosingSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      className={`relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 p-10 md:p-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>
      <Quote className="w-16 h-16 text-white/10 mx-auto mb-8" />

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-normal">
        경영이념 및 실천 다짐
      </h2>

      <div className="mb-12 space-y-4">
        <p className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-blue-400 to-green-400 leading-tight">
          “모든 작업은 안전하게,<br />
          모든 품질은 완벽하게,<br />
          모든 환경은 지속가능하게.”
        </p>
      </div>

      <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto break-keep">
        일성크레인은 사람 중심의 안전, 고객 중심의 품질, 그리고 미래 중심의 환경경영으로
        지속가능한 산업 발전에 기여하는 리프팅 전문기업이 되겠습니다.
      </p>
    </section>
  );
}