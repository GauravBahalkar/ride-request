import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, MapPin, Star, Users, CheckCircle2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { vehicleApi } from '../../services/vehicle.api'
import type { Vehicle } from '../../types/vehicle.types'
import { SkeletonLoader } from '../../components/ui/SkeletonLoader'
import { ErrorState } from '../../components/ui/ErrorState'
import { EmptyState } from '../../components/ui/EmptyState'
import { handleApiError } from '../../utils/handleApiError'

export const VehicleDetailsPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { vehicleId } = useParams()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [error, setError] = useState('')

  const fetchVehicle = () => {
    const id = Number(vehicleId)
    if (!id) {
      navigate('/')
      return
    }

    setLoading(true)
    setApiError(null)
    vehicleApi
      .getVehicleById(id)
      .then((data) => {
        if (!data) {
          setApiError('Vehicle not found')
          return
        }
        setVehicle(data)
      })
      .catch((err) => {
        setApiError(err.message || 'Failed to load vehicle details')
        handleApiError(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchVehicle()
  }, [vehicleId, navigate])

  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0
    const from = new Date(startDate).getTime()
    const to = new Date(endDate).getTime()
    const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24))
    return days > 0 ? days : 0
  }, [startDate, endDate])

  if (loading) return <SkeletonLoader count={1} />
  if (apiError) return <ErrorState message={apiError} onRetry={fetchVehicle} />
  if (!vehicle) return <EmptyState title="Vehicle Not Found" description="The vehicle you're looking for doesn't exist." />

  const handleProceed = () => {
    if (!user) {
      navigate('/login', { state: { from: `/vehicles/${vehicle.id}` } })
      return
    }

    if (!startDate || !endDate || totalDays <= 0) {
      setError('Please select valid journey dates.')
      return
    }

    if (passengers < 1 || passengers > vehicle.vehicleCapacity) {
      setError(`Passengers must be between 1 and ${vehicle.vehicleCapacity}.`)
      return
    }

    navigate('/booking/confirm', {
      state: {
        vehicle,
        startDate,
        endDate,
        passengers,
        totalDays,
        totalPrice: totalDays * vehicle.pricePerDay,
      },
    })
  }

  const features = vehicle.features
    ?.split(',')
    .map((item) => item.trim())
    .filter(Boolean) ?? ['Safe ride', 'Comfortable seat']

  return (
    <section className="page-enter mx-auto max-w-[1240px] space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1fr,340px]">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img src={vehicle.imageUrl} alt={vehicle.vehicleName} className="h-[420px] w-full object-cover" />
        </article>
        <article className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-2xl font-bold text-slate-900">
            ${vehicle.pricePerDay} <span className="text-base font-normal text-slate-500">/ day</span>
          </p>
          <p className="mt-2 text-sm text-emerald-600">Available</p>
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-slate-600">Start Date</label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2">
                <CalendarDays size={15} className="text-slate-500" />
                <input
                  type="date"
                  className="w-full bg-transparent outline-none"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-slate-600">End Date</label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2">
                <CalendarDays size={15} className="text-slate-500" />
                <input
                  type="date"
                  className="w-full bg-transparent outline-none"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-slate-600">Passengers</label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2">
                <Users size={15} className="text-slate-500" />
                <input
                  type="number"
                  min={1}
                  max={vehicle.vehicleCapacity}
                  className="w-full bg-transparent outline-none"
                  value={passengers}
                  onChange={(event) => setPassengers(Number(event.target.value))}
                />
              </div>
            </div>
          </div>
          {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
          <Button className="mt-5 h-11 w-full" onClick={handleProceed}>
            Book Now
          </Button>
        </article>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-5xl font-bold text-slate-900">{vehicle.vehicleName}</h1>
            <p className="mt-2 flex items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPin size={14} />
                {vehicle.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Users size={14} />
                {vehicle.vehicleCapacity} passengers
              </span>
            </p>
          </div>
          <p className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-slate-700">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            4.7 (89)
          </p>
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-slate-900">Description</h2>
        <p className="mt-2 text-slate-600">
          Premium ride for the ultimate journey experience. Enjoy comfort, performance, and reliability.
        </p>
        <h2 className="mt-8 text-2xl font-black text-slate-900">Premium Features</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center justify-center rounded-[2rem] border border-slate-100 bg-slate-50 p-6 transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-1"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform">
                <CheckCircle2 className="text-indigo-600" size={20} />
              </div>
              <p className="text-center text-sm font-bold text-slate-700">{feature}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
