import assert from "node:assert/strict"
import { test } from "node:test"

import {
  isPortalAssetPath,
  isPortalHost,
  isPortalRoutePath,
  toPortalRoutePath,
} from "./host"

const PORTAL_URL = "https://sentrasera.example.com"

test("matches the configured portal host, ignoring case and port", () => {
  assert.equal(isPortalHost("sentrasera.example.com", PORTAL_URL), true)
  assert.equal(isPortalHost("SENTRASERA.example.com:3002", PORTAL_URL), true)
})

test("rejects other hosts and lookalikes", () => {
  assert.equal(isPortalHost("example.com", PORTAL_URL), false)
  assert.equal(isPortalHost("sentrasera.example.com.evil.io", PORTAL_URL), false)
})

test("never matches when the portal URL is unset or invalid", () => {
  assert.equal(isPortalHost("sentrasera.example.com", undefined), false)
  assert.equal(isPortalHost("sentrasera.example.com", "not a url"), false)
  assert.equal(isPortalHost(null, PORTAL_URL), false)
})

test("recognises internal portal routes without matching similar paths", () => {
  assert.equal(isPortalRoutePath("/sentrasera"), true)
  assert.equal(isPortalRoutePath("/sentrasera/login"), true)
  assert.equal(isPortalRoutePath("/sentrasera-notes"), false)
})

test("treats only file-like paths under the portal prefix as portal assets", () => {
  assert.equal(isPortalAssetPath("/sentrasera/icon-1431gm.svg"), true)
  assert.equal(isPortalAssetPath("/nope.txt"), false)
  assert.equal(isPortalAssetPath("/sentrasera/login"), false)
  assert.equal(isPortalAssetPath("/sentrasera/v1.2/login"), false)
  assert.equal(isPortalAssetPath("/sentrasera-notes/file.txt"), false)
})

test("treats the public logo folder as portal assets, and nothing else in public", () => {
  assert.equal(
    isPortalAssetPath("/sentrasera-logo/svg/sentrasera-logo-horizontal-blue.svg"),
    true
  )
  assert.equal(isPortalAssetPath("/sentrasera-logo-copy/logo.svg"), false)
  assert.equal(isPortalAssetPath("/profile/portrait.jpg"), false)
})

test("maps subdomain paths to internal routes", () => {
  assert.equal(toPortalRoutePath("/"), "/sentrasera")
  assert.equal(toPortalRoutePath("/admin/clients"), "/sentrasera/admin/clients")
})
