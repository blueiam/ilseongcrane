// web/app/archive/hr/page.tsx
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
  label?: string | null
}

type PostFile = {
  post_id: string
  file_url: string
  file_type?: string | null
}

export default function ArchiveHrListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [thumbMap, setThumbMap] = useState<Record<string, string | null>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // 1) boards에서 인사자료실(board.code = 'archive_hr') 찾기
      const { data: board, error: boardError } = await supabase
        .from('boards')
        .select('id')
        .eq('code', 'archive_hr')
        .single()

      if (boardError || !board) {
        setError(
          '인사자료실 게시판(boards.code = archive_hr)을 찾을 수 없습니다.'
        )
        setLoading(false)
        return
      }

      const boardId = board.id as string

      // 2) 게시글 목록
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('id, title, content, is_notice, created_at, label')
        .eq('board_id', boardId)
        .order('is_notice', { ascending: false }) // 상단 고정 먼저
        .order('created_at', { ascending: false })

      if (postError) {
        setError(postError.message)
        setLoading(false)
        return
      }

      const list = (postData || []) as Post[]
      setPosts(list)

      // 3) 각 글마다 첫 번째 이미지 첨부를 썸네일로 사용
      const ids = list.map((p) => p.id)
      if (ids.length === 0) {
        setThumbMap({})
        setLoading(false)
        return
      }

      const { data: fileData, error: fileError } = await supabase
        .from('post_files')
        .select('post_id, file_url, file_type')
        .in('post_id', ids)

      if (!fileError && fileData) {
        const map: Record<string, string | null> = {}
        ;(fileData as PostFile[]).forEach((f) => {
          if (f.file_type === 'image' && !map[f.post_id]) {
            const { data } = supabase.storage
              .from('post-files')
              .getPublicUrl(f.file_url)
            map[f.post_id] = data.publicUrl
          }
        })
        setThumbMap(map)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <PageShell
      title="인사자료실"
      subtitle="인사 관련 규정, 양식, 공지사항을 공유합니다."
    >
      {loading ? (
        <p className="text-gray-600">자료를 불러오는 중입니다...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-600">등록된 자료가 없습니다.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => {
            const thumb = thumbMap[post.id] || null
            const isPinned = post.is_notice

            return (
              <Link
                key={post.id}
                href={`/archive/hr/detail?id=${post.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* 썸네일 */}
                <div className="relative h-40 w-full bg-gray-100">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt={post.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      이미지 없음
                    </div>
                  )}
                  {isPinned && (
                    <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                      상단고정
                    </span>
                  )}
                </div>

                {/* 텍스트 */}
                <div className="flex flex-1 flex-col p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    {post.label ? (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-700">
                        {post.label}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="text-[11px] text-gray-400">
                      {new Date(post.created_at).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                    {post.content || ''}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </PageShell>
  )
}
