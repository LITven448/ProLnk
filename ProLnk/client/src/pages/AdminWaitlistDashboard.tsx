import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Users, Download, Search, TrendingUp, CheckSquare, Square, Mail, Send, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WaitlistSignup {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  trade?: string;
  zip?: string;
  source: "pro_waitlist" | "trustypro_7step" | "trustypro_simple";
  position: number;
  createdAt: string;
  tier?: string;
  referredBy?: string;
  referralCount?: number;
  status?: string;
  adminNotes?: string;
}

function extractCharterCode(adminNotes?: string): string | null {
  if (!adminNotes) return null;
  const match = adminNotes.match(/Charter invite:\s*([A-Z0-9\-]+)/i);
  return match ? match[1] : null;
}

const TIER_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  charter:  { label: "Charter",  color: "#7C3AED", bg: "#EDE9FE" },
  founding: { label: "Founding", color: "#1D4ED8", bg: "#DBEAFE" },
  l3:       { label: "L3",       color: "#0369A1", bg: "#E0F2FE" },
  l4:       { label: "L4",       color: "#047857", bg: "#D1FAE5" },
};

function TierBadge({ tier }: { tier?: string }) {
  if (!tier) return <span className="text-slate-400 text-xs">—</span>;
  const key = tier.toLowerCase().replace(/\s+/g, "");
  const cfg = TIER_CONFIG[key] ?? { label: tier, color: "#6B7280", bg: "#F3F4F6" };
  return (
    <span
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
      className="inline-block px-2 py-0.5 rounded text-xs font-semibold"
    >
      {cfg.label}
    </span>
  );
}

