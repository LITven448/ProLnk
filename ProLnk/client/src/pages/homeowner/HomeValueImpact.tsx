import { useState } from "react";
import { Link } from "wouter";
import {
  TrendingUp,
  Home,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  Hammer,
  Thermometer,
  Zap,
  PaintBucket,
  TreeDeciduous,
  ChevronRight,
  BarChart2,
  Camera,
  Award,
} from "lucide-react";

const HOME_VALUE = 485000;
const MAINTENANCE_INVESTMENT = 4280;
const MAINTENANCE_SCORE_PCT = 78;
const COMPLETED_TASKS = 14;
const TOTAL_TASKS = 18;

const VALUE_ADD_MIN_PCT = 0.02;
const VALUE_ADD_MAX_PCT = 0.04;

const valueAddMin = Math.round(HOME_VALUE * VALUE_ADD_MIN_PCT);
const valueAddMax = Math.round(HOME_VALUE * VALUE_ADD_MAX_PCT);
const estimatedCurrentValue = HOME_VALUE + Math.round((valueAddMin + valueAddMax) / 2);

const UPGRADES = [
  {
    label: "Minor Kitchen Remodel",
    icon: Hammer,
    color: "#f59e0b",
    costRange: "$15k–$30k",
    valueAdded: "+$18k–$40k",
    roiMin: 60,
    roiMax: 80,
    description: "Updated cabinets, countertops, and appliances consistently yield strong ROI in DFW.",
  },
  {
    label: "Roof Replacement",
    icon: Home,
    color: "#10b981″,
    costRange: "$8k–$18k",
    valueAdded: "+$12k–$22k",
    roiMin: 68,
    roiMax: 75,
    description: "New roof dramatically improves inspection results and buyer confidence.",
  },
  {
    label: "HVAC System Upgrade",
    icon: Thermometer,
    color: "#0891b2″,
    costRange: "$4k–$10k",
    valueAdded: "+$5k–$12k",
    roiMin: 55,
    roiMax: 72,
    description: "Modern high-efficiency systems lower utility bills and are strong selling points.",
  },
  {
    label: "Curb Appeal Package",
    icon: TreeDeciduous,
    color: "#22c55e",
    costRange: "$2k–$8k",
    valueAdded: "+$4k–$14k",
    roiMin: 70,
    roiMax: 120,
    description: "Fresh landscaping, exterior paint, and lighting offer the best cost-to-value ratio.",
  },
  {
    label: "Electrical Panel Upgrade",
    icon: Zap,
    color: "#a855f7″,
    costRange: "$2k–$5k",
    valueAdded: "+$3k–$8k",
    roiMin: 50,
    roiMax: 65,
    description: "200A panel updates satisfy modern buyers and reduce inspection red flags.",
  },
  {
    label: "Exterior Paint",
    icon: PaintBucket,
    color: "#ec4899″,
    costRange: "$2k–$6k",
    valueAdded: "+$3k–$10k",
    roiMin: 55,
    roiMax: 80,
    description: "One of the highest visual impact updates per dollar spent.",
  },
];

const MAINTAINED_ITEMS = [
  { label: "HVAC serviced annually", done: true },
  { label: "Roof inspection up to date", done: true },
  { label: "Gutters cleaned 2x/year", done: true },
  { label: "Plumbing leaks addressed promptly", done: true },
  { label: "Exterior paint maintained", done: false },
  { label: "Foundation grading correct", done: true },
  { label: "Electrical panel updated", done: false },
  { label: "Water heater < 10 years old", done: true },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function ScoreArc({ pct }: { pct: number }) {
  const color =
    pct >= 80 ? "#10b981″ :
    pct >= 60 ? "#0891b2″ :
    pct >= 40 ? "#f59e0b" : "#ef4444″;

  const label =
    pct >= 80 ? "Excellent" :
    pct >= 60 ? "Good" :
    pct >= 40 ? "Fair" : "Poor";

  const circumference = 2 * Math.PI * 42;

  return (
    <div className="flex flex-col items-center gap-2″>
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="absolute inset-0″ viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="50″ cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
          <circle
            cx="50″ cy="50" r="42"
            fill="none"
            stroke={color}
            strokeWidth="9″
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct / 100)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.4s ease" }}
          />
        </svg>
        <div className="text-center z-10″>
          <p className="text-2xl font-black" style={{ color }}>{pct}</p>
          <p className="text-xs font-bold text-slate-400″>/ 100</p>
        </div>
      </div>
      <span className="text-xs font-bold px-3 py-1 rounded-full border" style={{ color, borderColor: `${color}40`, backgroundColor: `${color}15` }}>
        {label}
      </span>
    </div>
  );
}

