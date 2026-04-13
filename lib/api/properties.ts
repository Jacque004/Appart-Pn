import { createClient } from "@/lib/supabase/client"
import type { Property } from "@/lib/supabase/types"

export async function getProperties(filters?: {
  propertyType?: string
  minPrice?: number
  maxPrice?: number
  neighborhood?: string
  bedrooms?: number
}) {
  const supabase = createClient()
  let query = supabase
    .from("properties")
    .select(
      "*, owner:profiles!properties_owner_id_fkey(id, full_name, phone, avatar_url), images:property_images(*), amenities:property_amenities(*)",
    )
    .eq("is_available", true)
    .order("created_at", { ascending: false })

  if (filters?.propertyType && filters.propertyType !== "all") {
    query = query.eq("property_type", filters.propertyType)
  }
  if (filters?.minPrice) query = query.gte("price", filters.minPrice)
  if (filters?.maxPrice) query = query.lte("price", filters.maxPrice)
  if (filters?.neighborhood && filters.neighborhood !== "all") {
    query = query.eq("neighborhood", filters.neighborhood)
  }
  if (filters?.bedrooms) query = query.gte("bedrooms", filters.bedrooms)

  const { data, error } = await query
  if (error) {
    console.error("[AppartPN] Error fetching properties:", error)
    throw new Error("Failed to fetch properties")
  }
  return data as Property[]
}

export async function getPropertyById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("properties")
    .select(
      "*, owner:profiles!properties_owner_id_fkey(id, full_name, phone, avatar_url), images:property_images(*), amenities:property_amenities(*)",
    )
    .eq("id", id)
    .single()

  if (error) {
    console.error("[AppartPN] Error fetching property:", error)
    throw new Error("Failed to fetch property")
  }
  return data as Property
}

export async function getNeighborhoods() {
  const supabase = createClient()
  const { data, error } = await supabase.from("properties").select("neighborhood").order("neighborhood")
  if (error) {
    console.error("[AppartPN] Error fetching neighborhoods:", error)
    return []
  }
  return [...new Set(data.map((item) => item.neighborhood))]
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

async function uploadPropertyImages(supabase: ReturnType<typeof createClient>, folderId: string, files: File[]) {
  const imageUrls: { url: string; isPrimary: boolean; order: number }[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file.size === 0) continue
    if (file.size > MAX_IMAGE_BYTES) continue
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) continue
    const fileExt = file.name.split(".").pop()
    const fileName = folderId + "/" + Date.now() + "-" + i + "." + fileExt
    const { error: uploadError } = await supabase.storage.from("property-images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })
    if (uploadError) continue
    const {
      data: { publicUrl },
    } = supabase.storage.from("property-images").getPublicUrl(fileName)
    imageUrls.push({ url: publicUrl, isPrimary: i === 0, order: i })
  }
  return imageUrls
}

export async function publishProperty(formData: FormData) {
  const supabase = createClient()
  const userId = formData.get("userId") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const propertyType = formData.get("propertyType") as string
  const price = Number(formData.get("price"))
  const bedrooms = Number(formData.get("bedrooms"))
  const bathrooms = Number(formData.get("bathrooms"))
  const surfaceArea = Number(formData.get("surfaceArea"))
  const address = formData.get("address") as string
  const neighborhood = formData.get("neighborhood") as string
  const amenities = formData.get("amenities") as string
  const virtualTourUrl = formData.get("virtualTourUrl") as string

  if (!userId || !title || !description || !propertyType || !price || !address || !neighborhood) {
    return { error: "Tous les champs obligatoires doivent être remplis" }
  }
  if (price <= 0 || bedrooms < 0 || bathrooms < 0 || surfaceArea <= 0) {
    return { error: "Les valeurs numériques doivent être positives" }
  }

  try {
    const { data: property, error: propertyError } = await supabase
      .from("properties")
      .insert({
        owner_id: userId,
        title,
        description,
        property_type: propertyType,
        price,
        bedrooms,
        bathrooms,
        surface_area: surfaceArea,
        address,
        neighborhood,
        city: "Pointe-Noire",
        virtual_tour_url: virtualTourUrl || null,
      })
      .select()
      .single()

    if (propertyError || !property) {
      console.error("[AppartPN] Property creation error:", propertyError)
      return { error: "Erreur lors de la création de l'annonce" }
    }

    const imageFiles = formData.getAll("images") as File[]
    if (imageFiles.length > 0) {
      const imageUrls = await uploadPropertyImages(supabase, property.id, imageFiles)
      if (imageUrls.length > 0) {
        await supabase.from("property_images").insert(
          imageUrls.map((img) => ({
            property_id: property.id,
            image_url: img.url,
            is_primary: img.isPrimary,
            display_order: img.order,
          })),
        )
      }
    }

    if (amenities) {
      try {
        const amenitiesList = JSON.parse(amenities) as string[]
        if (amenitiesList.length > 0) {
          await supabase.from("property_amenities").insert(
            amenitiesList.map((amenity) => ({ property_id: property.id, amenity })),
          )
        }
      } catch (e) {
        console.error("[AppartPN] amenities parse", e)
      }
    }

    return { success: true, propertyId: property.id }
  } catch (error) {
    console.error("[AppartPN] Error publishing property:", error)
    return { error: "Une erreur est survenue lors de la publication" }
  }
}

