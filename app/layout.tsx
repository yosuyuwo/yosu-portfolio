import type { Metadata } from "next"
import { Geist_Mono, IBM_Plex_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NuqsProvider } from "@/lib/nuqs/provider"
import { TRPCReactProvider } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"

const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Yosua Yuwono",
  description:
    "Hi — I'm Yosua. Glad you're here. Have a look at my work, and reach out if you'd like to build something together.",
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
        "h-full overflow-hidden font-sans antialiased",
        fontMono.variable,
        ibmPlexSans.variable,
      )}
    >
      <body className="h-full overflow-hidden">
        <NuqsProvider>
          <TRPCReactProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </TRPCReactProvider>
        </NuqsProvider>
      </body>
    </html>
  )
}
