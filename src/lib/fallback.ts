// Fallback partagé client/serveur — correspondance du plus spécifique au plus générique
const RECIPES: Array<{ keys: string[]; dishName: string; ingredients: { name: string; qty: number }[] }> = [
  {
    keys: ['wellington'],
    dishName: 'Bœuf Wellington',
    ingredients: [
      { name: 'Bœuf - Filet', qty: 200 },
      { name: 'Duxelles de champignons', qty: 60 },
      { name: 'Jambon cru', qty: 30 },
      { name: 'Pâte feuilletée', qty: 80 },
      { name: 'Moutarde de Dijon', qty: 10 },
      { name: 'Jaune d\'œuf', qty: 15 },
      { name: 'Fond de veau lié', qty: 60 },
    ],
  },
  {
    keys: ['magret', 'canard'],
    dishName: 'Magret de canard aux cerises',
    ingredients: [
      { name: 'Canard - Magret', qty: 200 },
      { name: 'Cerise', qty: 80 },
      { name: 'Porto rouge', qty: 40 },
      { name: 'Beurre doux', qty: 20 },
      { name: 'Échalote', qty: 20 },
      { name: 'Fond de veau lié', qty: 60 },
    ],
  },
  {
    keys: ['foie gras', 'foie'],
    dishName: 'Escalope de foie gras poêlée',
    ingredients: [
      { name: 'Canard - Escalope foie gras', qty: 80 },
      { name: 'Pomme Golden', qty: 60 },
      { name: 'Beurre doux', qty: 15 },
      { name: 'Vinaigre balsamique', qty: 10 },
      { name: 'Sucre blanc', qty: 5 },
    ],
  },
  {
    keys: ['saint-jacques', 'saint jacques', 'noix de saint'],
    dishName: 'Saint-Jacques poêlées, purée de panais',
    ingredients: [
      { name: 'Saint-Jacques - Noix', qty: 120 },
      { name: 'Beurre doux', qty: 30 },
      { name: 'Céleri rave', qty: 100 },
      { name: 'Crème liquide 30% MG', qty: 50 },
      { name: 'Citron jaune', qty: 15 },
    ],
  },
  { keys: ['saumon'], dishName: 'Pavé de saumon, beurre blanc', ingredients: [{ name: 'Saumon - Pavé', qty: 180 }, { name: 'Beurre doux', qty: 40 }, { name: 'Échalote', qty: 20 }, { name: 'Vin blanc sec', qty: 50 }, { name: 'Crème liquide 30% MG', qty: 30 }, { name: 'Citron jaune', qty: 20 }] },
  { keys: ['bar', 'loup de mer'], dishName: 'Filet de bar, légumes de saison', ingredients: [{ name: 'Bar - Filet', qty: 180 }, { name: 'Huile d\'olive vierge extra', qty: 20 }, { name: 'Courgette', qty: 80 }, { name: 'Tomate cerise', qty: 60 }, { name: 'Citron jaune', qty: 20 }, { name: 'Basilic frais', qty: 5 }] },
  { keys: ['risotto'], dishName: 'Risotto aux champignons', ingredients: [{ name: 'Riz arborio', qty: 90 }, { name: 'Champignon de Paris', qty: 100 }, { name: 'Échalote', qty: 20 }, { name: 'Vin blanc sec', qty: 50 }, { name: 'Fond de volaille', qty: 300 }, { name: 'Parmesan - Reggiano', qty: 30 }, { name: 'Beurre doux', qty: 30 }] },
  { keys: ['agneau', 'rack', 'carré d\'agneau'], dishName: 'Rack d\'agneau en croûte d\'herbes', ingredients: [{ name: 'Agneau - Rack / carré', qty: 220 }, { name: 'Persil plat', qty: 10 }, { name: 'Thym frais', qty: 5 }, { name: 'Ail', qty: 8 }, { name: 'Beurre doux', qty: 20 }, { name: 'Moutarde de Dijon', qty: 15 }, { name: 'Fond de veau lié', qty: 60 }] },
  { keys: ['poulet', 'volaille', 'suprême'], dishName: 'Suprême de poulet rôti', ingredients: [{ name: 'Poulet - Suprême', qty: 180 }, { name: 'Beurre doux', qty: 25 }, { name: 'Ail', qty: 8 }, { name: 'Thym frais', qty: 3 }, { name: 'Romarin frais', qty: 3 }, { name: 'Fond de volaille', qty: 80 }, { name: 'Crème liquide 30% MG', qty: 40 }] },
  { keys: ['veau', 'escalope'], dishName: 'Escalope de veau à la crème', ingredients: [{ name: 'Veau - Escalope', qty: 180 }, { name: 'Crème fraîche épaisse', qty: 80 }, { name: 'Champignon de Paris', qty: 80 }, { name: 'Échalote', qty: 20 }, { name: 'Vin blanc sec', qty: 50 }, { name: 'Beurre doux', qty: 20 }, { name: 'Persil plat', qty: 5 }] },
  { keys: ['bourguignon', 'boeuf', 'bœuf'], dishName: 'Bœuf bourguignon', ingredients: [{ name: 'Bœuf - Paleron', qty: 200 }, { name: 'Lard fumé', qty: 40 }, { name: 'Carotte', qty: 80 }, { name: 'Oignon jaune', qty: 60 }, { name: 'Ail', qty: 10 }, { name: 'Champignon de Paris', qty: 80 }, { name: 'Vin rouge', qty: 150 }, { name: 'Fond de veau lié', qty: 50 }, { name: 'Beurre doux', qty: 20 }, { name: 'Thym frais', qty: 3 }] },
]

const DEFAULT_RECIPE = { dishName: 'Plat du jour', ingredients: [{ name: 'Bœuf - Faux-filet', qty: 180 }, { name: 'Pomme de terre grenaille', qty: 120 }, { name: 'Beurre doux', qty: 25 }, { name: 'Thym frais', qty: 3 }, { name: 'Ail', qty: 8 }, { name: 'Fond de veau lié', qty: 60 }] }

export function getFallbackClient(prompt: string) {
  const p = prompt.toLowerCase()
  for (const recipe of RECIPES) {
    if (recipe.keys.some(key => p.includes(key))) {
      return recipe
    }
  }
  return DEFAULT_RECIPE
}
