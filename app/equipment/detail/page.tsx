// web/app/equipment/detail/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { PageShell } from '@/app/_components/PageShell'

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
  spec_pdf_url: string | null
  description: string | null
}

type EquipmentImage = {
  id: string
  file_path: string
}

export default function EquipmentDetailPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [images, setImages] = useState<EquipmentImage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      // 1) 장비 기본 정보
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

      // 2) 갤러리 이미지 목록
      const { data: imgRows, error: imgError } = await supabase
        .from('equipment_images')
        .select('id, file_path')
        .eq('equipment_id', id)
        .order('created_at', { ascending: true })

      if (imgError) {
        // 갤러리 에러는 치명적이진 않으니, 에러만 기록
        console.error('gallery error', imgError)
      } else {
        setImages((imgRows || []) as EquipmentImage[])
      }

      setLoading(false)
    }

    fetchData()
  }, [id])

  // id 없음
  if (!id) {
    return (
      <PageShell
        title="장비 상세 정보"
        subtitle="유효하지 않은 장비 ID입니다."
      >
        <p className="mb-2 text-xs text-gray-400">
          (디버그) searchParams.get('id') = {String(id)}
        </p>
        <p className="text-gray-600">
          잘못된 경로로 접근하셨습니다. 보유장비 목록에서 다시 선택해주세요.
        </p>
      </PageShell>
    )
  }

  if (loading) {
    return (
      <PageShell
        title="장비 상세 정보"
        subtitle={`ID: ${id} 의 장비 상세 내용입니다.`}
      >
        <p className="text-gray-600">데이터를 불러오는 중입니다...</p>
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell
        title="장비 상세 정보"
        subtitle={`ID: ${id} 의 장비 상세 내용입니다.`}
      >
        <p className="mb-2 text-xs text-gray-400">
          (디버그) searchParams.get('id') = {String(id)}
        </p>
        <p className="text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다: {error}
        </p>
      </PageShell>
    )
  }

  if (!equipment) {
    return (
      <PageShell
        title="장비 상세 정보"
        subtitle={`ID: ${id} 의 장비 상세 내용입니다.`}
      >
        <p className="mb-2 text-xs text-gray-400">
          (디버그) searchParams.get('id') = {String(id)}
        </p>
        <p className="text-gray-600">해당 장비 데이터를 찾을 수 없습니다.</p>
      </PageShell>
    )
  }

  // Storage public URL 만들기
  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('equipment-images')
      .getPublicUrl(filePath)
    return data.publicUrl
  }

  return (
    <PageShell
      title="장비 상세 정보"
      subtitle={`ID: ${id} 의 장비 상세 내용입니다.`}
    >
      <p className="mb-2 text-xs text-gray-400">
        (디버그) searchParams.get('id') = {String(id)}
      </p>

      <div className="mt-2 grid gap-8 lg:grid-cols-2">
        {/* 썸네일 */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="h-80 bg-gray-100">
            {equipment.thumbnail_url ? (
              <img
                src={equipment.thumbnail_url}
                alt={equipment.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* 기본 정보 */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">{equipment.name}</h2>

          <table className="w-full text-sm text-gray-700">
            <tbody>
              <tr>
                <td className="w-32 py-2 font-semibold">제조사</td>
                <td className="py-2">
                  {equipment.manufacturer || '-'}
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">톤수</td>
                <td className="py-2">{equipment.tonnage || '-'}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">카테고리</td>
                <td className="py-2">{equipment.category}</td>
              </tr>
            </tbody>
          </table>

          {equipment.spec_pdf_url && (
            <a
              href={equipment.spec_pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              제원표 PDF 다운로드
            </a>
          )}
        </div>
      </div>

      {equipment.description && (
        <div className="mt-10">
          <h3 className="mb-3 text-xl font-semibold">설명</h3>
          <p className="leading-relaxed text-gray-700">
            {equipment.description}
          </p>
        </div>
      )}

      {/* ✅ 작업 사진 갤러리 */}
      <div className="mt-10">
        <h3 className="mb-3 text-xl font-semibold">작업 사진 갤러리</h3>

        {images.length === 0 ? (
          <div className="rounded-md border p-4 text-sm text-gray-500">
            등록된 갤러리 이미지가 없습니다.  
            (Supabase Storage → equipment-images 버킷에 이미지 업로드 후,
            equipment_images 테이블에 연결하면 이곳에 표시됩니다.)
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {images.map((img) => {
              const url = getImageUrl(img.file_path)
              return (
                <div
                  key={img.id}
                  className="overflow-hidden rounded-lg border bg-white"
                >
                  <img
                    src={url}
                    alt={equipment.name}
                    className="h-40 w-full object-cover"
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageShell>
  )
}
