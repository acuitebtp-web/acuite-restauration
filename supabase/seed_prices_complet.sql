-- ============================================================
-- SEED COMPLET ingredient_price_snapshots
-- 2 séries : J-7 (base) + J0 (variations saisonnières avril 2026)
-- À coller dans Supabase SQL Editor
-- ============================================================

-- Nettoyage optionnel (décommenter si besoin de repartir de zéro)
-- TRUNCATE TABLE ingredient_price_snapshots;

-- ============================================================
-- SÉRIE 1 : snapshot J-7 (prix de base)
-- ============================================================
INSERT INTO ingredient_price_snapshots (ingredient, price_per_kg, source, recorded_at) VALUES

-- Bœuf
('Bœuf - Filet',              58.00, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Entrecôte',          32.00, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Faux-filet',         28.00, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Côte de bœuf',       26.00, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Rumsteck',           22.00, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Bavette',            18.00, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Paleron',            12.50, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Joue',               14.00, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Macreuse',           11.00, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Plat de côte',        9.00, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Queue',              10.00, 'seed', NOW() - INTERVAL '7 days'),
('Bœuf - Os à moelle',         4.00, 'seed', NOW() - INTERVAL '7 days'),

-- Veau
('Veau - Escalope',           24.00, 'seed', NOW() - INTERVAL '7 days'),
('Veau - Côte',               28.00, 'seed', NOW() - INTERVAL '7 days'),
('Veau - Joue',               18.00, 'seed', NOW() - INTERVAL '7 days'),
('Veau - Jarret',             14.00, 'seed', NOW() - INTERVAL '7 days'),
('Veau - Tendron',            12.00, 'seed', NOW() - INTERVAL '7 days'),
('Veau - Ris',                45.00, 'seed', NOW() - INTERVAL '7 days'),
('Veau - Pied',                6.00, 'seed', NOW() - INTERVAL '7 days'),
('Veau - Cervelle',           12.00, 'seed', NOW() - INTERVAL '7 days'),

-- Agneau
('Agneau - Gigot entier',     15.00, 'seed', NOW() - INTERVAL '7 days'),
('Agneau - Épaule',           12.00, 'seed', NOW() - INTERVAL '7 days'),
('Agneau - Rack / carré',     28.00, 'seed', NOW() - INTERVAL '7 days'),
('Agneau - Côtelette',        22.00, 'seed', NOW() - INTERVAL '7 days'),
('Agneau - Souris',           16.00, 'seed', NOW() - INTERVAL '7 days'),
('Agneau - Selle',            24.00, 'seed', NOW() - INTERVAL '7 days'),
('Agneau - Navarin',          10.00, 'seed', NOW() - INTERVAL '7 days'),
('Agneau - Cervelle',         10.00, 'seed', NOW() - INTERVAL '7 days'),

-- Porc
('Porc - Filet mignon',       14.00, 'seed', NOW() - INTERVAL '7 days'),
('Porc - Côte',               10.00, 'seed', NOW() - INTERVAL '7 days'),
('Porc - Travers',             8.50, 'seed', NOW() - INTERVAL '7 days'),
('Porc - Ventre',              6.50, 'seed', NOW() - INTERVAL '7 days'),
('Porc - Joue',                8.00, 'seed', NOW() - INTERVAL '7 days'),
('Porc - Pied',                5.00, 'seed', NOW() - INTERVAL '7 days'),
('Porc - Oreille',             4.00, 'seed', NOW() - INTERVAL '7 days'),

-- Charcuterie
('Jambon cru Bayonne',        22.00, 'seed', NOW() - INTERVAL '7 days'),
('Porc - Lard fumé',           7.50, 'seed', NOW() - INTERVAL '7 days'),
('Lardons fumés',              8.00, 'seed', NOW() - INTERVAL '7 days'),
('Saucisson sec',             18.00, 'seed', NOW() - INTERVAL '7 days'),
('Chorizo',                   14.00, 'seed', NOW() - INTERVAL '7 days'),
('Boudin noir',               10.00, 'seed', NOW() - INTERVAL '7 days'),

-- Volailles
('Poulet - Filet',            10.00, 'seed', NOW() - INTERVAL '7 days'),
('Poulet - Cuisse',            6.50, 'seed', NOW() - INTERVAL '7 days'),
('Poulet - Suprême',          12.00, 'seed', NOW() - INTERVAL '7 days'),
('Poulet - Entier',            5.50, 'seed', NOW() - INTERVAL '7 days'),
('Canard - Magret',           22.00, 'seed', NOW() - INTERVAL '7 days'),
('Canard - Confit de cuisse', 14.00, 'seed', NOW() - INTERVAL '7 days'),
('Canard - Foie gras entier', 80.00, 'seed', NOW() - INTERVAL '7 days'),
('Canard - Escalope foie gras',90.00,'seed', NOW() - INTERVAL '7 days'),
('Canard - Gésiers',           8.00, 'seed', NOW() - INTERVAL '7 days'),
('Pintade - Filet',           18.00, 'seed', NOW() - INTERVAL '7 days'),
('Pintade - Entière',         10.00, 'seed', NOW() - INTERVAL '7 days'),
('Caille - Entière',          12.00, 'seed', NOW() - INTERVAL '7 days'),
('Pigeon - Entier',           18.00, 'seed', NOW() - INTERVAL '7 days'),
('Chapon - Entier',           18.00, 'seed', NOW() - INTERVAL '7 days'),
('Dinde - Cuisse',             8.00, 'seed', NOW() - INTERVAL '7 days'),
('Lapin - Entier',             8.00, 'seed', NOW() - INTERVAL '7 days'),
('Lapin - Râble',             14.00, 'seed', NOW() - INTERVAL '7 days'),

-- Abats
('Foie de veau',              18.00, 'seed', NOW() - INTERVAL '7 days'),
('Rognons de veau',           15.00, 'seed', NOW() - INTERVAL '7 days'),
('Ris de veau',               45.00, 'seed', NOW() - INTERVAL '7 days'),
('Foie de volaille',           6.00, 'seed', NOW() - INTERVAL '7 days'),
('Langue de bœuf',            12.00, 'seed', NOW() - INTERVAL '7 days'),

-- Gibier
('Chevreuil - Selle',         35.00, 'seed', NOW() - INTERVAL '7 days'),
('Chevreuil - Épaule',        22.00, 'seed', NOW() - INTERVAL '7 days'),
('Sanglier - Épaule',         18.00, 'seed', NOW() - INTERVAL '7 days'),
('Faisan - Entier',           22.00, 'seed', NOW() - INTERVAL '7 days'),
('Perdrix - Entière',         20.00, 'seed', NOW() - INTERVAL '7 days'),

