-- Historique des coûts par plat
CREATE TABLE IF NOT EXISTS dish_cost_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dish_id uuid NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_cost numeric NOT NULL,
  price_advised numeric NOT NULL,
  food_cost_pct numeric NOT NULL,
  margin_pct numeric NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dish_cost_history_dish_id ON dish_cost_history(dish_id);
CREATE INDEX IF NOT EXISTS idx_dish_cost_history_user_id ON dish_cost_history(user_id);

ALTER TABLE dish_cost_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own history"
  ON dish_cost_history FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
