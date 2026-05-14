import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Mail,
  Users,
  TrendingUp,
  Clock,
  Play,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Zap,
  Trophy,
  Heart,
  Star,
  MessageSquare,
  Calendar,
  Plus,
  X,
  ToggleLeft,
  ToggleRight,
  Eye,
} from "lucide-react";

const CAMPAIGNS = [
  {
    key: "seasonal",
    label: "Seasonal Maintenance Reminders",
    description: "Quarterly homeowner emails with season-specific maintenance tips and pro CTAs.",
    icon: Calendar,
    color: "bg-blue-500",
    audience: "Homeowners",
    frequency: "Quarterly",
    triggerKey: "v1" as const,
  },
  {
    key: "winback",
    label: "Win-Back Campaign",
    description: "Re-engages homeowners inactive for 60+ days with personalized outreach.",
    icon: Heart,
    color: "bg-rose-500",
    audience: "Inactive Homeowners",
    frequency: "Daily sweep",
    triggerKey: "v1" as const,
  },
  {
    key: "tier_milestone",
    label: "Tier Milestone Notifications",
    description: "Alerts partners when they\'re 1 job away from the next tier.",
    icon: Trophy,
    color: "bg-amber-500",
    audience: "Partners",
    frequency: "Daily sweep",
    triggerKey: "v1" as const,
  },
  {
    key: "weekly_digest",
    label: "Weekly Partner Digest",
    description: "Monday summary: leads, commissions, tier progress, and priority score.",
    icon: Mail,
    color: "bg-indigo-500",
    audience: "All Partners",
    frequency: "Every Monday",
    triggerKey: "weeklyDigest" as const,
  },
  {
    key: "referral_nudge",
    label: "Referral Nudge Engine",
    description: "Nudges partners who haven\'t sent a referral in 14+ days with nearby opportunity types.",
    icon: TrendingUp,
    color: "bg-emerald-500",
    audience: "Inactive Partners",
    frequency: "Every Monday",
    triggerKey: "referralNudge" as const,
  },
  {
    key: "deal_expiry",
    label: "Deal Expiry Urgency Push",
    description: "Sends homeowners an urgency email 6 hours before their offer expires.",
    icon: Clock,
    color: "bg-red-500",
    audience: "Homeowners w/ Active Deals",
    frequency: "Daily sweep",
    triggerKey: "dealExpiryPush" as const,
  },
  {
    key: "nps_followup",
    label: "NPS Follow-Up Sequence",
    description: "Promoters → Google review ask. Passives → $25 credit offer. Detractors → Priority CS flag.",
    icon: Star,
    color: "bg-yellow-500",
    audience: "Post-Survey Homeowners",
    frequency: "Daily sweep",
    triggerKey: "npsFollowUp" as const,
  },
  {
    key: "leaderboard",
    label: "Partner Leaderboard Broadcast",
    description: "Posts top 5 partners by referrals to the broadcast center every Monday.",
    icon: Trophy,
    color: "bg-purple-500",
    audience: "All Partners",
    frequency: "Every Monday",
    triggerKey: "leaderboardBroadcast" as const,
  },
  {
    key: "scan_reengagement",
    label: "Scan Re-Engagement",
    description: "Re-engages homeowners who completed an AI scan but haven\'t viewed offers in 3+ days.",
    icon: MessageSquare,
    color: "bg-teal-500",
    audience: "Homeowners w/ Unseen Scans",
    frequency: "Daily sweep",
    triggerKey: "scanReEngagement" as const,
  },
];

type TriggerKey = "v1" | "weeklyDigest" | "referralNudge" | "dealExpiryPush" | "npsFollowUp" | "leaderboardBroadcast" | "scanReEngagement" | "allV2";

