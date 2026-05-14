import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  GitCompare, Star, Loader2, DollarSign, CheckCircle, Clock,
  Shield, Award, ThumbsUp, Zap, ArrowRight, ChevronDown,
  ChevronUp, Phone, MessageSquare, X, Plus
} from "lucide-react";

const SERVICE_TYPES = [
  "Plumbing", "HVAC", "Electrical", "Roofing", "Landscaping",
  "Painting", "Flooring", "Remodeling", "Pest Control", "Handyman",
];

const MOCK_CONTRACTORS = [
  {
    id: 1,
    name: "ProFix Plumbing",
    trade: "Plumber",
    avatar: "P",
    color: "#06b6d4",
    rating: 4.9,
    reviews: 312,
    priceRange: "$180–$250",
    priceRaw: 215,
    responseTime: "< 2 hrs",
    availability: "This Week",
    verified: true,
    insured: true,
    licensed: true,
    backgroundCheck: true,
    yearsExp: 12,
    certifications: ["Master Plumber", "Gas Certified"],
    jobsCompleted: 1240,
    specialties: ["Emergency Repairs", "Repiping", "Water Heaters"],
    phone: "555-0101",
    bestValue: true,
    recentReview: "Fixed our burst pipe in 45 minutes. Professional and fair pricing.",
  },
  {
    id: 2,
    name: "Apex Home Services",
    trade: "Plumber",
    avatar: "A",
    color: "#8b5cf6",
    rating: 4.7,
    reviews: 198,
    priceRange: "$200–$300",
    priceRaw: 250,
    responseTime: "2–4 hrs",
    availability: "Tomorrow",
    verified: true,
    insured: true,
    licensed: true,
    backgroundCheck: false,
    yearsExp: 8,
    certifications: ["Licensed Plumber"],
    jobsCompleted: 780,
    specialties: ["Drain Cleaning", "Water Heaters", "Fixture Install"],
    phone: "555-0202",
    bestValue: false,
    recentReview: "Showed up on time, did great work. Would hire again.",
  },
  {
    id: 3,
    name: "FastFlow Plumbing",
    trade: "Plumber",
    avatar: "F",
    color: "#10b981",
    rating: 4.6,
    reviews: 89,
    priceRange: "$240–$350",
    priceRaw: 295,
    responseTime: "Same day",
    availability: "Today",
    verified: true,
    insured: true,
    licensed: false,
    backgroundCheck: true,
    yearsExp: 5,
    certifications: ["Journeyman Plumber"],
    jobsCompleted: 340,
    specialties: ["Emergency", "Drain Unclogging"],
    phone: "555-0303",
    bestValue: false,
    recentReview: "Got here fast. Price was higher than expected but job is done.",
  },
];

type Contractor = typeof MOCK_CONTRACTORS[number];

const COMPARE_ROWS = [
  { key: "priceRange",   label: "Estimated Price",  icon: DollarSign, format: (c: Contractor) => c.priceRange },
  { key: "rating",       label: "Rating",           icon: Star,       format: (c: Contractor) => `${c.rating} (${c.reviews} reviews)` },
  { key: "responseTime", label: "Response Time",    icon: Clock,      format: (c: Contractor) => c.responseTime },
  { key: "availability", label: "Availability",     icon: Zap,        format: (c: Contractor) => c.availability },
  { key: "verified",     label: "Verified",         icon: CheckCircle,format: (c: Contractor) => c.verified ? "✓ Verified" : "Not verified", bool: true, boolKey: "verified" },
  { key: "insured",      label: "Insured",          icon: Shield,     format: (c: Contractor) => c.insured ? "✓ Insured" : "Not insured", bool: true, boolKey: "insured" },
  { key: "licensed",     label: "Licensed",         icon: Award,      format: (c: Contractor) => c.licensed ? "✓ Licensed" : "Not listed", bool: true, boolKey: "licensed" },
  { key: "yearsExp",     label: "Experience",       icon: ThumbsUp,   format: (c: Contractor) => `${c.yearsExp} years` },
  { key: "jobs",         label: "Jobs Completed",   icon: CheckCircle,format: (c: Contractor) => c.jobsCompleted.toLocaleString() },
] as const;