-- Poissons nobles
('Sole - Filet',              42.00, 'seed', NOW() - INTERVAL '7 days'),
('Turbot - Filet',            55.00, 'seed', NOW() - INTERVAL '7 days'),
('Saint-Pierre - Entier',     18.00, 'seed', NOW() - INTERVAL '7 days'),
('Bar - Filet',               28.00, 'seed', NOW() - INTERVAL '7 days'),
('Bar - Entier',              18.00, 'seed', NOW() - INTERVAL '7 days'),
('Daurade - Filet',           22.00, 'seed', NOW() - INTERVAL '7 days'),
('Daurade - Entière',         14.00, 'seed', NOW() - INTERVAL '7 days'),
('Lotte - Queue',             22.00, 'seed', NOW() - INTERVAL '7 days'),
('Rouget - Filet',            32.00, 'seed', NOW() - INTERVAL '7 days'),
('Flétan - Filet',            28.00, 'seed', NOW() - INTERVAL '7 days'),
('Thon rouge - Pavé',         35.00, 'seed', NOW() - INTERVAL '7 days'),

-- Poissons courants
('Saumon - Filet',            18.00, 'seed', NOW() - INTERVAL '7 days'),
('Saumon - Pavé',             20.00, 'seed', NOW() - INTERVAL '7 days'),
('Truite - Filet',            14.00, 'seed', NOW() - INTERVAL '7 days'),
('Cabillaud - Filet',         15.00, 'seed', NOW() - INTERVAL '7 days'),
('Cabillaud - Dos',           22.00, 'seed', NOW() - INTERVAL '7 days'),
('Lieu noir - Filet',         12.00, 'seed', NOW() - INTERVAL '7 days'),
('Maquereau - Filet',          8.00, 'seed', NOW() - INTERVAL '7 days'),
('Sardine - Fraîche',          5.00, 'seed', NOW() - INTERVAL '7 days'),
('Hareng - Frais',             4.00, 'seed', NOW() - INTERVAL '7 days'),
('Anchois frais',              8.00, 'seed', NOW() - INTERVAL '7 days'),
('Merlu - Filet',             14.00, 'seed', NOW() - INTERVAL '7 days'),

-- Crustacés
('Homard breton - Entier',    55.00, 'seed', NOW() - INTERVAL '7 days'),
('Langoustines',              42.00, 'seed', NOW() - INTERVAL '7 days'),
('Écrevisses',                35.00, 'seed', NOW() - INTERVAL '7 days'),
('Gambas - Entières',         28.00, 'seed', NOW() - INTERVAL '7 days'),
('Crevettes bouquet',         22.00, 'seed', NOW() - INTERVAL '7 days'),
('Crevettes roses décortiquées',22.00,'seed',NOW() - INTERVAL '7 days'),
('Crevettes grises',          18.00, 'seed', NOW() - INTERVAL '7 days'),

-- Coquillages & mollusques
('Saint-Jacques - Noix',      38.00, 'seed', NOW() - INTERVAL '7 days'),
('Moules de bouchot',          3.50, 'seed', NOW() - INTERVAL '7 days'),
('Huîtres creuses',            8.00, 'seed', NOW() - INTERVAL '7 days'),
('Palourdes',                 14.00, 'seed', NOW() - INTERVAL '7 days'),
('Bulots',                     6.00, 'seed', NOW() - INTERVAL '7 days'),
('Araignée de mer',           12.00, 'seed', NOW() - INTERVAL '7 days'),
('Poulpe',                    12.00, 'seed', NOW() - INTERVAL '7 days'),
('Calamars',                  12.00, 'seed', NOW() - INTERVAL '7 days'),
('Seiche',                    10.00, 'seed', NOW() - INTERVAL '7 days'),

-- Caviar & œufs de poisson
('Caviar osciètre',         2500.00, 'seed', NOW() - INTERVAL '7 days'),
('Caviar sevruga',          2000.00, 'seed', NOW() - INTERVAL '7 days'),
('Caviar de saumon',          90.00, 'seed', NOW() - INTERVAL '7 days'),
('Œufs de lump',              40.00, 'seed', NOW() - INTERVAL '7 days'),

-- Pommes de terre
('Pomme de terre - Bintje',    1.10, 'seed', NOW() - INTERVAL '7 days'),
('Pomme de terre - Charlotte', 1.50, 'seed', NOW() - INTERVAL '7 days'),
('Pomme de terre - Ratte',     2.50, 'seed', NOW() - INTERVAL '7 days'),
('Pomme de terre - Vitelotte', 4.00, 'seed', NOW() - INTERVAL '7 days'),
('Pomme de terre grenaille',   2.50, 'seed', NOW() - INTERVAL '7 days'),

-- Légumes racines
('Carotte',                    1.00, 'seed', NOW() - INTERVAL '7 days'),
('Carotte fane',               2.50, 'seed', NOW() - INTERVAL '7 days'),
('Panais',                     2.50, 'seed', NOW() - INTERVAL '7 days'),
('Navet',                      1.50, 'seed', NOW() - INTERVAL '7 days'),
('Radis',                      2.00, 'seed', NOW() - INTERVAL '7 days'),
('Betterave crue',             1.50, 'seed', NOW() - INTERVAL '7 days'),
('Betterave cuite',            2.00, 'seed', NOW() - INTERVAL '7 days'),
('Topinambour',                3.50, 'seed', NOW() - INTERVAL '7 days'),
('Rutabaga',                   1.20, 'seed', NOW() - INTERVAL '7 days'),

-- Cucurbitacées
('Courgette',                  2.00, 'seed', NOW() - INTERVAL '7 days'),
('Aubergine',                  2.50, 'seed', NOW() - INTERVAL '7 days'),
('Concombre',                  1.50, 'seed', NOW() - INTERVAL '7 days'),
('Potiron',                    1.50, 'seed', NOW() - INTERVAL '7 days'),
('Butternut',                  1.80, 'seed', NOW() - INTERVAL '7 days'),
('Pâtisson',                   3.00, 'seed', NOW() - INTERVAL '7 days'),

-- Solanacées
('Tomate ronde',               2.00, 'seed', NOW() - INTERVAL '7 days'),
('Tomate cerise',              4.50, 'seed', NOW() - INTERVAL '7 days'),
('Tomate cœur de bœuf',        4.00, 'seed', NOW() - INTERVAL '7 days'),
('Tomate ancienne',            5.00, 'seed', NOW() - INTERVAL '7 days'),
('Poivron rouge',              3.00, 'seed', NOW() - INTERVAL '7 days'),
('Poivron jaune',              3.50, 'seed', NOW() - INTERVAL '7 days'),
('Poivron vert',               2.50, 'seed', NOW() - INTERVAL '7 days'),
('Piment frais',               4.00, 'seed', NOW() - INTERVAL '7 days'),

