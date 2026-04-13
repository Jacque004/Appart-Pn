export type PropertyType = "villa" | "apartment" | "appartement" | "studio"
export type UserType = "owner" | "tenant" | "both"
export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed"

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  user_type: UserType
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  owner_id: string
  title: string
  description: string | null
  property_type: PropertyType
  price: number
  bedrooms: number
  bathrooms: number
  surface_area: number
  address: string
  neighborhood: string
  city: string
  latitude: number | null
  longitude: number | null
  virtual_tour_url?: string | null
  is_available: boolean
  created_at: string
  updated_at: string
  owner?: Profile
  images?: PropertyImage[]
  amenities?: PropertyAmenity[]
}

export interface PropertyImage {
  id: string
  property_id: string
  image_url: string
  is_primary: boolean
  display_order: number
  created_at: string
}

export interface PropertyAmenity {
  id: string
  property_id: string
  amenity: string
  created_at: string
}

export interface Appointment {
  id: string
  property_id: string
  tenant_id: string
  owner_id: string
  appointment_date: string
  status: AppointmentStatus
  message: string | null
  created_at: string
  updated_at: string
  property?: Property
  tenant?: Profile
  owner?: Profile
}

export interface Favorite {
  id: string
  user_id: string
  property_id: string
  created_at: string
  property?: Property
}