function ProCard({ contractor, onRemove, onRequest }: { contractor: Contractor; onRemove: () => void; onRequest: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`relative bg-[#0f1e35] rounded-2xl border-2 overflow-hidden transition-all ${
      contractor.bestValue ? "border-teal-500/50" : "border-[#1e2d45]"
    }`}>
      {contractor.bestValue && (
        <div className="absolute top-0 left-0 right-0 bg-teal-500 text-center py-1">
          <span className="text-[11px] font-black text-white tracking-wide uppercase">Best Value</span>
        </div>
      )}
      <div className={`p-4 ${contractor.bestValue ? "pt-7" : ""}`}>
        <button onClick={onRemove}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#1a2d47] flex items-center justify-center text-slate-500 hover:text-slate-300 z-10">
          <X className="w-3 h-3" />
        </button>

        <div className="flex flex-col items-center text-center gap-2 mb-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl"
            style={{ backgroundColor: contractor.color }}>
            {contractor.avatar}
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">{contractor.name}</p>
            <p className="text-xs text-slate-500">{contractor.trade}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-white">{contractor.rating}</span>
            <span className="text-xs text-slate-600">({contractor.reviews})</span>
          </div>
        </div>

        <div className="text-center mb-3">
          <span className="text-lg font-black text-white">{contractor.priceRange}</span>
          <p className="text-[10px] text-slate-500 mt-0.5">Estimated for your job</p>
        </div>

        <div className="flex flex-wrap gap-1 justify-center mb-3">
          {contractor.verified && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
              ✓ Verified
            </span>
          )}
          {contractor.insured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Insured
            </span>
          )}
          {contractor.licensed && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Licensed
            </span>
          )}
        </div>

        {expanded && (
          <div className="space-y-2 mb-3 pt-3 border-t border-[#1e2d45]">
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Certifications</p>
              <div className="flex flex-wrap gap-1">
                {contractor.certifications.map(c => (
                  <span key={c} className="text-[10px] bg-[#1a2d47] text-slate-400 px-2 py-0.5 rounded-md">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Specialties</p>
              <div className="flex flex-wrap gap-1">
                {contractor.specialties.map(s => (
                  <span key={s} className="text-[10px] bg-[#1a2d47] text-slate-400 px-2 py-0.5 rounded-md">{s}</span>
                ))}
              </div>
            </div>
            {contractor.recentReview && (
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Recent Review</p>
                <p className="text-xs text-slate-400 italic">"{contractor.recentReview}"</p>
              </div>
            )}
          </div>
        )}

        <button onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 mb-3 transition-colors">
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? "Show less" : "Show more"}
        </button>

        <button onClick={onRequest}
          className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
            contractor.bestValue
              ? "bg-teal-500 hover:bg-teal-400 text-white"
              : "bg-[#1a2d47] hover:bg-[#223a5e] text-white border border-[#2a3f5f]"
          }`}>
          Request Quote
        </button>

        <div className="flex gap-2 mt-2">
          {contractor.phone && (
            <a href={`tel:${contractor.phone}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#1a2d47] hover:bg-[#223a5e] text-slate-400 text-xs font-medium transition-colors">
              <Phone className="w-3.5 h-3.5" /> Call
            </a>
          )}
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#1a2d47] hover:bg-[#223a5e] text-slate-400 text-xs font-medium transition-colors">
            <MessageSquare className="w-3.5 h-3.5" /> Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContractorComparison() {
  const [serviceType, setServiceType] = useState("Plumbing");
  const [selected, setSelected] = useState<Contractor[]>(MOCK_CONTRACTORS.slice(0, 3));
  const [tableView, setTableView] = useState(false);
  const [requestedId, setRequestedId] = useState<number | null>(null);

  const { data: quotes, isLoading } = trpc.homeownerExtras.getContractorComparisons.useQuery();

  const hasLiveData = (quotes as any[] | undefined)?.length;

  const removeContractor = (id: number) => {
    setSelected(prev => prev.filter(c => c.id !== id));
  };

  const addContractor = () => {
    const available = MOCK_CONTRACTORS.filter(c => !selected.find(s => s.id === c.id));
    if (available.length) setSelected(prev => [...prev, available[0]]);
  };

  const handleRequest = (id: number) => {
    setRequestedId(id);
    setTimeout(() => setRequestedId(null), 2000);
  };

  if (isLoading) {
    return (
      <HomeownerLayout>
        <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="max-w-5xl mx-auto p-4 pb-20 space-y-6">

          {/* ── Header ──────────────────────────────────────────── */}
          <div className="pt-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <GitCompare className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Compare Pros</h1>
                <p className="text-sm text-slate-400">
                  {serviceType} · {selected.length} contractor{selected.length !== 1 ? "s" : ""} selected
                </p>
              </div>
            </div>
          </div>

          {/* ── Service Type Selector ────────────────────────────── */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Comparing for</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {SERVICE_TYPES.map(s => (
                <button key={s} onClick={() => setServiceType(s)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    serviceType === s
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "bg-[#0f1e35] text-slate-500 border border-[#1e2d45] hover:border-slate-600"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ── View Toggle ─────────────────────────────────────── */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {selected.length > 0 ? `Comparing ${selected.length} pro${selected.length !== 1 ? "s" : ""}` : "Select pros to compare"}
            </p>
            <div className="flex items-center gap-1 bg-[#0f1e35] rounded-xl p-1 border border-[#1e2d45]">
              <button onClick={() => setTableView(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!tableView ? "bg-[#1a2d47] text-white" : "text-slate-500"}`}>
                Cards
              </button>
              <button onClick={() => setTableView(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tableView ? "bg-[#1a2d47] text-white" : "text-slate-500"}`}>
                Table
              </button>
            </div>
          </div>

          {hasLiveData ? (
            /* ── Live data from API ─────────────────────────────── */
            <div className="space-y-4">
              {(quotes as any[]).map((q: any) => {
                const isBest = q.quotedAmount === Math.min(...(quotes as any[]).map((x: any) => x.quotedAmount ?? Infinity));
                return (
                  <div key={q.id}
                    className={`bg-[#0f1e35] rounded-2xl border-2 p-5 transition-all ${
                      isBest ? "border-teal-500/40" : "border-[#1e2d45]"
                    }`}>
                    {isBest && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-400 text-[11px] font-bold mb-3">
                        <CheckCircle className="w-3 h-3" /> Best Value
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-bold text-white">{q.businessName}</p>
                        <p className="text-xs text-slate-500">{q.trade}</p>
                        {q.averageRating && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs text-slate-400">{Number(q.averageRating).toFixed(1)} ({q.reviewCount})</span>
                          </div>
                        )}
                        <p className="text-xs text-slate-600 mt-1">{q.serviceCategory} · {new Date(q.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-white">${Number(q.quotedAmount).toLocaleString()}</p>
                        <button
                          onClick={() => setRequestedId(q.id)}
                          className="mt-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-colors">
                          {requestedId === q.id ? "✓ Requested!" : "Accept Quote"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : selected.length === 0 ? (
            /* ── Empty state ─────────────────────────────────────── */
            <div className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <GitCompare className="h-8 w-8 text-purple-400" />
              </div>
              <p className="font-bold text-white text-lg mb-2">No pros to compare yet</p>
              <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
                Request quotes from multiple pros to compare them side-by-side here.
              </p>
              <Link href="/my-home/quick-quote">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-semibold transition-colors">
                  Request Quotes <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          ) : !tableView ? (
            /* ── Card View ─────────────────────────────────────── */
            <div>
              <div className={`grid gap-4 ${
                selected.length === 1 ? "grid-cols-1 max-w-sm mx-auto" :
                selected.length === 2 ? "grid-cols-2" :
                "grid-cols-3"
              }`}>
                {selected.map(contractor => (
                  <ProCard
                    key={contractor.id}
                    contractor={contractor}
                    onRemove={() => removeContractor(contractor.id)}
                    onRequest={() => handleRequest(contractor.id)}
                  />
                ))}
                {selected.length < 3 && (
                  <button onClick={addContractor}
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-[#1e2d45] hover:border-teal-500/30 text-slate-600 hover:text-teal-400 transition-all min-h-[200px]">
                    <Plus className="w-8 h-8" />
                    <span className="text-sm font-semibold">Add Pro</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* ── Table View ─────────────────────────────────────── */
            <div className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] overflow-hidden">
              {/* Pro header row */}
              <div className="grid border-b border-[#1e2d45]" style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}>
                <div className="p-4" />
                {selected.map(c => (
                  <div key={c.id} className={`p-4 text-center border-l border-[#1e2d45] ${c.bestValue ? "bg-teal-500/5" : ""}`}>
                    {c.bestValue && (
                      <div className="text-[10px] font-black text-teal-400 mb-1 uppercase tracking-wide">Best Value</div>
                    )}
                    <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-white font-black text-base"
                      style={{ backgroundColor: c.color }}>
                      {c.avatar}
                    </div>
                    <p className="text-xs font-bold text-white leading-tight">{c.name}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-slate-400">{c.rating}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison rows */}
              {COMPARE_ROWS.map((row, i) => (
                <div key={row.key} className={`grid border-b border-[#1e2d45] ${i % 2 === 0 ? "" : "bg-[#0A1628]/30"}`}
                  style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}>
                  <div className="p-3.5 flex items-center gap-2">
                    <row.icon className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-500">{row.label}</span>
                  </div>
                  {selected.map(c => {
                    const value = row.format(c);
                    const isBoolTrue = (row as any).bool && (c as any)[(row as any).boolKey] === true;
                    const isBoolFalse = (row as any).bool && (c as any)[(row as any).boolKey] !== true;
                    return (
                      <div key={c.id} className={`p-3.5 border-l border-[#1e2d45] text-center ${c.bestValue ? "bg-teal-500/5" : ""}`}>
                        <span className={`text-xs font-semibold ${
                          isBoolTrue ? "text-teal-400" :
                          isBoolFalse ? "text-slate-600" :
                          "text-white"
                        }`}>
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Request row */}
              <div className="grid" style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}>
                <div className="p-4" />
                {selected.map(c => (
                  <div key={c.id} className={`p-4 border-l border-[#1e2d45] ${c.bestValue ? "bg-teal-500/5" : ""}`}>
                    <button
                      onClick={() => handleRequest(c.id)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                        requestedId === c.id
                          ? "bg-teal-500/20 text-teal-400"
                          : c.bestValue
                            ? "bg-teal-500 hover:bg-teal-400 text-white"
                            : "bg-[#1a2d47] hover:bg-[#223a5e] text-white"
                      }`}>
                      {requestedId === c.id ? "✓ Sent!" : "Request Quote"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── See More ─────────────────────────────────────────── */}
          <div className="text-center pt-2">
            <Link href="/my-home/directory">
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors">
                See more pros in your area <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
