import type { Metadata } from "next"

import { AnswersAdmin } from "./_components/answers-admin"

export const metadata: Metadata = { title: "Answers" }

export default function AdminAnswersPage() {
  return <AnswersAdmin />
}
