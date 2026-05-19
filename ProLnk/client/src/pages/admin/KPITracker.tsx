import React from 'react';
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  Target, TrendingUp, TrendingDown, AlertTriangle, DollarSign,
  Users, Zap, Server,
} from "lucide-react";

type KPI = {
  name: string;
  current: string | number;
  target: string | number;
  currentRaw: number;
  targetRaw: number;
  unit: string;
  trend: number;
  invertAlert?: boolean;
};

type Tab = "revenue" | "partners" | "leads" | "platform";

const REVENUE_KPIS: KPI[] = [
  { name: "MRR", current: "$34K", target: "$50K", currentRaw: 34000, targetRaw: 50000, unit: "$", trend: 8.2 },
  { name: "ARR", current: "$408K", target: "$600K", currentRaw: 408000, targetRaw: 600000, unit: "$", trend: 8.2 },
  { name: "Revenue Growth", current: "18%", target: "25%", currentRaw: 18, targetRaw: 25, unit: "%", trend: 2.1 },
  { name: "Avg Commission", current: "$312″, target: "$400", currentRaw: 312, targetRaw: 400, unit: "$", trend: 5.4 },
  { name: "Churn Rate", current: "2.1%", target: "1%", currentRaw: 2.1, targetRaw: 1, unit: "%", trend: 0.3, invertAlert: true },
  { name: "Gross Margin", current: "33%", target: "40%", currentRaw: 33, targetRaw: 40, unit: "%", trend: -1.2 },
];

const PARTNERS_KPIS: KPI[] = [
  { name: "Active Partners", current: "147″, target: "200", currentRaw: 147, targetRaw: 200, unit: "", trend: 9.5 },
  { name: "New This Month", current: "14″, target: "20", currentRaw: 14, targetRaw: 20, unit: "", trend: 16.7 },
  { name: "Partner Retention", current: "94%", target: "95%", currentRaw: 94, targetRaw: 95, unit: "%", trend: 0.5 },
  { name: "Avg Tier Score", current: "3.2″, target: "4.0", currentRaw: 3.2, targetRaw: 4.0, unit: "", trend: 3.2 },
  { name: "Network Depth", current: "2.1″, target: "3.0", currentRaw: 2.1, targetRaw: 3.0, unit: "", trend: 5.0 },
];

const LEADS_KPIS: KPI[] = [
  { name: "Monthly Leads", current: "214″, target: "300", currentRaw: 214, targetRaw: 300, unit: "", trend: 12.1 },
  { name: "Lead Quality Score", current: "78″, target: "90", currentRaw: 78, targetRaw: 90, unit: "", trend: 4.0 },
  { name: "Photo AI Accuracy", current: "97.8%", target: "99%", currentRaw: 97.8, targetRaw: 99, unit: "%", trend: 0.3 },
  { name: "Lead-to-Job Rate", current: "68%", target: "75%", currentRaw: 68, targetRaw: 75, unit: "%", trend: 2.9 },
];

const PLATFORM_KPIS: KPI[] = [
  { name: "Uptime", current: "99.97%", target: "99.9%", currentRaw: 99.97, targetRaw: 99.9, unit: "%", trend: 0.02 },
  { name: "API Latency", current: "42ms", target: "<100ms", currentRaw: 42, targetRaw: 100, unit: "ms", trend: -8.7, invertAlert: true },
  { name: "Build Success", current: "98%", target: "100%", currentRaw: 98, targetRaw: 100, unit: "%", trend: 1.0 },
  { name: "Support CSAT", current: "4.8″, target: "5.0", currentRaw: 4.8, targetRaw: 5.0, unit: "", trend: 0.4 },
];

const TREND_DATA = [
  { month: "Dec", MRR: 22, Partners: 98, Leads: 142 },
  { month: "Jan", MRR: 26, Partners: 110, Leads: 161 },
  { month: "Feb", MRR: 29, Partners: 122, Leads: 178 },
  { month: "Mar", MRR: 31, Partners: 133, Leads: 190 },
  { month: "Apr", MRR: 33, Partners: 141, Leads: 205 },
  { month: "May", MRR: 34, Partners: 147, Leads: 214 },
];

const ALERT_KPIS = new Set(["Churn Rate", "Gross Margin"]);

const TAB_CONFIG: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "partners", label: "Partners", icon: Users },
  { id: "leads", label: "Leads", icon: Zap },
  { id: "platform", label: "Platform", icon: Server },
];

function pct(current: number, target: number, invert?: boolean): number {
  if (invert) return Math.min(100, Math.round((target / current) * 100));
  return Math.min(100, Math.round((current / target) * 100));
}

function isOnTarget(kpi: KPI): boolean {
  if (kpi.invertAlert) return kpi.currentRaw <= kpi.targetRaw;
  return kpi.currentRaw >= kpi.targetRaw;
}

function KPICard({ kpi }: { kpi: KPI }) {
  const alerted = ALERT_KPIS.has(kpi.name);
  const onTarget = isOnTarget(kpi);
  const progress = pct(kpi.currentRaw, kpi.targetRaw, kpi.invertAlert);

  return (
    <div
      className={`rounded-xl border p-4 ${
        alerted
          ? "bg-red-950/30 border-red-700/50″
          : "bg-slate-800/60 border-slate-700″
      }`}
    >
      <div className="flex items-start justify-between mb-3″>
        <p className="text-sm text-slate-400″>{kpi.name}</p>
        {alerted && <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0″ />}
        {!alerted && onTarget && <span className="text-xs text-green-400 font-medium">On target</span>}
      </div>
      <p className={`text-2xl font-black mb-1 ${alerted ? "text-red-300" : "text-white"}`}>
        {kpi.current}
      </p>
      <p className="text-xs text-slate-500 mb-3″>Target: {kpi.target}</p>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-700 rounded-full mb-3″>
        <div
          className={`h-1.5 rounded-full ${alerted ? "bg-red-500" : progress >= 90 ? "bg-green-500" : progress >= 70 ? "bg-teal-500" : "bg-amber-500"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${alerted ? "text-red-400" : "text-slate-400"}`}>
          {progress}% to goal
        </span>
        <span
          className={`flex items-center gap-0.5 text-xs font-medium ${
            kpi.trend > 0 ? "text-green-400″ : "text-red-400"
          }`}
        >
          {kpi.trend > 0 ? (
            <TrendingUp className="w-3 h-3″ />
          ) : (
            <TrendingDown className="w-3 h-3″ />
          )}
          {kpi.trend > 0 ? "+" : ""}
          {kpi.trend}% vs last mo
        </span>
      </div>
    </div>
  );
}

const KPI_MAP: Record<Tab, KPI[]> = {
  revenue: REVENUE_KPIS,
  partners: PARTNERS_KPIS,
  leads: LEADS_KPIS,
  platform: PLATFORM_KPIS,
};

export default function KPITracker() {
  const [tab, setTab] = useState<Tab>("revenue");
  const kpis = KPI_MAP[tab];

  return (
    <AdminLayout>
      <div className="space-y-6″>
        {/* Header */}
        <div className="flex items-center gap-3″>
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-teal-400″ />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">KPI Tracker</h1>
            <p className="text-sm text-slate-400″>Track key metrics against targets across all business areas</p>
          </div>
        </div>

        {/* Alert banner */}
        <div className="flex items-center gap-3 bg-red-950/40 border border-red-700/50 rounded-xl px-4 py-3″>
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0″ />
          <p className="text-sm text-red-300″>
            <span className="font-bold">2 KPIs below target:</span> Churn Rate (2.1% vs 1% goal) and Gross Margin (33% vs 40% goal) need attention.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {TAB_CONFIG.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === id
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40″
                  : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500″
              }`}
            >
              <Icon className="w-4 h-4″ />
              {label}
            </button>
          ))}
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4″>
          {kpis.map((kpi) => (
            <KPICard key={kpi.name} kpi={kpi} />
          ))}
        </div>

        {/* Trend Chart */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5″>
          <p className="text-sm font-semibold text-white mb-4″>Top KPI Trends — 6 Months</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={TREND_DATA} barGap={4}>
              <XAxis dataKey="month" tick={{ fill: "#94a3b8″, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8″, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155″, borderRadius: "8px" }}
                labelStyle={{ color: "#f1f5f9″ }}
              />
              <Bar dataKey="MRR" name="MRR ($K)" fill="#00B5B8″ radius={[4, 4, 0, 0]} />
              <Bar dataKey="Partners" name="Partners" fill="#8B5CF6″ radius={[4, 4, 0, 0]} />
              <Bar dataKey="Leads" name="Monthly Leads" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-3″>
            {[
              { color: "#00B5B8″, label: "MRR ($K)" },
              { color: "#8B5CF6″, label: "Partners" },
              { color: "#F59E0B", label: "Monthly Leads" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5″>
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-xs text-slate-400″>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
