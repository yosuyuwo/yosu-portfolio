"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

import type { PortalRole } from "@/lib/sentrasera/schemas"
import { useTRPC } from "@/lib/trpc/client"

// Loads every tab's data once the viewer is known, so opening a tab shows content instead of a skeleton.
export function usePrefetchPortalData(role: PortalRole, isReady: boolean): void {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isReady) return
    const { questions, feedback, updates, categories, clients } = trpc.sentrasera

    void queryClient.prefetchQuery(updates.list.queryOptions())
    void queryClient.prefetchQuery(categories.list.queryOptions())

    if (role === "admin") {
      void queryClient.prefetchQuery(clients.list.queryOptions())
      void queryClient.prefetchQuery(questions.listForAdmin.queryOptions())
      void queryClient.prefetchQuery(questions.allAnswers.queryOptions())
      void queryClient.prefetchQuery(feedback.all.queryOptions())
      return
    }
    void queryClient.prefetchQuery(questions.listForClient.queryOptions())
    void queryClient.prefetchQuery(feedback.mine.queryOptions())
  }, [isReady, role, queryClient, trpc])
}
