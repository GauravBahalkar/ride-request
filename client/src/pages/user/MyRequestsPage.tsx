import { useEffect, useState } from "react";
import { bookingApi } from "../../services/booking.api";
import { handleApiError } from "../../utils/handleApiError";
import { SkeletonLoader } from "../../components/ui/SkeletonLoader";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorState } from "../../components/ui/ErrorState";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; classes: string }> = {
  pending: { label: "Pending", classes: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmed", classes: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", classes: "bg-red-100 text-red-800" },
  rejected: { label: "Rejected", classes: "bg-gray-100 text-gray-600" },
  completed: { label: "Completed", classes: "bg-blue-100 text-blue-800" },
};

const MyRequestsPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookingApi.getUserBookings();
      console.log("Bookings API response:", res);
      const data = Array.isArray(res) ? res : (res as any)?.bookings ?? [];
      setBookings(data);
    } catch (err: any) {
      setError(err.message || "Failed to load requests");
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId: number) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    setCancellingId(bookingId);
    try {
      await bookingApi.cancelBooking(bookingId);
      toast.success("Request cancelled successfully");
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: "cancelled" } : b)
      );
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SkeletonLoader count={3} />
    </div>
  );

  if (error) return <ErrorState message={error} onRetry={fetchBookings} />;

  if (!bookings.length) return (
    <EmptyState
      title="No booking requests yet"
      description="Browse available vehicles and send your first request"
      action={{ label: "Browse Vehicles", href: "/vehicles" }}
    />
  );

  return (
    <div className="page-enter max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Booking Requests</h1>
        <p className="text-gray-500 mt-1">{bookings.length} request(s)</p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => {
          const badge = statusConfig[booking.status] ?? statusConfig.pending;
          const start = new Date(booking.startDate);
          const end = new Date(booking.endDate);
          const days = Math.max(1,
            Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
          );
          const total = days * (booking.vehicle?.pricePerDay ?? 0);
          const canCancel = ["pending", "confirmed"].includes(booking.status);

          return (
            <div key={booking.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm
                         p-5 flex gap-4 items-start hover:shadow-md transition-shadow">

              {/* Vehicle image */}
              <img
                src={booking.vehicle?.imageUrl || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400"}
                alt={booking.vehicle?.vehicleName || "Vehicle"}
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400"; }}
                className="w-24 h-20 rounded-xl object-cover flex-shrink-0 bg-gray-100"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base leading-tight">
                      {booking.vehicle?.vehicleName || "Unknown Vehicle"}
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {booking.vehicle?.vehicleType} •{" "}
                      {booking.vehicle?.vehicleCapacity} seats
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                   whitespace-nowrap ${badge.classes}`}>
                    {badge.label}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                  <span>
                    📅 {start.toLocaleDateString("en-IN")} →{" "}
                    {end.toLocaleDateString("en-IN")}
                  </span>
                  <span>{days} day{days > 1 ? "s" : ""}</span>
                </div>

                <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                  <p className="font-bold text-indigo-600 text-lg">
                    ₹{total.toLocaleString("en-IN")}
                    <span className="text-sm font-normal text-gray-400"> total</span>
                  </p>
                  {canCancel && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="px-4 py-1.5 text-sm font-medium text-rose-600
                                 border border-rose-200 rounded-lg hover:bg-rose-50
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-colors"
                    >
                      {cancellingId === booking.id ? "Cancelling..." : "Cancel Request"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyRequestsPage;
