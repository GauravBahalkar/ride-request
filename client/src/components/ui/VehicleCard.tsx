import { MapPin, Users, Star } from 'lucide-react'
import type { Vehicle } from '../../types/vehicle.types'
import { Button } from './Button'

interface Props {
  vehicle: Vehicle
  onBook?: (vehicle: Vehicle) => void
  onView?: (vehicle: Vehicle) => void
  compact?: boolean
}

export const VehicleCard = ({ vehicle, onBook, onView, compact = false }: Props) => {
  const handleCardClick = () => {
    if (onView) onView(vehicle)
  }

  return (
    <article
      onClick={handleCardClick}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative cursor-pointer overflow-hidden">
        <img 
          src={vehicle.imageUrl} 
          alt={vehicle.vehicleName} 
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <span 
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm ${
            vehicle.isAvailable ? 'bg-emerald-500/90' : 'bg-slate-500/90'
          }`}
        >
          {vehicle.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{vehicle.vehicleName}</h3>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            <MapPin size={14} className="text-indigo-500" />
            {vehicle.location}
          </p>
          <p className="flex items-center gap-1.5">
            <Users size={14} className="text-indigo-500" />
            {vehicle.vehicleCapacity} Seats
          </p>
        </div>
        <p className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          4.8 ({120 + vehicle.id} reviews)
        </p>
        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-extrabold text-slate-900">
            ${vehicle.pricePerDay} <span className="text-xs font-normal text-slate-400">/ day</span>
          </p>
          {!compact && (
            <Button
              onClick={(event) => {
                event.stopPropagation()
                if (onBook) onBook(vehicle)
                if (onView) onView(vehicle)
              }}
              className="px-4 py-2 text-xs shadow-sm shadow-indigo-200"
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
