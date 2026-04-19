import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export const NotFoundPage = () => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-extrabold text-slate-200">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-slate-900">Page not found</h2>
      <p className="mt-2 text-slate-500 text-lg max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="mt-8">
        <Button className="px-8 py-3">Go Home</Button>
      </Link>
    </section>
  )
}
