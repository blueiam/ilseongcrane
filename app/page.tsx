'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// ----------------------------------------------------------------------
// 데이터 정의
// ----------------------------------------------------------------------

// 1. 대표 장비 데이터
const equipmentList = [
  { id: '1', name: 'SCE8000A', category: 'Crawler Crane', manufacturer: 'SANY', tonnage: '800t', image: '/images/landing/sec8000a.jpg' },
  { id: '2', name: 'SCE2500TB', category: 'Crawler Crane', manufacturer: 'SANY', tonnage: '250t', image: '/images/landing/sce2500tb_tn.jpg' },
  { id: '3', name: 'SCE4000A-1', category: 'Crawler Crane', manufacturer: 'SANY', tonnage: '400t', image: '/images/landing/sce4000a_1.png' },
  { id: '4', name: 'SCX2500', category: 'Crawler Crane', manufacturer: 'HITACHI SUMITOMO', tonnage: '250t', image: '/images/landing/SCX2500.png' },
];

// 2. 사업 영역 데이터
const businessFields = [
  {
    id: 1,
    title: '토목건설',
    eng: 'Civil & Construction Field',
    desc: '교량, 대형거더설치, 엔지니어링, 조달청 및 공공인프라',
    icon: '/images/landing/01_Civil_Construction-Field.png', 
  },
  {
    id: 2,
    title: '공장플랜트',
    eng: 'Factory & Plant Field',
    desc: '정유석유화학, 공장플랜트, 철강제련 및 반도체',
    icon: '/images/landing/02_Factory_Plant-Field.png',
  },
  {
    id: 3,
    title: '풍력에너지',
    eng: 'Power station & Windpower',
    desc: '화력/수력/원자력 발전소, 육해상풍력 T&I',
    icon: '/images/landing/03_Powerstation_windpower.png',
  },
  {
    id: 4,
    title: '물류항만',
    eng: 'Logistics & Port Field',
    desc: '항만물류, 창고/물류센터, 중량물설치',
    icon: '/images/landing/04_Logistics.png',
  },
  {
    id: 5,
    title: '조선해양',
    eng: 'Shipbuilding & Offshore Field',
    desc: '선박블록, 해양모듈/플랫폼, Oil&가스',
    icon: '/images/landing/05_Shipbuilding.png',
  },
  {
    id: 6,
    title: '특수사업',
    eng: 'Specialty Field',
    desc: '긴급구난, 재난구조, 대형조형물, 구조물 해체',
    icon: '/images/landing/06_Specialty.png',
  },
  {
    id: 7,
    title: '엔지니어링, 컨설팅',
    eng: 'Engineering & Consulting Field',
    desc: '기술설계, 안정성검토, 교육',
    icon: '/images/landing/07_Engineering.png',
  },
];

