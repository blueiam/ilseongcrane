// app/_components/CustomersHero.tsx
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function CustomersHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 컴포넌트 마운트 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero/crane_bg.jpg"
        alt="Major Customers Background"
        fill
        className="object-cover object-[25%_center] md:object-center"
        priority
        quality={80}
      />

      {/* Title Content with Animation */}
      <div className="relative flex h-full items-center justify-center">
        <h1
          className={`text-5xl font-bold text-white transition-all duration-[2000ms] ease-out ${
            isVisible
              ? 'scale-100 opacity-100'
              : 'scale-[2] opacity-0'
          }`}
        >
          Major Customers
        </h1>
      </div>
    </div>
  )
}

