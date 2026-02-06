'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, Factory, Wind, Ship, Container, DraftingCompass } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import MainPopup from './_components/popup/MainPopup';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 교량 아이콘 (커스텀 SVG)
const BridgeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12v2h18v-2M3 12v-2h18v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 14v6M10 14v6M14 14v6M18 14v6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 20h20" />
  </svg>
);

// 싸이렌/비상 아이콘 (제공된 SVG 사용)
const SirenIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 98 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M49.2627 29C53.3158 29 55.3426 28.9997 57.0723 29.2529C66.9265 30.6962 74.866 38.0761 77.0244 47.7988C77.4033 49.5054 77.5509 51.5268 77.8467 55.5693L80 85H19L20.6484 56.0322C20.8821 51.9256 20.9987 49.8722 21.3564 48.1416C23.3957 38.2762 31.3794 30.7343 41.3447 29.2588C43.0928 29 45.1495 29 49.2627 29ZM49.3135 35C37.6104 35.0002 27.945 44.1413 27.293 55.8262L26 79H73L71.3125 55.4766C70.4846 43.9381 60.8817 35 49.3135 35Z" fill="currentColor"/>
    <rect x="45" width="10" height="24" rx="5" fill="currentColor"/>
    <rect y="19.071" width="10" height="24" rx="5" transform="rotate(-45 0 19.071)" fill="currentColor"/>
    <rect width="10" height="24" rx="5" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 97.0417 19.071)" fill="currentColor"/>
  </svg>
);

// ----------------------------------------------------------------------
// 데이터 정의
// ----------------------------------------------------------------------

// 대표 장비 기본 데이터
const defaultEquipmentList: EquipmentItem[] = [
  { id: 'de761616-8fcb-4cc1-acc3-e14cb31e6ac9', name: 'SCE8000A', category: 'Crawler Crane', manufacturer: 'SANY', tonnage: '800T', image: '/images/landing/sec8000a.jpg' },
  { id: '2', name: 'CC2800-1', category: 'Crawler Crane', manufacturer: 'TEREX DEMAG', tonnage: '600T', image: '/images/equipments/Thumbnail/400x400_0015_terex-demag-cc2800-1-400px.png' },
  { id: '3', name: 'FCC400', category: 'Crawler Crane', manufacturer: 'FUWA', tonnage: '400T', image: '/images/equipments/Thumbnail/400x400_0014_fuwa-fcc400-400px.png' },
  { id: '4', name: 'SCE2500TB', category: 'Crawler Crane', manufacturer: 'SANY', tonnage: '250T', image: '/images/landing/sce2500tb_tn.jpg' },
];

const featuredEquipmentModels = ['SCE8000A', 'CC2800-1', 'FCC400', 'SCE2500TB'];

// 2. 사업 영역 데이터 (이미지 경로 수정됨)
const businessFields = [
  {
    id: 1,
    title: 'SOC',
    eng: 'SOC',
    icon: <BridgeIcon className="w-[90px] h-[90px]" />,
    image: '/images/landing/01-soc-l.jpg',
  },
  {
    id: 2,
    title: '플랜트',
    eng: 'Plants',
    icon: <Factory className="w-[90px] h-[90px]" />,
    image: '/images/landing/02-l.jpg',
  },
  {
    id: 3,
    title: '에너지',
    eng: 'Energy',
    icon: <Wind className="w-[90px] h-[90px]" />,
    image: '/images/landing/03-l.jpg',
  },
  {
    id: 4,
    title: '조선해양',
    eng: 'Shipbuilding',
    icon: <Ship className="w-[90px] h-[90px]" />,
    image: '/images/landing/04-l.jpg',
  },
  {
    id: 5,
    title: '물류항만 ',
    eng: 'Port Logistics',
    icon: <Container className="w-[90px] h-[90px]" />,
    image: '/images/landing/05-l.jpg',
  },
  {
    id: 6,
    title: '특수부문',
    eng: 'Special Projects',
    icon: <SirenIcon className="w-[90px] h-[90px]" />,
    image: '/images/landing/06-l.jpg',
  },
  {
    id: 7,
    title: '엔지니어링',
    eng: 'Engineering',
    icon: <DraftingCompass className="w-[90px] h-[90px]" />,
    image: '/images/landing/07-l.jpg',
  },
];

// 3. 고객사 로고 데이터
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

type EquipmentItem = {
  id: string;
  name: string;
  category: string;
  manufacturer: string | null;
  tonnage: string | null;
  image: string;
};

const heroSlides = [
  '/images/landing/main01.jpg',
  '/images/landing/slideno-3.jpeg',
  '/images/landing/main03.png',
];

