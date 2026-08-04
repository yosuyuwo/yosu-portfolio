"use client"

/**
 * PROTOTYPE — throwaway.
 * Three shell variants for the portfolio chrome question, switchable via ?variant=.
 * A: stripped inset (research target) · B: flush sidebar · C: top chrome
 */

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

import { PrototypeSwitcher } from "@/components/prototype-switcher"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

import {
  ContentStub,
  VariantASidebar,
  VariantBSidebar,
  VariantCTopChrome,
} from "./_components/shell-chrome"

const VARIANTS = [
  { key: "A", name: "Stripped inset" },
  { key: "B", name: "Flush sidebar" },
  { key: "C", name: "Top chrome" },
] as const

function ShellPrototypeInner() {
  const searchParams = useSearchParams()
  const variant = searchParams.get("variant") ?? "A"

  if (variant === "C") {
    return (
      <div className="min-h-svh bg-[#F5F5F5]">
        <VariantCTopChrome />
        <main className="mx-auto min-h-[calc(100svh-3.5rem)] max-w-5xl bg-background shadow-sm">
          <ContentStub note="Top chrome alternative: no left sidebar. Compare information hierarchy and hire-ready calm against the inset shell." />
        </main>
        <PrototypeSwitcher variants={[...VARIANTS]} />
      </div>
    )
  }

  if (variant === "B") {
    return (
      <SidebarProvider>
        <VariantBSidebar />
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-4 md:hidden">
            <SidebarTrigger className="-ml-1" />
            <span className="text-sm text-muted-foreground">Menu</span>
          </header>
          <ContentStub note="Flush sidebar: full-bleed left chrome, content not on an inset rounded plane. Same logo / Works / About / Socials stack." />
        </SidebarInset>
        <PrototypeSwitcher variants={[...VARIANTS]} />
      </SidebarProvider>
    )
  }

  // A — default research target
  return (
    <SidebarProvider>
      <VariantASidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 px-4 md:hidden">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm text-muted-foreground">Menu</span>
        </header>
        <ContentStub note="Stripped sidebar-08 inset: logo, Works + About, Socials footer. No user menu, projects, platform nav, or breadcrumbs." />
      </SidebarInset>
      <PrototypeSwitcher variants={[...VARIANTS]} />
    </SidebarProvider>
  )
}

export default function SidebarShellPrototypePage() {
  return (
    <TooltipProvider>
      <Suspense fallback={<div className="min-h-svh bg-background" />}>
        <ShellPrototypeInner />
      </Suspense>
    </TooltipProvider>
  )
}
