'use client'

import { useEffect, useState } from 'react'
import { ArchiveHero } from '@/app/_components/ArchiveHero'
import { createClient } from '@supabase/supabase-js'
import { NoticeCard } from '@/app/_components/NoticeCard'

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
      <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
        
        {/* 배경 그리드 효과 */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-gray-400">자료를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-red-400">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-gray-400">등록된 자료가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-[1400px] mx-auto">
              {posts.map((post) => {
                const thumb = thumbMap[post.id] || null
                const category = post.label || '기술자료' // 기본값
                
                // 날짜 포맷팅: "2025. 12.05." 형식
                const dateObj = new Date(post.created_at)
                const year = dateObj.getFullYear()
                const month = String(dateObj.getMonth() + 1).padStart(2, '0')
                const day = String(dateObj.getDate()).padStart(2, '0')
                const dateStr = `${year}. ${month}.${day}.`

                return (
                  <NoticeCard
                    key={post.id}
                    title={post.title}
                    label={category}
                    date={dateStr}
                    imageUrl={thumb || undefined}
                    href={`/archive/tech/detail?id=${post.id}`}
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