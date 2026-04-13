import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { EditPropertyForm } from "@/components/edit-property-form"
import { useAuth } from "@/contexts/auth-context"
import { getPropertyById } from "@/lib/api/properties"
import type { Property } from "@/lib/supabase/types"

export function DashboardEditPropertyPage() {
  const { id } = useParams<{ id: string }>()
  const { user, loading: authLoading } = useAuth()
  const [property, setProperty] = useState<Property | null>(null)
  const [bad, setBad] = useState(false)

  useEffect(() => {
    if (!id || !user) return
    void (async () => {
      try {
        const p = await getPropertyById(id)
        if (p.owner_id !== user.id) {
          setBad(true)
          return
        }
        setProperty(p)
      } catch {
        setBad(true)
      }
    })()
  }, [id, user])
  if (!user) {
    if (authLoading) return null
    return <Navigate to="/connexion" replace />
  }

  if (bad) {
    return <Navigate to="/dashboard/annonces" replace />
  }

  if (!property) {
    return (
      <div className="container py-8">
        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground animate-spin" />
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Modifier l&apos;annonce</h1>
        <p className="text-muted-foreground mt-2">Mise à jour du logement</p>
      </div>
      <EditPropertyForm property={property} />
    </div>
  )
}

