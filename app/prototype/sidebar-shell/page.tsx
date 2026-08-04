"use client"

/**
 * PROTOTYPE - throwaway.
 * Locked shell: stripped sidebar-08 inset + inset top bar (trigger, no breadcrumbs).
 */

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

import { ContentStub, VariantASidebar } from "./_components/shell-chrome"

function InsetTopBar({ title = "Works" }: { title?: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
      />
      <p className="text-sm font-medium">{title}</p>
    </header>
  )
}

export default function SidebarShellPrototypePage() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <VariantASidebar />
        <SidebarInset>
          <InsetTopBar title="Works" />
          <ContentStub note="Stripped sidebar-08 inset + top bar: logo, Works + About, Socials footer, SidebarTrigger. No user menu, projects, platform nav, or breadcrumbs." />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
