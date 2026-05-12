import type React from "react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  CheckCircle, Loader2, MapPin, Wrench, DollarSign, FileText, Camera, ArrowLeft,
  Network, Download, Plus, BarChart2,
} from "lucide-react";
import { Link } from "wouter";

const JOB_TYPES = [
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Painting",
  "Other",
];

function parseJobValueFromNotes(notes: string | null | undefined): number {
  if (!notes) return 0;
  const match = notes.match(/Job value: \$(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

export default function JobLog() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [form, setForm] = useState({
    address: "",
    jobType: "",
    jobValue: "",
    notes: "",
    photosUploaded: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const myJobsQuery = trpc.partners.getMyJobs.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const jobStats = (() => {
    const jobList = myJobsQuery.data ?? [];
    const totalJobs = jobList.length;
    const totalValue = jobList.reduce((sum: number, j: { notes?: string | null }) => sum + parseJobValueFromNotes(j.notes), 0);
    const avgJobSize = totalJobs > 0 ? totalValue / totalJobs : 0;
    return { totalJobs, totalValue, avgJobSize };
  })();

  const logJobMutation = trpc.jobs.logJob.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Job logged successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to log job. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.address.trim()) { toast.error("Property address is required"); return; }
    if (!form.jobType) { toast.error("Please select a job type"); return; }

    logJobMutation.mutate({
      serviceAddress: form.address,
      serviceType: form.jobType,
      notes: [
        form.notes,
        form.jobValue ? `Job value: $${form.jobValue}` : "",
        form.photosUploaded ? "Photos: uploaded separately" : "",
      ].filter(Boolean).join(" | ") || undefined,
      photoUrls: [],
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
          <p className="text-white/60 mb-6 text-sm">You need to be signed in to log jobs.</p>
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

  if (submitted) {
    return (
      <PartnerLayout>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ backgroundColor: "#0A1628" }}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "rgba(245,230,66,0.15)" }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: "#F5E642" }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 text-center">Job Logged!</h2>
          <p className="text-white/60 text-sm text-center mb-8 max-w-sm">
            Your job has been recorded. If you haven't uploaded photos yet, head to the photo upload page now — the AI needs photos to detect referral opportunities for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
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
              onClick={() => {
                setSubmitted(false);
                setForm({ address: "", jobType: "", jobValue: "", notes: "", photosUploaded: false });
              }}
            >
              Log Another Job
            </Button>
          </div>
          <a
            href={`/job-complete?address=${encodeURIComponent(form.address)}`}
            className="mt-5 text-xs text-[#F5E642]/70 hover:text-[#F5E642] underline"
          >
            Mark this job complete to distribute commissions →
          </a>
          <Link href="/dashboard" className="mt-3 text-xs text-white/40 hover:text-white/70 underline">
            Back to Dashboard
          </Link>
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
        <div className="max-w-lg mx-auto px-4 py-10">
          {/* Back nav */}
          <Link href="/dashboard">
            <button className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
          </Link>

          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-6 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Log a Job</h1>
              <p className="text-white/50 text-sm">
                Record a completed job. Upload photos to activate AI opportunity detection.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/60 hover:bg-white/10 text-xs gap-1.5"
                onClick={() => {
                  const rows = (myJobsQuery.data ?? []).map((j) => [
                    j.serviceAddress,
                    j.serviceType ?? "",
                    parseJobValueFromNotes(j.notes),
                    j.status,
                    j.createdAt ? new Date(j.createdAt).toLocaleDateString() : "",
                  ].join(",")).join("\n");
                  const csv = `Address,Type,Value,Status,Date\n${rows}`;
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "job-log.csv";
                  a.click();
                  URL.revokeObjectURL(url);
                  toast.success("Job log exported");
                }}
              >
                <Download className="w-3.5 h-3.5" /> Export
              </Button>
              <a
                href="/job-complete"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
              >
                <Network className="w-3.5 h-3.5" /> New Job + Commission
              </a>
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              {
                label: "Total Jobs",
                value: myJobsQuery.isLoading ? "—" : String(jobStats.totalJobs),
                icon: <BarChart2 className="w-4 h-4 text-[#F5E642]" />,
              },
              {
                label: "Total Value",
                value: myJobsQuery.isLoading ? "—" : jobStats.totalValue > 0 ? `$${jobStats.totalValue.toLocaleString()}` : "$0",
                icon: <DollarSign className="w-4 h-4 text-[#F5E642]" />,
              },
              {
                label: "Avg Job Size",
                value: myJobsQuery.isLoading ? "—" : jobStats.avgJobSize > 0 ? `$${Math.round(jobStats.avgJobSize).toLocaleString()}` : "—",
                icon: <Network className="w-4 h-4 text-[#F5E642]" />,
              },
            ].map(({ label, value, icon }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                <div className="flex justify-center mb-1">{icon}</div>
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-xs text-white/40">{label}</p>
              </div>
            ))}
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
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
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
                Job Value
                <span className="text-white/30 font-normal normal-case">(optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-medium">$</span>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={form.jobValue}
                  onChange={(e) => setForm((f) => ({ ...f, jobValue: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#F5E642]/50 focus:ring-[#F5E642]/20 h-11 pl-7"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-[#F5E642]" />
                Notes
                <span className="text-white/30 font-normal normal-case">(optional)</span>
              </label>
              <textarea
                placeholder="Anything notable about this job, property condition, or what you observed..."
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#F5E642]/50"
              />
            </div>

            {/* Photos checkbox */}
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
                    Photos are required for AI opportunity detection.
                  </p>
                </div>
              </label>
            </div>

            {/* Notice */}
            <div className="p-4 rounded-xl border border-[#F5E642]/20 bg-[#F5E642]/5">
              <p className="text-xs text-[#F5E642]/80 leading-relaxed">
                <span className="font-bold text-[#F5E642]">AI Analysis:</span> After submitting, upload 1-3 photos at{" "}
                <a href="/photo-upload" className="underline font-medium">/photo-upload</a>. Our AI scans for lawn care, pest control, fence repair, and 50+ other opportunities — paying you a commission when a partner closes the job.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={logJobMutation.isPending}
              className="w-full h-12 text-base font-bold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
            >
              {logJobMutation.isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Logging Job...</>
              ) : (
                "Log Job"
              )}
            </Button>

            {logJobMutation.isError && (
              <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10">
                <p className="text-red-400 text-sm text-center">
                  {(logJobMutation.error as any)?.message || "Something went wrong. Try again."}
                </p>
                <p className="text-red-400/60 text-xs text-center mt-1">
                  If the issue persists, use <a href="/job/new" className="underline">/job/new</a> to log with photos.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </PartnerLayout>
  );
}
