import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Créer un compte gratuit',
  description: 'Inscrivez-vous gratuitement sur Costyfood. Aucune carte bancaire requise. Calculez votre food cost dès maintenant.',
}

export default function InscriptionLayout({ children }: { children: React.ReactNode }) {
  return children
}
