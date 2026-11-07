import type { Metadata } from "next"

import { About } from "@/app/_components/about"
import { Intro } from "@/app/_components/intro"
import { WorkGrid } from "@/app/_components/work-grid"
import { JsonLd } from "@/lib/seo/json-ld"
import { homeSchema } from "@/lib/seo/schemas"
import { SITE_METADATA } from "@/lib/site-content"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
  },
}

export default function Page() {
  return (
    <main>
      <JsonLd data={homeSchema()} />
      <Intro />
      <WorkGrid />
      <About />
    </main>
  )
}
