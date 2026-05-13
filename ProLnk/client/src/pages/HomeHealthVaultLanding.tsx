import type React from "react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield, Camera, FileText, Wrench, Clock,
  CheckCircle, Lock, ArrowRight, Star,
  Home, Zap, Droplets, Wind, ChevronRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Camera className="w-7 h-7 text-blue-500" />,
    title: "AI Photo Analysis",
    desc: "Upload photos of your home's systems. Our AI identifies condition issues, estimates remaining life, and flags things pros should know.",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: <FileText className="w-7 h-7 text-violet-500" />,
    title: "Document Storage",
    desc: "Warranties, permits, inspection reports, manuals — all organized by system and instantly accessible from any device.",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: <Wrench className="w-7 h-7 text-emerald-500" />,
    title: "Service History",
    desc: "Every repair, upgrade, and maintenance visit logged with dates, costs, and technician info. Verified records from pros you hire.",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: <Zap className="w-7 h-7 text-amber-500" />,
    title: "Issue Tracking",
    desc: "Track known issues and watch items. Get smart alerts when a system is approaching end of life or due for service.",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

const TIMELINE_EVENTS = [
  {
    year: "2019",
    icon: <Home className="w-4 h-4" />,
    color: "bg-blue-500",
    title: "Home Purchased",
    detail: "Property added to vault. AI analyzed listing photos and identified 3 systems to watch.",
  },
  {
    year: "2020",
    icon: <Wind className="w-4 h-4" />,
    color: "bg-violet-500",
    title: "HVAC Replaced",
    detail: "Carrier 5-ton unit installed by ABC Cooling. Warranty: 10 years. Total: $7,200.",
  },
  {
    year: "2022",
    icon: <Droplets className="w-4 h-4" />,
    color: "bg-emerald-500",
    title: "Water Heater Serviced",
    detail: "Annual flush + anode rod replaced. Condition: Good. Estimated 6 years remaining.",
  },
  {
    year: "2024",
    icon: <CheckCircle className="w-4 h-4" />,
    color: "bg-amber-500",
    title: "Roof Inspection Passed",
    detail: "Class 4 shingles — no defects found. AI scan: 0 issues detected. Est. 11 years left.",
  },
  {
    year: "2026",
    icon: <Star className="w-4 h-4" />,
    color: "bg-indigo-500",
    title: "Home Health Score: 87",
    detail: "All major systems tracked. Vault value: $47,000 in documented asset protection.",
  },
];

export default function HomeHealthVaultLanding() {
  const [addressInput, setAddressInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddHome = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) {
      toast.error("Please enter your home address.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setAdded(true);
      toast.success("Your home has been added to the waitlist!");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-medium mb-6">
            <Shield className="w-3.5 h-3.5" /> Home Health Vault
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
            Your Home's Permanent<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Health Record
            </span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Track every system, log every repair, store every document. Build the complete history of your home — and take it with you when you sell.
          </p>

          {/* Add Home CTA */}
          {!added ? (
            <form onSubmit={handleAddHome} className="max-w-xl mx-auto">
              <div className="flex gap-3 flex-col sm:flex-row">
                <Input
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="Enter your home address..."
                  className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 px-6 bg-blue-500 hover:bg-blue-400 text-white font-bold whitespace-nowrap"
                >
                  {submitting ? "Adding..." : "Add Your Home"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-slate-500 text-xs mt-3">
                Free to start. No credit card required.
              </p>
            </form>
          ) : (
            <div className="max-w-sm mx-auto flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-white font-semibold">Your home is on the list!</p>
              <p className="text-slate-400 text-sm">We'll notify you when the vault opens in your area.</p>
            </div>
          )}
        </div>
      </div>

      {/* 4-Feature Grid */}
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Everything about your home. In one place.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            The Home Health Vault turns scattered documents, receipts, and memories into a permanent, transferable asset.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl border p-6 ${f.bg} ${f.border}`}
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Preview */}
      <div className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
              A sample home's health history
            </h2>
            <p className="text-gray-500 text-base">
              Every event, logged and verified. Automatically organized.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-6">
              {TIMELINE_EVENTS.map((ev, i) => (
                <div key={i} className="flex gap-5 items-start relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white ${ev.color} z-10`}>
                    {ev.icon}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{ev.year}</span>
                      <ChevronRight className="w-3 h-3 text-gray-300" />
                      <span className="text-sm font-bold text-gray-900">{ev.title}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{ev.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy callout + CTA */}
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold mb-8">
          <Lock className="w-4 h-4" />
          Your data never sold. You control access.
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          Built to protect — not to profit from — your home data.
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
          You decide who sees your vault. Pros you hire get what they need to do their job. Buyers see what you choose to share. No one else sees anything.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/home-waitlist"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors"
          >
            Get Free Quotes + Vault Access <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/get-quotes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors"
          >
            Just need a quote? →
          </a>
        </div>
      </div>
    </div>
  );
}
