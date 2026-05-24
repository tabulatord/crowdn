import { createClient } from '@supabase/supabase-js'

// Ces valeurs seront remplacées par les vraies clés Supabase
// Voir le guide de déploiement
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://TON-PROJET.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'TA-CLE-PUBLIQUE'

export const supabase = createClient(supabaseUrl, supabaseKey)
