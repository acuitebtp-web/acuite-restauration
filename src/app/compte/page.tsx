'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { useAuth } from '@/hooks/useAuth'
import { supabase, Dish } from '@/lib/supabase'
import { formatEuros, formatPct } from '@/lib/calculations'

export default function ComptePage() {
  const { user, profile, plan, isPro } = useAuth()
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const upgraded = searchParams.get('upgraded')

  useEffect(() => {
    if (!user) return
    supabase
      .from('dishes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(5)
      .then(({ data }) => {
        setDishes(data || [])
        setLoading(false)
      })
  }, [user])

  const planLabel = plan === 'pro' ? 'Pro' : plan === 'multi' ? 'Multi' : 'Gratuit'
  const planVariant = isPro ? 'green' : 'gray'

  return (
    <>
      <Nav />
      <div className="pt-24 min-h-screen pb-16 px-4">
        <div className="max-w-5xl mx-auto">

          {upgraded && (
            <div className="bg-sauge-pale border border-sauge-light text-sauge font-medium text-sm px-5 py-3 rounded-xl mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Votre abonnement Pro est actif. Toutes les fonctionnalités sont débloquées !
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-lora text-3xl font-bold text-brun">Tableau de bord</h1>
              <p className="text-brun-light mt-1">{profile?.email}</p>
            </div>
            <Badge variant={planVariant}>Plan {planLabel}</Badge>
          </div>

          {/* Quick nav cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <Link href="/outil">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-10 h-10 bg-orange-pale rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 20h16a2 2 0 002-2V8a2 2 0 00-.586-1.414l-5-5A2 2 0 0014 1H6a2 2 0 00-2 2v5" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brun">Calculateur</h3>
                <p className="text-xs text-brun-light mt-1">Analyser un nouveau plat</p>
              </Card>
            </Link>
            <Link href="/compte/plats">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-10 h-10 bg-sauge-pale rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-sauge" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brun">Mes plats</h3>
                <p className="text-xs text-brun-light mt-1">{dishes.length} plat{dishes.length !== 1 ? 's' : ''} sauvegardé{dishes.length !== 1 ? 's' : ''}</p>
              </Card>
            </Link>
            <Link href={isPro ? '/compte/carte' : '/tarifs'}>
              <Card className={`hover:shadow-md transition-shadow cursor-pointer h-full ${!isPro ? 'opacity-70' : ''}`}>
                <div className="w-10 h-10 bg-brun-pale rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-brun-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brun">Analyse carte</h3>
                <p className="text-xs text-brun-light mt-1">{isPro ? 'Menu engineering' : 'Plan Pro requis'}</p>
              </Card>
            </Link>
            <Link href="/compte/facturation">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-10 h-10 bg-orange-pale rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brun">Facturation</h3>
                <p className="text-xs text-brun-light mt-1">Gérer l'abonnement</p>
              </Card>
            </Link>
          </div>

          {/* Derniers plats */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-lora text-xl font-semibold text-brun">Derniers plats</h2>
              <Link href="/compte/plats" className="text-sm text-orange font-semibold hover:underline">
                Voir tous
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-brun-pale/40 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : dishes.length === 0 ? (
              <Card className="text-center py-10">
                <p className="text-brun-light mb-3">Aucun plat sauvegardé pour l'instant</p>
                <Link href="/outil">
                  <button className="btn-primary text-sm">Analyser mon premier plat</button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-3">
                {dishes.map((dish) => (
                  <Card key={dish.id} className="flex items-center justify-between p-4 hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="font-semibold text-brun">{dish.name}</h3>
                      <p className="text-xs text-brun-light capitalize">{dish.category}</p>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div className="hidden sm:block">
                        <p className="text-xs text-brun-light">Food cost</p>
                        <p className={`font-bold text-sm ${dish.margin_pct > 65 ? 'text-sauge' : dish.margin_pct > 60 ? 'text-orange' : 'text-red-500'}`}>
                          {dish.total_cost && dish.price_advised ? formatPct((dish.total_cost / (dish.covers || 1)) / dish.price_advised * 100) : '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-brun-light">Prix conseillé</p>
                        <p className="font-bold text-sm text-brun">{formatEuros(dish.price_advised)}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Upsell si Free */}
          {!isPro && (
            <div className="mt-10 bg-gradient-to-r from-orange-pale to-orange-light rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-lora text-xl font-bold text-brun">Analysez votre carte complète</h3>
                <p className="text-brun-mid text-sm mt-1">Menu engineering, export PDF, prix personnalisés — Plan Pro à 19€/mois</p>
              </div>
              <Link href="/tarifs" className="shrink-0">
                <button className="btn-primary whitespace-nowrap">Passer au Pro</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
