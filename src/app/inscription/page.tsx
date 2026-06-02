import type { Metadata } from 'next'
import InscriptionClient from './InscriptionClient'

export const metadata: Metadata = {
  title: 'Créer un compte gratuit | Costyfood',
  description: 'Inscrivez-vous gratuitement sur Costyfood. Calculez le food cost de vos plats, analysez votre carte et exportez vos fiches techniques PDF. Sans carte bancaire.',
}

export default function InscriptionPage() {
  return <InscriptionClient />
}
