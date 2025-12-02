// web/app/equipment/[id]/page.tsx
import { PageShell } from '../../_components/PageShell'

export default function HrPage({ params }: { params: { id: string } }) {
  return (
    <PageShell
      title={`hr page - ${params.id}`}
      subtitle="hr page"
    >
      <p className="text-gray-700">
        hr page
      </p>
    </PageShell>
  )
}
