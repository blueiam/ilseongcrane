// web/app/admin/contacts/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { PageShell } from '@/app/_components/PageShell'

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
  const [allContacts, setAllContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  const loadContacts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      const contactsData = (data || []) as Contact[]
      setAllContacts(contactsData)
      setError(null)
    }
    setLoading(false)
  }

  // 페이지네이션 계산
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setContacts(allContacts.slice(startIndex, endIndex))
  }, [allContacts, currentPage, itemsPerPage])

  const totalPages = Math.ceil(allContacts.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value)
    setCurrentPage(1) // 페이지 크기 변경 시 첫 페이지로 이동
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    
    const ampm = hours >= 12 ? 'pm' : 'am'
    const displayHours = hours % 12 || 12
    
    return {
      dateLine: `${year}. ${month}. ${day}.`,
      timeLine: `${ampm} ${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

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
      {/* 상단 액션 영역: 엑셀 다운로드 버튼 및 페이지당 항목 수 선택 */}
      <div className="mb-4 flex items-center justify-between text-xs">
        <div className="text-[#eeeeee]">
          총 {allContacts.length}건의 문의가 있습니다.
          {allContacts.length > 0 && (
            <span className="ml-2">
              ({(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, allContacts.length)} / {allContacts.length})
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-[#eeeeee]">
              페이지당 항목:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={10}>10개</option>
              <option value={20}>20개</option>
              <option value={30}>30개</option>
              <option value={50}>50개</option>
              <option value={100}>100개</option>
            </select>
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
        <div className="mx-auto max-w-[1800px] overflow-x-auto rounded-xl bg-white p-4 shadow-sm">
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
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => {
                const dateFormat = c.created_at ? formatDate(c.created_at) : null
                return (
                <tr key={c.id} className="align-top hover:bg-gray-50">
                  <td className="border-b px-2 py-1">
                    {dateFormat ? (
                      <div className="flex flex-col whitespace-nowrap">
                        <div className="whitespace-nowrap">{dateFormat.dateLine}</div>
                        <div className="whitespace-nowrap">{dateFormat.timeLine}</div>
                      </div>
                    ) : ''}
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
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      )}

      {/* 페이지네이션 */}
      {!loading && !error && allContacts.length > 0 && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {/* 이전 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
          >
            이전
          </button>

          {/* 페이지 번호 버튼들 */}
          <div className="flex items-center gap-1">
            {/* 첫 페이지 */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-100"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="px-2 text-xs text-gray-400">...</span>
                )}
              </>
            )}

            {/* 현재 페이지 주변 페이지들 */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
              )
              .map((page, idx, arr) => {
                // 연속된 페이지 번호 사이에 생략 표시 추가
                const prevPage = arr[idx - 1]
                const showEllipsis = prevPage && page - prevPage > 1

                return (
                  <div key={page} className="flex items-center gap-1">
                    {showEllipsis && (
                      <span className="px-2 text-xs text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                        currentPage === page
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                )
              })}

            {/* 마지막 페이지 */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-2 text-xs text-gray-400">...</span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-100"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* 다음 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
          >
            다음
          </button>
        </div>
      )}
    </PageShell>
  )
}
