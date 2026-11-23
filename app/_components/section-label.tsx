"use client"

import { usePathname } from "next/navigation"

import { useActiveSection } from "@/app/_hooks/use-active-section"
import type { NavSectionId } from "@/app/_lib/nav"
import { cn } from "@/lib/utils"

export function SectionLabel({
  sectionId,
  label,
  className,
}: {
  sectionId?: NavSectionId
  label: string
  className?: string
}) {
  const active = useActiveSection(usePathname())
  const isActive = sectionId !== undefined && sectionId === active

  return (
    <p
      className={cn(
        "font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors duration-normal",
        isActive && "text-brand",
        className
      )}
    >
      {label}
    </p>
  )
}
