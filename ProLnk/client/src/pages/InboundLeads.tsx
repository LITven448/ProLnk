import { useState, useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Inbox, MapPin, DollarSign, Clock, CheckCircle, XCircle,
  Phone, Mail, ChevronDown, ChevronUp, Zap, Timer, AlertCircle, RefreshCw,
  Home, Eye, Camera, Droplets, Wind, Bolt, Paintbrush, Wrench,
  Star, Flame, TrendingUp, ShieldCheck
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const DECLINE_REASONS = [
  "Outside my service area",
  "Already booked / not available",
  "Not my trade / specialty",
  "Job too small",
  "Job too large / out of scope",
  "Customer already contacted",
  "Price doesn't work",
  "Other",
];

const TRADE_COLORS: Record<string, string> = {
  "Lawn Care": "#10B981", "HVAC": "#3B82F6", "Plumbing": "#14B8A6",
  "Pest Control": "#F59E0B", "Fence & Deck": "#6366F1", "Roofing": "#F97316",
  "Electrical": "#EAB308", "Cleaning": "#EC4899", "Pool Service": "#06B6D4", "Painting": "#8B5CF6",
};

const TRADE_BG_COLORS: Record<string, string> = {
  "Lawn Care": "#ECFDF5", "HVAC": "#EFF6FF", "Plumbing": "#F0FDFA",
  "Pest Control": "#FFFBEB", "Fence & Deck": "#EEF2FF", "Roofing": "#FFF7ED",
  "Electrical": "#FEFCE8", "Cleaning": "#FDF2F8", "Pool Service": "#ECFEFF", "Painting": "#F5F3FF",
};

function TradeIcon({ trade, size = 16 }: { trade: string; size?: number }) {
  const color = TRADE_COLORS[trade] ?? "#6366F1";
  const bg = TRADE_BG_COLORS[trade] ?? "#EEF2FF";
  const cls = `shrink-0 rounded-lg flex items-center justify-center`;
  const style = { width: size * 2.25, height: size * 2.25, backgroundColor: bg };
  let icon: ReactNode;
  if (trade === "HVAC") icon = <Wind size={size} color={color} />;
  else if (trade === "Plumbing") icon = <Droplets size={size} color={color} />;
  else if (trade === "Electrical") icon = <Bolt size={size} color={color} />;
  else if (trade === "Roofing") icon = <Home size={size} color={color} />;
  else if (trade === "Painting") icon = <Paintbrush size={size} color={color} />;
  else icon = <Wrench size={size} color={color} />;
  return <div className={cls} style={style}>{icon}</div>;
}

function AiMatchScore({ score }: { score: number }) {
  const pct = Math.min(100, Math.max(0, Math.round(score)));
  const color = pct >= 85 ? "#14B8A6" : pct >= 65 ? "#3B82F6" : "#F59E0B";
  const label = pct >= 85 ? "Excellent" : pct >= 65 ? "Good" : "Fair";
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (pct / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="#E5E7EB" strokeWidth="4" />
          <circle
            cx="24" cy="24" r="20" fill="none" strokeWidth="4"
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold tabular-nums leading-none" style={{ color }}>{pct}</span>
        </div>
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{label}</span>
    </div>
  );
}

function MatchReasonPills({ reasons }: { reasons: string[] }) {
  if (!reasons.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {reasons.map((r) => (
        <span key={r} className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-700 border border-teal-100 px-2 py-0.5 rounded-full font-medium">
          <ShieldCheck className="w-3 h-3" />{r}
        </span>
      ))}
    </div>
  );
}

function deriveMatchReasons(lead: any): string[] {
  const reasons: string[] = [];
  const trade = lead.opportunityCategory ?? lead.opportunityType ?? "";
  if (trade) reasons.push(`${trade} specialist match`);
  const aiResult = lead.aiAnalysisResult as any;
  const zipMatch = aiResult?.zipMatch ?? lead.zipMatch;
  if (zipMatch) reasons.push("You serve this ZIP");
  const distanceMiles = aiResult?.distanceMiles ?? lead.distanceMiles;
  if (distanceMiles != null && Number(distanceMiles) <= 10) reasons.push(`${distanceMiles} mi away`);
  const responseRate = aiResult?.partnerResponseRate ?? lead.partnerResponseRate;
  if (responseRate != null && Number(responseRate) >= 80) reasons.push("High response rate");
  if (!reasons.length) {
    reasons.push("Trade area match");
  }
  return reasons.slice(0, 3);
}

function AcceptedConfirmation({ onClose }: { onClose: () => void }) {
  return (
    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
        <p className="font-semibold text-emerald-800 text-sm">Lead accepted — the homeowner has been notified</p>
      </div>
      <div className="bg-white rounded-lg border border-emerald-100 p-3 space-y-2">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Next Steps</p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-emerald-700">1.</span> Contact the homeowner within 2 hours to maximize close rate
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-500">2.</span> Confirm job scope and schedule an estimate visit
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-500">3.</span> Mark job complete once finished to unlock your commission
        </p>
      </div>
      <button onClick={onClose} className="text-xs text-emerald-600 hover:text-emerald-800 underline underline-offset-2">
        Dismiss
      </button>
    </div>
  );
}

function relativeTime(d: string | Date | null) {
  if (!d) return "Unknown";
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(d).toLocaleDateString();
}

function timeLeft(expiresAt: string | Date | null): { hours: number; minutes: number; total: number } | null {
  if (!expiresAt) return null;
  const diff = Math.max(0, new Date(expiresAt).getTime() - Date.now());
  const hours = Math.floor(diff / 1000 / 3600);
  const minutes = Math.floor((diff % (1000 * 3600)) / 60000);
  return { hours, minutes, total: diff };
}

function CountdownTimer({ expiresAt }: { expiresAt: string | Date | null }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(id);
  }, []);
  const t = timeLeft(expiresAt);
  if (!t) return null;
  const urgent = t.total < 4 * 3600 * 1000;
  const expired = t.total === 0;
  if (expired) return (
    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">Expired</span>
  );
  return (
    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${urgent ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-blue-50 text-blue-600 border border-blue-100"}`}>
      <Timer className="w-3 h-3" />
      {t.hours > 0 ? `${t.hours}h ${t.minutes}m` : `${t.minutes}m`} left
    </span>
  );
}

