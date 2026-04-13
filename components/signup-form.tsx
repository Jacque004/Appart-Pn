"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { signUp } from "@/lib/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"

export function SignupForm() {
  const navigate = useNavigate()
  const { refreshUser } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("tenant")

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    formData.append("userType", userType)

    const result = await signUp(formData)

    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }
    if (result && "success" in result && result.success) {
      if ("requiresEmailConfirmation" in result && result.requiresEmailConfirmation) {
        setSuccessMessage(
          (result as { message?: string }).message ??
            "Inscription reussie. Verifiez votre boite email pour confirmer votre compte.",
        )
        setIsLoading(false)
        return
      }
      await refreshUser()
      navigate((result as { redirectTo?: string }).redirectTo ?? "/dashboard")
    }
    setIsLoading(false)
  }

  return (
    <div className="bg-card rounded-lg border border-border p-8">
      <form action={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <p className="text-sm">{error}</p>
          </Alert>
        )}
        {successMessage && (
          <Alert>
            <p className="text-sm">{successMessage}</p>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="fullName">Nom complet</Label>
          <Input id="fullName" name="fullName" type="text" placeholder="Jean Makaya" required disabled={isLoading} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+242 06 XXX XX XX" required disabled={isLoading} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="votre@email.com" required disabled={isLoading} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="userType">Type de compte</Label>
          <Select value={userType} onValueChange={setUserType} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tenant">Locataire</SelectItem>
              <SelectItem value="owner">Propriétaire</SelectItem>
              <SelectItem value="both">Les deux</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Inscription..." : "S'inscrire"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link to="/connexion" className="text-primary hover:underline">
            Se connecter
          </Link>
        </div>
      </form>
    </div>
  )
}
