import "server-only"

import postgres from "postgres"

export type Query = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => PromiseLike<readonly Record<string, unknown>[]>

const PLACEHOLDER_MARKERS = [
  "[your-password]",
  "your-password",
  "<password>",
  "your-project",
]
const MAX_CONNECTIONS = 3
const IDLE_TIMEOUT_SECONDS = 20
const CONNECT_TIMEOUT_SECONDS = 10

let sharedQuery: Query | null = null

// Null until DATABASE_URL points at a real database, so the chat works without it.
// Meant for a restricted role (see supabase/chat-app-role.sql), never the owner login.
export function getDatabase(): Query | null {
  const url = process.env.DATABASE_URL
  if (!url) return null
  const lower = url.toLowerCase()
  if (PLACEHOLDER_MARKERS.some((marker) => lower.includes(marker))) return null

  if (!sharedQuery) {
    // prepare: false because Supabase's pooler runs in transaction mode
    const sql = postgres(url, {
      prepare: false,
      max: MAX_CONNECTIONS,
      idle_timeout: IDLE_TIMEOUT_SECONDS,
      connect_timeout: CONNECT_TIMEOUT_SECONDS,
      ssl: "require",
    })
    sharedQuery = (strings, ...values) => sql(strings, ...(values as never[]))
  }
  return sharedQuery
}
