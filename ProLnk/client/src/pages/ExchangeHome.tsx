import { Link } from "wouter";
import {
  Briefcase, ArrowRight, Building2, DollarSign, Zap, CheckCircle,
  Users, TrendingUp, MapPin, Clock, Star, ShieldCheck, Bot, BadgeDollarSign,
} from "lucide-react";

const WHY_EXCHANGE = [
  {
    icon: <BadgeDollarSign className="w-6 h-6 text-amber-400" />,
    title: "No Bidding Fees",
    desc: "Submit bids on any job at zero cost. ProLnk earns only when a contract closes — your margin stays intact.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
    title: "Direct Contractor-to-Contractor",
    desc: "No layers, no middlemen. You negotiate directly with property managers, HOAs, and GCs who hold the budget.",
  },
  {
    icon: <Bot className="w-6 h-6 text-amber-400" />,
    title: "AI-Powered Matching",
    desc: "Our matching engine surfaces jobs that fit your trade, license class, capacity, and service area — before competitors see them.",
  },
];

const SUCCESS_STORIES = [
  {
    quote: "Landed a $78K roofing contract within 3 weeks of joining. The AI matched me to jobs I would have never found cold-calling.",
    name: "Marcus T.",
    trade: "Commercial Roofing",
    savings: "Saved $4,200 in referral fees",
  },
  {
    quote: "Exchange cut my lead acquisition cost by 60%. Every job I bid on is already scoped and budgeted — no tire kickers.",
    name: "Diana R.",
    trade: "HVAC — Commercial",
    savings: "12 contracts awarded",
  },
  {
    quote: "The multi-property contract I won through Exchange turned into $264K over 12 months. Best platform decision I've made.",
    name: "James K.",
    trade: "General Contractor",
    savings: "$264K in recurring revenue",
  },
];

const STATS = [
  { value: "2,847", label: "jobs posted" },
  { value: "$4.2M", label: "in contracts awarded" },
  { value: "1,200+", label: "active contractors" },
];

const CATEGORIES = [
  { label: "Roofing", icon: "🏠" },
  { label: "Plumbing", icon: "🔧" },
  { label: "HVAC", icon: "❄️" },
  { label: "Electrical", icon: "⚡" },
  { label: "Painting", icon: "🖌️" },
  { label: "Concrete", icon: "🏗️" },
  { label: "Landscaping", icon: "🌿" },
  { label: "General", icon: "🔨" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Post Job",
    desc: "Property managers, HOAs, and GCs post commercial scope with budget and timeline.",
    icon: <Briefcase className="w-6 h-6 text-amber-400" />,
  },
  {
    step: "02",
    title: "Receive Bids",
    desc: "Verified commercial-grade trade partners submit competitive bids directly.",
    icon: <Users className="w-6 h-6 text-amber-400" />,
  },
  {
    step: "03",
    title: "Award Contract",
    desc: "Review bids side-by-side, award the contract, and coordinate directly.",
    icon: <CheckCircle className="w-6 h-6 text-amber-400" />,
  },
  {
    step: "04",
    title: "Get Paid",
    desc: "ProLnk handles commission settlement. Brokers earn on every closed contract.",
    icon: <DollarSign className="w-6 h-6 text-amber-400" />,
  },
];

const FEATURED_JOBS = [
  {
    id: 1,
    title: "HVAC System Overhaul — 50-Unit Apartment Complex",
    company: "Synergy Property Group",
    location: "Plano, TX",
    budget: "$45K–$65K",
    bids: 3,
    urgency: "Urgent",
    trade: "HVAC",
  },
  {
    id: 2,
    title: "Strip Mall Roof Replacement — 14,000 sq ft",
    company: "Pinnacle Commercial Real Estate",
    location: "Garland, TX",
    budget: "$95K–$130K",
    bids: 5,
    urgency: "Active",
    trade: "Roofing",
  },
  {
    id: 3,
    title: "Multi-Property Maintenance — 8 Communities",
    company: "Keystone Property Management",
    location: "North DFW",
    budget: "$22K/mo",
    bids: 11,
    urgency: "Ongoing",
    trade: "General Contractor",
  },
];

const URGENCY_STYLES: Record<string, { bg: string; color: string }> = {
  Urgent: { bg: "rgba(239,68,68,0.12)", color: "#f87171" },
  Active: { bg: "rgba(34,197,94,0.12)", color: "#4ade80" },
  Ongoing: { bg: "rgba(99,102,241,0.15)", color: "#818cf8" },
};

function FeaturedJobCard({
  job,
}: {
  job: (typeof FEATURED_JOBS)[0];
}) {
  const style = URGENCY_STYLES[job.urgency] ?? URGENCY_STYLES.Active;
  return (
    <div
      className="rounded-2xl p-5 border flex flex-col gap-3 hover:border-amber-500/30 transition-colors"
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2"
            style={{ backgroundColor: style.bg, color: style.color }}
          >
            {job.urgency === "Urgent" && <Zap className="w-3 h-3" />}
            {job.urgency}
          </span>
          <h3 className="text-white font-bold text-sm leading-tight">{job.title}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
          {job.company}
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          {job.location}
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="text-white font-bold text-sm">{job.budget}</span>
        <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          <Users className="w-3.5 h-3.5" />
          {job.bids} bids
        </div>
      </div>
    </div>
  );
}

