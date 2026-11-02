import type { WorkItem } from "@/app/_lib/work-item"

export type WorkLink = Pick<WorkItem, "slug" | "title">

export function toWorkLink({ slug, title }: WorkItem): WorkLink {
  return { slug, title }
}
