"use client"

import {
  createContext,
  use,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/sentrasera/locale"
import { MESSAGES, type PortalMessages } from "@/lib/sentrasera/messages"

import { OptionSelect } from "./option-select"

const STORAGE_KEY = "sentrasera-locale"
const LOCALE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "id", label: "Bahasa Indonesia" },
]

// the default keeps surfaces outside a provider, like admin, in English whatever this browser last chose
const LocaleContext = createContext<Locale>(DEFAULT_LOCALE)

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function readLocale(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return isLocale(stored) ? stored : DEFAULT_LOCALE
}

function saveLocale(locale: Locale) {
  window.localStorage.setItem(STORAGE_KEY, locale)
  listeners.forEach((listener) => listener())
}

export function PortalLocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    readLocale,
    () => DEFAULT_LOCALE
  )

  useEffect(() => {
    document.documentElement.lang = locale
    return () => {
      document.documentElement.lang = DEFAULT_LOCALE
    }
  }, [locale])

  return <LocaleContext value={locale}>{children}</LocaleContext>
}

export function useLocale(): Locale {
  return use(LocaleContext)
}

export function useMessages(): PortalMessages {
  return MESSAGES[useLocale()]
}

export function LanguageSelect() {
  const locale = useLocale()
  const t = useMessages()

  return (
    <OptionSelect
      label={t.common.language}
      className="w-40"
      value={locale}
      options={LOCALE_OPTIONS}
      onChange={(next) => {
        if (isLocale(next)) saveLocale(next)
      }}
    />
  )
}
