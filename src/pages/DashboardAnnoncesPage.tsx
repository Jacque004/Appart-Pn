import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { DashboardNav } from "@/components/dashboard-nav"
import { PropertyCard } from "@/components/property-card-dashboard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getUserProperties } from "@/lib/api/properties"

type DashboardProperty = {
  id: string
  title: string
  description: string
  property_type: string
  price: number
  bedrooms: number
  bathrooms: number
  surface_area: number
  address: string
  neighborhood: string
  is_available: boolean
  created_at: string
  images: Array<{ image_url: string; is_primary: boolean }>
  appointments: Array<{ id: string; status: string }>
}

export function DashboardAnnoncesPage() {
  const { user, loading } = useAuth()
  const [properties, setProperties] = useState<DashboardProperty[]>([])

  useEffect(() => {
    if (!user) return
    void (async () => {
      try {
        const p = await getUserProperties(user.id)
        setProperties(p || [])
      } catch {
        setProperties([])
      }
    })()
  }, [user])
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Mes annonces</h1>
                <p className="text-muted-foreground mt-1">{properties.length} annonce(s)</p>
              </div>
              <Button asChild>
                <Link to="/dashboard/publier">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle annonce
                </Link>
              </Button>
            </div>
            {properties.length === 0 ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <Button asChild>
                  <Link to="/dashboard/publier">
                    <Plus className="h-4 w-4 mr-2" />
                    Publier une annonce
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

