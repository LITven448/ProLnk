import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Target, TrendingUp, Clock, AlertTriangle,
  CheckCircle, XCircle, Filter, Flag, BarChart2, Archive, Zap,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

type DateRange = "7d" | "30d" | "90d";

interface TradeQuality {
  trade: string;
  high: number;
  medium: number;
  low: number;
  total: number;
  acceptRate: number;
  avgResponseMin: number;
}

const TRADE_QUALITY: TradeQuality[] = [
  { trade: "HVAC",        high: 68, medium: 21, low: 11, total: 100, acceptRate: 84, avgResponseMin: 12 },
  { trade: "Plumbing",    high: 55, medium: 28, low: 17, total: 100, acceptRate: 76, avgResponseMin: 18 },
  { trade: "Electrical",  high: 61, medium: 25, low: 14, total: 100, acceptRate: 79, avgResponseMin: 15 },
  { trade: "Roofing",     high: 44, medium: 33, low: 23, total: 100, acceptRate: 68, avgResponseMin: 24 },
  { trade: "Painting",    high: 39, medium: 36, low: 25, total: 100, acceptRate: 61, avgResponseMin: 31 },
  { trade: "Landscaping", high: 32, medium: 41, low: 27, total: 100, acceptRate: 57, avgResponseMin: 42 },
  { trade: "Carpentry",   high: 48, medium: 30, low: 22, total: 100, acceptRate: 72, avgResponseMin: 20 },
];

interface RejectionReason {
  reason: string;
  count: number;
  color: string;
}

const REJECTION_REASONS: RejectionReason[] = [
  { reason: "Outside service area", count: 148, color: "#f59e0b" },
  { reason: "Budget too low",       count: 112, color: "#ef4444" },
  { reason: "Too far (distance)",   count: 97,  color: "#8b5cf6" },
  { reason: "Schedule conflict",    count: 74,  color: "#3b82f6" },
  { reason: "Trade mismatch",       count: 53,  color: "#ec4899" },
  { reason: "Already booked",       count: 38,  color: "#14b8a6" },
];

interface FlaggedLead {
  id: string;
  homeowner: string;
  trade: string;
  flag: string;
  severity: "high" | "medium";
  submitted: string;
}

const FLAGGED_LEADS: FlaggedLead[] = [
  { id: "LQ-001", homeowner: "J. Henderson", trade: "HVAC",       flag: "Duplicate submission (3×)",      severity: "high",   submitted: "2h ago"  },
  { id: "LQ-002", homeowner: "P. Okafor",    trade: "Plumbing",   flag: "Disposable email domain",        severity: "medium", submitted: "4h ago"  },
  { id: "LQ-003", homeowner: "K. Martinez",  trade: "Electrical", flag: "Address not verifiable",         severity: "high",   submitted: "6h ago"  },
  { id: "LQ-004", homeowner: "L. Choi",      trade: "Roofing",    flag: "Budget claim inconsistent",      severity: "medium", submitted: "8h ago"  },
  { id: "LQ-005", homeowner: "M. Brown",     trade: "Painting",   flag: "Phone number flagged—TCPA list", severity: "high",   submitted: "12h ago" },
];

const SCORE_DISTRIBUTION = [
  { name: "High (80+)",     value: 47, color: "#10b981" },
  { name: "Medium (50-79)", value: 36, color: "#f59e0b" },
  { name: "Low (<50)",      value: 17, color: "#ef4444" },
];

const QUALITY_TREND: { day: string; score: number }[] = [
  { day: "May 1",  score: 68 },
  { day: "May 2",  score: 71 },
  { day: "May 3",  score: 66 },
  { day: "May 4",  score: 74 },
  { day: "May 5",  score: 72 },
  { day: "May 6",  score: 69 },
  { day: "May 7",  score: 75 },
  { day: "May 8",  score: 78 },
  { day: "May 9",  score: 73 },
  { day: "May 10", score: 80 },
  { day: "May 11", score: 77 },
  { day: "May 12", score: 82 },
  { day: "May 13", score: 79 },
  { day: "May 14", score: 84 },
];

interface SourceQuality {
  source: string;
  avgScore: number;
  convRate: number;
  badge: string;
  badgeColor: string;
}

