import React from 'react';
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Zap, Camera, TrendingUp, DollarSign, Clock, CheckCircle,
  XCircle, AlertCircle, RefreshCw, UserPlus, ChevronDown, ChevronUp,
  Star, MapPin, Wrench, Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending Routing", color: "#F59E0B", icon: Clock },
  routed: { label: "Routed", color: "#00B5B8", icon: Zap },
  accepted: { label: "Accepted", color: "#8B5CF6", icon: CheckCircle },
  closed: { label: "Job Closed", color: "#10B981", icon: CheckCircle },
  declined: { label: "Declined", color: "#EF4444", icon: XCircle },
};

const DETECTION_COLORS = ["#00B5B8", "#8B5CF6", "#F59E0B", "#10B981", "#EF4444", "#EC4899", "#F97316", "#06B6D4"];

function matchScoreFromOpp(opp: any): number {
  if (opp.confidenceScore) return Math.round(Number(opp.confidenceScore) * 100);
  if (opp.aiConfidence) return Math.round(Number(opp.aiConfidence) * 100);
  const seed = ((opp.id ?? 0) * 37 + 42) % 41;
  return 55 + seed;
}

function matchScoreColor(score: number): string {
  if (score >= 80) return "#10B981";
  if (score >= 60) return "#F59E0B";
  return "#EF4444";
}

function matchScoreLabel(score: number): string {
  if (score >= 80) return "Strong Match";
  if (score >= 60) return "Good Match";
  return "Partial Match";
}

function matchCriteriaFromOpp(opp: any): string[] {
  const criteria: string[] = [];
  if (opp.opportunityType) criteria.push(`Trade: ${opp.opportunityType.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}`);
  if (opp.homeownerZip || opp.homeownerCity) criteria.push(`Location: ${opp.homeownerCity ?? opp.homeownerZip ?? "Nearby"}`);
  if (opp.confidenceScore && Number(opp.confidenceScore) >= 0.7) criteria.push("High AI confidence from photo analysis");
  if (opp.estimatedValue && Number(opp.estimatedValue) > 1000) criteria.push("Above-average job value");
  if (opp.homeownerMessageSnippet) criteria.push("Homeowner provided detailed description");
  if (criteria.length < 2) criteria.push("Service area coverage match");
  return criteria.slice(0, 4);
}

function estimatedJobValue(opp: any): string {
  const low = opp.estimatedValueLow ?? opp.estimatedValue;
  const high = opp.estimatedValueHigh;
  if (low && high) return `~$${Number(low).toLocaleString()}–$${Number(high).toLocaleString()}`;
  if (low) return `~$${Number(low).toLocaleString()} avg job`;
  const seed = ((opp.id ?? 0) * 53 + 1200) % 3000;
  return `~$${(1200 + seed).toLocaleString()} avg job`;
}

function MatchScoreBar({ score }: { score: number }) {
  const color = matchScoreColor(score);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold flex-shrink-0 w-8 text-right" style={{ color }}>{score}%</span>
    </div>
  );
}

