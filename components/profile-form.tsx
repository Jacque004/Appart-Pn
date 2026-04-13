"use client"

import { useState } from "react"
import { updateProfile } from "@/lib/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

interface ProfileFormProps {
  user: {
    email?: string
    profile?: {
      full_name?: string
      phone?: string
      user_type?: string
      avatar_url?: string
    } | null
  }
  onSuccess?: () => void
}

export function ProfileForm({ user, onSuccess }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    const result = await updateProfile(formData)

    setIsLoading(false)

    if (result?.error) {
      setMessage({ type: "error", text: result.error })
    } else {
      setMessage({ type: "success", text: "Profil mis à jour avec succès !" })
      onSuccess?.()
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={user.email || ""} disabled className="bg-muted" />
          <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Nom complet</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            defaultValue={user.profile?.full_name || ""}
            placeholder="Votre nom complet"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={user.profile?.phone || ""}
            placeholder="+242 06 123 45 67"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="userType">Type de compte</Label>
          <Select name="userType" defaultValue={user.profile?.user_type || "tenant"}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre type de compte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tenant">Locataire</SelectItem>
              <SelectItem value="owner">Propriétaire</SelectItem>
              <SelectItem value="both">Propriétaire & Locataire</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="avatarUrl">URL de l'avatar</Label>
          <Input
            id="avatarUrl"
            name="avatarUrl"
            type="url"
            defaultValue={user.profile?.avatar_url || ""}
            placeholder="https://exemple.com/avatar.jpg"
          />
          <p className="text-xs text-muted-foreground">Entrez l'URL d'une image pour votre avatar</p>
        </div>
      </div>

      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Mise à jour en cours...
          </>
        ) : (
          "Enregistrer les modifications"
        )}
      </Button>
    </form>
  )
}
