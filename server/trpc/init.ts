import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"

import { createSupabaseServerClient } from "@/server/db/supabase"

export async function createTRPCContext() {
  return {
    supabase: createSupabaseServerClient(),
  }
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
