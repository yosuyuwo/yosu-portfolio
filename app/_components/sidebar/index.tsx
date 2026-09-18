"use client"

import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import type { SectionId } from "@/app/_types/section-id"

import { BrandHeader } from "./_components/brand-header"
import { PrimaryNav } from "./_components/primary-nav"
import { ResumeDownloadLink } from "./_components/resume-download-link"
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
          <Separator className="my-1 group-data-[collapsible=icon]:hidden" />
          <ResumeDownloadLink />
          <div className="mt-4 hidden pt-1 md:block">
            <SidebarCollapseControl />
          </div>
        </SidebarFooter>
      </FlipHighlightProvider>
      <SidebarRail />
    </SidebarRoot>
  )
}
