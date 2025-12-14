// web/app/admin/posts/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { PageShell } from '@/app/_components/PageShell'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

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

export default function AdminPostsPage() {
  const searchParams = useSearchParams()
  const boardIdFromUrl = searchParams.get('board')
  
  const [boards, setBoards] = useState<Board[]>([])
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [boardsLoaded, setBoardsLoaded] = useState(false)

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
    setBoardsLoaded(true)

    if (list.length > 0) {
      // URL 파라미터에서 board ID가 있으면 사용, 없으면 공지사항 또는 첫 번째 게시판
      const boardIdFromUrl = searchParams.get('board')
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

  // 해당 게시판 posts
  const loadPosts = async (boardId: string) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('id, board_id, title, content, is_notice, created_at, label, external_link')
      .eq('board_id', boardId)
      .order('is_notice', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setError(null)
      setPosts((data || []) as Post[])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadBoards()
  }, [])

  // URL 파라미터 변경 감지 및 게시판 변경
  useEffect(() => {
    if (!boardsLoaded || boards.length === 0) return

    if (boardIdFromUrl) {
      const boardExists = boards.find((b) => b.id === boardIdFromUrl)
      if (boardExists) {
        setCurrentBoardId(boardIdFromUrl)
      }
    } else {
      // URL에 board 파라미터가 없으면 기본 게시판으로 설정
      const notice = boards.find((b) => b.code === 'notice')
      const defaultBoardId = (notice || boards[0]).id
      setCurrentBoardId(defaultBoardId)
    }
  }, [boardIdFromUrl, boards, boardsLoaded])

  useEffect(() => {
    if (currentBoardId) {
      loadPosts(currentBoardId)
    }
  }, [currentBoardId])

  const handleDelete = async (id: string) => {
    if (!currentBoardId) return
    if (!confirm('정말 삭제하시겠습니까?')) return

    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      alert('삭제 중 오류: ' + error.message)
    } else {
      alert('삭제되었습니다.')
      loadPosts(currentBoardId)
    }
  }

  const currentBoard = boards.find((b) => b.id === currentBoardId)

  return (
    <PageShell
      title="관리자 - 게시글 관리"
      subtitle="공지/뉴스 및 일반자료실 등 게시글을 통합 관리합니다."
    >
      {/* Tab 네비게이션 */}
      <div className="mb-6 flex gap-2 border-b border-gray-700">
        <Link
          href={`/admin/posts${currentBoardId ? `?board=${currentBoardId}` : ''}`}
          className="border-b-2 border-blue-500 px-4 py-2 text-sm font-medium text-[#eeeeee]"
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
          href="#"
          className="px-4 py-2 text-sm font-medium text-gray-400 opacity-50 cursor-not-allowed"
          onClick={(e) => e.preventDefault()}
        >
          게시글 수정
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
              href={`/admin/posts?board=${b.id}`}
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

      {/* 글 목록 */}
      <section className="mx-auto max-w-[1800px] rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-800">
          게시글 목록 ({currentBoard?.name || '-'})
        </h2>

        {loading ? (
          <p className="text-[#eeeeee]">목록을 불러오는 중입니다...</p>
        ) : error ? (
          <p className="text-red-400">
            데이터를 불러오는 중 오류가 발생했습니다: {error}
          </p>
        ) : posts.length === 0 ? (
          <p className="text-[#eeeeee]">등록된 게시글이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border-b px-2 py-1 text-left">상태</th>
                  <th className="border-b px-2 py-1 text-left">제목</th>
                  <th className="border-b px-2 py-1 text-left">레이블</th>
                  <th className="w-24 border-b px-2 py-1 text-center">작성일</th>
                  <th className="w-24 border-b px-2 py-1 text-center">관리</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="border-b px-2 py-1">
                      {p.is_notice ? (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                          고정
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
                    <td className="border-b px-2 py-1">
                      {p.label ? (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-700">
                          {p.label}
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400">-</span>
                      )}
                    </td>
                    <td className="border-b px-2 py-1 text-center">
                      {p.created_at
                        ? new Date(p.created_at).toLocaleDateString('ko-KR')
                        : ''}
                    </td>
                    <td className="border-b px-2 py-1 text-center">
                      <Link
                        href={`/admin/posts/edit?id=${p.id}${currentBoardId ? `&board=${currentBoardId}` : ''}`}
                        className="mr-2 text-[11px] text-blue-600 hover:underline"
                      >
                        수정
                      </Link>
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
