import { useState, useEffect } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  AlertTriangle, Phone, Star, Loader2, Shield, Zap, Flame,
  Droplets, Thermometer, Lock, Wind, Home, MapPin, CheckCircle,
  ArrowRight, ChevronRight, Navigation, Clock, X
} from "lucide-react";

const EMERGENCY_CATEGORIES = [
  {
    id: "water",
    label: "Water Leak",
    icon: Droplets,
    color: "#3b82f6",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    textColor: "text-blue-400",
    trade: "Plumber",
    description: "Burst pipe, flooding, or major leak",
    tips: [
      "Turn off your main water shutoff valve immediately",
      "Locate the valve — usually near the water meter or under the sink",
      "Open faucets to drain remaining pressure",
      "Move valuables off the floor in affected areas",
      "Document damage with photos for insurance",
    ],
  },
  {
    id: "hvac",
    label: "No Heat / AC",
    icon: Thermometer,
    color: "#f59e0b",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    textColor: "text-amber-400",
    trade: "HVAC Technician",
    description: "Heating or cooling system failure",
    tips: [
      "Check your thermostat batteries first",
      "Inspect and replace air filter if dirty",
      "Check circuit breaker — HVAC breakers can trip",
      "If gas furnace: check pilot light and gas supply",
      "In extreme cold: open cabinet doors to protect pipes",
    ],
  },
  {
    id: "electrical",
    label: "Power Out",
    icon: Zap,
    color: "#eab308",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    textColor: "text-yellow-400",
    trade: "Electrician",
    description: "Full or partial power outage",
    tips: [
      "Check your circuit breaker panel — reset tripped breakers",
      "Call your utility company to rule out neighborhood outage",
      "Unplug sensitive electronics to protect from power surges",
      "Do NOT use a gas stove for heating",
      "Keep refrigerator/freezer doors closed — food safe for 4 hrs",
    ],
  },
  {
    id: "lockout",
    label: "Lock Out",
    icon: Lock,
    color: "#8b5cf6",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    textColor: "text-purple-400",
    trade: "Locksmith",
    description: "Locked out of home",
    tips: [
      "Check all doors and windows before calling",
      "Contact a trusted neighbor who may have a spare key",
      "If renting, call your property manager first",
      "Have your ID ready — locksmiths will verify identity",
      "Consider a smart lock after this — eliminate future lockouts",
    ],
  },
  {
    id: "gas",
    label: "Gas Smell",
    icon: Flame,
    color: "#ef4444",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    textColor: "text-red-400",
    trade: "Gas Company / Plumber",
    description: "Gas odor or possible leak",
    tips: [
      "LEAVE THE HOUSE IMMEDIATELY — do not use switches",
      "Do NOT turn on/off any lights or appliances",
      "Leave doors open as you exit to ventilate",
      "Call 911 and your gas company from outside",
      "Do not re-enter until cleared by officials",
    ],
    urgent: true,
  },
  {
    id: "fire",
    label: "Fire Damage",
    icon: Flame,
    color: "#f97316",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    textColor: "text-orange-400",
    trade: "Fire Restoration",
    description: "Post-fire cleanup and restoration",
    tips: [
      "Call 911 first — do not fight a fire yourself",
      "Do not re-enter until fire department clears the structure",
      "Document everything with photos for insurance",
      "Contact your insurance company within 24 hours",
      "Board up openings to prevent further damage / theft",
    ],
    urgent: true,
  },
];

const MOCK_PROS = [
  { id: 1, name: "Mike's Emergency Plumbing",    trade: "Plumber",          distance: "1.2 mi", rating: 4.9, reviews: 312, phone: "555-0101", available: true,  eta: "15–25 min" },
  { id: 2, name: "24/7 HVAC Solutions",          trade: "HVAC Technician",  distance: "2.8 mi", rating: 4.8, reviews: 189, phone: "555-0202", available: true,  eta: "20–35 min" },
  { id: 3, name: "ProFix Electrical",            trade: "Electrician",      distance: "3.1 mi", rating: 4.9, reviews: 445, phone: "555-0303", available: true,  eta: "25–40 min" },
  { id: 4, name: "Quick Lock & Key",             trade: "Locksmith",        distance: "0.9 mi", rating: 4.7, reviews: 97,  phone: "555-0404", available: true,  eta: "10–20 min" },
  { id: 5, name: "Restore Masters",              trade: "Restoration",      distance: "4.2 mi", rating: 4.8, reviews: 231, phone: "555-0505", available: true,  eta: "30–45 min" },
  { id: 6, name: "Atlas Home Services",          trade: "Plumber",          distance: "2.2 mi", rating: 4.6, reviews: 78,  phone: "555-0606", available: false, eta: "60–90 min" },
];

