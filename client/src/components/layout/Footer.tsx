import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-slate-300">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-content-center rounded-xl bg-indigo-600 text-sm font-black text-white shadow-lg shadow-indigo-500/20">
                R
              </span>
              <span className="text-2xl font-black text-white tracking-tight">Ride-Request</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              India's most trusted marketplace for premium vehicle rentals. We verify every document so you can drive with absolute confidence.
            </p>
            {/* <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-content-center rounded-full bg-slate-800 transition-all hover:bg-indigo-600 hover:text-white">
                  <Icon size={18} />
                </a>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              {['About Us', 'Verified Listings', 'Pricing Plan', 'Our Fleet'].map((item) => (
                <li key={item}>
                  <Link to="#" className="transition-colors hover:text-indigo-400">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              {['Help Center', 'Safety Information', 'Cancellation Options', 'Trust & Safety'].map((item) => (
                <li key={item}>
                  <Link to="#" className="transition-colors hover:text-indigo-400">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-indigo-500" />
                <span>123 Tech Park, Financial District, Hyderabad, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-indigo-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-indigo-500" />
                <span>support@ride-request.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-800 pt-8 text-center text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Ride-Request India Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
