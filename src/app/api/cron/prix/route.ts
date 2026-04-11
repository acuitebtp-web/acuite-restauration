import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 30

// Prix de référence mis à jour manuellement chaque semaine
// Source : franceagrimer.fr > Marchés > Cotations hebdomadaires
const WEEKLY_PRICES: Record<string, number> = {
  // ── BŒUF ─────────────────────────────────────
  'Bœuf - Filet':                  57.50,
  'Bœuf - Entrecôte':              31.50,
  'Bœuf - Faux-filet':             27.80,
  'Bœuf - Côte de bœuf':           26.00,
  'Bœuf - Rumsteck':               21.50,
  'Bœuf - Bavette':                18.00,
  'Bœuf - Paleron':                12.80,
  'Bœuf - Joue':                   14.20,
  'Bœuf - Macreuse':               11.20,
  'Bœuf - Plat de côte':            9.20,
  'Bœuf - Queue':                  10.00,
  'Bœuf - Os à moelle':             4.00,

  // ── VEAU ─────────────────────────────────────
  'Veau - Escalope':               23.50,
  'Veau - Côte':                   28.00,
  'Veau - Joue':                   18.50,
  'Veau - Jarret':                 14.00,
  'Veau - Tendron':                12.00,
  'Veau - Ris':                    46.00,

  // ── AGNEAU ───────────────────────────────────
  'Agneau - Gigot entier':         15.50,
  'Agneau - Épaule':               12.20,
  'Agneau - Rack / carré':         29.00,
  'Agneau - Côtelette':            22.50,
  'Agneau - Souris':               16.50,
  'Agneau - Selle':                24.50,

  // ── PORC ─────────────────────────────────────
  'Porc - Filet mignon':           14.20,
  'Porc - Côte':                   10.20,
  'Porc - Travers':                 8.80,
  'Porc - Ventre':                  6.50,
  'Porc - Joue':                    8.20,

  // ── CHARCUTERIE ──────────────────────────────
  'Jambon cru Bayonne':            22.50,
  'Lardons fumés':                  8.20,
  'Chorizo':                       14.50,
  'Boudin noir':                   10.20,

  // ── VOLAILLES ────────────────────────────────
  'Poulet - Filet':                10.50,
  'Poulet - Cuisse':                6.80,
  'Poulet - Suprême':              12.50,
  'Poulet - Entier':                5.80,
  'Canard - Magret':               22.50,
  'Canard - Confit de cuisse':     14.50,
  'Canard - Foie gras entier':     82.00,
  'Canard - Escalope foie gras':   92.00,
  'Pintade - Entière':             10.50,
  'Caille - Entière':              12.50,
  'Pigeon - Entier':               18.50,
  'Lapin - Entier':                 8.20,

  // ── ABATS ────────────────────────────────────
  'Foie de veau':                  18.50,
  'Rognons de veau':               15.50,
  'Ris de veau':                   46.00,

  // ── POISSONS NOBLES ──────────────────────────
  'Sole - Filet':                  43.00,
  'Turbot - Filet':                56.00,
  'Saint-Pierre - Entier':         18.50,
  'Bar - Filet':                   29.00,
  'Bar - Entier':                  18.50,
  'Daurade - Filet':               22.50,
  'Daurade - Entière':             14.50,
  'Lotte - Queue':                 23.00,
  'Rouget - Filet':                33.00,
  'Thon rouge - Pavé':             36.00,

  // ── POISSONS COURANTS ────────────────────────
  'Saumon - Filet':                18.50,
  'Saumon - Pavé':                 20.50,
  'Truite - Filet':                14.50,
  'Cabillaud - Filet':             15.50,
  'Cabillaud - Dos':               23.00,
  'Lieu noir - Filet':             12.50,
  'Maquereau - Filet':              8.50,
  'Sardine - Fraîche':              5.20,
  'Anchois frais':                  8.50,
  'Merlu - Filet':                 14.50,

  // ── CRUSTACÉS ────────────────────────────────
  'Homard breton - Entier':        58.00,
  'Langoustines':                  45.00,
  'Gambas - Entières':             29.00,
  'Crevettes roses décortiquées':  22.50,
  'Crevettes grises':              18.50,

  // ── COQUILLAGES ──────────────────────────────
  'Saint-Jacques - Noix':          40.00,   // fin de saison, prix monte
  'Moules de bouchot':              3.60,
  'Huîtres creuses':                8.20,
  'Palourdes':                     14.50,

  // ── LÉGUMES (saison avril) ───────────────────
  'Asperge verte':                 10.50,   // saison : prix baisse
  'Asperge blanche':               12.00,   // saison : prix baisse
  'Petits pois frais':              5.50,   // début saison
  'Épinard frais':                  4.20,
  'Artichaut':                      4.20,
  'Courgette':                      3.20,   // hors saison encore
  'Aubergine':                      3.50,   // hors saison encore
  'Poivron rouge':                  3.80,
  'Tomate cerise':                  5.20,
  'Tomate ronde':                   2.50,
  'Poireau':                        2.20,
  'Céleri rave':                    2.00,
  'Potiron':                        2.20,
  'Carotte':                        1.05,
  'Oignon jaune':                   0.95,
  'Échalote':                       4.20,
  'Ail':                            5.20,
  'Champignon de Paris':            5.20,
  'Haricot vert extra-fin':         6.50,
  'Fenouil':                        2.60,

  // ── CHAMPIGNONS ──────────────────────────────
  'Morilles fraîches':            135.00,   // pic de saison avril
  'Girolles':                      42.00,
  'Truffe noire Périgord':         950.00,  // hors saison : prix monte
  'Truffe d\'été':                 190.00,
  'Cèpes frais':                   36.00,
  'Trompette de la mort':          58.00,

  // ── HERBES ───────────────────────────────────
  'Basilic frais':                 12.50,
  'Persil plat':                    6.20,
  'Coriandre fraîche':              8.20,
  'Thym frais':                     8.20,
  'Estragon frais':                10.50,

  // ── FRUITS (saison avril) ────────────────────
  'Fraise Gariguette':             12.00,   // début saison
  'Citron jaune':                   2.10,
  'Orange':                         1.90,
  'Mangue':                         4.20,
  'Avocat':                         3.60,

  // ── PRODUITS LAITIERS ────────────────────────
  'Beurre doux':                    9.20,
  'Crème liquide 35% MG':           5.20,
  'Crème fraîche épaisse':          4.60,
  'Lait entier':                    1.25,
  'Parmesan - Reggiano':           24.50,
  'Comté 18 mois':                 18.50,
  'Mozzarella di bufala':          14.50,

  // ── ÉPICERIE SÈCHE ───────────────────────────
  'Huile d\'olive vierge extra':    9.20,
  'Farine T45':                     1.25,
  'Riz arborio':                    3.60,
  'Pâtes fraîches':                 5.20,
  'Chocolat noir 70%':             12.50,
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
