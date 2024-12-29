import { AuthService } from '@/lib/services/auth.service';
import { useStore } from '@/lib/stores';
import { CoachProfile, PlayerProfile } from '../types';
import { AxiosError } from 'axios';

export const AuthActions = {
  login: async (email: string, password: string, onSuccess?: () => void, onError?: (error: AxiosError) => void) => {
    try {
      const { user, token } = await AuthService.login(email, password, onError)
      useStore.getState().login(user, token)
      onSuccess?.()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      }
    }
  },

  logout: async (onSuccess?: () => void, onError?: (error: AxiosError) => void) => {
    try {
      await AuthService.logout(onError)
      useStore.getState().logout()
      onSuccess?.()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Logout failed' 
      }
    }
  },

  register: async (userData: {
    role: 'player' | 'coach' | 'parent'
    data: PlayerProfile | CoachProfile
  }, onSuccess?: () => void, onError?: (error: AxiosError) => void) => {
    console.log(userData)
    try {
      const { user, token } = await AuthService.register(userData, onError)
      useStore.getState().login(user, token)
      onSuccess?.()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      }
    }
  }
} 