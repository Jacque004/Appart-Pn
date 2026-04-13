import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"
import { computeEffectiveUser } from "@/lib/auth-session"
import { createClient } from "@/lib/supabase/client"
import { fetchUserWithProfile, type AppUser } from "@/lib/api/auth"

type AuthContextValue = {
  session: Session | null
  user: AppUser | null
  loading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const supabase = createClient()
      const {
        data: { session: s },
      } = await supabase.auth.getSession()
      setSession(s ?? null)
      if (!s?.user) {
        setUser(null)
        return
      }
      const u = await fetchUserWithProfile()
      setUser(u ?? (s?.user ? { ...s.user, profile: null } : null))
    } catch (error) {
      console.error("[AppartPN] refreshUser error:", error)
      try {
        const supabase = createClient()
        const {
          data: { session: s2 },
        } = await supabase.auth.getSession()
        setSession(s2 ?? null)
        setUser(s2?.user ? { ...s2.user, profile: null } : null)
      } catch {
        setUser(null)
      }
    }
  }, [])

  useEffect(() => {
    const supabase = createClient()
    let mounted = true

    void (async () => {
      try {
        await refreshUser()
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      try {
        setSession(newSession)
        if (!newSession?.user) {
          setUser(null)
          return
        }
        const u = await fetchUserWithProfile()
        setUser(u ?? (newSession?.user ? { ...newSession.user, profile: null } : null))
      } catch (error) {
        console.error("[AppartPN] onAuthStateChange error:", error)
        if (newSession?.user) {
          setUser({ ...newSession.user, profile: null })
        } else {
          setUser(null)
        }
      } finally {
        setLoading(false)
      }
    })

    const onOnline = () => {
      void refreshUser()
    }
    window.addEventListener("online", onOnline)

    return () => {
      mounted = false
      subscription.unsubscribe()
      window.removeEventListener("online", onOnline)
    }
  }, [refreshUser])

  const effectiveUser = useMemo(() => computeEffectiveUser(user, session), [user, session])

  const value = useMemo(
    () => ({ session, user: effectiveUser, loading, refreshUser }),
    [session, effectiveUser, loading, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider")
  }
  return ctx
}
