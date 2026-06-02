import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/compte/' },
    sitemap: 'https://costyfood.fr/sitemap.xml',
  }
}
