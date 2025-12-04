// web/app/_components/NoticeCard.tsx
export type NoticeCardProps = {
    title: string
    label?: '공지' | '뉴스' | string
    date: string
    excerpt?: string
    imageUrl?: string | null
  }
  
  export function NoticeCard({
    title,
    label,
    date,
    excerpt,
    imageUrl,
  }: NoticeCardProps) {
    return (
      <article className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="relative h-40 w-full bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
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
            <span className="text-[11px] text-gray-400">{date}</span>
          </div>
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-600">
              {excerpt}
            </p>
          )}
        </div>
      </article>
    )
  }
  