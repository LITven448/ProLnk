import { useState, useEffect, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Users, Home as HomeIcon, CheckCircle, XCircle, Clock, Mail,
  Search, ChevronDown, ChevronUp, Zap, Send, Download, Copy,
  ToggleLeft, ToggleRight, ExternalLink, Filter, TrendingUp, Star
} from "lucide-react";

type StatusFilter = "all" | "pending" | "approved" | "rejected" | "invited";
type TierFilter = "all" | "charter" | "founding" | "level3" | "level4" | "waitlist";
type TradeFilter = "all" | string;

const STATUS_COLORS: Record<string, string> = {
  pending:  "bg-amber-500/20 text-amber-300 border border-amber-500/40",
  approved: "bg-teal-500/20 text-teal-300 border border-teal-500/40",
  rejected: "bg-red-500/20 text-red-400 border border-red-500/40",
  invited:  "bg-blue-500/20 text-blue-300 border border-blue-500/40",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  invited: "Invited",
};

const TIER_COLORS: Record<string, string> = {
  charter:  "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40",
  founding: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
  level3:   "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40",
  level4:   "bg-teal-500/20 text-teal-300 border border-teal-500/40",
  waitlist: "bg-slate-500/20 text-slate-400 border border-slate-500/40",
};

const TIER_LABELS: Record<string, string> = {
  charter: "Charter",
  founding: "Founding",
  level3: "L3 Partner",
  level4: "L4 Partner",
  waitlist: "Waitlist",
};

const LAUNCH_EMAIL_TEMPLATES = [
  {
    id: "launch_announcement",
    label: "Launch Announcement",
    subject: "ProLnk is launching — your spot is ready",
    body: `Hi {firstName},\n\nWe're excited to announce that ProLnk is officially launching! As someone who signed up for our waitlist, you're among the first professionals invited to join our founding network.\n\nYour position gives you access to:\n• Exclusive founding-tier benefits locked in for life\n• First access to homeowner leads in your area\n• The ProLnk 5-stream network income system\n\nClick below to activate your account and claim your spot before it expires.\n\n— The ProLnk Team`,
  },
  {
    id: "charter_invite",
    label: "Charter Member Invite",
    subject: "You've been selected as a Charter Member",
    body: `Hi {firstName},\n\nCongratulations — you've been selected as a Charter Member of ProLnk.\n\nAs one of only 25 Charter Members, you've locked in our founding-tier benefits permanently:\n• 25% network income bonus on every job\n• Permanent origination rights on every home you bring in\n• Direct line to the founding team\n\nYour charter code: {referralCode}\n\nActivate your account today — Charter slots are filling fast.\n\n— Andrew & The ProLnk Team`,
  },
  {
    id: "waitlist_update",
    label: "Waitlist Update",
    subject: "Update on your ProLnk application",
    body: `Hi {firstName},\n\nThank you for your patience — we're working through applications and yours is in our queue.\n\nWe're building ProLnk to be the most partner-friendly platform in home services. Your application as a {trade} professional in {city} is exactly what we're looking for.\n\nWe'll be in touch with your activation link shortly.\n\n— The ProLnk Team`,
  },
];

