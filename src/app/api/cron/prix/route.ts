import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 30

// Référence semaine précédente (semaine du 27 avril 2026)
// Chaque lundi : copier WEEKLY_PRICES ici AVANT de les mettre à jour
const PREVIOUS_WEEK_REF: Record<string, number> = {
  'Bœuf - Filet': 57.50, 'Bœuf - Entrecôte': 31.50, 'Bœuf - Faux-filet': 27.80,
  'Bœuf - Côte de bœuf': 26.00, 'Bœuf - Rumsteck': 21.50, 'Bœuf - Bavette': 18.00,
  'Bœuf - Paleron': 12.80, 'Bœuf - Joue': 14.20, 'Bœuf - Macreuse': 11.20,
  'Bœuf - Plat de côte': 9.20, 'Bœuf - Queue': 10.00, 'Bœuf - Os à moelle': 4.00,
  'Veau - Escalope': 23.50, 'Veau - Côte': 28.00, 'Veau - Joue': 18.50,
  'Veau - Jarret': 14.00, 'Veau - Tendron': 12.00, 'Veau - Ris': 46.00,
  'Agneau - Gigot entier': 14.80, 'Agneau - Épaule': 11.60, 'Agneau - Rack / carré': 27.50,
  'Agneau - Côtelette': 21.50, 'Agneau - Souris': 15.80, 'Agneau - Selle': 23.20,
  'Porc - Filet mignon': 14.50, 'Porc - Côte': 10.50, 'Porc - Travers': 9.00,
  'Porc - Ventre': 6.70, 'Porc - Joue': 8.40,
  'Jambon cru Bayonne': 22.50, 'Lardons fumés': 8.20, 'Chorizo': 14.50, 'Boudin noir': 10.20,
  'Poulet - Filet': 10.50, 'Poulet - Cuisse': 6.80, 'Poulet - Suprême': 12.50,
  'Poulet - Entier': 5.80, 'Canard - Magret': 22.50, 'Canard - Confit de cuisse': 14.50,
  'Canard - Foie gras entier': 82.00, 'Canard - Escalope foie gras': 92.00,
  'Pintade - Entière': 10.50, 'Caille - Entière': 12.50, 'Pigeon - Entier': 18.50,
  'Lapin - Entier': 8.20, 'Foie de veau': 18.50, 'Rognons de veau': 15.50, 'Ris de veau': 46.00,
  'Sole - Filet': 44.50, 'Turbot - Filet': 56.00, 'Saint-Pierre - Entier': 18.50,
  'Bar - Filet': 29.80, 'Bar - Entier': 19.00, 'Daurade - Filet': 22.50,
  'Daurade - Entière': 14.50, 'Lotte - Queue': 23.80, 'Rouget - Filet': 33.00,
  'Thon rouge - Pavé': 36.00, 'Saumon - Filet': 19.00, 'Saumon - Pavé': 21.00,
  'Truite - Filet': 14.50, 'Cabillaud - Filet': 16.00, 'Cabillaud - Dos': 23.80,
  'Lieu noir - Filet': 12.50, 'Maquereau - Filet': 8.50, 'Sardine - Fraîche': 5.20,
  'Anchois frais': 8.50, 'Merlu - Filet': 14.50,
  'Homard breton - Entier': 55.00, 'Langoustines': 46.50, 'Gambas - Entières': 29.00,
  'Crevettes roses décortiquées': 22.50, 'Crevettes grises': 18.50,
  'Saint-Jacques - Noix': 42.00, 'Moules de bouchot': 3.60, 'Huîtres creuses': 8.20, 'Palourdes': 14.50,
  'Asperge verte': 9.80, 'Asperge blanche': 11.20, 'Petits pois frais': 5.20,
  'Épinard frais': 4.20, 'Artichaut': 3.90, 'Courgette': 3.10, 'Aubergine': 3.50,
  'Poivron rouge': 3.80, 'Tomate cerise': 5.20, 'Tomate ronde': 2.60, 'Poireau': 2.00,
  'Céleri rave': 2.00, 'Potiron': 2.20, 'Carotte': 1.00, 'Oignon jaune': 0.95,
  'Échalote': 4.20, 'Ail': 5.20, 'Champignon de Paris': 5.30, 'Haricot vert extra-fin': 6.50,
  'Fenouil': 2.60, 'Morilles fraîches': 135.00, 'Girolles': 42.00,
  'Truffe noire Périgord': 950.00, 'Truffe d\'été': 190.00, 'Cèpes frais': 36.00,
  'Trompette de la mort': 58.00, 'Basilic frais': 12.50, 'Persil plat': 6.20,
  'Coriandre fraîche': 8.20, 'Thym frais': 8.20, 'Estragon frais': 10.50,
  'Fraise Gariguette': 12.00, 'Citron jaune': 2.10, 'Orange': 1.90, 'Mangue': 3.90, 'Avocat': 3.40,
  'Beurre doux': 9.50, 'Crème liquide 35% MG': 5.30, 'Crème fraîche épaisse': 4.60,
  'Lait entier': 1.25, 'Parmesan - Reggiano': 25.00, 'Comté 18 mois': 18.50,
  'Mozzarella di bufala': 14.50, 'Huile d\'olive vierge extra': 8.90, 'Farine T45': 1.25,
  'Riz arborio': 3.60, 'Pâtes fraîches': 5.20, 'Chocolat noir 70%': 13.00,
}

