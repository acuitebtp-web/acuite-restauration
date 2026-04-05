import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Acuité Restauration — Calculez votre food cost en 30 secondes',
  description: 'Outil SaaS pour restaurateurs : calcul food cost, analyse de carte, fiches techniques PDF. Basé sur les cotations FranceAgriMer.',
  keywords: ['food cost', 'restaurateur', 'coût matière', 'menu engineering', 'fiche technique'],
  authors: [{ name: 'Acuité Restauration' }],
  openGraph: {
    title: 'Acuité Restauration',
    description: 'Calculez votre food cost et analysez votre carte en temps réel.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-creme text-brun font-jakarta antialiased">
        {children}
      </body>
    </html>
  )
}
