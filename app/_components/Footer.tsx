// web/app/_components/Footer.tsx
'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-xs text-gray-600 sm:flex-row sm:items-start sm:justify-between sm:text-[13px]">
        {/* 회사 정보 */}
        <div className="space-y-1">
          <div className="font-semibold text-gray-900">
            일성크레인 주식회사
          </div>
          <div>주소: (예시) 부산광역시 ○○구 ○○로 123</div>
          <div>사업자등록번호: 000-00-00000</div>
          <div>대표번호: 051-000-0000 · 이메일: info@example.com</div>
          <div className="text-[11px] text-gray-500">
            © {new Date().getFullYear()} ILSEONG CRANE. All rights reserved.
          </div>
        </div>

        {/* 약관 / 패밀리 사이트 / SNS */}
        <div className="flex flex-col gap-4 sm:items-end">
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              개인정보처리방침
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              이용약관
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
            <label htmlFor="family" className="text-gray-700">
              패밀리 사이트
            </label>
            <select
              id="family"
              name="family"
              className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs"
              defaultValue=""
            >
              <option value="" disabled>
                패밀리 사이트 선택
              </option>
              <option value="https://www.google.com">승원아이엔씨 (예시)</option>
              <option value="https://www.google.com">범한 (예시)</option>
            </select>
            <button
              type="submit"
              className="rounded-md bg-gray-800 px-3 py-1 text-xs font-medium text-white hover:bg-gray-900"
            >
              이동
            </button>
          </form>

          {/* SNS */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-gray-700">SNS</span>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-red-500 px-2 py-1 text-[11px] font-semibold text-white hover:bg-red-600"
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 px-2 py-1 text-[11px] font-semibold text-white hover:brightness-110"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
