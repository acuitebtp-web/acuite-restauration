import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 30

const SYSTEM_PROMPT = `Tu es un assistant expert en restauration professionnelle.
On te donne la photo d'une carte de restaurant.
Extrait tous les plats visibles et retourne UNIQUEMENT un JSON valide, sans markdown, sans backticks :
{
  "dishes": [
    {
      "name": "Nom exact du plat tel qu'écrit sur la carte",
      "category": "entrée" | "plat" | "dessert" | "autre",
      "price": prix en euros (nombre décimal, sans symbole),
      "description": "courte description si visible, sinon null"
    }
  ]
}
Règles :
- Inclure tous les plats visibles (entrées, plats, desserts, boissons exclues)
- Respecter l'orthographe exacte du menu
- Si le prix n'est pas visible, mettre null
- Category "entrée" pour les entrées/starters, "plat" pour les plats principaux, "dessert" pour les desserts
- Maximum 40 plats`

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  )
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  // Vérifier plan Pro pour scan-carte
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', session.user.id)
    .single()
  if (!profile || (profile.plan !== 'pro' && profile.plan !== 'multi')) {
    return NextResponse.json({ error: 'Fonctionnalité réservée au plan Pro' }, { status: 403 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Clé API manquante' }, { status: 503 })

  const { image, mimeType } = await req.json()
  if (!image) return NextResponse.json({ error: 'Image manquante' }, { status: 400 })

  // Valider le type MIME
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (mimeType && !ALLOWED_MIME_TYPES.includes(mimeType)) {
    return NextResponse.json({ error: "Type d'image non supporté (jpeg, png, webp uniquement)" }, { status: 415 })
  }
  // Limiter la taille : 5 Mo max en base64 ≈ 6.8 Mo de chaîne
  if (typeof image === 'string' && image.length > 7 * 1024 * 1024) {
    return NextResponse.json({ error: 'Image trop volumineuse (5 Mo max)' }, { status: 413 })
  }

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType || 'image/jpeg',
                data: image,
              },
            },
            {
              type: 'text',
              text: 'Extrais tous les plats de cette carte de restaurant.',
            },
          ],
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Réponse non parseable')

    const result = JSON.parse(jsonMatch[0])
    if (!Array.isArray(result.dishes)) {
      throw new Error('Structure JSON invalide : dishes manquant ou non-array')
    }
    return NextResponse.json(result)
  } catch (err) {
    console.error('scan-carte error:', err)
    return NextResponse.json({ error: 'Erreur lors de l\'analyse de la carte' }, { status: 500 })
  }
}
