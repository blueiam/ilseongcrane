// web/app/equipment/[id]/page.tsx
import { PageShell } from '../../_components/PageShell'

export default function ToolsPage() {
  return (
    <PageShell
    title={`Tools Page`}
      subtitle="Equipment Specification, PDF Download, Work Photo Gallery"
    >
      <p className="text-gray-700">
        이 페이지에서는 URL의 id를 기준으로 Supabase에서 장비 정보를 불러옵니다.
      </p>
    </PageShell>
  )
}
