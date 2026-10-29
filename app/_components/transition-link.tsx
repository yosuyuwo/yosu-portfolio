"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"

import { usePageTransition } from "@/app/_hooks/use-page-transition"

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string
}

export function TransitionLink({ href, ...props }: TransitionLinkProps) {
  const pathname = usePathname()
  const { fadeTo } = usePageTransition()

  return (
    <Link
      href={href}
      onNavigate={(event) => {
        const target = new URL(href, window.location.href)
        // same-page hash links keep the native smooth scroll
        if (target.pathname !== pathname) fadeTo(event, href)
      }}
      {...props}
    />
  )
}
