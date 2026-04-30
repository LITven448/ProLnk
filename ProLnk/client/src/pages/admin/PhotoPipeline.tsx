import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Camera, Zap, CheckCircle2, Clock, XCircle, Eye,
  Filter, RefreshCw, TrendingUp, AlertTriangle, Loader2
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

type PipelineStatus = "pending" | "processing" | "completed" | "failed" | "skipped";

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Queued", color: "bg-gray-100 text-gray-600", icon: Clock },
  processing: { label: "Scanning...", color: "bg-blue-100 text-blue-700", icon: Zap },
  completed: { label: "Processed", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  skipped: { label: "No Opportunity", color: "bg-gray-100 text-gray-500", icon: CheckCircle2 },
  failed: { label: "Failed", color: "bg-red-100 text-red-700", icon: XCircle },
};

const sourceColor: Record<string, string> = {
  "jobber": "bg-blue-100 text-blue-700",
  "companycam": "bg-purple-100 text-purple-700",
  "housecall_pro": "bg-orange-100 text-orange-700",
  "service_titan": "bg-indigo-100 text-indigo-700",
  "field_app": "bg-teal-100 text-teal-700",
  "google_drive": "bg-yellow-100 text-yellow-700",
  "manual": "bg-gray-100 text-gray-600",
};

function formatRelativeTime(date: Date | string | null): string {
  if (!date) return "Unknown";
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  return `${Math.floor(diffHr / 24)} days ago`;
}

function parseAiResult(aiResult: string | null): { opportunitiesFound: number; confidence: number | null } {
  if (!aiResult) return { opportunitiesFound: 0, confidence: null };
  try {
    const parsed = JSON.parse(aiResult);
    const opps = parsed.opportunities ?? [];
    const avgConf = opps.length > 0
      ? Math.round(opps.reduce((s: number, o: { confidence: number }) => s + (o.confidence ?? 0), 0) / opps.length * 100)
      : null;
    return { opportunitiesFound: opps.length, confidence: avgConf };
  } catch {
    return { opportunitiesFound: 0, confidence: null };
  }
}

export default function PhotoPipeline() {
  const [filter, setFilter] = useState<string>("all");

  const { data: queue, isLoading, refetch } = trpc.admin.getPhotoQueue.useQuery({ limit: 100 });
  const { data: stats } = trpc.admin.getPhotoQueueStats.useQuery();

  const entries = queue ?? [];
  const filtered = filter === "all" ? entries : entries.filter((p) => p.status === filter);

  const counts = {
    all: entries.length,
    pending: entries.filter(p => p.status === "pending").length,
    processing: entries.filter(p => p.status === "processing").length,
    completed: entries.filter(p => p.status === "completed").length,
    failed: entries.filter(p => p.status === "failed").length,
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Camera className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Photo Pipeline Monitor</h1>
              <p className="text-gray-500 text-sm">Live view of every photo entering the AI intake pipeline</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2" onClick={() => { refetch(); toast.success("Refreshed"); }}>
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { key: "all", label: "Total", color: "text-gray-700" },
            { key: "pending", label: "Queued", color: "text-gray-500" },
            { key: "processing", label: "Scanning", color: "text-blue-600" },
            { key: "completed", label: "Processed", color: "text-green-600" },
            { key: "failed", label: "Failed", color: "text-red-600" },
          ].map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${filter === key ? "border-teal-500 bg-teal-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
            >
              <div className={`text-2xl font-bold ${color}`}>{counts[key as keyof typeof counts] ?? 0}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </button>
          ))}
        </div>

        {/* Pipeline Efficiency */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <p className="font-semibold text-gray-800 text-sm">Pipeline Efficiency Today</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-gray-800">{stats?.totalToday ?? 0}</p>
                <p className="text-xs text-gray-400">Photos In</p>
              </div>
              <div>
                <p className="text-xl font-bold text-green-600">{stats?.oppRate ?? 0}%</p>
                <p className="text-xs text-gray-400">Completion Rate</p>
              </div>
              <div>
                <p className="text-xl font-bold text-purple-600">${(stats?.estLeadValue ?? 0).toLocaleString()}</p>
                <p className="text-xs text-gray-400">Est. Lead Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Bar */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">Showing {filtered.length} entries</span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filtered.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Camera className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No photos in the pipeline yet</p>
              <p className="text-gray-400 text-sm mt-1">Photos will appear here as partners submit jobs via integrations or the field app.</p>
            </CardContent>
          </Card>
        )}

        {/* Photo Entries */}
        <div className="space-y-3">
          {filtered.map((entry) => {
            const statusKey = entry.status ?? "pending";
            const status = statusConfig[statusKey] ?? statusConfig.pending;
            const StatusIcon = status.icon;
            const { opportunitiesFound, confidence } = parseAiResult(entry.aiResult);
            const sourceKey = (entry.source ?? "manual").toLowerCase().replace(/\s+/g, "_");

            return (
              <Card key={entry.id} className={statusKey === "failed" ? "border-red-200" : statusKey === "processing" ? "border-blue-200" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Source + Status */}
                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                      <Badge className={`text-xs capitalize ${sourceColor[sourceKey] || "bg-gray-100 text-gray-600"}`}>
                        {(entry.source ?? "manual").replace(/_/g, " ")}
                      </Badge>
                      <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${status.color}`}>
                        <StatusIcon className={`h-3 w-3 ${statusKey === "processing" ? "animate-spin" : ""}`} />
                        {status.label}
                      </div>
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{entry.businessName ?? `Partner #${entry.partnerId}`}</p>
                          <p className="text-xs text-gray-500">{entry.serviceAddress ?? entry.serviceCity ?? "Address not recorded"}</p>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">{formatRelativeTime(entry.receivedAt)}</span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Camera className="h-3 w-3" />
                          {entry.externalJobName ?? "Job photo"}
                        </span>
                        {confidence !== null && (
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-purple-500" />
                            AI: {confidence}% confidence
                          </span>
                        )}
                      </div>

                      {statusKey === "completed" && opportunitiesFound > 0 && (
                        <div className="flex items-center gap-3 mt-2">
                          <Badge className="bg-green-100 text-green-700 text-xs">{opportunitiesFound} opportunities</Badge>
                        </div>
                      )}

                      {statusKey === "failed" && (
                        <div className="flex items-center gap-2 mt-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                          <span className="text-xs text-red-600">
                            {entry.errorMessage ?? "Processing failed -- will retry automatically"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* View Button */}
                    {statusKey === "completed" && opportunitiesFound > 0 && (
                      <Button size="sm" variant="outline" className="gap-1 text-xs h-7 shrink-0" onClick={() => toast.info(`Viewing opportunities for ${entry.businessName}`)}>
                        <Eye className="h-3 w-3" /> View
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
