'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'

export default function FacturationPage() {
  const { user, profile, plan, isPro } = useAuth()
  const [loading, setLoading] = useState(false)

  const openPortal = async () => {
    if (!user) return
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const planLabel = plan === 'pro' ? 'Pro' : plan === 'multi' ? 'Multi-établissements' : 'Gratuit'
  const planPrice = plan === 'pro' ? '15€/mois HT' : plan === 'multi' ? '30€/mois HT' : 'Gratuit'

  return (
    <>
      <Nav />
      <div className="pt-24 min-h-screen pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-lora text-3xl font-bold text-brun mb-8">Facturation</h1>

          {/* Plan actuel */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-brun">Plan actuel</h2>
              <Badge variant={isPro ? 'green' : 'gray'}>{planLabel}</Badge>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-brun">{planPrice}</p>
                <p className="text-sm text-brun-light mt-1">{profile?.email}</p>
              </div>
              {isPro && (
                <Button variant="secondary" loading={loading} onClick={openPortal}>
                  Gérer l'abonnement
                </Button>
              )}
            </div>
          </Card>

          {/* Fonctionnalités */}
          <Card className="mb-6">
            <h2 className="font-semibold text-brun mb-4">Fonctionnalités incluses</h2>
            <ul className="space-y-2.5">
              {[
                { feature: 'Calcul food cost en temps réel', included: true },
                { feature: 'Génération IA des ingrédients', included: true },
                { feature: `Plats sauvegardés (${isPro ? 'illimités' : '3 max'})`, included: true },
                { feature: 'Export fiche technique PDF', included: isPro },
                { feature: 'Analyse de carte (menu engineering)', included: isPro },
                { feature: 'Prix fournisseurs personnalisés', included: isPro },
                { feature: 'Historique et suivi des coûts', included: isPro },
              ].map(({ feature, included }) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${included ? 'bg-sauge-pale text-sauge' : 'bg-brun-pale text-brun-light'}`}>
                    {included ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                  <span className={included ? 'text-brun' : 'text-brun-light'}>{feature}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Upgrade si Free */}
          {!isPro && (
            <Card className="bg-gradient-to-br from-orange-pale to-orange-light border-orange-light">
              <h2 className="font-lora text-xl font-bold text-brun mb-2">Passez au plan Pro</h2>
              <p className="text-brun-mid text-sm mb-4">
                Débloquez l'analyse de carte complète, les exports PDF et les prix personnalisés.
                Sans engagement, résiliable à tout moment.
              </p>
              <div className="flex gap-3">
                <Link href="/tarifs?plan=pro">
                  <Button>Pro — 19€/mois</Button>
                </Link>
                <Link href="/tarifs?plan=multi">
                  <Button variant="secondary">Multi — 30€/mois</Button>
                </Link>
              </div>
            </Card>
          )}

          {isPro && (
            <div className="text-sm text-brun-light text-center">
              <p>Pour annuler votre abonnement, utilisez le portail client Stripe ci-dessus.</p>
              <p className="mt-1">L'accès Pro reste actif jusqu'à la fin de la période en cours.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
