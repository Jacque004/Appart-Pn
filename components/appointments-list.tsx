"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, Check, X } from "lucide-react"
import { updateAppointmentStatus } from "@/lib/api/appointments"
import type { Appointment } from "@/lib/supabase/types"

interface AppointmentsListProps {
  appointments: Appointment[]
  currentUserId: string
  onUpdated?: () => void
}

export function AppointmentsList({ appointments, currentUserId, onUpdated }: AppointmentsListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function handleStatusUpdate(appointmentId: string, status: "confirmed" | "cancelled") {
    setLoadingId(appointmentId)
    await updateAppointmentStatus(appointmentId, status)
    onUpdated?.()
    setLoadingId(null)
  }

  if (appointments.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Aucun rendez-vous pour le moment.</p>
      </Card>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      pending: { variant: "secondary", label: "En attente" },
      confirmed: { variant: "default", label: "Confirmé" },
      cancelled: { variant: "destructive", label: "Annulé" },
      completed: { variant: "outline", label: "Terminé" },
    }

    const config = variants[status] || variants.pending

    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const isOwner = appointment.owner_id === currentUserId
        const otherUser = isOwner ? appointment.tenant : appointment.owner
        const date = new Date(appointment.appointment_date)

        return (
          <Card key={appointment.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-1">{appointment.property?.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{appointment.property?.neighborhood}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>
                      {isOwner ? "Demandé par" : "Propriétaire"}: {otherUser?.full_name || "Utilisateur"}
                    </span>
                  </div>
                </div>
              </div>
              {getStatusBadge(appointment.status)}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {date.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-muted-foreground">
                  à {date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>

            {appointment.message && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">Message:</p>
                <p className="text-sm text-foreground">{appointment.message}</p>
              </div>
            )}

            {isOwner && appointment.status === "pending" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleStatusUpdate(appointment.id, "confirmed")}
                  disabled={loadingId === appointment.id}
                  className="flex-1"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Confirmer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusUpdate(appointment.id, "cancelled")}
                  disabled={loadingId === appointment.id}
                  className="flex-1 text-destructive hover:text-destructive bg-transparent"
                >
                  <X className="h-4 w-4 mr-2" />
                  Refuser
                </Button>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
