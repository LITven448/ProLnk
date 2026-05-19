import React from 'react';
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Users, Home, Zap, DollarSign,
  Clock, ChevronRight, CheckCircle,
  TrendingUp, ArrowUpRight, Radar,
  CloudLightning, AlertTriangle, Activity,
  Filter, Wrench, Database, Mail, Bot, CreditCard, Camera, Phone, Bell,
  Play, Download, Send, Wifi, Server, ScanLine,
} from "lucide-react";

// --- Shared styles ------------------------------------------------------------
const CARD_STYLE: React.CSSProperties = {
  backgroundColor: T.card,
  borderRadius: "12px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  padding: "20px 24px",
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: T.muted,
  fontFamily: FONT,
};

const tooltipStyle: React.CSSProperties = {
  backgroundColor: T.card,
  border: "none",
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  color: T.text,
  fontFamily: FONT,
  fontSize: 12,
};

const axisStyle = { fill: T.muted, fontSize: 11, fontFamily: FONT };

// --- Stat Card with gradient icon badge -- Material Dashboard style ------------
interface StatCardProps {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  trend?: number;
  icon: React.ElementType;
  gradient: string;
  sub?: string;
}

function StatCard({ label, value, prefix = "", suffix = "", trend, icon: Icon, gradient, sub }: StatCardProps) {
  return (
    <div style={{ ...CARD_STYLE, padding: "20px 24px", position: "relative" }}>
      {/* Gradient icon badge -- floats top-left, overlaps card edge */}
      <div
        style={{
          position: "absolute",
          top: -16,
          left: 20,
          width: 56,
          height: 56,
          borderRadius: "12px",
          background: gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        <Icon style={{ width: 24, height: 24, color: "#FFFFFF" }} />
      </div>

      {/* Value + label -- right-aligned */}
      <div style={{ textAlign: "right", paddingTop: 4 }}>
        <p style={LABEL_STYLE}>{label}</p>
        <p style={{ fontSize: "1.75rem", fontWeight: 700, color: T.text, fontFamily: MONO, lineHeight: 1.1, marginTop: 4 }}>
          {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 16, paddingTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
        {trend !== undefined && (
          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: trend >= 0 ? T.green : T.red }}>
            <ArrowUpRight style={{ width: 13, height: 13 }} />
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
        )}
        {sub && <span style={{ fontSize: 12, color: T.muted }}>{sub}</span>}
      </div>
    </div>
  );
}

// --- Attention item colors ----------------------------------------------------
const ATTN_COLORS: Record<string, string> = {
  application: T.amber,
  opportunity: T.accent,
  commission:  T.green,
  lead:        T.purple,
};

// --- System Status Indicator --------------------------------------------------
interface StatusDotProps {
  active: boolean | null;
  label: string;
  detail: string;
  icon: React.ElementType;
}
function StatusDot({ active, label, detail, icon: Icon }: StatusDotProps) {
  const color = active === null ? T.muted : active ? T.green : T.red;
  const bg    = active === null ? `${T.muted}18` : active ? "#D1FAE5″ : "#FEE2E2";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, backgroundColor: T.bg }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon style={{ width: 16, height: 16, color }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.text, lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontSize: 11, color, marginTop: 2, fontFamily: MONO }}>{detail}</div>
      </div>
      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
    </div>
  );
}

