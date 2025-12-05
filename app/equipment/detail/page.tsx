// app/equipment/detail/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { Download, ArrowLeft, X } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Equipment = {
  id: string
  name?: string  // name 또는 model_name
  model_name?: string  // 실제 DB 컬럼명
  manufacturer: string | null
  tonnage: string | null
  category: string
  thumbnail_url: string | null
  main_image_url?: string | null  // 상세 페이지용 메인 이미지
  spec_pdf_url: string | null
  pdf_cover_url?: string | null  // PDF 표지 이미지
  description: string | null
  // 추가 스펙 필드들
  max_boom_length?: string | null
  max_lifting_capacity?: string | null
  max_lifting_moment?: string | null
  dimensions_image_url?: string | null
  technical_data_image_url?: string | null
}

type EquipmentImage = {
  id: string
  file_path: string
}

export default function EquipmentDetailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')

  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [images, setImages] = useState<EquipmentImage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      // 장비 기본 정보
      const { data: eq, error: eqError } = await supabase
        .from('equipments')
        .select('*')
        .eq('id', id)
        .single()

      if (eqError) {
        setError(eqError.message)
        setLoading(false)
        return
      }

      setEquipment(eq as Equipment)

      // 갤러리 이미지
      const { data: imgRows, error: imgError } = await supabase
        .from('equipment_images')
        .select('id, file_path')
        .eq('equipment_id', id)
        .order('created_at', { ascending: true })

      if (!imgError && imgRows) {
        setImages(imgRows as EquipmentImage[])
      }

      setLoading(false)
    }

    fetchData()
  }, [id])

  // 애니메이션 트리거
  useEffect(() => {
    if (equipment && !loading) {
      // 이미지 로드 후 애니메이션 시작
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [equipment, loading])

  // ESC 키로 전체화면 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenImage) {
        setFullscreenImage(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [fullscreenImage])

  // Storage URL 생성
  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('equipment-images')
      .getPublicUrl(filePath)
    return data.publicUrl
  }

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">데이터를 불러오는 중입니다...</p>
      </div>
    )
  }

  // ID 없음
  if (!id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">유효하지 않은 장비 ID입니다.</p>
          <button
            onClick={() => router.push('/equipment')}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← 목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error || !equipment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500">
            {error || '장비를 찾을 수 없습니다.'}
          </p>
          <button
            onClick={() => router.push('/equipment')}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← 목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 여백 (헤더 높이만큼) */}
      <div className="h-20" />

      <main className="container mx-auto px-4 pt-6 max-w-[1024px]">
        {/* "보유장비 목록으로" 버튼 */}
        <div className="mb-6">
          <Link
            href="/equipment"
            className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors"
          >
            {/* 뒤로가기 화살표 아이콘 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            보유장비 목록으로
          </Link>
        </div>
        {/* 1. 상단 헤더 (배경 이미지 + 텍스트 오버레이) */}
        <section className="relative px-8 py-12 min-h-[400px] overflow-hidden">
          {/* 배경 이미지 */}
          {equipment.main_image_url ? (
            <>
              <Image
                src={equipment.main_image_url}
                alt={equipment.model_name || equipment.name || 'Equipment'}
                fill
                className={`object-cover object-center transition-all duration-[2000ms] ease-out ${
                  imageLoaded
                    ? 'scale-100 opacity-100'
                    : 'scale-110 opacity-0'
                }`}
                priority
                onLoad={() => setImageLoaded(true)}
              />
              {/* 어두운 오버레이 (텍스트 가독성 향상) */}
              <div className={`absolute inset-0 bg-black/30 transition-opacity duration-1000 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`} />
            </>
          ) : (
            <div className="absolute inset-0 bg-gray-100" />
          )}

          {/* 텍스트 컨텐츠 (이미지 위에 겹쳐서 표시) */}
          <div className="relative z-10">
            <h1
              className={`mb-2 text-6xl font-bold text-white drop-shadow-lg transition-all duration-[1500ms] ease-out delay-300 ${
                isVisible
                  ? 'scale-100 opacity-100 translate-y-0'
                  : 'scale-50 opacity-0 translate-y-8'
              }`}
            >
              {equipment.model_name || equipment.name || 'Unknown'}
            </h1>
            <p
              className={`mb-2 text-lg font-medium text-white drop-shadow-md transition-all duration-[1500ms] ease-out delay-500 ${
                isVisible
                  ? 'scale-100 opacity-100 translate-y-0'
                  : 'scale-50 opacity-0 translate-y-8'
              }`}
            >
              {equipment.category}
            </p>
            <p
              className={`text-xl font-medium text-white drop-shadow-md transition-all duration-[1500ms] ease-out delay-700 ${
                isVisible
                  ? 'scale-100 opacity-100 translate-y-0'
                  : 'scale-50 opacity-0 translate-y-8'
              }`}
            >
              {equipment.manufacturer}
            </p>
          </div>
        </section>

        {/* 2. 메인 콘텐츠 영역 (흰색 배경) - 좌우 분할 */}
        <section className="bg-white px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-[216px_1fr] gap-8">
            {/* 왼쪽: PDF 브로슈어 표지 이미지 + 다운로드 버튼 */}
            <div className="space-y-4 flex flex-col items-center md:items-start">
              {/* PDF 브로슈어 표지 이미지 - 정확한 사이즈: 216w x 294h */}
              {equipment.pdf_cover_url ? (
                equipment.spec_pdf_url ? (
                  <a
                    href={equipment.spec_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative w-[216px] h-[294px] bg-gray-200 overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg">
                      <Image
                        src={equipment.pdf_cover_url}
                        alt="PDF Brochure Cover"
                        fill
                        className="object-cover"
                        sizes="216px"
                      />
                    </div>
                  </a>
                ) : (
                  <div className="relative w-[216px] h-[294px] bg-gray-200 overflow-hidden shadow-md">
                    <Image
                      src={equipment.pdf_cover_url}
                      alt="PDF Brochure Cover"
                      fill
                      className="object-cover"
                      sizes="216px"
                    />
                  </div>
                )
              ) : (
                <div className="relative w-[216px] h-[294px] bg-gray-200 overflow-hidden shadow-md flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <span className="text-4xl mb-2">📄</span>
                    <span className="text-sm font-medium">PDF View</span>
                  </div>
                </div>
              )}

              {/* 다운로드 버튼 */}
              {equipment.spec_pdf_url && (
                <a
                  href={equipment.spec_pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full max-w-[216px] items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-gray-900"
                >
                  <span>제원표 PDF 다운로드</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* 오른쪽: Specifications 섹션 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-[#003978]">
                Specifications
              </h2>
              <div className="space-y-3">
                {equipment.max_boom_length && (
                  <div className="flex items-center justify-between rounded-lg bg-gray-100 px-6 py-4">
                    <span className="font-medium text-gray-700">Max. Boom Length</span>
                    <span className="text-lg font-semibold text-black">
                      {equipment.max_boom_length}
                    </span>
                  </div>
                )}
                {equipment.max_lifting_capacity && (
                  <div className="flex items-center justify-between rounded-lg bg-gray-100 px-6 py-4">
                    <span className="font-medium text-gray-700">Max. Lifting Capacity</span>
                    <span className="text-lg font-semibold text-black">
                      {equipment.max_lifting_capacity}
                    </span>
                  </div>
                )}
                {equipment.max_lifting_moment && (
                  <div className="flex items-center justify-between rounded-lg bg-gray-100 px-6 py-4">
                    <span className="font-medium text-gray-700">Max. Lifting Moment</span>
                    <span className="text-lg font-semibold text-black">
                      {equipment.max_lifting_moment}
                    </span>
                  </div>
                )}
                {/* 기존 톤수 정보가 있을 경우 표시 */}
                {equipment.tonnage && !equipment.max_lifting_capacity && (
                  <div className="flex items-center justify-between rounded-lg bg-gray-100 px-6 py-4">
                    <span className="font-medium text-gray-700">Tonnage</span>
                    <span className="text-lg font-semibold text-black">
                      {equipment.tonnage}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Dimensions Section */}
        {equipment.dimensions_image_url && (
          <section className="mb-16 bg-white px-8 py-8">
            <h2 className="mb-6 text-2xl font-bold text-[#003978]">
              Dimensions
            </h2>
            <div className="overflow-hidden rounded-lg bg-white shadow-sm md:p-6">
              <div
                className="relative w-full min-h-[400px] md:h-[500px] cursor-pointer"
                onClick={() => setFullscreenImage(equipment.dimensions_image_url || null)}
              >
                <Image
                  src={equipment.dimensions_image_url}
                  alt="Dimensions"
                  fill
                  className="object-contain object-center transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
              </div>
            </div>
          </section>
        )}

        {/* 4. Technical Data Section */}
        {equipment.technical_data_image_url && (
          <section className="mb-16 bg-white px-8 py-8">
            <h2 className="mb-6 text-2xl font-bold text-[#003978]">
              Technical Data
            </h2>
            <div className="overflow-hidden rounded-lg bg-white shadow-sm md:p-6">
              <div
                className="relative w-full min-h-[400px] md:h-[600px] cursor-pointer"
                onClick={() => setFullscreenImage(equipment.technical_data_image_url || null)}
              >
                <Image
                  src={equipment.technical_data_image_url}
                  alt="Technical Data"
                  fill
                  className="object-contain object-center transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
              </div>
            </div>
          </section>
        )}

        {/* 전체화면 이미지 모달 */}
        {fullscreenImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setFullscreenImage(null)}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setFullscreenImage(null)
              }}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="닫기"
            >
              <X className="h-6 w-6" />
            </button>

            {/* 이미지 */}
            <div
              className="relative w-full h-full max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={fullscreenImage}
                alt="Fullscreen view"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        )}

        {/* 5. Description Section */}
        {equipment.description && (
          <section className="mb-16 bg-white px-8 py-8">
            <h2 className="mb-6 text-2xl font-bold text-[#003978]">
              Description
            </h2>
            <div className="prose prose-lg max-w-none rounded-lg bg-white p-6 shadow-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: equipment.description,
                }}
              />
            </div>
          </section>
        )}

        {/* 6. Photo Gallery Section */}
        {images.length > 0 && (
          <section className="mb-16 bg-white px-8 py-8">
            <h2 className="mb-6 text-2xl font-bold text-[#003978]">
              Photo Gallery
            </h2>
            <div className="grid gap-4 md:grid-cols-4">
              {images.map((img, index) => {
                const url = getImageUrl(img.file_path)
                // 첫 번째 이미지는 왼쪽에 큰 사이즈, 나머지는 오른쪽에 작은 사이즈
                if (index === 0) {
                  return (
                    <div
                      key={img.id}
                      onClick={() => setFullscreenImage(url)}
                      className="group relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="relative h-[600px] w-full">
                        <Image
                          src={url}
                          alt={`${equipment.model_name || equipment.name || 'Equipment'} - 작업 사진 ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  )
                } else if (index <= 4) {
                  // 2-5번째 이미지는 오른쪽에 2x2 그리드
                  return (
                    <div
                      key={img.id}
                      onClick={() => setFullscreenImage(url)}
                      className="group relative col-span-1 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="relative h-[290px] w-full">
                        <Image
                          src={url}
                          alt={`${equipment.model_name || equipment.name || 'Equipment'} - 작업 사진 ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  )
                } else {
                  // 6번째 이후 이미지는 마지막에 큰 사이즈
                  return (
                    <div
                      key={img.id}
                      onClick={() => setFullscreenImage(url)}
                      className="group relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="relative h-[600px] w-full">
                        <Image
                          src={url}
                          alt={`${equipment.model_name || equipment.name || 'Equipment'} - 작업 사진 ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
