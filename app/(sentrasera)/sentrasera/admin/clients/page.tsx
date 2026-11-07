import type { Metadata } from "next"

import { ClientsAdmin } from "./_components/clients-admin"

export const metadata: Metadata = { title: "Clients" }

export default function AdminClientsPage() {
  return <ClientsAdmin />
}
