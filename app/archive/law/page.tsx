// web/app/equipment/[id]/page.tsx
import { PageShell } from '../../_components/PageShell'

export default function LawPage({ params }: { params: { id: string } }) {
  return (
    <PageShell
      title={`law page - ${params.id}`}
      subtitle="law page"
    >
      <p className="text-gray-700">
        law page
      </p>
    </PageShell>
  )
}
