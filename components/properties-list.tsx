"use client"

import type { Property } from "@/lib/supabase/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"
import { Link } from "react-router-dom"

interface PropertiesListProps {
  properties: Property[]
}

export function PropertiesList({ properties }: PropertiesListProps) {
  if (properties.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">Vous n&apos;avez pas encore publié d&apos;annonce.</p>
        <Button asChild className="mt-4">
          <Link to="/dashboard/publier">Publier ma première annonce</Link>
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <Card key={property.id} className="p-4">
          <div className="flex gap-4">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={property.images?.[0]?.image_url || "/placeholder.svg?height=128&width=128"}
                alt={property.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{property.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{property.neighborhood}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{property.bedrooms} chambres</span>
                    <span>{property.bathrooms} salles de bain</span>
                    <span>{property.surface_area} m²</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{property.price.toLocaleString("fr-FR")} FCFA</p>
                  <p className="text-xs text-muted-foreground mt-1">par mois</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/logements/${property.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/dashboard/annonces/${property.id}/modifier`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
