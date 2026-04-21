import { useEffect, useState } from 'react'
import {
  BriefcaseBusiness,
  CalendarDays,
  Car,
  ClipboardList,
  DollarSign,
  LayoutGrid,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  X
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { bookingApi } from '../../services/booking.api'
import { vehicleApi } from '../../services/vehicle.api'
import { documentApi } from '../../services/document.api'

import type { BookingRequest } from '../../types/booking.types'
import type { Vehicle, VehicleType } from '../../types/vehicle.types'
import { SkeletonLoader } from '../../components/ui/SkeletonLoader'
import { ErrorState } from '../../components/ui/ErrorState'
import { handleApiError } from '../../utils/handleApiError'

type VendorTab = 'overview' | 'add' | 'manage' | 'bookings'

export const VendorDashboardPage = () => {
  const [requests, setRequests] = useState<BookingRequest[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [tab, setTab] = useState<VendorTab>('overview')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [form, setForm] = useState({
    vehicleName: '',
    vehicleType: 'car' as VehicleType,
    pricePerDay: '',
    vehicleCapacity: '',
    location: '',
    imageUrl: '',
    features: '',
  })

  const loadData = () => {
    setLoading(true)
    setError(null)
    Promise.all([bookingApi.getVendorRequests(), vehicleApi.getVendorVehicles()])
      .then(([requestsData, vehiclesData]) => {
        setRequests(requestsData)
        setVehicles(vehiclesData)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load dashboard data')
        handleApiError(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  const updateStatus = async (id: number, status: 'accepted' | 'rejected') => {
    try {
      await bookingApi.handleVendorRequest(id, status)
      loadData()
    } catch (err) {
      handleApiError(err)
    }
  }

  const handleEditClick = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setForm({
      vehicleName: vehicle.vehicleName,
      vehicleType: vehicle.vehicleType,
      pricePerDay: vehicle.pricePerDay.toString(),
      vehicleCapacity: vehicle.vehicleCapacity.toString(),
      location: vehicle.location,
      imageUrl: vehicle.imageUrl,
      features: (typeof vehicle.features === 'string' 
        ? JSON.parse(vehicle.features) 
        : vehicle.features || []
      ).join(', '),
    })
    setTab('add')
  }

  const resetForm = () => {
    setForm({
      vehicleName: '',
      vehicleType: 'car',
      pricePerDay: '',
      vehicleCapacity: '',
      location: '',
      imageUrl: '',
      features: '',
    })
    setEditingVehicle(null)
  }

  const addVehicle = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      setSubmitting(true)
      const payload = {
        vehicleName: form.vehicleName,
        vehicleType: form.vehicleType,
        vehicleCapacity: Number(form.vehicleCapacity),
        pricePerDay: Number(form.pricePerDay),
        location: form.location,
        imageUrl: form.imageUrl,
        status: 'active' as const,
        isAvailable: true,
        features: form.features
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      }

      if (editingVehicle) {
        await vehicleApi.updateVehicle(editingVehicle.id, payload)
      } else {
        await vehicleApi.createVehicle(payload)
      }

      resetForm()
      setTab('manage')
      loadData()
    } catch (err) {
      handleApiError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleImageUpload = async (vehicleId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setSubmitting(true)
      const uploadedImage = await documentApi.uploadVehicleImage(file, vehicleId, 'front')
      // Update local state if needed or show success
      alert('Image uploaded successfully!')
      loadData()
    } catch (err) {
      handleApiError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const deleteVehicle = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehicleApi.deleteVehicle(id)
        loadData()
      } catch (err) {
        handleApiError(err)
      }
    }
  }

  const totalRevenue = vehicles.reduce((sum, vehicle) => sum + vehicle.pricePerDay, 0)
  const activeVehicles = vehicles.filter((vehicle) => vehicle.status === 'active').length

  if (loading) return <SkeletonLoader count={3} />
  if (error) return <ErrorState message={error} onRetry={loadData} />

  return (
    <section className="page-enter overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="grid md:grid-cols-[240px,1fr]">
        <aside className="border-r border-slate-200 bg-[#fcfcff] p-4">
          <h2 className="text-4xl font-bold text-slate-900">Ride-Request Dashboard</h2>
          <div className="mt-8 space-y-1 text-sm">
            <button
              onClick={() => setTab('overview')}
              className={`flex w-full items-center gap-2 rounded-xl px-4 py-2 text-left ${
                tab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-600'
              }`}
            >
              <LayoutGrid size={15} />
              Overview
            </button>
            <button
              onClick={() => setTab('add')}
              className={`flex w-full items-center gap-2 rounded-xl px-4 py-2 text-left ${
                tab === 'add' ? 'bg-indigo-600 text-white' : 'text-slate-600'
              }`}
            >
              <Plus size={15} />
              Add Vehicle
            </button>
            <button
              onClick={() => setTab('manage')}
              className={`flex w-full items-center gap-2 rounded-xl px-4 py-2 text-left ${
                tab === 'manage' ? 'bg-indigo-600 text-white' : 'text-slate-600'
              }`}
            >
              <Car size={15} />
              Manage Vehicles
            </button>
            <button
              onClick={() => setTab('bookings')}
              className={`flex w-full items-center gap-2 rounded-xl px-4 py-2 text-left ${
                tab === 'bookings' ? 'bg-indigo-600 text-white' : 'text-slate-600'
              }`}
            >
              <ClipboardList size={15} />
              Bookings
            </button>
          </div>
        </aside>

        <main className="space-y-5 bg-slate-50 p-6">
          {tab === 'overview' && (
            <>
              <h1 className="text-5xl font-bold text-slate-900">Dashboard Overview</h1>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  {
                    label: 'Total Revenue',
                    value: `$${totalRevenue.toLocaleString()}`,
                    icon: DollarSign,
                  },
                  { label: 'Active Vehicles', value: `${activeVehicles}`, icon: Car },
                  { label: 'Total Bookings', value: `${requests.length}`, icon: CalendarDays },
                  { label: 'Growth', value: '5.2%', icon: BriefcaseBusiness },
                ].map((card) => (
                  <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <card.icon size={16} className="mb-3 text-indigo-500" />
                    <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                    <p className="text-sm text-slate-500">{card.label}</p>
                  </article>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="mb-3 text-3xl font-semibold text-slate-900">Recent Bookings</h3>
                  <div className="space-y-3">
                    {requests.slice(0, 3).map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between border-t pt-3 first:border-none first:pt-0"
                      >
                        <p className="text-sm text-slate-700">Request #{request.id}</p>
                        <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">
                          {request.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="mb-3 text-3xl font-semibold text-slate-900">Top Performing Vehicles</h3>
                  <div className="space-y-3">
                    {vehicles.slice(0, 4).map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="flex items-center justify-between border-t pt-3 first:border-none first:pt-0"
                      >
                        <p className="text-sm text-slate-700">{vehicle.vehicleName}</p>
                        <p className="text-sm font-semibold text-indigo-600">${vehicle.pricePerDay}/day</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </>
          )}

          {tab === 'add' && (
            <>
              <h1 className="text-5xl font-bold text-slate-900">
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h1>
              <form onSubmit={addVehicle} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Vehicle Name</p>
                    <input
                      required
                      className="w-full rounded-xl border border-slate-300 px-3 py-2"
                      placeholder="e.g., Tesla Model 3"
                      value={form.vehicleName}
                      onChange={(event) => setForm((prev) => ({ ...prev, vehicleName: event.target.value }))}
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Vehicle Type</p>
                    <select
                      className="w-full rounded-xl border border-slate-300 px-3 py-2"
                      value={form.vehicleType}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, vehicleType: event.target.value as VehicleType }))
                      }
                    >
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                      <option value="van">Van</option>
                      <option value="bus">Bus</option>
                    </select>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Price per Day ($)</p>
                    <input
                      required
                      type="number"
                      className="w-full rounded-xl border border-slate-300 px-3 py-2"
                      placeholder="120"
                      value={form.pricePerDay}
                      onChange={(event) => setForm((prev) => ({ ...prev, pricePerDay: event.target.value }))}
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Capacity (Passengers)</p>
                    <input
                      required
                      type="number"
                      className="w-full rounded-xl border border-slate-300 px-3 py-2"
                      placeholder="5"
                      value={form.vehicleCapacity}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, vehicleCapacity: event.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Location</p>
                    <input
                      required
                      className="w-full rounded-xl border border-slate-300 px-3 py-2"
                      placeholder="San Francisco, CA"
                      value={form.location}
                      onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Vehicle Image</p>
                    <div 
                      className={`relative flex min-h-[160px] flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
                        form.imageUrl ? 'border-emerald-200 bg-emerald-50' : 'border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-slate-100'
                      }`}
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      onDrop={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                          try {
                            setSubmitting(true);
                            const res = await documentApi.uploadVehicleImage(file, editingVehicle?.id, 'front');
                            setForm(prev => ({ ...prev, imageUrl: res.imageUrl || res.secure_url }));
                          } catch (err) {
                            handleApiError(err);
                          } finally {
                            setSubmitting(false);
                          }
                        }
                      }}
                    >
                      {form.imageUrl ? (
                        <div className="group relative h-full w-full p-2">
                          <img src={form.imageUrl} alt="Preview" className="h-32 w-full rounded-xl object-cover" />
                          <button 
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, imageUrl: '' }))}
                            className="absolute right-4 top-4 rounded-full bg-rose-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-lg"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-6">
                          <div className="rounded-full bg-indigo-100 p-3 text-indigo-600">
                            <Upload size={24} />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold text-slate-900">Click or drag image to upload</p>
                            <p className="text-xs text-slate-500">PNG, JPG or WebP (max. 5MB)</p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  setSubmitting(true);
                                  const res = await documentApi.uploadVehicleImage(file, editingVehicle?.id, 'front');
                                  setForm(prev => ({ ...prev, imageUrl: res.imageUrl || res.secure_url }));
                                } catch (err) {
                                  handleApiError(err);
                                } finally {
                                  setSubmitting(false);
                                }
                              }
                            }}
                          />
                        </label>
                      )}
                      {submitting && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Features (comma-separated)</p>
                    <textarea
                      className="min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2"
                      placeholder="GPS, Air Conditioning, Bluetooth"
                      value={form.features}
                      onChange={(event) => setForm((prev) => ({ ...prev, features: event.target.value }))}
                    />
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button type="submit" className="h-11 min-w-32" disabled={submitting}>
                    {submitting ? 'Processing...' : editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-11 min-w-24"
                    onClick={() => {
                      resetForm()
                      setTab('manage')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          )}

          {tab === 'manage' && (
            <>
              <div className="flex items-center justify-between">
                <h1 className="text-5xl font-bold text-slate-900">Manage Vehicles</h1>
                <Button onClick={() => setTab('add')} className="px-3 py-1.5 text-xs">
                  Add New Vehicle
                </Button>
              </div>
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Vehicle</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Location</th>
                      <th className="px-3 py-2">Price/Day</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="border-t border-slate-100">
                        <td className="px-3 py-2 font-medium text-slate-900">{vehicle.vehicleName}</td>
                        <td className="px-3 py-2 capitalize text-slate-600">{vehicle.vehicleType}</td>
                        <td className="px-3 py-2 text-slate-600">{vehicle.location}</td>
                        <td className="px-3 py-2 text-slate-900">${vehicle.pricePerDay}</td>
                        <td className="px-3 py-2">
                          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 flex items-center gap-2">
                          <button
                            onClick={() => handleEditClick(vehicle)}
                            className="rounded-md p-1 text-indigo-500 hover:bg-indigo-50"
                            title="Edit Vehicle"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => deleteVehicle(vehicle.id)}
                            className="rounded-md p-1 text-rose-500 hover:bg-rose-50"
                            title="Delete Vehicle"
                          >
                            <Trash2 size={14} />
                          </button>
                          <label className="cursor-pointer rounded-md p-1 text-emerald-500 hover:bg-emerald-50" title="Upload Image">
                            <Plus size={14} />
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => handleImageUpload(vehicle.id, e)}
                              accept="image/*"
                            />
                          </label>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </>
          )}

          {tab === 'bookings' && (
            <>
              <h1 className="text-5xl font-bold text-slate-900">Booking Requests</h1>
              <div className="space-y-3">
                {requests.map((request) => (
                  <article key={request.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900">Request #{request.id}</p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          request.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-700'
                            : request.status === 'pending'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Date: {new Date(request.dateFrom).toLocaleDateString()} -{' '}
                      {new Date(request.dateTo).toLocaleDateString()}
                    </p>
                    {request.status === 'pending' && (
                      <div className="mt-3 flex gap-2">
                        <Button onClick={() => updateStatus(request.id, 'accepted')} className="px-3 py-1 text-xs">
                          Approve
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => updateStatus(request.id, 'rejected')}
                          className="px-3 py-1 text-xs"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </section>
  )
}
