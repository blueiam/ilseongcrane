'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, Download } from 'lucide-react';

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
// 2. 데이터 정의 (PDF 경로 매핑)
// ----------------------------------------------------------------------
const certItems = [
  {
    id: 1,
    category: '등록증',
    title: '사업자등록증',
    image: '/images/sustainability/bus.jpg',
    pdf: '/images/sustainability/pdf/01-Business_Registration_Certificate.pdf',
  },
  {
    id: 2,
    category: '등록증',
    title: '주기장시설보유확인서(대여업)',
    image: '/images/sustainability/9001_0008_Yard_Facility_Ownership.jpg',
    pdf: '/images/sustainability/pdf/02-Yard_Facility_Ownership_Certificate_Rental.pdf',
  },
  {
    id: 3,
    category: '등록증',
    title: '주기장시설보유확인서(매매업)',
    image: '/images/sustainability/9001_0007_Yard_Facility_Trading.jpg',
    pdf: '/images/sustainability/pdf/03-Yard_Facility_Ownership_Certificate_Trading.pdf.pdf', 
  },
  {
    id: 4,
    category: '등록증',
    title: '일성크레인 대여업 등록증',
    image: '/images/sustainability/9001_0006_Rental_Business_Registration.jpg',
    pdf: '/images/sustainability/pdf/04-Rental_Business_Registration_Certificate.pdf',
  },
  {
    id: 5,
    category: '등록증',
    title: '원씨엔에스(주) 건설기계 등록증',
    image: '/images/sustainability/9001_0004_Seungwon.jpg',
    pdf: '/images/sustainability/pdf/05-Seungwon-CNS.pdf',
  },
  {
    id: 6,
    category: '등록증',
    title: '범한건설중기(주)건설기계 등록증',
    image: '/images/sustainability/9001_0005_Beomhan.jpg',
    pdf: '/images/sustainability/pdf/06-Beomhan.pdf',
  },
  {
    id: 7,
    category: '등록증',
    title: '일성크레인 매매업 등록증',
    image: '/images/sustainability/9001_0003_Trading.jpg',
    pdf: '/images/sustainability/pdf/07-Trading_Business_Registration_Certificate.pdf',
  },
  {
    id: 8,
    category: '확인서',
    title: '중소기업확인서',
    image: '/images/sustainability/9001_0002_SME_Confirmation.jpg',
    pdf: '/images/sustainability/pdf/08-SME_Confirmation_Certificate.pdf',
  },
  {
    id: 9,
    category: '인증서',
    title: 'ISO 9001 품질경영시스템',
    image: '/images/sustainability/9001_0001_ISO.jpg',
    pdf: '/images/sustainability/pdf/09-ISO9001_Integrated_Certification.pdf',
  },
  {
    id: 10,
    category: '인증서',
    title: 'ISO 14001 환경경영시스템',
    image: '/images/sustainability/9001_0000_1so1400.jpg',
    pdf: '/images/sustainability/pdf/10-ISO1400_Integrated_Certification.pdf',
  },
];

// ----------------------------------------------------------------------
// 3. 메인 컴포넌트
// ----------------------------------------------------------------------
export default function CertificationsPage() {
  // 선택된 항목(이미지+PDF)의 전체 데이터를 저장
  const [selectedItem, setSelectedItem] = useState<typeof certItems[0] | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      {/* 배경 그리드 효과 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative h-[90vh] md:h-screen overflow-hidden flex items-center justify-center">
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

          <FadeInUp delay={600}>
            <div className="flex justify-center animate-bounce">
              <svg className="w-6 h-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 리스트 영역 */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-32">
        <div className="flex flex-wrap justify-center gap-8">
          {certItems.map((item, index) => (
            <CertCard 
              key={item.id} 
              item={item}
              index={index}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      {/* 모달 (Lightbox) */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setSelectedItem(null)}
          >
            <X className="w-10 h-10" />
          </button>

          <div 
            className="relative w-full h-full max-w-4xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-contain"
                quality={95}
              />
            </div>
            
            {/* PDF 다운로드 버튼 */}
            <a 
              href={selectedItem.pdf} 
              download
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-16 md:bottom-6 flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-5 h-5" />
              PDF 다운로드
            </a>
          </div>
        </div>
      )}
    </main>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 카드
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
      <div className="relative w-full aspect-[1/1.414] bg-[#121212] border border-white/10 overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-500/50 group-hover:-translate-y-2 rounded-2xl">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 p-3 rounded-full shadow-lg">
            <ZoomIn className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
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