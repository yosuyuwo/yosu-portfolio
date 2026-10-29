import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { WORK_ITEMS } from "@/app/_lib/works"
import { JsonLd } from "@/lib/seo/json-ld"
import { workSchema } from "@/lib/seo/schemas"
import { SITE_NAME } from "@/lib/site-content"

import { NextWork } from "./_components/next-work"
import { WorkDetail } from "./_components/work-detail"

export function generateStaticParams() {
  return WORK_ITEMS.map((work) => ({ slug: work.slug }))
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params
  const work = WORK_ITEMS.find((w) => w.slug === slug)
  if (!work) return {}
  return {
    title: work.title,
    description: work.summary,
    alternates: { canonical: `/work/${work.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${work.slug}`,
      title: `${work.title} · ${SITE_NAME}`,
      description: work.summary,
      publishedTime: work.publishedAt,
      authors: [SITE_NAME],
    },
  }
}

export default async function WorkPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params
  const index = WORK_ITEMS.findIndex((w) => w.slug === slug)
  if (index === -1) notFound()

  const work = WORK_ITEMS[index]
  const next = WORK_ITEMS[(index + 1) % WORK_ITEMS.length]

  return (
    <main key={slug}>
      <JsonLd data={workSchema(work)} />
      <WorkDetail work={work} />
      <NextWork work={next} />
    </main>
  )
}
