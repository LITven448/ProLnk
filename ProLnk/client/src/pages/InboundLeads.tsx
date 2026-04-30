import { useState } from "react";
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
  Home, Eye
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
  "Lawn Care": "#10B981", "HVAC": "#3B82F6", "Plumbing": "#8B5CF6",
  "Pest Control": "#F59E0B", "Fence & Deck": "#6366F1", "Roofing": "#EF4444",
  "Electrical": "#F97316", "Cleaning": "#14B8A6", "Pool Service": "#06B6D4", "Painting": "#EC4899",
};

function relativeTime(d: string | Date | null) {
  if (!d) return "Unknown";
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(d).toLocaleDateString();
}

function hoursLeft(expiresAt: string | Date | null) {
  if (!expiresAt) return null;
  const diff = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000 / 3600);
  return Math.max(0, diff);
}

export default function InboundLeads() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [declineDialog, setDeclineDialog] = useState<{ id: number } | null>(null);
  const [declineReason, setDeclineReason] = useState("");
  const utils = trpc.useUtils();

  const { data: leads = [], isLoading, refetch } = trpc.partners.getInboundOpportunities.useQuery(undefined, {
    refetchInterval: 60_000,
  });

  const respondMutation = trpc.partners.respondToOpportunity.useMutation({
    onSuccess: (_, vars) => {
      const action = vars.response === "accepted" ? "accepted" : "declined";
      toast.success(`Lead ${action} successfully`);
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
          <Card className="border-dashed border-2 border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F5E642]/10 flex items-center justify-center mb-4">
                <Inbox className="w-8 h-8 text-[#0A1628]/70" />
              </div>
              <h3 className="font-heading font-semibold text-gray-700 text-lg mb-2">No Leads Yet</h3>
              <p className="text-sm text-gray-400 max-w-sm">
                When other partners in the network submit photos that match your trade, leads will appear here. Make sure your trade and service area are set in your profile.
              </p>
            </CardContent>
          </Card>
        )}

        {pending.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pending Response</h2>
            {pending.map((lead: any) => {
              const aiResult = lead.aiAnalysisResult as any;
              const topOpp = aiResult?.opportunities?.[0];
              const hours = hoursLeft(lead.leadExpiresAt);
              const isExpiringSoon = hours !== null && hours <= 4;
              const tradeColor = TRADE_COLORS[lead.opportunityCategory ?? ""] ?? "#6366F1";
              const isOpen = expanded === lead.id;

              return (
                <Card key={lead.id} className={`border-2 transition-all ${isExpiringSoon ? "border-amber-300" : "border-gray-200 hover:border-[#0A1628]/30"}`}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: tradeColor }}>
                            {lead.opportunityCategory ?? "General"}
                          </span>
                          {isExpiringSoon && hours !== null && (
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-1">
                              <Timer className="w-3 h-3" />{hours}h left
                            </span>
                          )}
                          {lead.status === "accepted" && (
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Accepted</Badge>
                          )}
                        </div>
                        <p className="font-bold text-gray-900 text-base mb-1">{topOpp?.type ?? lead.opportunityType ?? "Opportunity"}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{topOpp?.description ?? lead.description ?? "Details available -- click to expand"}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          {lead.serviceAddress && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{lead.serviceAddress}</span>}
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{relativeTime(lead.createdAt)}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {topOpp?.estimatedValue && (
                          <>
                            <div className="text-xl font-heading font-bold text-gray-900">${topOpp.estimatedValue.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">est. value</div>
                          </>
                        )}
                        <button
                          className="mt-2 text-xs text-[#0A1628] flex items-center gap-1 ml-auto"
                          onClick={() => setExpanded(isOpen ? null : lead.id)}
                        >
                          {isOpen ? <><ChevronUp className="w-3 h-3" />Less</> : <><ChevronDown className="w-3 h-3" />More</>}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                        {aiResult?.analysisNotes && (
                          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                            <p className="text-xs font-semibold text-purple-700 mb-1">AI Analysis Notes</p>
                            <p className="text-sm text-purple-900">{aiResult.analysisNotes}</p>
                          </div>
                        )}
                        {lead.status === "dispatched" && (
                          <div className="flex gap-3">
                            <Button
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                              disabled={respondMutation.isPending}
                              onClick={() => respondMutation.mutate({ opportunityId: lead.id, response: "accepted" })}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />Accept Lead
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                              disabled={respondMutation.isPending}
                              onClick={() => { setDeclineReason(""); setDeclineDialog({ id: lead.id }); }}
                            >
                              <XCircle className="w-4 h-4 mr-2" />Decline
                            </Button>
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
