'use client';

import { useRef, useState, useEffect } from 'react';

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
  
  let borderColor = 'border-blue-500/30';
  let bgColor = 'bg-white/5';
  let textColor = 'text-gray-200';
  let subColor = 'text-gray-400';
  let hoverBorder = 'hover:border-blue-400';

  if (active) {
    borderColor = 'border-blue-500';
    bgColor = 'bg-blue-600/20';
    textColor = 'text-white';
    subColor = 'text-blue-200';
  } else if (type === 'outsourcing') {
    borderColor = 'border-dashed border-gray-500/50';
  } else if (type === 'family') {
     borderColor = 'border-gray-500/50';
  }

  return (
    <div className={`relative group flex flex-col items-center justify-center p-3 rounded-lg border backdrop-blur-md transition-all duration-300 shadow-lg z-20
      ${bgColor} ${borderColor} ${!active && hoverBorder}
      ${className}`}>
      <span className={`text-base md:text-lg font-bold ${textColor} group-hover:text-white text-center break-keep leading-tight`}>
        {title}
      </span>
      {sub && (
        <span className={`text-[10px] md:text-xs mt-1 ${subColor} group-hover:text-blue-300 text-center`}>
          {sub}
        </span>
      )}
    </div>
  );
};

export default function OrganizationPage() {
  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      
      {/* 배경 그리드 효과 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
        
        {/* ====================================================================
            조직도 (Organization Chart)
           ==================================================================== */}
        <section className="relative">
          <div className="text-center mb-24">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest mb-4 uppercase">
              Organization
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
              조직도
            </h2>
            <p className="text-gray-400 text-lg">
              체계적인 시스템과 전문 인력의 유기적인 협력
            </p>
          </div>

          {/* ================= DESKTOP VIEW (PC) ================= */}
          <div className="hidden lg:block w-full max-w-[1200px] mx-auto pb-40 relative">
            
            {/* 전체 레이아웃 (Grid/Flex 조합) */}
            <div className="flex justify-center w-full relative">
              
              {/* 좌/우 컨테이너 */}
              <div className="w-full flex items-start gap-10 px-10 relative">
                
                {/* 대표 박스 (모든 카드 위에 배치, 장비사업과 풍력사업 중간) */}
                <div className="absolute left-[calc(70%+1.25rem-140px)] top-0 -translate-x-1/2 flex flex-col items-center z-20">
                  <OrgNode title="대표" className="w-64 py-4 text-xl !bg-[#1a1a1a] !border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]" active />
                </div>
                
                {/* --- [LEFT WING] 장비사업 (70%) --- */}
                <div className="w-[70%] flex flex-col items-center relative pt-20">
                  
                  <div className="relative bg-[#111] border border-white/10 p-6 rounded-2xl z-10 backdrop-blur-md w-full">
                    {/* 장비사업 CEO */}
                    <div className="flex items-center justify-center mb-6">
                      <OrgNode title="장비사업(CEO)" className="w-full max-w-xs py-3 text-lg font-bold" />
                    </div>

                    {/* QSHE실 (장비사업 아래 우측) */}
                    <div className="flex items-center justify-end mb-6 pr-[12%]">
                      <OrgNode title="QSHE실(CSO)" className="w-40 py-3" />
                    </div>

                    {/* TEAMS (영업/운영/경영/해외) */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-bold">Teams</p>
                      <div className="grid grid-cols-4 gap-3">
                        {['영업팀', '운영팀', '경영지원팀', '해외사업팀'].map((team, i) => (
                          <OrgNode key={i} title={team} className="py-2 text-sm" />
                        ))}
                      </div>
                    </div>

                    {/* BRANCHES (서울/평택/호남/동해) */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-bold">Branches</p>
                      <div className="grid grid-cols-4 gap-3">
                        {['서울지점', '평택지점', '호남지점', '동해지점'].map((branch, i) => (
                          <OrgNode key={i} title={branch} className="py-2 text-sm border-blue-500/20" />
                        ))}
                      </div>
                    </div>

                    {/* Family Company (장비사업 아래) */}
                    <div>
                      <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-bold">Family Company</p>
                      <div className="flex flex-col gap-3">
                        <OrgNode title="승원씨앤에스(주)" className="py-2 text-sm" type="family" />
                        <OrgNode title="범한건설중기(주)" className="py-2 text-sm" type="family" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- [RIGHT WING] 풍력사업 (30%) --- */}
                <div className="w-[30%] flex flex-col items-center relative pt-20">
                  
                  <div className="relative bg-[#111] border border-white/10 p-6 rounded-2xl z-10 backdrop-blur-md w-full">
                    {/* Outsourcing 섹션 */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-bold">Outsourcing</p>
                      {/* 풍력사업 CEO */}
                      <div className="flex items-center justify-center">
                        <OrgNode title="풍력사업(CEO)" className="w-full max-w-xs py-3 text-lg font-bold" />
                      </div>
                    </div>

                    {/* Outsourcing 하위 Teams */}
                    <div className="flex flex-col gap-3">
                      {['기획설계', '물류팀', '장비설치팀'].map((team, i) => (
                        <OrgNode key={i} title={team} className="py-2 text-sm w-full" />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ================= MOBILE VIEW ================= */}
          <div className="block lg:hidden space-y-12">
            <div className="flex flex-col items-center">
              <OrgNode title="대표" className="w-full max-w-xs py-4 text-xl !bg-[#1a1a1a] !border-blue-500 shadow-lg" active />
            </div>

            <div className="space-y-12 relative px-2">

              <div className="relative bg-[#111] border border-white/10 p-6 rounded-2xl z-10 backdrop-blur-md">
                <OrgNode title="장비사업 (CEO)" className="w-full mb-6 py-3 text-lg font-bold" />
                
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-bold">Teams</p>
                    <div className="grid grid-cols-2 gap-3">
                      {['영업팀', '운영팀', '경영지원팀', '해외사업팀'].map((team) => (
                        <OrgNode key={team} title={team} className="py-2 text-sm" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-bold">Branches</p>
                    <div className="grid grid-cols-2 gap-3">
                      {['서울지점', '평택지점', '호남지점', '동해지점'].map((branch) => (
                        <OrgNode key={branch} title={branch} className="py-2 text-sm border-blue-500/20" />
                      ))}
                    </div>
                  </div>
                  
                  {/* QSHE실 (장비사업 아래 우측) */}
                  <div className="flex justify-end mt-6 relative">
                    <OrgNode title="QSHE실 (CSO)" className="w-2/3 py-2 text-sm bg-blue-900/10 border-blue-500/30" />
                  </div>

                  {/* Family Company */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="text-center mb-4">
                      <span className="text-xs text-gray-500 uppercase tracking-widest">Family Company</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <OrgNode title="승원씨앤에스(주)" className="py-2 text-sm border-dashed" />
                      <OrgNode title="범한건설중기(주)" className="py-2 text-sm border-dashed" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative bg-[#111] border border-white/10 p-6 rounded-2xl z-10 backdrop-blur-md">
                {/* Outsourcing 섹션 */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-bold">Outsourcing</p>
                  <OrgNode title="풍력사업 (CEO)" className="w-full py-3 text-lg font-bold" />
                </div>
                
                {/* Outsourcing 하위 Teams */}
                <div className="flex flex-col gap-3">
                  {['기획설계', '물류팀', '장비설치팀'].map((team) => (
                    <OrgNode key={team} title={team} className="py-2 text-sm w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}
