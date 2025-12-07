// web/app/admin/dashboard/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // /admin/dashboard 접근 시 /admin으로 리다이렉트
    router.replace('/admin')
  }, [router])

  return null
}
