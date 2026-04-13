"use client"

import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bed, Bath, Maximize, MapPin, Calendar } from "lucide-react"

interface PropertyCardProps {
  id: string
  title: string
  type: "villa" | "apartment" | "appartement" | "studio"
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  available: boolean
}

export function PropertyCard({
  id,
  title,
  type,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
  available,
}: PropertyCardProps) {
  const typeLabels = {
    villa: "Villa",
    apartment: "Appartement",
    appartement: "Appartement",
    studio: "Studio",
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/logements/${id}`}>
        <div className="relative h-56 overflow-hidden bg-muted">
          <img
            src={image || "/placeholder.svg?height=224&width=400"}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=224&width=400"
            }}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-primary text-primary-foreground">{typeLabels[type]}</Badge>
            {available && (
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                Disponible
              </Badge>
            )}
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/logements/${id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms}</span>
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{area} m²</span>
          </div>
        </div>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-2xl font-bold text-primary">{price.toLocaleString("fr-FR")}</span>
          <span className="text-sm text-muted-foreground">FCFA/mois</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
          <Link to={`/logements/${id}`}>
            <Calendar className="h-4 w-4 mr-2" />
            Prendre rendez-vous
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
