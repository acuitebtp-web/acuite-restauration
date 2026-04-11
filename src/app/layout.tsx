import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'Costyfood — Calculez votre food cost en 30 secondes',
    template: '%s | Costyfood',
  },
  description: 'Outil SaaS pour restaurateurs : calcul food cost, analyse de carte, fiches techniques PDF. Basé sur les cotations FranceAgriMer.',
  keywords: ['food cost', 'restaurateur', 'coût matière', 'menu engineering', 'fiche technique'],
  authors: [{ name: 'Costyfood' }],
  openGraph: {
    title: 'Costyfood — Calculez votre food cost en 30 secondes',
    description: 'Calculez votre food cost et analysez votre carte en temps réel.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Costyfood',
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
