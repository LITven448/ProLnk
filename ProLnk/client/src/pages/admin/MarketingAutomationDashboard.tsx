import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
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
} from "lucide-react";

// Campaign definitions
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
    description: "Alerts partners when they're 1 job away from the next tier.",
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
    description: "Nudges partners who haven't sent a referral in 14+ days with nearby opportunity types.",
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
    description: "Re-engages homeowners who completed an AI scan but haven't viewed offers in 3+ days.",
    icon: MessageSquare,
    color: "bg-teal-500",
    audience: "Homeowners w/ Unseen Scans",
    frequency: "Daily sweep",
    triggerKey: "scanReEngagement" as const,
  },
];

type TriggerKey = "v1" | "weeklyDigest" | "referralNudge" | "dealExpiryPush" | "npsFollowUp" | "leaderboardBroadcast" | "scanReEngagement" | "allV2";

export default function MarketingAutomationDashboard() {
  const [triggering, setTriggering] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, { sent?: number; success?: boolean; error?: string }>>({});

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
        <Button
          variant="outline"
          size="sm"
          onClick={() => { refetchSummary(); refetchStats(); }}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

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
                {/* Stats */}
                {stat && (
                  <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {stat.totalSent.toLocaleString()} total
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {stat.sentThisWeek} this week
                    </span>
                    {stat.lastSentAt && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(stat.lastSentAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                )}

                {/* Result feedback */}
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
                  {isRunning ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
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