const SOURCE_QUALITY: SourceQuality[] = [
  { source: "Photo AI Scan",       avgScore: 84, convRate: 79, badge: "Excellent", badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { source: "Storm Auto-Lead",     avgScore: 78, convRate: 72, badge: "High",      badgeColor: "bg-green-500/20  text-green-300  border-green-500/30"    },
  { source: "Homeowner Signup",    avgScore: 65, convRate: 61, badge: "Medium",    badgeColor: "bg-amber-500/20  text-amber-300  border-amber-500/30"    },
  { source: "Partner Referral",    avgScore: 71, convRate: 68, badge: "Medium",    badgeColor: "bg-amber-500/20  text-amber-300  border-amber-500/30"    },
];

interface LowQualityLead {
  id: string;
  homeowner: string;
  trade: string;
  score: number;
  reason: string;
  submitted: string;
}

const LOW_QUALITY_LEADS: LowQualityLead[] = [
  { id: "LL-022", homeowner: "R. Sullivan",  trade: "Roofing",     score: 28, reason: "No verifiable address; phone disconnected",         submitted: "3h ago"  },
  { id: "LL-019", homeowner: "D. Park",      trade: "Plumbing",    score: 34, reason: "Budget $50 — below minimum viable threshold",       submitted: "5h ago"  },
  { id: "LL-017", homeowner: "T. Nguyen",    trade: "Landscaping", score: 41, reason: "Duplicate — 4th submission same contact",           submitted: "7h ago"  },
  { id: "LL-015", homeowner: "G. Williams",  trade: "Electrical",  score: 37, reason: "TCPA do-not-contact flag on phone number",          submitted: "9h ago"  },
  { id: "LL-011", homeowner: "S. Patel",     trade: "HVAC",        score: 44, reason: "Service area mismatch — zip code not in coverage",  submitted: "11h ago" },
];

const maxRejection = Math.max(...REJECTION_REASONS.map(r => r.count));

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  iconColor: string;
}

function KpiCard({ label, value, sub, icon: Icon, iconColor }: KpiCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</span>
        <Icon className="w-5 h-5" style={{ color: iconColor }} />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{sub}</div>
    </div>
  );
}

