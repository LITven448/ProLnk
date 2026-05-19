/**
 * AI Lead Dispatch Queue -- Admin reviews AI-detected opportunities
 * and dispatches approved leads to partners.
 * Wired to real tRPC: admin.getPendingLeads + admin.dispatchLead + admin.rejectLead
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Camera, CheckCircle, XCircle, Eye, Clock, MapPin, User,
  Sparkles, ChevronRight, Send, Zap, DollarSign, ArrowRight,
  RefreshCw, AlertTriangle, Brain, Tag,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

function confidenceBadge(score: number) {
  if (score >= 0.85) return { label: "High", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" };
  if (score >= 0.65) return { label: "Medium", cls: "bg-amber-100 text-amber-700 border-amber-200" };
  return { label: "Low", cls: "bg-red-100 text-red-700 border-red-200" };
}

function relativeTime(d: string | Date | null) {
  if (!d) return "Unknown";
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(d).toLocaleDateString();
}

function DetailPanel({ opp, partners, onDispatch, onReject, onClose, isDispatching, isRejecting }: {
  opp: any; partners: any[];
  onDispatch: (oppId: number, partnerId: number) => void;
  onReject: (oppId: number) => void;
  onClose: () => void;
  isDispatching: boolean; isRejecting: boolean;
}) {
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [approveForTraining, setApproveForTraining] = useState(false);
  const [trainingLabel, setTrainingLabel] = useState<string>(opp.aiAnalysisResult?.opportunities?.[0]?.type ?? "");
  const aiResult = opp.aiAnalysisResult as any;
  const topOpp = aiResult?.opportunities?.[0];
  const confidence = topOpp?.confidence ?? 0;
  const badge = confidenceBadge(confidence);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-gray-900 text-lg">AI Opportunity Review</h2>
              <p className="text-xs text-gray-500">Opportunity #{opp.id}  {relativeTime(opp.createdAt)}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold"></button>
        </div>
        <div className="p-6 space-y-5">
          {topOpp && (
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">AI Detected</p>
                  <p className="font-bold text-gray-900 text-base">{topOpp.type}</p>
                  <p className="text-sm text-gray-600 mt-1">{topOpp.description}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badge.cls}`}>
                  {badge.label} ({Math.round(confidence * 100)}%)
                </span>
              </div>
              {topOpp.estimatedValue && (
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <DollarSign className="w-4 h-4" />Est. Job Value: ${topOpp.estimatedValue.toLocaleString()}
                </div>
              )}
              {aiResult.analysisNotes && <p className="mt-2 text-xs text-teal-700 italic">{aiResult.analysisNotes}</p>}
            </div>
          )}

          {/* AI Training Label */}
          <div className="border border-purple-200 rounded-xl p-4 bg-purple-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-800">AI Training Dataset</span>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="training-toggle" className="text-xs text-purple-700">Approve for training</Label>
                <Switch
                  id="training-toggle"
                  checked={approveForTraining}
                  onCheckedChange={setApproveForTraining}
                />
              </div>
            </div>
            {approveForTraining && (
              <div className="space-y-2">
                <p className="text-xs text-purple-600">Label this opportunity type for the training dataset:</p>
                <div className="flex flex-wrap gap-2">
                  {["Roof Damage", "HVAC Service", "Plumbing Issue", "Pest Control", "Lawn Care", "Window Repair", "Gutter Cleaning", "Fence Repair", "Other"].map(label => (
                    <button
                      key={label}
                      onClick={() => setTrainingLabel(label)}
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
                        trainingLabel === label
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-white text-purple-700 border-purple-300 hover:bg-purple-100"
                      }`}
                    >
                      <Tag className="w-2.5 h-2.5 inline mr-1" />{label}
                    </button>
                  ))}
                </div>
                {trainingLabel && (
                  <p className="text-xs text-purple-500 mt-1">Label: <strong>{trainingLabel}</strong> — will be added to the training dataset on dispatch.</p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Source Partner</p>
              <p className="font-semibold text-gray-900 text-sm">Partner #{opp.sourcePartnerId ?? "--"}</p>
              <p className="text-xs text-gray-500">{opp.opportunityCategory}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Service Address</p>
              <p className="font-semibold text-gray-900 text-sm">{opp.serviceAddress ?? "--"}</p>
            </div>
          </div>
          <div className="border border-teal-200 rounded-xl p-4 bg-teal-50">
            <p className="text-sm font-semibold text-teal-800 mb-3 flex items-center gap-2">
              <Send className="w-4 h-4" />Select Partner to Dispatch This Lead To
            </p>
            <Select value={selectedPartnerId} onValueChange={setSelectedPartnerId}>
              <SelectTrigger className="bg-white border-teal-300">
                <SelectValue placeholder="Choose a partner..." />
              </SelectTrigger>
              <SelectContent>
                {partners.length === 0 && (
                  <SelectItem value="none" disabled>No approved partners yet</SelectItem>
                )}
                {partners.map((p: any) => (
                  <SelectItem key={p.id} value={String(p.id)}>
                    {p.businessName} -- {p.businessType} ({p.serviceArea ?? "DFW"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-teal-600 mt-2">Partner has 24 hours to accept. Auto-routes to next partner on timeout.</p>
          </div>
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!selectedPartnerId || selectedPartnerId === "none" || isDispatching}
              onClick={() => onDispatch(opp.id, Number(selectedPartnerId))}
            >
              {isDispatching ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
              Approve & Dispatch Lead
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              disabled={isRejecting}
              onClick={() => onReject(opp.id)}
            >
              {isRejecting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
              Reject
            </Button>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs text-teal-700">
            <span className="flex items-center gap-1 bg-white border border-teal-200 rounded-lg px-2 py-1"><CheckCircle className="w-3 h-3 text-emerald-500" />Admin Approves</span>
            <ChevronRight className="w-3 h-3 text-teal-400" />
            <span className="flex items-center gap-1 bg-white border border-teal-200 rounded-lg px-2 py-1"><Send className="w-3 h-3 text-blue-500" />Partner Gets 24h Window</span>
            <ChevronRight className="w-3 h-3 text-teal-400" />
            <span className="flex items-center gap-1 bg-white border border-teal-200 rounded-lg px-2 py-1"><DollarSign className="w-3 h-3 text-emerald-500" />Commission Auto-Tracked</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PhotoApprovalQueue() {
  const [selected, setSelected] = useState<any | null>(null);
  const utils = trpc.useUtils();

  const { data: pendingLeads = [], isLoading, refetch } = trpc.admin.getPendingLeads.useQuery(undefined, {
    refetchInterval: 30_000,
  });

  const { data: approvedPartners = [] } = trpc.admin.getApprovedPartnersForDispatch.useQuery();

  const dispatchMutation = trpc.admin.dispatchLead.useMutation({
    onSuccess: () => {
      toast.success("Lead dispatched -- partner has 24 hours to accept");
      setSelected(null);
      utils.admin.getPendingLeads.invalidate();
    },
    onError: (err) => toast.error(`Dispatch failed: ${err.message}`),
  });

  const rejectMutation = trpc.admin.rejectLead.useMutation({
    onSuccess: () => {
      toast("Opportunity rejected and archived");
      setSelected(null);
      utils.admin.getPendingLeads.invalidate();
    },
    onError: (err) => toast.error(`Reject failed: ${err.message}`),
  });

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
              <Camera className="w-6 h-6 text-teal-600" />AI Lead Dispatch Queue
            </h1>
            <p className="text-sm text-gray-500 mt-1">Review AI-detected opportunities and dispatch approved leads to partners</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-teal-700 border-teal-300 bg-teal-50">
              {pendingLeads.length} Pending Review
            </Badge>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />Refresh
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <RefreshCw className="w-6 h-6 animate-spin mr-3" />Loading pending leads...
          </div>
        )}

        {!isLoading && pendingLeads.length === 0 && (
          <Card className="border-dashed border-2 border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="font-heading font-semibold text-gray-700 text-lg mb-2">Queue is Clear</h3>
              <p className="text-sm text-gray-400 max-w-sm">
                No AI-detected opportunities awaiting review. When partners submit job photos, the AI pipeline will surface leads here.
              </p>
            </CardContent>
          </Card>
        )}

        {pendingLeads.map((opp: any) => {
          const aiResult = opp.aiAnalysisResult as any;
          const topOpp = aiResult?.opportunities?.[0];
          const confidence = topOpp?.confidence ?? 0;
          const badge = confidenceBadge(confidence);
          return (
            <Card key={opp.id} className="border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer" onClick={() => setSelected(opp)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badge.cls}`}>
                        {badge.label} ({Math.round(confidence * 100)}%)
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{relativeTime(opp.createdAt)}</span>
                      {opp.serviceAddress && <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.serviceAddress}</span>}
                    </div>
                    <p className="font-bold text-gray-900 text-base mb-1">{topOpp?.type ?? opp.opportunityType ?? "Unclassified Opportunity"}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{topOpp?.description ?? "AI analysis complete -- click to review"}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />Source Partner #{opp.sourcePartnerId ?? "--"}</span>
                      <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3" />Awaiting dispatch</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {topOpp?.estimatedValue && (
                      <>
                        <div className="text-xl font-heading font-bold text-gray-900">${topOpp.estimatedValue.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">est. job value</div>
                      </>
                    )}
                    <div className="flex gap-1 mt-3 justify-end">
                      <button className="p-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors" onClick={e => { e.stopPropagation(); setSelected(opp); }} title="Review & Dispatch">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors" onClick={e => { e.stopPropagation(); rejectMutation.mutate({ opportunityId: opp.id }); }} title="Reject">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {pendingLeads.length > 0 && (
          <Card className="border border-teal-200 bg-teal-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-2"><Zap className="w-4 h-4" />Lead Dispatch Flow</h3>
              <div className="flex items-center gap-2 flex-wrap text-xs text-teal-700">
                <span className="flex items-center gap-1 bg-white border border-teal-200 rounded-lg px-2 py-1"><Camera className="w-3 h-3 text-teal-500" />Partner Submits Photos</span>
                <ChevronRight className="w-3 h-3 text-teal-400" />
                <span className="flex items-center gap-1 bg-white border border-teal-200 rounded-lg px-2 py-1"><Sparkles className="w-3 h-3 text-purple-500" />AI Analyzes (2-tier)</span>
                <ChevronRight className="w-3 h-3 text-teal-400" />
                <span className="flex items-center gap-1 bg-white border border-teal-200 rounded-lg px-2 py-1"><Eye className="w-3 h-3 text-blue-500" />Admin Reviews Here</span>
                <ChevronRight className="w-3 h-3 text-teal-400" />
                <span className="flex items-center gap-1 bg-white border border-teal-200 rounded-lg px-2 py-1"><Send className="w-3 h-3 text-blue-500" />Partner Gets 24h Window</span>
                <ChevronRight className="w-3 h-3 text-teal-400" />
                <span className="flex items-center gap-1 bg-white border border-teal-200 rounded-lg px-2 py-1"><DollarSign className="w-3 h-3 text-emerald-500" />Commission Auto-Tracked</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {selected && (
        <DetailPanel
          opp={selected}
          partners={approvedPartners}
          onDispatch={(oppId, partnerId) => dispatchMutation.mutate({ opportunityId: oppId, targetPartnerId: partnerId })}
          onReject={(oppId) => rejectMutation.mutate({ opportunityId: oppId })}
          onClose={() => setSelected(null)}
          isDispatching={dispatchMutation.isPending}
          isRejecting={rejectMutation.isPending}
        />
      )}
    </AdminLayout>
  );
}
