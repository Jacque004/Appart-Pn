import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { CheckCircle2, FileCode } from "lucide-react"

export function SetupPage() {
  // User will manually verify setup by testing the app after running scripts

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-teal-50 p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuration d'AppartPN</h1>
            <p className="text-gray-600">Bienvenue ! Votre base de données doit être initialisée avant de commencer.</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-blue-900 mb-3">Qu'est-ce qui va être créé ?</h2>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Table profiles</strong> - Pour stocker les informations des utilisateurs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Table properties</strong> - Pour les annonces de logements
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Table appointments</strong> - Pour les rendez-vous de visite
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Table neighborhoods</strong> - Pour les quartiers de Pointe-Noire
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Row Level Security</strong> - Pour sécuriser vos données
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <FileCode className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-900 mb-2">Instructions d'installation</h3>
                <p className="text-orange-800 text-sm mb-4">
                  Pour configurer la base de données, vous devez exécuter les scripts SQL dans l'ordre suivant :
                </p>
                <ol className="space-y-3 text-orange-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold min-w-[1.5rem]">1.</span>
                    <div>
                      <strong>01-create-tables.sql</strong>
                      <p className="text-xs mt-1">
                        Crée toutes les tables nécessaires (profiles, properties, appointments, neighborhoods)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold min-w-[1.5rem]">2.</span>
                    <div>
                      <strong>02-enable-rls.sql</strong>
                      <p className="text-xs mt-1">Active la sécurité Row Level Security avec les politiques d'accès</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold min-w-[1.5rem]">3.</span>
                    <div>
                      <strong>03-seed-data.sql</strong>
                      <p className="text-xs mt-1">
                        Insère les données initiales (8 propriétés d'exemple dans différents quartiers)
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            <div className="bg-orange-100 rounded p-4 mt-4">
              <p className="text-sm text-orange-900 font-medium mb-2">Comment exécuter les scripts :</p>
              <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
                <li>Via l'interface v0 : Cliquez sur les boutons d'exécution à côté de chaque script</li>
                <li>
                  Via Supabase : Ouvrez le SQL Editor dans votre dashboard Supabase et collez le contenu de chaque
                  script
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 text-lg"
              asChild
            >
              <Link to="/">Retour à l&apos;accueil</Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500 text-center mt-6">
            Une fois les scripts exécutés, testez l'application en créant un compte ou en publiant une annonce.
          </p>
        </div>
      </div>
    </div>
  )
}
