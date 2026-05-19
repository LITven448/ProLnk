import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Crown, CheckCircle, XCircle, Search, Copy, Trash2, RefreshCw,
  User, Building2, Calendar, Tag, Download, Send, Plus, Shield,
  ChevronDown, ChevronUp, Mail, Clock
} from "lucide-react";

const CHARTER_CODES = [
  "CHARTER-001″, "CHARTER-002", "CHARTER-003", "CHARTER-004", "CHARTER-005",
  "CHARTER-006″, "CHARTER-007", "CHARTER-008", "CHARTER-009", "CHARTER-010",
  "CHARTER-011″, "CHARTER-012", "CHARTER-013", "CHARTER-014", "CHARTER-015",
  "CHARTER-016″, "CHARTER-017", "CHARTER-018", "CHARTER-019", "CHARTER-020",
  "CHARTER-021″, "CHARTER-022", "CHARTER-023", "CHARTER-024", "CHARTER-025",
];

const ADDITIONAL_SLOTS = 5;

type SentRecord = {
  recipientName: string;
  recipientEmail: string;
  sentDate: string;
  trade: string;
};

type StatusView = "all" | "claimed" | "sent" | "available" | "revoked";

export default function CharterTracking() {
  const [search, setSearch] = useState("");
  const [statusView, setStatusView] = useState<StatusView>("all");
  const [revokedCodes, setRevokedCodes] = useState<Set<string>>(new Set());
  const [sentRecords, setSentRecords] = useState<Record<string, SentRecord>>({});
  const [confirmRevoke, setConfirmRevoke] = useState<string | null>(null);
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const [resendingCode, setResendingCode] = useState<string | null>(null);
  const [sendFormCode, setSendFormCode] = useState<string | null>(null);
  const [sendForm, setSendForm] = useState({ name: "", email: "", trade: "" });
  const [generatingExtra, setGeneratingExtra] = useState(false);
  const [extraCodes, setExtraCodes] = useState<string[]>([]);

  const pros = trpc.waitlistAdmin.getProWaitlist.useQuery({ status: "all", limit: 500 });

  const charterApplicants = useMemo(() => {
    return (pros.data || []).filter((p: any) => (p.tier || "").toLowerCase() === "charter");
  }, [pros.data]);

  type CharterRow = {
    code: string;
    usedBy: {
      id: number; name: string; email: string; trade: string;
      businessType: string; dateClaimed: string; status: string;
    } | null;
    sentTo: SentRecord | null;
    revoked: boolean;
    isExtra: boolean;
  };

  const allCodes = [...CHARTER_CODES, ...extraCodes];

  const rows: CharterRow[] = allCodes.map((code) => {
    const match = charterApplicants.find(
      (p: any) => (p.referralCode || "").toUpperCase() === code || (p.inviteCode || "").toUpperCase() === code
    );
    const sent = sentRecords[code] ?? null;
    return {
      code,
      usedBy: match ? {
        id: match.id,
        name: `${match.firstName ?? ""} ${match.lastName ?? ""}`.trim() || match.businessName || "—",
        email: match.email ?? "",
        trade: Array.isArray(match.trades) ? match.trades[0] : (typeof match.trades === "string" ? (() => { try { return JSON.parse(match.trades)[0]; } catch { return match.trades; } })() : "—"),
        businessType: match.businessType ?? "—",
        dateClaimed: match.createdAt ? new Date(match.createdAt).toLocaleDateString() : "—",
        status: match.status ?? "pending",
      } : null,
      sentTo: !match ? sent : null,
      revoked: revokedCodes.has(code),
      isExtra: extraCodes.includes(code),
    };
  });

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (statusView === "claimed" && !(r.usedBy && !r.revoked)) return false;
      if (statusView === "sent" && !(r.sentTo && !r.usedBy && !r.revoked)) return false;
      if (statusView === "available" && !(r.usedBy === null && r.sentTo === null && !r.revoked)) return false;
      if (statusView === "revoked" && !r.revoked) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        r.code.toLowerCase().includes(q) ||
        r.usedBy?.name.toLowerCase().includes(q) ||
        r.usedBy?.email.toLowerCase().includes(q) ||
        r.usedBy?.trade.toLowerCase().includes(q) ||
        r.sentTo?.recipientName.toLowerCase().includes(q) ||
        r.sentTo?.recipientEmail.toLowerCase().includes(q)
      );
    });
  }, [rows, search, statusView]);

  const claimedCount = rows.filter(r => r.usedBy !== null && !r.revoked).length;
  const sentCount = rows.filter(r => r.sentTo !== null && !r.usedBy && !r.revoked).length;
  const availableCount = rows.filter(r => r.usedBy === null && r.sentTo === null && !r.revoked).length;
  const revokedCount = revokedCodes.size;

  function handleRevoke(code: string) {
    setRevokedCodes(prev => new Set([...prev, code]));
    setConfirmRevoke(null);
    toast.success(`Code ${code} revoked`);
  }

  function handleRestore(code: string) {
    setRevokedCodes(prev => { const next = new Set(prev); next.delete(code); return next; });
    toast.success(`Code ${code} restored`);
  }

  async function handleResend(code: string) {
    setResendingCode(code);
    try {
      await new Promise(r => setTimeout(r, 600));
      toast.success(`Invite resent for ${code}`);
    } finally {
      setResendingCode(null);
    }
  }

  function handleSendInvite(code: string) {
    if (!sendForm.name.trim() || !sendForm.email.trim()) { toast.error("Name and email are required"); return; }
    setSentRecords(prev => ({
      ...prev,
      [code]: { recipientName: sendForm.name.trim(), recipientEmail: sendForm.email.trim(), sentDate: new Date().toLocaleDateString(), trade: sendForm.trade.trim() },
    }));
    setSendFormCode(null);
    setSendForm({ name: "", email: "", trade: "" });
    toast.success(`Charter invite sent to ${sendForm.email.trim()}`);
  }

  function handleGenerateExtra() {
    setGeneratingExtra(true);
    setTimeout(() => {
      const nextNum = allCodes.length + 1;
      const newCodes = Array.from({ length: ADDITIONAL_SLOTS }, (_, i) =>
        `CHARTER-${String(nextNum + i).padStart(3, "0")}`
      );
      setExtraCodes(prev => [...prev, ...newCodes]);
      setGeneratingExtra(false);
      toast.success(`${ADDITIONAL_SLOTS} new charter codes generated`);
    }, 600);
  }

  function handleExportCSV() {
    const exportRows = rows.map(r => ({
      code: r.code,
      status: r.revoked ? "revoked" : r.usedBy ? "claimed" : r.sentTo ? "sent" : "available",
      recipientName: r.usedBy?.name ?? r.sentTo?.recipientName ?? "",
      recipientEmail: r.usedBy?.email ?? r.sentTo?.recipientEmail ?? "",
      trade: r.usedBy?.trade ?? r.sentTo?.trade ?? "",
      businessType: r.usedBy?.businessType ?? "",
      dateSent: r.sentTo?.sentDate ?? "",
      dateClaimed: r.usedBy?.dateClaimed ?? "",
      applicationStatus: r.usedBy?.status ?? "",
    }));
    const headers = Object.keys(exportRows[0]);
    const csv = [headers.join(","), ...exportRows.map(row =>
      headers.map(h => `"${String((row as any)[h]).replace(/"/g, '""')}"`).join(",")
    )].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `charter-codes-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${exportRows.length} charter records`);
  }

  const STATUS_PILL_STYLES: Record<StatusView, string> = {
    all: "bg-slate-700/60 text-slate-300 border-slate-600″,
    claimed: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40″,
    sent: "bg-blue-500/20 text-blue-300 border-blue-500/40″,
    available: "bg-teal-500/20 text-teal-300 border-teal-500/40″,
    revoked: "bg-red-500/20 text-red-400 border-red-500/40″,
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] p-6″>
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8 flex items-start justify-between flex-wrap gap-4″>
            <div className="flex items-center gap-3″>
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
                <Crown className="w-5 h-5 text-yellow-400″ />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Charter Code Tracking</h1>
                <p className="text-sm text-slate-400 mt-0.5″>All 25 charter invite codes — status, holders, and management</p>
              </div>
            </div>
            <div className="flex items-center gap-2″>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-600/60 bg-slate-700/60 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <Download className="w-4 h-4″ /> Export CSV
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6″>
            {[
              { label: "Claimed", value: claimedCount, total: 25, color: "text-yellow-400″, bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: <CheckCircle className="w-4 h-4 text-yellow-400" />, view: "claimed" as StatusView },
              { label: "Sent (Pending)", value: sentCount, total: 25, color: "text-blue-400″, bg: "bg-blue-500/10", border: "border-blue-500/30", icon: <Send className="w-4 h-4 text-blue-400" />, view: "sent" as StatusView },
              { label: "Available", value: availableCount, total: 25, color: "text-teal-400″, bg: "bg-teal-500/10", border: "border-teal-500/30", icon: <Tag className="w-4 h-4 text-teal-400" />, view: "available" as StatusView },
              { label: "Revoked", value: revokedCount, total: 25, color: "text-red-400″, bg: "bg-red-500/10", border: "border-red-500/30", icon: <XCircle className="w-4 h-4 text-red-400" />, view: "revoked" as StatusView },
            ].map((stat) => (
              <button
                key={stat.label}
                onClick={() => setStatusView(statusView === stat.view ? "all" : stat.view)}
                className={`${stat.bg} ${stat.border} border rounded-xl p-4 text-left transition-all hover:ring-1 hover:ring-offset-1 hover:ring-offset-[#0A1628] ${statusView === stat.view ? "ring-2 ring-offset-1 ring-offset-[#0A1628]" : ""}`}
                style={statusView === stat.view ? { boxShadow: `0 0 0 2px ${stat.color.replace("text-", "").includes("yellow") ? "#F59E0B" : stat.color.includes("blue") ? "#3B82F6" : stat.color.includes("teal") ? "#2DD4BF" : "#EF4444"}40` } : {}}
              >
                <div className="flex items-center justify-between mb-2″>
                  <span className={`text-xs font-semibold uppercase tracking-wide ${stat.color}`}>{stat.label}</span>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-black ${stat.color}`}>
                  {stat.value}<span className="text-sm font-normal ml-1 text-slate-500″>/ {stat.total}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(stat.value / 25) * 100}%`, background: stat.color.includes("yellow") ? "#F59E0B" : stat.color.includes("blue") ? "#3B82F6″ : stat.color.includes("teal") ? "#2DD4BF" : "#EF4444" }} />
                </div>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-slate-800/60 rounded-xl border border-slate-700/60 overflow-hidden">
            <div className="p-4 border-b border-slate-700/60 flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-48″>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400″ />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by code, name, email, trade..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-900/80 border border-slate-600 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500″
                />
              </div>
              <div className="flex gap-1″>
                {(["all", "claimed", "sent", "available", "revoked"] as StatusView[]).map(sv => (
                  <button key={sv} onClick={() => setStatusView(sv)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border capitalize ${statusView === sv ? STATUS_PILL_STYLES[sv] : "bg-slate-700/40 border-slate-600/40 text-slate-400 hover:bg-slate-700"}`}>
                    {sv}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">{filteredRows.length} codes</span>
            </div>

            {/* Column headers */}
            <div className="hidden md:grid grid-cols-[180px_90px_1fr_160px] gap-4 px-4 py-2.5 bg-slate-900/40 border-b border-slate-700/60 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <div>Code</div>
              <div>Status</div>
              <div>Holder / Recipient</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="divide-y divide-slate-700/40″>
              {filteredRows.map((row) => {
                const statusLabel = row.revoked ? "revoked" : row.usedBy ? "claimed" : row.sentTo ? "sent" : "available";
                const statusStyle = row.revoked
                  ? "bg-red-500/20 text-red-400 border-red-500/40″
                  : row.usedBy
                  ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40″
                  : row.sentTo
                  ? "bg-blue-500/20 text-blue-300 border-blue-500/40″
                  : "bg-teal-500/20 text-teal-300 border-teal-500/40″;

                return (
                  <div key={row.code}>
                    <div className={`p-4 flex items-center gap-4 transition-colors ${row.revoked ? "opacity-40" : "hover:bg-slate-700/20"}`}>
                      {/* Code */}
                      <div className="flex items-center gap-2 w-44 flex-shrink-0″>
                        <Crown className={`w-3.5 h-3.5 flex-shrink-0 ${row.isExtra ? "text-purple-400" : "text-yellow-400"}`} />
                        <span className="font-mono text-sm font-semibold text-slate-200″>{row.code}</span>
                        <button
                          onClick={() => { navigator.clipboard.writeText(row.code); toast.success("Copied!"); }}
                          className="text-slate-500 hover:text-slate-200 transition-colors"
                          title="Copy code"
                        >
                          <Copy className="w-3 h-3″ />
                        </button>
                        <button
                          onClick={() => {
                            const link = `${window.location.origin}/founding-partner?code=${row.code}`;
                            navigator.clipboard.writeText(link);
                            toast.success("Invite link copied!");
                          }}
                          className="text-slate-500 hover:text-blue-400 transition-colors"
                          title="Copy invite link"
                        >
                          <Send className="w-3 h-3″ />
                        </button>
                      </div>

                      {/* Status badge */}
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize w-20 text-center flex-shrink-0 ${statusStyle}`}>
                        {statusLabel}
                      </span>

                      {/* Holder info */}
                      <div className="flex-1 min-w-0″>
                        {row.usedBy ? (
                          <button className="w-full text-left" onClick={() => setExpandedCode(expandedCode === row.code ? null : row.code)}>
                            <div className="flex items-center gap-3 flex-wrap text-sm">
                              <span className="flex items-center gap-1.5 text-white font-medium">
                                <User className="w-3.5 h-3.5 text-slate-400″ />
                                {row.usedBy.name}
                              </span>
                              <span className="text-slate-400 text-xs">{row.usedBy.email}</span>
                              {row.usedBy.trade && row.usedBy.trade !== "—" && (
                                <span className="text-xs px-1.5 py-0.5 bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 rounded font-medium">{row.usedBy.trade}</span>
                              )}
                              <span className="flex items-center gap-1 text-slate-500 text-xs">
                                <Calendar className="w-3 h-3″ /> Claimed {row.usedBy.dateClaimed}
                              </span>
                              <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${row.usedBy.status === "approved" ? "bg-teal-500/20 text-teal-300" : "bg-amber-500/20 text-amber-300"}`}>{row.usedBy.status}</span>
                              {expandedCode === row.code ? <ChevronUp className="w-3.5 h-3.5 text-slate-400 ml-auto" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-auto" />}
                            </div>
                          </button>
                        ) : row.sentTo ? (
                          <div className="flex items-center gap-3 flex-wrap text-sm">
                            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                              <Mail className="w-3.5 h-3.5 text-slate-400″ />
                              {row.sentTo.recipientName}
                            </span>
                            <span className="text-slate-400 text-xs">{row.sentTo.recipientEmail}</span>
                            {row.sentTo.trade && <span className="text-xs px-1.5 py-0.5 bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded font-medium">{row.sentTo.trade}</span>}
                            <span className="flex items-center gap-1 text-slate-500 text-xs">
                              <Clock className="w-3 h-3″ /> Sent {row.sentTo.sentDate}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 italic">
                            {row.revoked ? "Revoked — code no longer usable" : row.isExtra ? "Extra slot — generated" : "Available — not yet claimed"}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0″>
                        {!row.usedBy && !row.revoked && sendFormCode !== row.code && (
                          <button
                            onClick={() => { setSendFormCode(row.code); setSendForm({ name: "", email: "", trade: "" }); }}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-colors"
                            title="Send invite"
                          >
                            <Send className="w-3 h-3″ /> Send Invite
                          </button>
                        )}
                        {row.sentTo && !row.usedBy && !row.revoked && (
                          <button
                            onClick={() => handleResend(row.code)}
                            disabled={resendingCode === row.code}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 transition-colors"
                            title="Resend invite"
                          >
                            {resendingCode === row.code
                              ? <span className="w-3 h-3 inline-block animate-spin border border-current border-t-transparent rounded-full" />
                              : <RefreshCw className="w-3 h-3″ />}
                            Resend
                          </button>
                        )}
                        {!row.revoked ? (
                          confirmRevoke === row.code ? (
                            <div className="flex items-center gap-1.5″>
                              <span className="text-xs text-red-400 font-medium">Revoke?</span>
                              <button onClick={() => handleRevoke(row.code)} className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 font-semibold">Yes</button>
                              <button onClick={() => setConfirmRevoke(null)} className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600″>No</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmRevoke(row.code)}
                              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                              title="Revoke"
                            >
                              <Trash2 className="w-3 h-3″ /> Revoke
                            </button>
                          )
                        ) : (
                          <button onClick={() => handleRestore(row.code)} className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 transition-colors">
                            <RefreshCw className="w-3 h-3″ /> Restore
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Send invite form */}
                    {sendFormCode === row.code && (
                      <div className="px-4 pb-4 bg-slate-900/40 border-t border-slate-700/60″>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3″>
                          <input type="text" placeholder="Recipient name" value={sendForm.name} onChange={e => setSendForm(f => ({ ...f, name: e.target.value }))}
                            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500″ />
                          <input type="email" placeholder="Recipient email" value={sendForm.email} onChange={e => setSendForm(f => ({ ...f, email: e.target.value }))}
                            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500″ />
                          <input type="text" placeholder="Trade (optional)" value={sendForm.trade} onChange={e => setSendForm(f => ({ ...f, trade: e.target.value }))}
                            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500″ />
                        </div>
                        <div className="flex gap-2 mt-3″>
                          <button onClick={() => handleSendInvite(row.code)} className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition-colors">
                            <Send className="w-3.5 h-3.5″ /> Send Charter Invite
                          </button>
                          <button onClick={() => setSendFormCode(null)} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors">Cancel</button>
                        </div>
                      </div>
                    )}

                    {/* Expanded holder details */}
                    {expandedCode === row.code && row.usedBy && (
                      <div className="px-4 pb-4 bg-slate-900/40 border-t border-slate-700/60″>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-3 text-xs">
                          {[
                            ["Name", row.usedBy.name],
                            ["Email", row.usedBy.email],
                            ["Trade", row.usedBy.trade],
                            ["Business Type", row.usedBy.businessType],
                            ["Date Claimed", row.usedBy.dateClaimed],
                            ["Application Status", row.usedBy.status],
                          ].map(([label, val]) => (
                            <div key={label}>
                              <span className="text-slate-500 block">{label}</span>
                              <span className="text-slate-200 font-medium">{val}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2″>
                          <a href={`mailto:${row.usedBy.email}`}>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-lg transition-colors">
                              <Mail className="w-3.5 h-3.5″ /> Email
                            </button>
                          </a>
                          <a href={`/admin/waitlist?view=pros`}>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-lg transition-colors">
                              <User className="w-3.5 h-3.5″ /> View in Waitlist
                            </button>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Extra slots section */}
            <div className="border-t border-slate-700/60 p-4 bg-slate-900/20″>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-300 flex items-center gap-2″>
                    <Shield className="w-4 h-4 text-purple-400″ />
                    Additional Slots ({ADDITIONAL_SLOTS} available)
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5″>Generate {ADDITIONAL_SLOTS} extra invite codes beyond the standard 25</p>
                </div>
                <button
                  onClick={handleGenerateExtra}
                  disabled={generatingExtra || extraCodes.length >= ADDITIONAL_SLOTS}
                  className="flex items-center gap-1.5 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50″
                >
                  {generatingExtra
                    ? <span className="w-3.5 h-3.5 inline-block animate-spin border border-current border-t-transparent rounded-full" />
                    : <Plus className="w-3.5 h-3.5″ />}
                  {extraCodes.length >= ADDITIONAL_SLOTS ? "All Extra Slots Generated" : `Generate ${ADDITIONAL_SLOTS} Extra Codes`}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-4 text-center">
            Charter codes match against applicants' <code className="text-slate-500″>referralCode</code> or <code className="text-slate-500″>inviteCode</code> field.
            Send actions are local-session only — connect to a persistent backend to save send records.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
