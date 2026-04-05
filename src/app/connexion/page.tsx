'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

export default function ConnexionPage() {
  const { signIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/compte'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(email, password)
    if (error) {
      setError('Email ou mot de passe incorrect')
    } else {
      router.push(redirect)
    }
    setLoading(false)
  }

  return (
    <>
      <Nav />
      <div className="pt-24 min-h-screen flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-lora text-3xl font-bold text-brun">Connexion</h1>
            <p className="text-brun-light mt-2">Bon retour parmi nous</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-brun-pale p-8">
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <div className="text-right -mt-2">
                <Link href="/mot-de-passe-oublie" className="text-xs text-orange hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl">{error}</div>
              )}
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Se connecter
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-brun-light mt-6">
            Pas encore de compte ?{' '}
            <Link href="/inscription" className="text-orange font-semibold hover:underline">
              Créer un compte gratuit
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
