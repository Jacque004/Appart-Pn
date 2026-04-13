import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export type AppUser = User & {
  profile?: Record<string, unknown> | null
}

export async function signUp(formData: FormData) {
  const supabase = createClient()

  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const fullName = String(formData.get("fullName") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const userType = String(formData.get("userType") ?? "tenant")

  if (!email || !password || !fullName || !phone) {
    return { error: "Veuillez remplir tous les champs obligatoires." }
  }

  const origin = typeof window !== "undefined" ? window.location.origin : ""
  const redirectUrl = `${origin}/dashboard`

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        full_name: fullName,
        phone,
        user_type: userType,
      },
    },
  })

  if (error) {
    const raw = error.message || ""
    const msg = raw.toLowerCase()
    console.error("[AppartPN] Sign up error:", raw)
    if (msg.includes("rate_limit") || msg.includes("too many requests")) {
      return { error: "Trop de tentatives. Veuillez attendre quelques secondes avant de réessayer." }
    }
    if (msg.includes("already registered") || msg.includes("user already registered")) {
      return { error: "Cet email est deja utilise. Connectez-vous ou utilisez un autre email." }
    }
    if (msg.includes("password")) {
      return { error: "Mot de passe invalide. Utilisez au moins 6 caracteres." }
    }
    return { error: raw || "Erreur lors de l'inscription." }
  }

  if (!data.session) {
    return {
      success: true,
      requiresEmailConfirmation: true,
      message: "Inscription reussie. Verifiez votre boite email pour confirmer votre compte.",
      redirectTo: "/connexion",
    }
  }

  return { success: true, redirectTo: "/dashboard" }
}

export type SignInFormState = { error: string | null; success?: boolean; redirectTo?: string }

export async function signInWithPassword(formData: FormData): Promise<SignInFormState> {
  const supabase = createClient()

  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return { error: "Veuillez renseigner votre email et votre mot de passe." }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    const raw = error.message || ""
    const msg = raw.toLowerCase()
    console.error("[AppartPN] signIn error:", raw)

    if (msg.includes("email not confirmed")) {
      return { error: "Veuillez confirmer votre email avant de vous connecter. Vérifiez votre boîte de réception." }
    }
    if (msg.includes("invalid login credentials") || msg.includes("invalid_credentials")) {
      return { error: "Email ou mot de passe incorrect." }
    }
    if (msg.includes("too many requests") || msg.includes("rate limit")) {
      return { error: "Trop de tentatives. Patientez quelques instants puis réessayez." }
    }
    if (msg.includes("network request failed") || msg.includes("failed to fetch")) {
      return { error: "Impossible de joindre le serveur. Vérifiez votre connexion Internet." }
    }

    return { error: raw || "Erreur de connexion. Veuillez réessayer." }
  }

  return { success: true, redirectTo: "/dashboard", error: null }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("[AppartPN] Sign out error:", error)
    return { error: error.message }
  }
  return { success: true, redirectTo: "/" }
}

export async function fetchUserWithProfile(): Promise<AppUser | null> {
  const supabase = createClient()

  // getUser() valide le JWT côté serveur (réseau). En cas d’échec réseau, on retombe sur
  // getSession() (session locale) pour ne pas traiter l’utilisateur comme déconnecté.
  const {
    data: { user: validatedUser },
    error: validateError,
  } = await supabase.auth.getUser()

  let user = validatedUser

  if (validateError || !user) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    user = session?.user ?? null
  }

  if (!user) {
    return null
  }

  let profileData = null
  try {
    const { data, error: profileError } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

    if (!profileError) {
      profileData = data
    }
  } catch {
    /* profil optionnel */
  }

  return {
    ...user,
    profile: profileData,
  }
}

export async function updateProfile(formData: FormData) {
  const supabase = createClient()

  const {
    data: { user: validated },
    error: validateError,
  } = await supabase.auth.getUser()

  let user = validated
  if (validateError || !user) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    user = session?.user ?? null
  }

  if (!user) {
    return { error: "Vous devez être connecté pour modifier votre profil." }
  }

  const fullName = formData.get("fullName") as string
  const phone = formData.get("phone") as string
  const userType = formData.get("userType") as string
  const avatarUrl = formData.get("avatarUrl") as string

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone,
      user_type: userType,
      avatar_url: avatarUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    console.error("[AppartPN] Profile update error:", error.message)
    return { error: "Erreur lors de la mise à jour du profil." }
  }

  return { success: true }
}
