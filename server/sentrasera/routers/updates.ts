import { z } from "zod"

import {
  updateEditSchema,
  updateIdSchema,
  updateInputSchema,
} from "@/lib/sentrasera/schemas"
import { createTRPCRouter } from "@/server/trpc/init"

import {
  sessionProcedure,
  adminProcedure,
  failInternal,
  unwrap,
} from "../procedures"

function toRow(values: z.infer<typeof updateInputSchema>) {
  return {
    title: values.title,
    description: values.description || null,
    scheduled_for: values.scheduledFor,
    status: values.status,
    category_id: values.categoryId,
  }
}

export const updatesRouter = createTRPCRouter({
  list: sessionProcedure.query(async ({ ctx }) => {
    const rows = unwrap(
      "list updates",
      await ctx.db
        .from("sentrasera_updates")
        .select(
          "id, title, description, scheduled_for, status, category_id, sentrasera_categories(name, name_bahasa)"
        )
        .order("scheduled_for")
    )
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      scheduledFor: row.scheduled_for,
      status: row.status,
      categoryId: row.category_id,
      categoryName: row.sentrasera_categories?.name ?? null,
      categoryNameBahasa: row.sentrasera_categories?.name_bahasa ?? null,
    }))
  }),

  create: adminProcedure
    .input(updateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.db
        .from("sentrasera_updates")
        .insert(toRow(input))
      if (error) failInternal("create update", error)
      return { success: true }
    }),

  edit: adminProcedure
    .input(updateEditSchema)
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.db
        .from("sentrasera_updates")
        .update({
          ...toRow(input.values),
          updated_at: new Date().toISOString(),
        })
        .eq("id", input.id)
      if (error) failInternal("edit update", error)
      return { success: true }
    }),

  remove: adminProcedure
    .input(updateIdSchema)
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.db
        .from("sentrasera_updates")
        .delete()
        .eq("id", input.id)
      if (error) failInternal("remove update", error)
      return { success: true }
    }),
})
