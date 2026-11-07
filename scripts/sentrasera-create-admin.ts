import { getAuth } from "@/server/sentrasera/auth"
import { createAdminClient } from "@/server/sentrasera/supabase"

const [rawEmail, contactName] = process.argv.slice(2)

if (!rawEmail || !contactName) {
  throw new Error('Usage: pnpm sentrasera:create-admin <email> "<your name>"')
}

const email = rawEmail.trim().toLowerCase()

const { user } = await getAuth().api.createUser({
  body: { email, name: contactName, role: "admin" },
})

const { error } = await createAdminClient().from("sentrasera_profiles").insert({
  user_id: user.id,
  role: "admin",
  email,
  contact_name: contactName,
})
if (error) throw new Error(`Could not create admin profile: ${error.message}`)

console.log(`Admin created: ${email}. Sign in with a magic link.`)
process.exit(0)
