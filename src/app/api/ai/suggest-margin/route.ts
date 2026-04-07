import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 30

const SYSTEM_PROMPT = `Tu es un expert en rentabilité pour restaurateurs professionnels.
On te donne un plat avec ses ingrédients, leur coût et le food cost actuel.
Retourne UNIQUEMENT un objet JSON valide, sans markdown, sans backticks :
{
  "suggestions": [
    {
      "type": "substitution" | "saison" | "portion" | "variante",
      "title": "Titre court de la suggestion",
      "description": "Explication en 1-2 phrases",
      "saving": "Économie estimée en euros par assiette (ex: -0,80€)",
      "newFoodCost": "food cost estimé après application (ex: 24%)"
    }
  ]
}
- 3 suggestions maximum, les plus impactantes
- Substitutions réalistes et de qualité équivalente
- Toujours mentionner l'ingrédient remplacé et par quoi
- Rester dans le style du plat`

export async function POST(req: NextRequest) {
  const { dishName, ingredients, foodCostPct, costPerCover } = await req.json()
  if (!dishName || !ingredients) {
    return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Clé API manquante' }, { status: 503 })

  const prompt = `Plat : ${dishName}
Food cost actuel : ${foodCostPct?.toFixed(1)}% (${costPerCover?.toFixed(2)}€/assiette)
Ingrédients :
${ingredients.map((i: { name: string; qty_grams: number; cost: number }) => `- ${i.name} : ${i.qty_grams}g → ${i.cost.toFixed(3)}€`).join('\n')}

Propose 3 suggestions pour réduire le food cost tout en maintenant la qualité.`

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Réponse non parseable')
    return NextResponse.json(JSON.parse(jsonMatch[0]))
  } catch (err) {
    console.error('suggest-margin error:', err)
    return NextResponse.json({ error: 'Erreur IA' }, { status: 500 })
  }
}
