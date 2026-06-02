import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
}

export default function ConfidentialitePage() {
  return (
    <>
      <Nav />
      <div className="pt-28 pb-20 px-4 bg-creme min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-lora text-4xl font-bold text-brun mb-2">Politique de confidentialité</h1>
          <p className="text-brun-light mb-10">Dernière mise à jour : avril 2026 — Conforme RGPD</p>

          <div className="space-y-8 text-brun-mid leading-relaxed">
            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">1. Responsable du traitement</h2>
              <div className="bg-white border border-brun-pale rounded-2xl p-5 text-sm space-y-1">
                <p><strong>Costyfood</strong></p>
                <p>Email : contact@costyfood.fr</p>
                <p>Responsable : Basile Bonnin</p>
              </div>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">2. Données collectées</h2>
              <div className="space-y-3">
                {[
                  { cat: 'Données de compte', items: ['Adresse email', 'Mot de passe (haché, jamais en clair)', 'Date de création du compte'] },
                  { cat: 'Données d\'utilisation', items: ['Plats et ingrédients saisis', 'Prix personnalisés', 'Analyse de carte', 'Popularité des plats'] },
                  { cat: 'Données de paiement', items: ['Géré exclusivement par Stripe — nous ne stockons aucune donnée bancaire', 'Identifiant client Stripe (stripe_customer_id)'] },
                  { cat: 'Données techniques', items: ['Logs de connexion', 'Adresse IP (hébergeur Vercel)'] },
                ].map(({ cat, items }) => (
                  <div key={cat} className="bg-white border border-brun-pale rounded-xl p-4 text-sm">
                    <p className="font-semibold text-brun mb-2">{cat}</p>
                    <ul className="list-disc list-inside space-y-1 text-brun-light">
                      {items.map(i => <li key={i}>{i}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">3. Finalités du traitement</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Fourniture du service de calcul food cost</li>
                <li>Gestion de votre compte et de votre abonnement</li>
                <li>Envoi des factures et emails transactionnels</li>
                <li>Amélioration du service (analyse agrégée et anonymisée)</li>
                <li>Respect de nos obligations légales et comptables</li>
              </ul>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">4. Base légale</h2>
              <p>
                Le traitement de vos données est fondé sur l'exécution du contrat (votre abonnement), votre consentement (emails marketing si applicable), et nos obligations légales (comptabilité, TVA).
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">5. Conservation des données</h2>
              <p>
                Vos données sont conservées pendant toute la durée de votre compte, puis supprimées dans un délai de 30 jours après résiliation, sauf obligation légale de conservation plus longue (données comptables : 10 ans).
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">6. Sous-traitants</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { name: 'Supabase', role: 'Base de données & authentification', pays: 'UE' },
                  { name: 'Vercel', role: 'Hébergement', pays: 'USA (SCCs)' },
                  { name: 'Stripe', role: 'Paiement', pays: 'USA (SCCs)' },
                ].map(({ name, role, pays }) => (
                  <div key={name} className="bg-white border border-brun-pale rounded-xl p-3 text-sm text-center">
                    <p className="font-bold text-brun">{name}</p>
                    <p className="text-brun-light text-xs mt-1">{role}</p>
                    <span className="inline-block bg-brun-pale text-brun-mid text-xs px-2 py-0.5 rounded-full mt-1">{pays}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">7. Vos droits (RGPD)</h2>
              <p className="mb-3">Conformément au RGPD, vous disposez des droits suivants :</p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                {[
                  { droit: 'Accès', desc: 'Obtenir une copie de vos données' },
                  { droit: 'Rectification', desc: 'Corriger des données inexactes' },
                  { droit: 'Suppression', desc: 'Supprimer votre compte et vos données' },
                  { droit: 'Portabilité', desc: 'Exporter vos données en JSON/CSV' },
                  { droit: 'Opposition', desc: "Vous opposer à certains traitements" },
                  { droit: 'Limitation', desc: 'Limiter le traitement de vos données' },
                ].map(({ droit, desc }) => (
                  <div key={droit} className="bg-white border border-brun-pale rounded-xl p-3">
                    <p className="font-semibold text-brun">Droit d'{droit.toLowerCase()}</p>
                    <p className="text-brun-light text-xs mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm">
                Pour exercer ces droits : <a href="mailto:contact@costyfood.fr" className="text-orange underline">contact@costyfood.fr</a>. Réponse sous 30 jours. Vous pouvez également saisir la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-orange underline">CNIL</a>.
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">8. Cookies</h2>
              <p>
                Nous utilisons uniquement des cookies fonctionnels strictement nécessaires (authentification via Supabase). Aucun cookie publicitaire ou analytique tiers n'est déposé.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
