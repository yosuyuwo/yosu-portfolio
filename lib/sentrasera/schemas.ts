import { z } from "zod"

export const QUESTION_KINDS = ["text", "choice", "rating"] as const
export const RATING_VALUES = ["1", "2", "3", "4", "5"] as const
export const UPDATE_STATUSES = ["planned", "shipped"] as const

export type QuestionKind = (typeof QUESTION_KINDS)[number]
export type UpdateStatus = (typeof UPDATE_STATUSES)[number]
export type PortalRole = "admin" | "client"

const MAX_TEXT_ANSWER_LENGTH = 5000

const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} is too long`)

const email = z.string().trim().toLowerCase().pipe(z.email("Enter a valid email"))

export const signInSchema = z.object({ email })

export const clientCreateSchema = z.object({
  email,
  contactName: requiredText("Contact name", 120),
  organization: requiredText("Organization", 160),
})

export const clientUpdateSchema = z.object({
  userId: z.uuid(),
  contactName: requiredText("Contact name", 120),
  organization: requiredText("Organization", 160),
  isActive: z.boolean(),
})

export const categoryCreateSchema = z.object({
  name: requiredText("Category name", 80),
})

export const questionInputSchema = z
  .object({
    categoryId: z.uuid("Choose a category"),
    prompt: requiredText("Question", 1000),
    kind: z.enum(QUESTION_KINDS),
    choices: z.array(requiredText("Choice", 200)).max(20),
  })
  .refine((value) => value.kind !== "choice" || value.choices.length >= 2, {
    message: "Add at least two choices",
    path: ["choices"],
  })

export const questionUpdateSchema = z.object({
  id: z.uuid(),
  values: questionInputSchema,
  isActive: z.boolean(),
})

export const answerSchema = z.object({
  questionId: z.uuid(),
  value: z.string().trim().min(1, "Answer is required"),
})

export const feedbackSubmitSchema = z.object({
  categoryId: z.uuid().nullable(),
  body: requiredText("Feedback", 5000),
})

export const feedbackRespondSchema = z.object({
  id: z.uuid(),
  response: requiredText("Response", 5000),
})

export const updateInputSchema = z.object({
  title: requiredText("Title", 160),
  description: z.string().trim().max(5000),
  scheduledFor: z.iso.date("Choose a date"),
  status: z.enum(UPDATE_STATUSES),
  categoryId: z.uuid().nullable(),
})

export const updateEditSchema = z.object({
  id: z.uuid(),
  values: updateInputSchema,
})

export const updateIdSchema = z.object({ id: z.uuid() })

export function isValidAnswer(
  question: { kind: QuestionKind; choices: readonly string[] },
  value: string
): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  if (question.kind === "choice") return question.choices.includes(trimmed)
  if (question.kind === "rating") {
    return (RATING_VALUES as readonly string[]).includes(trimmed)
  }
  return trimmed.length <= MAX_TEXT_ANSWER_LENGTH
}
