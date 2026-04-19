export * from './auth.types'
export * from './booking.types'
export * from './vehicle.types'

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
