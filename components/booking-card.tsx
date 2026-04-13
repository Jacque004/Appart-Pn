"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AppointmentForm } from "@/components/appointment-form"

interface BookingCardProps {
  price: number
  available: boolean
  propertyId: string
}

export function BookingCard({ price, available, propertyId }: BookingCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-primary">{price.toLocaleString("fr-FR")}</span>
          <span className="text-muted-foreground">FCFA / mois</span>
        </div>
        {available ? (
          <p className="text-sm text-secondary font-medium">Disponible immédiatement</p>
        ) : (
          <p className="text-sm text-destructive font-medium">Non disponible</p>
        )}
      </div>

      <div className="space-y-3">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              disabled={!available}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Prendre rendez-vous
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Prendre rendez-vous</DialogTitle>
            </DialogHeader>
            <AppointmentForm propertyId={propertyId} onSuccess={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>

        <p className="text-xs text-center text-muted-foreground">Vous ne serez pas débité maintenant</p>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frais de service</span>
            <span className="text-foreground font-medium">Gratuit</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Caution</span>
            <span className="text-foreground font-medium">À discuter</span>
          </div>
        </div>
      </div>
    </div>
  )
}
