import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://costyfood.fr',                 lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: 'https://costyfood.fr/tarifs',           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://costyfood.fr/outil',            lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: 'https://costyfood.fr/prix',             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: 'https://costyfood.fr/saison',           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://costyfood.fr/inscription',      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
    { url: 'https://costyfood.fr/connexion',        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
    { url: 'https://costyfood.fr/cgv',              lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: 'https://costyfood.fr/confidentialite',  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: 'https://costyfood.fr/mentions-legales', lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
