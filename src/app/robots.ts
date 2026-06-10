import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/compte/', '/onboarding', '/mot-de-passe-oublie', '/reinitialiser-mot-de-passe'] },
    sitemap: 'https://costyfood.fr/sitemap.xml',
  }
}
