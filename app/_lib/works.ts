import type { WorkItem } from "@/app/_lib/work-item"
import { WORKS } from "@/lib/site-content"

export const WORK_ITEMS = WORKS as unknown as readonly WorkItem[]

export function workYear(work: WorkItem): number {
  return work.year ?? new Date(work.publishedAt).getFullYear()
}
