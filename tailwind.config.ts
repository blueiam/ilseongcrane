// web/tailwind.config.ts
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // 기본 sans 폰트를 Noto Sans KR로
        sans: ['"Noto Sans KR"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ilseongBlue: '#003978', // 헤더 hover/active 컬러
      },
    },
  },
  plugins: [],
}

export default config
