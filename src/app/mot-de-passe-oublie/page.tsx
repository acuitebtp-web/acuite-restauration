'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { supabase } from '@/lib/supabase'

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reinitialiser-mot-de-passe`,
    })

    if (error) {
      setError("Une erreur est survenue. Vérifiez l'adresse email.")
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <>
      <Nav />
      <div className="pt-24 min-h-screen flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-lora text-3xl font-bold text-brun">Mot de passe oublié</h1>
            <p className="text-brun-light mt-2">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-brun-pale p-8">
            {sent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-sauge-pale rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-sauge" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="font-lora text-xl font-bold text-brun mb-2">Email envoyé !</h2>
                <p className="text-sm text-brun-light mb-1">
                  Un lien de réinitialisation a été envoyé à
                </p>
                <p className="font-semibold text-brun mb-4">{email}</p>
                <p className="text-xs text-brun-light">
                  Vérifiez vos spams si vous ne le recevez pas dans 2 minutes.
                </p>
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
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl">{error}</div>
                )}
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  Envoyer le lien
                </Button>
              </form>
            )}
          </div>

          <p className="text-center text-sm text-brun-light mt-6">
            <Link href="/connexion" className="text-orange font-semibold hover:underline">
              ← Retour à la connexion
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
