'use client'
import { useMemo, useState } from 'react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { getSeasonalForMonth, getPeakSeasonForMonth, getCurrentSeasonLabel, MONTH_NAMES, SeasonalIngredient } from '@/lib/seasons'
import { DEFAULT_INGREDIENTS } from '@/lib/ingredients'
import Link from 'next/link'

const CATEGORY_ICONS: Record<string, string> = {
  légume: '🥬',
  fruit: '🍓',
  poisson: '🐟',
  viande: '🥩',
  champignon: '🍄',
}

const CATEGORY_COLORS: Record<string, string> = {
  légume: 'bg-sauge-pale text-sauge border-sauge-light',
  fruit: 'bg-tomate-pale text-tomate border-tomate/20',
  poisson: 'bg-blue-50 text-blue-600 border-blue-100',
  viande: 'bg-orange-pale text-orange border-orange/20',
  champignon: 'bg-citron-pale text-brun-mid border-citron/30',
}

export function SaisonClient() {
  const currentMonth = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [filterCat, setFilterCat] = useState<string>('')

  const seasonal = useMemo(() => getSeasonalForMonth(selectedMonth), [selectedMonth])
  const peak = useMemo(() => getPeakSeasonForMonth(selectedMonth), [selectedMonth])
  const seasonLabel = getCurrentSeasonLabel(selectedMonth)

  const filtered = useMemo(() => {
    if (!filterCat) return seasonal
    return seasonal.filter(i => i.category === filterCat)
  }, [seasonal, filterCat])

  const categories = useMemo(() => {
    const cats = [...new Set(seasonal.map(i => i.category))]
    return cats
  }, [seasonal])

  return (
    <>
      <Nav />
      <div className="pt-24 pb-20 px-4 bg-creme min-h-screen">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <AnimatedSection className="text-center mb-10">
            <span className="text-5xl block mb-3">🗓️</span>
            <h1 className="font-lora text-4xl font-bold text-brun mb-3">
              Produits de saison
            </h1>
            <p className="text-brun-light text-lg max-w-xl mx-auto">
              Les meilleurs ingrédients du moment — qualité maximale, coût réduit, marge optimisée.
            </p>
          </AnimatedSection>

          {/* Sélecteur de mois */}
          <AnimatedSection className="mb-8">
            <div className="bg-white border border-brun-pale rounded-2xl p-4">
              <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-3 text-center">Choisir un mois</p>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-1.5">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(m)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                      m === selectedMonth
                        ? 'bg-orange text-white shadow-sm'
                        : m === currentMonth
                        ? 'bg-sauge-pale text-sauge border border-sauge-light'
                        : 'hover:bg-brun-pale/40 text-brun-mid'
                    }`}
                  >
                    {MONTH_NAMES[m].substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Headline du mois */}
          <AnimatedSection className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-lora text-2xl font-bold text-brun">
                  {MONTH_NAMES[selectedMonth]} — {seasonLabel}
                </h2>
                <p className="text-brun-light">
                  {seasonal.length} ingrédients de saison
                  {peak.length > 0 && ` · ${peak.length} en pic de saison`}
                </p>
              </div>
              {/* Filtres catégorie */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilterCat('')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${!filterCat ? 'bg-brun text-white' : 'bg-white border border-brun-pale text-brun-mid hover:border-brun'}`}
                >
                  Tous
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat === filterCat ? '' : cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all capitalize ${filterCat === cat ? 'bg-brun text-white' : 'bg-white border border-brun-pale text-brun-mid hover:border-brun'}`}
                  >
                    {CATEGORY_ICONS[cat]} {cat}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Pic de saison */}
          {peak.length > 0 && !filterCat && (
            <AnimatedSection className="mb-6">
              <div className="bg-gradient-to-r from-sauge-pale to-citron-pale rounded-2xl p-5 border border-sauge-light">
                <p className="text-xs font-bold text-sauge uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span>⭐</span> Pic de saison ce mois-ci — qualité et prix optimaux
                </p>
                <div className="flex flex-wrap gap-2">
                  {peak.map(i => (
                    <div key={i.name} className="bg-white rounded-xl px-3 py-2 flex items-center gap-2 text-sm font-semibold text-brun border border-sauge-light/50">
                      <span>{i.emoji}</span> {i.name}
                      <span className="text-sauge font-bold">
                        {DEFAULT_INGREDIENTS[i.priceKey] ? `${DEFAULT_INGREDIENTS[i.priceKey]}€/kg` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Grille ingrédients */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {filtered.map((ing: SeasonalIngredient, i: number) => {
              const price = DEFAULT_INGREDIENTS[ing.priceKey]
              const isPeak = ing.peakMonths?.includes(selectedMonth)
              return (
                <AnimatedSection key={ing.name} delay={i * 0.04}>
                  <div className={`bg-white border border-brun-pale rounded-2xl p-5 hover:shadow-md transition-shadow relative ${isPeak ? 'ring-1 ring-sauge-light' : ''}`}>
                    {isPeak && (
                      <span className="absolute top-3 right-3 bg-sauge text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        Pic ⭐
                      </span>
                    )}
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{ing.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-brun">{ing.name}</h3>
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border capitalize mt-0.5 ${CATEGORY_COLORS[ing.category]}`}>
                          {ing.category}
                        </span>
                      </div>
                    </div>
                    {price && (
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-brun-light">Prix de référence</span>
                        <span className="font-bold text-orange">{price}€/kg</span>
                      </div>
                    )}
                    {ing.tip && (
                      <p className="text-xs text-brun-light italic leading-relaxed border-t border-brun-pale pt-2">
                        💡 {ing.tip}
                      </p>
                    )}
                    <div className="mt-3">
                      <Link
                        href={`/outil?prompt=${encodeURIComponent(ing.name)}`}
                        className="text-xs text-orange font-semibold hover:underline"
                      >
                        Calculer le food cost →
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <span className="text-4xl block mb-3">🌿</span>
              <p className="text-brun-light">Aucun ingrédient de saison dans cette catégorie pour {MONTH_NAMES[selectedMonth]}.</p>
            </div>
          )}

          {/* CTA calculateur */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-orange-pale to-citron-pale rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-orange/20">
              <div>
                <h3 className="font-lora text-xl font-bold text-brun mb-1">
                  Cuisinez la saison, optimisez votre marge
                </h3>
                <p className="text-brun-mid text-sm">Les produits de saison coûtent jusqu&apos;à 40% moins cher hors saison — calculez l&apos;impact sur votre rentabilité.</p>
              </div>
              <Link href="/outil" className="shrink-0">
                <button className="btn-primary px-6 py-3">Calculer mon food cost →</button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </>
  )
}
