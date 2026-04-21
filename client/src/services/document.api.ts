import { api } from './http'
import type { ApiResponse } from '../types/auth.types'

export const documentApi = {
  uploadUserDocument: async (documentType: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('documentType', documentType)
    const { data } = await api.post<ApiResponse<{ url: string }>>('/documents/user/doc', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.data
  },
  getUserDocuments: async () => {
    const { data } = await api.get<ApiResponse<any[]>>('/documents/user/me')
    return data.data
  },
  uploadVehicleDocument: async (vehicleId: number, documentType: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('vehicleId', vehicleId.toString())
    formData.append('documentType', documentType)
    const { data } = await api.post<ApiResponse<{ url: string }>>('/documents/vehicle/doc', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.data
  },
  uploadVehicleImage: async (file: File, vehicleId?: number, imageType: string = 'front') => {
    const formData = new FormData()
    formData.append('file', file)
    if (vehicleId) formData.append('vehicleId', vehicleId.toString())
    formData.append('imageType', imageType)
    const { data } = await api.post<ApiResponse<any>>('/documents/vehicle/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.data
  },
}
