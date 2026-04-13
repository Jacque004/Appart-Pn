import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Home, Calendar, Eye } from "lucide-react"

interface StatsCardsProps {
  propertiesCount: number
  appointmentsCount: number
  viewsCount: number
}

export function StatsCards({ propertiesCount, appointmentsCount, viewsCount }: StatsCardsProps) {
  const stats = [
    {
      title: "Annonces actives",
      value: propertiesCount,
      icon: Home,
      color: "text-primary",
    },
    {
      title: "Rendez-vous en attente",
      value: appointmentsCount,
      icon: Calendar,
      color: "text-orange-500",
    },
    {
      title: "Vues totales",
      value: viewsCount,
      icon: Eye,
      color: "text-teal-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <div className={cn("p-3 rounded-full bg-muted", stat.color)}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
