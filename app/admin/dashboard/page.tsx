// web/app/admin/dashboard/page.tsx
'use client'

import { PageShell } from '@/app/_components/PageShell'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminDashboardPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  return (
    <PageShell
      title="관리자 대시보드"
      subtitle="방문자 통계, 최신 문의 내역 등이 들어갈 자리입니다."
    >
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleLogout}
          className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
        >
          로그아웃
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 text-sm text-gray-700 shadow-sm">
        <p>여기에 대시보드 카드(방문자 수, 최근 문의 등)가 들어갈 예정입니다.</p>
      </div>
    </PageShell>
  )
}
