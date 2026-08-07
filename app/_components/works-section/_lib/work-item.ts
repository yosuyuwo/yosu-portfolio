import { z } from "zod"

export const workItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  coverPath: z.string(),
  publishedAt: z.string(),
  description: z.string(),
  gallery: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
    }),
  ),
  role: z.string().optional(),
  year: z.number().optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    )
    .optional(),
  stack: z.array(z.string()).optional(),
})

export type WorkItem = z.infer<typeof workItemSchema>
