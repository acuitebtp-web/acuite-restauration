'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

export default function InscriptionPage() {
  const { signUp } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await signUp(email, password)
    if (error) {
      setError(error)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/compte'), 2000)
    }
    setLoading(false)
  }

  return (
    <>
      <Nav />
      <div className="pt-24 min-h-screen flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-lora text-3xl font-bold text-brun">Créer un compte</h1>
            <p className="text-brun-light mt-2">Gratuit, sans CB, en 30 secondes</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-brun-pale p-8">
            {success ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-sauge-pale rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-sauge" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-lora text-xl font-semibold text-brun mb-2">Compte créé !</h2>
                <p className="text-brun-light text-sm">Redirection vers votre tableau de bord...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chef@restaurant.fr"
                />
                <Input
                  label="Mot de passe"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6 caractères minimum"
                />
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl">{error}</div>
                )}

                <div className="bg-sauge-pale rounded-xl p-3 text-sm text-sauge">
                  <strong>Plan gratuit inclus :</strong> 3 plats sauvegardés, calcul food cost illimité
                </div>

                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  Créer mon compte gratuit
                </Button>

                <p className="text-center text-xs text-brun-light">
                  En créant un compte, vous acceptez nos{' '}
                  <Link href="/cgv" className="underline">CGV</Link> et notre{' '}
                  <Link href="/confidentialite" className="underline">politique de confidentialité</Link>
                </p>
              </form>
            )}
          </div>

          <p className="text-center text-sm text-brun-light mt-6">
            Déjà un compte ?{' '}
            <Link href="/connexion" className="text-orange font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
