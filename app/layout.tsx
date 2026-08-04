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
        "font-sans antialiased",
        fontMono.variable,
        ibmPlexSans.variable,
      )}
    >
      <body>
        <NuqsProvider>
          <TRPCReactProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </TRPCReactProvider>
        </NuqsProvider>
      </body>
    </html>
  )
}
