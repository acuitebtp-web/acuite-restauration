import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <>
      <Nav />

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-4 bg-creme">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-orange-pale text-orange text-sm font-semibold px-3 py-1 rounded-full mb-5">
              Basé sur les cotations FranceAgriMer
            </span>
            <h1 className="font-lora text-5xl lg:text-6xl font-bold text-brun leading-tight mb-5">
              Calculez votre<br />
              <em className="text-orange not-italic">food cost</em><br />
              en 30 secondes
            </h1>
            <p className="text-brun-mid text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Saisissez votre plat, l'IA génère les ingrédients, vous obtenez le coût matière, la marge et le prix conseillé — en temps réel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/outil">
                <button className="btn-primary text-base px-8 py-4">
                  Essayer gratuitement — sans CB
                </button>
              </Link>
              <Link href="/tarifs">
                <button className="btn-secondary text-base px-8 py-4">
                  Voir les tarifs
                </button>
              </Link>
            </div>
            <p className="text-brun-light text-sm mt-4">Gratuit pour 3 plats · Pro dès 19€/mois</p>
          </div>

          {/* Preview outil */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="bg-white rounded-2xl shadow-xl border border-brun-pale p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-orange-light" />
                <div className="w-3 h-3 rounded-full bg-sauge-light" />
                <span className="ml-2 text-xs text-brun-light">acuite-restauration.fr/outil</span>
              </div>
              <div className="space-y-3">
                <div className="bg-creme rounded-xl p-3 text-sm text-brun-light italic">
                  "Magret de canard aux cerises, sauce au porto..."
                </div>
                <div className="h-0.5 bg-brun-pale" />
                <div className="space-y-2">
                  {[
                    { name: 'Canard - Magret', qty: '180g', cost: '3,96 €', pct: 62 },
                    { name: 'Cerises', qty: '80g', cost: '0,48 €', pct: 22 },
                    { name: 'Porto rouge', qty: '40g', cost: '0,48 €', pct: 10 },
                    { name: 'Beurre doux', qty: '20g', cost: '0,18 €', pct: 6 },
                  ].map(ing => (
                    <div key={ing.name} className="flex items-center gap-2">
                      <span className="text-xs text-brun flex-1">{ing.name}</span>
                      <span className="text-xs text-brun-light">{ing.qty}</span>
                      <div className="w-16 h-1.5 bg-brun-pale rounded-full overflow-hidden">
                        <div className="h-full bg-orange-light rounded-full" style={{ width: `${ing.pct}%` }} />
                      </div>
                      <span className="text-xs font-medium text-brun w-12 text-right">{ing.cost}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="bg-creme rounded-xl p-2.5 text-center">
                    <p className="text-xs text-brun-light">Coût</p>
                    <p className="font-bold text-brun text-sm">5,10 €</p>
                  </div>
                  <div className="bg-orange rounded-xl p-2.5 text-center">
                    <p className="text-xs text-white/70">Prix conseillé</p>
                    <p className="font-bold text-white text-sm">17,00 €</p>
                  </div>
                  <div className="bg-sauge-pale rounded-xl p-2.5 text-center">
                    <p className="text-xs text-sauge/70">Marge</p>
                    <p className="font-bold text-sauge text-sm">70,0%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PROBLÈME ─────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-orange-pale">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-lora text-3xl font-bold text-brun text-center mb-12">
            La restauration, c'est dur à rentabiliser
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📉',
                title: 'Marge inconnue',
                text: 'La plupart des restaurateurs ignorent le coût réel de leurs plats. Résultat : des prix trop bas ou trop élevés qui font fuir les clients.',
              },
              {
                icon: '⏱️',
                title: 'Calculs chronophages',
                text: "Calculer manuellement le coût matière pour chaque plat prend des heures. Du temps perdu que vous n'avez pas.",
              },
              {
                icon: '💸',
                title: 'Prix marchés incontrôlés',
                text: "Les prix fournisseurs varient chaque semaine. Sans suivi, votre marge s'effondre sans que vous vous en rendiez compte.",
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-lora text-lg font-bold text-brun mb-2">{item.title}</h3>
                <p className="text-sm text-brun-mid leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMMENT ÇA MARCHE ────────────────────────────────── */}
      <section className="py-20 px-4 bg-creme">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-lora text-3xl font-bold text-brun text-center mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-brun-light text-center mb-12">Trois étapes, moins d'une minute</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Décrivez votre plat',
                text: "Saisissez le nom ou décrivez votre plat en langage naturel. L'IA génère automatiquement la liste des ingrédients et leurs quantités professionnelles.",
              },
              {
                step: '02',
                title: 'Ajustez si besoin',
                text: 'Modifiez les quantités, ajoutez des ingrédients, changez le food cost cible. Tout se recalcule instantanément.',
              },
              {
                step: '03',
                title: 'Obtenez les résultats',
                text: 'Coût matière, prix conseillé, marge brute, jauge food cost. Sauvegardez et exportez votre fiche technique en PDF.',
              },
            ].map(item => (
              <div key={item.step} className="relative">
                <div className="w-12 h-12 bg-orange rounded-2xl flex items-center justify-center font-bold text-white font-lora text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-lora text-lg font-bold text-brun mb-2">{item.title}</h3>
                <p className="text-sm text-brun-mid leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DONNÉES FRANCEAGRIMER ────────────────────────────── */}
      <section className="py-20 px-4 bg-ivoire">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="inline-block bg-sauge-pale text-sauge text-sm font-semibold px-3 py-1 rounded-full mb-4">
              Données officielles
            </span>
            <h2 className="font-lora text-3xl font-bold text-brun mb-4">
              Des prix fiables, issus de FranceAgriMer
            </h2>
            <p className="text-brun-mid mb-6 leading-relaxed">
              Notre base contient plus de 200 ingrédients avec des prix basés sur les cotations officielles de FranceAgriMer.
              Avec le plan Pro, remplacez ces prix par vos propres tarifs fournisseurs pour une précision maximale.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Viandes, volailles, poissons & crustacés',
                'Légumes de saison, aromates & épices',
                'Produits laitiers, épicerie & pâtisserie',
                'Mis à jour selon les marchés',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-brun-mid">
                  <svg className="w-4 h-4 text-sauge shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Tableau exemple */}
          <div className="flex-1 w-full max-w-sm">
            <div className="bg-white rounded-2xl border border-brun-pale overflow-hidden shadow-sm">
              <div className="bg-orange px-4 py-3">
                <p className="text-white font-semibold text-sm">Extrait — prix de référence</p>
              </div>
              <div className="divide-y divide-brun-pale">
                {[
                  { name: 'Bœuf - Filet', price: '58,00' },
                  { name: 'Saumon - Pavé', price: '20,00' },
                  { name: 'Canard - Magret', price: '22,00' },
                  { name: 'Truffe noire Périgord', price: '800,00' },
                  { name: 'Asperge verte', price: '8,00' },
                  { name: 'Homard breton', price: '55,00' },
                ].map(item => (
                  <div key={item.name} className="flex justify-between px-4 py-2.5">
                    <span className="text-sm text-brun">{item.name}</span>
                    <span className="text-sm font-semibold text-brun-mid">{item.price} €/kg</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 bg-creme">
                <p className="text-xs text-brun-light text-center">+ 200 ingrédients disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TARIFS ───────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-creme" id="tarifs">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-lora text-3xl font-bold text-brun text-center mb-3">
            Tarifs simples et sans surprise
          </h2>
          <p className="text-brun-light text-center mb-12">Sans engagement · Résiliable à tout moment</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Gratuit',
                price: '0€',
                features: ['3 plats sauvegardés', 'Calcul food cost', 'IA (3 calculs)'],
                cta: 'Commencer',
                link: '/inscription',
                highlight: false,
              },
              {
                name: 'Pro',
                price: '19€/mois',
                features: ['Plats illimités', 'IA illimitée', 'Export PDF', 'Analyse de carte', 'Prix personnalisés'],
                cta: 'Essayer le Pro',
                link: '/tarifs',
                highlight: true,
              },
              {
                name: 'Multi',
                price: '49€/mois',
                features: ['Tout le Pro', '5 établissements', "Partage d'équipe"],
                cta: 'Voir Multi',
                link: '/tarifs',
                highlight: false,
              },
            ].map(plan => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 ${plan.highlight ? 'border-orange bg-white shadow-xl ring-2 ring-orange' : 'border-brun-pale bg-white'}`}
              >
                {plan.highlight && (
                  <span className="inline-block bg-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Recommandé
                  </span>
                )}
                <h3 className="font-lora text-xl font-bold text-brun">{plan.name}</h3>
                <p className="text-2xl font-bold text-brun mt-2 mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-brun-mid">
                      <svg className="w-4 h-4 text-sauge shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.link}>
                  <button className={plan.highlight ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA FINAL ────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-orange">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-lora text-4xl font-bold text-white mb-4">
            Commencez à piloter votre rentabilité
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Aucune carte bancaire requise · 3 plats gratuits dès maintenant
          </p>
          <Link href="/outil">
            <button className="bg-white text-orange font-bold text-base px-10 py-4 rounded-xl hover:bg-orange-pale transition-colors">
              Essayer gratuitement
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
