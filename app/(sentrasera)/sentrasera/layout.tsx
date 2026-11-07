import type { Metadata } from "next"
import { Geist, Instrument_Serif } from "next/font/google"
import type { ReactNode } from "react"

import "@/app/globals.css"
import "./sentrasera.css"
import { Toaster } from "@/components/ui/sonner"
import { TRPCReactProvider } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: { default: "Sentrasera pilot", template: "%s · Sentrasera" },
  description: "Private workspace for Sentrasera pilot clients.",
  robots: { index: false, follow: false },
}

export default function SentraseraRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      data-sentrasera
      className={cn(
        "font-sans antialiased",
        fontSans.variable,
        fontSerif.variable
      )}
    >
      <body className="min-h-dvh bg-background text-foreground selection:bg-accent">
        <TRPCReactProvider>
          {children}
          <Toaster theme="light" position="bottom-right" />
        </TRPCReactProvider>
      </body>
    </html>
  )
}
