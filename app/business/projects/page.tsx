'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import BusinessCard from '@/components/business-card';
import { ProjectsHero } from '@/app/_components/ProjectsHero';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  image_url: string | null
  link: string | null
  display_order?: number
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'SOC', label: 'SOC' },
  { value: '플랜트', label: '플랜트' },
  { value: '에너지', label: '에너지' },
  { value: '조선해양', label: '조선해양' },
  { value: '물류항만', label: '물류항만' },
  { value: '특수부분', label: '특수부분' },
  { value: '엔지니어링', label: '엔지니어링' },
] as const

type CategoryValue = typeof CATEGORY_OPTIONS[number]['value']

// ----------------------------------------------------------------------
// 애니메이션 훅
// ----------------------------------------------------------------------
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return { ref, isVisible };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<CategoryValue>('all')
  const [keyword, setKeyword] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // 전체 사업 실적 데이터 가져오기 (display_order 순서로 정렬)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let query = supabase.from('projects').select('*')
        
        const { data, error } = await query
          .order('display_order', { ascending: true })
          .order('title', { ascending: true })

        if (error) {
          // display_order 컬럼이 없을 경우 title만으로 정렬
          if (error.message.includes('display_order')) {
            const { data: fallbackData, error: fallbackError } = await supabase
              .from('projects')
              .select('*')
              .order('title', { ascending: true })
            
            if (fallbackError) {
              setError(fallbackError.message)
            } else {
              setProjects((fallbackData || []) as Project[])
            }
          } else {
            setError(error.message)
          }
        } else {
          setProjects((data || []) as Project[])
        }
      } catch (err: any) {
        setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // 검색/필터 적용
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 카테고리 필터
      if (category !== 'all' && project.category !== category) return false

      // 키워드 검색 (제목 및 부제목 기준)
      if (keyword.trim()) {
        const kw = keyword.trim().toLowerCase()
        const title = (project.title || '').toLowerCase()
        const subtitle = (project.subtitle || '').toLowerCase()
        const description = (project.description || '').toLowerCase()
        
        // 제목, 부제목, 설명 중 하나라도 포함되면 검색 결과에 포함
        if (!title.includes(kw) && !subtitle.includes(kw) && !description.includes(kw)) {
          return false
        }
      }

      return true
    })
  }, [projects, category, keyword])

  return (
    <>
      {/* Hero Section */}
      <ProjectsHero />

      {/* Main Content */}
      <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 relative z-10">
        
        {/* 배경 그리드 효과 - main 컨텐츠 영역에만 적용 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
          {/* 필터 영역 */}
          <div className="mb-8 flex flex-col gap-4 rounded-xl bg-[#151515] border border-white/10 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            {/* 카테고리 필터 */}
            <div className="flex items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCategory(opt.value)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                      category === opt.value
                        ? 'bg-blue-600 text-white shadow-sm border border-blue-500/30'
                        : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#222222] border border-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 검색창 */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">제목 검색</span>
              <input
                type="text"
                placeholder="예: 영덕 호지마을 풍력 발전 현장"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-48 rounded-lg border border-white/10 bg-[#1a1a1a] text-white px-3 py-2 text-sm transition-all focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* 로딩/에러/리스트 */}
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-gray-400">사업 실적 데이터를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-red-400">
                데이터를 불러오는 중 오류가 발생했습니다: {error}
              </p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400">
                  {projects.length === 0
                    ? '등록된 사업 실적이 없습니다.'
                    : '조건에 맞는 사업 실적이 없습니다. 필터 또는 검색어를 변경해 보세요.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  전체 {projects.length}개 중{' '}
                  <span className="font-semibold text-white">
                    {filteredProjects.length}개
                  </span>{' '}
                  표시 중
                </p>
              </div>
              <div className="pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-[1400px] mx-auto">
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      ref={index === 0 ? undefined : undefined}
                      className="w-full"
                    >
                      <BusinessCard
                        title={project.title}
                        subtitle={project.subtitle || undefined}
                        description={project.description}
                        imageUrl={project.image_url || '/test1.jpg'}
                        href={`/projects/${project.id}`}
                        category={project.category}
                        onImageClick={(imageUrl) => setSelectedImage(imageUrl)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* 이미지 확대 모달 (Lightbox) - certifications와 동일한 스타일 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          {/* 닫기 버튼 */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>

          {/* 모달 이미지 컨테이너 */}
          <div 
            className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 닫기 방지
          >
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Project Detail"
                fill
                className="object-contain"
                quality={95}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}