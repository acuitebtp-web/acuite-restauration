import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Nav />
      <div className="pt-28 pb-20 px-4 bg-creme min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🥗</div>
          <h1 className="font-lora text-5xl font-bold text-brun mb-3">404</h1>
          <h2 className="font-lora text-2xl font-semibold text-brun mb-4">Cette page n'est pas au menu</h2>
          <p className="text-brun-light mb-8">
            La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <button className="btn-primary px-8 py-3">Retour à l'accueil</button>
            </Link>
            <Link href="/outil">
              <button className="btn-secondary px-8 py-3">Calculateur food cost</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
