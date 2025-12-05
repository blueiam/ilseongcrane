import Image from 'next/image';
import Link from 'next/link';

// 날짜 포맷팅 함수 (YYYY. MM. DD.)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}.`;
};

interface NoticePost {
  id: string; // 또는 number
  title: string;
  category: string; // '공지' or '뉴스'
  created_at: string;
  thumbnail_url?: string;
}

interface NoticeCardProps {
  post: NoticePost;
  basePath?: string; // 기본값: '/archive/notice'
}

export default function NoticeCard({ post, basePath = '/archive/notice' }: NoticeCardProps) {
  // 배지 색상 결정 로직
  const isNotice = post.category === '공지' || post.category === 'notice';
  
  const badgeStyle = isNotice 
    ? "bg-green-100 text-green-700"  // 공지: 녹색 배경 + 녹색 글씨
    : "bg-blue-100 text-blue-700";   // 뉴스: 파란 배경 + 파란 글씨

  return (
    <Link href={`${basePath}/detail?id=${post.id}`} className="group block">
      <div className="flex flex-col gap-4">
        
        {/* 1. 카드 이미지 영역 (400px x 400px 비율 유지 & Radius 8px) */}
        <div className="relative w-full aspect-square overflow-hidden rounded-[8px] bg-gray-100">
          {post.thumbnail_url ? (
            <Image
              src={post.thumbnail_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            // 이미지가 없을 때 보여줄 회색 박스
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="text-sm">No Image</span>
            </div>
          )}
        </div>
        {/* 2. 텍스트 영역 (Stroke 없음) */}
        <div className="flex flex-col items-start gap-2">
          
          {/* 배지 및 날짜 한 줄 배치 */}
          <div className="flex items-center gap-3">
            {/* 배지 */}
            <span className={`px-2 py-1 text-xs font-bold rounded ${badgeStyle}`}>
              {post.category}
            </span>
            {/* 날짜 */}
            <span className="text-sm text-gray-500 font-medium">
              {formatDate(post.created_at)}
            </span>
          </div>
          {/* 제목 (최대 2줄) */}
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          
          {/* 설명글(Description)은 요청에 따라 삭제함 */}
        </div>
      </div>
    </Link>
  );
}

