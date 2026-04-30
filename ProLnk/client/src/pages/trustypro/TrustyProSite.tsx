/**
 * TrustyPro.io Full Website
 *
 * The standalone homeowner-facing product site.
 * Lives at trustypro.io (and /trustypro on prolnk.io for now).
 *
 * Sections:
 *   - Hero: "Your home deserves a checkup"
 *   - How it works (photos → AI analysis → verified pros)
 *   - Home Health Score explainer
 *   - Home Passport feature
 *   - Scout assessment service
 *   - Testimonials
 *   - Waitlist CTA
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import {
  Home, Camera, Shield, Star, FileText, Zap, Clock,
  CheckCircle, ArrowRight, ChevronRight, Heart, TrendingUp,
  DollarSign, Search, Lock, BarChart3, Phone, Mail,
} from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: <Camera className="w-8 h-8 text-indigo-400" />,
    title: "Upload photos or let us extract them",
    description: "Take photos of any room or system. Or — connect a verified service professional's account and we extract their job photos automatically. No hassle.",
  },
  {
    step: "02",
    icon: <Search className="w-8 h-8 text-indigo-400" />,
    title: "AI analyzes every detail",
    description: "Our AI scans every photo for 50+ issue types across your roof, HVAC, electrical, plumbing, and more. You get a clear health report with cost estimates.",
  },
  {
    step: "03",
    icon: <Shield className="w-8 h-8 text-indigo-400" />,
    title: "Get matched with verified pros",
    description: "Every contractor in TrustyPro is background-checked, licensed, insured, and reviewed. No cold calls. No random bids. Only verified professionals.",
  },
  {
    step: "04",
    icon: <FileText className="w-8 h-8 text-indigo-400" />,
    title: "Your Home Passport grows with every service",
    description: "Every repair is documented. When you sell, buyers see the complete history. It's the most valuable document your home can have.",
  },
];

const FEATURES = [
  {
    icon: <BarChart3 className="w-6 h-6 text-indigo-500" />,
    title: "Home Health Score",
    description: "A single 0–100 score showing your home's overall condition across all systems. Updated after every assessment or service visit.",
  },
  {
    icon: <FileText className="w-6 h-6 text-indigo-500" />,
    title: "Home Passport",
    description: "A permanent, transferable record of every service, repair, and inspection at your property. Survives the sale of the home.",
  },
  {
    icon: <Search className="w-6 h-6 text-indigo-500" />,
    title: "Home Health Assessment",
    description: "A ProLnk Scout visits your property and documents all 12 systems in detail. Get a complete picture in one visit.",
  },
  {
    icon: <Shield className="w-6 h-6 text-indigo-500" />,
    title: "Verified Contractor Network",
    description: "Every pro is background-checked, licensed, insured, and carries a ProLnk Pro Pass. Check their credentials before they arrive.",
  },
  {
    icon: <Zap className="w-6 h-6 text-indigo-500" />,
    title: "Proactive Alerts",
    description: "Storm detected in your area? HVAC reaching end-of-life? We alert you before problems become emergencies.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-indigo-500" />,
    title: "True Cost Guide",
    description: "See real DFW market rates for every home service before anyone gives you a quote. No more overpaying.",
  },
];

const SCOUT_FEATURES = [
  "All 12 home systems documented in one visit",
  "AI generates your Home Health Score and report",
  "iPhone LiDAR floor plans and 3D scans optional",
  "Findings posted to Bid Board for competitive contractor bids",
  "Your Home Passport updated immediately",
  "Available for residential, commercial, and multifamily",
];

const TESTIMONIALS = [
  {
    name: "Jennifer R.",
    location: "Prosper, TX",
    text: "The AI scan found a plumbing issue behind my walls I never would have caught. TrustyPro saved me from what would have been a $15,000 disaster.",
    rating: 5,
    project: "Plumbing Detection",
  },
  {
    name: "Marcus T.",
    location: "Frisco, TX",
    text: "When I listed my home, I showed buyers the complete TrustyPro history of every repair and upgrade. We sold in 4 days over asking. The Home Passport is worth every penny.",
    rating: 5,
    project: "Home Sale",
  },
  {
    name: "Sarah M.",
    location: "Allen, TX",
    text: "I used to dread finding contractors. Now I just open TrustyPro, see their verified background check and reviews, and book. It changed how I think about home maintenance.",
    rating: 5,
    project: "Kitchen Remodel",
  },
];

export default function TrustyProSite() {
  const [, navigate] = useLocation();
  const stats = trpc.waitlist.getPublicCounts.useQuery(undefined, { refetchInterval: 60000 });
  const homeCount = (stats.data?.homes as number) ?? 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-gray-900 text-xl tracking-tight">TrustyPro</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#scout" className="hover:text-indigo-600 transition-colors">Home Assessment</a>
            <a href="#passport" className="hover:text-indigo-600 transition-colors">Home Passport</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login?brand=trustypro")} className="text-gray-600">
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate("/waitlist/homeowner")} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Get Early Access
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-8">
          <Clock className="w-3.5 h-3.5" />
          DFW Early Access — {homeCount.toLocaleString()} homeowners on the waitlist
        </div>

        <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
          Your home deserves<br />
          <span className="text-indigo-600">an annual checkup.</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          You go to the doctor every year. You service your car. Your home is your biggest asset — it deserves the same care. TrustyPro is the platform that keeps it documented, protected, and always in expert hands.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            onClick={() => navigate("/waitlist/homeowner")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg px-10 py-4 rounded-xl h-auto"
          >
            Get Early Access — It's Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/trustypro/scan")}
            className="text-gray-700 font-semibold text-lg px-8 py-4 rounded-xl h-auto border-gray-200"
          >
            Try a Free Scan
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />100% free for homeowners</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />No credit card required</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />All contractors background-checked</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />AI-powered home analysis</div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">How TrustyPro Works</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">From photo to verified contractor, the entire process is automated. You stay in control.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-indigo-200 font-black text-5xl mb-4">{step.step}</div>
                <div className="mb-4">{step.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Everything Your Home Needs</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">One platform for every aspect of home ownership — from detection to documentation to hiring.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scout Assessment */}
      <section id="scout" className="bg-indigo-600 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold mb-6">
                NEW
              </div>
              <h2 className="text-4xl font-black text-white mb-6">
                The ProLnk Home Assessment
              </h2>
              <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
                A certified ProLnk Scout visits your property and documents all 12 home systems in a single visit. Roof to crawl space. Electrical to appliances. You get a complete Home Intelligence Report with your Health Score, prioritized repair list, and cost estimates — all in one afternoon.
              </p>
              <ul className="space-y-3 mb-8">
                {SCOUT_FEATURES.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-indigo-100">
                    <CheckCircle className="w-5 h-5 text-indigo-300 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                onClick={() => navigate("/home-waitlist?interest=scout")}
                className="bg-white text-indigo-600 hover:bg-indigo-50 font-black text-lg px-8 py-4 rounded-xl h-auto"
              >
                Request a Home Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-6xl font-black text-white mb-2">87</div>
                <div className="text-indigo-200 font-semibold">Home Health Score</div>
              </div>
              {[
                { zone: "Roof & Gutters", score: 72, color: "bg-yellow-400" },
                { zone: "HVAC", score: 91, color: "bg-green-400" },
                { zone: "Electrical", score: 95, color: "bg-green-400" },
                { zone: "Plumbing", score: 88, color: "bg-green-400" },
                { zone: "Exterior", score: 78, color: "bg-yellow-400" },
                { zone: "Interior", score: 93, color: "bg-green-400" },
              ].map((item) => (
                <div key={item.zone} className="mb-3">
                  <div className="flex justify-between text-sm text-indigo-200 mb-1">
                    <span>{item.zone}</span>
                    <span className="font-semibold">{item.score}/100</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Home Passport */}
      <section id="passport" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-6">The Home Passport</h2>
          <p className="text-gray-500 text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Every repair, upgrade, and inspection at your property is permanently documented in your Home Passport. When you sell, the new owner inherits the complete history — making your home more valuable and easier to sell.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <TrendingUp className="w-6 h-6 text-green-600" />, title: "Increases Home Value", desc: "Documented maintenance history helps homes sell faster and for more." },
              { icon: <Lock className="w-6 h-6 text-indigo-600" />, title: "Transfers on Sale", desc: "The Home Passport transfers to the new owner — a unique selling point." },
              { icon: <Heart className="w-6 h-6 text-red-500" />, title: "Prevents Emergencies", desc: "Proactive maintenance alerts catch issues before they become disasters." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 text-center mb-14">What Homeowners Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.location} · {t.project}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Your home is your biggest investment.<br />Protect it like one.
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join {homeCount.toLocaleString()}+ homeowners already on the TrustyPro waitlist.
            Free forever for homeowners.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/waitlist/homeowner")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl px-12 py-5 rounded-xl h-auto"
          >
            Get Early Access — Free
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
          <p className="text-gray-600 text-sm mt-4">DFW only for now · No credit card · Launching soon</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-white">TrustyPro</span>
          </div>
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <a href="/legal/privacy" className="hover:text-gray-300">Privacy</a>
            <a href="/legal/terms" className="hover:text-gray-300">Terms</a>
            <a href="mailto:support@trustypro.io" className="hover:text-gray-300 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> support@trustypro.io
            </a>
          </div>
          <p className="text-gray-600 text-sm">© 2026 TrustyPro — DFW, Texas</p>
        </div>
      </footer>
    </div>
  );
}
