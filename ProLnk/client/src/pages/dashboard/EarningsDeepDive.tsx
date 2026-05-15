import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  DollarSign, TrendingUp, Star, ChevronDown, ChevronUp,
  Calendar, Award, Users, ArrowUpRight,
} from "lucide-react";
import { DCard, MetricCard, SectionHeader, DataTable, D } from "@/components/DashboardShared";

const PERIODS = ["This Week", "This Month", "Last 3 Months", "This Year"] as const;
type Period = (typeof PERIODS)[number];

const WATERFALL_DATA = [
  { name: "Base Jobs", value: 3210, fill: "#00D4FF" },
  { name: "Network Overrides", value: 847, fill: "#A855F7" },
  { name: "Subscriptions", value: 542, fill: "#00E676" },
  { name: "Bonuses", value: 248, fill: "#FFB300" },
];

const TRADE_DATA = [
  { name: "HVAC", value: 54, fill: "#00D4FF" },
  { name: "Roofing", value: 28, fill: "#A855F7" },
  { name: "Plumbing", value: 18, fill: "#00E676" },
];

const DOW_DATA = [
  { day: "Mon", avg: 412 },
  { day: "Tue", avg: 847 },
  { day: "Wed", avg: 623 },
  { day: "Thu", avg: 591 },
  { day: "Fri", avg: 738 },
  { day: "Sat", avg: 284 },
  { day: "Sun", avg: 152 },
];

const JOB_LEDGER = [
  { job: "#4821", date: "May 13", homeowner: "Sarah M. — Austin", service: "HVAC", gross: "$380", commission: "$266", net: "$266" },
  { job: "#4819", date: "May 12", homeowner: "James T. — Houston", service: "Roofing", gross: "$520", commission: "$364", net: "$364" },
  { job: "#4817", date: "May 11", homeowner: "Linda K. — Dallas", service: "Plumbing", gross: "$240", commission: "$168", net: "$168" },
  { job: "#4815", date: "May 10", homeowner: "Chris R. — Austin", service: "HVAC", gross: "$490", commission: "$343", net: "$343" },
  { job: "#4813", date: "May 9", homeowner: "Maria G. — San Antonio", service: "HVAC", gross: "$310", commission: "$217", net: "$217" },
  { job: "#4811", date: "May 8", homeowner: "Tom B. — Plano", service: "Roofing", gross: "$680", commission: "$476", net: "$476" },
  { job: "#4809", date: "May 7", homeowner: "Anna S. — Dallas", service: "Plumbing", gross: "$195", commission: "$137", net: "$137" },
  { job: "#4807", date: "May 6", homeowner: "Kevin P. — Austin", service: "HVAC", gross: "$420", commission: "$294", net: "$294" },
  { job: "#4805", date: "May 5", homeowner: "Diane W. — Frisco", service: "Roofing", gross: "$375", commission: "$263", net: "$263" },
  { job: "#4803", date: "May 4", homeowner: "Robert L. — Houston", service: "HVAC", gross: "$560", commission: "$392", net: "$392" },
  { job: "#4801", date: "May 3", homeowner: "Susan H. — McKinney", service: "Plumbing", gross: "$210", commission: "$147", net: "$147" },
  { job: "#4799", date: "May 2", homeowner: "Paul M. — Austin", service: "HVAC", gross: "$445", commission: "$312", net: "$312" },
  { job: "#4797", date: "May 1", homeowner: "Kathy N. — Garland", service: "Roofing", gross: "$290", commission: "$203", net: "$203" },
  { job: "#4795", date: "Apr 30", homeowner: "Mark D. — Irving", service: "HVAC", gross: "$505", commission: "$354", net: "$354" },
  { job: "#4793", date: "Apr 29", homeowner: "Nancy F. — Austin", service: "Plumbing", gross: "$175", commission: "$123", net: "$123" },
];

const NETWORK_RECRUITS = [
  { name: "Jake Morrison", level: "L1", jobs: 12, yourOverride: "$84.20" },
  { name: "Carla Reyes", level: "L1", jobs: 9, yourOverride: "$63.10" },
  { name: "Devon Hall", level: "L1", jobs: 7, yourOverride: "$49.80" },
  { name: "Maria Santos", level: "L2", jobs: 15, yourOverride: "$26.40" },
  { name: "Tyrone Banks", level: "L2", jobs: 11, yourOverride: "$19.30" },
];

const TOTAL_BY_PERIOD: Record<Period, { amount: string; delta: string; positive: boolean }> = {
  "This Week": { amount: "$1,247", delta: "+8.3%", positive: true },
  "This Month": { amount: "$4,847", delta: "+12.4%", positive: true },
  "Last 3 Months": { amount: "$14,210", delta: "+6.1%", positive: true },
  "This Year": { amount: "$38,540", delta: "+22.8%", positive: true },
};

