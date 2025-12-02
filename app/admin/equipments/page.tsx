// web/app/admin/equipments/page.tsx
'use client'

import { useEffect, useState } from 'react'
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

const CATEGORY_OPTIONS = [
  { value: 'crawler', label: '크롤러' },
  { value: 'mobile', label: '모바일(하이드로)' },
  { value: 'etc', label: '기타' },
]

export default function AdminEquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 폼 상태
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    manufacturer: '',
    tonnage: '',
    category: 'crawler',
    thumbnail_url: '',
    spec_pdf_url: '',
    description: '',
  })
  const [saving, setSaving] = useState(false)

  // 목록 불러오기
  const loadEquipments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('equipments')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      setError(error.message)
    } else {
      setEquipments((data || []) as Equipment[])
      setError(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadEquipments()
  }, [])

  // 폼 입력 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // 신규 등록 or 수정 저장
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      name: form.name.trim(),
      manufacturer: form.manufacturer.trim() || null,
      tonnage: form.tonnage.trim() || null,
      category: form.category,
      thumbnail_url: form.thumbnail_url.trim() || null,
      spec_pdf_url: form.spec_pdf_url.trim() || null,
      description: form.description.trim() || null,
    }

    if (!payload.name) {
      alert('모델명은 필수입니다.')
      setSaving(false)
      return
    }

    if (editingId) {
      // 수정
      const { error } = await supabase
        .from('equipments')
        .update(payload)
        .eq('id', editingId)

      if (error) {
        alert('수정 중 오류: ' + error.message)
      } else {
        alert('수정되었습니다.')
        setEditingId(null)
        resetForm()
        loadEquipments()
      }
    } else {
      // 신규 등록
      const { error } = await supabase.from('equipments').insert([payload])

      if (error) {
        alert('등록 중 오류: ' + error.message)
      } else {
        alert('등록되었습니다.')
        resetForm()
        loadEquipments()
      }
    }

    setSaving(false)
  }

  const resetForm = () => {
    setForm({
      name: '',
      manufacturer: '',
      tonnage: '',
      category: 'crawler',
      thumbnail_url: '',
      spec_pdf_url: '',
      description: '',
    })
    setEditingId(null)
  }

  // 행 클릭 시 수정 모드로
  const startEdit = (item: Equipment) => {
    setEditingId(item.id)
    setForm({
      name: item.name || '',
      manufacturer: item.manufacturer || '',
      tonnage: item.tonnage || '',
      category: item.category,
      thumbnail_url: item.thumbnail_url || '',
      spec_pdf_url: item.spec_pdf_url || '',
      description: item.description || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 삭제
  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return
    const { error } = await supabase.from('equipments').delete().eq('id', id)
    if (error) {
      alert('삭제 중 오류: ' + error.message)
    } else {
      alert('삭제되었습니다.')
      loadEquipments()
    }
  }

  return (
    <PageShell
      title="관리자 - 장비 관리"
      subtitle="보유장비 정보를 등록/수정/삭제할 수 있습니다."
    >
      {/* 장비 등록/수정 폼 */}
      <section className="mb-10 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          {editingId ? '장비 정보 수정' : '신규 장비 등록'}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              모델명 (필수)
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: LR1750"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              제조사
            </label>
            <input
              type="text"
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: Liebherr"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              톤수
            </label>
            <input
              type="text"
              name="tonnage"
              value={form.tonnage}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 800t"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              카테고리
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              썸네일 이미지 URL
            </label>
            <input
              type="text"
              name="thumbnail_url"
              value={form.thumbnail_url}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: https://... 또는 /images/sample.png"
            />
            <p className="text-xs text-gray-500">
              나중에 관리자에서 Storage와 연동해 자동으로 채우도록 개선할 수 있습니다.
            </p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              제원표 PDF URL
            </label>
            <input
              type="text"
              name="spec_pdf_url"
              value={form.spec_pdf_url}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: https://.../specs.pdf"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              설명
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="장비 특징, 용도 등 설명을 입력하세요."
            />
          </div>

          <div className="flex items-center gap-3 md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {editingId ? '수정 저장' : '신규 등록'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-gray-600 hover:underline"
              >
                수정 취소
              </button>
            )}
          </div>
        </form>
      </section>

      {/* 장비 목록 테이블 */}
      <section className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">장비 목록</h2>

        {loading ? (
          <p className="text-gray-600">목록을 불러오는 중입니다...</p>
        ) : error ? (
          <p className="text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다: {error}
          </p>
        ) : equipments.length === 0 ? (
          <p className="text-gray-600">등록된 장비가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-2 py-1 text-left">모델명</th>
                  <th className="border px-2 py-1 text-left">제조사</th>
                  <th className="border px-2 py-1 text-left">톤수</th>
                  <th className="border px-2 py-1 text-left">카테고리</th>
                  <th className="border px-2 py-1 text-left">썸네일</th>
                  <th className="border px-2 py-1 text-left">제원표</th>
                  <th className="border px-2 py-1 text-left">관리</th>
                </tr>
              </thead>
              <tbody>
                {equipments.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{item.name}</td>
                    <td className="border px-2 py-1">
                      {item.manufacturer || '-'}
                    </td>
                    <td className="border px-2 py-1">
                      {item.tonnage || '-'}
                    </td>
                    <td className="border px-2 py-1">{item.category}</td>
                    <td className="border px-2 py-1">
                      {item.thumbnail_url ? 'O' : '-'}
                    </td>
                    <td className="border px-2 py-1">
                      {item.spec_pdf_url ? 'O' : '-'}
                    </td>
                    <td className="border px-2 py-1">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </PageShell>
  )
}
