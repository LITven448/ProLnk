import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Camera, Zap, DollarSign, AlertTriangle, CheckCircle, Clock,
  XCircle, RefreshCw, Database, TrendingDown, Activity, Filter,
  Upload, Eye, Shield, Layers
} from "lucide-react";
import { toast } from "sonner";

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    pending:    { label: "Pending",    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    processing: { label: "Processing", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    completed:  { label: "Completed",  className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    failed:     { label: "Failed",     className: "bg-red-500/20 text-red-400 border-red-500/30" },
    suppressed: { label: "Suppressed", className: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
  };
  const s = map[status] ?? { label: status, className: "bg-slate-500/20 text-slate-400" };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${s.className}`}>
      {s.label}
    </span>
  );
}

// ─── Stale Flag Badge ─────────────────────────────────────────────────────────

function StaleFlagBadge({ flag }: { flag: string }) {
  const labels: Record<string, string> = {
    historical_ingestion: "Historical",
    photo_over_36_months: "36mo+",
    photo_over_24_months: "24mo+",
    photo_over_12_months: "12mo+",
    third_party_integration: "3rd Party",
    rate_limited_per_address: "Rate Limited",
    issue_likely_resolved: "Issue Resolved",
  };
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
      {labels[flag] ?? flag}
    </span>
  );
}

// ─── Tier Pipeline Indicator ──────────────────────────────────────────────────

function TierPipeline({ tier1, tier2, tier3 }: { tier1?: boolean; tier2?: boolean; tier3?: boolean }) {
  const dot = (active: boolean | undefined, label: string, cost: string) => (
    <div className="flex flex-col items-center gap-0.5">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
        active === true ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" :
        active === false ? "bg-red-500/10 border-red-500/30 text-red-400/50" :
        "bg-slate-700 border-slate-600 text-slate-500"
      }`}>
        {label}
      </div>
      <span className="text-[9px] text-slate-500">{cost}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-1">
      {dot(tier1, "T1", "$0.002")}
      <div className={`w-4 h-px ${tier1 ? "bg-emerald-500/50" : "bg-slate-700"}`} />
      {dot(tier1 ? tier2 : undefined, "T2", "$0.003")}
      <div className={`w-4 h-px ${tier2 ? "bg-emerald-500/50" : "bg-slate-700"}`} />
      {dot(tier2 ? tier3 : undefined, "T3", "$0.020")}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PhotoQueue() {
  const [feedFilter, setFeedFilter] = useState<"all" | "pending" | "processing" | "completed" | "failed" | "suppressed">("all");

  const { data: queueStatus, refetch: refetchStatus, isLoading: statusLoading } =
    trpc.photoQueue.getQueueStatus.useQuery(undefined, { refetchInterval: 10000 });

  const { data: feedItems, refetch: refetchFeed, isLoading: feedLoading } =
    trpc.photoQueue.getQueueFeed.useQuery({ limit: 50, status: feedFilter }, { refetchInterval: 10000 });

  const retryFailed = trpc.photoQueue.retryFailed.useMutation({
    onSuccess: (data) => {
      toast.success(`Retried ${data.retriedCount} failed items`);
      refetchStatus();
      refetchFeed();
    },
    onError: () => toast.error("Failed to retry items"),
  });

  const queue = queueStatus?.queue;
  const totals = queueStatus?.totals;
  const totalQueued = (queue?.pending ?? 0) + (queue?.processing ?? 0) + (queue?.completed ?? 0) + (queue?.failed ?? 0) + (queue?.suppressed ?? 0);
  const completionRate = totalQueued > 0 ? ((queue?.completed ?? 0) / totalQueued) * 100 : 0;
  const savingsPct = totals && totals.totalCost > 0
    ? Math.round((totals.estimatedSavings / (totals.estimatedSavings + totals.totalCost)) * 100)
    : 0;

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Camera className="w-6 h-6 text-blue-400" />
            Photo Queue & AI Pipeline
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Tiered waterfall analysis — Tier 1 triage → Tier 2 classification → Tier 3 deep analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { refetchStatus(); refetchFeed(); }}
            className="border-slate-600 text-slate-300"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
          {(queue?.failed ?? 0) > 0 && (
            <Button
              size="sm"
              onClick={() => retryFailed.mutate()}
              disabled={retryFailed.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Retry {queue?.failed} Failed
            </Button>
          )}
        </div>
      </div>

      {/* Queue Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Pending",    value: queue?.pending ?? 0,    icon: Clock,        color: "text-yellow-400" },
          { label: "Processing", value: queue?.processing ?? 0, icon: Activity,     color: "text-blue-400" },
          { label: "Completed",  value: queue?.completed ?? 0,  icon: CheckCircle,  color: "text-emerald-400" },
          { label: "Failed",     value: queue?.failed ?? 0,     icon: XCircle,      color: "text-red-400" },
          { label: "Suppressed", value: queue?.suppressed ?? 0, icon: Shield,       color: "text-slate-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">{label}</span>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className={`text-2xl font-bold ${color}`}>{value.toLocaleString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Stats + Cost Savings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Completion Rate */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Pipeline Throughput
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Completion Rate</span>
                <span>{completionRate.toFixed(0)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold text-slate-200">{totalQueued.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500">Total</div>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-400">{totals?.offersGenerated?.toLocaleString() ?? 0}</div>
                <div className="text-[10px] text-slate-500">Offers</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-400">{queueStatus?.recentBatches?.reduce((s: number, b: any) => s + (b.homeHealthUpdates ?? 0), 0)?.toLocaleString() ?? 0}</div>
                <div className="text-[10px] text-slate-500">HHV Updates</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Savings */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Cost Savings vs. GPT-4o Only
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold text-emerald-400">{savingsPct}%</div>
              <div className="text-sm text-slate-400 mb-1">saved</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-700/50 rounded p-2">
                <div className="text-slate-400">Actual Cost</div>
                <div className="text-white font-semibold">${(totals?.totalCost ?? 0).toFixed(4)}</div>
              </div>
              <div className="bg-slate-700/50 rounded p-2">
                <div className="text-slate-400">Saved</div>
                <div className="text-emerald-400 font-semibold">${(totals?.estimatedSavings ?? 0).toFixed(4)}</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-500">
              Waterfall filters ~70% of photos before reaching GPT-4o
            </div>
          </CardContent>
        </Card>

        {/* Tier Breakdown */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Tier Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { tier: "Tier 1", label: "Quality Triage", model: "Heuristic + Vision", cost: "$0.0015/photo", color: "text-slate-300" },
              { tier: "Tier 2", label: "Fast Classification", model: "GPT-4o-mini (low detail)", cost: "$0.0025/photo", color: "text-blue-300" },
              { tier: "Tier 3", label: "Deep Analysis", model: "GPT-4o (high detail)", cost: "$0.015–0.025/photo", color: "text-purple-300" },
            ].map(({ tier, label, model, cost, color }) => (
              <div key={tier} className="flex items-start gap-2 p-2 bg-slate-700/30 rounded">
                <div className={`text-xs font-bold ${color} w-12 shrink-0 mt-0.5`}>{tier}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-200">{label}</div>
                  <div className="text-[10px] text-slate-500">{model}</div>
                </div>
                <div className={`text-[10px] font-mono ${color} shrink-0`}>{cost}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Batches */}
      {queueStatus?.recentBatches && queueStatus.recentBatches.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-400" />
              Recent Ingestion Batches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 pb-2 pr-4">Source</th>
                    <th className="text-right text-slate-400 pb-2 pr-4">Total</th>
                    <th className="text-right text-slate-400 pb-2 pr-4">Processed</th>
                    <th className="text-right text-slate-400 pb-2 pr-4">Offers</th>
                    <th className="text-right text-slate-400 pb-2 pr-4">HHV Updates</th>
                    <th className="text-right text-slate-400 pb-2 pr-4">Cost</th>
                    <th className="text-right text-slate-400 pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {queueStatus.recentBatches.map((batch: any) => (
                    <tr key={batch.id} className="border-b border-slate-700/50">
                      <td className="py-2 pr-4 text-slate-300 font-medium capitalize">{batch.source}</td>
                      <td className="py-2 pr-4 text-right text-slate-300">{batch.totalPhotos?.toLocaleString()}</td>
                      <td className="py-2 pr-4 text-right text-slate-300">{batch.processedPhotos?.toLocaleString() ?? 0}</td>
                      <td className="py-2 pr-4 text-right text-emerald-400">{batch.offersGenerated ?? 0}</td>
                      <td className="py-2 pr-4 text-right text-blue-400">{batch.homeHealthUpdates ?? 0}</td>
                      <td className="py-2 pr-4 text-right text-slate-300">${Number(batch.totalCost ?? 0).toFixed(4)}</td>
                      <td className="py-2 text-right"><StatusBadge status={batch.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Queue Feed */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-400" />
              Queue Feed
            </CardTitle>
            <div className="flex gap-1">
              {(["all", "pending", "processing", "completed", "failed", "suppressed"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFeedFilter(f)}
                  className={`px-2 py-1 rounded text-[10px] font-medium capitalize transition-colors ${
                    feedFilter === f
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {feedLoading ? (
            <div className="text-center py-8 text-slate-500">Loading queue...</div>
          ) : !feedItems?.length ? (
            <div className="text-center py-8 text-slate-500">
              <Camera className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>No items in queue</p>
              <p className="text-xs mt-1">Photos will appear here when partners log jobs or historical batches are ingested</p>
            </div>
          ) : (
            <div className="space-y-2">
              {feedItems.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-700/50">
                  {/* Photo thumbnail */}
                  <div className="w-10 h-10 rounded bg-slate-700 shrink-0 overflow-hidden">
                    {item.photoUrl ? (
                      <img src={item.photoUrl} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <Camera className="w-4 h-4 text-slate-500 m-3" />
                    )}
                  </div>

                  {/* Address + source */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-200 truncate font-medium">{item.serviceAddress}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-500 capitalize">{item.source}</span>
                      <span className="text-[10px] text-slate-600">·</span>
                      <span className="text-[10px] text-slate-500 capitalize">{item.ingestionMode}</span>
                      {item.photoAgeMonths && (
                        <>
                          <span className="text-[10px] text-slate-600">·</span>
                          <span className="text-[10px] text-orange-400">{item.photoAgeMonths}mo old</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Tier pipeline */}
                  <TierPipeline tier1={item.tier1Passed} tier2={item.tier2Passed} tier3={item.tier3Ran} />

                  {/* Confidence */}
                  {item.finalConfidence != null && (
                    <div className="text-center w-14">
                      <div className={`text-sm font-bold ${
                        item.finalConfidence >= 0.8 ? "text-emerald-400" :
                        item.finalConfidence >= 0.6 ? "text-yellow-400" : "text-slate-500"
                      }`}>
                        {(item.finalConfidence * 100).toFixed(0)}%
                      </div>
                      <div className="text-[9px] text-slate-500">confidence</div>
                    </div>
                  )}

                  {/* Offer generated */}
                  <div className="w-16 text-center">
                    {item.offerGenerated ? (
                      <span className="text-[10px] text-emerald-400 font-medium">✓ Offer</span>
                    ) : item.status === "completed" ? (
                      <span className="text-[10px] text-slate-500">No offer</span>
                    ) : null}
                  </div>

                  {/* Stale flags */}
                  <div className="flex flex-wrap gap-1 w-32">
                    {(item.staleDataFlags ?? []).slice(0, 2).map((flag: string) => (
                      <StaleFlagBadge key={flag} flag={flag} />
                    ))}
                  </div>

                  {/* Cost */}
                  {item.processingCost != null && (
                    <div className="text-[10px] text-slate-500 font-mono w-14 text-right">
                      ${Number(item.processingCost).toFixed(4)}
                    </div>
                  )}

                  {/* Status */}
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stale Data Rules Reference */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            Stale Data Rules (Active)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                flag: "rate_limited_per_address",
                rule: "Max 3 offers per address per 30 days",
                detail: "Highest-priority issues surfaced first. Remaining issues queued for next window.",
                icon: Shield,
                color: "text-blue-400",
              },
              {
                flag: "issue_likely_resolved",
                rule: "Issue resolution check (180-day window)",
                detail: "If a job in the same category was logged at this address in the last 180 days, the issue is suppressed.",
                icon: CheckCircle,
                color: "text-emerald-400",
              },
              {
                flag: "photo_over_24_months",
                rule: "Photo age decay (confidence penalty)",
                detail: "Photos 12–24mo: confidence × 0.85. Photos 24–36mo: confidence × 0.65. Photos 36mo+: rejected.",
                icon: TrendingDown,
                color: "text-orange-400",
              },
              {
                flag: "historical_ingestion",
                rule: "Historical ingestion mode (profile-only)",
                detail: "Photos from ServiceTitan/Jobber/CompanyCam batches update the Home Health Vault only. No offers generated unless photo is < 18 months old.",
                icon: Database,
                color: "text-purple-400",
              },
            ].map(({ flag, rule, detail, icon: Icon, color }) => (
              <div key={flag} className="flex gap-3 p-3 bg-slate-700/30 rounded-lg">
                <Icon className={`w-4 h-4 ${color} shrink-0 mt-0.5`} />
                <div>
                  <div className="text-xs font-medium text-slate-200">{rule}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}
