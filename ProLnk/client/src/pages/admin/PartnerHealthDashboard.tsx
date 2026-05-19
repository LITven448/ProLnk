import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Heart, AlertTriangle, CheckCircle, TrendingUp,
  Star, Clock, Mail, Users, Activity, BarChart2,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface Partner {
  id: string;
  name: string;
  trade: string;
  healthScore: number;
  nps: number;
  completionRate: number;
  jobsThisMonth: number;
  lastActive: string;
  daysInactive: number;
  tier: "Charter" | "Founding" | "L3″ | "L4";
}

const PARTNERS: Partner[] = [
  { id: "P001″, name: "Marcus Delgado",   trade: "HVAC",        healthScore: 96, nps: 9, completionRate: 97, jobsThisMonth: 31, lastActive: "Today",    daysInactive: 0,  tier: "Charter" },
  { id: "P002″, name: "Tasha Williams",   trade: "Plumbing",    healthScore: 91, nps: 8, completionRate: 94, jobsThisMonth: 27, lastActive: "Today",    daysInactive: 0,  tier: "Charter" },
  { id: "P003″, name: "Jordan Kimura",    trade: "Electrical",  healthScore: 88, nps: 8, completionRate: 92, jobsThisMonth: 24, lastActive: "Yesterday", daysInactive: 1,  tier: "Founding" },
  { id: "P004″, name: "Rafael Santos",    trade: "Roofing",     healthScore: 85, nps: 7, completionRate: 89, jobsThisMonth: 22, lastActive: "2d ago",   daysInactive: 2,  tier: "Founding" },
  { id: "P005″, name: "Devon Price",      trade: "HVAC",        healthScore: 82, nps: 8, completionRate: 88, jobsThisMonth: 20, lastActive: "3d ago",   daysInactive: 3,  tier: "Charter" },
  { id: "P006″, name: "Alicia Moreno",    trade: "Plumbing",    healthScore: 78, nps: 7, completionRate: 86, jobsThisMonth: 19, lastActive: "4d ago",   daysInactive: 4,  tier: "Founding" },
  { id: "P007″, name: "Chris Okafor",     trade: "Electrical",  healthScore: 74, nps: 6, completionRate: 82, jobsThisMonth: 17, lastActive: "5d ago",   daysInactive: 5,  tier: "L3" },
  { id: "P008″, name: "Priya Nair",       trade: "Painting",    healthScore: 69, nps: 6, completionRate: 79, jobsThisMonth: 16, lastActive: "8d ago",   daysInactive: 8,  tier: "L3" },
  { id: "P009″, name: "Sam Boucher",      trade: "Carpentry",   healthScore: 55, nps: 5, completionRate: 71, jobsThisMonth: 8,  lastActive: "14d ago",  daysInactive: 14, tier: "L4" },
  { id: "P010″, name: "Nina Kaplan",      trade: "Landscaping", healthScore: 44, nps: 5, completionRate: 65, jobsThisMonth: 4,  lastActive: "21d ago",  daysInactive: 21, tier: "L4" },
  { id: "P011″, name: "Greg Hammond",     trade: "HVAC",        healthScore: 31, nps: 4, completionRate: 58, jobsThisMonth: 2,  lastActive: "34d ago",  daysInactive: 34, tier: "L4" },
  { id: "P012″, name: "Lisa Fontaine",    trade: "Plumbing",    healthScore: 22, nps: 3, completionRate: 44, jobsThisMonth: 0,  lastActive: "47d ago",  daysInactive: 47, tier: "L4" },
];

const AT_RISK = PARTNERS.filter((p) => p.daysInactive > 30);

const TOP_PERFORMERS = [...PARTNERS].sort((a, b) => b.jobsThisMonth - a.jobsThisMonth).slice(0, 5);

// Activity heatmap — 8 weeks × 7 days = 56 cells
// Value 0-4 representing activity level
const HEATMAP: number[][] = [
  [4, 4, 3, 4, 2, 1, 0],
  [4, 3, 4, 4, 3, 2, 0],
  [3, 4, 3, 2, 4, 1, 0],
  [4, 4, 4, 3, 3, 2, 1],
  [3, 4, 3, 4, 2, 1, 0],
  [4, 3, 4, 4, 3, 2, 0],
  [3, 3, 4, 3, 4, 1, 0],
  [4, 4, 3, 4, 3, 2, 1],
];

const WEEK_LABELS = ["W-7″, "W-6", "W-5", "W-4", "W-3", "W-2", "W-1", "This W"];
const DAY_LABELS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Engagement score distribution — 5 buckets
const ENGAGEMENT_DIST = [
  { range: "0–20″,  count: 4,  label: "Dormant"  },
  { range: "21–40″, count: 9,  label: "Low"      },
  { range: "41–60″, count: 18, label: "Moderate" },
  { range: "61–80″, count: 31, label: "Active"   },
  { range: "81–100″,count: 24, label: "Top"      },
];
const maxDist = Math.max(...ENGAGEMENT_DIST.map((d) => d.count));

// ─── Helpers ──────────────────────────────────────────────────────────────────

const heatColor = (v: number) => {
  if (v === 0) return "#1e293b";
  if (v === 1) return "#134e4a";
  if (v === 2) return "#0f766e";
  if (v === 3) return "#0d9488″;
  return "#2dd4bf";
};

const scoreColor = (s: number) =>
  s >= 70 ? "#34d399″ : s >= 40 ? "#f59e0b" : "#ef4444";

const tierBadge = (tier: Partner["tier"]) => {
  const map: Record<Partner["tier"], string> = {
    Charter: "bg-amber-500/20 text-amber-400″,
    Founding: "bg-teal-500/20 text-teal-400″,
    L3: "bg-blue-500/20 text-blue-400″,
    L4: "bg-slate-600 text-slate-300″,
  };
  return map[tier];
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PartnerHealthDashboard() {
  const [reachedOut, setReachedOut] = useState<Set<string>>(new Set());

  const healthy  = PARTNERS.filter((p) => p.healthScore >= 70).length;
  const moderate = PARTNERS.filter((p) => p.healthScore >= 40 && p.healthScore < 70).length;
  const atRisk   = PARTNERS.filter((p) => p.healthScore < 40).length;
  const avgNps   = Math.round(PARTNERS.reduce((s, p) => s + p.nps, 0) / PARTNERS.length * 10) / 10;
  const avgCompletion = Math.round(PARTNERS.reduce((s, p) => s + p.completionRate, 0) / PARTNERS.length);

  const markReached = (id: string) => setReachedOut((prev) => new Set([...prev, id]));

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] p-6 space-y-8″>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
            <Heart className="w-6 h-6 text-teal-400″ />
            Partner Health Dashboard
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Engagement, NPS, completion rate, and at-risk partner tracking</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4″>
          {[
            { label: "Healthy (70+)",    value: healthy.toString(),         icon: CheckCircle, color: "#34d399″ },
            { label: "Moderate (40–69)", value: moderate.toString(),        icon: Activity,    color: "#f59e0b" },
            { label: "At Risk (<40)",    value: atRisk.toString(),          icon: AlertTriangle, color: "#ef4444″ },
            { label: "Avg NPS",          value: `${avgNps}/10`,             icon: Star,        color: "#818cf8″ },
            { label: "Avg Completion",   value: `${avgCompletion}%`,        icon: TrendingUp,  color: "#2dd4bf" },
          ].map((k) => (
            <div key={k.label} className="bg-slate-800 rounded-xl p-5 border border-slate-700″>
              <div className="flex items-center justify-between mb-2″>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400″>{k.label}</span>
                <k.icon className="w-4 h-4″ style={{ color: k.color }} />
              </div>
              <div className="text-2xl font-bold text-white">{k.value}</div>
            </div>
          ))}
        </div>

        {/* Activity Heatmap */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6″>
          <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2″>
            <Activity className="w-4 h-4 text-teal-400″ />
            Partner Activity Heatmap — Last 8 Weeks
          </h2>
          <div className="overflow-x-auto">
            <div className="inline-block">
              {/* Day labels top */}
              <div className="flex gap-1 mb-1 ml-10″>
                {DAY_LABELS.map((d) => (
                  <div key={d} className="w-8 text-center text-xs text-slate-500″>{d}</div>
                ))}
              </div>
              {/* Rows */}
              {HEATMAP.map((week, wi) => (
                <div key={wi} className="flex items-center gap-1 mb-1″>
                  <div className="w-8 text-right text-xs text-slate-500 pr-1″>{WEEK_LABELS[wi]}</div>
                  {week.map((val, di) => (
                    <div
                      key={di}
                      title={`${WEEK_LABELS[wi]} ${DAY_LABELS[di]}: level ${val}`}
                      className="w-8 h-8 rounded-md transition-all hover:ring-2 hover:ring-teal-400/40 cursor-default"
                      style={{ background: heatColor(val) }}
                    />
                  ))}
                </div>
              ))}
              {/* Legend */}
              <div className="flex items-center gap-2 mt-3 ml-10″>
                <span className="text-xs text-slate-500″>Less</span>
                {[0, 1, 2, 3, 4].map((v) => (
                  <div key={v} className="w-5 h-5 rounded-sm" style={{ background: heatColor(v) }} />
                ))}
                <span className="text-xs text-slate-500″>More</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6″>

          {/* At-Risk Partners */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-white font-semibold text-base flex items-center gap-2″>
                <AlertTriangle className="w-4 h-4 text-red-400″ />
                At-Risk Partners
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-semibold">
                {AT_RISK.length} inactive &gt;30d
              </span>
            </div>
            <div className="divide-y divide-slate-700/50″>
              {AT_RISK.map((p) => (
                <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-700/30 transition-colors">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    style={{ background: scoreColor(p.healthScore) + "22″, color: scoreColor(p.healthScore) }}
                  >
                    {p.healthScore}
                  </div>
                  <div className="flex-1 min-w-0″>
                    <div className="flex items-center gap-1.5″>
                      <span className="font-medium text-white text-sm">{p.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tierBadge(p.tier)}`}>{p.tier}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5″>
                      {p.trade} · Last active {p.lastActive} · {p.daysInactive}d inactive
                    </div>
                  </div>
                  <button
                    onClick={() => markReached(p.id)}
                    disabled={reachedOut.has(p.id)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      reachedOut.has(p.id)
                        ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                        : "bg-teal-500/20 text-teal-400 hover:bg-teal-500/30″
                    }`}
                  >
                    <Mail className="w-3 h-3″ />
                    {reachedOut.has(p.id) ? "Sent" : "Reach Out"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700″>
              <h2 className="text-white font-semibold text-base flex items-center gap-2″>
                <Star className="w-4 h-4 text-amber-400″ />
                Top Performers This Month
              </h2>
            </div>
            <div className="divide-y divide-slate-700/50″>
              {TOP_PERFORMERS.map((p, i) => (
                <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-700/30 transition-colors">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i < 3 ? "bg-amber-500/20 text-amber-400" : "bg-slate-700 text-slate-400"}`}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0″>
                    <div className="flex items-center gap-1.5″>
                      <span className="font-medium text-white text-sm">{p.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tierBadge(p.tier)}`}>{p.tier}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5″>
                      {p.trade} · NPS {p.nps}/10 · {p.completionRate}% completion
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">{p.jobsThisMonth} jobs</div>
                    <div className="text-xs" style={{ color: scoreColor(p.healthScore) }}>
                      Score {p.healthScore}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini score distribution */}
            <div className="px-6 py-4 border-t border-slate-700″>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5″>
                <BarChart2 className="w-3 h-3″ />
                Engagement Score Distribution
              </div>
              <div className="flex items-end gap-1.5 h-20″>
                {ENGAGEMENT_DIST.map((d) => (
                  <div key={d.range} className="flex-1 flex flex-col items-center gap-1″>
                    <span className="text-xs text-slate-400″>{d.count}</span>
                    <div
                      className="w-full rounded-t-sm transition-all"
                      style={{
                        height: `${(d.count / maxDist) * 56}px`,
                        background: d.range === "81–100″ ? "#2dd4bf" : d.range === "61–80" ? "#34d399" : d.range === "41–60" ? "#f59e0b" : d.range === "21–40" ? "#fb923c" : "#ef4444",
                      }}
                    />
                    <span className="text-xs text-slate-500 leading-tight text-center">{d.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* All Partners Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700″>
            <h2 className="text-white font-semibold text-base flex items-center gap-2″>
              <Users className="w-4 h-4 text-teal-400″ />
              All Partners Health Overview
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3″>Partner</th>
                  <th className="text-left px-4 py-3″>Trade</th>
                  <th className="text-left px-4 py-3″>Tier</th>
                  <th className="text-center px-4 py-3″>Health</th>
                  <th className="text-center px-4 py-3″>NPS</th>
                  <th className="text-center px-4 py-3″>Completion</th>
                  <th className="text-right px-4 py-3″>Jobs</th>
                  <th className="text-right px-6 py-3″>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {PARTNERS.map((p) => (
                  <tr key={p.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-white">{p.name}</td>
                    <td className="px-4 py-3 text-slate-300″>{p.trade}</td>
                    <td className="px-4 py-3″>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${tierBadge(p.tier)}`}>{p.tier}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-2″>
                        <div className="w-16 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${p.healthScore}%`, background: scoreColor(p.healthScore) }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: scoreColor(p.healthScore) }}>{p.healthScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300″>{p.nps}/10</td>
                    <td className="px-4 py-3 text-center text-slate-300″>{p.completionRate}%</td>
                    <td className="px-4 py-3 text-right text-white font-semibold">{p.jobsThisMonth}</td>
                    <td className={`px-6 py-3 text-right text-xs ${p.daysInactive > 30 ? "text-red-400" : p.daysInactive > 14 ? "text-amber-400" : "text-slate-400"}`}>
                      {p.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
