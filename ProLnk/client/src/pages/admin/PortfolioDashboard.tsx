import { useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import {
  Users, Home, Zap, DollarSign,
  TrendingUp, ArrowUpRight, Shield,
  Megaphone, ChevronRight, Activity,
  BarChart3, AlertTriangle, CheckCircle,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";

const CARD: React.CSSProperties = {
  backgroundColor: T.card,
  borderRadius: 12,
  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  padding: "20px 24px",
};

const LABEL: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: T.muted,
  fontFamily: FONT,
};

const tooltipStyle: React.CSSProperties = {
  backgroundColor: T.card,
  border: "none",
  borderRadius: 10,
  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  color: T.text,
  fontFamily: FONT,
  fontSize: 12,
};

const axisStyle = { fill: T.muted, fontSize: 11, fontFamily: FONT };

// Business unit card with its own KPIs and quick-links
interface BizCardProps {
  name: string;
  tagline: string;
  color: string;
  icon: React.ElementType;
  gradient: string;
  href: string;
  kpis: { label: string; value: string | number; prefix?: string; suffix?: string; trend?: number }[];
  alerts: { text: string; type: "warn" | "ok" | "info" }[];
}

function BizCard({ name, tagline, color, icon: Icon, gradient, href, kpis, alerts }: BizCardProps) {
  return (
    <div style={{ ...CARD, borderTop: `3px solid ${color}`, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon style={{ width: 20, height: 20, color: "#fff" }} />
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: FONT }}>{name}</p>
            <p style={{ fontSize: 11, color: T.muted }}>{tagline}</p>
          </div>
        </div>
        <Link href={href}>
          <button
            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color, background: `${color}15`, border: `1px solid ${color}33`, borderRadius: 8, padding: "5px 10px", cursor: "pointer" }}
          >
            Open <ChevronRight style={{ width: 13, height: 13 }} />
          </button>
        </Link>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ backgroundColor: T.bg, borderRadius: 8, padding: "10px 12px" }}>
            <p style={LABEL}>{k.label}</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: T.text, fontFamily: MONO, marginTop: 2 }}>
              {k.prefix ?? ""}{typeof k.value === "number" ? k.value.toLocaleString() : k.value}{k.suffix ?? ""}
            </p>
            {k.trend !== undefined && (
              <span style={{ fontSize: 11, fontWeight: 600, color: k.trend >= 0 ? T.green : T.red, display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
                <ArrowUpRight style={{ width: 11, height: 11 }} />
                {k.trend >= 0 ? "+" : ""}{k.trend}% vs last mo
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {alerts.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: a.type === "warn" ? T.amber : a.type === "ok" ? T.green : T.muted }}>
              {a.type === "warn" ? <AlertTriangle style={{ width: 12, height: 12 }} /> : a.type === "ok" ? <CheckCircle style={{ width: 12, height: 12 }} /> : <Activity style={{ width: 12, height: 12 }} />}
              {a.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PortfolioDashboard() {
  useEffect(() => { document.title = "Portfolio Dashboard — Duke Partners"; }, []);

  const { data: stats }       = trpc.admin.getNetworkStats.useQuery();
  const { data: pending }     = trpc.admin.getPendingApplications.useQuery();
  const { data: unpaid }      = trpc.admin.getUnpaidCommissions.useQuery();
  const { data: trustyLeads } = trpc.trustyPro.getLeads.useQuery();
  const { data: npsStats }    = trpc.homeowner.getNpsStats.useQuery();

  const totalPartners        = stats?.totalPartners        ?? 0;
  const totalOpportunities   = stats?.totalOpportunities   ?? 0;
  const totalCommissionsPaid = stats?.totalCommissionsPaid ?? 0;
  const pendingCount         = pending?.length ?? 0;
  const unpaidCount          = unpaid?.length  ?? 0;
  const totalLeads           = trustyLeads?.length ?? 0;
  const newTrustyLeads       = (trustyLeads ?? []).filter((l: any) => l.status === "new").length;
  const homeProfiles         = (stats as any)?.totalProperties ?? totalLeads;
  const platformGMV          = Math.round(totalCommissionsPaid * 18.5);
  const npsScore             = (npsStats as any)?.averageScore ?? 0;

  // Combined monthly trend (mock shape, real totals)
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const combinedTrend = months.map((month, i) => ({
    month,
    prolnk:    Math.round(totalPartners   * (0.4 + (i / 11) * 0.6)),
    trustypro: Math.round(homeProfiles    * (0.3 + (i / 11) * 0.7)),
    media:     Math.round(totalOpportunities * (0.2 + (i / 11) * 0.8)),
  }));

  const revenueBreakdown = [
    { name: "ProLnk",       value: Math.round(platformGMV * 0.55), color: T.accent },
    { name: "TrustyPro",    value: Math.round(platformGMV * 0.30), color: T.green },
    { name: "ProLnk Media", value: Math.round(platformGMV * 0.15), color: T.amber },
  ];

  return (
    <AdminLayout title="Portfolio Dashboard" subtitle="All businesses — one view">
      <div style={{ padding: "32px 24px", display: "flex", flexDirection: "column", gap: 24, fontFamily: FONT }}>

        {/* — Top KPI strip -------------------------------------------------- */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, paddingTop: 16 }}>
          {[
            { label: "Total Partners",   value: totalPartners,        icon: Users,      gradient: BADGE_GRADIENTS.blue,   prefix: "" },
            { label: "Home Profiles",    value: homeProfiles,         icon: Home,       gradient: BADGE_GRADIENTS.cyan,   prefix: "" },
            { label: "Platform GMV",     value: platformGMV,          icon: DollarSign, gradient: BADGE_GRADIENTS.green,  prefix: "$" },
            { label: "AI Detections",    value: totalOpportunities,   icon: Zap,        gradient: BADGE_GRADIENTS.orange, prefix: "" },
          ].map(k => (
            <div key={k.label} style={{ ...CARD, position: "relative", paddingTop: 28 }}>
              <div style={{ position: "absolute", top: -16, left: 20, width: 52, height: 52, borderRadius: 12, background: k.gradient, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.22)" }}>
                <k.icon style={{ width: 22, height: 22, color: "#fff" }} />
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={LABEL}>{k.label}</p>
                <p style={{ fontSize: "1.6rem", fontWeight: 700, color: T.text, fontFamily: MONO, lineHeight: 1.1, marginTop: 4 }}>
                  {k.prefix}{typeof k.value === "number" ? k.value.toLocaleString() : k.value}
                </p>
              </div>
              <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 14, paddingTop: 10 }}>
                <span style={{ fontSize: 11, color: T.muted }}>Pre-launch</span>
              </div>
            </div>
          ))}
        </div>

        {/* — Business Unit Cards -------------------------------------------- */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          <BizCard
            name="ProLnk"
            tagline="Home service partner network"
            color={T.accent}
            icon={Home}
            gradient={BADGE_GRADIENTS.blue}
            href="/admin/prolnk/overview"
            kpis={[
              { label: "Active Partners",  value: totalPartners },
              { label: "Pending Apps",     value: pendingCount },
              { label: "Unpaid Commissions", value: unpaidCount },
              { label: "Opportunities",    value: totalOpportunities },
            ]}
            alerts={[
              ...(pendingCount > 0  ? [{ text: `${pendingCount} application${pendingCount > 1 ? "s" : ""} need review`, type: "warn" as const }] : []),
              ...(unpaidCount > 0   ? [{ text: `${unpaidCount} commission${unpaidCount > 1 ? "s" : ""} pending payout`, type: "warn" as const }] : []),
              ...(pendingCount === 0 && unpaidCount === 0 ? [{ text: "All clear — no pending actions", type: "ok" as const }] : []),
            ]}
          />
          <BizCard
            name="TrustyPro"
            tagline="AI-powered home intelligence"
            color={T.green}
            icon={Shield}
            gradient={BADGE_GRADIENTS.green}
            href="/admin/trustypro/overview"
            kpis={[
              { label: "Home Profiles",  value: homeProfiles },
              { label: "New Leads",      value: newTrustyLeads },
              { label: "Total Leads",    value: totalLeads },
              { label: "NPS Score",      value: npsScore > 0 ? npsScore.toFixed(1) : "—" },
            ]}
            alerts={[
              ...(newTrustyLeads > 0 ? [{ text: `${newTrustyLeads} lead${newTrustyLeads > 1 ? "s" : ""} need assignment`, type: "warn" as const }] : []),
              ...(newTrustyLeads === 0 ? [{ text: "All leads assigned", type: "ok" as const }] : []),
              { text: "AI photo pipeline active", type: "info" as const },
            ]}
          />
          <BizCard
            name="ProLnk Media"
            tagline="ZIP-cluster advertising platform"
            color={T.amber}
            icon={Megaphone}
            gradient={BADGE_GRADIENTS.orange}
            href="/admin/media-dash/executive"
            kpis={[
              { label: "Est. Media Revenue", value: Math.round(platformGMV * 0.15), prefix: "$" },
              { label: "Active Advertisers",  value: 0 },
              { label: "ZIP Clusters Sold",   value: 0 },
              { label: "Ad Impressions",      value: 0 },
            ]}
            alerts={[
              { text: "Pre-launch — advertiser onboarding not yet open", type: "info" as const },
            ]}
          />
        </div>

        {/* — Charts row ---------------------------------------------------- */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>

          {/* Combined growth chart */}
          <div style={CARD}>
            <div style={{ marginBottom: 16 }}>
              <p style={LABEL}>Combined Network Growth</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: T.text, marginTop: 4 }}>All 3 Business Units</p>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 11, fontFamily: MONO, marginBottom: 12 }}>
              {[
                { label: "ProLnk",       color: T.accent },
                { label: "TrustyPro",    color: T.green },
                { label: "ProLnk Media", color: T.amber },
              ].map(l => (
                <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, color: T.muted }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: l.color, display: "inline-block" }} />
                  {l.label}
                </span>
              ))}
            </div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={combinedTrend} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="gProlnk"    x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.accent} stopOpacity={0.2} /><stop offset="95%" stopColor={T.accent} stopOpacity={0} /></linearGradient>
                    <linearGradient id="gTrusty"    x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.green}  stopOpacity={0.2} /><stop offset="95%" stopColor={T.green}  stopOpacity={0} /></linearGradient>
                    <linearGradient id="gMedia"     x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.amber}  stopOpacity={0.2} /><stop offset="95%" stopColor={T.amber}  stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                  <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="prolnk"    stroke={T.accent} fill="url(#gProlnk)" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="trustypro" stroke={T.green}  fill="url(#gTrusty)" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="media"     stroke={T.amber}  fill="url(#gMedia)"  strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue breakdown bar chart */}
          <div style={CARD}>
            <div style={{ marginBottom: 16 }}>
              <p style={LABEL}>Revenue Mix</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: T.text, marginTop: 4 }}>
                ${platformGMV.toLocaleString()} GMV
              </p>
              <span style={{ fontSize: 11, color: T.green, fontWeight: 600 }}>Pre-launch estimates</span>
            </div>
            <div style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueBreakdown} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                  <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Est. Revenue"]} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {revenueBreakdown.map((entry, i) => (
                      <rect key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              {revenueBreakdown.map(r => (
                <div key={r.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: T.muted }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: r.color, display: "inline-block" }} />
                    {r.name}
                  </span>
                  <span style={{ fontWeight: 600, color: T.text, fontFamily: MONO }}>${r.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* — Quick Navigation ------------------------------------------------ */}
        <div style={CARD}>
          <p style={{ ...LABEL, marginBottom: 14 }}>Quick Navigation — All Sections</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {[
              { label: "Partner Pipeline",   href: "/admin/pipeline",         color: T.accent },
              { label: "All Partners",       href: "/admin/partners",         color: T.accent },
              { label: "AI Opportunities",   href: "/admin/opportunities",    color: T.accent },
              { label: "Financial Center",   href: "/admin/finance",          color: T.accent },
              { label: "Homeowner CRM",      href: "/admin/homeowners",       color: T.green },
              { label: "TrustyPro Leads",    href: "/admin/trustypro-leads",  color: T.green },
              { label: "Photo Scans",        href: "/admin/trustypro-scans",  color: T.green },
              { label: "Home Intelligence",  href: "/admin/home-intelligence",color: T.green },
              { label: "Advertisers",        href: "/admin/featured-advertisers", color: T.amber },
              { label: "Real Estate",        href: "/admin/real-estate-agents",   color: T.amber },
              { label: "Media Analytics",    href: "/admin/media-analytics",      color: T.amber },
              { label: "All Waitlists",      href: "/admin/waitlist",         color: T.purple },
            ].map(item => (
              <Link key={item.href} href={item.href}>
                <button
                  style={{ width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, color: item.color, backgroundColor: `${item.color}10`, border: `1px solid ${item.color}22`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  {item.label}
                  <ChevronRight style={{ width: 12, height: 12 }} />
                </button>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
