export interface BookingRequestInput {
  vehicleId: number
  startDate: string
  endDate: string
}

export interface BookingRequest {
  id: number
  userId: number
  vehicleId: number
  vendorId: number
  dateFrom: string
  dateTo: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
}

export interface Booking {
  id: number
  userId: number
  vehicleId: number
  vendorId: number
  bookingStatus: 'pending' | 'confirmed' | 'cancelled'
  totalPrice: string
  dateFrom: string
  dateTo: string
  destination: string
  paymentStatus: 'pending' | 'paid' | 'failed'
}
