"use client"

import { useMessages } from "@/app/(sentrasera)/sentrasera/_components/portal-locale"

export function LoginIntro() {
  const t = useMessages()

  return (
    <p className="mt-5 max-w-sm text-base text-pretty text-muted-foreground">
      {t.signIn.intro}
    </p>
  )
}
