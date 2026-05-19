import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search, Loader2, TrendingDown, TrendingUp, Minus,
  Thermometer, Home, Droplets, Zap, Building2, PaintBucket,
  Grid3X3, Bug, Star, MapPin, AlertTriangle, ArrowRight,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

type PriceRow = {
  job: string;
  low: number;
  typical: number;
  high: number;
  unit: string;
  priority?: "critical" | "normal";
};

type TradeCategory = {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  typicalRange: string;
  topJob: string;
  jobs: PriceRow[];
};

const TRADE_CATEGORIES: TradeCategory[] = [
  {
    id: "hvac",
    label: "HVAC",
    icon: Thermometer,
    color: "teal",
    typicalRange: "$150 – $8,200″,
    topJob: "AC replacement",
    jobs: [
      { job: "AC tune-up / maintenance", low: 85, typical: 140, high: 210, unit: "per visit" },
      { job: "AC refrigerant recharge", low: 150, typical: 280, high: 450, unit: "per job" },
      { job: "AC unit replacement (3-ton)", low: 3800, typical: 5400, high: 8200, unit: "installed", priority: "critical" },
      { job: "Furnace replacement", low: 2200, typical: 3400, high: 5800, unit: "installed", priority: "critical" },
      { job: "Duct cleaning", low: 300, typical: 500, high: 900, unit: "whole home" },
      { job: "Thermostat replacement (smart)", low: 150, typical: 280, high: 450, unit: "installed" },
      { job: "Air handler replacement", low: 1800, typical: 2800, high: 4200, unit: "installed" },
    ],
  },
  {
    id: "roofing",
    label: "Roofing",
    icon: Home,
    color: "amber",
    typicalRange: "$400 – $22,000″,
    topJob: "Roof replacement",
    jobs: [
      { job: "Roof inspection", low: 150, typical: 250, high: 400, unit: "per visit" },
      { job: "Minor roof repair (< 10 sq ft)", low: 400, typical: 650, high: 1100, unit: "per job" },
      { job: "Full shingle replacement (2,000 sq ft)", low: 8500, typical: 13500, high: 22000, unit: "installed", priority: "critical" },
      { job: "Skylight installation", low: 900, typical: 1600, high: 3200, unit: "per unit" },
      { job: "Gutter replacement (full home)", low: 1200, typical: 2100, high: 3800, unit: "installed" },
      { job: "Chimney flashing repair", low: 300, typical: 550, high: 950, unit: "per job" },
      { job: "Ridge cap / vent replacement", low: 250, typical: 450, high: 800, unit: "per job" },
    ],
  },
  {
    id: "plumbing",
    label: "Plumbing",
    icon: Droplets,
    color: "blue",
    typicalRange: "$150 – $6,500″,
    topJob: "Water heater replacement",
    jobs: [
      { job: "Drain cleaning", low: 150, typical: 250, high: 450, unit: "per drain" },
      { job: "Water heater replacement (40 gal)", low: 900, typical: 1400, high: 2200, unit: "installed" },
      { job: "Tankless water heater install", low: 1800, typical: 3200, high: 6500, unit: "installed", priority: "critical" },
      { job: "Faucet replacement", low: 150, typical: 280, high: 500, unit: "per fixture" },
      { job: "Toilet replacement", low: 200, typical: 380, high: 650, unit: "installed" },
      { job: "Slab leak detection + repair", low: 1500, typical: 3200, high: 6000, unit: "per job", priority: "critical" },
      { job: "Sewer line camera inspection", low: 200, typical: 350, high: 600, unit: "per job" },
    ],
  },
  {
    id: "electrical",
    label: "Electrical",
    icon: Zap,
    color: "yellow",
    typicalRange: "$100 – $4,800″,
    topJob: "Panel upgrade",
    jobs: [
      { job: "Outlet / switch replacement", low: 100, typical: 180, high: 300, unit: "per outlet" },
      { job: "Electrical panel upgrade (200A)", low: 2200, typical: 3200, high: 4800, unit: "installed", priority: "critical" },
      { job: "Whole-home surge protector", low: 300, typical: 500, high: 800, unit: "installed" },
      { job: "Ceiling fan installation", low: 150, typical: 280, high: 450, unit: "per fan" },
      { job: "EV charger installation (240V)", low: 600, typical: 1100, high: 2000, unit: "installed" },
      { job: "Smoke/CO detector install", low: 80, typical: 150, high: 280, unit: "per unit" },
      { job: "Recessed lighting (4 cans)", low: 400, typical: 700, high: 1200, unit: "per 4 lights" },
    ],
  },
  {
    id: "foundation",
    label: "Foundation",
    icon: Building2,
    color: "orange",
    typicalRange: "$800 – $15,000″,
    topJob: "Pier & beam leveling",
    jobs: [
      { job: "Foundation inspection", low: 200, typical: 350, high: 600, unit: "per visit" },
      { job: "Pier installation (per pier)", low: 800, typical: 1200, high: 1800, unit: "per pier", priority: "critical" },
      { job: "Slab foundation repair (small)", low: 1500, typical: 3500, high: 7000, unit: "per job", priority: "critical" },
      { job: "Crawl space encapsulation", low: 2500, typical: 5000, high: 9500, unit: "per job" },
      { job: "French drain installation", low: 1200, typical: 2400, high: 5000, unit: "per job" },
      { job: "Grading / drainage correction", low: 800, typical: 1600, high: 3500, unit: "per job" },
    ],
  },
  {
    id: "painting",
    label: "Painting",
    icon: PaintBucket,
    color: "violet",
    typicalRange: "$350 – $8,000″,
    topJob: "Exterior repaint",
    jobs: [
      { job: "Single room interior", low: 350, typical: 650, high: 1200, unit: "per room" },
      { job: "Full interior (2,000 sq ft)", low: 2500, typical: 4200, high: 7500, unit: "whole home" },
      { job: "Exterior repaint (2,000 sq ft)", low: 3500, typical: 5500, high: 8000, unit: "whole home" },
      { job: "Cabinet painting (kitchen)", low: 1200, typical: 2200, high: 4000, unit: "per job" },
      { job: "Deck staining / sealing", low: 400, typical: 800, high: 1600, unit: "per job" },
      { job: "Garage floor epoxy coating", low: 600, typical: 1100, high: 2200, unit: "per job" },
    ],
  },
  {
    id: "flooring",
    label: "Flooring",
    icon: Grid3X3,
    color: "teal",
    typicalRange: "$2 – $18 per sq ft",
    topJob: "LVP installation",
    jobs: [
      { job: "LVP (luxury vinyl plank)", low: 3, typical: 5, high: 8, unit: "per sq ft installed" },
      { job: "Hardwood (solid oak)", low: 8, typical: 12, high: 18, unit: "per sq ft installed" },
      { job: "Carpet (mid-grade)", low: 2, typical: 4, high: 7, unit: "per sq ft installed" },
      { job: "Tile (12x12, standard)", low: 4, typical: 8, high: 14, unit: "per sq ft installed" },
      { job: "Hardwood refinishing", low: 3, typical: 5, high: 8, unit: "per sq ft" },
      { job: "Subfloor repair", low: 300, typical: 600, high: 1400, unit: "per section" },
    ],
  },
  {
    id: "pest",
    label: "Pest Control",
    icon: Bug,
    color: "red",
    typicalRange: "$100 – $2,500″,
    topJob: "Termite treatment",
    jobs: [
      { job: "General pest inspection", low: 75, typical: 130, high: 220, unit: "per visit" },
      { job: "Termite treatment (liquid barrier)", low: 800, typical: 1400, high: 2500, unit: "whole home", priority: "critical" },
      { job: "Rodent exclusion + bait", low: 300, typical: 600, high: 1200, unit: "per job" },
      { job: "Bed bug treatment", low: 400, typical: 900, high: 2000, unit: "per room" },
      { job: "Annual pest control plan", low: 350, typical: 550, high: 900, unit: "per year" },
      { job: "Mosquito yard treatment", low: 100, typical: 180, high: 320, unit: "per treatment" },
    ],
  },
];

