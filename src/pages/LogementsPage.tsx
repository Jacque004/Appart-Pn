import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { getProperties, getNeighborhoods } from "@/lib/api/properties"
import type { Property } from "@/lib/supabase/types"
import { SlidersHorizontal } from "lucide-react"

function PropertyCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-full max-w-[80%]" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}

export function LogementsPage() {
  const [searchParams] = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [neighborhoods, setNeighborhoods] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const selectedType = searchParams.get("type")
        const normalizedType = selectedType === "appartement" ? "apartment" : selectedType
        const [p, n] = await Promise.all([
          getProperties({
            propertyType: normalizedType || undefined,
            minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
            maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
            neighborhood: searchParams.get("neighborhood") || undefined,
            bedrooms: searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined,
          }),
          getNeighborhoods(),
        ])
        setProperties(p)
        setNeighborhoods(n)
      } catch {
        setProperties([])
        setNeighborhoods([])
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="contenu-principal" tabIndex={-1} className="flex-1 bg-muted/30 outline-none">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Logements disponibles</h1>
            <p className="text-muted-foreground" aria-live="polite">
              {loading
                ? `${properties.length} logement${properties.length !== 1 ? "s" : ""}`
                : `${properties.length} logement${properties.length !== 1 ? "s" : ""} trouvé${properties.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="lg:hidden mb-4">
            <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" className="w-full gap-2 border-border bg-background">
                  <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden />
                  Filtres et tranche de prix
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto gap-0 p-0 sm:max-w-md">
                <div className="p-6 pb-0">
                  <DialogTitle className="text-left">Filtres</DialogTitle>
                </div>
                <div className="p-6 pt-4">
                  <FiltersSidebar
                    embedded
                    neighborhoods={neighborhoods}
                    onClose={() => setMobileFiltersOpen(false)}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="hidden lg:block">
              <FiltersSidebar neighborhoods={neighborhoods} />
            </aside>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
                  : properties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        id={property.id}
                        title={property.title}
                        type={property.property_type as "villa" | "apartment" | "appartement" | "studio"}
                        location={property.neighborhood}
                        price={property.price}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        area={property.surface_area}
                        image={property.images?.[0]?.image_url || "/placeholder.svg?height=300&width=400"}
                        available={property.is_available}
                      />
                    ))}
              </div>
              {!loading && properties.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">Aucun logement ne correspond à ces critères.</p>
                  <p className="text-sm text-muted-foreground mt-2">Élargissez le budget ou changez de quartier.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
