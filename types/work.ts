import { z } from "zod"

export const workSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string().nullable(),
  coverPath: z.string().nullable(),
  publishedAt: z.string().nullable(),
})

export type Work = z.infer<typeof workSchema>

export const workListInputSchema = z
  .object({
    limit: z.number().int().min(1).max(50).optional(),
  })
  .optional()
