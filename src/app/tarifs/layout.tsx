import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs — Plans Gratuit, Pro et Multi',
  description: 'Plans à partir de 0€. Accès gratuit pour 3 plats, Pro à 15€/mois, Multi à 30€/mois. Sans engagement, résiliable à tout moment.',
}

export default function TarifsLayout({ children }: { children: React.ReactNode }) {
  return children
}
