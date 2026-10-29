import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ContactFooter } from "@/app/_components/contact-footer"
import { PageEnter } from "@/app/_components/page-enter"
import { ContactDialogProvider } from "@/app/_hooks/use-contact-dialog"
import { WORK_ITEMS } from "@/app/_lib/works"
import { SITE_NAME } from "@/lib/site-content"

import { DetailBar } from "./_components/detail-bar"
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
  return { title: `${work.title} · ${SITE_NAME}`, description: work.summary }
}

export default async function WorkPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params
  const index = WORK_ITEMS.findIndex((w) => w.slug === slug)
  if (index === -1) notFound()

  const work = WORK_ITEMS[index]
  const next = WORK_ITEMS[(index + 1) % WORK_ITEMS.length]

  return (
    <ContactDialogProvider>
      <PageEnter />
      <DetailBar />
      <main>
        <WorkDetail work={work} />
        <NextWork work={next} />
      </main>
      <ContactFooter />
    </ContactDialogProvider>
  )
}
