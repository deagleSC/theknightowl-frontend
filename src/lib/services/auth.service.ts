import { API_ROUTES } from '@/lib/config/routes';
// import type { User } from '@/lib/types';

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await fetch(API_ROUTES.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    return response.json()
  },

  logout: async () => {
    const response = await fetch(API_ROUTES.AUTH.LOGOUT, {
      method: 'POST',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Logout failed')
    }

    return response.json()
  },

  register: async (userData: {
    email: string
    password: string
    name: string
    role: 'player' | 'coach' | 'parent'
  }) => {
    const response = await fetch(API_ROUTES.AUTH.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Registration failed')
    }

    return response.json()
  },

  getCurrentUser: async () => {
    const response = await fetch(API_ROUTES.AUTH.ME)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to get current user')
    }

    return response.json()
  }
} 