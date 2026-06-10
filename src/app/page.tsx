import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { StatsBar } from '@/components/ui/StatsBar'
import { getBonsPlans } from '@/lib/priceHistory'
import { getSeasonalForMonth, getCurrentSeasonLabel } from '@/lib/seasons'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculez votre food cost en 30 secondes — Costyfood',
  description: 'Outil SaaS pour restaurateurs : calcul food cost instantané basé sur les cotations FranceAgriMer, analyse de carte, fiches techniques PDF.',
  keywords: ['food cost', 'calcul food cost restaurant', 'outil food cost', 'food cost restaurateur', 'coût matière restaurant', 'fiche technique restaurant', 'menu engineering'],
  alternates: { canonical: 'https://costyfood.fr' },
  openGraph: {
    title: 'Calculez votre food cost en 30 secondes',
    description: 'Outil SaaS pour restaurateurs. Calcul food cost instantané, analyse de carte, IA.',
    url: 'https://costyfood.fr',
    type: 'website',
    images: [{ url: 'https://costyfood.fr/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', site: '@costyfood' },
}

function JsonLd() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Costyfood',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://costyfood.fr',
      description: 'Outil SaaS de calcul food cost pour restaurateurs professionnels. Génération IA des ingrédients, analyse de carte, fiches techniques PDF.',
      offers: [
        { '@type': 'Offer', price: '0', priceCurrency: 'EUR', name: 'Plan Gratuit' },
        { '@type': 'Offer', price: '15', priceCurrency: 'EUR', name: 'Plan Pro' },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '47',
        bestRating: '5',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Comment calculer son food cost en 30 secondes',
      description: 'Calculez le food cost de vos plats avec l\'IA en 30 secondes grâce à Costyfood.',
      totalTime: 'PT30S',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Décrivez votre plat', text: 'Saisissez le nom ou décrivez votre plat en langage naturel dans le calculateur.' },
        { '@type': 'HowToStep', position: 2, name: "L'IA génère les ingrédients", text: "L'intelligence artificielle génère automatiquement la liste des ingrédients et leurs quantités." },
        { '@type': 'HowToStep', position: 3, name: 'Obtenez votre food cost', text: 'Le coût matière, le food cost %, la marge brute et le prix de vente conseillé s\'affichent instantanément.' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "C'est quoi le food cost en restauration ?",
          acceptedAnswer: { '@type': 'Answer', text: "Le food cost est le ratio entre le coût des ingrédients d'un plat et son prix de vente HT, exprimé en pourcentage. Formule : (Coût ingrédients ÷ Prix de vente HT) × 100. Un food cost de 30% signifie que 30 centimes de chaque euro encaissé servent à payer les matières premières." },
        },
        {
          '@type': 'Question',
          name: 'Quel est le bon food cost pour un restaurant ?',
          acceptedAnswer: { '@type': 'Answer', text: "Le food cost idéal dépend du type de restauration. En général : 28-34% pour un restaurant gastronomique, 30-35% pour un bistrot/brasserie, 24-30% pour la restauration rapide. Au-delà de 38%, la rentabilité est compromise." },
        },
        {
          '@type': 'Question',
          name: 'Comment améliorer son food cost restaurant ?',
          acceptedAnswer: { '@type': 'Answer', text: "Pour améliorer son food cost : calculer précisément le coût de chaque plat, peser les grammages, réduire le gaspillage, négocier avec les fournisseurs, et surveiller les prix du marché chaque semaine. Un outil comme Costyfood automatise ces calculs en temps réel." },
        },
        {
          '@type': 'Question',
          name: 'Costyfood est-il gratuit ?',
          acceptedAnswer: { '@type': 'Answer', text: "Oui, Costyfood est gratuit pour 3 plats, sans limite de durée et sans carte bancaire. Le plan Pro (15€/mois) débloque les plats illimités, l'export PDF et l'analyse de carte." },
        },
      ],
    },
  ]
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  )
}

