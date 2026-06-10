import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-sauge text-white/75 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🥬</span>
              <span className="font-lora text-white font-bold text-xl tracking-tight">Costyfood</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Outil SaaS pour restaurateurs professionnels. Calculez votre food cost et analysez votre carte en temps réel.
            </p>
            <div className="flex gap-2.5 mt-5">
              {['🥕', '🍅', '🧅', '🫒', '🌿'].map(e => (
                <span key={e} className="text-lg opacity-80">{e}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-[0.14em]">Produit</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/outil" className="text-white/70 hover:text-white transition-colors">Calculateur food cost</Link></li>
              <li><Link href="/tarifs" className="text-white/70 hover:text-white transition-colors">Tarifs</Link></li>
              <li><Link href="/compte/carte" className="text-white/70 hover:text-white transition-colors">Analyse de carte</Link></li>
              <li><Link href="/compte" className="text-white/70 hover:text-white transition-colors">Tableau de bord</Link></li>
              <li><Link href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-[0.14em]">Ressources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/saison" className="text-white/70 hover:text-white transition-colors">Saison</Link></li>
              <li><Link href="/prix" className="text-white/70 hover:text-white transition-colors">Marchés</Link></li>
              <li><Link href="/prix" className="text-white/70 hover:text-white transition-colors">Évolution des prix</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-[0.14em]">Légal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/mentions-legales" className="text-white/70 hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgv" className="text-white/70 hover:text-white transition-colors">CGV</Link></li>
              <li><Link href="/confidentialite" className="text-white/70 hover:text-white transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-7 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/65">
          <p>© {new Date().getFullYear()} Costyfood. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            <span>🥬</span> Prix basés sur les cotations FranceAgriMer
          </p>
        </div>
      </div>
    </footer>
  )
}
