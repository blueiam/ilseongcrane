// web/app/equipment/page.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { PageShell } from '@/app/_components/PageShell'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Equipment = {
  id: string
  name: string
  manufacturer: string | null
  tonnage: string | null
  category: string
  thumbnail_url: string | null
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'crawler', label: '크롤러' },
  { value: 'mobile', label: '모바일(하이드로)' },
  { value: 'etc', label: '기타' },
]

export default function EquipmentListPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [category, setCategory] = useState<'all' | 'crawler' | 'mobile' | 'etc'>('all')
  const [keyword, setKeyword] = useState('')

  // 최초 1회: 전체 장비 데이터 가져오기
  useEffect(() => {
    const fetchEquipments = async () => {
      const { data, error } = await supabase
        .from('equipments')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setEquipments((data || []) as Equipment[])
      }
      setLoading(false)
    }

    fetchEquipments()
  }, [])

  // 검색/필터 적용된 결과
  const filteredEquipments = useMemo(() => {
    return equipments.filter((item) => {
      // 카테고리 필터
      if (category !== 'all' && item.category !== category) return false

      // 키워드(모델명 기준) 검색
      if (keyword.trim()) {
        const kw = keyword.trim().toLowerCase()
        if (!item.name.toLowerCase().includes(kw)) return false
      }

      return true
    })
  }, [equipments, category, keyword])

  return (
    <PageShell
      title="보유장비"
      subtitle="일성크레인이 보유한 장비 목록입니다."
    >
      {/* 필터 영역 */}
      <div className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        {/* 카테고리 필터 */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">카테고리</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCategory(opt.value as any)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  category === opt.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 검색창 */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">모델명 검색</span>
          <input
            type="text"
            placeholder="예: LR1750"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-48 rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 로딩/에러/리스트 */}
      {loading ? (
        <p className="text-gray-600">장비 데이터를 불러오는 중입니다...</p>
      ) : error ? (
        <p className="text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다: {error}
        </p>
      ) : filteredEquipments.length === 0 ? (
        <p className="text-gray-600">
          조건에 맞는 장비가 없습니다. 필터 또는 검색어를 변경해 보세요.
        </p>
      ) : (
        <>
          <p className="mb-3 text-xs text-gray-500">
            전체 {equipments.length}대 중{' '}
            <span className="font-semibold text-blue-600">
              {filteredEquipments.length}대
            </span>{' '}
            표시 중
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEquipments.map((item) => {
              const id = String(item.id)
              return (
                <div
                  key={id}
                  className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* 썸네일 */}
                  <div className="h-40 w-full bg-gray-200">
                    {item.thumbnail_url ? (
                      <img
                        src={item.thumbnail_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* 정보 */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>

                    <div className="mt-1 text-xs text-gray-400">
                      카테고리: {item.category}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      제조사: {item.manufacturer || '-'}
                    </div>
                    <div className="text-sm text-gray-600">
                      톤수: {item.tonnage || '-'}
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`/equipment/detail?id=${encodeURIComponent(id)}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        자세히 보기 →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </PageShell>
  )
}
