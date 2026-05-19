import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Wind, CheckCircle, AlertTriangle, XCircle, Home, Thermometer,
  Droplets, Leaf, Sun, Snowflake, Filter, ShieldCheck, Zap,
  Calendar, Clock, ChevronRight,
} from "lucide-react";

type Season = "spring" | "summer" | "fall" | "winter";

interface ChecklistItem {
  id: string;
  label: string;
  status: "good" | "warning" | "bad";
}

interface FilterType {
  name: string;
  merv: string;
  cost: string;
  pros: string;
  recommended: boolean;
}

interface PurifierTier {
  name: string;
  priceRange: string;
  coverage: string;
  icon: typeof Home;
  color: string;
  description: string;
}

interface SeasonalTip {
  season: Season;
  icon: typeof Sun;
  color: string;
  bgColor: string;
  label: string;
  headline: string;
  tips: string[];
}

const SCORE_FACTORS = [
  { label: "HVAC Filter", value: "Good", status: "good" as const, weight: 25 },
  { label: "Humidity", value: "42%", status: "good" as const, weight: 25 },
  { label: "Ventilation", value: "Moderate", status: "warning" as const, weight: 25 },
  { label: "Pollutant Sources", value: "Low", status: "good" as const, weight: 25 },
];

const CHECKLIST: ChecklistItem[] = [
  { id: "filter", label: "HVAC filter changed recently", status: "good" },
  { id: "smoke", label: "No smoking indoors", status: "good" },
  { id: "voc", label: "No VOC paints/chemicals stored inside", status: "good" },
  { id: "exhaust", label: "Bathroom exhaust fans working", status: "warning" },
  { id: "range", label: "Range hood vented outside", status: "good" },
  { id: "gas", label: "No gas appliance leaks", status: "good" },
];

const FILTER_TYPES: FilterType[] = [
  {
    name: "Fiberglass (MERV 1-4)",
    merv: "MERV 1–4",
    cost: "$1–4",
    pros: "Cheapest. Blocks large particles only.",
    recommended: false,
  },
  {
    name: "Pleated (MERV 8-10)",
    merv: "MERV 8–10",
    cost: "$8–20",
    pros: "Good for dust and pet dander.",
    recommended: false,
  },
  {
    name: "High-Efficiency (MERV 11-13)",
    merv: "MERV 11–13",
    cost: "$15–35",
    pros: "Catches pollen, mold spores, allergens. DFW recommended.",
    recommended: true,
  },
  {
    name: "HEPA / Hospital (MERV 14-16)",
    merv: "MERV 14–16",
    cost: "$30–60",
    pros: "Maximum filtration. May restrict airflow — verify system compatibility.",
    recommended: false,
  },
];

const PURIFIER_TIERS: PurifierTier[] = [
  {
    name: "Whole-Home",
    priceRange: "$500–1,500",
    coverage: "Entire home",
    icon: Home,
    color: "text-teal-400",
    description: "Integrated into HVAC system. Best long-term solution for DFW allergy seasons.",
  },
  {
    name: "Room Unit",
    priceRange: "$150–400",
    coverage: "1–2 rooms",
    icon: Wind,
    color: "text-blue-400",
    description: "Freestanding unit with HEPA filter. Great for bedrooms and home offices.",
  },
  {
    name: "HEPA Portable",
    priceRange: "$80–200",
    coverage: "Single room",
    icon: Leaf,
    color: "text-green-400",
    description: "Affordable entry point. Move room to room as needed.",
  },
];

const SEASONAL_TIPS: SeasonalTip[] = [
  {
    season: "spring",
    icon: Leaf,
    color: "text-green-400",
    bgColor: "bg-green-900/20",
    label: "Spring",
    headline: "Pollen Season",
    tips: [
      "Keep windows closed during high pollen days (check AirNow.gov)",
      "Upgrade to MERV-11+ filter in March before peak oak pollen",
      "Run bathroom exhaust fans after showers to control humidity",
      "Schedule HVAC inspection before summer cooling demand",
    ],
  },
  {
    season: "summer",
    icon: Sun,
    color: "text-amber-400",
    bgColor: "bg-amber-900/20",
    label: "Summer",
    headline: "Ozone + Wildfire Smoke",
    tips: [
      "DFW ozone alert days: keep outdoor air intake minimized",
      "West Texas wildfire smoke — seal gaps around windows and doors",
      "Change HVAC filter every 60 days May–September",
      "Set AC to recirculate (not fresh air) during smoke events",
    ],
  },
  {
    season: "fall",
    icon: Droplets,
    color: "text-orange-400",
    bgColor: "bg-orange-900/20",
    label: "Fall",
    headline: "Mold Spores",
    tips: [
      "Post-rain humidity spikes — target indoor humidity below 50%",
      "Check attic and crawlspace for mold after summer heat",
      "Clean bathroom grout and caulk before mold season peaks",
      "Inspect rain gutters to prevent moisture infiltration",
    ],
  },
  {
    season: "winter",
    icon: Snowflake,
    color: "text-blue-400",
    bgColor: "bg-blue-900/20",
    label: "Winter",
    headline: "Dry Air + Furnace Dust",
    tips: [
      "Furnace startup kicks up settled dust — replace filter first",
      "Target 35–45% indoor humidity with a humidifier",
      "Check CO detector batteries before heating season",
      "Ensure gas appliances are serviced before heavy use",
    ],
  },
];

