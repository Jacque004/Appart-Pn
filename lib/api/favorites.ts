import { createClient } from "@/lib/supabase/client"

export type FavoriteItem = {
  favoriteId: string
  createdAt: string
  id: string
  title: string
  description: string
  property_type: string
  price: number
  bedrooms: number
  bathrooms: number
  surface_area: number
  address: string
  neighborhood: string
  city: string
  is_available: boolean
  images: Array<{ image_url: string; is_primary?: boolean; display_order?: number }>
}

export async function getUserFavorites(userId: string) {
  try {
    const supabase = createClient()

    const { data: favorites, error } = await supabase
      .from("favorites")
      .select(
        `
        id,
        created_at,
        property_id,
        properties (
          id,
          title,
          description,
          property_type,
          price,
          bedrooms,
          bathrooms,
          surface_area,
          address,
          neighborhood,
          city,
          is_available,
          property_images (
            image_url,
            is_primary,
            display_order
          )
        )
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[AppartPN] Error fetching favorites:", error)
      return []
    }

    return (
      favorites?.map((fav): FavoriteItem => {
        const row = fav as unknown as {
          id: string
          created_at: string
          properties:
            | {
                id: string
                title: string
                description: string
                property_type: string
                price: number
                bedrooms: number
                bathrooms: number
                surface_area: number
                address: string
                neighborhood: string
                city: string
                is_available: boolean
                property_images: Array<{ image_url: string; is_primary?: boolean; display_order?: number }>
              }
            | Array<{
                id: string
                title: string
                description: string
                property_type: string
                price: number
                bedrooms: number
                bathrooms: number
                surface_area: number
                address: string
                neighborhood: string
                city: string
                is_available: boolean
                property_images: Array<{ image_url: string; is_primary?: boolean; display_order?: number }>
              }>
            | null
        }
        const p = Array.isArray(row.properties) ? row.properties[0] : row.properties
        return {
          favoriteId: row.id,
          createdAt: row.created_at,
          id: p?.id ?? "",
          title: p?.title ?? "",
          description: p?.description ?? "",
          property_type: p?.property_type ?? "apartment",
          price: p?.price ?? 0,
          bedrooms: p?.bedrooms ?? 0,
          bathrooms: p?.bathrooms ?? 0,
          surface_area: p?.surface_area ?? 0,
          address: p?.address ?? "",
          neighborhood: p?.neighborhood ?? "",
          city: p?.city ?? "Pointe-Noire",
          is_available: p?.is_available ?? false,
          images: p?.property_images ?? [],
        }
      }) || []
    )
  } catch (error) {
    console.error("[AppartPN] Error in getUserFavorites:", error)
    return []
  }
}

export async function addToFavorites(userId: string, propertyId: string) {
  try {
    const supabase = createClient()

    const { data: existing } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("property_id", propertyId)
      .single()

    if (existing) {
      return { success: false, error: "Déjà dans vos favoris" }
    }

    const { error } = await supabase.from("favorites").insert({
      user_id: userId,
      property_id: propertyId,
    })

    if (error) {
      console.error("[AppartPN] Error adding to favorites:", error)
      return { success: false, error: "Erreur lors de l'ajout aux favoris" }
    }

    return { success: true }
  } catch (error) {
    console.error("[AppartPN] Error in addToFavorites:", error)
    return { success: false, error: "Erreur lors de l'ajout aux favoris" }
  }
}

export async function removeFromFavorites(userId: string, favoriteId: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("favorites").delete().eq("id", favoriteId).eq("user_id", userId)

    if (error) {
      console.error("[AppartPN] Error removing from favorites:", error)
      return { success: false, error: "Erreur lors de la suppression" }
    }

    return { success: true }
  } catch (error) {
    console.error("[AppartPN] Error in removeFromFavorites:", error)
    return { success: false, error: "Erreur lors de la suppression" }
  }
}

export async function isFavorite(userId: string, propertyId: string) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("property_id", propertyId)
      .single()

    if (error && error.code !== "PGRST116") {
      console.error("[AppartPN] Error checking favorite:", error)
      return false
    }

    return !!data
  } catch (error) {
    console.error("[AppartPN] Error in isFavorite:", error)
    return false
  }
}
