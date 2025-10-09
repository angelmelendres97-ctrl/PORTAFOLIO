const { supabase } = require('../config/env');

const hasValidSupabaseConfig = () => Boolean(supabase.url && supabase.serviceRoleKey);

const supabaseHeaders = () => ({
  'Content-Type': 'application/json',
  apikey: supabase.serviceRoleKey,
  Authorization: `Bearer ${supabase.serviceRoleKey}`
});

const supabaseFetch = async (path, options = {}) => {
  if (!hasValidSupabaseConfig()) {
    throw new Error('Supabase configuration is incomplete');
  }

  const response = await fetch(`${supabase.url}/rest/v1/${path}`, {
    headers: { ...supabaseHeaders(), ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${errorText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

module.exports = {
  hasValidSupabaseConfig,
  supabaseFetch
};
