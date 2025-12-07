// web/app/_components/PageShell.tsx


'use client'

type PageShellProps = {
    title: string
    subtitle?: string
    children?: React.ReactNode
    bgColor?: string
    textColor?: string
    subtitleColor?: string
  }
  
  export function PageShell({ 
    title, 
    subtitle, 
    children,
    bgColor = 'bg-[#1a1a1a]',
    textColor = 'text-white',
    subtitleColor = 'text-gray-400'
  }: PageShellProps) {
    return (
      <main className={`min-h-screen ${bgColor} px-6 py-10`}>
        <div className="mx-auto max-w-4xl">
          <h1 className={`text-2xl font-bold ${textColor}`}>{title}</h1>
          {subtitle && (
            <p className={`mt-2 ${subtitleColor}`}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </main>
    )
  }
  