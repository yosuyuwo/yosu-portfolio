import { z } from "zod"

export const CONTACT_INQUIRY_TYPES = ["idea", "role"] as const
export type ContactInquiryType = (typeof CONTACT_INQUIRY_TYPES)[number]

export const CONTACT_INQUIRY_TYPE_LABELS: Record<ContactInquiryType, string> = {
  idea: "I have a project idea",
  role: "I want to hire you for a role",
}

export const contactSchema = z.object({
  inquiryType: z.enum(CONTACT_INQUIRY_TYPES),
  name: z.string().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

export type ContactValues = z.infer<typeof contactSchema>

export const CONTACT_DEFAULTS: ContactValues = {
  inquiryType: "idea",
  name: "",
  email: "",
  subject: "",
  message: "",
}
