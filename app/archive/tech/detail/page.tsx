// web/app/archive/tech/detail/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
  external_link?: string | null
}

type PostFile = {
  id: string
  file_url: string
  file_name: string | null
  file_type?: string | null
}

// 확장자로 분류 (file_type이 null인 옛 데이터용)
const getExt = (nameOrPath: string): string =>
  (nameOrPath.split('.').pop() || '').toLowerCase()

const isImageFile = (nameOrPath: string): boolean =>
  ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'].includes(getExt(nameOrPath))

const isPdfFile = (nameOrPath: string): boolean => getExt(nameOrPath) === 'pdf'

const isZipFile = (nameOrPath: string): boolean => getExt(nameOrPath) === 'zip'

// YouTube URL → embed URL 변환
function toYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v) return `https://www.youtube.com/embed/${v}`
    }
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '')
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    return null
  } catch {
    return null
  }
}

export default function ArchiveTechDetailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')

  const [post, setPost] = useState<Post | null>(null)
  const [images, setImages] = useState<PostFile[]>([])
  const [pdfs, setPdfs] = useState<PostFile[]>([])
  const [zips, setZips] = useState<PostFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)

      // 1) 게시글
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('id, title, content, is_notice, created_at, label, external_link')
        .eq('id', id)
        .single()

      if (postError || !postData) {
        setError(postError?.message || '게시글을 찾을 수 없습니다.')
        setLoading(false)
        return
      }

      setPost(postData as Post)

      // 2) 첨부파일
      const { data: fileData, error: fileError } = await supabase
        .from('post_files')
        .select('id, file_url, file_name, file_type')
        .eq('post_id', id)
        .order('created_at', { ascending: true })

      if (!fileError && fileData) {
        const imgs: PostFile[] = []
        const pdfList: PostFile[] = []
        const zipList: PostFile[] = []

        ;(fileData as PostFile[]).forEach((f) => {
          const base = f.file_name || f.file_url
          const type = f.file_type

          const isImg = type === 'image' || isImageFile(base)
          const isPdf = type === 'pdf' || isPdfFile(base)
          const isZip = type === 'zip' || isZipFile(base)

          if (isImg) imgs.push(f)
          else if (isPdf) pdfList.push(f)
          else if (isZip) zipList.push(f)
        })

        setImages(imgs)
        setPdfs(pdfList)
        setZips(zipList)
      }

      setLoading(false)
    }

    fetchData()
  }, [id])

  if (!id) {
    return (
      <PageShell title="기술자료실" subtitle="">
        <p className="text-gray-600">
          잘못된 경로입니다. 기술자료실 목록에서 다시 선택해주세요.
        </p>
      </PageShell>
    )
  }

  if (loading) {
    return (
      <PageShell title="기술자료실" subtitle="">
        <p className="text-gray-600">자료를 불러오는 중입니다...</p>
      </PageShell>
    )
  }

  if (error || !post) {
    return (
      <PageShell title="기술자료실" subtitle="">
        <p className="text-red-500">
          게시글을 불러오는 중 오류가 발생했거나, 존재하지 않는 글입니다.
        </p>
      </PageShell>
    )
  }

  const embedUrl =
    post.external_link ? toYouTubeEmbedUrl(post.external_link) : null

  const getFileUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('post-files')
      .getPublicUrl(filePath)
    return data.publicUrl
  }

  return (
    <PageShell
      title="기술자료실"
      subtitle=""
    >
      <article className="rounded-xl bg-white p-6 shadow-sm">
        {/* 헤더 */}
        <header className="border-b pb-4">
          <div className="mb-2 flex items-center gap-2">
            {post.label && (
              <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">
                {post.label}
              </span>
            )}
            {post.is_notice && (
              <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                상단고정
              </span>
            )}
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            {post.title}
          </h1>
          <div className="mt-1 text-xs text-gray-500">
            {new Date(post.created_at).toLocaleString('ko-KR')}
          </div>
        </header>

        {/* 유튜브 영상 */}
        {embedUrl && (
          <section className="mt-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                src={embedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </section>
        )}

        {/* 본문 */}
        <section className="mt-4">
          <div
            className="prose prose-sm max-w-none text-sm leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{
              __html: post.content || '<p>내용이 없습니다.</p>',
            }}
          />
        </section>

        {/* 이미지 – 본문 아래 갤러리 */}
        {images.length > 0 && (
          <section className="mt-6 border-t pt-4">
            <div className="grid gap-3 md:grid-cols-3">
              {images.map((img) => {
                const url = getFileUrl(img.file_url)
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(url)}
                    className="group relative block w-full overflow-hidden rounded-lg bg-gray-50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={img.file_name || 'image'}
                      className="w-full h-auto object-contain transition group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {/* PDF 첨부 */}
        {pdfs.length > 0 && (
          <section className="mt-6 border-t pt-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-800">
              첨부파일 (PDF)
            </h3>
            <ul className="space-y-1 text-sm">
              {pdfs.map((f) => {
                const url = getFileUrl(f.file_url)
                return (
                  <li key={f.id} className="flex items-center gap-2">
                    <span className="text-xs text-red-500">PDF</span>
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
          </section>
        )}

        {/* ZIP 첨부 */}
        {zips.length > 0 && (
          <section className="mt-4 border-t pt-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-800">
              첨부파일 (ZIP)
            </h3>
            <ul className="space-y-1 text-sm">
              {zips.map((f) => {
                const url = getFileUrl(f.file_url)
                return (
                  <li key={f.id} className="flex items-center gap-2">
                    <span className="text-xs text-gray-700">ZIP</span>
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
          </section>
        )}
      </article>

      <div className="mt-6">
        <button
          onClick={() => router.push('/archive/tech')}
          className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
        >
          목록으로
        </button>
      </div>

      {/* 이미지 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 transition hover:bg-white"
            aria-label="닫기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="relative max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="확대 이미지"
              className="max-h-[90vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </PageShell>
  )
}


