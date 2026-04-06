'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export function Nav() {
  const { user, profile, signOut, loading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-creme/95 backdrop-blur-sm border-b border-brun-pale shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Acuité Restauration" className="h-11" />
        </Link>

        {/* Desktop nav + CTA — tout à droite */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/outil" className="text-sm font-medium text-brun-mid hover:text-brun transition-colors">
            Calculateur
          </Link>
          <Link href="/tarifs" className="text-sm font-medium text-brun-mid hover:text-brun transition-colors">
            Tarifs
          </Link>
          {user && (
            <>
              <Link href="/compte/plats" className="text-sm font-medium text-brun-mid hover:text-brun transition-colors">
                Mes plats
              </Link>
              <Link href="/compte/carte" className="text-sm font-medium text-brun-mid hover:text-brun transition-colors">
                Analyse carte
              </Link>
            </>
          )}
          {loading ? null : user ? (
            <div className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2 text-sm font-medium text-brun-mid hover:text-brun transition-colors bg-white border border-brun-pale rounded-xl px-3 py-2"
              >
                <div className="w-6 h-6 bg-orange rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {(profile?.email ?? user.email ?? '?')[0].toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{profile?.email ?? user.email}</span>
                <svg className={`w-4 h-4 transition-transform ${accountOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-brun-pale rounded-2xl shadow-lg py-2 z-50">
                  <Link href="/compte" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-brun hover:bg-brun-pale/40 transition-colors" onClick={() => setAccountOpen(false)}>
                    <svg className="w-4 h-4 text-brun-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Tableau de bord
                  </Link>
                  <Link href="/compte/plats" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-brun hover:bg-brun-pale/40 transition-colors" onClick={() => setAccountOpen(false)}>
                    <svg className="w-4 h-4 text-brun-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Mes plats
                  </Link>
                  <Link href="/compte/facturation" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-brun hover:bg-brun-pale/40 transition-colors" onClick={() => setAccountOpen(false)}>
                    <svg className="w-4 h-4 text-brun-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Facturation
                  </Link>
                  <div className="border-t border-brun-pale my-1" />
                  <button
                    onClick={() => { signOut(); setAccountOpen(false) }}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
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
        <div className="md:hidden bg-white border-t border-brun-pale px-4 py-4 flex flex-col gap-1">
          <Link href="/outil" className="text-sm font-medium text-brun-mid py-2.5 border-b border-brun-pale/50" onClick={() => setMenuOpen(false)}>Calculateur</Link>
          <Link href="/tarifs" className="text-sm font-medium text-brun-mid py-2.5 border-b border-brun-pale/50" onClick={() => setMenuOpen(false)}>Tarifs</Link>
          {user && (
            <>
              <Link href="/compte" className="text-sm font-medium text-brun-mid py-2.5 border-b border-brun-pale/50" onClick={() => setMenuOpen(false)}>Tableau de bord</Link>
              <Link href="/compte/plats" className="text-sm font-medium text-brun-mid py-2.5 border-b border-brun-pale/50" onClick={() => setMenuOpen(false)}>Mes plats</Link>
              <Link href="/compte/carte" className="text-sm font-medium text-brun-mid py-2.5 border-b border-brun-pale/50" onClick={() => setMenuOpen(false)}>Analyse carte</Link>
              <Link href="/compte/facturation" className="text-sm font-medium text-brun-mid py-2.5 border-b border-brun-pale/50" onClick={() => setMenuOpen(false)}>Facturation</Link>
            </>
          )}
          <div className="pt-2">
            {user ? (
              <Button variant="ghost" className="w-full text-red-500" onClick={() => { signOut(); setMenuOpen(false) }}>Déconnexion</Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/connexion" onClick={() => setMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">Connexion</Button>
                </Link>
                <Link href="/outil" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">Essayer gratuitement</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
