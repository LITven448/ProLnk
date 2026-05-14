import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Crown, CheckCircle, XCircle, Search, Copy, Trash2, RefreshCw,
  User, Building2, Calendar, Tag,
} from "lucide-react";

const CHARTER_CODES = [
  "CHARTER-001", "CHARTER-002", "CHARTER-003", "CHARTER-004", "CHARTER-005",
  "CHARTER-006", "CHARTER-007", "CHARTER-008", "CHARTER-009", "CHARTER-010",
  "CHARTER-011", "CHARTER-012", "CHARTER-013", "CHARTER-014", "CHARTER-015",
  "CHARTER-016", "CHARTER-017", "CHARTER-018", "CHARTER-019", "CHARTER-020",
  "CHARTER-021", "CHARTER-022", "CHARTER-023", "CHARTER-024", "CHARTER-025",
];

export default function CharterTracking() {
  const [search, setSearch] = useState("");
  const [revokedCodes, setRevokedCodes] = useState<Set<string>>(new Set());
  const [confirmRevoke, setConfirmRevoke] = useState<string | null>(null);

  const pros = trpc.waitlistAdmin.getProWaitlist.useQuery({ status: "all", limit: 500 });

  const charterApplicants = (pros.data || []).filter(
    (p: any) => (p.tier || "").toLowerCase() === "charter"
  );

  type CharterRow = {
    code: string;
    usedBy: { id: number; name: string; email: string; businessType: string; date: string } | null;
    revoked: boolean;
  };

  const rows: CharterRow[] = CHARTER_CODES.map((code) => {
    const match = charterApplicants.find(
      (p: any) => (p.referralCode || "").toUpperCase() === code || (p.inviteCode || "").toUpperCase() === code
    );
    return {
      code,
      usedBy: match
        ? {
            id: match.id,
            name: `${match.firstName ?? ""} ${match.lastName ?? ""}`.trim() || match.businessName || "—",
            email: match.email ?? "",
            businessType: match.businessType ?? "—",
            date: match.createdAt ? new Date(match.createdAt).toLocaleDateString() : "—",
          }
        : null,
      revoked: revokedCodes.has(code),
    };
  });

  const filteredRows = rows.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.code.toLowerCase().includes(q) ||
      r.usedBy?.name.toLowerCase().includes(q) ||
      r.usedBy?.email.toLowerCase().includes(q) ||
      r.usedBy?.businessType.toLowerCase().includes(q)
    );
  });

  const usedCount = rows.filter((r) => r.usedBy !== null && !r.revoked).length;
  const revokedCount = revokedCodes.size;
  const availableCount = rows.filter((r) => r.usedBy === null && !r.revoked).length;

  function handleRevoke(code: string) {
    setRevokedCodes((prev) => new Set([...prev, code]));
    setConfirmRevoke(null);
    toast.success(`Code ${code} revoked — it can no longer be used`);
  }

  function handleRestore(code: string) {
    setRevokedCodes((prev) => {
      const next = new Set(prev);
      next.delete(code);
      return next;
    });
    toast.success(`Code ${code} restored`);
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Crown className="w-4 h-4 text-yellow-600" />
              </div>
              <h1 className="text-2xl font-black text-gray-900">Charter Code Tracking</h1>
            </div>
            <p className="text-sm text-gray-500 ml-11">All 25 Charter invite codes — usage, holders, and revocation controls</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Codes Used", value: usedCount, total: 25, color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200", icon: <CheckCircle className="w-4 h-4 text-yellow-500" /> },
              { label: "Available", value: availableCount, total: 25, color: "text-green-700", bg: "bg-green-50", border: "border-green-200", icon: <Tag className="w-4 h-4 text-green-500" /> },
              { label: "Revoked", value: revokedCount, total: 25, color: "text-red-700", bg: "bg-red-50", border: "border-red-200", icon: <XCircle className="w-4 h-4 text-red-500" /> },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} ${stat.border} border rounded-xl p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${stat.color}`}>{stat.label}</span>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-black ${stat.color}`}>
                  {stat.value}
                  <span className={`text-sm font-normal ml-1 opacity-60`}>/ {stat.total}</span>
                </div>
                <div className={`mt-2 h-1.5 rounded-full bg-black/10 overflow-hidden`}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(stat.value / stat.total) * 100}%`, background: stat.color.replace("text-", "").includes("yellow") ? "#D97706" : stat.color.includes("green") ? "#16a34a" : "#dc2626" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by code, name, email, or business type..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{filteredRows.length} codes</span>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredRows.map((row) => {
                const statusLabel = row.revoked ? "revoked" : row.usedBy ? "used" : "available";
                const statusStyle = row.revoked
                  ? "bg-red-50 text-red-700 border-red-200"
                  : row.usedBy
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-green-50 text-green-700 border-green-200";

                return (
                  <div key={row.code} className={`p-4 flex items-center gap-4 ${row.revoked ? "opacity-50" : "hover:bg-gray-50"}`}>
                    {/* Code */}
                    <div className="flex items-center gap-2 w-44 flex-shrink-0">
                      <Crown className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                      <span className="font-mono text-sm font-semibold text-gray-800">{row.code}</span>
                      <button
                        onClick={() => { navigator.clipboard.writeText(row.code); toast.success("Copied!"); }}
                        className="text-gray-300 hover:text-gray-600 transition-colors"
                        title="Copy code"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Status badge */}
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize w-20 text-center flex-shrink-0 ${statusStyle}`}>
                      {statusLabel}
                    </span>

                    {/* Holder info */}
                    <div className="flex-1 min-w-0">
                      {row.usedBy ? (
                        <div className="flex items-center gap-4 flex-wrap text-sm">
                          <span className="flex items-center gap-1.5 text-gray-900 font-medium">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            {row.usedBy.name}
                          </span>
                          <span className="text-gray-500 text-xs">{row.usedBy.email}</span>
                          <span className="flex items-center gap-1 text-gray-500 text-xs">
                            <Building2 className="w-3 h-3 text-gray-400" />
                            {row.usedBy.businessType}
                          </span>
                          <span className="flex items-center gap-1 text-gray-400 text-xs">
                            <Calendar className="w-3 h-3" />
                            {row.usedBy.date}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          {row.revoked ? "Code revoked — no longer usable" : "Not yet claimed"}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!row.revoked ? (
                        confirmRevoke === row.code ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-red-600 font-medium">Revoke?</span>
                            <button
                              onClick={() => handleRevoke(row.code)}
                              className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 font-semibold"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setConfirmRevoke(null)}
                              className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmRevoke(row.code)}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                            title="Revoke this code"
                          >
                            <Trash2 className="w-3 h-3" /> Revoke
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => handleRestore(row.code)}
                          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                          title="Restore this code"
                        >
                          <RefreshCw className="w-3 h-3" /> Restore
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Charter codes are matched against applicants' <code>referralCode</code> or <code>inviteCode</code> field.
            Revocations are session-local — connect to a persistent backend to save state.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
