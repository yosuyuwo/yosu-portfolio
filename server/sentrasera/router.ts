import { createTRPCRouter } from "@/server/trpc/init"

import { authRouter } from "./routers/auth"
import { categoriesRouter } from "./routers/categories"
import { clientsRouter } from "./routers/clients"
import { feedbackRouter } from "./routers/feedback"
import { questionsRouter } from "./routers/questions"
import { updatesRouter } from "./routers/updates"

export const sentraseraRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  clients: clientsRouter,
  feedback: feedbackRouter,
  questions: questionsRouter,
  updates: updatesRouter,
})
