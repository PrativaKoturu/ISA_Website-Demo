import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fdjvijdybexvujmktggo.supabase.co' // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkanZpamR5YmV4dnVqbWt0Z2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDU2NzYsImV4cCI6MjA2NzI4MTY3Nn0.qtsLN5Wg8xezbKAH_tWhgHyjKREmmdlIY2NzH5YiG1o' // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey)