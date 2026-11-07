import { TRPCError } from "@trpc/server"

import {
  answerSchema,
  isValidAnswer,
  questionInputSchema,
  questionUpdateSchema,
} from "@/lib/sentrasera/schemas"
import { createTRPCRouter } from "@/server/trpc/init"

import { fetchAllRows } from "../fetch-all"
import {
  adminProcedure,
  clientProcedure,
  failInternal,
  unwrap,
} from "../procedures"

const SORT_STEP = 10

type Sortable = {
  sort_order: number
  sentrasera_categories: { sort_order: number }
}

function byCategoryThenOrder(a: Sortable, b: Sortable): number {
  return (
    a.sentrasera_categories.sort_order - b.sentrasera_categories.sort_order ||
    a.sort_order - b.sort_order
  )
}

function sameChoices(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((choice, i) => choice === b[i])
}

export const questionsRouter = createTRPCRouter({
  listForClient: clientProcedure.query(async ({ ctx }) => {
    const [questions, answers] = await Promise.all([
      ctx.db
        .from("sentrasera_questions")
        .select(
          "id, prompt, kind, choices, category_id, sort_order, sentrasera_categories(name, sort_order)"
        )
        .eq("is_active", true),
      ctx.db
        .from("sentrasera_answers")
        .select("question_id, value, updated_at")
        .eq("client_id", ctx.viewer.id),
    ])

    const answerByQuestion = new Map(
      unwrap("load my answers", answers).map((answer) => [
        answer.question_id,
        answer,
      ])
    )

    return unwrap("load questions", questions)
      .toSorted(byCategoryThenOrder)
      .map((question) => ({
        id: question.id,
        prompt: question.prompt,
        kind: question.kind,
        choices: question.choices,
        categoryId: question.category_id,
        categoryName: question.sentrasera_categories.name,
        answer: answerByQuestion.get(question.id)?.value ?? null,
        answeredAt: answerByQuestion.get(question.id)?.updated_at ?? null,
      }))
  }),

  answer: clientProcedure.input(answerSchema).mutation(async ({ ctx, input }) => {
    const { data: question, error: questionError } = await ctx.db
      .from("sentrasera_questions")
      .select("kind, choices, is_active")
      .eq("id", input.questionId)
      .maybeSingle()
    if (questionError) failInternal("load question to answer", questionError)

    if (!question?.is_active) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "This question is no longer open.",
      })
    }
    if (!isValidAnswer(question, input.value)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "That answer isn't valid for this question.",
      })
    }

    const { error } = await ctx.db.from("sentrasera_answers").upsert({
      question_id: input.questionId,
      client_id: ctx.viewer.id,
      value: input.value.trim(),
      updated_at: new Date().toISOString(),
    })
    if (error) failInternal("save answer", error)
    return { success: true }
  }),

  listForAdmin: adminProcedure.query(async ({ ctx }) => {
    const rows = unwrap(
      "list questions",
      await ctx.db
        .from("sentrasera_questions")
        .select(
          "id, prompt, kind, choices, category_id, is_active, sort_order, sentrasera_categories(name, sort_order), sentrasera_answers(count)"
        )
    )

    return rows.toSorted(byCategoryThenOrder).map((row) => ({
      id: row.id,
      prompt: row.prompt,
      kind: row.kind,
      choices: row.choices,
      categoryId: row.category_id,
      categoryName: row.sentrasera_categories.name,
      isActive: row.is_active,
      answerCount: row.sentrasera_answers[0]?.count ?? 0,
    }))
  }),

  create: adminProcedure
    .input(questionInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.db
        .from("sentrasera_questions")
        .select("id", { count: "exact", head: true })
        .eq("category_id", input.categoryId)

      const { error } = await ctx.db.from("sentrasera_questions").insert({
        category_id: input.categoryId,
        prompt: input.prompt,
        kind: input.kind,
        choices: input.kind === "choice" ? input.choices : [],
        sort_order: ((count ?? 0) + 1) * SORT_STEP,
      })
      if (error) failInternal("create question", error)
      return { success: true }
    }),

  // existing answers would stop matching if the answer format changed underneath them
  update: adminProcedure
    .input(questionUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { values } = input
      const current = unwrap(
        "load question to edit",
        await ctx.db
          .from("sentrasera_questions")
          .select("kind, choices, sentrasera_answers(count)")
          .eq("id", input.id)
          .single()
      )
      const choices = values.kind === "choice" ? values.choices : []
      const hasAnswers = (current.sentrasera_answers[0]?.count ?? 0) > 0
      const formatChanged =
        current.kind !== values.kind || !sameChoices(current.choices, choices)

      if (hasAnswers && formatChanged) {
        throw new TRPCError({
          code: "CONFLICT",
          message:
            "This question already has answers, so its type and choices are locked. Retire it and add a new one instead.",
        })
      }

      const { error } = await ctx.db
        .from("sentrasera_questions")
        .update({
          category_id: values.categoryId,
          prompt: values.prompt,
          kind: values.kind,
          choices,
          is_active: input.isActive,
          updated_at: new Date().toISOString(),
        })
        .eq("id", input.id)
      if (error) failInternal("update question", error)
      return { success: true }
    }),

  allAnswers: adminProcedure.query(async ({ ctx }) => {
    const rows = await fetchAllRows("list answers", (from, to) =>
      ctx.db
        .from("sentrasera_answers")
        .select(
          "question_id, client_id, value, updated_at, sentrasera_profiles(contact_name, organization), sentrasera_questions(prompt, category_id, sentrasera_categories(name))"
        )
        .order("updated_at", { ascending: false })
        .order("question_id")
        .order("client_id")
        .range(from, to)
    )

    return rows.map((row) => ({
      questionId: row.question_id,
      clientId: row.client_id,
      value: row.value,
      updatedAt: row.updated_at,
      contactName: row.sentrasera_profiles.contact_name,
      organization: row.sentrasera_profiles.organization ?? "",
      prompt: row.sentrasera_questions.prompt,
      categoryId: row.sentrasera_questions.category_id,
      categoryName: row.sentrasera_questions.sentrasera_categories.name,
    }))
  }),
})
