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
  const [showPassword, setShowPassword] = useState(false)
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
      <div className="pt-24 min-h-screen flex items-center justify-center px-4 pb-10 bg-creme">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <span className="text-4xl block mb-3">🥬</span>
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
              <div className="w-full">
                <label className="label">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brun-light hover:text-brun transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="text-right -mt-2">
                <Link href="/mot-de-passe-oublie" className="text-xs text-orange hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              {error && (
                <div className="bg-tomate-pale text-tomate text-sm px-4 py-2.5 rounded-xl">{error}</div>
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
