import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  GitCompare, Star, Loader2, DollarSign, CheckCircle, Clock,
  Shield, Award, ThumbsUp, Zap, ArrowRight, ChevronDown,
  ChevronUp, Phone, MessageSquare, X, Plus, TrendingUp
} from "lucide-react";

const SERVICE_TYPES = [
  "Plumbing", "HVAC", "Electrical", "Roofing", "Landscaping",
  "Painting", "Flooring", "Remodeling", "Pest Control", "Handyman",
];

const PRICE_RANGES: Record<string, { low: number; high: number; unit: string }> = {
  Plumbing:    { low: 150, high: 350, unit: "per visit" },
  HVAC:        { low: 200, high: 500, unit: "per visit" },
  Electrical:  { low: 175, high: 400, unit: "per visit" },
  Roofing:     { low: 500, high: 3000, unit: "per project" },
  Landscaping: { low: 75,  high: 250, unit: "per visit" },
  Painting:    { low: 300, high: 2500, unit: "per project" },
  Flooring:    { low: 800, high: 5000, unit: "per project" },
  Remodeling:  { low: 2000, high: 25000, unit: "per project" },
  "Pest Control": { low: 100, high: 400, unit: "per treatment" },
  Handyman:    { low: 80,  high: 200, unit: "per hour" },
};

const MOCK_CONTRACTORS = [
  {
    id: 1,
    name: "ProFix Plumbing",
    trade: "Plumber",
    avatar: "P",
    color: "#06b6d4″,
    rating: 4.9,
    reviews: 312,
    priceRange: "$180–$250″,
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
    phone: "555-0101″,
    bestValue: true,
    highestRated: false,
    fastestResponse: false,
    recentReview: "Fixed our burst pipe in 45 minutes. Professional and fair pricing.",
  },
  {
    id: 2,
    name: "Apex Home Services",
    trade: "Plumber",
    avatar: "A",
    color: "#8b5cf6″,
    rating: 4.7,
    reviews: 198,
    priceRange: "$200–$300″,
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
    phone: "555-0202″,
    bestValue: false,
    highestRated: false,
    fastestResponse: false,
    recentReview: "Showed up on time, did great work. Would hire again.",
  },
  {
    id: 3,
    name: "FastFlow Plumbing",
    trade: "Plumber",
    avatar: "F",
    color: "#10b981″,
    rating: 4.6,
    reviews: 89,
    priceRange: "$240–$350″,
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
    phone: "555-0303″,
    bestValue: false,
    highestRated: false,
    fastestResponse: true,
    recentReview: "Got here fast. Price was higher than expected but job is done.",
  },
];

type Contractor = typeof MOCK_CONTRACTORS[number];

const COMPARE_ROWS = [
  { key: "priceRange",   label: "Estimated Price",  icon: DollarSign, format: (c: Contractor) => c.priceRange },
  { key: "rating",       label: "Rating",           icon: Star,       format: (c: Contractor) => `${c.rating} (${c.reviews} reviews)` },
  { key: "responseTime", label: "Response Time",    icon: Clock,      format: (c: Contractor) => c.responseTime },
  { key: "availability", label: "Availability",     icon: Zap,        format: (c: Contractor) => c.availability },
  { key: "verified",     label: "Verified",         icon: CheckCircle,format: (c: Contractor) => c.verified ? "✓ Verified" : "Not verified",     bool: true, boolKey: "verified" as keyof Contractor },
  { key: "insured",      label: "Insured",          icon: Shield,     format: (c: Contractor) => c.insured ? "✓ Insured" : "Not insured",         bool: true, boolKey: "insured" as keyof Contractor },
  { key: "licensed",     label: "Licensed",         icon: Award,      format: (c: Contractor) => c.licensed ? "✓ Licensed" : "Not listed",        bool: true, boolKey: "licensed" as keyof Contractor },
  { key: "bgcheck",      label: "Background Check", icon: Shield,     format: (c: Contractor) => c.backgroundCheck ? "✓ Cleared" : "Not on file", bool: true, boolKey: "backgroundCheck" as keyof Contractor },
  { key: "yearsExp",     label: "Experience",       icon: ThumbsUp,   format: (c: Contractor) => `${c.yearsExp} years` },
  { key: "jobs",         label: "Jobs Completed",   icon: CheckCircle,format: (c: Contractor) => c.jobsCompleted.toLocaleString() },
] as const;

