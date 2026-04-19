import { useEffect, useState } from "react";
import { vehicleApi } from "../../services/vehicle.api";
import { handleApiError } from "../../utils/handleApiError";
import { SkeletonLoader } from "../../components/ui/SkeletonLoader";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorState } from "../../components/ui/ErrorState";
import { VehicleCard } from "../../components/ui/VehicleCard";
import { useNavigate } from "react-router-dom";

const VehiclesPage = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles]     = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [search, setSearch]         = useState("");
  const [vehicleType, setVehicleType] = useState("all");
  const [sort, setSort]             = useState("newest");
  const [page, setPage]             = useState(1);
  const [hasMore, setHasMore]       = useState(true);
  const [total, setTotal]           = useState(0);
  const LIMIT = 12;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setVehicles([]);
      fetchVehicles(1, true);
    }, 400);
    return () => clearTimeout(timer);
  }, [search, vehicleType, sort]);

  const fetchVehicles = async (pageNum = 1, reset = false) => {
    reset ? setLoading(true) : setLoadingMore(true);
    try {
      const res = await vehicleApi.getVehicles({
        search, vehicleType: vehicleType === "all" ? undefined : (vehicleType as any), sort, page: pageNum, limit: LIMIT,
      });
      
      // The API returns the array directly now based on my previous service update
      const data = Array.isArray(res) ? res : (res as any)?.vehicles ?? [];
      const totalCount = (res as any)?.total ?? data.length;
      
      setTotal(totalCount);
      setVehicles(prev => reset ? data : [...prev, ...data]);
      setHasMore(data.length === LIMIT);
    } catch (err: any) {
      setError(err.message);
      handleApiError(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const goToVehicleDetails = (vehicle: any) => navigate(`/vehicles/${vehicle.id}`);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SkeletonLoader count={12} />
    </div>
  );
  if (error) return <ErrorState message={error}
                      onRetry={() => fetchVehicles(1, true)} />;

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Available Vehicles</h1>
        <p className="text-slate-500 mt-1">{total} vehicle(s) available</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text" value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or location..."
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl
                     text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <select value={vehicleType}
          onChange={(e) => { setVehicleType(e.target.value); setPage(1); }}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm
                     bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
          <option value="all">All Types</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="van">Van</option>
          <option value="bus">Bus</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm
                     bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {vehicles.length === 0
        ? <EmptyState title="No vehicles found"
                      description="Try a different search or filter" />
        : <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((v) => <VehicleCard key={v.id} vehicle={v} onView={goToVehicleDetails} />)}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button onClick={() => { const n = page+1; setPage(n);
                                         fetchVehicles(n, false); }}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl
                             font-semibold hover:bg-indigo-700 transition-colors
                             disabled:opacity-50 shadow-md">
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
      }
    </div>
  );
};

export default VehiclesPage;
