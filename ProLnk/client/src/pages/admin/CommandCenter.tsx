import { useMemo } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  Users, Home, TrendingUp, UserPlus,
  CheckCircle, Circle, ArrowRight,
  LayoutDashboard, DollarSign, GitBranch,
  Handshake, Network, Plug, Calendar,
  Rocket, Mail, Database, Globe, Shield,
  CreditCard, Smartphone, Lock, BarChart3,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

const CHECKLIST = [
  { label: "Waitlist live (prolnk.io)", done: true, icon: Globe },
  { label: "Pro signup form", done: true, icon: UserPlus },
  { label: "Homeowner signup form", done: true, icon: Home },
  { label: "Confirmation emails (Resend)", done: true, icon: Mail },
  { label: "Admin dashboard", done: true, icon: LayoutDashboard },
  { label: "Referral tracking", done: true, icon: GitBranch },
  { label: "TiDB database operational", done: true, icon: Database },
  { label: "Render deploy live", done: true, icon: Rocket },
  { label: "Lead matching algorithm", done: false, icon: BarChart3 },
  { label: "Stripe payments", done: false, icon: CreditCard },
  { label: "Pro verification flow", done: false, icon: Shield },
  { label: "Custom auth (login/signup)", done: false, icon: Lock },
  { label: "Mobile app", done: false, icon: Smartphone },
];

const QUICK_LINKS = [
  { href: "/admin/waitlist-new", label: "Waitlist Manager", icon: Users, gradient: BADGE_GRADIENTS.blue },
  { href: "/admin/finance", label: "Financial Center", icon: DollarSign, gradient: BADGE_GRADIENTS.green },
  { href: "/admin/pipeline", label: "Application Pipeline", icon: GitBranch, gradient: BADGE_GRADIENTS.cyan },
  { href: "/admin/partners", label: "Partner Intelligence", icon: Handshake, gradient: BADGE_GRADIENTS.orange },
  { href: "/admin/network", label: "Network Overview", icon: Network, gradient: BADGE_GRADIENTS.purple },
  { href: "/admin/integrations", label: "Integrations", icon: Plug, gradient: BADGE_GRADIENTS.teal },
];

