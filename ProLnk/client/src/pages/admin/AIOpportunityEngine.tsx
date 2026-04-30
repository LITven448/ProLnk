import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  FunnelChart, Funnel, LabelList, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { Zap, Camera, TrendingUp, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, UserPlus, X } from "lucide-react";
import { useState as _useState } from "react";
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

  // Detection type breakdown
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

  // Conversion funnel
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

  // Revenue attribution
  const totalRevenue = opportunities.filter((o: any) => o.status === "closed").reduce((sum: number, o: any) => sum + Number(o.estimatedValue ?? 0), 0);
  const platformFees = totalRevenue * 0.12;
  const referralCommissions = totalRevenue * 0.05;

  const conversionRate = total > 0 ? Math.round((closed / total) * 100) : 0;

  return (
    <AdminLayout title="AI Opportunity Engine" subtitle="Photo analysis pipeline  Detection intelligence  Revenue attribution">
      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Detected", value: total, icon: Zap, color: "#00B5B8", suffix: "" },
          { label: "Conversion Rate", value: conversionRate, icon: TrendingUp, color: "#10B981", suffix: "%" },
          { label: "Platform Fees Earned", value: Math.round(platformFees), icon: DollarSign, color: "#8B5CF6", prefix: "$" },
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
                    <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E9ECEF", borderRadius: 8, color: "#fff" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 mt-2">
                {detectionData.slice(0, 5).map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: DETECTION_COLORS[i % DETECTION_COLORS.length] }} />
                    <span className="flex-1 truncate" style={{ color: "#8BA3C7" }}>{d.name}</span>
                    <span className="font-mono" style={{ color: "#fff" }}>{d.value}</span>
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
            {funnelData.map((stage, i) => {
              const pct = funnelData[0].value > 0 ? Math.round((stage.value / funnelData[0].value) * 100) : 0;
              return (
                <div key={stage.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#8BA3C7" }}>{stage.name}</span>
                    <span className="font-mono" style={{ color: stage.fill }}>{stage.value} ({pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#1E3A5F" }}>
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
              { label: "Total Job Value", value: totalRevenue, color: "#8BA3C7", prefix: "$" },
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
            {/* Status filter */}
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
              className="p-1.5 rounded-lg transition-colors hover:bg-white/5"
              title="Refresh"
            >
              <RefreshCw className="w-3.5 h-3.5" style={{ color: "#7B809A" }} />
            </button>
          </div>
        </div>

        <div className="divide-y divide-[#1E3A5F]">
          {isLoading && (
            <div className="px-4 py-8 text-center text-sm" style={{ color: "#7B809A" }}>Loading opportunity feed...</div>
          )}
          {!isLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Zap className="w-10 h-10 mb-3" style={{ color: "#1E3A5F" }} />
              <p className="text-sm font-medium text-gray-800">No opportunities yet</p>
              <p className="text-xs mt-1" style={{ color: "#7B809A" }}>Opportunities appear here as partners log jobs with photos</p>
            </div>
          )}
                {filtered.map((opp: any) => {
            const cfg = STATUS_CONFIG[opp.status] ?? STATUS_CONFIG.pending;
            return (
              <div key={opp.id} className="flex items-start gap-4 px-4 py-4 hover:bg-white/2 transition-colors group">
                {/* Status icon */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${cfg.color}20` }}>
                  <cfg.icon className="w-4 h-4" style={{ color: cfg.color }} />
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-800 text-sm">{opp.opportunityType?.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) ?? "Unknown"}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}>{cfg.label}</span>
                    {opp.confidenceScore && (
                      <span className="text-xs font-mono" style={{ color: "#7B809A" }}>
                        {Math.round(Number(opp.confidenceScore) * 100)}% confidence
                      </span>
                    )}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#7B809A" }}>
                    {opp.description ?? "AI detected opportunity from job photo analysis"}
                  </div>
                  {/* Confidence bar */}
                  {opp.confidenceScore && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 max-w-32 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#1E3A5F" }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.round(Number(opp.confidenceScore) * 100)}%`, backgroundColor: cfg.color }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Value + time + assign */}
                <div className="text-right flex-shrink-0 space-y-1">
                  {opp.estimatedValue && (
                    <div className="font-heading text-sm" style={{ color: "#10B981" }}>${Number(opp.estimatedValue).toFixed(0)}</div>
                  )}
                  <div className="text-xs" style={{ color: "#7B809A" }}>
                    {new Date(opp.createdAt).toLocaleDateString()}
                  </div>
                  {opp.status === "pending" && (
                    <button
                      onClick={() => setAssignOpp(opp)}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: "#00B5B815", color: "#00B5B8", border: "1px solid #00B5B830" }}
                    >
                      <UserPlus className="w-3 h-3" />
                      Assign
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
