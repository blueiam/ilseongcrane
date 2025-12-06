'use client';

import Image from 'next/image';
import { CustomersHero } from '@/app/_components/CustomersHero';

// 고객사 데이터 (실제 파일명에 맞춰 경로 수정)
const customers = [
  { name: '삼성물산', src: '/images/customers/_0025_samsung-cnt.png' },
  { name: '삼성엔지니어링', src: '/images/customers/_0024_samsung-engineering.png' },
  { name: 'CJ 대한통운', src: '/images/customers/_0023_cj-logistics.png' },
  { name: '동방', src: '/images/customers/_0022_dongbang.png' },
  { name: 'GS 칼텍스', src: '/images/customers/_0021_gs-caltex.png' },
  { name: '현대제철', src: '/images/customers/_0020_hyundai-steel.png' },
  { name: '롯데케미칼', src: '/images/customers/_0019_lotte-chemical.png' },
  { name: '롯데건설', src: '/images/customers/_0018_lotte-enc.png' },
  { name: 'SK 에코플랜트', src: '/images/customers/_0017_sk-ecoplant.png' },
  { name: '대아이앤씨', src: '/images/customers/_0016_daea-enc.png' },
  { name: '대우에스티', src: '/images/customers/_0015_daewoo-st.png' },
  { name: 'CNPLUS', src: '/images/customers/_0014_cnplus.png' },
  { name: '두산중공업', src: '/images/customers/_0013_doosan.png' },
  { name: '포스코플랜텍', src: '/images/customers/_0012_posco-plantec.png' },
  { name: '현대오일뱅크', src: '/images/customers/_0011_hyundai-oilbank.png' },
  { name: '효성중공업', src: '/images/customers/_0010_hyosung.png' },
  { name: 'DL E&C', src: '/images/customers/_0009_dl-enc.png' },
  { name: '삼표 E&C', src: '/images/customers/_0008_sampyo.png' },
  { name: '세방', src: '/images/customers/_0007_sebang.png' },
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

