import type { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = { title: "Page not found" }

export default function PortalNotFound() {
  return (
    <main className="mx-auto grid min-h-dvh max-w-5xl content-center justify-items-start gap-5 px-6 py-16">
      <h1 className="font-serif text-6xl leading-none tracking-tight md:text-7xl">
        Page not found
      </h1>
      <p className="max-w-sm text-base text-pretty text-muted-foreground">
        This link may be out of date. Your workspace is still where you left it.
      </p>
      <Link href="/" className={buttonVariants({ className: "mt-3" })}>
        Back to your workspace
      </Link>
    </main>
  )
}
