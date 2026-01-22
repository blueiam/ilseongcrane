'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { 
  Building2, 
  Factory, 
  Wind, 
  Ship, 
  Container, 
  DraftingCompass, 
  CheckCircle2
} from 'lucide-react';

// 교량 아이콘 (커스텀 SVG)
const BridgeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    {/* 교량 상판 */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12v2h18v-2M3 12v-2h18v2" />
    {/* 교각들 */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 14v6M10 14v6M14 14v6M18 14v6" />
    {/* 지면 */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 20h20" />
  </svg>
);

// Special Projects 아이콘 (싸이렌/비상 아이콘)
const SirenIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 98 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M49.2627 29C53.3158 29 55.3426 28.9997 57.0723 29.2529C66.9265 30.6962 74.866 38.0761 77.0244 47.7988C77.4033 49.5054 77.5509 51.5268 77.8467 55.5693L80 85H19L20.6484 56.0322C20.8821 51.9256 20.9987 49.8722 21.3564 48.1416C23.3957 38.2762 31.3794 30.7343 41.3447 29.2588C43.0928 29 45.1495 29 49.2627 29ZM49.3135 35C37.6104 35.0002 27.945 44.1413 27.293 55.8262L26 79H73L71.3125 55.4766C70.4846 43.9381 60.8817 35 49.3135 35Z" />
    <rect x="45" width="10" height="24" rx="5" />
    <rect y="19.071" width="10" height="24" rx="5" transform="rotate(-45 0 19.071)" />
    <rect width="10" height="24" rx="5" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 97.0417 19.071)" />
  </svg>
);

// ----------------------------------------------------------------------
// 1. 사업영역 데이터
// ----------------------------------------------------------------------
const businessAreas = [
  {
    id: 1,
    enTitle: 'SOC',
    // koTitle: '사회간접자본 인프라',
    desc: '국가 기간산업의 핵심이 되는 대규모 건설 현장에 최적화된 리프팅 솔루션을 제공합니다.',
    details: [
      '도로/철도/교량/터널/댐 등 국가 기간산업 건설 현장 지원',
      '대형 크레인 투입 및 특수 리프팅 솔루션 제공',
      '중·대형 구조물 설치/해체 작업 수행'
    ],
    icon: <BridgeIcon className="w-8 h-8" />,
    bgImage: '/images/business/01-SOC.jpg',
  },
  {
    id: 2,
    enTitle: '플랜트',
    koTitle: 'Plants',
    desc: '반도체, 화학, 정유 등 첨단 산업 시설의 정밀한 중장비 설치와 유지보수를 책임집니다.',
    details: [
      '반도체·화학·정유·발전 플랜트의 중장비 설치',
      '터빈, 압축기, 보일러 등 중량물 Hoisting & Rigging',
      '정비(Shut Down) 기간 리프팅 작업 지원'
    ],
    icon: <Factory className="w-8 h-8" />,
    bgImage: '/images/business/02-plant.jpg',
  },
  {
    id: 3,
    enTitle: '에너지',
    koTitle: 'Energy',
    desc: '신재생 에너지의 핵심인 풍력 발전 단지 조성을 위한 운송부터 설치까지 Total Solution을 제공합니다.',
    details: [
      '풍력 기자재 운송(Transport) 및 현장 반입',
      '타워·나셀·블레이드 등 고중량물 설치(Installation)',
      '해상 풍력의 T&I 컨소시엄 운용 및 프로젝트 수행'
    ],
    icon: <Wind className="w-8 h-8" />,
    bgImage: '/images/business/03-energy.jpg',
  },
  {
    id: 4,
    enTitle: '조선해양',
    koTitle: 'Shipbuilding',
    desc: '초대형 선박 및 해양 플랜트 구조물의 탑재와 이동을 위한 고난이도 리프팅을 수행합니다.',
    details: [
      '대형 모듈 블록 리프팅 및 탑재',
      'FPSO, 해양플랫폼, Subsea 구조물 설치 지원',
      '도크 투입 및 진수 지원 리프팅'
    ],
    icon: <Ship className="w-8 h-8" />,
    bgImage: '/images/business/04-shipping.jpg',
  },
  {
    id: 5,
    enTitle: '물류항만 ',
    koTitle: 'Port Logistics',
    desc: '항만 크레인 설치부터 특수 화물 하역까지, 물류 흐름의 핵심 거점에서 활약합니다.',
    details: [
      '항만 크레인(GC, QC 등) 설치 및 해체',
      '컨테이너 및 초중량물 하역 서비스',
      'SPMT 연계한 Heavy Cargo Handling 및 국내외 이동'
    ],
    icon: <Container className="w-8 h-8" />,
    bgImage: '/images/business/05-logistic.jpg',
  },
  {
    id: 6,
    enTitle: '특수부문',
    koTitle: 'Special Projects',
    desc: '극한의 조건과 정밀함이 요구되는 특수 프로젝트에서 독보적인 기술력을 발휘합니다.',
    details: [
      '초중량 구조물 이동 및 설치',
      '교량 거더 리프팅, 터널 TBM 반입 및 조립',
      '긴급 복구 및 재난 대응 리프팅 긴급 지원'
    ],
    icon: <SirenIcon className="w-8 h-8" />,
    bgImage: '/images/business/06-special.jpg',
  },
  {
    id: 7,
    enTitle: '엔지니어링',
    koTitle: 'Engineering',
    desc: '단순 장비 임대를 넘어, 설계부터 안전 관리까지 프로젝트의 성공을 위한 기술적 토대를 마련합니다.',
    details: [
      'Rigging Plan / Lifting Plan 전문 설계 및 시뮬레이션',
      '로드서베이(Road Survey) 및 운송성 검토',
      '풍력 T&I 기술 컨설팅 및 PM/안전관리 체계 구축'
    ],
    icon: <DraftingCompass className="w-8 h-8" />,
    bgImage: '/images/business/07-engin.jpg',
  },
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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return { ref, isVisible };
}