export default function EarningsDeepDive() {
  const [period, setPeriod] = useState<Period>("This Month");
  const [networkExpanded, setNetworkExpanded] = useState(false);

  const { amount, delta, positive } = TOTAL_BY_PERIOD[period];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "24px", fontFamily: "'Inter', system-ui, sans-serif", color: D.text }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: D.text, margin: 0 }}>Earnings Deep Dive</h1>
        <p style={{ color: D.muted, marginTop: 6, fontSize: 14 }}>Every dollar, every source, every job</p>
      </div>

      {/* Period Selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: period === p ? `1px solid ${D.cyan}` : `1px solid ${D.border}`,
              background: period === p ? `${D.cyan}22` : D.card,
              color: period === p ? D.cyan : D.muted,
              fontSize: 13,
              fontWeight: period === p ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Total Earnings Card */}
      <DCard style={{ marginBottom: 24, padding: 28, display: "flex", alignItems: "center", gap: 24, background: `linear-gradient(135deg, #0A1628, #0D1F3C)`, border: `1px solid ${D.cyan}44` }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: D.gradCyan, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <DollarSign size={26} color={D.cyan} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: D.muted, fontSize: 13, margin: 0, marginBottom: 4 }}>Total Earnings — {period}</p>
          <p style={{ fontSize: 42, fontWeight: 800, color: D.cyan, margin: 0, lineHeight: 1 }}>{amount}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end", marginBottom: 4 }}>
            <ArrowUpRight size={16} color={positive ? D.green : D.red} />
            <span style={{ fontSize: 22, fontWeight: 700, color: positive ? D.green : D.red }}>{delta}</span>
          </div>
          <p style={{ color: D.muted, fontSize: 12, margin: 0 }}>vs previous period</p>
        </div>
      </DCard>

      {/* Record Day Banner */}
      <DCard style={{ marginBottom: 24, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, background: `${D.amber}11`, border: `1px solid ${D.amber}33` }}>
        <Award size={18} color={D.amber} />
        <span style={{ color: D.amber, fontSize: 13, fontWeight: 500 }}>
          Your best single day: <strong>April 3 — $1,247 from 3 jobs</strong>
        </span>
      </DCard>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Waterfall / Stacked Bar */}
        <DCard style={{ padding: 20 }}>
          <SectionHeader title="Earnings by Source" subtitle="How your income stacks up" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WATERFALL_DATA} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={D.border} />
              <XAxis dataKey="name" tick={{ fill: D.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: D.muted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text, fontSize: 12 }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Amount"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {WATERFALL_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </DCard>

        {/* By Trade Donut */}
        <DCard style={{ padding: 20 }}>
          <SectionHeader title="Earnings by Trade" subtitle="Service type breakdown" />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ResponsiveContainer width="60%" height={220}>
              <PieChart>
                <Pie data={TRADE_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                  {TRADE_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text, fontSize: 12 }}
                  formatter={(v: number) => [`${v}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {TRADE_DATA.map((t) => (
                <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.fill, flexShrink: 0 }} />
                  <span style={{ color: D.muted, fontSize: 13, flex: 1 }}>{t.name}</span>
                  <span style={{ color: D.text, fontSize: 13, fontWeight: 600 }}>{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </DCard>
      </div>

      {/* Day of Week */}
      <DCard style={{ padding: 20, marginBottom: 24 }}>
        <SectionHeader title="Earnings by Day of Week" subtitle="Tuesday is your best day ($847 avg)" />
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={DOW_DATA} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={D.border} />
            <XAxis dataKey="day" tick={{ fill: D.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: D.muted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text, fontSize: 12 }}
              formatter={(v: number) => [`$${v}`, "Avg earnings"]}
            />
            <Bar dataKey="avg" radius={[4, 4, 0, 0]}>
              {DOW_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.day === "Tue" ? D.cyan : `${D.cyan}66`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </DCard>

      {/* Job-by-Job Ledger */}
      <DCard style={{ padding: 20, marginBottom: 24 }}>
        <SectionHeader title="Job Ledger" subtitle="Last 15 completed jobs" />
        <DataTable
          columns={[
            { key: "job", label: "Job #" },
            { key: "date", label: "Date" },
            { key: "homeowner", label: "Homeowner" },
            { key: "service", label: "Service" },
            { key: "gross", label: "Gross" },
            { key: "commission", label: "Commission" },
            { key: "net", label: "Net" },
          ]}
          rows={JOB_LEDGER}
          accentCol="net"
        />
      </DCard>

      {/* Network Cascade Detail */}
      <DCard style={{ padding: 20, marginBottom: 24 }}>
        <button
          onClick={() => setNetworkExpanded(!networkExpanded)}
          style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div>
            <p style={{ color: D.text, fontWeight: 600, fontSize: 15, margin: 0, textAlign: "left" }}>Network Cascade Detail</p>
            <p style={{ color: D.muted, fontSize: 13, margin: "4px 0 0", textAlign: "left" }}>Your recruits' contributions this month</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: D.purple, fontSize: 14, fontWeight: 600 }}>$242.80 total</span>
            {networkExpanded ? <ChevronUp size={18} color={D.muted} /> : <ChevronDown size={18} color={D.muted} />}
          </div>
        </button>

        {networkExpanded && (
          <div style={{ marginTop: 16, borderTop: `1px solid ${D.border}`, paddingTop: 16 }}>
            {NETWORK_RECRUITS.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < NETWORK_RECRUITS.length - 1 ? `1px solid ${D.border}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: r.level === "L1" ? `${D.cyan}22` : `${D.purple}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Users size={15} color={r.level === "L1" ? D.cyan : D.purple} />
                  </div>
                  <div>
                    <p style={{ color: D.text, fontSize: 13, fontWeight: 500, margin: 0 }}>{r.name}</p>
                    <p style={{ color: D.muted, fontSize: 12, margin: 0 }}>{r.level} Recruit · {r.jobs} jobs</p>
                  </div>
                </div>
                <span style={{ color: r.level === "L1" ? D.cyan : D.purple, fontWeight: 700, fontSize: 14 }}>{r.yourOverride}</span>
              </div>
            ))}
          </div>
        )}
      </DCard>
    </div>
  );
}
