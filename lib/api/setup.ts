import { createClient } from "@/lib/supabase/client"

/**
 * Tente d'initialiser la base via une RPC `exec_sql` (souvent absente côté client).
 * Préférez les scripts SQL dans le dashboard Supabase pour une installation fiable.
 */
export async function setupDatabase() {
  try {
    const supabase = createClient()

    const { error: profilesError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          full_name TEXT,
          user_type TEXT CHECK (user_type IN ('tenant', 'owner', 'both')),
          phone TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    })

    if (profilesError) {
      console.error("[AppartPN] Profiles RPC error:", profilesError)
      return {
        success: false,
        message:
          "Impossible d'exécuter la configuration automatique (RPC non disponible avec la clé anonyme). Utilisez l'éditeur SQL de Supabase et les scripts du dossier du projet.",
      }
    }

    return { success: true, message: "Base de données initialisée avec succès!" }
  } catch (error) {
    console.error("[AppartPN] Setup error:", error)
    return {
      success: false,
      message: "Erreur lors de l'initialisation. Exécutez les scripts SQL dans Supabase.",
    }
  }
}

export async function checkDatabaseSetup() {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("profiles").select("id").limit(1)

    if (error) {
      if (error.code === "PGRST205" || error.message?.includes("Could not find the table")) {
        return { isSetup: false }
      }
      console.error("[AppartPN] Database check error:", error)
      return { isSetup: false }
    }

    return { isSetup: true }
  } catch (error) {
    console.error("[AppartPN] Database check exception:", error)
    return { isSetup: false }
  }
}
