import { useEffect, useState } from 'react'
import { Mail, UserCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { bookingApi } from '../../services/booking.api'
import { vehicleApi } from '../../services/vehicle.api'
import type { Booking } from '../../types/booking.types'
import type { Vehicle } from '../../types/vehicle.types'
import { SkeletonLoader } from '../../components/ui/SkeletonLoader'
import { ErrorState } from '../../components/ui/ErrorState'
import { EmptyState } from '../../components/ui/EmptyState'
import { handleApiError } from '../../utils/handleApiError'

export const UserDashboardPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    Promise.all([bookingApi.getUserBookings(), vehicleApi.getVehicles({})])
      .then(([bookingsData, vehiclesData]) => {
        setBookings(bookingsData)
        setVehicles(vehiclesData)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load bookings');
        handleApiError(err);
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <SkeletonLoader count={2} />
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />

  const getVehicleName = (vehicleId: number) =>
    vehicles.find((vehicle) => vehicle.id === vehicleId)?.vehicleName ?? `Vehicle #${vehicleId}`

  const getVehicleImage = (vehicleId: number) =>
    vehicles.find((vehicle) => vehicle.id === vehicleId)?.imageUrl ??
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400'

  return (
    <section className="page-enter mx-auto grid max-w-[980px] gap-5 md:grid-cols-[320px,1fr]">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <div className="mx-auto mb-4 grid h-20 w-20 place-content-center rounded-full bg-indigo-50 text-indigo-600">
          <UserCircle size={36} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">{user?.name ?? 'Customer'}</h1>
        <p className="text-sm text-slate-500">Customer</p>
        <div className="mt-5 space-y-2 text-left text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <Mail size={14} />
            {user?.email}
          </p>
          <p>Customer Account</p>
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Booking History</h2>
          <span className="text-sm text-slate-500">View All</span>
        </div>
        <div className="space-y-3">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
            >
              <img
                src={getVehicleImage(booking.vehicleId)}
                alt={getVehicleName(booking.vehicleId)}
                className="h-14 w-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-slate-900">{getVehicleName(booking.vehicleId)}</p>
                <p className="text-xs text-slate-500">
                  {new Date(booking.dateFrom).toLocaleDateString()} -{' '}
                  {new Date(booking.dateTo).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  booking.bookingStatus === 'confirmed'
                    ? 'bg-emerald-100 text-emerald-700'
                    : booking.bookingStatus === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-rose-100 text-rose-700'
                }`}
              >
                {booking.bookingStatus}
              </span>
              <p className="font-semibold text-indigo-600">${booking.totalPrice}</p>
              {(booking.bookingStatus === 'pending' || booking.bookingStatus === 'confirmed') && (
                <button
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to cancel this booking?')) {
                      try {
                        await bookingApi.cancelBooking(booking.id)
                        window.location.reload()
                      } catch (err) {
                        handleApiError(err)
                      }
                    }
                  }}
                  className="ml-2 text-xs font-semibold text-rose-500 hover:underline"
                >
                  Cancel
                </button>
              )}
            </article>
          ))}
        </div>
      </article>
      {bookings.length === 0 && (
        <div className="md:col-span-2">
          <EmptyState title="No Bookings Yet" description="You have not made any bookings yet." />
        </div>
      )}
    </section>
  )
}