function StatusIcon({ status }: { status: "good" | "warning" | "bad" }) {
  if (status === "good") return <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />;
  if (status === "warning") return <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />;
  return <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="144" height="144">
        <circle cx="72" cy="72" r={radius} stroke="#1e293b" strokeWidth="12" fill="none" />
        <circle
          cx="72" cy="72" r={radius}
          stroke="url(#airGrad)" strokeWidth="12" fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="airGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center z-10">
        <div className="text-3xl font-bold text-white">{score}</div>
        <div className="text-xs text-slate-400">/100</div>
      </div>
    </div>
  );
}

export default function AirQualityGuide() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    Object.fromEntries(CHECKLIST.map((i) => [i.id, i.status === "good"]))
  );
  const [activeSeason, setActiveSeason] = useState<Season>("spring");

  const toggleItem = (id: string) => setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));

  const activeTip = SEASONAL_TIPS.find((s) => s.season === activeSeason)!;

  return (
    <HomeownerLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">

        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900/40 to-cyan-900/30 border border-teal-700/40 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
              <Wind className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Air Quality Guide</h1>
              <p className="text-teal-300 text-sm">Breathe easier in your home</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm mt-4 leading-relaxed">
            Dallas-Fort Worth ranks in the top 20 most polluted cities for ozone.
            Wildfire smoke from West Texas is increasing. Your indoor air quality directly
            impacts your family's health — here's how to protect it.
          </p>
        </div>

        {/* Score + Factors */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Your Indoor Air Quality Score</h2>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <ScoreRing score={82} />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {SCORE_FACTORS.map((f) => (
                <div key={f.label} className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
                  <StatusIcon status={f.status} />
                  <div>
                    <div className="text-slate-400 text-xs">{f.label}</div>
                    <div className={`text-sm font-medium ${f.status === "good" ? "text-green-400" : "text-amber-400"}`}>
                      {f.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Indoor Air Quality Checklist</h2>
          <p className="text-slate-400 text-sm mb-5">Check off what applies to your home</p>
          <div className="space-y-3">
            {CHECKLIST.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center gap-4 bg-slate-800/50 hover:bg-slate-800 rounded-xl p-4 text-left transition-colors"
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  checklist[item.id]
                    ? "border-green-500 bg-green-500"
                    : item.status === "warning"
                    ? "border-amber-500"
                    : "border-slate-600"
                }`}>
                  {checklist[item.id] && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm flex-1 ${checklist[item.id] ? "text-slate-300" : "text-slate-400"}`}>
                  {item.label}
                </span>
                {item.status === "warning" && !checklist[item.id] && (
                  <span className="text-xs bg-amber-900/40 text-amber-400 px-2 py-0.5 rounded-full">Needs attention</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Guide */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Filter className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">HVAC Filter Guide</h2>
          </div>
          <div className="bg-amber-900/20 border border-amber-700/40 rounded-xl p-4 mb-5 text-sm text-amber-300">
            For DFW allergies and pollen, MERV-11 or higher recommended.
            Change every 60 days May–September.
          </div>
          <div className="space-y-3">
            {FILTER_TYPES.map((f) => (
              <div
                key={f.merv}
                className={`rounded-xl p-4 border flex items-start gap-4 ${
                  f.recommended
                    ? "border-teal-600/60 bg-teal-900/20"
                    : "border-slate-700/50 bg-slate-800/30"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{f.name}</span>
                    {f.recommended && (
                      <span className="text-xs bg-teal-700/60 text-teal-300 px-2 py-0.5 rounded-full">DFW Recommended</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mb-1">{f.pros}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-white">{f.cost}</div>
                  <div className="text-xs text-slate-500">per filter</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Air Purifiers */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Air Purifiers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PURIFIER_TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <div key={tier.name} className="bg-slate-800/50 rounded-xl p-5">
                  <div className={`w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${tier.color}`} />
                  </div>
                  <div className="font-medium text-white text-sm mb-1">{tier.name}</div>
                  <div className={`text-lg font-bold mb-1 ${tier.color}`}>{tier.priceRange}</div>
                  <div className="text-xs text-slate-500 mb-2">{tier.coverage}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{tier.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seasonal Tips */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-semibold text-white">Seasonal Tips</h2>
          </div>
          <div className="flex gap-2 mb-6 flex-wrap">
            {SEASONAL_TIPS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.season}
                  onClick={() => setActiveSeason(s.season)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeSeason === s.season
                      ? `${s.bgColor} ${s.color} border border-current/30`
                      : "bg-slate-800/50 text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              );
            })}
          </div>
          {activeTip && (
            <div className={`${activeTip.bgColor} border border-slate-700/30 rounded-xl p-5`}>
              <div className={`text-xs font-semibold uppercase tracking-wider ${activeTip.color} mb-1`}>
                {activeTip.label}
              </div>
              <div className="text-white font-semibold text-base mb-4">{activeTip.headline}</div>
              <ul className="space-y-2">
                {activeTip.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-0.5 ${activeTip.color}`} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-900/40 to-blue-900/30 border border-teal-700/40 rounded-2xl p-8 text-center">
          <Wind className="w-10 h-10 text-teal-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Schedule HVAC Air Quality Service</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Get a certified HVAC technician to assess your system, recommend the right filter grade,
            and improve your home's air quality score.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Book Air Quality Service
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-medium px-8 py-3 rounded-xl transition-colors">
              Get Free Quote
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>Typical response within 2 hours</span>
          </div>
        </div>

      </div>
    </HomeownerLayout>
  );
}