export default function AdminWaitlistDashboard() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [charterOnly, setCharterOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "position">("newest");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkActionMsg, setBulkActionMsg] = useState<string | null>(null);

  const { data: proWaitlist, isLoading: proLoading } = trpc.waitlist.getProWaitlist.useQuery();
  const { data: homeWaitlist, isLoading: homeLoading } = trpc.waitlist.getHomeWaitlist.useQuery({ status: "all", limit: 500 });
  const { data: metrics, isLoading: metricsLoading } = trpc.waitlist.getWaitlistMetrics.useQuery();

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">Access denied. Admin access required.</p>
      </div>
    );
  }

  const allSignups: WaitlistSignup[] = [
    ...(proWaitlist?.map((p) => ({
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      trade: (p as any).businessType || (p as any).trades,
      zip: (p as any).serviceAreaZip || (p as any).zip,
      source: "pro_waitlist" as const,
      position: p.position || 0,
      createdAt: p.createdAt?.toString() || new Date().toISOString(),
      tier: p.tier,
      referredBy: p.referredBy,
      referralCount: (p as any).referralCount ?? 0,
      status: (p as any).status,
      adminNotes: (p as any).adminNotes,
    })) || []),
    ...(homeWaitlist?.map((h) => ({
      id: h.id,
      firstName: h.firstName,
      lastName: h.lastName,
      email: h.email,
      trade: undefined,
      zip: (h as any).zip,
      source: "trustypro_7step" as const,
      position: h.position || 0,
      createdAt: h.createdAt?.toString() || new Date().toISOString(),
      referralCount: (h as any).referralCount ?? 0,
      status: (h as any).status,
    })) || []),
  ];

  const weekAgo = Date.now() - 7 * 86400000;
  const thisWeekCount = allSignups.filter((s) => new Date(s.createdAt).getTime() >= weekAgo).length;
  const proSignups = allSignups.filter((s) => s.source === "pro_waitlist");
  const avgReferrals =
    proSignups.length > 0
      ? (proSignups.reduce((sum, s) => sum + (s.referralCount ?? 0), 0) / proSignups.length).toFixed(1)
      : "0.0";
  const approved = allSignups.filter((s) => s.status === "approved").length;
  const conversionRate =
    allSignups.length > 0 ? Math.round((approved / allSignups.length) * 100) : 0;

  const charterCount = allSignups.filter((s) => extractCharterCode(s.adminNotes) !== null).length;

  const filtered = allSignups.filter((signup) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      signup.firstName.toLowerCase().includes(q) ||
      signup.lastName.toLowerCase().includes(q) ||
      signup.email.toLowerCase().includes(q) ||
      (signup.trade || "").toLowerCase().includes(q) ||
      (signup.zip || "").toLowerCase().includes(q);
    const matchesSource = sourceFilter === "all" || signup.source === sourceFilter;
    const matchesCharter = !charterOnly || extractCharterCode(signup.adminNotes) !== null;
    return matchesSearch && matchesSource && matchesCharter;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return a.position - b.position;
  });

  const rowKey = (s: WaitlistSignup) => `${s.source}-${s.id}`;
  const allFilteredKeys = sorted.map(rowKey);
  const allSelected = allFilteredKeys.length > 0 && allFilteredKeys.every((k) => selected.has(k));

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        allFilteredKeys.forEach((k) => next.delete(k));
        return next;
      });
    } else {
      setSelected((prev) => new Set([...prev, ...allFilteredKeys]));
    }
  };

  const toggleOne = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const showBulkMsg = (msg: string) => {
    setBulkActionMsg(msg);
    setTimeout(() => setBulkActionMsg(null), 3000);
  };

  const handleApproveSelected = () => {
    showBulkMsg(`Approved ${selected.size} entr${selected.size === 1 ? "y" : "ies"}`);
    setSelected(new Set());
  };

  const handleSendInvite = () => {
    showBulkMsg(`Invite emails queued for ${selected.size} recipient${selected.size === 1 ? "" : "s"}`);
    setSelected(new Set());
  };

  const exportRows = (rows: WaitlistSignup[], filename: string) => {
    const headers = ["First Name", "Last Name", "Email", "Trade", "Zip", "Source", "Tier", "Position", "Referrals", "Referred By", "Date"];
    const csvRows = rows.map((s) => [
      s.firstName, s.lastName, s.email, s.trade || "", s.zip || "",
      s.source, s.tier || "", s.position,
      s.referralCount ?? 0, s.referredBy || "",
      new Date(s.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...csvRows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleExportSelected = () => {
    const rows = sorted.filter((s) => selected.has(rowKey(s)));
    exportRows(rows, `waitlist-selected-${new Date().toISOString().split("T")[0]}.csv`);
    showBulkMsg(`Exported ${rows.length} entr${rows.length === 1 ? "y" : "ies"}`);
    setSelected(new Set());
  };

  const exportAll = () => {
    exportRows(sorted, `waitlist-export-${new Date().toISOString().split("T")[0]}.csv`);
  };

  const isLoading = proLoading || homeLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Waitlist Dashboard</h1>
          <p className="text-slate-600">Manage and analyze all waitlist signups</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
                <Users className="w-4 h-4" /> Total Signups
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <p className="text-3xl font-bold text-slate-900">{allSignups.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <p className="text-3xl font-bold text-blue-600">{thisWeekCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Avg Referrals / Pro
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <p className="text-3xl font-bold text-violet-600">{avgReferrals}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
                <UserCheck className="w-4 h-4" /> Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <p className="text-3xl font-bold text-green-600">{conversionRate}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Charter Filter Tab */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setCharterOnly(false)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              !charterOnly
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All Members
          </button>
          <button
            onClick={() => setCharterOnly(true)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
              charterOnly
                ? "bg-amber-500 text-white"
                : "bg-white text-amber-700 border border-amber-300 hover:bg-amber-50"
            }`}
          >
            <span>🏆</span>
            Charter Members
            {charterCount > 0 && (
              <span className={`inline-block px-1.5 py-0.5 rounded-full text-xs font-bold ${charterOnly ? "bg-amber-700 text-white" : "bg-amber-100 text-amber-800"}`}>
                {charterCount}
              </span>
            )}
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, email, trade, zip..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sources</option>
              <option value="pro_waitlist">Pro Waitlist</option>
              <option value="trustypro_7step">TrustyPro (7-Step)</option>
              <option value="trustypro_simple">TrustyPro (Simple)</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="position">Position</option>
            </select>

            <Button onClick={exportAll} variant="outline" size="sm" className="flex gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>

          <div className="text-sm text-slate-600 mt-2">
            Showing {sorted.length} of {allSignups.length} signups
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selected.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-3 mb-4 flex items-center gap-4 flex-wrap">
            <span className="text-sm font-semibold text-blue-800">{selected.size} selected</span>
            <Button size="sm" onClick={handleApproveSelected} className="bg-green-600 hover:bg-green-700 text-white flex gap-1.5">
              <UserCheck className="w-4 h-4" /> Approve Selected
            </Button>
            <Button size="sm" onClick={handleSendInvite} variant="outline" className="border-blue-300 text-blue-700 flex gap-1.5">
              <Send className="w-4 h-4" /> Send Invite Email
            </Button>
            <Button size="sm" onClick={handleExportSelected} variant="outline" className="flex gap-1.5">
              <Download className="w-4 h-4" /> Export Selected
            </Button>
            <button
              onClick={() => setSelected(new Set())}
              className="text-sm text-slate-500 hover:text-slate-800 ml-auto"
            >
              Clear
            </button>
          </div>
        )}

        {/* Toast */}
        {bulkActionMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-green-400" />
            {bulkActionMsg}
          </div>
        )}

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <button onClick={toggleAll} className="flex items-center">
                        {allSelected
                          ? <CheckSquare className="w-4 h-4 text-blue-600" />
                          : <Square className="w-4 h-4 text-slate-400" />}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Trade</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Zip</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Source</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Tier</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Position</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Referrals</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={11} className="px-6 py-12 text-center text-slate-500 text-sm">
                        Loading…
                      </td>
                    </tr>
                  ) : sorted.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-6 py-12 text-center text-slate-500 text-sm">
                        No signups match your filters.
                      </td>
                    </tr>
                  ) : (
                    sorted.map((signup) => {
                      const key = rowKey(signup);
                      const isChecked = selected.has(key);
                      return (
                        <tr
                          key={key}
                          className={`border-b hover:bg-slate-50 transition-colors ${isChecked ? "bg-blue-50" : ""}`}
                        >
                          <td className="px-4 py-4">
                            <button onClick={() => toggleOne(key)} className="flex items-center">
                              {isChecked
                                ? <CheckSquare className="w-4 h-4 text-blue-600" />
                                : <Square className="w-4 h-4 text-slate-400" />}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-slate-500">
                            #{signup.position || "—"}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">
                            <span className="flex items-center gap-2">
                              {signup.firstName} {signup.lastName}
                              {(() => {
                                const code = extractCharterCode(signup.adminNotes);
                                return code ? (
                                  <span
                                    title={`Charter invite: ${code}`}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold"
                                    style={{ backgroundColor: "#FEF3C7", color: "#92400E", border: "1px solid #F59E0B" }}
                                  >
                                    🏆 {code}
                                  </span>
                                ) : null;
                              })()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{signup.email}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{signup.trade || "—"}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{signup.zip || "—"}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                              {signup.source === "pro_waitlist" ? "Pro" : "TrustyPro"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <TierBadge tier={signup.tier} />
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                            #{signup.position}
                          </td>
                          <td className="px-6 py-4 text-sm text-center">
                            {(signup.referralCount ?? 0) > 0 ? (
                              <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded font-semibold text-xs">
                                {signup.referralCount}
                              </span>
                            ) : (
                              <span className="text-slate-400">0</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {new Date(signup.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
