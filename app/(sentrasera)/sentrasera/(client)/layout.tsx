import type { ReactNode } from "react"

import { PortalLocaleProvider } from "../_components/portal-locale"
import { ClientFrame } from "./_components/client-frame"

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <PortalLocaleProvider>
      <ClientFrame>{children}</ClientFrame>
    </PortalLocaleProvider>
  )
}
