import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FiCalendar,
  FiDatabase,
  FiBell,
  FiShield,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiLayers,
  FiActivity,
  FiZap,
  FiTrendingUp,
} from "react-icons/fi";
import LiveAvailability from "../components/LiveAvailability";
import heroBg from "../assets/hero-bg-final.jpg";

const capabilityCards = [
  {
    title: "Service Catalog",
    description: "Create different service types (Standard, Premium, Consultation) with custom durations and pricing.",
    icon: FiLayers,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    glow: "shadow-[0_0_20px_rgba(96,165,250,0.4)]",
  },
  {
    title: "Client Tracking",
    description: "Automatically track all clients who book with you, view their history and contact information.",
    icon: FiActivity,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    glow: "shadow-[0_0_20px_rgba(52,211,153,0.4)]",
  },
  {
    title: "Real-time Booking",
    description: "Clients can view your available slots and book instantly without back-and-forth emails.",
    icon: FiZap,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.4)]",
  },
  {
    title: "Owner Insights",
    description: "Monitor your bookings, manage your calendar, and track client activity from one central hub.",
    icon: FiTrendingUp,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    glow: "shadow-[0_0_20px_rgba(167,139,250,0.4)]",
  },
];

const industryCards = [
  {
    title: "Consultants & Coaches",
    description:
      "Perfect for 1-on-1 sessions. Create multiple service tiers and let clients book directly.",
  },
  {
    title: "Therapists & Counselors",
    description:
      "Manage your practice with ease. Track client sessions and maintain appointment history.",
  },
  {
    title: "Freelancers & Creatives",
    description:
      "Offer discovery calls, project kickoffs, and consultations without the scheduling hassle.",
  },
];

const solutionTiles = [
  {
    title: "Consulting",
    image: "https://cdn.pixabay.com/photo/2020/07/11/23/36/meeting-5395615_1280.jpg",
    className: "h-44",
  },
  {
    title: "Salon",
    image: "https://cdn.pixabay.com/photo/2016/12/21/15/13/salon-1923165_1280.jpg",
    className: "h-44",
  },
  {
    title: "Medical",
    image: "https://cdn.pixabay.com/photo/2014/11/27/20/15/treatment-room-548143_1280.jpg",
    className: "h-32",
  },
  {
    title: "Tech Teams",
    image: "https://cdn.pixabay.com/photo/2024/07/25/23/56/interior-design-8922414_1280.jpg",
    className: "h-56",
  },
];

const trustImages = [
  "https://cdn.pixabay.com/photo/2017/10/01/00/52/home-office-2804083_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/03/23/21/07/workspace-4962107_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/08/10/21/06/medical-5478792_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/06/11/11/39/businessman-805767_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/07/11/23/36/meeting-5395615_1280.jpg",
];

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individual freelancers and consultants.",
    monthly: "$0",
    annual: "$0",
    suffix: "/mo",
    button: "Get Started Free",
    highlight: false,
    note: "",
    features: [
      "1 User Seat",
      "Basic AI Scheduling",
      "Standard Integrations",
      "Up to 3 Calendars",
    ],
  },
  {
    name: "Professional",
    description: "Scale your business with advanced automation tools.",
    monthly: "$30",
    annual: "$24",
    suffix: "/mo",
    button: "Upgrade Now",
    highlight: true,
    note: "Billed annually ($288/yr)",
    features: [
      "Up to 5 User Seats",
      "Advanced AI Forecasting",
      "Full CRM Integration",
      "Custom Branding",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    description: "Custom features and security for large organizations.",
    monthly: "Custom",
    annual: "Custom",
    suffix: "",
    button: "Contact Sales",
    highlight: false,
    note: "",
    features: [
      "Unlimited User Seats",
      "Advanced Security & SSO",
      "API Access & Webhooks",
      "Dedicated Account Manager",
    ],
  },
];

const pricingComparison = [
  { feature: "Automatic Scheduling", starter: "check", pro: "check", enterprise: "check" },
  { feature: "AI Optimization Engine", starter: "-", pro: "check", enterprise: "check" },
  { feature: "Custom Branding", starter: "-", pro: "check", enterprise: "check" },
  { feature: "Admin Dashboard", starter: "-", pro: "Basic", enterprise: "check" },
  { feature: "Multi-factor Authentication", starter: "-", pro: "-", enterprise: "check" },
  { feature: "24/7 Dedicated Support", starter: "-", pro: "-", enterprise: "check" },
];

