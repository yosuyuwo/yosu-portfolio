"use client"

import { PanelLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { useFlipTarget } from "../_hooks/use-flip-highlight"

export function SidebarCollapseControl() {
  const { toggleSidebar, state, isMobile } = useSidebar()
  const { highlighted, setRef, onMouseEnter } = useFlipTarget("collapse")
  const collapsed = state === "collapsed"
  const label = collapsed ? "Expand sidebar" : "Collapse sidebar"

  return (
    <div
      ref={setRef}
      onMouseEnter={isMobile ? undefined : onMouseEnter}
      className="relative z-10"
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start gap-2 px-2 hover:bg-transparent group-data-[collapsible=icon]:w-8! group-data-[collapsible=icon]:min-w-8! group-data-[collapsible=icon]:px-2!",
                highlighted && "text-sidebar-accent-foreground",
              )}
              onClick={toggleSidebar}
              aria-label={label}
            >
              <PanelLeftIcon />
              <span className="group-data-[collapsible=icon]:hidden">
                Collapse Sidebar
              </span>
            </Button>
          }
        />
        <TooltipContent side="right" align="center" hidden={!collapsed}>
          {label}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
