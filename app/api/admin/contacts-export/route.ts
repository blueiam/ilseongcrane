// web/app/api/admin/contacts-export/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  // 1) Supabase에서 contacts 전체 조회
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('contacts export error:', error)
    return NextResponse.json(
      { error: '문의 내역을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }

  const rows = data || []

  // 2) CSV 헤더 정의
  const header = [
    'created_at',
    'category',
    'company',
    'name',
    'phone',
    'email',
    'message',
    'status',
  ]

  // 3) CSV 각 셀을 안전하게 감싸는 함수
  const escapeCell = (value: unknown) => {
    if (value === null || value === undefined) return ''
    const str = String(value)
    // 따옴표 / 줄바꿈 있으면 " 로 감싸고 내부 " 는 "" 로 이스케이프
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  // 4) rows -> CSV 문자열 변환
  const lines: string[] = []
  // 헤더
  lines.push(header.join(','))

  // 데이터
  for (const row of rows as any[]) {
    const line = [
      row.created_at ?? '',
      row.category ?? '',
      row.company ?? '',
      row.name ?? '',
      row.phone ?? '',
      row.email ?? '',
      row.message ?? '',
      row.status ?? '',
    ].map(escapeCell).join(',')
    lines.push(line)
  }

  const csv = lines.join('\r\n')

  // Excel에서 한글이 깨지지 않도록 BOM 추가
  const bom = '\uFEFF'
  const csvWithBom = bom + csv

  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const filename = `contacts_${y}${m}${d}.csv`

  return new Response(csvWithBom, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
