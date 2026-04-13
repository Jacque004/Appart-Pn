import { Building2, Users, MapPin, Calendar, Shield, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function AProposPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="contenu-principal" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">À propos d'AppartPN</h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance">
                La première plateforme de location de logements entre particuliers à Pointe-Noire
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Notre Mission</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    AppartPN est une plateforme de location de logements entre particuliers, spécialement pensée pour
                    Pointe-Noire, capitale économique de la République du Congo, qui compte plus de 1,2 million
                    d'habitants.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Constatant l'absence de site ou d'application permettant de mettre directement en relation
                    propriétaires et personnes en recherche de logement, j'ai voulu créer une solution innovante.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded-2xl p-6 text-center">
                    <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">1.2M+</div>
                    <div className="text-sm text-muted-foreground">Habitants</div>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 text-center">
                    <Building2 className="h-10 w-10 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">100%</div>
                    <div className="text-sm text-muted-foreground">Particuliers</div>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 text-center">
                    <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">PN</div>
                    <div className="text-sm text-muted-foreground">Pointe-Noire</div>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 text-center">
                    <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">Sûr</div>
                    <div className="text-sm text-muted-foreground">Sécurisé</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Problem */}
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-6">
                    <Search className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">La Problématique</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    À Pointe-Noire, il n'existait aucune plateforme permettant aux propriétaires et aux chercheurs de
                    logement de se connecter directement. La recherche d'un appartement ou d'une villa se faisait de
                    manière informelle, sans visibilité ni transparence.
                  </p>
                </div>

                {/* Solution */}
                <div className="bg-card rounded-2xl p-8 border border-primary/20 shadow-lg shadow-primary/5">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Notre Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Grâce à AppartPN, les habitants peuvent consulter en ligne différents types de logements (villas,
                    appartements, studios) avant de prendre rendez-vous pour une visite avec les propriétaires. Simple,
                    rapide et efficace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Comment ça fonctionne ?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Recherchez</h3>
                  <p className="text-muted-foreground text-balance">
                    Parcourez les annonces de villas, appartements et studios disponibles à Pointe-Noire
                  </p>
                </div>

                <div className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Prenez rendez-vous</h3>
                  <p className="text-muted-foreground text-balance">
                    Contactez directement les propriétaires et planifiez une visite du logement
                  </p>
                </div>

                <div className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Trouvez votre logement</h3>
                  <p className="text-muted-foreground text-balance">
                    Visitez et choisissez le logement qui correspond à vos besoins et votre budget
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                Prêt à trouver votre prochain logement ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-balance">
                Rejoignez AppartPN et découvrez les meilleures offres de location à Pointe-Noire
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/logements">Voir les logements</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/dashboard/publier">Publier une annonce</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
