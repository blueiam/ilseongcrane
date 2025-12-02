// web/app/test-db/page.tsx

import { createClient } from '@supabase/supabase-js'

// .env.local 에 넣어둔 Supabase 정보 사용
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function TestDbPage() {
  // equipments 테이블에서 최대 10개까지 가져오기
  const { data: equipments, error } = await supabase
    .from('equipments')
    .select('*')
    .limit(10)

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="mb-4 text-2xl font-bold">Supabase DB 테스트</h1>

      {error && (
        <p className="mb-4 text-red-500">
          에러가 발생했습니다: {error.message}
        </p>
      )}

      {!equipments || equipments.length === 0 ? (
        <p>장비 데이터가 없습니다. Supabase에서 한 줄 이상 추가해 보세요.</p>
      ) : (
        <div className="space-y-3">
          {equipments.map((eq: any) => (
            <div
              key={eq.id}
              className="flex flex-col gap-1 rounded-lg bg-white p-4 shadow"
            >
              <div className="font-semibold">
                {eq.name} ({eq.tonnage})
              </div>
              <div className="text-sm text-gray-600">
                카테고리: {eq.category} / 제조사: {eq.manufacturer}
              </div>
              {eq.description && (
                <div className="text-sm text-gray-700">
                  {eq.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
