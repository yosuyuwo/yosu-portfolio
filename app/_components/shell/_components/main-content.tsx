"use client"

import type { CSSProperties, ReactNode, Ref } from "react"

import { SidebarInset } from "@/components/ui/sidebar"

import { END_REVEAL_PX } from "../_lib/constants"

export function MainContent({
  children,
  scrollRef,
  style,
}: {
  children: ReactNode
  scrollRef: Ref<HTMLElement>
  style?: CSSProperties
}) {
  return (
    <SidebarInset
      ref={scrollRef}
      className="z-10 min-h-0 scroll-smooth overflow-y-auto overscroll-contain rounded-xl shadow-md will-change-transform md:m-0!"
      style={style}
    >
      {children}
      <div aria-hidden className="shrink-0" style={{ height: END_REVEAL_PX }} />
    </SidebarInset>
  )
}
