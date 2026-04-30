import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Webhook, CheckCircle2, XCircle, AlertCircle, Clock, DollarSign } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  received:          { label: "Received",          color: "bg-blue-100 text-blue-700",   icon: <Clock className="w-3 h-3" /> },
  matched:           { label: "Matched",            color: "bg-yellow-100 text-yellow-700", icon: <CheckCircle2 className="w-3 h-3" /> },
  unmatched:         { label: "Unmatched",          color: "bg-gray-100 text-gray-600",   icon: <XCircle className="w-3 h-3" /> },
  commission_closed: { label: "Commission Closed",  color: "bg-green-100 text-green-700", icon: <DollarSign className="w-3 h-3" /> },
  error:             { label: "Error",              color: "bg-red-100 text-red-700",     icon: <AlertCircle className="w-3 h-3" /> },
};

const SOURCE_LABELS: Record<string, string> = {
  housecall_pro:  "Housecall Pro",
  jobber:         "Jobber",
  workiz:         "Workiz",
  service_fusion: "Service Fusion",
  fieldedge:      "FieldEdge",
  other:          "Other",
};

export default function FsmWebhookLog() {
  const [statusFilter, setStatusFilter] = useState<"all" | "received" | "matched" | "unmatched" | "commission_closed" | "error">("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "housecall_pro" | "jobber" | "workiz" | "service_fusion" | "fieldedge" | "other">("all");

  const { data: stats, refetch: refetchStats } = trpc.admin.getFsmWebhookStats.useQuery();
  const { data: events, isLoading, refetch } = trpc.admin.getFsmWebhookEvents.useQuery({
    limit: 200,
    status: statusFilter,
    source: sourceFilter,
  });

  const handleRefresh = () => { refetch(); refetchStats(); };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Webhook className="w-6 h-6 text-blue-600" /> FSM Webhook Events
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Inbound job completion events from partner FSM platforms -- commission protection log
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Total Events",        value: stats?.total ?? 0,            color: "text-gray-900" },
            { label: "Matched",             value: stats?.matched ?? 0,          color: "text-yellow-600" },
            { label: "Unmatched",           value: stats?.unmatched ?? 0,        color: "text-gray-500" },
            { label: "Commissions Closed",  value: stats?.commissionsClosed ?? 0, color: "text-green-600" },
            { label: "Errors",              value: stats?.errors ?? 0,           color: "text-red-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
            <SelectTrigger className="w-44 h-8 text-xs">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="matched">Matched</SelectItem>
              <SelectItem value="unmatched">Unmatched</SelectItem>
              <SelectItem value="commission_closed">Commission Closed</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={(v) => setSourceFilter(v as typeof sourceFilter)}>
            <SelectTrigger className="w-44 h-8 text-xs">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="housecall_pro">Housecall Pro</SelectItem>
              <SelectItem value="jobber">Jobber</SelectItem>
              <SelectItem value="workiz">Workiz</SelectItem>
              <SelectItem value="service_fusion">Service Fusion</SelectItem>
              <SelectItem value="fieldedge">FieldEdge</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs text-gray-400 ml-auto">{events?.length ?? 0} events shown</span>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">Loading events...</div>
          ) : !events?.length ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Webhook className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-500 font-medium">No webhook events yet</p>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                Events will appear here when partner FSM platforms send job completion webhooks to{" "}
                <code className="bg-gray-100 px-1 rounded text-xs">/api/webhooks/fsm/&#123;platform&#125;</code>
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Received", "Platform", "Event Type", "Lead Source Tag", "Partner", "Job Value", "Status", "Error"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left font-semibold text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {events.map((e: any) => {
                    const cfg = STATUS_CONFIG[e.status] ?? STATUS_CONFIG.received;
                    return (
                      <tr key={e.id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">
                          {new Date(e.receivedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                        </td>
                        <td className="px-4 py-2.5 font-medium text-gray-800">
                          {SOURCE_LABELS[e.source] ?? e.source}
                        </td>
                        <td className="px-4 py-2.5 text-gray-600 font-mono">{e.eventType}</td>
                        <td className="px-4 py-2.5">
                          {e.leadSourceTag ? (
                            <code className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono">{e.leadSourceTag}</code>
                          ) : (
                            <span className="text-gray-300">--</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-gray-700">
                          {e.partnerName ?? (e.matchedPartnerId ? `#${e.matchedPartnerId}` : <span className="text-gray-300">--</span>)}
                        </td>
                        <td className="px-4 py-2.5 text-gray-700">
                          {e.jobValue ? `$${Number(e.jobValue).toLocaleString()}` : <span className="text-gray-300">--</span>}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-xs ${cfg.color}`}>
                            {cfg.icon} {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-red-500 max-w-xs truncate">
                          {e.errorMessage ?? <span className="text-gray-300">--</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Integration Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">FSM Webhook Endpoints</h3>
          <div className="space-y-1">
            {[
              ["Housecall Pro", "/api/webhooks/fsm/housecall-pro"],
              ["Jobber",        "/api/webhooks/fsm/jobber"],
              ["Workiz",        "/api/webhooks/fsm/workiz"],
              ["Service Fusion","/api/webhooks/fsm/service-fusion"],
              ["FieldEdge",     "/api/webhooks/fsm/fieldedge"],
            ].map(([name, path]) => (
              <div key={name} className="flex items-center gap-3 text-xs">
                <span className="text-blue-700 font-medium w-32">{name}</span>
                <code className="bg-white border border-blue-200 text-blue-800 px-2 py-0.5 rounded font-mono">
                  {window.location.origin}{path}
                </code>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-600 mt-2">
            Partners must set their Lead Source to <strong>ProLnk-[PartnerID]</strong> in their FSM for automatic commission matching.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