function TrustBadge({ label, icon: Icon, active }: { label: string; icon: typeof Shield; active: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
      active
        ? "bg-teal-500/10 text-teal-400 border-teal-500/20″
        : "bg-slate-800 text-slate-600 border-slate-700 line-through opacity-50″
    }`}>
      <Icon className="w-2.5 h-2.5″ />
      {label}
    </span>
  );
}

function ProCard({ contractor, onRemove, onRequest }: { contractor: Contractor; onRemove: () => void; onRequest: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const badge = contractor.bestValue ? { label: "Best Value", color: "bg-teal-500″ }
    : contractor.highestRated ? { label: "Highest Rated", color: "bg-amber-500″ }
    : contractor.fastestResponse ? { label: "Fastest Response", color: "bg-purple-500″ }
    : null;

  return (
    <div className={`relative bg-slate-900 rounded-2xl border-2 overflow-hidden transition-all ${
      badge ? "border-teal-500/40″ : "border-slate-700"
    }`}>
      {badge && (
        <div className={`absolute top-0 left-0 right-0 ${badge.color} text-center py-1`}>
          <span className="text-[11px] font-black text-white tracking-wide uppercase">{badge.label}</span>
        </div>
      )}
      <div className={`p-4 ${badge ? "pt-7" : ""}`}>
        <button onClick={onRemove}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-300 z-10″>
          <X className="w-3 h-3″ />
        </button>

        <div className="flex flex-col items-center text-center gap-2 mb-3″>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl"
            style={{ backgroundColor: contractor.color }}>
            {contractor.avatar}
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">{contractor.name}</p>
            <p className="text-xs text-slate-500″>{contractor.trade}</p>
          </div>
          <div className="flex items-center gap-1.5″>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400″ />
            <span className="text-sm font-bold text-white">{contractor.rating}</span>
            <span className="text-xs text-slate-600″>({contractor.reviews})</span>
          </div>
        </div>

        <div className="text-center mb-3″>
          <span className="text-lg font-black text-white">{contractor.priceRange}</span>
          <p className="text-[10px] text-slate-500 mt-0.5″>Estimated for your job</p>
        </div>

        <div className="flex flex-wrap gap-1 justify-center mb-3″>
          <TrustBadge label="Verified" icon={CheckCircle} active={contractor.verified} />
          <TrustBadge label="Insured" icon={Shield} active={contractor.insured} />
          <TrustBadge label="Licensed" icon={Award} active={contractor.licensed} />
          <TrustBadge label="BG Check" icon={Shield} active={contractor.backgroundCheck} />
        </div>

        <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-3″>
          <Clock className="w-3 h-3″ />
          <span>Responds in {contractor.responseTime}</span>
        </div>

        {expanded && (
          <div className="space-y-2 mb-3 pt-3 border-t border-slate-700/50″>
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1″>Certifications</p>
              <div className="flex flex-wrap gap-1″>
                {contractor.certifications.map(c => (
                  <span key={c} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1″>Specialties</p>
              <div className="flex flex-wrap gap-1″>
                {contractor.specialties.map(s => (
                  <span key={s} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">{s}</span>
                ))}
              </div>
            </div>
            {contractor.recentReview && (
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1″>Recent Review</p>
                <p className="text-xs text-slate-400 italic">"{contractor.recentReview}"</p>
              </div>
            )}
          </div>
        )}

        <button onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 mb-3 transition-colors">
          {expanded ? <ChevronUp className="w-3 h-3″ /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? "Show less" : "Show more"}
        </button>

        <button onClick={onRequest}
          className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
            badge
              ? "bg-teal-500 hover:bg-teal-400 text-white"
              : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-600″
          }`}>
          Book This Pro
        </button>

        <div className="flex gap-2 mt-2″>
          {contractor.phone && (
            <a href={`tel:${contractor.phone}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-medium transition-colors">
              <Phone className="w-3.5 h-3.5″ /> Call
            </a>
          )}
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-medium transition-colors">
            <MessageSquare className="w-3.5 h-3.5″ /> Message
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
  const priceRange = PRICE_RANGES[serviceType];

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
          <Loader2 className="h-8 w-8 animate-spin text-teal-400″ />
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="max-w-5xl mx-auto p-4 pb-20 space-y-6″>

          <div className="pt-2″>
            <div className="flex items-center gap-3 mb-1″>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <GitCompare className="w-6 h-6 text-purple-400″ />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Compare Pros</h1>
                <p className="text-sm text-slate-400″>
                  {serviceType} · {selected.length} contractor{selected.length !== 1 ? "s" : ""} selected
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2″>Comparing for</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {SERVICE_TYPES.map(s => (
                <button key={s} onClick={() => setServiceType(s)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    serviceType === s
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30″
                      : "bg-slate-900 text-slate-500 border border-slate-700 hover:border-slate-600″
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {priceRange && (
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 flex items-center gap-3″>
              <TrendingUp className="w-5 h-5 text-teal-400 flex-shrink-0″ />
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Typical price range — {serviceType}</p>
                <p className="text-white font-bold">${priceRange.low.toLocaleString()} – ${priceRange.high.toLocaleString()} <span className="text-slate-500 font-normal text-sm">{priceRange.unit}</span></p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500″>
              {selected.length > 0 ? `Comparing ${selected.length} pro${selected.length !== 1 ? "s" : ""}` : "Select pros to compare"}
            </p>
            <div className="flex items-center gap-1 bg-slate-900 rounded-xl p-1 border border-slate-700″>
              <button onClick={() => setTableView(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!tableView ? "bg-slate-700 text-white" : "text-slate-500"}`}>
                Cards
              </button>
              <button onClick={() => setTableView(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tableView ? "bg-slate-700 text-white" : "text-slate-500"}`}>
                Table
              </button>
            </div>
          </div>

          {hasLiveData ? (
            <div className="space-y-4″>
              {(quotes as any[]).map((q: any) => {
                const isBest = q.quotedAmount === Math.min(...(quotes as any[]).map((x: any) => x.quotedAmount ?? Infinity));
                return (
                  <div key={q.id}
                    className={`bg-slate-900 rounded-2xl border-2 p-5 transition-all ${
                      isBest ? "border-teal-500/40″ : "border-slate-700"
                    }`}>
                    {isBest && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-400 text-[11px] font-bold mb-3″>
                        <CheckCircle className="w-3 h-3″ /> Best Value
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-3″>
                      <div className="flex-1″>
                        <p className="font-bold text-white">{q.businessName}</p>
                        <p className="text-xs text-slate-500″>{q.trade}</p>
                        {q.averageRating && (
                          <div className="flex items-center gap-1 mt-1″>
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400″ />
                            <span className="text-xs text-slate-400″>{Number(q.averageRating).toFixed(1)} ({q.reviewCount})</span>
                          </div>
                        )}
                        <p className="text-xs text-slate-600 mt-1″>{q.serviceCategory} · {new Date(q.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-white">${Number(q.quotedAmount).toLocaleString()}</p>
                        <button
                          onClick={() => setRequestedId(q.id)}
                          className="mt-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-colors">
                          {requestedId === q.id ? "✓ Booked!" : "Book This Pro"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : selected.length === 0 ? (
            <div className="bg-slate-900 rounded-2xl border border-slate-700 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4″>
                <GitCompare className="h-8 w-8 text-purple-400″ />
              </div>
              <p className="font-bold text-white text-lg mb-2″>No pros to compare yet</p>
              <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
                Request quotes from multiple pros to compare them side-by-side here.
              </p>
              <Link href="/my-home/quick-quote">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-semibold transition-colors">
                  Request Quotes <ArrowRight className="w-4 h-4″ />
                </button>
              </Link>
            </div>
          ) : !tableView ? (
            <div>
              <div className={`grid gap-4 ${
                selected.length === 1 ? "grid-cols-1 max-w-sm mx-auto" :
                selected.length === 2 ? "grid-cols-2″ :
                "grid-cols-3″
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
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-teal-500/30 text-slate-600 hover:text-teal-400 transition-all min-h-[200px]">
                    <Plus className="w-8 h-8″ />
                    <span className="text-sm font-semibold">Add Pro</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="grid border-b border-slate-700″ style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}>
                <div className="p-4″ />
                {selected.map(c => {
                  const badge = c.bestValue ? "Best Value" : c.highestRated ? "Highest Rated" : c.fastestResponse ? "Fastest" : null;
                  return (
                    <div key={c.id} className={`p-4 text-center border-l border-slate-700 ${c.bestValue ? "bg-teal-500/5" : ""}`}>
                      {badge && (
                        <div className="text-[10px] font-black text-teal-400 mb-1 uppercase tracking-wide">{badge}</div>
                      )}
                      <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-white font-black text-base"
                        style={{ backgroundColor: c.color }}>
                        {c.avatar}
                      </div>
                      <p className="text-xs font-bold text-white leading-tight">{c.name}</p>
                      <div className="flex items-center justify-center gap-1 mt-1″>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400″ />
                        <span className="text-xs text-slate-400″>{c.rating}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {COMPARE_ROWS.map((row, i) => (
                <div key={row.key} className={`grid border-b border-slate-700 ${i % 2 === 0 ? "" : "bg-slate-800/30"}`}
                  style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}>
                  <div className="p-3.5 flex items-center gap-2″>
                    <row.icon className="w-3.5 h-3.5 text-slate-600 flex-shrink-0″ />
                    <span className="text-xs font-semibold text-slate-500″>{row.label}</span>
                  </div>
                  {selected.map(c => {
                    const value = row.format(c);
                    const isBoolTrue = row.bool && c[row.boolKey] === true;
                    const isBoolFalse = row.bool && c[row.boolKey] !== true;
                    return (
                      <div key={c.id} className={`p-3.5 border-l border-slate-700 text-center ${c.bestValue ? "bg-teal-500/5" : ""}`}>
                        <span className={`text-xs font-semibold ${
                          isBoolTrue ? "text-teal-400″ :
                          isBoolFalse ? "text-slate-600″ :
                          "text-white"
                        }`}>
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}

              <div className="grid" style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}>
                <div className="p-4″ />
                {selected.map(c => (
                  <div key={c.id} className={`p-4 border-l border-slate-700 ${c.bestValue ? "bg-teal-500/5" : ""}`}>
                    <button
                      onClick={() => handleRequest(c.id)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                        requestedId === c.id
                          ? "bg-teal-500/20 text-teal-400″
                          : c.bestValue
                            ? "bg-teal-500 hover:bg-teal-400 text-white"
                            : "bg-slate-800 hover:bg-slate-700 text-white"
                      }`}>
                      {requestedId === c.id ? "✓ Booked!" : "Book This Pro"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center pt-2″>
            <Link href="/my-home/directory">
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors">
                See more pros in your area <ArrowRight className="w-4 h-4″ />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
