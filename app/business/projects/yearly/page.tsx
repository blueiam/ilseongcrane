'use client';

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

export default function CustomersPage() {
  return (
    <>
      {/* Hero Section */}
      <CustomersHero />

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* 설명 섹션 */}
          <section className="mb-12 text-center">
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              국내 유수의 기업들과 함께 성장해왔습니다.<br/>
              신뢰받는 파트너로서 최고의 서비스를 제공합니다.
            </p>
          </section>

          {/* 로고 그리드 섹션 */}
          <section>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {customers.map((customer, index) => (
            <div 
              key={index}
              className="group flex items-center justify-center p-6 border border-gray-100 rounded-xl bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300 h-[120px]"
            >
              {/* 이미지 래퍼 */}
              <div className="relative w-full h-full">
                <Image
                  src={customer.src}
                  alt={customer.name}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
          </div>
          </section>
        </div>
      </main>
    </>
  );
}

