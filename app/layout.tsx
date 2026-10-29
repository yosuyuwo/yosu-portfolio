import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NuqsProvider } from "@/lib/nuqs/provider"
import { SITE_METADATA } from "@/lib/site-content"
import { TRPCReactProvider } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "scroll-pt-14 scroll-smooth font-sans antialiased md:scroll-pt-6",
        fontSans.variable,
        fontMono.variable,
        fontSerif.variable
      )}
    >
      <body className="selection:bg-brand selection:text-background">
        <noscript>
          <style>{"[data-enter]{visibility:visible}"}</style>
        </noscript>
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50 grain opacity-[0.05] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-screen"
        />
        <NuqsProvider>
          <TRPCReactProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </TRPCReactProvider>
        </NuqsProvider>
      </body>
    </html>
  )
}
