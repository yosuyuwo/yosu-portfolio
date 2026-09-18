"use client"

import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense, type ReactNode } from "react"

export function NuqsProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <NuqsAdapter>{children}</NuqsAdapter>
    </Suspense>
  )
}
