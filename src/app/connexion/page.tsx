import type { Metadata } from 'next'
import ConnexionClient from './ConnexionClient'

export const metadata: Metadata = {
  title: 'Connexion | Costyfood',
  description: 'Connectez-vous à votre compte Costyfood pour accéder à vos fiches techniques, analyses de carte et calculs food cost.',
}

export default function ConnexionPage() {
  return <ConnexionClient />
}
