import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = { title: "Page not found" }

// keeps unknown portal URLs in the portal layout instead of falling through to the portfolio's catch-all
export default function PortalCatchAllPage(): never {
  notFound()
}
