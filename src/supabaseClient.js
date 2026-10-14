import { createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://rjlcdsgooblhidfthoes.supabase.co'
const supabaseKey = 'sb_publishable_nrCdSROE2erNMrUDelC-Cg_0DykDbjx'

export const supabase = createClient(supabaseUrl, supabaseKey)



