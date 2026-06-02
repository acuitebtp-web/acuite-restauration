// Délègue à l'AuthContext centralisé — évite les appels Supabase multiples
export { useAuthContext as useAuth } from '@/context/AuthContext'
