// No metadata export here — this is a client component
'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

const PLANS = [
  {
    id: 'free',
    name: 'Gratuit',
    price: '0€',
    period: '',
    emoji: '🌱',
    description: "Pour découvrir l'outil",
    priceId: null,
    features: [
      '3 plats sauvegardés',
      'Calcul food cost en temps réel',
      'Génération IA (3 calculs)',
      'Base de prix FranceAgriMer',
    ],
    missing: [
      'Plats illimités',
      'Export PDF',
      'Analyse de carte',
      'Prix fournisseurs',
    ],
    cta: 'Commencer gratuitement',
    ctaLink: '/inscription',
    highlight: false,
    accentBg: 'bg-ivoire',
    accentBorder: 'border-brun-pale',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '15€',
    period: '/mois HT',
    emoji: '🥕',
    description: 'Pour les restaurateurs actifs',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
    features: [
      'Plats illimités',
      'Génération IA illimitée',
      'Export fiche technique PDF',
      'Analyse de carte complète',
      'Prix fournisseurs personnalisés',
      'Historique et suivi des coûts',
      'Base de prix FranceAgriMer',
    ],
    missing: [],
    cta: 'Commencer le plan Pro',
    highlight: true,
    accentBg: 'bg-white',
    accentBorder: 'border-orange',
  },
  {
    id: 'multi',
    name: 'Multi',
    price: '30€',
    period: '/mois HT',
    emoji: '🧺',
    description: 'Pour les groupes & franchises',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MULTI,
    features: [
      'Tout le plan Pro',
      "Jusqu'à 5 établissements",
      'Bases de prix séparées par site',
      "Partage d'équipe",
      'Support prioritaire',
    ],
    missing: [],
    cta: 'Commencer le plan Multi',
    highlight: false,
    accentBg: 'bg-ivoire',
    accentBorder: 'border-brun-pale',
  },
]

export default function TarifsPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const highlightPlan = searchParams.get('plan')
  const [loading, setLoading] = useState<string | null>(null)
  const [isAnnual, setIsAnnual] = useState(false)

  const getEffectivePriceId = (plan: typeof PLANS[0]) => {
    if (plan.id === 'pro') return isAnnual
      ? (process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL || plan.priceId)
      : plan.priceId
    if (plan.id === 'multi') return isAnnual
      ? (process.env.NEXT_PUBLIC_STRIPE_PRICE_MULTI_ANNUAL || plan.priceId)
      : plan.priceId
    return plan.priceId
  }

  const handleSubscribe = async (priceId: string | undefined, planId: string) => {
    if (!priceId) return
    if (!user) {
      window.location.href = `/inscription?redirect=/tarifs&plan=${planId}`
      return
    }
    setLoading(planId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId: user.id, isAnnual }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <>
      <Nav />
      <div className="pt-24 pb-20 px-4 bg-creme min-h-screen">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-4xl block mb-3">🧺</span>
            <h1 className="font-lora text-4xl font-bold text-brun mb-3">
              Des tarifs simples et transparents
            </h1>
            <p className="text-brun-light text-lg max-w-xl mx-auto mb-6">
              Sans engagement. Résiliable à tout moment. Facturation HT.
            </p>
            {/* Toggle mensuel/annuel */}
            <div className="inline-flex items-center gap-3 bg-white border border-brun-pale rounded-2xl p-1.5">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${!isAnnual ? 'bg-brun text-white shadow-sm' : 'text-brun-mid hover:text-brun'}`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${isAnnual ? 'bg-brun text-white shadow-sm' : 'text-brun-mid hover:text-brun'}`}
              >
                Annuel
                <span className="bg-sauge text-white text-xs px-1.5 py-0.5 rounded-full font-bold">-20%</span>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border-2 p-6 flex flex-col ${plan.accentBg} ${plan.accentBorder} ${
                  plan.highlight || highlightPlan === plan.id ? 'shadow-xl ring-2 ring-orange' : 'shadow-sm'
                }`}
              >
                {(plan.highlight || highlightPlan === plan.id) && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-orange text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
                      Le plus populaire
                    </span>
                  </div>
                )}

                <div className="text-4xl mb-3">{plan.emoji}</div>

                <div className="mb-5">
                  <h2 className="font-lora text-xl font-bold text-brun">{plan.name}</h2>
                  <p className="text-brun-light text-sm mt-1">{plan.description}</p>
                  <div className="flex items-end gap-1 mt-3">
                    {plan.id === 'pro' ? (
                      <>
                        <span className="font-lora text-4xl font-bold text-brun">{isAnnual ? '12€' : '15€'}</span>
                        <span className="text-brun-light text-sm mb-1">/mois HT</span>
                        {isAnnual && <span className="ml-1 mb-1 text-xs text-sauge font-bold">144€/an</span>}
                      </>
                    ) : plan.id === 'multi' ? (
                      <>
                        <span className="font-lora text-4xl font-bold text-brun">{isAnnual ? '24€' : '30€'}</span>
                        <span className="text-brun-light text-sm mb-1">/mois HT</span>
                        {isAnnual && <span className="ml-1 mb-1 text-xs text-sauge font-bold">288€/an</span>}
                      </>
                    ) : (
                      <>
                        <span className="font-lora text-4xl font-bold text-brun">{plan.price}</span>
                        {plan.period && <span className="text-brun-light text-sm mb-1">{plan.period}</span>}
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-brun">
                      <svg className="w-4 h-4 text-sauge shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                  {plan.missing?.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-brun-light/60">
                      <svg className="w-4 h-4 text-brun-pale shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.id === 'free' ? (
                  <Link href={plan.ctaLink!}>
                    <Button variant="secondary" className="w-full">{plan.cta}</Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full"
                    variant={plan.highlight ? 'primary' : 'secondary'}
                    loading={loading === plan.id}
                    onClick={() => handleSubscribe(getEffectivePriceId(plan) ?? undefined, plan.id)}
                  >
                    {plan.cta}
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Garantie */}
          <div className="bg-sauge-pale border border-sauge-light rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left mb-14">
            <span className="text-4xl shrink-0">🛡️</span>
            <div>
              <h3 className="font-lora font-bold text-brun text-lg">Satisfait ou remboursé 14 jours</h3>
              <p className="text-sm text-brun-mid mt-1">Si l'outil ne vous convient pas dans les 14 premiers jours, on vous rembourse sans question. C'est notre engagement.</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-3xl">🌿</span>
              <h2 className="font-lora text-2xl font-bold text-brun mt-2">Questions fréquentes</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: 'Puis-je annuler à tout moment ?',
                  a: "Oui, sans condition ni pénalité. Votre accès Pro reste actif jusqu'à la fin de la période en cours.",
                },
                {
                  q: "D'où viennent les prix des ingrédients ?",
                  a: "Ils sont basés sur les cotations officielles FranceAgriMer, mises à jour régulièrement. Avec le plan Pro, vous pouvez saisir vos propres prix fournisseurs.",
                },
                {
                  q: 'Le plan gratuit est-il vraiment gratuit ?',
                  a: "Oui, sans limite de durée et sans carte bancaire requise. Vous pouvez calculer le food cost et sauvegarder jusqu'à 3 plats.",
                },
                {
                  q: 'Comment fonctionne la facturation ?',
                  a: 'Facturation mensuelle via Stripe. Vous recevez une facture HT par email chaque mois.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl border border-brun-pale p-5">
                  <h3 className="font-semibold text-brun mb-2 flex items-center gap-2">
                    <span className="text-orange">→</span> {q}
                  </h3>
                  <p className="text-sm text-brun-light leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