// 3. 고객사 로고 데이터 (logo 폴더)
const allCustomers = [
  'logo_0000_01-samsung.png',
  'logo_0001_02-samsung-en.png',
  'logo_0002_03-cj.png',
  'logo_0003_04-dongbang.png',
  'logo_0004_05-GS-gs.png',
  'logo_0005_06-hyundai.png',
  'logo_0006_07-lotte.png',
  'logo_0007_08-lotte-enc.png',
  'logo_0008_09-skecoplant.png',
  'logo_0009_11-dosan.png',
  'logo_0010_12-cnpluse.png',
  'logo_0011_13-dawoo.png',
  'logo_0012_14-da-enc.png',
  'logo_0013_21-yh.png',
  'logo_0014_20-kec.png',
  'logo_0015_18-sebang.png',
  'logo_0016_17sampyo-ec.png',
  'logo_0017_16-dl-enc.png',
  'logo_0018_16-hyosung.png',
  'logo_0019_15-ollbank.png'
];

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  
  // 터치 제스처 상태 관리
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerSlide = window.innerWidth < 768 ? 1 : window.innerWidth < 1280 ? 2 : 3;
      setItemsPerSlide(newItemsPerSlide);
      
      // itemsPerSlide 변경 시 currentSlide가 maxIndex를 초과하지 않도록 조정
      setCurrentSlide((prev) => {
        const isMobile = window.innerWidth < 768;
        const currentMaxIndex = isMobile 
          ? Math.max(0, businessFields.length - 1)
          : Math.max(0, businessFields.length - newItemsPerSlide);
        return Math.min(prev, currentMaxIndex);
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 모바일에서는 마지막 카드까지 이동 가능하도록 maxIndex 계산
  const maxIndex = itemsPerSlide === 1 
    ? Math.max(0, businessFields.length - 1) // 모바일: 마지막 카드 인덱스
    : Math.max(0, businessFields.length - itemsPerSlide); // 데스크톱: 기존 로직 유지

  // currentSlide가 maxIndex를 초과하지 않도록 보호
  useEffect(() => {
    if (currentSlide > maxIndex) {
      setCurrentSlide(maxIndex);
    }
  }, [currentSlide, maxIndex]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const isMobile = window.innerWidth < 768;
      const currentMaxIndex = isMobile 
        ? Math.max(0, businessFields.length - 1)
        : Math.max(0, businessFields.length - itemsPerSlide);
      return Math.min(prev + 1, currentMaxIndex);
    });
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // 터치 제스처 핸들러
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // 모바일인지 확인 (화면 너비로 직접 확인)
    const isMobile = window.innerWidth < 768;
    const currentMaxIndex = isMobile 
      ? Math.max(0, businessFields.length - 1) // 모바일: 마지막 카드 인덱스
      : Math.max(0, businessFields.length - itemsPerSlide); // 데스크톱

    if (isLeftSwipe) {
      setCurrentSlide((prev) => {
        if (prev >= currentMaxIndex) {
          return prev; // 경계 유지
        }
        return prev + 1;
      });
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => {
        if (prev <= 0) {
          return 0; // 경계 유지
        }
        return prev - 1;
      });
    }
    
    setIsDragging(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let timeoutId: NodeJS.Timeout;
    const handleEnded = () => {
      timeoutId = setTimeout(() => {
        video.currentTime = 0; 
        video.play().catch((e) => console.log("Playback failed", e)); 
      }, 5000);
    };
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
      clearTimeout(timeoutId);
    };
  }, []);

  // Landing page에서 body 배경색을 투명하게 설정하여 헤더 뒤에 비디오만 보이도록
  // 목적: 이전에 발생했던 "헤더 뒤 흰색 띠" 문제를 해결하기 위한 코드입니다.
  // 페이지가 마운트될 때 body 배경을 투명하게 만들어, 비디오가 헤더 영역까지 꽉 찼을 때 뒤에 숨겨진 흰색 배경이 보이지 않게 처리했습니다.
  useEffect(() => {
    // CSS 변수 오버라이드 (globals.css의 --background 변수)
    const root = document.documentElement;
    root.style.setProperty('--background', 'transparent', 'important');
    
    // body와 html의 배경색을 완전히 투명하게 설정
    document.body.style.setProperty('background-color', 'transparent', 'important');
    document.body.style.setProperty('background', 'transparent', 'important');
    document.documentElement.style.setProperty('background-color', 'transparent', 'important');
    document.documentElement.style.setProperty('background', 'transparent', 'important');
    
    // 추가로 모든 가능한 배경 관련 속성 제거
    const bodyElement = document.body;
    bodyElement.style.setProperty('background-image', 'none', 'important');
    bodyElement.style.setProperty('background-clip', 'padding-box', 'important');
    
    return () => {
      // 컴포넌트 언마운트 시 원래대로 복구
      root.style.removeProperty('--background');
      document.body.style.removeProperty('background-color');
      document.body.style.removeProperty('background');
      document.body.style.removeProperty('background-image');
      document.body.style.removeProperty('background-clip');
      document.documentElement.style.removeProperty('background-color');
      document.documentElement.style.removeProperty('background');
    };
  }, []);

  return (
    <main className="w-full text-white" style={{ backgroundColor: 'transparent', background: 'transparent' }}>
      
      {/* 1. Hero Section */}
      {/* [중요] relative와 h-screen만 있어야 합니다. mt-20이나 pt-20 같은 여백이 있으면 안 됩니다. */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* 비디오: absolute top-0으로 헤더 바로 뒤에 붙어야 함 */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex flex-col items-end justify-center text-right px-4 md:px-8 lg:px-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-2xl">
              Heavy Lifting Specialist
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg font-light">
              최고의 장비와 기술력으로 안전한 건설 현장을 책임집니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Section 1: SANY Video */}
      <section className="relative w-full py-24 bg-[#111]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-3/5 relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/videos/sany.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
            <div className="w-full lg:w-2/5 flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-0.5 w-10 bg-red-600 inline-block"></span>
                <span className="text-red-500 font-bold tracking-widest text-sm uppercase">
                  Featured Equipment
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                SANY <br />
                <span className="text-gray-500">Global Partnership</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                글로벌 중장비 브랜드 SANY와의 파트너십을 통해 
                최신 기술이 집약된 장비를 도입하였습니다. 
                더 강력해진 인양 능력과 정밀한 제어 시스템을 경험해보세요.
              </p>
              <div>
                <button className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-all flex items-center gap-2 group">
                  장비 자세히 보기
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section 2: Equipment Grid */}
      <section className="relative w-full py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="mb-16">
            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-2 block">
              Featured Equipment
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              주요 보유 장비 <span className="text-gray-500 font-normal">Equipment</span>
            </h2>
            <p className="w-full text-gray-400 text-lg leading-relaxed border-l-4 border-blue-600 pl-4">
              현장 상황에 맞는 최적의 크레인을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipmentList.map((item) => (
              <Link
                key={item.id}
                href={`/equipment/detail?id=${item.id}`}
                className="group block overflow-hidden rounded-[30px] shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 border border-gray-800"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-white">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-300"><span className="text-sm">No Image</span></div>
                  )}
                </div>
                <div className="relative flex h-[190px] flex-col justify-between bg-[#2a2a2a] p-6 group-hover:bg-[#333] transition-colors">
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-bold text-white">{item.name}</h3>
                    <div className="space-y-2">
                      {item.category && <span className="inline-block rounded bg-gray-700 px-2 py-1 text-xs font-semibold uppercase text-gray-300">{item.category}</span>}
                      <div className="space-y-1 text-sm font-medium text-gray-400">
                        {item.manufacturer && <p>{item.manufacturer}</p>}
                        {item.tonnage && <p>{item.tonnage}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="flex items-center gap-1.5 rounded-full bg-white px-6 py-2 text-xs font-bold text-black transition-all duration-200 hover:scale-105 hover:bg-blue-500 hover:text-white">
                      <span>DETAILS</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section 3: Business Field */}
      <section className="relative w-full py-24 bg-[#111] text-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative">
          
          <div className="mb-12">
            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-2 block">
              Total Lifting Solution
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="block md:inline">사업 영역</span>
              <span className="block md:inline text-gray-500 font-normal md:ml-2">Business Fields</span>
            </h2>
            <p className="w-full text-gray-400 text-lg leading-relaxed border-l-4 border-blue-600 pl-4">
              다양한 건설 환경과 고객의 니즈에 맞춰 최적의 중장비 솔루션을 제공하는 비즈니스 파트너입니다.
            </p>
          </div>

          <div className="relative px-4 md:px-10">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full border border-gray-700 bg-[#1a1a1a] text-white hover:border-blue-500 hover:text-blue-500 transition-all shadow-xl items-center justify-center
                ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:scale-110'}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlide >= maxIndex}
              className={`hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full border border-gray-700 bg-[#1a1a1a] text-white hover:border-blue-500 hover:text-blue-500 transition-all shadow-xl items-center justify-center
                ${currentSlide >= maxIndex ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:scale-110'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="overflow-hidden">
              <div 
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-out gap-0 md:gap-0"
                style={{ 
                  transform: itemsPerSlide === 1 
                    ? `translateX(-${currentSlide * 100}%)` // 모바일: 카드 너비 100%
                    : `translateX(-${currentSlide * (100 / itemsPerSlide)}%)` // 데스크톱: 현재 UI 유지
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {businessFields.map((field) => (
                  <div 
                    key={field.id}
                    className="flex-shrink-0 px-3"
                    style={{ 
                      width: itemsPerSlide === 1 ? '100%' : `${100 / itemsPerSlide}%`
                    }}
                  >
                    <div className="group relative w-full h-[450px] rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 bg-[#161616]">
                      <div className="absolute inset-0 bg-[#161616]">
                         <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#121212] opacity-50" />
                      </div>
                      <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
                        <p className="text-[11px] text-blue-400 font-bold uppercase tracking-widest border border-blue-500/30 px-3 py-1.5 rounded bg-[#1a1a1a]/80 backdrop-blur-sm">
                          {field.eng}
                        </p>
                        <ArrowUpRight className="text-gray-500 w-5 h-5 group-hover:text-blue-500 transition-colors duration-300" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        {field.icon ? (
                          <div className="relative w-28 h-28 opacity-100 scale-100 group-hover:scale-110 transition-transform duration-300 ease-out">
                            <Image
                              src={field.icon}
                              alt={field.title}
                              fill
                              className="object-contain drop-shadow-2xl"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-gray-800/30 animate-pulse" />
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-8 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-500 transition-colors duration-300">
                          {field.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-700 pt-4 group-hover:text-gray-300 transition-colors">
                          {field.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 모바일 시각적 인디케이터 */}
            {itemsPerSlide === 1 && (
              <div className="flex justify-center gap-2 mt-6 md:hidden">
                {businessFields.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-blue-500'
                        : 'w-2 bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Section 4: Customers Sliding Animation [수정됨] */}
      <section className="relative w-full py-24 bg-[#1a1a1a] text-white overflow-hidden border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-7xl mb-12">
          <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-2 block">
            Our Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            주요 고객사 <span className="text-gray-500 font-normal">Customers</span>
          </h2>
          <p className="w-full text-gray-400 text-lg leading-relaxed border-l-4 border-blue-600 pl-4">
            국내외 최고의 기업들과 함께 성장하고 있습니다.
          </p>
        </div>

        {/* Sliding Single Row: Right to Left (기존 왼쪽 흐름 유지 = Right to Left 시각효과) */}
        {/* bg-white 제거, opacity 및 grayscale 적용으로 어두운 배경에 맞춤 */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {/* 리스트를 두 번 반복하여 끊김 없는 무한 스크롤 구현 */}
            {[...allCustomers, ...allCustomers].map((logo, index) => (
              <li key={`customer-${index}`}>
                 {/* 로고 가시성 개선 */}
                 <div className="relative w-40 h-20 md:w-48 md:h-24 opacity-100 hover:opacity-100 transition-opacity duration-300 bg-white/20 rounded-lg p-2">
                    <Image 
                      src={`/images/logo/${logo}`} 
                      alt="customer logo" 
                      fill
                      className="object-contain brightness-110 contrast-110 hover:brightness-125 hover:contrast-125 transition-all duration-300"
                      style={{ filter: 'grayscale(20%)' }}
                    />
                 </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Animation Keyframes */}
        <style jsx global>{`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            /* [수정] 80초로 설정하여 아주 천천히 흐르도록 함 */
            animation: infinite-scroll 80s linear infinite; 
            width: max-content;
          }
          .animate-infinite-scroll:hover {
             animation-play-state: paused;
          }
        `}</style>
      </section>

    </main>
  );
}