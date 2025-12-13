// web/app/admin/posts/edit/page.tsx
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

export default function AdminPostsEditPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const postIdFromUrl = searchParams.get('id')
  const boardIdFromUrl = searchParams.get('board')

  const [boards, setBoards] = useState<Board[]>([])
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '',
    content: '',
    is_notice: false,
    label: '',
    external_link: '',
  })

  const [attachments, setAttachments] = useState<PostFile[]>([])
  const [filesToUpload, setFilesToUpload] = useState<FileList | null>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
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
  }

  // 게시글 불러오기
  const loadPost = async (postId: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single()

      if (error) {
        alert('게시글을 불러오는 중 오류: ' + error.message)
        setLoading(false)
        router.push('/admin/posts')
        return
      }

      const post = data as Post
      setEditingId(post.id)
      setCurrentBoardId(post.board_id)
      setForm({
        title: post.title,
        content: post.content || '',
        is_notice: post.is_notice,
        label: post.label || '',
        external_link: post.external_link || '',
      })
      
      await loadAttachments(post.id)
      setLoading(false)
    } catch (err) {
      console.error('게시글 로드 오류:', err)
      setLoading(false)
      router.push('/admin/posts')
    }
  }

  // 첨부파일 목록
  const loadAttachments = async (postId: string) => {
    const { data, error } = await supabase
      .from('post_files')
      .select('id, file_url, file_name, file_type')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (!error && data) {
      setAttachments(data as PostFile[])
    } else {
      setAttachments([])
    }
  }

  useEffect(() => {
    const initialize = async () => {
      await loadBoards()
      
      if (!postIdFromUrl) {
        alert('게시글 ID가 없습니다.')
        router.push('/admin/posts')
        return
      }
      
      await loadPost(postIdFromUrl)
    }
    
    initialize()
  }, [])

  // URL 파라미터 변경 감지
  useEffect(() => {
    if (postIdFromUrl && boards.length > 0) {
      loadPost(postIdFromUrl)
    }
  }, [postIdFromUrl])

  // 게시판 변경 감지
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!currentBoardId) {
      alert('게시판 정보가 없습니다.')
      return
    }
    if (!form.title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }
    if (!editingId) {
      alert('수정할 게시글이 없습니다.')
      return
    }

    setSaving(true)

    const payload: any = {
      board_id: currentBoardId,
      title: form.title.trim(),
      content: form.content.trim() || null,
      is_notice: form.is_notice,
      label: form.label.trim() || null,
      external_link: form.external_link.trim() || null,
    }

    const { error } = await supabase
      .from('posts')
      .update(payload)
      .eq('id', editingId)

    if (error) {
      alert('수정 중 오류: ' + error.message)
    } else {
      alert('수정되었습니다.')
      router.push(`/admin/posts?board=${currentBoardId}`)
    }

    setSaving(false)
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

  const currentBoard = boards.find((b) => b.id === currentBoardId)
  const isGeneralBoard = currentBoard?.code === 'archive_general'
  const maxPerType: Record<FileCategory, number> =
    isGeneralBoard ? GENERAL_MAX : BASE_MAX

  const attachmentCounts = (() => {
    const counts: Record<FileCategory, number> = {
      image: 0,
      pdf: 0,
      zip: 0,
      other: 0,
    }
    attachments.forEach((f) => {
      const cat = getCategoryFromName(f.file_name || f.file_url)
      counts[cat]++
    })
    return counts
  })()

  const handleUploadFiles = async () => {
    if (!editingId) {
      alert('게시글 ID가 없습니다.')
      return
    }
    if (!filesToUpload || filesToUpload.length === 0) {
      alert('업로드할 파일을 선택해주세요.')
      return
    }

    const filesArray = Array.from(filesToUpload)

    if (filesArray.length > 4) {
      alert('파일첨부는 최대 4개까지 가능합니다.')
      return
    }

    const maxSize = 5 * 1024 * 1024
    const invalidFiles: string[] = []
    filesArray.forEach((file) => {
      if (file.size > maxSize) {
        invalidFiles.push(file.name)
      }
    })

    if (invalidFiles.length > 0) {
      alert(`다음 파일들이 5MB를 초과합니다:\n${invalidFiles.join('\n')}`)
      return
    }

    const counts: Record<FileCategory, number> = { ...attachmentCounts }

    setUploading(true)

    for (const file of filesArray) {
      const cat = getCategoryFromName(file.name)

      if (cat === 'zip' || cat === 'other') {
        alert(`지원하지 않는 파일 형식입니다: ${file.name}\n(GIF, JPG, JPEG, PNG, PDF만 가능)`)
        continue
      }

      const limit = maxPerType[cat]
      if (limit <= 0) {
        alert(`이 게시판에서는 해당 파일 형식을 업로드할 수 없습니다: ${file.name}`)
        continue
      }

      if (counts[cat] >= limit) {
        const label =
          cat === 'image'
            ? '이미지'
            : cat === 'pdf'
            ? 'PDF'
            : '파일'
        alert(
          `${label} 파일은 최대 ${limit}개까지 업로드할 수 있습니다. (${file.name})`
        )
        continue
      }

      const path = `${editingId}/${Date.now()}-${file.name}`

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

      const { error: insertError } = await supabase.from('post_files').insert([
        {
          post_id: editingId,
          file_url: path,
          file_name: file.name,
          file_type: cat,
        },
      ])

      if (insertError) {
        alert(`파일 정보 저장 실패: ${file.name} (${insertError.message})`)
        continue
      }

      counts[cat]++
    }

    setUploading(false)
    setFilesToUpload(null)
    loadAttachments(editingId)
  }

  const handleDeleteFile = async (file: PostFile) => {
    if (!editingId) return
    if (!confirm('이 첨부파일을 삭제하시겠습니까?')) return

    const { error: storageError } = await supabase.storage
      .from('post-files')
      .remove([file.file_url])

    if (storageError) {
      alert('Storage 파일 삭제 중 오류: ' + storageError.message)
      return
    }

    const { error: dbError } = await supabase
      .from('post_files')
      .delete()
      .eq('id', file.id)

    if (dbError) {
      alert('DB 파일 정보 삭제 중 오류: ' + dbError.message)
      return
    }

    loadAttachments(editingId)
  }

  const getFileUrl = (filePath: string) => {
    const { data } = supabase.storage.from('post-files').getPublicUrl(filePath)
    return data.publicUrl
  }

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
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-[#eeeeee]"
        >
          새 게시글 작성
        </Link>
        <Link
          href={`/admin/posts/edit?id=${editingId}${currentBoardId ? `&board=${currentBoardId}` : ''}`}
          className="border-b-2 border-blue-500 px-4 py-2 text-sm font-medium text-[#eeeeee]"
        >
          게시글 수정
        </Link>
      </div>


      {/* 글 수정 + 첨부파일 */}
      <section className="mx-auto mb-8 max-w-[1800px] rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-800">
          게시글 수정 ({currentBoard?.name || ''})
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
                key={editingId || 'edit'}
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

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving || !currentBoardId || !editingId}
              className="rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              수정 저장
            </button>
            <Link
              href={`/admin/posts${currentBoardId ? `?board=${currentBoardId}` : ''}`}
              className="text-xs text-[#eeeeee] hover:underline"
            >
              수정 취소
            </Link>
          </div>
        </form>

        {/* 첨부파일 관리 */}
        {editingId && (
          <div className="mt-6 border-t pt-4">
            <h3 className="mb-4 text-xs font-semibold text-gray-800">
              첨부파일 관리
            </h3>

            {/* 파일첨부 UI */}
            <div className="flex items-start gap-6">
              <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:bg-gray-50">
                <input
                  type="file"
                  multiple
                  accept="image/gif,image/jpeg,image/jpg,image/png,application/pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={uploading}
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
                <div className="mb-2 text-sm font-medium text-gray-800">
                  파일첨부
                </div>
                <p className="mb-1 text-xs text-gray-700">
                  파일첨부는 최대 4장까지 가능하며,
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
                <button
                  type="button"
                  onClick={handleUploadFiles}
                  disabled={
                    uploading ||
                    !filesToUpload ||
                    filesToUpload.length === 0
                  }
                  className="inline-flex items-center rounded-md bg-gray-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {uploading ? '업로드 중...' : '선택 파일 업로드'}
                </button>
              </div>
            </div>

            <div className="mt-3">
              {attachments.length === 0 ? (
                <p className="text-[11px] text-gray-500">
                  등록된 첨부파일이 없습니다.
                </p>
              ) : (
                <ul className="space-y-1 text-xs">
                  {attachments.map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <a
                        href={getFileUrl(f.file_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {f.file_name || f.file_url}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteFile(f)}
                        className="text-[11px] text-red-600 hover:underline"
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </section>
    </PageShell>
  )
}
