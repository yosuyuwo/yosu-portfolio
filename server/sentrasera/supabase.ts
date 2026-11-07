import "server-only"

import { createClient } from "@supabase/supabase-js"

import type { SentraseraDatabase } from "./database.types"

export function requireEnv(
  name: string,
  value: string | undefined = process.env[name]
): string {
  if (!value) throw new Error(`${name} is not configured`)
  return value
}

export function createAdminClient() {
  return createClient<SentraseraDatabase>(
    // NEXT_PUBLIC_ values are only filled in for literal process.env reads, so a dynamic lookup is empty in production
    requireEnv(
      "NEXT_PUBLIC_SUPABASE_URL",
      process.env.NEXT_PUBLIC_SUPABASE_URL
    ),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}
