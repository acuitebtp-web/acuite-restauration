import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getFallbackClient } from '@/lib/fallback'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

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
  const parsed = JSON.parse(jsonMatch[0])
  if (!parsed.dishName || !Array.isArray(parsed.ingredients)) {
    throw new Error('Structure JSON invalide retournée par Claude')
  }
  return parsed
}

// ── Handler ────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Lire le body en premier (ne peut être lu qu'une seule fois)
  const { prompt } = await req.json()
  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ error: 'Prompt requis' }, { status: 400 })
  }
  if (prompt.length > 500) {
    return NextResponse.json({ error: 'Requête trop longue (500 caractères max)' }, { status: 400 })
  }

  // Vérifier la session — optionnel : l'outil public fonctionne sans compte
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  )
  const { data: { session } } = await supabase.auth.getSession()

  // Quota IA uniquement pour les utilisateurs connectés en plan Free
  if (session) {
    const serviceSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )
    const { data: profile } = await serviceSupabase
      .from('profiles')
      .select('plan, ai_calls_count, ai_calls_month')
      .eq('id', session.user.id)
      .single()

    if (profile && profile.plan === 'free') {
      const currentMonth = new Date().toISOString().slice(0, 7) // 'YYYY-MM'
      const callsThisMonth = profile.ai_calls_month === currentMonth ? profile.ai_calls_count : 0
      if (callsThisMonth >= 3) {
        return NextResponse.json({ error: 'Quota IA atteint (3/mois). Passez au plan Pro pour un accès illimité.', quota_exceeded: true }, { status: 429 })
      }
      // Incrémenter le compteur
      await serviceSupabase.from('profiles').update({
        ai_calls_count: callsThisMonth + 1,
        ai_calls_month: currentMonth,
      }).eq('id', session.user.id)
    }
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
