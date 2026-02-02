'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// ----------------------------------------------------------------------
// 스크롤 애니메이션 훅
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
// 조직도 노드 컴포넌트
// ----------------------------------------------------------------------
const OrgNode = ({ 
  title, 
  sub, 
  className, 
  active = false, 
  type = 'default' 
}: { 
  title: string, 
  sub?: string, 
  className?: string, 
  active?: boolean, 
  type?: 'default' | 'outsourcing' | 'family' 
}) => {
  
  let borderColor = 'border-blue-300';
  let bgColor = 'bg-white';
  let textColor = 'text-slate-700';
  let subColor = 'text-slate-600';
  let hoverBorder = 'hover:border-blue-500';

  if (active) {
    borderColor = 'border-blue-600';
    bgColor = 'bg-blue-50';
    textColor = 'text-blue-600';
    subColor = 'text-blue-700';
  } else if (type === 'outsourcing') {
    borderColor = 'border-dashed border-slate-300';
  } else if (type === 'family') {
     borderColor = 'border-slate-300';
  }

  return (
    <div className={`relative group flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-300 shadow-sm hover:shadow-md z-20
      ${bgColor} ${borderColor} ${!active && hoverBorder}
      ${className}`}>
      <span className={`text-base md:text-lg font-bold ${textColor} group-hover:text-blue-600 text-center break-keep leading-tight`}>
        {title}
      </span>
      {sub && (
        <span className={`text-[10px] md:text-xs mt-1 ${subColor} group-hover:text-blue-600 text-center`}>
          {sub}
        </span>
      )}
    </div>
  );
};

export default function OrganizationPage() {
  const [imageZoomed, setImageZoomed] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
    
    // 이미지 줌인 애니메이션
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
          src="/images/about/organization.jpg"
          alt="조직도"
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
            className="text-5xl md:text-6xl font-bold text-center text-slate-900"
          >
            조직도
          </h1>
        </div>
      </div>

    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* 배경 패턴 (은은한 그리드) */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
        
        {/* ====================================================================
            조직도 (Organization Chart)
           ==================================================================== */}
        <section className="relative">
          <div className="text-center mb-24">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest mb-4 uppercase">
              Organization
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-black">
              조직도
            </h2>
            <p className="text-gray-400 text-lg">
              체계적인 시스템과 전문 인력의 유기적인 협력
            </p>
          </div>

          {/* 조직도 이미지 */}
          <div className="flex justify-center items-center w-full">
            <Image
              src="/images/about/05-org.svg"
              alt="조직도"
              width={1200}
              height={1018}
              className="w-full h-auto max-w-full"
              priority
            />
          </div>

        </section>

      </div>
    </main>
    </>
  );
}
