// web/app/_components/Footer.tsx
'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#1a1a1a]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-xs text-gray-400 sm:flex-row sm:items-start sm:justify-between sm:text-[13px]">
        {/* 회사 정보 */}
        <div className="space-y-1">
          <div className="font-semibold text-white">
            일성크레인 주식회사
          </div>
          <div>주소: 경기도 평택시 고덕갈평6길 25, 813호</div>
          <div>사업자등록번호: 762-87-01656</div>
          <div>대표번호: 031-683-4235 · 이메일: info@ilseongcrane.com</div>
          <div className="text-[11px] text-gray-500">
            © {new Date().getFullYear()} ILSEONG CRANE. All rights reserved.
          </div>
        </div>

        {/* 약관 / 패밀리 사이트 / SNS */}
        <div className="flex flex-col gap-4 sm:items-end">
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white hover:underline transition-colors"
            >
              개인정보처리방침
            </Link>
          </div>

          {/* 패밀리 사이트 */}
          <form
            className="flex items-center gap-2 text-xs"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const select = form.elements.namedItem(
                'family',
              ) as HTMLSelectElement | null
              const url = select?.value
              if (url) {
                window.open(url, '_blank')
              }
            }}
          >
            <label htmlFor="family" className="text-gray-300">
              패밀리 사이트
            </label>
            <select
              id="family"
              name="family"
              className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-white focus:border-gray-600 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                패밀리 사이트 선택
              </option>
              <option value="https://www.google.com">승원아이엔씨</option>
              <option value="https://www.google.com">범한</option>
            </select>
            <button
              type="submit"
              className="rounded-md bg-gray-700 px-3 py-1 text-xs font-medium text-white hover:bg-gray-600 transition-colors"
            >
              이동
            </button>
          </form>

          {/* SNS */}
          <div className="flex items-center gap-3 text-xs">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-red-500 px-2 py-1 text-[11px] font-semibold text-white hover:bg-red-600"
            >
              YouTube
            </a>
            {/* <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 px-2 py-1 text-[11px] font-semibold text-white hover:brightness-110"
            >
              Instagram
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
