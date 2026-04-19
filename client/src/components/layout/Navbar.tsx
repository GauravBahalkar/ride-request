import { Link, NavLink, useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'

export const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-content-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
            R
          </span>
          <span className="text-lg font-semibold text-slate-900">RentDrive</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
          {(!user || user.role === 'customer') && (
            <>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `transition-colors hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/vehicles" 
                className={({ isActive }) => 
                  `transition-colors hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
                }
              >
                Vehicles
              </NavLink>
            </>
          )}

          {user?.role === 'customer' && (
            <>
              <NavLink 
                to="/my-requests" 
                className={({ isActive }) => 
                  `transition-colors hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
                }
              >
                My Requests
              </NavLink>
              <NavLink 
                to="/my-bookings" 
                className={({ isActive }) => 
                  `transition-colors hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
                }
              >
                My Bookings
              </NavLink>
            </>
          )}

          {user?.role === 'vendor' && (
            <NavLink 
              to="/vendor" 
              className={({ isActive }) => 
                `transition-colors hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NavLink to="/profile" className="hidden items-center gap-2 text-sm text-slate-700 md:flex">
                <User size={16} />
                <span>Profile</span>
              </NavLink>
              <Button onClick={handleLogout} variant="secondary" className="px-3 py-1.5 text-xs">
                Logout
              </Button>
            </>
          ) : (
            <>
              <div className="hidden items-center gap-2 text-sm text-slate-300 md:flex">
                <User size={16} />
                <span>Profile</span>
              </div>
              <Link to="/login" className="text-sm text-slate-700 hover:text-slate-900">
                Login
              </Link>
              <Link to="/signup">
                <Button className="px-3 py-1.5 text-xs">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
