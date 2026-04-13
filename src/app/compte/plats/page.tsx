'use client'
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useAuth } from '@/hooks/useAuth'
import { supabase, Dish } from '@/lib/supabase'
import { formatEuros, formatPct, getFoodCostStatus } from '@/lib/calculations'
import { generateDishPDF } from '@/lib/pdf'

const FREE_LIMIT = 3

const CATEGORIES = [
  { value: '', label: 'Tous' },
  { value: 'plat', label: 'Plats' },
  { value: 'entrée', label: 'Entrées' },
  { value: 'dessert', label: 'Desserts' },
  { value: 'autre', label: 'Autres' },
]

export default function PlatsPage() {
  const { user, profile, isPro } = useAuth()
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [pdfLoading, setPdfLoading] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [sortCol, setSortCol] = useState<'name' | 'cost' | 'food_cost' | 'margin' | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [costHistory, setCostHistory] = useState<Record<string, number[]>>({})

  const handleSort = (col: typeof sortCol) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('desc') }
  }

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

        // Charger l'historique des coûts (dernières 8 valeurs par plat)
        if (data && data.length > 0) {
          const dishIds = data.map((d: Dish) => d.id)
          supabase
            .from('dish_cost_history')
            .select('dish_id, food_cost_pct, recorded_at')
            .in('dish_id', dishIds)
            .order('recorded_at', { ascending: true })
            .then(({ data: history }) => {
              if (!history) return
              const map: Record<string, number[]> = {}
              history.forEach((h: { dish_id: string; food_cost_pct: number }) => {
                if (!map[h.dish_id]) map[h.dish_id] = []
                map[h.dish_id].push(Number(h.food_cost_pct))
              })
              // Garder les 8 dernières valeurs par plat
              Object.keys(map).forEach(id => { map[id] = map[id].slice(-8) })
              setCostHistory(map)
            })
        }
      })
  }, [user])

  const filteredDishes = useMemo(() => {
    const filtered = dishes.filter(d => {
      const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase())
      const matchCat = !filterCategory || d.category === filterCategory
      return matchSearch && matchCat
    })
    if (!sortCol) return filtered
    return [...filtered].sort((a, b) => {
      let va = 0, vb = 0
      if (sortCol === 'name') {
        const cmp = a.name.localeCompare(b.name)
        return sortDir === 'asc' ? cmp : -cmp
      }
      if (sortCol === 'cost') { va = a.total_cost / (a.covers || 1); vb = b.total_cost / (b.covers || 1) }
      if (sortCol === 'food_cost') {
        va = (a.total_cost / (a.covers || 1)) / a.price_advised * 100
        vb = (b.total_cost / (b.covers || 1)) / b.price_advised * 100
      }
      if (sortCol === 'margin') { va = a.margin_pct; vb = b.margin_pct }
      return sortDir === 'asc' ? va - vb : vb - va
    })
  }, [dishes, search, filterCategory, sortCol, sortDir])

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from('dishes').delete().eq('id', deleteId)
    setDishes(prev => prev.filter(d => d.id !== deleteId))
    setDeleteId(null)
  }

  const handlePDF = async (dish: Dish) => {
    if (!isPro) return
    if (!profile) return
    setPdfLoading(dish.id)
    try {
      await generateDishPDF(dish, profile)
    } finally {
      setPdfLoading(null)
    }
  }

  const atLimit = !isPro && dishes.length >= FREE_LIMIT

  return (
    <>
      <Nav />
      <div className="pt-24 min-h-screen pb-16 px-4 bg-creme">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-lora text-3xl font-bold text-brun">Mes plats</h1>
              <p className="text-brun-light mt-1">{dishes.length} plat{dishes.length !== 1 ? 's' : ''} sauvegardé{dishes.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex gap-3">
              {atLimit && (
                <Link href="/tarifs">
                  <Button variant="secondary" size="sm">Passer au Pro</Button>
                </Link>
              )}
              <Link href="/outil">
                <Button size="sm">+ Nouveau plat</Button>
              </Link>
            </div>
          </div>

          {!isPro && (
            <div className="bg-brun-pale rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
              <p className="text-sm text-brun-mid">
                Plan gratuit : {dishes.length}/{FREE_LIMIT} plats utilisés
              </p>
              {atLimit && (
                <Link href="/tarifs" className="text-sm text-orange font-semibold hover:underline">
                  Débloquer des plats illimités →
                </Link>
              )}
            </div>
          )}

          {/* Barre de recherche + filtres */}
          {dishes.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brun-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher un plat…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-field pl-9 text-sm"
                />
              </div>
              <div className="flex gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setFilterCategory(cat.value)}
                    className={`px-3 py-2 text-sm rounded-xl font-medium transition-colors ${
                      filterCategory === cat.value
                        ? 'bg-orange text-white'
                        : 'bg-white border border-brun-pale text-brun-mid hover:border-orange hover:text-orange'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-brun-pale/40 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : dishes.length === 0 ? (
            <Card className="text-center py-16">
              <span className="text-5xl block mb-4">🍽️</span>
              <h3 className="font-lora text-xl font-semibold text-brun mb-2">Aucun plat sauvegardé</h3>
              <p className="text-brun-light mb-4">Utilisez le calculateur pour analyser votre premier plat</p>
              <Link href="/outil"><Button>Analyser un plat</Button></Link>
            </Card>
          ) : filteredDishes.length === 0 ? (
            <Card className="text-center py-12">
              <span className="text-4xl block mb-3">🔍</span>
              <p className="text-brun-light">Aucun plat ne correspond à votre recherche.</p>
              <button onClick={() => { setSearch(''); setFilterCategory('') }} className="text-orange text-sm font-semibold mt-2 hover:underline">
                Effacer les filtres
              </button>
            </Card>
          ) : (
            <>
              {/* En-têtes de tri */}
              <div className="hidden sm:flex items-center px-4 mb-1 text-xs font-semibold text-brun-light uppercase tracking-wide">
                <button className="flex-1 flex items-center gap-1 text-left hover:text-brun transition-colors" onClick={() => handleSort('name')}>
                  Plat {sortCol === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </button>
                <div className="flex items-center gap-6 shrink-0 mr-24">
                  <button className="w-16 text-right hover:text-brun transition-colors" onClick={() => handleSort('cost')}>
                    Coût {sortCol === 'cost' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </button>
                  <button className="w-20 text-right hover:text-brun transition-colors" onClick={() => handleSort('food_cost')}>
                    Food cost {sortCol === 'food_cost' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </button>
                  <button className="w-14 text-right hover:text-brun transition-colors" onClick={() => handleSort('margin')}>
                    Marge {sortCol === 'margin' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </button>
                </div>
              </div>
            <div className="space-y-3">
              {filteredDishes.map((dish) => {
                const foodCostPct = dish.total_cost && dish.price_advised && dish.covers
                  ? (dish.total_cost / dish.covers) / dish.price_advised * 100
                  : 30
                const status = getFoodCostStatus(foodCostPct)
                return (
                  <Card key={dish.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <h3 className="font-semibold text-brun truncate">{dish.name}</h3>
                          <Badge variant={status.color === 'green' ? 'green' : status.color === 'orange' ? 'orange' : 'red'}>
                            {formatPct(foodCostPct)}
                          </Badge>
                          {/* Mini sparkline food cost */}
                          {costHistory[dish.id] && costHistory[dish.id].length > 1 && (
                            <span className="inline-flex items-end gap-px ml-2" title="Évolution food cost">
                              {costHistory[dish.id].map((v, i) => (
                                <span
                                  key={i}
                                  className="inline-block w-1 rounded-sm"
                                  style={{
                                    height: `${Math.max(4, Math.min(16, v / 3))}px`,
                                    background: v <= 28 ? '#7A9E7E' : v <= 35 ? '#F2854A' : '#EF4444',
                                    opacity: 0.4 + (i / costHistory[dish.id].length) * 0.6,
                                  }}
                                />
                              ))}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-brun-light capitalize">
                          {dish.category} · {dish.covers} couvert{dish.covers !== 1 ? 's' : ''}
                          {dish.allergens?.length ? ` · ${dish.allergens.length} allergène${dish.allergens.length !== 1 ? 's' : ''}` : ''}
                        </p>
                      </div>

                      <div className="hidden sm:flex items-center gap-6 text-right shrink-0">
                        <div>
                          <p className="text-xs text-brun-light">Coût</p>
                          <p className="font-semibold text-sm text-brun">
                            {formatEuros(dish.total_cost / (dish.covers || 1))}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-brun-light">Prix conseillé</p>
                          <p className="font-bold text-sm text-orange">{formatEuros(dish.price_advised)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-brun-light">Marge</p>
                          <p className="font-semibold text-sm text-sauge">{formatPct(dish.margin_pct)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link href={`/compte/plats/${dish.id}`}>
                          <Button size="sm" variant="secondary" title="Modifier ce plat">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Button>
                        </Link>
                        {isPro ? (
                          <Button
                            size="sm"
                            variant="secondary"
                            loading={pdfLoading === dish.id}
                            onClick={() => handlePDF(dish)}
                            title="Exporter PDF"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            PDF
                          </Button>
                        ) : (
                          <Link href="/tarifs">
                            <Button size="sm" variant="ghost" title="Export PDF — Plan Pro">
                              <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                              </svg>
                            </Button>
                          </Link>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteId(dish.id)}
                          className="text-red-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
            </>
          )}

          {!isPro && dishes.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-orange-pale via-citron-pale to-sauge-pale rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-orange/20">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🥕</span>
                <div>
                  <h3 className="font-lora text-lg font-bold text-brun">Exportez vos fiches techniques en PDF</h3>
                  <p className="text-brun-mid text-sm mt-1">Fiches professionnelles prêtes à l'impression — Plan Pro à 15€/mois</p>
                </div>
              </div>
              <Link href="/tarifs" className="shrink-0">
                <Button>Passer au Pro →</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Supprimer ce plat">
        <p className="text-brun-mid mb-6">Cette action est irréversible. Le plat sera définitivement supprimé.</p>
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setDeleteId(null)}>Annuler</Button>
          <Button variant="danger" className="flex-1" onClick={handleDelete}>Supprimer</Button>
        </div>
      </Modal>
    </>
  )
}
