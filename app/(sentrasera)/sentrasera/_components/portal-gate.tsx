"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense, useEffect, type ReactNode } from "react"

import { resolvePortalRedirect } from "@/lib/sentrasera/access"
import type { PortalRole } from "@/lib/sentrasera/schemas"
import { useTRPC } from "@/lib/trpc/client"

import { usePrefetchPortalData } from "../_hooks/use-prefetch-portal-data"
import { PortalShell, type PortalNavItem } from "./portal-shell"
import { QueryError, RowsSkeleton } from "./query-states"

type Props = {
  role: PortalRole
  basePath?: string
  nav: readonly PortalNavItem[]
  headerActions?: ReactNode
  children: ReactNode
}

function GatePlaceholder({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">{children}</div>
}

// Decides what to show, not what is allowed: every tRPC procedure enforces the role itself.
export function PortalGate({
  role,
  basePath,
  nav,
  headerActions,
  children,
}: Props) {
  const trpc = useTRPC()
  const router = useRouter()
  const me = useQuery(trpc.sentrasera.auth.me.queryOptions())
  const redirectTo = me.isSuccess ? resolvePortalRedirect(me.data, role) : null
  usePrefetchPortalData(role, Boolean(me.data) && !redirectTo)

  useEffect(() => {
    if (redirectTo) router.replace(redirectTo)
  }, [redirectTo, router])

  if (me.error) {
    return (
      <GatePlaceholder>
        <QueryError
          message={me.error.message}
          onRetry={() => void me.refetch()}
        />
      </GatePlaceholder>
    )
  }

  if (!me.data || redirectTo) {
    return (
      <GatePlaceholder>
        <RowsSkeleton />
      </GatePlaceholder>
    )
  }

  return (
    <PortalShell
      basePath={basePath}
      nav={nav}
      headerActions={headerActions}
      accountName={me.data.contactName}
      accountDetail={
        me.data.role === "admin" ? "Admin" : me.data.organization
      }
    >
      <Suspense fallback={<RowsSkeleton />}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </Suspense>
    </PortalShell>
  )
}