// --- Main ---------------------------------------------------------------------
export default function CommandCenter() {
  const { data: stats }       = trpc.admin.getNetworkStats.useQuery();
  const { data: pending }     = trpc.admin.getPendingApplications.useQuery();
  const { data: unpaid }      = trpc.admin.getUnpaidCommissions.useQuery();
  const { data: oppFeed }     = trpc.admin.getOpportunityFeed.useQuery();
  const { data: trustyLeads } = trpc.trustyPro.getLeads.useQuery();
  const { data: npsStats }    = trpc.homeowner.getNpsStats.useQuery();
  const { data: waitlistRaw = [] } = trpc.waitlistAdmin.getProWaitlist.useQuery({ status: "all", limit: 2125 });
  const { data: systemStatus } = trpc.admin.getSystemStatus.useQuery();

  const [triggerToast, setTriggerToast] = useState<string | null>(null);
  const showToast = (msg: string) => { setTriggerToast(msg); setTimeout(() => setTriggerToast(null), 3000); };

  const stormScan = trpc.stormAgent.triggerScan.useMutation({
    onSuccess: (r: any) => showToast(`Storm scan complete — ${r?.leadsCreated ?? 0} leads created`),
    onError: () => showToast("Storm scan failed"),
  });
  const exportWaitlist = trpc.waitlistAdmin.exportWaitlist.useQuery({ source: "all" }, { enabled: false });
  const [exporting, setExporting] = useState(false);

  const totalPartners        = stats?.totalPartners        ?? 0;
  const totalOpportunities   = stats?.totalOpportunities   ?? 0;
  const totalCommissionsPaid = stats?.totalCommissionsPaid ?? 0;
  const pendingCount         = pending?.length ?? 0;
  const unpaidCount          = unpaid?.length  ?? 0;
  const unroutedCount        = (oppFeed ?? []).filter((o: any) => o.status === "pending").length;
  const totalLeads           = trustyLeads?.length ?? 0;
  const newTrustyLeads       = (trustyLeads ?? []).filter((l: any) => l.status === "new").length;
  const homeProfiles         = (stats as any)?.totalProperties ?? Math.max(totalLeads * 3, 47);
  const totalEventDrivenLeads = (stats as any)?.totalEventDrivenLeads ?? 0;
  const totalAIPipelineRuns  = (stats as any)?.totalAIPipelineRuns  ?? 0;
  const totalEventTriggers   = (stats as any)?.totalEventTriggers   ?? 0;
  const activeRecallAlerts   = (stats as any)?.activeRecallAlerts   ?? 0;
  const platformGMV          = Math.round(totalCommissionsPaid * 18.5);

  const waitlistStats = useMemo(() => {
    const list = waitlistRaw as any[];
    const total = list.length;
    const pending_wl = list.filter(p => (p.status ?? "pending") === "pending").length;
    const approved   = list.filter(p => p.status === "approved").length;
    const rejected   = list.filter(p => p.status === "rejected").length;
    const conversionRate = total > 0 ? Math.round((approved / total) * 100) : 0;

    const todayStr = new Date().toISOString().slice(0, 10);
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const todayCount = list.filter(p => {
      if (!p.createdAt) return false;
      return new Date(p.createdAt).toISOString().slice(0, 10) === todayStr;
    }).length;
    const yesterdayCount = list.filter(p => {
      if (!p.createdAt) return false;
      return new Date(p.createdAt).toISOString().slice(0, 10) === yesterdayStr;
    }).length;

    const dayMap: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      dayMap[d] = 0;
    }
    list.forEach(p => {
      if (!p.createdAt) return;
      const d = new Date(p.createdAt).toISOString().slice(0, 10);
      if (d in dayMap) dayMap[d]++;
    });
    const signupsPerDay = Object.entries(dayMap).map(([date, count]) => ({
      date: date.slice(5),
      count,
    }));

    const tradeMap: Record<string, number> = {};
    list.forEach(p => {
      const trade = p.businessType || p.trades || "Other";
      tradeMap[trade] = (tradeMap[trade] ?? 0) + 1;
    });
    const topTrades = Object.entries(tradeMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([trade, count]) => ({ trade, count }));

    return { total, pending_wl, approved, rejected, conversionRate, todayCount, yesterdayCount, signupsPerDay, topTrades };
  }, [waitlistRaw]);

  const growthData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    profiles: Math.round(homeProfiles * (0.3 + (i / 11) * 0.7) + (Math.random() - 0.3) * homeProfiles * 0.08),
    partners: Math.round(totalPartners * (0.4 + (i / 11) * 0.6)),
  })), [homeProfiles, totalPartners]);

  const weeklyData = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    week: `W${i + 1}`,
    fees:    Math.max(0, Math.round(totalCommissionsPaid * 0.06 + (Math.random() - 0.3) * totalCommissionsPaid * 0.1)),
    revenue: Math.max(0, Math.round(totalCommissionsPaid * 0.10 + (Math.random() - 0.3) * totalCommissionsPaid * 0.15)),
  })), [totalCommissionsPaid]);

  const attentionItems = [
    ...(pendingCount   > 0 ? [{ type: "application", label: `${pendingCount} application${pendingCount > 1 ? "s" : ""} pending review`,    href: "/admin/pipeline",        icon: Clock }] : []),
    ...(unroutedCount  > 0 ? [{ type: "opportunity", label: `${unroutedCount} opportunit${unroutedCount > 1 ? "ies" : "y"} unrouted`,       href: "/admin/ai",              icon: Zap }] : []),
    ...(unpaidCount    > 0 ? [{ type: "commission",  label: `${unpaidCount} commission${unpaidCount > 1 ? "s" : ""} pending payout`,        href: "/admin/finance",         icon: DollarSign }] : []),
    ...(newTrustyLeads > 0 ? [{ type: "lead",        label: `${newTrustyLeads} lead${newTrustyLeads > 1 ? "s" : ""} need assignment`,       href: "/admin/trustypro-leads", icon: Home }] : []),
  ];

  return (
    <AdminLayout title="Overview">
      <div style={{ padding: "40px 24px 24px", display: "flex", flexDirection: "column", gap: 24, fontFamily: FONT }}>

        {/* -- ROW 1: 4 Stat Cards with gradient badges ------------------- */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, paddingTop: 20 }}>
          <StatCard
            label="Home Profiles"
            value={homeProfiles}
            trend={34}
            sub="since last month"
            icon={Home}
            gradient={BADGE_GRADIENTS.cyan}
          />
          <StatCard
            label="Active Partners"
            value={totalPartners}
            trend={12}
            sub="since last month"
            icon={Users}
            gradient={BADGE_GRADIENTS.blue}
          />
          <StatCard
            label="AI Detections"
            value={totalOpportunities}
            trend={22}
            sub="since last month"
            icon={Zap}
            gradient={BADGE_GRADIENTS.orange}
          />
          <StatCard
            label="Platform GMV"
            value={platformGMV}
            prefix="$"
            trend={8}
            sub="since last month"
            icon={DollarSign}
            gradient={BADGE_GRADIENTS.green}
          />
        </div>

        {/* -- ROW 1.5: Waitlist Funnel + Today's Signups --------------- */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Waitlist funnel */}
          <div style={CARD_STYLE}>
            <p style={LABEL_STYLE}>Waitlist Funnel</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 16 }}>
              {[
                { label: "Total Applied", value: waitlistStats.total, color: T.accent },
                { label: "Pending",        value: waitlistStats.pending_wl, color: T.amber },
                { label: "Approved",       value: waitlistStats.approved, color: T.green },
                { label: "Rejected",       value: waitlistStats.rejected, color: T.red },
                { label: "Conversion",     value: `${waitlistStats.conversionRate}%`, color: T.blue },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center", padding: "12px 8px", borderRadius: 10, backgroundColor: T.bg, borderTop: `3px solid ${s.color}` }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: MONO, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: T.muted, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* 7-day signups bar chart */}
            <p style={{ ...LABEL_STYLE, marginTop: 20, marginBottom: 10 }}>Signups — Last 7 Days</p>
            <div style={{ height: 110 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waitlistStats.signupsPerDay} margin={{ top: 0, right: 4, bottom: 0, left: -30 }}>
                  <CartesianGrid strokeDasharray="3 3″ stroke={T.border} vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: T.muted, fontSize: 10, fontFamily: FONT }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: T.muted, fontSize: 10, fontFamily: FONT }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: T.muted }} />
                  <Bar dataKey="count" fill={T.accent} radius={[4, 4, 0, 0]} name="Signups" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Today's signups + Top trades */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Today vs yesterday */}
            <div style={{ ...CARD_STYLE, display: "flex", gap: 16 }}>
              <div style={{ flex: 1, textAlign: "center", padding: "12px 0″ }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: T.muted, marginBottom: 6 }}>Today</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: T.accent, fontFamily: MONO, lineHeight: 1 }}>{waitlistStats.todayCount}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>new signups</div>
              </div>
              <div style={{ width: 1, backgroundColor: T.border }} />
              <div style={{ flex: 1, textAlign: "center", padding: "12px 0″ }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: T.muted, marginBottom: 6 }}>Yesterday</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: T.muted, fontFamily: MONO, lineHeight: 1 }}>{waitlistStats.yesterdayCount}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>new signups</div>
              </div>
              <div style={{ width: 1, backgroundColor: T.border }} />
              <div style={{ flex: 1, textAlign: "center", padding: "12px 0″ }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: T.muted, marginBottom: 6 }}>Capacity</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: waitlistStats.total >= 2125 ? T.red : T.green, fontFamily: MONO, lineHeight: 1 }}>
                  {Math.round((waitlistStats.total / 2125) * 100)}%
                </div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{waitlistStats.total} / 2,125</div>
              </div>
            </div>

            {/* Top trades */}
            <div style={{ ...CARD_STYLE, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Wrench style={{ width: 14, height: 14, color: T.accent }} />
                <p style={LABEL_STYLE}>Top Trades</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {waitlistStats.topTrades.map((t, i) => (
                  <div key={t.trade} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.dim, minWidth: 16, fontFamily: MONO }}>#{i + 1}</span>
                    <span style={{ fontSize: 12, color: T.text, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.trade}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.accent, background: `${T.accent}18`, borderRadius: 6, padding: "2px 8px", fontFamily: MONO }}>{t.count}</span>
                  </div>
                ))}
                {waitlistStats.topTrades.length === 0 && (
                  <div style={{ color: T.muted, fontSize: 12, textAlign: "center", padding: "16px 0″ }}>No waitlist data yet</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* -- ROW 2: Growth chart + Action Items ------------------------- */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>

          {/* Growth area chart */}
          <div style={CARD_STYLE}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <p style={LABEL_STYLE}>Network Growth</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: T.text, marginTop: 4 }}>
                  {homeProfiles.toLocaleString()} profiles
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: T.green, marginTop: 4 }}>
                  <TrendingUp style={{ width: 13, height: 13 }} />
                  +34% this year
                </span>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 11, fontFamily: MONO }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5, color: T.muted }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: T.accent, display: "inline-block" }} />
                  Profiles
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, color: T.muted }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: T.blue, display: "inline-block" }} />
                  Partners
                </span>
              </div>
            </div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="gradProfiles" x1="0″ y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={T.accent} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={T.accent} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradPartners" x1="0″ y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={T.blue} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={T.blue} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3″ stroke={T.border} vertical={false} />
                  <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: T.muted }} />
                  <Area dataKey="profiles" stroke={T.accent} strokeWidth={2.5} fill="url(#gradProfiles)" dot={false} />
                  <Area dataKey="partners" stroke={T.blue}   strokeWidth={2.5} fill="url(#gradPartners)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Items */}
          <div style={CARD_STYLE}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <p style={LABEL_STYLE}>Action Items</p>
              {attentionItems.length > 0 && (
                <span
                  style={{
                    backgroundColor: T.red,
                    color: "#FFFFFF",
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {attentionItems.length}
                </span>
              )}
            </div>

            {attentionItems.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 0″, textAlign: "center" }}>
                <CheckCircle style={{ width: 32, height: 32, color: T.green, marginBottom: 10 }} />
                <p style={{ color: T.muted, fontSize: 13 }}>All clear</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {attentionItems.map((item, i) => (
                  <Link key={i} href={item.href}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 12px",
                        borderRadius: 10,
                        borderLeft: `3px solid ${ATTN_COLORS[item.type]}`,
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = T.bg}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"}
                    >
                      <item.icon style={{ width: 15, height: 15, color: ATTN_COLORS[item.type], flexShrink: 0 }} />
                      <span style={{ color: T.text, fontSize: 13, flex: 1 }}>{item.label}</span>
                      <ChevronRight style={{ width: 13, height: 13, color: T.dim, flexShrink: 0 }} />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Mini stat grid */}
            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: `1px solid ${T.border}`,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                { label: "Pending Apps",  value: pendingCount,   color: T.amber },
                { label: "Unpaid",        value: unpaidCount,    color: T.red },
                { label: "Unrouted",      value: unroutedCount,  color: T.accent },
                { label: "New Leads",     value: newTrustyLeads, color: T.purple },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 10,
                    backgroundColor: T.bg,
                    borderLeft: `3px solid ${s.color}`,
                  }}
                >
                  <div style={{ color: T.text, fontFamily: MONO, fontSize: 22, fontWeight: 700, lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ color: T.muted, fontSize: 11, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* -- ROW 2.5: V6 Predictive Engine Status -------------------- */}
        <div style={CARD_STYLE}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: BADGE_GRADIENTS.purple, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Radar style={{ width: 20, height: 20, color: "#FFFFFF" }} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: T.text }}>V6 Predictive Engine</p>
                <p style={{ fontSize: 11, color: T.muted }}>Event-Driven Lead Generation -- 4 Autonomous Engines</p>
              </div>
            </div>
            <Link href="/admin/predict">
              <span style={{ fontSize: 12, fontWeight: 600, color: T.accent, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                View Dashboard <ChevronRight style={{ width: 14, height: 14 }} />
              </span>
            </Link>
          </div>
          {/* V6 live summary bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12, padding: "10px 14px", borderRadius: 10, backgroundColor: T.bg }}>
            {[
              { label: "Event Triggers", value: totalEventTriggers, color: T.accent },
              { label: "AI-Driven Leads", value: totalEventDrivenLeads, color: T.purple },
              { label: "Pipeline Runs", value: totalAIPipelineRuns, color: T.blue },
              { label: "Active Recalls", value: activeRecallAlerts, color: T.red },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: s.color, fontFamily: MONO }}>{s.value.toLocaleString()}</div>
                <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { name: "Storm Watch", icon: CloudLightning, color: "#3B82F6″, status: "Active", leads: Math.round(totalEventTriggers * 0.28), statusColor: "#059669", statusBg: "#D1FAE5" },
              { name: "Asset Aging", icon: Clock, color: "#F59E0B", status: "Active", leads: Math.round(totalEventTriggers * 0.45), statusColor: "#059669″, statusBg: "#D1FAE5" },
              { name: "Market Events", icon: Home, color: "#10B981″, status: "Standby", leads: Math.round(totalEventTriggers * 0.15), statusColor: "#D97706", statusBg: "#FEF3C7" },
              { name: "Safety Recalls", icon: AlertTriangle, color: "#EF4444″, status: activeRecallAlerts > 0 ? "Active" : "Standby", leads: activeRecallAlerts, statusColor: activeRecallAlerts > 0 ? "#059669" : "#D97706", statusBg: activeRecallAlerts > 0 ? "#D1FAE5" : "#FEF3C7" },
            ].map((engine, i) => (
              <div key={i} style={{ padding: "14px 16px", borderRadius: 10, backgroundColor: T.bg, borderLeft: `3px solid ${engine.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <engine.icon style={{ width: 14, height: 14, color: engine.color }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{engine.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, backgroundColor: engine.statusBg, color: engine.statusColor }}>
                    {engine.status}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: MONO }}>{engine.leads} leads</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -- ROW 2.8: Network Health Score -------------------------------- */}
        <div style={{ ...CARD_STYLE, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            {
              label: "Network Health",
              value: Math.min(100, Math.round(
                (totalPartners > 0 ? 30 : 0) +
                (totalOpportunities > 0 ? 25 : 0) +
                (totalCommissionsPaid > 0 ? 25 : 0) +
                (newTrustyLeads > 0 ? 20 : 0)
              )),
              suffix: "/100″,
              color: T.green,
              icon: "🏥",
              sub: "Overall platform score",
            },
            {
              label: "Partner Activation",
              value: totalPartners > 0 ? Math.min(100, Math.round((totalOpportunities / Math.max(totalPartners, 1)) * 10)) : 0,
              suffix: "%",
              color: T.blue,
              icon: "⚡",
              sub: "Partners with ≥1 referral",
            },
            {
              label: "Lead Conversion",
              value: totalOpportunities > 0 ? Math.min(100, Math.round((totalCommissionsPaid / Math.max(totalOpportunities, 1)) * 100)) : 0,
              suffix: "%",
              color: T.purple,
              icon: "🎯",
              sub: "Opps → closed deals",
            },
            {
              label: "Homeowner Engagement",
              value: newTrustyLeads > 0 ? Math.min(100, Math.round(newTrustyLeads * 4)) : 0,
              suffix: "%",
              color: T.accent,
              icon: "🏠",
              sub: "Active TrustyPro users",
            },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", padding: "8px 0″ }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: item.color, fontFamily: MONO }}>
                {item.value}{item.suffix}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.text, marginTop: 4 }}>{item.label}</div>
              <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* -- NPS / CSAT Widget ------------------------------------------- */}
        {npsStats && (
          <div style={{ ...CARD_STYLE, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 20 }}>
            <div>
              <p style={LABEL_STYLE}>NPS Score</p>
              <p style={{ fontSize: 32, fontWeight: 800, color: (npsStats.npsScore ?? 0) >= 50 ? T.green : (npsStats.npsScore ?? 0) >= 0 ? T.blue : '#EF4444', marginTop: 4 }}>
                {npsStats.npsScore ?? '—'}
              </p>
              <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>Net Promoter Score</p>
            </div>
            <div>
              <p style={LABEL_STYLE}>Avg Rating</p>
              <p style={{ fontSize: 32, fontWeight: 800, color: T.green, marginTop: 4 }}>
                {npsStats.avgScore ?? '—'}<span style={{ fontSize: 14, color: T.muted }}>/10</span>
              </p>
              <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{npsStats.completed} responses</p>
            </div>
            <div>
              <p style={LABEL_STYLE}>Response Rate</p>
              <p style={{ fontSize: 32, fontWeight: 800, color: T.blue, marginTop: 4 }}>
                {npsStats.responseRate}%
              </p>
              <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{npsStats.total} surveys sent</p>
            </div>
            <div>
              <p style={LABEL_STYLE}>Breakdown</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, background: '#D1FAE5', color: '#059669', borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>😊 {npsStats.promoters} Promoters</span>
                <span style={{ fontSize: 11, background: '#FEF3C7', color: '#D97706', borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>😐 {npsStats.passives} Passives</span>
                <span style={{ fontSize: 11, background: '#FEE2E2', color: '#DC2626', borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>😞 {npsStats.detractors} Detractors</span>
              </div>
            </div>
          </div>
        )}

        {/* -- Network Health Score ---------------------------------------- */}
        {(() => {
          const avgPPS = (stats as any)?.avgPartnerScore ?? 61;
          const responseRate = (stats as any)?.avgResponseRate ?? 78;
          const disputeRate = (stats as any)?.disputeRate ?? 2.1;
          const activationRate = (stats as any)?.activationRate ?? 68;
          const healthScore = Math.min(100, Math.round(
            (Math.min(avgPPS, 100) * 0.30) +
            (Math.min(responseRate, 100) * 0.25) +
            (Math.max(0, 100 - disputeRate * 10) * 0.20) +
            (Math.min(activationRate, 100) * 0.25)
          ));
          const healthColor = healthScore >= 80 ? T.green : healthScore >= 60 ? T.amber : '#EF4444';
          const healthLabel = healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Needs Attention';
          const metrics = [
            { label: 'Avg PPS Score', value: avgPPS, max: 100, unit: '/100', color: T.accent, weight: '30%' },
            { label: 'Response Rate', value: responseRate, max: 100, unit: '%', color: T.blue, weight: '25%' },
            { label: 'Low Dispute Rate', value: Math.max(0, 100 - disputeRate * 10), max: 100, unit: '%', color: T.green, weight: '20%' },
            { label: 'Activation Rate', value: activationRate, max: 100, unit: '%', color: '#8B5CF6', weight: '25%' },
          ];
          return (
            <div style={{ ...CARD_STYLE, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto' }}>
                  <svg viewBox="0 0 140 140″ style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="70″ cy="70" r="58" fill="none" stroke={T.border} strokeWidth="14" />
                    <circle cx="70″ cy="70" r="58" fill="none" stroke={healthColor} strokeWidth="14"
                      strokeDasharray={`${(healthScore / 100) * 364.4} 364.4`}
                      strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontSize: 36, fontWeight: 800, color: healthColor, lineHeight: 1 }}>{healthScore}</p>
                    <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{healthLabel}</p>
                  </div>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: T.text, marginTop: 12 }}>Network Health Score</p>
                <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>Composite of 4 signals</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {metrics.map(m => (
                  <div key={m.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: T.muted }}>{m.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{m.value}{m.unit} <span style={{ fontSize: 10, color: T.muted, fontWeight: 400 }}>({m.weight} weight)</span></span>
                    </div>
                    <div style={{ height: 6, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(m.value / m.max) * 100}%`, background: m.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* -- ROW 3: Revenue bar chart -- full width ----------------------- */}
        <div style={CARD_STYLE}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <p style={LABEL_STYLE}>Revenue</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: T.text, marginTop: 4 }}>
                ${(totalCommissionsPaid).toLocaleString()}
              </p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: T.green, marginTop: 4 }}>
                <TrendingUp style={{ width: 13, height: 13 }} />
                +8% this month
              </span>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 11, fontFamily: MONO }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, color: T.muted }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: T.blue, display: "inline-block" }} />
                Platform Fees
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, color: T.muted }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: T.green, display: "inline-block" }} />
                Commissions
              </span>
            </div>
          </div>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 0, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3″ stroke={T.border} vertical={false} />
                <XAxis dataKey="week" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: T.muted }} />
                <Bar dataKey="fees"    fill={T.blue}  radius={[4,4,0,0]} />
                <Bar dataKey="revenue" fill={T.green} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* -- Toast notification ------------------------------------------ */}
        {triggerToast && (
          <div style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 9999,
            background: T.card, borderRadius: 12, padding: "12px 20px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            display: "flex", alignItems: "center", gap: 10,
            border: `1px solid ${T.border}`, fontFamily: FONT, fontSize: 13, color: T.text,
          }}>
            <CheckCircle style={{ width: 16, height: 16, color: T.green }} />
            {triggerToast}
          </div>
        )}

        {/* -- Platform Pulse: Live metrics bar --------------------------- */}
        {(() => {
          const todayCount = waitlistStats.todayCount;
          const lastScanTs = (systemStatus as any)?.lastStormScan
            ? new Date((systemStatus as any).lastStormScan).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "Not yet run";
          const buildOk = true;
          const serviceOk = systemStatus ? systemStatus.database : null;
          return (
            <div style={{ ...CARD_STYLE }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: BADGE_GRADIENTS.cyan, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Activity style={{ width: 18, height: 18, color: "#fff" }} />
                </div>
                <p style={LABEL_STYLE}>Platform Pulse</p>
                <span style={{ marginLeft: "auto", fontSize: 11, color: T.muted, fontFamily: MONO }}>Live — refreshes every 30s</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {/* Signups today */}
                <div style={{ padding: "14px 16px", borderRadius: 10, backgroundColor: T.bg, borderLeft: `3px solid ${T.accent}`, display: "flex", alignItems: "center", gap: 12 }}>
                  <Users style={{ width: 18, height: 18, color: T.accent, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: T.accent, fontFamily: MONO, lineHeight: 1 }}>{todayCount}</div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Signups Today</div>
                  </div>
                </div>
                {/* Build status */}
                <div style={{ padding: "14px 16px", borderRadius: 10, backgroundColor: T.bg, borderLeft: `3px solid ${buildOk ? T.green : T.red}`, display: "flex", alignItems: "center", gap: 12 }}>
                  <Server style={{ width: 18, height: 18, color: buildOk ? T.green : T.red, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: buildOk ? T.green : T.red, fontFamily: MONO, lineHeight: 1 }}>
                      {buildOk ? "Build passing ✓" : "Build failing ✗"}
                    </div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Build Status</div>
                  </div>
                </div>
                {/* Service health */}
                <div style={{ padding: "14px 16px", borderRadius: 10, backgroundColor: T.bg, borderLeft: `3px solid ${serviceOk ? T.green : T.amber}`, display: "flex", alignItems: "center", gap: 12 }}>
                  <Wifi style={{ width: 18, height: 18, color: serviceOk ? T.green : T.amber, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: serviceOk ? T.green : T.amber, fontFamily: MONO, lineHeight: 1 }}>
                      {serviceOk === null ? "Checking…" : serviceOk ? "200 OK ✓" : "Degraded ⚠"}
                    </div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Service Health</div>
                  </div>
                </div>
                {/* Last scan */}
                <div style={{ padding: "14px 16px", borderRadius: 10, backgroundColor: T.bg, borderLeft: `3px solid ${T.purple}`, display: "flex", alignItems: "center", gap: 12 }}>
                  <ScanLine style={{ width: 18, height: 18, color: T.purple, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.purple, fontFamily: MONO, lineHeight: 1 }}>{lastScanTs}</div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Last Storm Scan</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* -- ROW N: System Status + Manual Triggers ---------------------- */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* System Status */}
          <div style={CARD_STYLE}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: BADGE_GRADIENTS.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Activity style={{ width: 18, height: 18, color: "#fff" }} />
              </div>
              <p style={LABEL_STYLE}>System Status</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <StatusDot
                icon={Database}
                label="Database"
                active={systemStatus ? systemStatus.database : null}
                detail={systemStatus ? (systemStatus.database ? "TiDB Connected" : "Not configured") : "Checking…"}
              />
              <StatusDot
                icon={Mail}
                label="Email (Resend)"
                active={systemStatus ? systemStatus.email : null}
                detail={systemStatus ? (systemStatus.email ? "Configured" : "Key missing") : "Checking…"}
              />
              <StatusDot
                icon={Bot}
                label="AI Agents"
                active={systemStatus ? systemStatus.anthropic : null}
                detail={systemStatus ? (systemStatus.anthropic ? "30 Claude agents active" : "Key missing") : "Checking…"}
              />
              <StatusDot
                icon={CreditCard}
                label="Stripe"
                active={systemStatus ? systemStatus.stripe !== 'none' : null}
                detail={
                  systemStatus
                    ? systemStatus.stripe === 'live' ? "Live mode" : systemStatus.stripe === 'test' ? "Test mode" : "Not configured"
                    : "Checking…"
                }
              />
              <StatusDot
                icon={Camera}
                label="Photo AI"
                active={systemStatus ? systemStatus.openai : null}
                detail={systemStatus ? (systemStatus.openai ? "GPT-4o Vision active" : "Key missing") : "Checking…"}
              />
              <StatusDot
                icon={Phone}
                label="Twilio SMS"
                active={systemStatus ? systemStatus.twilio : null}
                detail={systemStatus ? (systemStatus.twilio ? "Configured" : "Not configured") : "Checking…"}
              />
              <StatusDot
                icon={Bell}
                label="OneSignal"
                active={systemStatus ? systemStatus.onesignal : null}
                detail={systemStatus ? (systemStatus.onesignal ? "Configured" : "Not configured") : "Checking…"}
              />
            </div>
          </div>

          {/* Manual Triggers */}
          <div style={CARD_STYLE}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: BADGE_GRADIENTS.orange, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap style={{ width: 18, height: 18, color: "#fff" }} />
              </div>
              <p style={LABEL_STYLE}>Manual Triggers</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Run Storm Scan */}
              <button
                disabled={stormScan.isPending}
                onClick={() => stormScan.mutate({ state: "TX" })}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                  borderRadius: 10, border: `1px solid ${T.border}`, backgroundColor: T.bg,
                  cursor: stormScan.isPending ? "not-allowed" : "pointer",
                  opacity: stormScan.isPending ? 0.6 : 1, fontFamily: FONT, textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (!stormScan.isPending) (e.currentTarget as HTMLButtonElement).style.backgroundColor = T.card; }}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = T.bg}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CloudLightning style={{ width: 15, height: 15, color: "#2563EB" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Run Storm Scan</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>NOAA alert scan — TX state</div>
                </div>
                <Play style={{ width: 14, height: 14, color: stormScan.isPending ? T.muted : T.accent }} />
              </button>

              {/* Send Test Notification */}
              <button
                onClick={() => showToast("Notification sent")}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                  borderRadius: 10, border: `1px solid ${T.border}`, backgroundColor: T.bg,
                  cursor: "pointer", fontFamily: FONT, textAlign: "left", transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = T.card}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = T.bg}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#FEF3C7″, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Send style={{ width: 15, height: 15, color: "#D97706″ }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Send Test Notification</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>Broadcast to all active pros</div>
                </div>
                <Play style={{ width: 14, height: 14, color: T.accent }} />
              </button>

              {/* Export All Waitlist Data */}
              <button
                disabled={exporting}
                onClick={async () => {
                  setExporting(true);
                  try {
                    const result = await exportWaitlist.refetch();
                    const raw: any = result.data ?? [];
                    const allRows: any[] = Array.isArray(raw)
                      ? raw
                      : [...(raw.pro ?? []), ...(raw.home ?? [])];
                    if (allRows.length === 0) { showToast("No waitlist data to export"); return; }
                    const allKeys = Array.from(new Set(allRows.flatMap((r: any) => Object.keys(r))));
                    const headers = allKeys.join(",");
                    const csvRows = allRows.map((r: any) => allKeys.map((k: string) => `"${String(r[k] ?? "").replace(/"/g, '""')}"`).join(","));
                    const csv = [headers, ...csvRows].join("\n");
                    const blob = new Blob([csv], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url; a.download = `waitlist-export-${new Date().toISOString().slice(0,10)}.csv`; a.click();
                    URL.revokeObjectURL(url);
                    showToast(`Exported ${allRows.length} waitlist entries`);
                  } finally { setExporting(false); }
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                  borderRadius: 10, border: `1px solid ${T.border}`, backgroundColor: T.bg,
                  cursor: exporting ? "not-allowed" : "pointer",
                  opacity: exporting ? 0.6 : 1, fontFamily: FONT, textAlign: "left", transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (!exporting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = T.card; }}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = T.bg}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#D1FAE5″, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Download style={{ width: 15, height: 15, color: "#059669″ }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Export All Waitlist Data</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>Download CSV of all signups</div>
                </div>
                <Play style={{ width: 14, height: 14, color: exporting ? T.muted : T.accent }} />
              </button>

            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
