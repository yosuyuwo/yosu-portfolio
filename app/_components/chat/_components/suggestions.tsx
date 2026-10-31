"use client"

import { CHAT_COPY, CHAT_SUGGESTIONS } from "@/app/_components/chat/_lib/copy"
import { Button } from "@/components/ui/button"

interface SuggestionsProps {
  onSuggest: (question: string) => void
}

export function Suggestions({ onSuggest }: SuggestionsProps) {
  return (
    <div className="grid gap-3 px-4 pb-3">
      <p className="text-xs leading-relaxed text-muted-foreground">
        {CHAT_COPY.notice}
      </p>
      <ul className="flex flex-wrap gap-2">
        {CHAT_SUGGESTIONS.map((question) => (
          <li key={question}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onSuggest(question)}
            >
              {question}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