export default function ExchangeHome() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0A1628", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto">
        <Link href="/">
          <span className="text-white font-bold text-lg tracking-tight cursor-pointer">ProLnk</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/exchange/jobs">
            <span className="text-sm cursor-pointer transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
              Browse Jobs
            </span>
          </Link>
          <Link href="/exchange/my-bids">
            <span className="text-sm cursor-pointer transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
              My Bids
            </span>
          </Link>
          <Link href="/exchange/post">
            <button
              className="px-4 py-2 rounded-xl text-sm font-semibold text-[#0A1628] transition-all hover:opacity-90"
              style={{ backgroundColor: "#F59E0B" }}
            >
              Post a Job Free
            </button>
          </Link>
        </div>
      </nav>

      {/* Coming Soon Banner */}
      <div
        className="text-center py-2.5 text-xs font-semibold tracking-wider"
        style={{ backgroundColor: "#F59E0B", color: "#0A1628" }}
      >
        COMING Q3 2026 &nbsp;·&nbsp; DFW LAUNCH &nbsp;·&nbsp; PREVIEW LISTINGS BELOW
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{
            backgroundColor: "rgba(245,158,11,0.1)",
            color: "#F59E0B",
            borderColor: "rgba(245,158,11,0.3)",
          }}
        >
          <Briefcase className="w-3.5 h-3.5" />
          ProLnk Exchange — B2B Commercial Network
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
          The B2B Marketplace for<br />
          <span style={{ color: "#F59E0B" }}>Home Service Contractors</span>
        </h1>

        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
          GCs, property managers, and HOAs post large-scale commercial jobs.
          Verified trade contractors bid and win contracts. No cold calls. No middlemen.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <Link href="/exchange/jobs">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-[#0A1628] transition-all hover:scale-105"
              style={{ backgroundColor: "#F59E0B", boxShadow: "0 8px 32px rgba(245,158,11,0.35)" }}
            >
              Browse Open Jobs <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/exchange/post">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold border transition-all hover:scale-105"
              style={{
                borderColor: "rgba(245,158,11,0.4)",
                color: "#F59E0B",
                backgroundColor: "rgba(245,158,11,0.08)",
              }}
            >
              Post Your First Job Free
            </button>
          </Link>
        </div>

        {/* Stats Bar */}
        <div
          className="flex flex-wrap justify-center gap-8 md:gap-16 px-8 py-6 rounded-2xl border"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <p
          className="text-center text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Browse by Trade
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.label} href={`/exchange/jobs`}>
              <div
                className="rounded-2xl px-5 py-4 border cursor-pointer transition-all hover:border-amber-500/40 hover:bg-white/[0.06] flex items-center gap-3"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-white font-semibold text-sm">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <p
          className="text-center text-xs font-bold uppercase tracking-widest mb-10"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          How It Works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={i} className="relative">
              {i < HOW_IT_WORKS.length - 1 && (
                <div
                  className="hidden md:block absolute top-6 left-full w-full h-px z-0"
                  style={{ backgroundColor: "rgba(245,158,11,0.2)" }}
                />
              )}
              <div
                className="rounded-2xl p-5 border relative z-10"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
                >
                  {step.icon}
                </div>
                <div
                  className="text-xs font-bold mb-1"
                  style={{ color: "rgba(245,158,11,0.5)" }}
                >
                  {step.step}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why ProLnk Exchange */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <p
          className="text-center text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Why ProLnk Exchange?
        </p>
        <h2 className="text-white font-bold text-2xl text-center mb-10">
          Built for Contractors Who Mean Business
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WHY_EXCHANGE.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border flex flex-col gap-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(245,158,11,0.2)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <p
          className="text-center text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Contractor Success Stories
        </p>
        <h2 className="text-white font-bold text-2xl text-center mb-10">
          Real Wins from Real Contractors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SUCCESS_STORIES.map((story, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border flex flex-col gap-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed italic flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                "{story.quote}"
              </p>
              <div className="pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-white font-bold text-sm">{story.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{story.trade}</p>
                <span
                  className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "#4ade80" }}
                >
                  {story.savings}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Featured Jobs
            </p>
            <h2 className="text-white font-bold text-xl">Open Contracts Right Now</h2>
          </div>
          <Link href="/exchange/jobs">
            <button
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: "#F59E0B" }}
            >
              View All Jobs <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURED_JOBS.map((job) => (
            <FeaturedJobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
        <div
          className="rounded-2xl p-10 border"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            borderColor: "rgba(245,158,11,0.3)",
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
          >
            <TrendingUp className="w-7 h-7 text-amber-400" />
          </div>
          <h2 className="text-white font-bold text-2xl mb-3">
            Post Your First Job Free
          </h2>
          <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.5)" }}>
            First 100 commercial contractors get founding-member rates locked in.
            No spam — we'll contact you when your spot is ready in Q3 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/exchange/post">
              <button
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-base font-bold text-[#0A1628] transition-all hover:opacity-90"
                style={{ backgroundColor: "#F59E0B" }}
              >
                Post a Job <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/exchange/jobs">
              <button
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-base font-bold border transition-all hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
              >
                Browse Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div
        className="border-t text-center py-8 text-xs"
        style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}
      >
        &copy; 2026 ProLnk &mdash; ProLnk Exchange is a separate commercial network from the residential platform.
      </div>
    </div>
  );
}
