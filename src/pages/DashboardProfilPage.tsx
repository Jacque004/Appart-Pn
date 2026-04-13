import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { DashboardNav } from "@/components/dashboard-nav"
import { ProfileForm } from "@/components/profile-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, Calendar, Heart, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { signOut } from "@/lib/api/auth"

export function DashboardProfilPage() {
  const navigate = useNavigate()
  const { user, loading, refreshUser } = useAuth()
  const [stats, setStats] = useState({ properties: 0, appointments: 0, favorites: 0 })
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    void (async () => {
      const { count: propertiesCount } = await supabase
        .from("properties")
        .select("*", { count: "exact", head: true })
        .eq("owner_id", user.id)
      const { count: appointmentsCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("tenant_id", user.id)
      const { count: favoritesCount } = await supabase
        .from("favorites")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
      setStats({
        properties: propertiesCount || 0,
        appointments: appointmentsCount || 0,
        favorites: favoritesCount || 0,
      })
    })()
  }, [user])
  if (!user) {
    if (loading) return null
    return <Navigate to="/connexion" replace />
  }

  const profile = user.profile as {
    full_name?: string
    user_type?: string
    avatar_url?: string
  } | null | undefined

  const userTypeLabels = {
    owner: "Propriétaire",
    tenant: "Locataire",
    both: "Propriétaire & Locataire",
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
            <main id="contenu-principal" tabIndex={-1} className="lg:col-span-3 space-y-6 outline-none">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Mon profil</h1>
                <p className="text-muted-foreground mt-1">Gérez vos informations personnelles</p>
              </div>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || "Avatar"} />
                      <AvatarFallback className="text-2xl">
                        {profile?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{profile?.full_name || "Utilisateur"}</CardTitle>
                      <CardDescription className="text-base">{user.email}</CardDescription>
                      {profile?.user_type && (
                        <Badge variant="secondary" className="mt-2">
                          {userTypeLabels[profile.user_type as keyof typeof userTypeLabels]}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mes annonces</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.properties}</div>
                    <p className="text-xs text-muted-foreground">Propriétés publiées</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rendez-vous</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.appointments}</div>
                    <p className="text-xs text-muted-foreground">Visites planifiées</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Favoris</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.favorites}</div>
                    <p className="text-xs text-muted-foreground">Propriétés sauvegardées</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Modifier mon profil</CardTitle>
                  <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm user={user} onSuccess={() => void refreshUser()} />
                </CardContent>
              </Card>
              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle>Session</CardTitle>
                  <CardDescription>Déconnectez-vous de ce navigateur. Vous pourrez vous reconnecter à tout moment.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    disabled={signingOut}
                    onClick={async () => {
                      setSigningOut(true)
                      try {
                        await signOut()
                        navigate("/", { replace: true })
                      } finally {
                        setSigningOut(false)
                      }
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {signingOut ? "Déconnexion…" : "Se déconnecter"}
                  </Button>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

