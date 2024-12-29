import type { User } from '@/lib/types';
import { StateCreator } from 'zustand';

export interface AuthSlice {
  auth: {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
  };
  login: (user: User, token: string) => void;
  logout: () => void;
  setAuthLoading: (isLoading: boolean) => void;
  setAuthError: (error: string | null) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  auth: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  login: (user: User, token: string) =>
    set((state) => ({
      auth: {
        ...state.auth,
        user,
        token,
        error: null,
      },
    })),
  logout: () =>
    set(() => ({
      auth: {
        user: null,
        token: null,
        isLoading: false,
        error: null,
      },
    })),
  setAuthLoading: (isLoading: boolean) =>
    set((state) => ({
      auth: {
        ...state.auth,
        isLoading,
      },
    })),
  setAuthError: (error: string | null) =>
    set((state) => ({
      auth: {
        ...state.auth,
        error,
      },
    })),
});