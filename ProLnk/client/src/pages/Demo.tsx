import { useState, useEffect } from "react";
import { Camera, MapPin, Users, CheckSquare, DollarSign, ArrowRight, Zap, Star, Play } from "lucide-react";

const TABS = [
  { id: "photo", label: "Photo Scan", icon: Camera },
  { id: "leads", label: "Lead Generation", icon: MapPin },
  { id: "matching", label: "Pro Matching", icon: Users },
  { id: "completion", label: "Job Completion", icon: CheckSquare },
  { id: "earnings", label: "Earnings", icon: DollarSign },
];

function PhotoScanTab() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2800);
    const t3 = setTimeout(() => setStep(3), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const steps = [
    { label: "Upload photo", done: step >= 1 },
    { label: "AI Analysis", done: step >= 3, active: step === 1 || step === 2 },
    { label: "Opportunities Found", done: step >= 3 },
  ];

  const opportunities = [
    { trade: "HVAC", confidence: 94, color: "text-teal-400", bg: "bg-teal-400/10 border-teal-400/30" },
    { trade: "Roofing", confidence: 87, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
    { trade: "Foundation", confidence: 72, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/30" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="space-y-4 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                s.done ? "bg-teal-400" : s.active ? "bg-teal-400/20 border border-teal-400" : "bg-white/10 border border-white/20"
              }`}>
                {s.done ? (
                  <svg className="w-4 h-4 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : s.active ? (
                  <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-xs text-white/40">{i + 1}</span>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors duration-300 ${
                s.done ? "text-teal-400" : s.active ? "text-white" : "text-white/40"
              }`}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-gradient-to-br from-slate-700 to-slate-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/30">
              <Camera className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Home exterior photo</p>
            </div>
          </div>
          {(step === 1 || step === 2) && (
            <div className="absolute inset-0 bg-teal-400/10 flex items-center justify-center animate-pulse">
              <div className="bg-[#0A1628]/80 rounded-xl px-4 py-2 border border-teal-400/40 flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-teal-400 text-sm font-medium">Analyzing...</span>
              </div>
            </div>
          )}
          {step >= 3 && (
            <div className="absolute inset-0 flex items-end p-3">
              <div className="w-full bg-[#0A1628]/90 rounded-xl p-3 border border-teal-400/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-teal-400" />
                  <span className="text-teal-400 text-xs font-semibold uppercase tracking-wide">AI Analysis Complete</span>
                </div>
                <p className="text-white text-sm font-medium">Found 3 service opportunities</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-teal-400" />
          AI Results
        </h3>
        <div className={`space-y-3 transition-all duration-700 ${step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="rounded-xl border border-white/10 p-3 mb-4 bg-white/5">
            <p className="text-white/60 text-sm">Detected issues in uploaded photo</p>
            <p className="text-white font-semibold">Found 3 opportunities</p>
          </div>
          {opportunities.map((o, i) => (
            <div
              key={o.trade}
              className={`rounded-xl border p-4 ${o.bg} transition-all duration-500`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-semibold ${o.color}`}>{o.trade}</span>
                <span className={`text-sm font-bold ${o.color}`}>{o.confidence}% match</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-current ${o.color} transition-all duration-1000`}
                  style={{ width: step >= 3 ? `${o.confidence}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadGenerationTab() {
  const [visibleLeads, setVisibleLeads] = useState(0);

  useEffect(() => {
    setVisibleLeads(0);
    const t1 = setTimeout(() => setVisibleLeads(1), 600);
    const t2 = setTimeout(() => setVisibleLeads(2), 1400);
    const t3 = setTimeout(() => setVisibleLeads(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const leads = [
    { address: "2847 Oak Hollow Dr, Plano TX", trade: "HVAC", budget: "$3,200 – $4,800", urgent: true },
    { address: "1105 Ridgeline Blvd, Frisco TX", trade: "Roofing", budget: "$8,500 – $12,000", urgent: false },
    { address: "543 Maple Creek Ln, McKinney TX", trade: "Foundation", budget: "$6,000 – $9,500", urgent: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-white font-semibold mb-4">DFW Coverage Map</h3>
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 aspect-square overflow-hidden">
          <div className="absolute inset-0">
            <svg viewBox="0 0 300 300" className="w-full h-full opacity-20">
              {Array.from({ length: 6 }).map((_, i) => (
                <circle key={i} cx="150" cy="150" r={40 + i * 20} fill="none" stroke="#2dd4bf" strokeWidth="0.5" />
              ))}
              <line x1="150" y1="0" x2="150" y2="300" stroke="#2dd4bf" strokeWidth="0.3" />
              <line x1="0" y1="150" x2="300" y2="150" stroke="#2dd4bf" strokeWidth="0.3" />
            </svg>
          </div>
          {[
            { cx: "45%", cy: "40%", delay: "0s" },
            { cx: "60%", cy: "55%", delay: "0.8s" },
            { cx: "35%", cy: "62%", delay: "1.6s" },
          ].map((pin, i) => (
            visibleLeads > i && (
              <div
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: pin.cx, top: pin.cy }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-teal-400 rounded-full z-10 relative" />
                  <div className="absolute inset-0 rounded-full bg-teal-400/30 animate-ping" style={{ animationDelay: pin.delay }} />
                  <div className="absolute -inset-2 rounded-full bg-teal-400/10 animate-ping" style={{ animationDelay: pin.delay, animationDuration: "2s" }} />
                </div>
              </div>
            )
          ))}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-[#0A1628]/80 rounded-lg p-2 border border-teal-400/20 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-400 text-xs font-medium">{visibleLeads} new leads in your area</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Incoming Leads</h3>
        <div className="space-y-3">
          {leads.map((lead, i) => (
            <div
              key={i}
              className={`rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-500 ${
                visibleLeads > i ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm font-medium leading-tight">{lead.address}</span>
                </div>
                {lead.urgent && (
                  <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded-full flex-shrink-0 ml-2">Urgent</span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs bg-teal-400/10 text-teal-400 border border-teal-400/30 px-2 py-0.5 rounded-full">{lead.trade}</span>
                <span className="text-xs text-white/50">{lead.budget}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProMatchingTab() {
  const pros = [
    { name: "Marcus T.", rating: 4.9, jobs: 312, score: 97, trade: "HVAC Specialist" },
    { name: "Sarah K.", rating: 4.8, jobs: 189, score: 91, trade: "HVAC & Cooling" },
    { name: "Derek W.", rating: 4.7, jobs: 445, score: 84, trade: "HVAC Pro" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-white font-semibold mb-4">Homeowner Request</h3>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center">
              <span className="text-teal-400 font-bold text-sm">JM</span>
            </div>
            <div>
              <p className="text-white font-medium">Jennifer M.</p>
              <p className="text-white/50 text-xs">Plano, TX 75023</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Service</span>
              <span className="text-white font-medium">HVAC Replacement</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Budget</span>
              <span className="text-white font-medium">$3,200 – $4,800</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Timeline</span>
              <span className="text-white font-medium">Within 2 weeks</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Home Size</span>
              <span className="text-white font-medium">2,400 sq ft</span>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-teal-400/10 border border-teal-400/20 p-2 flex items-center gap-2">
            <Zap className="w-3 h-3 text-teal-400 flex-shrink-0" />
            <span className="text-teal-400 text-xs font-medium">Matched in 0.3 seconds</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Matched Pros</h3>
        <div className="space-y-3">
          {pros.map((pro, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400/30 to-blue-400/30 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{pro.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{pro.name}</p>
                    <p className="text-white/40 text-xs">{pro.trade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${i === 0 ? "text-teal-400" : "text-white/70"}`}>{pro.score}%</div>
                  <div className="text-white/40 text-xs">match</div>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
                <div
                  className={`h-1.5 rounded-full transition-all duration-1000 ${i === 0 ? "bg-teal-400" : "bg-blue-400/60"}`}
                  style={{ width: `${pro.score}%` }}
                />
              </div>
              <div className="flex items-center gap-3 text-xs text-white/40">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" />{pro.rating}</span>
                <span>{pro.jobs} jobs</span>
                {i === 0 && <span className="ml-auto text-teal-400 font-medium">Best Match</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobCompletionTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-white font-semibold mb-4">Project Complete</h3>
        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-gradient-to-br from-slate-700 to-slate-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/30">
              <CheckSquare className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Job completion photo</p>
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <div className="bg-green-500/90 rounded-full px-3 py-1 flex items-center gap-1.5">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white text-xs font-semibold">Completed</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-green-400 font-semibold">Payment processed automatically</span>
          </div>
          <div className="space-y-2 text-sm">
            {["Homeowner approval received", "Pro notified of payment", "Commission calculated", "Funds released to escrow"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70">
                <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Job Total</span>
            <span className="text-white font-semibold">$4,200</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Platform Fee</span>
            <span className="text-white/70">$420 (10%)</span>
          </div>
          <div className="flex justify-between text-sm border-t border-white/10 pt-2 mt-2">
            <span className="text-white font-medium">Pro Payout</span>
            <span className="text-green-400 font-bold">$3,780</span>
          </div>
        </div>
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 flex items-center gap-3">
          <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          <div>
            <p className="text-white text-sm font-medium">Homeowner left 5-star review</p>
            <p className="text-white/50 text-xs">"Marcus did an amazing job!"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EarningsTab() {
  const [animating, setAnimating] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimating(true), 400);
    const t2 = setTimeout(() => setShowFinal(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div>
        <h3 className="text-white font-semibold mb-4">Commission Breakdown</h3>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Job Value</span>
            <span className="text-white font-bold text-xl">$8,400</span>
          </div>
          <div className="w-full h-px bg-white/10" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Direct Commission</p>
                <p className="text-white/40 text-xs">Tier 3 — 14% rate</p>
              </div>
              <div className={`text-teal-400 font-bold text-lg transition-all duration-1000 ${animating ? "opacity-100" : "opacity-0"}`}>
                +$1,176
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-teal-400 transition-all duration-1500"
                style={{ width: animating ? "14%" : "0%", transitionDuration: "1.5s" }}
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Network Override</p>
                <p className="text-white/40 text-xs">From your referral network</p>
              </div>
              <div className={`text-blue-400 font-bold text-lg transition-all duration-1000 delay-300 ${animating ? "opacity-100" : "opacity-0"}`}>
                +$84
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-400 transition-all duration-1000"
                style={{ width: animating ? "1%" : "0%", transitionDelay: "300ms" }}
              />
            </div>
          </div>
          <div className={`mt-2 rounded-xl bg-teal-400/10 border border-teal-400/30 p-4 transition-all duration-700 ${showFinal ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="flex items-center justify-between">
              <span className="text-teal-400 font-semibold">Total Earned</span>
              <span className="text-teal-400 font-bold text-2xl">$1,260</span>
            </div>
            <p className="text-white/40 text-xs mt-1">From a single $8,400 job</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Your 5 Income Streams</h3>
        <div className="space-y-3">
          {[
            { stream: "Direct Commission", desc: "12–70% by tier", color: "bg-teal-400", active: true },
            { stream: "Network Override", desc: "1–4% from your recruits", color: "bg-blue-400", active: true },
            { stream: "Subscription Override", desc: "10% of referred pro subs", color: "bg-purple-400", active: false },
            { stream: "Homeowner Override", desc: "$25–100 per lead", color: "bg-yellow-400", active: false },
            { stream: "Home Origination", desc: "Permanent revenue share", color: "bg-orange-400", active: false },
          ].map((s, i) => (
            <div key={i} className={`rounded-xl border p-3 flex items-center gap-3 ${s.active ? "border-white/20 bg-white/5" : "border-white/10 bg-white/[0.02]"}`}>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.color} ${s.active ? "" : "opacity-40"}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${s.active ? "text-white" : "text-white/40"}`}>{s.stream}</p>
                <p className={`text-xs ${s.active ? "text-white/50" : "text-white/25"}`}>{s.desc}</p>
              </div>
              {s.active && <span className="text-xs text-teal-400 font-medium">Active</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TAB_COMPONENTS: Record<string, () => JSX.Element> = {
  photo: PhotoScanTab,
  leads: LeadGenerationTab,
  matching: ProMatchingTab,
  completion: JobCompletionTab,
  earnings: EarningsTab,
};

export default function Demo() {
  const [activeTab, setActiveTab] = useState("photo");
  const [tabKey, setTabKey] = useState(0);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setTabKey(k => k + 1);
  };

  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-400/10 border border-teal-400/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-400 text-sm font-medium">Live Demo</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            See ProLnk in Action
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Watch how our AI matches homeowners with the right pro — automatically
          </p>
        </div>

        {/* Demo Tabs */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {/* Tab Nav */}
          <div className="flex overflow-x-auto border-b border-white/10 scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
                    isActive
                      ? "text-teal-400 border-teal-400 bg-teal-400/5"
                      : "text-white/40 border-transparent hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-10 min-h-[420px]">
            <ActiveComponent key={tabKey} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">
            <h2 className="text-3xl font-bold text-white mb-3">Ready to Get Started?</h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              Join thousands of pros already earning with ProLnk's AI-powered matching platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pro-waitlist"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[#0A1628] bg-teal-400 hover:bg-teal-300 transition-colors"
              >
                Join ProLnk
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors"
              >
                <Play className="w-4 h-4" />
                Schedule a Real Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
