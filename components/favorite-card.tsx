"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Bed, Bath, Maximize } from "lucide-react"
import { removeFromFavorites } from "@/lib/api/favorites"

interface FavoriteCardProps {
  favorite: any
  userId: string
  onRemoved?: () => void
}

export function FavoriteCard({ favorite, userId, onRemoved }: FavoriteCardProps) {
  const [isRemoving, setIsRemoving] = useState(false)

  const primaryImage = favorite.images?.find((img: any) => img.is_primary)
  const imageUrl = primaryImage?.image_url || favorite.images?.[0]?.image_url

  const handleRemove = async () => {
    if (!confirm("Êtes-vous sûr de vouloir retirer ce logement de vos favoris ?")) {
      return
    }

    setIsRemoving(true)
    const result = await removeFromFavorites(userId, favorite.favoriteId)

    if (result.success) {
      onRemoved?.()
    } else {
      alert(result.error || "Erreur lors de la suppression")
      setIsRemoving(false)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Link to={`/logements/${favorite.id}`}>
          <img
            src={imageUrl || "/placeholder.svg?height=200&width=400"}
            alt={favorite.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=200&width=400"
            }}
          />
        </Link>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={handleRemove}
          disabled={isRemoving}
        >
          <Heart className="h-4 w-4 fill-primary text-primary" />
        </Button>
        {!favorite.is_available && <Badge className="absolute top-2 left-2 bg-destructive">Non disponible</Badge>}
      </div>

      <CardContent className="p-4">
        <Link to={`/logements/${favorite.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-1">
            {favorite.title}
          </h3>
        </Link>

        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">
            {favorite.neighborhood}, {favorite.city || "Pointe-Noire"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{favorite.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{favorite.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{favorite.surface_area}m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">{favorite.price?.toLocaleString("fr-FR")} FCFA</p>
            <p className="text-xs text-muted-foreground">par mois</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to={`/logements/${favorite.id}`}>Voir détails</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
