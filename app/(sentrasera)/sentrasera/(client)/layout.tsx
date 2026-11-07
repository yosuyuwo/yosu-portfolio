import type { ReactNode } from "react"

import { PortalGate } from "../_components/portal-gate"

const CLIENT_NAV = [
  { href: "/questions", label: "Questions" },
  { href: "/feedback", label: "Feedback" },
  { href: "/calendar", label: "Calendar" },
] as const

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <PortalGate role="client" nav={CLIENT_NAV}>
      {children}
    </PortalGate>
  )
}
