import React from 'react';
import { useState } from "react";
import { Link } from "wouter";
import {
  Star, Shield, Clock, MapPin, CheckCircle, Award,
  MessageCircle, Calendar, ChevronRight, Briefcase,
  Wrench, Zap, Droplets, Flame, Wind, Hammer, Home,
  Send, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TRADE_COLORS: Record<string, string> = {
  Plumbing: "#0EA5E9",
  Electrical: "#F59E0B",
  HVAC: "#8B5CF6",
  Roofing: "#EF4444",
  General: "#10B981",
};

const TRADE_ICONS: Record<string, typeof Wrench> = {
  Plumbing: Droplets,
  Electrical: Zap,
  HVAC: Wind,
  Roofing: Home,
  General: Hammer,
};

const MOCK_PRO = {
  name: "Marcus Williams",
  trade: "Plumbing",
  rating: 4.9,
  reviewCount: 127,
  responseTime: "< 2 hours",
  jobsCompleted: 84,
  yearsExp: 8,
  serviceArea: "DFW Metro",
  memberSince: "2024",
  bio: "Licensed master plumber with 8 years serving the Dallas-Fort Worth area. Specializing in residential repairs, remodels, and emergency services. Family-owned business with a commitment to quality work and honest pricing.",
  specialties: ["Water Heater Repair", "Drain Cleaning", "Leak Detection", "Pipe Replacement", "Water Pressure"],
  badges: [
    { label: "Verified", icon: Shield, color: "#00B5B8" },
    { label: "Background Checked", icon: CheckCircle, color: "#10B981" },
    { label: "Insured", icon: Award, color: "#8B5CF6" },
    { label: "Licensed", icon: Briefcase, color: "#F59E0B" },
  ],
  reviews: [
    { name: "Jennifer M.", rating: 5, date: "May 8, 2026", comment: "Marcus fixed a major leak under our kitchen sink in under an hour. Super professional and cleaned up everything before leaving. Highly recommend!" },
    { name: "David R.", rating: 5, date: "Apr 22, 2026", comment: "Replaced our water heater same day I called. Fair pricing and explained everything clearly. Will definitely use again." },
    { name: "Sarah K.", rating: 4, date: "Apr 10, 2026", comment: "Good work on the bathroom faucet replacement. Showed up on time and got it done quickly." },
    { name: "Tom H.", rating: 5, date: "Mar 28, 2026", comment: "Marcus diagnosed a hidden pipe issue that two other plumbers missed. Saved us thousands. Absolute professional." },
  ],
  ratingBreakdown: [78, 14, 6, 2, 0],
};

const SERVICE_TYPES = [
  "Select a service...",
  "Water Heater Repair",
  "Drain Cleaning",
  "Leak Detection",
  "Pipe Replacement",
  "Emergency Repair",
  "Other",
];

export default function PartnerPublicProfile() {
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const pro = MOCK_PRO;
  const tradeColor = TRADE_COLORS[pro.trade] ?? "#00B5B8";
  const TradeIcon = TRADE_ICONS[pro.trade] ?? Wrench;

  const initials = pro.name.split(" ").map((n) => n[0]).join("");

  function handleQuoteSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      {/* Back nav */}
      <div className="border-b border-white/10 px-6 py-3">
        <Link href="/find-pros">
          <a className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors w-fit">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Directory
          </a>
        </Link>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#0D1F3C] to-[#0A1628] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shrink-0"
              style={{ background: `${tradeColor}22`, border: `3px solid ${tradeColor}` }}
            >
              {initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{pro.name}</h1>
                <span
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                  style={{ background: `${tradeColor}22`, color: tradeColor }}
                >
                  <TradeIcon className="w-4 h-4" />
                  {pro.trade}
                </span>
                <Shield className="w-5 h-5 text-[#00B5B8]" title="Verified Pro" />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-4">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-semibold">{pro.rating}</span>
                  <span>({pro.reviewCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Responds {pro.responseTime}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {pro.serviceArea}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-[#00B5B8] hover:bg-[#00a0a3] text-white px-6">
                  Book This Pro
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Button>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            {[
              { label: "Jobs Completed", value: pro.jobsCompleted },
              { label: "Years Experience", value: pro.yearsExp },
              { label: "Service Area", value: pro.serviceArea },
              { label: "Member Since", value: pro.memberSince },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <section>
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-white/70 leading-relaxed">{pro.bio}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {pro.specialties.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: `${tradeColor}18`, color: tradeColor, border: `1px solid ${tradeColor}40` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Badges */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Credentials</h2>
            <div className="flex flex-wrap gap-3">
              {pro.badges.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                    style={{ background: `${b.color}18`, color: b.color, border: `1px solid ${b.color}40` }}
                  >
                    <Icon className="w-4 h-4" />
                    {b.label}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Reviews</h2>
            <div className="flex gap-8 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400">{pro.rating}</div>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-xs text-white/50 mt-1">{pro.reviewCount} reviews</div>
              </div>
              <div className="flex-1 space-y-1">
                {pro.ratingBreakdown.map((pct, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="text-white/60 w-4">{5 - i}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-white/60 w-8 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {pro.reviews.map((rev) => (
                <div key={rev.name} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                        {rev.name[0]}
                      </div>
                      <span className="font-medium text-sm">{rev.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-white/40 ml-2">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/70">{rev.comment}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Project Gallery</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                "Water Heater Install",
                "Bathroom Remodel",
                "Leak Repair",
                "Pipe Replacement",
                "Drain Cleaning",
                "Kitchen Plumbing",
              ].map((label, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${tradeColor}22 0%, #0D1F3C 100%)`, border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TradeIcon className="w-8 h-8 opacity-20" style={{ color: tradeColor }} />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-xs text-white/80 font-medium">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column — Availability + Quote */}
        <div className="space-y-4">
          {/* Availability */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-[#00B5B8]" />
              <span className="font-medium text-sm">Availability</span>
            </div>
            <p className="text-sm text-white/70 mb-1">Usually available within</p>
            <p className="text-2xl font-bold text-[#00B5B8]">48 hours</p>
          </div>

          {/* Quote request */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="font-semibold mb-4">Request a Quote</h3>
            {submitted ? (
              <div className="text-center py-4">
                <CheckCircle className="w-10 h-10 text-[#00B5B8] mx-auto mb-2" />
                <p className="font-medium">Request sent!</p>
                <p className="text-sm text-white/60 mt-1">Marcus will respond within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3">
                <div>
                  <label className="text-xs text-white/60 block mb-1">Service Type</label>
                  <div className="relative">
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-[#00B5B8]"
                    >
                      {SERVICE_TYPES.map((s) => (
                        <option key={s} value={s} className="bg-[#0D1F3C]">{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/60 block mb-1">Describe the job</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell Marcus what you need..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00B5B8] resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#00B5B8] hover:bg-[#00a0a3] text-white gap-2">
                  <Send className="w-4 h-4" />
                  Send Request
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
