"use client"

import { usePathname } from "next/navigation"

import { useActiveSection } from "@/app/_hooks/use-active-section"
import { workSlugFromPath } from "@/app/_lib/nav"

import { Brand } from "./_components/brand"
import { Meta } from "./_components/meta"
import { NavSerif } from "./_components/nav-serif"

export function Sidebar() {
  const pathname = usePathname()
  const active = useActiveSection(pathname)
  const isHome = pathname === "/"

  return (
    <aside className="sticky top-0 hidden h-svh w-52 flex-col px-7 py-7 md:flex">
      <Brand isHome={isHome} />
      <nav aria-label="Main" className="mt-20">
        <NavSerif
          active={active}
          isHome={isHome}
          currentSlug={workSlugFromPath(pathname)}
        />
      </nav>
      <Meta />
    </aside>
  )
}
