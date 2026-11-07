"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

import { useInvalidatePortal } from "@/app/(sentrasera)/sentrasera/_hooks/use-invalidate-portal"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useTRPC } from "@/lib/trpc/client"

type Props = {
  feedbackId: string
  currentResponse: string | null
}

export function RespondForm({ feedbackId, currentResponse }: Props) {
  const trpc = useTRPC()
  const invalidate = useInvalidatePortal()
  const [isEditing, setIsEditing] = useState(currentResponse === null)
  const [draft, setDraft] = useState(currentResponse ?? "")
  const respond = useMutation(
    trpc.sentrasera.feedback.respond.mutationOptions({
      onSuccess: async () => {
        toast.success("Response saved")
        await invalidate()
      },
      onError: (error) => toast.error(error.message),
    })
  )

  if (!isEditing) {
    return (
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="mt-2"
        onClick={() => setIsEditing(true)}
      >
        Edit response
      </Button>
    )
  }

  return (
    <form
      className="mt-3 flex flex-col items-start gap-2"
      onSubmit={(event) => {
        event.preventDefault()
        respond.mutate({ id: feedbackId, response: draft })
      }}
    >
      <Textarea
        aria-label="Your response"
        placeholder="Write a response the client will see"
        rows={3}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <Button
        type="submit"
        size="sm"
        disabled={!draft.trim() || respond.isPending}
      >
        {respond.isPending ? "Saving…" : "Send response"}
      </Button>
    </form>
  )
}
