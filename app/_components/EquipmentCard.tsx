// app/_components/EquipmentCard.tsx
'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export type EquipmentCardProps = {
  id: string
  name: string
  category?: string | null
  manufacturer?: string | null
  tonnage?: string | null
  thumbnailUrl?: string | null
}

export function EquipmentCard({
  id,
  name,
  category,
  manufacturer,
  tonnage,
  thumbnailUrl,
}: EquipmentCardProps) {
  return (
    <Link
      href={`/equipment/detail?id=${id}`}
      className="group block overflow-hidden rounded-[30px] shadow-lg transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* 상단: 이미지 영역 (60% 높이) */}
      <div className="relative h-[280px] overflow-hidden bg-white">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <span className="text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* 하단: 정보 영역 (40% 높이) - 다크 테마 */}
      <div className="relative flex h-[190px] flex-col justify-between bg-[#575757] p-6">
        {/* 텍스트 블록 */}
        <div className="flex-1">
          <h3 className="mb-3 text-2xl font-bold text-white">{name}</h3>
          <div className="space-y-2">
            {/* Category Badge */}
            {category && (
              <span className="inline-block rounded bg-[#EDEDED] px-1 py-1 text-xs font-semibold uppercase text-gray-800">
                {category}
              </span>
            )}
            {/* Manufacturer & Tonnage */}
            <div className="space-y-1 text-sm font-medium text-gray-200">
              {manufacturer && <p>{manufacturer}</p>}
              {tonnage && <p>{tonnage}</p>}
            </div>
          </div>
        </div>

        {/* 버튼 (우측 하단) - 밝은 배경으로 반전 */}
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.preventDefault()
              window.location.href = `/equipment/detail?id=${id}`
            }}
            className="flex items-center gap-1.5 rounded-full bg-white px-6 py-2 text-xs font-bold text-black transition-all duration-200 hover:scale-105 hover:bg-gray-100"
          >
            <span>DETAILS</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Link>
  )
}
