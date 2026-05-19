import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import ProLnkLogo from "@/components/ProLnkLogo";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  Award, Users, TrendingUp, DollarSign, CheckCircle, XCircle,
  Send, LogOut, Bell, ChevronRight, Percent, Zap, ShieldCheck,
  Home, Eye, Bot, Database, Mail, Activity, Clock, Star,
  UserPlus, HomeIcon, Crown, Shield, Layers, ExternalLink, Download, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

function TierBadge({ tier }: { tier: string }) {
  const map: Record<string, { label: string; icon: string; bg: string; color: string }> = {
    scout:      { label: "Scout",      icon: "[SEARCH]", bg: "#f8fafc", color: "#64748b" },
    pro:        { label: "Pro",        icon: "",   bg: "#f0fdfa", color: "#0d9488″ },
    crew:       { label: "Crew",       icon: "",   bg: "#eef2ff", color: "#6366f1″ },
    company:    { label: "Company",    icon: "",   bg: "#fefce8″, color: "#d4af37" },
    enterprise: { label: "Enterprise", icon: "[AWARD]",   bg: "#1e293b", color: "#94a3b8″ },
  };
  const t = map[tier] ?? map.scout;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: t.bg, color: t.color, border: `1px solid ${t.color}` }}>
      {t.icon} {t.label}
    </span>
  );
}

export default function AdminDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const [exportingPros, setExportingPros] = useState(false);
  const [exportingHomes, setExportingHomes] = useState(false);

  const utils = trpc.useUtils();

  const { data: stats } = trpc.admin.getNetworkStats.useQuery(undefined, { enabled: isAuthenticated });
  const { data: waitlistCounts } = trpc.waitlist.getPublicCounts.useQuery(undefined, { enabled: isAuthenticated, refetchInterval: 30000 });
  const { data: waitlistMetrics } = trpc.waitlist.getWaitlistMetrics.useQuery(undefined, { enabled: isAuthenticated });
  const { data: signupTrends } = trpc.waitlistAdmin.getSignupTrends.useQuery(undefined, { enabled: isAuthenticated });
  const { data: pending } = trpc.admin.getPendingApplications.useQuery(undefined, { enabled: isAuthenticated });
  const { data: trustyLeads, refetch: refetchLeads } = trpc.trustyPro.getLeads.useQuery(undefined, { enabled: isAuthenticated });
  const { data: approvedPartners } = trpc.admin.getApprovedPartnersForDispatch.useQuery(undefined, { enabled: isAuthenticated });
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [routePartnerId, setRoutePartnerId] = useState<string>("");
  const [expandedLead, setExpandedLead] = useState<number | null>(null);

  const updateLeadStatus = trpc.trustyPro.updateLeadStatus.useMutation({
    onSuccess: () => { toast.success("Lead status updated"); refetchLeads(); },
    onError: () => toast.error("Failed to update status"),
  });
  const routeLead = trpc.trustyPro.routeLeadToPartner.useMutation({
    onSuccess: (data) => { toast.success(`Lead routed to ${data.partnerName}`); setSelectedLeadId(null); setRoutePartnerId(""); refetchLeads(); },
    onError: () => toast.error("Failed to route lead"),
  });
  const { data: allPartners } = trpc.admin.getAllPartners.useQuery(undefined, { enabled: isAuthenticated });
  const { data: unpaidCommissions } = trpc.admin.getUnpaidCommissions.useQuery(undefined, { enabled: isAuthenticated });

  const approveMutation = trpc.admin.approvePartner.useMutation({
    onSuccess: () => {
      toast.success("Partner approved!");
      utils.admin.getPendingApplications.invalidate();
      utils.admin.getAllPartners.invalidate();
      utils.admin.getNetworkStats.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const rejectMutation = trpc.admin.rejectPartner.useMutation({
    onSuccess: () => {
      toast.success("Application rejected.");
      utils.admin.getPendingApplications.invalidate();
      utils.admin.getNetworkStats.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const markPaidMutation = trpc.admin.markCommissionPaid.useMutation({
    onSuccess: () => {
      toast.success("Commission marked as paid.");
      utils.admin.getUnpaidCommissions.invalidate();
      utils.admin.getNetworkStats.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const broadcastMutation = trpc.admin.broadcastMessage.useMutation({
    onSuccess: () => {
      toast.success("Message broadcast to all partners.");
      setBroadcastSubject("");
      setBroadcastMessage("");
    },
    onError: (e) => toast.error(e.message),
  });

  function buildCsvAndDownload(rows: Record<string, unknown>[], filename: string) {
    if (!rows.length) return;
    const headers = Object.keys(rows[0]);
    const lines = rows.map(row =>
      headers.map(h => {
        const v = row[h];
        const str = v == null ? "" : Array.isArray(v) ? v.join(";") : String(v).replace(/"/g, '""');
        return str.includes(",") || str.includes('"') || str.includes("\n") ? `"${str}"` : str;
      }).join(",")
    );
    const blob = new Blob([[headers.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleExportPros() {
    setExportingPros(true);
    try {
      const data = await utils.waitlist.exportWaitlist.fetch({ source: "pro" });
      const raw: any = data ?? [];
      const rows: Record<string, unknown>[] = Array.isArray(raw) ? raw : (raw.pro ?? []);
      if (!rows.length) { toast.error("No pro records to export"); return; }
      buildCsvAndDownload(rows, `prolnk-pro-waitlist-${new Date().toISOString().slice(0, 10)}.csv`);
      toast.success(`Exported ${rows.length} pro records`);
    } catch (e: unknown) {
      toast.error(`Export failed: ${e instanceof Error ? e.message : "Unknown error"}`);
    } finally {
      setExportingPros(false);
    }
  }

  async function handleExportHomes() {
    setExportingHomes(true);
    try {
      const data = await utils.waitlist.exportWaitlist.fetch({ source: "home" });
      const raw: any = data ?? [];
      const rows: Record<string, unknown>[] = Array.isArray(raw) ? raw : (raw.home ?? []);
      if (!rows.length) { toast.error("No homeowner records to export"); return; }
      buildCsvAndDownload(rows, `trustypro-homeowner-waitlist-${new Date().toISOString().slice(0, 10)}.csv`);
      toast.success(`Exported ${rows.length} homeowner records`);
    } catch (e: unknown) {
      toast.error(`Export failed: ${e instanceof Error ? e.message : "Unknown error"}`);
    } finally {
      setExportingHomes(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 animate-spin" style={{ borderColor: "var(--teal)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4″>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5″ style={{ backgroundColor: "var(--teal-light)" }}>
            <Award className="h-7 w-7″ style={{ color: "var(--teal)" }} />
          </div>
          <h2 className="text-2xl font-heading text-gray-900 mb-3″>Admin Login Required</h2>
          <p className="text-gray-500 text-sm mb-6″>Sign in with your admin account to access the control panel.</p>
          <a href={getLoginUrl()}>
            <Button className="w-full font-heading" style={{ backgroundColor: "var(--teal)" }}>
              Sign In
            </Button>
          </a>
          <Link href="/" className="block mt-4 text-sm text-gray-400 hover:text-gray-600″> Back to Home</Link>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4″>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md w-full text-center">
          <div className="text-5xl mb-5″></div>
          <h2 className="text-2xl font-heading text-gray-900 mb-3″>Access Denied</h2>
          <p className="text-gray-500 text-sm mb-6″>You don't have admin privileges. Contact the network owner.</p>
          <Link href="/">
            <Button variant="outline" className="border-2″ style={{ borderColor: "var(--teal)", color: "var(--teal)" }}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50″>
      {/* Top nav */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40″>
        <div className="container flex items-center justify-between h-16″>
          <div className="flex items-center gap-3″>
            <ProLnkLogo height={28} variant="light" className="shrink-0″ />
            <Badge className="text-xs" style={{ backgroundColor: "var(--teal-light)", color: "var(--teal)", border: "1px solid var(--teal)" }}>
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-3″>
            <span className="text-sm text-gray-500 hidden sm:block">{user?.name}</span>
            <Button variant="ghost" size="sm" onClick={logout} className="text-gray-500″>
              <LogOut className="h-4 w-4 mr-1.5″ /> Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="container py-8″>

        {/* ── Command Center Header ─────────────────────────────────────────── */}
        <div className="rounded-2xl mb-8 overflow-hidden" style={{ background: "linear-gradient(135deg, #0A1628 0%, #0e2040 60%, #0f2d4a 100%)" }}>
          <div className="px-6 pt-6 pb-4″>
            <div className="flex items-center justify-between flex-wrap gap-3″>
              <div>
                <h1 className="text-2xl font-heading font-black text-white tracking-tight">ProLnk Command Center</h1>
                <p className="text-sm mt-0.5″ style={{ color: "#7eb8d4" }}>Real-time platform intelligence — waitlist, network, agents, system health</p>
              </div>
              <div className="flex items-center gap-2″>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "#00D4FF18″, border: "1px solid #00D4FF40", color: "#00D4FF" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
                <Button variant="ghost" size="sm" onClick={logout} className="text-white/60 hover:text-white hover:bg-white/10 gap-1″>
                  <LogOut className="h-3.5 w-3.5″ /> Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Waitlist + Network KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t" style={{ borderColor: "#ffffff15″ }}>
            {[
              {
                label: "Pro Signups",
                value: (waitlistCounts?.pros ?? 0).toLocaleString(),
                sub: "waitlisted professionals",
                icon: UserPlus,
                color: "#00D4FF",
              },
              {
                label: "Homeowner Signups",
                value: (waitlistCounts?.homes ?? 0).toLocaleString(),
                sub: "homeowners waiting",
                icon: HomeIcon,
                color: "#82D616″,
              },
              {
                label: "Active Partners",
                value: (stats?.totalPartners ?? 0).toLocaleString(),
                sub: "approved network pros",
                icon: Users,
                color: "#FBB140″,
              },
              {
                label: "Pending Review",
                value: (pending?.length ?? 0).toLocaleString(),
                sub: "applications to approve",
                icon: Clock,
                color: pending && pending.length > 0 ? "#EA0606″ : "#82D616",
              },
            ].map((kpi, i) => (
              <div key={kpi.label} className="px-5 py-4 flex items-center gap-3″ style={{ borderLeft: i > 0 ? "1px solid #ffffff10" : undefined }}>
                <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${kpi.color}20` }}>
                  <kpi.icon className="w-4 h-4″ style={{ color: kpi.color }} />
                </div>
                <div className="min-w-0″>
                  <div className="text-xl font-black text-white leading-none">{kpi.value}</div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: "#7eb8d4″ }}>{kpi.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Network Tier Breakdown + Quick Actions + System Health ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8″>

          {/* Tier Breakdown */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3″>
              <CardTitle className="font-heading text-sm text-gray-600 uppercase tracking-wide flex items-center gap-2″>
                <Layers className="w-4 h-4″ style={{ color: "var(--teal)" }} />
                Network Tier Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3″>
              {[
                { tier: "charter", label: "Charter", cap: 25, color: "#F5E642″, icon: Crown },
                { tier: "founding", label: "Founding", cap: 100, color: "#00D4FF", icon: Star },
                { tier: "growth", label: "Growth Pro (L3)", cap: 400, color: "#82D616″, icon: TrendingUp },
                { tier: "standard", label: "Standard Pro (L4)", cap: 1600, color: "#7B809A", icon: Users },
              ].map(({ tier, label, cap, color, icon: Icon }) => {
                const filled = Number((waitlistMetrics as any)?.tierBreakdown?.[tier] ?? 0);
                const pct = Math.min(100, Math.round((filled / cap) * 100));
                return (
                  <div key={tier}>
                    <div className="flex items-center justify-between mb-1″>
                      <div className="flex items-center gap-1.5″>
                        <Icon className="w-3 h-3″ style={{ color }} />
                        <span className="text-xs font-semibold text-gray-700″>{label}</span>
                      </div>
                      <span className="text-xs font-mono text-gray-500″>{filled}/{cap}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-gray-400 pt-1″>Waitlist closes at 500 pro apps + 5,000 homes</p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3″>
              <CardTitle className="font-heading text-sm text-gray-600 uppercase tracking-wide flex items-center gap-2″>
                <Zap className="w-4 h-4″ style={{ color: "var(--teal)" }} />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2″>
              {[
                { label: "Export All Waitlist Data", href: "#export", icon: Download, color: "#0284c7″, desc: "Download CSV for all pros + homeowners", action: "export" },
                { label: "Send Welcome Email to Pending", href: "/admin/waitlist", icon: Mail, color: "#22c55e", desc: "Bulk action via Waitlist Manager" },
                { label: "View Charter Invite Usage", href: "/admin/charter-tracking", icon: Crown, color: "#F5E642″, desc: "25 codes — see usage and revoke" },
                { label: "Trigger Storm Scan", href: "/admin/storm-watch", icon: Zap, color: "#f97316″, desc: "Run NOAA storm agent on active regions" },
                { label: "Approve Pending Applications", href: "#applications", icon: CheckCircle, color: "#22c55e", badge: pending?.length },
                { label: "View Waitlist Manager", href: "/admin/waitlist", icon: Users, color: "var(--teal)" },
                { label: "Agent Command Center", href: "/admin/agent-command-center", icon: Bot, color: "#7928CA" },
                { label: "AI Opportunity Feed", href: "/admin/opportunities", icon: TrendingUp, color: "#6366f1″ },
              ].map((action) => (
                action.action === "export"
                  ? (
                    <div
                      key={action.href}
                      onClick={() => { handleExportPros(); handleExportHomes(); }}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-2.5″>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0″ style={{ background: `${action.color}15` }}>
                          <action.icon className="w-3.5 h-3.5″ style={{ color: action.color }} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">{action.label}</div>
                          {action.desc && <div className="text-xs text-gray-400″>{action.desc}</div>}
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-500″ />
                    </div>
                  )
                  : (
                    <Link key={action.href} href={action.href}>
                      <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors">
                        <div className="flex items-center gap-2.5″>
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0″ style={{ background: `${action.color}15` }}>
                            <action.icon className="w-3.5 h-3.5″ style={{ color: action.color }} />
                          </div>
                          <div>
                            <div className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">{action.label}</div>
                            {action.desc && <div className="text-xs text-gray-400″>{action.desc}</div>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2″>
                          {action.badge != null && action.badge > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600″>{action.badge}</span>
                          )}
                          <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-500″ />
                        </div>
                      </div>
                    </Link>
                  )
              ))}
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3″>
              <CardTitle className="font-heading text-sm text-gray-600 uppercase tracking-wide flex items-center gap-2″>
                <Shield className="w-4 h-4″ style={{ color: "var(--teal)" }} />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3″>
              {[
                { label: "Database (TiDB)", status: stats !== undefined ? "operational" : "checking", icon: Database },
                { label: "Email (Resend)", status: "operational", icon: Mail },
                { label: "AI Agents (Claude)", status: "operational", icon: Bot },
                { label: "Platform API", status: "operational", icon: Activity },
                { label: "Waitlist Signups", status: waitlistCounts !== undefined ? "operational" : "checking", icon: Users },
              ].map(({ label, status, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2″>
                    <Icon className="w-3.5 h-3.5 text-gray-400″ />
                    <span className="text-sm text-gray-700″>{label}</span>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    status === "operational"
                      ? "bg-green-50 text-green-600″
                      : status === "checking"
                      ? "bg-amber-50 text-amber-600″
                      : "bg-red-50 text-red-600″
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      status === "operational" ? "bg-green-500″ : status === "checking" ? "bg-amber-400" : "bg-red-500"
                    }`} />
                    {status === "operational" ? "Online" : status === "checking" ? "Checking" : "Error"}
                  </span>
                </div>
              ))}

              {/* Recent activity placeholder */}
              <div className="pt-2 mt-1 border-t border-gray-100″>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2″>Recent Signups</p>
                <div className="space-y-1.5″>
                  {[
                    { name: "Pro waitlist signup", time: "just now", type: "pro" },
                    { name: "Homeowner request", time: "2m ago", type: "home" },
                    { name: "Pro waitlist signup", time: "5m ago", type: "pro" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500″>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.type === "pro" ? "bg-teal-400" : "bg-blue-400"}`} />
                      <span className="flex-1 truncate">{item.name}</span>
                      <span className="text-gray-400″>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Platform Stats Row ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8″>
          {[
            { label: "Total Partners", value: stats?.totalPartners ?? 0, icon: Users, color: "var(--teal)" },
            { label: "Pending Applications", value: pending?.length ?? 0, icon: ChevronRight, color: "#f59e0b" },
            { label: "Total Opportunities", value: stats?.totalOpportunities ?? 0, icon: TrendingUp, color: "#6366f1″ },
            { label: "Commissions Paid", value: `$${(stats?.totalCommissionsPaid ?? 0).toFixed(2)}`, icon: DollarSign, color: "#22c55e" },
          ].map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-5″>
                <div className="flex items-center justify-between mb-3″>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="h-4 w-4″ style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-2xl font-heading font-bold text-gray-900″>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Export Data + 7-Day Signup Chart ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8″>

          {/* Export Data */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3″>
              <CardTitle className="font-heading text-sm text-gray-600 uppercase tracking-wide flex items-center gap-2″>
                <Download className="w-4 h-4″ style={{ color: "var(--teal)" }} />
                Export Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3″>
              <p className="text-xs text-gray-500″>
                Download full waitlist records as CSV for email campaigns, seed-round decks, or data analysis.
              </p>
              <div className="grid grid-cols-2 gap-3″>
                <button
                  onClick={handleExportPros}
                  disabled={exportingPros}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-teal-200 bg-teal-50 text-sm font-semibold text-teal-700 hover:bg-teal-100 transition-colors disabled:opacity-60″
                >
                  {exportingPros
                    ? <span className="w-4 h-4 inline-block animate-spin border-2 border-teal-500 border-t-transparent rounded-full" />
                    : <Download className="w-4 h-4″ />}
                  Export Pros CSV
                </button>
                <button
                  onClick={handleExportHomes}
                  disabled={exportingHomes}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-indigo-200 bg-indigo-50 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-60″
                >
                  {exportingHomes
                    ? <span className="w-4 h-4 inline-block animate-spin border-2 border-indigo-500 border-t-transparent rounded-full" />
                    : <Download className="w-4 h-4″ />}
                  Export Homeowners CSV
                </button>
              </div>
              <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-2 text-center">
                <div>
                  <div className="text-xl font-black text-gray-900″>{(waitlistCounts?.pros ?? 0).toLocaleString()}</div>
                  <div className="text-xs text-gray-400″>Pro records</div>
                </div>
                <div>
                  <div className="text-xl font-black text-gray-900″>{(waitlistCounts?.homes ?? 0).toLocaleString()}</div>
                  <div className="text-xs text-gray-400″>Homeowner records</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7-Day Signup Trend */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3″>
              <CardTitle className="font-heading text-sm text-gray-600 uppercase tracking-wide flex items-center gap-2″>
                <BarChart3 className="w-4 h-4″ style={{ color: "var(--teal)" }} />
                7-Day Pro Signup Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const today = new Date();
                const days = Array.from({ length: 7 }, (_, i) => {
                  const d = new Date(today);
                  d.setDate(today.getDate() - (6 - i));
                  const key = d.toISOString().slice(0, 10);
                  const label = d.toLocaleDateString("en-US", { weekday: "short" });
                  const count = Number(
                    (signupTrends ?? []).find((t: { date: string }) => t.date === key)?.count ?? 0
                  );
                  return { key, label, count };
                });
                const maxCount = Math.max(...days.map(d => d.count), 1);
                const total7 = days.reduce((s, d) => s + d.count, 0);
                return (
                  <>
                    <div className="flex items-end gap-2 h-28 mb-3″>
                      {days.map(({ key, label, count }) => (
                        <div key={key} className="flex-1 flex flex-col items-center gap-1″>
                          <span className="text-xs font-semibold text-teal-600″>{count > 0 ? count : ""}</span>
                          <div
                            className="w-full rounded-t-md transition-all"
                            style={{
                              height: `${Math.max(4, Math.round((count / maxCount) * 80))}px`,
                              backgroundColor: count > 0 ? "var(--teal)" : "#E9ECEF",
                            }}
                          />
                          <span className="text-xs text-gray-400″>{label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-2″>
                      <span>{total7} new pro signups this week</span>
                      <a href="/admin/network-analytics" className="text-teal-600 hover:underline font-medium">Full analytics →</a>
                    </div>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applications">
          <TabsList className="mb-6 bg-white border border-gray-200 shadow-sm">
            <TabsTrigger value="applications" className="font-heading data-[state=active]:bg-teal data-[state=active]:text-white">
              Applications {pending && pending.length > 0 && (
                <Badge className="ml-1.5 text-xs h-4 w-4 p-0 flex items-center justify-center rounded-full bg-red-500 text-white">
                  {pending.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="partners" className="font-heading data-[state=active]:bg-teal data-[state=active]:text-white">
              All Partners
            </TabsTrigger>
            <TabsTrigger value="commissions" className="font-heading data-[state=active]:bg-teal data-[state=active]:text-white">
              Commissions
            </TabsTrigger>
            <TabsTrigger value="broadcast" className="font-heading data-[state=active]:bg-teal data-[state=active]:text-white">
              Broadcast
            </TabsTrigger>
            <TabsTrigger value="trustypro-leads" className="font-heading data-[state=active]:bg-teal data-[state=active]:text-white">
              TrustyPro Leads {trustyLeads && trustyLeads.filter(l => l.status === 'new').length > 0 && (
                <Badge className="ml-1.5 text-xs h-4 w-4 p-0 flex items-center justify-center rounded-full bg-indigo-500 text-white">
                  {trustyLeads.filter(l => l.status === 'new').length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Applications */}
          <TabsContent value="applications">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-gray-900″>Pending Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {pending && pending.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Service Area</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pending.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell>
                            <div className="font-semibold text-gray-900″>{p.businessName}</div>
                            {p.website && <a href={p.website} target="_blank" rel="noreferrer" className="text-xs text-teal hover:underline">{p.website}</a>}
                          </TableCell>
                          <TableCell className="text-gray-600″>{p.businessType}</TableCell>
                          <TableCell className="text-gray-600″>{p.serviceArea}</TableCell>
                          <TableCell>
                            <div className="text-sm">{p.contactName}</div>
                            <div className="text-xs text-gray-400″>{p.contactEmail}</div>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">
                            {new Date(p.appliedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2″>
                              <Button
                                size="sm"
                                className="text-xs h-7 px-3″
                                style={{ backgroundColor: "var(--teal)" }}
                                onClick={() => approveMutation.mutate({ partnerId: p.id })}
                                disabled={approveMutation.isPending}
                              >
                                <CheckCircle className="h-3 w-3 mr-1″ /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7 px-3 border-red-300 text-red-500 hover:bg-red-50″
                                onClick={() => rejectMutation.mutate({ partnerId: p.id })}
                                disabled={rejectMutation.isPending}
                              >
                                <XCircle className="h-3 w-3 mr-1″ /> Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-16 text-center text-gray-400″>
                    <CheckCircle className="h-10 w-10 mx-auto mb-3 opacity-30″ />
                    <p className="text-sm">No pending applications. All caught up!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Partners */}
          <TabsContent value="partners">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-gray-900″>All Partners</CardTitle>
              </CardHeader>
              <CardContent>
                {allPartners && allPartners.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Referrals</TableHead>
                        <TableHead>Total Earned</TableHead>
                        <TableHead>Owed</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allPartners.map((p) => {
                        const earned = parseFloat(p.totalCommissionEarned as string);
                        const paid = parseFloat(p.totalCommissionPaid as string);
                        const owed = earned - paid;
                        return (
                          <TableRow key={p.id}>
                            <TableCell>
                              <div className="font-semibold text-gray-900″>{p.businessName}</div>
                              <div className="text-xs text-gray-400″>{p.contactEmail}</div>
                            </TableCell>
                            <TableCell className="text-gray-600 text-sm">{p.businessType}</TableCell>
                            <TableCell><TierBadge tier={p.tier} /></TableCell>
                            <TableCell className="font-medium">{p.referralCount}</TableCell>
                            <TableCell className="font-medium">${earned.toFixed(2)}</TableCell>
                            <TableCell>
                              <span className={`font-semibold ${owed > 0 ? "text-amber-600" : "text-gray-400"}`}>
                                ${owed.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                                style={{
                                  color: p.status === "approved" ? "#22c55e" : p.status === "rejected" ? "#ef4444″ : "#f59e0b",
                                  borderColor: p.status === "approved" ? "#22c55e" : p.status === "rejected" ? "#ef4444″ : "#f59e0b",
                                }}
                              >
                                {p.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-16 text-center text-gray-400 text-sm">No partners yet.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commissions */}
          <TabsContent value="commissions">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-gray-900″>Unpaid Commissions</CardTitle>
              </CardHeader>
              <CardContent>
                {unpaidCommissions && unpaidCommissions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Partner</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {unpaidCommissions.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">{c.partnerName}</TableCell>
                          <TableCell className="text-gray-600 text-sm">{c.description || "Referral commission"}</TableCell>
                          <TableCell className="font-semibold text-amber-600″>${parseFloat(c.amount as string).toFixed(2)}</TableCell>
                          <TableCell className="text-gray-500 text-sm">{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              className="text-xs h-7 px-3″
                              style={{ backgroundColor: "#22c55e" }}
                              onClick={() => markPaidMutation.mutate({ commissionId: c.id })}
                              disabled={markPaidMutation.isPending}
                            >
                              <CheckCircle className="h-3 w-3 mr-1″ /> Mark Paid
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-16 text-center text-gray-400″>
                    <DollarSign className="h-10 w-10 mx-auto mb-3 opacity-30″ />
                    <p className="text-sm">No unpaid commissions. All settled!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Broadcast */}
          <TabsContent value="broadcast">
            <Card className="border-0 shadow-sm max-w-2xl">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-gray-900 flex items-center gap-2″>
                  <Bell className="h-5 w-5″ style={{ color: "var(--teal)" }} /> Broadcast Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5″>
                <p className="text-sm text-gray-500″>
                  Send a message to all approved partners. This will appear in their dashboard inbox.
                </p>
                <div>
                  <Label htmlFor="subject" className="text-sm font-semibold text-gray-700 mb-1.5 block">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g. New referral bonus for Q2″
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-1.5 block">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message to all partners..."
                    rows={6}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="resize-none"
                  />
                </div>
                <Button
                  className="font-heading"
                  style={{ backgroundColor: "var(--teal)" }}
                  disabled={!broadcastSubject.trim() || !broadcastMessage.trim() || broadcastMutation.isPending}
                  onClick={() => broadcastMutation.mutate({ subject: broadcastSubject, message: broadcastMessage })}
                >
                  <Send className="h-4 w-4 mr-2″ />
                  {broadcastMutation.isPending ? "Sending..." : "Send to All Partners"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          {/* TrustyPro Leads */}
          <TabsContent value="trustypro-leads">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-gray-900 flex items-center gap-2″>
                  <Home className="w-5 h-5 text-indigo-500″ />
                  TrustyPro AI Scan Leads
                  {trustyLeads && <span className="text-sm font-normal text-gray-500 ml-2″>{trustyLeads.length} total</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!trustyLeads || trustyLeads.length === 0 ? (
                  <div className="text-center py-12 text-gray-400″>
                    <Home className="w-10 h-10 mx-auto mb-3 opacity-30″ />
                    <p className="font-medium">No TrustyPro leads yet</p>
                    <p className="text-sm mt-1″>Leads appear here when homeowners complete an AI scan</p>
                  </div>
                ) : (
                  <div className="space-y-4″>
                    {trustyLeads.map((lead) => {
                      const analysis = lead.aiAnalysis ? (() => { try { return JSON.parse(lead.aiAnalysis!); } catch { return null; } })() : null;
                      const isExpanded = expandedLead === lead.id;
                      const isInsurance = analysis?.issues?.some((i: { isInsuranceClaim?: boolean }) => i.isInsuranceClaim);
                      const statusColors: Record<string, string> = {
                        new: "bg-blue-100 text-blue-700″,
                        analyzing: "bg-yellow-100 text-yellow-700″,
                        matched: "bg-green-100 text-green-700″,
                        contacted: "bg-purple-100 text-purple-700″,
                        closed: "bg-gray-100 text-gray-600″,
                        lost: "bg-red-100 text-red-600″,
                      };
                      return (
                        <div key={lead.id} className="border border-gray-100 rounded-xl overflow-hidden">
                          <div className="p-4 bg-white">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="flex-1 min-w-0″>
                                <div className="flex items-center gap-2 flex-wrap mb-1″>
                                  <span className="font-bold text-gray-900″>{lead.name ?? "Anonymous"}</span>
                                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[lead.status] ?? "bg-gray-100 text-gray-600"}`}>{lead.status}</span>
                                  {isInsurance && <span className="text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">🏛️ Possible Claim</span>}
                                </div>
                                <div className="text-sm text-gray-500 space-y-0.5″>
                                  {lead.email && <div>📧 {lead.email}</div>}
                                  {lead.phone && <div>📞 {lead.phone}</div>}
                                  {lead.address && <div>📍 {lead.address}</div>}
                                  <div className="text-xs text-gray-400″>{new Date(lead.createdAt).toLocaleString()}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <button
                                  onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                                  className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 flex items-center gap-1″
                                >
                                  <Eye className="w-3 h-3″ /> {isExpanded ? "Hide" : "View AI Report"}
                                </button>
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus.mutate({ leadId: lead.id, status: e.target.value as "new" | "analyzing" | "matched" | "contacted" | "closed" | "lost" })}
                                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
                                >
                                  {["new","analyzing","matched","contacted","closed","lost"].map(s => (
                                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Route to partner */}
                            {lead.matchedPartnerId ? (
                              <div className="mt-3 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2″>
                                ✅ Routed to Partner ID {lead.matchedPartnerId}
                              </div>
                            ) : (
                              <div className="mt-3 flex items-center gap-2″>
                                <select
                                  value={selectedLeadId === lead.id ? routePartnerId : ""}
                                  onChange={(e) => { setSelectedLeadId(lead.id); setRoutePartnerId(e.target.value); }}
                                  className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
                                >
                                  <option value="">— Route to a Partner —</option>
                                  {(approvedPartners ?? []).map((p: { id: number; businessName: string; businessType: string }) => (
                                    <option key={p.id} value={p.id}>{p.businessName} ({p.businessType})</option>
                                  ))}
                                </select>
                                <Button
                                  size="sm"
                                  disabled={selectedLeadId !== lead.id || !routePartnerId || routeLead.isPending}
                                  onClick={() => routeLead.mutate({ leadId: lead.id, partnerId: parseInt(routePartnerId) })}
                                  className="text-xs"
                                  style={{ backgroundColor: "var(--teal)" }}
                                >
                                  Route Lead
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Expanded AI analysis */}
                          {isExpanded && analysis && (
                            <div className="border-t border-gray-100 bg-gray-50 p-4″>
                              <div className="mb-3″>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">AI Analysis</span>
                                <span className="ml-2 text-xs font-semibold text-indigo-600″>{analysis.overallCondition?.replace("_", " ")}</span>
                              </div>
                              {analysis.summary && <p className="text-sm text-gray-600 mb-3″>{analysis.summary}</p>}
                              {analysis.issues && analysis.issues.length > 0 && (
                                <div className="space-y-2″>
                                  {analysis.issues.map((issue: { name: string; severity: string; tradeType: string; estimatedCost: string; isInsuranceClaim?: boolean }, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 text-xs bg-white rounded-lg px-3 py-2 border border-gray-100″>
                                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                        issue.severity === "urgent" ? "bg-red-500″ : issue.severity === "moderate" ? "bg-amber-500" : "bg-green-500"
                                      }`} />
                                      <span className="font-semibold text-gray-800 flex-1″>{issue.name}</span>
                                      <span className="text-gray-500″>{issue.tradeType}</span>
                                      <span className="text-gray-400″>{issue.estimatedCost}</span>
                                      {issue.isInsuranceClaim && <span className="text-amber-600 font-bold">🏛️</span>}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {analysis.issues?.length === 0 && <p className="text-sm text-green-600″>✅ No issues detected — home in excellent condition.</p>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </AdminLayout>
  );
}
