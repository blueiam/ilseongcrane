import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from './_components/Header'
import { Footer } from './_components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '일성크레인',
  description: '일성크레인 공식 웹사이트',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* 헤더 고정 */}
        <Header />
        {/* 헤더 높이만큼 여백 주기 */}
        <div className="pt-16">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
