// app/_components/ArchiveHero.tsx
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ArchiveHeroProps {
  title: string
  backgroundImage?: string
}

export function ArchiveHero({ title, backgroundImage = '/hero/news_bg.jpg' }: ArchiveHeroProps) {
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
        src={backgroundImage}
        alt={`${title} Background`}
        fill
        className="object-cover object-[75%_center] md:object-center"
        priority
        quality={80}
      />

      {/* 어두운 오버레이 (텍스트 가독성 향상) */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Title Content with Animation */}
      <div className="relative flex h-full items-center justify-center z-20">
        <h1
          className={`text-5xl font-bold transition-all duration-[2000ms] ease-out drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] ${
            isVisible
              ? 'scale-100 opacity-100'
              : 'scale-[2] opacity-0'
          }`}
          style={{ color: '#FFFFFF', textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
        >
          {title}
        </h1>
      </div>
    </div>
  )
}

