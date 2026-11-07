import type { Metadata } from "next"

import { FeedbackAdmin } from "./_components/feedback-admin"

export const metadata: Metadata = { title: "Feedback inbox" }

export default function AdminFeedbackPage() {
  return <FeedbackAdmin />
}
