import { useState, useEffect } from 'react';
import { auth } from '../supabase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const session = auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}

export function useRequireAuth(redirectUrl = '/auth/login') {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectUrl);
    }
  }, [user, loading, navigate, redirectUrl]);

  return { user, loading };
}
