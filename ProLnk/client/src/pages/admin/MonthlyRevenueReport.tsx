import React from 'react';
import type React from "react";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  DollarSign, TrendingUp, TrendingDown, Download,
  Users, Briefcase, ArrowUpRight, ArrowDownRight,
  BarChart2, Star, Wrench,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CURRENT_MONTH = "May 2026";
const PRIOR_MONTH   = "Apr 2026";

interface MonthRow {
  month: string;
  mrr: number;
  gtv: number;
  netRevenue: number;
  networkPayouts: number;
  newPros: number;
}

const MOM_DATA: MonthRow[] = [
  { month: "Jan 2026", mrr: 14900,  gtv: 48200,  netRevenue: 13496,  networkPayouts: 5904,  newPros: 10 },
  { month: "Feb 2026", mrr: 23800,  gtv: 72100,  netRevenue: 20188,  networkPayouts: 8652,  newPros: 16 },
  { month: "Mar 2026", mrr: 43300,  gtv: 118400, netRevenue: 33152,  networkPayouts: 14208, newPros: 29 },
  { month: "Apr 2026", mrr: 74000,  gtv: 196300, netRevenue: 54964,  networkPayouts: 23556, newPros: 50 },
  { month: "May 2026", mrr: 118700, gtv: 298100, netRevenue: 83468,  networkPayouts: 35772, newPros: 83 },
];

interface TopPro {
  rank: number;
  name: string;
  trade: string;
  jobs: number;
  earnings: number;
}

const TOP_PROS: TopPro[] = [
  { rank: 1, name: "Marcus Delgado",   trade: "HVAC",        jobs: 31, earnings: 9840 },
  { rank: 2, name: "Tasha Williams",   trade: "Plumbing",    jobs: 27, earnings: 7920 },
  { rank: 3, name: "Jordan Kimura",    trade: "Electrical",  jobs: 24, earnings: 7140 },
  { rank: 4, name: "Rafael Santos",    trade: "Roofing",     jobs: 22, earnings: 6600 },
  { rank: 5, name: "Devon Price",      trade: "HVAC",        jobs: 20, earnings: 6240 },
  { rank: 6, name: "Alicia Moreno",    trade: "Plumbing",    jobs: 19, earnings: 5820 },
  { rank: 7, name: "Chris Okafor",     trade: "Electrical",  jobs: 17, earnings: 5100 },
  { rank: 8, name: "Priya Nair",       trade: "Painting",    jobs: 16, earnings: 4320 },
  { rank: 9, name: "Sam Boucher",      trade: "Carpentry",   jobs: 14, earnings: 3780 },
  { rank: 10, name: "Nina Kaplan",     trade: "Landscaping", jobs: 13, earnings: 3510 },
];

interface TradeRow {
  trade: string;
  jobs: number;
  volume: number;
  share: number;
}

