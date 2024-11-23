import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Authentication helpers
export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  profiles: {
    get: async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      return { data, error }
    },
    
    upsert: async (profile: Database['public']['Tables']['profiles']['Insert']) => {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profile)
        .select()
      return { data, error }
    }
  },

  resumes: {
    list: async (userId: string) => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    get: async (resumeId: string) => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .single()
      return { data, error }
    },

    create: async (resume: Database['public']['Tables']['resumes']['Insert']) => {
      const { data, error } = await supabase
        .from('resumes')
        .insert(resume)
        .select()
      return { data, error }
    },

    update: async (resumeId: string, updates: Database['public']['Tables']['resumes']['Update']) => {
      const { data, error } = await supabase
        .from('resumes')
        .update(updates)
        .eq('id', resumeId)
        .select()
      return { data, error }
    },

    delete: async (resumeId: string) => {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeId)
      return { error }
    }
  }
}
