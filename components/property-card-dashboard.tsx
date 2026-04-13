"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Eye, MoreVertical, Edit, Trash2, Power, Calendar, MapPin } from "lucide-react"
import { updatePropertyStatus, deleteProperty } from "@/lib/api/properties"

interface PropertyCardProps {
  property: {
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
    is_available: boolean
    created_at: string
    images: Array<{ image_url: string; is_primary: boolean }>
    appointments: Array<{ id: string; status: string }>
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  const primaryImage = property.images.find((img) => img.is_primary) || property.images[0]
  const appointmentsCount = property.appointments.length
  const pendingAppointments = property.appointments.filter((apt) => apt.status === "pending").length

  const handleToggleStatus = async () => {
    setIsUpdatingStatus(true)
    const result = await updatePropertyStatus(property.id, !property.is_available)
    setIsUpdatingStatus(false)

    if (result.error) {
      alert(result.error)
    } else {
      window.location.reload()
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteProperty(property.id)
    setIsDeleting(false)
    setShowDeleteDialog(false)

    if (result.error) {
      alert(result.error)
    } else {
      window.location.reload()
    }
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          {primaryImage ? (
            <img
              src={primaryImage.image_url || "/placeholder.svg"}
              alt={property.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <MapPin className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge variant={property.is_available ? "default" : "secondary"}>
              {property.is_available ? "Disponible" : "Indisponible"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={`/logements/${property.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Voir l'annonce
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/dashboard/annonces/${property.id}/modifier`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleToggleStatus} disabled={isUpdatingStatus}>
                  <Power className="h-4 w-4 mr-2" />
                  {property.is_available ? "Désactiver" : "Activer"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">{property.title}</h3>
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {property.neighborhood}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {property.bedrooms} ch • {property.bathrooms} sdb • {property.surface_area} m²
            </span>
            <span className="font-semibold text-foreground">{property.price.toLocaleString()} FCFA</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{appointmentsCount} RDV</span>
            </div>
            {pendingAppointments > 0 && (
              <Badge variant="secondary" className="text-xs">
                {pendingAppointments} en attente
              </Badge>
            )}
          </div>
          <Button size="sm" variant="outline" asChild>
            <Link to={`/logements/${property.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Voir
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette annonce ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'annonce et toutes ses données (images, rendez-vous) seront définitivement
              supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive">
              {isDeleting ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
