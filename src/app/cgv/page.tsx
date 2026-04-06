import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
}

export default function CgvPage() {
  return (
    <>
      <Nav />
      <div className="pt-28 pb-20 px-4 bg-creme min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-lora text-4xl font-bold text-brun mb-2">Conditions Générales de Vente</h1>
          <p className="text-brun-light mb-10">Dernière mise à jour : avril 2026</p>

          <div className="space-y-8 text-brun-mid leading-relaxed">
            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">1. Objet</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent l'utilisation des services payants proposés par Acuité Restauration via le site acuite-restauration.fr. Tout accès à un plan payant implique l'acceptation pleine et entière des présentes CGV.
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">2. Services proposés</h2>
              <p>Acuité Restauration propose trois plans d'abonnement :</p>
              <div className="mt-3 space-y-2">
                {[
                  { plan: 'Gratuit', desc: '3 plats sauvegardés, 3 calculs IA, accès au calculateur food cost.' },
                  { plan: 'Pro — 19€ HT/mois', desc: 'Plats illimités, IA illimitée, export PDF, analyse de carte, prix fournisseurs personnalisés.' },
                  { plan: 'Multi — 49€ HT/mois', desc: "Tout le plan Pro + jusqu'à 5 établissements, partage d'équipe, support prioritaire." },
                ].map(({ plan, desc }) => (
                  <div key={plan} className="bg-white border border-brun-pale rounded-xl p-4 text-sm">
                    <strong className="text-brun">{plan}</strong><br />{desc}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">3. Tarifs et facturation</h2>
              <p>
                Les prix sont indiqués en euros hors taxes (HT). La TVA applicable est celle en vigueur au moment de la souscription. La facturation est mensuelle et automatique via notre prestataire de paiement <strong>Stripe</strong>. Une facture est émise par email à chaque renouvellement.
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">4. Paiement</h2>
              <p>
                Le paiement s'effectue par carte bancaire via Stripe. Les coordonnées bancaires sont chiffrées et ne sont pas stockées sur nos serveurs. En cas d'échec de paiement, l'abonnement est suspendu après une période de grâce de 7 jours.
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">5. Résiliation et remboursement</h2>
              <p>
                Vous pouvez résilier votre abonnement à tout moment depuis votre espace "Facturation". La résiliation prend effet à la fin de la période en cours — aucun remboursement au prorata n'est effectué. Toutefois, dans le cadre de notre garantie satisfait ou remboursé, tout abonnement peut être remboursé intégralement dans les <strong>14 premiers jours</strong> suivant la souscription, sur simple demande à contact@acuite-restauration.fr.
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">6. Droit de rétractation</h2>
              <p>
                Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation de 14 jours ne s'applique pas aux services numériques dont l'exécution a commencé avec votre accord avant l'expiration du délai. Nous proposons néanmoins une garantie commerciale de remboursement de 14 jours.
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">7. Disponibilité du service</h2>
              <p>
                Nous nous efforçons de maintenir le service disponible 24h/24 et 7j/7. Des interruptions techniques peuvent survenir pour maintenance. Nous ne saurions être tenus responsables des interruptions liées à des tiers (hébergeur, fournisseur IA, etc.).
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">8. Loi applicable</h2>
              <p>
                Les présentes CGV sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux de France seront seuls compétents.
              </p>
            </section>

            <div className="bg-sauge-pale border border-sauge-light rounded-2xl p-5 text-sm">
              <p className="font-semibold text-brun mb-1">Contact</p>
              <p>Pour toute question relative à ces CGV : <a href="mailto:contact@acuite-restauration.fr" className="text-orange underline">contact@acuite-restauration.fr</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
