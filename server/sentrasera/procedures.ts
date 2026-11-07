import "server-only"

import { TRPCError } from "@trpc/server"
import { headers } from "next/headers"

import { isPortalHost } from "@/lib/sentrasera/host"
import { publicProcedure } from "@/server/trpc/init"

import { createAdminClient } from "./supabase"
import { getViewer } from "./viewer"

const GENERIC_ERROR = "Something went wrong. Please try again."

export function failInternal(context: string, cause: unknown): never {
  console.error(`[sentrasera] ${context}`, cause)
  throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: GENERIC_ERROR })
}

export function unwrap<Result extends { data: unknown; error: unknown }>(
  context: string,
  result: Result
): NonNullable<Result["data"]> {
  if (result.error || result.data === null) {
    failInternal(context, result.error ?? "no data returned")
  }
  return result.data as NonNullable<Result["data"]>
}

// keeps the portal API unreachable from the portfolio's own hostname
export const portalProcedure = publicProcedure.use(async ({ next }) => {
  const requestHeaders = await headers()
  if (!isPortalHost(requestHeaders.get("host"), process.env.SENTRASERA_URL)) {
    throw new TRPCError({ code: "NOT_FOUND" })
  }
  return next({ ctx: { db: createAdminClient() } })
})

export const sessionProcedure = portalProcedure.use(async ({ next }) => {
  const viewer = await getViewer()
  if (!viewer) throw new TRPCError({ code: "UNAUTHORIZED" })
  return next({ ctx: { viewer } })
})

export const clientProcedure = sessionProcedure.use(({ ctx, next }) => {
  if (ctx.viewer.role !== "client") throw new TRPCError({ code: "FORBIDDEN" })
  return next()
})

export const adminProcedure = sessionProcedure.use(({ ctx, next }) => {
  if (ctx.viewer.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" })
  return next()
})
