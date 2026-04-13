"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Home } from "lucide-react"

/** Correspond aux tranches du Select et aux paramètres minPrice / maxPrice de la liste des logements */
function priceRangeToSearchParams(range: string): { minPrice?: string; maxPrice?: string } {
  switch (range) {
    case "0-100000":
      return { maxPrice: "100000" }
    case "100000-200000":
      return { minPrice: "100000", maxPrice: "200000" }
    case "200000-300000":
      return { minPrice: "200000", maxPrice: "300000" }
    case "300000-500000":
      return { minPrice: "300000", maxPrice: "500000" }
    case "500000+":
      return { minPrice: "500000" }
    default:
      return {}
  }
}

export function SearchSection() {
  const navigate = useNavigate()
  const [propertyType, setPropertyType] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [priceRange, setPriceRange] = useState<string>("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (propertyType && propertyType !== "all") params.set("type", propertyType)
    if (location && location !== "all") params.set("neighborhood", location)
    const { minPrice, maxPrice } = priceRangeToSearchParams(priceRange)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    const qs = params.toString()
    navigate(qs ? `/logements?${qs}` : "/logements")
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Trouvez votre logement idéal à Pointe-Noire
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Villas, appartements, studios - Mise en relation directe avec les propriétaires
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-card rounded-xl shadow-lg p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Home className="h-4 w-4 text-primary" />
                Type de logement
              </label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Appartement</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Quartier
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Tous les quartiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les quartiers</SelectItem>
                  <SelectItem value="centre-ville">Centre-ville</SelectItem>
                  <SelectItem value="mpita">Mpita</SelectItem>
                  <SelectItem value="tie-tie">Tié-Tié</SelectItem>
                  <SelectItem value="lumumba">Lumumba</SelectItem>
                  <SelectItem value="mongo-mpoukou">Mongo-Mpoukou</SelectItem>
                  <SelectItem value="base">Base</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Budget mensuel (FCFA)</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Tous les prix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les prix</SelectItem>
                  <SelectItem value="0-100000">Moins de 100 000</SelectItem>
                  <SelectItem value="100000-200000">100 000 - 200 000</SelectItem>
                  <SelectItem value="200000-300000">200 000 - 300 000</SelectItem>
                  <SelectItem value="300000-500000">300 000 - 500 000</SelectItem>
                  <SelectItem value="500000+">Plus de 500 000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="button"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5 mr-2" aria-hidden />
            Rechercher
          </Button>
        </div>
      </div>
    </section>
  )
}
