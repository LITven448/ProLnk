import { useState, useEffect } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  AlertTriangle, Phone, Star, Loader2, Shield, Zap, Flame,
  Droplets, Thermometer, Lock, Wind, MapPin, CheckCircle,
  ArrowRight, ChevronRight, Navigation, Clock, X, Radio
} from "lucide-react";

const EMERGENCY_CATEGORIES = [
  {
    id: "water",
    label: "Water / Flood",
    icon: Droplets,
    color: "#3b82f6",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    textColor: "text-blue-400",
    trade: "Plumber",
    description: "Burst pipe, flooding, or major leak",
    eta: "15–25 min",
    available: true,
    tips: [
      "Turn off your main water shutoff valve immediately",
      "Locate the valve — usually near the water meter or under the sink",
      "Open faucets to drain remaining pressure",
      "Move valuables off the floor in affected areas",
      "Document damage with photos for insurance",
    ],
  },
  {
    id: "gas",
    label: "Gas Leak",
    icon: Flame,
    color: "#ef4444",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    textColor: "text-red-400",
    trade: "Gas Company / Plumber",
    description: "Gas odor or possible leak",
    eta: "10–20 min",
    available: true,
    urgent: true,
    tips: [
      "LEAVE THE HOUSE IMMEDIATELY — do not use switches",
      "Do NOT turn on/off any lights or appliances",
      "Leave doors open as you exit to ventilate",
      "Call 911 and your gas company from outside",
      "Do not re-enter until cleared by officials",
    ],
  },
  {
    id: "electrical",
    label: "Electrical",
    icon: Zap,
    color: "#eab308",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    textColor: "text-yellow-400",
    trade: "Electrician",
    description: "Power outage or electrical hazard",
    eta: "20–35 min",
    available: true,
    tips: [
      "Check your circuit breaker panel — reset tripped breakers",
      "Call your utility company to rule out neighborhood outage",
      "Unplug sensitive electronics to protect from power surges",
      "Do NOT use a gas stove for heating",
      "Keep refrigerator/freezer doors closed — food safe for 4 hrs",
    ],
  },
  {
    id: "roof",
    label: "Roof Damage",
    icon: Wind,
    color: "#a855f7",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    textColor: "text-purple-400",
    trade: "Roofer",
    description: "Storm damage or active leak",
    eta: "30–45 min",
    available: true,
    tips: [
      "Move valuables away from the leak area immediately",
      "Use buckets or towels to contain water damage",
      "Do not go on the roof yourself — wait for a professional",
      "Document all visible damage with photos and video",
      "Call your insurance company within 24 hours",
    ],
  },
  {
    id: "hvac",
    label: "HVAC Failure",
    icon: Thermometer,
    color: "#f59e0b",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    textColor: "text-amber-400",
    trade: "HVAC Technician",
    description: "Heating or cooling system failure",
    eta: "25–45 min",
    available: true,
    tips: [
      "Check your thermostat batteries first",
      "Inspect and replace air filter if dirty",
      "Check circuit breaker — HVAC breakers can trip",
      "If gas furnace: check pilot light and gas supply",
      "In extreme cold: open cabinet doors to protect pipes",
    ],
  },
  {
    id: "lockout",
    label: "Lockout",
    icon: Lock,
    color: "#6366f1",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    textColor: "text-indigo-400",
    trade: "Locksmith",
    description: "Locked out of home",
    eta: "10–20 min",
    available: true,
    tips: [
      "Check all doors and windows before calling",
      "Contact a trusted neighbor who may have a spare key",
      "If renting, call your property manager first",
      "Have your ID ready — locksmiths will verify identity",
      "Consider a smart lock after this — eliminate future lockouts",
    ],
  },
];

const MOCK_PROS = [
  { id: 1, name: "Mike's Emergency Plumbing",  trade: "Plumber",         distance: "1.2 mi", rating: 4.9, reviews: 312, phone: "555-0101", available: true,  eta: "15–25 min" },
  { id: 2, name: "24/7 HVAC Solutions",        trade: "HVAC Technician", distance: "2.8 mi", rating: 4.8, reviews: 189, phone: "555-0202", available: true,  eta: "20–35 min" },
  { id: 3, name: "ProFix Electrical",          trade: "Electrician",     distance: "3.1 mi", rating: 4.9, reviews: 445, phone: "555-0303", available: true,  eta: "25–40 min" },
  { id: 4, name: "Quick Lock & Key",           trade: "Locksmith",       distance: "0.9 mi", rating: 4.7, reviews: 97,  phone: "555-0404", available: true,  eta: "10–20 min" },
  { id: 5, name: "Restore Masters",            trade: "Restoration",     distance: "4.2 mi", rating: 4.8, reviews: 231, phone: "555-0505", available: true,  eta: "30–45 min" },
  { id: 6, name: "Atlas Home Services",        trade: "Plumber",         distance: "2.2 mi", rating: 4.6, reviews: 78,  phone: "555-0606", available: false, eta: "60–90 min" },
];

