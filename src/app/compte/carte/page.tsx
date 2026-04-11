'use client'
import { useEffect, useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [popularityMap, setPopularityMap] = useState<Record<string, number>>({})
  const [showPopularityModal, setShowPopularityModal] = useState(false)
  const [popularitySaving, setPopularitySaving] = useState(false)
  const [view, setView] = useState<'table' | 'matrix'>('table')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortKey, setSortKey] = useState<keyof DishWithStatus>('name')
  const [sortAsc, setSortAsc] = useState(true)

  // Génération food costs en arrière-plan
  const [generatingFoodCosts, setGeneratingFoodCosts] = useState(false)
  const [foodCostProgress, setFoodCostProgress] = useState({ done: 0, total: 0 })

  // Multi-select
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkDeleting, setBulkDeleting] = useState(false)

  // Dish detail modal
  const [selectedDish, setSelectedDish] = useState<DishWithStatus | null>(null)
  const [editedIngredients, setEditedIngredients] = useState<import('@/lib/supabase').Ingredient[]>([])
  const [dishSaving, setDishSaving] = useState(false)

  // Scan carte IA
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showScanModal, setShowScanModal] = useState(false)
  const [scanPreview, setScanPreview] = useState<string | null>(null)
  const [scanLoading, setScanLoading] = useState(false)
  const [scanError, setScanError] = useState('')
  const [scannedDishes, setScannedDishes] = useState<ScannedDish[]>([])
  const [importLoading, setImportLoading] = useState(false)
  const [importDone, setImportDone] = useState(0)
  const [importPhase, setImportPhase] = useState<'inserting' | 'generating' | 'done' | ''>('')
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
    if (filterStatus !== 'all') d = d.filter(dish => dish.status === filterStatus)
    return d.slice().sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      if (typeof av === 'string' && typeof bv === 'string') return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av)
      if (typeof av === 'number' && typeof bv === 'number') return sortAsc ? av - bv : bv - av
      return 0
    })
  }, [dishesWithStatus, filterCategory, filterStatus, sortKey, sortAsc])

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

  // ── Génération food costs pour plats sans ingrédients ─────────────────────
  const handleGenerateFoodCosts = async () => {
    const empty = dishes.filter(d => !d.ingredients || d.ingredients.length === 0)
    if (empty.length === 0) return
    setGeneratingFoodCosts(true)
    setFoodCostProgress({ done: 0, total: empty.length })

    for (let i = 0; i < empty.length; i++) {
      const dish = empty[i]
      try {
        const res = await fetch('/api/ai/ingredients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: dish.name }),
        })
        const aiData = await res.json()
        if (!aiData.ingredients?.length) continue

        const ingredients = aiData.ingredients.map((ing: { name: string; qty: number }) => {
          const price_per_kg = getPriceForIngredient(ing.name, {})
          return { name: ing.name, qty_grams: ing.qty, price_per_kg, cost: price_per_kg * ing.qty / 1000 }
        })

        const metrics = calculateDishMetrics(ingredients, 1, 30, {})
        const priceAdvised = dish.price_advised > 0 ? dish.price_advised : metrics.priceAdvised
        const margin_pct = priceAdvised > 0 ? ((priceAdvised - metrics.costPerCover) / priceAdvised) * 100 : 0

        await supabase.from('dishes').update({
          ingredients,
          total_cost: metrics.totalCost,
          price_advised: priceAdvised,
          margin_pct,
        }).eq('id', dish.id)

        setDishes(prev => prev.map(d => d.id === dish.id
          ? { ...d, ingredients, total_cost: metrics.totalCost, margin_pct, price_advised: priceAdvised }
          : d
        ))
      } catch { /* continue */ }

      setFoodCostProgress({ done: i + 1, total: empty.length })
      // Pause 500ms entre chaque pour ne pas saturer l'API
      if (i < empty.length - 1) await new Promise(r => setTimeout(r, 500))
    }

    // Recharger depuis Supabase pour avoir les données à jour
    const { data } = await supabase.from('dishes').select('*').eq('user_id', user!.id)
    setDishes(data || [])
    setGeneratingFoodCosts(false)
    setFoodCostProgress({ done: 0, total: 0 })
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
    setImportPhase('inserting')
    setImportDone(0)
    setScanError('')

    // 1. Insertion en batch
    const rows = toImport.map(d => ({
      user_id: user.id,
      name: d.name,
      category: d.category ?? 'plat',
      ingredients: [],
      covers: 1,
      is_shared: false,
      target_food_cost: 30,
      total_cost: 0,
      price_advised: d.price ? Number(d.price) : 0,
      margin_pct: 0,
      allergens: [],
      notes: d.description ?? '',
    }))

    const { data: inserted, error: insertError } = await supabase
      .from('dishes')
      .insert(rows)
      .select()

    if (insertError || !inserted) {
      console.error('Insert error:', insertError?.message)
      setScanError(`Erreur d'import : ${insertError?.message}`)
      setImportLoading(false)
      setImportPhase('')
      return
    }

    // 2. Génération food costs séquentielle (côté client — pas de limite serveur)
    setImportPhase('generating')

    for (let i = 0; i < inserted.length; i++) {
      const dish = inserted[i]
      try {
        const res = await fetch('/api/ai/ingredients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: dish.name }),
        })
        const aiData = await res.json()
        if (!aiData.ingredients?.length) {
          setImportDone(i + 1)
          continue
        }

        const ingredients = aiData.ingredients.map((ing: { name: string; qty: number }) => {
          const price_per_kg = getPriceForIngredient(ing.name, {})
          return { name: ing.name, qty_grams: ing.qty, price_per_kg, cost: price_per_kg * ing.qty / 1000 }
        })

        const metrics = calculateDishMetrics(ingredients, 1, 30, {})
        const priceAdvised = dish.price_advised > 0 ? dish.price_advised : metrics.priceAdvised
        const margin_pct = priceAdvised > 0 ? ((priceAdvised - metrics.costPerCover) / priceAdvised) * 100 : 0

        await supabase.from('dishes').update({
          ingredients,
          total_cost: metrics.totalCost,
          price_advised: priceAdvised,
          margin_pct,
        }).eq('id', dish.id)
      } catch { /* continue avec le plat suivant */ }

      setImportDone(i + 1)
      if (i < inserted.length - 1) await new Promise(r => setTimeout(r, 400))
    }

    // 3. Recharger tout depuis Supabase
    const { data } = await supabase.from('dishes').select('*').eq('user_id', user.id)
    setDishes(data || [])
    setImportPhase('done')
    setImportLoading(false)

    // Fermer après 2s
    setTimeout(() => {
      setShowScanModal(false)
      setScanPreview(null)
      setScannedDishes([])
      setImportDone(0)
      setImportPhase('')
    }, 2000)
  }

  // ── Sauvegarde ingrédients modifiés ───────────────────────────────────────
  const handleSaveDish = async () => {
    if (!selectedDish || !user) return
    setDishSaving(true)
    const updatedIngredients = editedIngredients.map(ing => ({
      ...ing,
      cost: ing.price_per_kg * ing.qty_grams / 1000,
    }))
    const totalCost = updatedIngredients.reduce((sum, ing) => sum + ing.cost, 0)
    const costPerCover = (selectedDish.covers || 1) > 0 ? totalCost / (selectedDish.covers || 1) : totalCost
    const priceAdvised = selectedDish.price_advised > 0 ? selectedDish.price_advised : costPerCover / 0.30
    const margin_pct = priceAdvised > 0 ? ((priceAdvised - costPerCover) / priceAdvised) * 100 : 0
    await supabase.from('dishes').update({ ingredients: updatedIngredients, total_cost: totalCost, margin_pct }).eq('id', selectedDish.id)
    setDishes(prev => prev.map(d => d.id === selectedDish.id ? { ...d, ingredients: updatedIngredients, total_cost: totalCost, margin_pct } : d))
    setDishSaving(false)
    setSelectedDish(null)
  }

  // ── Suppression d'un plat ──────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from('dishes').delete().eq('id', deleteId)
    setDishes(prev => prev.filter(d => d.id !== deleteId))
    setDeleteId(null)
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Supprimer ${selectedIds.size} plat${selectedIds.size > 1 ? 's' : ''} ? Cette action est irréversible.`)) return
    setBulkDeleting(true)
    await supabase.from('dishes').delete().in('id', Array.from(selectedIds))
    setDishes(prev => prev.filter(d => !selectedIds.has(d.id)))
    setSelectedIds(new Set())
    setBulkDeleting(false)
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
              {dishes.some(d => !d.ingredients || d.ingredients.length === 0) && (
                <Button
                  variant="secondary"
                  size="sm"
                  loading={generatingFoodCosts}
                  onClick={handleGenerateFoodCosts}
                  title="Calculer les food costs des plats sans ingrédients"
                >
                  {generatingFoodCosts
                    ? `Food costs… (${foodCostProgress.done}/${foodCostProgress.total})`
                    : `Recalculer food costs (${dishes.filter(d => !d.ingredients || d.ingredients.length === 0).length})`
                  }
                </Button>
              )}
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
              <div className="flex gap-2 mb-4 flex-wrap items-center">
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
                <span className="w-px h-5 bg-brun-pale mx-1" />
                {(['all', 'etoile', 'vache', 'mystere', 'poids_mort'] as const).map(s => {
                  const isActive = filterStatus === s
                  const conf = s !== 'all' ? STATUS_CONFIG[s] : null
                  return (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${isActive ? 'bg-brun text-white border-brun shadow-sm' : 'bg-white border-brun-pale text-brun-mid hover:bg-creme'}`}
                    >
                      {conf ? `${conf.icon} ${conf.label}` : 'Tous statuts'}
                    </button>
                  )
                })}
              </div>

              {/* Bulk delete */}
              {selectedIds.size > 0 && (
                <div className="flex items-center gap-3 mb-3">
                  <button
                    onClick={handleBulkDelete}
                    disabled={bulkDeleting}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors"
                  >
                    {bulkDeleting ? 'Suppression…' : `Supprimer la sélection (${selectedIds.size})`}
                  </button>
                  <button
                    onClick={() => setSelectedIds(new Set())}
                    className="text-sm text-brun-light hover:text-brun"
                  >
                    Désélectionner tout
                  </button>
                </div>
              )}

              {/* Tableau */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brun-pale">
                      <th className="pb-3 px-2 w-8">
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={filtered.length > 0 && filtered.every(d => selectedIds.has(d.id))}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedIds(prev => new Set([...prev, ...filtered.map(d => d.id)]))
                            } else {
                              setSelectedIds(prev => { const next = new Set(prev); filtered.forEach(d => next.delete(d.id)); return next })
                            }
                          }}
                        />
                      </th>
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
                      <th className="text-right text-xs font-semibold text-brun-light uppercase tracking-wide pb-3 px-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(dish => {
                      const conf = STATUS_CONFIG[dish.status]
                      return (
                        <tr
                          key={dish.id}
                          className="border-b border-brun-pale/50 hover:bg-creme transition-colors cursor-pointer group"
                          onClick={() => { setSelectedDish(dish); setEditedIngredients(dish.ingredients ? [...dish.ingredients] : []) }}
                        >
                          <td className="py-3 px-2 w-8" onClick={e => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              className="rounded"
                              checked={selectedIds.has(dish.id)}
                              onChange={() => setSelectedIds(prev => {
                                const next = new Set(prev)
                                if (next.has(dish.id)) next.delete(dish.id)
                                else next.add(dish.id)
                                return next
                              })}
                            />
                          </td>
                          <td className="py-3 px-2 font-medium text-brun group-hover:text-orange transition-colors">
                            {dish.name}
                          </td>
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
                          <td className="py-3 px-2 text-right">
                            <button
                              onClick={(e) => { e.stopPropagation(); setDeleteId(dish.id) }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 text-brun-light hover:text-red-500"
                              title="Supprimer ce plat"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
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

      {/* Modale détail plat */}
      {selectedDish && (() => {
        const liveTotalCost = editedIngredients.reduce((s, i) => s + i.price_per_kg * i.qty_grams / 1000, 0)
        const livePriceAdvised = selectedDish.price_advised > 0 ? selectedDish.price_advised : liveTotalCost / 0.30
        const liveFoodCostPct = livePriceAdvised > 0 ? liveTotalCost / livePriceAdvised * 100 : 0
        const statusConf = STATUS_CONFIG[selectedDish.status]
        return (
          <Modal open={!!selectedDish} onClose={() => setSelectedDish(null)} title={selectedDish.name} maxWidth="max-w-2xl">
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-creme rounded-xl p-3 text-center">
                <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-1">Food cost live</p>
                <p className={`font-lora text-xl font-bold ${liveFoodCostPct <= 28 ? 'text-sauge' : liveFoodCostPct <= 35 ? 'text-orange' : 'text-red-500'}`}>
                  {formatPct(liveFoodCostPct)}
                </p>
              </div>
              <div className="bg-creme rounded-xl p-3 text-center">
                <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-1">Prix de vente</p>
                <p className="font-lora text-xl font-bold text-brun">{formatEuros(selectedDish.price_advised)}</p>
              </div>
              <div className="bg-creme rounded-xl p-3 text-center">
                <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-1">Statut</p>
                <Badge variant={statusConf.variant}>{statusConf.icon} {statusConf.label}</Badge>
              </div>
            </div>

            {/* Ingrédients */}
            {editedIngredients.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-brun-light text-sm mb-4">Aucun ingrédient calculé — cliquez sur &laquo;&nbsp;Calculer food cost&nbsp;&raquo; depuis la liste</p>
                <Button variant="secondary" size="sm" onClick={() => setSelectedDish(null)}>Fermer</Button>
              </div>
            ) : (
              <>
                <div className="space-y-2 max-h-72 overflow-y-auto mb-5">
                  {editedIngredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-3 py-2 bg-white border border-brun-pale rounded-xl">
                      <span className="flex-1 font-medium text-brun text-sm">{ing.name}</span>
                      <span className="text-xs text-brun-light w-12 text-right">{ing.qty_grams}g</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          className="w-20 text-sm border border-brun-pale rounded-lg px-2 py-1 text-right focus:outline-none focus:border-orange"
                          value={ing.price_per_kg}
                          onClick={e => e.stopPropagation()}
                          onChange={e => {
                            const val = parseFloat(e.target.value) || 0
                            setEditedIngredients(prev => prev.map((it, i) => i === idx ? { ...it, price_per_kg: val, cost: val * it.qty_grams / 1000 } : it))
                          }}
                        />
                        <span className="text-xs text-brun-light">€/kg</span>
                      </div>
                      <span className="text-sm font-semibold text-brun w-16 text-right">
                        {(ing.price_per_kg * ing.qty_grams / 1000).toFixed(3)} €
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" className="flex-1" onClick={() => setSelectedDish(null)}>Annuler</Button>
                  <Button className="flex-1" loading={dishSaving} onClick={handleSaveDish}>Sauvegarder</Button>
                </div>
              </>
            )}
          </Modal>
        )
      })()}

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

      {/* Modale confirmation suppression */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Supprimer ce plat ?" maxWidth="max-w-sm">
        <p className="text-sm text-brun-light mb-6">
          Cette action est irréversible. Le plat sera définitivement supprimé de votre carte.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteId(null)}>
            Annuler
          </Button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Supprimer
          </button>
        </div>
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
            {importPhase === 'done' && (
              <div className="bg-sauge-pale text-sauge text-sm font-medium px-4 py-2.5 rounded-xl mb-3 text-center">
                ✓ {importDone} plat{importDone > 1 ? 's' : ''} importé{importDone > 1 ? 's' : ''} avec food costs calculés
              </div>
            )}

            {/* Barre de progression pendant la génération */}
            {importPhase === 'generating' && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-brun-light mb-1.5">
                  <span>Calcul des food costs…</span>
                  <span>{importDone}/{scannedDishes.filter(d => d.selected).length}</span>
                </div>
                <div className="w-full bg-brun-pale/30 rounded-full h-2">
                  <div
                    className="bg-orange h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(importDone / scannedDishes.filter(d => d.selected).length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <Button
              className="w-full"
              loading={importLoading}
              disabled={scannedDishes.filter(d => d.selected).length === 0 || importPhase === 'done'}
              onClick={handleImport}
            >
              {importPhase === 'inserting'
                ? 'Insertion en base…'
                : importPhase === 'generating'
                  ? `Calcul food costs… (${importDone}/${scannedDishes.filter(d => d.selected).length})`
                  : `Importer ${scannedDishes.filter(d => d.selected).length} plat${scannedDishes.filter(d => d.selected).length > 1 ? 's' : ''} avec food costs`
              }
            </Button>
            <p className="text-xs text-brun-light mt-2 text-center">
              L'IA génère les ingrédients et calcule le food cost de chaque plat automatiquement
            </p>
          </div>
        )}
      </Modal>
    </>
  )
}
