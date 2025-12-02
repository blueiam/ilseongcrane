// web/app/equipment/[id]/page.tsx
import { PageShell } from '../../_components/PageShell'

export default function DocsPage({ params }: { params: { id: string } }) {
  return (
    <PageShell
      title={`docs page - ${params.id}`}
      subtitle="docs page"
    >
      <p className="text-gray-700">
        docs page
      </p>
    </PageShell>
  )
}
