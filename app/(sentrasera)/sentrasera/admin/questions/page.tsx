import type { Metadata } from "next"

import { QuestionsAdmin } from "./_components/questions-admin"

export const metadata: Metadata = { title: "Manage questions" }

export default function AdminQuestionsPage() {
  return <QuestionsAdmin />
}
