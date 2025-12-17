// app/_components/ProjectsHero.tsx
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function ProjectsHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 컴포넌트 마운트 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-[400px] w-full overflow-hidden z-30">
      {/* Background Image */}
      <Image
        src="/hero/business.jpg"
        alt="Projects Background"
        fill
        className="object-cover object-[25%_center] md:object-center"
        priority
        quality={95}
      />

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
          Projects
        </h1>
      </div>
    </div>
  )
}
















