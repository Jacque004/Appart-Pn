import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignupForm } from "@/components/signup-form"

export function InscriptionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="contenu-principal" tabIndex={-1} className="flex-1 bg-muted/30 flex items-center justify-center py-12 px-4 outline-none">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Inscription</h1>
            <p className="text-muted-foreground">Créez votre compte AppartPN</p>
          </div>
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
