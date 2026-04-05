import { createClient } from '@supabase/supabase-js'

export type Plan = 'free' | 'pro' | 'multi'

export interface Profile {
  id: string
  email: string
  plan: Plan
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  created_at: string
}

export interface Ingredient {
  name: string
  qty_grams: number
  price_per_kg: number
  cost: number
}

export interface Dish {
  id: string
  user_id: string
  name: string
  category: 'entrée' | 'plat' | 'dessert' | 'autre'
  ingredients: Ingredient[]
  covers: number
  is_shared: boolean
  target_food_cost: number
  total_cost: number
  price_advised: number
  price_actual: number | null
  margin_pct: number
  allergens: string[]
  notes: string
  popularity: number | null
  created_at: string
  updated_at: string
}

export interface CustomPrice {
  id: string
  user_id: string
  ingredient_name: string
  price_per_kg: number
  updated_at: string
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const supabaseAdmin = () => {
  if (typeof window !== 'undefined') throw new Error('supabaseAdmin must be used server-side only')
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
