'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface BusinessCardProps {
  title: string;        // 예: 풍력 발전
  subtitle?: string;    // 예: 영덕 호지마을 풍력 발전 현장 (고객사)
  description: string;  // 예: SCE8000A (800Ton)
  imageUrl: string;     // 이미지 경로
  href?: string;        // 클릭 시 이동할 링크 (선택사항)
  category?: string;    // 카테고리
}

export default function BusinessCard({
  title,
  subtitle,
  description,
  imageUrl,
  href = '#', // 기본값 설정
  category,
}: BusinessCardProps) {
  return (
    <Link href={href} className="group relative block w-full max-w-[400px] mx-auto">
      {/* 메인 카드 영역 
        - rounded-[32px]: 이미지의 큰 둥근 모서리 구현
        - shadow-2xl: 깊은 그림자 효과
        - h-[500px]: 카드 높이 고정 (필요에 따라 수정 가능, 또는 aspect-ratio 사용)
      */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-[32px] shadow-xl bg-gray-200 transition-all duration-300 group-hover:shadow-2xl">
        
        {/* 배경 이미지 */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 하단 그라데이션 오버레이 & 텍스트 */}
        {/* bg-gradient-to-t: 아래에서 위로 그라데이션 */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-24 pb-8 px-8 text-white">
          {/* 카테고리 */}
          {category && (
            <p className="text-sm font-medium opacity-80 mb-2">{category}</p>
          )}
          {/* 제목: 한 줄로, 텍스트 크기 줄임 */}
          <h3 className="text-lg font-bold mb-2 line-clamp-1">{title}</h3>
          {/* 고객사 (subtitle) - 있으면 표시 */}
          {subtitle && (
            <p className="text-sm font-medium opacity-90 mb-1">{subtitle}</p>
          )}
          {/* 설명/장비명: 제목과 같은 크기 */}
          <p className="text-lg opacity-70">{description}</p>
        </div>
      </div>

      {/* 우측 상단 화살표 아이콘 버튼 */}
      {/* absolute positioning으로 우측 상단에 배치 */}
      <div className="absolute top-4 right-4 z-10">
        {/* 흰색 테두리 느낌을 주기 위한 래퍼 */}
        <div className="bg-white p-[2px] rounded-full shadow-sm">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-45 group-hover:bg-blue-600">
            <ArrowUpRightIcon className="w-6 h-6 stroke-2" />
          </div>
        </div>
      </div>
    </Link>
  );
}