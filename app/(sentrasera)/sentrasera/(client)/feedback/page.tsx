import type { Metadata } from "next"

import { FeedbackDesk } from "./_components/feedback-desk"

export const metadata: Metadata = { title: "Feedback" }

export default function FeedbackPage() {
  return <FeedbackDesk />
}
