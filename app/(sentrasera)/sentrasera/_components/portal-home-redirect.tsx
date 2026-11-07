"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { HOME_BY_ROLE, LOGIN_PATH } from "@/lib/sentrasera/access"
import { useTRPC } from "@/lib/trpc/client"

import { QueryError, RowsSkeleton } from "./query-states"

export function PortalHomeRedirect() {
  const trpc = useTRPC()
  const router = useRouter()
  const me = useQuery(trpc.sentrasera.auth.me.queryOptions())

  useEffect(() => {
    if (!me.isSuccess) return
    router.replace(me.data ? HOME_BY_ROLE[me.data.role] : LOGIN_PATH)
  }, [me.isSuccess, me.data, router])

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {me.error ? (
        <QueryError
          message={me.error.message}
          onRetry={() => void me.refetch()}
        />
      ) : (
        <RowsSkeleton />
      )}
    </div>
  )
}
