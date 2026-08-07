"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

type ContactDialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const ContactDialogContext = createContext<ContactDialogContextValue | null>(
  null,
)

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <ContactDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </ContactDialogContext.Provider>
  )
}

export function useContactDialog() {
  const ctx = useContext(ContactDialogContext)
  if (!ctx) {
    throw new Error("useContactDialog must be used within ContactDialogProvider")
  }
  return ctx
}