// ----------------------------------------------------------------------
// 3. 카드 컴포넌트 (모바일 회전 기능 포함)
// ----------------------------------------------------------------------
function BusinessAreaCard({ area, index }: { area: typeof businessAreas[0], index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative bg-white border border-slate-200 rounded-3xl overflow-hidden transition-all duration-700 ease-in-out hover:border-blue-500 hover:shadow-lg
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ 
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* 이미지 영역 */}
      {area.bgImage && (
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src={area.bgImage}
            alt={`${area.koTitle || area.enTitle} 배경 이미지`}
            fill
            quality={95}
            priority={index < 3}
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </div>
      )}
      
      {/* 텍스트 영역 (이미지 아래 별도 공간) */}
      <div className="p-8">
        {/* 제목 */}
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          {area.enTitle}
        </h3>

        {/* 설명 */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 break-keep">
          {area.desc}
        </p>

        {/* 상세 리스트 */}
        <ul className="space-y-3">
          {area.details.map((detail, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <span className="break-keep">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. 메인 컴포넌트
// ----------------------------------------------------------------------
export default function BusinessAreasPage() {
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
          src="/hero/business-area.jpg"
          alt="사업영역"
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
            사업영역
          </h1>
        </div>
      </div>

    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* 배경 패턴 (은은한 그리드) */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
        
        {/* 헤더 섹션 */}
        <section className="mb-24 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest mb-4 uppercase">
            Business Areas
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">
            사업영역
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light break-keep mb-12">
            일성크레인은 다양한 산업 현장에서 축적된 노하우와 최첨단 장비를 바탕으로<br />
            <span className="text-blue-600 font-medium">최적의 리프팅 솔루션</span>을 제공합니다.
          </p>
          
          {/* Total Lifting Solution Provider 다이어그램 이미지 */}
          <div className="flex justify-center mb-16">
            <div className="relative w-full max-w-4xl mx-auto">
              <Image
                src="/images/business/heavy.png"
                alt="Total Lifting Solution Provider - 사업영역 다이어그램"
                width={800}
                height={800}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>

        {/* 사업영역 그리드 */}
        <section className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
          {businessAreas.map((area, index) => (
            <BusinessAreaCard key={area.id} area={area} index={index} />
          ))}
        </section>

      </div>
    </main>
    </>
  );
}