export default function InboundLeads() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [declineDialog, setDeclineDialog] = useState<{ id: number } | null>(null);
  const [declineReason, setDeclineReason] = useState("");
  const [acceptedConfirmations, setAcceptedConfirmations] = useState<Set<number>>(new Set());
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();

  const { data: leads = [], isLoading, refetch } = trpc.partners.getInboundOpportunities.useQuery(undefined, {
    refetchInterval: 60_000,
  });

  const respondMutation = trpc.partners.respondToOpportunity.useMutation({
    onSuccess: (_, vars) => {
      if (vars.response === "accepted") {
        setAcceptedConfirmations((prev) => new Set(prev).add(vars.opportunityId));
        setExpanded(vars.opportunityId);
      } else {
        toast.success("Lead declined");
      }
      utils.partners.getInboundOpportunities.invalidate();
    },
    onError: (err) => toast.error(`Failed: ${err.message}`),
  });

  const closeMutation = trpc.partners.closeJob.useMutation({
    onSuccess: (data) => {
      toast.success(`Job closed -- commission calculated at ${((data.rates?.effectiveKeepRate ?? 0) * 100).toFixed(0)}% keep rate`);
      utils.partners.getInboundOpportunities.invalidate();
    },
    onError: (err) => toast.error(`Failed: ${err.message}`),
  });

  const pending = leads.filter((l: any) => l.status === "dispatched" || l.status === "accepted");
  const history = leads.filter((l: any) => l.status === "closed" || l.status === "declined" || l.status === "expired");

  // TrustyPro leads
  const { data: trustyLeads = [], isLoading: trustyLoading } = trpc.partners.getMyTrustyLeads.useQuery(undefined, {
    refetchInterval: 120_000,
  });
  const [trustyExpanded, setTrustyExpanded] = useState<number | null>(null);
  const [trustyDeclineDialog, setTrustyDeclineDialog] = useState<{ id: number } | null>(null);
  const [trustyDeclineReason, setTrustyDeclineReason] = useState("");
  const respondTrustyMutation = trpc.partners.respondToTrustyLead.useMutation({
    onSuccess: (_, vars) => {
      toast.success(vars.response === "accepted" ? "Lead accepted — contact info unlocked" : "Lead declined");
      utils.partners.getMyTrustyLeads.invalidate();
    },
    onError: (err) => toast.error(`Failed: ${err.message}`),
  });
  const newTrustyLeads = (trustyLeads as any[]).filter((l) => l.status === "new" || l.status === "matched");

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
              <Inbox className="w-6 h-6 text-[#0A1628]" />Inbound Leads
            </h1>
            <p className="text-sm text-gray-500 mt-1">Leads routed to you by the ProLnk AI network</p>
          </div>
          <div className="flex items-center gap-2">
            {pending.length > 0 && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">{pending.length} Pending</Badge>
            )}
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="network">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="network" className="flex-1">
              Network Leads {pending.length > 0 && <Badge className="ml-1.5 bg-amber-100 text-amber-700 border-0 text-xs">{pending.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="trustypro" className="flex-1">
              TrustyPro Leads {newTrustyLeads.length > 0 && <Badge className="ml-1.5 bg-indigo-100 text-indigo-700 border-0 text-xs">{newTrustyLeads.length}</Badge>}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="network">
        {isLoading && (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <RefreshCw className="w-6 h-6 animate-spin mr-3" />Loading leads...
          </div>
        )}

        {!isLoading && leads.length === 0 && (
          <Card className="border-dashed border-2 border-gray-200 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col items-center justify-center pt-12 pb-8 px-6 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-100 flex items-center justify-center mb-5 shadow-sm">
                  <Inbox className="w-9 h-9 text-teal-500" />
                </div>
                <h3 className="font-heading font-bold text-gray-800 text-xl mb-2">Your first lead will appear here</h3>
                <p className="text-sm text-gray-500 max-w-xs mb-6">
                  The ProLnk AI network scans job photos 24/7. When a homeowner in your area requests a quote that matches your trade, you'll get notified instantly.
                </p>
                <div className="w-full max-w-xs space-y-3 mb-6">
                  <div className="flex items-start gap-3 bg-teal-50 rounded-xl p-3.5 border border-teal-100 text-left">
                    <Camera className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Upload job photos to trigger AI lead detection</p>
                      <p className="text-xs text-gray-500 mt-0.5">Our AI finds work that matches your trade</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-3.5 border border-blue-100 text-left">
                    <MapPin className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Or wait for homeowners in your area to request quotes</p>
                      <p className="text-xs text-gray-500 mt-0.5">Leads are routed based on your trade and service area</p>
                    </div>
                  </div>
                </div>
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6"
                  onClick={() => navigate("/photo-upload")}
                >
                  <Camera className="w-4 h-4 mr-2" />Upload Photos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {pending.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pending Response</h2>
            {pending.map((lead: any) => {
              const aiResult = lead.aiAnalysisResult as any;
              const topOpp = aiResult?.opportunities?.[0];
              const t = timeLeft(lead.leadExpiresAt);
              const isExpiringSoon = t !== null && t.total < 4 * 3600 * 1000;
              const trade = lead.opportunityCategory ?? "General";
              const tradeColor = TRADE_COLORS[trade] ?? "#6366F1";
              const isOpen = expanded === lead.id;
              const estimatedValue = topOpp?.estimatedValue ?? lead.estimatedValue;
              const matchScore = aiResult?.matchScore ?? aiResult?.confidence ?? topOpp?.confidence ?? 87;
              const isHighValue = estimatedValue != null && Number(estimatedValue) > 2000;
              const isUrgent = (lead.urgency ?? topOpp?.urgency ?? lead.urgencyFlag ?? "")
                .toLowerCase().includes("asap");
              const matchReasons = deriveMatchReasons(lead);
              const showAccepted = acceptedConfirmations.has(lead.id);

              const partialAddress = (() => {
                const addr = lead.serviceAddress as string | undefined;
                if (!addr) return null;
                const parts = addr.split(",").map((s: string) => s.trim());
                if (parts.length >= 3) return `${parts[parts.length - 2]}, ${parts[parts.length - 1]}`;
                return addr;
              })();

              return (
                <Card key={lead.id} className={`border-2 transition-all ${isExpiringSoon ? "border-amber-300" : "border-gray-200 hover:border-teal-300"}`}>
                  <CardContent className="p-5">
                    {/* Header row: AI score + trade info + value */}
                    <div className="flex items-start gap-3">
                      <AiMatchScore score={matchScore} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: tradeColor }}>
                            {trade}
                          </span>
                          {isHighValue && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
                              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />High Value
                            </span>
                          )}
                          {isUrgent && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                              <Flame className="w-3 h-3" />Urgent
                            </span>
                          )}
                          <CountdownTimer expiresAt={lead.leadExpiresAt} />
                          {lead.status === "accepted" && !showAccepted && (
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Accepted</Badge>
                          )}
                        </div>
                        <p className="font-bold text-gray-900 text-base leading-snug">
                          {topOpp?.type ?? lead.opportunityType ?? "Service Opportunity"}
                        </p>
                        <MatchReasonPills reasons={matchReasons} />
                      </div>
                      {estimatedValue && (
                        <div className="text-right flex-shrink-0 ml-2">
                          <div className="text-2xl font-heading font-bold text-gray-900 leading-none">
                            ${Number(estimatedValue).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">est. value</div>
                        </div>
                      )}
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
                      {partialAddress && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{partialAddress}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />Detected {relativeTime(lead.createdAt)}
                      </span>
                    </div>

                    {/* Accept / Pass buttons — always visible for dispatched leads */}
                    {lead.status === "dispatched" && !showAccepted && (
                      <div className="flex gap-2 mt-4">
                        <Button
                          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm"
                          disabled={respondMutation.isPending}
                          onClick={() => respondMutation.mutate({ opportunityId: lead.id, response: "accepted" })}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />Accept Lead
                        </Button>
                        <Button
                          variant="outline"
                          size="default"
                          className="text-gray-500 border-gray-200 hover:bg-gray-50 px-4"
                          disabled={respondMutation.isPending}
                          onClick={() => { setDeclineReason(""); setDeclineDialog({ id: lead.id }); }}
                        >
                          Pass
                        </Button>
                      </div>
                    )}

                    {/* Acceptance confirmation */}
                    {showAccepted && (
                      <AcceptedConfirmation onClose={() => {
                        setAcceptedConfirmations((prev) => {
                          const next = new Set(prev);
                          next.delete(lead.id);
                          return next;
                        });
                      }} />
                    )}

                    {/* Expand toggle for extra details */}
                    <button
                      className="mt-3 text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
                      onClick={() => setExpanded(isOpen ? null : lead.id)}
                    >
                      {isOpen ? <><ChevronUp className="w-3 h-3" />Hide details</> : <><ChevronDown className="w-3 h-3" />More details</>}
                    </button>

                    {isOpen && (
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                        {(topOpp?.description ?? lead.description) && (
                          <p className="text-sm text-gray-600">{topOpp?.description ?? lead.description}</p>
                        )}
                        {aiResult?.analysisNotes && (
                          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                            <p className="text-xs font-semibold text-purple-700 mb-1">AI Analysis Notes</p>
                            <p className="text-sm text-purple-900">{aiResult.analysisNotes}</p>
                          </div>
                        )}
                        {lead.status === "accepted" && (
                          <Button
                            className="w-full bg-[#0A1628] hover:bg-teal-700 text-white"
                            disabled={closeMutation.isPending}
                            onClick={() => {
                              const val = prompt("Enter actual job value ($):");
                              if (val && !isNaN(Number(val))) {
                                closeMutation.mutate({ opportunityId: lead.id, actualJobValue: Number(val) });
                              }
                            }}
                          >
                            <DollarSign className="w-4 h-4 mr-2" />Mark Job Complete & Enter Value
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {history.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">History</h2>
            {history.map((lead: any) => {
              const aiResult = lead.aiAnalysisResult as any;
              const topOpp = aiResult?.opportunities?.[0];
              const statusColor = lead.status === "closed" ? "bg-emerald-100 text-emerald-700" : lead.status === "declined" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600";
              return (
                <Card key={lead.id} className="border border-gray-100 opacity-80">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm">{topOpp?.type ?? lead.opportunityType ?? "Opportunity"}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{relativeTime(lead.createdAt)}</p>
                      </div>
                      <Badge className={statusColor}>{lead.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
          </TabsContent>
          {/* TrustyPro Leads Tab */}
          <TabsContent value="trustypro">
            <div className="space-y-4">
              {trustyLoading && (
                <div className="flex items-center justify-center py-16 text-gray-400">
                  <RefreshCw className="w-6 h-6 animate-spin mr-3" />Loading TrustyPro leads...
                </div>
              )}
              {!trustyLoading && (trustyLeads as any[]).length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <Home className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="font-medium text-gray-600">No TrustyPro leads yet</p>
                  <p className="text-sm mt-1">When a homeowner AI scan matches your trade, leads appear here</p>
                </div>
              )}
              {(trustyLeads as any[]).map((lead) => {
                const analysis = lead.aiAnalysis ? (() => { try { return JSON.parse(lead.aiAnalysis); } catch { return null; } })() : null;
                const isExpanded = trustyExpanded === lead.id;
                const isNew = lead.status === "new" || lead.status === "matched";
                const statusColors: Record<string, string> = {
                  new: "bg-blue-100 text-blue-700", matched: "bg-indigo-100 text-indigo-700",
                  contacted: "bg-green-100 text-green-700", closed: "bg-gray-100 text-gray-600", lost: "bg-red-100 text-red-600",
                };
                return (
                  <Card key={lead.id} className={`border ${isNew ? "border-indigo-200 shadow-sm" : "border-gray-100 opacity-80"}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <Home className="w-4 h-4 text-indigo-500 shrink-0" />
                            <span className="font-bold text-gray-900">{lead.address ?? "Address on file"}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[lead.status] ?? "bg-gray-100 text-gray-600"}`}>{lead.status}</span>
                          </div>
                          <p className="text-xs text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</p>
                          {analysis?.overallCondition && (
                            <p className="text-xs text-indigo-600 mt-1 font-medium">AI Condition: {analysis.overallCondition.replace("_", " ")}</p>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="text-xs" onClick={() => setTrustyExpanded(isExpanded ? null : lead.id)}>
                          <Eye className="w-3 h-3 mr-1" />{isExpanded ? "Hide" : "View Scan"}
                        </Button>
                      </div>

                      {isExpanded && analysis && (
                        <div className="mt-3 bg-indigo-50 rounded-lg p-3 space-y-2">
                          {analysis.summary && <p className="text-sm text-gray-700">{analysis.summary}</p>}
                          {(analysis.issues ?? []).slice(0, 5).map((issue: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-xs bg-white rounded px-2 py-1.5 border border-indigo-100">
                              <span className={`w-2 h-2 rounded-full shrink-0 ${issue.severity === "urgent" ? "bg-red-500" : issue.severity === "moderate" ? "bg-amber-500" : "bg-green-500"}`} />
                              <span className="font-semibold text-gray-800 flex-1">{issue.name}</span>
                              <span className="text-gray-500">{issue.tradeType}</span>
                              <span className="text-gray-400">{issue.estimatedCost}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {(lead.status === "contacted" || lead.status === "closed") && (
                        <div className="mt-3 bg-green-50 rounded-lg p-3 space-y-1 border border-green-200">
                          <p className="text-xs font-bold text-green-700 mb-1">Homeowner Contact</p>
                          {lead.name && <p className="text-sm font-semibold text-gray-800">{lead.name}</p>}
                          {lead.email && <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline"><Mail className="w-3.5 h-3.5" />{lead.email}</a>}
                          {lead.phone && <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline"><Phone className="w-3.5 h-3.5" />{lead.phone}</a>}
                        </div>
                      )}

                      {isNew && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="flex-1 bg-[#0A1628] hover:bg-teal-700 text-white"
                            disabled={respondTrustyMutation.isPending}
                            onClick={() => respondTrustyMutation.mutate({ leadId: lead.id, response: "accepted" })}>
                            <CheckCircle className="w-4 h-4 mr-2" />Accept & Unlock Contact
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                            disabled={respondTrustyMutation.isPending}
                            onClick={() => { setTrustyDeclineReason(""); setTrustyDeclineDialog({ id: lead.id }); }}>
                            <XCircle className="w-4 h-4 mr-2" />Decline
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* TrustyPro Decline Dialog */}
      <Dialog open={!!trustyDeclineDialog} onOpenChange={(open) => { if (!open) setTrustyDeclineDialog(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Decline This TrustyPro Lead</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <Label className="text-sm text-gray-600">Why are you declining?</Label>
            <div className="grid grid-cols-1 gap-2">
              {DECLINE_REASONS.map((reason) => (
                <button key={reason} onClick={() => setTrustyDeclineReason(reason)}
                  className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${trustyDeclineReason === reason ? "border-[#0A1628] bg-[#0A1628]/5 text-[#0A1628] font-medium" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                  {reason}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setTrustyDeclineDialog(null)}>Cancel</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white"
              disabled={!trustyDeclineReason || respondTrustyMutation.isPending}
              onClick={() => {
                if (!trustyDeclineDialog) return;
                respondTrustyMutation.mutate(
                  { leadId: trustyDeclineDialog.id, response: "declined", notes: trustyDeclineReason },
                  { onSettled: () => setTrustyDeclineDialog(null) }
                );
              }}>
              <XCircle className="w-4 h-4 mr-2" />Confirm Decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decline Reason Dialog */}
      <Dialog open={!!declineDialog} onOpenChange={(open) => { if (!open) setDeclineDialog(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Decline This Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Label className="text-sm text-gray-600">Why are you declining? (helps us route better)</Label>
            <div className="grid grid-cols-1 gap-2">
              {DECLINE_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setDeclineReason(reason)}
                  className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                    declineReason === reason
                      ? "border-[#0A1628] bg-[#0A1628]/5 text-[#0A1628] font-medium"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeclineDialog(null)}>Cancel</Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={!declineReason || respondMutation.isPending}
              onClick={() => {
                if (!declineDialog) return;
                respondMutation.mutate(
                  { opportunityId: declineDialog.id, response: "declined", declineReason },
                  { onSettled: () => setDeclineDialog(null) }
                );
              }}
            >
              <XCircle className="w-4 h-4 mr-2" />Confirm Decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PartnerLayout>
  );
}
