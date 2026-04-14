'use client'
import { Suspense } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

function ConnexionPageInner() {
  const { signIn, signInWithGoogle } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/compte'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
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

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await signInWithGoogle()
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
            {/* Google OAuth */}
            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 border-2 border-brun-pale rounded-xl px-4 py-3 text-sm font-semibold text-brun hover:bg-creme hover:border-brun transition-all mb-5 disabled:opacity-60"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? 'Redirection…' : 'Continuer avec Google'}
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-brun-pale" />
              <span className="text-xs text-brun-light">ou par email</span>
              <div className="flex-1 h-px bg-brun-pale" />
            </div>

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

export default function ConnexionClient() {
  return (
    <Suspense>
      <ConnexionPageInner />
    </Suspense>
  )
}