export async function getUserProperties(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("properties")
    .select("*, images:property_images(*), amenities:property_amenities(*), appointments:appointments(id, status)")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[AppartPN] Error fetching user properties:", error)
    throw new Error("Failed to fetch user properties")
  }
  return data
}

export async function updatePropertyStatus(propertyId: string, isAvailable: boolean) {
  const supabase = createClient()
  if (!propertyId) return { error: "ID de propriété invalide" }
  const { error } = await supabase
    .from("properties")
    .update({ is_available: isAvailable, updated_at: new Date().toISOString() })
    .eq("id", propertyId)
  if (error) return { error: "Erreur lors de la mise à jour du statut" }
  return { success: true }
}

export async function deleteProperty(propertyId: string) {
  const supabase = createClient()
  if (!propertyId) return { error: "ID de propriété invalide" }
  try {
    await supabase.from("property_images").delete().eq("property_id", propertyId)
    await supabase.from("property_amenities").delete().eq("property_id", propertyId)
    await supabase.from("appointments").delete().eq("property_id", propertyId)
    await supabase.from("favorites").delete().eq("property_id", propertyId)
    const { error } = await supabase.from("properties").delete().eq("id", propertyId)
    if (error) return { error: "Erreur lors de la suppression de l'annonce" }
    return { success: true }
  } catch {
    return { error: "Erreur lors de la suppression de l'annonce" }
  }
}

export async function updateProperty(propertyId: string, formData: FormData) {
  const supabase = createClient()
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const propertyType = formData.get("propertyType") as string
  const price = Number(formData.get("price"))
  const bedrooms = Number(formData.get("bedrooms"))
  const bathrooms = Number(formData.get("bathrooms"))
  const surfaceArea = Number(formData.get("surfaceArea"))
  const address = formData.get("address") as string
  const neighborhood = formData.get("neighborhood") as string
  const amenities = formData.get("amenities") as string
  const virtualTourUrl = formData.get("virtualTourUrl") as string

  if (!title || !description || !propertyType || !price || !address || !neighborhood) {
    return { error: "Tous les champs obligatoires doivent être remplis" }
  }
  if (price <= 0 || bedrooms < 0 || bathrooms < 0 || surfaceArea <= 0) {
    return { error: "Les valeurs numériques doivent être positives" }
  }

  try {
    const { error: propertyError } = await supabase
      .from("properties")
      .update({
        title,
        description,
        property_type: propertyType,
        price,
        bedrooms,
        bathrooms,
        surface_area: surfaceArea,
        address,
        neighborhood,
        virtual_tour_url: virtualTourUrl || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", propertyId)

    if (propertyError) return { error: "Erreur lors de la mise à jour de l'annonce" }

    const imageFiles = formData.getAll("images") as File[]
    if (imageFiles.length > 0) {
      const imageUrls = await uploadPropertyImages(supabase, propertyId, imageFiles)
      if (imageUrls.length > 0) {
        await supabase.from("property_images").insert(
          imageUrls.map((img) => ({
            property_id: propertyId,
            image_url: img.url,
            is_primary: img.isPrimary,
            display_order: img.order,
          })),
        )
      }
    }

    if (amenities) {
      try {
        const amenitiesList = JSON.parse(amenities) as string[]
        await supabase.from("property_amenities").delete().eq("property_id", propertyId)
        if (amenitiesList.length > 0) {
          await supabase.from("property_amenities").insert(
            amenitiesList.map((amenity) => ({ property_id: propertyId, amenity })),
          )
        }
      } catch (e) {
        console.error("[AppartPN] amenities", e)
      }
    }

    return { success: true }
  } catch (error) {
    console.error("[AppartPN] Error updating property:", error)
    return { error: "Une erreur est survenue lors de la mise à jour" }
  }
}

export async function deletePropertyImage(imageId: string) {
  const supabase = createClient()
  const { error } = await supabase.from("property_images").delete().eq("id", imageId)
  if (error) return { error: "Erreur lors de la suppression de l'image" }
  return { success: true }
}
