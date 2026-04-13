"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { updateProperty, deletePropertyImage } from "@/lib/api/properties"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X } from "lucide-react"
import type { Property } from "@/lib/supabase/types"

interface EditPropertyFormProps {
  property: Property
}

const amenitiesList = [
  "Climatisation",
  "Parking",
  "Jardin",
  "Piscine",
  "Sécurité 24h",
  "Cuisine équipée",
  "Eau courante",
  "Électricité",
  "Internet",
  "Terrasse",
  "Balcon",
  "Garage",
]

const neighborhoods = [
  "Centre-ville",
  "Mpita",
  "Tié-Tié",
  "Lumumba",
  "Mongo-Mpoukou",
  "Base",
  "Ngoyo",
  "Tchimbamba",
  "Loandjili",
  "Côte Sauvage",
]

function normalizePropertyType(dbType: string | undefined) {
  if (!dbType) return ""
  return dbType === "appartement" ? "apartment" : dbType
}

export function EditPropertyForm({ property }: EditPropertyFormProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [propertyType, setPropertyType] = useState(() => normalizePropertyType(property.property_type))
  const [neighborhood, setNeighborhood] = useState(property.neighborhood || "")

  const existingAmenities = property.amenities?.map((a) => a.amenity) || []
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(existingAmenities)

  const [existingImages, setExistingImages] = useState(property.images || [])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
    const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"]

    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`Le fichier ${file.name} est trop volumineux (max 5MB)`)
        return false
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`Le fichier ${file.name} n'est pas une image valide (JPG, JPEG, PNG uniquement)`)
        return false
      }
      return true
    })

    const totalImages = existingImages.length + imageFiles.length + validFiles.length
    if (totalImages > 10) {
      alert("Vous ne pouvez pas avoir plus de 10 images au total")
      return
    }

    const newFiles = [...imageFiles, ...validFiles]
    setImageFiles(newFiles)

    imagePreviews.forEach((url) => URL.revokeObjectURL(url))

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
    setImagePreviews(newPreviews)
  }

  function removeNewImage(index: number) {
    URL.revokeObjectURL(imagePreviews[index])

    const newFiles = imageFiles.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setImageFiles(newFiles)
    setImagePreviews(newPreviews)
  }

  async function removeExistingImage(imageId: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return

    setIsLoading(true)
    const result = await deletePropertyImage(imageId)

    if (result.error) {
      alert(result.error)
    } else {
      setExistingImages(existingImages.filter((img) => img.id !== imageId))
    }
    setIsLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!propertyType || !neighborhood) {
      alert("Veuillez sélectionner le type de logement et le quartier.")
      return
    }

    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.set("propertyType", propertyType)
    formData.set("neighborhood", neighborhood)
    formData.append("amenities", JSON.stringify(selectedAmenities))

    imageFiles.forEach((file) => {
      formData.append("images", file)
    })

    try {
      const result = await updateProperty(property.id, formData)

      if (result.error) {
        alert(result.error)
      } else {
        navigate("/dashboard/annonces")
      }
    } catch (error) {
      console.error("[v0] Error updating property:", error)
      alert("Une erreur est survenue lors de la mise à jour")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Titre de l'annonce</Label>
            <Input
              id="title"
              name="title"
              defaultValue={property.title}
              placeholder="Ex: Villa moderne avec piscine à Mpita"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={property.description || ""}
              placeholder="Décrivez votre logement en détail..."
              rows={5}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="propertyType">Type de logement</Label>
              <Select value={propertyType} onValueChange={setPropertyType} required disabled={isLoading}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Appartement</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Prix mensuel (FCFA)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={property.price}
                placeholder="450000"
                required
                min="0"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Chambres</Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                defaultValue={property.bedrooms}
                placeholder="3"
                required
                min="0"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="bathrooms">Salles de bain</Label>
              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                defaultValue={property.bathrooms}
                placeholder="2"
                required
                min="0"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="surfaceArea">Surface (m²)</Label>
              <Input
                id="surfaceArea"
                name="surfaceArea"
                type="number"
                defaultValue={property.surface_area}
                placeholder="120"
                required
                min="0"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Adresse complète</Label>
            <Input
              id="address"
              name="address"
              defaultValue={property.address}
              placeholder="15 Avenue de la Liberté"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="neighborhood">Quartier</Label>
            <Select value={neighborhood} onValueChange={setNeighborhood} required disabled={isLoading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un quartier" />
              </SelectTrigger>
              <SelectContent>
                {neighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Photos du logement</Label>
            <div className="mt-2 space-y-4">
              {existingImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImages.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.image_url || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(image.id)}
                        className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isLoading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {image.is_primary && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                          Photo principale
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Ajouter des photos</span> ou glissez-déposez
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, JPEG (max 5MB par image)</p>
                  </div>
                  <input
                    id="images"
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg"
                    multiple
                    onChange={handleImageChange}
                    disabled={isLoading || existingImages.length + imageFiles.length >= 10}
                  />
                </label>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Nouvelle image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isLoading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                        Nouvelle
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="virtualTourUrl">Visite virtuelle 3D (optionnel)</Label>
            <Input
              id="virtualTourUrl"
              name="virtualTourUrl"
              type="url"
              defaultValue={property.virtual_tour_url || ""}
              placeholder="https://exemple.com/visite-virtuelle"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ajoutez un lien vers une visite virtuelle 3D (Matterport, Kuula, etc.)
            </p>
          </div>

          <div>
            <Label>Équipements</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedAmenities([...selectedAmenities, amenity])
                      } else {
                        setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
                      }
                    }}
                    disabled={isLoading}
                  />
                  <Label htmlFor={amenity} className="text-sm font-normal cursor-pointer">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Enregistrement…" : "Enregistrer cette annonce"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={isLoading}>
            Annuler
          </Button>
        </div>
      </Card>
    </form>
  )
}