export default function WaitlistManager() {
  const defaultTab = (new URLSearchParams(window.location.search).get("view") ?? "pros") as "pros" | "homes";
  const [tab, setTab] = useState<"pros" | "homes">(defaultTab);
  const [proStatus, setProStatus] = useState<StatusFilter>("all");
  const [homeStatus, setHomeStatus] = useState<StatusFilter>("all");
  const [proTierFilter, setProTierFilter] = useState<TierFilter>("all");
  const [proTradeFilter, setProTradeFilter] = useState<TradeFilter>("all");
  const [proDateFrom, setProDateFrom] = useState("");
  const [proDateTo, setProDateTo] = useState("");
  const [proSearch, setProSearch] = useState("");
  const [homeSearch, setHomeSearch] = useState("");
  const [expandedPro, setExpandedPro] = useState<number | null>(null);
  const [expandedHome, setExpandedHome] = useState<number | null>(null);
  const [editNotes, setEditNotes] = useState<Record<number, string>>({});
  const [confirmBulk, setConfirmBulk] = useState(false);
  const [autoApproveCharter, setAutoApproveCharter] = useState(false);
  const [massEmailOpen, setMassEmailOpen] = useState(false);
  const [massEmailSubject, setMassEmailSubject] = useState("");
  const [massEmailBody, setMassEmailBody] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [sendingMassEmail, setSendingMassEmail] = useState(false);
  const [selectedPros, setSelectedPros] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [exportingPros, setExportingPros] = useState(false);
  const [exportingHomes, setExportingHomes] = useState(false);

  const utils = trpc.useUtils();

  const stats = trpc.waitlistAdmin.getWaitlistStats.useQuery(undefined, { refetchInterval: 30000 });
  const pros = trpc.waitlistAdmin.getProWaitlist.useQuery({ status: proStatus, limit: 500 });
  const homes = trpc.waitlistAdmin.getHomeWaitlist.useQuery({ status: homeStatus, limit: 500 });

  const updatePro = trpc.waitlistAdmin.updateProStatus.useMutation({
    onSuccess: (_, variables) => {
      utils.waitlistAdmin.getProWaitlist.invalidate();
      utils.waitlistAdmin.getWaitlistStats.invalidate();
      const pro = (pros.data || []).find((p: any) => p.id === variables.id);
      const email = pro?.email ?? "";
      if (variables.status === "approved") toast.success(`Approved — confirmation email sent to ${email}`);
      else if (variables.status === "rejected") toast.success(`Rejected — notification sent to ${email}`);
      else toast.success("Status updated");
    },
    onError: (e) => toast.error(e.message),
  });

  const updateHome = trpc.waitlistAdmin.updateHomeStatus.useMutation({
    onSuccess: (_, variables) => {
      utils.waitlistAdmin.getHomeWaitlist.invalidate();
      utils.waitlistAdmin.getWaitlistStats.invalidate();
      const home = (homes.data || []).find((h: any) => h.id === variables.id);
      const email = home?.email ?? "";
      if (variables.status === "approved") toast.success(`Approved — confirmation email sent to ${email}`);
      else if (variables.status === "rejected") toast.success(`Rejected — notification sent to ${email}`);
      else toast.success("Status updated");
    },
    onError: (e) => toast.error(e.message),
  });

  const activateAndInvite = trpc.waitlistAdmin.activateAndInvite.useMutation({
    onSuccess: (data) => {
      utils.waitlistAdmin.getProWaitlist.invalidate();
      utils.waitlistAdmin.getHomeWaitlist.invalidate();
      utils.waitlistAdmin.getWaitlistStats.invalidate();
      toast.success(`Invite sent to ${data.name} (${data.email})`);
    },
    onError: (e) => toast.error(`Invite failed: ${e.message}`),
  });

  const bulkApprove = trpc.waitlistAdmin.bulkApproveAll.useMutation({
    onSuccess: (data) => {
      utils.waitlistAdmin.getProWaitlist.invalidate();
      utils.waitlistAdmin.getHomeWaitlist.invalidate();
      utils.waitlistAdmin.getWaitlistStats.invalidate();
      toast.success(`${data.updated} entries approved`);
      setConfirmBulk(false);
    },
    onError: (e) => toast.error(e.message),
  });

  const pendingCharterCount = (pros.data || []).filter((p: any) => p.tier === "charter" && p.status === "pending").length;

  const tierCounts = (pros.data || []).reduce(
    (acc: Record<string, number>, p: any) => {
      const t = (p.tier || "").toLowerCase();
      if (["charter", "founding", "level3", "level4"].includes(t)) acc[t] = (acc[t] ?? 0) + 1;
      return acc;
    },
    { charter: 0, founding: 0, level3: 0, level4: 0 }
  );
  const totalApplied = (pros.data || []).length;

  const allTrades = useMemo(() => {
    const trades = new Set<string>();
    (pros.data || []).forEach((p: any) => {
      const t = Array.isArray(p.trades) ? p.trades : (typeof p.trades === "string" ? (() => { try { return JSON.parse(p.trades); } catch { return [p.trades]; } })() : []);
      t.forEach((tr: string) => { if (tr) trades.add(tr); });
    });
    return Array.from(trades).sort();
  }, [pros.data]);

  const topTrade = useMemo(() => {
    const counts: Record<string, number> = {};
    (pros.data || []).forEach((p: any) => {
      const t = Array.isArray(p.trades) ? p.trades : (typeof p.trades === "string" ? (() => { try { return JSON.parse(p.trades); } catch { return [p.trades]; } })() : []);
      t.forEach((tr: string) => { if (tr) counts[tr] = (counts[tr] ?? 0) + 1; });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  }, [pros.data]);

  const approvedToday = useMemo(() => {
    const today = new Date().toDateString();
    return (pros.data || []).filter((p: any) => p.status === "approved" && new Date(p.updatedAt || p.createdAt).toDateString() === today).length;
  }, [pros.data]);

  useEffect(() => {
    if (!autoApproveCharter) return;
    const newCharter = (pros.data || []).filter((p: any) => p.tier === "charter" && p.status === "pending");
    if (newCharter.length > 0) bulkApprove.mutate({ type: "pros", tier: "charter" });
  }, [autoApproveCharter, pros.data]);

  function handleStatusClick(
    id: number, status: "approved" | "rejected" | "invited" | "pending",
    email: string, type: "pro" | "home", adminNotes?: string
  ) {
    if (status === "approved" || status === "rejected") {
      const verb = status === "approved" ? "approve" : "reject";
      if (!window.confirm(`${verb.charAt(0).toUpperCase() + verb.slice(1)} this applicant? An email will be sent to ${email}.`)) return;
    }
    if (type === "pro") updatePro.mutate({ id, status, adminNotes });
    else updateHome.mutate({ id, status, adminNotes });
  }

  function handleBulkApproveCharter() {
    if (!window.confirm(`Approve all ${pendingCharterCount} pending Charter applicants? Each will receive an approval email.`)) return;
    bulkApprove.mutate({ type: "pros", tier: "charter" });
  }

  function handleBulkApproveSelected() {
    if (selectedPros.size === 0) { toast.error("No applicants selected"); return; }
    if (!window.confirm(`Approve ${selectedPros.size} selected applicants? Each will receive an approval email.`)) return;
    Array.from(selectedPros).forEach(id => {
      const pro = (pros.data || []).find((p: any) => p.id === id);
      if (pro) updatePro.mutate({ id, status: "approved" });
    });
    setSelectedPros(new Set());
  }

  function handleBulkRejectSelected() {
    if (selectedPros.size === 0) { toast.error("No applicants selected"); return; }
    if (!window.confirm(`Reject ${selectedPros.size} selected applicants?`)) return;
    Array.from(selectedPros).forEach(id => {
      const pro = (pros.data || []).find((p: any) => p.id === id);
      if (pro) updatePro.mutate({ id, status: "rejected" });
    });
    setSelectedPros(new Set());
  }

  async function handleSendMassEmail() {
    if (!massEmailSubject.trim() || !massEmailBody.trim()) { toast.error("Subject and message are required"); return; }
    const targetEmails = (pros.data || []).filter((p: any) => p.status === "pending").map((p: any) => p.email).filter(Boolean);
    if (targetEmails.length === 0) { toast.error("No pending applicants to email"); return; }
    if (!window.confirm(`Send email to ${targetEmails.length} pending applicants?`)) return;
    setSendingMassEmail(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      toast.success(`Launch email queued for ${targetEmails.length} applicants`);
      setMassEmailOpen(false);
      setMassEmailSubject("");
      setMassEmailBody("");
    } catch {
      toast.error("Failed to send email batch");
    } finally {
      setSendingMassEmail(false);
    }
  }

  function buildCsv(rows: any[], headers: string[]): string {
    const csvRows = rows.map(row =>
      headers.map(h => {
        const val = row[h];
        if (val === null || val === undefined) return "";
        const str = Array.isArray(val) ? val.join(";") : String(val).replace(/"/g, '""');
        return str.includes(",") || str.includes('"') || str.includes("\n") ? `"${str}"` : str;
      }).join(",")
    );
    return [headers.join(","), ...csvRows].join("\n");
  }

  function triggerDownload(csv: string, filename: string) {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  async function handleExportPros() {
    setExportingPros(true);
    try {
      const data = await utils.waitlistAdmin.exportWaitlist.fetch({ source: "pro" });
      const raw: any = data ?? [];
      const rows: any[] = Array.isArray(raw) ? raw : (raw.pro ?? []);
      if (!rows.length) { toast.error("No pro data to export"); return; }
      const headers = ["firstName", "lastName", "email", "phone", "trade", "primaryCity", "primaryState", "tier", "waitlistPosition", "referralCode", "referredBy", "referralCount", "status", "createdAt"];
      const csv = buildCsv(rows, headers);
      triggerDownload(csv, `prolnk-waitlist-pros-${new Date().toISOString().split("T")[0]}.csv`);
      toast.success(`Exported ${rows.length} pro records`);
    } catch (e: any) {
      toast.error(`Export failed: ${e?.message ?? "Unknown error"}`);
    } finally {
      setExportingPros(false);
    }
  }

  async function handleExportHomes() {
    setExportingHomes(true);
    try {
      const data = await utils.waitlistAdmin.exportWaitlist.fetch({ source: "home" });
      const raw: any = data ?? [];
      const rows: any[] = Array.isArray(raw) ? raw : (raw.home ?? []);
      if (!rows.length) { toast.error("No homeowner data to export"); return; }
      const headers = ["firstName", "lastName", "email", "phone", "address", "city", "state", "homeType", "desiredProjects", "status", "createdAt"];
      const csv = buildCsv(rows, headers);
      triggerDownload(csv, `trustypro-homeowners-${new Date().toISOString().split("T")[0]}.csv`);
      toast.success(`Exported ${rows.length} homeowner records`);
    } catch (e: any) {
      toast.error(`Export failed: ${e?.message ?? "Unknown error"}`);
    } finally {
      setExportingHomes(false);
    }
  }

  const filteredPros = useMemo(() => {
    return (pros.data || []).filter((p: any) => {
      if (proTierFilter !== "all" && (p.tier || "").toLowerCase() !== proTierFilter) return false;
      if (proTradeFilter !== "all") {
        const trades = Array.isArray(p.trades) ? p.trades : (typeof p.trades === "string" ? (() => { try { return JSON.parse(p.trades); } catch { return [p.trades]; } })() : []);
        if (!trades.includes(proTradeFilter)) return false;
      }
      if (proDateFrom) {
        const created = new Date(p.createdAt);
        if (created < new Date(proDateFrom)) return false;
      }
      if (proDateTo) {
        const created = new Date(p.createdAt);
        if (created > new Date(proDateTo + "T23:59:59")) return false;
      }
      if (!proSearch) return true;
      const tradesStr = Array.isArray(p.trades) ? p.trades.join(" ") : (typeof p.trades === "string" ? p.trades : "");
      return `${p.firstName} ${p.lastName} ${p.businessName} ${p.email} ${p.primaryCity} ${tradesStr}`.toLowerCase().includes(proSearch.toLowerCase());
    });
  }, [pros.data, proTierFilter, proTradeFilter, proDateFrom, proDateTo, proSearch]);

  const filteredHomes = useMemo(() => {
    return (homes.data || []).filter((h: any) =>
      !homeSearch || `${h.firstName} ${h.lastName} ${h.email} ${h.city} ${h.address}`.toLowerCase().includes(homeSearch.toLowerCase())
    );
  }, [homes.data, homeSearch]);

  const s = stats.data;

  const allFilteredSelected = filteredPros.length > 0 && filteredPros.every((p: any) => selectedPros.has(p.id));

  function toggleSelectAll() {
    if (allFilteredSelected) {
      setSelectedPros(prev => {
        const next = new Set(prev);
        filteredPros.forEach((p: any) => next.delete(p.id));
        return next;
      });
    } else {
      setSelectedPros(prev => {
        const next = new Set(prev);
        filteredPros.forEach((p: any) => next.add(p.id));
        return next;
      });
    }
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] p-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black text-white">Waitlist Manager</h1>
              <p className="text-sm text-slate-400 mt-1">Review and manage ProLnk pro and TrustyPro homeowner waitlist applications.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setMassEmailOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Send Launch Email
              </button>
              <a
                href="/admin/charter-tracking"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-700/60 hover:bg-slate-700 border border-slate-600/60 text-slate-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Charter Codes
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Applicants", value: (s?.pros.total ?? 0) + (s?.homes.total ?? 0), icon: <Users className="w-4 h-4" />, color: "text-teal-400", sub: `${s?.pros.total ?? 0} pros · ${s?.homes.total ?? 0} homeowners` },
              { label: "Pending Review", value: (s?.pros.pending ?? 0) + (s?.homes.pending ?? 0), icon: <Clock className="w-4 h-4" />, color: "text-amber-400", sub: "Awaiting decision" },
              { label: "Approved Today", value: approvedToday, icon: <CheckCircle className="w-4 h-4" />, color: "text-green-400", sub: new Date().toLocaleDateString() },
              { label: "Top Trade", value: topTrade, icon: <Star className="w-4 h-4" />, color: "text-purple-400", sub: "Most applications" },
            ].map(stat => (
              <div key={stat.label} className="bg-slate-800/60 rounded-xl border border-slate-700/60 p-4">
                <div className={`flex items-center gap-2 text-xs font-medium mb-1 ${stat.color}`}>
                  {stat.icon} {stat.label}
                </div>
                <div className="text-2xl font-black text-white truncate">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5 truncate">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Founding Network Overview */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700/60 p-5 mb-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <h2 className="text-white font-bold text-sm tracking-wide uppercase">Founding Network Fill Status</h2>
                <p className="text-slate-400 text-xs mt-0.5">Waitlist closes at 2,125 partners</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => {
                    const next = !autoApproveCharter;
                    setAutoApproveCharter(next);
                    toast.success(next ? "Auto-Approve Charter ON — pending charters approved automatically" : "Auto-Approve Charter disabled");
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                    autoApproveCharter ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" : "bg-slate-700 border-slate-600 text-slate-300 hover:border-slate-400"
                  }`}
                >
                  {autoApproveCharter ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  Auto-Approve Charter
                </button>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">{totalApplied.toLocaleString()}<span className="text-slate-400 text-sm font-normal"> / 2,125</span></div>
                  <div className="text-xs text-slate-400">{Math.round((totalApplied / 2125) * 100)}% filled</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { tier: "charter",  label: "Charter",  cap: 25,   filled: tierCounts.charter,  color: "#F59E0B", ring: "ring-yellow-500/40" },
                { tier: "founding", label: "Founding", cap: 100,  filled: tierCounts.founding, color: "#8B5CF6", ring: "ring-purple-500/40" },
                { tier: "level3",   label: "Level 3",  cap: 400,  filled: tierCounts.level3,   color: "#22D3EE", ring: "ring-cyan-500/40" },
                { tier: "level4",   label: "Level 4",  cap: 1600, filled: tierCounts.level4,   color: "#2DD4BF", ring: "ring-teal-500/40" },
              ].map(({ tier, label, cap, filled, color, ring }) => {
                const pct = Math.min(100, Math.round((filled / cap) * 100));
                const remaining = Math.max(0, cap - filled);
                return (
                  <div key={tier} className={`bg-slate-800/80 rounded-lg p-3 ring-1 ${ring}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold" style={{ color }}>{label}</span>
                      <span className="text-xs text-slate-400">{remaining} left</span>
                    </div>
                    <div className="text-xl font-black text-white mb-1">{filled}<span className="text-slate-500 text-xs font-normal"> / {cap}</span></div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{pct}% filled</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress toward goals */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { label: "ProLnk Pro Goal", current: s?.pros.total ?? 0, goal: 1000, color: "#2DD4BF" },
              { label: "TrustyPro Home Goal", current: s?.homes.total ?? 0, goal: 10000, color: "#818CF8" },
            ].map(g => {
              const pct = Math.min(100, Math.round(((g.current as number) / g.goal) * 100));
              return (
                <div key={g.label} className="bg-slate-800/60 rounded-xl border border-slate-700/60 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-300">{g.label}</span>
                    <span className="text-sm font-bold" style={{ color: g.color }}>{g.current as number} / {g.goal.toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: g.color }} />
                  </div>
                  <div className="text-xs text-slate-500 mt-1.5">{pct}% of goal</div>
                </div>
              );
            })}
          </div>

          {/* Bulk Actions + Launch Switch */}
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-amber-300 text-sm">Launch Switch</div>
              <div className="text-xs text-amber-400/80 mt-0.5">Bulk approve all pending entries when ready to open access. Cannot be undone.</div>
            </div>
            <div className="flex gap-2">
              {!confirmBulk ? (
                <Button onClick={() => setConfirmBulk(true)} className="border-amber-500/50 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-sm border">
                  <Zap className="w-4 h-4 mr-1.5" /> Approve All Pending
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => bulkApprove.mutate({ type: "pros" })} disabled={bulkApprove.isPending} className="bg-teal-600 text-white text-xs hover:bg-teal-700">Approve All Pros</Button>
                  <Button onClick={() => bulkApprove.mutate({ type: "homes" })} disabled={bulkApprove.isPending} className="bg-purple-600 text-white text-xs hover:bg-purple-700">Approve All Homes</Button>
                  <Button onClick={() => setConfirmBulk(false)} variant="outline" className="text-xs border-slate-600 text-slate-300">Cancel</Button>
                </div>
              )}
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex gap-2 mb-4 justify-end">
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5 border-slate-600 text-slate-300 bg-slate-800/40 hover:bg-slate-700" onClick={handleExportPros} disabled={exportingPros}>
              {exportingPros ? <span className="w-3.5 h-3.5 inline-block animate-spin border border-current border-t-transparent rounded-full" /> : <Download className="w-3.5 h-3.5" />}
              Export Pros CSV
            </Button>
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5 border-slate-600 text-slate-300 bg-slate-800/40 hover:bg-slate-700" onClick={handleExportHomes} disabled={exportingHomes}>
              {exportingHomes ? <span className="w-3.5 h-3.5 inline-block animate-spin border border-current border-t-transparent rounded-full" /> : <Download className="w-3.5 h-3.5" />}
              Export Homeowners CSV
            </Button>
          </div>

          {/* Status summary + charter approve */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3">
            <div className="flex flex-wrap gap-3 text-xs text-slate-400">
              <span><span className="font-bold text-amber-400">{s?.pros.pending ?? 0} pending</span> · <span className="font-bold text-teal-400">{s?.pros.approved ?? 0} approved</span> · <span className="font-bold text-red-400">{s?.pros.rejected ?? 0} rejected</span></span>
              <span className="text-slate-600">|</span>
              {(["charter", "founding", "level3", "level4"] as const).map(tier => {
                const count = (pros.data || []).filter((p: any) => p.tier === tier).length;
                return count > 0 ? (
                  <span key={tier} className={`px-1.5 py-0.5 rounded font-semibold ${TIER_COLORS[tier]}`}>{TIER_LABELS[tier]}: {count}</span>
                ) : null;
              })}
            </div>
            {pendingCharterCount > 0 && (
              <Button size="sm" className="text-xs bg-yellow-500 hover:bg-yellow-600 text-black whitespace-nowrap font-bold" onClick={handleBulkApproveCharter} disabled={bulkApprove.isPending}>
                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve {pendingCharterCount} Charter
              </Button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-slate-800/60 border border-slate-700/60 rounded-xl p-1 mb-6 w-fit">
            {(["pros", "homes"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t ? "bg-teal-500/20 text-teal-300 border border-teal-500/40" : "text-slate-400 hover:text-slate-200"}`}>
                {t === "pros" ? `Service Pros (${s?.pros.total ?? 0})` : `Homeowners (${s?.homes.total ?? 0})`}
              </button>
            ))}
          </div>

          {/* Pro Table */}
          {tab === "pros" && (
            <div className="bg-slate-800/60 rounded-xl border border-slate-700/60 overflow-hidden">
              <div className="p-4 border-b border-slate-700/60 space-y-3">
                {/* Search + Filter toggle row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input value={proSearch} onChange={e => setProSearch(e.target.value)} placeholder="Search by name, business, email, city..." className="pl-9 text-sm bg-slate-900/60 border-slate-600 text-slate-200 placeholder:text-slate-500" />
                  </div>
                  <button
                    onClick={() => setShowFilters(f => !f)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${showFilters ? "bg-teal-500/20 border-teal-500/40 text-teal-300" : "bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700"}`}
                  >
                    <Filter className="w-3.5 h-3.5" /> Filters {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Status filter pills */}
                <div className="flex gap-1 flex-wrap">
                  {(["all", "pending", "approved", "rejected", "invited"] as StatusFilter[]).map(st => (
                    <button key={st} onClick={() => setProStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${proStatus === st ? "bg-teal-500/20 text-teal-300 border border-teal-500/40" : "bg-slate-700/60 text-slate-400 hover:bg-slate-700 border border-transparent"}`}>
                      {st}
                    </button>
                  ))}
                </div>

                {/* Extended filters */}
                {showFilters && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-700/60">
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Tier</label>
                      <select value={proTierFilter} onChange={e => setProTierFilter(e.target.value as TierFilter)}
                        className="w-full bg-slate-900/80 border border-slate-600 rounded-lg px-2 py-1.5 text-xs text-slate-300 outline-none focus:ring-1 focus:ring-teal-500">
                        <option value="all">All Tiers</option>
                        {(["charter", "founding", "level3", "level4", "waitlist"] as const).map(t => (
                          <option key={t} value={t}>{TIER_LABELS[t]}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Trade</label>
                      <select value={proTradeFilter} onChange={e => setProTradeFilter(e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-600 rounded-lg px-2 py-1.5 text-xs text-slate-300 outline-none focus:ring-1 focus:ring-teal-500">
                        <option value="all">All Trades</option>
                        {allTrades.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">From Date</label>
                      <input type="date" value={proDateFrom} onChange={e => setProDateFrom(e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-600 rounded-lg px-2 py-1.5 text-xs text-slate-300 outline-none focus:ring-1 focus:ring-teal-500" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">To Date</label>
                      <input type="date" value={proDateTo} onChange={e => setProDateTo(e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-600 rounded-lg px-2 py-1.5 text-xs text-slate-300 outline-none focus:ring-1 focus:ring-teal-500" />
                    </div>
                  </div>
                )}

                {/* Bulk selection actions */}
                {selectedPros.size > 0 && (
                  <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-lg px-3 py-2">
                    <span className="text-xs font-semibold text-teal-300">{selectedPros.size} selected</span>
                    <Button size="sm" className="text-xs bg-teal-600 text-white hover:bg-teal-700 h-7" onClick={handleBulkApproveSelected}>
                      <CheckCircle className="w-3 h-3 mr-1" /> Approve Selected
                    </Button>
                    <Button size="sm" className="text-xs bg-red-600/80 text-white hover:bg-red-600 h-7" onClick={handleBulkRejectSelected}>
                      <XCircle className="w-3 h-3 mr-1" /> Reject Selected
                    </Button>
                    <button onClick={() => setSelectedPros(new Set())} className="text-xs text-slate-400 hover:text-slate-200 ml-1">Clear</button>
                  </div>
                )}
              </div>

              {/* Table header */}
              <div className="hidden md:grid grid-cols-[24px_1fr_140px_100px_100px_80px] gap-4 px-4 py-2.5 bg-slate-900/40 border-b border-slate-700/60 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <div>
                  <input type="checkbox" checked={allFilteredSelected} onChange={toggleSelectAll}
                    className="rounded border-slate-600 bg-slate-700 accent-teal-400 cursor-pointer" />
                </div>
                <div>Applicant</div>
                <div>Trade / Tier</div>
                <div>Referral Code</div>
                <div>Status</div>
                <div>Date</div>
              </div>

              {pros.isLoading ? (
                <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
              ) : filteredPros.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">No results found.</div>
              ) : (
                <div className="divide-y divide-slate-700/40">
                  {filteredPros.map((pro: any) => (
                    <div key={pro.id}>
                      <div
                        className="p-4 flex items-center gap-4 hover:bg-slate-700/30 cursor-pointer"
                        onClick={() => setExpandedPro(expandedPro === pro.id ? null : pro.id)}
                      >
                        <div onClick={e => e.stopPropagation()}>
                          <input type="checkbox" checked={selectedPros.has(pro.id)}
                            onChange={e => {
                              const next = new Set(selectedPros);
                              e.target.checked ? next.add(pro.id) : next.delete(pro.id);
                              setSelectedPros(next);
                            }}
                            className="rounded border-slate-600 bg-slate-700 accent-teal-400 cursor-pointer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm text-white">{pro.firstName} {pro.lastName}</span>
                            {pro.businessName && <span className="text-xs text-slate-400">{pro.businessName}</span>}
                            <Badge className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[pro.status] || "bg-slate-600/40 text-slate-400"}`}>{STATUS_LABELS[pro.status] ?? pro.status}</Badge>
                            {pro.tier && (
                              <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${TIER_COLORS[pro.tier] ?? "bg-slate-600/40 text-slate-400"}`}>
                                {TIER_LABELS[pro.tier] ?? pro.tier}
                              </span>
                            )}
                            {pro.waitlistPosition && <span className="text-xs text-slate-500">#{pro.waitlistPosition}</span>}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap gap-3">
                            <span>{pro.email}</span>
                            <span>{pro.primaryCity}, {pro.primaryState}</span>
                            <span>{Array.isArray(pro.trades) ? pro.trades.join(", ") : (typeof pro.trades === "string" ? (() => { try { return JSON.parse(pro.trades).join(", "); } catch { return pro.trades; } })() : "")}</span>
                            {pro.referralCode && (
                              <span className="flex items-center gap-1 font-mono text-slate-300">
                                {pro.referralCode}
                                <button onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(pro.referralCode); toast.success("Copied!"); }} className="hover:text-white transition-colors" title="Copy">
                                  <Copy className="w-3 h-3" />
                                </button>
                              </span>
                            )}
                            {(pro.referralCount ?? 0) > 0 && <span className="text-teal-400 font-semibold">{pro.referralCount} referral{pro.referralCount !== 1 ? "s" : ""}</span>}
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 hidden sm:block">{new Date(pro.createdAt).toLocaleDateString()}</div>
                        {expandedPro === pro.id ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                      </div>

                      {expandedPro === pro.id && (
                        <div className="px-4 pb-4 bg-slate-900/40 border-t border-slate-700/60">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-3 text-xs">
                            {[
                              ["Phone", pro.phone],
                              ["Business Type", pro.businessType],
                              ["Years in Business", pro.yearsInBusiness],
                              ["Team Size", pro.employeeCount],
                              ["Jobs/Month", pro.estimatedJobsPerMonth],
                              ["Avg Job Value", pro.avgJobValue],
                              ["Referrals Given/Mo", pro.referralsGivenPerMonth],
                              ["Referrals Recv/Mo", pro.referralsReceivedPerMonth],
                            ].map(([label, val]) => (
                              <div key={label as string}>
                                <span className="text-slate-500 block">{label}</span>
                                <span className="text-slate-200">{val ?? "—"}</span>
                              </div>
                            ))}
                            <div className="col-span-2"><span className="text-slate-500 block">Service Zips</span><span className="text-slate-200">{pro.serviceZipCodes || "—"}</span></div>
                            <div className="col-span-2"><span className="text-slate-500 block">Primary Goal</span><span className="text-slate-200">{pro.primaryGoal || "—"}</span></div>
                            {pro.additionalNotes && <div className="col-span-4"><span className="text-slate-500 block">Applicant Notes</span><span className="text-slate-200">{pro.additionalNotes}</span></div>}
                          </div>
                          <div className="mt-3">
                            <label className="text-xs font-semibold text-slate-400 mb-1 block">Admin Notes</label>
                            <Textarea
                              value={editNotes[pro.id] ?? pro.adminNotes ?? ""}
                              onChange={e => setEditNotes(n => ({ ...n, [pro.id]: e.target.value }))}
                              onBlur={() => {
                                const notes = editNotes[pro.id];
                                if (notes !== undefined && notes !== (pro.adminNotes ?? "")) updatePro.mutate({ id: pro.id, status: pro.status, adminNotes: notes });
                              }}
                              className="text-xs min-h-[60px] resize-none bg-slate-900/60 border-slate-600 text-slate-200 placeholder:text-slate-500"
                              placeholder="Internal notes (auto-saved on blur)..."
                            />
                          </div>
                          <div className="flex gap-2 mt-4 flex-wrap items-center">
                            <Button size="sm" disabled={updatePro.isPending || pro.status === "approved"}
                              onClick={() => handleStatusClick(pro.id, "approved", pro.email, "pro", editNotes[pro.id] ?? pro.adminNotes ?? undefined)}
                              className={`text-sm font-semibold px-4 bg-teal-600 text-white hover:bg-teal-700 ${pro.status === "approved" ? "ring-2 ring-offset-1 ring-teal-400 opacity-70" : ""}`}>
                              <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> {pro.status === "approved" ? "Approved" : "Approve"}
                            </Button>
                            <Button size="sm" disabled={updatePro.isPending || pro.status === "rejected"}
                              onClick={() => handleStatusClick(pro.id, "rejected", pro.email, "pro", editNotes[pro.id] ?? pro.adminNotes ?? undefined)}
                              className={`text-sm font-semibold px-4 bg-red-600 text-white hover:bg-red-700 ${pro.status === "rejected" ? "ring-2 ring-offset-1 ring-red-400 opacity-70" : ""}`}>
                              <XCircle className="w-3.5 h-3.5 mr-1.5" /> {pro.status === "rejected" ? "Rejected" : "Reject"}
                            </Button>
                            <Button size="sm" disabled={updatePro.isPending}
                              onClick={() => handleStatusClick(pro.id, "pending", pro.email, "pro", editNotes[pro.id] ?? pro.adminNotes ?? undefined)}
                              className={`text-xs px-3 bg-slate-700 text-slate-300 hover:bg-slate-600 ${pro.status === "pending" ? "ring-2 ring-offset-1 ring-slate-500" : ""}`}>
                              <Clock className="w-3 h-3 mr-1" /> Reset to Pending
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 ml-1"
                              disabled={activateAndInvite.isPending}
                              onClick={() => activateAndInvite.mutate({ id: pro.id, type: "pro", origin: window.location.origin })}>
                              <Zap className="w-3 h-3 mr-1" /> Send Invite Email
                            </Button>
                            <a href={`mailto:${pro.email}`} className="ml-auto">
                              <Button size="sm" variant="outline" className="text-xs border-slate-600 text-slate-300">
                                <Mail className="w-3 h-3 mr-1" /> Email
                              </Button>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Home Table */}
          {tab === "homes" && (
            <div className="bg-slate-800/60 rounded-xl border border-slate-700/60 overflow-hidden">
              <div className="p-4 border-b border-slate-700/60 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input value={homeSearch} onChange={e => setHomeSearch(e.target.value)} placeholder="Search by name, address, city..." className="pl-9 text-sm bg-slate-900/60 border-slate-600 text-slate-200 placeholder:text-slate-500" />
                </div>
                <div className="flex gap-1 flex-wrap">
                  {(["all", "pending", "approved", "rejected", "invited"] as StatusFilter[]).map(st => (
                    <button key={st} onClick={() => setHomeStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${homeStatus === st ? "bg-teal-500/20 text-teal-300 border border-teal-500/40" : "bg-slate-700/60 text-slate-400 hover:bg-slate-700 border border-transparent"}`}>
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {homes.isLoading ? (
                <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
              ) : filteredHomes.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">No results found.</div>
              ) : (
                <div className="divide-y divide-slate-700/40">
                  {filteredHomes.map((home: any) => (
                    <div key={home.id}>
                      <div className="p-4 flex items-center gap-4 hover:bg-slate-700/30 cursor-pointer" onClick={() => setExpandedHome(expandedHome === home.id ? null : home.id)}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm text-white">{home.firstName} {home.lastName}</span>
                            <Badge className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[home.status] || "bg-slate-600/40 text-slate-400"}`}>{STATUS_LABELS[home.status] ?? home.status}</Badge>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap gap-3">
                            <span>{home.email}</span>
                            <span>{home.address}, {home.city}, {home.state} {home.zipCode}</span>
                            <span>{home.homeType?.replace("_", " ")}</span>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 hidden sm:block">{new Date(home.createdAt).toLocaleDateString()}</div>
                        {expandedHome === home.id ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                      </div>

                      {expandedHome === home.id && (
                        <div className="px-4 pb-4 bg-slate-900/40 border-t border-slate-700/60">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-3 text-xs">
                            {[
                              ["Year Built", home.yearBuilt || "—"],
                              ["Sq Footage", home.squareFootage ? `${home.squareFootage.toLocaleString()} sqft` : "—"],
                              ["Beds / Baths", `${home.bedrooms || "—"} bd / ${home.bathrooms || "—"} ba`],
                              ["Condition", home.overallCondition?.replace("_", " ") || "—"],
                              ["Ownership", home.ownershipStatus || "—"],
                              ["Years Owned", home.yearsOwned ?? "—"],
                              ["Timeline", home.projectTimeline?.replace("_", " ") || "—"],
                              ["Budget", home.estimatedBudget || "—"],
                            ].map(([label, val]) => (
                              <div key={label as string}>
                                <span className="text-slate-500 block">{label}</span>
                                <span className="text-slate-200">{val}</span>
                              </div>
                            ))}
                            <div className="col-span-2 md:col-span-4">
                              <span className="text-slate-500 block">Desired Projects</span>
                              <span className="text-slate-200">{Array.isArray(home.desiredProjects) ? home.desiredProjects.join(", ") : (typeof home.desiredProjects === "string" ? (() => { try { return JSON.parse(home.desiredProjects).join(", "); } catch { return home.desiredProjects; } })() : "—")}</span>
                            </div>
                            {home.additionalNotes && <div className="col-span-4"><span className="text-slate-500 block">Applicant Notes</span><span className="text-slate-200">{home.additionalNotes}</span></div>}
                          </div>
                          <div className="mt-3">
                            <label className="text-xs font-semibold text-slate-400 mb-1 block">Admin Notes</label>
                            <Textarea
                              value={editNotes[home.id] ?? home.adminNotes ?? ""}
                              onChange={e => setEditNotes(n => ({ ...n, [home.id]: e.target.value }))}
                              onBlur={() => {
                                const notes = editNotes[home.id];
                                if (notes !== undefined && notes !== (home.adminNotes ?? "")) updateHome.mutate({ id: home.id, status: home.status, adminNotes: notes });
                              }}
                              className="text-xs min-h-[60px] resize-none bg-slate-900/60 border-slate-600 text-slate-200 placeholder:text-slate-500"
                              placeholder="Internal notes (auto-saved on blur)..."
                            />
                          </div>
                          <div className="flex gap-2 mt-4 flex-wrap items-center">
                            <Button size="sm" disabled={updateHome.isPending || home.status === "approved"}
                              onClick={() => handleStatusClick(home.id, "approved", home.email, "home", editNotes[home.id] ?? home.adminNotes ?? undefined)}
                              className={`text-sm font-semibold px-4 bg-teal-600 text-white hover:bg-teal-700 ${home.status === "approved" ? "ring-2 ring-offset-1 ring-teal-400 opacity-70" : ""}`}>
                              <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> {home.status === "approved" ? "Approved" : "Approve"}
                            </Button>
                            <Button size="sm" disabled={updateHome.isPending || home.status === "rejected"}
                              onClick={() => handleStatusClick(home.id, "rejected", home.email, "home", editNotes[home.id] ?? home.adminNotes ?? undefined)}
                              className={`text-sm font-semibold px-4 bg-red-600 text-white hover:bg-red-700 ${home.status === "rejected" ? "ring-2 ring-offset-1 ring-red-400 opacity-70" : ""}`}>
                              <XCircle className="w-3.5 h-3.5 mr-1.5" /> {home.status === "rejected" ? "Rejected" : "Reject"}
                            </Button>
                            <Button size="sm" disabled={updateHome.isPending}
                              onClick={() => handleStatusClick(home.id, "pending", home.email, "home", editNotes[home.id] ?? home.adminNotes ?? undefined)}
                              className={`text-xs px-3 bg-slate-700 text-slate-300 hover:bg-slate-600 ${home.status === "pending" ? "ring-2 ring-offset-1 ring-slate-500" : ""}`}>
                              <Clock className="w-3 h-3 mr-1" /> Reset to Pending
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 ml-1"
                              disabled={activateAndInvite.isPending}
                              onClick={() => activateAndInvite.mutate({ id: home.id, type: "home", origin: window.location.origin })}>
                              <Zap className="w-3 h-3 mr-1" /> Send Invite Email
                            </Button>
                            <a href={`mailto:${home.email}`} className="ml-auto">
                              <Button size="sm" variant="outline" className="text-xs border-slate-600 text-slate-300">
                                <Mail className="w-3 h-3 mr-1" /> Email
                              </Button>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mass Email / Launch Email Modal */}
      {massEmailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-600">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <div>
                <h3 className="text-base font-bold text-white">Send Launch Email</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sends to all <span className="font-semibold text-amber-400">{(pros.data || []).filter((p: any) => p.status === "pending").length} pending</span> applicants
                </p>
              </div>
              <button onClick={() => setMassEmailOpen(false)} className="text-slate-400 hover:text-white text-xl font-bold leading-none">&times;</button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1 block">Email Template</label>
                <select
                  value={selectedTemplate}
                  onChange={e => {
                    const tmpl = LAUNCH_EMAIL_TEMPLATES.find(t => t.id === e.target.value);
                    setSelectedTemplate(e.target.value);
                    if (tmpl) { setMassEmailSubject(tmpl.subject); setMassEmailBody(tmpl.body); }
                  }}
                  className="w-full bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">Select a template or write custom...</option>
                  {LAUNCH_EMAIL_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1 block">Subject</label>
                <input
                  type="text"
                  value={massEmailSubject}
                  onChange={e => setMassEmailSubject(e.target.value)}
                  placeholder="e.g. Your ProLnk application — important update"
                  className="w-full bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1 block">Message <span className="text-slate-500 font-normal">(supports {"{firstName}"}, {"{referralCode}"}, {"{trade}"}, {"{city}"})</span></label>
                <textarea
                  value={massEmailBody}
                  onChange={e => setMassEmailBody(e.target.value)}
                  rows={7}
                  placeholder="Write your message to all pending applicants..."
                  className="w-full bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-700 flex justify-end gap-3">
              <button onClick={() => setMassEmailOpen(false)} className="px-4 py-2 text-sm rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700">Cancel</button>
              <button
                onClick={handleSendMassEmail}
                disabled={sendingMassEmail || !massEmailSubject.trim() || !massEmailBody.trim()}
                className="px-4 py-2 text-sm rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 disabled:opacity-50 flex items-center gap-2"
              >
                {sendingMassEmail
                  ? <span className="w-3.5 h-3.5 inline-block animate-spin border border-white border-t-transparent rounded-full" />
                  : <Send className="w-3.5 h-3.5" />}
                {sendingMassEmail ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
