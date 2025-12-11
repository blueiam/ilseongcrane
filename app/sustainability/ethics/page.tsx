'use client';

import { useEffect, useRef, useState } from 'react';
import { Scale, HeartHandshake, Gavel, Users, Lock, Globe, CheckCircle2, ShieldCheck } from 'lucide-react';

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
export default function EthicsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-500/30">
      
      {/* 배경 효과 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">

        {/* =================================================================
            1. 헤더 및 개요 (Intro)
           ================================================================= */}
        <section className="mb-32 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gray-300 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            Sustainability
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight animate-fade-in-up">
            <span className="text-white">윤리경영</span>
          </h1>

          <div className="space-y-6 text-lg md:text-xl font-light text-gray-300 leading-relaxed animate-fade-in-up delay-100 break-keep">
            <p className="font-bold text-white text-2xl">
              정직과 신뢰를 바탕으로, 투명한 기업문화를 만들어갑니다.
            </p>
            <p>
              일성크레인은 모든 경영활동에서 법과 윤리를 준수하고,<br className="hidden md:block"/>
              공정하고 투명한 기업 운영을 통해 고객, 협력사, 임직원 모두가<br className="hidden md:block"/>
              함께 성장할 수 있는 <strong className="text-white border-b-2 border-yellow-500/50">건강한 기업문화</strong>를 지향합니다.
            </p>
          </div>
        </section>


        {/* =================================================================
            2. 윤리헌장 (Charter - Bento Grid)
           ================================================================= */}
        <section className="mb-40">
          <SectionTitle title="윤리헌장" subtitle="Ethical Charter" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CharterCard 
              icon={<HeartHandshake className="w-8 h-8 text-yellow-400" />}
              title="정직과 신뢰를 최우선 가치로 삼는다."
              desc="모든 업무에서 진실과 신뢰를 바탕으로 행동하며, 기업의 명예와 개인의 품위를 지킨다."
              delay={0}
            />
            <CharterCard 
              icon={<Gavel className="w-8 h-8 text-yellow-400" />}
              title="법규와 사회적 규범을 철저히 준수한다."
              desc="국내외 모든 법령, 규정, 사회적 책임 기준을 준수하고 불법·부당한 행위를 일절 배격한다."
              delay={100}
            />
            <CharterCard 
              icon={<Scale className="w-8 h-8 text-yellow-400" />}
              title="공정하고 투명한 거래를 실천한다."
              desc="협력업체 및 고객과의 모든 관계에서 상호 존중과 공정한 경쟁을 원칙으로 한다."
              delay={200}
            />
            <CharterCard 
              icon={<ShieldCheck className="w-8 h-8 text-yellow-400" />}
              title="고객의 신뢰를 기업의 생명으로 여긴다."
              desc="고객의 의견을 존중하고, 약속을 성실히 이행하며 최고의 품질과 서비스를 제공한다."
              delay={300}
            />
            <CharterCard 
              icon={<Users className="w-8 h-8 text-yellow-400" />}
              title="임직원의 존중과 상생을 추구한다."
              desc="모든 임직원에게 공평한 기회를 부여하고, 서로 존중하며 함께 성장하는 조직문화를 조성한다."
              delay={400}
            />
            <CharterCard 
              icon={<Globe className="w-8 h-8 text-yellow-400" />}
              title="사회와 환경에 대한 책임을 다한다."
              desc="지역사회 발전과 환경보호에 적극 참여하며 지속가능한 미래를 만들어간다."
              delay={500}
            />
          </div>
        </section>


        {/* =================================================================
            3. 윤리행동강령 (Code of Conduct)
           ================================================================= */}
        <section className="mb-20 max-w-5xl mx-auto">
          <SectionTitle title="윤리행동강령" subtitle="Code of Ethics" />

          <div className="space-y-6">
            <CodeItem 
              title="부패 및 비윤리 행위 금지"
              desc="금품, 향응, 특혜 등 어떠한 형태의 부당 이익도 취하지 않는다."
              delay={0}
            />
            <CodeItem 
              title="투명한 의사결정"
              desc="모든 업무는 객관적 근거와 공정한 절차에 따라 수행한다."
              delay={100}
            />
            <CodeItem 
              title="정보의 보호와 보안"
              desc="회사 및 고객의 정보를 철저히 보호하며, 무단으로 사용하거나 유출하지 않는다."
              delay={200}
            />
            <CodeItem 
              title="건전한 조직문화 조성"
              desc="상호 존중, 배려, 협력을 기반으로 한 건전한 근무환경을 유지한다."
              delay={300}
            />
            <CodeItem 
              title="사회적 책임 실천"
              desc="윤리경영 실천을 통해 기업의 사회적 책임을 다하고, 깨끗하고 투명한 기업문화를 확립한다."
              delay={400}
            />
          </div>
        </section>

      </div>
    </main>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 섹션 타이틀
// ----------------------------------------------------------------------
function SectionTitle({ title, subtitle }: { title: string, subtitle: string }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className={`mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
      <p className="text-yellow-500/80 font-medium tracking-widest uppercase text-sm">{subtitle}</p>
    </div>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 윤리헌장 카드
// ----------------------------------------------------------------------
function CharterCard({ icon, title, desc, delay }: any) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group p-8 rounded-3xl bg-[#121212] border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(234,179,8,0.15)] flex flex-col h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="mb-6 p-3 bg-yellow-500/10 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors break-keep">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed break-keep">
        {desc}
      </p>
    </div>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 행동강령 아이템
// ----------------------------------------------------------------------
function CodeItem({ title, desc, delay }: any) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
    >
      <div className="flex items-center gap-4 md:w-1/3 shrink-0">
        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />
        <h4 className="text-lg font-bold text-white">{title}</h4>
      </div>
      <div className="md:w-2/3 border-l border-white/10 pl-0 md:pl-8 pt-2 md:pt-0">
        <p className="text-gray-400 text-sm md:text-base">{desc}</p>
      </div>
    </div>
  );
}