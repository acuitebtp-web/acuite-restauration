export const DEFAULT_INGREDIENTS: Record<string, number> = {

  // ── BŒUF ───────────────────────────────────────
  "Bœuf - Filet":                  58.0,
  "Bœuf - Entrecôte":              32.0,
  "Bœuf - Faux-filet":             28.0,
  "Bœuf - Côte de bœuf":           26.0,
  "Bœuf - Rumsteck":               22.0,
  "Bœuf - Bavette":                18.0,
  "Bœuf - Paleron":                12.5,
  "Bœuf - Joue":                   14.0,
  "Bœuf - Macreuse":               11.0,
  "Bœuf - Plat de côte":            9.0,
  "Bœuf - Queue":                  10.0,
  "Bœuf - Os à moelle":             4.0,

  // ── VEAU ───────────────────────────────────────
  "Veau - Escalope":               24.0,
  "Veau - Côte":                   28.0,
  "Veau - Joue":                   18.0,
  "Veau - Jarret":                 14.0,
  "Veau - Tendron":                12.0,
  "Veau - Ris":                    45.0,
  "Veau - Pied":                    6.0,
  "Veau - Cervelle":               12.0,

  // ── AGNEAU ─────────────────────────────────────
  "Agneau - Gigot entier":         15.0,
  "Agneau - Épaule":               12.0,
  "Agneau - Rack / carré":         28.0,
  "Agneau - Côtelette":            22.0,
  "Agneau - Souris":               16.0,
  "Agneau - Selle":                24.0,
  "Agneau - Navarin":              10.0,
  "Agneau - Cervelle":             10.0,

  // ── PORC ───────────────────────────────────────
  "Porc - Filet mignon":           14.0,
  "Porc - Côte":                   10.0,
  "Porc - Travers":                 8.5,
  "Porc - Ventre":                  6.5,
  "Porc - Joue":                    8.0,
  "Porc - Pied":                    5.0,
  "Porc - Oreille":                 4.0,

  // ── CHARCUTERIE ────────────────────────────────
  "Jambon cru Bayonne":            22.0,
  "Porc - Lard fumé":               7.5,
  "Lardons fumés":                  8.0,
  "Saucisson sec":                 18.0,
  "Chorizo":                       14.0,
  "Boudin noir":                   10.0,

  // ── VOLAILLES ──────────────────────────────────
  "Poulet - Filet":                10.0,
  "Poulet - Cuisse":                6.5,
  "Poulet - Suprême":              12.0,
  "Poulet - Entier":                5.5,
  "Canard - Magret":               22.0,
  "Canard - Confit de cuisse":     14.0,
  "Canard - Foie gras entier":     80.0,
  "Canard - Escalope foie gras":   90.0,
  "Canard - Gésiers":               8.0,
  "Pintade - Filet":               18.0,
  "Pintade - Entière":             10.0,
  "Caille - Entière":              12.0,
  "Pigeon - Entier":               18.0,
  "Chapon - Entier":               18.0,
  "Dinde - Cuisse":                 8.0,
  "Lapin - Entier":                 8.0,
  "Lapin - Râble":                 14.0,

  // ── ABATS ──────────────────────────────────────
  "Foie de veau":                  18.0,
  "Rognons de veau":               15.0,
  "Ris de veau":                   45.0,
  "Foie de volaille":               6.0,
  "Langue de bœuf":                12.0,

  // ── GIBIER (saison automne-hiver) ──────────────
  "Chevreuil - Selle":             35.0,
  "Chevreuil - Épaule":            22.0,
  "Sanglier - Épaule":             18.0,
  "Faisan - Entier":               22.0,
  "Perdrix - Entière":             20.0,

  // ── POISSONS NOBLES ────────────────────────────
  "Sole - Filet":                  42.0,
  "Turbot - Filet":                55.0,
  "Saint-Pierre - Entier":         18.0,
  "Bar - Filet":                   28.0,
  "Bar - Entier":                  18.0,
  "Daurade - Filet":               22.0,
  "Daurade - Entière":             14.0,
  "Lotte - Queue":                 22.0,
  "Rouget - Filet":                32.0,
  "Flétan - Filet":                28.0,
  "Thon rouge - Pavé":             35.0,

  // ── POISSONS COURANTS ──────────────────────────
  "Saumon - Filet":                18.0,
  "Saumon - Pavé":                 20.0,
  "Truite - Filet":                14.0,
  "Cabillaud - Filet":             15.0,
  "Cabillaud - Dos":               22.0,
  "Lieu noir - Filet":             12.0,
  "Maquereau - Filet":              8.0,
  "Sardine - Fraîche":              5.0,
  "Hareng - Frais":                 4.0,
  "Anchois frais":                  8.0,
  "Merlu - Filet":                 14.0,

  // ── CRUSTACÉS ──────────────────────────────────
  "Homard breton - Entier":        55.0,
  "Langoustines":                  42.0,
  "Écrevisses":                    35.0,
  "Gambas - Entières":             28.0,
  "Crevettes bouquet":             22.0,
  "Crevettes roses décortiquées":  22.0,
  "Crevettes grises":              18.0,

  // ── COQUILLAGES & MOLLUSQUES ───────────────────
  "Saint-Jacques - Noix":          38.0,
  "Moules de bouchot":              3.5,
  "Huîtres creuses":                8.0,
  "Palourdes":                     14.0,
  "Bulots":                         6.0,
  "Araignée de mer":               12.0,
  "Poulpe":                        12.0,
  "Calamars":                      12.0,
  "Seiche":                        10.0,

  // ── CAVIAR & ŒUFS DE POISSON ───────────────────
  "Caviar osciètre":             2500.0,
  "Caviar sevruga":              2000.0,
  "Caviar de saumon":              90.0,
  "Œufs de lump":                  40.0,

  // ── POMMES DE TERRE ────────────────────────────
  "Pomme de terre - Bintje":        1.1,
  "Pomme de terre - Charlotte":     1.5,
  "Pomme de terre - Ratte":         2.5,
  "Pomme de terre - Vitelotte":     4.0,
  "Pomme de terre grenaille":       2.5,

  // ── LÉGUMES RACINES ────────────────────────────
  "Carotte":                        1.0,
  "Carotte fane":                   2.5,
  "Panais":                         2.5,
  "Navet":                          1.5,
  "Radis":                          2.0,
  "Betterave crue":                 1.5,
  "Betterave cuite":                2.0,
  "Topinambour":                    3.5,
  "Rutabaga":                       1.2,

  // ── CUCURBITACÉES ──────────────────────────────
  "Courgette":                      2.0,
  "Aubergine":                      2.5,
  "Concombre":                      1.5,
  "Potiron":                        1.5,
  "Butternut":                      1.8,
  "Pâtisson":                       3.0,

  // ── SOLANACÉES ─────────────────────────────────
  "Tomate ronde":                   2.0,
  "Tomate cerise":                  4.5,
  "Tomate cœur de bœuf":            4.0,
  "Tomate ancienne":                5.0,
  "Poivron rouge":                  3.0,
  "Poivron jaune":                  3.5,
  "Poivron vert":                   2.5,
  "Piment frais":                   4.0,

  // ── FEUILLES & SALADES ─────────────────────────
  "Épinard frais":                  4.0,
  "Blette":                         2.5,
  "Roquette":                       8.0,
  "Mâche":                         10.0,
  "Endive":                         3.0,
  "Laitue":                         1.8,
  "Chou vert":                      1.2,
  "Chou rouge":                     1.5,
  "Chou romanesco":                 3.0,
  "Brocoli":                        2.5,
  "Chou-fleur":                     2.0,
  "Salade verte":                   2.5,

  // ── TIGES & BULBES ─────────────────────────────
  "Asperge verte":                  8.0,
  "Asperge blanche":               10.0,
  "Artichaut":                      4.0,
  "Fenouil":                        2.5,
  "Poireau":                        2.0,
  "Céleri branche":                 2.0,
  "Céleri rave":                    1.8,
  "Oignon jaune":                   0.9,
  "Oignon rouge":                   1.2,
  "Échalote":                       4.0,
  "Ail":                            5.0,
  "Ail rose":                       6.0,
  "Maïs frais":                     2.0,

  // ── LÉGUMINEUSES ───────────────────────────────
  "Haricot vert extra-fin":         6.0,
  "Petits pois frais":              4.0,
  "Fèves":                          5.0,
  "Haricot blanc sec":              4.5,
  "Lentilles vertes du Puy":        4.0,
  "Lentilles corail":               3.0,
  "Pois chiches":                   2.8,
  "Flageolets":                     3.5,

  // ── CHAMPIGNONS ────────────────────────────────
  "Champignon de Paris":            5.0,
  "Champignon de Paris brun":       6.0,
  "Shiitake":                      18.0,
  "Pleurote":                      12.0,
  "Girolles":                      40.0,
  "Chanterelle":                   35.0,
  "Pied de mouton":                25.0,
  "Trompette de la mort":          55.0,
  "Cèpes frais":                   35.0,
  "Morilles fraîches":            120.0,
  "Morilles séchées":             800.0,
  "Truffe noire Périgord":        800.0,
  "Truffe blanche Alba":         3000.0,
  "Truffe d'été":                 180.0,

  // ── HERBES FRAÎCHES ────────────────────────────
  "Basilic frais":                 12.0,
  "Cerfeuil":                       8.0,
  "Ciboulette":                     8.0,
  "Estragon frais":                10.0,
  "Persil plat":                    6.0,
  "Thym frais":                     8.0,
  "Romarin frais":                  8.0,
  "Laurier":                        6.0,
  "Menthe fraîche":                 8.0,
  "Aneth":                         10.0,
  "Coriandre fraîche":              8.0,
  "Origan frais":                   8.0,
  "Herbes de Provence":            14.0,

  // ── ÉPICES & SEL ───────────────────────────────
  "Sel fin":                        0.5,
  "Sel de Guérande":                4.0,
  "Fleur de sel":                  20.0,
  "Poivre noir concassé":          15.0,
  "Poivre blanc moulu":            18.0,
  "Poivre de Sichuan":             35.0,
  "Poivre long":                   25.0,
  "Piment d'Espelette":            60.0,
  "Paprika doux":                   8.0,
  "Paprika fumé":                  12.0,
  "Cumin":                         10.0,
  "Curcuma":                       10.0,
  "Curry":                          8.0,
  "Cannelle":                      12.0,
  "Cardamome":                     40.0,
  "Noix de muscade":               20.0,
  "Vanille (gousse)":             200.0,
  "Safran (pistils)":            3500.0,

  // ── SUCRES ─────────────────────────────────────
  "Sucre blanc":                    1.0,
  "Sucre glace":                    1.5,
  "Sucre cassonade":                2.0,
  "Glucose":                        3.5,
  "Miel de fleurs":                 8.0,

  // ── PRODUITS LAITIERS ──────────────────────────
  "Beurre doux":                    9.0,
  "Beurre salé":                    9.5,
  "Beurre clarifié":               11.0,
  "Beurre noisette":               12.0,
  "Crème fraîche épaisse":          4.5,
  "Crème liquide 30% MG":           3.8,
  "Crème liquide 35% MG":           5.0,
  "Lait entier":                    1.2,

  // ── FROMAGES ───────────────────────────────────
  "Parmesan - Reggiano":           24.0,
  "Comté 18 mois":                 18.0,
  "Gruyère râpé":                  12.0,
  "Mozzarella di bufala":          14.0,
  "Burrata":                       18.0,
  "Chèvre frais":                  14.0,
  "Roquefort":                     22.0,
  "Brie de Meaux":                 14.0,
  "Camembert":                     12.0,
  "Reblochon":                     16.0,
  "Ricotta":                        8.0,
  "Mascarpone":                     9.0,

  // ── ŒUFS ───────────────────────────────────────
  "Œuf entier":                     0.35,
  "Jaune d'œuf":                    0.5,
  "Blanc d'œuf":                    0.2,

  // ── FARINES ────────────────────────────────────
  "Farine T45":                     1.2,
  "Farine T55":                     0.9,
  "Farine T80":                     1.2,
  "Farine de sarrasin":             2.0,
  "Farine de riz":                  2.5,

  // ── FÉCULENTS & CÉRÉALES ───────────────────────
  "Riz long grain":                 1.8,
  "Riz arborio":                    3.5,
  "Riz basmati":                    3.0,
  "Semoule fine":                   1.5,
  "Polenta":                        2.0,
  "Quinoa":                         5.0,
  "Pâtes fraîches":                 5.0,
  "Pâtes sèches":                   2.2,
  "Gnocchis frais":                 6.0,

  // ── HUILES ─────────────────────────────────────
  "Huile d'olive vierge extra":     9.0,
  "Huile de tournesol":             2.5,
  "Huile de colza":                 2.0,
  "Huile de noix":                 15.0,
  "Huile de sésame":               12.0,
  "Huile truffée":                 80.0,

  // ── VINAIGRES ──────────────────────────────────
  "Vinaigre balsamique":            8.0,
  "Vinaigre de xérès":              6.0,
  "Vinaigre de cidre":              3.5,
  "Vinaigre blanc":                 1.5,

  // ── CONDIMENTS & CONSERVES ─────────────────────
  "Moutarde de Dijon":              5.0,
  "Concentré de tomate":            3.5,
  "Câpres":                        12.0,
  "Anchois à l'huile":             22.0,
  "Tapenade":                      10.0,
  "Sauce soja":                     5.0,
  "Sauce Worcestershire":            8.0,
  "Morue salée":                   14.0,

  // ── ALCOOLS CUISINE ────────────────────────────
  "Vin blanc sec":                  5.0,
  "Vin rouge":                      4.5,
  "Champagne":                     18.0,
  "Porto rouge":                   12.0,
  "Porto blanc":                   12.0,
  "Cognac":                        25.0,
  "Calvados":                      20.0,
  "Armagnac":                      22.0,
  "Xérès sec":                     10.0,
  "Pastis":                        15.0,
  "Bière brune":                    4.0,

  // ── FONDS & FUMETS ─────────────────────────────
  "Fond de veau lié":               9.0,
  "Fond de volaille":               7.0,
  "Fond de poisson":                8.0,
  "Fumet de crustacés":            12.0,

  // ── PÂTISSERIE ─────────────────────────────────
  "Chocolat noir 70%":             12.0,
  "Chocolat au lait":              10.0,
  "Chocolat blanc":                11.0,
  "Cacao en poudre":               12.0,
  "Caramel liquide":                4.0,
  "Praliné":                       14.0,
  "Pâte d'amande":                 12.0,
  "Gélatine (feuilles)":           25.0,
  "Agar-agar":                     40.0,
  "Levure boulangère":              5.0,

  // ── FRUITS ─────────────────────────────────────
  "Citron jaune":                   2.0,
  "Citron vert":                    3.5,
  "Orange":                         1.8,
  "Pomme Golden":                   1.5,
  "Poire Williams":                 2.5,
  "Fraise Gariguette":              8.0,
  "Framboise":                     16.0,
  "Myrtille":                      14.0,
  "Cerise":                         6.0,
  "Pêche":                          3.0,
  "Abricot":                        3.5,
  "Figue fraîche":                  6.0,
  "Raisin blanc":                   4.0,
  "Mangue":                         4.0,
  "Ananas":                         3.0,
  "Avocat":                         3.5,
  "Banane":                         1.8,
  "Fruits de la passion":           8.0,
}

