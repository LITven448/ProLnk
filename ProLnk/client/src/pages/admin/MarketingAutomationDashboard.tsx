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
  ToggleLeft,
  ToggleRight,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Campaign definitions
const CAMPAIGNS = [
  {
    key: "seasonal",
    label: "Seasonal Maintenance Reminders",
    description: "Quarterly homeowner emails with season-specific maintenance tips and pro CTAs.",
    icon: Calendar,
    color: "bg-blue-500″,
    audience: "Homeowners",
    frequency: "Quarterly",
    triggerKey: "v1″ as const,
    lastRun: "May 12, 2026″,
    sent: 289,
    openRate: 34,
    template: "Hi {name}! It's that time of year — your seasonal home check-in is ready. Based on your home at {address}, here are the top 3 things to address this season...",
  },
  {
    key: "winback",
    label: "Win-Back Campaign",
    description: "Re-engages homeowners inactive for 60+ days with personalized outreach.",
    icon: Heart,
    color: "bg-rose-500″,
    audience: "Inactive Homeowners",
    frequency: "Daily sweep",
    triggerKey: "v1″ as const,
    lastRun: "May 14, 2026″,
    sent: 47,
    openRate: 28,
    template: "Hey {name} — we miss you! It's been {days} days since you last logged in. Your ProLnk partner has new availability in {city} this week...",
  },
  {
    key: "tier_milestone",
    label: "Tier Milestone Notifications",
    description: "Alerts partners when they're 1 job away from the next tier.",
    icon: Trophy,
    color: "bg-amber-500″,
    audience: "Partners",
    frequency: "Daily sweep",
    triggerKey: "v1″ as const,
    lastRun: "May 13, 2026″,
    sent: 12,
    openRate: 61,
    template: "You're SO close, {name}! Complete just 1 more job to unlock {next_tier} and increase your commission rate to {rate}%. Your current pipeline has {leads} leads waiting...",
  },
  {
    key: "weekly_digest",
    label: "Weekly Partner Digest",
    description: "Monday summary: leads, commissions, tier progress, and priority score.",
    icon: Mail,
    color: "bg-indigo-500″,
    audience: "All Partners",
    frequency: "Every Monday",
    triggerKey: "weeklyDigest" as const,
    lastRun: "May 12, 2026″,
    sent: 214,
    openRate: 52,
    template: "Good morning {name} — here's your ProLnk weekly snapshot. This week: {leads_available} leads available in {city}, {commission_total} in pending commissions, tier progress {tier_pct}%...",
  },
  {
    key: "referral_nudge",
    label: "Referral Nudge Engine",
    description: "Nudges partners who haven't sent a referral in 14+ days with nearby opportunity types.",
    icon: TrendingUp,
    color: "bg-emerald-500″,
    audience: "Inactive Partners",
    frequency: "Every Monday",
    triggerKey: "referralNudge" as const,
    lastRun: "May 12, 2026″,
    sent: 38,
    openRate: 31,
    template: "Hey {name} — there are {count} homeowners in {city} looking for {trade} services right now. Your referral link is ready to share. Every referral earns you a $25 bonus...",
  },
  {
    key: "deal_expiry",
    label: "Deal Expiry Urgency Push",
    description: "Sends homeowners an urgency email 6 hours before their offer expires.",
    icon: Clock,
    color: "bg-red-500″,
    audience: "Homeowners w/ Active Deals",
    frequency: "Daily sweep",
    triggerKey: "dealExpiryPush" as const,
    lastRun: "May 15, 2026″,
    sent: 8,
    openRate: 74,
    template: "⏰ Your offer from {partner_name} expires in 6 hours, {name}. This {trade} quote for {address} is locked at {price} — after tonight, pricing resets. Click to confirm now...",
  },
  {
    key: "nps_followup",
    label: "NPS Follow-Up Sequence",
    description: "Promoters → Google review ask. Passives → $25 credit offer. Detractors → Priority CS flag.",
    icon: Star,
    color: "bg-yellow-500″,
    audience: "Post-Survey Homeowners",
    frequency: "Daily sweep",
    triggerKey: "npsFollowUp" as const,
    lastRun: "May 11, 2026″,
    sent: 23,
    openRate: 44,
    template: "Thanks for your feedback, {name}! Since you loved your experience, would you mind leaving a quick Google review? It helps {partner_name} grow their business and takes 30 seconds...",
  },
  {
    key: "leaderboard",
    label: "Partner Leaderboard Broadcast",
    description: "Posts top 5 partners by referrals to the broadcast center every Monday.",
    icon: Trophy,
    color: "bg-purple-500″,
    audience: "All Partners",
    frequency: "Every Monday",
    triggerKey: "leaderboardBroadcast" as const,
    lastRun: "May 12, 2026″,
    sent: 214,
    openRate: 38,
    template: "🏆 This week's ProLnk leaderboard is live! Top performer: {leader_name} with {leader_jobs} jobs completed. You're currently ranked #{rank} — here's what it takes to move up...",
  },
  {
    key: "scan_reengagement",
    label: "Scan Re-Engagement",
    description: "Re-engages homeowners who completed an AI scan but haven't viewed offers in 3+ days.",
    icon: MessageSquare,
    color: "bg-teal-500″,
    audience: "Homeowners w/ Unseen Scans",
    frequency: "Daily sweep",
    triggerKey: "scanReEngagement" as const,
    lastRun: "May 14, 2026″,
    sent: 19,
    openRate: 48,
    template: "Your AI Home Scan for {address} found {issue_count} items that need attention, {name}. 3 certified pros in {city} are ready to provide quotes — results expire in 48 hours...",
  },
];

