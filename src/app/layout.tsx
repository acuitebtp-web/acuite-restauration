import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { Lora, Plus_Jakarta_Sans } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Costyfood — Calculez votre food cost en 30 secondes',
    template: '%s | Costyfood',
  },
  description: 'Outil SaaS pour restaurateurs : calcul food cost, analyse de carte, fiches techniques PDF. Basé sur les cotations FranceAgriMer.',
  keywords: ['food cost', 'restaurateur', 'coût matière', 'menu engineering', 'fiche technique'],
  authors: [{ name: 'Costyfood' }],
  metadataBase: new URL('https://costyfood.fr'),
  alternates: {
    canonical: 'https://costyfood.fr',
  },
  openGraph: {
    title: 'Costyfood — Calculez votre food cost en 30 secondes',
    description: 'Calculez votre food cost et analysez votre carte en temps réel.',
    url: 'https://costyfood.fr',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Costyfood',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${lora.variable} ${plusJakarta.variable} bg-creme text-brun font-jakarta antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
