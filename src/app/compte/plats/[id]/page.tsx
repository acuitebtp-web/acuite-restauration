'use client'
import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Toggle } from '@/components/ui/Toggle'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { supabase, Ingredient, Dish } from '@/lib/supabase'
import { INGREDIENT_NAMES, getPriceForIngredient } from '@/lib/ingredients'
import { calculateDishMetrics, formatEuros, formatPct, getFoodCostStatus } from '@/lib/calculations'
import { generateDishPDF } from '@/lib/pdf'

const CATEGORY_OPTIONS = [
  { value: 'plat', label: 'Plat principal' },
  { value: 'entrée', label: 'Entrée' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'autre', label: 'Autre' },
]

const ALLERGENS_LIST = [
  'Gluten', 'Crustacés', 'Œufs', 'Poissons', 'Arachides', 'Soja',
  'Lait', 'Fruits à coque', 'Céleri', 'Moutarde', 'Graines de sésame',
  'Sulfites', 'Lupin', 'Mollusques',
]

export default function EditDishPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { user, profile, isPro } = useAuth()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [notFound, setNotFound] = useState(false)

  // Champs du plat
  const [dishName, setDishName] = useState('')
  const [category, setCategory] = useState<'entrée' | 'plat' | 'dessert' | 'autre'>('plat')
  const [targetFoodCost, setTargetFoodCost] = useState(30)
  const [covers, setCovers] = useState(1)
  const [isShared, setIsShared] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [allergens, setAllergens] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [showAllergens, setShowAllergens] = useState(false)

  // Ajout ingrédient
  const [newIngName, setNewIngName] = useState('')
  const [newIngQty, setNewIngQty] = useState('')

  // Chargement du plat
  useEffect(() => {
    if (!user || !id) return
    supabase
      .from('dishes')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { setNotFound(true); setLoading(false); return }
        const dish = data as Dish
        setDishName(dish.name)
        setCategory(dish.category as typeof category)
        setTargetFoodCost(dish.target_food_cost)
        setCovers(dish.covers)
        setIsShared(dish.is_shared)
        setIngredients(dish.ingredients || [])
        setAllergens(dish.allergens || [])
        setNotes(dish.notes || '')
        setLoading(false)
      })
  }, [user, id])

  const metrics = useMemo(() => {
    if (ingredients.length === 0) return null
    return calculateDishMetrics(ingredients, isShared ? covers : 1, targetFoodCost)
  }, [ingredients, covers, isShared, targetFoodCost])

  const addIngredient = () => {
    if (!newIngName.trim() || !newIngQty) return
    const pricePerKg = getPriceForIngredient(newIngName)
    const qty_grams = parseFloat(newIngQty)
    const cost = pricePerKg * qty_grams / 1000
    setIngredients(prev => [...prev, { name: newIngName, qty_grams, price_per_kg: pricePerKg, cost }])
    setNewIngName('')
    setNewIngQty('')
  }

  const updateIngredient = (index: number, field: 'name' | 'qty_grams', value: string | number) => {
    setIngredients(prev => prev.map((ing, i) => {
      if (i !== index) return ing
      const updated = { ...ing, [field]: value }
      if (field === 'name') updated.price_per_kg = getPriceForIngredient(value as string)
      updated.cost = updated.price_per_kg * updated.qty_grams / 1000
      return updated
    }))
  }

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    if (!user || !metrics) return
    setSaving(true)
    const { error } = await supabase
      .from('dishes')
      .update({
        name: dishName,
        category,
        ingredients,
        covers: isShared ? covers : 1,
        is_shared: isShared,
        target_food_cost: targetFoodCost,
        total_cost: metrics.totalCost,
        price_advised: metrics.priceAdvised,
        margin_pct: metrics.marginPct,
        allergens,
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user.id)

    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  const handlePDF = async () => {
    if (!isPro || !profile || !metrics) return
    setPdfLoading(true)
    const dish: Dish = {
      id, user_id: user!.id, name: dishName, category,
      ingredients, covers: isShared ? covers : 1, is_shared: isShared,
      target_food_cost: targetFoodCost, total_cost: metrics.totalCost,
      price_advised: metrics.priceAdvised, price_actual: null,
      margin_pct: metrics.marginPct, allergens, notes,
      created_at: '', updated_at: '',
    }
    await generateDishPDF(dish, profile)
    setPdfLoading(false)
  }

  if (loading) {
    return (
      <>
        <Nav />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-brun-light">Chargement...</div>
        </div>
      </>
    )
  }

  if (notFound) {
    return (
      <>
        <Nav />
        <div className="pt-24 min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="font-lora text-2xl font-bold text-brun mb-3">Plat introuvable</h2>
            <p className="text-brun-light mb-4">Ce plat n'existe pas ou ne vous appartient pas.</p>
            <Link href="/compte/plats"><Button>Retour à mes plats</Button></Link>
          </div>
        </div>
      </>
    )
  }

  const foodCostStatus = metrics ? getFoodCostStatus(metrics.foodCostPct) : null

  return (
    <>
      <Nav />
      <div className="pt-16 min-h-screen bg-creme">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">

          {/* ── Colonne gauche ── */}
          <div className="lg:w-[420px] lg:min-w-[420px] border-r border-brun-pale bg-white p-6 space-y-5 lg:overflow-y-auto lg:h-[calc(100vh-64px)] lg:sticky lg:top-16">

            {/* Header */}
            <div className="flex items-center gap-3">
              <Link href="/compte/plats" className="text-brun-light hover:text-brun transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="font-lora text-xl font-bold text-brun">Modifier le plat</h1>
            </div>

            <div className="border-t border-brun-pale" />

            {/* Paramètres */}
            <div className="space-y-4">
              <Input
                label="Nom du plat"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
              />
              <Select
                label="Catégorie"
                options={CATEGORY_OPTIONS}
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Food cost cible"
                  type="number" min={5} max={80}
                  suffix="%"
                  value={targetFoodCost}
                  onChange={(e) => setTargetFoodCost(Number(e.target.value))}
                />
                <Input
                  label="Couverts"
                  type="number" min={1}
                  value={covers}
                  onChange={(e) => setCovers(Number(e.target.value))}
                  disabled={!isShared}
                />
              </div>
              <Toggle checked={isShared} onChange={setIsShared} label="Plat à partager" />
            </div>

            <div className="border-t border-brun-pale" />

            {/* Ingrédients */}
            <div>
              <h2 className="font-lora text-base font-semibold text-brun mb-3">Composition</h2>
              {ingredients.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-2 bg-creme rounded-xl p-2">
                      <div className="flex-1 min-w-0">
                        <input
                          className="text-sm font-medium text-brun bg-transparent w-full truncate focus:outline-none"
                          value={ing.name}
                          onChange={(e) => updateIngredient(i, 'name', e.target.value)}
                        />
                      </div>
                      <input
                        type="number"
                        className="w-16 text-sm text-center bg-white border border-brun-pale rounded-lg px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-orange"
                        value={ing.qty_grams} min={1}
                        onChange={(e) => updateIngredient(i, 'qty_grams', Number(e.target.value))}
                      />
                      <span className="text-xs text-brun-light">g</span>
                      <span className="text-xs text-brun-light w-14 text-right shrink-0">{ing.cost.toFixed(3)} €</span>
                      <button onClick={() => removeIngredient(i)} className="text-brun-light hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-brun-light italic mb-4">Aucun ingrédient</p>
              )}
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    list="ingredients-list-edit"
                    className="input-field text-sm"
                    placeholder="Nom de l'ingrédient"
                    value={newIngName}
                    onChange={(e) => setNewIngName(e.target.value)}
                  />
                  <datalist id="ingredients-list-edit">
                    {INGREDIENT_NAMES.map(n => <option key={n} value={n} />)}
                  </datalist>
                </div>
                <input
                  type="number"
                  className="w-20 input-field text-sm text-center"
                  placeholder="g"
                  value={newIngQty}
                  onChange={(e) => setNewIngQty(e.target.value)}
                  min={1}
                />
                <Button size="sm" onClick={addIngredient} disabled={!newIngName || !newIngQty}>+</Button>
              </div>
            </div>

            {/* Allergènes */}
            <div>
              <button
                className="text-sm font-semibold text-brun-mid hover:text-brun flex items-center gap-1"
                onClick={() => setShowAllergens(!showAllergens)}
              >
                Allergènes {showAllergens ? '▲' : '▼'}
              </button>
              {showAllergens && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {ALLERGENS_LIST.map(a => (
                    <label key={a} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-orange"
                        checked={allergens.includes(a)}
                        onChange={(e) => setAllergens(prev =>
                          e.target.checked ? [...prev, a] : prev.filter(x => x !== a)
                        )}
                      />
                      <span className="text-xs text-brun-mid">{a}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="label">Notes (optionnel)</label>
              <textarea
                className="input-field resize-none text-sm"
                rows={2}
                placeholder="Techniques, conseils de présentation..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              {saved && (
                <div className="bg-sauge-pale text-sauge text-sm font-medium px-4 py-2 rounded-xl text-center">
                  Modifications sauvegardées ✓
                </div>
              )}
              <Button className="w-full" size="lg" onClick={handleSave} loading={saving} disabled={!dishName || ingredients.length === 0}>
                Sauvegarder les modifications
              </Button>
              {isPro && (
                <Button variant="secondary" className="w-full" size="lg" onClick={handlePDF} loading={pdfLoading}>
                  Exporter en PDF
                </Button>
              )}
            </div>
          </div>

          {/* ── Colonne droite — Résultats ── */}
          <div className="flex-1 p-6">
            {!metrics ? (
              <div className="h-full flex items-center justify-center text-brun-light text-sm italic">
                Ajoutez des ingrédients pour voir les résultats
              </div>
            ) : (
              <div className="max-w-2xl space-y-5">
                <div className="flex items-center gap-3">
                  <Badge variant={category === 'entrée' ? 'blue' : category === 'dessert' ? 'green' : 'orange'}>
                    {CATEGORY_OPTIONS.find(c => c.value === category)?.label}
                  </Badge>
                  {isShared && <Badge variant="gray">{covers} couverts</Badge>}
                </div>
                <h1 className="font-lora text-3xl font-bold text-brun italic">{dishName || 'Mon plat'}</h1>

                {/* 3 métriques */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-2xl border border-brun-pale p-4 text-center">
                    <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-1">Coût matière</p>
                    <p className="font-lora text-2xl font-bold text-brun">{formatEuros(metrics.costPerCover)}</p>
                    <p className="text-xs text-brun-light">par assiette</p>
                  </div>
                  <div className="bg-orange rounded-2xl p-4 text-center shadow-sm">
                    <p className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-1">Prix conseillé</p>
                    <p className="font-lora text-2xl font-bold text-white">{formatEuros(metrics.priceAdvised)}</p>
                    <p className="text-xs text-white/70">à {targetFoodCost}% food cost</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-brun-pale p-4 text-center">
                    <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-1">Marge brute</p>
                    <p className="font-lora text-2xl font-bold text-sauge">{formatEuros(metrics.marginEuros)}</p>
                    <p className="text-xs text-brun-light">{formatPct(metrics.marginPct)}</p>
                  </div>
                </div>

                {/* Jauge food cost */}
                <div className="bg-white rounded-2xl border border-brun-pale p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-brun-mid">Food cost réel</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brun">{formatPct(metrics.foodCostPct)}</span>
                      <Badge variant={foodCostStatus?.color === 'green' ? 'green' : foodCostStatus?.color === 'orange' ? 'orange' : 'red'}>
                        {foodCostStatus?.label}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-3 bg-brun-pale rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${metrics.foodCostPct <= 28 ? 'bg-sauge' : metrics.foodCostPct <= 35 ? 'bg-orange' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(100, metrics.foodCostPct * 2)}%` }}
                    />
                  </div>
                </div>

                {/* Décomposition */}
                <div className="bg-white rounded-2xl border border-brun-pale p-5">
                  <h3 className="font-semibold text-brun mb-3">Décomposition du coût</h3>
                  <div className="space-y-2">
                    {ingredients.slice().sort((a, b) => b.cost - a.cost).map((ing, i) => {
                      const pct = metrics.totalCost > 0 ? (ing.cost / metrics.totalCost) * 100 : 0
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-brun-mid truncate">{ing.name}</span>
                              <span className="text-brun font-medium ml-2">{pct.toFixed(0)}%</span>
                            </div>
                            <div className="h-1.5 bg-brun-pale rounded-full">
                              <div className="h-full bg-orange-light rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                          <span className="text-xs text-brun-light w-14 text-right shrink-0">{ing.cost.toFixed(3)} €</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Allergènes */}
                {allergens.length > 0 && (
                  <div className="bg-white rounded-2xl border border-brun-pale p-5">
                    <h3 className="font-semibold text-brun mb-3">Allergènes</h3>
                    <div className="flex flex-wrap gap-2">
                      {allergens.map(a => <Badge key={a} variant="orange">{a}</Badge>)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
