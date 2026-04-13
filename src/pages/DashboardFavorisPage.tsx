import { useCallback, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { DashboardNav } from "@/components/dashboard-nav"
import { FavoriteCard } from "@/components/favorite-card"
import { Heart } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getUserFavorites } from "@/lib/api/favorites"
import type { FavoriteItem } from "@/lib/api/favorites"

export function DashboardFavorisPage() {
  const { user, loading } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  const load = useCallback(async () => {
    if (!user) return
    const f = await getUserFavorites(user.id)
    setFavorites(f)
  }, [user])

  useEffect(() => {
    void load()
  }, [load])
  if (!user) {
    if (loading) return null
    return <Navigate to="/connexion" replace />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <DashboardNav />
          </aside>
          <main id="contenu-principal" tabIndex={-1} className="lg:col-span-3 outline-none">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground">Mes favoris</h1>
              <p className="text-muted-foreground mt-1">{favorites.length} logement(s)</p>
            </div>
            {favorites.length === 0 ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Aucun favori</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favorites.map((favorite) => (
                  <FavoriteCard
                    key={favorite.favoriteId}
                    favorite={favorite}
                    userId={user.id}
                    onRemoved={load}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

