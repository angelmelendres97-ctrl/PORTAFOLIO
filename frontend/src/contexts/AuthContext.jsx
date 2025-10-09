import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import api from '../services/apiClient';

export const AuthContext = createContext({
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('agx_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('agx_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('agx_token', token);
    } else {
      localStorage.removeItem('agx_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('agx_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agx_user');
    }
  }, [user]);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data.user);
      setToken(data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'No fue posible iniciar sesión'
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      logout,
      isAuthenticated: Boolean(user && token)
    }),
    [user, token, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
