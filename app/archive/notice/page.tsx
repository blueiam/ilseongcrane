// web/app/archive/notice/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NoticeHero } from '@/app/_components/NoticeHero'
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
  file_name: string | null
  file_type?: string | null
}

// 확장자로 이미지 여부 판단 (file_type이 없는 옛 데이터용)
const isImageFile = (nameOrPath: string): boolean => {
  const ext = nameOrPath.split('.').pop()?.toLowerCase() || ''
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'].includes(ext)
}

export default function NoticeListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [thumbMap, setThumbMap] = useState<Record<string, string | null>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      // 1) 공지 게시판 id 찾기 (boards.code = 'notice')
      const { data: board, error: boardError } = await supabase
        .from('boards')
        .select('id')
        .eq('code', 'notice')
        .single()

      if (boardError || !board) {
        setError('boards 테이블에서 code=notice 게시판을 찾을 수 없습니다.')
        setLoading(false)
        return
      }
      const boardId = board.id as string

      // 2) 게시글 목록
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('id, title, content, is_notice, created_at, label')
        .eq('board_id', boardId)
        .order('is_notice', { ascending: false }) // 상단 고정 먼저 정렬 (텍스트 표시는 안 함)
        .order('created_at', { ascending: false })

      if (postError) {
        setError(postError.message)
        setLoading(false)
        return
      }

      const list = (postData || []) as Post[]
      setPosts(list)

      // 3) 각 글의 첫 번째 이미지 첨부를 카드 썸네일로 사용
      const ids = list.map((p) => p.id)
      if (ids.length === 0) {
        setThumbMap({})
        setLoading(false)
        return
      }

      const { data: fileData, error: fileError } = await supabase
        .from('post_files')
        .select('post_id, file_url, file_name, file_type')
        .in('post_id', ids)

      if (!fileError && fileData) {
        const map: Record<string, string | null> = {}

        ;(fileData as PostFile[]).forEach((f) => {
          // 1) file_type === 'image'
          // 2) 또는 파일명/경로 확장자로 이미지인지 판단
          const isImage =
            f.file_type === 'image' ||
            isImageFile(f.file_name || f.file_url)

          if (isImage && !map[f.post_id]) {
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

    load()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <NoticeHero />

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <p className="text-gray-600">게시글을 불러오는 중입니다...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-600">등록된 공지/뉴스가 없습니다.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => {
            const thumb = thumbMap[post.id] || null
            const label = post.label || '' // 공지/뉴스만 사용

            return (
              <Link
                key={post.id}
                href={`/archive/notice/detail?id=${post.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* 카드 이미지 */}
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
                </div>

                {/* 카드 본문 */}
                <div className="flex flex-1 flex-col p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    {label ? (
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] ${
                          label === '공지'
                            ? 'bg-red-100 text-red-700'
                            : label === '뉴스'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {label}
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
        </div>
      </main>
    </>
  )
}
