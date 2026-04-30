/**
 * Partner -- Dispute Center
 * File a commission dispute, upload evidence, track status.
 * Brain Trust policy: 72hr admin SLA, 3-strike system, $100 payout threshold.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { useRef } from "react";
import {
  AlertTriangle, CheckCircle, Clock, XCircle, FileText,
  Upload, ChevronRight, MessageSquare, Shield, Info, Flame, Paperclip, X as XIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DISPUTE_REASONS = [
  "Commission amount is incorrect",
  "Job was completed but commission not credited",
  "Duplicate commission deducted",
  "Homeowner confirmed work but lead not credited",
  "Partner referred the job but received no credit",
  "Other",
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Clock; description: string }> = {
  open:               { label: "Open",         color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: AlertTriangle, description: "Submitted -- admin will review within 72 hours" },
  under_review:       { label: "Under Review", color: "bg-blue-100 text-blue-800 border-blue-200",       icon: Clock,         description: "Admin is reviewing your dispute" },
  resolved_approved:  { label: "Approved",     color: "bg-green-100 text-green-800 border-green-200",    icon: CheckCircle,   description: "Your dispute was approved and commission adjusted" },
  resolved_denied:    { label: "Denied",       color: "bg-red-100 text-red-800 border-red-200",          icon: XCircle,       description: "Your dispute was reviewed and denied" },
};

export default function DisputeCenter() {
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState(DISPUTE_REASONS[0]);
  const [description, setDescription] = useState("");
  const [commissionId, setCommissionId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const evidenceInputRef = useRef<HTMLInputElement>(null);

  const handleEvidenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setEvidenceFiles(prev => [...prev, ...files].slice(0, 5)); // max 5 files
  };
  const removeEvidence = (idx: number) => setEvidenceFiles(prev => prev.filter((_, i) => i !== idx));

  const { data: commissions = [] } = trpc.partners.getPaidCommissions.useQuery();
  const { data: myDisputes = [], refetch } = trpc.partners.getMyDisputes.useQuery();
  const { data: partnerProfile } = trpc.partners.getMyProfile.useQuery();
  const strikeCount = Number((partnerProfile as any)?.partner?.strikeCount ?? 0);

  const fileDispute = trpc.partners.openDispute.useMutation({
    onSuccess: () => {
      toast.success("Dispute filed -- admin will review within 72 hours");
      setShowForm(false);
      setReason(DISPUTE_REASONS[0]);
      setDescription("");
      setCommissionId("");
      setSubmitting(false);
      refetch();
    },
    onError: (e) => {
      toast.error(e.message || "Failed to file dispute");
      setSubmitting(false);
    },
  });

  const handleSubmit = async () => {
    if (!description.trim() || description.length < 20) {
      toast.error("Please provide at least 20 characters of description");
      return;
    }
    setSubmitting(true);
    if (!commissionId) {
      toast.error("Please select a commission to dispute");
      setSubmitting(false);
      return;
    }
    // Upload evidence files first if any
    let evidenceUrls: string[] = [];
    if (evidenceFiles.length > 0) {
      try {
        evidenceUrls = await Promise.all(
          evidenceFiles.map(async (file) => {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const json = await res.json();
            return json.url as string;
          })
        );
      } catch {
        toast.error("Evidence upload failed — submitting without attachments");
      }
    }
    fileDispute.mutate({
      commissionId: parseInt(commissionId),
      reason: `${reason}: ${description}${evidenceUrls.length ? `\n\nEvidence: ${evidenceUrls.join(", ")}` : ""}`,
    });
  };

  return (
    <PartnerLayout>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dispute Center</h1>
            <p className="text-muted-foreground text-sm mt-1">
              File and track commission disputes  72-hour admin response SLA
            </p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <FileText className="w-4 h-4" /> File Dispute
            </Button>
          )}
        </div>

        {/* Strike System Status Card -- DIS-04 */}
        {strikeCount > 0 && (
          <div className={`flex items-start gap-3 rounded-xl p-4 border ${
            strikeCount >= 3
              ? "bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800"
              : strikeCount === 2
              ? "bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-800"
              : "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-300 dark:border-yellow-800"
          }`}>
            <Flame className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              strikeCount >= 3 ? "text-red-600" : strikeCount === 2 ? "text-orange-500" : "text-yellow-600"
            }`} />
            <div className="flex-1">
              <p className={`text-sm font-semibold ${
                strikeCount >= 3 ? "text-red-800 dark:text-red-300" : strikeCount === 2 ? "text-orange-800 dark:text-orange-300" : "text-yellow-800 dark:text-yellow-300"
              }`}>
                Account Standing: {strikeCount >= 3 ? "Suspended" : strikeCount === 2 ? "Final Warning" : "Warning"} — {strikeCount}/3 Strikes
              </p>
              <p className={`text-xs mt-1 leading-relaxed ${
                strikeCount >= 3 ? "text-red-700 dark:text-red-400" : strikeCount === 2 ? "text-orange-700 dark:text-orange-400" : "text-yellow-700 dark:text-yellow-400"
              }`}>
                {strikeCount >= 3
                  ? "Your account has been suspended due to 3 strikes. Contact support to appeal."
                  : strikeCount === 2
                  ? "One more frivolous dispute will result in account suspension. Ensure your next dispute is well-documented."
                  : "You have received a strike for a frivolous dispute. Two more will result in suspension."}
              </p>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-2 flex-1 rounded-full ${
                    i <= strikeCount
                      ? strikeCount >= 3 ? "bg-red-500" : strikeCount === 2 ? "bg-orange-500" : "bg-yellow-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Policy info */}
        <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-semibold mb-1">Dispute Policy</p>
            <p className="text-blue-700 dark:text-blue-400 text-xs leading-relaxed">
              All disputes are reviewed within 72 hours. Provide as much detail as possible including the job address,
              date of service, and the expected commission amount. Frivolous disputes may result in a strike on your account.
              Three strikes result in account suspension.
            </p>
          </div>
        </div>

        {/* New dispute form */}
        {showForm && (
          <div className="bg-card border rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-foreground">New Dispute</h3>

            {/* Commission selector */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Related Commission <span className="text-destructive">*</span></label>
              <select
                value={commissionId}
                onChange={e => setCommissionId(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">-- Select a commission (required) --</option>
                {(commissions as any[]).map((c: any) => (
                  <option key={c.id} value={c.id}>
                    #{c.id}  ${Number(c.amount ?? 0).toFixed(2)}  {c.description ?? "Commission"}  {c.paid ? "Paid" : "Pending"}
                  </option>
                ))}
              </select>
            </div>

            {/* Reason */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Reason</label>
              <select
                value={reason}
                onChange={e => setReason(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {DISPUTE_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Description <span className="text-muted-foreground font-normal">(min 20 chars)</span>
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the issue in detail -- include job address, date, expected amount, and any supporting context..."
                rows={4}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">{description.length} chars</p>
            </div>

            {/* Evidence upload */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Evidence <span className="text-muted-foreground font-normal">(optional — screenshots, photos, up to 5 files)</span>
              </label>
              <input
                ref={evidenceInputRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleEvidenceChange}
              />
              <button
                type="button"
                onClick={() => evidenceInputRef.current?.click()}
                className="flex items-center gap-2 w-full border-2 border-dashed border-muted rounded-lg px-4 py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Paperclip className="w-4 h-4" />
                Attach evidence files (images or PDFs)
              </button>
              {evidenceFiles.length > 0 && (
                <div className="space-y-1">
                  {evidenceFiles.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-muted/50 rounded px-3 py-1.5 text-xs">
                      <span className="truncate text-foreground">{f.name}</span>
                      <button type="button" onClick={() => removeEvidence(i)} className="ml-2 text-muted-foreground hover:text-destructive">
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                onClick={handleSubmit}
                disabled={submitting || description.length < 20}
                className="flex-1"
              >
                {submitting ? "Submitting..." : "Submit Dispute"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Existing disputes */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Your Disputes</h3>
          {(myDisputes as any[]).length === 0 ? (
            <div className="bg-card border rounded-xl p-8 text-center">
              <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No disputes filed yet</p>
              <p className="text-muted-foreground text-xs mt-1">If you believe a commission is incorrect, file a dispute above</p>
            </div>
          ) : (
            (myDisputes as any[]).map((d: any) => {
              const cfg = STATUS_CONFIG[d.disputeStatus ?? "open"] ?? STATUS_CONFIG.open;
              const Icon = cfg.icon;
              return (
                <div key={d.id} className="bg-card border rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground text-sm">
                        {d.reason ?? "Commission Dispute"}
                      </span>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{d.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{cfg.description}</span>
                    <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                  </div>
                  {d.resolutionNote && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs font-semibold text-foreground mb-1">Admin Resolution Note:</p>
                      <p className="text-xs text-muted-foreground">{d.resolutionNote}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </PartnerLayout>
  );
}
