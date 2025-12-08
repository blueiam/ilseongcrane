'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn, Download } from 'lucide-react';

// ----------------------------------------------------------------------
// 데이터 정의
// ----------------------------------------------------------------------
// 추후 인증서가 추가되면 이 배열에 객체만 추가하면 자동으로 화면에 나옵니다.
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
  // 예시: 나중에 추가될 때 아래 주석을 풀고 사용하세요
  // {
  //   id: 4,
  //   category: '면허',
  //   title: '건설업 등록증',
  //   image: '/images/sustainability/license.jpg',
  // },
];

export default function CertificationsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/sustainability/section4.png"
          alt="Certifications"
          fill
          className="object-cover object-center"
          priority
          quality={80}
        />

        {/* Title Content with Animation */}
        <div className="relative flex h-full flex-col items-center justify-center px-4">
          <h1
            className={`text-5xl font-bold text-white transition-all duration-[2000ms] ease-out translate-y-[80px] mb-4 ${
              isVisible
                ? 'scale-100 opacity-100'
                : 'scale-[2] opacity-0'
            }`}
          >
            등록/면허/인증
          </h1>
          <p className={`text-lg text-white/90 max-w-2xl text-center transition-all duration-[2000ms] ease-out delay-300 translate-y-[80px] ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[80px]'
          }`}>
            일성크레인의 투명한 경영과 검증된 기술력을 증명하는 각종 인증 현황입니다.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen bg-white text-gray-900 py-24">
        <div className="container mx-auto px-4 max-w-7xl">

        {/* 탭 카테고리 (필요시 활성화, 현재는 전체 보여줌) */}
        {/* <div className="flex gap-4 mb-8">
          <button className="px-4 py-2 bg-gray-800 text-white rounded">전체</button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">등록증</button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">인증서</button>
        </div> */}

        {/* 인증서 그리드 리스트 */}
        <div className="flex flex-wrap justify-center gap-8">
          {certItems.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-xs"
              onClick={() => setSelectedImage(item.image)}
            >
              {/* 이미지 썸네일 영역 */}
              <div className="relative w-full aspect-[1/1.414] (A4비율) bg-gray-100 border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-500">
                {/* 실제 이미지 */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* 호버 오버레이 (돋보기 아이콘) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 p-3 rounded-full shadow-lg">
                    <ZoomIn className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* 텍스트 정보 */}
              <div className="mt-4 text-center">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs font-bold mb-2 rounded">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      {/* 이미지 확대 모달 (Lightbox) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          {/* 닫기 버튼 */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>

          {/* 모달 이미지 컨테이너 */}
          <div 
            className="relative w-full h-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 닫기 방지
          >
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Certificate Detail"
                fill
                className="object-contain"
              />
            </div>
            
            {/* 하단 다운로드 버튼 (선택사항) */}
            <a 
              href={selectedImage} 
              download
              className="mt-4 flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-4 h-4" />
              이미지 다운로드
            </a>
          </div>
        </div>
      )}
        </div>
      </main>
    </>
  );
}