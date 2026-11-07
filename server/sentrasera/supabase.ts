import "server-only"

import { createClient } from "@supabase/supabase-js"

import type { SentraseraDatabase } from "./database.types"

export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not configured`)
  return value
}

export function createAdminClient() {
  return createClient<SentraseraDatabase>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}
