'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { HardHat, Leaf, Scale, Lightbulb, CheckCircle2, Globe } from 'lucide-react';

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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return { ref, isVisible };
}

// ----------------------------------------------------------------------
// 2. 메인 컴포넌트
// ----------------------------------------------------------------------
export default function SGCPage() {
  const [imageZoomed, setImageZoomed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageZoomed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[450px] lg:h-[500px] w-full overflow-hidden z-30">
        {/* Background Image */}
        <Image
          src="/images/sustainability/sgc.jpg"
          alt="SGC 경영"
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
            className="text-5xl md:text-6xl font-bold text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            style={{ color: '#FFFFFF', textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            SGC 경영
          </h1>
        </div>
      </div>

    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* 배경 패턴 (은은한 그리드) */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">

        {/* =================================================================
            1. 헤더 및 개요 (Intro)
           ================================================================= */}
        <section className="mb-32 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm font-bold text-blue-600 mb-8">
            <Globe className="w-4 h-4 text-blue-600" />
            Sustainability Management
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight text-slate-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-green-500 to-blue-600">SGC</span> 경영방침
          </h1>
          
          <p className="text-xl md:text-2xl font-bold text-slate-900 mb-10">
            안전(Safety), 환경(Green), 준법과 신뢰(Compliance) —<br className="hidden md:block"/>
            지속가능한 미래를 향한 일성크레인의 약속
          </p>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
            <p className="text-lg md:text-xl font-light text-slate-600 leading-relaxed break-keep">
              일성크레인은 안전한 현장, 친환경 경영, 그리고 윤리적 책임을 핵심 가치로 삼고,
              모든 이해관계자와 함께 지속가능한 성장을 추구합니다.<br/><br/>
              <strong className="text-slate-900">SGC 경영방침</strong>은 우리의 모든 사업활동이
              인간, 환경, 사회와 조화를 이루도록 이끄는 일성크레인의 행동 원칙입니다.
            </p>
          </div>
        </section>


        {/* =================================================================
            2. SGC 3대 핵심 가치 (3 Pillars)
           ================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          
          {/* S - Safety */}
          <SGCCard 
            initial="S"
            title="Safety : 안전경영"
            icon={<HardHat className="w-12 h-12 text-orange-500" />}
            colorClass="orange"
            delay={0}
          >
            <ul className="space-y-4 text-slate-600">
              <ListItem color="orange">전 임직원의 안전의식을 최우선 가치로 합니다.</ListItem>
              <ListItem color="orange">위험예방 중심의 자율안전관리체계를 구축하고, 무재해·무사고 현장 실현을 목표로 합니다.</ListItem>
              <ListItem color="orange">정기적인 안전교육과 현장점검을 통해 모든 근로자가 안심하고 일할 수 있는 환경을 만듭니다.</ListItem>
            </ul>
          </SGCCard>

          {/* G - Green */}
          <SGCCard 
            initial="G"
            title="Green : 환경경영"
            icon={<Leaf className="w-12 h-12 text-green-500" />}
            colorClass="green"
            delay={100}
          >
            <ul className="space-y-4 text-slate-600">
              <ListItem color="green">환경보호를 기업의 기본 책무로 인식하고, 친환경 기술과 설비 도입으로 탄소배출을 최소화합니다.</ListItem>
              <ListItem color="green">자원 절약과 재활용을 실천하며, 깨끗하고 지속가능한 지구환경 보전에 앞장섭니다.</ListItem>
              <ListItem color="green">풍력 등 신재생에너지 산업을 지원하여 친환경 에너지 전환에 기여합니다.</ListItem>
            </ul>
          </SGCCard>

          {/* C - Compliance */}
          <SGCCard 
            initial="C"
            title="Compliance : 윤리·준법경영"
            icon={<Scale className="w-12 h-12 text-blue-500" />}
            colorClass="blue"
            delay={200}
          >
            <ul className="space-y-4 text-slate-600">
              <ListItem color="blue">법규와 사회적 규범을 철저히 준수하며, 공정하고 투명한 의사결정을 실천합니다.</ListItem>
              <ListItem color="blue">부패와 비윤리 행위를 배격하고, 고객과 협력사, 임직원 모두에게 신뢰받는 기업이 되겠습니다.</ListItem>
              <ListItem color="blue">모든 구성원이 윤리헌장과 행동강령을 준수하며, 책임 있는 기업 시민으로서의 역할을 다합니다.</ListItem>
            </ul>
          </SGCCard>

        </section>


        {/* =================================================================
            3. 일성크레인의 다짐 (Closing)
           ================================================================= */}
        <section className="max-w-4xl mx-auto">
          <ClosingSection />
        </section>

      </div>
    </main>
    </>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: SGC 카드
// ----------------------------------------------------------------------
function SGCCard({ initial, title, icon, children, colorClass, delay }: any) {
  const { ref, isVisible } = useScrollAnimation();

  // 색상 매핑
  const colors: any = {
    orange: {
      border: 'hover:border-orange-500/50',
      bg: 'group-hover:bg-orange-500/10',
      text: 'group-hover:text-orange-400',
      shadow: 'hover:shadow-orange-500/20',
      gradient: 'from-orange-500 to-red-500'
    },
    green: {
      border: 'hover:border-green-500/50',
      bg: 'group-hover:bg-green-500/10',
      text: 'group-hover:text-green-400',
      shadow: 'hover:shadow-green-500/20',
      gradient: 'from-green-500 to-emerald-500'
    },
    blue: {
      border: 'hover:border-blue-500/50',
      bg: 'group-hover:bg-blue-500/10',
      text: 'group-hover:text-blue-400',
      shadow: 'hover:shadow-blue-500/20',
      gradient: 'from-blue-500 to-indigo-500'
    }
  };

  const theme = colors[colorClass];

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative p-8 rounded-3xl bg-white border border-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${theme.border} ${theme.shadow} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Background Initial Letter */}
      <div className={`absolute -right-4 -bottom-8 text-[12rem] font-black text-slate-200 select-none transition-colors duration-500 ${theme.text} opacity-30`}>
        {initial}
      </div>

      <div className={`relative z-10 mb-8 p-4 rounded-2xl bg-slate-50 w-fit transition-colors duration-300 ${theme.bg}`}>
        {icon}
      </div>

      <h3 className={`relative z-10 text-2xl font-bold mb-6 text-slate-900 transition-colors duration-300 ${theme.text}`}>
        {title}
      </h3>

      <div className="relative z-10 leading-relaxed break-keep">
        {children}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 리스트 아이템
// ----------------------------------------------------------------------
function ListItem({ children, color }: { children: React.ReactNode, color: string }) {
  const colorMap: any = {
    orange: 'text-orange-500',
    green: 'text-green-500',
    blue: 'text-blue-500'
  };

  return (
    <li className="flex gap-3 text-sm md:text-base">
      <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${colorMap[color]}`} />
      <span>{children}</span>
    </li>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 하단 다짐 섹션
// ----------------------------------------------------------------------
function ClosingSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref}
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 p-10 md:p-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      <Lightbulb className="w-16 h-16 text-yellow-500/80 mx-auto mb-8 animate-pulse" />

      <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-8">
        일성크레인의 다짐
      </h2>

      <div className="text-3xl md:text-5xl font-black text-white leading-tight mb-10 tracking-tight">
        “안전을 지키고, 환경을 보호하며,<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-green-400 to-blue-400">
          윤리를 실천하는 기업
        </span> — 일성크레인”
      </div>

      <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto break-keep">
        SGC 경영을 통해<br className="md:hidden"/>
        사람과 기술, 환경이 함께 성장하는 지속가능한 미래를 만들어가겠습니다.
      </p>
    </div>
  );
}