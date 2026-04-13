"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileThemePicker } from "@/components/mobile-theme-picker"
import { signOut } from "@/lib/api/auth"

interface MobileMenuProps {
  user: any
  showPublishLink: boolean
}

export function MobileMenu({ user, showPublishLink }: MobileMenuProps) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className="md:hidden p-2 text-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={isOpen}
        aria-controls="navigation-mobile"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
            aria-hidden
          />

          <div
            id="navigation-mobile"
            className="fixed top-16 left-0 right-0 bg-background border-b border-border z-50 md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4" aria-label="Navigation principale">
              <Link
                to="/logements"
                className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={closeMenu}
              >
                Logements
              </Link>
              <Link
                to="/a-propos"
                className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={closeMenu}
              >
                À propos
              </Link>
              <Link
                to="/comment-ca-marche"
                className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={closeMenu}
              >
                Comment ça marche
              </Link>
              {showPublishLink && (
                <Link
                  to="/dashboard/publier"
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={closeMenu}
                >
                  Publier une annonce
                </Link>
              )}

              <MobileThemePicker />

              <div className="pt-4 border-t border-border flex flex-col gap-3">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={closeMenu}>
                      <Button variant="outline" className="w-full bg-transparent">
                        Mon Dashboard
                      </Button>
                    </Link>
                    <Link to="/dashboard/profil" onClick={closeMenu}>
                      <Button variant="ghost" className="w-full">
                        Mon Profil
                      </Button>
                    </Link>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      disabled={signingOut}
                      onClick={async () => {
                        setSigningOut(true)
                        try {
                          await signOut()
                          closeMenu()
                          navigate("/", { replace: true })
                        } finally {
                          setSigningOut(false)
                        }
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {signingOut ? "Déconnexion…" : "Déconnexion"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/connexion" onClick={closeMenu}>
                      <Button variant="ghost" className="w-full">
                        Connexion
                      </Button>
                    </Link>
                    <Link to="/inscription" onClick={closeMenu}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Inscription
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
