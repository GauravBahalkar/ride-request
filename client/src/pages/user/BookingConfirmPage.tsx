import { CalendarDays, MapPin, Users } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { bookingApi } from '../../services/booking.api'
import type { Vehicle } from '../../types/vehicle.types'

interface BookingConfirmState {
  vehicle: Vehicle
  startDate: string
  endDate: string
  passengers: number
  totalDays: number
  totalPrice: number
}

export const BookingConfirmPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as BookingConfirmState | undefined
  const [loading, setLoading] = useState(false)

  if (!state?.vehicle) {
    navigate('/')
    return null
  }

  const { vehicle, startDate, endDate, passengers, totalDays, totalPrice } = state

  const confirmBooking = async () => {
    try {
      setLoading(true)
      await bookingApi.createBookingRequest({
        vehicleId: vehicle.id,
        startDate,
        endDate,
      })

      navigate('/', {
        state: {
          successMessage: 'Your vehicle has been booked successfully.',
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-[980px] space-y-6">
      <h1 className="text-5xl font-bold text-slate-900">Complete Your Booking</h1>
      <div className="grid gap-5 lg:grid-cols-[1fr,280px]">
        <div className="space-y-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-3xl font-semibold text-slate-900">Vehicle Details</h2>
            <div className="mt-4 flex items-center gap-3">
              <img src={vehicle.imageUrl} alt={vehicle.vehicleName} className="h-16 w-24 rounded-lg object-cover" />
              <div>
                <p className="text-2xl font-semibold text-slate-900">{vehicle.vehicleName}</p>
                <p className="mt-1 flex items-center gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={14} />
                    {vehicle.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users size={14} />
                    {passengers} passengers
                  </span>
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-3xl font-semibold text-slate-900">Booking Information</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <p className="inline-flex items-center gap-2 text-slate-600">
                  <CalendarDays size={15} />
                  Start Date
                </p>
                <p className="font-medium text-slate-900">{new Date(startDate).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <p className="inline-flex items-center gap-2 text-slate-600">
                  <CalendarDays size={15} />
                  End Date
                </p>
                <p className="font-medium text-slate-900">{new Date(endDate).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="inline-flex items-center gap-2 text-slate-600">
                  <Users size={15} />
                  Passengers
                </p>
                <p className="font-medium text-slate-900">{passengers}</p>
              </div>
            </div>
          </article>
        </div>

        <article className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-3xl font-semibold text-slate-900">Pricing Summary</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p className="flex justify-between">
              <span>
                ${vehicle.pricePerDay} x {totalDays} days
              </span>
              <span className="text-slate-900">${totalPrice}</span>
            </p>
            <p className="flex justify-between">
              <span>Service fee</span>
              <span className="text-slate-900">$0</span>
            </p>
            <p className="mt-2 flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
              <span>Total</span>
              <span className="text-indigo-600">${totalPrice}</span>
            </p>
          </div>
          <Button className="mt-5 h-11 w-full" onClick={confirmBooking} disabled={loading}>
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </Button>
          <p className="mt-3 text-center text-xs text-slate-500">
            By confirming, you agree to our terms and conditions.
          </p>
        </article>
      </div>
    </section>
  )
}
