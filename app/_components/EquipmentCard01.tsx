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
      className="group block rounded-3xl bg-gradient-to-b from-gray-100 to-gray-200 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Inner White Container */}
      <div className="overflow-hidden rounded-3xl bg-white">
        {/* Image Section */}
        <div className="flex h-60 items-center justify-center overflow-hidden bg-white sm:h-72">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={name}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <span className="text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex items-end justify-between gap-4 rounded-b-3xl bg-gray-100 px-5 py-4">
          {/* Text Block (Left) */}
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-black">{name}</h3>
            {category && (
              <p className="text-sm leading-tight text-gray-500">{category}</p>
            )}
            {manufacturer && (
              <p className="text-sm leading-tight text-gray-500">
                {manufacturer}
              </p>
            )}
            {tonnage && (
              <p className="text-sm leading-tight text-gray-500">{tonnage}</p>
            )}
          </div>

          {/* Details Button (Right) */}
          <button
            onClick={(e) => {
              e.preventDefault()
              window.location.href = `/equipment/detail?id=${id}`
            }}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-gray-900"
          >
            <span>DETAILS</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Link>
  )
}

