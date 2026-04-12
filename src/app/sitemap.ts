import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://costyfood.fr', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://costyfood.fr/tarifs', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://costyfood.fr/outil', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://costyfood.fr/prix', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://costyfood.fr/saison', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