-- Feuilles & salades
('Épinard frais',              4.00, 'seed', NOW() - INTERVAL '7 days'),
('Blette',                     2.50, 'seed', NOW() - INTERVAL '7 days'),
('Roquette',                   8.00, 'seed', NOW() - INTERVAL '7 days'),
('Mâche',                     10.00, 'seed', NOW() - INTERVAL '7 days'),
('Endive',                     3.00, 'seed', NOW() - INTERVAL '7 days'),
('Laitue',                     1.80, 'seed', NOW() - INTERVAL '7 days'),
('Chou vert',                  1.20, 'seed', NOW() - INTERVAL '7 days'),
('Chou rouge',                 1.50, 'seed', NOW() - INTERVAL '7 days'),
('Chou romanesco',             3.00, 'seed', NOW() - INTERVAL '7 days'),
('Brocoli',                    2.50, 'seed', NOW() - INTERVAL '7 days'),
('Chou-fleur',                 2.00, 'seed', NOW() - INTERVAL '7 days'),
('Salade verte',               2.50, 'seed', NOW() - INTERVAL '7 days'),

-- Tiges & bulbes
('Asperge verte',              8.00, 'seed', NOW() - INTERVAL '7 days'),
('Asperge blanche',           10.00, 'seed', NOW() - INTERVAL '7 days'),
('Artichaut',                  4.00, 'seed', NOW() - INTERVAL '7 days'),
('Fenouil',                    2.50, 'seed', NOW() - INTERVAL '7 days'),
('Poireau',                    2.00, 'seed', NOW() - INTERVAL '7 days'),
('Céleri branche',             2.00, 'seed', NOW() - INTERVAL '7 days'),
('Céleri rave',                1.80, 'seed', NOW() - INTERVAL '7 days'),
('Oignon jaune',               0.90, 'seed', NOW() - INTERVAL '7 days'),
('Oignon rouge',               1.20, 'seed', NOW() - INTERVAL '7 days'),
('Échalote',                   4.00, 'seed', NOW() - INTERVAL '7 days'),
('Ail',                        5.00, 'seed', NOW() - INTERVAL '7 days'),
('Ail rose',                   6.00, 'seed', NOW() - INTERVAL '7 days'),
('Maïs frais',                 2.00, 'seed', NOW() - INTERVAL '7 days'),

-- Légumineuses
('Haricot vert extra-fin',     6.00, 'seed', NOW() - INTERVAL '7 days'),
('Petits pois frais',          4.00, 'seed', NOW() - INTERVAL '7 days'),
('Fèves',                      5.00, 'seed', NOW() - INTERVAL '7 days'),
('Haricot blanc sec',          4.50, 'seed', NOW() - INTERVAL '7 days'),
('Lentilles vertes du Puy',    4.00, 'seed', NOW() - INTERVAL '7 days'),
('Lentilles corail',           3.00, 'seed', NOW() - INTERVAL '7 days'),
('Pois chiches',               2.80, 'seed', NOW() - INTERVAL '7 days'),
('Flageolets',                 3.50, 'seed', NOW() - INTERVAL '7 days'),

-- Champignons
('Champignon de Paris',        5.00, 'seed', NOW() - INTERVAL '7 days'),
('Champignon de Paris brun',   6.00, 'seed', NOW() - INTERVAL '7 days'),
('Shiitake',                  18.00, 'seed', NOW() - INTERVAL '7 days'),
('Pleurote',                  12.00, 'seed', NOW() - INTERVAL '7 days'),
('Girolles',                  40.00, 'seed', NOW() - INTERVAL '7 days'),
('Chanterelle',               35.00, 'seed', NOW() - INTERVAL '7 days'),
('Pied de mouton',            25.00, 'seed', NOW() - INTERVAL '7 days'),
('Trompette de la mort',      55.00, 'seed', NOW() - INTERVAL '7 days'),
('Cèpes frais',               35.00, 'seed', NOW() - INTERVAL '7 days'),
('Morilles fraîches',        120.00, 'seed', NOW() - INTERVAL '7 days'),
('Morilles séchées',         800.00, 'seed', NOW() - INTERVAL '7 days'),
('Truffe noire Périgord',    800.00, 'seed', NOW() - INTERVAL '7 days'),
('Truffe blanche Alba',     3000.00, 'seed', NOW() - INTERVAL '7 days'),
('Truffe d''été',            180.00, 'seed', NOW() - INTERVAL '7 days'),

-- Herbes fraîches
('Basilic frais',             12.00, 'seed', NOW() - INTERVAL '7 days'),
('Cerfeuil',                   8.00, 'seed', NOW() - INTERVAL '7 days'),
('Ciboulette',                 8.00, 'seed', NOW() - INTERVAL '7 days'),
('Estragon frais',            10.00, 'seed', NOW() - INTERVAL '7 days'),
('Persil plat',                6.00, 'seed', NOW() - INTERVAL '7 days'),
('Thym frais',                 8.00, 'seed', NOW() - INTERVAL '7 days'),
('Romarin frais',              8.00, 'seed', NOW() - INTERVAL '7 days'),
('Laurier',                    6.00, 'seed', NOW() - INTERVAL '7 days'),
('Menthe fraîche',             8.00, 'seed', NOW() - INTERVAL '7 days'),
('Aneth',                     10.00, 'seed', NOW() - INTERVAL '7 days'),
('Coriandre fraîche',          8.00, 'seed', NOW() - INTERVAL '7 days'),
('Origan frais',               8.00, 'seed', NOW() - INTERVAL '7 days'),
('Herbes de Provence',        14.00, 'seed', NOW() - INTERVAL '7 days'),

-- Épices & sel
('Sel fin',                    0.50, 'seed', NOW() - INTERVAL '7 days'),
('Sel de Guérande',            4.00, 'seed', NOW() - INTERVAL '7 days'),
('Fleur de sel',              20.00, 'seed', NOW() - INTERVAL '7 days'),
('Poivre noir concassé',      15.00, 'seed', NOW() - INTERVAL '7 days'),
('Poivre blanc moulu',        18.00, 'seed', NOW() - INTERVAL '7 days'),
('Poivre de Sichuan',         35.00, 'seed', NOW() - INTERVAL '7 days'),
('Poivre long',               25.00, 'seed', NOW() - INTERVAL '7 days'),
('Piment d''Espelette',       60.00, 'seed', NOW() - INTERVAL '7 days'),
('Paprika doux',               8.00, 'seed', NOW() - INTERVAL '7 days'),
('Paprika fumé',              12.00, 'seed', NOW() - INTERVAL '7 days'),
('Cumin',                     10.00, 'seed', NOW() - INTERVAL '7 days'),
('Curcuma',                   10.00, 'seed', NOW() - INTERVAL '7 days'),
('Curry',                      8.00, 'seed', NOW() - INTERVAL '7 days'),
('Cannelle',                  12.00, 'seed', NOW() - INTERVAL '7 days'),
('Cardamome',                 40.00, 'seed', NOW() - INTERVAL '7 days'),
('Noix de muscade',           20.00, 'seed', NOW() - INTERVAL '7 days'),
('Vanille (gousse)',          200.00, 'seed', NOW() - INTERVAL '7 days'),
('Safran (pistils)',         3500.00, 'seed', NOW() - INTERVAL '7 days'),

