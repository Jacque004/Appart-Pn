import { describe, expect, it } from "vitest"
import type { Session, User } from "@supabase/supabase-js"
import { computeEffectiveUser } from "./auth-session"
import type { AppUser } from "./api/auth"

function mockUser(overrides: Partial<User> = {}): User {
  return {
    id: "u1",
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: "2024-01-01T00:00:00Z",
    ...overrides,
  } as User
}

describe("computeEffectiveUser", () => {
  it("retourne user enrichi si présent", () => {
    const u: AppUser = { ...mockUser(), profile: { full_name: "A" } }
    const session = { user: mockUser({ id: "other" }) } as Session
    expect(computeEffectiveUser(u, session)).toBe(u)
  })

  it("retombe sur session.user si user est null", () => {
    const session = { user: mockUser({ id: "u2" }) } as Session
    const out = computeEffectiveUser(null, session)
    expect(out?.id).toBe("u2")
    expect(out?.profile).toBeNull()
  })

  it("retourne null sans session ni user", () => {
    expect(computeEffectiveUser(null, null)).toBeNull()
  })
})
