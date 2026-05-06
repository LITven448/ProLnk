import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Clock, CheckCircle2, AlertTriangle, Zap, Camera, Home, Brain, Shield, TrendingUp } from "lucide-react";

const TP_AGENTS = [
  {
    id: "photo-analysis",
    name: "Photo Analysis Agent",
    description: "Ingests homeowner-uploaded photos, runs computer vision + GPT-4o to detect 150+ issue categories, generates a ranked offer packet for matched pros.",
    status: "in-dev",
    triggers: ["Photo upload event", "Manual re-scan request"],
    outputs: ["Issue detection report", "Offer packet", "Pro match queue"],
    icon: Camera,
    color: "#10b981",
  },
  {
    id: "home-vault",
    name: "Home Health Vault Agent",
    description: "Builds and maintains a persistent property profile for each homeowner — tracking issue history, completed repairs, and predicted future needs.",
    status: "planned",
    triggers: ["Job completion event", "Scheduled quarterly scan"],
    outputs: ["Updated home profile", "Maintenance forecast", "Renewal reminders"],
    icon: Home,
    color: "#3b82f6",
  },
  {
    id: "pro-match",
    name: "Pro Matching Agent",
    description: "Routes detected issues to the highest-scored available ProLnk partner in the homeowner's zip code, weighted by tier, specialty, and review score.",
    status: "planned",
    triggers: ["Offer packet created", "Pro declines job"],
    outputs: ["Job assignment", "Homeowner notification", "Pro notification"],
    icon: Brain,
    color: "#8b5cf6",
  },
  {
    id: "quality-gate",
    name: "Photo Quality Gate Agent",
    description: "Pre-screens uploaded photos for blur, darkness, and insufficient coverage before passing to the main analysis pipeline. Rejects and requests re-upload if quality is too low.",
    status: "planned",
    triggers: ["Photo upload event"],
    outputs: ["Pass / Reject decision", "Rejection reason + re-upload prompt"],
    icon: Shield,
    color: "#f59e0b",
  },
  {
    id: "homeowner-nurture",
    name: "Homeowner Nurture Agent",
    description: "Sends automated follow-up sequences to waitlist homeowners, scan-pending users, and post-job homeowners to drive re-engagement and referrals.",
    status: "planned",
    triggers: ["Waitlist signup", "Scan completed", "Job completed", "30-day inactivity"],
    outputs: ["Email sequence", "SMS nudge", "Referral link"],
    icon: TrendingUp,
    color: "#ec4899",
  },
];

const STATUS_MAP: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  "active":  { label: "Active",    color: "text-green-600",  icon: CheckCircle2 },
  "in-dev":  { label: "In Dev",    color: "text-yellow-600", icon: Zap },
  "planned": { label: "Planned",   color: "text-zinc-400",   icon: Clock },
  "error":   { label: "Error",     color: "text-red-600",    icon: AlertTriangle },
};

export default function TrustyProAgents() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#344767] flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#82D616]" />
            TrustyPro — AI Agents
          </h1>
          <p className="text-sm text-[#7B809A] mt-1">
            Automated agents powering the TrustyPro photo analysis and homeowner experience pipeline.
          </p>
        </div>

        {/* Summary Bar */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
              <div>
                <div className="text-2xl font-bold text-green-600">{TP_AGENTS.filter(a => a.status === "active").length}</div>
                <div className="text-xs text-[#7B809A]">Active</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-500 shrink-0" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{TP_AGENTS.filter(a => a.status === "in-dev").length}</div>
                <div className="text-xs text-[#7B809A]">In Development</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-8 h-8 text-zinc-400 shrink-0" />
              <div>
                <div className="text-2xl font-bold text-zinc-500">{TP_AGENTS.filter(a => a.status === "planned").length}</div>
                <div className="text-xs text-[#7B809A]">Planned</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {TP_AGENTS.map((agent) => {
            const AgentIcon = agent.icon;
            const statusInfo = STATUS_MAP[agent.status];
            const StatusIcon = statusInfo.icon;
            return (
              <Card key={agent.id} className="border border-[#E9ECEF] hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: agent.color + "20" }}
                      >
                        <AgentIcon className="w-5 h-5" style={{ color: agent.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold text-[#344767]">{agent.name}</CardTitle>
                        <div className={`flex items-center gap-1 text-xs mt-0.5 ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-[#7B809A] leading-relaxed">{agent.description}</p>
                  <div>
                    <div className="text-xs font-medium text-[#344767] mb-1.5">Triggers</div>
                    <div className="flex flex-wrap gap-1">
                      {agent.triggers.map((t) => (
                        <Badge key={t} variant="outline" className="text-[10px] border-[#E9ECEF] text-[#7B809A]">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#344767] mb-1.5">Outputs</div>
                    <div className="flex flex-wrap gap-1">
                      {agent.outputs.map((o) => (
                        <Badge key={o} variant="outline" className="text-[10px]" style={{ borderColor: agent.color + "60", color: agent.color }}>{o}</Badge>
                      ))}
                    </div>
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
