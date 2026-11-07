import type { UpdateStatus } from "@/lib/sentrasera/schemas"

export type CalendarUpdate = {
  id: string
  title: string
  description: string | null
  scheduledFor: string
  status: UpdateStatus
  categoryId: string | null
  categoryName: string | null
}

export type CalendarFeedback = {
  id: string
  body: string
  createdAt: string
  categoryName: string | null
  response: string | null
  respondedAt: string | null
  contactName: string
  organization: string
}
