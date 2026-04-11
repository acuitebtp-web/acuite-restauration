import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 30

// Prix de référence mis à jour manuellement chaque semaine
// Source : franceagrimer.fr > Marchés > Cotations hebdomadaires
// Pour automatiser complètement, remplacer par un scraping de l'API FranceAgriMer
const WEEKLY_PRICES: Record<string, number> = {
  'Bœuf - Filet':           56.50,
  'Bœuf - Entrecôte':       32.00,
  'Agneau - Rack / carré':  28.50,
  'Veau - Escalope':        22.00,
  'Porc - Filet':           10.50,
  'Poulet - Filet':         11.50,
  'Canard - Magret':        18.00,
  'Saumon - Filet':         16.50,
  'Bar - Filet':            28.00,
  'Sole - Filet':           42.00,
  'Saint-Jacques - Noix':   38.00,
  'Homard breton - Entier': 58.00,
  'Langoustines':           45.00,
  'Truffe noire Périgord':  950.00,
  'Morille fraîche':        180.00,
  'Cèpe':                   35.00,
  'Tomate cerise':          4.80,
  'Courgette':              2.80,
  'Aubergine':              3.20,
  'Poivron rouge':          3.50,
  'Champignon de Paris':    4.50,
  'Poireau':                2.80,
  'Céleri rave':            3.00,
  'Potiron':                2.20,
  'Asperge verte':          12.00,
  'Fraise Gariguette':      14.00,
}

export async function GET(req: NextRequest) {
  // Sécurité : vérifier le token Vercel Cron
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const rows = Object.entries(WEEKLY_PRICES).map(([ingredient, price_per_kg]) => ({
    ingredient,
    price_per_kg,
    source: 'franceagrimer',
  }))

  const { error } = await supabase.from('ingredient_price_snapshots').insert(rows)

  if (error) {
    console.error('Cron prix error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, inserted: rows.length, at: new Date().toISOString() })
}
