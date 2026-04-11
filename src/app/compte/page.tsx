'use client'
import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { useAuth } from '@/hooks/useAuth'
import { supabase, Dish } from '@/lib/supabase'
import { formatEuros, formatPct } from '@/lib/calculations'

function getDishFoodCost(dish: Dish): number | null {
  if (!dish.total_cost || !dish.price_advised || !dish.price_advised) return null
  return (dish.total_cost / (dish.covers || 1)) / dish.price_advised * 100
}

export default function ComptePage() {
  const { user, profile, plan, isPro } = useAuth()
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const upgraded = searchParams.get('upgraded')
  const welcome = searchParams.get('welcome')

  useEffect(() => {
    if (!user) return
    supabase
      .from('dishes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .then(({ data }) => {
        setDishes(data || [])
        setLoading(false)
      })
  }, [user])

  const kpis = useMemo(() => {
    const withCost = dishes.filter(d => getDishFoodCost(d) !== null)
    if (withCost.length === 0) return null
    const foodCosts = withCost.map(d => getDishFoodCost(d) as number)
    const avg = foodCosts.reduce((a, b) => a + b, 0) / foodCosts.length
    const toOptimize = withCost.filter(d => (getDishFoodCost(d) as number) > 33)
    const best = withCost.reduce((a, b) =>
      (getDishFoodCost(a) as number) < (getDishFoodCost(b) as number) ? a : b
    )
    return { avg, toOptimize: toOptimize.length, total: withCost.length, best }
  }, [dishes])

  const recentDishes = dishes.slice(0, 5)
  const planLabel = plan === 'pro' ? 'Pro' : plan === 'multi' ? 'Multi' : 'Gratuit'
  const planVariant = isPro ? 'green' : 'gray'

  return (
    <>
      <Nav />
      <div className="pt-24 min-h-screen pb-16 px-4 bg-creme">
        <div className="max-w-5xl mx-auto">

          {welcome && (
            <div className="bg-sauge-pale border border-sauge-light text-sauge font-medium text-sm px-5 py-3 rounded-xl mb-6 flex items-center gap-2">
              <span className="text-lg">🥬</span>
              Votre adresse email a bien été confirmée. Bienvenue sur Costyfood !
            </div>
          )}

          {upgraded && (
            <div className="bg-sauge-pale border border-sauge-light text-sauge font-medium text-sm px-5 py-3 rounded-xl mb-6 flex items-center gap-2">
              <span className="text-lg">🎉</span>
              Votre abonnement Pro est actif. Toutes les fonctionnalités sont débloquées !
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-lora text-3xl font-bold text-brun">Tableau de bord</h1>
              <p className="text-brun-light mt-1 flex items-center gap-1.5">
                <span>🧑‍🍳</span> {profile?.email}
              </p>
            </div>
            <Badge variant={planVariant}>
              {plan === 'pro' ? '🥕 ' : plan === 'multi' ? '🧺 ' : '🌱 '}Plan {planLabel}
            </Badge>
          </div>

          {/* Quick nav cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Link href="/outil">
              <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
                <div className="text-3xl mb-3">🧮</div>
                <h3 className="font-semibold text-brun">Calculateur</h3>
                <p className="text-xs text-brun-light mt-1">Analyser un nouveau plat</p>
              </Card>
            </Link>
            <Link href="/compte/plats">
              <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-semibold text-brun">Mes plats</h3>
                <p className="text-xs text-brun-light mt-1">{dishes.length} plat{dishes.length !== 1 ? 's' : ''} sauvegardé{dishes.length !== 1 ? 's' : ''}</p>
              </Card>
            </Link>
            <Link href={isPro ? '/compte/carte' : '/tarifs'}>
              <Card className={`hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full ${!isPro ? 'opacity-60' : ''}`}>
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold text-brun">Analyse carte</h3>
                <p className="text-xs text-brun-light mt-1">{isPro ? 'Menu engineering' : '🔒 Plan Pro requis'}</p>
              </Card>
            </Link>
            <Link href="/compte/facturation">
              <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
                <div className="text-3xl mb-3">💳</div>
                <h3 className="font-semibold text-brun">Facturation</h3>
                <p className="text-xs text-brun-light mt-1">Gérer l'abonnement</p>
              </Card>
            </Link>
          </div>

          {/* KPIs */}
          {!loading && kpis && (
            <div className="mb-8">
              {kpis.toOptimize > 0 && (
                <div className="flex items-center gap-2.5 bg-tomate-pale border border-tomate/20 text-tomate text-sm font-medium px-4 py-3 rounded-xl mb-4">
                  <span className="text-base">⚠️</span>
                  <span>{kpis.toOptimize} plat{kpis.toOptimize > 1 ? 's' : ''} avec un food cost &gt; 33% — pensez à les optimiser</span>
                  <Link href="/compte/plats" className="ml-auto text-xs underline hover:no-underline shrink-0">Voir →</Link>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white border border-brun-pale rounded-2xl px-4 py-4 text-center">
                  <p className="text-xs text-brun-light mb-1">Food cost moyen</p>
                  <p className={`font-lora text-2xl font-bold ${kpis.avg <= 28 ? 'text-sauge' : kpis.avg <= 33 ? 'text-orange' : 'text-tomate'}`}>
                    {kpis.avg.toFixed(1)}%
                  </p>
                  <p className="text-xs text-brun-light mt-1">sur {kpis.total} plat{kpis.total > 1 ? 's' : ''}</p>
                </div>
                <div className="bg-white border border-brun-pale rounded-2xl px-4 py-4 text-center">
                  <p className="text-xs text-brun-light mb-1">Meilleure marge</p>
                  <p className="font-lora text-2xl font-bold text-sauge truncate text-ellipsis">
                    {kpis.best.name.length > 12 ? kpis.best.name.slice(0, 12) + '…' : kpis.best.name}
                  </p>
                  <p className="text-xs text-sauge mt-1">{formatPct(getDishFoodCost(kpis.best) as number)} food cost</p>
                </div>
                <div className="bg-white border border-brun-pale rounded-2xl px-4 py-4 text-center">
                  <p className="text-xs text-brun-light mb-1">À optimiser</p>
                  <p className={`font-lora text-2xl font-bold ${kpis.toOptimize === 0 ? 'text-sauge' : 'text-tomate'}`}>
                    {kpis.toOptimize === 0 ? '✓' : kpis.toOptimize}
                  </p>
                  <p className="text-xs text-brun-light mt-1">{kpis.toOptimize === 0 ? 'Tout est ok' : 'food cost > 33%'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Derniers plats */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-lora text-xl font-semibold text-brun flex items-center gap-2">
                <span>🍽️</span> Derniers plats
              </h2>
              <Link href="/compte/plats" className="text-sm text-orange font-semibold hover:underline">
                Voir tous →
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-brun-pale/30 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : recentDishes.length === 0 ? (
              <Card className="text-center py-12">
                <span className="text-5xl block mb-4">🥗</span>
                <p className="text-brun-light mb-4">Aucun plat sauvegardé pour l'instant</p>
                <Link href="/outil">
                  <button className="btn-primary text-sm">Analyser mon premier plat</button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-3">
                {recentDishes.map((dish) => {
                  const fc = getDishFoodCost(dish)
                  return (
                    <Card key={dish.id} className="flex items-center justify-between p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🍴</span>
                        <div>
                          <h3 className="font-semibold text-brun">{dish.name}</h3>
                          <p className="text-xs text-brun-light capitalize">{dish.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <div className="hidden sm:block">
                          <p className="text-xs text-brun-light">Food cost</p>
                          <p className={`font-bold text-sm ${fc === null ? 'text-brun-light' : fc <= 28 ? 'text-sauge' : fc <= 33 ? 'text-orange' : 'text-tomate'}`}>
                            {fc !== null ? formatPct(fc) : '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-brun-light">Prix conseillé</p>
                          <p className="font-bold text-sm text-brun">{formatEuros(dish.price_advised)}</p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Upsell si Free */}
          {!isPro && (
            <div className="mt-10 bg-gradient-to-r from-orange-pale via-citron-pale to-sauge-pale rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-orange/20">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🥕</span>
                <div>
                  <h3 className="font-lora text-xl font-bold text-brun">Analysez votre carte complète</h3>
                  <p className="text-brun-mid text-sm mt-1">Menu engineering, export PDF, prix personnalisés — Plan Pro à 15€/mois</p>
                </div>
              </div>
              <Link href="/tarifs" className="shrink-0">
                <button className="btn-primary whitespace-nowrap">Passer au Pro →</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