const pricingFaqs = [
  {
    q: "Can I upgrade or downgrade my plan later?",
    a: "Yes, you can change your plan at any time. When you upgrade, the changes are applied immediately. When you downgrade, the new rate will apply at the start of your next billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers. All payments are processed through our secure encryption layers.",
  },
  {
    q: "Do you offer a free trial for the Pro plan?",
    a: "Yes! You can try our Professional plan features for free for 14 days. No credit card is required to start your trial.",
  },
  {
    q: "Is my data secure?",
    a: "Security is our top priority. We are SOC2 Type II compliant and use industry-standard AES-256 encryption to protect your scheduling data and account details.",
  },
];

const Home = () => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030714] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,84,255,0.32)_0%,rgba(3,7,20,0)_68%)]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(180deg,#040918_0%,#020510_100%)]" />
      </div>

      <main className="relative z-10">
        <div className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300" 
             style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(29, 78, 216, 0.06), transparent 80%)' }} />
        
        <header className="relative border-b border-[#101a36] pb-16 pt-24 overflow-hidden">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img 
              src={heroBg} 
              alt="" 
              className="h-full w-full object-cover opacity-100 brightness-110"
            />
            {/* No Overlays - 100% As Is per user request */}
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center rounded-full border border-[#2453ff]/70 bg-[#08143a] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7ea0ff]">
              Simple. Professional. Effective.
            </div>

            <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.06] text-white sm:text-5xl lg:text-[66px]">
              Your clients book. <span className="text-[#2a48ff]">You focus</span> on your work.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#93a0bb] sm:text-base">
              SmartScheduler is a booking platform for professionals. Create your availability, share your link, and let clients book instantly—no more email ping-pong.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-[#3d63ff] bg-gradient-to-b from-[#2f56ff] to-[#1e3eff] px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(35,73,255,0.35)] transition hover:brightness-110"
              >
                Get Started for Free
              </Link>
              <Link
                to="/login"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-[#2a3248] bg-[#0b1120] px-7 py-3 text-sm font-semibold text-white transition hover:border-[#3f4f78] hover:bg-[#0f172a]"
              >
                Book a Live Demo
              </Link>
            </div>

            <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-white/10 bg-[#0a1122]/50 p-3 shadow-[0_45px_100px_rgba(1,4,25,0.9)] backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[22px] border border-white/5 bg-[#030712] p-8 md:p-16">
                {/* Background Glows */}
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />
                <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-600/10 blur-[100px]" />

                <div className="relative mx-auto max-w-lg rounded-2xl border border-white/10 bg-[#0a1122]/80 p-6 shadow-2xl backdrop-blur-md">
                  <div className="mb-6 border-b border-white/10 pb-5 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold tracking-tight text-white">
                        Product Designers
                      </p>
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-slate-400">
                        <FiChevronDown />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                      Global Team Availability
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Weekly booking sync", status: "active", color: "bg-emerald-500" },
                      { label: "Availability optimization", status: "pending", color: "bg-blue-500" },
                      { label: "Client data insights", status: "active", color: "bg-emerald-500" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left transition hover:bg-white/[0.05]"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-2.5 w-2.5 rounded-full ${item.color} shadow-[0_0_8px_rgba(16,185,129,0.5)]`} />
                          <p className="text-sm font-medium text-slate-200">{item.label}</p>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Floating Badges */}
                  <div className="absolute -left-12 bottom-12 hidden rounded-2xl border border-white/10 bg-[#0d152b]/90 p-5 shadow-2xl backdrop-blur-xl md:block animate-bounce-slow">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                        <FiCheckCircle className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          Session Rate
                        </p>
                        <p className="text-lg font-bold text-white">98.4%</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -right-16 top-12 hidden rounded-2xl border border-white/10 bg-[#0d152b]/95 p-5 shadow-2xl backdrop-blur-xl md:block animate-float">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                        <FiCalendar className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          Bookings
                        </p>
                        <p className="text-lg font-bold text-white">+24.5k</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="problem" className="border-b border-[#101a36] py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Problem Side */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-rose-400 mb-4">
                  The Problem
                </p>
                <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
                  Stop playing calendar tennis
                </h2>
                <div className="space-y-4 text-slate-300">
                  <p className="text-base leading-relaxed">
                    You're a professional. Your time is valuable. Yet you spend <span className="font-bold text-white">5-10 hours every week</span> on email ping-pong just trying to schedule appointments:
                  </p>
                  
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2 text-sm">
                    <p className="text-slate-400 italic">"Are you free Tuesday at 2pm?"</p>
                    <p className="text-slate-400 italic">"No, how about Wednesday at 3pm?"</p>
                    <p className="text-slate-400 italic">"That doesn't work, what about Thursday?"</p>
                    <p className="text-xs text-rose-400 font-semibold mt-3">
                      → 3 days and 8 emails later...
                    </p>
                  </div>

                  <p className="text-base leading-relaxed">
                    Meanwhile, you're juggling spreadsheets, double-bookings, and lost client info. It's exhausting.
                  </p>
                </div>
              </div>

              {/* Solution Side */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-400 mb-4">
                  The Solution
                </p>
                <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
                  One link. Instant bookings.
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <FiCheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Share Your Link</h3>
                      <p className="text-sm text-slate-400">
                        Send clients your SmartScheduler link. They see your real-time availability.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <FiCheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">They Pick a Time</h3>
                      <p className="text-sm text-slate-400">
                        Clients choose from your available slots. No back-and-forth. No confusion.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <FiCheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">You Show Up</h3>
                      <p className="text-sm text-slate-400">
                        Booking confirmed. Calendar updated. Client info saved. Done.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <p className="text-sm font-semibold text-emerald-400">
                      Result: Reclaim 5-10 hours per week. Zero scheduling stress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-b border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                The smart way to <span className="text-[#3b59ff]">manage your time</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
                Built for professionals who value their time. No complexity, just results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-full">
              {/* Large Feature 1 */}
              {(() => {
                const Icon = capabilityCards[0].icon;
                return (
                  <article className="md:col-span-4 md:row-span-1 group relative rounded-3xl border border-white/10 bg-[#0a1122]/40 p-8 hover:bg-[#0a1122]/60 transition-all duration-500 shadow-2xl overflow-hidden backdrop-blur-sm">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${capabilityCards[0].bg} ${capabilityCards[0].color} ${capabilityCards[0].glow} mb-6 transition-transform group-hover:scale-110 duration-500`}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-3">{capabilityCards[0].title}</h3>
                        <p className="text-slate-400 text-base leading-relaxed max-w-md">
                          {capabilityCards[0].description}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#3b59ff] group-hover:translate-x-1 transition-transform">
                        <span>Explore Catalog</span>
                        <span>→</span>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                  </article>
                );
              })()}

              {/* Small Feature 1 */}
              {(() => {
                const Icon = capabilityCards[1].icon;
                return (
                  <article className="md:col-span-2 md:row-span-1 group relative rounded-3xl border border-white/10 bg-[#0a1122]/40 p-8 hover:bg-[#0a1122]/60 transition-all duration-500 backdrop-blur-sm">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${capabilityCards[1].bg} ${capabilityCards[1].color} mb-6 transition-transform group-hover:rotate-12`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{capabilityCards[1].title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {capabilityCards[1].description}
                    </p>
                  </article>
                );
              })()}

              {/* Small Feature 2 */}
              {(() => {
                const Icon = capabilityCards[2].icon;
                return (
                  <article className="md:col-span-2 md:row-span-1 group relative rounded-3xl border border-white/10 bg-[#0a1122]/40 p-8 hover:bg-[#0a1122]/60 transition-all duration-500 backdrop-blur-sm">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${capabilityCards[2].bg} ${capabilityCards[2].color} mb-6 transition-transform group-hover:scale-110`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{capabilityCards[2].title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {capabilityCards[2].description}
                    </p>
                  </article>
                );
              })()}

              {/* Large Feature 2 */}
              {(() => {
                const Icon = capabilityCards[3].icon;
                return (
                  <article className="md:col-span-4 md:row-span-1 group relative rounded-3xl border border-white/10 bg-[#0a1122]/40 p-8 hover:bg-[#0a1122]/60 transition-all duration-500 shadow-2xl overflow-hidden backdrop-blur-sm">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${capabilityCards[3].bg} ${capabilityCards[3].color} ${capabilityCards[3].glow} mb-6 transition-transform group-hover:scale-110 duration-500`}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-3">{capabilityCards[3].title}</h3>
                        <p className="text-slate-400 text-base leading-relaxed max-w-md">
                          {capabilityCards[3].description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
                  </article>
                );
              })()}
            </div>
          </div>
        </section>

        <section id="solutions" className="border-b border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-bold leading-tight text-white mb-8">
                  Designed for <span className="text-[#3b59ff]">every industry</span> that values time.
                </h2>
                <div className="space-y-6">
                  {industryCards.map((card, idx) => (
                    <article
                      key={idx}
                      className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3b59ff]/10 text-[#3b59ff] group-hover:scale-110 transition-transform">
                          <span className="text-sm font-bold">{idx + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">
                            {card.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-400">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {solutionTiles.map((tile, idx) => (
                  <article
                    key={idx}
                    className={`group relative overflow-hidden rounded-[2rem] border border-white/10 ${tile.className} shadow-2xl`}
                  >
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030714] via-[#030714]/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                        <p className="text-sm font-bold tracking-widest text-[#3b59ff] uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Solution
                        </p>
                        <h4 className="text-xl font-bold text-white">
                          {tile.title}
                        </h4>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="social-proof" className="border-b border-white/5 py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-12">
              Trusted by 10,000+ top-tier professionals
            </p>
            
            {/* Logo Marquee */}
            <div className="pause-on-hover relative flex w-full flex-col items-center justify-center overflow-hidden">
              <div className="flex animate-marquee gap-12 whitespace-nowrap lg:gap-24 items-center">
                {[...trustImages, ...trustImages].map((image, idx) => (
                  <div key={idx} className="h-10 w-24 shrink-0 overflow-hidden lg:h-12 lg:w-32">
                    <img
                      src={image}
                      alt="Trusted brand"
                      className="h-full w-full object-contain opacity-30 grayscale brightness-200 transition-opacity hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
              {/* Fade masks */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030714] to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030714] to-transparent z-10" />
            </div>

            <div className="mt-24 mx-auto max-w-4xl">
              <article className="group relative rounded-[40px] border border-white/10 bg-[#0a1122]/50 p-12 lg:p-16 shadow-2xl backdrop-blur-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b59ff]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-8 flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl font-semibold leading-relaxed text-white md:text-3xl italic">
                    "SmartScheduler eliminated the back-and-forth emails. They just pick a time that works, and I show up. It's saved me <span className="text-[#3b59ff]">8 hours every single week</span>."
                  </blockquote>

                  <div className="mt-12 flex items-center gap-4">
                    <div className="relative">
                      <img
                        src="https://cdn.pixabay.com/photo/2015/06/11/11/39/businessman-805767_1280.jpg"
                        alt="Sarah Chen"
                        className="h-14 w-14 rounded-full object-cover border-2 border-white/10 transition-transform group-hover:scale-110 duration-500"
                      />
                      <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white shadow-lg border-2 border-[#030714]">
                        ✓
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-white">Sarah Chen</p>
                      <p className="text-sm font-medium text-slate-500">Business Coach & Consultant</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="live-slots" className="border-b border-[#101a36] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6f7e98]">
                Book Instantly
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Available Slots This Week
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-[#95a5c2]">
                Don't wait. Secure your spot with our top consultants right now.
              </p>
            </div>

            <LiveAvailability />
          </div>
        </section>

        <section id="pricing" className="py-24 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                Simple, <span className="text-blue-500">transparent</span> pricing.
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Choose the plan that's right for your business. All plans include our core booking engine.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl border p-8 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 ${
                    plan.highlight
                      ? "scale-[1.03] border-[#1b1ee4] bg-white/[0.03] ring-4 ring-[#1b1ee4]/10"
                      : "border-white/8 bg-white/[0.03]"
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#1b1ee4] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Most Popular
                    </span>
                  )}

                  {plan.highlight && (
                    <span className="pointer-events-none absolute -z-10 left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(27,30,228,0.15)_0%,transparent_70%)]" />
                  )}

                  <div className="mb-8">
                    <h3 className="mb-2 text-xl font-bold text-white">{plan.name}</h3>
                    <p className="mb-6 text-sm text-slate-400">{plan.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">
                        {annualBilling ? plan.annual : plan.monthly}
                      </span>
                      {plan.suffix && (
                        <span className="text-sm text-slate-500">{plan.suffix}</span>
                      )}
                    </div>
                    {plan.note && annualBilling && (
                      <p className="mt-1 text-xs font-medium text-[#4f67ff]">
                        {plan.note}
                      </p>
                    )}
                  </div>

                  <div className="mb-10 flex-grow space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <FiCheckCircle className="h-4 w-4 text-[#1b1ee4]" />
                        <span
                          className={`text-sm ${
                            plan.highlight ? "font-medium" : "font-normal"
                          }`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={`w-full rounded-lg py-3 text-sm font-semibold transition-all ${
                      plan.highlight
                        ? "bg-[#1b1ee4] text-white shadow-lg shadow-[#1b1ee4]/20 hover:bg-[#1b1ee4]/90"
                        : "border border-[#1F2937] text-white hover:bg-white/5"
                    }`}
                  >
                    {plan.button}
                  </button>
                </article>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-24 max-w-7xl px-6">
            <h3 className="mb-16 text-center text-4xl font-bold text-white">
              Compare detailed features
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-[#1F2937]">
                    <th className="w-1/4 px-4 py-6 text-left text-sm font-medium uppercase tracking-wider text-slate-400">
                      Features
                    </th>
                    <th className="w-1/4 px-4 py-6 text-center text-sm font-semibold text-white">
                      Starter
                    </th>
                    <th className="w-1/4 px-4 py-6 text-center text-sm font-semibold text-white">
                      Professional
                    </th>
                    <th className="w-1/4 px-4 py-6 text-center text-sm font-semibold text-white">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F2937]/30">
                  {pricingComparison.map((row) => (
                    <tr key={row.feature}>
                      <td className="px-4 py-6 text-sm font-medium text-white">
                        {row.feature}
                      </td>
                      <td className="px-4 py-6 text-center text-sm text-slate-400">
                        {row.starter === "check" ? (
                          <FiCheck className="mx-auto h-4 w-4 text-[#1b1ee4]" />
                        ) : (
                          row.starter
                        )}
                      </td>
                      <td className="px-4 py-6 text-center text-sm text-slate-400">
                        {row.pro === "check" ? (
                          <FiCheck className="mx-auto h-4 w-4 text-[#1b1ee4]" />
                        ) : (
                          row.pro
                        )}
                      </td>
                      <td className="px-4 py-6 text-center text-sm text-slate-400">
                        {row.enterprise === "check" ? (
                          <FiCheck className="mx-auto h-4 w-4 text-[#1b1ee4]" />
                        ) : (
                          row.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-16 bg-slate-900/20 py-20">
            <div className="mx-auto max-w-3xl px-6">
              <h3 className="mb-12 text-center text-4xl font-bold text-white">
                Frequently Asked Questions
              </h3>
              <div className="space-y-0">
                {pricingFaqs.map((item, index) => (
                  <article
                    key={item.q}
                    className={`border-b border-[#1F2937] ${
                      index === 0 ? "pb-6" : "py-6"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqIndex((prev) => (prev === index ? null : index))
                      }
                      className="group flex w-full items-center justify-between text-left transition-colors hover:text-[#1b1ee4]"
                    >
                      <span className="text-lg font-medium text-white">
                        {item.q}
                      </span>
                      <FiChevronDown
                        className={`h-4 w-4 text-slate-500 transition-all group-hover:text-[#1b1ee4] ${
                          openFaqIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaqIndex === index && (
                      <p className="mt-4 text-sm leading-relaxed text-slate-400">
                        {item.a}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#101a36] pb-10 pt-12">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 text-[#7f8da7] sm:px-6 lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] lg:px-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#2b49ff] text-xs font-bold text-white">
                  S
                </span>
                <span className="text-sm font-semibold text-white">SmartScheduler</span>
              </div>
              <p className="mt-4 max-w-xs text-xs leading-6">
                The most advanced scheduling engine for professionals who scale
                their time.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#29385a]">
                  t
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#29385a]">
                  in
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                Platform
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Features</li>
                <li>Integrations</li>
                <li>Enterprise</li>
                <li>Solutions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                Resources
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Community</li>
                <li>Blogs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                Company
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press Kit</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                Legal
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>GDPR</li>
                <li>Cookie Settings</li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-[#101a36] px-4 pt-6 text-xs text-[#65748f] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} SmartScheduler. All rights reserved.</p>
            <p>All systems operational.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
