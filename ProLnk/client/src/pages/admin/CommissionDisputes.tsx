import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  AlertTriangle, CheckCircle, XCircle, Clock, MessageSquare,
  Brain, Paperclip, RotateCcw, ShieldAlert
} from "lucide-react";
import { toast } from "sonner";

const STATUS_CONFIG = {
  open: { label: "Open", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: AlertTriangle },
  under_review: { label: "Under Review", color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock },
  resolved_approved: { label: "Approved", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
  resolved_denied: { label: "Denied", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
  none: { label: "None", color: "bg-gray-100 text-gray-600 border-gray-200", icon: MessageSquare },
};

const APPEAL_CONFIG = {
  none: null,
  pending: { label: "Appeal Pending", color: "bg-orange-100 text-orange-800 border-orange-200" },
  upheld: { label: "Appeal Upheld", color: "bg-green-100 text-green-800 border-green-200" },
  denied: { label: "Appeal Denied", color: "bg-red-100 text-red-800 border-red-200" },
};

const AI_ASSESSMENT_CONFIG = {
  likely_valid: { label: "Likely Valid", color: "text-green-700 bg-green-50 border-green-200" },
  likely_invalid: { label: "Likely Invalid", color: "text-red-700 bg-red-50 border-red-200" },
  unclear: { label: "Unclear", color: "text-yellow-700 bg-yellow-50 border-yellow-200" },
};

export default function CommissionDisputes() {
  const [resolveTarget, setResolveTarget] = useState<{ id: number; resolution: "resolved_approved" | "resolved_denied" } | null>(null);
  const [resolutionNote, setResolutionNote] = useState("");
  const [assessingId, setAssessingId] = useState<number | null>(null);
  const [localAssessments, setLocalAssessments] = useState<Record<number, { assessment: string; confidence: number; reasoning: string }>>({});

  const { data: disputes = [], refetch } = trpc.admin.getOpenDisputes.useQuery();

  const markUnderReview = trpc.admin.markDisputeUnderReview.useMutation({
    onSuccess: () => { refetch(); toast.success("Marked as under review"); },
  });

  const resolveDispute = trpc.admin.resolveDispute.useMutation({
    onSuccess: () => {
      refetch();
      setResolveTarget(null);
      setResolutionNote("");
      toast.success("Dispute resolved successfully");
    },
  });

  const aiAssess = trpc.admin.aiAssessDispute.useMutation({
    onSuccess: (data, variables) => {
      setLocalAssessments(prev => ({ ...prev, [variables.commissionId]: data }));
      refetch();
      toast.success("AI assessment complete");
      setAssessingId(null);
    },
    onError: (e) => {
      toast.error(e.message || "AI assessment failed");
      setAssessingId(null);
    },
  });

  const handleResolve = () => {
    if (!resolveTarget || resolutionNote.length < 5) return;
    resolveDispute.mutate({ commissionId: resolveTarget.id, resolution: resolveTarget.resolution, resolutionNote });
  };

  const openCount = disputes.filter(d => d.disputeStatus === "open" || d.disputeStatus === "under_review").length;
  const appealCount = disputes.filter((d: any) => d.disputeAppealStatus === "pending").length;

  return (
    <AdminLayout
      title="Commission Disputes"
      subtitle="Review, assess, and resolve partner commission disputes with AI assistance"
    >
      {/* Summary bar */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ backgroundColor: "#FFFBEB", borderColor: "#FDE68A" }}>
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-semibold text-yellow-800">{openCount} Open</span>
        </div>
        {appealCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ backgroundColor: "#FFF7ED", borderColor: "#FDBA74" }}>
            <RotateCcw className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-800">{appealCount} Appeal{appealCount > 1 ? "s" : ""} Pending</span>
          </div>
        )}
        <div className="ml-auto text-xs text-muted-foreground">
          Brain Trust policy: 72-hour SLA · 3 strikes = suspension · $100 payout threshold
        </div>
      </div>

      {disputes.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-lg font-medium text-foreground">No open disputes</p>
            <p className="text-muted-foreground text-sm mt-1">All commission disputes have been resolved.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {disputes.map((d: any) => {
            const cfg = STATUS_CONFIG[d.disputeStatus as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.open;
            const Icon = cfg.icon;
            const evidenceUrls: string[] = d.disputeEvidenceUrls ? JSON.parse(d.disputeEvidenceUrls) : [];
            const appealCfg = d.disputeAppealStatus && d.disputeAppealStatus !== "none"
              ? APPEAL_CONFIG[d.disputeAppealStatus as keyof typeof APPEAL_CONFIG]
              : null;
            // Use local assessment if available (just assessed), otherwise use DB value
            const localAssess = localAssessments[d.id];
            const aiAssessment = localAssess?.assessment ?? d.disputeAiAssessment;
            const aiConfidence = localAssess?.confidence ?? (d.disputeAiConfidence ? Number(d.disputeAiConfidence) : null);
            const aiReasoning = localAssess?.reasoning ?? d.disputeAiReasoning;
            const aiCfg = aiAssessment ? AI_ASSESSMENT_CONFIG[aiAssessment as keyof typeof AI_ASSESSMENT_CONFIG] : null;

            return (
              <Card key={d.id} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                      <div>
                        <CardTitle className="text-base">Commission #{d.id}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {d.commissionType.replace(/_/g, " ")} · ${Number(d.amount).toFixed(2)}
                          {d.jobValue ? ` · Job value $${Number(d.jobValue).toFixed(2)}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {appealCfg && (
                        <Badge className={`text-xs border ${appealCfg.color}`}>
                          <RotateCcw className="w-3 h-3 mr-1" /> {appealCfg.label}
                        </Badge>
                      )}
                      <Badge className={`text-xs border ${cfg.color}`}>{cfg.label}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Reason */}
                  <div className="bg-muted/40 rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Partner's Reason</p>
                    <p className="text-sm text-foreground">{d.disputeReason ?? "No reason provided"}</p>
                  </div>

                  {/* Evidence files */}
                  {evidenceUrls.length > 0 && (
                    <div className="rounded-lg border p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Paperclip className="w-3 h-3" /> Evidence Files ({evidenceUrls.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {evidenceUrls.map((url, i) => (
                          <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-blue-600 underline hover:text-blue-800">
                            File {i + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Assessment */}
                  {aiCfg && (
                    <div className={`rounded-lg border p-3 ${aiCfg.color}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold">AI Assessment: {aiCfg.label}</span>
                        {aiConfidence !== null && (
                          <span className="text-xs opacity-70">({Math.round(aiConfidence * 100)}% confidence)</span>
                        )}
                      </div>
                      {aiReasoning && <p className="text-xs opacity-80">{aiReasoning}</p>}
                    </div>
                  )}

                  {/* Appeal reason */}
                  {d.disputeAppealReason && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-xs font-medium text-orange-800 mb-1 flex items-center gap-1">
                        <RotateCcw className="w-3 h-3" /> Appeal Reason
                      </p>
                      <p className="text-sm text-orange-900">{d.disputeAppealReason}</p>
                      {d.disputeAppealedAt && (
                        <p className="text-xs text-orange-600 mt-1">Filed: {new Date(d.disputeAppealedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                    <span>Opened: {d.disputeOpenedAt ? new Date(d.disputeOpenedAt).toLocaleDateString() : "--"}</span>
                    {d.payingPartnerId && <span>Paying Partner: #{d.payingPartnerId}</span>}
                    {d.receivingPartnerId && <span>Receiving Partner: #{d.receivingPartnerId}</span>}
                  </div>

                  {/* Actions */}
                  {(d.disputeStatus === "open" || d.disputeStatus === "under_review") && (
                    <div className="flex gap-2 flex-wrap">
                      {/* AI Assess */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 border-purple-300 text-purple-700 hover:bg-purple-50"
                        disabled={assessingId === d.id}
                        onClick={() => {
                          setAssessingId(d.id);
                          aiAssess.mutate({ commissionId: d.id });
                        }}
                      >
                        <Brain className="w-3 h-3" />
                        {assessingId === d.id ? "Assessing..." : "AI Assess"}
                      </Button>

                      {d.disputeStatus === "open" && (
                        <Button size="sm" variant="outline" onClick={() => markUnderReview.mutate({ commissionId: d.id })}>
                          <Clock className="w-3 h-3 mr-1" /> Mark Under Review
                        </Button>
                      )}
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => setResolveTarget({ id: d.id, resolution: "resolved_approved" })}>
                        <CheckCircle className="w-3 h-3 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive"
                        onClick={() => setResolveTarget({ id: d.id, resolution: "resolved_denied" })}>
                        <XCircle className="w-3 h-3 mr-1" /> Deny
                      </Button>
                    </div>
                  )}

                  {/* Resolution note if resolved */}
                  {d.disputeResolutionNote && (
                    <div className="bg-muted/30 rounded-lg p-3 border">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Resolution Note</p>
                      <p className="text-sm text-foreground">{d.disputeResolutionNote}</p>
                      {d.disputeResolvedAt && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Resolved: {new Date(d.disputeResolvedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Resolve Dialog */}
      <Dialog open={!!resolveTarget} onOpenChange={(o) => { if (!o) { setResolveTarget(null); setResolutionNote(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {resolveTarget?.resolution === "resolved_approved" ? "Approve Dispute" : "Deny Dispute"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">
              {resolveTarget?.resolution === "resolved_approved"
                ? "Approving this dispute will notify the partner and may trigger a commission adjustment."
                : "Denying this dispute will notify the partner that the commission stands as recorded."}
            </p>
            <Textarea
              placeholder="Resolution note (required, min 5 characters)..."
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setResolveTarget(null); setResolutionNote(""); }}>Cancel</Button>
            <Button
              disabled={resolutionNote.length < 5 || resolveDispute.isPending}
              className={resolveTarget?.resolution === "resolved_approved" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
              variant={resolveTarget?.resolution === "resolved_denied" ? "destructive" : "default"}
              onClick={handleResolve}
            >
              {resolveDispute.isPending ? "Saving..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