// Semaine du 27 avril 2026 — source FranceAgriMer
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
  'Agneau - Gigot entier':         14.80,
  'Agneau - Épaule':               11.60,
  'Agneau - Rack / carré':         27.50,
  'Agneau - Côtelette':            21.50,
  'Agneau - Souris':               15.80,
  'Agneau - Selle':                23.20,

  // ── PORC ─────────────────────────────────────
  'Porc - Filet mignon':           14.50,
  'Porc - Côte':                   10.50,
  'Porc - Travers':                 9.00,
  'Porc - Ventre':                  6.70,
  'Porc - Joue':                    8.40,

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
  'Sole - Filet':                  44.50,
  'Turbot - Filet':                56.00,
  'Saint-Pierre - Entier':         18.50,
  'Bar - Filet':                   29.80,
  'Bar - Entier':                  19.00,
  'Daurade - Filet':               22.50,
  'Daurade - Entière':             14.50,
  'Lotte - Queue':                 23.80,
  'Rouget - Filet':                33.00,
  'Thon rouge - Pavé':             36.00,

  // ── POISSONS COURANTS ────────────────────────
  'Saumon - Filet':                19.00,
  'Saumon - Pavé':                 21.00,
  'Truite - Filet':                14.50,
  'Cabillaud - Filet':             16.00,
  'Cabillaud - Dos':               23.80,
  'Lieu noir - Filet':             12.50,
  'Maquereau - Filet':              8.50,
  'Sardine - Fraîche':              5.20,
  'Anchois frais':                  8.50,
  'Merlu - Filet':                 14.50,

  // ── CRUSTACÉS ────────────────────────────────
  'Homard breton - Entier':        55.00,
  'Langoustines':                  46.50,
  'Gambas - Entières':             29.00,
  'Crevettes roses décortiquées':  22.50,
  'Crevettes grises':              18.50,

  // ── COQUILLAGES ──────────────────────────────
  'Saint-Jacques - Noix':          42.00,   // fin de saison, prix monte
  'Moules de bouchot':              3.60,
  'Huîtres creuses':                8.20,
  'Palourdes':                     14.50,

  // ── LÉGUMES (saison avril) ───────────────────
  'Asperge verte':                  9.80,   // saison : prix baisse
  'Asperge blanche':                9.46,   // saison : prix continue de baisser
  'Petits pois frais':              5.20,   // début saison
  'Épinard frais':                  4.20,
  'Artichaut':                      3.90,
  'Courgette':                      3.10,
  'Aubergine':                      3.50,
  'Poivron rouge':                  3.80,
  'Tomate cerise':                  5.20,
  'Tomate ronde':                   2.60,
  'Poireau':                        2.00,
  'Céleri rave':                    2.00,
  'Potiron':                        2.20,
  'Carotte':                        1.00,
  'Oignon jaune':                   0.95,
  'Échalote':                       4.20,
  'Ail':                            5.20,
  'Champignon de Paris':            5.30,
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
  'Mangue':                         3.90,
  'Avocat':                         3.40,

  // ── PRODUITS LAITIERS ────────────────────────
  'Beurre doux':                    9.50,
  'Crème liquide 35% MG':           5.30,
  'Crème fraîche épaisse':          4.60,
  'Lait entier':                    1.25,
  'Parmesan - Reggiano':           25.00,
  'Comté 18 mois':                 18.50,
  'Mozzarella di bufala':          14.50,

  // ── ÉPICERIE SÈCHE ───────────────────────────
  'Huile d\'olive vierge extra':    8.90,
  'Farine T45':                     1.25,
  'Riz arborio':                    3.60,
  'Pâtes fraîches':                 5.20,
  'Chocolat noir 70%':             13.00,
}

