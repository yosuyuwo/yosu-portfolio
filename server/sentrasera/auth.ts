import "server-only"

import { betterAuth } from "better-auth"
import { APIError } from "better-auth/api"
import { admin, magicLink } from "better-auth/plugins"
import { Pool } from "pg"

import { AUTH_COOKIE_PREFIX, VERIFY_PATH } from "@/lib/sentrasera/access"

import { portalLink, sendPortalEmail } from "./email"
import { createAdminClient, requireEnv } from "./supabase"

const MAX_POOL_CONNECTIONS = 3
const POOL_IDLE_TIMEOUT_MS = 20_000
const POOL_CONNECT_TIMEOUT_MS = 10_000
const MAGIC_LINK_LIFETIME_SECONDS = 900
const RATE_LIMIT_WINDOW_SECONDS = 300
const MAX_LINK_REQUESTS = 5
const MAX_VERIFY_ATTEMPTS = 10

async function assertCanSignIn(userId: string): Promise<void> {
  const { data: profile, error } = await createAdminClient()
    .from("sentrasera_profiles")
    .select("is_active")
    .eq("user_id", userId)
    .maybeSingle()

  if (error) throw new Error(`Could not load portal profile: ${error.message}`)
  if (!profile?.is_active) {
    throw new APIError("FORBIDDEN", {
      message: "This account is inactive. Please contact your pilot admin.",
    })
  }
}

async function recordSignIn(userId: string): Promise<void> {
  const { error } = await createAdminClient()
    .from("sentrasera_profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("user_id", userId)
  if (error) console.error("[sentrasera] record last login", error)
}

// stays silent for unknown emails so the login form can't reveal who is in the pilot
async function sendSignInLink(email: string, token: string): Promise<void> {
  const { data: profile, error } = await createAdminClient()
    .from("sentrasera_profiles")
    .select("contact_name")
    .eq("email", email.toLowerCase())
    .eq("is_active", true)
    .maybeSingle()

  if (error) {
    console.error("[sentrasera] look up sign-in email", error)
    return
  }
  if (!profile) return

  const params = new URLSearchParams({ token })
  await sendPortalEmail({
    to: email,
    subject: "Your Sentrasera sign-in link",
    text: `Hi ${profile.contact_name},\n\nUse this link to sign in to Sentrasera. It works once and expires in 15 minutes:\n\n${portalLink(`${VERIFY_PATH}?${params}`)}\n\nIf you didn't ask for this, you can ignore this email.`,
  })
}

function createAuth() {
  return betterAuth({
    baseURL: requireEnv("SENTRASERA_URL"),
    secret: requireEnv("BETTER_AUTH_SECRET"),
    database: new Pool({
      connectionString: requireEnv("SENTRASERA_AUTH_DATABASE_URL"),
      max: MAX_POOL_CONNECTIONS,
      idleTimeoutMillis: POOL_IDLE_TIMEOUT_MS,
      connectionTimeoutMillis: POOL_CONNECT_TIMEOUT_MS,
      // Supabase's pooler certificate isn't in Node's trust store; same posture as the chat database
      ssl: { rejectUnauthorized: false },
    }),
    user: { modelName: "sentrasera_auth_user" },
    session: { modelName: "sentrasera_auth_session" },
    account: { modelName: "sentrasera_auth_account" },
    verification: { modelName: "sentrasera_auth_verification" },
    // database storage because each serverless instance would otherwise keep its own count
    rateLimit: {
      enabled: true,
      storage: "database",
      modelName: "sentrasera_auth_rate_limit",
      customRules: {
        "/sign-in/magic-link": {
          window: RATE_LIMIT_WINDOW_SECONDS,
          max: MAX_LINK_REQUESTS,
        },
        "/magic-link/verify": {
          window: RATE_LIMIT_WINDOW_SECONDS,
          max: MAX_VERIFY_ATTEMPTS,
        },
      },
    },
    advanced: {
      cookiePrefix: AUTH_COOKIE_PREFIX,
      database: { generateId: "uuid" },
    },
    databaseHooks: {
      session: {
        create: {
          before: async (session) => {
            await assertCanSignIn(session.userId)
          },
          after: async (session) => {
            await recordSignIn(session.userId)
          },
        },
      },
    },
    plugins: [
      magicLink({
        disableSignUp: true,
        expiresIn: MAGIC_LINK_LIFETIME_SECONDS,
        storeToken: "hashed",
        sendMagicLink: ({ email, token }) => sendSignInLink(email, token),
      }),
      admin({ defaultRole: "client" }),
    ],
  })
}

let sharedAuth: ReturnType<typeof createAuth> | null = null

// lazy so the portfolio still builds and runs on deployments without the portal's env vars
export function getAuth() {
  sharedAuth ??= createAuth()
  return sharedAuth
}