export default function HomeValueImpact() {
  const [selectedUpgrade, setSelectedUpgrade] = useState<null | typeof UPGRADES[number]>(null);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0A1628]/95 backdrop-blur-sm border-b border-slate-800 px-4 py-3″>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2″>
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-teal-400″ />
            </div>
            <span className="text-sm font-bold text-white">Home Value Impact</span>
          </div>
          <Link href="/trustypro/scan">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-400 text-[#0A1628] hover:bg-teal-300 transition-colors">
              <Camera className="w-3.5 h-3.5″ />
              Pre-Listing Scan
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6″>
        {/* Header */}
        <div>
          <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1″>TrustyPro</p>
          <h1 className="text-2xl font-black text-white leading-tight">
            How Your Maintenance History<br />Impacts Home Value
          </h1>
          <p className="text-sm text-slate-400 mt-2″>
            123 Maple St, Frisco TX 75035 · Est. {formatCurrency(HOME_VALUE)}
          </p>
        </div>

        {/* Value Summary Hero */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden border border-teal-500/20″
          style={{ background: "linear-gradient(135deg, #0d2240 0%, #0a1f3a 50%, #061528 100%)" }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-5 bg-teal-400 -translate-y-12 translate-x-12″ />
          <div className="relative z-10″>
            <div className="flex items-center gap-2 mb-4″>
              <DollarSign className="w-4 h-4 text-teal-400″ />
              <p className="text-sm font-bold text-teal-300″>Value Added by Maintenance</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5″>
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-1″>Investment This Year</p>
                <p className="text-xl font-black text-white">{formatCurrency(MAINTENANCE_INVESTMENT)}</p>
              </div>
              <div className="text-center border-x border-slate-700/60″>
                <p className="text-xs text-slate-400 mb-1″>Value Added</p>
                <p className="text-lg font-black text-teal-400″>
                  +{formatCurrency(valueAddMin)}–{formatCurrency(valueAddMax)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-1″>Est. Current Value</p>
                <p className="text-xl font-black text-emerald-400″>{formatCurrency(estimatedCurrentValue)}</p>
              </div>
            </div>
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl px-4 py-3 flex items-start gap-3″>
              <TrendingUp className="w-4 h-4 text-teal-400 shrink-0 mt-0.5″ />
              <p className="text-xs text-teal-300″>
                Regular maintenance increases home resale value by{" "}
                <strong className="text-teal-200″>2–4%</strong> vs. unmaintained comparables in your ZIP.
                That's{" "}
                <strong className="text-teal-200″>{formatCurrency(valueAddMin)}–{formatCurrency(valueAddMax)}</strong>{" "}
                added to your listing price.
              </p>
            </div>
          </div>
        </div>

        {/* Maintenance Score */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-5″>
            <Award className="w-4 h-4 text-teal-400″ />
            <p className="font-bold text-white">Your Maintenance Score</p>
          </div>

          <div className="flex items-center gap-6 mb-5″>
            <ScoreArc pct={MAINTENANCE_SCORE_PCT} />
            <div className="flex-1″>
              <p className="text-sm font-semibold text-white mb-1″>
                {COMPLETED_TASKS} of {TOTAL_TASKS} tasks completed
              </p>
              <p className="text-xs text-slate-400 mb-3″>
                Based on scheduled maintenance, completed service visits, and AI scan results.
              </p>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-teal-400 transition-all duration-1000″
                  style={{ width: `${Math.round((COMPLETED_TASKS / TOTAL_TASKS) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1″>
                {COMPLETED_TASKS}/{TOTAL_TASKS} tasks · {Math.round((COMPLETED_TASKS / TOTAL_TASKS) * 100)}% complete
              </p>
            </div>
          </div>

          <div className="space-y-1.5″>
            {MAINTAINED_ITEMS.map(({ label, done }) => (
              <div key={label} className="flex items-center gap-2.5 py-1″>
                {done
                  ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0″ />
                  : <div className="w-4 h-4 rounded-full border-2 border-slate-600 shrink-0″ />}
                <span className={`text-sm ${done ? "text-slate-300" : "text-slate-500"}`}>{label}</span>
                {!done && (
                  <Link href="/trustypro/book" className="ml-auto">
                    <span className="text-xs font-semibold text-teal-400 hover:text-teal-300″>Schedule</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-5″>
            <BarChart2 className="w-4 h-4 text-teal-400″ />
            <p className="font-bold text-white">Maintained vs. Unmaintained</p>
          </div>
          <p className="text-xs text-slate-400 mb-5″>
            Comparable 2,400 sq ft home in Frisco TX 75035 — same build year, same neighborhood
          </p>

          <div className="space-y-4″>
            {[
              { label: "List Price", yours: formatCurrency(estimatedCurrentValue), theirs: formatCurrency(HOME_VALUE - 12000) },
              { label: "Days on Market", yours: "18 days avg", theirs: "47 days avg" },
              { label: "Inspection Red Flags", yours: "2 minor", theirs: "11 items" },
              { label: "Buyer Concessions", yours: "$0–2k", theirs: "$8k–18k" },
              { label: "Final Sale Price", yours: formatCurrency(estimatedCurrentValue - 3000), theirs: formatCurrency(HOME_VALUE - 22000) },
            ].map(({ label, yours, theirs }) => (
              <div key={label}>
                <p className="text-xs font-semibold text-slate-400 mb-2″>{label}</p>
                <div className="grid grid-cols-2 gap-3″>
                  <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-3″>
                    <p className="text-xs text-teal-400 font-semibold mb-0.5″>Your Home ✓</p>
                    <p className="text-sm font-black text-white">{yours}</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-3″>
                    <p className="text-xs text-red-400 font-semibold mb-0.5″>Unmaintained</p>
                    <p className="text-sm font-black text-slate-400″>{theirs}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Which Upgrades Add Most Value */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1″>
            <Star className="w-4 h-4 text-teal-400″ />
            <p className="font-bold text-white">Upgrades That Add Most Value</p>
          </div>
          <p className="text-xs text-slate-400 mb-5″>Tap any upgrade to see details and get a quote.</p>

          <div className="space-y-3″>
            {UPGRADES.map((upgrade) => (
              <button
                key={upgrade.label}
                className="w-full text-left flex items-center gap-3 p-4 rounded-xl border border-slate-700/60 bg-slate-700/30 hover:border-teal-500/30 hover:bg-slate-700/50 transition-colors group"
                onClick={() => setSelectedUpgrade(upgrade)}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0″
                  style={{ backgroundColor: `${upgrade.color}20` }}
                >
                  <upgrade.icon className="w-5 h-5″ style={{ color: upgrade.color }} />
                </div>
                <div className="flex-1 min-w-0″>
                  <div className="flex items-center justify-between mb-1″>
                    <p className="text-sm font-semibold text-white">{upgrade.label}</p>
                    <span className="text-xs font-bold text-emerald-400″>{upgrade.valueAdded}</span>
                  </div>
                  <div className="flex items-center gap-3″>
                    <div className="flex-1 bg-slate-600 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${upgrade.roiMax}%`,
                          background: `linear-gradient(90deg, ${upgrade.color}80, ${upgrade.color})`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{upgrade.roiMin}–{upgrade.roiMax}% ROI</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 transition-colors shrink-0″ />
              </button>
            ))}
          </div>
        </div>

        {/* Pre-Listing Scan CTA */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden border border-teal-500/20″
          style={{ background: "linear-gradient(135deg, #0d2a3a 0%, #061528 100%)" }}
        >
          <div className="absolute inset-0 opacity-5″ style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #2dd4bf, transparent 60%)" }} />
          <div className="relative z-10″>
            <div className="flex items-center gap-2 mb-2″>
              <Camera className="w-5 h-5 text-teal-400″ />
              <p className="text-sm font-semibold text-teal-300″>Pre-Listing AI Scan</p>
            </div>
            <h2 className="text-xl font-black text-white mb-2″>Know Your Home Before Buyers Do</h2>
            <p className="text-sm text-slate-300 mb-5″>
              Our pre-listing AI scan identifies every issue that could reduce your sale price or kill a deal — before the inspector shows up. Fix what matters, skip what doesn't.
            </p>
            <Link href="/trustypro/scan">
              <button className="flex items-center gap-2 bg-teal-400 text-[#0A1628] px-5 py-3 rounded-xl text-sm font-bold hover:bg-teal-300 transition-colors">
                <Camera className="w-4 h-4″ />
                Get Pre-Listing Scan
                <ArrowRight className="w-4 h-4″ />
              </button>
            </Link>
          </div>
        </div>

        <div className="h-6″ />
      </div>

      {/* Upgrade detail modal */}
      {selectedUpgrade && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4″
          onClick={() => setSelectedUpgrade(null)}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4″
              style={{ backgroundColor: `${selectedUpgrade.color}20` }}
            >
              <selectedUpgrade.icon className="w-6 h-6″ style={{ color: selectedUpgrade.color }} />
            </div>
            <h3 className="text-lg font-black text-white mb-1″>{selectedUpgrade.label}</h3>
            <p className="text-sm text-slate-400 mb-4″>{selectedUpgrade.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-5″>
              <div className="bg-slate-700/60 rounded-xl p-3″>
                <p className="text-xs text-slate-400 mb-0.5″>Typical Cost</p>
                <p className="text-sm font-bold text-white">{selectedUpgrade.costRange}</p>
              </div>
              <div className="bg-slate-700/60 rounded-xl p-3″>
                <p className="text-xs text-slate-400 mb-0.5″>Value Added</p>
                <p className="text-sm font-bold text-teal-400″>{selectedUpgrade.valueAdded}</p>
              </div>
              <div className="bg-slate-700/60 rounded-xl p-3 col-span-2″>
                <p className="text-xs text-slate-400 mb-0.5″>Return on Investment</p>
                <p className="text-sm font-bold text-emerald-400″>{selectedUpgrade.roiMin}–{selectedUpgrade.roiMax}%</p>
              </div>
            </div>

            <Link href={`/trustypro/book?service=${encodeURIComponent(selectedUpgrade.label)}`} onClick={() => setSelectedUpgrade(null)}>
              <button className="w-full bg-teal-400 text-[#0A1628] font-bold py-3 rounded-xl mb-2 hover:bg-teal-300 transition-colors">
                Get a Quote for This Upgrade
              </button>
            </Link>
            <button
              onClick={() => setSelectedUpgrade(null)}
              className="w-full text-sm text-slate-500 hover:text-slate-300 py-2 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
