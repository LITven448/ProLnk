/**
 * Brain Trust Dashboard — Executive Intelligence Center
 * Route: /admin/brain-trust
 *
 * The "command center" where all 47 agents report and can be triggered.
 * Andrew checks this weekly for strategic insights.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Brain, Zap, Shield, BarChart3, Users, DollarSign, Wrench,
  TrendingUp, AlertTriangle, CheckCircle, Clock, Loader2,
  ChevronDown, ChevronUp,
} from "lucide-react";

type AgentState = {
  loading: boolean;
  data: any;
  error: string | null;
};

export default function BrainTrustDashboard() {
  const [agents, setAgents] = useState<Record<string, AgentState>>({});
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const agentStatus = trpc.brainTrust.getAgentStatus.useQuery();

  const runCouncil = trpc.brainTrust.runCouncil.useMutation({
    onSuccess: (data) => setAgents(prev => ({ ...prev, council: { loading: false, data, error: null } })),
    onError: (e) => setAgents(prev => ({ ...prev, council: { loading: false, data: null, error: e.message } })),
  });
  const runCEO = trpc.brainTrust.runCEO.useMutation({
    onSuccess: (data) => setAgents(prev => ({ ...prev, ceo: { loading: false, data, error: null } })),
    onError: (e) => setAgents(prev => ({ ...prev, ceo: { loading: false, data: null, error: e.message } })),
  });
  const runCFO = trpc.brainTrust.runCFO.useMutation({
    onSuccess: (data) => setAgents(prev => ({ ...prev, cfo: { loading: false, data, error: null } })),
    onError: (e) => setAgents(prev => ({ ...prev, cfo: { loading: false, data: null, error: e.message } })),
  });
  const runCTO = trpc.brainTrust.runCTO.useMutation({
    onSuccess: (data) => setAgents(prev => ({ ...prev, cto: { loading: false, data, error: null } })),
    onError: (e) => setAgents(prev => ({ ...prev, cto: { loading: false, data: null, error: e.message } })),
  });
  const runSupreme = trpc.brainTrust.runSupremeCourt.useMutation({
    onSuccess: (data) => setAgents(prev => ({ ...prev, supremeCourt: { loading: false, data, error: null } })),
    onError: (e) => setAgents(prev => ({ ...prev, supremeCourt: { loading: false, data: null, error: e.message } })),
  });
  const runManaging = trpc.brainTrust.runManagingTier.useMutation({
    onSuccess: (data) => setAgents(prev => ({ ...prev, managing: { loading: false, data, error: null } })),
    onError: (e) => setAgents(prev => ({ ...prev, managing: { loading: false, data: null, error: e.message } })),
  });
  const runMedia = trpc.brainTrust.runMediaAgents.useMutation({
    onSuccess: (data) => setAgents(prev => ({ ...prev, media: { loading: false, data, error: null } })),
    onError: (e) => setAgents(prev => ({ ...prev, media: { loading: false, data: null, error: e.message } })),
  });
  const runAudit = trpc.brainTrust.runCommissionAudit.useMutation({
    onSuccess: (data) => { toast.success(`Audit: ${data.totalAnomalies} anomalies found`); },
  });
  const runIntegrity = trpc.brainTrust.runDataIntegrity.useMutation({
    onSuccess: (data) => { toast.success(`Integrity: ${data.fixed} auto-fixed, ${data.flagged} flagged`); },
  });

  const toggleExpanded = (key: string) => setExpanded(prev => {
    const next = new Set(prev);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });

  const AGENT_GROUPS = [
    {
      id: "council",
      title: "Brain Trust Council",
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      description: "Full executive intelligence synthesis",
      onRun: () => { setAgents(prev => ({ ...prev, council: { loading: true, data: null, error: null } })); runCouncil.mutate(); },
      loading: runCouncil.isPending,
    },
    {
      id: "ceo",
      title: "CEO Agent",
      icon: <TrendingUp className="w-5 h-5 text-teal-400" />,
      description: "Executive summary + weekly priority",
      onRun: () => { setAgents(prev => ({ ...prev, ceo: { loading: true, data: null, error: null } })); runCEO.mutate(); },
      loading: runCEO.isPending,
    },
    {
      id: "cfo",
      title: "CFO Agent",
      icon: <DollarSign className="w-5 h-5 text-green-400" />,
      description: "Financial health + MRR analysis",
      onRun: () => { setAgents(prev => ({ ...prev, cfo: { loading: true, data: null, error: null } })); runCFO.mutate(); },
      loading: runCFO.isPending,
    },
    {
      id: "cto",
      title: "CTO Agent",
      icon: <Wrench className="w-5 h-5 text-orange-400" />,
      description: "Technical health + critical bugs",
      onRun: () => { setAgents(prev => ({ ...prev, cto: { loading: true, data: null, error: null } })); runCTO.mutate(); },
      loading: runCTO.isPending,
    },
    {
      id: "supremeCourt",
      title: "Supreme Court Agents",
      icon: <Shield className="w-5 h-5 text-red-400" />,
      description: "Privacy, brand safety, ethics review",
      onRun: () => { setAgents(prev => ({ ...prev, supremeCourt: { loading: true, data: null, error: null } })); runSupreme.mutate(); },
      loading: runSupreme.isPending,
    },
    {
      id: "managing",
      title: "Managing Tier Agents",
      icon: <Users className="w-5 h-5 text-blue-400" />,
      description: "Partner lifecycle, homeowner acquisition, integrations",
      onRun: () => { setAgents(prev => ({ ...prev, managing: { loading: true, data: null, error: null } })); runManaging.mutate(); },
      loading: runManaging.isPending,
    },
    {
      id: "media",
      title: "ProLnk Media Agents",
      icon: <BarChart3 className="w-5 h-5 text-violet-400" />,
      description: "Advertiser targeting, performance, retention",
      onRun: () => { setAgents(prev => ({ ...prev, media: { loading: true, data: null, error: null } })); runMedia.mutate(); },
      loading: runMedia.isPending,
    },
  ];

  const s = agentStatus.data;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              Brain Trust Council
            </h1>
            <p className="text-gray-400 text-sm mt-1">47 AI agents — strategic intelligence, compliance, and operations</p>
          </div>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" className="border-gray-700 text-gray-400" onClick={() => runAudit.mutate()} disabled={runAudit.isPending}>
              {runAudit.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Commission Audit"}
            </Button>
            <Button size="sm" variant="outline" className="border-gray-700 text-gray-400" onClick={() => runIntegrity.mutate()} disabled={runIntegrity.isPending}>
              {runIntegrity.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Data Integrity"}
            </Button>
          </div>
        </div>

        {/* Agent status overview */}
        {s && (
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-3xl font-black text-teal-400">{s.implemented}</div>
                <div className="text-gray-400 text-xs">Implemented</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-3xl font-black text-yellow-400">{s.scaffolded}</div>
                <div className="text-gray-400 text-xs">Scaffolded</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-3xl font-black text-gray-500">{s.documentedOnly}</div>
                <div className="text-gray-400 text-xs">Docs Only</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-3xl font-black text-white">{s.totalAgentsDefined}</div>
                <div className="text-gray-400 text-xs">Total Defined</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Agent groups */}
        <div className="space-y-3">
          {AGENT_GROUPS.map((group) => {
            const state = agents[group.id];
            const isExpanded = expanded.has(group.id);
            return (
              <Card key={group.id} className="bg-gray-800 border-gray-700">
                <CardHeader className="border-b border-gray-700 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {group.icon}
                      <div>
                        <div className="font-bold text-white text-sm">{group.title}</div>
                        <div className="text-gray-500 text-xs">{group.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {state?.data && (
                        <button onClick={() => toggleExpanded(group.id)} className="text-gray-500 hover:text-white">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 text-xs"
                        onClick={group.onRun}
                        disabled={group.loading}
                      >
                        {group.loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />Running...</> : "Run"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {state?.data && isExpanded && (
                  <CardContent className="p-4">
                    <pre className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap overflow-auto max-h-96">
                      {JSON.stringify(state.data, null, 2)}
                    </pre>
                  </CardContent>
                )}
                {state?.error && (
                  <CardContent className="p-4">
                    <div className="text-red-400 text-xs">{state.error}</div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
