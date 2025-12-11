'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, Download } from 'lucide-react';

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
// 2. 데이터 정의
// ----------------------------------------------------------------------
const certItems = [
  {
    id: 1,
    category: '등록증',
    title: '사업자등록증',
    image: '/images/sustainability/reg.jpg',
  },
  {
    id: 2,
    category: '인증서',
    title: 'ISO 14001 환경경영시스템',
    image: '/images/sustainability/1400.jpg',
  },
  {
    id: 3,
    category: '인증서',
    title: 'ISO 9001 품질경영시스템',
    image: '/images/sustainability/9001.jpg',
  },
];

// ----------------------------------------------------------------------
// 3. 메인 컴포넌트
// ----------------------------------------------------------------------
export default function CertificationsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image
            src="/images/sustainability/section4.png"
            alt="등록/면허/인증 배경"
            fill
            className="object-cover scale-110 brightness-100"
            priority
          />
        </div>

        {/* 히어로 콘텐츠 */}
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <FadeInUp>
            <span className="inline-block py-1 px-4 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-bold tracking-widest mb-6 uppercase animate-pulse drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Certifications
            </span>
          </FadeInUp>
          
          <FadeInUp delay={200}>
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              등록/면허/인증
            </h1>
          </FadeInUp>

          <FadeInUp delay={400}>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto font-light leading-relaxed mb-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              일성크레인의 투명한 경영과 검증된 기술력을 증명하는 각종 인증 현황입니다.
            </p>
          </FadeInUp>

          {/* 스크롤 유도 아이콘 */}
          <FadeInUp delay={600}>
            <div className="flex justify-center animate-bounce">
              <svg className="w-6 h-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </FadeInUp>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-32">

        {/* =================================================================
            인증서 그리드 리스트
           ================================================================= */}
        <div className="flex flex-wrap justify-center gap-8">
          {certItems.map((item, index) => (
            <CertCard 
              key={item.id} 
              item={item}
              index={index}
              onClick={() => setSelectedImage(item.image)}
            />
          ))}
        </div>

      </div>

      {/* 이미지 확대 모달 (Lightbox) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          {/* 닫기 버튼 */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>

          {/* 모달 이미지 컨테이너 */}
          <div 
            className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Certificate Detail"
                fill
                className="object-contain"
                quality={95}
              />
            </div>
            
            {/* 하단 다운로드 버튼 */}
            <a 
              href={selectedImage} 
              download
              className="absolute bottom-6 flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-4 h-4" />
              이미지 다운로드
            </a>
          </div>
        </div>
      )}
    </main>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 인증서 카드
// ----------------------------------------------------------------------
function CertCard({ item, index, onClick }: { item: typeof certItems[0], index: number, onClick: () => void }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref}
      className={`group cursor-pointer flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-xs transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      {/* 이미지 썸네일 영역 */}
      <div className="relative w-full aspect-[1/1.414] bg-[#121212] border border-white/10 overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-500/50 group-hover:-translate-y-2 rounded-2xl">
        {/* 실제 이미지 */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* 호버 오버레이 (돋보기 아이콘) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 p-3 rounded-full shadow-lg">
            <ZoomIn className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* 텍스트 정보 */}
      <div className="mt-4 text-center">
        <span className="inline-block px-2 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs font-bold mb-2 rounded">
          {item.category}
        </span>
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
      </div>
    </div>
  );
}
