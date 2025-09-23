import { useMutation, useQuery } from '@tanstack/react-query';
import type { Address } from 'viem';

import { princessSweeperService } from './client';
import type { Auth } from '@/types/auth';

// ============================================================================
// Service Functions
// ============================================================================

/**
 * Request nonce for wallet authentication
 */
export async function fetchAuthNonce(payload: Auth.NoncePayload) {
  try {
    const { data } = await princessSweeperService.post<Service.Response<Auth.Nonce>>(
      '/auth/nonce',
      payload,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Verify wallet signature
 */
export async function verifyAuthSignature(payload: Auth.VerifySignaturePayload) {
  try {
    const { data } = await princessSweeperService.patch<Service.Response<Auth.VerifySignature>>(
      '/auth/verify-signature',
      payload,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Login with wallet signature
 */
export async function loginWithWallet(payload: Auth.LoginPayload) {
  try {
    const { data } = await princessSweeperService.post<Service.Response<Auth.LoginResponse>>(
      '/auth/login',
      payload,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Register new user with wallet
 */
export async function registerWithWallet(payload: Auth.RegisterPayload) {
  try {
    const { data } = await princessSweeperService.post<Service.Response<Auth.RegisterResponse>>(
      '/auth/register',
      payload,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Refresh access token
 */
export async function refreshAuthToken(payload: Auth.RefreshTokenPayload) {
  try {
    const { data } = await princessSweeperService.post<Service.Response<Auth.RefreshTokenResponse>>(
      '/auth/refresh-token',
      payload,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// ============================================================================
// React Query Hooks
// ============================================================================

/**
 * Hook for requesting auth nonce
 */
export const useAuthNonce = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: Service.Response<Auth.Nonce>) => void;
  onError?: (error: Service.ErrorResponse) => void;
} = {}) => {
  return useMutation({
    mutationFn: fetchAuthNonce,
    onSuccess,
    onError,
  });
};

/**
 * Hook for verifying wallet signature
 */
export const useVerifyAuthSignature = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: Service.Response<Auth.VerifySignature>) => void;
  onError?: (error: Service.ErrorResponse) => void;
} = {}) => {
  return useMutation({
    mutationFn: verifyAuthSignature,
    onSuccess,
    onError,
  });
};

/**
 * Hook for wallet login
 */
export const useLoginWithWallet = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: Service.Response<Auth.LoginResponse>) => void;
  onError?: (error: Service.ErrorResponse) => void;
} = {}) => {
  return useMutation({
    mutationFn: loginWithWallet,
    onSuccess,
    onError,
  });
};

/**
 * Hook for wallet registration
 */
export const useRegisterWithWallet = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: Service.Response<Auth.RegisterResponse>) => void;
  onError?: (error: Service.ErrorResponse) => void;
} = {}) => {
  return useMutation({
    mutationFn: registerWithWallet,
    onSuccess,
    onError,
  });
};

/**
 * Hook for refreshing auth token
 */
export const useRefreshAuthToken = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: Service.Response<Auth.RefreshTokenResponse>) => void;
  onError?: (error: Service.ErrorResponse) => void;
} = {}) => {
  return useMutation({
    mutationFn: refreshAuthToken,
    onSuccess,
    onError,
  });
};

// ============================================================================
// Auth State Management Hooks
// ============================================================================

/**
 * Hook to get current auth state
 */
export const useAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const walletAddress = localStorage.getItem('walletAddress') as Address | null;

  return {
    accessToken,
    refreshToken,
    walletAddress,
    isAuthenticated: !!accessToken,
  };
};

/**
 * Hook to logout user
 */
export const useLogout = () => {
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('walletAddress');
    // Optionally redirect to login page
    window.location.href = '/';
  };

  return { logout };
};

/**
 * Hook to save auth tokens
 */
export const useSaveAuthTokens = () => {
  const saveTokens = (tokens: {
    accessToken: string;
    refreshToken: string;
    walletAddress: Address;
  }) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('walletAddress', tokens.walletAddress);
  };

  return { saveTokens };
};
