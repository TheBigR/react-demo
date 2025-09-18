import { useState, useEffect, useCallback } from 'react';
import { AuthUser, LoginRequest, CreateUserRequest } from '../types';
import { apiClient } from '../lib/api';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = apiClient.getAuthToken();
    if (token) {
      try {
        // Decode JWT token to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        setAuthState({
          user: payload,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (error) {
        // Invalid token, remove it
        apiClient.removeAuthToken();
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      const response = await apiClient.login(credentials);
      apiClient.setAuthToken(response.token);
      
      // Decode token to get user info
      const payload = JSON.parse(atob(response.token.split('.')[1]));
      setAuthState({
        user: payload,
        isLoading: false,
        isAuthenticated: true,
      });
      
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const register = useCallback(async (userData: CreateUserRequest) => {
    try {
      const response = await apiClient.register(userData);
      apiClient.setAuthToken(response.token);
      
      // Decode token to get user info
      const payload = JSON.parse(atob(response.token.split('.')[1]));
      setAuthState({
        user: payload,
        isLoading: false,
        isAuthenticated: true,
      });
      
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    apiClient.removeAuthToken();
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
  };
}
