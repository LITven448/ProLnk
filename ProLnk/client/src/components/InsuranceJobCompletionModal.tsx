/**
 * InsuranceJobCompletionModal — REV-01
 * Partner-side modal for completing an insurance-funded job.
 * Partner enters the final insurance payout amount and optionally uploads
 * the adjuster's report. This triggers the ACH commission pull.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Shield, DollarSign, Upload, FileText, CheckCircle, AlertTriangle,
  User, Mail, Hash, Info
} from "lucide-react";

interface InsuranceJobCompletionModalProps {
  open: boolean;
  onClose: () => void;
  dealId: number;
  homeownerName?: string;
  serviceAddress?: string;
  issueType?: string;
  estimatedValue?: number;
  onSuccess?: () => void;
}

export default function InsuranceJobCompletionModal({
  open,
  onClose,
  dealId,
  homeownerName,
  serviceAddress,
  issueType,
  estimatedValue,
  onSuccess,
}: InsuranceJobCompletionModalProps) {
  const [finalPayoutAmount, setFinalPayoutAmount] = useState(
    estimatedValue ? String(estimatedValue) : ""
  );
  const [claimNumber, setClaimNumber] = useState("");
  const [adjusterName, setAdjusterName] = useState("");
  const [adjusterEmail, setAdjusterEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [adjusterReportFile, setAdjusterReportFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [adjusterReportUrl, setAdjusterReportUrl] = useState<string | undefined>();
  const [confirmed, setConfirmed] = useState(false);

  const submitCompletion = trpc.payments.submitInsuranceCompletion.useMutation({
    onSuccess: (data) => {
      toast.success("Insurance job completion submitted!", {
        description: "ACH commission pull will be triggered automatically.",
      });
      onSuccess?.();
      onClose();
    },
    onError: (err) => {
      toast.error("Submission failed", { description: err.message });
    },
  });

  // Upload adjuster report to S3 via server
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large — max 10MB");
      return;
    }
    setAdjusterReportFile(file);
    setUploadingFile(true);
    try {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const dataUrl = ev.target?.result as string;
        const res = await fetch("/api/upload-license", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: { data: dataUrl, type: file.type, name: file.name } }),
        });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        setAdjusterReportUrl(data.url);
        toast.success("Adjuster report uploaded");
        setUploadingFile(false);
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Upload failed — please try again");
      setUploadingFile(false);
    }
  };

  const handleSubmit = () => {
    const amount = parseFloat(finalPayoutAmount);
    if (!amount || amount <= 0) {
      toast.error("Please enter the final insurance payout amount");
      return;
    }
    if (!confirmed) {
      toast.error("Please confirm the accuracy of the information");
      return;
    }
    submitCompletion.mutate({
      dealId,
      finalPayoutAmount: amount,
      adjusterReportUrl,
      adjusterReportFileName: adjusterReportFile?.name,
      claimNumber: claimNumber || undefined,
      adjusterName: adjusterName || undefined,
      adjusterEmail: adjusterEmail || undefined,
      notes: notes || undefined,
    });
  };

  const platformFee = finalPayoutAmount
    ? Math.round(parseFloat(finalPayoutAmount) * 0.10 * 100) / 100
    : 0;
  const yourPayout = finalPayoutAmount
    ? Math.round((parseFloat(finalPayoutAmount) - platformFee) * 100) / 100
    : 0;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-lg">Insurance Job Completion</DialogTitle>
              <p className="text-sm text-gray-500 mt-0.5">Submit final payout details to close this insurance claim</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Job Summary */}
          {(homeownerName || serviceAddress) && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  {homeownerName && <p className="font-medium text-blue-900">{homeownerName}</p>}
                  {serviceAddress && <p className="text-blue-700">{serviceAddress}</p>}
                  {issueType && (
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 mt-1">
                      {issueType}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Final Payout Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="finalPayout" className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-gray-500" />
              Final Insurance Payout Amount <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <Input
                id="finalPayout"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={finalPayoutAmount}
                onChange={(e) => setFinalPayoutAmount(e.target.value)}
                className="pl-7"
              />
            </div>
            <p className="text-xs text-gray-500">Enter the total amount approved by the insurance company</p>
          </div>

          {/* Commission Preview */}
          {parseFloat(finalPayoutAmount) > 0 && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm border border-gray-100">
              <p className="font-medium text-gray-700 text-xs uppercase tracking-wide">Commission Preview</p>
              <div className="flex justify-between">
                <span className="text-gray-600">Total insurance payout</span>
                <span className="font-medium">${parseFloat(finalPayoutAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-orange-600">
                <span>ProLnk platform fee (10%)</span>
                <span>− ${platformFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-700 font-semibold border-t border-gray-200 pt-2">
                <span>Your net payout</span>
                <span>${yourPayout.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400">Platform fee collected via ACH after job confirmation</p>
            </div>
          )}

          {/* Claim Details */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Claim Details <span className="text-gray-400 font-normal">(optional but recommended)</span></p>
            <div className="space-y-1.5">
              <Label htmlFor="claimNumber" className="flex items-center gap-1.5 text-sm">
                <Hash className="w-3.5 h-3.5 text-gray-400" />
                Claim Number
              </Label>
              <Input
                id="claimNumber"
                placeholder="e.g. CLM-2026-00123"
                value={claimNumber}
                onChange={(e) => setClaimNumber(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="adjusterName" className="flex items-center gap-1.5 text-sm">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  Adjuster Name
                </Label>
                <Input
                  id="adjusterName"
                  placeholder="John Smith"
                  value={adjusterName}
                  onChange={(e) => setAdjusterName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="adjusterEmail" className="flex items-center gap-1.5 text-sm">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  Adjuster Email
                </Label>
                <Input
                  id="adjusterEmail"
                  type="email"
                  placeholder="adjuster@insurance.com"
                  value={adjusterEmail}
                  onChange={(e) => setAdjusterEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Adjuster Report Upload */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-sm">
              <FileText className="w-3.5 h-3.5 text-gray-400" />
              Adjuster Report <span className="text-gray-400 font-normal">(PDF, max 10MB)</span>
            </Label>
            {adjusterReportUrl ? (
              <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-green-700 truncate">{adjusterReportFile?.name ?? "Report uploaded"}</span>
                <button
                  className="ml-auto text-gray-400 hover:text-gray-600 text-xs"
                  onClick={() => { setAdjusterReportUrl(undefined); setAdjusterReportFile(null); }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#00B5B8] hover:bg-teal-50/30 transition-colors">
                <Upload className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500">
                  {uploadingFile ? "Uploading..." : "Click to upload adjuster report"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={uploadingFile}
                />
              </label>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-sm">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional context about the job or insurance claim..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              maxLength={1000}
            />
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-lg">
            <input
              type="checkbox"
              id="confirm"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#00B5B8]"
            />
            <label htmlFor="confirm" className="text-sm text-amber-800 cursor-pointer">
              I confirm that the final payout amount is accurate and the work has been fully completed to the homeowner's satisfaction. I authorize ProLnk to collect the platform fee via ACH debit.
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={submitCompletion.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitCompletion.isPending || uploadingFile || !confirmed || !finalPayoutAmount}
            className="bg-[#00B5B8] hover:bg-[#009a9d] text-white"
          >
            {submitCompletion.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Submit Completion
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
