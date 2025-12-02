// web/app/equipment/[id]/page.tsx
import { PageShell } from '../../_components/PageShell'

export default function DataPage({ params }: { params: { id: string } }) {
  return (
    <PageShell
      title={`data page - ${params.id}`}
      subtitle="data page"
    >
      <p className="text-gray-700">
        data page
      </p>
    </PageShell>
  )
}
