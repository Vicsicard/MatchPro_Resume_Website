import { supabase } from '../lib/supabaseClient';

describe('Supabase Integration Tests', () => {
  test('Supabase client is initialized', () => {
    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
    expect(supabase.from).toBeDefined();
  });

  test('Authentication endpoints are accessible', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'testpassword123',
    });
    // We expect an error since these are invalid credentials,
    // but we want to ensure the endpoint is reachable
    expect(error.message).toBeDefined();
  });

  test('Database queries are functional', async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .limit(1);
    
    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  test('Storage bucket is accessible', async () => {
    const { data, error } = await supabase
      .storage
      .getBucket('resumes');
    
    expect(error).toBeNull();
    expect(data).toBeDefined();
  });
});