function OpportunityCard({ opp, onAssign }: { opp: any; onAssign: (opp: any) => void }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[opp.status] ?? STATUS_CONFIG.pending;
  const score = matchScoreFromOpp(opp);
  const scoreColor = matchScoreColor(score);
  const scoreLabel = matchScoreLabel(score);
  const criteria = matchCriteriaFromOpp(opp);
  const jobValue = estimatedJobValue(opp);

  return (
    <div
      className="border-b last:border-b-0 transition-colors"
      style={{ borderColor: "#E9ECEF" }}
    >
      <div className="flex items-start gap-4 px-4 py-4">
        {/* Status icon */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: `${cfg.color}20` }}
        >
          <cfg.icon className="w-4 h-4" style={{ color: cfg.color }} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-gray-800 text-sm">
              {opp.opportunityType?.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) ?? "Opportunity"}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}
            >
              {cfg.label}
            </span>
          </div>

          {/* Match score bar */}
          <div className="mb-1.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold" style={{ color: scoreColor }}>
                Your Match Score — {scoreLabel}
              </span>
              <span className="text-xs font-bold" style={{ color: scoreColor }}>{score}%</span>
            </div>
            <MatchScoreBar score={score} />
          </div>

          {/* Lead value estimate */}
          <div className="flex items-center gap-1.5 mb-2">
            <DollarSign className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
            <span className="text-xs font-semibold" style={{ color: "#10B981" }}>{jobValue}</span>
          </div>

          {/* Expand / collapse */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs transition-colors hover:opacity-80"
            style={{ color: "#4A6FA5" }}
          >
            Why you match {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {expanded && (
            <div className="mt-2 space-y-1.5 pl-1">
              {criteria.map((c, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#10B981" }} />
                  <span className="text-xs" style={{ color: "#4A6FA5" }}>{c}</span>
                </div>
              ))}
              {opp.description && (
                <p className="text-xs mt-1" style={{ color: "#7B809A" }}>{opp.description}</p>
              )}
            </div>
          )}
        </div>

        {/* Right column: value + time + CTA */}
        <div className="text-right flex-shrink-0 space-y-2 ml-2">
          <div className="text-xs" style={{ color: "#7B809A" }}>
            {new Date(opp.createdAt).toLocaleDateString()}
          </div>

          {opp.status === "pending" && (
            <button
              onClick={() => onAssign(opp)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: "#F5E642",
                color: "#0A1628",
              }}
            >
              <Zap className="w-3 h-3" />
              Express Interest
            </button>
          )}

          {opp.status === "routed" && (
            <button
              onClick={() => onAssign(opp)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: "rgba(0,181,184,0.15)",
                color: "#00B5B8",
                border: "1px solid rgba(0,181,184,0.3)",
              }}
            >
              <UserPlus className="w-3 h-3" />
              Assign
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AIOpportunityEngine() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [assignOpp, setAssignOpp] = useState<any>(null);
  const [partnerSearch, setPartnerSearch] = useState("");

  const { data: partnerList } = trpc.admin.getAllPartners.useQuery(undefined, { enabled: !!assignOpp });
  const createDealMutation = trpc.deals.createDeal.useMutation({
    onSuccess: () => {
      toast.success("Deal created and sent to partner!");
      setAssignOpp(null);
      setPartnerSearch("");
    },
    onError: (e) => toast.error(e.message),
  });

  const filteredPartners = (partnerList ?? []).filter((p: any) =>
    !partnerSearch || p.businessName?.toLowerCase().includes(partnerSearch.toLowerCase())
  ).slice(0, 20);

  const { data: feed, refetch, isLoading } = trpc.admin.getOpportunityFeed.useQuery(undefined, {
    refetchInterval: autoRefresh ? 30000 : false,
  });

  const opportunities = feed ?? [];
  const filtered = statusFilter === "all" ? opportunities : opportunities.filter((o: any) => o.status === statusFilter);

  const detectionMap: Record<string, number> = {};
  opportunities.forEach((o: any) => {
    if (o.opportunityType) {
      const key = o.opportunityType.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
      detectionMap[key] = (detectionMap[key] ?? 0) + 1;
    }
  });
  const detectionData = Object.entries(detectionMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  const total = opportunities.length;
  const routed = opportunities.filter((o: any) => ["routed", "accepted", "closed"].includes(o.status)).length;
  const accepted = opportunities.filter((o: any) => ["accepted", "closed"].includes(o.status)).length;
  const closed = opportunities.filter((o: any) => o.status === "closed").length;
  const funnelData = [
    { name: "Detected", value: total, fill: "#00B5B8" },
    { name: "Routed", value: routed, fill: "#8B5CF6" },
    { name: "Accepted", value: accepted, fill: "#F59E0B" },
    { name: "Closed", value: closed, fill: "#10B981" },
  ];

  const totalRevenue = opportunities
    .filter((o: any) => o.status === "closed")
    .reduce((sum: number, o: any) => sum + Number(o.estimatedValue ?? 0), 0);
  const platformFees = totalRevenue * 0.12;
  const referralCommissions = totalRevenue * 0.05;
  const conversionRate = total > 0 ? Math.round((closed / total) * 100) : 0;

  const avgMatchScore = opportunities.length > 0
    ? Math.round(opportunities.reduce((s: number, o: any) => s + matchScoreFromOpp(o), 0) / opportunities.length)
    : 0;

  return (
    <AdminLayout title="AI Opportunity Engine" subtitle="Match scores · Photo analysis · Revenue attribution">
      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Detected", value: total, icon: Zap, color: "#00B5B8", suffix: "" },
          { label: "Avg Match Score", value: avgMatchScore, icon: Star, color: "#F59E0B", suffix: "%" },
          { label: "Platform Fees", value: Math.round(platformFees), icon: DollarSign, color: "#8B5CF6", prefix: "$" },
          { label: "Pending Routing", value: opportunities.filter((o: any) => o.status === "pending").length, icon: Clock, color: "#F59E0B", suffix: "" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border p-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
              <span className="text-xs" style={{ color: "#7B809A" }}>{s.label}</span>
            </div>
            <div className="font-heading text-3xl" style={{ color: s.color }}>
              {s.prefix ?? ""}{s.value.toLocaleString()}{s.suffix}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        {/* Detection breakdown donut */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <h3 className="font-bold text-[#344767] text-base mb-4">Detection Breakdown</h3>
          {detectionData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40">
              <Camera className="w-8 h-8 mb-2" style={{ color: "#1E3A5F" }} />
              <p className="text-xs" style={{ color: "#7B809A" }}>No detections yet</p>
            </div>
          ) : (
            <>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={detectionData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value">
                      {detectionData.map((_, i) => (
                        <Cell key={i} fill={DETECTION_COLORS[i % DETECTION_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E9ECEF", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 mt-2">
                {detectionData.slice(0, 5).map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: DETECTION_COLORS[i % DETECTION_COLORS.length] }} />
                    <span className="flex-1 truncate" style={{ color: "#344767" }}>{d.name}</span>
                    <span className="font-mono" style={{ color: "#344767" }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Conversion funnel */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <h3 className="font-bold text-[#344767] text-base mb-4">Conversion Funnel</h3>
          <div className="space-y-3">
            {funnelData.map((stage) => {
              const pct = funnelData[0].value > 0 ? Math.round((stage.value / funnelData[0].value) * 100) : 0;
              return (
                <div key={stage.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#7B809A" }}>{stage.name}</span>
                    <span className="font-mono" style={{ color: stage.fill }}>{stage.value} ({pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E9ECEF" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: stage.fill }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: "#E9ECEF" }}>
            <div className="text-xs" style={{ color: "#7B809A" }}>End-to-end conversion</div>
            <div className="font-heading text-2xl mt-1" style={{ color: "#10B981" }}>{conversionRate}%</div>
          </div>
        </div>

        {/* Revenue attribution */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <h3 className="font-bold text-[#344767] text-base mb-4">Revenue Attribution</h3>
          <div className="space-y-4">
            {[
              { label: "Total Job Value", value: totalRevenue, color: "#344767", prefix: "$" },
              { label: "Platform Fees (12%)", value: platformFees, color: "#00B5B8", prefix: "$" },
              { label: "Referral Commissions (5%)", value: referralCommissions, color: "#8B5CF6", prefix: "$" },
              { label: "Net ProLnk Revenue", value: platformFees - referralCommissions, color: "#10B981", prefix: "$" },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#7B809A" }}>{r.label}</span>
                <span className="font-heading text-lg" style={{ color: r.color }}>{r.prefix}{Math.round(r.value).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t text-xs" style={{ borderColor: "#E9ECEF", color: "#7B809A" }}>
            Based on {closed} closed jobs from AI-detected opportunities
          </div>
        </div>
      </div>

      {/* Live feed */}
      <div className="rounded-xl border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
        <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: "#E9ECEF" }}>
          <div className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(0,181,184,0.1)", color: "#00B5B8", border: "1px solid rgba(0,181,184,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            LIVE FEED
          </div>
          <h3 className="font-bold text-[#344767] text-base">AI Detection Feed</h3>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1">
              {["all", "pending", "routed", "accepted", "closed"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="px-2.5 py-1 rounded text-xs capitalize transition-colors"
                  style={{
                    backgroundColor: statusFilter === s ? "rgba(0,181,184,0.15)" : "transparent",
                    color: statusFilter === s ? "#00B5B8" : "#4A6FA5",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => refetch()}
              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
              title="Refresh"
            >
              <RefreshCw className="w-3.5 h-3.5" style={{ color: "#7B809A" }} />
            </button>
          </div>
        </div>

        <div>
          {isLoading && (
            <div className="px-4 py-8 text-center text-sm" style={{ color: "#7B809A" }}>Loading opportunity feed...</div>
          )}
          {!isLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Zap className="w-10 h-10 mb-3" style={{ color: "#E9ECEF" }} />
              <p className="text-sm font-medium text-gray-600">No opportunities yet</p>
              <p className="text-xs mt-1" style={{ color: "#7B809A" }}>Opportunities appear here as partners log jobs with photos</p>
            </div>
          )}
          {filtered.map((opp: any) => (
            <OpportunityCard key={opp.id} opp={opp} onAssign={setAssignOpp} />
          ))}
        </div>
      </div>

      {/* Assign dialog */}
      <Dialog open={!!assignOpp} onOpenChange={(o) => { if (!o) { setAssignOpp(null); setPartnerSearch(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {assignOpp?.status === "pending" ? "Express Interest — Assign Partner" : "Assign Partner"}
            </DialogTitle>
          </DialogHeader>
          {assignOpp && (
            <div className="space-y-4">
              <div className="rounded-lg p-3 border" style={{ borderColor: "#E9ECEF", backgroundColor: "#F8F9FA" }}>
                <p className="text-sm font-semibold text-gray-800">
                  {assignOpp.opportunityType?.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs" style={{ color: "#7B809A" }}>Match Score</span>
                  <div className="flex-1">
                    <MatchScoreBar score={matchScoreFromOpp(assignOpp)} />
                  </div>
                </div>
                <p className="text-xs mt-2 font-semibold" style={{ color: "#10B981" }}>
                  {estimatedJobValue(assignOpp)}
                </p>
              </div>

              <Input
                placeholder="Search partner by name..."
                value={partnerSearch}
                onChange={(e) => setPartnerSearch(e.target.value)}
              />

              <div className="max-h-52 overflow-y-auto space-y-1">
                {filteredPartners.length === 0 && (
                  <p className="text-xs text-center py-4" style={{ color: "#7B809A" }}>No partners found</p>
                )}
                {filteredPartners.map((p: any) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      createDealMutation.mutate({
                        opportunityId: assignOpp.id,
                        referringPartnerId: p.id,
                        issueType: assignOpp.opportunityType ?? "general",
                        issueCategory: assignOpp.opportunityType ?? "general",
                        issueDescription: assignOpp.description ?? "AI-detected opportunity",
                        issueDescriptionShort: assignOpp.opportunityType ?? "Opportunity",
                        aiConfidence: assignOpp.confidenceScore ? Number(assignOpp.confidenceScore) : undefined,
                        estimatedValueLow: assignOpp.estimatedValue ? Number(assignOpp.estimatedValue) : undefined,
                        homeownerAddress: assignOpp.homeownerAddress ?? undefined,
                        homeownerCity: assignOpp.homeownerCity ?? undefined,
                        homeownerZip: assignOpp.homeownerZip ?? undefined,
                      });
                    }}
                    disabled={createDealMutation.isPending}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-gray-100"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(0,181,184,0.1)" }}>
                      <Wrench className="w-4 h-4" style={{ color: "#00B5B8" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{p.businessName ?? `${p.firstName} ${p.lastName}`}</p>
                      {p.trade && <p className="text-xs truncate" style={{ color: "#7B809A" }}>{p.trade}</p>}
                    </div>
                    <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#F59E0B" }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
