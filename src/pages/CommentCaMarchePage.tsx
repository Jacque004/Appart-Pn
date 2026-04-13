import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Calendar, Key, Upload, MessageSquare, CheckCircle, Home, Users, Shield, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function CommentCaMarchePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="contenu-principal" tabIndex={-1} className="flex-1 bg-background outline-none">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AppartPN simplifie la location de logements à Pointe-Noire. Que vous soyez propriétaire ou locataire,
              découvrez comment notre plateforme facilite vos démarches.
            </p>
          </div>
        </section>

        {/* Pour les Locataires */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Pour les Locataires</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Trouvez votre logement idéal en quelques clics</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center border-border hover:border-primary transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  1
                </div>
                <Search className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Recherchez</h3>
                <p className="text-muted-foreground text-sm">
                  Parcourez notre catalogue de logements disponibles à Pointe-Noire. Filtrez par quartier, prix, type de
                  bien et équipements.
                </p>
              </Card>

              <Card className="p-6 text-center border-border hover:border-primary transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  2
                </div>
                <Calendar className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Prenez rendez-vous</h3>
                <p className="text-muted-foreground text-sm">
                  Contactez directement le propriétaire et planifiez une visite à la date qui vous convient. Recevez une
                  confirmation instantanée.
                </p>
              </Card>

              <Card className="p-6 text-center border-border hover:border-primary transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  3
                </div>
                <Key className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Visitez et louez</h3>
                <p className="text-muted-foreground text-sm">
                  Visitez le logement, posez vos questions et finalisez votre location directement avec le propriétaire
                  en toute sécurité.
                </p>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button size="lg" asChild>
                <Link to="/logements">Voir les logements disponibles</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pour les Propriétaires */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Pour les Propriétaires</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Louez votre bien rapidement et en toute simplicité
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center border-border hover:border-primary transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  1
                </div>
                <Upload className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Publiez votre annonce</h3>
                <p className="text-muted-foreground text-sm">
                  Créez votre compte propriétaire et publiez votre annonce avec photos, description détaillée et visite
                  virtuelle 3D.
                </p>
              </Card>

              <Card className="p-6 text-center border-border hover:border-primary transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  2
                </div>
                <MessageSquare className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Gérez les demandes</h3>
                <p className="text-muted-foreground text-sm">
                  Recevez les demandes de visite des locataires intéressés. Acceptez ou proposez d'autres créneaux selon
                  votre disponibilité.
                </p>
              </Card>

              <Card className="p-6 text-center border-border hover:border-primary transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  3
                </div>
                <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Louez votre bien</h3>
                <p className="text-muted-foreground text-sm">
                  Organisez les visites, sélectionnez votre locataire idéal et finalisez la location en toute confiance.
                </p>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button size="lg" asChild>
                <Link to="/dashboard/publier">Publier une annonce</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Pourquoi choisir AppartPN ?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Une plateforme moderne et sécurisée pour la location de logements à Pointe-Noire
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Sécurisé</h3>
                <p className="text-muted-foreground">
                  Vos données sont protégées et vos transactions sécurisées. Profils vérifiés pour plus de confiance.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Rapide</h3>
                <p className="text-muted-foreground">
                  Trouvez ou louez un logement en quelques jours seulement. Processus simplifié et efficace.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Local</h3>
                <p className="text-muted-foreground">
                  Spécialisé dans les logements de Pointe-Noire. Connaissance approfondie des quartiers et du marché
                  local.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Rejoignez AppartPN dès aujourd'hui et facilitez votre recherche ou location de logement à Pointe-Noire
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/inscription">Créer un compte</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/logements">Voir les logements</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
