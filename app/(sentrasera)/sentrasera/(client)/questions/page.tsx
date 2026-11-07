import type { Metadata } from "next"

import { QuestionsBoard } from "./_components/questions-board"

export const metadata: Metadata = { title: "Questions" }

export default function QuestionsPage() {
  return <QuestionsBoard />
}
