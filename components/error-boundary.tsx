"use client"

import { Button } from "@/components/ui/button"
import {
  ErrorBoundary as ReactErrorBoundary,
  type ErrorBoundaryPropsWithRender,
  type FallbackProps,
} from "react-error-boundary"

type Props = Omit<ErrorBoundaryPropsWithRender, "fallbackRender"> & {
  fallbackRender?: ErrorBoundaryPropsWithRender["fallbackRender"]
}

function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-lg border border-border p-4 text-sm"
    >
      <p className="font-medium">Something went wrong</p>
      <p className="text-muted-foreground">
        {error instanceof Error ? error.message : "Unexpected error"}
      </p>
      <Button type="button" size="sm" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  )
}

export function ErrorBoundary({
  children,
  fallbackRender = DefaultErrorFallback,
  ...props
}: Props) {
  return (
    <ReactErrorBoundary fallbackRender={fallbackRender} {...props}>
      {children}
    </ReactErrorBoundary>
  )
}

export type { FallbackProps }
