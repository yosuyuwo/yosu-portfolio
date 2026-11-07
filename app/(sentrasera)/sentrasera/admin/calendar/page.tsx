import type { Metadata } from "next"

import { CalendarAdmin } from "./_components/calendar-admin"

export const metadata: Metadata = { title: "Calendar" }

export default function AdminCalendarPage() {
  return <CalendarAdmin />
}