const TOP_TRADES: TradeRow[] = [
  { trade: "HVAC",       jobs: 214, volume: 74900, share: 35 },
  { trade: "Plumbing",   jobs: 162, volume: 54200, share: 25 },
  { trade: "Electrical", jobs: 98,  volume: 32600, share: 15 },
  { trade: "Roofing",    jobs: 76,  volume: 28400, share: 13 },
  { trade: "Painting",   jobs: 54,  volume: 17600, share: 8  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const pct = (curr: number, prev: number) => {
  if (!prev) return 0;
  return Math.round(((curr - prev) / prev) * 100);
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  accentColor: string;
}

function KpiCard({ label, value, change, icon: Icon, accentColor }: KpiCardProps) {
  const positive = change >= 0;
  return (
    <div className="bg-white rounded-xl p-5 flex flex-col gap-3 border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center`} style={{ background: accentColor + "22" }}>
          <Icon className="w-4 h-4" style={{ color: accentColor }} />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className={`flex items-center gap-1 text-xs font-semibold ${positive ? "text-emerald-400" : "text-red-600"}`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {positive ? "+" : ""}{change}% vs {PRIOR_MONTH}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MonthlyRevenueReport() {
  const [exportLoading, setExportLoading] = useState(false);

  const curr = MOM_DATA[MOM_DATA.length - 1];
  const prev = MOM_DATA[MOM_DATA.length - 2];

  const handleExport = () => {
    setExportLoading(true);
    setTimeout(() => setExportLoading(false), 1200);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#F8FAFC] p-6 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-teal-700" />
              Monthly Revenue Report
            </h1>
            <p className="text-gray-500 mt-1 text-sm">{CURRENT_MONTH} — P&amp;L summary, top earners, and trade volume</p>
          </div>
          <button
            onClick={handleExport}
            disabled={exportLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-gray-900 text-sm font-semibold transition-colors disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            {exportLoading ? "Generating…" : "Export PDF"}
          </button>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="MRR (Subscriptions)" value={fmt(curr.mrr)}       change={pct(curr.mrr,         prev.mrr)}         icon={DollarSign} accentColor="#2dd4bf" />
          <KpiCard label="GTV (Job Pool)"       value={fmt(curr.gtv)}       change={pct(curr.gtv,         prev.gtv)}         icon={BarChart2}  accentColor="#818cf8" />
          <KpiCard label="Net Revenue (28%)"    value={fmt(curr.netRevenue)} change={pct(curr.netRevenue, prev.netRevenue)}  icon={TrendingUp} accentColor="#34d399" />
          <KpiCard label="Network Payouts"       value={fmt(curr.networkPayouts)} change={pct(curr.networkPayouts, prev.networkPayouts)} icon={Users} accentColor="#f59e0b" />
        </div>

        {/* MoM Comparison Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-gray-900 font-semibold text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              Month-over-Month Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3">Month</th>
                  <th className="text-right px-4 py-3">MRR</th>
                  <th className="text-right px-4 py-3">GTV</th>
                  <th className="text-right px-4 py-3">Net Revenue</th>
                  <th className="text-right px-4 py-3">Payouts</th>
                  <th className="text-right px-6 py-3">New Pros</th>
                </tr>
              </thead>
              <tbody>
                {[...MOM_DATA].reverse().map((row, i) => {
                  const isCurrent = row.month === CURRENT_MONTH;
                  return (
                    <tr
                      key={row.month}
                      className={`border-b border-gray-200/50 transition-colors ${isCurrent ? "bg-teal-500/5" : "hover:bg-gray-50"}`}
                    >
                      <td className="px-6 py-3 font-medium text-gray-900">
                        {row.month}
                        {isCurrent && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-700 font-semibold">Current</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">{fmt(row.mrr)}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{fmt(row.gtv)}</td>
                      <td className="px-4 py-3 text-right text-emerald-400 font-semibold">{fmt(row.netRevenue)}</td>
                      <td className="px-4 py-3 text-right text-amber-700">{fmt(row.networkPayouts)}</td>
                      <td className="px-6 py-3 text-right text-gray-700">+{row.newPros}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Top 10 Pros */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-gray-900 font-semibold text-base flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-700" />
                Top 10 Earning Pros — {CURRENT_MONTH}
              </h2>
            </div>
            <div className="divide-y divide-gray-200/50">
              {TOP_PROS.map((pro) => (
                <div key={pro.rank} className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${pro.rank <= 3 ? "bg-amber-500/20 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                    {pro.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{pro.name}</div>
                    <div className="text-xs text-gray-500">{pro.trade} · {pro.jobs} jobs</div>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">{fmt(pro.earnings)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Trades */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-gray-900 font-semibold text-base flex items-center gap-2">
                <Wrench className="w-4 h-4 text-teal-700" />
                Top 5 Trades by Volume — {CURRENT_MONTH}
              </h2>
            </div>
            <div className="p-6 space-y-5">
              {TOP_TRADES.map((t) => (
                <div key={t.trade} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{t.trade}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">{t.jobs} jobs</span>
                      <span className="font-bold text-teal-700">{fmt(t.volume)}</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all"
                      style={{ width: `${t.share}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">{t.share}% of total volume</div>
                </div>
              ))}
            </div>

            {/* ProLnk Margin breakdown */}
            <div className="mx-6 mb-6 p-4 rounded-lg bg-gray-100/50 border border-gray-300 text-sm space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Revenue Split — {CURRENT_MONTH}</div>
              {[
                { label: "Job Pool (GTV)",         value: fmt(curr.gtv),            color: "text-gray-700" },
                { label: "ProLnk Net (28%)",        value: fmt(curr.netRevenue),     color: "text-emerald-400" },
                { label: "Network Payouts (12%)",   value: fmt(curr.networkPayouts), color: "text-amber-700" },
                { label: "Pros Keep (60%)",         value: fmt(Math.round(curr.gtv * 0.60)), color: "text-blue-400" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-gray-500">{r.label}</span>
                  <span className={`font-semibold ${r.color}`}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
