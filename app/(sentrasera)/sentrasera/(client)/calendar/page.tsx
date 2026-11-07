import type { Metadata } from "next"

import { ClientCalendar } from "./_components/client-calendar"

export const metadata: Metadata = { title: "Calendar" }

export default function CalendarPage() {
  return <ClientCalendar />
}
