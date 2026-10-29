import type { MetadataRoute } from "next"

import { WORK_ITEMS } from "@/app/_lib/works"
import { absoluteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const works = WORK_ITEMS.map((work) => ({
    url: absoluteUrl(`/work/${work.slug}`),
    lastModified: work.publishedAt,
  }))
  const newest = works
    .map((work) => work.lastModified)
    .sort()
    .at(-1)

  return [{ url: absoluteUrl("/"), lastModified: newest }, ...works]
}
