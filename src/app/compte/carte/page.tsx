'use client'
import { useEffect, useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'
import { supabase, Dish } from '@/lib/supabase'
import { formatEuros, formatPct, calculateDishMetrics } from '@/lib/calculations'
import { getPriceForIngredient } from '@/lib/ingredients'

interface ScannedDish {
  name: string
  category: 'entrée' | 'plat' | 'dessert' | 'autre'
  price: number | null
  description: string | null
  selected: boolean
}
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label
} from 'recharts'

type MenuStatus = 'etoile' | 'vache' | 'mystere' | 'poids_mort'

interface DishWithStatus extends Dish {
  status: MenuStatus
  popularity: number
  foodCostPct: number
  marginPerCover: number
}

const STATUS_CONFIG: Record<MenuStatus, { label: string; icon: string; variant: 'green' | 'orange' | 'blue' | 'red'; description: string }> = {
  etoile:    { label: 'Étoile',     icon: '⭐', variant: 'green',  description: 'Populaire & rentable — à mettre en avant' },
  vache:     { label: 'Vache à lait', icon: '🐄', variant: 'orange', description: 'Populaire mais peu rentable — revoir le prix' },
  mystere:   { label: 'Mystère',    icon: '❓', variant: 'blue',   description: 'Rentable mais peu populaire — à promouvoir' },
  poids_mort: { label: 'Poids mort', icon: '💀', variant: 'red',   description: 'Peu populaire & peu rentable — à retravailler' },
}

