-- Fonction atomique pour incrémenter le quota IA sans race condition
-- À exécuter dans l'éditeur SQL Supabase
CREATE OR REPLACE FUNCTION increment_ai_calls(p_user_id uuid, p_month text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_calls  integer := 0;
  v_plan   text;
BEGIN
  SELECT plan,
    CASE WHEN ai_calls_month = p_month THEN COALESCE(ai_calls_count, 0) ELSE 0 END
  INTO v_plan, v_calls
  FROM profiles
  WHERE id = p_user_id
  FOR UPDATE;
  IF NOT FOUND THEN
    RETURN json_build_object('allowed', false, 'reason', 'profile_not_found');
  END IF;
  -- Plan payant : illimité
  IF v_plan <> 'free' THEN
    RETURN json_build_object('allowed', true, 'calls', -1);
  END IF;
  -- Plan gratuit : max 3 appels/mois
  IF v_calls >= 3 THEN
    RETURN json_build_object('allowed', false, 'calls', v_calls, 'reason', 'quota_exceeded');
  END IF;
  UPDATE profiles SET
    ai_calls_count = CASE WHEN ai_calls_month = p_month THEN COALESCE(ai_calls_count, 0) + 1 ELSE 1 END,
    ai_calls_month = p_month
  WHERE id = p_user_id;
  RETURN json_build_object('allowed', true, 'calls', v_calls + 1);
END;
$$;
GRANT EXECUTE ON FUNCTION increment_ai_calls(uuid, text) TO service_role;
