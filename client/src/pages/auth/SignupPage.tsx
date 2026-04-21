import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, Star } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { handleApiError } from '../../utils/handleApiError'
import { toast } from 'sonner'

export const SignupPage = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'customer' | 'vendor'>('customer')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await signup(name, email, password, role)
      toast.success('Account created successfully!')
      navigate(role === 'vendor' ? '/vendor' : '/')
    } catch (err) {
      handleApiError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-stretch bg-white">
      {/* Right Side: Onboarding Content (Mirrored for Signup) */}
      <div className="relative hidden w-1/2 overflow-hidden bg-slate-900 lg:block">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
            alt="Dashboard Preview" 
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
              Start Your <br />
              <span className="text-indigo-400">Journey Today.</span>
            </h2>
            <div className="space-y-8">
              {[
                { title: 'For Customers', desc: 'Book verified premium vehicles in seconds.' },
                { title: 'For Vendors', desc: 'List your fleet and grow your business.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-content-center rounded-full bg-indigo-500/20 text-indigo-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{item.title}</p>
                    <p className="text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 backdrop-blur-md border border-white/10">
             <div className="flex -space-x-3">
                {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/150?u=${i+20}`} className="h-10 w-10 rounded-full border-2 border-slate-900" />)}
             </div>
             <p className="text-sm font-medium text-slate-300">Join <span className="text-white font-bold">12k+</span> professionals today.</p>
          </div>
        </div>
      </div>

      {/* Left Side: Signup Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900">Get Started</h1>
            <p className="text-lg font-medium text-slate-500">Create your account to start listing or booking.</p>
          </div>

          {/* Role Switcher */}
          <div className="flex rounded-2xl bg-slate-100 p-1.5">
            <button
              onClick={() => setRole('customer')}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${role === 'customer' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Customer
            </button>
            <button
              onClick={() => setRole('vendor')}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${role === 'vendor' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Vendor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

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
                <label className="text-sm font-bold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-2xl bg-indigo-600 text-lg font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] mt-4"
            >
              {loading ? 'Creating Account...' : (
                <span className="flex items-center justify-center gap-2">
                  Create Account <ArrowRight size={20} />
                </span>
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm font-medium text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-indigo-600 hover:underline">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
