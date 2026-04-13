"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Home, Calendar, Heart, User, Plus } from "lucide-react"

const navItems = [
  { title: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { title: "Mes annonces", href: "/dashboard/annonces", icon: Home },
  { title: "Publier une annonce", href: "/dashboard/publier", icon: Plus },
  { title: "Rendez-vous", href: "/dashboard/rendez-vous", icon: Calendar },
  { title: "Favoris", href: "/dashboard/favoris", icon: Heart },
  { title: "Mon profil", href: "/dashboard/profil", icon: User },
]

export function DashboardNav() {
  const { pathname } = useLocation()

  return (
    <nav className="bg-card rounded-lg border border-border p-4 sticky top-20">
      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
