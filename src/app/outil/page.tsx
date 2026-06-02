import type { Metadata } from 'next'
import OutilClient from './OutilClient'

export const metadata: Metadata = {
  title: 'Calculateur food cost IA — Ingrédients & prix en temps réel | Costyfood',
  description: 'Calculez le coût matière de vos plats en 30 secondes. L\'IA génère les ingrédients, vous obtenez food cost %, marge brute et prix de vente conseillé. Basé sur FranceAgriMer.',
  openGraph: {
    title: 'Calculateur food cost IA — Costyfood',
    description: 'Food cost, marge et prix conseillé en 30 secondes. IA + base FranceAgriMer.',
  },
}

export default function OutilPage() {
  return <OutilClient />
}
