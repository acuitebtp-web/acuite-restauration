import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre espace Acuité Restauration pour accéder à vos plats et votre tableau de bord.',
}

export default function ConnexionLayout({ children }: { children: React.ReactNode }) {
  return children
}
