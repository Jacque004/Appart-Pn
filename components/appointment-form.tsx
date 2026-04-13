"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createAppointment } from "@/lib/api/appointments"
import { Alert } from "@/components/ui/alert"

interface AppointmentFormProps {
  propertyId: string
  onSuccess?: () => void
}

export function AppointmentForm({ propertyId, onSuccess }: AppointmentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    formData.append("propertyId", propertyId)

    const result = await createAppointment(formData)

    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => {
        onSuccess?.()
      }, 1500)
    }
  }

  if (success) {
    return (
      <Alert className="bg-secondary/10 border-secondary text-secondary">
        <p className="font-medium">Rendez-vous demandé avec succès !</p>
        <p className="text-sm mt-1">Le propriétaire vous contactera bientôt.</p>
      </Alert>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <p className="text-sm">{error}</p>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="appointmentDate">Date et heure souhaitées</Label>
        <Input
          id="appointmentDate"
          name="appointmentDate"
          type="datetime-local"
          required
          disabled={isLoading}
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (optionnel)</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Ajoutez un message pour le propriétaire..."
          rows={4}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Envoi..." : "Demander un rendez-vous"}
      </Button>
    </form>
  )
}
