import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Authentication features will not work.');
}

const supabase = createClient(
  supabaseUrl || 'your-supabase-url',
  supabaseAnonKey || 'your-supabase-anon-key'
);

export default supabase;
