export interface SeasonalIngredient {
  name: string
  emoji: string
  category: 'légume' | 'fruit' | 'poisson' | 'viande' | 'champignon'
  months: number[] // 1=jan … 12=dec
  priceKey: string // correspond à DEFAULT_INGREDIENTS
  peakMonths?: number[]
  tip?: string
}

export const SEASONAL_INGREDIENTS: SeasonalIngredient[] = [
  // ── LÉGUMES ──
  { name: 'Asperge verte', emoji: '🌿', category: 'légume', months: [4,5,6], peakMonths: [5], priceKey: 'Asperge verte', tip: 'Pleine saison : qualité maximale, prix au plus bas' },
  { name: 'Asperge blanche', emoji: '🤍', category: 'légume', months: [4,5,6], peakMonths: [5], priceKey: 'Asperge blanche', tip: 'À associer avec un beurre mousseux ou sauce hollandaise' },
  { name: 'Petit pois frais', emoji: '💚', category: 'légume', months: [5,6,7], peakMonths: [6], priceKey: 'Petits pois frais', tip: 'Sucrés et tendres — velouté ou à la française' },
  { name: 'Artichaut violet', emoji: '💜', category: 'légume', months: [4,5,6,9,10], priceKey: 'Artichaut', tip: 'Associer avec du foie gras ou un tartare' },
  { name: 'Tomate', emoji: '🍅', category: 'légume', months: [6,7,8,9,10], peakMonths: [8], priceKey: 'Tomate cerise', tip: 'Pleine saison estivale — gaspacho, carpaccio' },
  { name: 'Courgette', emoji: '🥒', category: 'légume', months: [6,7,8,9], peakMonths: [7], priceKey: 'Courgette', tip: 'Fleurs de courgette disponibles en juillet' },
  { name: 'Aubergine', emoji: '🍆', category: 'légume', months: [7,8,9], priceKey: 'Aubergine', tip: 'Caviar d\'aubergine, tajine, ratatouille' },
  { name: 'Poivron', emoji: '🫑', category: 'légume', months: [7,8,9,10], priceKey: 'Poivron rouge', tip: 'Confits ou en espuma pour sublimer un plat' },
  { name: 'Potiron', emoji: '🎃', category: 'légume', months: [9,10,11], peakMonths: [10], priceKey: 'Potiron', tip: 'Velouté automnal, risotto, ravioles' },
  { name: 'Céleri rave', emoji: '⚪', category: 'légume', months: [10,11,12,1,2,3], priceKey: 'Céleri rave', tip: 'Rémoulade ou purée pour accompagner Saint-Jacques' },
  { name: 'Poireau', emoji: '🌱', category: 'légume', months: [10,11,12,1,2,3], priceKey: 'Poireau', tip: 'Fondue de poireaux, vichyssoise' },
  { name: 'Épinard frais', emoji: '🥬', category: 'légume', months: [3,4,5,9,10], priceKey: 'Épinard frais', tip: 'En saison : saveur délicate pour pasta ou accompagnement' },
  { name: 'Morille', emoji: '🍄', category: 'champignon', months: [3,4,5], peakMonths: [4], priceKey: 'Morilles fraîches', tip: 'La saison dure 6 semaines — sauce crème, volaille, ris de veau' },
  { name: 'Cèpe', emoji: '🍄', category: 'champignon', months: [9,10,11], peakMonths: [10], priceKey: 'Cèpes frais', tip: 'Automne : arôme boisé intense, parfait sauté ou en velouté' },
  { name: 'Truffe noire', emoji: '⚫', category: 'champignon', months: [12,1,2], peakMonths: [1], priceKey: 'Truffe noire Périgord', tip: 'Pleine saison jan-fév : prix au meilleur niveau relatif' },
  // ── FRUITS ──
  { name: 'Fraise Gariguette', emoji: '🍓', category: 'fruit', months: [4,5,6], peakMonths: [5], priceKey: 'Fraise Gariguette', tip: 'Mai : pic de saison, qualité et prix optimaux' },
  { name: 'Framboise', emoji: '🫐', category: 'fruit', months: [6,7,8,9], peakMonths: [7], priceKey: 'Framboise', tip: 'Coulis, tartes, desserts à l\'assiette' },
  { name: 'Cerise', emoji: '🍒', category: 'fruit', months: [5,6,7], peakMonths: [6], priceKey: 'Cerise', tip: 'Clafoutis, sauce pour gibier, accord magret' },
  { name: 'Abricot', emoji: '🍑', category: 'fruit', months: [6,7,8], priceKey: 'Abricot', tip: 'Tarte tatin, chutney, accord foie gras' },
  { name: 'Pêche', emoji: '🍑', category: 'fruit', months: [6,7,8,9], peakMonths: [8], priceKey: 'Pêche', tip: 'Melba, pochée au vin blanc, carpaccio sucré-salé' },
  { name: 'Figue fraîche', emoji: '🟣', category: 'fruit', months: [8,9,10], peakMonths: [9], priceKey: 'Figue fraîche', tip: 'Figues rôties, tarte, accord chèvre frais' },
  { name: 'Raisin blanc', emoji: '🍇', category: 'fruit', months: [8,9,10], priceKey: 'Raisin blanc', tip: 'Velouté, sauce verjuté, desserts' },
  { name: 'Poire Williams', emoji: '🍐', category: 'fruit', months: [9,10,11], priceKey: 'Poire Williams', tip: 'Belle Hélène, tatin, accord Roquefort' },
  { name: 'Pomme Golden', emoji: '🍎', category: 'fruit', months: [9,10,11,12], priceKey: 'Pomme Golden', tip: 'Tarte fine, en brunoise, poêlée pour accompagner' },
  // ── POISSONS ──
  { name: 'Bar de ligne', emoji: '🐟', category: 'poisson', months: [5,6,7,8,9,10], peakMonths: [7,8], priceKey: 'Bar - Filet', tip: 'Été : meilleure texture, pêche active' },
  { name: 'Maquereau', emoji: '🐟', category: 'poisson', months: [5,6,7,8,9,10], peakMonths: [6,7], priceKey: 'Maquereau - Filet', tip: 'Printemps-été : frais mariné, rillettes, gravlax' },
  { name: 'Sardine fraîche', emoji: '🐟', category: 'poisson', months: [5,6,7,8,9], peakMonths: [7], priceKey: 'Sardine - Fraîche', tip: 'Grillée au feu de bois, escabèche, tartare' },
  { name: 'Saint-Jacques', emoji: '🐚', category: 'poisson', months: [10,11,12,1,2,3], peakMonths: [12,1], priceKey: 'Saint-Jacques - Noix', tip: 'Hiver : pleine pêche normande, qualité maximale' },
  { name: 'Homard breton', emoji: '🦞', category: 'poisson', months: [5,6,7,8], peakMonths: [6,7], priceKey: 'Homard breton - Entier', tip: 'Été : homard actif, chair plus ferme et iodée' },
  { name: 'Langoustine', emoji: '🦐', category: 'poisson', months: [4,5,6,7,8,9,10], peakMonths: [5,6], priceKey: 'Langoustines', tip: 'Printanières : navarin, à la nage, bisque' },
]

export function getSeasonalForMonth(month: number): SeasonalIngredient[] {
  return SEASONAL_INGREDIENTS.filter(i => i.months.includes(month))
}

export function getPeakSeasonForMonth(month: number): SeasonalIngredient[] {
  return SEASONAL_INGREDIENTS.filter(i => i.peakMonths?.includes(month))
}

export function getCurrentSeasonLabel(month: number): string {
  if ([12, 1, 2].includes(month)) return 'Hiver'
  if ([3, 4, 5].includes(month)) return 'Printemps'
  if ([6, 7, 8].includes(month)) return 'Été'
  return 'Automne'
}

export const MONTH_NAMES = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
