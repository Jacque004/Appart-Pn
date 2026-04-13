import { Building2, Calendar, Shield, Users } from "lucide-react"

const features = [
  {
    icon: Building2,
    title: "Large choix de logements",
    description: "Villas, appartements et studios dans tous les quartiers de Pointe-Noire",
  },
  {
    icon: Users,
    title: "Contact direct",
    description: "Échangez directement avec les propriétaires sans intermédiaire",
  },
  {
    icon: Calendar,
    title: "Prise de rendez-vous facile",
    description: "Planifiez vos visites en ligne en quelques clics",
  },
  {
    icon: Shield,
    title: "Plateforme sécurisée",
    description: "Vos données et échanges sont protégés",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi choisir AppartPN ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            La première plateforme de location entre particuliers à Pointe-Noire
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-balance">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
