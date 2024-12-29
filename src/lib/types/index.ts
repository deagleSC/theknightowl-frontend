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

export type CoachProfile = {
  fullName: string
  email: string
  password: string
  username: string
  chessTitle: 'GM' | 'IM' | 'FM' | 'CM' | 'WGM' | 'WIM' | 'WFM' | 'WCM' | 'NONE'
  experience: 'experience_less_1' | 'experience_1_3' | 'experience_3_5' | 'experience_5_plus'
  expertise: ('opening' | 'middle_game' | 'end_game')[]
  preferredLevel: ('beginner' | 'intermediate' | 'advanced')[]
  hourlyRate: number
  availability: {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
    timeSlots: string[]
  }[]
  certifications: string[]
  introVideo: string
  portfolio: string[]
}

export type PlayerProfile = {
  fullName: string
  email: string
  password: string
  ageGroup: 'age_under_10' | 'age_10_14' | 'age_15_18' | 'age_over_18'
  country: string
  timezone: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'master'
  playStyle: 'aggressive' | 'positional' | 'tactical' | 'defensive'
  learningGoals: ('openings' | 'end_game' | 'puzzles' | 'tournament')[]
}