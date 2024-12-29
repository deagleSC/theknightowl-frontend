import { AuthService } from '@/lib/services/auth.service';
import { useStore } from '@/lib/stores';

export const AuthActions = {
  login: async (email: string, password: string) => {
    try {
      const { user, token } = await AuthService.login(email, password)
      useStore.getState().login(user, token)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      }
    }
  },

  logout: async () => {
    try {
      await AuthService.logout()
      useStore.getState().logout()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Logout failed' 
      }
    }
  },

  register: async (userData: {
    email: string
    password: string
    name: string
    role: 'player' | 'coach' | 'parent'
  }) => {
    try {
      const { user, token } = await AuthService.register(userData)
      useStore.getState().login(user, token)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      }
    }
  }
} 