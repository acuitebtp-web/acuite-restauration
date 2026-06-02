import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ARTICLES, getArticle } from '../articles'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `https://costyfood.fr/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://costyfood.fr/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.dateIso,
      authors: ['Costyfood'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

function ArticleJsonLd({ article }: { article: ReturnType<typeof getArticle> }) {
  if (!article) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.dateIso,
    dateModified: article.dateIso,
    author: { '@type': 'Organization', name: 'Costyfood', url: 'https://costyfood.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'Costyfood',
      url: 'https://costyfood.fr',
      logo: { '@type': 'ImageObject', url: 'https://costyfood.fr/logo.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://costyfood.fr/blog/${article.slug}` },
    keywords: article.keywords.join(', '),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function BreadcrumbJsonLd({ article }: { article: ReturnType<typeof getArticle> }) {
  if (!article) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://costyfood.fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://costyfood.fr/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://costyfood.fr/blog/${article.slug}` },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

const CATEGORY_COLORS: Record<string, string> = {
  'Gestion': 'bg-orange/10 text-orange',
  'Stratégie': 'bg-brun/10 text-brun',
  'Marchés': 'bg-emerald-100 text-emerald-700',
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const otherArticles = ARTICLES.filter(a => a.slug !== slug).slice(0, 2)

  return (
    <>
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd article={article} />
      <Nav />
      <main className="pt-16 min-h-screen bg-creme">
        {/* Header */}
        <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-brun-mid mb-8" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-brun transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brun transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-brun truncate max-w-[200px]">{article.category}</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
              {article.category}
            </span>
            <span className="text-sm text-brun-mid">{article.date}</span>
            <span className="text-brun-mid/50">·</span>
            <span className="text-sm text-brun-mid">{article.readTime} min de lecture</span>
          </div>

          {/* Title */}
          <h1 className="font-lora text-3xl md:text-4xl font-bold text-brun leading-tight mb-6">
            {article.title}
          </h1>

          {/* Lead */}
          <p className="text-lg text-brun-mid leading-relaxed mb-10 border-l-4 border-orange pl-4">
            {article.description}
          </p>

          {/* Divider */}
          <div className="border-t border-brun-pale mb-10" />

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-lora prose-headings:text-brun prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-7 prose-h3:mb-3
              prose-p:text-brun-mid prose-p:leading-relaxed
              prose-ul:text-brun-mid prose-li:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-orange prose-blockquote:bg-orange/5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-brun prose-blockquote:font-normal
              prose-strong:text-brun
              prose-a:text-orange prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Divider */}
          <div className="border-t border-brun-pale mt-12 mb-8" />

          {/* CTA inline */}
          <div className="bg-white border border-brun-pale rounded-2xl p-6 text-center">
            <p className="font-lora text-xl font-bold text-brun mb-2">
              Calculez votre food cost maintenant
            </p>
            <p className="text-brun-mid text-sm mb-5">
              Entrez le nom d&rsquo;un plat — l&rsquo;IA génère les ingrédients et les prix sont mis à jour chaque semaine.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/outil"
                className="inline-flex items-center justify-center gap-2 bg-orange text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange/90 transition-colors text-sm"
              >
                Essayer gratuitement
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center gap-2 border border-brun text-brun font-semibold px-5 py-2.5 rounded-xl hover:bg-brun hover:text-white transition-all text-sm"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>
        </article>

        {/* Related articles */}
        {otherArticles.length > 0 && (
          <section className="border-t border-brun-pale py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="font-lora text-2xl font-bold text-brun mb-8 text-center">
                À lire également
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {otherArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="group bg-creme rounded-2xl border border-brun-pale p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[a.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {a.category}
                      </span>
                      <span className="text-xs text-brun-mid">{a.readTime} min</span>
                    </div>
                    <h3 className="font-lora text-base font-bold text-brun group-hover:text-orange transition-colors leading-snug mb-2 line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="text-sm text-brun-mid line-clamp-2">{a.description}</p>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/blog" className="text-sm font-semibold text-orange hover:underline">
                  ← Tous les articles
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
