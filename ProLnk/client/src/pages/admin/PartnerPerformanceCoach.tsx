import type React from "react";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Brain, AlertTriangle, Trophy, MessageSquare, Phone,
  BookOpen, Star, ToggleLeft, ToggleRight, Zap, Clock,
  TrendingUp, Users,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface AtRiskPartner {
  id: string;
  name: string;
  trade: string;
  issue: string;
  riskScore: number;
  action: "Send Check-in" | "Offer Training" | "Schedule Call";
}

const AT_RISK: AtRiskPartner[] = [
  { id: "R1", name: "Greg Hammond",   trade: "HVAC",        issue: "No jobs in 14 days",          riskScore: 87, action: "Send Check-in"  },
  { id: "R2", name: "Lisa Fontaine",  trade: "Plumbing",    issue: "Lead acceptance <40%",         riskScore: 91, action: "Offer Training" },
  { id: "R3", name: "Nina Kaplan",    trade: "Landscaping", issue: "Last login 3 weeks ago",       riskScore: 84, action: "Send Check-in"  },
  { id: "R4", name: "Sam Boucher",    trade: "Carpentry",   issue: "Profile missing 4 photos",     riskScore: 72, action: "Offer Training" },
  { id: "R5", name: "Derek Fowler",   trade: "Painting",    issue: "Rating dropped below 3.5★",   riskScore: 79, action: "Schedule Call"  },
];

const PERF_DIST = [
  { tier: "Struggling", count: 18, color: "#ef4444" },
  { tier: "Average",    count: 47, color: "#f59e0b" },
  { tier: "Good",       count: 61, color: "#34d399" },
  { tier: "Excellent",  count: 31, color: "#2dd4bf" },
];

interface TopPerformer {
  rank: number;
  name: string;
  trade: string;
  metric: string;
  badge: string;
  badgeColor: string;
}

const TOP_PERFORMERS: TopPerformer[] = [
  { rank: 1, name: "Marcus Delgado",  trade: "HVAC",       metric: "14 jobs this month",      badge: "Elite Pro",      badgeColor: "#f59e0b" },
  { rank: 2, name: "Tasha Williams",  trade: "Plumbing",   metric: "4.9★ avg rating",         badge: "5-Star",         badgeColor: "#818cf8" },
  { rank: 3, name: "Jordan Kimura",   trade: "Electrical", metric: "94% acceptance rate",     badge: "Fast Responder", badgeColor: "#2dd4bf" },
  { rank: 4, name: "Rafael Santos",   trade: "Roofing",    metric: "$8,400 earned this month",badge: "Top Earner",     badgeColor: "#34d399" },
  { rank: 5, name: "Devon Price",     trade: "HVAC",       metric: "12 referrals sent",       badge: "Connector",      badgeColor: "#60a5fa" },
];

interface CoachTip {
  id: string;
  icon: "alert" | "trend" | "star" | "clock" | "zap";
  text: string;
  time: string;
}

const COACH_TIPS: CoachTip[] = [
  { id: "T1", icon: "clock",  text: "Marcus Rivera hasn't logged in 8 days. Recommended: Send personalized re-engagement SMS with a highlight of 3 open leads in his ZIP.", time: "2h ago" },
  { id: "T2", icon: "trend",  text: "ZIP 75034 is trending — 3 HVAC leads unaccepted in last 24h. Dispatch to backup pros Devon Price and Alicia Moreno.", time: "4h ago" },
  { id: "T3", icon: "alert",  text: "Lisa Fontaine's acceptance rate dropped to 38%. A short 10-min onboarding refresher on lead review could add $1,200/mo to her pipeline.", time: "6h ago" },
  { id: "T4", icon: "star",   text: "Jordan Kimura is on track for Tier 3 this month (+4 jobs needed). Send a push notification to unlock bonus commission.", time: "Yesterday" },
  { id: "T5", icon: "zap",    text: "Roofing demand in Frisco is up 31% post-storm. Alert your top 5 roofing partners with a same-day surge notification.", time: "Yesterday" },
];

const ACTION_COLORS: Record<AtRiskPartner["action"], string> = {
  "Send Check-in":  "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
  "Offer Training": "bg-amber-500/20 text-amber-700 hover:bg-amber-500/30",
  "Schedule Call":  "bg-purple-500/20 text-gray-600 hover:bg-purple-500/30",
};

const ACTION_ICONS: Record<AtRiskPartner["action"], typeof MessageSquare> = {
  "Send Check-in":  MessageSquare,
  "Offer Training": BookOpen,
  "Schedule Call":  Phone,
};

const TIP_ICON_MAP: Record<CoachTip["icon"], typeof Brain> = {
  alert: AlertTriangle,
  trend: TrendingUp,
  star:  Star,
  clock: Clock,
  zap:   Zap,
};