-- Sucres
('Sucre blanc',                1.00, 'seed', NOW() - INTERVAL '7 days'),
('Sucre glace',                1.50, 'seed', NOW() - INTERVAL '7 days'),
('Sucre cassonade',            2.00, 'seed', NOW() - INTERVAL '7 days'),
('Glucose',                    3.50, 'seed', NOW() - INTERVAL '7 days'),
('Miel de fleurs',             8.00, 'seed', NOW() - INTERVAL '7 days'),

-- Produits laitiers
('Beurre doux',                9.00, 'seed', NOW() - INTERVAL '7 days'),
('Beurre salé',                9.50, 'seed', NOW() - INTERVAL '7 days'),
('Beurre clarifié',           11.00, 'seed', NOW() - INTERVAL '7 days'),
('Beurre noisette',           12.00, 'seed', NOW() - INTERVAL '7 days'),
('Crème fraîche épaisse',      4.50, 'seed', NOW() - INTERVAL '7 days'),
('Crème liquide 30% MG',       3.80, 'seed', NOW() - INTERVAL '7 days'),
('Crème liquide 35% MG',       5.00, 'seed', NOW() - INTERVAL '7 days'),
('Lait entier',                1.20, 'seed', NOW() - INTERVAL '7 days'),

-- Fromages
('Parmesan - Reggiano',       24.00, 'seed', NOW() - INTERVAL '7 days'),
('Comté 18 mois',             18.00, 'seed', NOW() - INTERVAL '7 days'),
('Gruyère râpé',              12.00, 'seed', NOW() - INTERVAL '7 days'),
('Mozzarella di bufala',      14.00, 'seed', NOW() - INTERVAL '7 days'),
('Burrata',                   18.00, 'seed', NOW() - INTERVAL '7 days'),
('Chèvre frais',              14.00, 'seed', NOW() - INTERVAL '7 days'),
('Roquefort',                 22.00, 'seed', NOW() - INTERVAL '7 days'),
('Brie de Meaux',             14.00, 'seed', NOW() - INTERVAL '7 days'),
('Camembert',                 12.00, 'seed', NOW() - INTERVAL '7 days'),
('Reblochon',                 16.00, 'seed', NOW() - INTERVAL '7 days'),
('Ricotta',                    8.00, 'seed', NOW() - INTERVAL '7 days'),
('Mascarpone',                 9.00, 'seed', NOW() - INTERVAL '7 days'),

-- Œufs (prix au kg : ~6 œufs = 1 kg → 0.35€/pièce × 6 = 2.10€/kg rayon)
('Œuf entier',                 2.10, 'seed', NOW() - INTERVAL '7 days'),

-- Farines
('Farine T45',                 1.20, 'seed', NOW() - INTERVAL '7 days'),
('Farine T55',                 0.90, 'seed', NOW() - INTERVAL '7 days'),
('Farine T80',                 1.20, 'seed', NOW() - INTERVAL '7 days'),
('Farine de sarrasin',         2.00, 'seed', NOW() - INTERVAL '7 days'),
('Farine de riz',              2.50, 'seed', NOW() - INTERVAL '7 days'),

-- Féculents & céréales
('Riz long grain',             1.80, 'seed', NOW() - INTERVAL '7 days'),
('Riz arborio',                3.50, 'seed', NOW() - INTERVAL '7 days'),
('Riz basmati',                3.00, 'seed', NOW() - INTERVAL '7 days'),
('Semoule fine',               1.50, 'seed', NOW() - INTERVAL '7 days'),
('Polenta',                    2.00, 'seed', NOW() - INTERVAL '7 days'),
('Quinoa',                     5.00, 'seed', NOW() - INTERVAL '7 days'),
('Pâtes fraîches',             5.00, 'seed', NOW() - INTERVAL '7 days'),
('Pâtes sèches',               2.20, 'seed', NOW() - INTERVAL '7 days'),
('Gnocchis frais',             6.00, 'seed', NOW() - INTERVAL '7 days'),

-- Huiles
('Huile d''olive vierge extra', 9.00,'seed', NOW() - INTERVAL '7 days'),
('Huile de tournesol',         2.50, 'seed', NOW() - INTERVAL '7 days'),
('Huile de colza',             2.00, 'seed', NOW() - INTERVAL '7 days'),
('Huile de noix',             15.00, 'seed', NOW() - INTERVAL '7 days'),
('Huile de sésame',           12.00, 'seed', NOW() - INTERVAL '7 days'),
('Huile truffée',             80.00, 'seed', NOW() - INTERVAL '7 days'),

-- Vinaigres
('Vinaigre balsamique',        8.00, 'seed', NOW() - INTERVAL '7 days'),
('Vinaigre de xérès',          6.00, 'seed', NOW() - INTERVAL '7 days'),
('Vinaigre de cidre',          3.50, 'seed', NOW() - INTERVAL '7 days'),
('Vinaigre blanc',             1.50, 'seed', NOW() - INTERVAL '7 days'),

-- Condiments & conserves
('Moutarde de Dijon',          5.00, 'seed', NOW() - INTERVAL '7 days'),
('Concentré de tomate',        3.50, 'seed', NOW() - INTERVAL '7 days'),
('Câpres',                    12.00, 'seed', NOW() - INTERVAL '7 days'),
('Anchois à l''huile',        22.00, 'seed', NOW() - INTERVAL '7 days'),
('Tapenade',                  10.00, 'seed', NOW() - INTERVAL '7 days'),
('Sauce soja',                 5.00, 'seed', NOW() - INTERVAL '7 days'),
('Sauce Worcestershire',        8.00, 'seed', NOW() - INTERVAL '7 days'),
('Morue salée',               14.00, 'seed', NOW() - INTERVAL '7 days'),

