// 예: web/app/company/history/page.tsx

import { PageShell } from '../../_components/PageShell'

export default function CompanyHistoryPage() {
  return (
    <PageShell
      title="회사소개 - 회사연혁"
      subtitle="연도별 타임라인으로 회사 역사를 보여주는 페이지입니다."
    >
      <p className="text-gray-700">
        나중에 스크롤 애니메이션이 들어간 연혁 타임라인을 구현합니다.
      </p>
    </PageShell>
  )
}
