-- ═══════════════════════════════════════════════════════
-- ACUITÉ RESTAURATION — Script de setup Supabase
-- À exécuter dans l'éditeur SQL de votre projet Supabase
-- ═══════════════════════════════════════════════════════

-- ── 1. Table profiles ────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id                      uuid references auth.users primary key,
  email                   text,
  plan                    text default 'free',
  stripe_customer_id      text,
  stripe_subscription_id  text,
  created_at              timestamp default now()
);
-- plan : 'free' | 'pro' | 'multi'

-- ── 2. Table dishes ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS dishes (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references profiles(id) on delete cascade,
  name              text not null,
  category          text,           -- 'entrée' | 'plat' | 'dessert' | 'autre'
  ingredients       jsonb,          -- [{ name, qty_grams, price_per_kg, cost }]
  covers            integer default 1,
  is_shared         boolean default false,
  target_food_cost  numeric default 30,
  total_cost        numeric,
  price_advised     numeric,
  price_actual      numeric,
  margin_pct        numeric,
  allergens         text[],
  notes             text,
  created_at        timestamp default now(),
  updated_at        timestamp default now()
);

-- ── 3. Table custom_prices ───────────────────────────────
CREATE TABLE IF NOT EXISTS custom_prices (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references profiles(id) on delete cascade,
  ingredient_name   text,
  price_per_kg      numeric,
  updated_at        timestamp default now(),
  unique(user_id, ingredient_name)
);

-- ── 4. Row Level Security ────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own profile"
  ON profiles FOR ALL USING (auth.uid() = id);

ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own dishes"
  ON dishes FOR ALL USING (auth.uid() = user_id);

ALTER TABLE custom_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own prices"
  ON custom_prices FOR ALL USING (auth.uid() = user_id);

-- ── 5. Trigger : créer profil à l'inscription ────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- ── 6. Trigger : updated_at auto sur dishes ──────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER dishes_updated_at
  BEFORE UPDATE ON dishes
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
