import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Sun,
  Thermometer,
  Leaf,
  Snowflake,
  Wind,
  Home,
  Droplets,
  Zap,
  Bug,
  ChevronDown,
  ChevronUp,
  Bell,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
} from "lucide-react";

type SeasonName = "Spring" | "Summer" | "Fall" | "Winter";

interface SeasonService {
  name: string;
  indicator: "great" | "average" | "peak";
  note: string;
}

interface Season {
  name: SeasonName;
  dfwContext: string;
  icon: typeof Sun;
  color: string;
  bg: string;
  services: SeasonService[];
}

interface TradeGuide {
  trade: string;
  icon: typeof Wind;
  iconColor: string;
  bestTime: string;
  avoidTime: string;
  tip: string;
  savings: string;
}

const SEASONS: Season[] = [
  {
    name: "Spring",
    dfwContext: "DFW temp swings 40–85°F. Storm season begins. AC demand spikes fast.",
    icon: Sun,
    color: "#10b981″,
    bg: "from-emerald-900/30 to-teal-900/20″,
    services: [
      { name: "HVAC Pre-Season Tune-Up", indicator: "great", note: "Book March before June rush" },
      { name: "Foundation Inspection", indicator: "average", note: "Soil moisture stabilizing" },
      { name: "Pest Control Treatment", indicator: "great", note: "Before summer peak activity" },
    ],
  },
  {
    name: "Summer",
    dfwContext: "110°F heat index. HVAC emergencies peak. Outdoor work slows mid-day.",
    icon: Thermometer,
    color: "#f59e0b",
    bg: "from-yellow-900/30 to-orange-900/20″,
    services: [
      { name: "HVAC Service", indicator: "peak", note: "+25% emergency pricing, 3-wk wait" },
      { name: "Roofing", indicator: "peak", note: "Storm surge pricing, crews overbooked" },
      { name: "Landscaping (mowing)", indicator: "average", note: "Standard mowing only" },
    ],
  },
  {
    name: "Fall",
    dfwContext: "Ideal work weather. Pre-winter prep window. Best scheduling availability.",
    icon: Leaf,
    color: "#f97316″,
    bg: "from-orange-900/30 to-amber-900/20″,
    services: [
      { name: "Roofing", indicator: "great", note: "Best pricing Oct–Nov" },
      { name: "Foundation Work", indicator: "great", note: "Optimal soil conditions in DFW" },
      { name: "HVAC Pre-Season", indicator: "great", note: "Book October before holiday rush" },
    ],
  },
  {
    name: "Winter",
    dfwContext: "Freeze events hit hard (Feb 2021). Plumbing emergencies spike. Indoor work ideal.",
    icon: Snowflake,
    color: "#60a5fa",
    bg: "from-blue-900/30 to-indigo-900/20″,
    services: [
      { name: "Plumbing (standard)", indicator: "average", note: "Normal rates, good availability" },
      { name: "Plumbing (freeze)", indicator: "peak", note: "+40% emergency rates Dec–Feb" },
      { name: "Interior Electrical", indicator: "great", note: "Crews available, off-peak rates" },
    ],
  },
];

const TRADE_GUIDES: TradeGuide[] = [
  {
    trade: "HVAC",
    icon: Wind,
    iconColor: "#0891b2″,
    bestTime: "March or October",
    avoidTime: "June–August",
    tip: "Book in March or October — avoid June–August (3-week wait, +25% emergency pricing). An annual tune-up prevents a full unit replacement averaging $6,500.",
    savings: "$85–$200 per booking vs. peak season",
  },
  {
    trade: "Roofing",
    icon: Home,
    iconColor: "#8b5cf6″,
    bestTime: "October–February",
    avoidTime: "April–July",
    tip: "Best price Oct–Feb, avoid April–July (storm surge pricing). Roofing contractors add 15–30% premiums during hail season. You get better crews in winter too.",
    savings: "$300–$1,200 per project vs. storm season",
  },
  {
    trade: "Plumbing",
    icon: Droplets,
    iconColor: "#3b82f6″,
    bestTime: "Year-round (standard)",
    avoidTime: "December–February (emergency only)",
    tip: "No major seasonal variation except freeze season (Dec–Feb emergency rates +40%). Proactively wrap pipes before first freeze. DFW averages one hard freeze event per year.",
    savings: "$200–$800 avoiding freeze-burst emergencies",
  },
  {
    trade: "Foundation",
    icon: Home,
    iconColor: "#10b981″,
    bestTime: "October–December",
    avoidTime: "June–August",
    tip: "Book foundation work Oct–Dec — summer work in DFW is dangerous for concrete and pier/beam systems. Extreme heat causes rapid soil contraction that can shift new piers.",
    savings: "$500–$2,000 in rework avoidance",
  },
  {
    trade: "Landscaping",
    icon: Leaf,
    iconColor: "#22c55e",
    bestTime: "Spring (planting) & Fall (overseeding)",
    avoidTime: "July–August for new plants",
    tip: "Spring and fall for planting and lawn renovations — summer for mowing maintenance only. Fall overseeding in DFW (Bermuda/Zoysia blend) gives best results. New plantings in summer heat require heavy irrigation.",
    savings: "$150–$400 in plant replacement costs",
  },
  {
    trade: "Pest Control",
    icon: Bug,
    iconColor: "#ec4899″,
    bestTime: "March–April & September–October",
    avoidTime: "Peak summer (prices spike 20%)",
    tip: "Spring and fall treatments most effective — treat the perimeter before activity peaks, not after. Summer prices peak as demand surges. Quarterly plans at off-peak rates beat reactive treatments every time.",
    savings: "$80–$200 per treatment vs. reactive calls",
  },
];

