// app/_components/NoticeHero.tsx
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function NoticeHero() {
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
        src="/hero/news_bg.jpg"
        alt="Notice & News Background"
        fill
        className="object-cover object-[75%_center] md:object-center"
        priority
        quality={80}
      />

      {/* Title Content with Animation */}
      <div className="relative flex h-full items-center justify-center">
        <h1
          className={`text-5xl font-bold text-white transition-all duration-[5000ms] ease-out ${
            isVisible
              ? 'scale-100 opacity-100'
              : 'scale-50 opacity-0'
          }`}
        >
          Notice & News
        </h1>
      </div>
    </div>
  )
}

