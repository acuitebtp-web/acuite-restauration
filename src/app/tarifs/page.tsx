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
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '19€',
    period: '/mois HT',
    description: 'Pour les restaurateurs actifs',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
    envKey: 'STRIPE_PRICE_PRO',
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
  },
  {
    id: 'multi',
    name: 'Multi',
    price: '49€',
    period: '/mois HT',
    description: 'Pour les groupes & franchises',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MULTI,
    envKey: 'STRIPE_PRICE_MULTI',
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
  },
]

export default function TarifsPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const highlightPlan = searchParams.get('plan')
  const [loading, setLoading] = useState<string | null>(null)

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
        body: JSON.stringify({ priceId, userId: user.id }),
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
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="font-lora text-4xl font-bold text-brun mb-3">
              Des tarifs simples et transparents
            </h1>
            <p className="text-brun-light text-lg max-w-xl mx-auto">
              Sans engagement. Résiliable à tout moment. Facturation HT.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  plan.highlight || highlightPlan === plan.id
                    ? 'border-orange bg-white shadow-xl ring-2 ring-orange'
                    : 'border-brun-pale bg-white shadow-sm'
                }`}
              >
                {(plan.highlight || highlightPlan === plan.id) && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                      Le plus populaire
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h2 className="font-lora text-xl font-bold text-brun">{plan.name}</h2>
                  <p className="text-brun-light text-sm mt-1">{plan.description}</p>
                  <div className="flex items-end gap-1 mt-3">
                    <span className="font-lora text-4xl font-bold text-brun">{plan.price}</span>
                    {plan.period && <span className="text-brun-light text-sm mb-1">{plan.period}</span>}
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
                    <li key={f} className="flex items-start gap-2.5 text-sm text-brun-light">
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
                    onClick={() => handleSubscribe(plan.priceId ?? undefined, plan.id)}
                  >
                    {plan.cta}
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-lora text-2xl font-bold text-brun text-center mb-8">Questions fréquentes</h2>
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
                  <h3 className="font-semibold text-brun mb-2">{q}</h3>
                  <p className="text-sm text-brun-light">{a}</p>
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
