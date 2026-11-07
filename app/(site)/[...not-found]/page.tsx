import { notFound } from "next/navigation"

import { NOT_FOUND_METADATA } from "../_lib/not-found-metadata"

export const metadata = NOT_FOUND_METADATA

// keeps unmatched URLs inside the portfolio's root layout now that there is no shared one
export default function CatchAllPage(): never {
  notFound()
}
