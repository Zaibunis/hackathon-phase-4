import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import apiClient from '../lib/api-client';
import { authClient } from '../lib/auth';

// For now, since BetterAuth uses atoms instead of standard hooks, we'll create a simple wrapper
// that works with our existing system but represents the BetterAuth integration
interface User {
  id: string;
  email: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthResponse {
  access_token: string;
}


interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshAuth: () => void;
}

/**
 * Extract a human-readable message from an axios/backend error.
 * Backend `detail` can be: a string, an object {code, message}, or a
 * Pydantic 422 array — all handled here so users never see "[object Object]".
 */
function extractBackendError(error: any, fallback: string): string {
  const data = error?.response?.data;
  const detail = data?.detail ?? data?.message ?? data?.error;

  if (typeof detail === 'string' && detail) return detail;

  if (Array.isArray(detail)) {
    const first = detail[0];
    return first?.msg || first?.message || fallback;
  }

  if (detail && typeof detail === 'object') {
    if (detail.code === 'EMAIL_EXISTS') {
      return 'This email is already registered. Please sign in instead.';
    }
    return detail.message || detail.code || fallback;
  }

  return error?.message || fallback;
}

export function useBetterAuth(): AuthContextType {
  const router = useRouter();

  // Direct API calls to match our backend endpoints
  const signInHandler = useCallback(async (email: string, password: string) => {
    try {
      console.log('Attempting sign in with email:', email); // Debug logging
      
      const response = await apiClient.post<any>(  // Changed to 'any' to handle varying response structures
        '/auth/auth/signin',
        { email, password }
      );

      console.log('Sign in response:', response); // Debug logging

      // Try to extract token from different possible response formats
      let token = response.data.access_token || response.data.token || response.data.data?.access_token;

      if (token) {
        localStorage.setItem('access_token', token);
        // Don't redirect here - let the form component handle the redirect after context updates
      } else {
        console.error('Sign in response:', response.data); // Log for debugging
        throw new Error('Sign in failed - no token received in response');
      }
    } catch (error: any) {
      console.error('Sign in error:', error); // Log for debugging
      throw new Error(extractBackendError(error, 'Sign in failed. Check your email and password.'));
    }
  }, []);

  const signUpHandler = useCallback(async (email: string, password: string) => {
    try {
      console.log('Attempting sign up with email:', email); // Debug logging
      
      const response = await apiClient.post<any>(  // Changed to 'any' to handle varying response structures
        '/auth/auth/signup',
        { email, password }
      );

      console.log('Sign up response:', response); // Debug logging

      // Try to extract token from different possible response formats
      let token = response.data.access_token || response.data.token || response.data.data?.access_token;

      if (token) {
        // Store the token in localStorage for use with API calls
        localStorage.setItem('access_token', token);
        // Don't redirect here - let the form component handle the redirect after context updates
      } else {
        console.error('Sign up response:', response.data); // Log for debugging
        throw new Error('Sign up failed - no token received in response');
      }
    } catch (error: any) {
      console.error('Sign up error:', error); // Log for debugging
      throw new Error(extractBackendError(error, 'Sign up failed. Please try again.'));
    }
  }, []);

  const signOutHandler = useCallback(async () => {
    try {
      // Clear the stored token
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // Use authClient to sign out if available
      await authClient.signOut();
      router.push('/signin');
    } catch (error) {
      console.error('Sign out error:', error); // Log for debugging
      // Even if sign out fails, redirect to sign in
      router.push('/signin');
    }
  }, [router]);

  const refreshAuth = useCallback(() => {
    // Session refreshing would happen automatically with JWT
  }, []);

  // Return initial state - the actual state will be managed by AuthContext
  return {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    signIn: signInHandler,
    signUp: signUpHandler,
    signOut: signOutHandler,
    refreshAuth,
  };
}