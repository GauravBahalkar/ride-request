import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { useAuth } from '../hooks/useAuth'
import { LoginPage } from '../pages/auth/LoginPage'
import { SignupPage } from '../pages/auth/SignupPage'
import { BookingConfirmPage } from '../pages/user/BookingConfirmPage'
import { HomePage } from '../pages/user/HomePage'
import VehiclesPage from '../pages/user/VehiclesPage'
import { ProfilePage } from '../pages/user/ProfilePage'
import { UserDashboardPage } from '../pages/user/UserDashboardPage'
import MyRequestsPage from '../pages/user/MyRequestsPage'
import MyBookingsPage from '../pages/user/MyBookingsPage'
import { VehicleDetailsPage } from '../pages/user/VehicleDetailsPage'
import { VendorDashboardPage } from '../pages/vendor/VendorDashboardPage'
import { VendorHomePage } from '../pages/vendor/VendorHomePage'
import { ProtectedRoute } from './ProtectedRoute'

import { UnauthorizedPage } from '../pages/UnauthorizedPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const AppRoutes = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={
          user ? <Navigate to="/" /> : <SignupPage />
        }
      />

      <Route element={<AppLayout />}>
        <Route path="/" element={user?.role === 'vendor' ? <VendorHomePage /> : <HomePage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/vehicles/:vehicleId" element={<VehicleDetailsPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="customer" />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/my-requests" element={<MyRequestsPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/booking/confirm" element={<BookingConfirmPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="vendor" />}>
        <Route element={<AppLayout />}>
          <Route path="/vendor" element={<VendorDashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
