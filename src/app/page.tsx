import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculez votre food cost en 30 secondes — Acuité Restauration',
  description: 'Outil SaaS pour restaurateurs : calcul food cost instantané basé sur les cotations FranceAgriMer, analyse de carte, fiches techniques PDF.',
  openGraph: {
    title: 'Calculez votre food cost en 30 secondes',
    description: 'Outil SaaS pour restaurateurs. Calcul food cost instantané, analyse de carte, IA.',
  },
}

export default function LandingPage() {
  return (
    <>
      <Nav />

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="pt-28 pb-24 px-4 bg-creme">


        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-sauge-pale text-sauge text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="text-base">🥬</span> Basé sur les cotations FranceAgriMer
            </span>
            <h1 className="font-lora text-5xl lg:text-6xl font-bold text-brun leading-tight mb-5">
              Calculez votre<br />
              <em className="text-orange not-italic">food cost</em><br />
              en 30 secondes
            </h1>
            <p className="text-brun-mid text-lg mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
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

            {/* Logos confiance */}
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              <span className="text-xs text-brun-light font-medium">Données officielles</span>
              <div className="h-px flex-1 max-w-[40px] bg-brun-pale" />
              <span className="bg-white border border-brun-pale text-brun text-xs font-semibold px-3 py-1.5 rounded-full">FranceAgriMer</span>
              <span className="bg-white border border-brun-pale text-brun text-xs font-semibold px-3 py-1.5 rounded-full">Claude AI</span>
            </div>
          </div>

          {/* Preview outil */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="bg-white rounded-3xl shadow-2xl border border-brun-pale p-6 relative">
              {/* Accent couleur */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-citron rounded-2xl rotate-12 opacity-80 flex items-center justify-center text-2xl">
                🍋
              </div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-tomate" />
                <div className="w-3 h-3 rounded-full bg-citron" />
                <div className="w-3 h-3 rounded-full bg-sauge" />
                <span className="ml-2 text-xs text-brun-light">acuite-restauration.fr/outil</span>
              </div>
              <div className="bg-sauge-pale rounded-xl p-3 text-sm text-brun-mid italic mb-4">
                "Magret de canard aux cerises, sauce au porto..."
              </div>
              <div className="space-y-2 mb-4">
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
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-ivoire rounded-xl p-2.5 text-center border border-brun-pale">
                  <p className="text-xs text-brun-light">Coût</p>
                  <p className="font-bold text-brun text-sm">5,10 €</p>
                </div>
                <div className="bg-orange rounded-xl p-2.5 text-center">
                  <p className="text-xs text-white/70">Prix conseillé</p>
                  <p className="font-bold text-white text-sm">17,00 €</p>
                </div>
                <div className="bg-sauge-pale rounded-xl p-2.5 text-center border border-sauge-light">
                  <p className="text-xs text-sauge/70">Marge</p>
                  <p className="font-bold text-sauge text-sm">70,0 %</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS RAPIDES ───────────────────────────────────────── */}
      <section className="py-10 px-4 bg-brun">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '200+', label: 'ingrédients', emoji: '🥕' },
              { value: '< 30s', label: 'par plat', emoji: '⚡' },
              { value: '0 CB', label: 'pour commencer', emoji: '🎁' },
              { value: '100%', label: 'en temps réel', emoji: '📊' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="font-lora text-2xl font-bold text-white">{s.value}</div>
                <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. PROBLÈME ─────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-ivoire">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-3xl">🍅</span>
            <h2 className="font-lora text-3xl font-bold text-brun mt-2">
              La restauration, c'est dur à rentabiliser
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: '📉',
                bg: 'bg-tomate-pale',
                border: 'border-tomate/20',
                accent: 'text-tomate',
                title: 'Marge inconnue',
                text: 'La plupart des restaurateurs ignorent le coût réel de leurs plats. Résultat : des prix trop bas ou trop élevés.',
              },
              {
                emoji: '⏱️',
                bg: 'bg-citron-pale',
                border: 'border-citron/30',
                accent: 'text-brun-mid',
                title: 'Calculs chronophages',
                text: "Calculer manuellement le coût matière prend des heures. Du temps perdu que vous n'avez pas.",
              },
              {
                emoji: '💸',
                bg: 'bg-orange-pale',
                border: 'border-orange/20',
                accent: 'text-orange',
                title: 'Prix marchés incontrôlés',
                text: "Les prix fournisseurs varient chaque semaine. Sans suivi, votre marge s'effondre sans vous en rendre compte.",
              },
            ].map(item => (
              <div key={item.title} className={`${item.bg} border ${item.border} rounded-2xl p-6`}>
                <div className="text-4xl mb-3">{item.emoji}</div>
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
          <div className="text-center mb-12">
            <span className="text-3xl">🌿</span>
            <h2 className="font-lora text-3xl font-bold text-brun mt-2 mb-2">
              Comment ça marche ?
            </h2>
            <p className="text-brun-light">Trois étapes, moins d'une minute</p>
          </div>
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
              <div key={item.step} className="relative flex flex-col items-center md:items-start text-center md:text-left">
                {i < 2 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-brun-pale to-transparent z-0" />
                )}
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm z-10`}>
                  {item.emoji}
                </div>
                <div className="text-xs font-bold text-brun-light mb-1 tracking-widest">ÉTAPE {item.step}</div>
                <h3 className="font-lora text-lg font-bold text-brun mb-2">{item.title}</h3>
                <p className="text-sm text-brun-mid leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DONNÉES FRANCEAGRIMER ────────────────────────────── */}
      <section className="py-20 px-4 bg-sauge-pale">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 bg-white text-sauge text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-sauge-light">
              <span>🥦</span> Données officielles
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
          </div>

          {/* Tableau exemple */}
          <div className="flex-1 w-full max-w-sm">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-sauge-light">
              <div className="bg-brun px-4 py-3 flex items-center gap-2">
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
                  <div key={item.name} className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-sm text-brun flex items-center gap-2">
                      <span>{item.emoji}</span>{item.name}
                    </span>
                    <span className="text-sm font-semibold text-orange">{item.price} €/kg</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 bg-ivoire">
                <p className="text-xs text-brun-light text-center font-medium">+ 200 ingrédients disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TARIFS ───────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-creme" id="tarifs">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-3xl">🧺</span>
            <h2 className="font-lora text-3xl font-bold text-brun mt-2 mb-2">
              Tarifs simples et sans surprise
            </h2>
            <p className="text-brun-light">Sans engagement · Résiliable à tout moment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Gratuit',
                price: '0€',
                emoji: '🌱',
                bg: 'bg-white border-brun-pale',
                features: ['3 plats sauvegardés', 'Calcul food cost', 'IA (3 calculs)'],
                cta: 'Commencer',
                link: '/inscription',
                highlight: false,
              },
              {
                name: 'Pro',
                price: '19€/mois',
                emoji: '🥕',
                bg: 'bg-white border-orange ring-2 ring-orange shadow-xl',
                features: ['Plats illimités', 'IA illimitée', 'Export PDF', 'Analyse de carte', 'Prix personnalisés'],
                cta: 'Essayer le Pro',
                link: '/tarifs',
                highlight: true,
              },
              {
                name: 'Multi',
                price: '49€/mois',
                emoji: '🧺',
                bg: 'bg-white border-brun-pale',
                features: ['Tout le Pro', '5 établissements', "Partage d'équipe"],
                cta: 'Voir Multi',
                link: '/tarifs',
                highlight: false,
              },
            ].map(plan => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 flex flex-col ${plan.bg}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                      Recommandé
                    </span>
                  </div>
                )}
                <div className="text-3xl mb-3">{plan.emoji}</div>
                <h3 className="font-lora text-xl font-bold text-brun">{plan.name}</h3>
                <p className="text-2xl font-bold text-brun mt-2 mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6 flex-1">
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
      <section className="py-20 px-4 bg-gradient-to-br from-brun via-brun-mid to-sauge relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none text-9xl flex items-center justify-center gap-8 select-none">
          🥬🍅🥕🧅🫒🌿
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <span className="text-5xl block mb-4">🎯</span>
          <h2 className="font-lora text-4xl font-bold text-white mb-4">
            Commencez à piloter votre rentabilité
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Aucune carte bancaire requise · 3 plats gratuits dès maintenant
          </p>
          <Link href="/outil">
            <button className="bg-white text-brun font-bold text-base px-10 py-4 rounded-xl hover:bg-ivoire transition-colors shadow-lg">
              Calculer le food cost de mon premier plat →
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
