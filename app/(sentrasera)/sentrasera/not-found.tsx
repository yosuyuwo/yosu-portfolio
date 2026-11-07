import type { Metadata } from "next"

import { NotFoundContent } from "./_components/not-found-content"
import { PortalLocaleProvider } from "./_components/portal-locale"

export const metadata: Metadata = { title: "Page not found" }

export default function PortalNotFound() {
  return (
    <PortalLocaleProvider>
      <NotFoundContent />
    </PortalLocaleProvider>
  )
}
