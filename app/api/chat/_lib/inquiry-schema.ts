import { z } from "zod"

export const inquirySchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.email().max(120),
  kind: z.enum(["work", "collaboration", "complaint", "other"]),
  message: z.string().trim().min(1).max(1500),
})

export type Inquiry = z.infer<typeof inquirySchema>
