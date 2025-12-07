import { PageShell } from '../../_components/PageShell'
// 또는 '../../../_components/PageShell' 구조에 맞게 조정

export default function HrPage() {
  return (
    <PageShell
      title="HR"
      subtitle="HR"
      bgColor="bg-white"
      textColor="text-gray-900"
      subtitleColor="text-gray-600"
    >
      <p className="text-gray-700">
        탭/슬라이드와 함께 각 영역의 설명과 사진이 배치될 예정입니다.
      </p>
    </PageShell>
  )
}
