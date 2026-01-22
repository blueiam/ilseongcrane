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
  name?: string  // name 또는 model_name
  model_name?: string  // 실제 DB 컬럼명
  manufacturer: string | null
  tonnage: string | null
  category: string
  thumbnail_url: string | null
  main_image_url?: string | null  // 상세 페이지용 메인 이미지
  spec_pdf_url: string | null
  pdf_cover_url?: string | null  // PDF 표지 이미지
  display_order?: number
  // 추가 스펙 필드
  max_boom_length?: string | null
  max_lifting_capacity?: string | null
  max_lifting_moment?: string | null
  dimensions_image_url?: string | null
  technical_data_image_url?: string | null
}

const CATEGORY_OPTIONS = [
  { value: 'Crawler Crane', label: 'Crawler Crane' },
  { value: 'Mobile Crane', label: 'Mobile Crane' },
  { value: 'Etc', label: 'Etc' },
]

export default function AdminEquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 폼 상태
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    model_name: '',
    manufacturer: '',
    tonnage: '',
    category: 'Crawler Crane',
    thumbnail_url: '',
    main_image_url: '',
    spec_pdf_url: '',
    pdf_cover_url: '',
    display_order: 0,
    max_boom_length: '',
    max_lifting_capacity: '',
    max_lifting_moment: '',
    dimensions_image_url: '',
    technical_data_image_url: '',
  })
  const [saving, setSaving] = useState(false)
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false)
  const [uploadingMainImage, setUploadingMainImage] = useState(false)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [uploadingPdfCover, setUploadingPdfCover] = useState(false)
  const [uploadingDimensions, setUploadingDimensions] = useState(false)
  const [uploadingTechnical, setUploadingTechnical] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [thumbnailFileName, setThumbnailFileName] = useState('')
  const [mainImageFileName, setMainImageFileName] = useState('')
  const [pdfFileName, setPdfFileName] = useState('')
  const [pdfCoverFileName, setPdfCoverFileName] = useState('')
  const [dimensionsFileName, setDimensionsFileName] = useState('')
  const [technicalFileName, setTechnicalFileName] = useState('')
  const [galleryImages, setGalleryImages] = useState<Array<{ id: string; file_path: string; url: string }>>([])

  // 목록 불러오기 (display_order 순서로 정렬)
  const loadEquipments = async () => {
    setLoading(true)
    try {
      // display_order 컬럼이 있는지 확인하기 위해 먼저 시도
      let query = supabase.from('equipments').select('*')
      
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
            setError(null)
          }
        } else {
          setError(error.message)
        }
      } else {
        setEquipments((data || []) as Equipment[])
        setError(null)
      }
    } catch (err: any) {
      setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEquipments()
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

    // 기본 payload 생성 - 필수 컬럼만 먼저 포함
    const basePayload: any = {
      model_name: form.model_name.trim(),
      category: form.category,
    }

    // 선택적 컬럼들 (값이 있을 때만 추가)
    // 실제 DB에 존재하는 컬럼만 포함되도록 주의
    if (form.manufacturer.trim()) {
      basePayload.manufacturer = form.manufacturer.trim()
    }
    if (form.tonnage.trim()) {
      basePayload.tonnage = form.tonnage.trim()
    }
    
    // 파일 URL 필드들 (실제 DB 컬럼명과 정확히 일치해야 함)
    // 에러 발생 시 자동으로 제거됨
    if (form.thumbnail_url.trim()) {
      basePayload.thumbnail_url = form.thumbnail_url.trim()
    }
    if (form.main_image_url.trim()) {
      basePayload.main_image_url = form.main_image_url.trim()
    }
    if (form.spec_pdf_url.trim()) {
      basePayload.spec_pdf_url = form.spec_pdf_url.trim()
    }
    // PDF 표지 URL 추가
    if (form.pdf_cover_url?.trim()) {
      basePayload.pdf_cover_url = form.pdf_cover_url.trim()
    }
    if (form.max_boom_length.trim()) {
      basePayload.max_boom_length = form.max_boom_length.trim()
    }
    if (form.max_lifting_capacity.trim()) {
      basePayload.max_lifting_capacity = form.max_lifting_capacity.trim()
    }
    if (form.max_lifting_moment.trim()) {
      basePayload.max_lifting_moment = form.max_lifting_moment.trim()
    }
    // Dimensions와 Technical Data 이미지는 선택사항이며 삭제 가능
    if (form.dimensions_image_url.trim()) {
      basePayload.dimensions_image_url = form.dimensions_image_url.trim()
    } else if (editingId) {
      // 수정 모드에서 빈 값이면 null로 설정하여 삭제
      basePayload.dimensions_image_url = null
    }
    if (form.technical_data_image_url.trim()) {
      basePayload.technical_data_image_url = form.technical_data_image_url.trim()
    } else if (editingId) {
      // 수정 모드에서 빈 값이면 null로 설정하여 삭제
      basePayload.technical_data_image_url = null
    }

    // display_order 추가 (숫자 값이므로 trim 불필요)
    if (form.display_order !== undefined && form.display_order !== null) {
      basePayload.display_order = Number(form.display_order) || 0
    }

    if (!basePayload.model_name) {
      alert('모델명은 필수입니다.')
      setSaving(false)
      return
    }

    // 존재하지 않는 컬럼을 자동으로 제거하는 헬퍼 함수
    const removeMissingColumns = (payload: any, errorMessage: string): any => {
      const cleanedPayload = { ...payload }
      // 에러 메시지에서 누락된 컬럼명 추출 (여러 패턴 시도)
      const patterns = [
        /column ['"](\w+)['"]/,  // "column 'spec_pdf_url'"
        /column (\w+)/,           // "column spec_pdf_url"
        /'(\w+)' column/,         // "'spec_pdf_url' column"
        /(\w+) column/,           // "spec_pdf_url column"
        /Could not find the '(\w+)' column/,  // "Could not find the 'display_order' column"
        /'(\w+)' of 'equipments'/, // "'display_order' of 'equipments'"
      ]
      
      for (const pattern of patterns) {
        const match = errorMessage.match(pattern)
        if (match && match[1]) {
          const missingColumn = match[1]
          delete cleanedPayload[missingColumn]
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
          result = await supabase
            .from('equipments')
            .update(currentPayload)
            .eq('id', id)
        } else {
          result = await supabase.from('equipments').insert([currentPayload])
        }

        if (!result.error) {
          return { success: true, error: null }
        }

        // 컬럼 관련 에러인 경우 해당 컬럼 제거 후 재시도
        if (result.error.message.includes('column') || result.error.message.includes('Column')) {
          currentPayload = removeMissingColumns(currentPayload, result.error.message)
          lastError = result.error
          // 계속 재시도
          continue
        } else {
          // 다른 종류의 에러는 즉시 반환
          return { success: false, error: result.error }
        }
      }

      return { success: false, error: lastError }
    }

    try {
      if (editingId) {
        // 수정
        const result = await trySaveWithRetry(basePayload, true, editingId)

        if (result.error) {
          let errorMessage = result.error.message
          // RLS 정책 오류인 경우 더 명확한 안내 메시지
          if (errorMessage.includes('row-level security') || errorMessage.includes('RLS')) {
            errorMessage = '데이터베이스 권한 오류입니다.\n\n' +
              'Supabase에서 RLS 정책을 설정해야 합니다.\n' +
              'SQL Editor에서 supabase_rls_fix.sql 파일의 내용을 실행하세요.'
          }
          alert('수정 중 오류: ' + errorMessage)
        } else {
          alert('수정되었습니다.')
          setEditingId(null)
          resetForm()
          loadEquipments()
        }
      } else {
        // 신규 등록
        const result = await trySaveWithRetry(basePayload, false)

        if (result.error) {
          let errorMessage = result.error.message
          // RLS 정책 오류인 경우 더 명확한 안내 메시지
          if (errorMessage.includes('row-level security') || errorMessage.includes('RLS')) {
            errorMessage = '데이터베이스 권한 오류입니다.\n\n' +
              'Supabase에서 RLS 정책을 설정해야 합니다.\n' +
              'SQL Editor에서 supabase_rls_fix.sql 파일의 내용을 실행하세요.'
          }
          alert('등록 중 오류: ' + errorMessage)
        } else {
          alert('등록되었습니다.')
          resetForm()
          loadEquipments()
        }
      }
    } catch (err: any) {
      alert('오류 발생: ' + (err.message || '알 수 없는 오류'))
    } finally {
      setSaving(false)
    }
  }

  // 파일 업로드 핸들러
  const handleFileUpload = async (
    file: File,
    type: 'thumbnail' | 'mainImage' | 'pdf' | 'pdfCover' | 'dimensions' | 'technical'
  ) => {
    try {
      if (type === 'thumbnail') setUploadingThumbnail(true)
      else if (type === 'mainImage') setUploadingMainImage(true)
      else if (type === 'pdf') setUploadingPdf(true)
      else if (type === 'pdfCover') setUploadingPdfCover(true)
      else if (type === 'dimensions') setUploadingDimensions(true)
      else if (type === 'technical') setUploadingTechnical(true)

      // 파일명 생성 (중복 방지)
      const timestamp = Date.now()
      const fileExt = file.name.split('.').pop()
      const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const filePath = `${fileName}`

      // Supabase Storage 업로드
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
      if (type === 'thumbnail') {
        setForm((prev) => ({ ...prev, thumbnail_url: publicUrl }))
        setThumbnailFileName(file.name)
      } else if (type === 'mainImage') {
        setForm((prev) => ({ ...prev, main_image_url: publicUrl }))
        setMainImageFileName(file.name)
      } else if (type === 'pdf') {
        setForm((prev) => ({ ...prev, spec_pdf_url: publicUrl }))
        setPdfFileName(file.name)
      } else if (type === 'pdfCover') {
        setForm((prev) => ({ ...prev, pdf_cover_url: publicUrl }))
        setPdfCoverFileName(file.name)
      } else if (type === 'dimensions') {
        setForm((prev) => ({ ...prev, dimensions_image_url: publicUrl }))
        setDimensionsFileName(file.name)
      } else if (type === 'technical') {
        setForm((prev) => ({ ...prev, technical_data_image_url: publicUrl }))
        setTechnicalFileName(file.name)
      }

      const fileTypeLabel = {
        thumbnail: '썸네일 이미지',
        mainImage: '메인 이미지',
        pdf: 'PDF',
        pdfCover: 'PDF 브로슈어 표지 이미지',
        dimensions: '도면 이미지',
        technical: '기술 데이터 이미지'
      }[type]
      
      alert(`${fileTypeLabel} 업로드 완료!`)
    } catch (error: any) {
      alert(`업로드 실패: ${error.message}`)
    } finally {
      if (type === 'thumbnail') setUploadingThumbnail(false)
      else if (type === 'mainImage') setUploadingMainImage(false)
      else if (type === 'pdf') setUploadingPdf(false)
      else if (type === 'pdfCover') setUploadingPdfCover(false)
      else if (type === 'dimensions') setUploadingDimensions(false)
      else if (type === 'technical') setUploadingTechnical(false)
    }
  }

  const resetForm = () => {
    setForm({
      model_name: '',
      manufacturer: '',
      tonnage: '',
      category: 'Crawler Crane',
      thumbnail_url: '',
      main_image_url: '',
      spec_pdf_url: '',
      pdf_cover_url: '',
      display_order: 0,
      max_boom_length: '',
      max_lifting_capacity: '',
      max_lifting_moment: '',
      dimensions_image_url: '',
      technical_data_image_url: '',
    })
    setEditingId(null)
    setThumbnailFileName('')
    setMainImageFileName('')
    setPdfFileName('')
    setPdfCoverFileName('')
    setDimensionsFileName('')
    setTechnicalFileName('')
    setGalleryImages([])
  }

  // Gallery 이미지 업로드 핸들러
  const handleGalleryUpload = async (file: File) => {
    if (!editingId) {
      alert('먼저 장비를 선택하고 수정 모드로 들어가주세요.')
      return
    }

    try {
      setUploadingGallery(true)
      const timestamp = Date.now()
      const fileName = `gallery_${timestamp}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      
      // Storage에 업로드
      const { error: uploadError } = await supabase.storage
        .from('equipment-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // equipment_images 테이블에 레코드 추가
      const { data, error: dbError } = await supabase
        .from('equipment_images')
        .insert([{
          equipment_id: editingId,
          file_path: fileName,
        }])
        .select()
        .single()

      if (dbError) {
        // 테이블이나 컬럼이 없는 경우 안내
        if (dbError.message.includes('file_path') || dbError.message.includes('file_url') || dbError.message.includes('does not exist')) {
          alert(
            'equipment_images 테이블이 없거나 컬럼 구조가 다릅니다.\n\n' +
            'Supabase SQL Editor에서 다음 SQL을 실행하세요:\n\n' +
            'CREATE TABLE IF NOT EXISTS equipment_images (\n' +
            '  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n' +
            '  equipment_id UUID NOT NULL REFERENCES equipments(id) ON DELETE CASCADE,\n' +
            '  file_path TEXT NOT NULL,\n' +
            '  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n' +
            ');\n\n' +
            '또는 supabase_create_equipment_images.sql 파일을 참고하세요.'
          )
          throw dbError
        }
        throw dbError
      }

      // Public URL 가져오기
      const { data: urlData } = supabase.storage
        .from('equipment-images')
        .getPublicUrl(fileName)

      // Gallery 이미지 목록에 추가
      setGalleryImages((prev) => [
        ...prev,
        {
          id: data.id,
          file_path: fileName,
          url: urlData.publicUrl,
        },
      ])

      alert('갤러리 이미지 업로드 완료!')
    } catch (error: any) {
      alert(`갤러리 이미지 업로드 실패: ${error.message}`)
    } finally {
      setUploadingGallery(false)
    }
  }

  // Gallery 이미지 삭제 핸들러
  const handleGalleryDelete = async (imageId: string, filePath: string) => {
    if (!confirm('이 이미지를 삭제하시겠습니까?')) return

    try {
      // DB에서 삭제
      const { error: dbError } = await supabase
        .from('equipment_images')
        .delete()
        .eq('id', imageId)

      if (dbError) throw dbError

      // Storage에서 삭제
      const { error: storageError } = await supabase.storage
        .from('equipment-images')
        .remove([filePath])

      if (storageError) {
        console.warn('Storage 삭제 실패:', storageError)
        // DB는 이미 삭제되었으므로 계속 진행
      }

      // Gallery 이미지 목록에서 제거
      setGalleryImages((prev) => prev.filter((img) => img.id !== imageId))
      alert('이미지가 삭제되었습니다.')
    } catch (error: any) {
      alert(`이미지 삭제 실패: ${error.message}`)
    }
  }

  // Dimensions 이미지 삭제 핸들러
  const handleDimensionsDelete = () => {
    if (!confirm('치수 도면 이미지를 삭제하시겠습니까?')) return
    setForm((prev) => ({ ...prev, dimensions_image_url: '' }))
    setDimensionsFileName('')
    alert('치수 도면 이미지가 삭제되었습니다.')
  }

  // Technical Data 이미지 삭제 핸들러
  const handleTechnicalDelete = () => {
    if (!confirm('기술 데이터 차트 이미지를 삭제하시겠습니까?')) return
    setForm((prev) => ({ ...prev, technical_data_image_url: '' }))
    setTechnicalFileName('')
    alert('기술 데이터 차트 이미지가 삭제되었습니다.')
  }

  // Gallery 이미지 로드
  const loadGalleryImages = async (equipmentId: string) => {
    try {
      const { data, error } = await supabase
        .from('equipment_images')
        .select('id, file_path')
        .eq('equipment_id', equipmentId)
        .order('created_at', { ascending: true })

      if (error) {
        // 테이블이 없는 경우 빈 배열 반환
        if (error.message.includes('does not exist') || error.message.includes('file_path')) {
          console.warn('equipment_images 테이블이 없습니다. SQL을 실행해주세요.')
          setGalleryImages([])
          return
        }
        throw error
      }

      if (data) {
        const imagesWithUrls = data.map((img: any) => {
          const { data: urlData } = supabase.storage
            .from('equipment-images')
            .getPublicUrl(img.file_path)
          return {
            id: img.id,
            file_path: img.file_path,
            url: urlData.publicUrl,
          }
        })
        setGalleryImages(imagesWithUrls)
      }
    } catch (error) {
      console.error('갤러리 이미지 로드 실패:', error)
      setGalleryImages([])
    }
  }

  // 행 클릭 시 수정 모드로
  const startEdit = async (item: Equipment) => {
    setEditingId(item.id)
    setForm({
      model_name: item.model_name || item.name || '',
      manufacturer: item.manufacturer || '',
      tonnage: item.tonnage || '',
      category: item.category,
      thumbnail_url: item.thumbnail_url || '',
      main_image_url: item.main_image_url || '',
      spec_pdf_url: item.spec_pdf_url || '',
      pdf_cover_url: item.pdf_cover_url || '',
      display_order: item.display_order || 0,
      max_boom_length: item.max_boom_length || '',
      max_lifting_capacity: item.max_lifting_capacity || '',
      max_lifting_moment: item.max_lifting_moment || '',
      dimensions_image_url: item.dimensions_image_url || '',
      technical_data_image_url: item.technical_data_image_url || '',
    })
    
    // Gallery 이미지 로드
    await loadGalleryImages(item.id)
    // 파일명 표시
    if (item.thumbnail_url) {
      const fileName = item.thumbnail_url.split('/').pop() || ''
      setThumbnailFileName(decodeURIComponent(fileName))
    }
    if (item.main_image_url) {
      const fileName = item.main_image_url.split('/').pop() || ''
      setMainImageFileName(decodeURIComponent(fileName))
    }
    if (item.spec_pdf_url) {
      const fileName = item.spec_pdf_url.split('/').pop() || ''
      setPdfFileName(decodeURIComponent(fileName))
    }
    if (item.pdf_cover_url) {
      const fileName = item.pdf_cover_url.split('/').pop() || ''
      setPdfCoverFileName(decodeURIComponent(fileName))
    }
    if (item.dimensions_image_url) {
      const fileName = item.dimensions_image_url.split('/').pop() || ''
      setDimensionsFileName(decodeURIComponent(fileName))
    }
    if (item.technical_data_image_url) {
      const fileName = item.technical_data_image_url.split('/').pop() || ''
      setTechnicalFileName(decodeURIComponent(fileName))
    }
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
      <p className="mb-6 text-sm text-gray-400">
        모든 이미지는 3MB이하의 JPG, JPEG, PNG 형태로 업로드해주세요.
      </p>
      {/* 장비 등록/수정 폼 */}
      <section className="mx-auto mb-10 max-w-[1800px] rounded-xl bg-[#222] border border-gray-700 p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-white">
          {editingId ? '장비 정보 수정' : '신규 장비 등록'}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              모델명 (필수)
            </label>
            <input
              type="text"
              name="model_name"
              value={form.model_name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-[#1a1a1a] text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: SCE8000A"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              제조사
            </label>
            <input
              type="text"
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-[#1a1a1a] text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: SANY"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              톤수
            </label>
            <input
              type="text"
              name="tonnage"
              value={form.tonnage}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-[#1a1a1a] text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 800t"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              카테고리
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-[#1a1a1a] text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              노출 순서 (Display Order)
            </label>
            <input
              type="number"
              name="display_order"
              value={form.display_order}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-[#1a1a1a] text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0"
              min="0"
            />
            <p className="text-xs text-gray-400">
              작은 숫자가 먼저 보여집니다. (예: 1, 2, 3...)
            </p>
          </div>

          {/* 썸네일 이미지 업로드 */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              썸네일 이미지
            </label>
            <p className="text-xs text-gray-400">
              권장 사이즈: 400x400px (정사각형)
            </p>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-600 bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#2a2a2a]">
                <span>📁</span>
                <span>이미지 업로드</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(file, 'thumbnail')
                    }
                  }}
                  disabled={uploadingThumbnail}
                />
              </label>
              {uploadingThumbnail && (
                <span className="text-sm text-blue-400">업로드 중...</span>
              )}
              {thumbnailFileName && !uploadingThumbnail && (
                <span className="text-sm text-green-400">
                  ✓ 업로드 완료: {thumbnailFileName}
                </span>
              )}
            </div>
            {form.thumbnail_url && (
              <div className="mt-2">
                <img
                  src={form.thumbnail_url}
                  alt="미리보기"
                  className="h-20 w-20 rounded border object-cover"
                />
              </div>
            )}
            <hr className="my-4 border-t border-gray-600" />
          </div>

          {/* 상세 페이지용 메인 이미지 업로드 */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              상세 페이지용 메인 이미지 (고화질)
            </label>
            <p className="text-xs text-gray-400">
              모든 이미지는 3MB이하의 JPG, JPEG, PNG 형태로 업로드해주세요.
            </p>
            <p className="text-xs text-gray-400">
              권장 사이즈: 1920x1080px (가로형)
            </p>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-600 bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#2a2a2a]">
                <span>🖼️</span>
                <span>이미지 업로드</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(file, 'mainImage')
                    }
                  }}
                  disabled={uploadingMainImage}
                />
              </label>
              {uploadingMainImage && (
                <span className="text-sm text-blue-400">업로드 중...</span>
              )}
              {mainImageFileName && !uploadingMainImage && (
                <span className="text-sm text-green-400">
                  ✓ 업로드 완료: {mainImageFileName}
                </span>
              )}
            </div>
            {form.main_image_url && (
              <div className="mt-2">
                <img
                  src={form.main_image_url}
                  alt="메인 이미지 미리보기"
                  className="h-32 w-auto rounded border object-contain"
                />
              </div>
            )}
            <hr className="my-4 border-t border-gray-600" />
          </div>

          {/* 제원표 PDF 업로드 */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              제원표 PDF
            </label>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-600 bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#2a2a2a]">
                <span>📄</span>
                <span>PDF 업로드</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(file, 'pdf')
                    }
                  }}
                  disabled={uploadingPdf}
                />
              </label>
              {uploadingPdf && (
                <span className="text-sm text-blue-400">업로드 중...</span>
              )}
              {pdfFileName && !uploadingPdf && (
                <span className="text-sm text-green-400">
                  ✓ 업로드 완료: {pdfFileName}
                </span>
              )}
            </div>
            <hr className="my-4 border-t border-gray-600" />
          </div>

          {/* PDF 브로슈어 표지 이미지 */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              PDF 브로슈어 표지 이미지
            </label>
            <p className="text-xs text-gray-400">
              권장 사이즈: 216x294px (세로형, A4 비율)
            </p>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-600 bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#2a2a2a]">
                <span>📄</span>
                <span>이미지 업로드</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(file, 'pdfCover')
                    }
                  }}
                  disabled={uploadingPdfCover}
                />
              </label>
              {uploadingPdfCover && (
                <span className="text-sm text-blue-400">업로드 중...</span>
              )}
              {pdfCoverFileName && !uploadingPdfCover && (
                <span className="text-sm text-green-400">
                  ✓ 업로드 완료: {pdfCoverFileName}
                </span>
              )}
            </div>
            {form.pdf_cover_url && (
              <div className="mt-2">
                <img
                  src={form.pdf_cover_url}
                  alt="PDF 표지 미리보기"
                  className="h-32 w-auto rounded border object-contain"
                />
              </div>
            )}
            <hr className="my-4 border-t border-gray-600" />
          </div>

          {/* 구분선 */}
          <div className="md:col-span-2">
            <hr className="my-4 border-t-2 border-gray-200" />
            <h3 className="text-base font-semibold text-gray-300">
              상세 스펙 정보 (선택사항)
            </h3>
          </div>

          {/* Max Boom Length */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              최대 붐 길이 (Max. Boom Length)
            </label>
            <input
              type="text"
              name="max_boom_length"
              value={form.max_boom_length}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-[#1a1a1a] text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 111m"
            />
          </div>

          {/* Max Lifting Capacity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              최대 인양 능력 (Max. Lifting Capacity)
            </label>
            <input
              type="text"
              name="max_lifting_capacity"
              value={form.max_lifting_capacity}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-[#1a1a1a] text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 800 T"
            />
          </div>

          {/* Max Lifting Moment */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              최대 리프팅 모멘트 (Max. Lifting Moment)
            </label>
            <input
              type="text"
              name="max_lifting_moment"
              value={form.max_lifting_moment}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-[#1a1a1a] text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 12016t·m"
            />
          </div>

          {/* 빈칸 (그리드 정렬용) */}
          <div></div>

          {/* Dimensions 이미지 업로드 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              치수 도면 이미지 (Dimensions)
            </label>
            <p className="text-xs text-gray-400">
              권장 사이즈: 1200x800px (가로형)
            </p>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-600 bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#2a2a2a]">
                <span>📐</span>
                <span>도면 업로드</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(file, 'dimensions')
                    }
                  }}
                  disabled={uploadingDimensions}
                />
              </label>
              {uploadingDimensions && (
                <span className="text-sm text-blue-400">업로드 중...</span>
              )}
              {dimensionsFileName && !uploadingDimensions && (
                <>
                  <span className="text-sm text-green-400">
                    ✓ {dimensionsFileName}
                  </span>
                  <button
                    type="button"
                    onClick={handleDimensionsDelete}
                    className="text-sm text-red-400 hover:text-red-300 hover:underline"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
            {form.dimensions_image_url && (
              <div className="mt-2">
                <img
                  src={form.dimensions_image_url}
                  alt="치수 도면 미리보기"
                  className="h-32 w-auto rounded border object-contain"
                />
              </div>
            )}
            <hr className="my-4 border-t border-gray-600" />
          </div>

          {/* Technical Data 이미지 업로드 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              기술 데이터 차트 (Technical Data)
            </label>
            <p className="text-xs text-gray-400">
              권장 사이즈: 1200x900px (가로형)
            </p>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-600 bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#2a2a2a]">
                <span>📊</span>
                <span>차트 업로드</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(file, 'technical')
                    }
                  }}
                  disabled={uploadingTechnical}
                />
              </label>
              {uploadingTechnical && (
                <span className="text-sm text-blue-400">업로드 중...</span>
              )}
              {technicalFileName && !uploadingTechnical && (
                <>
                  <span className="text-sm text-green-400">
                    ✓ {technicalFileName}
                  </span>
                  <button
                    type="button"
                    onClick={handleTechnicalDelete}
                    className="text-sm text-red-400 hover:text-red-300 hover:underline"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
            {form.technical_data_image_url && (
              <div className="mt-2">
                <img
                  src={form.technical_data_image_url}
                  alt="기술 데이터 차트 미리보기"
                  className="h-32 w-auto rounded border object-contain"
                />
              </div>
            )}
            <hr className="my-4 border-t border-gray-600" />
          </div>

          {/* Photo Gallery 이미지 업로드 */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              Photo Gallery (작업 사진)
            </label>
            <p className="text-xs text-gray-400">
              권장 사이즈: 1920x1080px (가로형)
            </p>
            {!editingId && (
              <p className="text-xs text-orange-400">
                ※ 먼저 장비를 선택하고 수정 모드로 들어가야 갤러리 이미지를 업로드할 수 있습니다.
              </p>
            )}
            {editingId && (
              <>
                <div className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-600 bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#2a2a2a]">
                    <span>📷</span>
                    <span>이미지 업로드</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleGalleryUpload(file)
                        }
                      }}
                      disabled={uploadingGallery}
                    />
                  </label>
                  {uploadingGallery && (
                    <span className="text-sm text-blue-400">업로드 중...</span>
                  )}
                </div>
                {galleryImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {galleryImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.url}
                          alt="Gallery"
                          className="h-32 w-full rounded border object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleGalleryDelete(img.id, img.file_path)}
                          className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          title="삭제"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
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
                className="text-sm text-gray-400 hover:underline"
              >
                수정 취소
              </button>
            )}
          </div>
        </form>
      </section>

      {/* 장비 목록 테이블 */}
      <section className="mx-auto max-w-[1800px] rounded-xl bg-[#222] border border-gray-700 p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-white">장비 목록</h2>

        {loading ? (
          <p className="text-gray-400">목록을 불러오는 중입니다...</p>
        ) : error ? (
          <p className="text-red-400">
            데이터를 불러오는 중 오류가 발생했습니다: {error}
          </p>
        ) : equipments.length === 0 ? (
          <p className="text-gray-400">등록된 장비가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-600 text-sm">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">순서</th>
                  <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">모델명</th>
                  <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">제조사</th>
                  <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">톤수</th>
                  <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">카테고리</th>
                  <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">썸네일</th>
                  <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">제원표</th>
                  <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">관리</th>
                </tr>
              </thead>
              <tbody>
                {equipments.map((item) => (
                  <tr key={item.id} className="hover:bg-[#2a2a2a]">
                    <td className="border border-gray-600 px-2 py-1 text-center font-semibold text-white">
                      {item.display_order || 0}
                    </td>
                    <td className="border border-gray-600 px-2 py-1 text-gray-300">{item.model_name || item.name || '-'}</td>
                    <td className="border border-gray-600 px-2 py-1 text-gray-300">
                      {item.manufacturer || '-'}
                    </td>
                    <td className="border border-gray-600 px-2 py-1 text-gray-300">
                      {item.tonnage || '-'}
                    </td>
                    <td className="border border-gray-600 px-2 py-1 text-gray-300">{item.category}</td>
                    <td className="border border-gray-600 px-2 py-1 text-gray-300">
                      {item.thumbnail_url ? 'O' : '-'}
                    </td>
                    <td className="border border-gray-600 px-2 py-1 text-gray-300">
                      {item.spec_pdf_url ? 'O' : '-'}
                    </td>
                    <td className="border border-gray-600 px-2 py-1">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          className="text-xs text-blue-400 hover:text-blue-300 hover:underline"
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="text-xs text-red-400 hover:text-red-300 hover:underline"
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
