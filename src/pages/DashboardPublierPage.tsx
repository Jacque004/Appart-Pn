import { Navigate } from "react-router-dom"
import { Header } from "@/components/header"
import { DashboardNav } from "@/components/dashboard-nav"
import { PublishPropertyForm } from "@/components/publish-property-form"
import { useAuth } from "@/contexts/auth-context"
import type { AppUser } from "@/lib/api/auth"

/** Type de compte : table profiles, sinon métadonnées inscription (si profil pas encore chargé). */
function accountUserType(user: AppUser): string | undefined {
  const fromProfile = (user.profile as { user_type?: string } | null | undefined)?.user_type
  const meta = user.user_metadata?.user_type
  const fromMeta = typeof meta === "string" ? meta : undefined
  return fromProfile ?? fromMeta
}

export function DashboardPublierPage() {
  const { user, loading } = useAuth()
  if (!user) {
    if (loading) return null
    return <Navigate to="/connexion" replace />
  }

  if (accountUserType(user) === "tenant") {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <DashboardNav />
            </aside>
            <main id="contenu-principal" tabIndex={-1} className="lg:col-span-3 outline-none">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">Publier une annonce</h1>
                <p className="text-muted-foreground mt-1">Informations du logement</p>
              </div>
              <PublishPropertyForm userId={user.id} />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

