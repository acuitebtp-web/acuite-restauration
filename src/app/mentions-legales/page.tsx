import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
}

export default function MentionsLegalesPage() {
  return (
    <>
      <Nav />
      <div className="pt-28 pb-20 px-4 bg-creme min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-lora text-4xl font-bold text-brun mb-2">Mentions légales</h1>
          <p className="text-brun-light mb-10">Dernière mise à jour : avril 2026</p>

          <div className="space-y-8 text-brun-mid leading-relaxed">
            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">1. Éditeur du site</h2>
              <p>Le site <strong>costyfood.fr</strong> est édité par :</p>
              <div className="mt-3 bg-white border border-brun-pale rounded-2xl p-5 space-y-1 text-sm">
                <p><strong>Costyfood</strong></p>
                <p>Email : contact@costyfood.fr</p>
                <p>Directeur de la publication : Basile Bonnin</p>
              </div>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">2. Hébergement</h2>
              <div className="bg-white border border-brun-pale rounded-2xl p-5 space-y-1 text-sm">
                <p><strong>Vercel Inc.</strong></p>
                <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
                <p>Site : vercel.com</p>
              </div>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">3. Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, logos, code source) est la propriété exclusive d'Costyfood, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">4. Données personnelles</h2>
              <p>
                Les données personnelles collectées (email, données d'utilisation) sont traitées conformément à notre <a href="/confidentialite" className="text-orange underline">politique de confidentialité</a>. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">5. Limitation de responsabilité</h2>
              <p>
                Les informations contenues sur ce site sont fournies à titre indicatif. Les prix des ingrédients sont basés sur les cotations FranceAgriMer et peuvent ne pas refléter les prix réels de votre fournisseur. Costyfood ne saurait être tenu responsable des décisions prises sur la base de ces données.
              </p>
            </section>

            <section>
              <h2 className="font-lora text-xl font-bold text-brun mb-3">6. Loi applicable</h2>
              <p>
                Le présent site et ses conditions d'utilisation sont régis par le droit français. Tout litige sera soumis à la compétence des tribunaux français.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
