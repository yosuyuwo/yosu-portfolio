import type { WorkItem } from "@/app/_components/works-section/_lib/work-item"
import { WORKS } from "@/lib/site-content"

export const V2_WORKS = WORKS as unknown as readonly WorkItem[]

export function workYear(work: WorkItem): number {
  return work.year ?? new Date(work.publishedAt).getFullYear()
}
