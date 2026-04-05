'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { useAuth } from '@/hooks/useAuth'
import { supabase, CustomPrice } from '@/lib/supabase'
import { INGREDIENT_NAMES, DEFAULT_INGREDIENTS } from '@/lib/ingredients'

export default function PrixPage() {
  const { user, isPro } = useAuth()
  const [customPrices, setCustomPrices] = useState<CustomPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    supabase
      .from('custom_prices')
      .select('*')
      .eq('user_id', user.id)
      .order('ingredient_name')
      .then(({ data }) => { setCustomPrices(data || []); setLoading(false) })
  }, [user])

  const savePrice = async (ingredientName: string, price: number) => {
    if (!user || !isPro) return
    setSaving(ingredientName)
    const existing = customPrices.find(p => p.ingredient_name === ingredientName)
    if (existing) {
      const { data } = await supabase
        .from('custom_prices')
        .update({ price_per_kg: price, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single()
      if (data) setCustomPrices(prev => prev.map(p => p.id === existing.id ? data : p))
    } else {
      const { data } = await supabase
        .from('custom_prices')
        .insert({ user_id: user.id, ingredient_name: ingredientName, price_per_kg: price })
        .select()
        .single()
      if (data) setCustomPrices(prev => [...prev, data])
    }
    setSaving(null)
  }

  const deletePrice = async (id: string) => {
    await supabase.from('custom_prices').delete().eq('id', id)
    setCustomPrices(prev => prev.filter(p => p.id !== id))
  }

  const addCustom = async () => {
    if (!newName || !newPrice || !user) return
    await savePrice(newName, parseFloat(newPrice))
    setNewName('')
    setNewPrice('')
  }

  const customMap: Record<string, number> = {}
  customPrices.forEach(p => { customMap[p.ingredient_name] = p.price_per_kg })

  const filteredIngredients = INGREDIENT_NAMES.filter(name =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  if (!isPro) {
    return (
      <>
        <Nav />
        <div className="pt-24 min-h-screen flex items-center justify-center px-4">
          <Card className="max-w-md text-center py-12">
            <div className="w-14 h-14 bg-orange-pale rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="font-lora text-xl font-bold text-brun mb-2">Fonctionnalité Pro</h2>
            <p className="text-brun-light text-sm mb-6">
              Personnalisez les prix de vos ingrédients avec vos propres tarifs fournisseurs.
              Analysez votre carte complète avec le plan Pro — 19€/mois.
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="font-lora text-3xl font-bold text-brun">Ma base de prix</h1>
            <p className="text-brun-light mt-1">
              Vos prix fournisseurs remplacent la base FranceAgriMer pour tous vos calculs.
            </p>
          </div>

          {/* Ajouter un ingrédient custom */}
          <Card className="mb-6">
            <h3 className="font-semibold text-brun mb-4">Ajouter un ingrédient personnalisé</h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  list="all-ingredients"
                  className="input-field text-sm"
                  placeholder="Nom de l'ingrédient"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
                <datalist id="all-ingredients">
                  {INGREDIENT_NAMES.map(n => <option key={n} value={n} />)}
                </datalist>
              </div>
              <Input
                type="number"
                suffix="€/kg"
                placeholder="Prix"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                className="w-36"
              />
              <Button onClick={addCustom} disabled={!newName || !newPrice}>Ajouter</Button>
            </div>
          </Card>

          {/* Prix personnalisés existants */}
          {customPrices.length > 0 && (
            <Card className="mb-6">
              <h3 className="font-semibold text-brun mb-4">Vos prix personnalisés ({customPrices.length})</h3>
              <div className="space-y-2">
                {customPrices.map(cp => (
                  <div key={cp.id} className="flex items-center justify-between bg-sauge-pale rounded-xl px-4 py-2.5">
                    <span className="text-sm font-medium text-brun">{cp.ingredient_name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-brun-mid">
                        {DEFAULT_INGREDIENTS[cp.ingredient_name]
                          ? <span className="text-xs text-brun-light mr-2">référence : {DEFAULT_INGREDIENTS[cp.ingredient_name]}€/kg</span>
                          : null
                        }
                        <span className="font-bold text-sauge">{cp.price_per_kg.toFixed(2)} €/kg</span>
                      </span>
                      <button
                        onClick={() => deletePrice(cp.id)}
                        className="text-brun-light hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Base FranceAgriMer avec édition inline */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-brun">Base de prix de référence</h3>
              <span className="text-xs text-brun-light">FranceAgriMer</span>
            </div>
            <input
              className="input-field mb-4 text-sm"
              placeholder="Rechercher un ingrédient..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="text-center py-8 text-brun-light text-sm">Chargement...</div>
              ) : filteredIngredients.map(name => {
                const defaultPrice = DEFAULT_INGREDIENTS[name]
                const customPrice = customMap[name]
                const cp = customPrices.find(p => p.ingredient_name === name)

                return (
                  <div key={name} className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-creme group ${customPrice ? 'bg-sauge-pale/50' : ''}`}>
                    <span className="text-sm text-brun flex-1 truncate">{name}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-brun-light">{defaultPrice.toFixed(2)}</span>
                      <PriceEditor
                        defaultPrice={defaultPrice}
                        customPrice={customPrice}
                        saving={saving === name}
                        onSave={(price) => savePrice(name, price)}
                        onDelete={cp ? () => deletePrice(cp.id) : undefined}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

function PriceEditor({
  defaultPrice, customPrice, saving, onSave, onDelete
}: {
  defaultPrice: number
  customPrice?: number
  saving: boolean
  onSave: (price: number) => void
  onDelete?: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(customPrice?.toString() || defaultPrice.toString())

  return editing ? (
    <div className="flex items-center gap-1">
      <input
        autoFocus
        type="number"
        step="0.01"
        className="w-20 text-xs text-center border border-orange rounded px-1 py-0.5 focus:outline-none"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') { onSave(parseFloat(value)); setEditing(false) }
          if (e.key === 'Escape') setEditing(false)
        }}
      />
      <span className="text-xs text-brun-light">€/kg</span>
      <button
        onClick={() => { onSave(parseFloat(value)); setEditing(false) }}
        className="text-sauge text-xs font-bold"
      >✓</button>
      <button onClick={() => setEditing(false)} className="text-brun-light text-xs">✕</button>
    </div>
  ) : (
    <div className="flex items-center gap-1">
      {customPrice && (
        <span className="text-xs font-bold text-sauge">{customPrice.toFixed(2)} €/kg</span>
      )}
      <button
        onClick={() => { setValue(customPrice?.toString() || defaultPrice.toString()); setEditing(true) }}
        className="text-xs text-orange hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {customPrice ? 'Modifier' : 'Personnaliser'}
      </button>
      {onDelete && (
        <button onClick={onDelete} className="text-xs text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
          ✕
        </button>
      )}
    </div>
  )
}
