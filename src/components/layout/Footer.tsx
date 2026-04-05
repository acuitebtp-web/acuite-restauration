import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-brun text-white/70 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src="/logo.svg" alt="Acuité Restauration" className="h-8 mb-3 brightness-0 invert" />
            <p className="text-sm leading-relaxed">
              Outil SaaS pour restaurateurs professionnels. Calculez votre food cost et analysez votre carte en temps réel.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Produit</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/outil" className="hover:text-white transition-colors">Calculateur</Link></li>
              <li><Link href="/tarifs" className="hover:text-white transition-colors">Tarifs</Link></li>
              <li><Link href="/compte/carte" className="hover:text-white transition-colors">Analyse de carte</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
              <li><Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <p>© {new Date().getFullYear()} Acuité Restauration. Tous droits réservés.</p>
          <p>Prix basés sur les cotations FranceAgriMer</p>
        </div>
      </div>
    </footer>
  )
}
