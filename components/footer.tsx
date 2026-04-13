import { Link } from "react-router-dom"
import { Building2, Facebook, Instagram, Mail, Phone } from "lucide-react"
import { SITE_CONTACT_EMAIL } from "@/lib/site-config"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">AppartPN</span>
            </div>
            <p className="text-sm text-muted-foreground text-balance">
              La plateforme de location de logements entre particuliers à Pointe-Noire
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/a-propos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/logements" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tous les logements
                </Link>
              </li>
              <li>
                <Link
                  to="/comment-ca-marche"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/dashboard/publier" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Publier une annonce
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/confidentialite" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  to="/confidentialite"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +242 06 XXX XX XX
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" aria-hidden />
                <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="hover:text-primary transition-colors break-all">
                  {SITE_CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 AppartPN. Tous droits réservés. Pointe-Noire, République du Congo
          </p>
        </div>
      </div>
    </footer>
  )
}