function IndicatorDot({ indicator }: { indicator: SeasonService["indicator"] }) {
  const styles = {
    great: "bg-emerald-400″,
    average: "bg-yellow-400″,
    peak: "bg-red-400″,
  };
  const labels = {
    great: "Great time",
    average: "Average",
    peak: "Avoid / Peak",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold`}>
      <span className={`w-2 h-2 rounded-full ${styles[indicator]}`} />
      <span
        className={
          indicator === "great"
            ? "text-emerald-400″
            : indicator === "peak"
            ? "text-red-400″
            : "text-yellow-400″
        }
      >
        {labels[indicator]}
      </span>
    </span>
  );
}

function SeasonCard({ season, isActive }: { season: Season; isActive: boolean }) {
  const Icon = season.icon;
  return (
    <div
      className={`rounded-2xl p-5 border transition-all bg-gradient-to-br ${season.bg} ${
        isActive ? "border-opacity-60 ring-1″ : "border-slate-700/40"
      }`}
      style={isActive ? { borderColor: season.color, "--tw-ring-color": season.color } as React.CSSProperties : undefined}
    >
      <div className="flex items-center gap-2 mb-1″>
        <Icon className="w-5 h-5″ style={{ color: season.color }} />
        <h3 className="font-bold text-white">{season.name}</h3>
        {isActive && (
          <span
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${season.color}22`, color: season.color, border: `1px solid ${season.color}44` }}
          >
            Now
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400 mb-4 leading-relaxed">{season.dfwContext}</p>

      <div className="space-y-3″>
        {season.services.map((svc) => (
          <div key={svc.name} className="flex items-start gap-2″>
            <IndicatorDot indicator={svc.indicator} />
          </div>
        ))}
        {season.services.map((svc) => (
          <div key={svc.name + "row"} className="bg-black/20 rounded-lg px-3 py-2.5″>
            <div className="flex items-center justify-between gap-2 mb-0.5″>
              <span className="text-xs font-semibold text-white">{svc.name}</span>
              <IndicatorDot indicator={svc.indicator} />
            </div>
            <p className="text-xs text-slate-400″>{svc.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TradeAccordion({ guide }: { guide: TradeGuide }) {
  const [open, setOpen] = useState(false);
  const Icon = guide.icon;

  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-700/30 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0″
          style={{ backgroundColor: `${guide.iconColor}22` }}
        >
          <Icon className="w-4 h-4″ style={{ color: guide.iconColor }} />
        </div>
        <div className="flex-1 min-w-0″>
          <p className="font-semibold text-white text-sm">{guide.trade}</p>
          <p className="text-xs text-slate-400 truncate">
            Best: <span className="text-emerald-400″>{guide.bestTime}</span>
            {" · "}
            Avoid: <span className="text-red-400″>{guide.avoidTime}</span>
          </p>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0″ />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0″ />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-3 border-t border-slate-700/50 pt-4″>
          <p className="text-sm text-slate-300 leading-relaxed">{guide.tip}</p>
          <div className="flex items-center gap-2 bg-emerald-900/20 border border-emerald-700/30 rounded-lg px-3 py-2″>
            <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0″ />
            <p className="text-xs text-emerald-300″>
              <strong>Potential savings:</strong> {guide.savings}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SeasonalPricingGuide() {
  const [reminderService, setReminderService] = useState("");
  const [reminderMonth, setReminderMonth] = useState("");
  const [reminderSet, setReminderSet] = useState(false);
  const [calcService, setCalcService] = useState("HVAC tune-up");
  const [calcNow, setCalcNow] = useState("June");
  const [calcBest, setCalcBest] = useState("March");

  const savingsMap: Record<string, string> = {
    "HVAC tune-up": "$85–$200″,
    "Roof inspection": "$200–$600″,
    "Plumbing check": "$50–$150″,
    "Pest control": "$80–$200″,
    "Foundation inspection": "$150–$400″,
  };

  function handleSetReminder(e: React.FormEvent) {
    e.preventDefault();
    if (reminderService && reminderMonth) {
      setReminderSet(true);
    }
  }

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8″>
        {/* Header */}
        <div>
          <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1″>DFW Homeowner Guide</p>
          <h1 className="text-2xl font-black text-white">Seasonal Pricing Guide</h1>
          <p className="text-sm text-slate-400 mt-1″>Book at the right time, save thousands</p>
        </div>

        {/* Current season callout */}
        <div
          className="rounded-2xl p-5 border border-emerald-700/40 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #052e16 0%, #0a1628 60%)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/5 -translate-y-8 translate-x-8″ />
          <div className="relative z-10 flex items-start gap-3″>
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 flex items-center justify-center shrink-0″>
              <Sun className="w-5 h-5 text-emerald-400″ />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1″>You're in Spring</p>
              <p className="text-sm font-semibold text-white leading-relaxed">
                HVAC season is here. Book before peak demand hits in June.
              </p>
              <p className="text-xs text-slate-400 mt-1″>
                DFW temperatures are climbing. Contractors are available now — prices jump 25%+ after Memorial Day.
              </p>
            </div>
          </div>
        </div>

        {/* Season cards */}
        <div>
          <h2 className="text-base font-bold text-white mb-4″>Pricing by Season</h2>
          <div className="grid gap-4 sm:grid-cols-2″>
            {SEASONS.map((season) => (
              <SeasonCard
                key={season.name}
                season={season}
                isActive={season.name === "Spring"}
              />
            ))}
          </div>
        </div>

        {/* Trade-by-trade guide */}
        <div>
          <h2 className="text-base font-bold text-white mb-2″>Trade-by-Trade Guide</h2>
          <p className="text-xs text-slate-400 mb-4″>Tap any trade to see the full breakdown</p>
          <div className="space-y-2″>
            {TRADE_GUIDES.map((guide) => (
              <TradeAccordion key={guide.trade} guide={guide} />
            ))}
          </div>
        </div>

        {/* Savings calculator */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-4″>
          <div className="flex items-center gap-2 mb-1″>
            <DollarSign className="w-4 h-4 text-teal-400″ />
            <h2 className="text-base font-bold text-white">Savings Calculator</h2>
          </div>

          <div className="grid grid-cols-3 gap-3″>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-semibold">Service</label>
              <select
                value={calcService}
                onChange={(e) => setCalcService(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-teal-500″
              >
                {Object.keys(savingsMap).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-semibold">Book in</label>
              <select
                value={calcBest}
                onChange={(e) => setCalcBest(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-teal-500″
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-semibold">vs. waiting until</label>
              <select
                value={calcNow}
                onChange={(e) => setCalcNow(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-teal-500″
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-teal-900/20 border border-teal-700/30 rounded-xl px-4 py-3″>
            <p className="text-sm text-slate-300 leading-relaxed">
              If you book your{" "}
              <strong className="text-white">{calcService}</strong> in{" "}
              <strong className="text-teal-300″>{calcBest}</strong> instead of{" "}
              <strong className="text-yellow-300″>{calcNow}</strong>, you save an estimated{" "}
              <strong className="text-emerald-300 text-base">{savingsMap[calcService]}</strong>.
            </p>
          </div>
        </div>

        {/* Set a reminder */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5″>
          <div className="flex items-center gap-2 mb-4″>
            <Bell className="w-4 h-4 text-teal-400″ />
            <h2 className="text-base font-bold text-white">Set a Booking Reminder</h2>
          </div>

          {reminderSet ? (
            <div className="flex items-center gap-3 bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4″>
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0″ />
              <div>
                <p className="text-sm font-semibold text-white">Reminder set!</p>
                <p className="text-xs text-slate-400 mt-0.5″>
                  We'll remind you to book <strong className="text-white">{reminderService}</strong> in{" "}
                  <strong className="text-white">{reminderMonth}</strong>.
                </p>
              </div>
              <button
                onClick={() => setReminderSet(false)}
                className="ml-auto text-xs text-slate-400 hover:text-white transition-colors"
              >
                Change
              </button>
            </div>
          ) : (
            <form onSubmit={handleSetReminder} className="space-y-3″>
              <div className="grid grid-cols-2 gap-3″>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold">Service</label>
                  <input
                    value={reminderService}
                    onChange={(e) => setReminderService(e.target.value)}
                    placeholder="e.g. HVAC tune-up"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold">Month</label>
                  <select
                    value={reminderMonth}
                    onChange={(e) => setReminderMonth(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                  >
                    <option value="">Select month</option>
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={!reminderService || !reminderMonth}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-teal-500 text-[#0A1628] hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Bell className="w-4 h-4″ />
                Remind Me to Book
              </button>
            </form>
          )}

          <div className="flex items-start gap-2 mt-4 pt-4 border-t border-slate-700/50″>
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 shrink-0″ />
            <p className="text-xs text-slate-400 leading-relaxed">
              DFW homeowners who book HVAC, roofing, and foundation work in off-peak windows save an average of{" "}
              <strong className="text-white">$1,400–$3,200 per year</strong> compared to reactive emergency calls.
            </p>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
