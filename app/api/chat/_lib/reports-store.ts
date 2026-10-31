import "server-only"

import { getDatabase, type Query } from "./database"

const WRITE_WINDOW_MS = 60_000
const MAX_WRITES_PER_WINDOW = 20
const MAX_FIELD_LENGTH = 200

export interface NewReport {
  message: string
  context: string | null
  contact: string | null
  page: string | null
  userAgent: string | null
}

export interface ReportsStore {
  // resolves true when the report was saved, false when it was dropped by the write limit
  record: (report: NewReport) => Promise<boolean>
}

function clip(value: string | null): string | null {
  return value ? value.slice(0, MAX_FIELD_LENGTH) : null
}

export function createReportsStore(query: Query): ReportsStore {
  let recentWrites: number[] = []

  return {
    async record(report) {
      const now = Date.now()
      recentWrites = recentWrites.filter((at) => now - at < WRITE_WINDOW_MS)
      if (recentWrites.length >= MAX_WRITES_PER_WINDOW) return false
      recentWrites = [...recentWrites, now]

      await query`
        insert into public.chat_reports (kind, message, context, contact, page, user_agent)
        values ('bug', ${report.message}, ${report.context}, ${clip(report.contact)},
                ${clip(report.page)}, ${clip(report.userAgent)})`
      return true
    },
  }
}

let sharedStore: ReportsStore | null = null

export function getReportsStore(): ReportsStore | null {
  const query = getDatabase()
  if (!query) return null
  sharedStore ??= createReportsStore(query)
  return sharedStore
}
