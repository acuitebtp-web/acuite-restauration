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
                Les présentes Conditions Générales de Vente (CGV) régissent l'utilisation des services payants proposés par Costyfood via le site costyfood.fr. Tout accès à un plan payant implique l'acceptation pleine et entière des présentes CGV.
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">2. Services proposés</h2>
              <p>Costyfood propose trois plans d'abonnement :</p>
              <div className="mt-3 space-y-2">
                {[
                  { plan: 'Gratuit', desc: '3 plats sauvegardés, 3 calculs IA, accès au calculateur food cost. Sans engagement.' },
                  { plan: 'Pro — 15€ HT/mois', desc: 'Plats illimités, IA illimitée, export PDF, analyse de carte, prix fournisseurs personnalisés. Engagement annuel disponible à 12€ HT/mois (144€ HT/an).' },
                  { plan: 'Multi — 30€ HT/mois', desc: "Tout le plan Pro + jusqu'à 5 établissements, partage d'équipe, support prioritaire. Engagement annuel disponible à 24€ HT/mois (288€ HT/an)." },
                ].map(({ plan, desc }) => (
                  <div key={plan} className="bg-white border border-brun-pale rounded-xl p-4 text-sm">
                    <strong className="text-brun">{plan}</strong><br />{desc}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">3. Tarifs, facturation et reconduction automatique</h2>
              <p className="mb-3">
                Les prix sont indiqués en euros hors taxes (HT). La TVA applicable est celle en vigueur au moment de la souscription.
              </p>
              <p className="mb-3">
                <strong>Abonnement mensuel :</strong> la facturation est mensuelle et se renouvelle automatiquement chaque mois à la date anniversaire de la souscription, jusqu'à résiliation explicite par le client. Le montant est prélevé via <strong>Stripe</strong> sur le moyen de paiement enregistré lors de la souscription.
              </p>
              <p className="mb-3">
                <strong>Abonnement annuel :</strong> la facturation est annuelle et se renouvelle automatiquement chaque année à la date anniversaire, jusqu'à résiliation. Le montant annuel est prélevé en une seule fois.
              </p>
              <p>
                Une facture est émise par email à chaque renouvellement. Le client est informé de tout renouvellement imminent par email au moins 7 jours avant la date de prélèvement.
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
                Vous pouvez résilier votre abonnement à tout moment depuis votre espace "Facturation". La résiliation prend effet à la fin de la période en cours — aucun remboursement au prorata n'est effectué. Toutefois, dans le cadre de notre garantie satisfait ou remboursé, tout abonnement peut être remboursé intégralement dans les <strong>14 premiers jours</strong> suivant la souscription, sur simple demande à contact@costyfood.fr.
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
              <p>Pour toute question relative à ces CGV : <a href="mailto:contact@costyfood.fr" className="text-orange underline">contact@costyfood.fr</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
