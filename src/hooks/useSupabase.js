import { useState, useEffect, useCallback } from 'react';
import { supabase, fetchData } from '../lib/supabase';

/**
 * Hook for fetching data from Supabase
 * @param {string} table - Table name
 * @param {object} options - Query options
 */
export function useSupabaseQuery(table, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchData(table, options);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [table, JSON.stringify(options)]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

/**
 * Hook for real-time subscriptions
 * @param {string} table - Table name
 * @param {function} callback - Callback function for updates
 */
export function useSupabaseRealtime(table, callback) {
  useEffect(() => {
    const subscription = supabase
      .channel(`public:${table}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [table, callback]);
}

/**
 * Hook for authentication state
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { user, loading, signIn, signUp, signOut };
}

export default useSupabaseQuery;

