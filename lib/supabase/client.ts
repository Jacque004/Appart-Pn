import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

let browserClient: SupabaseClient | null = null

/**
 * File d’attente pour les opérations GoTrue : évite NavigatorLockAcquireTimeoutError
 * quand le Web Locks API se bat avec React Strict Mode, signOut et onAuthStateChange en parallèle.
 * (Un seul onglet / une seule instance client — la synchro multi-onglets passe par localStorage + événements.)
 */
let authLockQueue: Promise<unknown> = Promise.resolve()

function serializeAuthLock<R>(_name: string, _acquireTimeout: number, fn: () => Promise<R>): Promise<R> {
  const run = authLockQueue.then(() => fn())
  authLockQueue = run.then(
    () => undefined,
    () => undefined,
  )
  return run
}

/**
 * Client Supabase navigateur (session persistée en localStorage).
 */
function getSupabaseEnv() {
  const url = (import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || "").trim()
  const key = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim()
  return { url, key }
}

export function createClient(): SupabaseClient {
  const { url, key } = getSupabaseEnv()
  if (!url || !key) {
    throw new Error(
      "Créez un fichier .env à la racine du projet avec :\n" +
        "VITE_SUPABASE_URL=… et VITE_SUPABASE_ANON_KEY=…\n" +
        "(ou NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).\n" +
        "Puis redémarrez le serveur (npm run dev).",
    )
  }
  if (!browserClient) {
    browserClient = createSupabaseClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        lock: serializeAuthLock,
      },
    })
  }
  return browserClient
}
