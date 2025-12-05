// web/app/archive/law/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { ArchiveHero } from '@/app/_components/ArchiveHero'
import { createClient } from '@supabase/supabase-js'
import NoticeCard from '@/components/notice-card'

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

export default function ArchiveLawListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [thumbMap, setThumbMap] = useState<Record<string, string | null>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // 1) boards에서 관련법규(board.code = 'archive_law') 찾기
      const { data: board, error: boardError } = await supabase
        .from('boards')
        .select('id')
        .eq('code', 'archive_law')
        .single()

      if (boardError || !board) {
        setError(
          '관련법규 게시판(boards.code = archive_law)을 찾을 수 없습니다.'
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

    fetchData()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <ArchiveHero title="관련법규" />

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <p className="text-gray-600">자료를 불러오는 중입니다...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-600">등록된 자료가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {posts.map((post) => {
                const thumb = thumbMap[post.id] || null
                const category = post.label || '관련법규' // 기본값

                return (
                  <NoticeCard
                    key={post.id}
                    basePath="/archive/law"
                    post={{
                      id: post.id,
                      title: post.title,
                      category: category,
                      created_at: post.created_at,
                      thumbnail_url: thumb || undefined,
                    }}
                  />
                )
              })}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
