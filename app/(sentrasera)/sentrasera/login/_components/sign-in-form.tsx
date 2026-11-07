"use client"

import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { parseAsString, useQueryState } from "nuqs"
import { useEffect } from "react"

import { useMessages } from "@/app/(sentrasera)/sentrasera/_components/portal-locale"
import { TextField } from "@/app/(sentrasera)/sentrasera/_components/form-fields"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/sentrasera/auth-client"
import type { PortalMessages } from "@/lib/sentrasera/messages"
import { signInSchema } from "@/lib/sentrasera/schemas"
import { useTRPC } from "@/lib/trpc/client"

const TOO_MANY_REQUESTS = 429

async function requestLink(
  email: string,
  t: PortalMessages
): Promise<string> {
  const { error } = await authClient.signIn.magicLink({ email })
  if (error?.status === TOO_MANY_REQUESTS) {
    throw new Error(t.signIn.tooManyAttempts)
  }
  if (error) throw new Error(t.signIn.sendFailed)
  return email
}

export function SignInForm() {
  const trpc = useTRPC()
  const t = useMessages()
  const router = useRouter()
  const me = useQuery(trpc.sentrasera.auth.me.queryOptions())
  const [linkError] = useQueryState("error", parseAsString)
  const request = useMutation({
    mutationFn: (email: string) => requestLink(email, t),
  })
  const form = useForm({
    defaultValues: { email: "" },
    validators: {
      onSubmit: ({ value }) =>
        signInSchema.safeParse(value).success
          ? undefined
          : { fields: { email: { message: t.signIn.invalidEmail } } },
    },
    onSubmit: ({ value }) => request.mutate(value.email),
  })

  useEffect(() => {
    if (me.data) router.replace("/")
  }, [me.data, router])

  if (request.isSuccess) {
    return (
      <div className="self-center">
        <h2 className="font-serif text-3xl">{t.signIn.checkEmailTitle}</h2>
        <p className="mt-3 text-sm text-pretty text-muted-foreground">
          {t.signIn.checkEmailBody(request.data)}
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-4"
          onClick={() => request.reset()}
        >
          {t.signIn.differentEmail}
        </Button>
      </div>
    )
  }

  return (
    <form
      noValidate
      className="flex flex-col gap-5 self-center"
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit()
      }}
    >
      {linkError && (
        <p role="alert" className="text-sm text-destructive">
          {t.signIn.linkExpired}
        </p>
      )}
      <form.Field name="email">
        {(field) => (
          <TextField
            field={field}
            label={t.signIn.emailLabel}
            type="email"
            placeholder={t.signIn.emailPlaceholder}
            autoComplete="email"
          />
        )}
      </form.Field>
      {request.error && (
        <p role="alert" className="text-sm text-destructive">
          {request.error.message}
        </p>
      )}
      <Button type="submit" size="lg" disabled={request.isPending}>
        {request.isPending ? t.signIn.sending : t.signIn.submit}
      </Button>
    </form>
  )
}
