import type { WorkItem } from "@/app/_lib/work-item"
import { cdnUrl } from "@/lib/cdn"
import { WORKS } from "@/lib/site-content"

function withCdnMedia(work: WorkItem): WorkItem {
  return {
    ...work,
    coverPath: cdnUrl(work.coverPath),
    coverVideoPath: work.coverVideoPath && cdnUrl(work.coverVideoPath),
    sections: work.sections.map((section) => ({
      ...section,
      images: section.images?.map((image) => ({
        ...image,
        src: cdnUrl(image.src),
      })),
    })),
  }
}

export const WORK_ITEMS: readonly WorkItem[] = (
  WORKS as unknown as readonly WorkItem[]
).map(withCdnMedia)

export function workYear(work: WorkItem): number {
  return work.year ?? new Date(work.publishedAt).getFullYear()
}
