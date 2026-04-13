import { Check } from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Équipements et services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <span className="text-foreground">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
