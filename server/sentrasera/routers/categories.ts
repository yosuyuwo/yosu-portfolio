import { TRPCError } from "@trpc/server"

import { categoryCreateSchema } from "@/lib/sentrasera/schemas"
import { createTRPCRouter } from "@/server/trpc/init"

import { sessionProcedure, adminProcedure, unwrap } from "../procedures"

const UNIQUE_VIOLATION = "23505"
const SORT_STEP = 10

export const categoriesRouter = createTRPCRouter({
  list: sessionProcedure.query(async ({ ctx }) =>
    unwrap(
      "list categories",
      await ctx.db
        .from("sentrasera_categories")
        .select("id, name, name_bahasa")
        .order("sort_order")
        .order("name")
    )
  ),

  create: adminProcedure
    .input(categoryCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.db
        .from("sentrasera_categories")
        .select("id", { count: "exact", head: true })

      const result = await ctx.db
        .from("sentrasera_categories")
        .insert({
          name: input.name,
          name_bahasa: input.nameBahasa || null,
          sort_order: ((count ?? 0) + 1) * SORT_STEP,
        })
        .select("id, name, name_bahasa")
        .single()

      if (result.error?.code === UNIQUE_VIOLATION) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "That category already exists.",
        })
      }
      return unwrap("create category", result)
    }),
})
