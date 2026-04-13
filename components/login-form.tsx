"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@/components/ui/alert"
import { signInWithPassword } from "@/lib/api/auth"
import { useAuth } from "@/contexts/auth-context"

type ConnexionLocationState = {
  from?: { pathname?: string; search?: string; hash?: string }
}

export function LoginForm() {
  const { refreshUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    const result = await signInWithPassword(formData)
    setPending(false)
    if (result.error) {
      setError(result.error)
      return
    }
    if (result.success && result.redirectTo) {
      await refreshUser()
      const state = location.state as ConnexionLocationState | null
      const fromPath = state?.from?.pathname
      const fromSearch = state?.from?.search ?? ""
      const fromHash = state?.from?.hash ?? ""
      const safeFrom = fromPath && fromPath.startsWith("/") ? `${fromPath}${fromSearch}${fromHash}` : null
      navigate(safeFrom ?? result.redirectTo ?? "/dashboard", { replace: true })
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border p-8">
      <form action={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <p className="text-sm">{error}</p>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="votre@email.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" name="password" type="password" placeholder="••••••••" required />
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Connexion..." : "Se connecter"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link to="/inscription" className="text-primary hover:underline">
            S&apos;inscrire
          </Link>
        </div>
      </form>
    </div>
  )
}
