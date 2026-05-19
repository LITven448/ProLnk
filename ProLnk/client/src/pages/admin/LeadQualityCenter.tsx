import React from 'react';
import type React from "react";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Target, TrendingUp, Clock, AlertTriangle,
  CheckCircle, XCircle, ChevronDown, Filter,
  Flag, BarChart2,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

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
  { trade: "HVAC",         high: 68, medium: 21, low: 11, total: 100, acceptRate: 84, avgResponseMin: 12 },
  { trade: "Plumbing",     high: 55, medium: 28, low: 17, total: 100, acceptRate: 76, avgResponseMin: 18 },
  { trade: "Electrical",   high: 61, medium: 25, low: 14, total: 100, acceptRate: 79, avgResponseMin: 15 },
  { trade: "Roofing",      high: 44, medium: 33, low: 23, total: 100, acceptRate: 68, avgResponseMin: 24 },
  { trade: "Painting",     high: 39, medium: 36, low: 25, total: 100, acceptRate: 61, avgResponseMin: 31 },
  { trade: "Landscaping",  high: 32, medium: 41, low: 27, total: 100, acceptRate: 57, avgResponseMin: 42 },
  { trade: "Carpentry",    high: 48, medium: 30, low: 22, total: 100, acceptRate: 72, avgResponseMin: 20 },
];

interface RejectionReason {
  reason: string;
  count: number;
  color: string;
}