export async function GET(req: NextRequest) {
  // Sécurité : vérifier le token Vercel Cron
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
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

  const { error } = await supabase
    .from('ingredient_price_snapshots')
    .upsert(rows, { onConflict: 'ingredient,source', ignoreDuplicates: true })

  if (error) {
    console.error('Cron prix error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Phase 2 — Alertes email utilisateurs Pro
  let alertsSent = 0
  try {
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)

      // Récupérer tous les profils Pro avec leur email
      const { data: proProfiles } = await supabase
        .from('profiles')
        .select('id, email')
        .in('plan', ['pro', 'multi'])

      if (proProfiles?.length) {
        // Calculer les hausses significatives (> 5%)
        const hausses = Object.entries(WEEKLY_PRICES)
          .filter(([ing]) => {
            // Comparer avec la semaine précédente si disponible
            const prev = PREVIOUS_WEEK_REF[ing]
            return prev && ((WEEKLY_PRICES[ing] - prev) / prev) > 0.05
          })
          .slice(0, 5)
          .map(([ing, price]) => ({
            name: ing,
            price,
            prev: PREVIOUS_WEEK_REF[ing] || price,
            pct: PREVIOUS_WEEK_REF[ing] ? Math.round((price - PREVIOUS_WEEK_REF[ing]) / PREVIOUS_WEEK_REF[ing] * 100) : 0
          }))

        if (hausses.length > 0) {
          for (const profile of proProfiles.slice(0, 100)) { // max 100 emails/run
            if (!profile.email) continue
            const html = `
<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:20px;">
  <p style="font-size:20px;font-weight:700;color:#2C1A0E;font-style:italic;margin:0 0 20px;">
    <span>Costy</span><span style="color:#F2854A;">food</span>
  </p>
  <h2 style="color:#2C1A0E;font-size:18px;">Alerte prix marchés cette semaine</h2>
  <p style="color:#A0745A;font-size:14px;">Ces ingrédients ont augmenté de plus de 5% :</p>
  <table style="width:100%;border-collapse:collapse;margin:16px 0;">
    ${hausses.map(h => `
    <tr style="border-bottom:1px solid #E8D5C4;">
      <td style="padding:10px 4px;font-size:14px;color:#2C1A0E;">${h.name}</td>
      <td style="padding:10px 4px;text-align:right;font-size:14px;color:#2C1A0E;">${h.price.toFixed(2)} €/kg</td>
      <td style="padding:10px 4px;text-align:right;">
        <span style="background:#FEE2E2;color:#EF4444;font-weight:700;font-size:12px;padding:2px 8px;border-radius:20px;">
          +${h.pct}%
        </span>
      </td>
    </tr>`).join('')}
  </table>
  <p style="color:#A0745A;font-size:13px;">Vérifiez l'impact sur vos food costs dans votre <a href="https://costyfood.fr/compte/carte" style="color:#F2854A;">analyse de carte</a>.</p>
  <p style="color:#C4A882;font-size:11px;margin-top:20px;">Costyfood · <a href="https://costyfood.fr" style="color:#C4A882;">costyfood.fr</a></p>
</div>`
            await resend.emails.send({
              from: 'Costyfood <alertes@costyfood.fr>',
              to: profile.email,
              subject: `⚠️ ${hausses.length} ingrédient${hausses.length > 1 ? 's ont' : ' a'} augmenté cette semaine`,
              html,
            })
            alertsSent++
          }
        }
      }
    }
  } catch (alertErr) {
    console.error('Alert emails error:', alertErr)
    // Ne pas bloquer le cron si les emails échouent
  }

  return NextResponse.json({ ok: true, upserted: rows.length, alerts_sent: alertsSent, at: new Date().toISOString() })
}
