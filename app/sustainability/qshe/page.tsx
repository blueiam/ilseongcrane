'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Quote, Download } from 'lucide-react';

// ----------------------------------------------------------------------
// 1. 애니메이션 훅 & 컴포넌트
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
        <Image
          src="/images/sustainability/bg.jpg"
          alt="QHSE 경영방침"
          fill
          className={`object-cover object-center transition-transform duration-[10000ms] ease-out ${
            imageZoomed ? 'scale-100' : 'scale-125'
          }`}
          priority
          quality={100}
        />
        <div className="relative flex h-full items-center justify-center z-20">
          <h1
            className="text-5xl md:text-6xl font-bold text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            style={{ color: '#FFFFFF', textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            QHSE경영
          </h1>
        </div>
      </div>

    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* 배경 패턴 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-32">

        {/* Intro Section */}
        <section className="mb-32 text-center max-w-4xl mx-auto">
          <FadeInUp>
            <span className="inline-block py-1 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest mb-4 uppercase">
              Sustainability
            </span>
          </FadeInUp>
          
          <FadeInUp delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-normal">
              QHSE경영방침
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 mb-6">
              (안전·품질·환경)
            </p>
          </FadeInUp>

          <FadeInUp delay={400}>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              안전은 기본, 품질은 약속, 환경은 책임입니다.
            </p>
          </FadeInUp>
          
          <div className="mt-12">
            <FadeInUp delay={600}>
              <div className="space-y-6 text-lg md:text-xl font-light text-slate-600 leading-relaxed break-keep">
                <p>
                  일성크레인은 안전한 현장, 완벽한 품질, 지속가능한 환경을 핵심 경영 가치로 삼고 있습니다.
                </p>
                <p>
                  모든 임직원은 안전수칙을 철저히 준수하고, 고객 만족과 사회적 책임을 동시에 실현하기 위해<br className="hidden md:block"/>
                  <strong className="text-slate-900 border-b-2 border-blue-600">품질 안전·보건·환경 경영시스템(QHSE)</strong>을 지속적으로 강화하고 있습니다.
                </p>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Policies Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          
          {/* 1. 안전보건 */}
          <PolicyCard 
            id="01"
            title="안전보건경영방침"
            image="/images/sustainability/safe.jpg"
            delay={0}
          >
            <ul className="space-y-4 text-slate-600 text-sm md:text-base">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />모든 현장의 무재해 실현을 최우선 목표로 합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />체계적인 위험성 평가 및 예방활동을 통해 안전사고를 근본적으로 차단합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />전 임직원이 참여하는 안전문화 정착을 추진하며, 정기적인 교육과 점검을 통해 자율안전관리체계를 운영합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />협력업체와의 상생안전관리를 통해 안전한 산업 생태계를 구축합니다.</li>
            </ul>
          </PolicyCard>

          {/* 2. 품질 */}
          <PolicyCard 
            id="02"
            title="품질경영방침"
            image="/images/sustainability/quality.jpg"
            delay={100}
          >
            <ul className="space-y-4 text-slate-600 text-sm md:text-base">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />고객 요구사항을 정확히 이해하고, 최고 수준의 품질로 보답합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />ISO 품질경영시스템을 기반으로, 프로세스 중심의 시공 및 관리체계를 유지합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />장비와 기술력의 지속적인 개선을 통해 서비스 경쟁력과 신뢰성을 확보합니다.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />품질 불만 발생 시 즉각적인 원인 분석 및 재발 방지 활동을 실시합니다.</li>
            </ul>
          </PolicyCard>

          {/* 3. 환경 */}
          <PolicyCard 
            id="03"
            title="환경경영방침"
            image="/images/sustainability/envirionment.jpg"
            delay={200}
          >
            <ul className="space-y-4 text-slate-600 text-sm md:text-base">
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
    </>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 정책 카드
// ----------------------------------------------------------------------
function PolicyCard({ id, title, image, children, delay }: any) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative rounded-3xl bg-white border border-slate-200 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* 이미지 영역 */}
      {image && (
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            quality={95}
          />
        </div>
      )}

      {/* 텍스트 영역 */}
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-all">
            {title}
          </h3>
          <span className="text-4xl font-black text-slate-200 group-hover:text-slate-300 transition-colors">
            {id}
          </span>
        </div>

        <div className="leading-relaxed break-keep">
          {children}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 하단 다짐 섹션 (수정된 부분)
// ----------------------------------------------------------------------
function ClosingSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      className={`relative rounded-[3rem] overflow-hidden border border-slate-200 p-10 md:p-20 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      
      {/* 제목 */}
      <div className="text-center mb-16">
        <Quote className="w-16 h-16 text-slate-200 mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-normal">
          경영이념 및 실천 다짐
        </h2>
      </div>

      {/* 좌우 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* 좌측: 텍스트 */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-blue-600 to-green-600 leading-tight">
              "모든 작업은 안전하게,<br />
              모든 품질은 완벽하게,<br />
              모든 환경은 지속가능하게."
            </h3>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed break-keep border-l-4 border-slate-200 pl-6">
            일성크레인은 사람 중심의 안전, 고객 중심의 품질, 그리고 미래 중심의 환경경영으로
            지속가능한 산업 발전에 기여하는 리프팅 전문기업이 되겠습니다.
          </p>
        </div>

        {/* 우측: 이미지 및 다운로드 버튼 */}
        <div className="flex flex-col items-center">
          {/* 이미지와 버튼 사이 간격을 좁힘 (space-y-6 -> 약 24px) */}
          <div className="space-y-8 text-center w-full max-w-[400px]">
            {/* 이미지 */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white p-2">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                 <Image
                  src="/images/sustainability/qhe.png"
                  alt="QHSE 경영방침"
                  fill
                  className="object-contain"
                  quality={95}
                />
              </div>
            </div>

            {/* PDF 다운로드 버튼 (간격 좁힘 적용됨) */}
            <a
              href="/images/sustainability/pdf/QHSE.pdf"
              target="_blank"
              rel="noreferrer"
              download="QHSE 통합 경영방침.pdf"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-base font-bold text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              QHSE 통합 경영방침 다운로드
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}