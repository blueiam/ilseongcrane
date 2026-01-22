'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CompanyAboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true);
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
          src="/images/about/about_h.jpg"
          alt="회사소개 배경"
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
            인사말 / 회사개요
          </h1>
        </div>
      </div>

      <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        
        {/* 배경 패턴 (은은한 그리드) */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">

        {/* ==================================================================
            SECTION 1: CEO Message (인사말)
        ================================================================== */}
        <section className="mb-40">
          
          {/* 헤더 영역 */}
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest mb-4 uppercase">
              CEO Message
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">
              인사말
            </h1>
          </div>

          {/* 인사말 컨텐츠 */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 첫 번째 인사말 */}
            <div className="text-center md:text-left">
              <p className="text-xl md:text-2xl text-slate-900 font-bold leading-relaxed">
                안녕하십니까.<br />
                일성크레인을 찾아주신 여러분께 깊은 감사의 인사를 드립니다.
              </p>
            </div>

            {/* 이미지 */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about/cityline_01.jpg"
                alt="도시 스카이라인"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
                quality={100}
              />
            </div>

            {/* 나머지 텍스트 */}
            <div className="space-y-6 text-slate-700 leading-relaxed text-base md:text-lg font-light tracking-wide break-keep">
              <p>
              1992년 창사 이래 일성크레인은 30여년 동안 대한민국 산업의 성장과 함께 호흡하며 고객 여러분의 신뢰를 가장 값진 자산으로 삼아 오늘에 이르렀습니다.
              </p>
              <p>
                이제 우리는 또 한 번의 과감한 도전과 도약을 시작합니다.<br className="hidden md:block"/>
                급변하는 산업 환경 속에서 SOC, 플랜트, 풍력설치 등 기존 장비 임대 사업을 넘어 조선해양, 물류항만, 특수부문 및 엔지니어링과 컨설팅부문까지 강화해 나갈 예정이며,
장비운영의 경험과 전문성을 기반으로 육·해상 풍력 T&I 영역까지 사업을 확장하여 대한민국 리프팅 산업의 새로운 이정표를 세우고자 합니다.
              </p>
              <p>
                특히 에너지 전환 시대에 맞춰 추진 중인 육·해상 풍력T&I 부문의 전략적 제휴는<br className="hidden md:block"/>
                일성크레인의 미래를 여는 또 하나의 중요한 발걸음입니다. 고객의 수요에 적극이고 신속하게 대응하기 위하여 전국적 장비 네트워크를 구축하고 최첨단 자동화 리프팅 기술과 시뮬레이션 역량을 바탕으로 고객이 기대하는 수준을 넘어서는 Total Heavy Lift T&I Specialist 전문기업으로 성장하겠습니다.
              </p>
              <p>
                이 모든 여정의 중심에는 언제나 고객과의 신뢰, 그리고 더 나은 미래를 향한 우리의 의지가 있습니다. 앞으로도 일성크레인은 대한민국을 넘어 글로벌 시장에서도 인정받는<br className="hidden md:block"/>
                기술력과 책임감을 갖춘 기업으로 정직하게, 묵묵히, 그러나 흔들림 없이 앞으로 나아가겠습니다.
              </p>
              <p className="font-medium text-slate-900">
                여러분의 변함없는 성원에 깊이 감사드리며, 늘 함께 성장하는 든든한 파트너가 될 것을 약속드립니다.
              </p>
              <p>
                감사합니다.
              </p>
              
              <div className="pt-8 mt-8 border-t border-slate-300 flex items-center justify-end gap-4">
                <div className="text-right">
                  <span className="block text-sm text-slate-600 mb-1">일성크레인 주식회사 대표이사</span>
                  <span className="text-xl text-slate-900 font-bold font-serif">박 철 민</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ==================================================================
            SECTION 2: Company Overview (회사개요)
        ================================================================== */}
        <section className="pt-20 border-t border-slate-200">
          
          <div className="text-center mb-20">
            <span className="inline-block py-1 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest mb-4 uppercase">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">
              회사개요
            </h2>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto">
              고객의 신뢰에 부응하는 대한민국 대표 중장비 솔루션 기업
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            
            {/* 2-1. 개요 텍스트 (Left) */}
            <div>
              <div className="sticky top-32">
                <h3 className="text-3xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-6 leading-tight">
                  국내 대표적인<br />
                  <span className="text-blue-600">중장비 임대 전문 기업</span>
                </h3>
                
                <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-light tracking-wide break-keep">
                  <p>
                    일성크레인은 풍력·플랜트 설치사업 및 장치산업 분야를 중심으로 성장해온 국내 대표적인 중장비 임대 전문 기업입니다.
                  </p>
                  <p>
                    다양한 산업 현장에서 쌓아온 실행 경험과 전문 인력을 기반으로 복잡하고 대형화된 건설·설치 프로젝트를 성공적으로 수행해왔으며, 국내 중장비 업계를 선도해 왔다는 자부심을 가지고 있습니다.
                  </p>
                  <p>
                    앞으로도 일성크레인은 축적된 기술력과 안정적인 운영 시스템을 토대로 고객의 신뢰에 부응하는 대한민국 대표 중장비 임대 전문 기업으로 성장해 나가겠습니다.
                  </p>
                </div>
                
                {/* 회사 이미지 */}
                <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/about/company.jpeg"
                    alt="일성크레인 회사"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 2-2. 정보 테이블 - Light Theme Bento Grid Style (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Full Width Card */}
              <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <p className="text-xs text-blue-600 font-bold uppercase mb-2">Company Name</p>
                <p className="text-xl text-slate-900 font-bold">일성크레인(주)</p>
              </div>

              {/* Half Cards */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <p className="text-xs text-slate-400 font-bold uppercase mb-2">Establishment</p>
                <p className="text-lg text-slate-900">1992년 7월 1일</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <p className="text-xs text-slate-400 font-bold uppercase mb-2">CEO</p>
                <p className="text-lg text-slate-900">박 철 민</p>
              </div>

              {/* Address Card (Full) */}
              <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-2">Headquarter</p>
                    <p className="text-base text-slate-700">경기도 평택시 고덕갈평6길 25, 813호</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-2">Factory & Office</p>
                    <p className="text-base text-slate-700">충청북도 음성군 맹동면 초금로 288</p>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <p className="text-xs text-slate-400 font-bold uppercase mb-2">Main Business</p>
                <p className="text-lg text-slate-900">건설기계 대여 및 매매업, 전문 건설업, 풍력 T&I 물류업 </p>
              </div>

              <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <p className="text-xs text-slate-400 font-bold uppercase mb-2">Business Fields</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['SOC', '플랜트', '에너지', '조선해양', '물류항만', '특수부문', '엔지니어링'].map((field) => (
                    <span key={field} className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium">
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <p className="text-xs text-slate-400 font-bold uppercase mb-2">Employees</p>
                <p className="text-lg text-slate-900">20명</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <p className="text-xs text-slate-400 font-bold uppercase mb-2">Market</p>
                <p className="text-lg text-slate-900">대한민국, 해외</p>
              </div>

            </div>
          </div>
        </section>

      </div>
    </main>
    </>
  );
}