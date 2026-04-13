import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Vous êtes propriétaire ?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 text-balance">
            Publiez votre annonce gratuitement et trouvez des locataires rapidement
          </p>
          <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
            <Link to="/dashboard/publier">
              Publier une annonce
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
