import { createTRPCRouter } from "./init"
import { worksRouter } from "./routers/works"

export const appRouter = createTRPCRouter({
  works: worksRouter,
})

export type AppRouter = typeof appRouter
