import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SITE_CONTACT_EMAIL } from "@/lib/site-config"
import { Shield, Lock, Eye, UserCheck, Cookie, Database, Mail } from "lucide-react"

export function ConfidentialitePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main id="contenu-principal" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12 outline-none">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Politique de Confidentialité</h1>
            <p className="text-muted-foreground text-lg">Dernière mise à jour : Janvier 2025</p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <p className="text-muted-foreground leading-relaxed mb-4">
              AppartPN s'engage à protéger la confidentialité et la sécurité de vos données personnelles. Cette
              politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos
              informations lorsque vous utilisez notre plateforme de location de logements à Pointe-Noire, République du
              Congo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En utilisant AppartPN, vous acceptez les pratiques décrites dans cette politique. Si vous n'acceptez pas
              ces conditions, veuillez ne pas utiliser notre service.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Données que nous collectons</h2>
              </div>
            </div>

            <div className="space-y-4 ml-16">
              <div>
                <h3 className="font-semibold text-foreground mb-2">1.1 Informations de compte</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lorsque vous créez un compte, nous collectons votre nom complet, adresse e-mail, numéro de téléphone,
                  et type de compte (propriétaire ou locataire).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">1.2 Informations sur les annonces</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Si vous publiez une annonce, nous collectons les détails du logement (description, prix, localisation,
                  photos, équipements) et les informations de contact.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">1.3 Données d'utilisation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nous collectons automatiquement des informations sur votre utilisation de la plateforme, incluant les
                  pages visitées, les recherches effectuées, et les interactions avec les annonces.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">1.4 Données techniques</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nous collectons des informations techniques telles que votre adresse IP, type de navigateur, système
                  d'exploitation, et identifiants d'appareil.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Utilisation de vos données</h2>
              </div>
            </div>

            <div className="ml-16">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous utilisons vos données personnelles pour :
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Créer et gérer votre compte utilisateur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Publier et gérer vos annonces de logements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Faciliter la communication entre propriétaires et locataires</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Gérer les rendez-vous de visite et les réservations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Améliorer nos services et personnaliser votre expérience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Vous envoyer des notifications importantes concernant votre compte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Prévenir la fraude et assurer la sécurité de la plateforme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Respecter nos obligations légales</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Partage de vos données</h2>
              </div>
            </div>

            <div className="ml-16">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations dans les cas
                suivants :
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Avec d'autres utilisateurs :</strong> Les informations de vos
                    annonces sont visibles publiquement. Vos coordonnées peuvent être partagées avec les utilisateurs
                    intéressés par votre logement.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Prestataires de services :</strong> Nous travaillons avec des
                    fournisseurs tiers pour l'hébergement, l'analyse, et les communications.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Obligations légales :</strong> Nous pouvons divulguer vos
                    données si requis par la loi ou pour protéger nos droits.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Sécurité de vos données</h2>
              </div>
            </div>

            <div className="ml-16">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger
                vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction :
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Chiffrement des données sensibles en transit et au repos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Authentification sécurisée et gestion des accès</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Surveillance et audits de sécurité réguliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Formation du personnel sur la protection des données</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Cependant, aucune méthode de transmission sur Internet n'est totalement sécurisée. Nous ne pouvons
                garantir une sécurité absolue de vos données.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Vos droits</h2>
              </div>
            </div>

            <div className="ml-16">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Droit d'accès :</strong> Vous pouvez demander une copie de vos
                    données personnelles
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Droit de rectification :</strong> Vous pouvez corriger vos
                    données inexactes ou incomplètes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Droit de suppression :</strong> Vous pouvez demander la
                    suppression de vos données dans certaines conditions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Droit d'opposition :</strong> Vous pouvez vous opposer au
                    traitement de vos données à des fins de marketing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Droit à la portabilité :</strong> Vous pouvez recevoir vos
                    données dans un format structuré
                  </span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à l'adresse :
                <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-primary hover:underline ml-1 break-all">
                  {SITE_CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies et technologies similaires</h2>
              </div>
            </div>

            <div className="ml-16">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre
                plateforme. Les cookies sont de petits fichiers texte stockés sur votre appareil.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous utilisons les types de cookies suivants :
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Cookies essentiels :</strong> Nécessaires au fonctionnement de
                    la plateforme
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Cookies de performance :</strong> Pour analyser l'utilisation et
                    améliorer nos services
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Cookies de fonctionnalité :</strong> Pour mémoriser vos
                    préférences
                  </span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Conservation des données</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et
              respecter nos obligations légales. Lorsque vous supprimez votre compte, nous supprimons ou anonymisons vos
              données personnelles, sauf si nous devons les conserver pour des raisons légales ou de sécurité.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Modifications de cette politique</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Nous vous informerons de
              tout changement important en publiant la nouvelle politique sur cette page et en mettant à jour la date de
              "Dernière mise à jour". Nous vous encourageons à consulter régulièrement cette page pour rester informé de
              nos pratiques de confidentialité.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-muted/50 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Nous contacter</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques de
                  traitement des données, n'hésitez pas à nous contacter :
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Email :</strong>{" "}
                    <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-primary hover:underline break-all">
                      {SITE_CONTACT_EMAIL}
                    </a>
                  </p>
                  <p>
                    <strong className="text-foreground">Téléphone :</strong> +242 06 XXX XX XX
                  </p>
                  <p>
                    <strong className="text-foreground">Adresse :</strong> Pointe-Noire, République du Congo
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
