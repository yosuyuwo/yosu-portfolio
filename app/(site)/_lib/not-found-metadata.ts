import type { Metadata } from "next"

// also declared on the routes that throw notFound(): the browser renders 404s from their metadata, not not-found.tsx's
export const NOT_FOUND_METADATA: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
}
