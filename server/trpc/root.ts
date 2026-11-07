import { sentraseraRouter } from "@/server/sentrasera/router"

import { createTRPCRouter } from "./init"
import { worksRouter } from "./routers/works"

export const appRouter = createTRPCRouter({
  sentrasera: sentraseraRouter,
  works: worksRouter,
})

export type AppRouter = typeof appRouter
