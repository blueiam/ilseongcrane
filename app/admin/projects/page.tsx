// web/app/admin/projects/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { PageShell } from '@/app/_components/PageShell'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  image_url: string | null
  link: string | null
  display_order?: number
}

const CATEGORY_OPTIONS = [
  { value: 'SOC', label: 'SOC' },
  { value: '플랜트', label: '플랜트' },
  { value: '에너지', label: '에너지' },
  { value: '조선해양', label: '조선해양' },
  { value: '물류항만', label: '물류항만' },
  { value: '특수부분', label: '특수부분' },
  { value: '엔지니어링', label: '엔지니어링' },
]

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 폼 상태
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: 'SOC',
    image_url: '',
    display_order: 0,
  })
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageFileName, setImageFileName] = useState('')

  // 목록 불러오기 (display_order 순서로 정렬)
  const loadProjects = async () => {
    setLoading(true)
    try {
      let query = supabase.from('projects').select('*')
      
      const { data, error } = await query
        .order('display_order', { ascending: true })
        .order('title', { ascending: true })

      if (error) {
        // display_order 컬럼이 없을 경우 title만으로 정렬
        if (error.message.includes('display_order')) {
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('projects')
            .select('*')
            .order('title', { ascending: true })
          
          if (fallbackError) {
            setError(fallbackError.message)
          } else {
            setProjects((fallbackData || []) as Project[])
            setError(null)
          }
        } else {
          setError(error.message)
        }
      } else {
        setProjects((data || []) as Project[])
        setError(null)
      }
    } catch (err: any) {
      setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  // 폼 입력 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    // display_order는 숫자로 변환
    if (name === 'display_order') {
      setForm((prev) => ({ ...prev, [name]: Number(value) || 0 }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  // 신규 등록 or 수정 저장
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // 필수 필드 검증
    if (!form.title.trim()) {
      alert('제목은 필수입니다.')
      setSaving(false)
      return
    }
    if (!form.category || form.category.trim() === '') {
      alert('카테고리는 필수입니다. 카테고리를 선택해주세요.')
      setSaving(false)
      return
    }
    if (!form.description.trim()) {
      alert('설명/장비명은 필수입니다.')
      setSaving(false)
      return
    }
    
    // 카테고리 값 정리 (공백 제거)
    const cleanedCategory = form.category.trim()

    // 기본 payload 생성
    const basePayload: any = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: cleanedCategory, // 정리된 카테고리 값 사용
      // 고객사(subtitle): 항상 포함, 값이 있으면 그 값을, 없으면 null
      subtitle: form.subtitle.trim() || null,
    }

    // 디버깅: payload 확인
    console.log('Saving payload:', basePayload)
    console.log('Category value:', cleanedCategory)

    // 선택적 컬럼들
    if (form.image_url.trim()) {
      basePayload.image_url = form.image_url.trim()
    }
    if (form.display_order !== undefined && form.display_order !== null) {
      basePayload.display_order = Number(form.display_order) || 0
    }

    // 존재하지 않는 컬럼을 자동으로 제거하는 헬퍼 함수
    // 단, 필수 필드(title, description, category)는 제거하지 않음
    const removeMissingColumns = (payload: any, errorMessage: string): any => {
      const cleanedPayload = { ...payload }
      const requiredFields = ['title', 'description', 'category'] // 필수 필드는 제거하지 않음
      const patterns = [
        /column ['"](\w+)['"]/,
        /column (\w+)/,
        /'(\w+)' column/,
        /(\w+) column/,
        /Could not find the '(\w+)' column/,
        /'(\w+)' of 'projects'/,
      ]
      
      for (const pattern of patterns) {
        const match = errorMessage.match(pattern)
        if (match && match[1]) {
          const missingColumn = match[1]
          // 필수 필드는 제거하지 않음
          if (!requiredFields.includes(missingColumn)) {
            delete cleanedPayload[missingColumn]
          }
          break
        }
      }
      
      return cleanedPayload
    }

    // 재시도 로직 (최대 5회까지)
    const trySaveWithRetry = async (payload: any, isUpdate: boolean, id?: string) => {
      let currentPayload = { ...payload }
      let lastError: any = null
      const maxRetries = 5

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        let result: any

        if (isUpdate && id) {
          // 업데이트 후 업데이트된 데이터 반환
          result = await supabase
            .from('projects')
            .update(currentPayload)
            .eq('id', id)
            .select() // 업데이트된 행 반환
        } else {
          result = await supabase.from('projects').insert([currentPayload]).select() // 삽입된 행 반환
        }

        // Supabase 응답 확인: error가 없으면 성공 (update는 빈 배열도 정상)
        if (!result.error) {
          console.log('저장 성공:', result.data)
          // update의 경우 빈 배열도 정상 응답일 수 있음
          return { success: true, error: null, data: result.data || [] }
        }

        // 에러가 있는 경우
        if (result.error) {
          console.error(`저장 시도 ${attempt + 1} 실패:`, result.error)
          console.error('에러 상세:', {
            message: result.error.message,
            details: result.error.details,
            hint: result.error.hint,
            code: result.error.code
          })
          
          // 컬럼 관련 에러인 경우 해당 컬럼 제거 후 재시도
          if (result.error.message.includes('column') || result.error.message.includes('Column')) {
            currentPayload = removeMissingColumns(currentPayload, result.error.message)
            lastError = result.error
            continue
          } else {
            return { success: false, error: result.error }
          }
        }
      }

      return { success: false, error: lastError }
    }

    try {
      if (editingId) {
        // 수정
        const result = await trySaveWithRetry(basePayload, true, editingId)

        if (!result.success || result.error) {
          let errorMessage = result.error?.message || '알 수 없는 오류가 발생했습니다.'
          console.error('수정 오류:', result.error)
          console.error('Payload:', basePayload)
          if (errorMessage.includes('row-level security') || errorMessage.includes('RLS')) {
            errorMessage = '데이터베이스 권한 오류입니다.\n\n' +
              'Supabase에서 RLS 정책을 설정해야 합니다.\n' +
              'SQL Editor에서 RLS 정책을 설정하세요.'
          }
          alert('수정 중 오류: ' + errorMessage + '\n\n저장하려던 카테고리: ' + basePayload.category)
          setSaving(false)
        } else {
          console.log('수정 성공:', result.data)
          alert(`수정되었습니다.\n카테고리: ${basePayload.category}`)
          setEditingId(null)
          resetForm()
          // 약간의 지연 후 목록 새로고침 (데이터베이스 반영 시간 고려)
          setTimeout(() => {
            loadProjects()
          }, 300)
        }
      } else {
        // 신규 등록
        const result = await trySaveWithRetry(basePayload, false)

        if (!result.success || result.error) {
          let errorMessage = result.error?.message || '알 수 없는 오류가 발생했습니다.'
          console.error('등록 오류:', result.error)
          console.error('Payload:', basePayload)
          if (errorMessage.includes('row-level security') || errorMessage.includes('RLS')) {
            errorMessage = '데이터베이스 권한 오류입니다.\n\n' +
              'Supabase에서 RLS 정책을 설정해야 합니다.\n' +
              'SQL Editor에서 RLS 정책을 설정하세요.'
          }
          alert('등록 중 오류: ' + errorMessage + '\n\n저장하려던 카테고리: ' + basePayload.category)
          setSaving(false)
        } else {
          console.log('등록 성공:', result.data)
          alert(`등록되었습니다.\n카테고리: ${basePayload.category}`)
          resetForm()
          // 약간의 지연 후 목록 새로고침 (데이터베이스 반영 시간 고려)
          setTimeout(() => {
            loadProjects()
          }, 300)
        }
      }
    } catch (err: any) {
      alert('오류 발생: ' + (err.message || '알 수 없는 오류'))
    } finally {
      setSaving(false)
    }
  }

  // 파일 업로드 핸들러
  const handleFileUpload = async (file: File) => {
    try {
      setUploadingImage(true)

      // 파일명 생성 (중복 방지)
      const timestamp = Date.now()
      const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const filePath = `${fileName}`

      // Supabase Storage 업로드 (equipment-assets 또는 projects-assets 버킷 사용)
      const { data, error } = await supabase.storage
        .from('equipment-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        throw error
      }

      // Public URL 가져오기
      const { data: urlData } = supabase.storage
        .from('equipment-assets')
        .getPublicUrl(filePath)

      const publicUrl = urlData.publicUrl

      // 폼 상태 업데이트
      setForm((prev) => ({ ...prev, image_url: publicUrl }))
      setImageFileName(file.name)

      alert('이미지 업로드 완료!')
    } catch (error: any) {
      alert(`업로드 실패: ${error.message}`)
    } finally {
      setUploadingImage(false)
    }
  }

  const resetForm = () => {
    setForm({
      title: '',
      subtitle: '',
      description: '',
      category: 'SOC',
      image_url: '',
      display_order: 0,
    })
    setEditingId(null)
    setImageFileName('')
  }

  // 행 클릭 시 수정 모드로
  const startEdit = async (item: Project) => {
    setEditingId(item.id)
    setForm({
      title: item.title || '',
      subtitle: item.subtitle || '',
      description: item.description || '',
      category: item.category || 'SOC',
      image_url: item.image_url || '',
      display_order: item.display_order || 0,
    })
    
    // 파일명 표시
    if (item.image_url) {
      const fileName = item.image_url.split('/').pop() || ''
      setImageFileName(decodeURIComponent(fileName))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 삭제
  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      alert('삭제 중 오류: ' + error.message)
    } else {
      alert('삭제되었습니다.')
      loadProjects()
    }
  }

  return (
    <PageShell
      title="관리자 - 사업 실적 관리"
      subtitle="사업 실적 정보를 등록/수정/삭제할 수 있습니다."
    >
      {/* 사업 실적 등록/수정 폼 */}
      <section className="mx-auto mb-10 max-w-[1800px] rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          {editingId ? '사업 실적 정보 수정' : '신규 사업 실적 등록'}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              제목 (필수)
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 영덕 호지마을 풍력 발전 현장"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              카테고리 (필수)
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              {/* 기존 카테고리 값이 옵션 목록에 없으면 동적으로 추가 */}
              {!CATEGORY_OPTIONS.some(opt => opt.value === form.category) && form.category && (
                <option value={form.category} key="current-category">
                  {form.category} (기존)
                </option>
              )}
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              고객사 (옵션)
            </label>
            <input
              type="text"
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 삼성물산"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              설명/장비명 (필수)
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: SCE8000A (800Ton)"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              노출 순서 (Display Order)
            </label>
            <input
              type="number"
              name="display_order"
              value={form.display_order}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0"
              min="0"
            />
            <p className="text-xs text-gray-500">
              작은 숫자가 먼저 보여집니다. (예: 1, 2, 3...)
            </p>
          </div>

          {/* 이미지 업로드 */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              이미지
            </label>
            <p className="text-xs text-gray-500">
              이미지 파일첨부는 최대 4개까지 가능하며,
            </p>
            <p className="text-xs text-gray-500">
              3MB이하의 JPG, JPEG, PNG 형태로 업로드해주세요.
            </p>
            <p className="text-xs text-gray-500">
              권장 사이즈: 1920x1080px (가로형) 이하
            </p>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <span>📁</span>
                <span>이미지 업로드</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(file)
                    }
                  }}
                  disabled={uploadingImage}
                />
              </label>
              {uploadingImage && (
                <span className="text-sm text-blue-600">업로드 중...</span>
              )}
              {imageFileName && !uploadingImage && (
                <span className="text-sm text-green-600">
                  ✓ 업로드 완료: {imageFileName}
                </span>
              )}
            </div>
            {form.image_url && (
              <div className="mt-2">
                <img
                  src={form.image_url}
                  alt="미리보기"
                  className="h-32 w-auto rounded border object-contain"
                />
              </div>
            )}
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

      {/* 사업 실적 목록 테이블 */}
      <section className="mx-auto max-w-[1800px] rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">사업 실적 목록</h2>

        {loading ? (
          <p className="text-gray-600">목록을 불러오는 중입니다...</p>
        ) : error ? (
          <p className="text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다: {error}
          </p>
        ) : projects.length === 0 ? (
          <p className="text-gray-600">등록된 사업 실적이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-2 py-1 text-left">순서</th>
                  <th className="border px-2 py-1 text-left">제목</th>
                  <th className="border px-2 py-1 text-left">고객사</th>
                  <th className="border px-2 py-1 text-left">설명/장비명</th>
                  <th className="border px-2 py-1 text-left">카테고리</th>
                  <th className="border px-2 py-1 text-left">이미지</th>
                  <th className="border px-2 py-1 text-left">관리</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-2 py-1 text-center font-semibold">
                      {item.display_order || 0}
                    </td>
                    <td className="border px-2 py-1">{item.title || '-'}</td>
                    <td className="border px-2 py-1">{item.subtitle || '-'}</td>
                    <td className="border px-2 py-1">{item.description || '-'}</td>
                    <td className="border px-2 py-1">{item.category}</td>
                    <td className="border px-2 py-1">
                      {item.image_url ? 'O' : '-'}
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

