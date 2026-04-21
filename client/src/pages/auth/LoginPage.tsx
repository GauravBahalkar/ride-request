import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { handleApiError } from '../../utils/handleApiError'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await login(email, password)
      navigate(from)
    } catch (err) {
      handleApiError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-stretch bg-white">
      {/* Left Side: Illustration & Branding */}
      <div className="relative hidden w-1/2 overflow-hidden bg-slate-900 lg:block">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Car" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between p-16 text-white">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-content-center rounded-2xl bg-indigo-600 text-xl font-black shadow-2xl shadow-indigo-500/40">R</div>
            <span className="text-3xl font-black tracking-tight">Ride-Request</span>
          </Link>
          
          <div className="space-y-10">
            <h2 className="text-5xl font-black leading-tight">
              Reinventing <br />
              <span className="text-indigo-400">Mobility Solutions.</span>
            </h2>
            <div className="space-y-6">
              {[
                { icon: <ShieldCheck className="text-emerald-400" />, text: 'Verified Listings & Documents' },
                { icon: <Zap className="text-amber-400" />, text: 'Instant Booking Confirmation' },
                { icon: <Globe className="text-blue-400" />, text: 'Available Across Major Cities' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-lg font-medium text-slate-300">
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm font-medium text-slate-500">
            © {new Date().getFullYear()} Ride-Request India. Professional Grade Vehicle Marketplace.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900">Welcome Back</h1>
            <p className="text-lg font-medium text-slate-500">Login to access your premium dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="email"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-2xl bg-indigo-600 text-lg font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98]"
            >
              {loading ? 'Authenticating...' : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight size={20} />
                </span>
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm font-medium text-slate-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-indigo-600 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
