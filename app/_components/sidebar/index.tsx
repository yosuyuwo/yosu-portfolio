"use client"

import { useActiveSection } from "@/app/_hooks/use-active-section"

import { Brand } from "./_components/brand"
import { Meta } from "./_components/meta"
import { NavSerif } from "./_components/nav-serif"

export function Sidebar() {
  const active = useActiveSection()

  return (
    <aside className="sticky top-0 hidden h-svh w-52 flex-col px-7 py-7 md:flex">
      <Brand />
      <nav aria-label="Main" className="mt-20">
        <NavSerif active={active} />
      </nav>
      <Meta />
    </aside>
  )
}