export default function LandingPage() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [imageZoomed, setImageZoomed] = useState(false);
  const [sanyImageZoomed, setSanyImageZoomed] = useState(false);
  const [hoveredBusinessFieldId, setHoveredBusinessFieldId] = useState<number | null>(1); // Default: SOC (id: 1)

  // Hero 슬라이드 자동 재생
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 이미지 줌인 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageZoomed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentHeroSlide]);

  // SANY 이미지 줌인 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setSanyImageZoomed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // 대표 장비 데이터 가져오기
  useEffect(() => {
    const fetchFeaturedEquipments = async () => {
      try {
        const { data, error } = await supabase
          .from('equipments')
          .select('id, model_name, category, manufacturer, tonnage')
          .in('model_name', featuredEquipmentModels);

        if (error) {
          console.error('Error fetching equipments:', error);
          setEquipmentList(defaultEquipmentList);
          return;
        }

        const updatedEquipments: EquipmentItem[] = defaultEquipmentList.map((defaultEq) => {
          const dbEquipment = data?.find((eq) => eq.model_name === defaultEq.name);
          return {
            ...defaultEq,
            id: dbEquipment?.id || defaultEq.id,
            category: dbEquipment?.category || defaultEq.category,
            manufacturer: dbEquipment?.manufacturer || defaultEq.manufacturer,
            tonnage: dbEquipment?.tonnage || defaultEq.tonnage,
          };
        });

        setEquipmentList(updatedEquipments);
      } catch (err) {
        console.error('Error fetching featured equipments:', err);
        setEquipmentList(defaultEquipmentList);
      }
    };

    fetchFeaturedEquipments();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background', 'transparent', 'important');
    
    document.body.style.setProperty('background-color', 'transparent', 'important');
    document.body.style.setProperty('background', 'transparent', 'important');
    document.documentElement.style.setProperty('background-color', 'transparent', 'important');
    document.documentElement.style.setProperty('background', 'transparent', 'important');
    
    const bodyElement = document.body;
    bodyElement.style.setProperty('background-image', 'none', 'important');
    bodyElement.style.setProperty('background-clip', 'padding-box', 'important');
    
    return () => {
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
      {/* Main Popup (render near top) */}
      <MainPopup />
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-screen overflow-hidden group">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide}
              alt={`Hero slide ${index + 1}`}
              fill
              className={`object-cover object-center transition-transform duration-[10000ms] ease-out ${
                imageZoomed && index === currentHeroSlide ? 'scale-100' : 'scale-125'
              }`}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/10" />
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up w-full flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 drop-shadow-2xl leading-tight text-center">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 text-center">
                Total Heavy Lifting
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 text-center">
                Windpower T&I
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 text-center">
                Specialist
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-100 drop-shadow-lg font-light max-w-2xl mx-auto leading-relaxed whitespace-nowrap text-center">
              최고의 장비와 기술력으로 안전한 건설 현장을 책임집니다.
            </p>
          </div>
        </div>

        <button
          onClick={prevHeroSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all backdrop-blur-sm border border-white/10 hover:border-white/30 group-hover:opacity-100 opacity-0 md:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextHeroSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all backdrop-blur-sm border border-white/10 hover:border-white/30 group-hover:opacity-100 opacity-0 md:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentHeroSlide 
                  ? 'w-8 bg-blue-500' 
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Section 1: SANY Image */}
      <section className="relative w-full py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-3/5 relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src="/images/landing/sany_main.jpg"
                alt="SANY Global Partnership"
                fill
                className={`object-cover object-center transition-transform duration-[10000ms] ease-out ${
                  sanyImageZoomed ? 'scale-100' : 'scale-125'
                }`}
                priority
              />
            </div>
            <div className="w-full lg:w-2/5 flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-0.5 w-10 bg-blue-600 inline-block"></span>
                <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">
                  Featured Equipment
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-900">
                SANY <br />
                <span className="text-slate-600">Global Partnership</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                글로벌 중장비 브랜드 SANY와의 파트너십을 통해 
                최신 기술이 집약된 장비를 도입하였습니다. 
                더 강력해진 인양 능력과 정밀한 제어 시스템을 경험해보세요.
              </p>
              <div>
                <Link href="/equipment" className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 rounded-full font-bold transition-all flex items-center gap-2 group">
                  장비 자세히 보기
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section 2: Equipment Grid */}
      <section className="relative w-full py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2 block">
              Featured Equipment
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              주요 보유 장비 <span className="text-slate-600 font-normal">Equipment</span>
            </h2>
            <p className="w-full text-slate-600 text-lg leading-relaxed border-l-4 border-blue-600 pl-4">
              현장 상황에 맞는 최적의 크레인을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipmentList.map((item) => (
              <Link
                key={item.id}
                href={`/equipment/detail?id=${item.id}`}
                className="group block overflow-hidden rounded-[30px] shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 border border-slate-200 bg-white"
              >
                <div className="relative h-[280px] overflow-hidden bg-white">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400"><span className="text-sm">No Image</span></div>
                  )}
                </div>
                <div className="relative flex h-[190px] flex-col justify-between bg-white p-6 group-hover:bg-slate-50 transition-colors border-t border-slate-200">
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-bold text-slate-900">{item.name}</h3>
                    <div className="space-y-2">
                      {item.category && <span className="inline-block rounded bg-blue-50 border border-blue-200 px-2 py-1 text-xs font-semibold uppercase text-blue-700">{item.category}</span>}
                      <div className="space-y-1 text-sm font-medium text-slate-600">
                        {item.manufacturer && <p>{item.manufacturer}</p>}
                        {item.tonnage && <p>{item.tonnage}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="flex items-center gap-1.5 rounded-full bg-blue-600 px-6 py-2 text-xs font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700">
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

      {/* 4. Section 3: Business Field - Vertical Accordion Gallery */}
      <section className="relative w-full py-24 bg-white text-slate-900 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative">
          
          <div className="mb-12">
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2 block">
              Total Lifting Solution
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="block md:inline">사업 영역</span>
              <span className="block md:inline text-slate-600 font-normal md:ml-2">Business Fields</span>
            </h2>
            <p className="w-full text-slate-600 text-lg leading-relaxed border-l-4 border-blue-600 pl-4">
              다양한 건설 환경과 고객의 니즈에 맞춰 최적의 중장비 솔루션을 제공하는 비즈니스 파트너입니다.
            </p>
          </div>

          {/* Mobile: vertical list (one by one) */}
          <div className="md:hidden space-y-4">
            {businessFields.map((field) => (
              <Link
                key={field.id}
                href="/business/areas"
                className="group relative block h-[180px] w-full overflow-hidden rounded-2xl border border-slate-200"
              >
                <Image src={field.image} alt={field.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
                <div className="relative z-10 flex h-full flex-col justify-center px-6">
                  <span className="inline-flex w-fit px-3 py-1 text-xs font-bold tracking-widest uppercase rounded border border-white/30 bg-white/10 text-white">
                    {field.eng}
                  </span>
                  <h3 className="mt-3 text-2xl font-black text-white">{field.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop/Tablet: constrained width accordion */}
          <div
            className="hidden md:flex relative h-[42vh] gap-0 border border-slate-200 rounded-2xl overflow-hidden"
            onMouseLeave={() => setHoveredBusinessFieldId(1)} // Default: SOC (id: 1)
          >
            {/* Full-area background image on hover */}
            <div className="absolute inset-0 z-0">
              {businessFields.map((field) => (
                <div
                  key={field.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    hoveredBusinessFieldId === field.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image src={field.image} alt={field.title} fill className="object-cover" />
                </div>
              ))}
              {/* Dark Overlay Gradient on Hover - Minimal dimming for brighter images */}
              <div
                className={`absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 transition-opacity duration-500 ${
                  hoveredBusinessFieldId !== null ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {/* Default background when not hovered (only show if no field is active) */}
              <div
                className={`absolute inset-0 bg-slate-100 transition-opacity duration-500 ${
                  hoveredBusinessFieldId === null ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {businessFields.map((field) => {
              const isActive = hoveredBusinessFieldId === field.id;
              return (
                <Link
                  key={field.id}
                  href="/business/areas"
                  onMouseEnter={() => setHoveredBusinessFieldId(field.id)}
                  onFocus={() => setHoveredBusinessFieldId(field.id)}
                  className={`group relative z-10 transition-all duration-500 ease-out overflow-hidden border-r border-slate-200 last:border-r-0 ${
                    isActive ? 'flex-[3]' : 'flex-1'
                  }`}
                >
                  {/* Column separator overlay (keeps borders visible over bg image) */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/0" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
                    {/* English Title - Always reserve space, show on hover/active */}
                    <div className={`h-[32px] mb-4 flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                    }`}>
                      <span className={`px-3 py-1 text-xs font-bold tracking-widest uppercase border rounded transition-all duration-300 ${
                        isActive
                          ? 'text-white border-white/30 bg-white/10'
                          : 'text-blue-600 border-blue-200 bg-blue-50 group-hover:text-white/80 group-hover:border-white/30 group-hover:bg-white/10'
                      }`}>
                        {field.eng}
                      </span>
                    </div>

                    {/* Korean Title - Fixed height for alignment */}
                    <h3 className={`text-2xl font-black transition-all duration-500 whitespace-nowrap ${
                      isActive
                        ? 'text-white scale-[1.3]'
                        : 'text-white/80 group-hover:text-white/80 group-hover:scale-[1.3]'
                    }`}>
                      {field.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Section 4: Customers Sliding Animation */}
      <section className="relative w-full py-24 bg-slate-50 text-slate-900 overflow-hidden border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl mb-12">
          <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2 block">
            Our Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            주요 고객사 <span className="text-slate-600 font-normal">Customers</span>
          </h2>
          <p className="w-full text-slate-600 text-lg leading-relaxed border-l-4 border-blue-600 pl-4">
            국내외 최고의 기업들과 함께 성장하고 있습니다.
          </p>
        </div>

        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {[...allCustomers, ...allCustomers].map((logo, index) => (
              <li key={`customer-${index}`}>
                 <div className="relative w-40 h-20 md:w-48 md:h-24 opacity-100 hover:opacity-100 transition-opacity duration-300 bg-white rounded-lg p-2 shadow-sm hover:shadow-md border border-slate-200">
                    <Image 
                      src={`/images/logo/${logo}`} 
                      alt="customer logo" 
                      fill
                      className="object-contain hover:brightness-110 transition-all duration-300"
                    />
                 </div>
              </li>
            ))}
          </ul>
        </div>

        <style jsx global>{`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
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