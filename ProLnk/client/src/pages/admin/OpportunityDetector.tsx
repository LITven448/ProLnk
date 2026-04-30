import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Zap, Eye, CheckCircle, XCircle, Clock, TrendingUp, AlertCircle, Filter } from "lucide-react";
import { useState } from "react";

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending:   { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Pending" },
  sent:      { bg: "bg-blue-500/20",   text: "text-blue-400",   label: "Sent" },
  accepted:  { bg: "bg-teal-500/20",   text: "text-teal-400",   label: "Accepted" },
  declined:  { bg: "bg-red-500/20",    text: "text-red-400",    label: "Declined" },
  converted: { bg: "bg-green-500/20",  text: "text-green-400",  label: "Converted" },
  expired:   { bg: "bg-slate-500/20",  text: "text-slate-400",  label: "Expired" },
};

const CATEGORY_COLORS = [
  "bg-teal-500/20 text-teal-300",
  "bg-purple-500/20 text-purple-300",
  "bg-blue-500/20 text-blue-300",
  "bg-orange-500/20 text-orange-300",
  "bg-pink-500/20 text-pink-300",
  "bg-yellow-500/20 text-yellow-300",
];

export default function OpportunityDetector() {
  const { data: opps, isLoading } = trpc.admin.getAllOpportunities.useQuery();
  const [filter, setFilter] = useState<string>("all");

  const filtered = (opps ?? []).filter((o) => filter === "all" || o.status === filter);

  // Stats
  const total = (opps ?? []).length;
  const converted = (opps ?? []).filter((o) => o.status === "converted").length;
  const pending = (opps ?? []).filter((o) => o.status === "pending" || o.status === "sent").length;
  const convRate = total ? Math.round((converted / total) * 100) : 0;

  // Category breakdown
  const typeCounts: Record<string, number> = {};
  (opps ?? []).forEach((o) => {
    const t = o.opportunityType.replace(/_/g, " ");
    typeCounts[t] = (typeCounts[t] ?? 0) + 1;
  });
  const topTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Opportunity Detector</h1>
            <p className="text-sm text-slate-400">All AI-detected cross-sell leads across the network</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Detected", value: total, icon: <Eye className="w-4 h-4" />, color: "text-purple-400", bg: "bg-purple-500/20" },
            { label: "Active / Pending", value: pending, icon: <Clock className="w-4 h-4" />, color: "text-yellow-400", bg: "bg-yellow-500/20" },
            { label: "Converted", value: converted, icon: <CheckCircle className="w-4 h-4" />, color: "text-green-400", bg: "bg-green-500/20" },
            { label: "Conversion Rate", value: `${convRate}%`, icon: <TrendingUp className="w-4 h-4" />, color: "text-teal-400", bg: "bg-teal-500/20" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.bg} ${s.color}`}>{s.icon}</div>
                <span className="text-xs text-slate-400">{s.label}</span>
              </div>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Top opportunity types */}
        {topTypes.length > 0 && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <p className="text-sm font-semibold text-white mb-4">Most Detected Opportunity Types</p>
            <div className="flex flex-wrap gap-2">
              {topTypes.map(([type, count], i) => (
                <span key={type} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]}`}>
                  {type} ({count})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Filter bar */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <div className="flex gap-1">
            {["all", "pending", "sent", "accepted", "converted", "declined"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filter === s ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Opportunity</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Source Partner</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Receiving Partner</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Address</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(6)].map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 bg-slate-700 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <p className="text-slate-500 text-sm">No opportunities found</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((opp) => {
                    const status = STATUS_COLORS[opp.status] ?? STATUS_COLORS.pending;
                    return (
                      <tr key={opp.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                              <Zap className="w-3.5 h-3.5 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium capitalize text-xs">{opp.opportunityType.replace(/_/g, " ")}</p>
                              <p className="text-slate-500 text-xs capitalize">{opp.opportunityCategory}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-300 text-xs">{opp.sourcePartnerName ?? "--"}</td>
                        <td className="px-4 py-3 text-slate-300 text-xs">{opp.receivingPartnerName ?? "--"}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs truncate max-w-[140px]">{opp.serviceAddress ?? "--"}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs">
                          {new Date(opp.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
