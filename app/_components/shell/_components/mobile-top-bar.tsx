"use client"

import { Brand } from "@/app/_components/brand"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CONTACT } from "@/lib/site-content"

import { useContactDialog } from "../_hooks/use-contact-dialog"

export function MobileTopBar({
  revealTransform,
}: {
  revealTransform?: string
}) {
  const { setOpen } = useContactDialog()

  return (
    <header
      className="pointer-events-auto relative z-20 flex h-14 shrink-0 items-center gap-2 bg-sidebar px-4 text-sidebar-foreground will-change-transform md:hidden"
      style={{ transform: revealTransform }}
    >
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
      />
      <Brand className="min-w-0 flex-1" />
      <Button
        type="button"
        size="sm"
        variant="default"
        onClick={() => setOpen(true)}
      >
        {CONTACT.ctaLabel}
      </Button>
    </header>
  )
}
