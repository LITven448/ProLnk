import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import {
  CheckCircle, Circle, DollarSign, Clock, Camera, MessageSquare,
  Bell, Share2, ExternalLink, ChevronDown, ChevronUp, User
} from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Number(n ?? 0) / 100);
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-gray-500/20 text-gray-400 border-gray-500/30″,
  scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30″,
  charged: "bg-amber-500/20 text-amber-400 border-amber-500/30″,
  paid: "bg-green-500/20 text-green-400 border-green-500/30″,
  failed: "bg-red-500/20 text-red-400 border-red-500/30″,
};

const PHASE_DESCRIPTIONS: Record<string, string> = {
  deposit: "Initial deposit to begin work and secure materials",
  materials: "Materials and supplies purchased and delivered",
  rough_in: "Rough-in work and structural components installed",
  inspection: "Work inspected and approved by relevant authorities",
  final: "Final walkthrough and completion sign-off",
  warranty: "30-day warranty period begins",
};

interface ProgressRingProps {
  pct: number;
  size?: number;
  strokeWidth?: number;
}

function ProgressRing({ pct, size = 120, strokeWidth = 10 }: ProgressRingProps) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="transform -rotate-90″>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="#2dd4bf"
        strokeWidth={strokeWidth}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

const DEMO_UPDATES = [
  { author: "Marcus T.", time: "2 hours ago", text: "HVAC unit installed. Running diagnostic now — everything looks good so far." },
  { author: "Marcus T.", time: "Yesterday", text: "Old unit removed, area prepped for new installation. Starting tomorrow morning." },
  { author: "Marcus T.", time: "3 days ago", text: "Materials delivered and staged. Ready to begin installation phase." },
];

