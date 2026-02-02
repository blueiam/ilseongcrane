'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react'; // X 아이콘 사용 (lucide-react가 없다면 텍스트 'X'로 대체 가능)

export default function MainPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 로컬 스토리지 확인 (7일 설정이 있는지 체크)
    const hideUntil = localStorage.getItem('popup_hide_7days');
    const now = new Date().getTime();

    // 설정된 시간이 없거나, 현재 시간이 설정된 시간보다 지났다면 팝업 노출
    if (!hideUntil || now > parseInt(hideUntil)) {
      setIsVisible(true);
    }
  }, []);

  // 그냥 닫기
  const handleClose = () => {
    setIsVisible(false);
  };

  // 7일간 보지 않기 (닫기 포함)
  const handleDoNotShowWeek = () => {
    const now = new Date().getTime();
    // 현재 시간 + 7일 (밀리초 단위)
    const sevenDaysLater = now + (7 * 24 * 60 * 60 * 1000);
    
    localStorage.setItem('popup_hide_7days', sevenDaysLater.toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    // 배경 오버레이 (클릭 시 닫기 기능을 원하면 onClick 추가)
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* 팝업 컨테이너 */}
      <div className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        
        {/* 상단 닫기 버튼 (옵션) */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <X className="w-6 h-6 text-slate-900" />
        </button>

        {/* 이미지 영역 - 클릭 시 상세 페이지로 이동 */}
        <Link 
          href="/equipment/detail?id=bcd5c041-7bc2-440e-a635-39f1384c3bbf"
          className="relative w-full aspect-[4/5] md:aspect-square block cursor-pointer"
          onClick={handleClose}
        >
          <Image
            src="/images/landing/crane1600.jpeg"
            alt="공지사항"
            fill
            className="object-cover"
            priority
          />

          {/* Copy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/60" />
          <div className="absolute inset-0 flex items-end p-6">
            <p className="text-white text-lg md:text-xl font-extrabold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] whitespace-pre-line">
              <span className="block text-xl md:text-2xl font-black tracking-wider text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                NEW ARRIVAL
              </span>
              {`CRAWLER CRANE CC-8800-1 (1600Ton C/C)\n해상풍력 15Mw급 설치 가능 크레인 도입`}
            </p>
          </div>
        </Link>

        {/* 하단 버튼 영역 */}
        <div className="flex border-t border-slate-200">
          {/* 7일간 보지 않기 */}
          <button
            onClick={handleDoNotShowWeek}
            className="flex-1 py-4 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors border-r border-slate-200"
          >
            일주일 동안 보지 않기
          </button>
          
          {/* 닫기 */}
          <button
            onClick={handleClose}
            className="flex-1 py-4 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}