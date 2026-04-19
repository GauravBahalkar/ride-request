import { api } from './http'
import type { ApiResponse, AuthPayload, User } from '../types/auth.types'

interface SignupInput {
  name: string
  email: string
  password: string
  role: 'customer' | 'vendor'
}

interface LoginInput {
  email: string
  password: string
}

export const authApi = {
  signup: async (payload: SignupInput) => {
    const { data } = await api.post<ApiResponse<AuthPayload>>('/signup', payload)
    return data.data
  },
  login: async (payload: LoginInput) => {
    const { data } = await api.post<ApiResponse<AuthPayload>>('/login', payload)
    return data.data
  },
  me: async () => {
    const { data } = await api.get<ApiResponse<User>>('/me')
    return data.data
  },
}
