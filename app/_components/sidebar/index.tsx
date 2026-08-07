"use client"

import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import type { SectionId } from "@/app/_types/section-id"

import { BrandHeader } from "./_components/brand-header"
import { PrimaryNav } from "./_components/primary-nav"
import { SidebarCollapseControl } from "./_components/sidebar-collapse-control"
import { SocialNav } from "./_components/social-nav"
import { FlipHighlightProvider } from "./_hooks/use-flip-highlight"

export function Sidebar({ activeSection }: { activeSection: SectionId }) {
  return (
    <SidebarRoot variant="inset" collapsible="icon">
      <FlipHighlightProvider active={activeSection}>
        <SidebarHeader className="relative z-10 hidden px-2 pt-3 md:flex">
          <BrandHeader />
        </SidebarHeader>
        <SidebarContent className="relative z-10 gap-4 px-2 pt-6 md:pt-2">
          <PrimaryNav />
        </SidebarContent>
        <SidebarFooter className="relative z-10 gap-2 px-2 pb-3">
          <SocialNav />
          <div className="hidden md:block">
            <SidebarCollapseControl />
          </div>
        </SidebarFooter>
      </FlipHighlightProvider>
      <SidebarRail />
    </SidebarRoot>
  )
}
