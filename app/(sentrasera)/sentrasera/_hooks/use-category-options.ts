"use client"

import { useQuery } from "@tanstack/react-query"

import { useTRPC } from "@/lib/trpc/client"

import type { SelectOption } from "../_components/option-select"

export function useCategoryOptions(): readonly SelectOption[] {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.sentrasera.categories.list.queryOptions())
  return (data ?? []).map((category) => ({
    value: category.id,
    label: category.name,
  }))
}
