import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Brain, Camera, CloudLightning, ShieldCheck, Users, RefreshCw,
  CheckCircle, AlertTriangle, Clock, Zap, Activity
} from "lucide-react";

interface AgentCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  statusQuery?: any;
  triggerAction?: () => void;
  triggerLabel?: string;
  stats: { label: string; value: string | number }[];
}

export default function AgentStatusDashboard() {
  const { data: platformStats } = trpc.admin.getNetworkStats.useQuery();
  const { data: stormStats, refetch: refetchStorm } = trpc.stormAgent.getStats.useQuery();
  const { data: complianceOverview } = trpc.compliance.getComplianceOverview.useQuery();
  const { data: photoQueueStats } = trpc.admin.getPhotoQueueStats.useQuery();

  const triggerStorm = trpc.stormAgent.triggerScan.useMutation({
    onSuccess: (r) => toast.success(`Storm scan complete — ${r.eventsProcessed} events, ${r.leadsGenerated} leads`),
    onError: () => toast.error("Storm scan failed"),
  });

  const agents: AgentCard[] = [
    {
      id: "photo-ai",
      name: "Photo Intelligence Agent",
      description: "Analyzes job site photos using GPT-4o Vision to detect upsell opportunities across 22 trade categories.",
      icon: <Camera className="h-6 w-6" />,
      color: "text-blue-400",
      stats: [
        { label: "Pending Review", value: (photoQueueStats as any)?.pending ?? "—" },
        { label: "Opportunities Generated", value: platformStats?.totalOpportunities ?? "—" },
        { label: "Converted", value: platformStats?.convertedOpportunities ?? "—" },
        { label: "Status", value: "Active" },
      ],
    },
    {
      id: "lead-router",
      name: "Lead Routing Engine",
      description: "Routes approved opportunities to the highest-PPS matching partner within service area. 24-hour expiry with auto-reroute.",
      icon: <Zap className="h-6 w-6" />,
      color: "text-yellow-400",
      stats: [
        { label: "Total Opportunities", value: platformStats?.totalOpportunities ?? "—" },
        { label: "Converted", value: platformStats?.convertedOpportunities ?? "—" },
        { label: "Total Jobs Logged", value: platformStats?.totalJobs ?? "—" },
        { label: "Status", value: "Active" },
      ],
    },
    {
      id: "storm",
      name: "Storm Tracking Agent",
      description: "Monitors NOAA weather alerts across all service areas. Auto-generates emergency leads for affected properties.",
      icon: <CloudLightning className="h-6 w-6" />,
      color: "text-purple-400",
      triggerAction: () => triggerStorm.mutate({ state: "TX" }),
      triggerLabel: "Run Scan",
      stats: [
        { label: "Total Events", value: stormStats?.totalEvents ?? "—" },
        { label: "Leads Generated", value: stormStats?.totalLeads ?? "—" },
        { label: "Properties Affected", value: stormStats?.totalProperties ?? "—" },
        { label: "Status", value: "Active" },
      ],
    },
    {
      id: "compliance",
      name: "Compliance Monitor Agent",
      description: "Daily sweep for COI expiry, background check staleness, and license renewals. Auto-suspends after 7-day grace period.",
      icon: <ShieldCheck className="h-6 w-6" />,
      color: "text-green-400",
      stats: [
        { label: "Suspended Partners", value: (complianceOverview as any)?.suspended ?? "—" },
        { label: "Partners w/ Strikes", value: (complianceOverview as any)?.partnersWithStrikes ?? "—" },
        { label: "COI Verified", value: (complianceOverview as any)?.coiVerified ?? "—" },
        { label: "Next Run", value: "3:00 AM" },
      ],
    },
    {
      id: "circumvention",
      name: "Circumvention Detector",
      description: "Cross-references job logs against dispatched leads to detect off-platform transactions. Issues strikes automatically.",
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "text-red-400",
      stats: [
        { label: "Open Flags", value: "—" },
        { label: "Strikes Issued (30d)", value: "—" },
        { label: "Auto-Suspensions", value: "—" },
        { label: "Status", value: "Active" },
      ],
    },
    {
      id: "pps",
      name: "Partner Priority Score Engine",
      description: "Recalculates PPS for all partners nightly at 2 AM. Factors: tier, close rate, acceptance rate, photos, reviews, referrals, response speed.",
      icon: <Brain className="h-6 w-6" />,
      color: "text-orange-400",
      stats: [
        { label: "Partners Scored", value: platformStats?.totalPartners ?? "—" },
        { label: "Total Jobs", value: platformStats?.totalJobs ?? "—" },
        { label: "Total Properties", value: platformStats?.totalProperties ?? "—" },
        { label: "Next Run", value: "2:00 AM" },
      ],
    },
  ];

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-7 w-7 text-primary" />
            AGaaS Agent Status
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Autonomous Growth-as-a-Service — 6 agents running the platform
          </p>
        </div>
        <Badge variant="outline" className="text-green-400 border-green-400 gap-1">
          <CheckCircle className="h-3 w-3" />
          All Systems Operational
        </Badge>
      </div>

      {/* Platform-wide stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Partners", value: platformStats?.totalPartners ?? "—", icon: <Users className="h-4 w-4" /> },
          { label: "Jobs Logged", value: platformStats?.totalJobs ?? "—", icon: <Camera className="h-4 w-4" /> },
          { label: "Opportunities", value: platformStats?.totalOpportunities ?? "—", icon: <Zap className="h-4 w-4" /> },
          { label: "Commissions Paid", value: platformStats?.totalCommissionsPaid ? `$${Number(platformStats.totalCommissionsPaid).toLocaleString()}` : "—", icon: <Activity className="h-4 w-4" /> },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                {stat.icon}
                {stat.label}
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className={agent.color}>{agent.icon}</span>
                {agent.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground leading-relaxed">{agent.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {agent.stats.map((stat) => (
                  <div key={stat.label} className="bg-muted/40 rounded-md p-2">
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                    <div className="font-semibold text-sm mt-0.5">
                      {stat.label === "Status" ? (
                        <span className="text-green-400 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> {stat.value}
                        </span>
                      ) : stat.label === "Next Run" ? (
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {stat.value}
                        </span>
                      ) : stat.value}
                    </div>
                  </div>
                ))}
              </div>
              {agent.triggerAction && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={agent.triggerAction}
                  disabled={triggerStorm.isPending}
                >
                  <RefreshCw className={`h-3 w-3 ${triggerStorm.isPending ? "animate-spin" : ""}`} />
                  {agent.triggerLabel}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </AdminLayout>
  );
}
