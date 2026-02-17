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
} from "react-icons/fi";
import LiveAvailability from "../components/LiveAvailability";

const capabilityCards = [
  {
    title: "Service Catalog",
    description:
      "Create different service types (Standard, Premium, Consultation) with custom durations and pricing.",
    icon: FiCalendar,
  },
  {
    title: "Client Management",
    description:
      "Automatically track all clients who book with you, view their history and contact information.",
    icon: FiDatabase,
  },
  {
    title: "Real-time Booking",
    description:
      "Clients can view your available slots and book instantly without back-and-forth emails.",
    icon: FiBell,
  },
  {
    title: "Owner Dashboard",
    description:
      "Monitor your bookings, manage your calendar, and track client activity from one central hub.",
    icon: FiShield,
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
        <header className="border-b border-[#101a36] pb-[72px] pt-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
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

            <div className="mx-auto mt-14 max-w-5xl rounded-3xl border border-white/10 bg-[#0a1122]/50 p-3 shadow-[0_45px_100px_rgba(1,4,25,0.9)] backdrop-blur-sm">
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

        <section id="features" className="border-b border-[#101a36] py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">
              Everything you need to manage bookings
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#95a5c2]">
              Built for professionals who value their time. No complexity, just results.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {capabilityCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-[#1a243e] bg-[#0b1325] p-5"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#121e3c] text-[#4b6cff]">
                    <card.icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#8ea0bf]">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="solutions" className="border-b border-[#101a36] py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
            <div>
              <h2 className="max-w-md text-4xl font-semibold leading-tight text-white">
                Perfect for service-based professionals.
              </h2>
              <div className="mt-8 space-y-3">
                {industryCards.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-2xl border border-[#1a243e] bg-[#0b1325] p-5"
                  >
                    <h3 className="text-base font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#8fa0bf]">
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {solutionTiles.map((tile) => (
                <article
                  key={tile.title}
                  className={`group relative overflow-hidden rounded-2xl border border-[#24304d] ${tile.className}`}
                >
                  <img
                    src={tile.image}
                    alt={tile.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />
                  <div className="absolute bottom-3 left-3 rounded-lg bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                    {tile.title}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="enterprise" className="border-b border-[#101a36] py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6f7e98]">
              Trusted by professionals worldwide
            </p>
            <div className="mx-auto mt-6 grid max-w-xl grid-cols-5 gap-2">
              {trustImages.map((image) => (
                <div
                  key={image}
                  className="h-11 overflow-hidden rounded-md border border-[#1f2b48] bg-[#091225]"
                >
                  <img
                    src={image}
                    alt="Trusted company"
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 grayscale"
                  />
                </div>
              ))}
            </div>

            <article className="mx-auto mt-8 rounded-3xl border border-[#1f2a46] bg-[#0b1325] px-6 py-10 shadow-[0_30px_80px_rgba(2,6,16,0.75)] sm:px-12">
              <p className="text-2xl text-[#3760ff]">,,</p>
              <blockquote className="mt-2 text-xl font-medium leading-8 text-white">
                "SmartScheduler eliminated the back-and-forth emails with clients. They just pick a time that works, and I show up. It's saved me hours every week."
              </blockquote>
              <div className="mt-7 flex items-center justify-center gap-3">
                <img
                  src="https://cdn.pixabay.com/photo/2015/06/11/11/39/businessman-805767_1280.jpg"
                  alt="Sarah Chen"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">Sarah Chen</p>
                  <p className="text-xs text-[#8da0c3]">Business Coach</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="live-slots" className="border-b border-[#101a36] py-20">
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

        <section id="pricing" className="scroll-mt-28 border-t border-[#1F2937]/50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
                Choose the plan that&apos;s right for your business. Whether
                you&apos;re a solo pro or a global enterprise, we&apos;ve got you
                covered.
              </p>

              <div className="mb-16 mt-12 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setAnnualBilling(false)}
                  className={`text-sm font-medium transition-colors ${
                    annualBilling ? "text-slate-400" : "text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setAnnualBilling((prev) => !prev)}
                  className="relative h-7 w-14 rounded-full bg-[#1F2937] p-1"
                  aria-label="Toggle annual billing"
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-[#1b1ee4] transition-all ${
                      annualBilling ? "right-1" : "left-1"
                    }`}
                  />
                </button>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      annualBilling ? "text-white" : "text-slate-400"
                    }`}
                  >
                    Annual
                  </span>
                  <span className="rounded-full bg-[#1b1ee4]/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4f67ff]">
                    Save 20%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
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

          <div className="mt-24 bg-slate-900/20 py-24">
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
