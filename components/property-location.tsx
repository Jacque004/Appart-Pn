import { MapPin } from "lucide-react"

interface PropertyLocationProps {
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export function PropertyLocation({ address, coordinates }: PropertyLocationProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Localisation</h2>

      <div className="flex items-start gap-3 mb-6">
        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
        <div>
          <p className="text-foreground font-medium mb-1">Adresse</p>
          <p className="text-muted-foreground">{address}</p>
        </div>
      </div>

      {coordinates ? (
        <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Carte interactive</p>
            <p className="text-sm text-muted-foreground">
              Lat: {coordinates.lat}, Lng: {coordinates.lng}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
          <div className="text-center px-4">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-muted-foreground font-medium mb-1">Coordonnées non disponibles</p>
            <p className="text-sm text-muted-foreground">
              La localisation exacte n'a pas été renseignée pour ce logement
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
