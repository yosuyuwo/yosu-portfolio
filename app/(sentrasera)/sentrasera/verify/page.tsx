import type { Metadata } from "next"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"

import { CornerLanguageSelect } from "../_components/corner-language-select"
import { PortalLocaleProvider } from "../_components/portal-locale"
import { PortalLogo } from "../_components/portal-logo"
import { ContinueSignIn } from "./_components/continue-sign-in"

export const metadata: Metadata = { title: "Finish signing in" }

export default function VerifyPage() {
  return (
    <PortalLocaleProvider>
      <CornerLanguageSelect />
    <main className="mx-auto grid min-h-dvh max-w-md content-center gap-6 px-6 py-16">
      <h1>
        <PortalLogo className="h-auto w-64" />
      </h1>
      <Suspense>
        <NuqsAdapter>
          <ContinueSignIn />
        </NuqsAdapter>
      </Suspense>
    </main>
    </PortalLocaleProvider>
  )
}