-- Alcools cuisine
('Vin blanc sec',              5.00, 'seed', NOW() - INTERVAL '7 days'),
('Vin rouge',                  4.50, 'seed', NOW() - INTERVAL '7 days'),
('Champagne',                 18.00, 'seed', NOW() - INTERVAL '7 days'),
('Porto rouge',               12.00, 'seed', NOW() - INTERVAL '7 days'),
('Porto blanc',               12.00, 'seed', NOW() - INTERVAL '7 days'),
('Cognac',                    25.00, 'seed', NOW() - INTERVAL '7 days'),
('Calvados',                  20.00, 'seed', NOW() - INTERVAL '7 days'),
('Armagnac',                  22.00, 'seed', NOW() - INTERVAL '7 days'),
('Xérès sec',                 10.00, 'seed', NOW() - INTERVAL '7 days'),
('Pastis',                    15.00, 'seed', NOW() - INTERVAL '7 days'),
('Bière brune',                4.00, 'seed', NOW() - INTERVAL '7 days'),

-- Fonds & fumets
('Fond de veau lié',           9.00, 'seed', NOW() - INTERVAL '7 days'),
('Fond de volaille',           7.00, 'seed', NOW() - INTERVAL '7 days'),
('Fond de poisson',            8.00, 'seed', NOW() - INTERVAL '7 days'),
('Fumet de crustacés',        12.00, 'seed', NOW() - INTERVAL '7 days'),

-- Pâtisserie
('Chocolat noir 70%',         12.00, 'seed', NOW() - INTERVAL '7 days'),
('Chocolat au lait',          10.00, 'seed', NOW() - INTERVAL '7 days'),
('Chocolat blanc',            11.00, 'seed', NOW() - INTERVAL '7 days'),
('Cacao en poudre',           12.00, 'seed', NOW() - INTERVAL '7 days'),
('Caramel liquide',            4.00, 'seed', NOW() - INTERVAL '7 days'),
('Praliné',                   14.00, 'seed', NOW() - INTERVAL '7 days'),
('Pâte d''amande',            12.00, 'seed', NOW() - INTERVAL '7 days'),
('Gélatine (feuilles)',        25.00, 'seed', NOW() - INTERVAL '7 days'),
('Agar-agar',                 40.00, 'seed', NOW() - INTERVAL '7 days'),
('Levure boulangère',          5.00, 'seed', NOW() - INTERVAL '7 days'),

-- Fruits
('Citron jaune',               2.00, 'seed', NOW() - INTERVAL '7 days'),
('Citron vert',                3.50, 'seed', NOW() - INTERVAL '7 days'),
('Orange',                     1.80, 'seed', NOW() - INTERVAL '7 days'),
('Pomme Golden',               1.50, 'seed', NOW() - INTERVAL '7 days'),
('Poire Williams',             2.50, 'seed', NOW() - INTERVAL '7 days'),
('Fraise Gariguette',          8.00, 'seed', NOW() - INTERVAL '7 days'),
('Framboise',                 16.00, 'seed', NOW() - INTERVAL '7 days'),
('Myrtille',                  14.00, 'seed', NOW() - INTERVAL '7 days'),
('Cerise',                     6.00, 'seed', NOW() - INTERVAL '7 days'),
('Pêche',                      3.00, 'seed', NOW() - INTERVAL '7 days'),
('Abricot',                    3.50, 'seed', NOW() - INTERVAL '7 days'),
('Figue fraîche',              6.00, 'seed', NOW() - INTERVAL '7 days'),
('Raisin blanc',               4.00, 'seed', NOW() - INTERVAL '7 days'),
('Mangue',                     4.00, 'seed', NOW() - INTERVAL '7 days'),
('Ananas',                     3.00, 'seed', NOW() - INTERVAL '7 days'),
('Avocat',                     3.50, 'seed', NOW() - INTERVAL '7 days'),
('Banane',                     1.80, 'seed', NOW() - INTERVAL '7 days'),
('Fruits de la passion',       8.00, 'seed', NOW() - INTERVAL '7 days');


-- ============================================================
-- SÉRIE 2 : snapshot J0 (variations saisonnières avril 2026)
-- Logique des variations :
--   Asperges/fraises/épinards : -8% à -12% (pleine saison)
--   Morilles : +12% (pic de demande)
--   Saint-Jacques : +8% (fin de saison, se raréfie)
--   Truffe noire : +15% (hors saison)
--   Courgette/aubergine/poivron : +10% à +15% (hors saison)
--   Viandes : +2% à +4% (pression printanière)
--   Poissons courants : stable ±3%
--   Épicerie sèche : ±2%
-- ============================================================
INSERT INTO ingredient_price_snapshots (ingredient, price_per_kg, source, recorded_at) VALUES

-- Bœuf (+2% à +4% pression printanière)
('Bœuf - Filet',              59.20, 'seed', NOW()),
('Bœuf - Entrecôte',          33.00, 'seed', NOW()),
('Bœuf - Faux-filet',         28.80, 'seed', NOW()),
('Bœuf - Côte de bœuf',       26.80, 'seed', NOW()),
('Bœuf - Rumsteck',           22.60, 'seed', NOW()),
('Bœuf - Bavette',            18.40, 'seed', NOW()),
('Bœuf - Paleron',            12.90, 'seed', NOW()),
('Bœuf - Joue',               14.50, 'seed', NOW()),
('Bœuf - Macreuse',           11.30, 'seed', NOW()),
('Bœuf - Plat de côte',        9.20, 'seed', NOW()),
('Bœuf - Queue',              10.20, 'seed', NOW()),
('Bœuf - Os à moelle',         4.10, 'seed', NOW()),

-- Veau (+3%)
('Veau - Escalope',           24.70, 'seed', NOW()),
('Veau - Côte',               28.80, 'seed', NOW()),
('Veau - Joue',               18.50, 'seed', NOW()),
('Veau - Jarret',             14.40, 'seed', NOW()),
('Veau - Tendron',            12.30, 'seed', NOW()),
('Veau - Ris',                46.40, 'seed', NOW()),
('Veau - Pied',                6.20, 'seed', NOW()),
('Veau - Cervelle',           12.40, 'seed', NOW()),

-- Agneau (+3%)
('Agneau - Gigot entier',     15.50, 'seed', NOW()),
('Agneau - Épaule',           12.40, 'seed', NOW()),
('Agneau - Rack / carré',     28.90, 'seed', NOW()),
('Agneau - Côtelette',        22.70, 'seed', NOW()),
('Agneau - Souris',           16.50, 'seed', NOW()),
('Agneau - Selle',            24.70, 'seed', NOW()),
('Agneau - Navarin',          10.30, 'seed', NOW()),
('Agneau - Cervelle',         10.30, 'seed', NOW()),

