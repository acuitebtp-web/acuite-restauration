import type { Metadata } from 'next'
import OutilClient from './OutilClient'

export const metadata: Metadata = {
  title: 'Calculateur food cost IA — Ingrédients & prix en temps réel | Costyfood',
  description: 'Calculez le coût matière de vos plats en 30 secondes. L\'IA génère les ingrédients, vous obtenez food cost %, marge brute et prix de vente conseillé. Basé sur FranceAgriMer.',
  keywords: ['calculateur food cost', 'calcul food cost en ligne', 'food cost IA', 'calcul coût matière restaurant', 'prix ingrédients restaurant', 'marge restauration'],
  alternates: { canonical: 'https://costyfood.fr/outil' },
  openGraph: {
    title: 'Calculateur food cost IA — Costyfood',
    description: 'Food cost, marge et prix conseillé en 30 secondes. IA + base FranceAgriMer.',
    url: 'https://costyfood.fr/outil',
    images: [{ url: 'https://costyfood.fr/og-image.png', width: 1200, height: 630 }],
  },
}


function OutilJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculateur food cost — Costyfood',
    url: 'https://costyfood.fr/outil',
    description: "Calculez le food cost de vos plats en 30 secondes grâce à l'IA. Basé sur les cotations FranceAgriMer.",
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    featureList: ['Génération IA des ingrédients', 'Calcul food cost en temps réel', 'Prix basés sur FranceAgriMer', 'Export PDF fiche technique'],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default function OutilPage() {
  return <><OutilJsonLd /><OutilClient /></>
}
