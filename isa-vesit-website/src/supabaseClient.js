import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bxcsazxrgkrslbqeworx.supabase.co' // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4Y3NhenhyZ2tyc2xicWV3b3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk3NDQyODMsImV4cCI6MjAzNTMyMDI4M30.NcvtPsa_FC_3ozm4G43pDrY8XtO2zhtM2RVW1WFOy78' // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey)