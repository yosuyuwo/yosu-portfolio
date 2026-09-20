import { z } from "zod"

const projectLinkSchema = z.object({
  status: z.enum(["live", "in-progress", "private"]),
  href: z.string().optional(),
})

const workSectionImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
})

const workSectionSchema = z.object({
  heading: z.string(),
  body: z.string().optional(),
  images: z.array(workSectionImageSchema).optional(),
  imageSide: z.enum(["left", "right"]).optional(),
})

const workFactsSchema = z.object({
  client: z.string(),
  context: z.enum(["freelance", "agency", "competition", "personal"]),
  teamSize: z.string(),
  duration: z.string(),
  myScope: z.array(z.string()),
})

export const workItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  coverPath: z.string(),
  coverVideoPath: z.string().optional(),
  publishedAt: z.string(),
  sections: z.array(workSectionSchema),
  role: z.string().optional(),
  year: z.number().optional(),
  liveSite: projectLinkSchema.optional(),
  github: projectLinkSchema.optional(),
  stack: z.array(z.string()).optional(),
  facts: workFactsSchema.optional(),
})

export type ProjectLink = z.infer<typeof projectLinkSchema>
export type WorkSection = z.infer<typeof workSectionSchema>
export type WorkFacts = z.infer<typeof workFactsSchema>
export type WorkItem = z.infer<typeof workItemSchema>
