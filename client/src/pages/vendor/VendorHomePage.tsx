import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Wallet, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Car,
  MessageSquare,
  Zap,
  Globe,
  Award
} from 'lucide-react'

export const VendorHomePage = () => {
  return (
    <div className="page-enter bg-white">
      {/* Hero Section - Business Focused */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
        {/* Abstract Background Patterns */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold mb-8">
                <TrendingUp size={16} />
                Scale Your Rental Fleet Today
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
                Your Vehicles. <br />
                <span className="text-indigo-400">Our Platform.</span> <br />
                Limitless Growth.
              </h1>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl font-medium">
                Join India's most trusted premium vehicle marketplace. Reach thousands of verified customers and manage your business with enterprise-grade tools.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  to="/vendor"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-indigo-900/20 transition-all hover:bg-indigo-700 hover:-translate-y-1 active:scale-95"
                >
                  Manage My Fleet <ArrowRight size={20} />
                </Link>
                <div className="flex -space-x-3 items-center ml-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                      className="w-10 h-10 rounded-full border-2 border-slate-900 shadow-xl"
                      alt="Vendor"
                    />
                  ))}
                  <div className="pl-6 text-sm text-slate-500 font-medium italic">
                    Joined by 500+ premium vendors
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative hidden lg:block">
               <div className="relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[3rem] border border-slate-700 shadow-3xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                        <BarChart3 size={20} className="text-white" />
                      </div>
                      <span className="font-bold text-white">Monthly Analytics</span>
                    </div>
                    <span className="text-emerald-400 text-sm font-bold bg-emerald-400/10 px-3 py-1 rounded-full">+24%</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Total Bookings', value: '142', color: 'bg-blue-500' },
                      { label: 'Revenue Generated', value: '₹4.2L', color: 'bg-indigo-500' },
                      { label: 'Active Fleet', value: '18', color: 'bg-emerald-500' }
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>
               </div>
               {/* Floating Badges */}
               <div className="absolute -top-6 -right-6 glass-morphism p-4 rounded-2xl shadow-2xl animate-bounce-slow">
                 <Zap className="text-amber-400 mb-1" size={24} />
                 <p className="text-xs font-bold text-slate-900">Instant Verification</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why List With Us - Benefits */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center mb-20">
          <h2 className="text-indigo-600 font-black tracking-widest uppercase text-sm mb-4">Why Ride-Request?</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900">
            More Bookings. <span className="text-indigo-600 text-opacity-80 italic">Zero Headaches.</span>
          </h3>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="text-blue-600" />,
                title: "Verified Customer Base",
                desc: "We manually verify every customer's DL and identity. Rent only to high-intent, trustworthy individuals."
              },
              {
                icon: <ShieldCheck className="text-emerald-600" />,
                title: "Asset Protection",
                desc: "Every booking includes security protocols and direct communication. We value your vehicles as much as you do."
              },
              {
                icon: <Wallet className="text-indigo-600" />,
                title: "Timely Payouts",
                desc: "No more chasing payments. Our automated billing ensures your earnings are deposited directly to your bank account."
              },
              {
                icon: <Globe className="text-purple-600" />,
                title: "Massive Visibility",
                desc: "Leverage our marketing engine to keep your fleet booked. We handle the SEO and advertising for you."
              },
              {
                icon: <MessageSquare className="text-amber-600" />,
                title: "Vendor Support",
                desc: "Dedicated account managers to help you optimize your listings, pricing, and business growth."
              },
              {
                icon: <Award className="text-rose-600" />,
                title: "Vendor Recognition",
                desc: "Build your reputation with our rating system. Top-rated vendors get featured at the top of search results."
              }
            ].map((benefit, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4">{benefit.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              Start Earning in <br />
              <span className="text-indigo-600 italic">3 Simple Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Line (Hidden on Mobile) */}
            <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-indigo-100 -z-0"></div>
            
            {[
              {
                step: "01",
                title: "List Your Vehicle",
                desc: "Upload photos, set your price, and describe the features of your premium vehicle."
              },
              {
                step: "02",
                title: "Get Verified",
                desc: "Our team quickly verifies your RC and insurance documents to maintain platform quality."
              },
              {
                step: "03",
                title: "Accept & Earn",
                desc: "Receive booking requests, approve them, and watch your business grow every day."
              }
            ].map((step, i) => (
              <div key={i} className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-xl shadow-indigo-200 mb-8">
                  {step.step}
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h4>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Enterprise-Grade <br />
                <span className="text-indigo-600">Management Dashboard</span>
              </h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                Our vendor dashboard gives you total control. Track your earnings, manage booking requests, and update vehicle availability with just one click.
              </p>
              <div className="grid gap-4 mb-10">
                {[
                  'Real-time booking notifications',
                  'Interactive revenue charts',
                  'Easy document management',
                  'Performance analytics for each vehicle'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-900 font-bold">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                to="/vendor"
                className="inline-flex items-center gap-3 font-black text-indigo-600 hover:text-indigo-700 transition-colors group text-lg"
              >
                Go to Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-indigo-600/10 rounded-full blur-[100px] scale-150"></div>
              <img 
                src="/images/vendor_dash.png" 
                alt="Dashboard Preview" 
                className="relative z-10 rounded-[2.5rem] shadow-4xl border-8 border-white floating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] border-[40px] border-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-[300px] h-[300px] border-[20px] border-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10">
            Ready to become a <br /> Ride-Request Partner?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/vendor"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-12 py-6 text-xl font-black text-indigo-600 transition-all hover:bg-slate-50 hover:-translate-y-1 shadow-2xl"
            >
              Get Started Now
            </Link>
            <a 
              href="#"
              className="text-white/80 font-bold hover:text-white transition-colors"
            >
              Contact Sales Support
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
