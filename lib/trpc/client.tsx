"use client"

import type { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink } from "@trpc/client"
import { createTRPCContext } from "@trpc/tanstack-react-query"
import { useState, type ReactNode } from "react"
import superjson from "superjson"

import type { AppRouter } from "@/server/trpc/root"
import { makeQueryClient } from "@/server/trpc/query-client"

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient()
  }
  browserQueryClient ??= makeQueryClient()
  return browserQueryClient
}

function getUrl() {
  if (typeof window !== "undefined") return "/api/trpc"
  return `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/trpc`
}

export function TRPCReactProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: getUrl(),
          transformer: superjson,
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
