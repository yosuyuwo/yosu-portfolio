"use client"

import { parseAsString, useQueryState } from "nuqs"
import { useState } from "react"

import { useMessages } from "@/app/(sentrasera)/sentrasera/_components/portal-locale"
import { Button } from "@/components/ui/button"
import { buildVerifyUrl, LOGIN_PATH } from "@/lib/sentrasera/access"

// A click is required because email security scanners open links automatically, which would spend the one-time token.
export function ContinueSignIn() {
  const t = useMessages()
  const [token] = useQueryState("token", parseAsString)
  const [isContinuing, setIsContinuing] = useState(false)

  if (!token) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">
          {t.signIn.incompleteLink}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => window.location.assign(LOGIN_PATH)}
        >
          {t.signIn.newLink}
        </Button>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {t.signIn.oneStepAway}
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
        {isContinuing ? t.signIn.signingIn : t.signIn.continue}
      </Button>
    </div>
  )
}
