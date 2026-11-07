"use client"

import { useQuery } from "@tanstack/react-query"

import { pickText } from "@/lib/sentrasera/locale"
import { useTRPC } from "@/lib/trpc/client"

import type { SelectOption } from "../_components/option-select"
import { useLocale } from "../_components/portal-locale"

export function useCategoryOptions(): readonly SelectOption[] {
  const trpc = useTRPC()
  const locale = useLocale()
  const { data } = useQuery(trpc.sentrasera.categories.list.queryOptions())
  return (data ?? []).map((category) => ({
    value: category.id,
    label: pickText(locale, category.name, category.name_bahasa),
  }))
}