function ScoreDistributionDonut() {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h2 className="text-white font-semibold text-base flex items-center gap-2 mb-4">
        <Target className="w-4 h-4 text-teal-400" />
        Score Distribution
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={SCORE_DISTRIBUTION}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {SCORE_DISTRIBUTION.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
            formatter={(val: number) => [`${val}%`, ""]}
          />
          <Legend
            formatter={(value) => <span style={{ color: "#cbd5e1", fontSize: 11 }}>{value}</span>}
            iconSize={10}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {SCORE_DISTRIBUTION.map(s => (
          <div key={s.name} className="text-center">
            <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}%</p>
            <p className="text-[10px] text-slate-400 leading-tight">{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QualityTrendChart() {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h2 className="text-white font-semibold text-base flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-teal-400" />
        Avg Lead Score — Last 14 Days
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={QUALITY_TREND} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} interval={1} />
          <YAxis domain={[60, 90]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#e2e8f0" }}
            formatter={(val: number) => [val, "Avg Score"]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#2dd4bf"
            strokeWidth={2}
            dot={{ fill: "#2dd4bf", r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function SourceQualityTable() {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700">
        <h2 className="text-white font-semibold text-base flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-teal-400" />
          Source Quality Comparison
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
              <th className="text-left px-6 py-3">Source</th>
              <th className="text-center px-4 py-3">Avg Score</th>
              <th className="text-center px-4 py-3">Conv. Rate</th>
              <th className="text-right px-6 py-3">Quality</th>
            </tr>
          </thead>
          <tbody>
            {SOURCE_QUALITY.map(s => (
              <tr key={s.source} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-3 font-medium text-white">{s.source}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                      <div className="h-full rounded-full bg-teal-500" style={{ width: `${s.avgScore}%` }} />
                    </div>
                    <span className="text-teal-300 font-bold text-xs">{s.avgScore}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-slate-300 text-xs font-semibold">{s.convRate}%</td>
                <td className="px-6 py-3 text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.badgeColor}`}>{s.badge}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LowQualityReview() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const visible = LOW_QUALITY_LEADS.filter(l => !dismissed.has(l.id));
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
        <h2 className="text-white font-semibold text-base flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          Low Quality Lead Review
        </h2>
        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-semibold border border-red-500/30">
          {visible.length} pending
        </span>
      </div>
      {visible.length === 0 ? (
        <div className="py-12 text-center">
          <CheckCircle className="w-10 h-10 text-teal-400/40 mx-auto mb-2" />
          <p className="text-sm text-slate-400">All low-quality leads reviewed</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-700/50">
          {visible.map(lead => (
            <div key={lead.id} className="px-6 py-4 hover:bg-slate-700/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-500">{lead.id}</span>
                    <span className="text-sm font-semibold text-white">{lead.homeowner}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">{lead.trade}</span>
                    <span className="text-[10px] text-slate-500 ml-auto flex-shrink-0">{lead.submitted}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{lead.reason}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                      Score: {lead.score}/100
                    </span>
                    <div className="w-24 h-1 rounded-full bg-slate-700 overflow-hidden">
                      <div className="h-full rounded-full bg-red-500" style={{ width: `${lead.score}%` }} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setDismissed(prev => new Set([...prev, lead.id]))}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors border border-slate-600"
                  >
                    <Archive className="w-3 h-3" />
                    Archive
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-teal-500/15 text-teal-300 hover:bg-teal-500/25 transition-colors border border-teal-500/30">
                    <Zap className="w-3 h-3" />
                    Boost Score
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LeadQualityCenter() {
  const [range, setRange] = useState<DateRange>("30d");

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] p-6 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-teal-400" />
              Lead Quality Center
            </h1>
            <p className="text-slate-400 mt-1 text-sm">Acceptance rates, quality scoring, and flagged activity by trade</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Date range:</span>
            <div className="flex rounded-lg overflow-hidden border border-slate-700">
              {(["7d", "30d", "90d"] as DateRange[]).map(r => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                    range === r ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Total Leads"    value="1,284"  sub="Last 30 days"          icon={Target}        iconColor="#2dd4bf" />
          <KpiCard label="Avg Acceptance" value="71.0%"  sub="Across all trades"     icon={CheckCircle}   iconColor="#34d399" />
          <KpiCard label="Avg Response"   value="22 min" sub="Time to first contact" icon={Clock}         iconColor="#818cf8" />
          <KpiCard label="Flagged Leads"  value="37"     sub="Needs review"          icon={AlertTriangle} iconColor="#f59e0b" />
        </div>

        {/* Score Distribution + Trend */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ScoreDistributionDonut />
          <QualityTrendChart />
        </div>

        {/* Source Quality Comparison */}
        <SourceQualityTable />

        {/* Quality Breakdown by Trade */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-white font-semibold text-base flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-teal-400" />
              Lead Quality Breakdown by Trade
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3">Trade</th>
                  <th className="text-center px-3 py-3">High Quality</th>
                  <th className="text-center px-3 py-3">Medium</th>
                  <th className="text-center px-3 py-3">Low Quality</th>
                  <th className="text-center px-4 py-3">Accept Rate</th>
                  <th className="text-right px-6 py-3">Avg Response</th>
                </tr>
              </thead>
              <tbody>
                {TRADE_QUALITY.map(t => (
                  <tr key={t.trade} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-white">{t.trade}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${t.high * 0.7}px` }} />
                        <span className="text-emerald-400 text-xs font-semibold">{t.high}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <div className="h-1.5 rounded-full bg-amber-500" style={{ width: `${t.medium * 0.7}px` }} />
                        <span className="text-amber-400 text-xs font-semibold">{t.medium}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <div className="h-1.5 rounded-full bg-red-500" style={{ width: `${t.low * 0.7}px` }} />
                        <span className="text-red-400 text-xs font-semibold">{t.low}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-1">
                        <div className="w-16 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                          <div className="h-full rounded-full bg-teal-500" style={{ width: `${t.acceptRate}%` }} />
                        </div>
                        <span className="text-teal-400 text-xs font-bold">{t.acceptRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right text-slate-300 text-xs">{t.avgResponseMin} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Quality Lead Review */}
        <LowQualityReview />

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Rejection Reasons */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700">
              <h2 className="text-white font-semibold text-base flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" />
                Lead Rejection Reasons
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {REJECTION_REASONS.map(r => (
                <div key={r.reason} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{r.reason}</span>
                    <span className="font-bold text-white">{r.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(r.count / maxRejection) * 100}%`, background: r.color }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-2 text-xs text-slate-500 border-t border-slate-700 mt-4">
                522 rejections total in selected period
              </div>
            </div>
          </div>

          {/* Flagged Leads */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-white font-semibold text-base flex items-center gap-2">
                <Flag className="w-4 h-4 text-amber-400" />
                Flagged Leads
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold">
                {FLAGGED_LEADS.length} active
              </span>
            </div>
            <div className="divide-y divide-slate-700/50">
              {FLAGGED_LEADS.map(lead => (
                <div key={lead.id} className="flex items-start gap-3 px-6 py-4 hover:bg-slate-700/30 transition-colors">
                  <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${lead.severity === "high" ? "bg-red-500" : "bg-amber-500"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">{lead.id}</span>
                      <span className="text-sm font-medium text-white">{lead.homeowner}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">{lead.trade}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{lead.flag}</div>
                  </div>
                  <div className="text-xs text-slate-500 flex-shrink-0">{lead.submitted}</div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-slate-700">
              <button className="text-xs text-teal-400 hover:text-teal-300 font-semibold">
                View all flagged leads →
              </button>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
