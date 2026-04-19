export type UserRole = 'customer' | 'vendor'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  mobileNo?: string | null
}

export interface AuthPayload {
  user: User
  token: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}
