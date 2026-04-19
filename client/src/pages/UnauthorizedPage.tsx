import { useNavigate } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { Button } from '../components/ui/Button'

export const UnauthorizedPage = () => {
  const navigate = useNavigate()

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="rounded-full bg-rose-50 p-6 text-rose-500">
        <ShieldAlert size={64} />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-slate-900">Unauthorized Access</h1>
      <p className="mt-2 text-slate-500 text-lg max-w-md">
        You don't have permission to access this page. Please contact your administrator if you think this is a mistake.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => navigate(-1)} variant="secondary" className="px-8 py-3">
          Go Back
        </Button>
        <Button onClick={() => navigate('/')} className="px-8 py-3">
          Go Home
        </Button>
      </div>
    </section>
  )
}
