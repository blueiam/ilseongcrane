'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CustomersHero } from '@/app/_components/CustomersHero';

// 고객사 데이터 (logo 폴더 사용)
const customers = [
  { name: '삼성', src: '/images/logo/logo_0000_01-samsung.png' },
  { name: '삼성엔지니어링', src: '/images/logo/logo_0001_02-samsung-en.png' },
  { name: 'CJ', src: '/images/logo/logo_0002_03-cj.png' },
  { name: '동방', src: '/images/logo/logo_0003_04-dongbang.png' },
  { name: 'GS', src: '/images/logo/logo_0004_05-GS-gs.png' },
  { name: '현대', src: '/images/logo/logo_0005_06-hyundai.png' },
  { name: '롯데', src: '/images/logo/logo_0006_07-lotte.png' },
  { name: '롯데건설', src: '/images/logo/logo_0007_08-lotte-enc.png' },
  { name: 'SK 에코플랜트', src: '/images/logo/logo_0008_09-skecoplant.png' },
  { name: '두산', src: '/images/logo/logo_0009_11-dosan.png' },
  { name: 'CNPLUS', src: '/images/logo/logo_0010_12-cnpluse.png' },
  { name: '대우', src: '/images/logo/logo_0011_13-dawoo.png' },
  { name: '대아이앤씨', src: '/images/logo/logo_0012_14-da-enc.png' },
  { name: 'YH', src: '/images/logo/logo_0013_21-yh.png' },
  { name: 'KEC', src: '/images/logo/logo_0014_20-kec.png' },
  { name: '세방', src: '/images/logo/logo_0015_18-sebang.png' },
  { name: '삼표 E&C', src: '/images/logo/logo_0016_17sampyo-ec.png' },
  { name: 'DL E&C', src: '/images/logo/logo_0017_16-dl-enc.png' },
  { name: '효성', src: '/images/logo/logo_0018_16-hyosung.png' },
  { name: '오일뱅크', src: '/images/logo/logo_0019_15-ollbank.png' },
];

// ----------------------------------------------------------------------
// 애니메이션 훅
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

export default function CustomersPage() {
  return (
    <>
      {/* Hero Section */}
      <CustomersHero />

      {/* Main Content */}
      <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
        
        {/* 배경 그리드 효과 */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
          
          {/* 설명 섹션 */}
          <section className="mb-20 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest mb-4 uppercase animate-fade-in">
              Partners
            </span>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light animate-fade-in-up">
              국내 유수의 기업들과 함께 성장해왔습니다.<br/>
              신뢰받는 파트너로서 최고의 서비스를 제공합니다.
            </p>
          </section>

          {/* 로고 그리드 섹션 */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 max-w-[1400px] mx-auto">
              {customers.map((customer, index) => (
                <CustomerCard key={index} customer={customer} index={index} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

// ----------------------------------------------------------------------
// 서브 컴포넌트: 고객사 카드
// ----------------------------------------------------------------------
function CustomerCard({ customer, index }: { customer: any, index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative bg-[#eeeeee] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* 이미지 영역 */}
      <div className="relative w-full h-[120px] flex items-center justify-center p-6">
        <div className="relative w-full h-full">
          <Image
            src={customer.src}
            alt={customer.name}
            fill
            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}

