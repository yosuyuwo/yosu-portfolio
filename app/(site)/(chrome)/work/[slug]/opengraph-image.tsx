import { notFound } from "next/navigation"

import { WORK_ITEMS } from "@/app/_lib/works"
import { OG_SIZE, ogCard } from "@/lib/seo/og-card"
import { SITE_NAME } from "@/lib/site-content"

export const size = OG_SIZE
export const contentType = "image/png"

export function generateStaticParams() {
  return WORK_ITEMS.map((work) => ({ slug: work.slug }))
}

export default async function Image(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const work = WORK_ITEMS.find((w) => w.slug === slug)
  if (!work) notFound()

  return ogCard({
    eyebrow: [work.role, work.year].filter(Boolean).join(" · ") || SITE_NAME,
    title: work.title,
    subtitle: work.summary,
  })
}
