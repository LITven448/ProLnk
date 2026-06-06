import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Shield, AlertCircle, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";

type StatusFilter = "pending" | "all" | "processed";

export default function DeletionRequests() {
  const [status, setStatus] = useState<StatusFilter>("pending");

  const { data, isLoading, isError, refetch } = trpc.admin.getDeletionRequests.useQuery({ status });
  const markProcessed = trpc.admin.markDeletionRequestProcessed.useMutation({
    onSuccess: () => refetch(),
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  const FILTERS: { key: StatusFilter; label: string }[] = [
    { key: "pending", label: "Pending" },
    { key: "all", label: "All" },
    { key: "processed", label: "Processed" },
  ];

  return (
    <AdminLayout title="Data Deletion Requests" subtitle="CCPA/GDPR deletion request workqueue">
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
            <Shield className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Data Deletion Requests</h1>
            <p className="text-sm text-gray-500">CCPA/GDPR deletion request workqueue</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
          <RefreshCw className="w-4 h-4" /> Refresh
        </Button>
      </div>

      {/* Compliance Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          CCPA/GDPR requires processing within 45 days. Marking processed records that you have
          actioned the request — it does not delete data automatically.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatus(f.key)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              status === f.key
                ? "bg-slate-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Shield className="w-4 h-4 text-gray-400" />
          <span className="font-semibold text-gray-800 text-sm">Deletion Requests</span>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{total.toLocaleString()} total</span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading requests...</p>
          </div>
        ) : isError ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-10 h-10 text-red-200 mx-auto mb-3" />
            <p className="font-semibold text-gray-700 mb-1">Could not load requests</p>
            <p className="text-sm text-gray-400">Please refresh to try again.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="font-semibold text-gray-700 mb-1">No deletion requests</p>
            <p className="text-sm text-gray-400">Deletion requests will appear here as users submit them.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Reason</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Requested</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => {
                  const isPending = item.status !== "processed";
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{item.email}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-md">{item.reason ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {item.requestedAt
                          ? new Date(item.requestedAt).toLocaleString("en-US", {
                              month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit"
                            })
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                            <CheckCircle className="w-3 h-3" /> Processed
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isPending && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={markProcessed.isPending}
                            onClick={() => markProcessed.mutate({ id: item.id, status: "processed" })}
                          >
                            Mark processed
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
}
