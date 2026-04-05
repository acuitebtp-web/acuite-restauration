'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { supabase } from '@/lib/supabase'

export default function ReinitialiserMotDePassePage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Supabase injecte la session depuis le lien magique dans le hash
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError("Une erreur est survenue. Veuillez recommencer.")
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
            <h1 className="font-lora text-3xl font-bold text-brun">Nouveau mot de passe</h1>
            <p className="text-brun-light mt-2">Choisissez un nouveau mot de passe sécurisé</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-brun-pale p-8">
            {success ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-sauge-pale rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-sauge" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-lora text-xl font-bold text-brun mb-2">Mot de passe mis à jour !</h2>
                <p className="text-sm text-brun-light">Redirection vers votre compte...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nouveau mot de passe"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6 caractères minimum"
                />
                <Input
                  label="Confirmer le mot de passe"
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Répétez votre mot de passe"
                />
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl">{error}</div>
                )}
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  Mettre à jour le mot de passe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
