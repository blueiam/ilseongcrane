import { PageShell } from '../../_components/PageShell'

export default function CompanyAboutPage() {
  return (
    <PageShell
      title="회사소개"
      subtitle="인사말 · 회사개요를 한 페이지에서 제공합니다."
    >
      {/* 인사말 섹션 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">인사말</h2>
        <p className="text-gray-700 leading-relaxed">
          여기에는 대표이사 인사말 텍스트가 들어갑니다.  
          나중에 Figma 디자인에 맞춰 더 풍부하게 구성할 예정입니다.
        </p>
      </section>

      {/* 회사개요 섹션 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">회사개요</h2>
        <p className="text-gray-700 leading-relaxed">
          회사 비전, 핵심 Value, 사옥 사진, 업력 요약 정보 등이 들어가는 영역입니다.
        </p>
      </section>

      {/* 여기에 원하는 만큼 추가 섹션 확장 가능 */}
    </PageShell>
  )
}