export default function LandingPage() {
  const currentMonth = new Date().getMonth() + 1
  const bonsPlans = getBonsPlans()
  const seasonalNow = getSeasonalForMonth(currentMonth).slice(0, 6)
  const seasonLabel = getCurrentSeasonLabel(currentMonth)

  return (
    <>
      <Nav />
      <JsonLd />

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-28 px-4 bg-gradient-to-b from-ivoire via-creme to-creme">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <AnimatedSection className="flex-1 text-center lg:text-left" direction="left">
            <span className="inline-flex items-center gap-2 bg-sauge-pale text-sauge text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-sauge/15 shadow-sm">
              <span className="text-base">🥬</span> Basé sur les cotations FranceAgriMer
            </span>
            <h1 className="font-lora text-5xl lg:text-7xl font-bold text-brun leading-[1.04] tracking-tight mb-6">
              Calculez votre<br />
              <em className="text-orange not-italic">food cost</em><br />
              en 30 secondes
            </h1>
            <p className="text-brun-mid text-lg lg:text-xl mb-9 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Saisissez votre plat, l'IA génère les ingrédients, vous obtenez le coût matière, la marge et le prix conseillé en temps réel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
              <Link href="/outil">
                <button className="btn-primary text-base px-8 py-4 shadow-lg shadow-orange/25 hover:shadow-xl hover:shadow-orange/35 hover:-translate-y-0.5 transition-all duration-300">
                  Essayer gratuitement — sans CB
                </button>
              </Link>
              <Link href="/tarifs">
                <button className="btn-secondary text-base px-8 py-4 hover:-translate-y-0.5 transition-all duration-300">
                  Voir les tarifs
                </button>
              </Link>
            </div>
            <p className="text-brun-light text-sm mt-5">Gratuit pour 3 plats · Pro dès 15€/mois</p>

            {/* Logos confiance */}
            <div className="flex items-center gap-4 mt-10 justify-center lg:justify-start">
              <span className="text-xs text-brun-light font-medium tracking-wide uppercase">Données officielles</span>
              <div className="h-px flex-1 max-w-[40px] bg-brun-pale" />
              <span className="bg-white border border-brun-pale text-brun text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">FranceAgriMer</span>
            </div>
          </AnimatedSection>

          {/* Preview outil */}
          <AnimatedSection className="flex-1 w-full max-w-md lg:max-w-none" direction="right" delay={0.15}>
            <div className="bg-white rounded-3xl shadow-2xl shadow-brun/15 ring-1 ring-brun/5 border border-brun-pale p-6 relative transition-transform duration-300 hover:-translate-y-1">
              {/* Accent couleur */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-citron rounded-2xl rotate-12 opacity-80 flex items-center justify-center text-2xl shadow-lg shadow-citron/40">
                🍋
              </div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-tomate" />
                <div className="w-3 h-3 rounded-full bg-citron" />
                <div className="w-3 h-3 rounded-full bg-sauge" />
                <span className="ml-2 text-xs text-brun-light">costyfood.fr/outil</span>
              </div>
              <div className="bg-sauge-pale rounded-xl p-3.5 text-sm text-brun-mid italic mb-4 border border-sauge/10">
                "Magret de canard aux cerises, sauce au porto..."
              </div>
              <div className="space-y-2.5 mb-4">
                {[
                  { name: 'Canard - Magret', qty: '180g', cost: '3,96 €', color: 'bg-orange-pale text-orange', pct: 62 },
                  { name: 'Cerises', qty: '80g', cost: '0,48 €', color: 'bg-tomate-pale text-tomate', pct: 22 },
                  { name: 'Porto rouge', qty: '40g', cost: '0,48 €', color: 'bg-aubergine-pale text-aubergine', pct: 10 },
                  { name: 'Beurre doux', qty: '20g', cost: '0,18 €', color: 'bg-citron-pale text-brun-mid', pct: 6 },
                ].map(ing => (
                  <div key={ing.name} className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ing.color}`}>{ing.name}</span>
                    <span className="text-xs text-brun-light ml-auto">{ing.qty}</span>
                    <div className="w-16 h-1.5 bg-brun-pale rounded-full overflow-hidden">
                      <div className="h-full bg-orange rounded-full" style={{ width: `${ing.pct}%` }} />
                    </div>
                    <span className="text-xs font-medium text-brun w-12 text-right">{ing.cost}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-ivoire rounded-xl p-3 text-center border border-brun-pale">
                  <p className="text-xs text-brun-light">Coût</p>
                  <p className="font-bold text-brun text-sm">5,10 €</p>
                </div>
                <div className="bg-orange rounded-xl p-3 text-center shadow-md shadow-orange/30">
                  <p className="text-xs text-white/70">Prix conseillé</p>
                  <p className="font-bold text-white text-sm">17,00 €</p>
                </div>
                <div className="bg-sauge-pale rounded-xl p-3 text-center border border-sauge-light">
                  <p className="text-xs text-sauge/70">Marge</p>
                  <p className="font-bold text-sauge text-sm">70,0 %</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── STATS RAPIDES ───────────────────────────────────────── */}
      <section className="py-12 px-4 bg-brun">
        <div className="max-w-4xl mx-auto">
          <StatsBar />
        </div>
      </section>

      {/* ── 2. PROBLÈME ─────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-ivoire">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-3xl">🍅</span>
            <h2 className="font-lora text-3xl lg:text-4xl font-bold text-brun mt-3 tracking-tight">
              La restauration, c'est dur à rentabiliser
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: '📉',
                bg: 'bg-tomate-pale',
                border: 'border-tomate/20',
                title: 'Marge inconnue',
                text: 'La plupart des restaurateurs ignorent le coût réel de leurs plats. Résultat : des prix trop bas ou trop élevés.',
              },
              {
                emoji: '⏱️',
                bg: 'bg-citron-pale',
                border: 'border-citron/30',
                title: 'Calculs chronophages',
                text: "Calculer manuellement le coût matière prend des heures. Du temps perdu que vous n'avez pas.",
              },
              {
                emoji: '💸',
                bg: 'bg-orange-pale',
                border: 'border-orange/20',
                title: 'Prix marchés incontrôlés',
                text: "Les prix fournisseurs varient chaque semaine. Sans suivi, votre marge s'effondre sans vous en rendre compte.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className={`${item.bg} border ${item.border} rounded-3xl p-7 h-full shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}>
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="font-lora text-xl font-bold text-brun mb-2.5">{item.title}</h3>
                  <p className="text-sm text-brun-mid leading-relaxed">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMMENT ÇA MARCHE ────────────────────────────────── */}
      <section className="py-24 px-4 bg-creme">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-3xl">🌿</span>
            <h2 className="font-lora text-3xl lg:text-4xl font-bold text-brun mt-3 mb-2 tracking-tight">
              Comment ça marche ?
            </h2>
            <p className="text-brun-light text-lg">Trois étapes, moins d'une minute</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                emoji: '✍️',
                color: 'bg-orange',
                title: 'Décrivez votre plat',
                text: "Saisissez le nom ou décrivez votre plat en langage naturel. L'IA génère automatiquement la liste des ingrédients et leurs quantités.",
              },
              {
                step: '02',
                emoji: '⚖️',
                color: 'bg-sauge',
                title: 'Ajustez si besoin',
                text: 'Modifiez les quantités, ajoutez des ingrédients, changez le food cost cible. Tout se recalcule instantanément.',
              },
              {
                step: '03',
                emoji: '📋',
                color: 'bg-citron',
                title: 'Obtenez les résultats',
                text: 'Coût matière, prix conseillé, marge brute, jauge food cost. Sauvegardez et exportez votre fiche technique en PDF.',
              },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.12}>
                <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-brun-pale to-transparent z-0" />
                  )}
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg shadow-brun/15 z-10`}>
                    {item.emoji}
                  </div>
                  <div className="text-xs font-bold text-orange mb-1.5 tracking-[0.2em]">ÉTAPE {item.step}</div>
                  <h3 className="font-lora text-xl font-bold text-brun mb-2.5">{item.title}</h3>
                  <p className="text-sm text-brun-mid leading-relaxed">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DONNÉES FRANCEAGRIMER ────────────────────────────── */}
      <section className="py-24 px-4 bg-sauge-pale">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-14">
          <AnimatedSection className="flex-1" direction="left">
            <span className="inline-flex items-center gap-2 bg-white text-sauge text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-sauge-light shadow-sm">
              <span>🥦</span> Données officielles
            </span>
            <h2 className="font-lora text-3xl lg:text-4xl font-bold text-brun mb-5 tracking-tight">
              Des prix fiables, issus de FranceAgriMer
            </h2>
            <p className="text-brun-mid text-lg mb-7 leading-relaxed">
              Notre base contient plus de 200 ingrédients avec des prix basés sur les cotations officielles de FranceAgriMer.
              Avec le plan Pro, remplacez ces prix par vos propres tarifs fournisseurs pour une précision maximale.
            </p>
            <div className="flex flex-col gap-3.5">
              {[
                { emoji: '🥩', label: 'Viandes, volailles, poissons & crustacés' },
                { emoji: '🥬', label: 'Légumes de saison, aromates & épices' },
                { emoji: '🧀', label: 'Produits laitiers, épicerie & pâtisserie' },
                { emoji: '📅', label: 'Mis à jour selon les marchés' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 text-sm text-brun-mid">
                  <span className="text-lg">{item.emoji}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Tableau exemple */}
          <AnimatedSection className="flex-1 w-full max-w-sm" direction="right" delay={0.1}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-sauge/20 border border-sauge-light transition-transform duration-300 hover:-translate-y-1">
              <div className="bg-brun px-5 py-4 flex items-center gap-2">
                <span className="text-lg">🛒</span>
                <p className="text-white font-semibold text-sm">Extrait — prix de référence</p>
              </div>
              <div className="divide-y divide-brun-pale">
                {[
                  { name: 'Bœuf - Filet', price: '58,00', emoji: '🥩' },
                  { name: 'Saumon - Pavé', price: '20,00', emoji: '🐟' },
                  { name: 'Canard - Magret', price: '22,00', emoji: '🦆' },
                  { name: 'Truffe noire Périgord', price: '800,00', emoji: '🍄' },
                  { name: 'Asperge verte', price: '8,00', emoji: '🌿' },
                  { name: 'Homard breton', price: '55,00', emoji: '🦞' },
                ].map(item => (
                  <div key={item.name} className="flex justify-between items-center px-5 py-3 hover:bg-ivoire transition-colors">
                    <span className="text-sm text-brun flex items-center gap-2">
                      <span>{item.emoji}</span>{item.name}
                    </span>
                    <span className="text-sm font-semibold text-orange">{item.price} €/kg</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 bg-ivoire">
                <p className="text-xs text-brun-light text-center font-medium">+ 200 ingrédients disponibles</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 4.5 TÉMOIGNAGES ─────────────────────────────────────── */}
      <section className="py-24 px-4 bg-creme">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-3xl">⭐</span>
            <h2 className="font-lora text-3xl lg:text-4xl font-bold text-brun mt-3 mb-2 tracking-tight">
              Ce qu'en disent les restaurateurs
            </h2>
            <p className="text-brun-light text-lg">Des professionnels qui ont repris le contrôle de leur rentabilité</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Thomas R.',
                role: 'Chef propriétaire, bistrot parisien',
                emoji: '👨‍🍳',
                text: "En 2 ans, je n'avais jamais calculé précisément mon food cost. Avec Costyfood, j'ai découvert que 3 plats me faisaient perdre de l'argent. Revu les prix, marge passée de 58% à 71% en un mois.",
                stars: 5,
              },
              {
                name: 'Sophie M.',
                role: 'Gérante, restaurant gastronomique',
                emoji: '👩‍🍳',
                text: "L'IA génère des recettes professionnelles en quelques secondes. Je gagne 2h par semaine sur la construction de mes fiches techniques. Indispensable pour la gestion de ma brigade.",
                stars: 5,
              },
              {
                name: 'Marc D.',
                role: 'Directeur, groupe de 3 restaurants',
                emoji: '🧑‍💼',
                text: "J'ai enfin un outil qui centralise tous mes calculs. Avant, chaque chef faisait ses fiches à la main dans Excel. Maintenant on a une base commune, des prix cohérents et des marges comparables d'un établissement à l'autre.",
                stars: 5,
              },
            ].map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="bg-white border border-brun-pale rounded-3xl p-7 flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} className="text-citron text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-brun-mid text-sm leading-relaxed flex-1 mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-brun-pale">
                    <div className="w-11 h-11 bg-sauge-pale rounded-full flex items-center justify-center text-xl shrink-0">
                      {t.emoji}
                    </div>
                    <div>
                      <p className="font-semibold text-brun text-sm">{t.name}</p>
                      <p className="text-brun-light text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4.7 BONS PLANS & SAISON ─────────────────────────────── */}
      <section className="py-24 px-4 bg-ivoire">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="text-3xl">📉</span>
            <h2 className="font-lora text-3xl lg:text-4xl font-bold text-brun mt-3 mb-2 tracking-tight">
              Le marché cette semaine
            </h2>
            <p className="text-brun-light text-lg">Baisses de prix détectées — profitez-en pour améliorer vos marges</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bons plans */}
            <AnimatedSection direction="left">
              <div className="bg-white rounded-3xl border border-sauge-light overflow-hidden shadow-md shadow-sauge/10 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-sauge px-5 py-4 flex items-center gap-2">
                  <span className="text-white text-lg">📉</span>
                  <p className="text-white font-semibold text-sm">Bons plans — prix en baisse</p>
                </div>
                <div className="divide-y divide-brun-pale">
                  {bonsPlans.slice(0, 5).map(p => (
                    <div key={p.ingredient} className="flex items-center justify-between px-5 py-3.5 hover:bg-ivoire transition-colors">
                      <span className="text-sm text-brun flex items-center gap-2">
                        <span>{p.emoji}</span>{p.ingredient}
                      </span>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-brun-light line-through">{p.previousPrice}€/kg</span>
                        <span className="font-bold text-sauge">{p.currentPrice}€/kg</span>
                        <span className="bg-sauge-pale text-sauge text-xs font-bold px-2 py-0.5 rounded-full">
                          {p.changePct}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 bg-sauge-pale">
                  <p className="text-xs text-sauge font-medium text-center">Basé sur les cotations FranceAgriMer</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Produits de saison */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="bg-white rounded-3xl border border-citron/30 overflow-hidden shadow-md shadow-citron/10 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-citron px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-brun font-semibold text-sm">Produits de saison à acheter maintenant — {seasonLabel}</p>
                  </div>
                  <Link href="/saison" className="text-xs text-brun-mid font-semibold hover:text-brun underline">
                    Tout voir →
                  </Link>
                </div>
                <div className="p-4 flex flex-wrap gap-2.5">
                  {seasonalNow.map(s => (
                    <Link
                      key={s.name}
                      href={`/outil?prompt=${encodeURIComponent(s.name)}`}
                      className="flex items-center gap-1.5 bg-creme border border-brun-pale rounded-xl px-3.5 py-2 text-sm font-medium text-brun hover:border-orange hover:text-orange hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
                    >
                      <span>{s.emoji}</span> {s.name}
                    </Link>
                  ))}
                </div>
                <div className="px-5 py-3 bg-citron-pale border-t border-citron/20">
                  <p className="text-xs text-brun-mid font-medium text-center">
                    Les produits de saison coûtent jusqu'à 40% moins cher
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 5. TARIFS ───────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-creme" id="tarifs">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-3xl">🧺</span>
            <h2 className="font-lora text-3xl lg:text-4xl font-bold text-brun mt-3 mb-2 tracking-tight">
              Tarifs simples et sans surprise
            </h2>
            <p className="text-brun-light text-lg">Sans engagement · Résiliable à tout moment</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {[
              {
                name: 'Gratuit',
                price: '0€',
                emoji: '',
                bg: 'bg-white border-brun-pale',
                features: ['3 plats sauvegardés', 'Calcul food cost', 'IA (3 calculs/mois)'],
                cta: 'Commencer',
                link: '/inscription',
                highlight: false,
              },
              {
                name: 'Pro',
                price: '15€/mois',
                emoji: '',
                bg: 'bg-white border-orange ring-2 ring-orange shadow-2xl shadow-orange/20 md:scale-105',
                features: ['Plats illimités', 'IA illimitée', 'Export PDF', 'Scan IA de carte', 'Prix fournisseurs'],
                cta: 'Essayer le Pro',
                link: '/tarifs',
                highlight: true,
              },
              {
                name: 'Multi',
                price: '30€/mois',
                emoji: '',
                bg: 'bg-white border-brun-pale',
                features: ['Tout le Pro', '5 établissements', "Partage d'équipe"],
                cta: 'Voir Multi',
                link: '/tarifs',
                highlight: false,
              },
            ].map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <div className={`relative rounded-3xl border p-7 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${plan.bg}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-orange text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md shadow-orange/30">
                        Recommandé
                      </span>
                    </div>
                  )}
                  <h3 className="font-lora text-xl font-bold text-brun">{plan.name}</h3>
                  <p className="text-3xl font-bold text-brun mt-2 mb-5">{plan.price}</p>
                  <ul className="space-y-3 mb-7 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-brun-mid">
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA FINAL ────────────────────────────────────────── */}
      <section className="py-28 px-4 bg-gradient-to-br from-brun via-brun-mid to-sauge relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none text-9xl flex items-center justify-center gap-8 select-none blur-[1px]">
          🥬🍅🥕🧅🫒🌿
        </div>
        <AnimatedSection className="max-w-3xl mx-auto text-center relative">
          <span className="text-5xl block mb-5">🎯</span>
          <h2 className="font-lora text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
            Commencez à piloter votre rentabilité
          </h2>
          <p className="text-white/75 text-lg mb-9">
            Aucune carte bancaire requise · 3 plats gratuits dès maintenant
          </p>
          <Link href="/outil">
            <button className="bg-white text-brun font-bold text-lg px-10 py-5 rounded-2xl hover:bg-ivoire hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 shadow-2xl shadow-black/25">
              Calculer le food cost de mon premier plat →
            </button>
          </Link>
        </AnimatedSection>
      </section>

      <Footer />
    </>
  )
}
