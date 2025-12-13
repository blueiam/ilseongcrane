// web/app/admin/posts/write/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { PageShell } from '@/app/_components/PageShell'
import ToastEditor from '@/components/ToastEditor'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Board = {
  id: string
  code: string
  name: string
}

type Post = {
  id: string
  board_id: string
  title: string
  content: string | null
  is_notice: boolean
  created_at: string
  label?: string | null
  external_link?: string | null
}

type PostFile = {
  id: string
  file_url: string
  file_name: string | null
  file_type?: string | null
}

type FileCategory = 'image' | 'pdf' | 'zip' | 'other'

function getCategoryFromName(name: string): FileCategory {
  const ext = name.split('.').pop()?.toLowerCase() || ''
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'].includes(ext)) return 'image'
  if (ext === 'pdf') return 'pdf'
  if (ext === 'zip') return 'zip'
  return 'other'
}

// 기본 첨부 제한 (공지/기타 게시판)
const BASE_MAX: Record<FileCategory, number> = {
  image: 5,
  pdf: 5,
  zip: 5,
  other: 0,
}

// 일반자료실(archive_general) 전용 첨부 제한
const GENERAL_MAX: Record<FileCategory, number> = {
  image: 10,
  pdf: 10,
  zip: 10,
  other: 0,
}

