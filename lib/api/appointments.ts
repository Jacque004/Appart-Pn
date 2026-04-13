import { createClient } from "@/lib/supabase/client"

export async function createAppointment(formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: "Vous devez être connecté pour prendre rendez-vous" }
  }

  const propertyId = formData.get("propertyId") as string
  const appointmentDate = formData.get("appointmentDate") as string
  const message = formData.get("message") as string

  const { data: property } = await supabase.from("properties").select("owner_id").eq("id", propertyId).single()

  if (!property) {
    return { error: "Propriété introuvable" }
  }

  const { error } = await supabase.from("appointments").insert({
    property_id: propertyId,
    tenant_id: user.id,
    owner_id: property.owner_id,
    appointment_date: appointmentDate,
    message,
    status: "pending",
  })

  if (error) {
    console.error("[AppartPN] Error creating appointment:", error)
    return { error: "Erreur lors de la création du rendez-vous" }
  }

  return { success: true }
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: "confirmed" | "cancelled" | "completed",
) {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: "Non autorisé" }
  }

  const { error } = await supabase.from("appointments").update({ status }).eq("id", appointmentId)

  if (error) {
    console.error("[AppartPN] Error updating appointment:", error)
    return { error: "Erreur lors de la mise à jour" }
  }

  return { success: true }
}

export async function getAppointments() {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return []
  }

  const { data } = await supabase
    .from("appointments")
    .select(
      `
      *,
      property:properties(*),
      tenant:profiles!appointments_tenant_id_fkey(*),
      owner:profiles!appointments_owner_id_fkey(*)
    `,
    )
    .or(`tenant_id.eq.${user.id},owner_id.eq.${user.id}`)
    .order("appointment_date", { ascending: true })

  return data || []
}
