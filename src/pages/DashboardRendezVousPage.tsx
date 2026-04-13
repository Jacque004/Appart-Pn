import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Header } from "@/components/header"
import { DashboardNav } from "@/components/dashboard-nav"
import { AppointmentsList } from "@/components/appointments-list"
import { useAuth } from "@/contexts/auth-context"
import { getAppointments } from "@/lib/api/appointments"
import type { Appointment } from "@/lib/supabase/types"

export function DashboardRendezVousPage() {
  const { user, loading } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const reload = async () => {
    const a = await getAppointments()
    setAppointments((a as Appointment[]) || [])
  }

  useEffect(() => {
    if (user) void reload()
  }, [user])
  if (!user) {
    if (loading) return null
    return <Navigate to="/connexion" replace />
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <DashboardNav />
            </aside>
            <main id="contenu-principal" tabIndex={-1} className="lg:col-span-3 outline-none">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">Mes rendez-vous</h1>
                <p className="text-muted-foreground mt-1">Visites planifiées</p>
              </div>
              <AppointmentsList appointments={appointments} currentUserId={user.id} onUpdated={reload} />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

