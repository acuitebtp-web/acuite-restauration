import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { getBonsPlans, getHausses, getPriceChanges } from '@/lib/priceHistory'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prix ingrédients restauration — Hausses & baisses du marché | Costyfood',
  description: 'Suivez en temps réel les hausses et baisses de prix des ingrédients en restauration. Viandes, poissons, légumes — cotations hebdomadaires FranceAgriMer.',
  openGraph: {
    title: 'Prix ingrédients restauration — Costyfood',
    description: 'Hausses et baisses hebdomadaires sur 300+ ingrédients. Basé sur FranceAgriMer.',
  },
}

function BreadcrumbJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://costyfood.fr' },
      { '@type': 'ListItem', position: 2, name: 'Évolution des prix ingrédients', item: 'https://costyfood.fr/prix' },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default function PrixPage() {
  const baisses = getBonsPlans()
  const hausses = getHausses()
  const all = getPriceChanges().sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct))

  return (
    <>
      <Nav />
      <BreadcrumbJsonLd />
      <div className="pt-24 min-h-screen pb-16 px-4 bg-creme">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <p className="text-sm font-semibold text-orange mb-2 uppercase tracking-wide">Marché</p>
            <h1 className="font-lora text-4xl font-bold text-brun mb-3">Évolution des prix</h1>
            <p className="text-brun-light text-lg max-w-xl">
              Hausses et baisses des ingrédients sur les 7 derniers jours. Mis à jour chaque lundi.
            </p>
            <p className="text-xs text-brun-light mt-2">Source : données marché professionnel (Rungis / MIN)</p>
          </div>

          {/* Baisses — bons plans */}
          {baisses.length > 0 && (
            <section className="mb-10">
              <h2 className="font-lora text-xl font-semibold text-sauge mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                Bons plans — prix en baisse
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {baisses.map((p) => (
                  <Link
                    key={p.ingredient}
                    href={`/outil?prompt=${encodeURIComponent(p.ingredient)}`}
                    className="bg-white border border-sauge-light rounded-2xl px-5 py-4 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.emoji}</span>
                      <div>
                        <p className="font-semibold text-brun text-sm">{p.ingredient}</p>
                        <p className="text-xs text-brun-light">{p.currentPrice.toFixed(2)} €/kg</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-sauge text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {p.changePct > 0 ? '+' : ''}{p.changePct.toFixed(1)}%
                      </span>
                      <p className="text-xs text-brun-light mt-1 line-through">{p.previousPrice.toFixed(2)} €</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Hausses — à surveiller */}
          {hausses.length > 0 && (
            <section className="mb-10">
              <h2 className="font-lora text-xl font-semibold text-tomate mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                À surveiller — prix en hausse
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hausses.map((p) => (
                  <Link
                    key={p.ingredient}
                    href={`/outil?prompt=${encodeURIComponent(p.ingredient)}`}
                    className="bg-white border border-tomate/20 rounded-2xl px-5 py-4 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.emoji}</span>
                      <div>
                        <p className="font-semibold text-brun text-sm">{p.ingredient}</p>
                        <p className="text-xs text-brun-light">{p.currentPrice.toFixed(2)} €/kg</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-tomate text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        +{p.changePct.toFixed(1)}%
                      </span>
                      <p className="text-xs text-brun-light mt-1 line-through">{p.previousPrice.toFixed(2)} €</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Tableau complet */}
          <section>
            <h2 className="font-lora text-xl font-semibold text-brun mb-4">Toutes les variations</h2>
            <div className="bg-white border border-brun-pale rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brun-pale bg-creme">
                    <th className="text-left px-5 py-3 font-semibold text-brun-mid">Ingrédient</th>
                    <th className="text-right px-5 py-3 font-semibold text-brun-mid">Prix actuel</th>
                    <th className="text-right px-5 py-3 font-semibold text-brun-mid hidden sm:table-cell">Semaine préc.</th>
                    <th className="text-right px-5 py-3 font-semibold text-brun-mid">Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {all.map((p, i) => (
                    <tr key={p.ingredient} className={`border-b border-brun-pale/50 hover:bg-creme/60 transition-colors ${i % 2 === 0 ? '' : 'bg-brun-pale/10'}`}>
                      <td className="px-5 py-3 font-medium text-brun">
                        <span className="mr-2">{p.emoji}</span>{p.ingredient}
                      </td>
                      <td className="px-5 py-3 text-right text-brun">{p.currentPrice.toFixed(2)} €/kg</td>
                      <td className="px-5 py-3 text-right text-brun-light hidden sm:table-cell">{p.previousPrice.toFixed(2)} €/kg</td>
                      <td className="px-5 py-3 text-right">
                        <span className={`font-bold text-xs px-2 py-1 rounded-full ${p.direction === 'down' ? 'bg-sauge-pale text-sauge' : 'bg-tomate-pale text-tomate'}`}>
                          {p.changePct > 0 ? '+' : ''}{p.changePct.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-brun-light mt-3 text-center">
              Cliquez sur un ingrédient pour calculer son food cost dans l'outil
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  )
}
