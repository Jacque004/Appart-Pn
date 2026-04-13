import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { GuestRoute } from "@/components/guest-route"
import { ProtectedRoute } from "@/components/protected-route"
import { ConnexionPage } from "./pages/ConnexionPage"
import { DashboardAnnoncesPage } from "./pages/DashboardAnnoncesPage"
import { DashboardPage } from "./pages/DashboardPage"
import { LogementsPage } from "./pages/LogementsPage"

const AProposPage = lazy(() => import("./pages/AProposPage").then((m) => ({ default: m.AProposPage })))
const CommentCaMarchePage = lazy(() =>
  import("./pages/CommentCaMarchePage").then((m) => ({ default: m.CommentCaMarchePage })),
)
const ConfidentialitePage = lazy(() =>
  import("./pages/ConfidentialitePage").then((m) => ({ default: m.ConfidentialitePage })),
)
const DashboardEditPropertyPage = lazy(() =>
  import("./pages/DashboardEditPropertyPage").then((m) => ({ default: m.DashboardEditPropertyPage })),
)
const DashboardFavorisPage = lazy(() =>
  import("./pages/DashboardFavorisPage").then((m) => ({ default: m.DashboardFavorisPage })),
)
const DashboardProfilPage = lazy(() =>
  import("./pages/DashboardProfilPage").then((m) => ({ default: m.DashboardProfilPage })),
)
const DashboardPublierPage = lazy(() =>
  import("./pages/DashboardPublierPage").then((m) => ({ default: m.DashboardPublierPage })),
)
const DashboardRendezVousPage = lazy(() =>
  import("./pages/DashboardRendezVousPage").then((m) => ({ default: m.DashboardRendezVousPage })),
)
const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })))
const InscriptionPage = lazy(() => import("./pages/InscriptionPage").then((m) => ({ default: m.InscriptionPage })))
const PropertyDetailPage = lazy(() =>
  import("./pages/PropertyDetailPage").then((m) => ({ default: m.PropertyDetailPage })),
)
const SetupPage = lazy(() => import("./pages/SetupPage").then((m) => ({ default: m.SetupPage })))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logements" element={<LogementsPage />} />
        <Route path="/logements/:id" element={<PropertyDetailPage />} />
        <Route path="/a-propos" element={<AProposPage />} />
        <Route path="/comment-ca-marche" element={<CommentCaMarchePage />} />
        <Route path="/confidentialite" element={<ConfidentialitePage />} />
        <Route path="/setup" element={<SetupPage />} />

        <Route
          path="/connexion"
          element={
            <GuestRoute>
              <ConnexionPage />
            </GuestRoute>
          }
        />
        <Route
          path="/inscription"
          element={
            <GuestRoute>
              <InscriptionPage />
            </GuestRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/annonces"
          element={
            <ProtectedRoute>
              <DashboardAnnoncesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/annonces/:id/modifier"
          element={
            <ProtectedRoute>
              <DashboardEditPropertyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/publier"
          element={
            <ProtectedRoute>
              <DashboardPublierPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profil"
          element={
            <ProtectedRoute>
              <DashboardProfilPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/favoris"
          element={
            <ProtectedRoute>
              <DashboardFavorisPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/rendez-vous"
          element={
            <ProtectedRoute>
              <DashboardRendezVousPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
