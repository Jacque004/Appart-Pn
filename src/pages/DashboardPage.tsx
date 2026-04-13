import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { createClient } from "@/lib/supabase/client"
import { checkDatabaseSetup } from "@/lib/api/setup"
import { Header } from "@/components/header"
import { DashboardNav } from "@/components/dashboard-nav"
import { StatsCards } from "@/components/stats-cards"
import { PropertiesList } from "@/components/properties-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [setupOk, setSetupOk] = useState<boolean | null>(null)
  const [properties, setProperties] = useState<unknown[]>([])
  const [appointmentsCount, setAppointmentsCount] = useState(0)

  useEffect(() => {
    if (!user) return
    void (async () => {
      const { isSetup } = await checkDatabaseSetup()
      setSetupOk(isSetup)
      if (!isSetup) return
      const supabase = createClient()
      const { data: propertiesData } = await supabase
        .from("properties")
        .select("*, images:property_images(*)")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false })
      setProperties(propertiesData || [])
      const { count } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("owner_id", user.id)
        .eq("status", "pending")
      setAppointmentsCount(count || 0)
    })()
  }, [user])

  if (!user) {
    if (authLoading) return null
    return <Navigate to="/connexion" replace />
  }

  if (setupOk === false) {
    return <Navigate to="/setup" replace />
  }

  const profile = user.profile as { full_name?: string; user_type?: string } | null | undefined

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <DashboardNav />
            </aside>
            <main id="contenu-principal" tabIndex={-1} className="lg:col-span-3 space-y-6 outline-none">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
                  <p className="text-muted-foreground mt-1">Bienvenue, {profile?.full_name || user.email}</p>
                </div>
                {(profile?.user_type === "owner" || profile?.user_type === "both") && (
                  <Button asChild>
                    <Link to="/dashboard/publier">
                      <Plus className="h-4 w-4 mr-2" />
                      Publier une annonce
                    </Link>
                  </Button>
                )}
              </div>
              <StatsCards
                propertiesCount={properties?.length || 0}
                appointmentsCount={appointmentsCount || 0}
                viewsCount={0}
              />
              {(profile?.user_type === "owner" || profile?.user_type === "both") && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Mes annonces</h2>
                  <PropertiesList properties={properties as never[]} />
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

