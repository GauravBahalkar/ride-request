import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { UserRole } from '../types/auth.types'
import { SkeletonLoader } from '../components/ui/SkeletonLoader'

interface Props {
  role?: UserRole
}

export const ProtectedRoute = ({ role }: Props) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="p-10">
        <SkeletonLoader count={3} />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