export default function CartePage() {
  const { user, isPro } = useAuth()
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [popularityMap, setPopularityMap] = useState<Record<string, number>>({})
  const [showPopularityModal, setShowPopularityModal] = useState(false)
  const [popularitySaving, setPopularitySaving] = useState(false)
  const [view, setView] = useState<'table' | 'matrix'>('table')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [sortKey, setSortKey] = useState<keyof DishWithStatus>('name')
  const [sortAsc, setSortAsc] = useState(true)

  // Scan carte IA
  const [showScanModal, setShowScanModal] = useState(false)
  const [scanPreview, setScanPreview] = useState<string | null>(null)
  const [scanLoading, setScanLoading] = useState(false)
  const [scanError, setScanError] = useState('')
  const [scannedDishes, setScannedDishes] = useState<ScannedDish[]>([])
  const [importLoading, setImportLoading] = useState(false)
  const [importDone, setImportDone] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!user) return
    supabase
      .from('dishes')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => {
        const loaded = data || []
        setDishes(loaded)
        // Initialiser la map depuis les valeurs sauvegardées en BDD
        const map: Record<string, number> = {}
        loaded.forEach(d => {
          if (d.popularity != null) map[d.id] = d.popularity
        })
        setPopularityMap(map)
        setLoading(false)
      })
  }, [user])

  const dishesWithStatus = useMemo((): DishWithStatus[] => {
    if (dishes.length === 0) return []

    const enriched = dishes.map(dish => {
      const costPerCover = dish.covers > 0 ? dish.total_cost / dish.covers : dish.total_cost
      const foodCostPct = dish.price_advised > 0 ? costPerCover / dish.price_advised * 100 : 30
      const marginPerCover = dish.price_advised - costPerCover
      const popularity = popularityMap[dish.id] ?? 50
      return { ...dish, foodCostPct, marginPerCover, popularity, status: 'etoile' as MenuStatus }
    })

    const avgMargin = enriched.reduce((s, d) => s + d.marginPerCover, 0) / enriched.length
    const avgPopularity = enriched.reduce((s, d) => s + d.popularity, 0) / enriched.length

    return enriched.map(dish => {
      const highMargin = dish.marginPerCover >= avgMargin
      const highPopularity = dish.popularity >= avgPopularity
      let status: MenuStatus
      if (highMargin && highPopularity) status = 'etoile'
      else if (!highMargin && highPopularity) status = 'vache'
      else if (highMargin && !highPopularity) status = 'mystere'
      else status = 'poids_mort'
      return { ...dish, status }
    })
  }, [dishes, popularityMap])

  const filtered = useMemo(() => {
    let d = dishesWithStatus
    if (filterCategory !== 'all') d = d.filter(dish => dish.category === filterCategory)
    return d.slice().sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      if (typeof av === 'string' && typeof bv === 'string') return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av)
      if (typeof av === 'number' && typeof bv === 'number') return sortAsc ? av - bv : bv - av
      return 0
    })
  }, [dishesWithStatus, filterCategory, sortKey, sortAsc])

  // KPIs
  const kpis = useMemo(() => {
    if (dishesWithStatus.length === 0) return null
    const avgFoodCost = dishesWithStatus.reduce((s, d) => s + d.foodCostPct, 0) / dishesWithStatus.length
    const avgMargin = dishesWithStatus.reduce((s, d) => s + d.marginPerCover, 0) / dishesWithStatus.length
    const deficitCount = dishesWithStatus.filter(d => d.foodCostPct > 35).length
    const potentialRevenue = dishesWithStatus
      .filter(d => d.foodCostPct > 35)
      .reduce((s, d) => s + (d.price_advised * (d.popularity / 100) * 52), 0) * 0.1
    return { avgFoodCost, avgMargin, deficitCount, potentialRevenue }
  }, [dishesWithStatus])

  const toggleSort = (key: keyof DishWithStatus) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(true) }
  }

  // ── Scan carte IA ──────────────────────────────────────────────────────────
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setScanError('')
    setScannedDishes([])
    setImportDone(0)

    // Preview
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string
      setScanPreview(dataUrl)

      // Extraire base64 et mimeType
      const [header, base64] = dataUrl.split(',')
      const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg'

      setScanLoading(true)
      try {
        const res = await fetch('/api/ai/scan-carte', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, mimeType }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Erreur analyse')
        if (data.dishes?.length) {
          setScannedDishes(data.dishes.map((d: Omit<ScannedDish, 'selected'>) => ({ ...d, selected: true })))
        } else {
          setScanError('Aucun plat détecté — essayez avec une photo plus nette.')
        }
      } catch (err) {
        setScanError(err instanceof Error ? err.message : 'Erreur lors de l\'analyse')
      } finally {
        setScanLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleImport = async () => {
    if (!user) return
    const toImport = scannedDishes.filter(d => d.selected)
    setImportLoading(true)
    setScanError('')
    let count = 0

    for (const d of toImport) {
      try {
        // 1. Générer les ingrédients via l'IA
        const res = await fetch('/api/ai/ingredients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: d.name }),
        })
        const aiData = await res.json()
        const ingredients = (aiData.ingredients || []).map((ing: { name: string; qty: number }) => {
          const price_per_kg = getPriceForIngredient(ing.name, {})
          return { name: ing.name, qty_grams: ing.qty, price_per_kg, cost: price_per_kg * ing.qty / 1000 }
        })

        // 2. Calculer les métriques
        const metrics = ingredients.length > 0 ? calculateDishMetrics(ingredients, 1, 30, {}) : null
        const priceActual = d.price ? Number(d.price) : null
        const priceAdvised = priceActual ?? metrics?.priceAdvised ?? 0

        // 3. Insérer dans Supabase
        const { error: insertError } = await supabase.from('dishes').insert({
          user_id: user.id,
          name: d.name,
          category: d.category ?? 'plat',
          ingredients,
          covers: 1,
          is_shared: false,
          target_food_cost: 30,
          total_cost: metrics?.totalCost ?? 0,
          price_advised: priceAdvised,
          price_actual: priceActual,
          margin_pct: metrics?.marginPct ?? 0,
          allergens: [],
          notes: d.description ?? '',
          popularity: null,
        })

        if (insertError) {
          console.error('Insert error for', d.name, insertError.message)
        } else {
          count++
          setImportDone(count)
        }
      } catch (err) {
        console.error('Import error for', d.name, err)
      }
    }

    // 4. Recharger les plats depuis Supabase
    const { data } = await supabase.from('dishes').select('*').eq('user_id', user.id)
    setDishes(data || [])
    setImportLoading(false)

    // 5. Afficher le résultat puis fermer après 2s
    if (count === 0) {
      setScanError(`Échec de l'import — vérifiez votre connexion et réessayez.`)
    } else {
      setImportDone(count)
      setTimeout(() => {
        setShowScanModal(false)
        setScanPreview(null)
        setScannedDishes([])
        setImportDone(0)
      }, 2000)
    }
  }

  if (!isPro) {
    return (
      <>
        <Nav />
        <div className="pt-24 min-h-screen flex items-center justify-center px-4">
          <Card className="max-w-md text-center py-12">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="font-lora text-xl font-bold text-brun mb-2">Analyse de carte — Plan Pro</h2>
            <p className="text-brun-light text-sm mb-6">
              Classez chaque plat selon sa popularité et sa rentabilité (menu engineering).
              Identifiez vos Étoiles, Vaches à lait, Mystères et Poids morts.
              <br /><strong>Plan Pro à 15€/mois</strong> — sans engagement.
            </p>
            <Link href="/tarifs"><Button>Voir le plan Pro</Button></Link>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      <Nav />
      <div className="pt-24 min-h-screen pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-lora text-3xl font-bold text-brun">Analyse de carte</h1>
              <p className="text-brun-light mt-1">{dishes.length} plat{dishes.length !== 1 ? 's' : ''} analysé{dishes.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="secondary" size="sm" onClick={() => { setShowScanModal(true); setScanPreview(null); setScannedDishes([]); setScanError(''); setImportDone(0) }}>
                <svg className="w-4 h-4 mr-1.5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Scanner ma carte
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowPopularityModal(true)}>
                Saisir la popularité
              </Button>
              <div className="flex rounded-xl border border-brun-pale overflow-hidden">
                <button
                  className={`px-4 py-2 text-sm font-medium transition-colors ${view === 'table' ? 'bg-orange text-white' : 'bg-white text-brun-mid hover:bg-creme'}`}
                  onClick={() => setView('table')}
                >Liste</button>
                <button
                  className={`px-4 py-2 text-sm font-medium transition-colors ${view === 'matrix' ? 'bg-orange text-white' : 'bg-white text-brun-mid hover:bg-creme'}`}
                  onClick={() => setView('matrix')}
                >Matrice</button>
              </div>
            </div>
          </div>

          {/* KPIs */}
          {kpis && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="text-center p-4">
                <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-1">Food cost moyen</p>
                <p className={`font-lora text-2xl font-bold ${kpis.avgFoodCost <= 28 ? 'text-sauge' : kpis.avgFoodCost <= 35 ? 'text-orange' : 'text-red-500'}`}>
                  {formatPct(kpis.avgFoodCost)}
                </p>
              </Card>
              <Card className="text-center p-4">
                <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-1">Marge moyenne</p>
                <p className="font-lora text-2xl font-bold text-brun">{formatEuros(kpis.avgMargin)}</p>
                <p className="text-xs text-brun-light">par assiette</p>
              </Card>
              <Card className="text-center p-4">
                <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-1">Plats déficitaires</p>
                <p className={`font-lora text-2xl font-bold ${kpis.deficitCount > 0 ? 'text-red-500' : 'text-sauge'}`}>
                  {kpis.deficitCount}
                </p>
                <p className="text-xs text-brun-light">food cost &gt; 35%</p>
              </Card>
              <Card className="text-center p-4">
                <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-1">Potentiel à récupérer</p>
                <p className="font-lora text-2xl font-bold text-sauge">{formatEuros(kpis.potentialRevenue)}</p>
                <p className="text-xs text-brun-light">si cible atteinte</p>
              </Card>
            </div>
          )}

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-brun-pale/40 rounded-xl animate-pulse" />)}
            </div>
          ) : dishes.length === 0 ? (
            <Card className="text-center py-16">
              <p className="text-brun-light mb-4">Aucun plat sauvegardé. Commencez par analyser vos plats dans le calculateur.</p>
              <Link href="/outil"><Button>Analyser mes plats</Button></Link>
            </Card>
          ) : view === 'table' ? (
            <>
              {/* Filtres */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {['all', 'entrée', 'plat', 'dessert', 'autre'].map(cat => {
                  const isActive = filterCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${isActive ? 'bg-orange text-white border-orange shadow-sm' : 'bg-white border-brun-pale text-brun-mid hover:bg-creme'}`}
                    >
                      {cat === 'all' ? 'Tous' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  )
                })}
              </div>

              {/* Tableau */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brun-pale">
                      {[
                        { key: 'name', label: 'Plat' },
                        { key: 'category', label: 'Catégorie' },
                        { key: 'foodCostPct', label: 'Food cost' },
                        { key: 'price_advised', label: 'Prix' },
                        { key: 'marginPerCover', label: 'Marge €' },
                        { key: 'margin_pct', label: 'Marge %' },
                        { key: 'status', label: 'Statut' },
                      ].map(col => (
                        <th
                          key={col.key}
                          className="text-left text-xs font-semibold text-brun-light uppercase tracking-wide pb-3 px-2 cursor-pointer hover:text-brun select-none"
                          onClick={() => toggleSort(col.key as keyof DishWithStatus)}
                        >
                          {col.label} {sortKey === col.key ? (sortAsc ? '↑' : '↓') : ''}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(dish => {
                      const conf = STATUS_CONFIG[dish.status]
                      return (
                        <tr key={dish.id} className="border-b border-brun-pale/50 hover:bg-creme transition-colors">
                          <td className="py-3 px-2 font-medium text-brun">{dish.name}</td>
                          <td className="py-3 px-2 text-sm text-brun-light capitalize">{dish.category}</td>
                          <td className="py-3 px-2">
                            <span className={`text-sm font-bold ${dish.foodCostPct <= 28 ? 'text-sauge' : dish.foodCostPct <= 35 ? 'text-orange' : 'text-red-500'}`}>
                              {formatPct(dish.foodCostPct)}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm text-brun">{formatEuros(dish.price_advised)}</td>
                          <td className="py-3 px-2 text-sm font-semibold text-brun">{formatEuros(dish.marginPerCover)}</td>
                          <td className="py-3 px-2 text-sm text-brun">{formatPct(dish.margin_pct)}</td>
                          <td className="py-3 px-2">
                            <Badge variant={conf.variant}>
                              {conf.icon} {conf.label}
                            </Badge>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* Vue matrice scatter plot */
            <Card>
              <h3 className="font-semibold text-brun mb-6 text-center">Matrice Menu Engineering</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8D5C4" />
                    <XAxis dataKey="marginPerCover" name="Marge €" unit="€" tick={{ fontSize: 11 }} tickFormatter={(v) => Number(v).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}>
                      <Label value="Marge brute (€)" offset={-10} position="insideBottom" style={{ fontSize: 12, fill: '#6B4226' }} />
                    </XAxis>
                    <YAxis dataKey="popularity" name="Popularité" tick={{ fontSize: 11 }}>
                      <Label value="Popularité" angle={-90} position="insideLeft" style={{ fontSize: 12, fill: '#6B4226' }} />
                    </YAxis>
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ payload }) => {
                        if (!payload?.length) return null
                        const d = payload[0]?.payload as DishWithStatus
                        const conf = STATUS_CONFIG[d.status]
                        return (
                          <div className="bg-white border border-brun-pale rounded-xl p-3 shadow-sm text-sm">
                            <p className="font-bold text-brun mb-1">{d.name}</p>
                            <p className="text-brun-light">Marge : {formatEuros(d.marginPerCover)}</p>
                            <p className="text-brun-light">Food cost : {formatPct(d.foodCostPct)}</p>
                            <Badge variant={conf.variant} className="mt-1">{conf.icon} {conf.label}</Badge>
                          </div>
                        )
                      }}
                    />
                    {(['etoile', 'vache', 'mystere', 'poids_mort'] as MenuStatus[]).map(status => {
                      const color = status === 'etoile' ? '#7A9E7E' : status === 'vache' ? '#F2854A' : status === 'mystere' ? '#3B82F6' : '#EF4444'
                      return (
                        <Scatter
                          key={status}
                          name={STATUS_CONFIG[status].label}
                          data={dishesWithStatus.filter(d => d.status === status)}
                          fill={color}
                          opacity={0.8}
                        />
                      )
                    })}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              {/* Légende */}
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {(Object.entries(STATUS_CONFIG) as [MenuStatus, typeof STATUS_CONFIG[MenuStatus]][]).map(([status, conf]) => (
                  <div key={status} className="flex items-center gap-2 text-sm">
                    <Badge variant={conf.variant}>{conf.icon} {conf.label}</Badge>
                    <span className="text-brun-light text-xs">{conf.description}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Modale popularité */}
      <Modal open={showPopularityModal} onClose={() => setShowPopularityModal(false)} title="Saisir la popularité" maxWidth="max-w-lg">
        <p className="text-sm text-brun-light mb-4">
          Indiquez le nombre de couverts vendus par semaine pour chaque plat. Si non renseigné, tous les plats ont la même popularité.
        </p>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {dishes.map(dish => (
            <div key={dish.id} className="flex items-center justify-between gap-3">
              <span className="text-sm text-brun flex-1 truncate">{dish.name}</span>
              <input
                type="number"
                min={0}
                className="w-24 input-field text-sm text-center"
                placeholder="couverts/sem"
                value={popularityMap[dish.id] ?? ''}
                onChange={e => setPopularityMap(prev => ({ ...prev, [dish.id]: Number(e.target.value) }))}
              />
            </div>
          ))}
        </div>
        <Button
          className="w-full mt-4"
          loading={popularitySaving}
          onClick={async () => {
            setPopularitySaving(true)
            try {
              await Promise.all(
                dishes.map(dish =>
                  supabase
                    .from('dishes')
                    .update({ popularity: popularityMap[dish.id] ?? null })
                    .eq('id', dish.id)
                )
              )
            } finally {
              setPopularitySaving(false)
              setShowPopularityModal(false)
            }
          }}
        >
          Appliquer &amp; sauvegarder
        </Button>
      </Modal>

      {/* Modale scan carte IA */}
      <Modal open={showScanModal} onClose={() => setShowScanModal(false)} title="Scanner ma carte" maxWidth="max-w-2xl">
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />

        {/* Étape 1 — upload */}
        {!scanPreview && !scanLoading && (
          <div>
            <p className="text-sm text-brun-light mb-5">
              Prenez une photo de votre carte ou uploadez une image. L'IA détecte automatiquement tous vos plats, leurs catégories et prix.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-brun-pale rounded-2xl p-10 flex flex-col items-center gap-3 hover:border-orange hover:bg-orange-pale/30 transition-all"
            >
              <svg className="w-10 h-10 text-brun-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-semibold text-brun">Choisir une photo</span>
              <span className="text-xs text-brun-light">JPG, PNG, HEIC — taille max 10 Mo</span>
            </button>
            <p className="text-xs text-brun-light mt-3 text-center">
              Conseils : bonne luminosité, carte à plat, texte lisible
            </p>
          </div>
        )}

        {/* Étape 2 — analyse en cours */}
        {scanLoading && (
          <div className="text-center py-12">
            {scanPreview && (
              <img src={scanPreview} alt="Carte" className="w-32 h-32 object-cover rounded-xl mx-auto mb-5 opacity-60" />
            )}
            <div className="w-8 h-8 border-3 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-semibold text-brun mb-1">Analyse en cours…</p>
            <p className="text-sm text-brun-light">L'IA lit votre carte et extrait les plats</p>
          </div>
        )}

        {/* Erreur */}
        {scanError && !scanLoading && (
          <div className="text-center py-6">
            <p className="text-tomate text-sm mb-4">{scanError}</p>
            <Button variant="secondary" size="sm" onClick={() => { setScanError(''); setScanPreview(null); fileInputRef.current?.click() }}>
              Réessayer avec une autre photo
            </Button>
          </div>
        )}

        {/* Étape 3 — résultats */}
        {scannedDishes.length > 0 && !scanLoading && (
          <div>
            {/* Miniature photo */}
            {scanPreview && (
              <div className="flex items-center gap-3 mb-5 bg-creme rounded-xl p-3">
                <img src={scanPreview} alt="Carte" className="w-14 h-14 object-cover rounded-lg" />
                <div>
                  <p className="font-semibold text-brun text-sm">{scannedDishes.length} plats détectés</p>
                  <p className="text-xs text-brun-light">{scannedDishes.filter(d => d.selected).length} sélectionnés pour l'import</p>
                </div>
                <button
                  className="ml-auto text-xs text-orange hover:underline"
                  onClick={() => { setScanPreview(null); setScannedDishes([]); fileInputRef.current?.click() }}
                >
                  Nouvelle photo
                </button>
              </div>
            )}

            {/* Liste des plats détectés */}
            <div className="space-y-2 max-h-72 overflow-y-auto mb-5">
              {scannedDishes.map((d, i) => (
                <div
                  key={i}
                  onClick={() => setScannedDishes(prev => prev.map((p, j) => j === i ? { ...p, selected: !p.selected } : p))}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                    d.selected ? 'border-orange bg-orange-pale/30' : 'border-brun-pale bg-white opacity-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                    d.selected ? 'bg-orange border-orange' : 'border-brun-pale'
                  }`}>
                    {d.selected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-brun text-sm truncate">{d.name}</p>
                    {d.description && <p className="text-xs text-brun-light truncate">{d.description}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs bg-creme text-brun-mid px-2 py-0.5 rounded-full capitalize">{d.category}</span>
                    {d.price && <p className="text-xs font-semibold text-brun mt-0.5">{d.price.toFixed(2)} €</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Sélection rapide */}
            <div className="flex gap-2 mb-4">
              <button onClick={() => setScannedDishes(p => p.map(d => ({ ...d, selected: true })))} className="text-xs text-orange hover:underline">Tout sélectionner</button>
              <span className="text-brun-pale">·</span>
              <button onClick={() => setScannedDishes(p => p.map(d => ({ ...d, selected: false })))} className="text-xs text-brun-light hover:underline">Tout désélectionner</button>
            </div>

            {/* Import */}
            {importDone > 0 && (
              <div className="bg-sauge-pale text-sauge text-sm font-medium px-4 py-2.5 rounded-xl mb-3 text-center">
                ✓ {importDone} plat{importDone > 1 ? 's' : ''} importé{importDone > 1 ? 's' : ''} avec succès
              </div>
            )}
            <Button
              className="w-full"
              loading={importLoading}
              disabled={scannedDishes.filter(d => d.selected).length === 0}
              onClick={handleImport}
            >
              {importLoading
                ? `Import en cours… (${importDone}/${scannedDishes.filter(d => d.selected).length})`
                : `Importer ${scannedDishes.filter(d => d.selected).length} plat${scannedDishes.filter(d => d.selected).length > 1 ? 's' : ''}`
              }
            </Button>
            <p className="text-xs text-brun-light mt-2 text-center">
              L'IA génère les ingrédients et calcule le food cost pour chaque plat importé
            </p>
          </div>
        )}
      </Modal>
    </>
  )
}
