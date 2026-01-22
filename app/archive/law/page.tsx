// web/app/archive/law/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
  const [imageZoomed, setImageZoomed] = useState(false)

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
    
    // 이미지 줌인 애니메이션
    const timer = setTimeout(() => {
      setImageZoomed(true);
    }, 100);
    
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
    
    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[450px] lg:h-[500px] w-full overflow-hidden z-30">
        {/* Background Image */}
        <Image
          src="/hero/news_bg.jpg"
          alt="관련법규"
          fill
          className={`object-cover object-center transition-transform duration-[10000ms] ease-out ${
            imageZoomed ? 'scale-100' : 'scale-125'
          }`}
          priority
          quality={100}
        />

        {/* Title Content */}
        <div className="relative flex h-full items-center justify-center z-20">
          <h1
            className="text-5xl md:text-6xl font-bold text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            style={{ color: '#FFFFFF', textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            관련법규
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 relative z-10">
        
        {/* 배경 패턴 (은은한 그리드) */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-slate-600">자료를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-slate-600">등록된 자료가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-[1400px] mx-auto">
              {posts.map((post) => {
                const thumb = thumbMap[post.id] || null
                const category = post.label || '관련법규' // 기본값
                
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
                    href={`/archive/law/detail?id=${post.id}`}
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
