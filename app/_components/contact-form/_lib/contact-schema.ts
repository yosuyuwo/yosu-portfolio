import { z } from "zod"

import { todayIso } from "./start-date"

const startDateSchema = z
  .union([z.literal(""), z.iso.date("Enter a valid date")])
  .refine((value) => value === "" || value >= todayIso(), {
    message: "Pick today or a later date",
  })

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  subject: z.string().min(1, "Subject is required"),
  startDate: startDateSchema,
  message: z.string().min(1, "Message is required"),
})

export type ContactValues = z.infer<typeof contactSchema>

export const CONTACT_DEFAULTS: ContactValues = {
  name: "",
  email: "",
  subject: "",
  startDate: "",
  message: "",
}
