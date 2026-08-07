"use client"

import type { ReactNode } from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

import { ShellLayout } from "./_components/shell-layout"
import { ContactDialogProvider } from "./_hooks/use-contact-dialog"

export function Shell({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <ContactDialogProvider>
          <ShellLayout>{children}</ShellLayout>
        </ContactDialogProvider>
      </SidebarProvider>
    </TooltipProvider>
  )
}
