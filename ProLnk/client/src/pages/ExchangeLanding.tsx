import React from 'react';
import { useState } from "react";
import { Link } from "wouter";
import {
  Briefcase, Building2, DollarSign, Shield, Zap, ArrowRight,
  CheckCircle, Users, TrendingUp, Star, MapPin, Clock,
} from "lucide-react";

const FEATURE_CARDS = [
  {
    icon: <Building2 className="w-6 h-6 text-amber-400" />,
    title: "Post Commercial Jobs",
    desc: "Property managers, HOAs, and multi-site operators post large-scale commercial work directly to a curated network of vetted trade partners. Full scope, specs, and timeline in one place.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-amber-400" />,
    title: "Bid on Contracts",
    desc: "Verified commercial-grade pros submit competitive bids on jobs that match their trade and service area. No cold calling, no middlemen — just direct access to real commercial work.",
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Volume Pricing",
    desc: "Special commission rates for multi-unit and commercial operators. The more volume you bring, the better your economics. Built for operators running 10+ properties.",
  },
];

const AUDIENCES = [
  "General Contractors",
  "Property Managers",
  "HOAs",
  "Multi-Site Operators",
  "Commercial Brokers",
];

const TRUST_STATS = [
  { value: "$85K", label: "Avg commercial job value" },
  { value: "DFW", label: "Launch market — Q3 2026" },
  { value: "Vetted", label: "Commercial-only roster" },
];

export default function ExchangeLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto">
        <Link href="/">
          <span className="text-white font-bold text-lg tracking-tight cursor-pointer">ProLnk</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/exchange">
            <span className="text-white/60 hover:text-white text-sm cursor-pointer transition-colors">Partner Login</span>
          </Link>
          <a
            href="#early-access"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-[#0A1628] transition-all hover:opacity-90"
            style={{ backgroundColor: "#F59E0B" }}
          >
            Get Early Access
          </a>
        </div>
      </nav>

      {/* Status Banner */}
      <div className="text-center py-2.5 text-xs font-semibold tracking-wider" style={{ backgroundColor: "#F59E0B", color: "#0A1628" }}>
        COMING Q3 2026 &nbsp;·&nbsp; DFW LAUNCH &nbsp;·&nbsp; NOW ACCEPTING EARLY ACCESS APPLICATIONS
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#F59E0B", borderColor: "rgba(245,158,11,0.3)" }}>
          <Briefcase className="w-3.5 h-3.5" />
          ProLnk Exchange — Commercial
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
          The Commercial Job Board<br />
          <span style={{ color: "#F59E0B" }}>for Home Services</span>
        </h1>

        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
          Connect GCs, property managers, and HOAs with verified commercial-grade trade partners across DFW.
          High-value jobs. Vetted contractors. No cold calls.
        </p>

        {/* Audience pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {AUDIENCES.map((a) => (
            <span
              key={a}
              className="px-3 py-1.5 rounded-full text-sm font-medium border"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.15)" }}
            >
              {a}
            </span>
          ))}
        </div>

        {/* Trust stats */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-12">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/exchange/jobs">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-[#0A1628] transition-all hover:scale-105"
              style={{ backgroundColor: "#F59E0B", boxShadow: "0 8px 32px rgba(245,158,11,0.35)" }}
            >
              Browse Jobs <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/exchange/post">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold border transition-all hover:scale-105"
              style={{ borderColor: "rgba(245,158,11,0.4)", color: "#F59E0B", backgroundColor: "rgba(245,158,11,0.08)" }}
            >
              Post a Job
            </button>
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURE_CARDS.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
              >
                {card.icon}
              </div>
              <h3 className="text-white font-bold text-base mb-2">{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <p className="text-center text-xs font-bold uppercase tracking-widest mb-8" style={{ color: "rgba(255,255,255,0.3)" }}>
          How It Works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Post or Browse", desc: "Property managers post commercial jobs with full scope specs. Pros browse open contracts in their trade and service area." },
            { step: "02", title: "Submit a Bid", desc: "Verified commercial contractors submit competitive bids directly. You control pricing, timeline, and crew." },
            { step: "03", title: "Get Awarded", desc: "Job posters review bids, award the contract, and coordinate directly. ProLnk handles the commission settlement." },
          ].map((step) => (
            <div key={step.step} className="flex gap-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
              >
                {step.step}
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{step.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Early Access Form */}
      <section id="early-access" className="max-w-lg mx-auto px-6 pb-24">
        <div
          className="rounded-2xl p-8 border text-center"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(245,158,11,0.3)" }}
        >
          {submitted ? (
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: "rgba(245,158,11,0.15)" }}>
                <CheckCircle className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-xl">You're on the list.</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                We'll reach out when early access opens in DFW. Commercial network launches Q3 2026.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-white font-bold text-2xl mb-2">Get Early Access</h2>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                First 100 operators get founding-member rates locked in. No spam — we'll contact you when your spot is ready.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@business.com"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none border focus:border-amber-500 transition-colors"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.07)",
                    borderColor: "rgba(255,255,255,0.15)",
                  }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "#F59E0B" }}
                >
                  {submitting ? "Submitting..." : "Request Early Access"}
                </button>
              </form>
              <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                Commercial network · DFW launch · Q3 2026
              </p>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="border-t text-center py-8 text-xs" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}>
        &copy; 2026 ProLnk &mdash; ProLnk Exchange is a separate commercial network from the residential platform.
        &nbsp;
        <Link href="/exchange/commercial">
          <span className="underline cursor-pointer hover:text-white/50 transition-colors">TrustyPro Commercial</span>
        </Link>
      </div>
    </div>
  );
}
