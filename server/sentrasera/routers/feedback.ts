import { after } from "next/server"

import {
  feedbackRespondSchema,
  feedbackSubmitSchema,
} from "@/lib/sentrasera/schemas"
import { createTRPCRouter } from "@/server/trpc/init"

import { portalLink, sendPortalEmail } from "../email"
import { fetchAllRows } from "../fetch-all"
import {
  adminProcedure,
  clientProcedure,
  failInternal,
  unwrap,
} from "../procedures"

const FEEDBACK_COLUMNS =
  "id, client_id, category_id, body, response, responded_at, created_at, sentrasera_categories(name, name_bahasa), client:sentrasera_profiles!sentrasera_feedback_client_id_fkey(contact_name, organization, email)"

type FeedbackRecord = {
  id: string
  client_id: string
  category_id: string | null
  body: string
  response: string | null
  responded_at: string | null
  created_at: string
  sentrasera_categories: { name: string; name_bahasa: string | null } | null
  client: { contact_name: string; organization: string | null; email: string }
}

function toFeedbackItem(row: FeedbackRecord) {
  return {
    id: row.id,
    clientId: row.client_id,
    categoryId: row.category_id,
    categoryName: row.sentrasera_categories?.name ?? null,
    categoryNameBahasa: row.sentrasera_categories?.name_bahasa ?? null,
    body: row.body,
    response: row.response,
    respondedAt: row.responded_at,
    createdAt: row.created_at,
    contactName: row.client.contact_name,
    organization: row.client.organization ?? "",
  }
}

export const feedbackRouter = createTRPCRouter({
  mine: clientProcedure.query(async ({ ctx }) => {
    const rows = await fetchAllRows<FeedbackRecord>(
      "list my feedback",
      (from, to) =>
        ctx.db
          .from("sentrasera_feedback")
          .select(FEEDBACK_COLUMNS)
          .eq("client_id", ctx.viewer.id)
          .order("created_at", { ascending: false })
          .order("id")
          .range(from, to)
          .overrideTypes<FeedbackRecord[], { merge: false }>()
    )
    return rows.map(toFeedbackItem)
  }),

  submit: clientProcedure
    .input(feedbackSubmitSchema)
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.db.from("sentrasera_feedback").insert({
        client_id: ctx.viewer.id,
        category_id: input.categoryId,
        body: input.body,
      })
      if (error) failInternal("submit feedback", error)

      const adminEmail = process.env.SENTRASERA_ADMIN_EMAIL
      if (adminEmail) {
        const { contactName, organization } = ctx.viewer
        after(() =>
          sendPortalEmail({
            to: adminEmail,
            subject: `New Sentrasera feedback from ${organization ?? contactName}`,
            text: `${contactName} wrote:\n\n${input.body}\n\nRespond: ${portalLink("/admin/feedback")}`,
          })
        )
      }
      return { success: true }
    }),

  all: adminProcedure.query(async ({ ctx }) => {
    const rows = await fetchAllRows<FeedbackRecord>(
      "list all feedback",
      (from, to) =>
        ctx.db
          .from("sentrasera_feedback")
          .select(FEEDBACK_COLUMNS)
          .order("created_at", { ascending: false })
          .order("id")
          .range(from, to)
          .overrideTypes<FeedbackRecord[], { merge: false }>()
    )
    return rows.map(toFeedbackItem)
  }),

  respond: adminProcedure
    .input(feedbackRespondSchema)
    .mutation(async ({ ctx, input }) => {
      const existing = unwrap(
        "load feedback to respond",
        await ctx.db
          .from("sentrasera_feedback")
          .select(FEEDBACK_COLUMNS)
          .eq("id", input.id)
          .single()
          .overrideTypes<FeedbackRecord, { merge: false }>()
      )

      const { error } = await ctx.db
        .from("sentrasera_feedback")
        .update({
          response: input.response,
          responded_at: new Date().toISOString(),
          responded_by: ctx.viewer.id,
        })
        .eq("id", input.id)
      if (error) failInternal("save response", error)

      if (!existing.response) {
        after(() =>
          sendPortalEmail({
            to: existing.client.email,
            subject: "Your Sentrasera feedback has a response",
            text: `Hi ${existing.client.contact_name},\n\nYou wrote:\n${existing.body}\n\nResponse:\n${input.response}\n\nView it: ${portalLink("/feedback")}`,
          })
        )
      }
      return { success: true }
    }),
})
