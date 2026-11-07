"use client"

import { useQueryClient } from "@tanstack/react-query"

import { useTRPC } from "@/lib/trpc/client"

export function useInvalidatePortal(): () => Promise<void> {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries(trpc.sentrasera.pathFilter())
}
