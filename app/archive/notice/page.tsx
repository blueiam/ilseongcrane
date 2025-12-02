// web/app/archive/notice/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PageShell } from '@/app/_components/PageShell'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Post = {
  id: string
  title: string
  content: string | null
  is_notice: boolean
  created_at: string
}

export default function NoticeListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      // 1) boards에서 code = 'notice' 인 게시판의 id 찾기
      const { data: board, error: boardError } = await supabase
        .from('boards')
        .select('id')
        .eq('code', 'notice')
        .single()

      if (boardError || !board) {
        setError('공지사항 게시판(boards.code = notice)을 찾을 수 없습니다.')
        setLoading(false)
        return
      }

      const boardId = board.id

      // 2) 해당 게시판의 게시글 조회 (board_id 기준)
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
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const notices = posts.filter((p) => p.is_notice)
  const normals = posts.filter((p) => !p.is_notice)

  return (
    <PageShell
      title="공지 · 뉴스"
      subtitle="일성크레인의 공지사항과 뉴스를 안내합니다."
    >
      {loading ? (
        <p className="text-gray-600">게시글을 불러오는 중입니다...</p>
      ) : error ? (
        <p className="text-red-500">
          {error}
        </p>
      ) : posts.length === 0 ? (
        <p className="text-gray-600">등록된 공지/뉴스가 없습니다.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-16 border-b px-3 py-2 text-center">구분</th>
                <th className="border-b px-3 py-2 text-left">제목</th>
                <th className="w-32 border-b px-3 py-2 text-center">
                  등록일
                </th>
              </tr>
            </thead>
            <tbody>
              {notices.map((post) => (
                <tr key={post.id} className="bg-yellow-50">
                  <td className="border-b px-3 py-2 text-center text-xs font-semibold text-amber-700">
                    공지
                  </td>
                  <td className="border-b px-3 py-2">
                    <Link
                      href={`/archive/notice/detail?id=${post.id}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="border-b px-3 py-2 text-center text-xs text-gray-500">
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString('ko-KR')
                      : ''}
                  </td>
                </tr>
              ))}
              {normals.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="border-b px-3 py-2 text-center text-xs text-gray-400">
                    일반
                  </td>
                  <td className="border-b px-3 py-2">
                    <Link
                      href={`/archive/notice/detail?id=${post.id}`}
                      className="text-gray-900 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="border-b px-3 py-2 text-center text-xs text-gray-500">
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString('ko-KR')
                      : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  )
}
