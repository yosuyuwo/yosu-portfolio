"use client"

import type { ReactNode } from "react"

import { PortalGate } from "@/app/(sentrasera)/sentrasera/_components/portal-gate"
import {
  LanguageSelect,
  useMessages,
} from "@/app/(sentrasera)/sentrasera/_components/portal-locale"

export function ClientFrame({ children }: { children: ReactNode }) {
  const t = useMessages()
  const nav = [
    { href: "/questions", label: t.nav.questions },
    { href: "/feedback", label: t.nav.feedback },
    { href: "/calendar", label: t.nav.calendar },
  ]

  return (
    <PortalGate role="client" nav={nav} headerActions={<LanguageSelect />}>
      {children}
    </PortalGate>
  )
}
