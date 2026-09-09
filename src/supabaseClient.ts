import { createClient } from '@supabase/supabase-js'

// These should come from environment variables
const supabaseUrl = 'https://pyaxgiswlufuooilckrd.supabase.co'
const supabaseAnonKey = 'sb_publishable_mx50vJUH9zdg6tYXwwb7gQ_GgdGeH4k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
