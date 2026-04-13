'use client'
import { Suspense } from 'react'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Toggle } from '@/components/ui/Toggle'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { supabase, Ingredient, CustomPrice } from '@/lib/supabase'
import { INGREDIENT_NAMES, getPriceForIngredient } from '@/lib/ingredients'
import { getFallbackClient } from '@/lib/fallback'
import { calculateDishMetrics, getPriceScenarios, getFoodCostStatus, formatEuros, formatPct } from '@/lib/calculations'

const SIMILAR_DISHES: Record<string, string[]> = {
  canard: ['Canard à l\'orange', 'Magret de canard, sauce miel-soja', 'Confit de canard'],
  boeuf: ['Entrecôte sauce bordelaise', 'Filet de bœuf en croûte', 'Tartare de bœuf'],
  wellington: ['Filet de bœuf en croûte', 'Côte de bœuf rôtie', 'Tournedos Rossini'],
  saumon: ['Saumon gravlax', 'Pavé de saumon laqué', 'Tataki de saumon'],
  agneau: ['Gigot d\'agneau confit', 'Épaule d\'agneau 7h', 'Côtelettes d\'agneau'],
  poulet: ['Poulet rôti aux herbes', 'Blanquette de poulet', 'Poulet basquaise'],
  veau: ['Blanquette de veau', 'Osso buco', 'Côte de veau à la crème'],
  saint: ['Homard grillé', 'Coquilles Saint-Jacques à la bretonne', 'Langoustines flambées'],
  risotto: ['Risotto aux truffes', 'Risotto au homard', 'Risotto aux asperges'],
  foie: ['Foie gras mi-cuit', 'Terrine de foie gras', 'Foie gras poêlé aux figues'],
}

function getSimilarDishes(name: string): string[] {
  const n = name.toLowerCase()
  for (const [key, suggestions] of Object.entries(SIMILAR_DISHES)) {
    if (n.includes(key)) return suggestions
  }
  return ['Magret de canard', 'Pavé de saumon', 'Risotto aux champignons']
}

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

