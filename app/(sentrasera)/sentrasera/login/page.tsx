import type { Metadata } from "next"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"

import { CornerLanguageSelect } from "../_components/corner-language-select"
import { PortalLocaleProvider } from "../_components/portal-locale"
import { PortalLogo } from "../_components/portal-logo"
import { LoginIntro } from "./_components/login-intro"
import { SignInForm } from "./_components/sign-in-form"

export const metadata: Metadata = { title: "Sign in" }

export default function LoginPage() {
  return (
    <PortalLocaleProvider>
      <CornerLanguageSelect />
    <main className="mx-auto grid min-h-dvh max-w-5xl content-center gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:gap-20">
      <div className="self-center">
        <h1>
          <PortalLogo className="h-auto w-64 md:w-96" />
        </h1>
        <LoginIntro />
      </div>
      <Suspense>
        <NuqsAdapter>
          <SignInForm />
        </NuqsAdapter>
      </Suspense>
    </main>
    </PortalLocaleProvider>
  )
}
