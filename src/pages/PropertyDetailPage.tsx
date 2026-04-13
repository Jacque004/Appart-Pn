import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyInfo } from "@/components/property-info"
import { PropertyAmenities } from "@/components/property-amenities"
import { PropertyLocation } from "@/components/property-location"
import { BookingCard } from "@/components/booking-card"
import { OwnerCard } from "@/components/owner-card"
import { Skeleton } from "@/components/ui/skeleton"
import { getPropertyById } from "@/lib/api/properties"
import { SITE_CONTACT_EMAIL } from "@/lib/site-config"
import type { Property } from "@/lib/supabase/types"

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) {
      setNotFound(true)
      setLoading(false)
      return
    }
    let cancelled = false
    void (async () => {
      setLoading(true)
      try {
        const p = await getPropertyById(id)
        if (!cancelled) setProperty(p)
      } catch {
        if (!cancelled) setNotFound(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  if (notFound) {
    return <Navigate to="/logements" replace />
  }

  if (loading || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main
          id="contenu-principal"
          tabIndex={-1}
          className="flex-1 bg-background outline-none"
          aria-busy="true"
          aria-label="Chargement de l'annonce"
        >
          <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-10 w-full max-w-2xl" />
              <Skeleton className="h-5 w-full max-w-md" />
            </div>
            <Skeleton className="aspect-[21/9] w-full max-h-80 rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-36 w-full rounded-lg" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-52 w-full rounded-xl" />
                <Skeleton className="h-36 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const images = property.images?.map((img) => img.image_url) || []
  const amenities = property.amenities?.map((a) => a.amenity) || []
  const normalizedType = property.property_type === "apartment" ? "appartement" : property.property_type

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="contenu-principal" tabIndex={-1} className="flex-1 bg-background outline-none">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{property.title}</h1>
            <p className="text-muted-foreground">{property.address}</p>
          </div>
          <PropertyGallery images={images} title={property.title} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <PropertyInfo
                type={normalizedType as "villa" | "appartement" | "studio"}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.surface_area}
                description={property.description || ""}
              />
              <PropertyAmenities amenities={amenities} />
              <PropertyLocation
                address={property.address}
                coordinates={
                  property.latitude && property.longitude
                    ? { lat: property.latitude, lng: property.longitude }
                    : undefined
                }
              />
            </div>
            <div className="space-y-6">
              <BookingCard price={property.price} available={property.is_available} propertyId={property.id} />
              <OwnerCard
                owner={{
                  name: property.owner?.full_name || "Propriétaire",
                  phone: property.owner?.phone || "+242 06 XXX XX XX",
                  email: SITE_CONTACT_EMAIL,
                  memberSince: new Date(property.created_at).getFullYear().toString(),
                  verified: true,
                }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
