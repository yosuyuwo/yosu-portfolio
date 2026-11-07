import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { useMessages } from "./portal-locale"

export function QueryError({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  const t = useMessages()

  return (
    <div role="alert" className="border-y border-(--sera-rule) py-8">
      <p className="text-sm font-medium">{t.common.loadError}</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="mt-4"
        onClick={onRetry}
      >
        {t.common.tryAgain}
      </Button>
    </div>
  )
}

export function EmptyState({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) {
  return (
    <div className="border-y border-(--sera-rule) py-10">
      <p className="font-serif text-2xl">{title}</p>
      {children && (
        <div className="mt-2 max-w-md text-sm text-pretty text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  )
}

const SKELETON_KEYS = ["first", "second", "third", "fourth"] as const

export function RowsSkeleton() {
  const t = useMessages()

  return (
    <div
      aria-busy="true"
      aria-label={t.common.loading}
      className="divide-y divide-(--sera-rule) border-y border-(--sera-rule)"
    >
      {SKELETON_KEYS.map((key) => (
        <div key={key} className="py-5">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="mt-3 h-3 w-2/5" />
        </div>
      ))}
    </div>
  )
}