function OutilPageInner() {
  const { user, isPro } = useAuth()
  const searchParams = useSearchParams()
  const [customPrices, setCustomPrices] = useState<CustomPrice[]>([])
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  const [dishName, setDishName] = useState('')
  const [category, setCategory] = useState<'entrée' | 'plat' | 'dessert' | 'autre'>('plat')
  const [targetFoodCost, setTargetFoodCost] = useState(30)
  const [covers, setCovers] = useState(1)
  const [isShared, setIsShared] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [allergens, setAllergens] = useState<string[]>([])
  const [notes, setNotes] = useState('')

  const [newIngName, setNewIngName] = useState('')
  const [newIngQty, setNewIngQty] = useState('')

  const [aiFallback, setAiFallback] = useState(false)
  const [marginSuggestions, setMarginSuggestions] = useState<null | { type: string; title: string; description: string; saving: string; newFoodCost: string }[]>(null)
  const [marginLoading, setMarginLoading] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showAllergens, setShowAllergens] = useState(false)
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupError, setSignupError] = useState('')
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  const { signUp } = useAuth()

  // Pré-remplir depuis ?prompt= (lien depuis /saison ou suggestions)
  useEffect(() => {
    const prompt = searchParams.get('prompt')
    if (prompt) setAiPrompt(decodeURIComponent(prompt))
  }, [searchParams])

  // Raccourci Cmd+Enter / Ctrl+Enter pour générer
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && aiPrompt.trim() && !aiLoading) {
        handleGenerate()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [aiPrompt, aiLoading])

  // Charger les prix personnalisés quand l'utilisateur est connecté
  useEffect(() => {
    if (!user) { setCustomPrices([]); return }
    supabase
      .from('custom_prices')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => setCustomPrices(data || []))
  }, [user])

  // Convertir CustomPrice[] en Record<string, number> pour les fonctions de calcul
  const customPricesMap = useMemo(() => {
    const map: Record<string, number> = {}
    customPrices.forEach(cp => { map[cp.ingredient_name] = cp.price_per_kg })
    return map
  }, [customPrices])

  // Metrics (real-time, client-side)
  const metrics = useMemo(() => {
    if (ingredients.length === 0) return null
    return calculateDishMetrics(ingredients, isShared ? covers : 1, targetFoodCost, customPricesMap)
  }, [ingredients, covers, isShared, targetFoodCost, customPricesMap])

  const scenarios = useMemo(() => metrics ? getPriceScenarios(metrics.costPerCover) : [], [metrics])

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) return
    const count = parseInt(localStorage.getItem('acuite_dish_count') || '0')
    if (count >= 2 && !user) {
      setShowSignupModal(true)
      return
    }

    setAiLoading(true)
    setAiError('')
    setAiFallback(false)
    setMarginSuggestions(null)
    try {
      const res = await fetch('/api/ai/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
      })
      const data = await res.json()
      if (!res.ok) {
        // Si clé API manquante → passer au fallback local côté client
        if (res.status === 503) {
          const fallback = getFallbackClient(aiPrompt)
          if (fallback.dishName) setDishName(fallback.dishName)
          setIngredients(fallback.ingredients.map((ing: { name: string; qty: number }) => {
            const pricePerKg = getPriceForIngredient(ing.name, customPricesMap)
            return { name: ing.name, qty_grams: ing.qty, price_per_kg: pricePerKg, cost: pricePerKg * ing.qty / 1000 }
          }))
          setAiFallback(true)
          localStorage.setItem('acuite_dish_count', String(count + 1))
          return
        }
        throw new Error(data.error)
      }

      if (data.dishName) setDishName(data.dishName)
      if (data.fallback) setAiFallback(true)
      if (data.ingredients) {
        const mapped: Ingredient[] = data.ingredients.map((ing: { name: string; qty: number }) => {
          const pricePerKg = getPriceForIngredient(ing.name, customPricesMap)
          const cost = pricePerKg * ing.qty / 1000
          return { name: ing.name, qty_grams: ing.qty, price_per_kg: pricePerKg, cost }
        })
        setIngredients(mapped)
      }
      localStorage.setItem('acuite_dish_count', String(count + 1))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la génération'
      setAiError(msg.includes('503') || msg.includes('API') ? 'Service IA temporairement indisponible — réessayez dans quelques instants.' : msg)
    } finally {
      setAiLoading(false)
    }
  }

  const addIngredient = () => {
    if (!newIngName.trim() || !newIngQty) return
    const pricePerKg = getPriceForIngredient(newIngName, customPricesMap)
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
      if (field === 'name') updated.price_per_kg = getPriceForIngredient(value as string, customPricesMap)
      updated.cost = updated.price_per_kg * updated.qty_grams / 1000
      return updated
    }))
  }

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    if (!user) { setShowSignupModal(true); return }
    if (!dishName.trim() || ingredients.length === 0 || !metrics) return

    setSaveLoading(true)
    try {
      // Vérification limite plan Gratuit (3 plats max) côté client+serveur
      if (!isPro) {
        const { count } = await supabase
          .from('dishes')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
        if (count !== null && count >= 3) {
          setShowSignupModal(true)
          setSaveLoading(false)
          return
        }
      }

      const dish = {
        user_id: user.id,
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
      }
      const { error } = await supabase.from('dishes').insert(dish)
      if (error) throw error
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaveLoading(false)
    }
  }

  const handleApplySuggestion = async (s: { description: string }) => {
    if (!dishName) return
    const applyPrompt = `${dishName} — Applique cette optimisation : ${s.description}`
    setMarginSuggestions(null)
    setAiLoading(true)
    setAiError('')
    try {
      const res = await fetch('/api/ai/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: applyPrompt }),
      })
      const data = await res.json()
      if (data.ingredients) {
        const mapped: Ingredient[] = data.ingredients.map((ing: { name: string; qty: number }) => {
          const pricePerKg = getPriceForIngredient(ing.name, customPricesMap)
          return { name: ing.name, qty_grams: ing.qty, price_per_kg: pricePerKg, cost: pricePerKg * ing.qty / 1000 }
        })
        setIngredients(mapped)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setAiLoading(false)
    }
  }

  const handleSuggestMargin = async () => {
    if (!metrics || !dishName) return
    setMarginLoading(true)
    setMarginSuggestions(null)
    try {
      const res = await fetch('/api/ai/suggest-margin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishName,
          ingredients,
          foodCostPct: metrics.foodCostPct,
          costPerCover: metrics.costPerCover,
        }),
      })
      const data = await res.json()
      if (data.suggestions) setMarginSuggestions(data.suggestions)
    } catch (err) {
      console.error(err)
    } finally {
      setMarginLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupLoading(true)
    setSignupError('')
    const { error } = await signUp(signupEmail, signupPassword)
    if (error) {
      setSignupError(error)
    } else {
      setShowSignupModal(false)
      await handleGenerate()
    }
    setSignupLoading(false)
  }

  const foodCostStatus = metrics ? getFoodCostStatus(metrics.foodCostPct) : null

  return (
    <>
      <Nav />
      <div className="pt-16 min-h-screen bg-creme">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-64px)]">

          {/* ── Colonne gauche — Inputs ─── */}
          <div className="lg:w-[420px] lg:min-w-[420px] border-r border-brun-pale bg-white p-6 space-y-6 lg:overflow-y-auto lg:h-[calc(100vh-64px)] lg:sticky lg:top-16">

            {/* Bloc IA */}
            <div>
              <h2 className="font-lora text-lg font-semibold text-brun mb-3">Générer avec l'IA</h2>
              <Textarea
                placeholder="Décrivez votre plat... ex: Magret de canard aux cerises, sauce au porto, purée de panais"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
              />
              {aiError && <p className="text-red-500 text-xs mt-1">{aiError}</p>}
              {aiFallback && (
                <p className="text-xs text-brun-light mt-1 italic">
                  ⚡ Suggestion automatique — ajustez les quantités selon votre recette
                </p>
              )}
              <Button
                className="mt-2 w-full"
                onClick={handleGenerate}
                loading={aiLoading}
                disabled={!aiPrompt.trim()}
              >
                Générer les ingrédients
              </Button>
              {aiPrompt.trim() && !aiLoading && (
                <p className="text-xs text-brun-light text-center mt-1">
                  ou <kbd className="bg-brun-pale px-1.5 py-0.5 rounded text-brun text-xs font-mono">⌘ Enter</kbd>
                </p>
              )}
            </div>

            <div className="border-t border-brun-pale" />

            {/* Paramètres */}
            <div className="space-y-4">
              <h2 className="font-lora text-lg font-semibold text-brun">Paramètres</h2>
              <Input
                label="Nom du plat"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="Ex: Magret de canard"
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
                  type="number"
                  min={5}
                  max={80}
                  suffix="%"
                  value={targetFoodCost}
                  onChange={(e) => setTargetFoodCost(Number(e.target.value))}
                />
                <div>
                  <Input
                    label="Couverts"
                    type="number"
                    min={1}
                    value={covers}
                    onChange={(e) => setCovers(Number(e.target.value))}
                    disabled={!isShared}
                  />
                </div>
              </div>
              <Toggle
                checked={isShared}
                onChange={setIsShared}
                label="Plat à partager (plusieurs couverts)"
              />
            </div>

            <div className="border-t border-brun-pale" />

            {/* Composition */}
            <div>
              <h2 className="font-lora text-lg font-semibold text-brun mb-3">Composition</h2>
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
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          className="w-16 text-sm text-center bg-white border border-brun-pale rounded-lg px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-orange"
                          value={ing.qty_grams}
                          min={1}
                          onChange={(e) => updateIngredient(i, 'qty_grams', Number(e.target.value))}
                        />
                        <span className="text-xs text-brun-light">g</span>
                      </div>
                      <span className="text-xs text-brun-light w-14 text-right shrink-0">
                        {ing.cost.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} €
                      </span>
                      <button
                        onClick={() => removeIngredient(i)}
                        className="text-brun-light hover:text-red-500 transition-colors ml-1"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-brun-light italic mb-4">Aucun ingrédient — utilisez l'IA ou ajoutez manuellement.</p>
              )}

              {/* Ajouter un ingrédient */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    list="ingredients-list"
                    className="input-field text-sm"
                    placeholder="Nom de l'ingrédient"
                    value={newIngName}
                    onChange={(e) => setNewIngName(e.target.value)}
                  />
                  <datalist id="ingredients-list">
                    {INGREDIENT_NAMES.map(name => <option key={name} value={name} />)}
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
                <Button size="sm" onClick={addIngredient} disabled={!newIngName || !newIngQty}>
                  +
                </Button>
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
            <Textarea
              label="Notes (optionnel)"
              placeholder="Techniques, conseils de présentation..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          {/* ── Colonne droite — Résultats ─── */}
          <div className="flex-1 p-6 lg:overflow-y-auto lg:h-[calc(100vh-64px)]">
            {aiLoading ? (
              <div className="max-w-2xl space-y-5 pt-4">
                {/* Header skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-brun-pale/60 rounded-full animate-pulse" />
                  <div className="h-8 w-64 bg-brun-pale/60 rounded-xl animate-pulse" />
                </div>
                {/* Métriques skeleton */}
                <div className="grid grid-cols-3 gap-3">
                  {[0,1,2].map(i => (
                    <div key={i} className="bg-white rounded-2xl border border-brun-pale p-4 space-y-2 animate-pulse">
                      <div className="h-3 w-16 bg-brun-pale/60 rounded-full mx-auto" />
                      <div className="h-7 w-20 bg-brun-pale/60 rounded-xl mx-auto" />
                      <div className="h-3 w-12 bg-brun-pale/60 rounded-full mx-auto" />
                    </div>
                  ))}
                </div>
                {/* Ingrédients skeleton */}
                <div className="bg-white rounded-2xl border border-brun-pale p-5 space-y-3 animate-pulse">
                  <div className="h-4 w-40 bg-brun-pale/60 rounded-full" />
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-3 flex-1 bg-brun-pale/50 rounded-full" style={{ opacity: 1 - i * 0.12 }} />
                      <div className="h-3 w-8 bg-brun-pale/40 rounded-full" />
                      <div className="h-1.5 w-24 bg-brun-pale/40 rounded-full" />
                    </div>
                  ))}
                </div>
                {/* Message IA */}
                <div className="flex items-center gap-3 text-brun-light">
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 bg-sauge rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                  <span className="text-sm italic">L'IA génère vos ingrédients…</span>
                </div>
              </div>
            ) : !metrics ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 bg-orange-pale rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-3xl">🧮</span>
                </div>
                <h3 className="font-lora text-xl font-semibold text-brun mb-2">Décrivez votre plat</h3>
                <p className="text-brun-light max-w-sm mb-6">
                  Utilisez l'IA pour générer automatiquement les ingrédients, ou ajoutez-les manuellement.
                  Les résultats s'affichent en temps réel.
                </p>
                <div className="grid grid-cols-2 gap-2 text-left max-w-xs w-full">
                  {['Magret de canard aux cerises', 'Risotto aux champignons', 'Tiramisu maison', 'Soupe de poisson'].map(ex => (
                    <button
                      key={ex}
                      className="bg-white border border-brun-pale rounded-xl px-3 py-2 text-xs text-brun-mid hover:border-orange hover:text-orange transition-colors text-left"
                      onClick={() => { setAiPrompt(ex) }}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-2xl space-y-5">
                {/* Identité */}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Badge variant={category === 'entrée' ? 'blue' : category === 'dessert' ? 'green' : 'orange'}>
                      {CATEGORY_OPTIONS.find(c => c.value === category)?.label}
                    </Badge>
                    {isShared && <Badge variant="gray">{covers} couverts</Badge>}
                  </div>
                  <h1 className="font-lora text-3xl font-bold text-brun italic">{dishName || 'Mon plat'}</h1>
                </div>

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
                      className={`h-full rounded-full transition-all duration-500 ${
                        metrics.foodCostPct <= 28 ? 'bg-sauge' :
                        metrics.foodCostPct <= 35 ? 'bg-orange' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, metrics.foodCostPct * 2)}%` }}
                    />
                  </div>
                  {metrics.foodCostPct > 35 && (
                    <p className="mt-2 text-xs text-red-500 font-medium">
                      Attention : food cost trop élevé. Envisagez de revoir les quantités ou le prix de vente.
                    </p>
                  )}
                </div>

                {/* Décomposition ingrédients */}
                <div className="bg-white rounded-2xl border border-brun-pale p-5">
                  <h3 className="font-semibold text-brun mb-3">Décomposition du coût</h3>
                  <div className="space-y-2">
                    {ingredients
                      .slice()
                      .sort((a, b) => b.cost - a.cost)
                      .map((ing, i) => {
                        const pct = metrics.totalCost > 0 ? (ing.cost / metrics.totalCost) * 100 : 0
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-brun-mid truncate">{ing.name}</span>
                                <span className="text-brun font-medium shrink-0 ml-2">{pct.toFixed(0)}%</span>
                              </div>
                              <div className="h-1.5 bg-brun-pale rounded-full">
                                <div
                                  className="h-full bg-orange-light rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs text-brun-light w-14 text-right shrink-0">
                              {ing.cost.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} €
                            </span>
                          </div>
                        )
                      })}
                  </div>
                </div>

                {/* 3 scénarios prix */}
                <div className="bg-white rounded-2xl border border-brun-pale p-5">
                  <h3 className="font-semibold text-brun mb-3">Scénarios de prix</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {scenarios.map((s) => (
                      <div key={s.foodCost} className={`rounded-xl p-3 text-center ${s.foodCost === targetFoodCost ? 'bg-orange-pale border-2 border-orange' : 'bg-creme'}`}>
                        <p className="text-xs font-semibold text-brun-light mb-1">{s.label}</p>
                        <p className="font-bold text-brun">{formatEuros(s.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions plats similaires */}
                {dishName && (
                  <div className="bg-ivoire border border-brun-pale rounded-2xl p-4">
                    <p className="text-xs font-semibold text-brun-light uppercase tracking-wide mb-3">Analyser un plat similaire</p>
                    <div className="flex flex-wrap gap-2">
                      {getSimilarDishes(dishName).map(suggestion => (
                        <button
                          key={suggestion}
                          className="text-xs bg-white border border-brun-pale text-brun-mid px-3 py-1.5 rounded-full hover:border-orange hover:text-orange transition-colors"
                          onClick={() => { setAiPrompt(suggestion) }}
                        >
                          {suggestion} →
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Module suggestions marge IA */}
                <div className="bg-white rounded-2xl border border-brun-pale p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-brun">Améliorer votre marge</h3>
                      <p className="text-xs text-brun-light mt-0.5">L'IA analyse votre recette et suggère des optimisations</p>
                    </div>
                    {!marginSuggestions && (
                      <button
                        onClick={handleSuggestMargin}
                        disabled={marginLoading}
                        className="flex items-center gap-2 bg-sauge-pale text-sauge text-sm font-semibold px-3 py-2 rounded-xl hover:bg-sauge hover:text-white transition-colors disabled:opacity-50"
                      >
                        {marginLoading ? (
                          <><div className="w-3 h-3 border-2 border-sauge border-t-transparent rounded-full animate-spin" /> Analyse…</>
                        ) : (
                          <><span>✨</span> Analyser</>
                        )}
                      </button>
                    )}
                  </div>

                  {marginSuggestions && (
                    <div className="space-y-3">
                      {marginSuggestions.map((s, i) => (
                        <div key={i} className="bg-sauge-pale/50 rounded-xl p-3 border border-sauge-light">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-semibold text-brun text-sm">{s.title}</p>
                            <div className="flex gap-1 shrink-0">
                              <span className="bg-sauge text-white text-xs font-bold px-2 py-0.5 rounded-full">{s.saving}</span>
                              <span className="bg-white text-brun-mid text-xs font-medium px-2 py-0.5 rounded-full border border-brun-pale">{s.newFoodCost}</span>
                            </div>
                          </div>
                          <p className="text-xs text-brun-mid leading-relaxed mb-2">{s.description}</p>
                          <button
                            onClick={() => handleApplySuggestion(s)}
                            className="text-xs font-semibold text-sauge bg-white border border-sauge-light px-3 py-1.5 rounded-lg hover:bg-sauge hover:text-white transition-colors"
                          >
                            ✨ Appliquer cette suggestion
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => { setMarginSuggestions(null) }}
                        className="text-xs text-brun-light hover:text-brun mt-1"
                      >
                        ↺ Relancer l'analyse
                      </button>
                    </div>
                  )}

                  {!marginSuggestions && !marginLoading && (
                    <div className="text-center py-3">
                      <p className="text-xs text-brun-light">Obtenez 3 suggestions concrètes pour réduire votre food cost</p>
                    </div>
                  )}
                </div>

                {/* Bouton sauvegarde */}
                <div>
                  {saveSuccess && (
                    <div className="mb-3 bg-sauge-pale text-sauge text-sm font-medium px-4 py-2 rounded-xl text-center">
                      Plat sauvegardé avec succès !
                    </div>
                  )}
                  {user ? (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleSave}
                      loading={saveLoading}
                      disabled={!dishName || ingredients.length === 0}
                    >
                      Sauvegarder ce plat
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      size="lg"
                      variant="secondary"
                      onClick={() => setShowSignupModal(true)}
                    >
                      Créer un compte pour sauvegarder
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modale inscription freemium */}
      <Modal open={showSignupModal} onClose={() => setShowSignupModal(false)}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-orange-pale rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 className="font-lora text-xl font-bold text-brun">Sauvegardez vos calculs gratuitement</h2>
          <p className="text-sm text-brun-light mt-1">Créez votre compte en 30 secondes — aucune CB requise</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-3">
          <Input
            label="Email"
            type="email"
            required
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            placeholder="chef@restaurant.fr"
          />
          <Input
            label="Mot de passe"
            type="password"
            required
            minLength={6}
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            placeholder="6 caractères minimum"
          />
          {signupError && <p className="text-red-500 text-sm">{signupError}</p>}
          <Button type="submit" className="w-full" size="lg" loading={signupLoading}>
            Créer mon compte et continuer
          </Button>
        </form>
        <p className="text-center text-sm text-brun-light mt-4">
          Déjà un compte ?{' '}
          <a href="/connexion" className="text-orange font-semibold hover:underline">
            Se connecter
          </a>
        </p>
      </Modal>
    </>
  )
}

export default function OutilPage() {
  return (
    <Suspense>
      <OutilPageInner />
    </Suspense>
  )
}
