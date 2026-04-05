import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `Tu es un assistant pour restaurateurs professionnels.
Retourne UNIQUEMENT un JSON valide, sans texte autour, sans backticks markdown :
{
  "dishName": "Nom du plat professionnel",
  "ingredients": [
    { "name": "Nom exact de l'ingrédient", "qty": quantité_en_grammes }
  ]
}
Quantités par assiette individuelle, en grammes.
Noms d'ingrédients précis en français (ex: "Bœuf - Filet", pas "Bœuf").
Sois réaliste sur les quantités professionnelles.`

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

async function callClaude(prompt: string) {
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 800,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })
  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return JSON.parse(text)
}

// ── Fallback local ─────────────────────────────────────────────────────────────
const FALLBACK_RECIPES: Record<string, { dishName: string; ingredients: { name: string; qty: number }[] }> = {
  boeuf: {
    dishName: 'Bœuf bourguignon',
    ingredients: [
      { name: 'Bœuf - Paleron', qty: 200 },
      { name: 'Lard fumé', qty: 40 },
      { name: 'Carotte', qty: 80 },
      { name: 'Oignon jaune', qty: 60 },
      { name: 'Ail', qty: 10 },
      { name: 'Champignon de Paris', qty: 80 },
      { name: 'Vin rouge', qty: 150 },
      { name: 'Fond de veau lié', qty: 50 },
      { name: 'Beurre doux', qty: 20 },
      { name: 'Thym frais', qty: 3 },
    ],
  },
  magret: {
    dishName: 'Magret de canard aux cerises',
    ingredients: [
      { name: 'Canard - Magret', qty: 200 },
      { name: 'Cerise', qty: 80 },
      { name: 'Porto rouge', qty: 40 },
      { name: 'Beurre doux', qty: 20 },
      { name: 'Échalote', qty: 20 },
      { name: 'Fond de veau lié', qty: 60 },
    ],
  },
  saumon: {
    dishName: 'Pavé de saumon, beurre blanc',
    ingredients: [
      { name: 'Saumon - Pavé', qty: 180 },
      { name: 'Beurre doux', qty: 40 },
      { name: 'Échalote', qty: 20 },
      { name: 'Vin blanc sec', qty: 50 },
      { name: 'Crème liquide 30% MG', qty: 30 },
      { name: 'Citron jaune', qty: 20 },
      { name: 'Aneth', qty: 3 },
    ],
  },
  poulet: {
    dishName: 'Suprême de poulet rôti',
    ingredients: [
      { name: 'Poulet - Suprême', qty: 180 },
      { name: 'Beurre doux', qty: 25 },
      { name: 'Ail', qty: 8 },
      { name: 'Thym frais', qty: 3 },
      { name: 'Romarin frais', qty: 3 },
      { name: 'Fond de volaille', qty: 80 },
      { name: 'Crème liquide 30% MG', qty: 40 },
    ],
  },
  agneau: {
    dishName: 'Rack d\'agneau en croûte d\'herbes',
    ingredients: [
      { name: 'Agneau - Rack / carré', qty: 220 },
      { name: 'Persil plat', qty: 10 },
      { name: 'Thym frais', qty: 5 },
      { name: 'Ail', qty: 8 },
      { name: 'Beurre doux', qty: 20 },
      { name: 'Moutarde de Dijon', qty: 15 },
      { name: 'Fond de veau lié', qty: 60 },
    ],
  },
  risotto: {
    dishName: 'Risotto aux champignons',
    ingredients: [
      { name: 'Riz arborio', qty: 90 },
      { name: 'Champignon de Paris', qty: 100 },
      { name: 'Échalote', qty: 20 },
      { name: 'Vin blanc sec', qty: 50 },
      { name: 'Fond de volaille', qty: 300 },
      { name: 'Parmesan - Reggiano', qty: 30 },
      { name: 'Beurre doux', qty: 30 },
    ],
  },
  saint: {
    dishName: 'Saint-Jacques poêlées, purée de panais',
    ingredients: [
      { name: 'Saint-Jacques - Noix', qty: 120 },
      { name: 'Beurre doux', qty: 30 },
      { name: 'Céleri rave', qty: 100 },
      { name: 'Crème liquide 30% MG', qty: 50 },
      { name: 'Citron jaune', qty: 15 },
    ],
  },
  foie: {
    dishName: 'Escalope de foie gras poêlée',
    ingredients: [
      { name: 'Canard - Escalope foie gras', qty: 80 },
      { name: 'Pomme Golden', qty: 60 },
      { name: 'Beurre doux', qty: 15 },
      { name: 'Vinaigre balsamique', qty: 10 },
      { name: 'Sucre blanc', qty: 5 },
      { name: 'Fleur de sel', qty: 2 },
    ],
  },
  veau: {
    dishName: 'Escalope de veau à la crème',
    ingredients: [
      { name: 'Veau - Escalope', qty: 180 },
      { name: 'Crème fraîche épaisse', qty: 80 },
      { name: 'Champignon de Paris', qty: 80 },
      { name: 'Échalote', qty: 20 },
      { name: 'Vin blanc sec', qty: 50 },
      { name: 'Beurre doux', qty: 20 },
      { name: 'Persil plat', qty: 5 },
    ],
  },
  bar: {
    dishName: 'Filet de bar, légumes de saison',
    ingredients: [
      { name: 'Bar - Filet', qty: 180 },
      { name: 'Huile d\'olive vierge extra', qty: 20 },
      { name: 'Courgette', qty: 80 },
      { name: 'Tomate cerise', qty: 60 },
      { name: 'Citron jaune', qty: 20 },
      { name: 'Basilic frais', qty: 5 },
    ],
  },
  default: {
    dishName: 'Plat du jour',
    ingredients: [
      { name: 'Bœuf - Faux-filet', qty: 180 },
      { name: 'Pomme de terre grenaille', qty: 120 },
      { name: 'Beurre doux', qty: 25 },
      { name: 'Thym frais', qty: 3 },
      { name: 'Ail', qty: 8 },
      { name: 'Fond de veau lié', qty: 60 },
    ],
  },
}

function getFallback(prompt: string) {
  const p = prompt.toLowerCase()
  for (const [key, recipe] of Object.entries(FALLBACK_RECIPES)) {
    if (key !== 'default' && p.includes(key)) return { ...recipe, fallback: true }
  }
  return { ...FALLBACK_RECIPES.default, fallback: true }
}

// ── Handler ────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const { prompt } = await req.json()
  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ error: 'Prompt requis' }, { status: 400 })
  }

  // 1. Essai avec Claude
  try {
    const result = await callClaude(prompt)
    return NextResponse.json(result)
  } catch (err) {
    console.warn('Claude API unavailable, using local fallback:', err instanceof Error ? err.message : err)
  }

  // 2. Fallback local
  const fallback = getFallback(prompt)
  return NextResponse.json(fallback)
}
