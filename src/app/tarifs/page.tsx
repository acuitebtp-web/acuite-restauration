import type { Metadata } from 'next'
import { TarifsClient } from './TarifsClient'

export const metadata: Metadata = {
  title: 'Tarifs — Plans Gratuit, Pro et Multi | Costyfood',
  description: 'Choisissez votre plan Costyfood : calcul food cost IA, export PDF fiche technique, scan de carte restaurant. Dès 0€, Pro à 15€/mois.',
  keywords: ['tarif food cost', 'prix logiciel restauration', 'abonnement calcul food cost', 'outil restaurateur'],
  alternates: { canonical: 'https://costyfood.fr/tarifs' },
  openGraph: {
    title: 'Tarifs — Plans Gratuit, Pro et Multi | Costyfood',
    description: 'Calcul food cost IA, export PDF, scan de carte. Dès 0€, Pro à 15€/mois.',
    url: 'https://costyfood.fr/tarifs',
    type: 'website',
  },
}

export default function TarifsPage() {
  return <TarifsClient />
}
