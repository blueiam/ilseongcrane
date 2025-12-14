// web/app/_components/NoticeCard.tsx
import Link from 'next/link'

export type NoticeCardProps = {
    title: string
    label?: '공지' | '뉴스' | string
    date: string
    excerpt?: string
    imageUrl?: string | null
    href?: string
  }
  
  export function NoticeCard({
    title,
    label,
    date,
    excerpt,
    imageUrl,
    href,
  }: NoticeCardProps) {
    const content = (
      <>
        {/* 이미지 영역 */}
        <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400 bg-gray-200">
              이미지 없음
            </div>
          )}
        </div>
  
        {/* 텍스트 영역 */}
        <div className="flex flex-1 flex-col p-4">
          {/* 상단: 라벨과 날짜 */}
          <div className="mb-3 flex items-center justify-between gap-2">
            {label ? (
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${
                  label === '공지' || label === '공시'
                    ? 'bg-red-50 text-red-700'
                    : label === '뉴스'
                    ? 'bg-blue-50 text-blue-700'
                    : label === '금지'
                    ? 'bg-orange-50 text-orange-700'
                    : 'bg-gray-50 text-gray-700'
                }`}
              >
                {label}
              </span>
            ) : (
              <span />
            )}
            <span className="text-xs text-gray-500 font-medium">{date}</span>
          </div>
          
          {/* 제목 */}
          <h3 className="text-sm font-semibold text-gray-900 leading-relaxed line-clamp-3">
            {title}
          </h3>
          
          {/* 요약 (있는 경우) */}
          {excerpt && (
            <p className="mt-2 text-xs text-gray-600 leading-relaxed line-clamp-2">
              {excerpt}
            </p>
          )}
        </div>
      </>
    )

    if (href) {
      return (
        <Link href={href} className="block">
          <article className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            {content}
          </article>
        </Link>
      )
    }

    return (
      <article className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
        {content}
      </article>
    )
  }
  