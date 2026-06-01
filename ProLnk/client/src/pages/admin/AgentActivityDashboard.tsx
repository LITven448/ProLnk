import { useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import {
  Activity, CheckCircle, XCircle, Clock, RefreshCw, Zap, AlertTriangle, Bot,
} from "lucide-react";

const TIER_COLORS: Record<string, string> = {
  "Founding Network": "#17C1E8",
  Executive: "#7928CA",
  Managing: "#FBB140",
  "Supreme Court": "#EA0606",
  Standalone: "#82D616",
};

function timeAgo(value: string | Date | null): string {
  if (!value) return "never";
  const t = new Date(value).getTime();
  if (Number.isNaN(t)) return "never";
  const diff = Date.now() - t;
  if (diff < 0) return "just now";
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function StatusDot({ status }: { status: "ok" | "error" | "idle" }) {
  const color = status === "ok" ? "#82D616" : status === "error" ? "#EA0606" : "#6B7280";
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full"
      style={{ backgroundColor: color, boxShadow: status === "ok" ? `0 0 6px ${color}` : undefined }}
      title={status}
    />
  );
}

const OUTCOME_STYLE: Record<string, { color: string; Icon: typeof CheckCircle }> = {
  success: { color: "#82D616", Icon: CheckCircle },
  failure: { color: "#EA0606", Icon: XCircle },
  blocked: { color: "#FBB140", Icon: AlertTriangle },
  pending: { color: "#17C1E8", Icon: Clock },
};

export default function AgentActivityDashboard() {
  const registry = trpc.agentOps.getAgentRegistry.useQuery(undefined, {
    refetchInterval: 15000,
  });
  const feed = trpc.agentOps.getActivityFeed.useQuery(
    { limit: 50, offset: 0 },
    { refetchInterval: 15000 },
  );

  const agents = registry.data?.agents ?? [];
  const counts = registry.data?.counts ?? { defined: 0, ranLast24h: 0, errored: 0 };

  const byTier = useMemo(() => {
    const groups: Record<string, typeof agents> = {};
    for (const a of agents) {
      (groups[a.tier] ??= []).push(a);
    }
    return Object.entries(groups);
  }, [agents]);

  const refetchAll = () => {
    registry.refetch();
    feed.refetch();
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Bot className="w-6 h-6 text-cyan-400" />
              Agent Activity
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Live view of the AI agents that actually exist in the platform. Activity is logged when agents run.
            </p>
          </div>
          <button
            onClick={refetchAll}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-white border border-slate-700"
          >
            <RefreshCw className={`w-4 h-4 ${registry.isFetching || feed.isFetching ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Honest counts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide">
              <Activity className="w-4 h-4" /> Agents Defined
            </div>
            <div className="text-3xl font-bold text-white mt-2">{counts.defined}</div>
          </div>
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide">
              <Zap className="w-4 h-4" /> Ran (last 24h)
            </div>
            <div className="text-3xl font-bold text-green-400 mt-2">{counts.ranLast24h}</div>
          </div>
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4" /> Errored
            </div>
            <div className={`text-3xl font-bold mt-2 ${counts.errored > 0 ? "text-red-400" : "text-white"}`}>
              {counts.errored}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent grid */}
          <div className="lg:col-span-2 space-y-6">
            {registry.isLoading && (
              <div className="text-gray-500 text-sm">Loading agents…</div>
            )}
            {byTier.map(([tier, list]) => (
              <div key={tier}>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: TIER_COLORS[tier] ?? "#6B7280" }}
                  />
                  <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">{tier}</h2>
                  <span className="text-xs text-gray-500">({list.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {list.map((a) => (
                    <div
                      key={a.agentId}
                      className="rounded-lg bg-slate-900 border border-slate-800 p-4 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <StatusDot status={a.status} />
                          <span className="font-medium text-white text-sm truncate">{a.name}</span>
                        </div>
                        <span className="text-[10px] uppercase text-gray-500 shrink-0">{a.triggerType}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{a.description}</p>
                      <div className="mt-3 pt-3 border-t border-slate-800 text-xs">
                        {a.lastAction ? (
                          <>
                            <div className="text-gray-300 truncate" title={a.lastAction}>{a.lastAction}</div>
                            <div className="flex items-center gap-1.5 text-gray-500 mt-1">
                              <Clock className="w-3 h-3" />
                              {timeAgo(a.lastActiveAt)}
                              {a.runs24h > 0 && <span className="ml-auto text-gray-400">{a.runs24h} run{a.runs24h === 1 ? "" : "s"}/24h</span>}
                            </div>
                          </>
                        ) : (
                          <div className="text-gray-600 italic">No activity logged yet</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Activity feed */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 sticky top-4">
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Live Activity Feed
              </h2>
              {feed.isLoading && <div className="text-gray-500 text-sm">Loading…</div>}
              {!feed.isLoading && (feed.data?.length ?? 0) === 0 && (
                <div className="text-gray-600 text-sm italic py-6 text-center">
                  No agent activity logged yet. Activity appears here when agents run.
                </div>
              )}
              <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
                {(feed.data ?? []).map((entry: any) => {
                  const style = OUTCOME_STYLE[entry.outcome] ?? OUTCOME_STYLE.success;
                  const Icon = style.Icon;
                  return (
                    <div key={entry.id} className="flex gap-2.5 text-xs border-b border-slate-800/60 pb-2">
                      <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: style.color }} />
                      <div className="min-w-0">
                        <div className="text-gray-200">{entry.action}</div>
                        {entry.details && (
                          <div className="text-gray-500 mt-0.5 line-clamp-2">{entry.details}</div>
                        )}
                        <div className="text-gray-600 mt-0.5 flex items-center gap-2">
                          <span className="font-mono">{entry.agentId}</span>
                          <span>·</span>
                          <span>{timeAgo(entry.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
