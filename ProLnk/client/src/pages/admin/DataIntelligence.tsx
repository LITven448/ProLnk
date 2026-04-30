import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Database, Brain, TrendingUp, Map, Network, BarChart3, Target,
  DollarSign, Users, Home, Activity, Zap, Shield, Award, Trash2, Download, Clock, CheckCircle2, AlertTriangle
} from "lucide-react";

const MILESTONE_LABELS: Record<string, { label: string; color: string }> = {
  building: { label: "Building", color: "bg-slate-500" },
  early_moat: { label: "Early Moat", color: "bg-blue-500" },
  strong_moat: { label: "Strong Moat", color: "bg-purple-500" },
  acquisition_asset: { label: "Acquisition Asset", color: "bg-emerald-500" },
};

const ASSET_ICONS = [Home, Users, Brain, Activity, Network, Map, Target];
const ASSET_COLORS = [
  "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
  "from-amber-500/20 to-amber-600/10 border-amber-500/30",
  "from-rose-500/20 to-rose-600/10 border-rose-500/30",
  "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
  "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30",
];

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function MilestoneProgress({ records, milestones }: { records: number; milestones: Record<string, { target: number; reached: boolean }> }) {
  const targets = Object.entries(milestones).map(([key, val]) => ({ key, ...val }));
  const maxTarget = Math.max(...targets.map(t => t.target));
  const pct = Math.min(100, (records / maxTarget) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatNumber(records)} records</span>
        <span>Target: {formatNumber(maxTarget)}</span>
      </div>
      <Progress value={pct} className="h-2" />
      <div className="flex gap-1 flex-wrap mt-1">
        {targets.map(t => (
          <span
            key={t.key}
            className={`text-xs px-1.5 py-0.5 rounded-full border ${
              t.reached
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                : "bg-slate-500/10 border-slate-500/20 text-muted-foreground"
            }`}
          >
            {t.reached ? "" : ""} {formatNumber(t.target)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DataIntelligence() {
  const { data: summary, isLoading } = trpc.dataIntel.getDataAssetSummary.useQuery();
  const { data: funnelStats } = trpc.dataIntel.getFunnelStats.useQuery();
  const { data: partnerStats } = trpc.dataIntel.getPartnerPerformanceStats.useQuery();
  const { data: propertyStats } = trpc.dataIntel.getPropertyProfileStats.useQuery();
  const { data: aiStats } = trpc.dataIntel.getAiDatasetStats.useQuery();
  const { data: signalStats } = trpc.dataIntel.getAcceptanceSignalStats.useQuery();
  const { data: graphStats } = trpc.dataIntel.getReferralGraphStats.useQuery();
  const { data: geoStats } = trpc.dataIntel.getGeographicDensityStats.useQuery();
  const { data: leaderboard } = trpc.dataIntel.getPartnerLeaderboard.useQuery({ limit: 5 });

  if (isLoading) {
    return (
      <AdminLayout>
      <div className="p-6 space-y-4">
        <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
      </AdminLayout>
    );
  }

  const totalValue = summary?.totalEstimatedDataValue ?? 0;

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Database className="w-6 h-6 text-emerald-400" />
            Data Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            Proprietary data assets that build acquisition value. Every record compounds your moat.
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-emerald-400">{formatCurrency(totalValue)}</div>
          <div className="text-xs text-muted-foreground">Estimated Data Asset Value</div>
        </div>
      </div>

      {/* Acquisition Value Banner */}
      <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-transparent">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-emerald-300">Your Data Moat Is Being Built</p>
              <p className="text-sm text-muted-foreground">
                These 7 datasets are proprietary -- no competitor can replicate them without your network and time.
                At 500 partners and $3M ARR, this data portfolio justifies a <strong className="text-white">15-25x ARR acquisition multiple</strong> from ServiceTitan or Jobber.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7 Asset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {summary?.assets.map((asset, i) => {
          const Icon = ASSET_ICONS[i] ?? Database;
          const colorClass = ASSET_COLORS[i] ?? ASSET_COLORS[0];
          const milestone = MILESTONE_LABELS[asset.milestone] ?? MILESTONE_LABELS.building;
          return (
            <Card key={asset.id} className={`border bg-gradient-to-br ${colorClass}`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <CardTitle className="text-sm font-semibold">{asset.name}</CardTitle>
                  </div>
                  <Badge className={`text-xs text-white ${milestone.color}`}>
                    {milestone.label}
                  </Badge>
                </div>
                <CardDescription className="text-xs">{asset.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{formatNumber(asset.records)}</span>
                  <span className="text-sm font-semibold text-emerald-400">{formatCurrency(asset.estimatedValue)}</span>
                </div>
                {asset.id === 1 && propertyStats && (
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div>Detections: {formatNumber(propertyStats.profilesWithDetections)} - Conversions: {formatNumber(propertyStats.profilesWithConversions)}</div>
                    <div>Total Revenue: {formatCurrency(propertyStats.totalRevenue)}</div>
                  </div>
                )}
                {asset.id === 2 && partnerStats && (
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div>Avg Health Score: {partnerStats.avgHealthScore.toFixed(0)}/100</div>
                    <div>High Churn Risk: {partnerStats.highChurnRiskCount} partners</div>
                  </div>
                )}
                {asset.id === 3 && aiStats && (
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div>Validated: {formatNumber(aiStats.validatedRecords)} - Avg Confidence: {(aiStats.avgConfidenceScore * 100).toFixed(0)}%</div>
                    <div>Approved for Training: {formatNumber(aiStats.approvedForTraining)}</div>
                  </div>
                )}
                {asset.id === 4 && funnelStats && (
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div>Overall Conversion: {(funnelStats.overallConversionRate * 100).toFixed(1)}%</div>
                    <div>Stages Tracked: {funnelStats.funnel.length}</div>
                  </div>
                )}
                {asset.id === 5 && graphStats && (
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div>Network Value: {formatCurrency(graphStats.totalNetworkValue)}</div>
                    <div>Avg Strength: {graphStats.avgRelationshipStrength.toFixed(0)}/100</div>
                  </div>
                )}
                {asset.id === 6 && geoStats && (
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div>Zips Covered: {geoStats.totalZipsCovered}</div>
                    <div>High Gap Zips: {geoStats.highGapZipCount}</div>
                  </div>
                )}
                {asset.id === 7 && signalStats && (
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div>Acceptance Rate: {(signalStats.overallAcceptanceRate * 100).toFixed(1)}%</div>
                    <div>Avg Discount Accepted: {signalStats.avgAcceptedDiscountPct.toFixed(1)}%</div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="funnel">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="partners">Partner Scores</TabsTrigger>
          <TabsTrigger value="signals">Acceptance Signals</TabsTrigger>
          <TabsTrigger value="graph">Referral Graph</TabsTrigger>
        </TabsList>

        {/* Funnel Tab */}
        <TabsContent value="funnel" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Conversion Funnel -- End-to-End
              </CardTitle>
              <CardDescription>
                Every step from AI detection to commission paid. 12+ months of this data is required for a 15-25x ARR multiple.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {funnelStats ? (
                <div className="space-y-2">
                  {funnelStats.funnel.map((stage, i) => (
                    <div key={stage.stage} className="flex items-center gap-3">
                      <div className="w-32 text-xs text-muted-foreground capitalize shrink-0">
                        {stage.stage.replace(/_/g, " ")}
                      </div>
                      <div className="flex-1">
                        <Progress
                          value={funnelStats.funnel[0].count > 0 ? (stage.count / funnelStats.funnel[0].count) * 100 : 0}
                          className="h-3"
                        />
                      </div>
                      <div className="w-16 text-right text-sm font-medium">{formatNumber(stage.count)}</div>
                      {i > 0 && (
                        <div className={`w-14 text-right text-xs ${stage.conversionFromPrevious > 0.5 ? "text-emerald-400" : "text-amber-400"}`}>
                          {(stage.conversionFromPrevious * 100).toFixed(0)}%
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pt-3 border-t mt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Overall Conversion (Detected  Accepted)</span>
                      <span className="font-bold text-emerald-400">
                        {(funnelStats.overallConversionRate * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No funnel events recorded yet. Events are captured automatically as opportunities move through the pipeline.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Partner Scores Tab */}
        <TabsContent value="partners" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Award className="w-4 h-4" />
                  Partner Health Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboard && leaderboard.length > 0 ? (
                  <div className="space-y-3">
                    {leaderboard.map((entry, i) => (
                      <div key={entry.score.id} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 0 ? "bg-amber-500 text-black" : i === 1 ? "bg-slate-400 text-black" : i === 2 ? "bg-amber-700 text-white" : "bg-muted text-muted-foreground"
                        }`}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{entry.partner?.businessName ?? "Unknown"}</div>
                          <div className="text-xs text-muted-foreground">{entry.partner?.businessType}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-bold ${
                            (entry.score.healthScore ?? 0) >= 70 ? "text-emerald-400" :
                            (entry.score.healthScore ?? 0) >= 40 ? "text-amber-400" : "text-rose-400"
                          }`}>
                            {entry.score.healthScore ?? 0}/100
                          </div>
                          <div className="text-xs text-muted-foreground capitalize">{entry.score.churnRisk} risk</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No performance scores calculated yet. Scores are computed from live opportunity data.</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="w-4 h-4" />
                  Network Health Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {partnerStats ? (
                  <>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Avg Health Score</span>
                        <span className="font-medium">{partnerStats.avgHealthScore.toFixed(0)}/100</span>
                      </div>
                      <Progress value={partnerStats.avgHealthScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Avg Close Rate</span>
                        <span className="font-medium">{(partnerStats.avgCloseRate * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={partnerStats.avgCloseRate * 100} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t">
                      <span className="text-muted-foreground">High Churn Risk Partners</span>
                      <span className={`font-bold ${partnerStats.highChurnRiskCount > 5 ? "text-rose-400" : "text-emerald-400"}`}>
                        {partnerStats.highChurnRiskCount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Commissions Tracked</span>
                      <span className="font-bold text-emerald-400">{formatCurrency(partnerStats.totalCommissionsTracked)}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-sm">No scores available yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Acceptance Signals Tab */}
        <TabsContent value="signals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Homeowner Acceptance Signals
              </CardTitle>
              <CardDescription>
                Price sensitivity and acceptance patterns. After 10,000 records this becomes a proprietary pricing intelligence dataset worth $5M+.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {signalStats && signalStats.totalSignals > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">{(signalStats.overallAcceptanceRate * 100).toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">Acceptance Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{signalStats.avgAcceptedDiscountPct.toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">Avg Discount Accepted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{signalStats.avgResponseTimeHours.toFixed(1)}h</div>
                      <div className="text-xs text-muted-foreground">Avg Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{formatNumber(signalStats.totalSignals)}</div>
                      <div className="text-xs text-muted-foreground">Total Signals</div>
                    </div>
                  </div>
                  {signalStats.byTrade.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Acceptance by Trade</p>
                      <div className="space-y-2">
                        {signalStats.byTrade.map((t) => (
                          <div key={t.trade} className="flex items-center gap-3">
                            <div className="w-32 text-xs text-muted-foreground truncate">{t.trade}</div>
                            <div className="flex-1">
                              <Progress
                                value={t.total > 0 ? (Number(t.accepted) / t.total) * 100 : 0}
                                className="h-2"
                              />
                            </div>
                            <div className="text-xs w-12 text-right">
                              {t.total > 0 ? ((Number(t.accepted) / t.total) * 100).toFixed(0) : 0}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No acceptance signals recorded yet. Signals are captured automatically when homeowners respond to offers.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referral Graph Tab */}
        <TabsContent value="graph" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-4 h-4" />
                Referral Graph -- Partner-to-Partner Network
              </CardTitle>
              <CardDescription>
                Which trades refer to which. This graph is unique to ProLnk -- no competitor has this relationship data at scale.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {graphStats && graphStats.totalRelationships > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{formatNumber(graphStats.totalRelationships)}</div>
                      <div className="text-xs text-muted-foreground">Partner Relationships</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">{formatCurrency(graphStats.totalNetworkValue)}</div>
                      <div className="text-xs text-muted-foreground">Total Network Value</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{graphStats.avgRelationshipStrength.toFixed(0)}/100</div>
                      <div className="text-xs text-muted-foreground">Avg Relationship Strength</div>
                    </div>
                  </div>
                  {graphStats.topTradePairs.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Top Trade Pairs by Value</p>
                      <div className="space-y-2">
                        {graphStats.topTradePairs.map((pair, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {pair.sourceTrade ?? "Unknown"}  {pair.receivingTrade ?? "Unknown"}
                            </span>
                            <div className="flex gap-4 text-right">
                              <span>{formatNumber(Number(pair.totalReferrals ?? 0))} refs</span>
                              <span className="text-emerald-400 font-medium">{formatCurrency(Number(pair.totalValue ?? 0))}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No referral graph edges recorded yet. Edges are created automatically when referrals are routed between partners.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Milestone Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Acquisition Value Milestones
          </CardTitle>
          <CardDescription>
            The data milestones that unlock each tier of acquisition value. Track your progress toward the irreversibility threshold.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Proof of Concept", target: "100 partners + 1K training images", value: "$500K-$2M", reached: (summary?.assets[2]?.records ?? 0) >= 1000 },
              { label: "Early Moat", target: "250 partners + 10K images + 6mo NRR data", value: "$5M-$15M", reached: (summary?.assets[2]?.records ?? 0) >= 10000 },
              { label: "Strong Moat", target: "500 partners + 50K images + 12mo NRR", value: "$30M-$80M", reached: (summary?.assets[2]?.records ?? 0) >= 50000 },
              { label: "Acquisition Asset", target: "1K partners + 100K images + 2 patents + $3M ARR", value: "$96M-$200M", reached: (summary?.assets[2]?.records ?? 0) >= 100000 },
            ].map((milestone) => (
              <div key={milestone.label} className={`flex items-start gap-3 p-3 rounded-lg border ${
                milestone.reached ? "border-emerald-500/40 bg-emerald-500/10" : "border-border bg-muted/20"
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  milestone.reached ? "bg-emerald-500 text-black" : "bg-muted text-muted-foreground"
                }`}>
                  {milestone.reached ? <Zap className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                </div>
                <div>
                  <div className="font-semibold text-sm">{milestone.label}</div>
                  <div className="text-xs text-muted-foreground">{milestone.target}</div>
                  <div className={`text-sm font-bold mt-1 ${milestone.reached ? "text-emerald-400" : "text-muted-foreground"}`}>
                    {milestone.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Retention Policy */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Data Retention Policy
        </CardTitle>
        <CardDescription>
          Configure how long each data type is retained. Changes take effect at the next scheduled cleanup (runs daily at 2am UTC).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { label: "Job Photos (non-AI-labeled)", retention: "90 days", autoDelete: true, description: "Raw photos not yet labeled for AI training are purged after 90 days to reduce storage costs." },
            { label: "AI-Labeled Training Images", retention: "Indefinite", autoDelete: false, description: "Photos approved for AI training are retained permanently as a core data asset." },
            { label: "Homeowner Property Profiles", retention: "Account lifetime", autoDelete: false, description: "Retained while the homeowner account is active. Deleted within 30 days of account deletion request (CCPA)." },
            { label: "Partner Commission Records", retention: "7 years", autoDelete: false, description: "Required for IRS 1099 reporting and financial audits." },
            { label: "Activity Logs", retention: "12 months", autoDelete: true, description: "System event logs are rolled after 12 months. Audit logs are retained separately." },
            { label: "Homeowner Data Export Requests", retention: "30 days", autoDelete: true, description: "Export files are available for 30 days after generation, then auto-deleted." },
          ].map((policy) => (
            <div key={policy.label} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border bg-muted/10">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{policy.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    policy.autoDelete ? "bg-amber-500/20 text-amber-600" : "bg-emerald-500/20 text-emerald-600"
                  }`}>
                    {policy.retention}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{policy.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {policy.autoDelete ? (
                  <span className="flex items-center gap-1 text-xs text-amber-600">
                    <Trash2 className="w-3.5 h-3.5" /> Auto-delete
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Permanent
                  </span>
                )}
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              All data handling complies with CCPA (California Consumer Privacy Act) and GDPR Article 17 (Right to Erasure).
              Homeowners can request data deletion at any time from their account settings.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

      {/* Pending Data Export Requests */}
      <DataExportQueue />

    </div>
    </AdminLayout>
  );
}

function DataExportQueue() {
  const { data: exportRequests, refetch } = trpc.admin.getDataExportRequests.useQuery();
  const processExportMutation = trpc.admin.processDataExport.useMutation({
    onSuccess: () => { toast.success("Export processed and ready for download"); refetch(); },
    onError: () => toast.error("Failed to process export"),
  });

  const requests = exportRequests ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Pending Data Export Requests
        </CardTitle>
        <CardDescription>
          Homeowners can request a full export of their data under CCPA. Process requests within 45 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">No pending export requests</p>
            <p className="text-xs text-muted-foreground mt-1">All homeowner data export requests have been fulfilled.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((req: any) => (
              <div key={req.id} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-muted/10">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    req.status === 'pending' ? 'bg-amber-100' : req.status === 'processing' ? 'bg-blue-100' : 'bg-emerald-100'
                  }`}>
                    {req.status === 'pending' ? <Clock className="w-4 h-4 text-amber-600" /> :
                     req.status === 'processing' ? <Activity className="w-4 h-4 text-blue-600" /> :
                     <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{req.homeownerEmail || `Homeowner #${req.homeownerId}`}</p>
                    <p className="text-xs text-muted-foreground">Requested {new Date(req.requestedAt).toLocaleDateString()} · {req.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {req.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => processExportMutation.mutate({ requestId: req.id })}
                      disabled={processExportMutation.isPending}
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Process
                    </Button>
                  )}
                  {req.exportUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={req.exportUrl} target="_blank" rel="noreferrer">Download</a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
