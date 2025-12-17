import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Header } from './_components/Header'
import { Footer } from './_components/Footer'
import { AdminLayoutWrapper } from './_components/AdminLayoutWrapper'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '일성크레인 - 대형 크레인 전문',
  description: '(주)일성크레인 안전을 최우선으로 생각합니다',
  icons: {
    icon: [
      { url: '/images/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon_io/favicon.ico' },
    ],
    apple: [
      { url: '/images/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: '(주)일성크레인',
    description: '안전을 최우선으로 생각합니다',
    images: [
      {
        url: '/images/ilseong_logo.svg',
        width: 488,
        height: 252,
        alt: '일성크레인 로고',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
    siteName: '일성크레인',
  },
  twitter: {
    card: 'summary_large_image',
    title: '일성크레인 - 대형 크레인 전문',
    description: '(주)일성크레인 안전을 최우선으로 생각합니다',
    images: ['/images/ilseong_logo.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className} suppressHydrationWarning>
        <AdminLayoutWrapper>
          {children}
        </AdminLayoutWrapper>
      </body>
    </html>
  )
}
