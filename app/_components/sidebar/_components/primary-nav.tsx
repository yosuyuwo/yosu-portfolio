"use client"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

import { useFlipHighlight, useFlipTarget } from "../_hooks/use-flip-highlight"
import { flipHitClass } from "../_lib/flip-hit-class"
import { NAV_ITEMS } from "../_lib/nav-items"

function PrimaryNavItem({ item }: { item: (typeof NAV_ITEMS)[number] }) {
  const { active, hovered } = useFlipHighlight()
  const { highlighted, setRef, onMouseEnter } = useFlipTarget(item.id)
  const { isMobile, setOpenMobile } = useSidebar()
  const isCurrent = active === item.id && hovered === null

  return (
    <SidebarMenuItem className="relative z-10">
      <div ref={setRef} onMouseEnter={isMobile ? undefined : onMouseEnter}>
        <SidebarMenuButton
          tooltip={item.label}
          isActive={isCurrent}
          className={cn(
            flipHitClass,
            highlighted && "font-medium text-sidebar-accent-foreground",
            isMobile &&
              isCurrent &&
              "bg-sidebar-accent font-medium text-sidebar-accent-foreground ring-1 ring-sidebar-border/60",
          )}
          render={
            <a
              href={`#${item.id}`}
              onClick={() => {
                if (isMobile) setOpenMobile(false)
              }}
            />
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </SidebarMenuButton>
      </div>
    </SidebarMenuItem>
  )
}

export function PrimaryNav() {
  return (
    <SidebarMenu>
      {NAV_ITEMS.map((item) => (
        <PrimaryNavItem key={item.id} item={item} />
      ))}
    </SidebarMenu>
  )
}
