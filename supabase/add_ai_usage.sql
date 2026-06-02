-- Ajoute les colonnes de suivi d'usage IA sur la table profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS ai_calls_count int NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ai_calls_month text NOT NULL DEFAULT '';

COMMENT ON COLUMN profiles.ai_calls_count IS 'Nombre d''appels IA ce mois-ci (reset mensuel)';
COMMENT ON COLUMN profiles.ai_calls_month IS 'Mois courant au format YYYY-MM (ex: 2026-04)';
