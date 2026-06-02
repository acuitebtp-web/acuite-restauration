-- Table de rate limiting pour les utilisateurs anonymes
-- Stocke un hash SHA-256 de l'IP (jamais l'IP brute — RGPD)
-- Limite : 3 appels IA par jour par IP

CREATE TABLE IF NOT EXISTS anonymous_rate_limits (
  ip_hash  text  NOT NULL,
  date     date  NOT NULL DEFAULT CURRENT_DATE,
  count    integer NOT NULL DEFAULT 1,
  PRIMARY KEY (ip_hash, date)
);

-- Pas d'accès public — uniquement service_role
ALTER TABLE anonymous_rate_limits ENABLE ROW LEVEL SECURITY;

-- Nettoyage automatique des entrées de plus de 7 jours
-- (à exécuter manuellement ou via un cron Supabase si besoin)
-- DELETE FROM anonymous_rate_limits WHERE date < CURRENT_DATE - INTERVAL '7 days';
