import { Link } from 'react-router-dom'
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Smartphone, 
  Star, 
  ArrowRight,
  CheckCircle2,
  FileText,
  BadgeCheck,
  ShieldAlert,
  Zap
} from 'lucide-react'

export const HomePage = () => {
  return (
    <div className="page-enter bg-slate-50">
      {/* Hero Section - Sunny & Vibrant */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_sunny.png" 
            alt="Premium Car" 
            className="w-full h-full object-cover object-center"
          />
          {/* Lighter, more vibrant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-sm font-bold mb-6 shadow-sm">
              <Zap size={16} className="text-indigo-600 animate-pulse" />
              India's Most Trusted Vehicle Marketplace
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6">
              Drive with <br />
              <span className="text-indigo-600">Confidence.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg font-medium">
              Every vehicle on Ride-Request is manually verified with 100% authentic documents. Experience luxury without the risk.
            </p>
            
            <div className="flex">
              <Link
                to="/vehicles"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-indigo-200 transition-all hover:bg-indigo-700 hover:-translate-y-1 active:scale-95"
              >
                Browse Vehicles <ArrowRight size={20} />
              </Link>
            </div>

            {/* Verification Badges Teaser */}
            <div className="mt-12 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/50">
                <CheckCircle2 className="text-emerald-500" size={18} /> RC Verified
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/50">
                <CheckCircle2 className="text-emerald-500" size={18} /> Insurance Active
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/50">
                <CheckCircle2 className="text-emerald-500" size={18} /> PUC Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Verification Section - NEW & REALISTIC */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 lg:pr-10">
              <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-3">Unmatched Reliability</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                We Don't Just List. <br />
                <span className="text-indigo-600">We Verify Every Detail.</span>
              </h3>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                We take pride in our rigorous manual inspection of every vehicle's legal compliance. Our dedicated verification team ensures that every ride you book is safe, fully documented, and road-ready for your journey.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <FileText className="text-blue-600" />,
                    title: "RC (Registration Certificate)",
                    desc: "Ownership verification ensures the vehicle is legitimately listed by the rightful owner."
                  },
                  {
                    icon: <ShieldCheck className="text-emerald-600" />,
                    title: "Comprehensive Insurance",
                    desc: "We verify active insurance policies to protect you and the vehicle during your journey."
                  },
                  {
                    icon: <ShieldAlert className="text-amber-600" />,
                    title: "PUC & Fitness Certificate",
                    desc: "Only vehicles passing mandatory pollution and fitness tests are allowed on our platform."
                  }
                ].map((doc, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                      {doc.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{doc.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
               <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-100">
                  <img 
                    src="/images/safety.png" 
                    alt="Verification Process" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 glass-morphism px-5 py-3 rounded-2xl flex items-center gap-3">
                    <div className="bg-emerald-500 rounded-full p-1">
                      <BadgeCheck size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm italic">Verified by Experts</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 relative">
              <img 
                src="/images/booking.png" 
                alt="Booking App" 
                className="relative z-10 rounded-[2.5rem] shadow-2xl border-8 border-white floating"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">
                The Smartest Way <br /> 
                <span className="text-indigo-600">To Travel Premium</span>
              </h2>
              <ul className="space-y-6">
                {[
                  'Zero Hidden Charges - Pay what you see',
                  'Verified Host Profiles for every listing',
                  'Flexible Pickup & Drop-off locations',
                  'Direct In-app communication with Vendors'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-slate-700 font-medium">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <CheckCircle2 className="text-indigo-600" size={16} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-12">
                <Link
                  to="/vehicles"
                  className="inline-flex items-center gap-3 font-black text-indigo-600 hover:text-indigo-700 transition-colors group text-lg"
                >
                  See Available Vehicles <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 text-center">
           <div className="max-w-2xl mx-auto mb-12">
             <div className="flex justify-center gap-1 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} fill="#fbbf24" className="text-amber-400" size={24} />)}
             </div>
             <p className="text-3xl font-bold text-slate-900 leading-snug">
               "Renting a car used to be a gamble. With Ride-Request, I know I'm getting a legal, well-maintained vehicle every single time."
             </p>
             <div className="mt-8 flex items-center justify-center gap-3">
               <img src="https://i.pravatar.cc/150?u=4" alt="User" className="w-12 h-12 rounded-full border-2 border-indigo-100" />
               <div className="text-left">
                 <p className="font-bold text-slate-900">Vikram Malhotra</p>
                 <p className="text-sm text-slate-500">Premium Explorer</p>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
             <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
               Don't Settle for Less. <br />
               <span className="text-indigo-400">Book Your Dream Ride.</span>
             </h2>
             <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
               Join 12,000+ users who trust Ride-Request for their high-end mobility needs. Authentic cars, authentic documents.
             </p>
             <div className="flex justify-center">
               <Link
                 to="/vehicles"
                 className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-12 py-5 text-lg font-black text-indigo-600 transition-all hover:bg-indigo-50 hover:-translate-y-1 shadow-xl shadow-white/10"
               >
                 Explore Now
               </Link>
             </div>
          </div>
        </div>
      </section>

    </div>
  )
}
