-- Migration : ajout colonne popularité dans la table dishes
-- À exécuter dans l'éditeur SQL de Supabase

ALTER TABLE dishes ADD COLUMN IF NOT EXISTS popularity integer DEFAULT NULL;
