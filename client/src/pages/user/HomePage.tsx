import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-800 px-4 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
            Find & Book Your Perfect Ride
          </h1>
          <p className="mb-8 text-lg text-indigo-100">
            Browse trusted vehicles from verified vendors. Request a booking in seconds.
          </p>
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-indigo-700 shadow-lg transition-colors hover:bg-indigo-50"
          >
            Browse Vehicles →
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {[
            {
              icon: '🔍',
              title: 'Browse Vehicles',
              desc: 'Explore available vehicles by type, location, and price.',
            },
            {
              icon: '📋',
              title: 'Send a Request',
              desc: 'Choose your dates and send a booking request to the vendor.',
            },
            {
              icon: '✅',
              title: 'Get Confirmed',
              desc: 'Vendor reviews and confirms your request. Ready to ride!',
            },
          ].map((step) => (
            <div key={step.title} className="flex flex-col items-center gap-3">
              <span className="text-5xl">{step.icon}</span>
              <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
