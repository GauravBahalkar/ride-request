import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/ui/Button'
import type { UserRole } from '../../types/auth.types'
import { handleApiError } from '../../utils/handleApiError'

export const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('customer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      setLoading(true)
      setError('')
      const createdUser = await signup(name, email, password, role)
      navigate(createdUser.role === 'vendor' ? '/vendor' : '/')
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.')
      handleApiError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-enter mx-auto mt-12 max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Create account</h1>
      <p className="mb-6 text-sm text-slate-600">Join as a customer or vendor.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Full name"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
        <select
          value={role}
          onChange={(event) => setRole(event.target.value as UserRole)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Signup'}
        </Button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Already registered?{' '}
        <Link to="/login" className="font-medium text-slate-900">
          Login
        </Link>
      </p>
    </section>
  )
}