const REJECTION_REASONS: RejectionReason[] = [
  { reason: "Outside service area",  count: 148, color: "#f59e0b" },
  { reason: "Budget too low",        count: 112, color: "#ef4444″ },
  { reason: "Too far (distance)",    count: 97,  color: "#8b5cf6″ },
  { reason: "Schedule conflict",     count: 74,  color: "#3b82f6″ },
  { reason: "Trade mismatch",        count: 53,  color: "#ec4899″ },
  { reason: "Already booked",        count: 38,  color: "#14b8a6″ },
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
  { id: "LQ-001″, homeowner: "J. Henderson", trade: "HVAC",       flag: "Duplicate submission (3×)",       severity: "high",   submitted: "2h ago" },
  { id: "LQ-002″, homeowner: "P. Okafor",    trade: "Plumbing",   flag: "Disposable email domain",         severity: "medium", submitted: "4h ago" },
  { id: "LQ-003″, homeowner: "K. Martinez",  trade: "Electrical", flag: "Address not verifiable",          severity: "high",   submitted: "6h ago" },
  { id: "LQ-004″, homeowner: "L. Choi",      trade: "Roofing",    flag: "Budget claim inconsistent",       severity: "medium", submitted: "8h ago" },
  { id: "LQ-005″, homeowner: "M. Brown",     trade: "Painting",   flag: "Phone number flagged—TCPA list",  severity: "high",   submitted: "12h ago" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const maxRejection = Math.max(...REJECTION_REASONS.map((r) => r.count));

// ─── Sub-components ───────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  iconColor: string;
}

function KpiCard({ label, value, sub, icon: Icon, iconColor }: KpiCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700″>
      <div className="flex items-center justify-between mb-3″>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400″>{label}</span>
        <Icon className="w-5 h-5″ style={{ color: iconColor }} />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400 mt-1″>{sub}</div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeadQualityCenter() {
  const [range, setRange] = useState<DateRange>("30d");

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] p-6 space-y-8″>

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4″>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
              <Target className="w-6 h-6 text-teal-400″ />
              Lead Quality Center
            </h1>
            <p className="text-slate-400 mt-1 text-sm">Acceptance rates, quality scoring, and flagged activity by trade</p>
          </div>
          <div className="flex items-center gap-2″>
            <Filter className="w-4 h-4 text-slate-400″ />
            <span className="text-sm text-slate-400″>Date range:</span>
            <div className="flex rounded-lg overflow-hidden border border-slate-700″>
              {(["7d", "30d", "90d"] as DateRange[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                    range === r ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700″
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
          <KpiCard label="Total Leads"      value="1,284″  sub="Last 30 days"           icon={Target}      iconColor="#2dd4bf" />
          <KpiCard label="Avg Acceptance"   value="71.0%"  sub="Across all trades"      icon={CheckCircle} iconColor="#34d399″ />
          <KpiCard label="Avg Response"     value="22 min" sub="Time to first contact"  icon={Clock}       iconColor="#818cf8″ />
          <KpiCard label="Flagged Leads"    value="37″     sub="Needs review"           icon={AlertTriangle} iconColor="#f59e0b" />
        </div>

        {/* Quality Breakdown by Trade */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700″>
            <h2 className="text-white font-semibold text-base flex items-center gap-2″>
              <BarChart2 className="w-4 h-4 text-teal-400″ />
              Lead Quality Breakdown by Trade
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3″>Trade</th>
                  <th className="text-center px-3 py-3″>High Quality</th>
                  <th className="text-center px-3 py-3″>Medium</th>
                  <th className="text-center px-3 py-3″>Low Quality</th>
                  <th className="text-center px-4 py-3″>Accept Rate</th>
                  <th className="text-right px-6 py-3″>Avg Response</th>
                </tr>
              </thead>
              <tbody>
                {TRADE_QUALITY.map((t) => (
                  <tr key={t.trade} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-white">{t.trade}</td>
                    <td className="px-3 py-3″>
                      <div className="flex items-center justify-center gap-1″>
                        <div className="h-1.5 rounded-full bg-emerald-500″ style={{ width: `${t.high * 0.7}px` }} />
                        <span className="text-emerald-400 text-xs font-semibold">{t.high}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3″>
                      <div className="flex items-center justify-center gap-1″>
                        <div className="h-1.5 rounded-full bg-amber-500″ style={{ width: `${t.medium * 0.7}px` }} />
                        <span className="text-amber-400 text-xs font-semibold">{t.medium}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3″>
                      <div className="flex items-center justify-center gap-1″>
                        <div className="h-1.5 rounded-full bg-red-500″ style={{ width: `${t.low * 0.7}px` }} />
                        <span className="text-red-400 text-xs font-semibold">{t.low}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-1″>
                        <div className="w-16 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                          <div className="h-full rounded-full bg-teal-500″ style={{ width: `${t.acceptRate}%` }} />
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

        <div className="grid lg:grid-cols-2 gap-6″>

          {/* Rejection Reasons */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700″>
              <h2 className="text-white font-semibold text-base flex items-center gap-2″>
                <XCircle className="w-4 h-4 text-red-400″ />
                Lead Rejection Reasons
              </h2>
            </div>
            <div className="p-6 space-y-4″>
              {REJECTION_REASONS.map((r) => (
                <div key={r.reason} className="space-y-1.5″>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300″>{r.reason}</span>
                    <span className="font-bold text-white">{r.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(r.count / maxRejection) * 100}%`,
                        background: r.color,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-2 text-xs text-slate-500 border-t border-slate-700 mt-4″>
                522 rejections total in selected period
              </div>
            </div>
          </div>

          {/* Flagged Leads */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-white font-semibold text-base flex items-center gap-2″>
                <Flag className="w-4 h-4 text-amber-400″ />
                Flagged Leads
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold">
                {FLAGGED_LEADS.length} active
              </span>
            </div>
            <div className="divide-y divide-slate-700/50″>
              {FLAGGED_LEADS.map((lead) => (
                <div key={lead.id} className="flex items-start gap-3 px-6 py-4 hover:bg-slate-700/30 transition-colors">
                  <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${lead.severity === "high" ? "bg-red-500" : "bg-amber-500"}`} />
                  <div className="flex-1 min-w-0″>
                    <div className="flex items-center gap-2″>
                      <span className="text-xs font-mono text-slate-500″>{lead.id}</span>
                      <span className="text-sm font-medium text-white">{lead.homeowner}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300″>{lead.trade}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5″>{lead.flag}</div>
                  </div>
                  <div className="text-xs text-slate-500 flex-shrink-0″>{lead.submitted}</div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-slate-700″>
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
