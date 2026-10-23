import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import type { ReactNode } from "react"

import { SITE_METADATA } from "@/lib/site-content"
import { cn } from "@/lib/utils"

import "./v2.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-v2-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-v2-mono" })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-v2-serif",
})

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
}

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "v2-root relative h-full overflow-y-auto scroll-smooth bg-(--v2-paper) font-(family-name:--font-v2-sans) text-(--v2-ink) antialiased selection:bg-(--v2-accent) selection:text-(--v2-paper)",
        geist.variable,
        geistMono.variable,
        instrumentSerif.variable
      )}
    >
      <div
        aria-hidden
        className="v2-grain pointer-events-none fixed inset-0 z-50 opacity-[0.05] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-screen"
      />
      {children}
    </div>
  )
}
