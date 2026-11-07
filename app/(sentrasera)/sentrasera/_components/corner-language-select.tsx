"use client"

import { LanguageSelect } from "./portal-locale"

export function CornerLanguageSelect() {
  return (
    <div className="absolute top-4 right-4 sm:right-6">
      <LanguageSelect />
    </div>
  )
}
