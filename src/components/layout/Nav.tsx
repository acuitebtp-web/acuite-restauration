'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export function Nav() {
  const { user, profile, signOut, loading } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-creme/90 backdrop-blur-md border-b border-brun-pale/80 shadow-[0_1px_3px_rgba(44,26,14,0.06)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Costyfood" className="h-11" />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <Link href="/outil" className="text-sm font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/40 px-3 py-2 rounded-lg transition-colors">Calculateur</Link>
          <Link href="/tarifs" className="text-sm font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/40 px-3 py-2 rounded-lg transition-colors">Tarifs</Link>
          <Link href="/saison" className="text-sm font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/40 px-3 py-2 rounded-lg transition-colors">Saison</Link>
          <Link href="/prix" className="text-sm font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/40 px-3 py-2 rounded-lg transition-colors">Marchés</Link>
          <Link href="/blog" className="text-sm font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/40 px-3 py-2 rounded-lg transition-colors">Blog</Link>
          {user && (
            <>
              <Link href="/compte/plats" className="text-sm font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/40 px-3 py-2 rounded-lg transition-colors">Mes plats</Link>
              <Link href="/compte/carte" className="text-sm font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/40 px-3 py-2 rounded-lg transition-colors">Analyse carte</Link>
            </>
          )}
          {loading ? (
            <div className="w-48 h-9 rounded-xl bg-brun-pale/40 animate-pulse ml-2" />
          ) : user ? (
            <div className="relative ml-2">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2 text-sm font-medium text-brun-mid hover:text-brun transition-all bg-white border border-brun-pale rounded-xl px-3 py-2 shadow-sm hover:shadow-md hover:border-brun-pale/80"
              >
                <div className="w-6 h-6 bg-orange rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-orange/30">
                  {(profile?.email ?? user.email ?? '?')[0].toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{profile?.email ?? user.email}</span>
                <svg className={`w-4 h-4 transition-transform ${accountOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full mt-2.5 w-60 bg-white border border-brun-pale rounded-2xl shadow-[0_16px_40px_-12px_rgba(44,26,14,0.25)] ring-1 ring-brun/5 py-2 z-50 overflow-hidden">
                  <div className="px-4 pt-1.5 pb-2.5 mb-1 border-b border-brun-pale">
                    <p className="text-xs text-brun-light">Connecté en tant que</p>
                    <p className="text-sm font-semibold text-brun truncate">{profile?.email ?? user.email}</p>
                  </div>
                  <Link href="/compte" className="flex items-center gap-2.5 mx-1.5 px-3 py-2.5 text-sm text-brun rounded-xl hover:bg-brun-pale/40 transition-colors" onClick={() => setAccountOpen(false)}>
                    <svg className="w-4 h-4 text-brun-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Tableau de bord
                  </Link>
                  <Link href="/compte/plats" className="flex items-center gap-2.5 mx-1.5 px-3 py-2.5 text-sm text-brun rounded-xl hover:bg-brun-pale/40 transition-colors" onClick={() => setAccountOpen(false)}>
                    <svg className="w-4 h-4 text-brun-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    Mes plats
                  </Link>
                  <Link href="/compte/facturation" className="flex items-center gap-2.5 mx-1.5 px-3 py-2.5 text-sm text-brun rounded-xl hover:bg-brun-pale/40 transition-colors" onClick={() => setAccountOpen(false)}>
                    <svg className="w-4 h-4 text-brun-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    Facturation
                  </Link>
                  <div className="border-t border-brun-pale my-1.5" />
                  <button
                    onClick={() => { signOut(); setAccountOpen(false) }}
                    className="flex items-center gap-2.5 mx-1.5 px-3 py-2.5 text-sm text-red-500 rounded-xl hover:bg-red-50 transition-colors w-[calc(100%-0.75rem)] text-left"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/outil" className="inline-flex items-center text-sm font-semibold px-4 py-2 rounded-xl bg-orange text-white shadow-sm shadow-orange/30 hover:bg-[#e0733a] hover:shadow-md hover:shadow-orange/40 transition-all whitespace-nowrap ml-2">
                Essayer gratuitement
              </Link>
              <Link href="/connexion" className="flex items-center gap-1.5 text-sm font-semibold text-brun bg-white border-2 border-brun px-4 py-2 rounded-xl hover:bg-brun hover:text-white transition-all whitespace-nowrap">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                Connexion
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden p-2 -mr-1 text-brun-mid hover:text-brun hover:bg-brun-pale/40 rounded-lg transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-brun-pale px-4 pt-3 pb-6 flex flex-col gap-0.5 shadow-[0_16px_30px_-16px_rgba(44,26,14,0.25)] animate-[slideDown_0.22s_cubic-bezier(0.22,1,0.36,1)]">
          <style>{`@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
          <Link href="/outil" className="text-base font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/30 px-3 py-3 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>Calculateur</Link>
          <Link href="/tarifs" className="text-base font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/30 px-3 py-3 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>Tarifs</Link>
          <Link href="/saison" className="text-base font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/30 px-3 py-3 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>Saison</Link>
          <Link href="/prix" className="text-base font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/30 px-3 py-3 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>Évolution des prix</Link>
          <Link href="/blog" className="text-base font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/30 px-3 py-3 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>Blog</Link>
          {user && (
            <>
              <div className="h-px bg-brun-pale/60 my-2" />
              <Link href="/compte" className="text-base font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/30 px-3 py-3 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>Tableau de bord</Link>
              <Link href="/compte/plats" className="text-base font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/30 px-3 py-3 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>Mes plats</Link>
              <Link href="/compte/carte" className="text-base font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/30 px-3 py-3 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>Analyse carte</Link>
              <Link href="/compte/facturation" className="text-base font-medium text-brun-mid hover:text-brun hover:bg-brun-pale/30 px-3 py-3 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>Facturation</Link>
            </>
          )}
          <div className="pt-4 mt-2 border-t border-brun-pale/60">
            {user ? (
              <Button variant="ghost" className="w-full text-red-500" onClick={() => { signOut(); setMenuOpen(false) }}>Déconnexion</Button>
            ) : (
              <div className="flex flex-col gap-2.5">
                <button onClick={() => { setMenuOpen(false); router.push('/connexion') }} className="w-full inline-flex items-center justify-center px-5 py-3 text-sm rounded-xl font-semibold border-2 border-orange text-orange hover:bg-orange-pale transition-colors">
                  Connexion
                </button>
                <button onClick={() => { setMenuOpen(false); router.push('/inscription') }} className="w-full inline-flex items-center justify-center px-5 py-3 text-sm rounded-xl font-semibold bg-orange text-white shadow-sm shadow-orange/30 hover:bg-[#e0733a] transition-colors">
                  Créer un compte
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
