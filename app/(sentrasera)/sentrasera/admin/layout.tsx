import type { ReactNode } from "react"

import { PortalGate } from "../_components/portal-gate"

const ADMIN_NAV = [
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/questions", label: "Questions" },
  { href: "/admin/answers", label: "Answers" },
  { href: "/admin/feedback", label: "Feedback" },
  { href: "/admin/calendar", label: "Calendar" },
] as const

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <PortalGate role="admin" basePath="/admin" nav={ADMIN_NAV}>
      {children}
    </PortalGate>
  )
}
