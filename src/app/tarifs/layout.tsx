import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs — Plans Gratuit, Pro et Multi',
  description: 'Plans à partir de 0€. Pro à 15€/mois (12€ annuel), Multi à 30€/mois (24€ annuel). Sans engagement, résiliable à tout moment.',
}

export default function TarifsLayout({ children }: { children: React.ReactNode }) {
  return children
}
