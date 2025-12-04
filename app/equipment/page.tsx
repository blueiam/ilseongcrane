// app/equipment/page.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { EquipmentHero } from '@/app/_components/EquipmentHero'
import { EquipmentCard } from '@/app/_components/EquipmentCard'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Equipment = {
  id: string
  category: string
  name?: string  // name 또는 model_name
  model_name?: string  // 실제 DB 컬럼명
  manufacturer: string | null
  tonnage: string | null
  thumbnail_url: string | null
  description: string | null
  display_order?: number
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'Crawler Crane', label: 'Crawler Crane' },
  { value: 'Mobile Crane', label: 'Mobile Crane' },
  { value: 'Etc', label: 'Etc' },
] as const

type CategoryValue = typeof CATEGORY_OPTIONS[number]['value']

export default function EquipmentListPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<CategoryValue>('all')
  const [keyword, setKeyword] = useState('')

  // 전체 장비 데이터 가져오기 (display_order 순서로 정렬)
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        // display_order 컬럼이 있는지 확인하기 위해 먼저 시도
        let query = supabase.from('equipments').select('*')
        
        // display_order로 정렬 시도 (컬럼이 없으면 에러 발생)
        const { data, error } = await query
          .order('display_order', { ascending: true })
          .order('model_name', { ascending: true })

        if (error) {
          // display_order 컬럼이 없을 경우 name만으로 정렬
          if (error.message.includes('display_order')) {
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('equipments')
            .select('*')
            .order('model_name', { ascending: true })
            
            if (fallbackError) {
              setError(fallbackError.message)
            } else {
              setEquipments((fallbackData || []) as Equipment[])
            }
          } else {
            setError(error.message)
          }
        } else {
          setEquipments((data || []) as Equipment[])
        }
      } catch (err: any) {
        setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchEquipments()
  }, [])

  // 검색/필터 적용
  const filteredEquipments = useMemo(() => {
    return equipments.filter((item) => {
      // 카테고리 필터
      if (category !== 'all' && item.category !== category) return false

      // 키워드 검색 (모델명 기준)
      if (keyword.trim()) {
        const kw = keyword.trim().toLowerCase()
        const modelName = (item.model_name || item.name || '').toLowerCase()
        if (!modelName.includes(kw)) return false
      }

      return true
    })
  }, [equipments, category, keyword])

  return (
    <>
      {/* Hero Section */}
      <EquipmentHero />

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* 필터 영역 */}
          <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        {/* 카테고리 필터 */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm font-medium text-gray-700">카테고리</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCategory(opt.value)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                  category === opt.value
                    ? 'bg-black text-white shadow-sm'
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
            placeholder="예: SCE8000A"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm transition-all focus:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
          />
        </div>
      </div>

      {/* 로딩/에러/리스트 */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-600">장비 데이터를 불러오는 중입니다...</p>
        </div>
      ) : error ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다: {error}
          </p>
        </div>
      ) : filteredEquipments.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">
              {equipments.length === 0
                ? '등록된 보유장비가 없습니다.'
                : '조건에 맞는 장비가 없습니다. 필터 또는 검색어를 변경해 보세요.'}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              전체 {equipments.length}대 중{' '}
              <span className="font-semibold text-black">
                {filteredEquipments.length}대
              </span>{' '}
              표시 중
            </p>
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEquipments.map((item) => (
              <EquipmentCard
                key={item.id}
                id={item.id}
                name={item.model_name || item.name || ''}
                category={item.category}
                manufacturer={item.manufacturer}
                tonnage={item.tonnage}
                thumbnailUrl={item.thumbnail_url}
              />
            ))}
          </div>
        </>
      )}
        </div>
      </main>
    </>
  )
}
