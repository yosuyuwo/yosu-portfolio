"use client"

import { FileDownIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { RESUME_FILE } from "@/lib/site-content"
import { cn } from "@/lib/utils"

import { useFlipTarget } from "../_hooks/use-flip-highlight"
import { flipHitClass } from "../_lib/flip-hit-class"

export function ResumeDownloadLink() {
  const { highlighted, setRef, onMouseEnter } = useFlipTarget("resume")
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem className="relative z-10">
        <div ref={setRef} onMouseEnter={isMobile ? undefined : onMouseEnter}>
          <SidebarMenuButton
            tooltip={RESUME_FILE.label}
            className={cn(
              flipHitClass,
              !isMobile &&
                highlighted &&
                "font-medium text-sidebar-accent-foreground",
            )}
            render={
              <a
                href={RESUME_FILE.href}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <FileDownIcon />
            <span>{RESUME_FILE.label}</span>
          </SidebarMenuButton>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
