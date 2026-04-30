import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import {
  Send, Eye, PhoneCall, CheckCircle, DollarSign,
  TrendingUp, ArrowRight, Clock, Filter, ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Funnel Stage Config ------------------------------------------------------
const FUNNEL_STAGES = [
  { id: "sent",       label: "Referral Sent",    icon: Send,        color: "#6366f1", bg: "#EEF2FF" },
  { id: "viewed",     label: "Lead Viewed",      icon: Eye,         color: "#0891b2", bg: "#E0F2FE" },
  { id: "contacted",  label: "Partner Contacted", icon: PhoneCall,  color: "#d97706", bg: "#FEF3C7" },
  { id: "closed",     label: "Job Closed",       icon: CheckCircle, color: "#059669", bg: "#D1FAE5" },
  { id: "paid",       label: "Commission Paid",  icon: DollarSign,  color: "#7C3AED", bg: "#EDE9FE" },
];

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-700",
  viewed:    "bg-blue-100 text-blue-700",
  contacted: "bg-orange-100 text-orange-700",
  closed:    "bg-green-100 text-green-700",
  paid:      "bg-purple-100 text-purple-700",
  expired:   "bg-gray-100 text-gray-500",
  rejected:  "bg-red-100 text-red-700",
};

// --- Funnel Bar ---------------------------------------------------------------
type FunnelStages = { sent: number; viewed: number; contacted: number; closed: number; paid: number };
function FunnelBar({ stages, max }: { stages: FunnelStages; max: number }) {
  const values = [stages.sent, stages.viewed, stages.contacted, stages.closed, stages.paid];
  return (
    <div className="grid grid-cols-5 gap-2 items-end h-36">
      {FUNNEL_STAGES.map((stage, i) => {
        const val = values[i];
        const pct = max > 0 ? (val / max) * 100 : 0;
        const convRate = i > 0 ? ((val / values[i - 1]) * 100).toFixed(0) : "100";
        return (
          <div key={stage.id} className="flex flex-col items-center gap-1">
            <div className="text-xs font-bold text-gray-700">{val}</div>
            <div className="w-full relative flex items-end" style={{ height: "80px" }}>
              <div
                className="w-full rounded-t-lg transition-all duration-700"
                style={{ height: `${Math.max(pct, 8)}%`, backgroundColor: stage.color, opacity: 0.85 }}
              />
            </div>
            <div className="text-[10px] text-gray-400 text-center leading-tight">{stage.label}</div>
            {i > 0 && (
              <div className="text-[10px] font-semibold" style={{ color: stage.color }}>{convRate}%</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// --- Main Page ----------------------------------------------------------------
export default function ReferralFunnelTracker() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const { data: referrals, isLoading } = trpc.partners.getOutboundReferrals.useQuery();

  const filtered = (referrals ?? []).filter((r: any) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const funnelData = {
    sent:      (referrals ?? []).length,
    viewed:    (referrals ?? []).filter((r: any) => ["viewed","contacted","closed","paid"].includes(r.status)).length,
    contacted: (referrals ?? []).filter((r: any) => ["contacted","closed","paid"].includes(r.status)).length,
    closed:    (referrals ?? []).filter((r: any) => ["closed","paid"].includes(r.status)).length,
    paid:      (referrals ?? []).filter((r: any) => r.status === "paid").length,
  };

  const totalEarned = (referrals ?? [])
    .filter((r: any) => r.status === "paid")
    .reduce((sum: number, r: any) => sum + Number(r.commissionAmount ?? 0), 0);

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                 Dashboard
              </button>
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-heading font-bold text-gray-900">Referral Funnel</h1>
          </div>
          <div className="flex items-center gap-2">
            {(["7d","30d","90d"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === t ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Sent",    value: funnelData.sent,   icon: Send,        color: "#6366f1" },
            { label: "Closed",        value: funnelData.closed, icon: CheckCircle, color: "#059669" },
            { label: "Conversion",    value: funnelData.sent > 0 ? `${((funnelData.closed / funnelData.sent) * 100).toFixed(1)}%` : "0%", icon: TrendingUp, color: "#d97706" },
            { label: "Total Earned",  value: `$${totalEarned.toFixed(0)}`, icon: DollarSign, color: "#7C3AED" },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}18` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: kpi.color }} />
                  </div>
                  <span className="text-xs text-gray-500">{kpi.label}</span>
                </div>
                <div className="text-2xl font-heading font-bold text-gray-900">{kpi.value}</div>
              </div>
            );
          })}
        </div>

        {/* Funnel chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-heading font-bold text-gray-900 mb-4">Conversion Funnel</h2>
          <FunnelBar stages={funnelData} max={funnelData.sent || 1} />
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            {FUNNEL_STAGES.map((s, i) => (
              <div key={s.id} className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Filter + referral list */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-heading font-bold text-gray-900">Referral History</h2>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="viewed">Viewed</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
                <option value="paid">Paid</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Send className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No referrals yet. Start logging jobs to generate leads.</p>
              <Link href="/job/new">
                <button className="mt-4 px-5 py-2 text-sm font-semibold text-white rounded-lg" style={{ backgroundColor: "#0A1628" }}>
                  Log a Job
                </button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.slice(0, 20).map((r: any) => (
                <div key={r.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-sm truncate">{r.description ?? "Referral opportunity"}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "--"}
                    </div>
                  </div>
                  <Badge className={`text-xs ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-500"}`}>
                    {r.status}
                  </Badge>
                  {r.commissionAmount && Number(r.commissionAmount) > 0 && (
                    <div className="text-sm font-bold text-green-600 flex-shrink-0">
                      +${Number(r.commissionAmount).toFixed(0)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
