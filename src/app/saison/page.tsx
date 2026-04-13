import type { Metadata } from 'next'
import { SaisonClient } from './SaisonClient'

export const metadata: Metadata = {
  title: 'Produits de saison — Ingrédients frais du moment | Costyfood',
  description: 'Découvrez les fruits, légumes et produits de saison à acheter maintenant. Réduisez vos coûts et améliorez vos marges avec les produits du moment.',
}

export default function SaisonPage() {
  return <SaisonClient />
}
