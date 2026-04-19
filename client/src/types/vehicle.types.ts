export type VehicleType = 'car' | 'bike' | 'van' | 'bus'

export interface Vehicle {
  id: number
  vehicleName: string
  vehicleType: VehicleType
  vehicleCapacity: number
  pricePerDay: number
  location: string
  imageUrl: string
  isAvailable: boolean
  status: 'active' | 'inactive'
  features?: string | null
  vendorId: number
}

export interface VehicleFilter {
  location?: string
  minPrice?: number
  maxPrice?: number
  capacity?: number
  vehicleType?: VehicleType
}
