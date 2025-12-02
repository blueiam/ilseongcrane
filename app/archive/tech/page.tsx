// web/app/equipment/[id]/page.tsx
import { PageShell } from '../../_components/PageShell'

export default function TechPage({ params }: { params: { id: string } }) {
  return (
    <PageShell
      title={`tech page - ${params.id}`}
      subtitle="tech page"
    >
      <p className="text-gray-700">
        tech page
      </p>
    </PageShell>
  )
}
