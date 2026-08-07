"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Main({
  children,
  openMobile,
  onClose,
}: {
  children: ReactNode
  openMobile: boolean
  onClose: () => void
}) {
  return (
    <div
      className={cn(
        // p-2 keeps inset shadow inside the overflow clip (esp. left on desktop)
        "pointer-events-auto relative mx-2 mb-2 flex min-h-0 flex-1 flex-col overflow-hidden p-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:m-2",
        openMobile && "max-md:translate-x-(--sidebar-width-mobile)",
      )}
    >
      {openMobile ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="absolute inset-0 z-30 cursor-default md:hidden"
          onClick={onClose}
        />
      ) : null}
      {children}
    </div>
  )
}
