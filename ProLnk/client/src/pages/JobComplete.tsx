import React from 'react';
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  CheckCircle, Loader2, MapPin, Wrench, DollarSign, FileText,
  Camera, ArrowLeft, Network, Home, Share2, AlertCircle, ArrowRight,
} from "lucide-react";
import { Link, useSearch } from "wouter";

const JOB_TYPES = [
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Painting",
  "Other",
];

interface DistributionLine {
  partnerId: number;
  partnerName: string;
  type: string;
  amount: number;
  rate: number;
}

interface CompletionResult {
  success: boolean;
  jobId: string;
  originationClaimed: boolean;
  distribution: {
    success: boolean;
    platformFee: number;
    distributions: DistributionLine[];
    prolnkRetains: number;
    totalDistributed: number;
    jobId: string;
  };
}

function typeLabel(type: string): string {
  const labels: Record<string, string> = {
    home_origination: "Home Origination",
    network_l1: "L1 Override (7%)",
    network_l2: "L2 Override (4%)",
    network_l3: "L3 Override (2%)",
    network_l4: "L4 Override (1%)",
  };
  return labels[type] ?? type;
}

function SuccessState({
  result,
  address,
  jobValue,
  photosUploaded,
  onReset,
}: {
  result: CompletionResult;
  address: string;
  jobValue: string;
  photosUploaded: boolean;
  onReset: () => void;
}) {
  const dist = result.distribution;
  const referralUrl = `${window.location.origin}/refer?job=${result.jobId}`;
  const val = Number(jobValue) || 0;
  const fee = val * 0.1;

  return (
    <PartnerLayout>
      <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
        <div className="max-w-lg mx-auto px-4 py-10">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "rgba(245,230,66,0.15)" }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: "#F5E642" }} />
          </div>

          <h2 className="text-2xl font-bold text-white mb-1 text-center">Job Logged</h2>
          <p className="text-white/50 text-sm text-center mb-4">
            Commission pool distributed · origination rights applied
          </p>

          {/* Flow confirmation */}
          <div className="flex flex-wrap justify-center items-center gap-1.5 text-xs mb-6">
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-[#F5E642]/10 text-[#F5E642]/90">
              <CheckCircle className="w-3 h-3" /> Job logged
            </span>
            <ArrowRight className="w-3 h-3 text-white/30" />
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-[#F5E642]/10 text-[#F5E642]/90">
              <CheckCircle className="w-3 h-3" /> Cascade calculated
            </span>
            <ArrowRight className="w-3 h-3 text-white/30" />
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-[#F5E642]/10 text-[#F5E642]/90">
              <CheckCircle className="w-3 h-3" /> Upline overrides distributed
            </span>
            <ArrowRight className="w-3 h-3 text-white/30" />
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-[#F5E642]/10 text-[#F5E642]/90">
              <CheckCircle className="w-3 h-3" /> Origination rights recorded
            </span>
          </div>

          {/* Estimated earnings summary if no actual distribution data */}
          {val > 0 && (!dist.success || dist.distributions.length === 0) && (
            <div className="mb-4 rounded-xl border border-[#F5E642]/20 bg-[#F5E642]/5 px-4 py-3">
              <p className="text-xs font-semibold text-[#F5E642] mb-2">Estimated network commissions triggered</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Platform fee (10%)</span>
                  <span className="text-white/70">${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">L1–L4 overrides (14% of fee)</span>
                  <span className="text-[#F5E642]/80">${(fee * 0.14).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Your origination rights</span>
                  <span className="text-[#F5E642]/70">1.5% of all future fees at this address</span>
                </div>
              </div>
            </div>
          )}

          {/* Photo reminder on success if not uploaded */}
          {!photosUploaded && (
            <div className="mb-4 rounded-xl border border-orange-500/30 bg-orange-500/5 px-4 py-3 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-white/60 leading-relaxed">
                <span className="text-orange-400 font-semibold">Photos not yet uploaded.</span>{" "}
                Upload 1–3 job photos to unlock AI opportunity detection and maximize your network's earnings from this address.
              </p>
            </div>
          )}

          {/* Commission breakdown */}
          {dist.success && dist.distributions.length > 0 && (
            <div className="mb-4 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                <Network className="w-4 h-4 flex-shrink-0" style={{ color: "#F5E642" }} />
                <span className="text-sm font-semibold text-white">
                  Commission pool: ${dist.platformFee.toFixed(2)} distributed
                </span>
              </div>
              <div className="overflow-x-auto">
                <div className="divide-y divide-white/5 min-w-[280px]">
                  {dist.distributions.map((line, i) => (
                    <div key={i} className="px-4 py-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-white font-medium truncate">{line.partnerName}</p>
                        <p className="text-xs text-white/40">{typeLabel(line.type)}</p>
                      </div>
                      <span className="text-sm font-bold flex-shrink-0" style={{ color: "#F5E642" }}>
                        ${line.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="px-4 py-3 flex items-center justify-between bg-white/5">
                    <span className="text-xs text-white/40">ProLnk retains</span>
                    <span className="text-xs text-white/60">${dist.prolnkRetains.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {dist.success && dist.distributions.length === 0 && (
            <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-sm text-white/60 text-center">
                No network commissions distributed — no upline chain found for your account.
              </p>
            </div>
          )}

          {/* Origination */}
          {result.originationClaimed && (
            <div className="mb-4 rounded-xl border border-[#F5E642]/20 bg-[#F5E642]/5 px-4 py-3 flex items-center gap-3">
              <Home className="w-4 h-4 flex-shrink-0" style={{ color: "#F5E642" }} />
              <p className="text-sm text-[#F5E642]/90">
                You've claimed origination rights on{" "}
                <span className="font-semibold">{address}</span>. You'll earn 1.5% of every future
                platform fee at this address — permanently.
              </p>
            </div>
          )}

          {/* Share CTA */}
          <div className="mb-6 rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-4 h-4" style={{ color: "#F5E642" }} />
              <span className="text-sm font-semibold text-white">Share this job</span>
            </div>
            <p className="text-xs text-white/50 mb-3">
              Send this referral link to grow your network — you earn from every partner you recruit.
            </p>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <input
                readOnly
                value={referralUrl}
                className="w-full sm:flex-1 text-xs bg-white/5 border border-white/10 rounded px-3 py-2 text-white/70 truncate min-w-0"
              />
              <Button
                size="sm"
                className="text-xs font-semibold shrink-0"
                style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
                onClick={() => {
                  navigator.clipboard.writeText(referralUrl).then(() =>
                    toast.success("Link copied!")
                  );
                }}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/photo-upload"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-none text-sm font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
            >
              <Camera className="w-4 h-4" /> Upload Photos
            </a>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={onReset}
            >
              Log Another Job
            </Button>
          </div>

          <Link href="/dashboard" className="block mt-6 text-xs text-white/40 hover:text-white/70 underline text-center">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </PartnerLayout>
  );
}

export default function JobComplete() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const prefillAddress = params.get("address") ?? "";

  const { isAuthenticated, loading: authLoading } = useAuth();
  const [form, setForm] = useState({
    propertyAddress: prefillAddress,
    jobType: "",
    jobValue: "",
    completionDate: "",
    notes: "",
    photosUploaded: false,
    platformFeeRate: 0.1,
  });
  const [result, setResult] = useState<CompletionResult | null>(null);

  const completeJobMutation = trpc.jobs.completeJob.useMutation({
    onSuccess: (data) => {
      setResult(data as CompletionResult);
      toast.success("Job completion logged!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to complete job. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.propertyAddress.trim()) {
      toast.error("Property address is required");
      return;
    }
    if (!form.jobType) {
      toast.error("Please select a job type");
      return;
    }
    if (!form.jobValue || Number(form.jobValue) <= 0) {
      toast.error("Job value must be a positive number");
      return;
    }

    completeJobMutation.mutate({
      propertyAddress: form.propertyAddress.trim(),
      jobType: form.jobType,
      jobValue: Number(form.jobValue),
      completionDate: form.completionDate || undefined,
      notes: form.notes || undefined,
      platformFeeRate: form.platformFeeRate,
    });
  };

  const handleReset = () => {
    setResult(null);
    setForm({
      propertyAddress: "",
      jobType: "",
      jobValue: "",
      completionDate: "",
      notes: "",
      photosUploaded: false,
      platformFeeRate: 0.1,
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A1628" }}>
        <Loader2 className="w-8 h-8 animate-spin text-[#F5E642]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4" style={{ backgroundColor: "#0A1628" }}>
        <div className="text-center max-w-sm">
          <h2 className="text-2xl font-bold text-white mb-2">Sign In Required</h2>
          <p className="text-white/60 mb-6 text-sm">You need to be signed in to complete jobs.</p>
          <Button
            className="font-semibold"
            style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
            onClick={() => { window.location.href = getLoginUrl(); }}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <SuccessState
        result={result}
        address={form.propertyAddress}
        jobValue={form.jobValue}
        photosUploaded={form.photosUploaded}
        onReset={handleReset}
      />
    );
  }

  return (
    <PartnerLayout>
      <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
        <div className="max-w-lg mx-auto px-4 py-10">
          <Link href="/dashboard">
            <button className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Complete a Job</h1>
            <p className="text-white/50 text-sm">
              Log job completion to distribute commissions to your network and lock origination rights on this address.
            </p>
          </div>

          {/* Commission Trigger explanation */}
          <div className="mb-6 rounded-xl border border-[#F5E642]/30 bg-[#F5E642]/5 p-4">
            <div className="flex items-start gap-3">
              <Network className="w-5 h-5 text-[#F5E642] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#F5E642] mb-1">Commission Trigger</p>
                <p className="text-xs text-white/70 leading-relaxed mb-3">
                  When you log a completed job, ProLnk automatically calculates and distributes commissions to your upline recruiter chain — all the way up 4 levels.
                </p>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/70">Job logged</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/70">Commission cascade calculated</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/70">Upline earns override</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="px-2 py-0.5 rounded bg-[#F5E642]/20 text-[#F5E642]/90">Origination rights locked</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Property Address */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5E642]" />
                Property Address <span className="text-[#F5E642]">*</span>
              </label>
              <Input
                placeholder="123 Main St, Dallas, TX 75201"
                value={form.propertyAddress}
                onChange={(e) => setForm((f) => ({ ...f, propertyAddress: e.target.value }))}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#F5E642]/50 focus:ring-[#F5E642]/20 h-11"
                required
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                <Wrench className="w-3.5 h-3.5 text-[#F5E642]" />
                Job Type <span className="text-[#F5E642]">*</span>
              </label>
              <select
                value={form.jobType}
                onChange={(e) => setForm((f) => ({ ...f, jobType: e.target.value }))}
                className="w-full h-11 bg-white/5 border border-white/10 rounded-md px-3 text-sm text-white focus:outline-none focus:border-[#F5E642]/50"
                required
              >
                <option value="" className="bg-[#0A1628] text-white/50">Select a job type...</option>
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#0A1628] text-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Value */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                <DollarSign className="w-3.5 h-3.5 text-[#F5E642]" />
                Job Value <span className="text-[#F5E642]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-medium">$</span>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0"
                  value={form.jobValue}
                  onChange={(e) => setForm((f) => ({ ...f, jobValue: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#F5E642]/50 focus:ring-[#F5E642]/20 h-11 pl-7"
                  required
                />
              </div>
              {form.jobValue && Number(form.jobValue) > 0 && (() => {
                const val = Number(form.jobValue);
                const fee = val * 0.1;
                return (
                  <div className="mt-2 p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs font-semibold text-white/60 mb-2">Estimated commission distribution</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">Platform fee (10%)</span>
                        <span className="text-white/70">${fee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">L1 Override — your recruiter (7%)</span>
                        <span className="text-[#F5E642]/80">${(fee * 0.07).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">L2 Override (4%)</span>
                        <span className="text-[#F5E642]/60">${(fee * 0.04).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">L3 Override (2%)</span>
                        <span className="text-[#F5E642]/50">${(fee * 0.02).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">L4 Override (1%)</span>
                        <span className="text-[#F5E642]/40">${(fee * 0.01).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs border-t border-white/10 pt-1 mt-1">
                        <span className="text-white/40">Origination rights (1.5% of future fees)</span>
                        <span className="text-[#F5E642]/70">Permanent</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Completion Date */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-[#F5E642]" />
                Completion Date
                <span className="text-white/30 font-normal normal-case">(optional)</span>
              </label>
              <Input
                type="date"
                value={form.completionDate}
                onChange={(e) => setForm((f) => ({ ...f, completionDate: e.target.value }))}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#F5E642]/50 focus:ring-[#F5E642]/20 h-11"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-[#F5E642]" />
                Notes
                <span className="text-white/30 font-normal normal-case">(optional)</span>
              </label>
              <textarea
                placeholder="Anything notable about this job or property..."
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#F5E642]/50"
              />
            </div>

            {/* Photos uploaded checkbox */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.photosUploaded}
                  onChange={(e) => setForm((f) => ({ ...f, photosUploaded: e.target.checked }))}
                  className="mt-0.5 rounded border-white/30 text-[#F5E642] focus:ring-[#F5E642]/30"
                />
                <div>
                  <p className="text-sm font-medium text-white flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#F5E642]" />
                    Photos uploaded separately
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">
                    Check this if you've already uploaded photos via the{" "}
                    <a href="/photo-upload" className="text-[#F5E642] underline">photo upload page</a>.
                    Photos unlock AI opportunity detection for your network.
                  </p>
                </div>
              </label>
            </div>

            {/* Photo reminder — shown when photos not yet uploaded */}
            {!form.photosUploaded && (
              <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-500/5 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-orange-400 mb-0.5">Upload photos first</p>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Photos are required for AI opportunity detection — the AI scans for 50+ additional services to route to your network.{" "}
                    <a href="/photo-upload" className="text-orange-400 underline">Upload now</a>, then return to log this job.
                  </p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={completeJobMutation.isPending}
              className="w-full h-12 text-base font-bold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
            >
              {completeJobMutation.isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing...</>
              ) : (
                "Complete Job & Distribute Commissions"
              )}
            </Button>

            {completeJobMutation.isError && (
              <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10">
                <p className="text-red-400 text-sm text-center">
                  {(completeJobMutation.error as any)?.message || "Something went wrong. Try again."}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full mt-2 text-xs text-red-400/70 hover:text-red-400"
                  onClick={() => completeJobMutation.reset()}
                >
                  Dismiss
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </PartnerLayout>
  );
}
