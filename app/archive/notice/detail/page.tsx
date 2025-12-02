// web/app/archive/notice/detail/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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

type PostFile = {
  id: string
  file_url: string
  file_name: string | null
}

export default function NoticeDetailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')

  const [post, setPost] = useState<Post | null>(null)
  const [files, setFiles] = useState<PostFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      // 1) 게시글
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (postError || !postData) {
        setError(
          postError?.message || '게시글을 찾을 수 없습니다.'
        )
        setLoading(false)
        return
      }

      setPost(postData as Post)

      // 2) 첨부파일 목록
      const { data: fileData, error: fileError } = await supabase
        .from('post_files')
        .select('id, file_url, file_name')
        .eq('post_id', id)
        .order('created_at', { ascending: true })

      if (!fileError && fileData) {
        setFiles(fileData as PostFile[])
      }

      setLoading(false)
    }

    fetchData()
  }, [id])

  if (!id) {
    return (
      <PageShell title="공지 상세" subtitle="유효하지 않은 글입니다.">
        <p className="text-gray-600">
          잘못된 경로입니다. 공지 목록에서 다시 선택해주세요.
        </p>
      </PageShell>
    )
  }

  if (loading) {
    return (
      <PageShell title="공지 상세" subtitle="">
        <p className="text-gray-600">게시글을 불러오는 중입니다...</p>
      </PageShell>
    )
  }

  if (error || !post) {
    return (
      <PageShell title="공지 상세" subtitle="">
        <p className="text-red-500">
          게시글을 불러오는 중 오류가 발생했거나, 존재하지 않는 글입니다.
        </p>
      </PageShell>
    )
  }

  // Storage public URL 생성
  const getFileUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('post-files')
      .getPublicUrl(filePath)
    return data.publicUrl
  }

  return (
    <PageShell
      title="공지 · 뉴스"
      subtitle={post.is_notice ? '공지사항' : '일반 공지'}
    >
      <article className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            {post.title}
          </h1>
          <div className="text-right text-xs text-gray-500">
            <div>
              {new Date(post.created_at).toLocaleDateString('ko-KR')}
            </div>
            {post.is_notice && (
              <div className="mt-1 inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                공지
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
          {post.content || '내용이 없습니다.'}
        </div>

        {/* 첨부파일 리스트 */}
        <div className="mt-6 border-t pt-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-800">
            첨부파일
          </h3>
          {files.length === 0 ? (
            <p className="text-xs text-gray-500">
              등록된 첨부파일이 없습니다.
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {files.map((f) => {
                const url = getFileUrl(f.file_url)
                return (
                  <li key={f.id} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">•</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {f.file_name || f.file_url}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </article>

      <div className="mt-6">
        <button
          onClick={() => router.push('/archive/notice')}
          className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
        >
          목록으로
        </button>
      </div>
    </PageShell>
  )
}
