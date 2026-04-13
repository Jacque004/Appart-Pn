"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { MobileMenu } from "@/components/mobile-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const { user } = useAuth()

  const profile = user?.profile as { user_type?: string } | null | undefined
  const showPublishLink = user && (profile?.user_type === "owner" || profile?.user_type === "both")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background backdrop-blur-md shadow-sm">
      <a
        href="#contenu-principal"
        className="fixed left-4 top-4 z-[60] -translate-y-[200%] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Aller au contenu principal
      </a>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">AppartPN</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/logements" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Logements
          </Link>
          <Link to="/a-propos" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            À propos
          </Link>
          <Link
            to="/comment-ca-marche"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Comment ça marche
          </Link>
          {showPublishLink && (
            <Link
              to="/dashboard/publier"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Publier une annonce
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-foreground" asChild>
                <Link to="/connexion">Connexion</Link>
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link to="/inscription">Inscription</Link>
              </Button>
            </>
          )}
        </div>

        <MobileMenu user={user} showPublishLink={!!showPublishLink} />
      </div>
    </header>
  )
}
