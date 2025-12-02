// web/app/sustainability/qshe/page.tsx

import { PageShell } from '@/app/_components/PageShell'

export default function SustainabilityQswePage() {
  return (
    <PageShell
      title="지속가능경영 - QSHE 경영"
      subtitle="품질(Quality) · 안전(Safety) · 보건(Health) · 환경(Environment) 체계를 소개합니다."
    >
      <p className="mb-4 text-gray-700">
        이 페이지에는 품질/안전/보건/환경 방침 도식화, ISO 인증서 이미지 갤러리,
        윤리헌장 텍스트 등이 배치될 예정입니다.
      </p>

      <ul className="space-y-2 text-sm text-gray-700">
        <li>· 품질경영 방침</li>
        <li>· 안전/보건 관리 체계</li>
        <li>· 환경경영(친환경 장비 운용, 탄소저감 노력)</li>
        <li>· ISO 인증서 이미지(클릭 시 확대)</li>
      </ul>
    </PageShell>
  )
}
