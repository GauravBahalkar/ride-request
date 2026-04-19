import { api } from './http'
import type { ApiResponse } from '../types/auth.types'
import type {
  Booking,
  BookingRequest,
  BookingRequestInput,
} from '../types/booking.types'

export const bookingApi = {
  createBookingRequest: async (payload: BookingRequestInput) => {
    const { data } = await api.post<ApiResponse<BookingRequest>>(
      '/user/bookings/request',
      payload,
    )
    return data.data
  },
  getUserBookings: async () => {
    const { data } = await api.get<ApiResponse<Booking[]>>('/user/bookings')
    return data.data
  },
  getUserRequests: async () => {
    const { data } = await api.get<ApiResponse<Booking[]>>('/user/bookings/requests/all')
    return data.data
  },
  getVendorRequests: async () => {
    const { data } = await api.get<ApiResponse<BookingRequest[]>>(
      '/user/bookings/vendor/requests',
    )
    return data.data
  },
  handleVendorRequest: async (id: number, status: 'accepted' | 'rejected') => {
    const { data } = await api.patch<ApiResponse<Booking | { message: string }>>(
      `/user/bookings/request/${id}`,
      { status },
    )
    return data.data
  },
  cancelBooking: async (id: number) => {
    const { data } = await api.patch<ApiResponse<{ message: string }>>(
      `/user/bookings/${id}/cancel`
    )
    return data.data
  },
}