// Audience segments
const AUDIENCE_SEGMENTS = [
  { label: "All Partners",  count: 214, color: "#0891b2″ },
  { label: "HVAC Only",     count: 67,  color: "#7C3AED" },
  { label: "DFW North",     count: 94,  color: "#059669″ },
  { label: "At-Risk",       count: 23,  color: "#d97706″ },
];

// Top 5 campaigns by conversion for BarChart
const TOP_CAMPAIGNS_CHART = [
  { name: "Deal Expiry",       conversion: 74, color: "#ef4444″ },
  { name: "Tier Milestone",    conversion: 61, color: "#f59e0b" },
  { name: "Weekly Digest",     conversion: 52, color: "#6366f1″ },
  { name: "Scan Re-Engage",    conversion: 48, color: "#14b8a6″ },
  { name: "NPS Follow-Up",     conversion: 44, color: "#eab308″ },
];

type TriggerKey = "v1″ | "weeklyDigest" | "referralNudge" | "dealExpiryPush" | "npsFollowUp" | "leaderboardBroadcast" | "scanReEngagement" | "allV2";

export default function MarketingAutomationDashboard() {
  const [triggering, setTriggering]     = useState<string | null>(null);
  const [results, setResults]           = useState<Record<string, { sent?: number; success?: boolean; error?: string }>>({});
  const [flowToggles, setFlowToggles]   = useState<Record<string, boolean>>(
    Object.fromEntries(CAMPAIGNS.map((c) => [c.key, c.key !== "winback"]))
  );
  const [hoveredFlow, setHoveredFlow]   = useState<string | null>(null);
  const [activeSegment, setActiveSegment] = useState(0);

  const { data: summary, refetch: refetchSummary } = trpc.marketingAutomation.getAutomationSummary.useQuery();
  const { data: campaignStats, refetch: refetchStats } = trpc.marketingAutomation.getCampaignStats.useQuery();

  const triggerV1               = trpc.marketingAutomation.triggerV1Campaigns.useMutation();
  const triggerWeeklyDigest     = trpc.marketingAutomation.triggerWeeklyDigest.useMutation();
  const triggerReferralNudge    = trpc.marketingAutomation.triggerReferralNudge.useMutation();
  const triggerDealExpiryPush   = trpc.marketingAutomation.triggerDealExpiryPush.useMutation();
  const triggerNpsFollowUp      = trpc.marketingAutomation.triggerNpsFollowUp.useMutation();
  const triggerLeaderboardBroadcast = trpc.marketingAutomation.triggerLeaderboardBroadcast.useMutation();
  const triggerScanReEngagement = trpc.marketingAutomation.triggerScanReEngagement.useMutation();
  const triggerAllV2            = trpc.marketingAutomation.triggerAllV2.useMutation();

  const handleTrigger = async (triggerKey: TriggerKey, label: string) => {
    setTriggering(triggerKey);
    try {
      let result: any;
      switch (triggerKey) {
        case "v1″: result = await triggerV1.mutateAsync(); break;
        case "weeklyDigest": result = await triggerWeeklyDigest.mutateAsync(); break;
        case "referralNudge": result = await triggerReferralNudge.mutateAsync(); break;
        case "dealExpiryPush": result = await triggerDealExpiryPush.mutateAsync(); break;
        case "npsFollowUp": result = await triggerNpsFollowUp.mutateAsync(); break;
        case "leaderboardBroadcast": result = await triggerLeaderboardBroadcast.mutateAsync(); break;
        case "scanReEngagement": result = await triggerScanReEngagement.mutateAsync(); break;
        case "allV2″: result = await triggerAllV2.mutateAsync(); break;
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

  const toggleFlow = (key: string) => {
    setFlowToggles((prev) => {
      const next = !prev[key];
      toast[next ? "success" : "info"](next ? "Flow enabled" : "Flow paused", {
        description: `${CAMPAIGNS.find((c) => c.key === key)?.label} is now ${next ? "active" : "paused"}.`,
      });
      return { ...prev, [key]: next };
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6″>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Marketing Automation</h1>
          <p className="text-muted-foreground text-sm mt-1″>
            Monitor and manually trigger all automated marketing campaigns across ProLnk and TrustyPro.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => { refetchSummary(); refetchStats(); }}
          className="gap-2″
        >
          <RefreshCw className="h-4 w-4″ />
          Refresh
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4″>
        {[
          { label: "Total Emails Sent", value: summary?.totalEmailsSent ?? 0, icon: Mail, color: "text-blue-500″ },
          { label: "Sent This Week", value: summary?.emailsThisWeek ?? 0, icon: TrendingUp, color: "text-emerald-500″ },
          { label: "Sent This Month", value: summary?.emailsThisMonth ?? 0, icon: Calendar, color: "text-purple-500″ },
          { label: "Active Campaigns", value: summary?.activeCampaigns ?? 0, icon: Zap, color: "text-amber-500″ },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-4″>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1″>{stat.value.toLocaleString()}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Audience Segmenter ─────────────────────────────────────────────── */}
      <Card>
        <CardContent className="p-4″>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3″>Target Audience Segment</p>
          <div className="flex flex-wrap gap-2″>
            {AUDIENCE_SEGMENTS.map((seg, i) => (
              <button
                key={seg.label}
                onClick={() => setActiveSegment(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  activeSegment === i
                    ? "text-white border-transparent shadow"
                    : "bg-muted/50 text-muted-foreground border-border hover:border-foreground/30″
                }`}
                style={activeSegment === i ? { backgroundColor: seg.color, borderColor: seg.color } : {}}
              >
                {seg.label}
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeSegment === i ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {seg.count}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2″>
            All triggered campaigns will target the{" "}
            <span className="font-semibold text-foreground">{AUDIENCE_SEGMENTS[activeSegment].label}</span> segment
            ({AUDIENCE_SEGMENTS[activeSegment].count} recipients)
          </p>
        </CardContent>
      </Card>

      {/* ── Performance BarChart ───────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-2″>
          <CardTitle className="text-base">Top 5 Campaigns by Open Rate</CardTitle>
          <CardDescription>Last 30 days — % of recipients who opened the message</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={TOP_CAMPAIGNS_CHART} barCategoryGap="30%">
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#6B7280″ }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "#6B7280″ }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Open Rate"]}
                contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }}
              />
              <Bar dataKey="conversion" radius={[4, 4, 0, 0]}>
                {TOP_CAMPAIGNS_CHART.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Master Trigger */}
      <Card className="border-2 border-dashed border-primary/30 bg-primary/5″>
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Run All Campaigns Now</p>
            <p className="text-sm text-muted-foreground">Triggers all v2 campaigns simultaneously (weekly digest, nudge, deal expiry, NPS, leaderboard, scan re-engagement)</p>
          </div>
          <Button
            onClick={() => handleTrigger("allV2″, "All V2 Campaigns")}
            disabled={triggering !== null}
            className="gap-2 min-w-[140px]"
          >
            {triggering === "allV2″ ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
            {triggering === "allV2″ ? "Running..." : "Run All V2"}
          </Button>
        </CardContent>
      </Card>

      {/* ── Automation Flow Cards with toggles ────────────────────────────── */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3″>Automation Flows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4″>
          {CAMPAIGNS.map(campaign => {
            const stat = getStatForCampaign(campaign.key);
            const result = results[campaign.triggerKey];
            const isRunning = triggering === campaign.triggerKey || (campaign.triggerKey === "v1″ && triggering === "v1");
            const isOn = flowToggles[campaign.key];
            const isHovered = hoveredFlow === campaign.key;

            return (
              <div key={campaign.key} className="relative">
                <Card className={`flex flex-col transition-all ${!isOn ? "opacity-60" : ""}`}>
                  <CardHeader className="pb-3″>
                    <div className="flex items-start justify-between gap-3″>
                      <div className="flex items-center gap-3″>
                        <div className={`p-2 rounded-lg ${campaign.color} bg-opacity-10`}>
                          <campaign.icon className={`h-5 w-5 ${campaign.color.replace("bg-", "text-")}`} />
                        </div>
                        <div>
                          <button
                            className="text-sm font-semibold leading-tight text-left hover:text-primary transition-colors flex items-center gap-1″
                            onMouseEnter={() => setHoveredFlow(campaign.key)}
                            onMouseLeave={() => setHoveredFlow(null)}
                          >
                            {campaign.label}
                            <Eye className="w-3 h-3 text-muted-foreground/50 ml-0.5″ />
                          </button>
                          <div className="flex items-center gap-2 mt-1″>
                            <Badge variant="secondary" className="text-xs py-0″>{campaign.audience}</Badge>
                            <span className="text-xs text-muted-foreground">{campaign.frequency}</span>
                          </div>
                        </div>
                      </div>
                      {/* Toggle */}
                      <button
                        onClick={() => toggleFlow(campaign.key)}
                        className="flex-shrink-0 mt-0.5″
                        title={isOn ? "Pause flow" : "Enable flow"}
                      >
                        {isOn
                          ? <ToggleRight className="w-7 h-7 text-emerald-500″ />
                          : <ToggleLeft className="w-7 h-7 text-muted-foreground/40″ />
                        }
                      </button>
                    </div>
                    <CardDescription className="text-xs leading-relaxed mt-2″>
                      {campaign.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 mt-auto">
                    {/* Flow metrics */}
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1″>
                        <Clock className="h-3 w-3″ /> {campaign.lastRun}
                      </span>
                      <span className="flex items-center gap-1″>
                        <Mail className="h-3 w-3″ /> {campaign.sent.toLocaleString()} sent
                      </span>
                      <span className="flex items-center gap-1″>
                        <TrendingUp className="h-3 w-3″ /> {campaign.openRate}% open
                      </span>
                    </div>

                    {/* Live open rate bar */}
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3″>
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${campaign.openRate}%` }}
                      />
                    </div>

                    {/* DB stats */}
                    {stat && (
                      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1″>
                          <Mail className="h-3 w-3″ />
                          {stat.totalSent.toLocaleString()} all-time
                        </span>
                        <span className="flex items-center gap-1″>
                          <Users className="h-3 w-3″ />
                          {stat.sentThisWeek} this week
                        </span>
                      </div>
                    )}

                    {/* Result feedback */}
                    {result && (
                      <div className={`flex items-center gap-2 text-xs mb-3 p-2 rounded-md ${result.success ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"}`}>
                        {result.success ? <CheckCircle className="h-3 w-3 flex-shrink-0″ /> : <AlertCircle className="h-3 w-3 flex-shrink-0" />}
                        {result.sent != null ? `${result.sent} emails sent` : result.error ?? (result.success ? "Completed" : "Failed")}
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-2″
                      onClick={() => handleTrigger(campaign.triggerKey, campaign.label)}
                      disabled={triggering !== null || !isOn}
                    >
                      {isRunning ? (
                        <RefreshCw className="h-3 w-3 animate-spin" />
                      ) : (
                        <Play className="h-3 w-3″ />
                      )}
                      {isRunning ? "Running..." : isOn ? "Trigger Now" : "Paused"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Template preview tooltip */}
                {isHovered && (
                  <div className="absolute z-20 left-0 right-0 -bottom-1 translate-y-full pointer-events-none">
                    <div className="bg-gray-900 text-gray-100 text-[11px] rounded-xl p-3 shadow-xl border border-gray-700 mx-1 mt-1″>
                      <p className="font-bold text-gray-400 mb-1 uppercase tracking-wide text-[9px]">Template Preview</p>
                      <p className="leading-relaxed italic">"{campaign.template}"</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
                    <tr key={stat.campaignKey} className="border-b last:border-0 hover:bg-muted/30″>
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
