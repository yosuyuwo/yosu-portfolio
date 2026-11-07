"use client"

import { parseAsString, useQueryState } from "nuqs"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { buildVerifyUrl, LOGIN_PATH } from "@/lib/sentrasera/access"

// A click is required because email security scanners open links automatically, which would spend the one-time token.
export function ContinueSignIn() {
  const [token] = useQueryState("token", parseAsString)
  const [isContinuing, setIsContinuing] = useState(false)

  if (!token) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">
          This sign-in link isn&apos;t complete.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => window.location.assign(LOGIN_PATH)}
        >
          Get a new link
        </Button>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        You&apos;re one step away from your Sentrasera workspace.
      </p>
      <Button
        type="button"
        size="lg"
        className="mt-4 w-full"
        disabled={isContinuing}
        onClick={() => {
          setIsContinuing(true)
          window.location.assign(buildVerifyUrl(token))
        }}
      >
        {isContinuing ? "Signing in…" : "Continue to Sentrasera"}
      </Button>
    </div>
  )
}
