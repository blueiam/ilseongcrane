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
    <PageShell
      title="기술자료실"
      subtitle="기술 자료, 매뉴얼, 스펙 문서를 공유합니다."
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
            const label = post.label || ''

            return (
              <Link
                key={post.id}
                href={`/archive/tech/detail?id=${post.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-40 w-full bg-gray-100">
                  {thumb ? (
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

                <div className="flex flex-1 flex-col p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    {label ? (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-700">
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
    </PageShell>
  )
}