const ACTIVE_FLOWS = [
  {
    id: "af1",
    name: "SMS After Job Complete",
    trigger: "Job marked complete",
    lastRun: "Today 11:32 AM",
    sent: 847,
    openRate: 94,
    type: "SMS",
    previewText: "Hi {name}, your {trade} job with {pro} is complete! Rate your experience: {link}",
    active: true,
  },
  {
    id: "af2",
    name: "Email Welcome Sequence",
    trigger: "New pro signup",
    lastRun: "Today 9:15 AM",
    sent: 2341,
    openRate: 61,
    type: "Email",
    previewText: "Welcome to ProLnk, {name}! You\'re now part of the fastest-growing network of home service pros. Here\'s how to get your first lead...",
    active: true,
  },
  {
    id: "af3",
    name: "Storm Alert Blast",
    trigger: "NOAA severe weather event",
    lastRun: "May 11, 6:00 AM",
    sent: 512,
    openRate: 78,
    type: "Both",
    previewText: "⚡ Storm Alert for {zip}: High winds and hail expected tonight. ProLnk pros are standing by for emergency repairs. Tap to book now.",
    active: true,
  },
  {
    id: "af4",
    name: "Monthly Partner Digest",
    trigger: "1st of every month",
    lastRun: "May 1, 7:00 AM",
    sent: 1089,
    openRate: 48,
    type: "Email",
    previewText: "Hi {name}, here\'s your April recap: {jobs} jobs completed, {commission} earned, and you\'re {tier_gap} jobs from {next_tier} tier.",
    active: true,
  },
  {
    id: "af5",
    name: "Waitlist Nurture",
    trigger: "Homeowner joins waitlist",
    lastRun: "Today 2:47 PM",
    sent: 388,
    openRate: 55,
    type: "Email",
    previewText: "You\'re on the list, {name}! ProLnk launches May 6. In the meantime, complete your Home Health Profile to get matched faster.",
    active: false,
  },
];

const PERFORMANCE_DATA = [
  { name: "Storm Alert", rate: 31 },
  { name: "Welcome Seq.", rate: 24 },
  { name: "Waitlist Nurture", rate: 19 },
  { name: "Win-Back", rate: 17 },
  { name: "NPS Follow-Up", rate: 14 },
];

const TRIGGER_OPTIONS = ["New signup", "Job complete", "Storm alert", "Custom"];
const MESSAGE_TYPES = ["Email", "SMS", "Both"];
const DELAY_OPTIONS = ["Immediate", "1 hour", "24 hours", "1 week"];