-- Porc (stable ±1%)
('Porc - Filet mignon',       14.20, 'seed', NOW()),
('Porc - Côte',               10.10, 'seed', NOW()),
('Porc - Travers',             8.60, 'seed', NOW()),
('Porc - Ventre',              6.60, 'seed', NOW()),
('Porc - Joue',                8.10, 'seed', NOW()),
('Porc - Pied',                5.10, 'seed', NOW()),
('Porc - Oreille',             4.10, 'seed', NOW()),

-- Charcuterie (stable)
('Jambon cru Bayonne',        22.50, 'seed', NOW()),
('Porc - Lard fumé',           7.60, 'seed', NOW()),
('Lardons fumés',              8.10, 'seed', NOW()),
('Saucisson sec',             18.40, 'seed', NOW()),
('Chorizo',                   14.30, 'seed', NOW()),
('Boudin noir',               10.20, 'seed', NOW()),

-- Volailles (+2%)
('Poulet - Filet',            10.20, 'seed', NOW()),
('Poulet - Cuisse',            6.60, 'seed', NOW()),
('Poulet - Suprême',          12.20, 'seed', NOW()),
('Poulet - Entier',            5.60, 'seed', NOW()),
('Canard - Magret',           22.50, 'seed', NOW()),
('Canard - Confit de cuisse', 14.30, 'seed', NOW()),
('Canard - Foie gras entier', 81.00, 'seed', NOW()),
('Canard - Escalope foie gras',91.50,'seed', NOW()),
('Canard - Gésiers',           8.10, 'seed', NOW()),
('Pintade - Filet',           18.40, 'seed', NOW()),
('Pintade - Entière',         10.20, 'seed', NOW()),
('Caille - Entière',          12.20, 'seed', NOW()),
('Pigeon - Entier',           18.40, 'seed', NOW()),
('Chapon - Entier',           18.20, 'seed', NOW()),
('Dinde - Cuisse',             8.10, 'seed', NOW()),
('Lapin - Entier',             8.20, 'seed', NOW()),
('Lapin - Râble',             14.30, 'seed', NOW()),

-- Abats (+2%)
('Foie de veau',              18.40, 'seed', NOW()),
('Rognons de veau',           15.30, 'seed', NOW()),
('Ris de veau',               46.40, 'seed', NOW()),
('Foie de volaille',           6.10, 'seed', NOW()),
('Langue de bœuf',            12.30, 'seed', NOW()),

-- Gibier (hors saison, prix stable à légère baisse)
('Chevreuil - Selle',         33.00, 'seed', NOW()),
('Chevreuil - Épaule',        21.00, 'seed', NOW()),
('Sanglier - Épaule',         17.00, 'seed', NOW()),
('Faisan - Entier',           21.00, 'seed', NOW()),
('Perdrix - Entière',         19.00, 'seed', NOW()),

-- Poissons nobles (stable ±3%)
('Sole - Filet',              42.50, 'seed', NOW()),
('Turbot - Filet',            56.00, 'seed', NOW()),
('Saint-Pierre - Entier',     18.50, 'seed', NOW()),
('Bar - Filet',               29.00, 'seed', NOW()),   -- début saison, légère hausse
('Bar - Entier',              18.50, 'seed', NOW()),
('Daurade - Filet',           22.50, 'seed', NOW()),
('Daurade - Entière',         14.30, 'seed', NOW()),
('Lotte - Queue',             22.80, 'seed', NOW()),
('Rouget - Filet',            32.50, 'seed', NOW()),
('Flétan - Filet',            27.50, 'seed', NOW()),
('Thon rouge - Pavé',         36.00, 'seed', NOW()),

-- Poissons courants
('Saumon - Filet',            18.50, 'seed', NOW()),
('Saumon - Pavé',             20.50, 'seed', NOW()),
('Truite - Filet',            14.20, 'seed', NOW()),
('Cabillaud - Filet',         15.50, 'seed', NOW()),
('Cabillaud - Dos',           22.80, 'seed', NOW()),
('Lieu noir - Filet',         12.20, 'seed', NOW()),
('Maquereau - Filet',          8.50, 'seed', NOW()),  -- début saison, prix baisse
('Sardine - Fraîche',          5.20, 'seed', NOW()),  -- début saison
('Hareng - Frais',             4.10, 'seed', NOW()),
('Anchois frais',              8.20, 'seed', NOW()),
('Merlu - Filet',             14.20, 'seed', NOW()),

-- Crustacés
('Homard breton - Entier',    58.00, 'seed', NOW()),  -- début saison, hausse
('Langoustines',              45.00, 'seed', NOW()),  -- début saison active
('Écrevisses',                35.50, 'seed', NOW()),
('Gambas - Entières',         28.50, 'seed', NOW()),
('Crevettes bouquet',         22.50, 'seed', NOW()),
('Crevettes roses décortiquées',22.50,'seed', NOW()),
('Crevettes grises',          18.50, 'seed', NOW()),

-- Coquillages (saint-jacques fin de saison +8%)
('Saint-Jacques - Noix',      41.00, 'seed', NOW()),  -- fin de saison
('Moules de bouchot',          3.60, 'seed', NOW()),
('Huîtres creuses',            8.20, 'seed', NOW()),
('Palourdes',                 14.50, 'seed', NOW()),
('Bulots',                     6.10, 'seed', NOW()),
('Araignée de mer',           12.50, 'seed', NOW()),
('Poulpe',                    12.20, 'seed', NOW()),
('Calamars',                  12.20, 'seed', NOW()),
('Seiche',                    10.20, 'seed', NOW()),

-- Caviar (stable)
('Caviar osciètre',         2500.00, 'seed', NOW()),
('Caviar sevruga',          2000.00, 'seed', NOW()),
('Caviar de saumon',          92.00, 'seed', NOW()),
('Œufs de lump',              41.00, 'seed', NOW()),

-- Pommes de terre (stable)
('Pomme de terre - Bintje',    1.10, 'seed', NOW()),
('Pomme de terre - Charlotte', 1.55, 'seed', NOW()),
('Pomme de terre - Ratte',     2.55, 'seed', NOW()),
('Pomme de terre - Vitelotte', 4.10, 'seed', NOW()),
('Pomme de terre grenaille',   2.55, 'seed', NOW()),

-- Légumes racines
('Carotte',                    1.00, 'seed', NOW()),
('Carotte fane',               2.40, 'seed', NOW()),
('Panais',                     2.30, 'seed', NOW()),  -- fin de saison hivernale, prix baisse
('Navet',                      1.40, 'seed', NOW()),
('Radis',                      1.90, 'seed', NOW()),  -- pleine saison
('Betterave crue',             1.50, 'seed', NOW()),
('Betterave cuite',            2.00, 'seed', NOW()),
('Topinambour',                3.20, 'seed', NOW()),  -- fin de saison
('Rutabaga',                   1.10, 'seed', NOW()),

