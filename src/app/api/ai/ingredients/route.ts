import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getFallbackClient } from '@/lib/fallback'

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
Sois réaliste sur les quantités professionnelles.
Génère EXACTEMENT le plat demandé par l'utilisateur, pas un plat similaire.`



async function callClaude(prompt: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY non configurée')

  const client = new Anthropic({ apiKey })
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 800,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: `Génère les ingrédients pour ce plat : ${prompt}` }],
  })
  const text = response.content[0].type === 'text' ? response.content[0].text : ''

  // Nettoyer les backticks potentiels
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  return JSON.parse(cleaned)
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
    const message = err instanceof Error ? err.message : String(err)
    console.warn('Claude API unavailable:', message)

    // Signaler si c'est un problème de clé API
    if (message.includes('ANTHROPIC_API_KEY')) {
      return NextResponse.json({ error: 'Clé API IA non configurée. Ajoutez ANTHROPIC_API_KEY dans les variables d\'environnement Vercel.' }, { status: 503 })
    }
  }

  // 2. Fallback local
  const fallback = { ...getFallbackClient(prompt), fallback: true }
  return NextResponse.json(fallback)
}
