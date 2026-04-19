import { api } from './http'
import type { ApiResponse, User } from '../types/auth.types'

interface UpdateProfilePayload {
  name?: string
  mobileNo?: string
}

export const userApi = {
  getProfile: async () => {
    const { data } = await api.get<ApiResponse<User>>('/user/profile')
    return data.data
  },
  updateProfile: async (payload: UpdateProfilePayload) => {
    const { data } = await api.put<ApiResponse<User>>('/user/profile', payload)
    return data.data
  },
  uploadProfilePhoto: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await api.post<ApiResponse<{ url: string }>>('/user/profile-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.data
  },
}
