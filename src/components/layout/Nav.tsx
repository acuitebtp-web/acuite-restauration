'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export function Nav() {
  const { user, signOut, loading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-creme/90 backdrop-blur-sm border-b border-brun-pale">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Acuité Restauration" className="h-8" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/outil" className="text-sm font-medium text-brun-mid hover:text-brun transition-colors">
            Outil
          </Link>
          <Link href="/tarifs" className="text-sm font-medium text-brun-mid hover:text-brun transition-colors">
            Tarifs
          </Link>
          {user && (
            <Link href="/compte" className="text-sm font-medium text-brun-mid hover:text-brun transition-colors">
              Mon compte
            </Link>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? null : user ? (
            <>
              <Link href="/compte">
                <Button variant="ghost" size="sm">Tableau de bord</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut}>Déconnexion</Button>
            </>
          ) : (
            <>
              <Link href="/connexion">
                <Button variant="ghost" size="sm">Connexion</Button>
              </Link>
              <Link href="/outil">
                <Button size="sm">Essayer gratuitement</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 text-brun-mid"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-brun-pale px-4 py-4 flex flex-col gap-3">
          <Link href="/outil" className="text-sm font-medium text-brun-mid py-2" onClick={() => setMenuOpen(false)}>Outil</Link>
          <Link href="/tarifs" className="text-sm font-medium text-brun-mid py-2" onClick={() => setMenuOpen(false)}>Tarifs</Link>
          {user && (
            <Link href="/compte" className="text-sm font-medium text-brun-mid py-2" onClick={() => setMenuOpen(false)}>Mon compte</Link>
          )}
          <div className="border-t border-brun-pale pt-3 flex flex-col gap-2">
            {user ? (
              <Button variant="ghost" onClick={() => { signOut(); setMenuOpen(false) }}>Déconnexion</Button>
            ) : (
              <>
                <Link href="/connexion" onClick={() => setMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">Connexion</Button>
                </Link>
                <Link href="/outil" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">Essayer gratuitement</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