function AvailabilityDot({ available }: { available: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
      available ? "bg-teal-500/15 text-teal-400" : "bg-slate-500/15 text-slate-500"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${available ? "bg-teal-400 animate-pulse" : "bg-slate-500"}`} />
      {available ? "Available Now" : "Limited"}
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

          <div className="rounded-2xl bg-gradient-to-r from-red-900/60 to-orange-900/40 border-2 border-red-500/60 p-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-xl font-black text-white mb-1">Need Emergency Help?</p>
                <p className="text-sm text-red-300/90 mb-3">
                  If this is a life-threatening emergency — fire, gas explosion, medical — call 911 first.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <a href="tel:911"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-colors">
                    <Phone className="w-4 h-4" /> Call 911
                  </a>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-xs text-red-300 font-semibold">Pro response: 15–45 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {locationGranted === null && (
            <button onClick={requestLocation}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-teal-500/30 transition-all text-left">
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
                        : "bg-slate-800/60 border-slate-700 hover:border-slate-600"
                    }`}>
                    {cat.urgent && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? cat.bg : "bg-slate-900/60"}`}>
                      <Icon className="w-6 h-6" style={{ color: cat.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{cat.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{cat.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                      <span className="text-[10px] text-teal-400 font-semibold">24/7 · {cat.eta}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {searching && (
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700 p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-teal-500/10 border-2 border-teal-500/30 flex items-center justify-center mx-auto mb-4">
                <div className="w-7 h-7 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
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
                <div key={pro.id} className="bg-slate-800/60 rounded-2xl border border-slate-700 hover:border-teal-500/20 transition-all overflow-hidden">
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
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
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
                                <span className="text-xs text-teal-400 font-semibold">ETA: {pro.eta}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-slate-700">
                    {pro.phone && (
                      <a href={`tel:${pro.phone}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 text-red-400 hover:bg-red-500/10 transition-colors font-bold text-sm">
                        <Phone className="w-4 h-4" /> Call Now
                      </a>
                    )}
                    <div className="w-px bg-slate-700" />
                    <Link href="/my-home/request-pro">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-400 hover:bg-slate-700/50 transition-colors text-sm">
                        Request Quote <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}

              <Link href="/my-home/request-pro">
                <button className="w-full py-3.5 rounded-2xl border border-dashed border-slate-700 text-slate-500 hover:border-teal-500/30 hover:text-teal-400 text-sm font-medium transition-all">
                  See more pros →
                </button>
              </Link>
            </div>
          )}

          {category && !searching && (
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">While you wait — {category.label}</span>
              </div>
              <div className="p-4 space-y-2.5">
                {category.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: category.color }}>
                      {i + 1}
                    </div>
                    <p className={`text-sm leading-relaxed ${i === 0 && category.urgent ? "text-red-300 font-semibold" : "text-slate-400"}`}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
              <Radio className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-bold text-white">Nearby Available Pros</span>
              <span className="ml-auto text-[11px] text-slate-500">Map view</span>
            </div>
            <div className="relative bg-slate-900 h-40 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {[20, 40, 60, 80].map(i => (
                  <div key={i} className="absolute border border-slate-600 rounded-full"
                    style={{ width: `${i * 2.5}%`, height: `${i * 2.5}%`, top: `${50 - i * 1.25}%`, left: `${50 - i * 1.25}%` }} />
                ))}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400 ring-4 ring-blue-400/20" />
                {[
                  { top: "35%", left: "40%", delay: 0 },
                  { top: "55%", left: "60%", delay: 0.3 },
                  { top: "45%", left: "25%", delay: 0.6 },
                ].map((pos, i) => (
                  <div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-teal-400"
                    style={{ top: pos.top, left: pos.left, animationDelay: `${pos.delay}s` }}>
                    <div className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-75" style={{ animationDelay: `${pos.delay}s` }} />
                  </div>
                ))}
              </div>
              <div className="relative z-10 text-center">
                <p className="text-xs text-slate-500 font-semibold">3 pros near you</p>
                <p className="text-[10px] text-slate-600">Enable location for exact distances</p>
              </div>
            </div>
          </div>

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
