import { workListInputSchema, workSchema } from "@/types/work"

import { createTRPCRouter, publicProcedure } from "../init"

export const worksRouter = createTRPCRouter({
  list: publicProcedure.input(workListInputSchema).query(async ({ ctx, input }) => {
    const limit = input?.limit ?? 12
    const { data, error } = await ctx.supabase
      .from("works")
      .select("id, slug, title, summary, cover_path, published_at")
      .order("published_at", { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return (data ?? []).map((row) =>
      workSchema.parse({
        id: row.id,
        slug: row.slug,
        title: row.title,
        summary: row.summary,
        coverPath: row.cover_path,
        publishedAt: row.published_at,
      }),
    )
  }),
})
