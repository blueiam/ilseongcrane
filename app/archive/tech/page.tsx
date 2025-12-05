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

const isImageFile = (nameOrPath: string): boolean => {
  const ext = nameOrPath.split('.').pop()?.toLowerCase() || ''
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'].includes(ext)
}

export default function ArchiveTechListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [thumbMap, setThumbMap] = useState<Record<string, string | null>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      // boards.code = 'archive_tech'
      const { data: board, error: boardError } = await supabase
        .from('boards')
        .select('id')
        .eq('code', 'archive_tech')
        .single()

      if (boardError || !board) {
        setError('기술자료실 게시판(boards.code = archive_tech)을 찾을 수 없습니다.')
        setLoading(false)
        return
      }
      const boardId = board.id as string

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('id, title, content, is_notice, created_at, label')
        .eq('board_id', boardId)
        .order('is_notice', { ascending: false })
        .order('created_at', { ascending: false })

      if (postError) {
        setError(postError.message)
        setLoading(false)
        return
      }

      const list = (postData || []) as Post[]
      setPosts(list)

      // 썸네일용 첫 이미지
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
          const base = f.file_name || f.file_url
          const isImg = f.file_type === 'image' || isImageFile(base)
          if (isImg && !map[f.post_id]) {
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
      <ArchiveHero title="기술자료실" />

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
                const category = post.label || '기술자료' // 기본값

                return (
                  <NoticeCard
                    key={post.id}
                    basePath="/archive/tech"
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