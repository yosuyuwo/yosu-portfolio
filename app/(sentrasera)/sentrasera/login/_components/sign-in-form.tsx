"use client"

import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { parseAsString, useQueryState } from "nuqs"
import { useEffect } from "react"

import { TextField } from "@/app/(sentrasera)/sentrasera/_components/form-fields"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/sentrasera/auth-client"
import { signInSchema } from "@/lib/sentrasera/schemas"
import { useTRPC } from "@/lib/trpc/client"

const TOO_MANY_REQUESTS = 429

async function requestLink(email: string): Promise<string> {
  const { error } = await authClient.signIn.magicLink({ email })
  if (error?.status === TOO_MANY_REQUESTS) {
    throw new Error("Too many attempts. Please wait a few minutes.")
  }
  if (error) throw new Error("We couldn't send your link. Please try again.")
  return email
}

export function SignInForm() {
  const trpc = useTRPC()
  const router = useRouter()
  const me = useQuery(trpc.sentrasera.auth.me.queryOptions())
  const [linkError] = useQueryState("error", parseAsString)
  const request = useMutation({ mutationFn: requestLink })
  const form = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: signInSchema },
    onSubmit: ({ value }) => request.mutate(value.email),
  })

  useEffect(() => {
    if (me.data) router.replace("/")
  }, [me.data, router])

  if (request.isSuccess) {
    return (
      <div className="self-center">
        <h2 className="font-serif text-3xl">Check your email</h2>
        <p className="mt-3 text-sm text-pretty text-muted-foreground">
          If {request.data} is part of the pilot, a sign-in link is on its way.
          It expires in 15 minutes.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-4"
          onClick={() => request.reset()}
        >
          Use a different email
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
          That link has expired or was already used. Enter your email for a new
          one.
        </p>
      )}
      <form.Field name="email">
        {(field) => (
          <TextField
            field={field}
            label="Email"
            type="email"
            placeholder="you@company.com"
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
        {request.isPending ? "Sending…" : "Email me a sign-in link"}
      </Button>
    </form>
  )
}
