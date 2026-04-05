import { Ingredient } from './supabase'
import { getPriceForIngredient } from './ingredients'

export interface DishMetrics {
  totalCost: number
  costPerCover: number
  priceAdvised: number
  marginEuros: number
  marginPct: number
  foodCostPct: number
}

export const calculateDishMetrics = (
  ingredients: Ingredient[],
  covers: number,
  targetFoodCostPct: number,
  customPrices: Record<string, number> = {}
): DishMetrics => {
  const totalCost = ingredients.reduce((sum, ing) => {
    const price = getPriceForIngredient(ing.name, customPrices)
    return sum + (price * ing.qty_grams / 1000)
  }, 0)

  const costPerCover = covers > 0 ? totalCost / covers : totalCost
  const priceAdvised = targetFoodCostPct > 0 ? costPerCover / (targetFoodCostPct / 100) : costPerCover * (100 / 30)
  const marginEuros = priceAdvised - costPerCover
  const marginPct = priceAdvised > 0 ? (marginEuros / priceAdvised) * 100 : 0
  const foodCostPct = priceAdvised > 0 ? (costPerCover / priceAdvised) * 100 : targetFoodCostPct

  return { totalCost, costPerCover, priceAdvised, marginEuros, marginPct, foodCostPct }
}

export const getPriceScenarios = (costPerCover: number) => [
  { label: 'Food cost 25%', foodCost: 25, price: costPerCover / 0.25 },
  { label: 'Food cost 30%', foodCost: 30, price: costPerCover / 0.30 },
  { label: 'Food cost 35%', foodCost: 35, price: costPerCover / 0.35 },
]

export const getFoodCostStatus = (pct: number): { color: string; label: string } => {
  if (pct <= 28) return { color: 'green', label: 'Excellent' }
  if (pct <= 35) return { color: 'orange', label: 'Acceptable' }
  return { color: 'red', label: 'Trop élevé' }
}

export const formatEuros = (n: number): string =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'

export const formatPct = (n: number): string =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' %'
