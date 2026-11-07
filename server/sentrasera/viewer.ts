import "server-only"

import { headers } from "next/headers"
import { cache } from "react"

import type { PortalRole } from "@/lib/sentrasera/schemas"

import { getAuth } from "./auth"
import { createAdminClient } from "./supabase"

export type Viewer = {
  id: string
  email: string
  role: PortalRole
  contactName: string
  organization: string | null
}

export const getViewer = cache(async (): Promise<Viewer | null> => {
  const session = await getAuth().api.getSession({ headers: await headers() })
  if (!session) return null

  const { data: profile, error } = await createAdminClient()
    .from("sentrasera_profiles")
    .select("email, role, contact_name, organization")
    .eq("user_id", session.user.id)
    .eq("is_active", true)
    .maybeSingle()

  if (error) throw new Error(`Could not load portal profile: ${error.message}`)
  if (!profile) return null

  return {
    id: session.user.id,
    email: profile.email,
    role: profile.role,
    contactName: profile.contact_name,
    organization: profile.organization,
  }
})
