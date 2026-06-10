import type { Metadata } from 'next'
import { SaisonClient } from './SaisonClient'

export const metadata: Metadata = {
  title: 'Produits de saison — Ingrédients frais du moment | Costyfood',
  description: 'Découvrez les fruits, légumes et produits de saison à acheter maintenant. Réduisez vos coûts et améliorez vos marges avec les produits du moment.',
  keywords: ['produits de saison restaurant', 'ingrédients saison', 'légumes saison chef', 'fruits saison restauration'],
  alternates: { canonical: 'https://costyfood.fr/saison' },
  openGraph: {
    title: 'Produits de saison — Ingrédients frais du moment | Costyfood',
    description: 'Fruits, légumes et produits de saison à acheter maintenant pour réduire vos coûts.',
    url: 'https://costyfood.fr/saison',
    type: 'website',
  },
}

export default function SaisonPage() {
  return <SaisonClient />
}
