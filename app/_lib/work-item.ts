import { z } from "zod"

const projectLinkSchema = z.object({
  status: z.enum(["live", "in-progress", "private"]),
  href: z.string().optional(),
})

const workSectionImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  priority: z.enum(["primary", "secondary", "tertiary"]).optional(),
})

const flowFigureSchema = z.object({
  kind: z.literal("flow"),
  title: z.string(),
  steps: z
    .array(z.object({ title: z.string(), detail: z.string().optional() }))
    .min(2),
  loop: z.string().optional(),
})

const ownershipFigureSchema = z.object({
  kind: z.literal("ownership"),
  title: z.string(),
  otherLabel: z.string(),
  parts: z
    .array(
      z.object({
        label: z.string(),
        owner: z.enum(["me", "other"]),
        note: z.string().optional(),
      })
    )
    .min(2),
})

const spanFigureSchema = z.object({
  kind: z.literal("span"),
  title: z.string(),
  segments: z
    .array(
      z.object({
        label: z.string(),
        weight: z.number().positive(),
        tone: z.enum(["focus", "hold", "free"]),
        color: z
          .string()
          .regex(/^#[0-9a-f]{6}$/i)
          .optional(),
      })
    )
    .min(2),
  note: z.string().optional(),
})

const decisionsFigureSchema = z.object({
  kind: z.literal("decisions"),
  items: z.array(z.object({ decision: z.string(), why: z.string() })).min(1),
})

const workFigureSchema = z.discriminatedUnion("kind", [
  decisionsFigureSchema,
  flowFigureSchema,
  ownershipFigureSchema,
  spanFigureSchema,
])

const workSectionSchema = z.object({
  heading: z.string(),
  body: z.string().optional(),
  figures: z.array(workFigureSchema).optional(),
  images: z.array(workSectionImageSchema).optional(),
  imageSide: z.enum(["left", "right"]).optional(),
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
})

export type ProjectLink = z.infer<typeof projectLinkSchema>
export type WorkSection = z.infer<typeof workSectionSchema>
export type WorkFigure = z.infer<typeof workFigureSchema>
export type DecisionsFigure = z.infer<typeof decisionsFigureSchema>
export type FlowFigure = z.infer<typeof flowFigureSchema>
export type OwnershipFigure = z.infer<typeof ownershipFigureSchema>
export type SpanFigure = z.infer<typeof spanFigureSchema>
export type WorkItem = z.infer<typeof workItemSchema>