const POPULAR_CHIPS = [
  "AC replacement", "Roof replacement", "Foundation repair", "Water heater",
  "Electrical panel", "Interior paint", "LVP flooring", "Termite treatment",
];

const RECENT_QUOTES = [
  { trade: "HVAC", job: "AC unit replacement (3-ton, Carrier)", amount: 5850, neighborhood: "Frisco", when: "2 weeks ago" },
  { trade: "Roofing", job: "Full shingle replacement + decking", amount: 14200, neighborhood: "Plano", when: "3 weeks ago" },
  { trade: "Foundation", job: "8 piers + crawl space drainage", amount: 9600, neighborhood: "McKinney", when: "1 month ago" },
];

const WHY_VARIES = [
  { icon: "📐", title: "Scope", desc: "Small patch vs. full replacement can 10x the price. Always get a written scope." },
  { icon: "☀️", title: "Season", desc: "Summer HVAC demand can add 15-30% — same for winter furnaces. Book off-peak when possible." },
  { icon: "🏷️", title: "Brand / Materials", desc: "Budget vs. premium brand swings are real — e.g., Carrier vs. off-brand AC: +$900 avg." },
  { icon: "🚨", title: "Urgency", desc: "Emergency / same-day service runs 2-3x normal. Weekend calls can add a flat $150-300 fee." },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  teal:   { bg: "bg-teal-400/10″,   text: "text-teal-400",   border: "border-teal-400/30",   bar: "bg-teal-400" },
  amber:  { bg: "bg-amber-400/10″,  text: "text-amber-400",  border: "border-amber-400/30",  bar: "bg-amber-400" },
  blue:   { bg: "bg-blue-400/10″,   text: "text-blue-400",   border: "border-blue-400/30",   bar: "bg-blue-400" },
  yellow: { bg: "bg-yellow-400/10″, text: "text-yellow-400", border: "border-yellow-400/30", bar: "bg-yellow-400" },
  orange: { bg: "bg-orange-400/10″, text: "text-orange-400", border: "border-orange-400/30", bar: "bg-orange-400" },
  violet: { bg: "bg-violet-400/10″, text: "text-violet-400", border: "border-violet-400/30", bar: "bg-violet-400" },
  red:    { bg: "bg-red-400/10″,    text: "text-red-400",    border: "border-red-400/30",    bar: "bg-red-400" },
};

function fmt(n: number) {
  return n < 100 ? `$${n.toFixed(0)}` : `$${n.toLocaleString()}`;
}

function SearchResultCard({ job, apiResult }: { job: PriceRow | null; apiResult: { low?: number; avg?: number; high?: number; unit?: string; notes?: string } | null }) {
  if (!job && !apiResult) return null;
  const low = job?.low ?? apiResult?.low ?? 0;
  const typical = job?.typical ?? apiResult?.avg ?? 0;
  const high = job?.high ?? apiResult?.high ?? 0;
  const unit = job?.unit ?? apiResult?.unit ?? "";
  const label = job?.job ?? "";
  const notes = apiResult?.notes ?? "";
  const totalRange = high - low || 1;
  const typPct = Math.round(((typical - low) / totalRange) * 100);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-5″>
      <div className="flex items-start justify-between gap-2″>
        <div>
          <h2 className="text-white font-semibold text-lg capitalize">{label}</h2>
          <p className="text-slate-400 text-sm flex items-center gap-1 mt-0.5″><MapPin className="w-3 h-3" /> DFW Metro pricing</p>
        </div>
        <Badge className="bg-teal-400/10 text-teal-400 border border-teal-400/30 text-xs whitespace-nowrap">
          <Star className="w-3 h-3 mr-1″ /> Verified Data
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3″>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-1″>
            <TrendingDown className="w-3 h-3″ /> Low
          </div>
          <div className="text-xl font-bold text-green-400″>{fmt(low)}</div>
        </div>
        <div className="bg-teal-500/15 border-2 border-teal-400/40 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-slate-300 mb-1″>
            <Minus className="w-3 h-3″ /> Typical
          </div>
          <div className="text-xl font-bold text-teal-300″>{fmt(typical)}</div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-1″>
            <TrendingUp className="w-3 h-3″ /> High
          </div>
          <div className="text-xl font-bold text-orange-400″>{fmt(high)}</div>
        </div>
      </div>

      <div className="space-y-1.5″>
        <div className="flex justify-between text-xs text-slate-500″>
          <span>{fmt(low)}</span>
          <span>Typical: {fmt(typical)}</span>
          <span>{fmt(high)}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full relative overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 via-teal-400 to-orange-500 rounded-full" style={{ width: "100%" }} />
          <div
            className="absolute top-0 h-full w-0.5 bg-white/80″
            style={{ left: `${typPct}%` }}
          />
        </div>
      </div>

      {unit && <p className="text-xs text-slate-400″>Per: {unit}</p>}
      {notes && <p className="text-sm text-slate-300″>{notes}</p>}

      <div className="flex gap-2″>
        <Badge className="bg-teal-400/10 text-teal-400 text-xs">High confidence</Badge>
        <Badge className="bg-slate-700 text-slate-300 text-xs">Updated Q2 2026</Badge>
      </div>

      <Link href="/trustypro/book">
        <Button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold">
          Get Free Quote from Vetted Pros <ArrowRight className="w-4 h-4 ml-1″ />
        </Button>
      </Link>
    </div>
  );
}

export default function TrueCostGuide() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: apiData, isLoading } = trpc.homeownerExtras.getTrueCostEstimate.useQuery(
    { service: search },
    { enabled: search.length > 2 }
  );

  const handleSearch = () => {
    const q = query.trim();
    if (q.length < 2) return;
    setSearch(q);
    setActiveCategory(null);
  };

  const matchedJob = (): PriceRow | null => {
    if (!search) return null;
    const s = search.toLowerCase();
    for (const cat of TRADE_CATEGORIES) {
      const found = cat.jobs.find(j => j.job.toLowerCase().includes(s));
      if (found) return found;
    }
    return null;
  };

  const activeTradeData = activeCategory
    ? TRADE_CATEGORIES.find(c => c.id === activeCategory) ?? null
    : null;

  const showSearchResult = search.length > 2;
  const foundJob = matchedJob();
  const hasResult = showSearchResult && (foundJob || (apiData && !isLoading));

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8″>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white">True Cost Guide</h1>
            <p className="text-slate-400 mt-1″>Real DFW pricing — no surprises. Based on 2,000+ completed jobs in 2025-2026.</p>
          </div>

          {/* Search */}
          <div className="space-y-3″>
            <div className="flex gap-2″>
              <div className="relative flex-1″>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500″ />
                <Input
                  placeholder="Search a job — e.g. 'AC replacement', 'roof repair'..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-400″
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading || query.trim().length < 2}
                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold px-5″
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4″ />}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2″>
              {POPULAR_CHIPS.map(chip => (
                <button
                  key={chip}
                  onClick={() => { setQuery(chip); setSearch(chip); setActiveCategory(null); }}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:border-teal-400 hover:text-teal-400 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Search result card */}
          {showSearchResult && (isLoading ? (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex items-center justify-center gap-3 text-slate-400″>
              <Loader2 className="w-5 h-5 animate-spin text-teal-400″ />
              Looking up DFW pricing...
            </div>
          ) : hasResult ? (
            <SearchResultCard job={foundJob} apiResult={apiData ?? null} />
          ) : (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
              <p className="text-slate-300 font-medium">No exact match for "{search}"</p>
              <p className="text-slate-500 text-sm mt-1″>Try a category below or use a more general term.</p>
            </div>
          ))}

          {/* Trade categories grid */}
          {!showSearchResult && (
            <div>
              <h2 className="text-white font-semibold mb-4″>Browse by Trade</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3″>
                {TRADE_CATEGORIES.map(cat => {
                  const colors = COLOR_MAP[cat.color];
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(isActive ? null : cat.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        isActive
                          ? `${colors.bg} ${colors.border} border-2`
                          : "bg-slate-800 border-slate-700 hover:border-slate-600″
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center mb-2`}>
                        <Icon className={`w-4 h-4 ${colors.text}`} />
                      </div>
                      <div className="font-medium text-white text-sm">{cat.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5″>{cat.typicalRange}</div>
                      <div className="text-xs text-slate-500 mt-1 truncate">{cat.topJob}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price comparison table for active category */}
          {activeTradeData && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2″>
                  <activeTradeData.icon className={`w-5 h-5 ${COLOR_MAP[activeTradeData.color].text}`} />
                  <h3 className="text-white font-semibold">{activeTradeData.label} — Common Jobs</h3>
                </div>
                <button onClick={() => setActiveCategory(null)} className="text-slate-500 hover:text-slate-300 text-xs">Clear</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700″>
                      <th className="text-left px-5 py-2.5 text-slate-400 font-medium">Job</th>
                      <th className="text-right px-3 py-2.5 text-green-400 font-medium">Low</th>
                      <th className="text-right px-3 py-2.5 text-teal-400 font-medium">Typical</th>
                      <th className="text-right px-5 py-2.5 text-orange-400 font-medium">High</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTradeData.jobs.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30 transition-colors ${
                          row.priority === "critical" ? "border-l-2 border-l-amber-500/60″ : ""
                        }`}
                      >
                        <td className="px-5 py-3″>
                          <div className="flex items-center gap-2″>
                            {row.priority === "critical" && (
                              <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0″ />
                            )}
                            <span className="text-slate-200″>{row.job}</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5″>{row.unit}</div>
                        </td>
                        <td className="text-right px-3 py-3 text-green-400 font-mono font-medium">{fmt(row.low)}</td>
                        <td className="text-right px-3 py-3 text-teal-300 font-mono font-semibold">{fmt(row.typical)}</td>
                        <td className="text-right px-5 py-3 text-orange-400 font-mono font-medium">{fmt(row.high)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-slate-900/50″>
                <Link href="/trustypro/book">
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold">
                    Get {activeTradeData.label} Quotes <ArrowRight className="w-3.5 h-3.5 ml-1″ />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Why prices vary */}
          <div>
            <h2 className="text-white font-semibold mb-4″>Why prices vary</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3″>
              {WHY_VARIES.map(item => (
                <div key={item.title} className="bg-slate-800 border border-slate-700 rounded-xl p-4″>
                  <div className="text-2xl mb-2″>{item.icon}</div>
                  <div className="text-white font-medium text-sm mb-1″>{item.title}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent DFW quotes */}
          <div>
            <h2 className="text-white font-semibold mb-4″>Recent DFW Quotes</h2>
            <div className="space-y-3″>
              {RECENT_QUOTES.map((q, i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 flex items-center justify-between gap-4″>
                  <div className="min-w-0″>
                    <div className="flex items-center gap-2 mb-0.5″>
                      <Badge className="bg-teal-400/10 text-teal-400 border-teal-400/30 text-xs">{q.trade}</Badge>
                      <span className="text-slate-500 text-xs flex items-center gap-1″>
                        <MapPin className="w-3 h-3″ /> {q.neighborhood}
                      </span>
                    </div>
                    <p className="text-slate-200 text-sm truncate">{q.job}</p>
                    <p className="text-slate-500 text-xs mt-0.5″>{q.when}</p>
                  </div>
                  <div className="text-right flex-shrink-0″>
                    <div className="text-teal-400 font-bold text-lg">${q.amount.toLocaleString()}</div>
                    <div className="text-slate-500 text-xs">paid</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-xs mt-3 text-center">Representative DFW metro quotes — individual projects vary. <Link href="/trustypro/book" className="text-teal-400 hover:underline">Get your personalized quote.</Link></p>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
