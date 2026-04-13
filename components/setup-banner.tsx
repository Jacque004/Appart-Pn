import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export function SetupBanner() {
  // The banner will always show until user manually dismisses it after setup
  return (
    <div className="bg-orange-500 text-white py-3 px-4">
      <div className="container mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">La base de données doit être configurée pour utiliser AppartPN</p>
        </div>
        <Button size="sm" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50" asChild>
          <Link to="/setup">Configurer maintenant</Link>
        </Button>
      </div>
    </div>
  )
}
