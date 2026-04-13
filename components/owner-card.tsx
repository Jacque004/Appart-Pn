import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, CheckCircle2 } from "lucide-react"

interface OwnerCardProps {
  owner: {
    name: string
    phone: string
    email: string
    memberSince: string
    verified: boolean
  }
}

export function OwnerCard({ owner }: OwnerCardProps) {
  const initials = owner.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Propriétaire</h3>

      <div className="flex items-start gap-4 mb-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground">{owner.name}</h4>
            {owner.verified && (
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Vérifié
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Membre depuis {owner.memberSince}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
          <a href={`tel:${owner.phone}`}>
            <Phone className="h-4 w-4 mr-2" />
            {owner.phone}
          </a>
        </Button>

        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
          <a href={`mailto:${owner.email}`}>
            <Mail className="h-4 w-4 mr-2" />
            Envoyer un message
          </a>
        </Button>
      </div>
    </div>
  )
}
