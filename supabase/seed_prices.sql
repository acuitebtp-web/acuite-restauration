-- ─────────────────────────────────────────────────────────────────
-- Seed initial : 2 semaines de prix pour activer les variations
-- Coller dans Supabase > SQL Editor
-- Prix basés sur moyennes marché professionnel France (Rungis + MIN)
-- À mettre à jour chaque semaine avec les vraies cotations
-- ─────────────────────────────────────────────────────────────────

-- Semaine précédente (S-1)
INSERT INTO ingredient_price_snapshots (ingredient, price_per_kg, source, recorded_at) VALUES
-- Viandes
('Bœuf - Filet',            54.00, 'manuel', now() - interval '7 days'),
('Bœuf - Entrecôte',        30.00, 'manuel', now() - interval '7 days'),
('Bœuf - Rumsteck',         22.00, 'manuel', now() - interval '7 days'),
('Agneau - Rack / carré',   27.00, 'manuel', now() - interval '7 days'),
('Agneau - Gigot',          16.00, 'manuel', now() - interval '7 days'),
('Veau - Escalope',         21.50, 'manuel', now() - interval '7 days'),
('Veau - Ris',              55.00, 'manuel', now() - interval '7 days'),
('Porc - Filet',            10.00, 'manuel', now() - interval '7 days'),
('Porc - Côte',              8.50, 'manuel', now() - interval '7 days'),
('Poulet - Filet',          11.00, 'manuel', now() - interval '7 days'),
('Poulet - Cuisse',          5.50, 'manuel', now() - interval '7 days'),
('Canard - Magret',         17.50, 'manuel', now() - interval '7 days'),
('Canard - Foie gras cru',  55.00, 'manuel', now() - interval '7 days'),
('Lapin - Entier',          10.00, 'manuel', now() - interval '7 days'),
-- Poissons & fruits de mer
('Saumon - Filet',          16.00, 'manuel', now() - interval '7 days'),
('Bar - Filet',             27.00, 'manuel', now() - interval '7 days'),
('Sole - Filet',            40.00, 'manuel', now() - interval '7 days'),
('Turbot - Filet',          45.00, 'manuel', now() - interval '7 days'),
('Maquereau - Filet',        9.00, 'manuel', now() - interval '7 days'),
('Sardine - Fraîche',        6.50, 'manuel', now() - interval '7 days'),
('Saint-Jacques - Noix',    36.00, 'manuel', now() - interval '7 days'),
('Homard breton - Entier',  58.00, 'manuel', now() - interval '7 days'),
('Langoustines',            44.00, 'manuel', now() - interval '7 days'),
('Crevettes - Gambas',      22.00, 'manuel', now() - interval '7 days'),
('Moules - Bouchot',         4.00, 'manuel', now() - interval '7 days'),
-- Légumes
('Tomate cerise',            5.20, 'manuel', now() - interval '7 days'),
('Courgette',                3.20, 'manuel', now() - interval '7 days'),
('Aubergine',                3.50, 'manuel', now() - interval '7 days'),
('Poivron rouge',            3.80, 'manuel', now() - interval '7 days'),
('Asperge verte',           14.00, 'manuel', now() - interval '7 days'),
('Asperge blanche',         16.00, 'manuel', now() - interval '7 days'),
('Artichaut',                4.50, 'manuel', now() - interval '7 days'),
('Petit pois',               6.00, 'manuel', now() - interval '7 days'),
('Épinard frais',            5.00, 'manuel', now() - interval '7 days'),
('Poireau',                  3.20, 'manuel', now() - interval '7 days'),
('Céleri rave',              3.20, 'manuel', now() - interval '7 days'),
('Potiron',                  2.00, 'manuel', now() - interval '7 days'),
('Champignon de Paris',      4.80, 'manuel', now() - interval '7 days'),
-- Champignons premium
('Morille fraîche',        170.00, 'manuel', now() - interval '7 days'),
('Cèpe',                    34.00, 'manuel', now() - interval '7 days'),
('Truffe noire Périgord',  900.00, 'manuel', now() - interval '7 days'),
-- Fruits
('Fraise Gariguette',       13.00, 'manuel', now() - interval '7 days'),
('Framboise',               20.00, 'manuel', now() - interval '7 days'),
('Cerise',                  10.00, 'manuel', now() - interval '7 days'),
('Figue fraîche',            8.00, 'manuel', now() - interval '7 days'),
-- Produits laitiers & autres
('Beurre doux',              9.00, 'manuel', now() - interval '7 days'),
('Crème liquide 35%',        4.50, 'manuel', now() - interval '7 days'),
('Parmesan',                20.00, 'manuel', now() - interval '7 days'),
('Mozzarella di Bufala',    18.00, 'manuel', now() - interval '7 days');

