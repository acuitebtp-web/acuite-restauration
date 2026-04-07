import { DEFAULT_INGREDIENTS } from './ingredients'

export interface PriceChange {
  ingredient: string
  emoji: string
  currentPrice: number
  previousPrice: number
  changePct: number
  direction: 'up' | 'down'
}

// Simule des variations réalistes basées sur la saisonnalité et les marchés
// En production, ces données viennent de la table `ingredient_price_snapshots` Supabase
const SIMULATED_CHANGES: Record<string, { previous: number; emoji: string }> = {
  // Hausses récentes
  'Bœuf - Filet':         { previous: 52.0, emoji: '🥩' },
  'Bœuf - Entrecôte':     { previous: 28.0, emoji: '🥩' },
  'Agneau - Rack / carré':{ previous: 25.0, emoji: '🐑' },
  'Homard breton - Entier':{ previous: 60.0, emoji: '🦞' },
  'Truffe noire Périgord': { previous: 900.0,emoji: '⚫' },
  // Baisses (bons plans)
  'Maquereau - Filet':    { previous: 10.0, emoji: '🐟' },
  'Sardine - Fraîche':    { previous: 7.0,  emoji: '🐟' },
  'Courgette':            { previous: 3.5,  emoji: '🥒' },
  'Tomate cerise':        { previous: 6.0,  emoji: '🍅' },
  'Poulet - Filet':       { previous: 12.0, emoji: '🍗' },
  'Céleri rave':          { previous: 3.5,  emoji: '⚪' },
  'Champignon de Paris':  { previous: 5.5,  emoji: '🍄' },
  'Poireau':              { previous: 3.5,  emoji: '🌱' },
}

export function getPriceChanges(): PriceChange[] {
  const changes: PriceChange[] = []
  for (const [ingredient, { previous, emoji }] of Object.entries(SIMULATED_CHANGES)) {
    const current = DEFAULT_INGREDIENTS[ingredient]
    if (!current) continue
    const changePct = ((current - previous) / previous) * 100
    if (Math.abs(changePct) < 2) continue
    changes.push({
      ingredient,
      emoji,
      currentPrice: current,
      previousPrice: previous,
      changePct: Math.round(changePct * 10) / 10,
      direction: changePct > 0 ? 'up' : 'down',
    })
  }
  return changes.sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct))
}

export function getBonsPlans(): PriceChange[] {
  return getPriceChanges().filter(c => c.direction === 'down').slice(0, 6)
}

export function getHausses(): PriceChange[] {
  return getPriceChanges().filter(c => c.direction === 'up').slice(0, 4)
}

// SQL à exécuter dans Supabase pour activer le suivi réel des prix :
export const PRICE_HISTORY_SQL = `
CREATE TABLE IF NOT EXISTS ingredient_price_snapshots (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ingredient_name text NOT NULL,
  price_per_kg numeric NOT NULL,
  previous_price numeric,
  change_pct numeric,
  recorded_at timestamptz DEFAULT now()
);
CREATE INDEX ON ingredient_price_snapshots (ingredient_name, recorded_at DESC);
`
