// web/app/admin/contacts/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { PageShell } from '@/app/_components/PageShell'
import { Trash2 } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Contact = {
  id: string
  company: string | null
  name: string
  phone: string | null
  email: string
  message: string
  status: string
  category?: string | null
  created_at: string
}

const STATUS_LABEL: Record<string, string> = {
  new: '신규',
  in_progress: '처리중',
  done: '완료',
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadContacts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setContacts((data || []) as Contact[])
      setError(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadContacts()
  }, [])

  // 페이지당 항목 수 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage])

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id)
    const { error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id)

    setUpdatingId(null)

    if (error) {
      alert('상태 변경 중 오류가 발생했습니다: ' + error.message)
      return
    }

    loadContacts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 이 문의를 삭제하시겠습니까?')) {
      return
    }

    setDeletingId(id)
    const { error } = await supabase.from('contacts').delete().eq('id', id)

    setDeletingId(null)

    if (error) {
      alert('삭제 중 오류가 발생했습니다: ' + error.message)
      return
    }

    // 삭제 후 현재 페이지에 항목이 없으면 이전 페이지로 이동
    const remainingItems = contacts.length - 1
    const maxPage = Math.ceil(remainingItems / itemsPerPage)
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage)
    }

    loadContacts()
  }

  // 페이지네이션 계산
  const totalPages = Math.ceil(contacts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedContacts = contacts.slice(startIndex, endIndex)

  // 페이지 번호 배열 생성 (최대 5개 페이지 번호 표시)
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  // ✅ 엑셀(CSV) 다운로드 핸들러
  const handleDownloadExcel = async () => {
    try {
      setDownloading(true)
      const res = await fetch('/api/admin/contacts-export')

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        alert(
          data?.error ||
            '문의 내역을 다운로드하는 중 오류가 발생했습니다.'
        )
        return
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `contacts_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      alert('파일 다운로드 중 오류가 발생했습니다.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <PageShell
      title="관리자 - 문의 관리"
      subtitle="웹사이트를 통해 접수된 견적/문의 내역을 확인합니다."
    >
      {/* 상단 액션 영역: 페이지당 항목 수 선택 및 엑셀 다운로드 버튼 */}
      <div className="mb-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="text-white">
            총 {contacts.length}건의 문의가 있습니다.
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-white">
              페이지당 항목 수:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={10}>10개</option>
              <option value={20}>20개</option>
              <option value={30}>30개</option>
              <option value={40}>40개</option>
              <option value={50}>50개</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDownloadExcel}
          disabled={downloading}
          className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {downloading ? '다운로드 중...' : '엑셀 다운로드'}
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-600">
          문의 내역을 불러오는 중입니다...
        </p>
      ) : error ? (
        <p className="text-sm text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다: {error}
        </p>
      ) : contacts.length === 0 ? (
        <p className="text-sm text-gray-600">
          아직 접수된 문의가 없습니다.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl bg-white p-4 shadow-sm">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border-b px-2 py-1 text-left">등록일</th>
                  <th className="border-b px-2 py-1 text-left">유형</th>
                  <th className="border-b px-2 py-1 text-left">회사명</th>
                  <th className="border-b px-2 py-1 text-left">담당자</th>
                  <th className="border-b px-2 py-1 text-left">연락처</th>
                  <th className="border-b px-2 py-1 text-left">이메일</th>
                  <th className="border-b px-2 py-1 text-left">문의 내용</th>
                  <th className="border-b px-2 py-1 text-center">상태</th>
                  <th className="border-b px-2 py-1 text-center">삭제</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContacts.map((c) => (
                <tr key={c.id} className="align-top hover:bg-gray-50">
                  <td className="border-b px-2 py-1">
                    {c.created_at
                      ? new Date(c.created_at).toLocaleString('ko-KR')
                      : ''}
                  </td>
                  <td className="border-b px-2 py-1">
                    {c.category === 'wind'
                      ? '풍력'
                      : c.category === 'equipment'
                      ? '장비'
                      : '-'}
                  </td>
                  <td className="border-b px-2 py-1">
                    {c.company || '-'}
                  </td>
                  <td className="border-b px-2 py-1">
                    {c.name}
                  </td>
                  <td className="border-b px-2 py-1">
                    {c.phone || '-'}
                  </td>
                  <td className="border-b px-2 py-1">
                    {c.email}
                  </td>
                  <td className="border-b px-2 py-1">
                    <div className="max-w-xs whitespace-pre-wrap">
                      {c.message}
                    </div>
                  </td>
                  <td className="border-b px-2 py-1 text-center">
                    <select
                      value={c.status}
                      onChange={(e) =>
                        handleStatusChange(c.id, e.target.value)
                      }
                      disabled={updatingId === c.id}
                      className="rounded-md border border-gray-300 px-2 py-1 text-[11px] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="new">{STATUS_LABEL.new}</option>
                      <option value="in_progress">
                        {STATUS_LABEL.in_progress}
                      </option>
                      <option value="done">{STATUS_LABEL.done}</option>
                    </select>
                  </td>
                  <td className="border-b px-2 py-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id)}
                      disabled={deletingId === c.id}
                      className="flex items-center justify-center rounded-md bg-red-600 p-1.5 text-white hover:bg-red-700 disabled:opacity-60"
                      title="삭제"
                    >
                      {deletingId === c.id ? (
                        <span className="text-[11px]">삭제 중...</span>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>

            <div className="flex gap-1">
              {getPageNumbers().map((page, index) => {
                if (page === '...') {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 py-1.5 text-xs text-gray-500"
                    >
                      ...
                    </span>
                  )
                }

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page as number)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        )}

        {/* 페이지 정보 */}
        {contacts.length > 0 && (
          <div className="mt-2 text-center text-xs text-gray-600">
            {startIndex + 1} - {Math.min(endIndex, contacts.length)} /{' '}
            {contacts.length}건
          </div>
        )}
      </>
      )}
    </PageShell>
  )
}
