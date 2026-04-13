import type { Session } from "@supabase/supabase-js"
import type { AppUser } from "@/lib/api/auth"

/**
 * Utilisateur affiché dans l’UI : préfère le profil enrichi, sinon la session locale
 * (évite d’apparaître déconnecté si getUser() réseau échoue encore brièvement).
 */
export function computeEffectiveUser(user: AppUser | null, session: Session | null): AppUser | null {
  if (user) return user
  const u = session?.user
  if (!u) return null
  return { ...u, profile: null }
}
