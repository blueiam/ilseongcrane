'use client'

import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function VisitorTracker() {
  useEffect(() => {
    // sessionStorage 확인
    if (typeof window === 'undefined') return

    const visitedSession = sessionStorage.getItem('visited_session')
    
    if (!visitedSession) {
      // 방문 로그 기록
      const pagePath = window.location.pathname
      
      supabase
        .from('visitor_logs')
        .insert([
          {
            page_path: pagePath,
            visited_at: new Date().toISOString(),
          },
        ])
        .then(({ error }) => {
          if (error) {
            console.error('Visitor log error:', error)
          } else {
            // 세션 스토리지에 방문 기록 저장
            sessionStorage.setItem('visited_session', 'true')
          }
        })
    }
  }, [])

  return null
}

