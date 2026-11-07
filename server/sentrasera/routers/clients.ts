import { TRPCError } from "@trpc/server"
import { APIError } from "better-auth/api"
import { headers } from "next/headers"
import { after } from "next/server"

import { LOGIN_PATH } from "@/lib/sentrasera/access"
import {
  clientCreateSchema,
  clientUpdateSchema,
} from "@/lib/sentrasera/schemas"
import { createTRPCRouter } from "@/server/trpc/init"

import { getAuth } from "../auth"
import { portalLink, sendPortalEmail } from "../email"
import { fetchAllRows } from "../fetch-all"
import { adminProcedure, failInternal, unwrap } from "../procedures"

function countByClient(rows: readonly { client_id: string }[]) {
  return rows.reduce<ReadonlyMap<string, number>>(
    (counts, row) =>
      new Map(counts).set(row.client_id, (counts.get(row.client_id) ?? 0) + 1),
    new Map()
  )
}

async function createAuthUser(email: string, name: string): Promise<string> {
  try {
    const { user } = await getAuth().api.createUser({ body: { email, name } })
    return user.id
  } catch (error) {
    if (error instanceof APIError && error.statusCode === 400) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "An account with this email already exists.",
      })
    }
    failInternal("create auth user", error)
  }
}

export const clientsRouter = createTRPCRouter({
  list: adminProcedure.query(async ({ ctx }) => {
    const [profiles, activeQuestions, answers] = await Promise.all([
      ctx.db
        .from("sentrasera_profiles")
        .select(
          "user_id, email, contact_name, organization, is_active, last_login_at, created_at"
        )
        .eq("role", "client")
        .order("organization"),
      ctx.db
        .from("sentrasera_questions")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true),
      fetchAllRows("load answer progress", (from, to) =>
        ctx.db
          .from("sentrasera_answers")
          .select("client_id, sentrasera_questions!inner(is_active)")
          .eq("sentrasera_questions.is_active", true)
          .order("client_id")
          .order("question_id")
          .range(from, to)
      ),
    ])

    if (activeQuestions.error) {
      failInternal("count questions", activeQuestions.error)
    }
    const answeredByClient = countByClient(answers)

    return {
      totalQuestions: activeQuestions.count ?? 0,
      clients: unwrap("list clients", profiles).map((profile) => ({
        id: profile.user_id,
        email: profile.email,
        contactName: profile.contact_name,
        organization: profile.organization ?? "",
        isActive: profile.is_active,
        lastLoginAt: profile.last_login_at,
        createdAt: profile.created_at,
        answered: answeredByClient.get(profile.user_id) ?? 0,
      })),
    }
  }),

  create: adminProcedure
    .input(clientCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = await createAuthUser(input.email, input.contactName)

      const { error: profileError } = await ctx.db
        .from("sentrasera_profiles")
        .insert({
          user_id: userId,
          role: "client",
          email: input.email,
          contact_name: input.contactName,
          organization: input.organization,
        })

      if (profileError) {
        await getAuth().api.removeUser({
          headers: await headers(),
          body: { userId },
        })
        failInternal("create client profile", profileError)
      }

      after(() =>
        sendPortalEmail({
          to: input.email,
          subject: "You're invited to the Sentrasera pilot",
          text: `Hi ${input.contactName},\n\nYou now have access to the Sentrasera pilot. Enter this email address here and we'll send you a sign-in link:\n\n${portalLink(LOGIN_PATH)}`,
        })
      )
      return { success: true }
    }),

  update: adminProcedure
    .input(clientUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.db
        .from("sentrasera_profiles")
        .update({
          contact_name: input.contactName,
          organization: input.organization,
          is_active: input.isActive,
        })
        .eq("user_id", input.userId)
        .eq("role", "client")
      if (error) failInternal("update client", error)

      if (!input.isActive) {
        await getAuth().api.revokeUserSessions({
          headers: await headers(),
          body: { userId: input.userId },
        })
      }
      return { success: true }
    }),
})
