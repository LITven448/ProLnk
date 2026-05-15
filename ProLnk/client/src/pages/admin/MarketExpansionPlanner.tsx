import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { D, MetricCard, SectionHeader, DataTable } from "@/components/DashboardShared";
import {
  Map, TrendingUp, CheckCircle, XCircle, Clock, AlertCircle,
  DollarSign, Users, Home, Target, Globe, ChevronRight,
} from "lucide-react";

const MARKETS = [
  {
    name: "DFW Metro",
    status: "live",
    partners: 147,
    zips: 89,
    waitlist: 847,
    revenue: "$147K/mo",
    target: "Live",
    label: "Month 1 Live",
    color: "#00E676",
  },
  {
    name: "Houston",
    status: "planning",
    partners: 0,
    zips: 0,
    waitlist: 42,
    revenue: "$0",
    target: "Q3 2026",
    label: "Start recruiting",
    color: "#FFB300",
  },
  {
    name: "San Antonio",
    status: "planning",
    partners: 0,
    zips: 0,
    waitlist: 28,
    revenue: "$0",
    target: "Q4 2026",
    label: "Early interest",
    color: "#FFB300",
  },
  {
    name: "Austin",
    status: "interest",
    partners: 0,
    zips: 0,
    waitlist: 18,
    revenue: "$0",
    target: "Q1 2027",
    label: "Signed up",
    color: "#3B82F6",
  },
  {
    name: "Phoenix",
    status: "interest",
    partners: 0,
    zips: 0,
    waitlist: 12,
    revenue: "$0",
    target: "Q2 2027",
    label: "Signed up",
    color: "#3B82F6",
  },
];

const READINESS = [
  { item: "Partner recruitment", current: 42, target: 100, done: true },
  { item: "Homeowner waitlist", current: 0, target: 500, done: false },
  { item: "Legal compliance check", current: 1, target: 1, done: true },
  { item: "Support team", current: 0, target: 1, done: false },
  { item: "Marketing ready", current: 1, target: 1, done: null },
];

const TOP_METROS = [
  { rank: "1", metro: "Dallas–Fort Worth", score: "100", density: "High", storm: "High", gap: "Low", interest: "147 partners" },
  { rank: "2", metro: "Houston", score: "87", density: "High", storm: "High", gap: "Medium", interest: "42 partners" },
  { rank: "3", metro: "Austin", score: "82", density: "Medium", storm: "Medium", gap: "Medium", interest: "18 partners" },
  { rank: "4", metro: "Phoenix", score: "79", density: "High", storm: "Low", gap: "Low", interest: "12 partners" },
  { rank: "5", metro: "Atlanta", score: "76", density: "High", storm: "High", gap: "High", interest: "8 partners" },
  { rank: "6", metro: "Charlotte", score: "74", density: "Medium", storm: "High", gap: "High", interest: "5 partners" },
  { rank: "7", metro: "Nashville", score: "73", density: "Medium", storm: "Medium", gap: "High", interest: "4 partners" },
  { rank: "8", metro: "Denver", score: "71", density: "Medium", storm: "Medium", gap: "Medium", interest: "3 partners" },
  { rank: "9", metro: "Tampa", score: "68", density: "Medium", storm: "High", gap: "High", interest: "2 partners" },
  { rank: "10", metro: "Orlando", score: "65", density: "Medium", storm: "High", gap: "High", interest: "2 partners" },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "live") return <CheckCircle className="w-4 h-4" style={{ color: "#00E676" }} />;
  if (status === "planning") return <Clock className="w-4 h-4" style={{ color: "#FFB300" }} />;
  return <AlertCircle className="w-4 h-4" style={{ color: "#3B82F6" }} />;
}

function ReadinessRow({ item, current, target, done }: { item: string; current: number; target: number; done: boolean | null }) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  const statusColor = done === true ? "#00E676" : done === false ? "#FF4444" : "#FFB300";
  const statusIcon = done === true ? <CheckCircle className="w-4 h-4" /> : done === false ? <XCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />;
  return (
    <div className="flex items-center gap-4 py-3" style={{ borderBottom: `1px solid ${D.border}` }}>
      <div style={{ color: statusColor, flexShrink: 0 }}>{statusIcon}</div>
      <span className="flex-1 text-sm" style={{ color: D.text }}>{item}</span>
      <div className="flex items-center gap-3 w-48">
        <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: D.border }}>
          <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: statusColor }} />
        </div>
        <span className="text-xs w-16 text-right" style={{ color: D.muted }}>{current}/{target}</span>
      </div>
    </div>
  );
}

