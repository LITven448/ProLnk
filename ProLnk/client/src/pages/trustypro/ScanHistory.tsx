import { useState } from "react";
import {
  Camera,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  DollarSign,
  Calendar,
  Star,
  Filter,
  ChevronRight,
  Zap,
  Home,
  Droplets,
} from "lucide-react";

type FilterTab = "all" | "month" | "highscore" | "flagged";

const SCANS = [
  {
    id: 1,
    address: "4821 Oakwood Blvd, Plano TX",
    date: "May 12, 2026",
    score: 88,
    badges: [
      { label: "HVAC", status: "warn" },
      { label: "Roof", status: "ok" },
      { label: "Foundation", status: "ok" },
    ],
    opportunities: 2,
  },
  {
    id: 2,
    address: "1502 Maple Creek Dr, Frisco TX",
    date: "May 8, 2026",
    score: 61,
    badges: [
      { label: "HVAC", status: "warn" },
      { label: "Plumbing", status: "warn" },
      { label: "Electrical", status: "ok" },
    ],
    opportunities: 4,
  },
  {
    id: 3,
    address: "3309 Summit Ridge Ln, McKinney TX",
    date: "May 5, 2026",
    score: 79,
    badges: [
      { label: "Roof", status: "warn" },
      { label: "HVAC", status: "ok" },
      { label: "Foundation", status: "ok" },
    ],
    opportunities: 3,
  },
  {
    id: 4,
    address: "872 Creekside Ct, Allen TX",
    date: "Apr 30, 2026",
    score: 92,
    badges: [
      { label: "HVAC", status: "ok" },
      { label: "Roof", status: "ok" },
      { label: "Plumbing", status: "ok" },
    ],
    opportunities: 1,
  },
  {
    id: 5,
    address: "6150 Heritage Oak Dr, Prosper TX",
    date: "Apr 24, 2026",
    score: 54,
    badges: [
      { label: "Foundation", status: "warn" },
      { label: "HVAC", status: "warn" },
      { label: "Roof", status: "warn" },
    ],
    opportunities: 5,
  },
  {
    id: 6,
    address: "2244 Willow Springs Rd, Celina TX",
    date: "Apr 18, 2026",
    score: 83,
    badges: [
      { label: "HVAC", status: "ok" },
      { label: "Electrical", status: "warn" },
      { label: "Foundation", status: "ok" },
    ],
    opportunities: 2,
  },
  {
    id: 7,
    address: "9901 Ridgeview Ct, Little Elm TX",
    date: "Apr 10, 2026",
    score: 70,
    badges: [
      { label: "Plumbing", status: "warn" },
      { label: "Roof", status: "ok" },
      { label: "HVAC", status: "ok" },
    ],
    opportunities: 3,
  },
  {
    id: 8,
    address: "555 Lakewood Terrace, The Colony TX",
    date: "Apr 3, 2026",
    score: 95,
    badges: [
      { label: "HVAC", status: "ok" },
      { label: "Plumbing", status: "ok" },
      { label: "Foundation", status: "ok" },
    ],
    opportunities: 1,
  },
];

function ScoreRing({ score }: { score: number }) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative flex items-center justify-center" style={{ width: 60, height: 60 }}>
      <svg width={60} height={60} className="-rotate-90">
        <circle cx={30} cy={30} r={r} fill="none" stroke="#1e3a5f" strokeWidth={5} />
        <circle
          cx={30}
          cy={30}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-sm font-bold text-white">{score}</span>
    </div>
  );
}

function BadgeChip({ label, status }: { label: string; status: string }) {
  const icon = status === "ok" ? "✅" : "⚠️";
  const bg = status === "ok" ? "bg-emerald-900/40 text-emerald-400 border-emerald-700" : "bg-amber-900/40 text-amber-400 border-amber-700";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${bg}`}>
      {icon} {label}
    </span>
  );
}

export default function ScanHistory() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered = SCANS.filter((s) => {
    if (activeTab === "month") {
      return s.date.startsWith("May");
    }
    if (activeTab === "highscore") return s.score >= 80;
    if (activeTab === "flagged") return s.badges.some((b) => b.status === "warn");
    return true;
  });

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "month", label: "This Month" },
    { key: "highscore", label: "High Score" },
    { key: "flagged", label: "Flagged Issues" },
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <Camera className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Scan History</h1>
              <p className="text-sm text-slate-400">All property scans and AI analysis results</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-sm font-semibold border border-teal-500/30">
            {SCANS.length} total
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Camera, label: "Total Scans", value: "47", color: "text-teal-400", bg: "bg-teal-500/10" },
            { icon: Star, label: "Avg Health Score", value: "76/100", color: "text-amber-400", bg: "bg-amber-500/10" },
            { icon: Zap, label: "Opportunities Found", value: "132", color: "text-purple-400", bg: "bg-purple-500/10" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-[#0F2040] rounded-xl p-4 border border-white/5">
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Performance Banner */}
        <div className="bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border border-teal-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-teal-400 shrink-0" />
          <p className="text-sm text-teal-200">
            Your scans are generating <span className="font-bold text-teal-400">2.4x more leads</span> than average. Keep up the momentum!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "bg-teal-500 text-white"
                  : "bg-[#0F2040] text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button className="ml-auto px-4 py-2 rounded-full text-sm font-medium bg-[#0F2040] text-slate-400 border border-white/10 hover:text-white flex items-center gap-1 whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>

        {/* Scan Cards */}
        <div className="space-y-4">
          {filtered.map((scan) => (
            <div key={scan.id} className="bg-[#0F2040] rounded-xl border border-white/5 p-4 hover:border-teal-500/30 transition-colors">
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg shrink-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <Home className="w-6 h-6 text-slate-500" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm truncate">{scan.address}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-400">{scan.date}</span>
                      </div>
                    </div>
                    <ScoreRing score={scan.score} />
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {scan.badges.map((b) => (
                      <BadgeChip key={b.label} label={b.label} status={b.status} />
                    ))}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-900/40 text-purple-300 border border-purple-700/50 ml-auto">
                      <Zap className="w-3 h-3" /> Opportunities: {scan.opportunities}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-medium hover:bg-teal-500/20 transition-colors border border-teal-500/20">
                      <FileText className="w-3 h-3" /> View Full Report
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white text-xs font-medium hover:bg-white/10 transition-colors border border-white/10">
                      <DollarSign className="w-3 h-3" /> Get Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <Camera className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No scans match this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
