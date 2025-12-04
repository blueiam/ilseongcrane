// web/app/_components/PageShell.tsx


'use client'

type PageShellProps = {
    title: string
    subtitle?: string
    children?: React.ReactNode
  }
  
  export function PageShell({ title, subtitle, children }: PageShellProps) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-[1800px]">
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-gray-600">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </main>
    )
  }
  