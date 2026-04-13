import type { Metadata } from 'next'
import { TarifsClient } from './TarifsClient'

export const metadata: Metadata = {
  title: 'Tarifs — Plans Gratuit, Pro et Multi | Costyfood',
  description: 'Choisissez votre plan Costyfood : calcul food cost IA, export PDF fiche technique, scan de carte restaurant. Dès 0€, Pro à 15€/mois.',
}

export default function TarifsPage() {
  return <TarifsClient />
}
