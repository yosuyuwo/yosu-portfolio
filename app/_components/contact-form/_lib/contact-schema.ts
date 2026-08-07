import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

export type ContactValues = z.infer<typeof contactSchema>

export const CONTACT_DEFAULTS: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
}
