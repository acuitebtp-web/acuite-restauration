import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ARTICLES } from './articles'

export const metadata: Metadata = {
  title: 'Blog Costyfood — Conseils food cost, menu engineering et gestion restaurant',
  description: 'Guides pratiques pour restaurateurs : calcul food cost, menu engineering, analyse des prix des ingrédients. Ressources gratuites basées sur les données FranceAgriMer.',
  keywords: ['blog restauration', 'food cost guide', 'menu engineering', 'gestion restaurant', 'prix ingrédients 2026'],
  alternates: {
    canonical: 'https://costyfood.fr/blog',
  },
  openGraph: {
    title: 'Blog Costyfood — Conseils food cost & gestion restaurant',
    description: 'Guides pratiques pour restaurateurs : calcul food cost, menu engineering, analyse des prix.',
    url: 'https://costyfood.fr/blog',
    type: 'website',
  },
}

const CATEGORY_COLORS: Record<string, string> = {
  'Gestion': 'bg-orange/10 text-orange',
  'Stratégie': 'bg-brun/10 text-brun',
  'Marchés': 'bg-emerald-100 text-emerald-700',
}

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen bg-creme">
        {/* Hero */}
        <section className="py-16 md:py-20 border-b border-brun-pale">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="inline-block bg-orange/10 text-orange text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Ressources gratuites
            </span>
            <h1 className="font-lora text-3xl md:text-5xl font-bold text-brun mb-4 leading-tight">
              Le blog des restaurateurs qui pilotent leurs chiffres
            </h1>
            <p className="text-brun-mid text-lg max-w-2xl mx-auto">
              Guides pratiques sur le food cost, le menu engineering et les marchés alimentaires. Mis à jour avec les données FranceAgriMer.
            </p>
          </div>
        </section>

        {/* Articles grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ARTICLES.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-2xl border border-brun-pale overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  {/* Card header */}
                  <div className="bg-gradient-to-br from-brun/5 to-orange/5 px-6 pt-6 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {article.category}
                      </span>
                      <span className="text-xs text-brun-mid">{article.readTime} min de lecture</span>
                    </div>
                    <h2 className="font-lora text-lg font-bold text-brun leading-snug group-hover:text-orange transition-colors line-clamp-3">
                      {article.title}
                    </h2>
                  </div>

                  {/* Card body */}
                  <div className="px-6 pb-6 pt-3">
                    <p className="text-sm text-brun-mid leading-relaxed line-clamp-3 mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brun-mid/70">{article.date}</span>
                      <span className="text-xs font-semibold text-orange group-hover:underline">
                        Lire l&rsquo;article →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-brun-pale">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-lora text-2xl font-bold text-brun mb-3">
              Calculez votre food cost en 30 secondes
            </h2>
            <p className="text-brun-mid mb-6">
              Arrêtez d&rsquo;estimer — connaissez vos marges exactes avec Costyfood.
            </p>
            <Link
              href="/outil"
              className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange/90 transition-colors"
            >
              Essayer gratuitement
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
