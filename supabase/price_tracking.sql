-- ─────────────────────────────────────────────────────────
-- Suivi des prix FranceAgriMer
-- Coller dans Supabase > SQL Editor et exécuter
-- ─────────────────────────────────────────────────────────

-- 1. Table des snapshots de prix
CREATE TABLE IF NOT EXISTS ingredient_price_snapshots (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ingredient    text NOT NULL,
  price_per_kg  numeric NOT NULL,
  source        text DEFAULT 'franceagrimer',
  recorded_at   timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_snapshots_ingredient_date
  ON ingredient_price_snapshots (ingredient, recorded_at DESC);

-- 2. Vue "dernier prix connu + variation vs snapshot précédent"
CREATE OR REPLACE VIEW price_changes AS
WITH ranked AS (
  SELECT
    ingredient,
    price_per_kg,
    recorded_at,
    LAG(price_per_kg) OVER (PARTITION BY ingredient ORDER BY recorded_at) AS prev_price
  FROM ingredient_price_snapshots
),
latest AS (
  SELECT DISTINCT ON (ingredient) *
  FROM ranked
  ORDER BY ingredient, recorded_at DESC
)
SELECT
  ingredient,
  price_per_kg   AS current_price,
  prev_price     AS previous_price,
  ROUND(((price_per_kg - prev_price) / NULLIF(prev_price, 0)) * 100, 1) AS change_pct,
  recorded_at
FROM latest
WHERE prev_price IS NOT NULL
  AND ABS((price_per_kg - prev_price) / NULLIF(prev_price, 0)) >= 0.02
ORDER BY ABS((price_per_kg - prev_price) / NULLIF(prev_price, 0)) DESC;

-- 3. RLS : lecture publique, écriture service_role uniquement
ALTER TABLE ingredient_price_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique des prix"
  ON ingredient_price_snapshots FOR SELECT
  USING (true);

-- 4. Exemple d'insertion manuelle (remplacer par vos vraies valeurs FranceAgriMer)
-- INSERT INTO ingredient_price_snapshots (ingredient, price_per_kg) VALUES
--   ('Bœuf - Filet', 56.50),
--   ('Agneau - Rack / carré', 27.80),
--   ('Saint-Jacques - Noix', 38.00),
--   ('Truffe noire Périgord', 950.00);