-- Cucurbitacées (hors saison +12%)
('Courgette',                  2.80, 'seed', NOW()),  -- hors saison
('Aubergine',                  3.20, 'seed', NOW()),  -- hors saison
('Concombre',                  1.80, 'seed', NOW()),
('Potiron',                    2.20, 'seed', NOW()),  -- stock fin d'hiver
('Butternut',                  2.10, 'seed', NOW()),
('Pâtisson',                   3.50, 'seed', NOW()),

-- Solanacées (hors saison +12%)
('Tomate ronde',               2.80, 'seed', NOW()),  -- hors saison
('Tomate cerise',              5.20, 'seed', NOW()),  -- hors saison
('Tomate cœur de bœuf',        5.50, 'seed', NOW()),
('Tomate ancienne',            6.50, 'seed', NOW()),
('Poivron rouge',              3.80, 'seed', NOW()),  -- hors saison
('Poivron jaune',              4.20, 'seed', NOW()),
('Poivron vert',               3.20, 'seed', NOW()),
('Piment frais',               4.50, 'seed', NOW()),

-- Feuilles & salades (printemps, prix baisse)
('Épinard frais',              3.60, 'seed', NOW()),  -- pleine saison -10%
('Blette',                     2.30, 'seed', NOW()),
('Roquette',                   7.50, 'seed', NOW()),
('Mâche',                      9.00, 'seed', NOW()),
('Endive',                     3.10, 'seed', NOW()),
('Laitue',                     1.70, 'seed', NOW()),  -- pleine saison
('Chou vert',                  1.20, 'seed', NOW()),
('Chou rouge',                 1.50, 'seed', NOW()),
('Chou romanesco',             2.80, 'seed', NOW()),
('Brocoli',                    2.40, 'seed', NOW()),
('Chou-fleur',                 2.00, 'seed', NOW()),
('Salade verte',               2.30, 'seed', NOW()),

-- Tiges & bulbes (asperges en pleine saison -15%)
('Asperge verte',              6.80, 'seed', NOW()),  -- pleine saison
('Asperge blanche',            8.50, 'seed', NOW()),  -- pleine saison
('Artichaut',                  3.80, 'seed', NOW()),  -- pleine saison
('Fenouil',                    2.50, 'seed', NOW()),
('Poireau',                    2.20, 'seed', NOW()),
('Céleri branche',             2.00, 'seed', NOW()),
('Céleri rave',                2.00, 'seed', NOW()),
('Oignon jaune',               0.90, 'seed', NOW()),
('Oignon rouge',               1.20, 'seed', NOW()),
('Échalote',                   4.10, 'seed', NOW()),
('Ail',                        5.10, 'seed', NOW()),
('Ail rose',                   6.20, 'seed', NOW()),
('Maïs frais',                 2.10, 'seed', NOW()),

-- Légumineuses
('Haricot vert extra-fin',     6.80, 'seed', NOW()),
('Petits pois frais',          5.50, 'seed', NOW()),  -- début saison
('Fèves',                      5.80, 'seed', NOW()),  -- début saison
('Haricot blanc sec',          4.50, 'seed', NOW()),
('Lentilles vertes du Puy',    4.10, 'seed', NOW()),
('Lentilles corail',           3.00, 'seed', NOW()),
('Pois chiches',               2.80, 'seed', NOW()),
('Flageolets',                 3.50, 'seed', NOW()),

-- Champignons
('Champignon de Paris',        5.10, 'seed', NOW()),
('Champignon de Paris brun',   6.10, 'seed', NOW()),
('Shiitake',                  18.50, 'seed', NOW()),
('Pleurote',                  12.20, 'seed', NOW()),
('Girolles',                  42.00, 'seed', NOW()),
('Chanterelle',               36.00, 'seed', NOW()),
('Pied de mouton',            25.50, 'seed', NOW()),
('Trompette de la mort',      56.00, 'seed', NOW()),
('Cèpes frais',               36.00, 'seed', NOW()),
('Morilles fraîches',        134.00, 'seed', NOW()),  -- pic de saison avril +12%
('Morilles séchées',         820.00, 'seed', NOW()),
('Truffe noire Périgord',    920.00, 'seed', NOW()),  -- hors saison +15%
('Truffe blanche Alba',     3000.00, 'seed', NOW()),
('Truffe d''été',            195.00, 'seed', NOW()),  -- léger +8%

-- Herbes fraîches (plein printemps, prix baisse)
('Basilic frais',             11.00, 'seed', NOW()),
('Cerfeuil',                   7.50, 'seed', NOW()),
('Ciboulette',                 7.50, 'seed', NOW()),
('Estragon frais',             9.50, 'seed', NOW()),
('Persil plat',                5.50, 'seed', NOW()),
('Thym frais',                 7.50, 'seed', NOW()),
('Romarin frais',              7.50, 'seed', NOW()),
('Laurier',                    5.80, 'seed', NOW()),
('Menthe fraîche',             7.50, 'seed', NOW()),
('Aneth',                      9.50, 'seed', NOW()),
('Coriandre fraîche',          7.50, 'seed', NOW()),
('Origan frais',               7.50, 'seed', NOW()),
('Herbes de Provence',        14.20, 'seed', NOW()),

-- Épices & sel (stable)
('Sel fin',                    0.50, 'seed', NOW()),
('Sel de Guérande',            4.10, 'seed', NOW()),
('Fleur de sel',              20.50, 'seed', NOW()),
('Poivre noir concassé',      15.50, 'seed', NOW()),
('Poivre blanc moulu',        18.50, 'seed', NOW()),
('Poivre de Sichuan',         36.00, 'seed', NOW()),
('Poivre long',               25.50, 'seed', NOW()),
('Piment d''Espelette',       61.00, 'seed', NOW()),
('Paprika doux',               8.10, 'seed', NOW()),
('Paprika fumé',              12.20, 'seed', NOW()),
('Cumin',                     10.20, 'seed', NOW()),
('Curcuma',                   10.30, 'seed', NOW()),
('Curry',                      8.10, 'seed', NOW()),
('Cannelle',                  12.30, 'seed', NOW()),
('Cardamome',                 40.50, 'seed', NOW()),
('Noix de muscade',           20.50, 'seed', NOW()),
('Vanille (gousse)',          205.00, 'seed', NOW()),
('Safran (pistils)',         3550.00, 'seed', NOW()),