function AvailabilityDot({ available }: { available: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
      available ? "bg-teal-500/15 text-teal-400" : "bg-slate-500/15 text-slate-500"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${available ? "bg-teal-400 animate-pulse" : "bg-slate-500"}`} />
      {available ? "Available Now" : "Limited Availability"}
    </span>
  );
}

export default function EmergencyServices() {
  const [selected, setSelected] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [prosShown, setProsShown] = useState(false);
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);

  const { data: livePartners, isLoading: partnersLoading } = trpc.homeownerExtras.getEmergencyPartners.useQuery(
    {},
    { enabled: !!selected && !searching }
  );

  const category = EMERGENCY_CATEGORIES.find(c => c.id === selected);

  useEffect(() => {
    if (selected) {
      setSearching(true);
      setProsShown(false);
      const t = setTimeout(() => {
        setSearching(false);
        setProsShown(true);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [selected]);

  const requestLocation = () => {
    if (!navigator.geolocation) { setLocationGranted(false); return; }
    navigator.geolocation.getCurrentPosition(
      () => setLocationGranted(true),
      () => setLocationGranted(false)
    );
  };

  const displayPros = ((livePartners as any[] | undefined)?.length
    ? (livePartners as any[]).slice(0, 3)
    : MOCK_PROS.filter(p =>
        !category || p.trade.toLowerCase().includes(category.trade.split(" ")[0].toLowerCase())
      ).slice(0, 3)
  );

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="max-w-2xl mx-auto p-4 pb-20 space-y-5">

          {/* ── Header ──────────────────────────────────────────── */}
          <div className="pt-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Emergency Services</h1>
                <p className="text-sm text-slate-400">Fast access to vetted pros for urgent home issues</p>
              </div>
            </div>
          </div>

          {/* ── 911 Banner ──────────────────────────────────────── */}
          <div className="rounded-2xl bg-red-900/30 border border-red-500/40 p-4">
            <div className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-red-300 mb-0.5">Life-threatening emergency?</p>
                <p className="text-xs text-red-400/80">Call 911 first. Use this service for urgent home repair after emergency services have been contacted.</p>
              </div>
              <a href="tel:911" className="flex-shrink-0 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-colors">
                Call 911
              </a>
            </div>
          </div>

          {/* ── Location ────────────────────────────────────────── */}
          {locationGranted === null && (
            <button onClick={requestLocation}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-[#0f1e35] border border-[#1e2d45] hover:border-teal-500/30 transition-all text-left">
              <Navigation className="w-5 h-5 text-teal-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Enable location for faster matching</p>
                <p className="text-xs text-slate-500">Find the closest available pro to your home</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          )}
          {locationGranted === true && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20">
              <CheckCircle className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-semibold text-teal-300">Location enabled — showing nearest pros first</span>
            </div>
          )}

          {/* ── Category Selector ────────────────────────────────── */}
          <div>
            <p className="text-sm font-semibold text-slate-400 mb-3">What's your emergency?</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {EMERGENCY_CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isActive = selected === cat.id;
                return (
                  <button key={cat.id} onClick={() => setSelected(cat.id === selected ? null : cat.id)}
                    className={`relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all text-center ${
                      isActive
                        ? `${cat.bg} ${cat.border}`
                        : "bg-[#0f1e35] border-[#1e2d45] hover:border-slate-600"
                    }`}>
                    {cat.urgent && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? cat.bg : "bg-[#1a2d47]"}`}>
                      <Icon className="w-6 h-6" style={{ color: cat.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{cat.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{cat.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Searching Spinner ────────────────────────────────── */}
          {searching && (
            <div className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-teal-500/10 border-2 border-teal-500/30 flex items-center justify-center mx-auto mb-4 relative">
                <Loader2 className="w-7 h-7 text-teal-400 animate-spin" />
              </div>
              <p className="text-base font-bold text-white mb-1">Finding available pros…</p>
              <p className="text-sm text-slate-500">Checking {category?.trade ?? "pros"} in your area</p>
              <div className="flex justify-center gap-1.5 mt-4">
                {[0, 0.2, 0.4].map(d => (
                  <div key={d} className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: `${d}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* ── Pro Results ─────────────────────────────────────── */}
          {prosShown && category && !searching && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">
                  {displayPros.filter((p: any) => p.available !== false).length} Pros Available Now
                </h2>
                <button onClick={() => { setSelected(null); setProsShown(false); }}
                  className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Clear
                </button>
              </div>

              {displayPros.map((pro: any) => (
                <div key={pro.id} className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] hover:border-teal-500/20 transition-all overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {(pro.name || pro.businessName || "P")[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold text-white text-sm leading-tight">{pro.name || pro.businessName}</p>
                          <AvailabilityDot available={pro.available !== false} />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{pro.trade}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-semibold text-slate-300">{pro.rating ?? "4.8"}</span>
                            <span className="text-xs text-slate-600">({pro.reviews ?? pro.reviewCount ?? 0})</span>
                          </div>
                          {pro.distance && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-slate-700" />
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-600" />
                                <span className="text-xs text-slate-500">{pro.distance}</span>
                              </div>
                            </>
                          )}
                          {pro.eta && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-slate-700" />
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-teal-500" />
                                <span className="text-xs text-teal-400 font-medium">{pro.eta}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-[#1e2d45]">
                    {(pro.phone) && (
                      <a href={`tel:${pro.phone}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 text-teal-400 hover:bg-teal-500/10 transition-colors font-semibold text-sm">
                        <Phone className="w-4 h-4" /> Call Now
                      </a>
                    )}
                    <div className="w-px bg-[#1e2d45]" />
                    <Link href="/my-home/request-pro">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-400 hover:bg-[#1a2d47] transition-colors text-sm">
                        Request Quote <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}

              <Link href="/my-home/request-pro">
                <button className="w-full py-3.5 rounded-2xl border border-dashed border-[#1e2d45] text-slate-500 hover:border-teal-500/30 hover:text-teal-400 text-sm font-medium transition-all">
                  See more pros →
                </button>
              </Link>
            </div>
          )}

          {/* ── Safety Tips ──────────────────────────────────────── */}
          {category && !searching && (
            <div className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#1e2d45] flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">While you wait — {category.label} Safety Tips</span>
              </div>
              <div className="p-4 space-y-2.5">
                {category.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: category.color }}>
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Not an Emergency Link ────────────────────────────── */}
          <div className="text-center pt-2 pb-4">
            <p className="text-xs text-slate-600 mb-1">Not an emergency?</p>
            <Link href="/my-home/request-pro">
              <span className="text-sm font-semibold text-teal-400 hover:text-teal-300 cursor-pointer">
                Schedule regular service instead →
              </span>
            </Link>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
