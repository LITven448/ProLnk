import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Shield, Eye, Download, AlertCircle, Users, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";

export default function PhotoAccessLog() {
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 50;

  const { data: logData, isLoading, refetch } = trpc.admin.getPhotoAccessLog.useQuery({
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
  });

  const { data: consentStats } = trpc.admin.getConsentStats.useQuery();

  const items = logData?.items ?? [];
  const total = logData?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const ACTION_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    upload: { label: "Upload", color: "#059669", bg: "#D1FAE5" },
    view: { label: "View", color: "#0284C7", bg: "#E0F2FE" },
    download: { label: "Download", color: "#7C3AED", bg: "#EDE9FE" },
    analyze: { label: "AI Analyze", color: "#D97706", bg: "#FEF3C7" },
    delete: { label: "Delete", color: "#DC2626", bg: "#FEE2E2" },
  };

  return (
    <AdminLayout title="Photo Access Log" subtitle="Audit trail for all photo access events">
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
            <Shield className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Photo Access Log</h1>
            <p className="text-sm text-gray-500">Audit trail for all photo access events</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
          <RefreshCw className="w-4 h-4" /> Refresh
        </Button>
      </div>

      {/* Consent Stats */}
      {consentStats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">Total Partners</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{consentStats.total}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-500 font-medium">Consented</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{consentStats.consented}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-gray-500 font-medium">Pending Consent</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{consentStats.pending}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-xs text-gray-500 font-medium">Revoked</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{consentStats.revoked}</p>
          </div>
        </div>
      )}

      {/* Log Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-gray-800 text-sm">Access Events</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{total.toLocaleString()} total</span>
          </div>
          {total > 0 && (
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading audit log...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="font-semibold text-gray-700 mb-1">No access events yet</p>
            <p className="text-sm text-gray-400">Photo access events will appear here as partners upload and view photos.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Timestamp</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Accessor</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Job ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((item) => {
                    const actionCfg = ACTION_CONFIG[item.action] ?? { label: item.action, color: "#6B7280", bg: "#F3F4F6" };
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleString("en-US", {
                            month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
                          })}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{item.accessorName}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium capitalize">
                            {item.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: actionCfg.bg, color: actionCfg.color }}>
                            {actionCfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                          {item.jobId ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                          {item.ipAddress ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total.toLocaleString()}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </AdminLayout>
  );
}