export default function MarketExpansionPlanner() {
  const [activeMarket, setActiveMarket] = useState(0);

  return (
    <AdminLayout>
      <div className="min-h-screen p-6 space-y-6" style={{ backgroundColor: D.bg, fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: D.gradCyan }}>
                <Globe className="w-5 h-5" style={{ color: D.cyan }} />
              </div>
              <h1 className="text-2xl font-black" style={{ color: D.text }}>Market Expansion Planner</h1>
            </div>
            <p className="text-sm ml-13" style={{ color: D.muted }}>Scaling from DFW to nationwide</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.muted }}>Revenue Model</p>
            <p className="text-sm font-bold mt-1" style={{ color: D.green }}>Each market = $147K/mo at 147 partners</p>
            <p className="text-xs mt-0.5" style={{ color: D.cyan }}>10 markets = $1.47M/mo</p>
          </div>
        </div>

        {/* Current Market KPIs */}
        <div>
          <SectionHeader title="DFW Metro — Current Market" subtitle="Month 1 Live" />
          <div className="grid grid-cols-4 gap-4">
            <MetricCard label="Active Partners" value="147" trend={12} color={D.cyan} icon={<Users className="w-4 h-4" />} sparkline={[80, 95, 110, 120, 135, 147]} />
            <MetricCard label="Homeowners Waitlisted" value="847" trend={8} color={D.green} icon={<Home className="w-4 h-4" />} sparkline={[400, 520, 630, 700, 780, 847]} />
            <MetricCard label="ZIP Codes Covered" value="89" color={D.amber} icon={<Map className="w-4 h-4" />} />
            <MetricCard label="Monthly Revenue" value="$147K" trend={18} color={D.purple} icon={<DollarSign className="w-4 h-4" />} sparkline={[60, 80, 100, 115, 130, 147]} />
          </div>
        </div>

        {/* Expansion Pipeline */}
        <div>
          <SectionHeader title="Expansion Pipeline" subtitle="Click a market to view readiness details" />
          <div className="grid grid-cols-5 gap-3">
            {MARKETS.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setActiveMarket(i)}
                className="text-left rounded-2xl p-4 transition-all"
                style={{
                  background: activeMarket === i ? `linear-gradient(135deg, ${m.color}18, ${m.color}30)` : D.card,
                  border: `1px solid ${activeMarket === i ? m.color : D.border}`,
                  outline: "none",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <StatusIcon status={m.status} />
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${m.color}20`, color: m.color }}>
                    {m.status === "live" ? "LIVE" : m.status === "planning" ? "PLANNING" : "INTEREST"}
                  </span>
                </div>
                <p className="font-bold text-sm mb-1" style={{ color: D.text }}>{m.name}</p>
                <p className="text-xs mb-3" style={{ color: D.muted }}>{m.label}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span style={{ color: D.muted }}>Waitlist</span>
                    <span style={{ color: m.color }}>{m.waitlist}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: D.muted }}>Target</span>
                    <span style={{ color: D.text }}>{m.target}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: D.muted }}>Revenue</span>
                    <span style={{ color: m.status === "live" ? D.green : D.dim }}>{m.revenue}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Readiness Checklist + Revenue Model */}
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-2xl p-5" style={{ background: D.card, border: `1px solid ${D.border}` }}>
            <SectionHeader
              title={`Readiness: ${MARKETS[activeMarket].name}`}
              subtitle="Requirements to launch next market"
            />
            <div>
              {READINESS.map((r) => (
                <ReadinessRow key={r.item} {...r} />
              ))}
            </div>
            <button
              className="mt-4 w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: D.cyan, color: "#000" }}
            >
              <Target className="w-4 h-4" />
              Launch Recruitment Campaign
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="rounded-2xl p-5" style={{ background: D.card, border: `1px solid ${D.border}` }}>
            <SectionHeader title="Revenue Projection" subtitle="Linear model based on DFW unit economics" />
            <div className="space-y-3">
              {[1, 3, 5, 10, 20].map((n) => {
                const rev = n * 147;
                const pct = Math.min(100, Math.round((rev / (20 * 147)) * 100));
                return (
                  <div key={n} className="flex items-center gap-3">
                    <span className="text-xs font-bold w-20" style={{ color: D.muted }}>{n} market{n > 1 ? "s" : ""}</span>
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: D.border }}>
                      <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${D.cyan}, ${D.purple})` }} />
                    </div>
                    <span className="text-sm font-bold w-20 text-right" style={{ color: D.green }}>${rev.toLocaleString()}K/mo</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${D.cyan}10, ${D.purple}10)`, border: `1px solid ${D.cyan}30` }}>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" style={{ color: D.cyan }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.cyan }}>Nationwide Target</span>
              </div>
              <p className="text-2xl font-black" style={{ color: D.text }}>$44.1M/mo</p>
              <p className="text-xs mt-0.5" style={{ color: D.muted }}>At 300 markets — top 300 US metros</p>
            </div>
          </div>
        </div>

        {/* Market Opportunity Table */}
        <div className="rounded-2xl p-5" style={{ background: D.card, border: `1px solid ${D.border}` }}>
          <SectionHeader
            title="Market Opportunity Scores"
            subtitle="Ranked by composite score: home density, storm frequency, competitor gaps, partner interest"
          />
          <DataTable
            accentCol="score"
            columns={[
              { key: "rank", label: "#", align: "center" },
              { key: "metro", label: "Metro Area" },
              { key: "score", label: "Score", align: "center" },
              { key: "density", label: "Home Density", align: "center" },
              { key: "storm", label: "Storm Freq", align: "center" },
              { key: "gap", label: "Competitor Gap", align: "center" },
              { key: "interest", label: "Partner Interest", align: "right" },
            ]}
            rows={TOP_METROS.map((m) => ({
              ...m,
              score: (
                <span className="font-black" style={{ color: m.rank === "1" ? D.green : m.score >= "80" ? D.cyan : D.amber }}>
                  {m.score}
                </span>
              ),
              density: (
                <span style={{ color: m.density === "High" ? D.green : m.density === "Medium" ? D.amber : D.muted }}>{m.density}</span>
              ),
              storm: (
                <span style={{ color: m.storm === "High" ? D.red : m.storm === "Medium" ? D.amber : D.muted }}>{m.storm}</span>
              ),
              gap: (
                <span style={{ color: m.gap === "High" ? D.green : m.gap === "Medium" ? D.amber : D.red }}>{m.gap}</span>
              ),
            }))}
          />
        </div>

      </div>
    </AdminLayout>
  );
}