-- Semaine actuelle (S0) — légères variations réalistes
INSERT INTO ingredient_price_snapshots (ingredient, price_per_kg, source, recorded_at) VALUES
-- Viandes (hausse bœuf, agneau stable)
('Bœuf - Filet',            56.50, 'manuel', now()),
('Bœuf - Entrecôte',        32.00, 'manuel', now()),
('Bœuf - Rumsteck',         22.50, 'manuel', now()),
('Agneau - Rack / carré',   28.50, 'manuel', now()),
('Agneau - Gigot',          16.50, 'manuel', now()),
('Veau - Escalope',         22.00, 'manuel', now()),
('Veau - Ris',              55.00, 'manuel', now()),
('Porc - Filet',            10.50, 'manuel', now()),
('Porc - Côte',              8.50, 'manuel', now()),
('Poulet - Filet',          11.50, 'manuel', now()),
('Poulet - Cuisse',          5.50, 'manuel', now()),
('Canard - Magret',         18.00, 'manuel', now()),
('Canard - Foie gras cru',  56.00, 'manuel', now()),
('Lapin - Entier',          10.00, 'manuel', now()),
-- Poissons (bar en hausse, maquereau en baisse)
('Saumon - Filet',          16.50, 'manuel', now()),
('Bar - Filet',             29.00, 'manuel', now()),
('Sole - Filet',            41.00, 'manuel', now()),
('Turbot - Filet',          45.00, 'manuel', now()),
('Maquereau - Filet',        8.50, 'manuel', now()),
('Sardine - Fraîche',        6.00, 'manuel', now()),
('Saint-Jacques - Noix',    38.00, 'manuel', now()),
('Homard breton - Entier',  58.00, 'manuel', now()),
('Langoustines',            45.00, 'manuel', now()),
('Crevettes - Gambas',      22.00, 'manuel', now()),
('Moules - Bouchot',         3.80, 'manuel', now()),
-- Légumes (courgettes en baisse, tomates stables)
('Tomate cerise',            4.80, 'manuel', now()),
('Courgette',                2.80, 'manuel', now()),
('Aubergine',                3.20, 'manuel', now()),
('Poivron rouge',            3.50, 'manuel', now()),
('Asperge verte',           12.00, 'manuel', now()),
('Asperge blanche',         14.00, 'manuel', now()),
('Artichaut',                4.50, 'manuel', now()),
('Petit pois',               5.80, 'manuel', now()),
('Épinard frais',            4.80, 'manuel', now()),
('Poireau',                  2.80, 'manuel', now()),
('Céleri rave',              3.00, 'manuel', now()),
('Potiron',                  2.20, 'manuel', now()),
('Champignon de Paris',      4.50, 'manuel', now()),
-- Champignons premium
('Morille fraîche',        180.00, 'manuel', now()),
('Cèpe',                    35.00, 'manuel', now()),
('Truffe noire Périgord',  950.00, 'manuel', now()),
-- Fruits
('Fraise Gariguette',       14.00, 'manuel', now()),
('Framboise',               21.00, 'manuel', now()),
('Cerise',                  10.50, 'manuel', now()),
('Figue fraîche',            8.50, 'manuel', now()),
-- Produits laitiers & autres
('Beurre doux',              9.50, 'manuel', now()),
('Crème liquide 35%',        4.80, 'manuel', now()),
('Parmesan',                20.00, 'manuel', now()),
('Mozzarella di Bufala',    18.50, 'manuel', now());