const DEMO_PHASES = [
  { name: "Project Start", desc: "Contract signed and deposit received", estDate: "May 1″, actualDate: "May 1", pro: "Marcus T.", costEst: 840, status: "paid", photos: 2 },
  { name: "Materials", desc: "HVAC unit and supplies ordered and delivered", estDate: "May 5″, actualDate: "May 5", pro: "Marcus T.", costEst: 2100, status: "paid", photos: 4 },
  { name: "Installation", desc: "New HVAC system installation in progress", estDate: "May 8″, actualDate: "May 8", pro: "Marcus T.", costEst: 1260, status: "charged", photos: 1 },
  { name: "Inspection", desc: "City inspection and system commissioning", estDate: "May 12″, actualDate: null, pro: "Marcus T.", costEst: 420, status: "scheduled", photos: 0 },
  { name: "Final Walkthrough", desc: "Complete system test with homeowner", estDate: "May 14″, actualDate: null, pro: "Marcus T.", costEst: 420, status: "pending", photos: 0 },
  { name: "Warranty Period", desc: "30-day warranty and follow-up support", estDate: "May 15″, actualDate: null, pro: "Marcus T.", costEst: 0, status: "pending", photos: 0 },
];

export default function MilestoneTracker() {
  const { data: deals } = trpc.homeowner.getMyDeals.useQuery();
  const activeDeals = (deals ?? []).filter((d: any) => d.status === "active" || d.status === "completed");
  const [selectedId, setSelectedId] = useState<number>(0);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(2);
  const [shareToast, setShareToast] = useState(false);
  const dealId = selectedId || (activeDeals[0]?.id ?? 0);

  const { data: rawData, isLoading } = trpc.payments.getMilestonesForDeal.useQuery(
    { dealId },
    { enabled: dealId > 0 }
  );

  const milestones: any[] = rawData && !Array.isArray(rawData) ? (rawData as any).milestones ?? [] : [];
  const selectedDeal = activeDeals.find((d: any) => d.id === dealId);

  const hasRealData = milestones.length > 0;
  const phases = hasRealData ? milestones : DEMO_PHASES;
  const totalPaid = phases.filter((m: any) => m.status === "paid").reduce((s: number, m: any) => s + Number(m.amountCents ?? m.costEst ?? 0), 0);
  const totalCost = phases.reduce((s: number, m: any) => s + Number(m.amountCents ?? m.costEst ?? 0), 0);
  const completedCount = phases.filter((m: any) => m.status === "paid" || m.actualDate).length;
  const progressPct = phases.length > 0 ? Math.round((completedCount / phases.length) * 100) : 0;

  const handleShare = () => {
    const url = `${window.location.origin}/project-update/${dealId || "demo"}`;
    navigator.clipboard.writeText(url).catch(() => {});
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const handleRequestUpdate = () => {
    alert("Update request sent to Marcus T. You'll be notified when they respond.");
  };

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Milestone Tracker</h1>
            <p className="text-white/50 text-sm mt-1″>Track your project progress and payment milestones</p>
          </div>
          <div className="flex items-center gap-2″>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRequestUpdate}
              className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-1.5″
            >
              <Bell className="w-3.5 h-3.5″ />
              Request Update
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-1.5 relative"
            >
              <Share2 className="w-3.5 h-3.5″ />
              Share
              {shareToast && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Job Selector */}
        {activeDeals.length > 1 && (
          <Select value={String(dealId)} onValueChange={v => setSelectedId(Number(v))}>
            <SelectTrigger className="w-full max-w-sm bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Select a job…" />
            </SelectTrigger>
            <SelectContent>
              {activeDeals.map((d: any) => (
                <SelectItem key={d.id} value={String(d.id)}>
                  {d.serviceType ?? "Job"} — {(d as any).proName ?? "Pro"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
          {/* Progress Ring */}
          <Card className="bg-white/5 border-white/10 col-span-1″>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative">
                <ProgressRing pct={progressPct} size={120} strokeWidth={10} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-white">{progressPct}%</span>
                    <p className="text-white/40 text-xs">Complete</p>
                  </div>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-3 text-center">
                {completedCount} of {phases.length} phases done
              </p>
            </CardContent>
          </Card>

          {/* Payment Stats */}
          <div className="col-span-2 grid grid-cols-2 gap-4″>
            <Card className="bg-white/5 border-white/10″>
              <CardContent className="pt-6″>
                <div className="flex items-center gap-2 mb-1″>
                  <CheckCircle className="h-4 w-4 text-green-400″ />
                  <span className="text-sm text-white/50″>Paid</span>
                </div>
                <div className="text-2xl font-bold text-green-400″>{fmt(totalPaid)}</div>
                <p className="text-xs text-white/30 mt-1″>
                  {phases.filter((m: any) => m.status === "paid").length} milestones
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10″>
              <CardContent className="pt-6″>
                <div className="flex items-center gap-2 mb-1″>
                  <Clock className="h-4 w-4 text-amber-400″ />
                  <span className="text-sm text-white/50″>Remaining</span>
                </div>
                <div className="text-2xl font-bold text-amber-400″>{fmt(totalCost - totalPaid)}</div>
                <p className="text-xs text-white/30 mt-1″>
                  {phases.filter((m: any) => m.status !== "paid").length} milestones
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 col-span-2″>
              <CardContent className="pt-4 pb-4″>
                <div className="flex items-center justify-between mb-2″>
                  <span className="text-sm text-white/50″>Payment Progress</span>
                  <span className="text-sm text-white font-medium">{fmt(totalPaid)} / {fmt(totalCost)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2″>
                  <div
                    className="h-2 rounded-full bg-teal-400 transition-all duration-1000″
                    style={{ width: totalCost > 0 ? `${(totalPaid / totalCost) * 100}%` : "0%" }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vertical Timeline */}
        <Card className="bg-white/5 border-white/10″>
          <CardHeader className="pb-2″>
            <CardTitle className="text-white text-lg flex items-center justify-between">
              <span>Project Timeline</span>
              {selectedDeal && (
                <span className="text-sm font-normal text-white/50″>
                  {(selectedDeal as any).serviceType ?? "Project"} — {(selectedDeal as any).proName ?? "Pro"}
                </span>
              )}
              {!selectedDeal && !isLoading && (
                <span className="text-xs font-normal bg-teal-400/10 text-teal-400 border border-teal-400/20 px-2 py-0.5 rounded-full">Demo Data</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="py-8 text-center text-white/40″>Loading milestones…</div>
            )}
            {!isLoading && (
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/10″ />

                <div className="space-y-1″>
                  {phases.map((phase: any, i: number) => {
                    const isDone = phase.status === "paid" || !!phase.actualDate;
                    const isActive = phase.status === "charged" || phase.status === "scheduled";
                    const isCurrent = isActive;
                    const isExpanded = expandedPhase === i;
                    const phaseName = phase.milestoneType?.replace(/_/g, " ") ?? phase.name ?? `Phase ${i + 1}`;
                    const phaseDesc = phase.milestoneLabel ?? phase.desc ?? PHASE_DESCRIPTIONS[phase.milestoneType ?? ""] ?? "";
                    const estDate = phase.scheduledAt ? new Date(phase.scheduledAt).toLocaleDateString() : phase.estDate ?? "TBD";
                    const actualDate = phase.paidAt ? new Date(phase.paidAt).toLocaleDateString() : phase.actualDate ?? null;
                    const costEst = phase.amountCents ?? phase.costEst ?? 0;
                    const photoCount = phase.photos ?? 0;

                    return (
                      <div key={phase.id ?? i} className="relative pl-12″>
                        {/* Status dot */}
                        <div className="absolute left-0 top-4 w-9 flex justify-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all z-10 ${
                            isDone
                              ? "bg-teal-400 border-teal-400″
                              : isActive
                              ? "bg-[#0A1628] border-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.4)]"
                              : "bg-[#0A1628] border-white/20″
                          }`}>
                            {isDone ? (
                              <svg className="w-4 h-4 text-[#0A1628]" fill="none" viewBox="0 0 24 24″ stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7″ />
                              </svg>
                            ) : isActive ? (
                              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                            ) : (
                              <Circle className="w-4 h-4 text-white/20″ />
                            )}
                          </div>
                        </div>

                        {/* Card */}
                        <div
                          className={`mb-3 rounded-xl border transition-all duration-200 overflow-hidden ${
                            isCurrent
                              ? "border-teal-400/40 bg-teal-400/5″
                              : isDone
                              ? "border-white/10 bg-white/[0.03]"
                              : "border-white/10 bg-transparent"
                          }`}
                        >
                          {/* Header row */}
                          <button
                            onClick={() => setExpandedPhase(isExpanded ? null : i)}
                            className="w-full flex items-center gap-3 p-4 text-left"
                          >
                            <div className="flex-1″>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`font-semibold capitalize ${isDone ? "text-white" : isActive ? "text-teal-300" : "text-white/40"}`}>
                                  {phaseName}
                                </span>
                                <Badge className={`text-xs border ${STATUS_COLORS[phase.status] ?? "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
                                  {phase.status}
                                </Badge>
                                {isCurrent && (
                                  <span className="text-xs text-teal-400 font-medium">Current Phase</span>
                                )}
                              </div>
                              {phaseDesc && (
                                <p className={`text-xs mt-0.5 ${isDone ? "text-white/40" : isActive ? "text-white/50" : "text-white/25"}`}>
                                  {phaseDesc}
                                </p>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0″>
                              <div className={`font-bold text-sm ${isDone ? "text-green-400" : isActive ? "text-white" : "text-white/30"}`}>
                                {costEst > 0 ? fmt(costEst) : "—"}
                              </div>
                              <div className={`text-xs ${isDone && actualDate ? "text-green-400/70" : "text-white/30"}`}>
                                {actualDate ?? estDate}
                              </div>
                            </div>
                            {isExpanded
                              ? <ChevronUp className="w-4 h-4 text-white/30 flex-shrink-0″ />
                              : <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0″ />
                            }
                          </button>

                          {/* Expanded details */}
                          {isExpanded && (
                            <div className="px-4 pb-4 border-t border-white/10 pt-4 space-y-3″>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-white/40 text-xs block mb-0.5″>Assigned Pro</span>
                                  <div className="flex items-center gap-1.5″>
                                    <div className="w-5 h-5 rounded-full bg-teal-400/20 flex items-center justify-center">
                                      <User className="w-3 h-3 text-teal-400″ />
                                    </div>
                                    <span className="text-white text-sm">{phase.proName ?? "Marcus T."}</span>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-white/40 text-xs block mb-0.5″>Estimated Date</span>
                                  <span className="text-white text-sm">{estDate}</span>
                                </div>
                                {actualDate && (
                                  <div>
                                    <span className="text-white/40 text-xs block mb-0.5″>Completed</span>
                                    <span className="text-green-400 text-sm">{actualDate}</span>
                                  </div>
                                )}
                                <div>
                                  <span className="text-white/40 text-xs block mb-0.5″>Cost Estimate</span>
                                  <span className="text-white text-sm">{costEst > 0 ? fmt(costEst) : "Included"}</span>
                                </div>
                              </div>

                              {photoCount > 0 && (
                                <button className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors">
                                  <Camera className="w-4 h-4″ />
                                  View {photoCount} photo{photoCount !== 1 ? "s" : ""}
                                  <ExternalLink className="w-3 h-3″ />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Communication Log */}
        <Card className="bg-white/5 border-white/10″>
          <CardHeader className="pb-3″>
            <CardTitle className="text-white text-lg flex items-center gap-2″>
              <MessageSquare className="w-5 h-5 text-teal-400″ />
              Latest Updates from Pro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3″>
            {DEMO_UPDATES.map((update, i) => (
              <div key={i} className="flex gap-3″>
                <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center flex-shrink-0 mt-0.5″>
                  <span className="text-teal-400 text-xs font-bold">MT</span>
                </div>
                <div className="flex-1 bg-white/[0.04] rounded-xl border border-white/10 px-3 py-2.5″>
                  <div className="flex items-center gap-2 mb-1″>
                    <span className="text-white text-sm font-medium">{update.author}</span>
                    <span className="text-white/30 text-xs">{update.time}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{update.text}</p>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRequestUpdate}
              className="w-full mt-2 border-white/10 text-white/50 hover:text-white hover:bg-white/5 gap-2″
            >
              <Bell className="w-3.5 h-3.5″ />
              Request Update from Pro
            </Button>
          </CardContent>
        </Card>

        {/* Empty state */}
        {activeDeals.length === 0 && !hasRealData && (
          <Card className="bg-white/5 border-white/10″>
            <CardContent className="py-12 text-center">
              <DollarSign className="h-12 w-12 mx-auto text-white/10 mb-3″ />
              <div className="text-white/50″>No active jobs with payment milestones.</div>
              <div className="text-sm text-white/30 mt-1″>Milestones are set up when you hire a pro for a job.</div>
            </CardContent>
          </Card>
        )}
      </div>
    </HomeownerLayout>
  );
}
