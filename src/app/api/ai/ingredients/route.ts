import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getFallbackClient } from '@/lib/fallback'

// Augmente le timeout Vercel à 30s (Hobby plan max)
export const maxDuration = 30

const SYSTEM_PROMPT = `Tu es un assistant pour restaurateurs professionnels.
Retourne UNIQUEMENT un objet JSON valide, sans markdown, sans backticks, sans texte avant ou après :
{"dishName":"Nom du plat","ingredients":[{"name":"Ingrédient précis","qty":grammes}]}
- Quantités par assiette individuelle, en grammes (nombre entier)
- Noms en français précis (ex: "Bœuf - Filet", pas "Bœuf")
- 6 à 10 ingrédients maximum
- Génère EXACTEMENT le plat demandé, pas un plat similaire`
async function callClaude(prompt: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY non configurée')

  const client = new Anthropic({ apiKey })
  const response = await client.messages.create({
          model: 'claude-haiku-4-5-20251001', // Haiku 4.5 : modèle actuel
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })
  const text = response.content[0].type === 'text' ? response.content[0].text : ''

  // Extraire le JSON même si Claude ajoute du texte autour
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error(`Réponse Claude non parseable: ${text.substring(0, 100)}`)
  return JSON.parse(jsonMatch[0])
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
    console.error('Claude API error:', message)

    if (message.includes('ANTHROPIC_API_KEY')) {
      return NextResponse.json({ error: 'Clé API IA non configurée.' }, { status: 503 })
    }
  }

  // 2. Fallback local si Claude échoue
  const fallback = { ...getFallbackClient(prompt), fallback: true }
  return NextResponse.json(fallback)
}
