// web/app/admin/posts/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { PageShell } from '@/app/_components/PageShell'

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
}

type PostFile = {
  id: string
  file_url: string
  file_name: string | null
  file_type?: string | null
}


export default function AdminPostsPage() {
  const [boards, setBoards] = useState<Board[]>([])
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '',
    content: '',
    is_notice: false,
  })

  const [attachments, setAttachments] = useState<PostFile[]>([])
  const [filesToUpload, setFilesToUpload] = useState<FileList | null>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 게시판 목록
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
      const noticeBoard = list.find((b) => b.code === 'notice')
      setCurrentBoardId((noticeBoard || list[0]).id)
    }
  }

  const loadPosts = async (boardId: string) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('board_id', boardId)
      .order('is_notice', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setPosts((data || []) as Post[])
      setError(null)
    }
    setLoading(false)
  }

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
    loadBoards()
  }, [])

  useEffect(() => {
    if (currentBoardId) {
      loadPosts(currentBoardId)
      resetForm()
    }
  }, [currentBoardId])

  const resetForm = () => {
    setForm({
      title: '',
      content: '',
      is_notice: false,
    })
    setEditingId(null)
    setAttachments([])
    setFilesToUpload(null)
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as any
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentBoardId) {
      alert('먼저 게시판을 선택해주세요.')
      return
    }
    if (!form.title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    setSaving(true)

    const payload = {
      board_id: currentBoardId,
      title: form.title.trim(),
      content: form.content.trim() || null,
      is_notice: form.is_notice,
    }

    if (editingId) {
      const { error } = await supabase
        .from('posts')
        .update(payload)
        .eq('id', editingId)

      if (error) {
        alert('수정 중 오류: ' + error.message)
      } else {
        alert('수정되었습니다.')
        loadPosts(currentBoardId)
      }
    } else {
      const { error } = await supabase.from('posts').insert([payload])

      if (error) {
        alert('등록 중 오류: ' + error.message)
      } else {
        alert('등록되었습니다.')
        loadPosts(currentBoardId)
        resetForm()
      }
    }

    setSaving(false)
  }

  const startEdit = (post: Post) => {
    setEditingId(post.id)
    setForm({
      title: post.title,
      content: post.content || '',
      is_notice: post.is_notice,
    })
    loadAttachments(post.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!currentBoardId) return
    if (!confirm('정말 삭제하시겠습니까?')) return
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      alert('삭제 중 오류: ' + error.message)
    } else {
      alert('삭제되었습니다.')
      loadPosts(currentBoardId)
      if (editingId === id) resetForm()
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilesToUpload(e.target.files)
  }

  const handleUploadFiles = async () => {
    if (!editingId) {
      alert('먼저 게시글을 저장한 후 첨부파일을 등록할 수 있습니다.')
      return
    }
    if (!filesToUpload || filesToUpload.length === 0) {
      alert('업로드할 파일을 선택해주세요.')
      return
    }

    setUploading(true)

    const filesArray = Array.from(filesToUpload)

    for (const file of filesArray) {
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

      // DB에 메타데이터 저장
      const { error: insertError } = await supabase
        .from('post_files')
        .insert([
          {
            post_id: editingId,
            file_url: path, // 경로만 저장
            file_name: file.name,
            file_type: file.type,
          },
        ])

      if (insertError) {
        alert(`파일 정보 저장 실패: ${file.name} (${insertError.message})`)
      }
    }

    setUploading(false)
    setFilesToUpload(null)
    // 최신 목록 다시 로딩
    loadAttachments(editingId)
  }

  const handleDeleteFile = async (file: PostFile) => {
    if (!editingId) return
    if (!confirm('이 첨부파일을 삭제하시겠습니까?')) return

    // 1) Storage에서 삭제
    const { error: storageError } = await supabase.storage
      .from('post-files')
      .remove([file.file_url])

    if (storageError) {
      alert('Storage 파일 삭제 중 오류: ' + storageError.message)
      return
    }

    // 2) DB에서 삭제
    const { error: dbError } = await supabase
      .from('post_files')
      .delete()
      .eq('id', file.id)

    if (dbError) {
      alert('DB 파일 정보 삭제 중 오류: ' + dbError.message)
      return
    }

    // 목록 업데이트
    loadAttachments(editingId)
  }

  const currentBoard = boards.find((b) => b.id === currentBoardId)

  // 첨부파일 public URL
  const getFileUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('post-files')
      .getPublicUrl(filePath)
    return data.publicUrl
  }

  return (
    <PageShell
      title="관리자 - 게시글 관리"
      subtitle="공지/뉴스 및 자료실 게시글을 통합 관리합니다."
    >
      {/* 게시판 선택 */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-gray-700">게시판 선택:</span>
        {boards.length === 0 ? (
          <span className="text-xs text-gray-500">
            boards 테이블에 게시판이 아직 없습니다.
          </span>
        ) : (
          boards.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setCurrentBoardId(b.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                currentBoardId === b.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {b.name}
            </button>
          ))
        )}
      </div>

      {/* 글 입력 폼 + 첨부파일 */}
      <section className="mb-8 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-800">
          {editingId
            ? `게시글 수정 (${currentBoard?.name || ''})`
            : `새 게시글 작성 (${currentBoard?.name || ''})`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
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
              내용
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
              공지로 상단 고정
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving || !currentBoardId}
              className="rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {editingId ? '수정 저장' : '등록'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-gray-600 hover:underline"
              >
                수정 취소
              </button>
            )}
          </div>
        </form>

        {/* 첨부파일 영역 - 게시글 수정 모드일 때만 */}
        {editingId && (
          <div className="mt-6 border-t pt-4">
            <h3 className="mb-2 text-xs font-semibold text-gray-800">
              첨부파일 관리
            </h3>

            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <input
                type="file"
                multiple
                onChange={handleFileInputChange}
                className="text-xs"
              />
              <button
                type="button"
                onClick={handleUploadFiles}
                disabled={uploading}
                className="inline-flex items-center rounded-md bg-gray-800 px-3 py-1 text-xs font-medium text-white hover:bg-gray-900 disabled:opacity-60"
              >
                {uploading ? '업로드 중...' : '선택 파일 업로드'}
              </button>
            </div>
            <p className="mt-1 text-[11px] text-gray-500">
              이미지(PNG/JPG)와 PDF 파일 업로드를 권장합니다.
            </p>

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

      {/* 글 목록 */}
      <section className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text.sm font-semibold text-gray-800">
          게시글 목록 ({currentBoard?.name || '-'})
        </h2>

        {loading ? (
          <p className="text-gray-600">목록을 불러오는 중입니다...</p>
        ) : error ? (
          <p className="text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다: {error}
          </p>
        ) : posts.length === 0 ? (
          <p className="text-gray-600">등록된 게시글이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border-b px-2 py-1 text-left">구분</th>
                  <th className="border-b px-2 py-1 text-left">제목</th>
                  <th className="w-24 border-b px-2 py-1 text-center">
                    작성일
                  </th>
                  <th className="w-24 border-b px-2 py-1 text-center">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="border-b px-2 py-1">
                      {p.is_notice ? (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                          공지
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-500">
                          일반
                        </span>
                      )}
                    </td>
                    <td className="border-b px-2 py-1">
                      <span className="text-gray-800">{p.title}</span>
                    </td>
                    <td className="border-b px-2 py-1 text-center">
                      {p.created_at
                        ? new Date(p.created_at).toLocaleDateString('ko-KR')
                        : ''}
                    </td>
                    <td className="border-b px-2 py-1 text-center">
                      <button
                        type="button"
                        onClick={() => startEdit(p)}
                        className="mr-2 text-[11px] text-blue-600 hover:underline"
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="text-[11px] text-red-600 hover:underline"
                      >
                        삭제
                      </button>
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
