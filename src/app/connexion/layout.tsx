import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre espace Costyfood pour accéder à vos plats et votre tableau de bord.',
}

export default function ConnexionLayout({ children }: { children: React.ReactNode }) {
  return children
}