const TIP_ICON_COLOR: Record<CoachTip["icon"], string> = {
  alert: "text-red-600",
  trend: "text-teal-700",
  star:  "text-amber-700",
  clock: "text-blue-400",
  zap:   "text-gray-600",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PartnerPerformanceCoach() {
  const [actioned, setActioned] = useState<Set<string>>(new Set());
  const [autoCheckIn, setAutoCheckIn] = useState(true);
  const [weeklyTips, setWeeklyTips] = useState(false);

  const markActioned = (id: string) =>
    setActioned((prev) => new Set([...prev, id]));

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#F8FAFC] p-6 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="w-6 h-6 text-teal-700" />
            Performance Coach
          </h1>
          <p className="text-gray-500 mt-1 text-sm">AI-powered insights for every partner</p>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "At-Risk Partners",    value: AT_RISK.length.toString(),  color: "#ef4444", icon: AlertTriangle },
            { label: "Avg Performance",     value: "72 / 100",                 color: "#34d399", icon: TrendingUp    },
            { label: "Coaching Actions Sent", value: "38 this week",           color: "#818cf8", icon: MessageSquare },
            { label: "Active Partners",     value: "157",                      color: "#2dd4bf", icon: Users         },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{k.label}</span>
                <k.icon className="w-4 h-4" style={{ color: k.color }} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{k.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* At-Risk Partners */}
          <div className="bg-white rounded-xl border border-red-500/30 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-red-500/5">
              <h2 className="text-gray-900 font-semibold text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                At-Risk Partners
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-600 font-semibold">
                {AT_RISK.length} flagged
              </span>
            </div>
            <div className="divide-y divide-gray-200/50">
              {AT_RISK.map((p) => {
                const ActionIcon = ACTION_ICONS[p.action];
                return (
                  <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                    {/* Risk score bubble */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm bg-red-500/15 text-red-600">
                      {p.riskScore}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{p.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{p.trade} · {p.issue}</div>
                    </div>
                    <button
                      onClick={() => markActioned(p.id)}
                      disabled={actioned.has(p.id)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                        actioned.has(p.id)
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : ACTION_COLORS[p.action]
                      }`}
                    >
                      <ActionIcon className="w-3 h-3" />
                      {actioned.has(p.id) ? "Sent" : p.action}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 font-semibold text-base mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              Performance Distribution
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={PERF_DIST} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="tier" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
                  labelStyle={{ color: "#f1f5f9", fontWeight: 600 }}
                  itemStyle={{ color: "#94a3b8" }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {PERF_DIST.map((entry) => (
                    <Cell key={entry.tier} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Top Performers Leaderboard */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-gray-900 font-semibold text-base flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-700" />
              Top Performers
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-gray-100">
            {TOP_PERFORMERS.map((p) => (
              <div key={p.rank} className="bg-white px-5 py-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    p.rank === 1 ? "bg-amber-500/20 text-amber-700" :
                    p.rank === 2 ? "bg-slate-400/20 text-gray-700" :
                    p.rank === 3 ? "bg-orange-400/20 text-orange-400" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {p.rank}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 truncate">{p.name}</span>
                </div>
                <div className="text-xs text-gray-500">{p.trade}</div>
                <div className="text-xs text-teal-700 font-medium">{p.metric}</div>
                <span
                  className="self-start text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: p.badgeColor + "22", color: p.badgeColor }}
                >
                  {p.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Coaching Tips Feed */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-gray-900 font-semibold text-base flex items-center gap-2">
              <Brain className="w-4 h-4 text-gray-600" />
              AI Coaching Tips
            </h2>
          </div>
          <div className="divide-y divide-gray-200/50">
            {COACH_TIPS.map((tip) => {
              const Icon = TIP_ICON_MAP[tip.icon];
              return (
                <div key={tip.id} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-100/20 transition-colors">
                  <div className={`mt-0.5 flex-shrink-0 ${TIP_ICON_COLOR[tip.icon]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 leading-relaxed">{tip.text}</p>
                    <span className="text-xs text-gray-500 mt-1 block">{tip.time}</span>
                  </div>
                  <button className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg font-semibold bg-teal-500/20 text-teal-700 hover:bg-teal-500/30 transition-colors whitespace-nowrap">
                    Take Action
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coaching Automations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 font-semibold text-base mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-700" />
            Coaching Automations
          </h2>
          <div className="space-y-4">
            {[
              {
                id: "autoCheckIn",
                label: "Auto-send check-in when inactive 14+ days",
                description: "Sends a personalized SMS + email to partners who haven't logged in or accepted a lead in 14 or more days.",
                value: autoCheckIn,
                toggle: () => setAutoCheckIn((v) => !v),
              },
              {
                id: "weeklyTips",
                label: "Send lead tips weekly to struggling partners",
                description: "Every Monday morning, AI generates 3 personalized tips for partners in the Struggling tier based on their recent activity.",
                value: weeklyTips,
                toggle: () => setWeeklyTips((v) => !v),
              },
            ].map((rule) => (
              <div key={rule.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200/50">
                <button onClick={rule.toggle} className="flex-shrink-0 mt-0.5">
                  {rule.value
                    ? <ToggleRight className="w-8 h-8 text-teal-700" />
                    : <ToggleLeft  className="w-8 h-8 text-gray-500" />
                  }
                </button>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{rule.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{rule.description}</div>
                </div>
                <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold ${
                  rule.value ? "bg-teal-500/20 text-teal-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {rule.value ? "Active" : "Off"}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
