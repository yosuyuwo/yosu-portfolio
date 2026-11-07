import type { ReactNode } from "react"

type Props = {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeading({ title, description, actions }: Props) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 pb-8">
      <div className="min-w-0">
        <h1 className="font-serif text-5xl leading-none tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-sm text-pretty text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  )
}
