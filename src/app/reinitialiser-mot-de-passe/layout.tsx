import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Réinitialiser le mot de passe | Costyfood',
  robots: { index: false, follow: false },
}
export default function ReinitialiserLayout({ children }: { children: React.ReactNode }) {
  return children
}
