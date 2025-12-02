// web/app/company/overview/page.tsx

import { PageShell } from '../../_components/PageShell'

export default function CompanyOverviewPage() {
  return (
    <PageShell
      title="회사소개 - 회사개요"
      subtitle="회사 개요, 업력, 핵심 Value 등을 소개하는 페이지입니다."
    >
      <p className="text-gray-700">
        추후 사옥 사진, 핵심 Value 아이콘, 업력 요약 테이블이 들어갑니다.
      </p>
    </PageShell>
  )
}
