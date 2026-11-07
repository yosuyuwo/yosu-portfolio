export const LOCALES = ["en", "id"] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "en"

export type ChoiceOption = {
  value: string
  label: string
}

export function isLocale(value: string | null): value is Locale {
  return (LOCALES as readonly (string | null)[]).includes(value)
}

export function pickText(
  locale: Locale,
  english: string,
  bahasa: string | null
): string {
  return locale === "id" && bahasa?.trim() ? bahasa : english
}

export function toChoiceOptions(
  locale: Locale,
  choices: readonly string[],
  choicesBahasa: readonly string[]
): ChoiceOption[] {
  return choices.map((choice, index) => ({
    value: choice,
    label: pickText(locale, choice, choicesBahasa[index] ?? null),
  }))
}
