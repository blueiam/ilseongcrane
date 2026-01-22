// app/equipment/page.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
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
  const [imageZoomed, setImageZoomed] = useState(false)

  // Hero 이미지 줌 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageZoomed(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

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
      <div className="relative h-[400px] md:h-[450px] lg:h-[500px] w-full overflow-hidden z-30">
        {/* Background Image */}
        <Image
          src="/hero/crane_bg.jpg"
          alt="보유장비"
          fill
          className={`object-cover object-center transition-transform duration-[10000ms] ease-out ${
            imageZoomed ? 'scale-100' : 'scale-125'
          }`}
          priority
          quality={100}
        />

        {/* Title Content */}
        <div className="relative flex h-full items-center justify-center z-20">
          <h1
            className="text-5xl md:text-6xl font-bold text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            style={{ color: '#FFFFFF', textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            보유장비
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 relative z-10">
        
        {/* 배경 패턴 (은은한 그리드) */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
          {/* 필터 영역 */}
          <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white border border-slate-200 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            {/* 카테고리 필터 */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm font-medium text-slate-700">카테고리</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCategory(opt.value)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                      category === opt.value
                        ? 'bg-blue-600 text-white shadow-sm border border-blue-500/30'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 검색창 */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">모델명 검색</span>
              <input
                type="text"
                placeholder="예: SCE8000A"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-48 rounded-lg border border-slate-300 bg-white text-slate-900 px-3 py-2 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
          </div>

          {/* 로딩/에러/리스트 */}
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-slate-600">장비 데이터를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-red-600">
                데이터를 불러오는 중 오류가 발생했습니다: {error}
              </p>
            </div>
          ) : filteredEquipments.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <p className="text-slate-600">
                  {equipments.length === 0
                    ? '등록된 보유장비가 없습니다.'
                    : '조건에 맞는 장비가 없습니다. 필터 또는 검색어를 변경해 보세요.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  전체 {equipments.length}대 중{' '}
                  <span className="font-semibold text-slate-900">
                    {filteredEquipments.length}대
                  </span>{' '}
                  표시 중
                </p>
              </div>

              {/* Equipment Grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px] mx-auto">
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
