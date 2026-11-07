"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

import { useMessages } from "./portal-locale"

export function NotFoundContent() {
  const t = useMessages()

  return (
    <main className="mx-auto grid min-h-dvh max-w-5xl content-center justify-items-start gap-5 px-6 py-16">
      <h1 className="font-serif text-6xl leading-none tracking-tight md:text-7xl">
        {t.notFound.title}
      </h1>
      <p className="max-w-sm text-base text-pretty text-muted-foreground">
        {t.notFound.body}
      </p>
      <Link href="/" className={buttonVariants({ className: "mt-3" })}>
        {t.notFound.back}
      </Link>
    </main>
  )
}
