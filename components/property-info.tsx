import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Maximize, Home } from "lucide-react"

interface PropertyInfoProps {
  type: "villa" | "apartment" | "appartement" | "studio"
  bedrooms: number
  bathrooms: number
  area: number
  description: string
}

export function PropertyInfo({ type, bedrooms, bathrooms, area, description }: PropertyInfoProps) {
  const typeLabels = {
    villa: "Villa",
    apartment: "Appartement",
    appartement: "Appartement",
    studio: "Studio",
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <Badge className="bg-primary text-primary-foreground text-base px-4 py-1">
          <Home className="h-4 w-4 mr-2" />
          {typeLabels[type]}
        </Badge>
      </div>

      <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
        {bedrooms > 0 && (
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-primary" />
            <span className="text-foreground font-medium">{bedrooms} chambres</span>
          </div>
        )}
        {bathrooms > 0 && (
          <div className="flex items-center gap-2">
            <Bath className="h-5 w-5 text-primary" />
            <span className="text-foreground font-medium">{bathrooms} salles de bain</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Maximize className="h-5 w-5 text-primary" />
          <span className="text-foreground font-medium">{area} m²</span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Description</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