-- Sucres (stable)
('Sucre blanc',                1.00, 'seed', NOW()),
('Sucre glace',                1.52, 'seed', NOW()),
('Sucre cassonade',            2.05, 'seed', NOW()),
('Glucose',                    3.55, 'seed', NOW()),
('Miel de fleurs',             8.20, 'seed', NOW()),

-- Produits laitiers (+2%)
('Beurre doux',                9.20, 'seed', NOW()),
('Beurre salé',                9.70, 'seed', NOW()),
('Beurre clarifié',           11.20, 'seed', NOW()),
('Beurre noisette',           12.20, 'seed', NOW()),
('Crème fraîche épaisse',      4.60, 'seed', NOW()),
('Crème liquide 30% MG',       3.90, 'seed', NOW()),
('Crème liquide 35% MG',       5.10, 'seed', NOW()),
('Lait entier',                1.22, 'seed', NOW()),

-- Fromages (+2%)
('Parmesan - Reggiano',       24.50, 'seed', NOW()),
('Comté 18 mois',             18.50, 'seed', NOW()),
('Gruyère râpé',              12.20, 'seed', NOW()),
('Mozzarella di bufala',      14.30, 'seed', NOW()),
('Burrata',                   18.40, 'seed', NOW()),
('Chèvre frais',              14.30, 'seed', NOW()),
('Roquefort',                 22.50, 'seed', NOW()),
('Brie de Meaux',             14.30, 'seed', NOW()),
('Camembert',                 12.20, 'seed', NOW()),
('Reblochon',                 16.30, 'seed', NOW()),
('Ricotta',                    8.20, 'seed', NOW()),
('Mascarpone',                 9.20, 'seed', NOW()),

-- Œufs
('Œuf entier',                 2.15, 'seed', NOW()),

-- Farines (stable)
('Farine T45',                 1.22, 'seed', NOW()),
('Farine T55',                 0.92, 'seed', NOW()),
('Farine T80',                 1.22, 'seed', NOW()),
('Farine de sarrasin',         2.05, 'seed', NOW()),
('Farine de riz',              2.55, 'seed', NOW()),

-- Féculents (stable)
('Riz long grain',             1.82, 'seed', NOW()),
('Riz arborio',                3.55, 'seed', NOW()),
('Riz basmati',                3.05, 'seed', NOW()),
('Semoule fine',               1.52, 'seed', NOW()),
('Polenta',                    2.02, 'seed', NOW()),
('Quinoa',                     5.10, 'seed', NOW()),
('Pâtes fraîches',             5.10, 'seed', NOW()),
('Pâtes sèches',               2.25, 'seed', NOW()),
('Gnocchis frais',             6.10, 'seed', NOW()),

-- Huiles (+2%)
('Huile d''olive vierge extra', 9.20,'seed', NOW()),
('Huile de tournesol',         2.55, 'seed', NOW()),
('Huile de colza',             2.05, 'seed', NOW()),
('Huile de noix',             15.30, 'seed', NOW()),
('Huile de sésame',           12.20, 'seed', NOW()),
('Huile truffée',             82.00, 'seed', NOW()),

-- Vinaigres (stable)
('Vinaigre balsamique',        8.10, 'seed', NOW()),
('Vinaigre de xérès',          6.10, 'seed', NOW()),
('Vinaigre de cidre',          3.55, 'seed', NOW()),
('Vinaigre blanc',             1.52, 'seed', NOW()),

-- Condiments (stable)
('Moutarde de Dijon',          5.10, 'seed', NOW()),
('Concentré de tomate',        3.55, 'seed', NOW()),
('Câpres',                    12.20, 'seed', NOW()),
('Anchois à l''huile',        22.50, 'seed', NOW()),
('Tapenade',                  10.20, 'seed', NOW()),
('Sauce soja',                 5.10, 'seed', NOW()),
('Sauce Worcestershire',        8.10, 'seed', NOW()),
('Morue salée',               14.30, 'seed', NOW()),

-- Alcools (stable)
('Vin blanc sec',              5.10, 'seed', NOW()),
('Vin rouge',                  4.60, 'seed', NOW()),
('Champagne',                 18.50, 'seed', NOW()),
('Porto rouge',               12.20, 'seed', NOW()),
('Porto blanc',               12.20, 'seed', NOW()),
('Cognac',                    25.50, 'seed', NOW()),
('Calvados',                  20.50, 'seed', NOW()),
('Armagnac',                  22.50, 'seed', NOW()),
('Xérès sec',                 10.20, 'seed', NOW()),
('Pastis',                    15.30, 'seed', NOW()),
('Bière brune',                4.05, 'seed', NOW()),

-- Fonds (stable)
('Fond de veau lié',           9.20, 'seed', NOW()),
('Fond de volaille',           7.10, 'seed', NOW()),
('Fond de poisson',            8.10, 'seed', NOW()),
('Fumet de crustacés',        12.20, 'seed', NOW()),

-- Pâtisserie (stable)
('Chocolat noir 70%',         12.20, 'seed', NOW()),
('Chocolat au lait',          10.20, 'seed', NOW()),
('Chocolat blanc',            11.20, 'seed', NOW()),
('Cacao en poudre',           12.20, 'seed', NOW()),
('Caramel liquide',            4.05, 'seed', NOW()),
('Praliné',                   14.30, 'seed', NOW()),
('Pâte d''amande',            12.20, 'seed', NOW()),
('Gélatine (feuilles)',        25.50, 'seed', NOW()),
('Agar-agar',                 40.50, 'seed', NOW()),
('Levure boulangère',          5.10, 'seed', NOW()),

-- Fruits
('Citron jaune',               2.05, 'seed', NOW()),
('Citron vert',                3.40, 'seed', NOW()),
('Orange',                     1.75, 'seed', NOW()),  -- fin de saison
('Pomme Golden',               1.55, 'seed', NOW()),
('Poire Williams',             2.60, 'seed', NOW()),
('Fraise Gariguette',         10.50, 'seed', NOW()),  -- saison début -15%
('Framboise',                 15.50, 'seed', NOW()),
('Myrtille',                  14.50, 'seed', NOW()),
('Cerise',                     8.00, 'seed', NOW()),  -- début saison
('Pêche',                      4.50, 'seed', NOW()),  -- pas encore en saison
('Abricot',                    4.80, 'seed', NOW()),  -- pas encore en saison
('Figue fraîche',              8.00, 'seed', NOW()),  -- hors saison
('Raisin blanc',               5.00, 'seed', NOW()),  -- hors saison
('Mangue',                     4.10, 'seed', NOW()),
('Ananas',                     3.10, 'seed', NOW()),
('Avocat',                     3.60, 'seed', NOW()),
('Banane',                     1.80, 'seed', NOW()),
('Fruits de la passion',       8.20, 'seed', NOW());
