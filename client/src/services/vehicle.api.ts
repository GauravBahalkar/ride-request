import { api } from './http'
import type { ApiResponse } from '../types/auth.types'
import type { Vehicle } from '../types/vehicle.types'

export interface CreateVehiclePayload {
  vehicleName: string
  vehicleType: 'car' | 'bike' | 'van' | 'bus'
  vehicleCapacity: number
  pricePerDay: number
  location: string
  imageUrl: string
  isAvailable?: boolean
  status?: 'active' | 'inactive'
  features?: string[]
}

export interface VehicleFilter {
  search?: string
  location?: string
  vehicleType?: 'car' | 'bike' | 'van' | 'bus'
  minPrice?: number
  maxPrice?: number
  capacity?: number
  sort?: string
  page?: number
  limit?: number
}

export const vehicleApi = {
  getVehicles: async (filters: VehicleFilter) => {
    const { data } = await api.get<ApiResponse<Vehicle[]>>('/user/vehicles', {
      params: filters,
    })
    return data.data
  },
  getVendorVehicles: async () => {
    const { data } = await api.get<ApiResponse<Vehicle[]>>('/my-vehicles')
    return data.data
  },
  createVehicle: async (payload: CreateVehiclePayload) => {
    const { data } = await api.post<ApiResponse<Vehicle>>('/vehicle', payload)
    return data.data
  },
  deleteVehicle: async (id: number) => {
    const { data } = await api.delete<ApiResponse<{ message: string }>>(`/my-vehicles/${id}`)
    return data.data
  },
  updateVehicle: async (id: number, payload: Partial<CreateVehiclePayload>) => {
    const { data } = await api.put<ApiResponse<Vehicle>>(`/vehicle/${id}`, payload)
    return data.data
  },
  getVehicleById: async (id: number) => {
    const { data } = await api.get<ApiResponse<Vehicle>>(`/vehicle/${id}`)
    return data.data
  },
}