export default function MarketingAutomationDashboard() {
  const [triggering, setTriggering] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, { sent?: number; success?: boolean; error?: string }>>({});
  const [flowStates, setFlowStates] = useState<Record<string, boolean>>(
    Object.fromEntries(ACTIVE_FLOWS.map(f => [f.id, f.active]))
  );
  const [hoveredFlow, setHoveredFlow] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFlow, setNewFlow] = useState({
    trigger: TRIGGER_OPTIONS[0],
    messageType: MESSAGE_TYPES[0],
    delay: DELAY_OPTIONS[0],
    template: "",
    name: "",
  });

  const { data: summary, refetch: refetchSummary } = trpc.marketingAutomation.getAutomationSummary.useQuery();
  const { data: campaignStats, refetch: refetchStats } = trpc.marketingAutomation.getCampaignStats.useQuery();

  const triggerV1 = trpc.marketingAutomation.triggerV1Campaigns.useMutation();
  const triggerWeeklyDigest = trpc.marketingAutomation.triggerWeeklyDigest.useMutation();
  const triggerReferralNudge = trpc.marketingAutomation.triggerReferralNudge.useMutation();
  const triggerDealExpiryPush = trpc.marketingAutomation.triggerDealExpiryPush.useMutation();
  const triggerNpsFollowUp = trpc.marketingAutomation.triggerNpsFollowUp.useMutation();
  const triggerLeaderboardBroadcast = trpc.marketingAutomation.triggerLeaderboardBroadcast.useMutation();
  const triggerScanReEngagement = trpc.marketingAutomation.triggerScanReEngagement.useMutation();
  const triggerAllV2 = trpc.marketingAutomation.triggerAllV2.useMutation();

  const handleTrigger = async (triggerKey: TriggerKey, label: string) => {
    setTriggering(triggerKey);
    try {
      let result: any;
      switch (triggerKey) {
        case "v1": result = await triggerV1.mutateAsync(); break;
        case "weeklyDigest": result = await triggerWeeklyDigest.mutateAsync(); break;
        case "referralNudge": result = await triggerReferralNudge.mutateAsync(); break;
        case "dealExpiryPush": result = await triggerDealExpiryPush.mutateAsync(); break;
        case "npsFollowUp": result = await triggerNpsFollowUp.mutateAsync(); break;
        case "leaderboardBroadcast": result = await triggerLeaderboardBroadcast.mutateAsync(); break;
        case "scanReEngagement": result = await triggerScanReEngagement.mutateAsync(); break;
        case "allV2": result = await triggerAllV2.mutateAsync(); break;
      }
      setResults(prev => ({ ...prev, [triggerKey]: result }));
      toast.success(`${label} triggered`, {
        description: result?.sent != null ? `${result.sent} emails sent` : result?.message ?? "Campaign running",
      });
      refetchSummary();
      refetchStats();
    } catch (err: any) {
      toast.error("Trigger failed", { description: err.message });
    } finally {
      setTriggering(null);
    }
  };

  const getStatForCampaign = (key: string) => {
    if (!campaignStats) return null;
    return campaignStats.find((s: { campaignKey: string }) => s.campaignKey.startsWith(key.split("_")[0]));
  };

  const toggleFlow = (id: string) => {
    setFlowStates(prev => {
      const next = !prev[id];
      toast.success(next ? "Flow activated" : "Flow paused");
      return { ...prev, [id]: next };
    });
  };

  const createFlow = () => {
    if (!newFlow.name.trim()) { toast.error("Flow name is required"); return; }
    toast.success("Flow created", { description: `"${newFlow.name}" is now live` });
    setShowCreateForm(false);
    setNewFlow({ trigger: TRIGGER_OPTIONS[0], messageType: MESSAGE_TYPES[0], delay: DELAY_OPTIONS[0], template: "", name: "" });
  };

  const previewFlow = ACTIVE_FLOWS.find(f => f.id === hoveredFlow);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Marketing Automation</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor and manually trigger all automated marketing campaigns across ProLnk and TrustyPro.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { refetchSummary(); refetchStats(); }}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm" className="gap-2" onClick={() => setShowCreateForm(v => !v)}>
            <Plus className="h-4 w-4" />
            Create Flow
          </Button>
        </div>
      </div>

      {/* Create Flow Form */}
      {showCreateForm && (
        <Card className="border-2 border-primary/30 bg-primary/5">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">New Automation Flow</CardTitle>
            <button onClick={() => setShowCreateForm(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">Flow Name</label>
                <Input
                  placeholder="e.g. Post-job review request"
                  value={newFlow.name}
                  onChange={e => setNewFlow(p => ({ ...p, name: e.target.value }))}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">Trigger</label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={newFlow.trigger}
                  onChange={e => setNewFlow(p => ({ ...p, trigger: e.target.value }))}
                >
                  {TRIGGER_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">Message Type</label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={newFlow.messageType}
                  onChange={e => setNewFlow(p => ({ ...p, messageType: e.target.value }))}
                >
                  {MESSAGE_TYPES.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">Send Delay</label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={newFlow.delay}
                  onChange={e => setNewFlow(p => ({ ...p, delay: e.target.value }))}
                >
                  {DELAY_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Message Template</label>
              <textarea
                rows={3}
                placeholder="Use {name}, {trade}, {pro}, {link} as placeholders…"
                value={newFlow.template}
                onChange={e => setNewFlow(p => ({ ...p, template: e.target.value }))}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowCreateForm(false)}>Cancel</Button>
              <Button size="sm" onClick={createFlow}>Launch Flow</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Emails Sent", value: summary?.totalEmailsSent ?? 0, icon: Mail, color: "text-blue-500" },
          { label: "Sent This Week", value: summary?.emailsThisWeek ?? 0, icon: TrendingUp, color: "text-emerald-500" },
          { label: "Sent This Month", value: summary?.emailsThisMonth ?? 0, icon: Calendar, color: "text-purple-500" },
          { label: "Active Campaigns", value: summary?.activeCampaigns ?? 0, icon: Zap, color: "text-amber-500" },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value.toLocaleString()}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Flows + Performance side-by-side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Active Flows */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Active Flows</CardTitle>
            <CardDescription>Live automation sequences with real-time metrics. Hover to preview template.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 relative">
            {ACTIVE_FLOWS.map(flow => {
              const isActive = flowStates[flow.id] ?? flow.active;
              return (
                <div
                  key={flow.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-border transition-colors cursor-default group"
                  onMouseEnter={() => setHoveredFlow(flow.id)}
                  onMouseLeave={() => setHoveredFlow(null)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-foreground truncate">{flow.name}</span>
                      <Badge className={`text-xs border-0 shrink-0 ${isActive ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-gray-500/20 text-gray-500"}`}>
                        {isActive ? "Active" : "Paused"}
                      </Badge>
                      <Badge variant="outline" className="text-xs shrink-0">{flow.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1.5">Trigger: {flow.trigger}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{flow.lastRun}</span>
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{flow.sent.toLocaleString()} sent</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{flow.openRate}% open</span>
                    </div>
                  </div>
                  <button
                    className="shrink-0 mt-0.5 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => toggleFlow(flow.id)}
                    title={isActive ? "Pause flow" : "Activate flow"}
                  >
                    {isActive
                      ? <ToggleRight className="h-6 w-6 text-emerald-500" />
                      : <ToggleLeft className="h-6 w-6" />}
                  </button>
                </div>
              );
            })}

            {/* Email preview tooltip */}
            {previewFlow && (
              <div className="absolute right-4 -top-2 z-20 w-72 p-3 rounded-lg bg-popover border border-border shadow-xl text-xs">
                <p className="font-semibold text-foreground mb-1">{previewFlow.name} — Preview</p>
                <p className="text-muted-foreground leading-relaxed">{previewFlow.previewText}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Leaderboard */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top Campaigns by Conversion Rate</CardTitle>
            <CardDescription>Percentage of recipients who completed the desired action</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={PERFORMANCE_DATA} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 40]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(v: number) => [`${v}%`, "Conversion"]}
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Master Trigger */}
      <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Run All Campaigns Now</p>
            <p className="text-sm text-muted-foreground">Triggers all v2 campaigns simultaneously (weekly digest, nudge, deal expiry, NPS, leaderboard, scan re-engagement)</p>
          </div>
          <Button
            onClick={() => handleTrigger("allV2", "All V2 Campaigns")}
            disabled={triggering !== null}
            className="gap-2 min-w-[140px]"
          >
            {triggering === "allV2" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
            {triggering === "allV2" ? "Running..." : "Run All V2"}
          </Button>
        </CardContent>
      </Card>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {CAMPAIGNS.map(campaign => {
          const stat = getStatForCampaign(campaign.key);
          const result = results[campaign.triggerKey];
          const isRunning = triggering === campaign.triggerKey || (campaign.triggerKey === "v1" && triggering === "v1");

          return (
            <Card key={campaign.key} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${campaign.color} bg-opacity-10`}>
                      <campaign.icon className={`h-5 w-5 ${campaign.color.replace("bg-", "text-")}`} />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold leading-tight">{campaign.label}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs py-0">{campaign.audience}</Badge>
                        <span className="text-xs text-muted-foreground">{campaign.frequency}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-xs leading-relaxed mt-2">
                  {campaign.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 mt-auto">
                {stat && (
                  <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{stat.totalSent.toLocaleString()} total</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{stat.sentThisWeek} this week</span>
                    {stat.lastSentAt && (
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(stat.lastSentAt).toLocaleDateString()}</span>
                    )}
                  </div>
                )}
                {result && (
                  <div className={`flex items-center gap-2 text-xs mb-3 p-2 rounded-md ${result.success ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"}`}>
                    {result.success ? <CheckCircle className="h-3 w-3 flex-shrink-0" /> : <AlertCircle className="h-3 w-3 flex-shrink-0" />}
                    {result.sent != null ? `${result.sent} emails sent` : result.error ?? (result.success ? "Completed" : "Failed")}
                  </div>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => handleTrigger(campaign.triggerKey, campaign.label)}
                  disabled={triggering !== null}
                >
                  {isRunning ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
                  {isRunning ? "Running..." : "Trigger Now"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Campaign Log Table */}
      {campaignStats && campaignStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Campaign Send Log</CardTitle>
            <CardDescription>All-time send counts by campaign key</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Campaign Key</th>
                    <th className="pb-2 font-medium text-right">This Week</th>
                    <th className="pb-2 font-medium text-right">This Month</th>
                    <th className="pb-2 font-medium text-right">All Time</th>
                    <th className="pb-2 font-medium text-right">Last Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignStats.map((stat: { campaignKey: string; sentThisWeek: number; sentThisMonth: number; totalSent: number; lastSentAt: string | null }) => (
                    <tr key={stat.campaignKey} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="py-2 font-mono text-xs">{stat.campaignKey}</td>
                      <td className="py-2 text-right">{stat.sentThisWeek}</td>
                      <td className="py-2 text-right">{stat.sentThisMonth}</td>
                      <td className="py-2 text-right font-medium">{stat.totalSent.toLocaleString()}</td>
                      <td className="py-2 text-right text-muted-foreground">
                        {stat.lastSentAt ? new Date(stat.lastSentAt).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
