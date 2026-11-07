import assert from "node:assert/strict"
import { test } from "node:test"

import { buildVerifyUrl, resolvePortalRedirect } from "./access"

test("sends signed-out visitors to login", () => {
  assert.equal(resolvePortalRedirect(null, "client"), "/login")
})

test("sends users away from the other role's area to their own home", () => {
  assert.equal(resolvePortalRedirect({ role: "client" }, "admin"), "/questions")
  assert.equal(
    resolvePortalRedirect({ role: "admin" }, "client"),
    "/admin/clients"
  )
})

test("lets users stay in their own area", () => {
  assert.equal(resolvePortalRedirect({ role: "client" }, "client"), null)
  assert.equal(resolvePortalRedirect({ role: "admin" }, "admin"), null)
})

test("verify URL stays on the portal and returns failures to login", () => {
  const url = new URL(buildVerifyUrl("abc+/="), "https://portal.example.com")
  assert.equal(url.origin, "https://portal.example.com")
  assert.equal(url.pathname, "/api/auth/magic-link/verify")
  assert.equal(url.searchParams.get("token"), "abc+/=")
  assert.equal(url.searchParams.get("callbackURL"), "/")
  assert.equal(url.searchParams.get("errorCallbackURL"), "/login")
})
