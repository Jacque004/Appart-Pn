import { Header } from "@/components/header"
import { SearchSection } from "@/components/search-section"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="contenu-principal" tabIndex={-1} className="flex-1 outline-none">
        <SearchSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
