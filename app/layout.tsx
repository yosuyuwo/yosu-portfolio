import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import "./globals.css"
import { ContactFooter } from "@/app/_components/contact-footer"
import { IntroOverlay } from "@/app/_components/intro-overlay"
import { RouteEnter } from "@/app/_components/route-enter"
import { Sidebar } from "@/app/_components/sidebar"
import { TopBar } from "@/app/_components/top-bar"
import { ContactDialogProvider } from "@/app/_hooks/use-contact-dialog"
import { INTRO_KIND_SCRIPT } from "@/app/_lib/intro-kind"
import { ThemeProvider } from "@/components/theme-provider"
import { NuqsProvider } from "@/lib/nuqs/provider"
import { SITE_METADATA, SITE_NAME } from "@/lib/site-content"
import { SITE_URL } from "@/lib/site-url"
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
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_METADATA.title, template: `%s · ${SITE_NAME}` },
  description: SITE_METADATA.description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "scroll-pt-14 scroll-smooth font-sans antialiased md:scroll-pt-6",
        fontSans.variable,
        fontMono.variable,
        fontSerif.variable
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_KIND_SCRIPT }} />
      </head>
      {/* extensions such as Grammarly inject attributes on <body> before hydration */}
      <body
        suppressHydrationWarning
        className="selection:bg-brand selection:text-background"
      >
        <noscript>
          <style>
            {
              "[data-enter],[data-hero]{visibility:visible}[data-intro]{display:none}"
            }
          </style>
        </noscript>
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50 grain opacity-[0.05] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-screen"
        />
        <NuqsProvider>
          <ThemeProvider>
            <ContactDialogProvider>
              <IntroOverlay />
              <RouteEnter />
              <div className="md:grid md:grid-cols-[auto_minmax(0,1fr)]">
                <Sidebar />
                <div>
                  <TopBar />
                  {children}
                </div>
              </div>
              <ContactFooter />
            </ContactDialogProvider>
          </ThemeProvider>
        </NuqsProvider>
      </body>
    </html>
  )
}
