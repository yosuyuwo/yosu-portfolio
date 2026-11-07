import type { Metadata } from "next"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"

import { PortalLogo } from "../_components/portal-logo"
import { SignInForm } from "./_components/sign-in-form"

export const metadata: Metadata = { title: "Sign in" }

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-dvh max-w-5xl content-center gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:gap-20">
      <div className="self-center">
        <h1>
          <PortalLogo className="h-auto w-64 md:w-96" />
        </h1>
        <p className="mt-5 max-w-sm text-base text-pretty text-muted-foreground">
          See what&apos;s coming to the pilot, answer open questions, and tell
          us how it&apos;s going.
        </p>
      </div>
      <Suspense>
        <NuqsAdapter>
          <SignInForm />
        </NuqsAdapter>
      </Suspense>
    </main>
  )
}
