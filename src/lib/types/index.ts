export type User = {
  id: string
  email: string
  name: string
  role: 'player' | 'coach' | 'parent'
  createdAt: string
  updatedAt: string
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
} 