function StatCard({
  label,
  value,
  icon: Icon,
  gradient,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  gradient: string;
}) {
  // Auth gate — placed AFTER all hooks to avoid Rules-of-Hooks violation
  if (authLoading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "#7B809A", fontFamily: "system-ui" }}>Loading...</div>;
  }
  if (!user || (user as any).role !== "admin") {
    return (
      <div style={{ padding: "60px 20px", maxWidth: "440px", margin: "80px auto", textAlign: "center", fontFamily: "system-ui" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#344767", marginBottom: "12px" }}>Admin Login Required</h2>
        <p style={{ color: "#7B809A", marginBottom: "24px" }}>You must be signed in as an admin to view the dashboard.</p>
        <a href="/login" style={{ display: "inline-block", padding: "12px 24px", background: "#1A73E8", color: "#fff", textDecoration: "none", borderRadius: "8px", fontWeight: 600 }}>Sign In</a>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: T.muted }}>
            {label}
          </p>
          <p className="text-2xl font-bold mt-1" style={{ color: T.text, fontFamily: MONO }}>
            {value}
          </p>
        </div>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: gradient }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{
        backgroundColor: T.card,
        border: `1px solid ${T.border}`,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      }}
    >
      <p className="text-xs font-semibold mb-1" style={{ color: T.text }}>{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function CommandCenter() {
  const { user, loading: authLoading } = useAuth();
  const metrics = trpc.waitlist.getWaitlistMetrics.useQuery(undefined, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const trends = trpc.waitlistAdmin.getSignupTrends.useQuery(undefined, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const proWaitlist = trpc.waitlistAdmin.getProWaitlist.useQuery({ limit: 200 }, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const chartData = useMemo(() => {
    if (!trends.data) return [];
    const sorted = [...trends.data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return sorted.map((row) => ({
      date: new Date(row.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      signups: Number(row.count),
    }));
  }, [trends.data]);

  const recentPros = useMemo(() => {
    if (!proWaitlist.data) return [];
    return proWaitlist.data.slice(0, 5);
  }, [proWaitlist.data]);

  const completedCount = CHECKLIST.filter((c) => c.done).length;
  const totalCount = CHECKLIST.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const m = metrics.data;
  const metricsError = metrics.isError;

  return (
    <AdminLayout title="Command Center" subtitle="ProLnk Platform Overview">
      <div className="p-6 space-y-6" style={{ fontFamily: FONT }}>

        {/* ── Top Metrics Row ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Pro Signups"
            value={metricsError ? "0" : m ? m.proSignups.toLocaleString() : "—"}
            icon={UserPlus}
            gradient={BADGE_GRADIENTS.blue}
          />
          <StatCard
            label="Homeowner Signups"
            value={metricsError ? "0" : m ? m.trustyproSignups.toLocaleString() : "—"}
            icon={Home}
            gradient={BADGE_GRADIENTS.green}
          />
          <StatCard
            label="Total Signups"
            value={metricsError ? "0" : m ? m.totalSignups.toLocaleString() : "—"}
            icon={Users}
            gradient={BADGE_GRADIENTS.cyan}
          />
          <StatCard
            label="Referral Rate"
            value={metricsError ? "0%" : m ? `${m.conversionRate}%` : "—"}
            icon={TrendingUp}
            gradient={BADGE_GRADIENTS.orange}
          />
        </div>

        {/* ── Signup Trends Chart ─────────────────────────────────── */}
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold" style={{ color: T.text }}>
                Signup Trends
              </h2>
              <p className="text-xs" style={{ color: T.muted }}>
                Daily signups over the last 30 days
              </p>
            </div>
          </div>
          {trends.isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-sm" style={{ color: T.muted }}>Loading chart data...</p>
            </div>
          ) : trends.isError ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-sm" style={{ color: T.red }}>Error loading trend data</p>
            </div>
          ) : chartData.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-sm" style={{ color: T.muted }}>No signup data yet</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="signupFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={T.accent} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={T.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: T.muted }}
                  axisLine={{ stroke: T.border }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: T.muted }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="signups"
                  name="Signups"
                  stroke={T.accent}
                  strokeWidth={2.5}
                  fill="url(#signupFill)"
                  dot={false}
                  activeDot={{ r: 5, fill: T.accent, stroke: T.card, strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* ── Two Column: Checklist + Recent Signups ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Launch Progression Checklist */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold" style={{ color: T.text }}>
                  Launch Progression
                </h2>
                <p className="text-xs" style={{ color: T.muted }}>
                  {completedCount} of {totalCount} milestones complete
                </p>
              </div>
              <span
                className="text-sm font-bold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${T.green}18`,
                  color: T.green,
                  fontFamily: MONO,
                }}
              >
                {progressPct}%
              </span>
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-2.5 rounded-full mb-5 overflow-hidden"
              style={{ backgroundColor: `${T.accent}15` }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progressPct}%`,
                  background: BADGE_GRADIENTS.blue,
                }}
              />
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {CHECKLIST.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 px-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: item.done ? `${T.green}08` : T.surface,
                  }}
                >
                  {item.done ? (
                    <CheckCircle className="w-4.5 h-4.5 flex-shrink-0" style={{ color: T.green, width: 18, height: 18 }} />
                  ) : (
                    <Circle className="w-4.5 h-4.5 flex-shrink-0" style={{ color: T.dim, width: 18, height: 18 }} />
                  )}
                  <item.icon
                    className="flex-shrink-0"
                    style={{
                      color: item.done ? T.green : T.dim,
                      width: 15,
                      height: 15,
                    }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: item.done ? T.text : T.muted,
                      textDecoration: item.done ? "none" : "none",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Pro Signups */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold" style={{ color: T.text }}>
                  Recent Signups
                </h2>
                <p className="text-xs" style={{ color: T.muted }}>
                  Latest pro waitlist applications
                </p>
              </div>
              <Link
                href="/admin/waitlist-new"
                className="flex items-center gap-1 text-xs font-semibold no-underline"
                style={{ color: T.accent }}
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {proWaitlist.isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="h-14 rounded-xl animate-pulse"
                    style={{ backgroundColor: T.surface }}
                  />
                ))}
              </div>
            ) : proWaitlist.isError ? (
              <div className="py-10 text-center">
                <p className="text-sm" style={{ color: T.red }}>Error loading signups</p>
              </div>
            ) : recentPros.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm" style={{ color: T.muted }}>No signups yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      {["Name", "Email", "Business", "Date"].map((h) => (
                        <th
                          key={h}
                          className="text-left text-xs font-semibold uppercase tracking-wide pb-3 px-3"
                          style={{ color: T.muted }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentPros.map((pro: any, i: number) => (
                      <tr
                        key={pro.id ?? i}
                        className="transition-colors"
                        style={{ borderTop: i > 0 ? `1px solid ${T.border}` : undefined }}
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                              style={{ background: BADGE_GRADIENTS.blue }}
                            >
                              {((pro.firstName || pro.businessName || "?")[0]).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold truncate max-w-[120px]" style={{ color: T.text }}>
                              {pro.firstName
                                ? `${pro.firstName} ${pro.lastName ?? ""}`.trim()
                                : pro.businessName || "—"}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-xs truncate max-w-[160px] block" style={{ color: T.muted, fontFamily: MONO }}>
                            {pro.email || "—"}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-xs truncate max-w-[120px] block" style={{ color: T.muted }}>
                            {pro.businessName || "—"}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-xs flex items-center gap-1 whitespace-nowrap" style={{ color: T.dim }}>
                            <Calendar className="w-3 h-3" />
                            {pro.createdAt
                              ? new Date(pro.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "—"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ── Quick Links Grid ────────────────────────────────────── */}
        <div>
          <h2 className="text-base font-bold mb-4" style={{ color: T.text }}>
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="no-underline">
                <div
                  className="rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02] cursor-pointer"
                  style={{
                    backgroundColor: T.card,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    border: `1px solid ${T.border}`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: link.gradient }}
                  >
                    <link.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold" style={{ color: T.text }}>
                      {link.label}
                    </p>
                    <p className="text-xs" style={{ color: T.muted }}>
                      {link.href}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: T.dim }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
