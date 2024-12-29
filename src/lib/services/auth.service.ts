import axios, { AxiosError } from 'axios';
import { API_ROUTES } from '@/lib/config/routes';
import { CoachProfile, PlayerProfile } from '../types';

export const AuthService = {
  login: async (email: string, password: string, onError?: (error: AxiosError) => void) => {
    try {
      const { data } = await axios.post(API_ROUTES.AUTH.LOGIN, { email, password });
      return data;
    } catch (error: unknown) {
      onError?.(error as AxiosError);
    }
  },

  logout: async (onError?: (error: AxiosError) => void) => {
    try {
      const { data } = await axios.post(API_ROUTES.AUTH.LOGOUT);
      return data;
    } catch (error: unknown) {
      onError?.(error as AxiosError);
    }
  },

  register: async (userData: {
    role: 'player' | 'coach' | 'parent'
    data: PlayerProfile | CoachProfile
  }, onError?: (error: AxiosError) => void) => {
    try {
      const { data } = await axios.post(API_ROUTES.AUTH.REGISTER, userData);
      return data;
    } catch (error: unknown) {
      onError?.(error as AxiosError);
    }
  },

  getCurrentUser: async (onError?: (error: AxiosError) => void) => {
    try {
      const { data } = await axios.get(API_ROUTES.AUTH.ME);
      return data;
    } catch (error: unknown) {
      onError?.(error as AxiosError);
    }
  }
} 