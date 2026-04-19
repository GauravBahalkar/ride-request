import { useState } from 'react'
import { bookingApi } from '../../services/booking.api'
import type { Vehicle } from '../../types/vehicle.types'
import { Button } from './Button'
import { Modal } from './Modal'

interface Props {
  vehicle: Vehicle | null
  open: boolean
  onClose: () => void
}

export const BookingModal = ({ vehicle, open, onClose }: Props) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!vehicle) return

    try {
      setLoading(true)
      setMessage('')
      await bookingApi.createBookingRequest({
        vehicleId: vehicle.id,
        startDate,
        endDate,
      })
      setMessage('Booking request sent successfully.')
      setStartDate('')
      setEndDate('')
    } catch {
      setMessage('Failed to create booking request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title={`Book ${vehicle?.vehicleName ?? ''}`} open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm text-slate-700">Start date</label>
          <input
            type="date"
            required
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-700">End date</label>
          <input
            type="date"
            required
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        {message && <p className="text-sm text-slate-600">{message}</p>}
        <Button disabled={loading || !vehicle} className="w-full" type="submit">
          {loading ? 'Sending...' : 'Confirm Booking Request'}
        </Button>
      </form>
    </Modal>
  )
}
