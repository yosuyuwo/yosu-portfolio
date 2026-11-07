"use client"

import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/sentrasera/auth-client"
import { cn } from "@/lib/utils"

import { PortalLogo } from "./portal-logo"

export type PortalNavItem = {
  href: string
  label: string
}

type Props = {
  basePath?: string
  nav: readonly PortalNavItem[]
  accountName: string
  accountDetail: string | null
  children: ReactNode
}

function useActiveHref(basePath: string): string {
  // usePathname would read the rewritten /sentrasera path; layout segments stay stable across the rewrite
  const segments = useSelectedLayoutSegments().filter(
    (segment) => !segment.startsWith("(")
  )
  return `${basePath}/${segments.join("/")}`
}

export function PortalShell({
  basePath = "",
  nav,
  accountName,
  accountDetail,
  children,
}: Props) {
  const activeHref = useActiveHref(basePath)
  const signOut = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => window.location.assign("/login"),
  })

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <header className="flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-foreground/80 py-4">
        <Link href="/">
          <PortalLogo className="h-5 w-auto" />
        </Link>
        <nav
          aria-label="Portal"
          className="order-last -mx-4 flex w-[calc(100%+2rem)] gap-1 overflow-x-auto px-4 sm:order-none sm:mx-0 sm:w-auto sm:px-0"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap text-muted-foreground transition-colors duration-fast hover:text-foreground",
                "aria-[current=page]:bg-accent aria-[current=page]:font-medium aria-[current=page]:text-accent-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right text-xs leading-tight md:block">
            <p className="font-medium">{accountName}</p>
            {accountDetail && (
              <p className="text-muted-foreground">{accountDetail}</p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={signOut.isPending}
            onClick={() => signOut.mutate()}
          >
            Sign out
          </Button>
        </div>
      </header>
      <main className="pt-10">{children}</main>
    </div>
  )
}
