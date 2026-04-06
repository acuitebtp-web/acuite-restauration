import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculateur food cost — Analysez vos plats avec l\'IA',
  description: 'Calculez le food cost, la marge et le prix conseillé de vos plats en temps réel. Basé sur les cotations FranceAgriMer. Gratuit sans CB.',
}

export default function OutilLayout({ children }: { children: React.ReactNode }) {
  return children
}