export default function AdminPostsWritePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const boardIdFromUrl = searchParams.get('board')

  const [boards, setBoards] = useState<Board[]>([])
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '',
    content: '',
    is_notice: false,
    label: '',
    external_link: '',
  })

  const [filesToUpload, setFilesToUpload] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // boards 불러오기
  const loadBoards = async () => {
    const { data, error } = await supabase
      .from('boards')
      .select('id, code, name')
      .order('name', { ascending: true })

    if (error) {
      setError(error.message)
      return
    }

    const list = (data || []) as Board[]
    setBoards(list)

    if (list.length > 0) {
      // URL 파라미터에서 board ID가 있으면 사용, 없으면 공지사항 또는 첫 번째 게시판
      if (boardIdFromUrl) {
        const boardExists = list.find((b) => b.id === boardIdFromUrl)
        if (boardExists) {
          setCurrentBoardId(boardIdFromUrl)
          return
        }
      }
      const notice = list.find((b) => b.code === 'notice')
      setCurrentBoardId((notice || list[0]).id)
    }
  }

  useEffect(() => {
    const initialize = async () => {
      await loadBoards()
      setLoading(false)
    }
    
    initialize()
  }, [])

  // URL 파라미터 변경 감지
  useEffect(() => {
    if (boards.length > 0 && boardIdFromUrl) {
      const boardExists = boards.find((b) => b.id === boardIdFromUrl)
      if (boardExists && currentBoardId !== boardIdFromUrl) {
        setCurrentBoardId(boardIdFromUrl)
      }
    }
  }, [boardIdFromUrl, boards])

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleContentChange = (htmlContent: string) => {
    setForm((prev) => ({
      ...prev,
      content: htmlContent,
    }))
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      setFilesToUpload(null)
      return
    }

    if (files.length > 4) {
      alert('파일첨부는 최대 4개까지 가능합니다.')
      e.target.value = ''
      setFilesToUpload(null)
      return
    }

    const maxSize = 5 * 1024 * 1024
    const invalidFiles: string[] = []
    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        invalidFiles.push(file.name)
      }
    })

    if (invalidFiles.length > 0) {
      alert(`다음 파일들이 5MB를 초과합니다:\n${invalidFiles.join('\n')}`)
      e.target.value = ''
      setFilesToUpload(null)
      return
    }

    setFilesToUpload(files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!currentBoardId) {
      alert('먼저 게시판을 선택해주세요.')
      return
    }
    if (!form.title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    setSaving(true)

    try {
      // 1. 게시글 먼저 저장하여 post_id 획득
      const payload: any = {
        board_id: currentBoardId,
        title: form.title.trim(),
        content: form.content.trim() || null,
        is_notice: form.is_notice,
        label: form.label.trim() || null,
        external_link: form.external_link.trim() || null,
      }

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([payload])
        .select()
        .single()

      if (postError) {
        alert('등록 중 오류: ' + postError.message)
        setSaving(false)
        return
      }

      const postId = postData.id

      // 2. 파일이 있으면 업로드 및 DB 저장
      if (filesToUpload && filesToUpload.length > 0) {
        const currentBoard = boards.find((b) => b.id === currentBoardId)
        const isGeneralBoard = currentBoard?.code === 'archive_general'
        const maxPerType: Record<FileCategory, number> =
          isGeneralBoard ? GENERAL_MAX : BASE_MAX

        const filesArray = Array.from(filesToUpload)
        
        // 파일 타입별 개수 카운트
        const fileCounts: Record<FileCategory, number> = {
          image: 0,
          pdf: 0,
          zip: 0,
          other: 0,
        }

        // 먼저 파일 타입별 개수 확인
        for (const file of filesArray) {
          const cat = getCategoryFromName(file.name)
          fileCounts[cat]++
        }

        // 파일 타입별 제한 확인
        for (const file of filesArray) {
          const cat = getCategoryFromName(file.name)

          // GIF, JPG, JPEG, PNG, PDF만 허용
          if (cat === 'zip' || cat === 'other') {
            alert(`지원하지 않는 파일 형식입니다: ${file.name}\n(GIF, JPG, JPEG, PNG, PDF만 가능)`)
            continue
          }

          const limit = maxPerType[cat]
          if (limit <= 0) {
            alert(`이 게시판에서는 해당 파일 형식을 업로드할 수 없습니다: ${file.name}`)
            continue
          }

          // 파일 타입별 개수 제한 확인
          if (fileCounts[cat] > limit) {
            const label = cat === 'image' ? '이미지' : 'PDF'
            alert(`${label} 파일은 최대 ${limit}개까지 업로드할 수 있습니다.`)
            continue
          }
        }

        // 파일 업로드 및 DB 저장
        for (const file of filesArray) {
          const cat = getCategoryFromName(file.name)

          // 지원하지 않는 파일 형식은 건너뛰기
          if (cat === 'zip' || cat === 'other') {
            continue
          }

          const limit = maxPerType[cat]
          if (limit <= 0) {
            continue
          }

          // 파일 업로드
          const path = `${postId}/${Date.now()}-${file.name}`

          const { error: uploadError } = await supabase.storage
            .from('post-files')
            .upload(path, file, {
              cacheControl: '3600',
              upsert: false,
            })

          if (uploadError) {
            alert(`파일 업로드 실패: ${file.name} (${uploadError.message})`)
            continue
          }

          // 파일 정보 DB 저장
          const { error: insertError } = await supabase.from('post_files').insert([
            {
              post_id: postId,
              file_url: path,
              file_name: file.name,
              file_type: cat,
            },
          ])

          if (insertError) {
            alert(`파일 정보 저장 실패: ${file.name} (${insertError.message})`)
            // 업로드된 파일은 그대로 두고 계속 진행
          }
        }
      }

      alert('등록되었습니다.')
      router.push(`/admin/posts?board=${currentBoardId}`)
    } catch (err) {
      console.error('등록 중 오류:', err)
      alert('등록 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const resetForm = () => {
    setForm({
      title: '',
      content: '',
      is_notice: false,
      label: '',
      external_link: '',
    })
    setFilesToUpload(null)
    // 파일 입력 필드 리셋
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const currentBoard = boards.find((b) => b.id === currentBoardId)

  if (loading) {
    return (
      <PageShell
        title="관리자 - 게시글 관리"
        subtitle="공지/뉴스 및 일반자료실 등 게시글을 통합 관리합니다."
      >
        <p className="text-[#eeeeee]">로딩 중...</p>
      </PageShell>
    )
  }

  return (
    <PageShell
      title="관리자 - 게시글 관리"
      subtitle="공지/뉴스 및 일반자료실 등 게시글을 통합 관리합니다."
    >
      {/* Tab 네비게이션 */}
      <div className="mb-6 flex gap-2 border-b border-gray-700">
        <Link
          href={`/admin/posts${currentBoardId ? `?board=${currentBoardId}` : ''}`}
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-[#eeeeee]"
        >
          게시글 목록
        </Link>
        <Link
          href={`/admin/posts/write${currentBoardId ? `?board=${currentBoardId}` : ''}`}
          className="border-b-2 border-blue-500 px-4 py-2 text-sm font-medium text-[#eeeeee]"
        >
          새 게시글 작성
        </Link>
      </div>

      {/* 게시판 선택 */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-[#eeeeee]">게시판 선택:</span>
        {boards.length === 0 ? (
          <span className="text-xs text-gray-400">
            boards 테이블에 게시판이 아직 없습니다.
          </span>
        ) : (
          boards.map((b) => (
            <Link
              key={b.id}
              href={`/admin/posts/write?board=${b.id}`}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                currentBoardId === b.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {b.name}
            </Link>
          ))
        )}
      </div>

      {/* 글 입력 */}
      <section className="mx-auto mb-8 max-w-[1800px] rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-800">
          새 게시글 작성 ({currentBoard?.name || ''})
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target instanceof HTMLElement) {
              const editorWrapper =
                e.target.closest('.toastui-editor-contents') ||
                e.target.closest('.toastui-editor')
              if (editorWrapper) {
                e.stopPropagation()
                return
              }
            }
          }}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                제목
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                레이블 (뱃지)
              </label>

              {currentBoard?.code === 'notice' ? (
                <select
                  name="label"
                  value={form.label}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="공지">공지</option>
                  <option value="뉴스">뉴스</option>
                </select>
              ) : (
                <input
                  type="text"
                  name="label"
                  value={form.label}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="예: 작업사진, 영상, 현장 스케치 등"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">
              외부 링크 (YouTube URL 등)
            </label>
            <input
              type="text"
              name="external_link"
              value={form.external_link}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {currentBoard?.code === 'archive_general' && (
              <p className="mt-1 text-[11px] text-gray-500">
                일반자료실의 경우 유튜브 링크를 입력하면 상세 페이지에서 영상이 임베드 됩니다.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              내용
            </label>
            <div className="mt-1 rounded-md border border-gray-300 overflow-hidden">
              <ToastEditor
                key="new"
                content={form.content}
                onChange={handleContentChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <input
              id="is_notice"
              type="checkbox"
              name="is_notice"
              checked={form.is_notice}
              onChange={handleChange}
              className="h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="is_notice" className="text-gray-700">
              공지/상단 고정 (이 게시판에서 위로 고정)
            </label>
          </div>

          {/* 파일 첨부 */}
          <div className="border-t pt-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              파일 첨부 (선택사항)
            </label>
            <div className="flex items-start gap-6">
              <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:bg-gray-50">
                <input
                  type="file"
                  multiple
                  accept="image/gif,image/jpeg,image/jpg,image/png,application/pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={saving}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </label>
              <div className="flex-1">
                <p className="mb-1 text-xs text-gray-700">
                  파일첨부는 최대 4개까지 가능하며,
                </p>
                <p className="mb-3 text-xs text-gray-700">
                  5MB이하의 GIF, JPG, JPEG, PNG, PDF 형태로 업로드해주세요.
                </p>
                {filesToUpload && filesToUpload.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-1 text-xs font-medium text-gray-700">
                      선택된 파일 ({filesToUpload.length}개):
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {Array.from(filesToUpload).map((file, index) => (
                        <li key={index}>• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving || !currentBoardId}
              className="rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? '등록 중...' : '등록'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-[#eeeeee] hover:underline"
            >
              초기화
            </button>
          </div>
        </form>
      </section>
    </PageShell>
  )
}