export const INGREDIENT_NAMES = Object.keys(DEFAULT_INGREDIENTS).sort()

// ── Normalisation ────────────────────────────────────────────────────────────
const normalize = (s: string): string =>
  s.toLowerCase()
   .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // accents
   .replace(/[''`]/g, '')
   .replace(/[^a-z0-9\s]/g, ' ')
   .replace(/\s+/g, ' ')
   .trim()

const STOP_WORDS = new Set(['de', 'du', 'des', 'le', 'la', 'les', 'en', 'et', 'au', 'aux', 'un', 'une', 'a', 'l'])

const keywords = (s: string): string[] =>
  normalize(s).split(' ')
    .filter(w => w.length > 1 && !STOP_WORDS.has(w))
    .map(w => w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w) // pluriel → singulier

// Cache normalisé construit une seule fois
const NORMALIZED_CACHE: Array<{ key: string; normKey: string; kws: string[]; price: number }> =
  Object.entries(DEFAULT_INGREDIENTS).map(([key, price]) => ({
    key,
    normKey: normalize(key),
    kws: keywords(key),
    price,
  }))

export const getPriceForIngredient = (
  name: string,
  customPrices: Record<string, number> = {}
): number => {
  // 1. Prix personnalisé (exact)
  if (customPrices[name] != null) return customPrices[name]

  // 2. Correspondance exacte
  if (DEFAULT_INGREDIENTS[name] != null) return DEFAULT_INGREDIENTS[name]

  const normName = normalize(name)

  // 3. Correspondance normalisée exacte
  const exactNorm = NORMALIZED_CACHE.find(e => e.normKey === normName)
  if (exactNorm) return exactNorm.price

  // 4. Matching par mots-clés avec score
  const lookupKws = keywords(name)
  if (lookupKws.length === 0) return 5.0

  let bestPrice = 5.0
  let bestScore = 0

  for (const entry of NORMALIZED_CACHE) {
    let score = 0

    for (const lw of lookupKws) {
      for (const ek of entry.kws) {
        if (ek === lw) score += lw.length * 2          // mot exact
        else if (ek.startsWith(lw) || lw.startsWith(ek)) score += lw.length // préfixe
        else if (ek.includes(lw) || lw.includes(ek)) score += Math.min(lw.length, ek.length) // contenu
      }
    }

    // Bonus si le premier mot-clé de la recherche est dans la clé
    if (lookupKws[0] && entry.normKey.includes(lookupKws[0])) score += 4

    if (score > bestScore) {
      bestScore = score
      bestPrice = entry.price
    }
  }

  // Seuil minimum : au moins un mot significatif (longueur ≥ 3) doit avoir matché
  return bestScore >= 6 ? bestPrice : 5.0
}
