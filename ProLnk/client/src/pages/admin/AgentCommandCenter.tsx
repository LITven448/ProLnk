import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Brain, CheckCircle, XCircle, Play, RefreshCw, AlertTriangle, Zap } from "lucide-react";
import { toast } from "sonner";

const TIER_COLORS: Record<string, string> = {
  "Founding Network": "#E8A020",
  "Executive": "#3B82F6",
  "Standalone": "#10B981",
  "Supreme Court": "#8B5CF6",
  "Managing": "#F59E0B",
};

export default function AgentCommandCenter() {
  const { data, isLoading, refetch } = trpc.agentStatus.getAll.useQuery(undefined, { refetchInterval: 30000 });
  const runCycle = trpc.agentStatus.runMorningCycle.useMutation({
    onSuccess: (r) => { toast.success(r.message || "Cycle complete"); refetch(); },
    onError: (e) => toast.error(e.message),
  });

  if (isLoading) return <AdminLayout title="Agent Command Center"><div className="p-8 text-gray-500">Loading agents...</div></AdminLayout>;

  const agents = data?.agents || [];
  const missingEnv = data?.missingEnvVars || [];

  return (
    <AdminLayout title="Agent Command Center" subtitle={`${data?.activeAgents || 0} of ${data?.totalAgents || 69} agents active`}>
      <div className="p-6 space-y-6">

        {/* Missing env vars warning */}
        {missingEnv.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Missing Environment Variables — some agents inactive</p>
              <p className="text-amber-700 text-sm mt-1">{missingEnv.join(" · ")}</p>
              <p className="text-amber-600 text-xs mt-1">Add these in Render Dashboard → Environment to activate all agents.</p>
            </div>
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Agents", value: data?.totalAgents || 69, color: "#0A1628" },
            { label: "Active", value: data?.activeAgents || 0, color: "#10B981" },
            { label: "Founding Network", value: agents.filter(a => a.tier === "Founding Network").length, color: "#E8A020" },
            { label: "Missing Env Vars", value: missingEnv.length, color: missingEnv.length > 0 ? "#EF4444" : "#10B981" },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Run controls */}
        <div className="flex gap-3">
          <button
            onClick={() => runCycle.mutate()}
            disabled={runCycle.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "#0A1628" }}
          >
            {runCycle.isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Run Morning Cycle
          </button>
          <button onClick={() => refetch()} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Agent list grouped by tier */}
        {Object.entries(TIER_COLORS).map(([tier, color]) => {
          const tierAgents = agents.filter(a => a.tier === tier);
          if (!tierAgents.length) return null;
          return (
            <div key={tier}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color }}>
                <Brain className="w-4 h-4" />
                {tier} ({tierAgents.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {tierAgents.map(agent => (
                  <div key={agent.name} className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-sm text-gray-900">{agent.name}</p>
                      {agent.status === "active"
                        ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500">{agent.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${agent.status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                        {agent.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Credits reminder */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-semibold text-blue-800 text-sm flex items-center gap-2">
            <Zap className="w-4 h-4" /> AI Startup Credits — $1.55M+ Available
          </p>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-blue-700">
            <span>Anthropic $100K → startups@anthropic.com</span>
            <span>AWS Activate $300K → aws.amazon.com/startups</span>
            <span>Cloudflare $250K → cloudflare.com/forstartups</span>
            <span className="font-bold text-red-600">⚠️ Stripe — Deadline May 19!</span>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
