import React from 'react';
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  CheckCircle, Loader2, MapPin, Wrench, DollarSign, FileText, Camera, ArrowLeft,
  Network, Download, Plus, BarChart2, X, Star, Filter, TrendingUp, Award,
} from "lucide-react";
import { Link } from "wouter";
import {
  ResponsiveContainer, AreaChart, Area, Tooltip,
} from "recharts";

const JOB_TYPES = [
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Painting",
  "Other",
];

const DATE_RANGES = [
  { label: "All time", value: "all" },
  { label: "This month", value: "month" },
  { label: "Last 3 months", value: "3mo" },
  { label: "Last 6 months", value: "6mo" },
  { label: "This year", value: "year" },
];

function parseJobValueFromNotes(notes: string | null | undefined): number {
  if (!notes) return 0;
  const match = notes.match(/Job value: \$(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function getBestMonth(jobs: { notes?: string | null; createdAt?: Date | string | null }[]): string {
  if (!jobs.length) return "—";
  const monthlyTotals: Record<string, number> = {};
  for (const j of jobs) {
    if (!j.createdAt) continue;
    const d = new Date(j.createdAt as string);
    const key = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    monthlyTotals[key] = (monthlyTotals[key] ?? 0) + parseJobValueFromNotes(j.notes);
  }
  const entries = Object.entries(monthlyTotals);
  if (!entries.length) return "—";
  const best = entries.sort((a, b) => b[1] - a[1])[0];
  return `${best[0]} ($${Math.round(best[1]).toLocaleString()})`;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  completed:  { bg: "bg-emerald-100", text: "text-emerald-700", label: "Completed" },
  active:     { bg: "bg-blue-100",    text: "text-blue-700",    label: "Active" },
  pending:    { bg: "bg-yellow-100",  text: "text-yellow-700",  label: "Pending" },
  cancelled:  { bg: "bg-red-100",     text: "text-red-700",     label: "Cancelled" },
};

export default function JobLog() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [form, setForm] = useState({
    address: "",
    jobType: "",
    jobValue: "",
    notes: "",
    photosUploaded: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // Filters
  const [filterTrade, setFilterTrade] = useState("");
  const [filterRange, setFilterRange] = useState("all");
  const [filterMinValue, setFilterMinValue] = useState("");
  const [filterMaxValue, setFilterMaxValue] = useState("");

  // Inline quick-add drawer for non-ProLnk jobs
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerForm, setDrawerForm] = useState({
    customerName: "",
    address: "",
    trade: "",
    jobValue: "",
    commission: "",
    date: new Date().toISOString().slice(0, 10),
    status: "completed",
  });

  const myJobsQuery = trpc.partners.getMyJobs.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const allJobs = myJobsQuery.data ?? [];

  const filteredJobs = useMemo(() => {
    return allJobs.filter((j: { serviceType?: string | null; notes?: string | null; createdAt?: Date | string | null }) => {
      if (filterTrade && j.serviceType !== filterTrade) return false;
      const val = parseJobValueFromNotes(j.notes);
      if (filterMinValue && val < Number(filterMinValue)) return false;
      if (filterMaxValue && val > Number(filterMaxValue)) return false;
      if (filterRange !== "all" && j.createdAt) {
        const d = new Date(j.createdAt as string);
        const now = Date.now();
        const cutoffs: Record<string, number> = {
          month: now - 30 * 86400000,
          "3mo": now - 90 * 86400000,
          "6mo": now - 180 * 86400000,
          year: new Date(new Date().getFullYear(), 0, 1).getTime(),
        };
        if (d.getTime() < (cutoffs[filterRange] ?? 0)) return false;
      }
      return true;
    });
  }, [allJobs, filterTrade, filterRange, filterMinValue, filterMaxValue]);

  const jobStats = useMemo(() => {
    const totalJobs = allJobs.length;
    const totalValue = allJobs.reduce((sum: number, j: { notes?: string | null }) => sum + parseJobValueFromNotes(j.notes), 0);
    const avgJobSize = totalJobs > 0 ? totalValue / totalJobs : 0;
    const bestMonth = getBestMonth(allJobs as { notes?: string | null; createdAt?: Date | string | null }[]);

    // Best performing trade by revenue
    const tradeRevenue: Record<string, number> = {};
    const tradeCount: Record<string, number> = {};
    for (const j of allJobs as { serviceType?: string | null; notes?: string | null }[]) {
      const trade = j.serviceType ?? "Other";
      tradeRevenue[trade] = (tradeRevenue[trade] ?? 0) + parseJobValueFromNotes(j.notes);
      tradeCount[trade] = (tradeCount[trade] ?? 0) + 1;
    }
    const bestTradeEntry = Object.entries(tradeRevenue).sort((a, b) => b[1] - a[1])[0];
    const bestTrade = bestTradeEntry
      ? { name: bestTradeEntry[0], revenue: bestTradeEntry[1], count: tradeCount[bestTradeEntry[0]] ?? 0 }
      : null;

    // Monthly job count trend — last 6 months
    const monthlyJobs: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("en-US", { month: "short" });
      monthlyJobs[key] = 0;
    }
    for (const j of allJobs as { createdAt?: Date | string | null }[]) {
      if (!j.createdAt) continue;
      const d = new Date(j.createdAt as string);
      const key = d.toLocaleDateString("en-US", { month: "short" });
      if (key in monthlyJobs) monthlyJobs[key] = (monthlyJobs[key] ?? 0) + 1;
    }
    const sparkline = Object.entries(monthlyJobs).map(([month, count]) => ({ month, count }));

    return { totalJobs, totalValue, avgJobSize, bestMonth, bestTrade, sparkline };
  }, [allJobs]);

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
                  const rows = (myJobsQuery.data ?? []).map((j: { serviceAddress: string; serviceType?: string | null; notes?: string | null; status: string; createdAt?: Date | string | null }) => [
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
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/60 hover:bg-white/10 text-xs gap-1.5"
                onClick={() => setDrawerOpen(true)}
              >
                <Plus className="w-3.5 h-3.5" /> Add Manually
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              {
                label: "Total Jobs",
                value: myJobsQuery.isLoading ? "—" : String(jobStats.totalJobs),
                icon: <BarChart2 className="w-4 h-4 text-[#F5E642]" />,
              },
              {
                label: "Total Revenue",
                value: myJobsQuery.isLoading ? "—" : jobStats.totalValue > 0 ? `$${jobStats.totalValue.toLocaleString()}` : "$0",
                icon: <DollarSign className="w-4 h-4 text-[#F5E642]" />,
              },
              {
                label: "Avg Job Value",
                value: myJobsQuery.isLoading ? "—" : jobStats.avgJobSize > 0 ? `$${Math.round(jobStats.avgJobSize).toLocaleString()}` : "—",
                icon: <Network className="w-4 h-4 text-[#F5E642]" />,
              },
              {
                label: "Best Month",
                value: myJobsQuery.isLoading ? "—" : jobStats.bestMonth,
                icon: <Star className="w-4 h-4 text-[#F5E642]" />,
              },
            ].map(({ label, value, icon }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                <div className="flex justify-center mb-1">{icon}</div>
                <p className="text-sm font-bold text-white leading-tight">{value}</p>
                <p className="text-xs text-white/40 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Best trade + monthly trend row */}
          {(jobStats.bestTrade || jobStats.sparkline.some((s) => s.count > 0)) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Best performing trade */}
              {jobStats.bestTrade && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-[#F5E642]" />
                    <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Best Performing Trade</span>
                  </div>
                  <p className="text-xl font-black text-white mb-0.5">{jobStats.bestTrade.name}</p>
                  <p className="text-sm text-[#F5E642] font-semibold">
                    ${jobStats.bestTrade.revenue.toLocaleString()} total revenue
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{jobStats.bestTrade.count} job{jobStats.bestTrade.count !== 1 ? "s" : ""} logged</p>
                </div>
              )}

              {/* Monthly job count sparkline */}
              {jobStats.sparkline.some((s) => s.count > 0) && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-[#F5E642]" />
                    <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Monthly Job Trend</span>
                  </div>
                  <div className="h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={jobStats.sparkline} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <defs>
                          <linearGradient id="jobTrendGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F5E642" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F5E642" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="count"
                          stroke="#F5E642"
                          strokeWidth={2}
                          fill="url(#jobTrendGrad)"
                          dot={false}
                        />
                        <Tooltip
                          contentStyle={{ fontSize: 10, padding: "2px 6px", borderRadius: 6, border: "none", backgroundColor: "#1E3A5F", color: "#fff" }}
                          formatter={(v: number) => [`${v} job${v !== 1 ? "s" : ""}`, ""]}
                          labelFormatter={(l) => l}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between mt-1">
                    {jobStats.sparkline.map((s) => (
                      <span key={s.month} className="text-[9px] text-white/30">{s.month}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Jobs needed for next tier progress */}
          {(() => {
            const total = allJobs.length;
            const tiers = [
              { name: "Silver",   min: 5,   color: "#9CA3AF" },
              { name: "Gold",     min: 25,  color: "#F59E0B" },
              { name: "Platinum", min: 100, color: "#6366F1" },
            ];
            const current = [...tiers].reverse().find((t) => total >= t.min) ?? null;
            const next = tiers.find((t) => total < t.min) ?? null;
            if (!next) return null;
            const prevMin = current ? current.min : 0;
            const pct = Math.round(((total - prevMin) / (next.min - prevMin)) * 100);
            const needed = next.min - total;
            return (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" style={{ color: next.color }} />
                    <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
                      {needed} job{needed !== 1 ? "s" : ""} to {next.name} Badge
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white/50">{total}/{next.min}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: next.color }}
                  />
                </div>
                <p className="text-[10px] text-white/30 mt-1.5">
                  {pct}% of the way to {next.name} — keep logging jobs to unlock the next badge tier
                </p>
              </div>
            );
          })()}

          {/* Filter row */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-[#F5E642]" />
              Filter Jobs
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Trade filter */}
              <select
                value={filterTrade}
                onChange={(e) => setFilterTrade(e.target.value)}
                className="h-9 bg-white/5 border border-white/10 rounded-md px-3 text-xs text-white focus:outline-none focus:border-[#F5E642]/50"
              >
                <option value="" className="bg-[#0A1628]">All Trades</option>
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#0A1628]">{t}</option>
                ))}
              </select>
              {/* Date range */}
              <select
                value={filterRange}
                onChange={(e) => setFilterRange(e.target.value)}
                className="h-9 bg-white/5 border border-white/10 rounded-md px-3 text-xs text-white focus:outline-none focus:border-[#F5E642]/50"
              >
                {DATE_RANGES.map((r) => (
                  <option key={r.value} value={r.value} className="bg-[#0A1628]">{r.label}</option>
                ))}
              </select>
              {/* Min value */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">$</span>
                <Input
                  type="number"
                  placeholder="Min value"
                  value={filterMinValue}
                  onChange={(e) => setFilterMinValue(e.target.value)}
                  className="h-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-xs pl-6 focus:border-[#F5E642]/50"
                />
              </div>
              {/* Max value */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">$</span>
                <Input
                  type="number"
                  placeholder="Max value"
                  value={filterMaxValue}
                  onChange={(e) => setFilterMaxValue(e.target.value)}
                  className="h-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-xs pl-6 focus:border-[#F5E642]/50"
                />
              </div>
            </div>
            {(filterTrade || filterRange !== "all" || filterMinValue || filterMaxValue) && (
              <button
                className="text-xs text-[#F5E642]/70 hover:text-[#F5E642] underline"
                onClick={() => { setFilterTrade(""); setFilterRange("all"); setFilterMinValue(""); setFilterMaxValue(""); }}
              >
                Clear filters ({filteredJobs.length} of {allJobs.length} showing)
              </button>
            )}
          </div>

          {/* Job list */}
          {!myJobsQuery.isLoading && filteredJobs.length > 0 && (
            <div className="mb-8 space-y-2">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-white/70">
                  {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""}
                </h2>
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/20 text-white/70 hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Job Manually
                </button>
              </div>
              {filteredJobs.map((j: { id: number | string; serviceAddress: string; serviceType?: string | null; notes?: string | null; status: string; createdAt?: Date | string | null }) => {
                const value = parseJobValueFromNotes(j.notes);
                const commission = value * 0.12;
                const statusCfg = STATUS_COLORS[j.status] ?? STATUS_COLORS.pending;
                const customerName = j.notes?.match(/Customer: ([^|]+)/)?.[1]?.trim() ?? "—";
                const addrParts = j.serviceAddress?.split(",") ?? [];
                const shortAddr = addrParts.length > 1
                  ? `${addrParts[0]}, ${addrParts[addrParts.length - 2]?.trim()?.slice(0, 2) ?? ""}...`
                  : j.serviceAddress;
                return (
                  <div key={j.id} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex flex-wrap gap-3 items-center hover:bg-white/8 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusCfg.bg} ${statusCfg.text}`}>
                          {statusCfg.label}
                        </span>
                        {j.serviceType && (
                          <span className="text-[10px] text-white/40 font-medium">{j.serviceType}</span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-white truncate">{customerName !== "—" ? customerName : shortAddr}</p>
                      <p className="text-xs text-white/40 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {shortAddr}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0 text-right">
                      <div>
                        <p className="text-xs text-white/40">Job Value</p>
                        <p className="text-sm font-bold text-white">{value > 0 ? `$${value.toLocaleString()}` : "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40">Commission</p>
                        <p className="text-sm font-bold text-[#F5E642]">{commission > 0 ? `$${commission.toFixed(0)}` : "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40">Date</p>
                        <p className="text-xs text-white/60">
                          {j.createdAt ? new Date(j.createdAt as string).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Inline quick-add drawer */}
          {drawerOpen && (
            <div className="mb-8 rounded-2xl border border-[#F5E642]/30 bg-[#F5E642]/5 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#F5E642]" /> Add Job Manually
                </h3>
                <button onClick={() => setDrawerOpen(false)} className="text-white/40 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/40">Record jobs you completed outside the ProLnk platform.</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Customer Name</label>
                  <Input
                    placeholder="Jane Smith"
                    value={drawerForm.customerName}
                    onChange={(e) => setDrawerForm((f) => ({ ...f, customerName: e.target.value }))}
                    className="h-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm focus:border-[#F5E642]/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Trade</label>
                  <select
                    value={drawerForm.trade}
                    onChange={(e) => setDrawerForm((f) => ({ ...f, trade: e.target.value }))}
                    className="w-full h-9 bg-white/5 border border-white/10 rounded-md px-3 text-sm text-white focus:outline-none focus:border-[#F5E642]/50"
                  >
                    <option value="" className="bg-[#0A1628]">Select trade...</option>
                    {JOB_TYPES.map((t) => <option key={t} value={t} className="bg-[#0A1628]">{t}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-white/50 mb-1 block">Property Address</label>
                  <Input
                    placeholder="123 Main St, Dallas, TX"
                    value={drawerForm.address}
                    onChange={(e) => setDrawerForm((f) => ({ ...f, address: e.target.value }))}
                    className="h-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm focus:border-[#F5E642]/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Job Value ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={drawerForm.jobValue}
                    onChange={(e) => setDrawerForm((f) => ({ ...f, jobValue: e.target.value }))}
                    className="h-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm focus:border-[#F5E642]/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Commission Earned ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={drawerForm.commission}
                    onChange={(e) => setDrawerForm((f) => ({ ...f, commission: e.target.value }))}
                    className="h-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm focus:border-[#F5E642]/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Date Completed</label>
                  <Input
                    type="date"
                    value={drawerForm.date}
                    onChange={(e) => setDrawerForm((f) => ({ ...f, date: e.target.value }))}
                    className="h-9 bg-white/5 border-white/10 text-white text-sm focus:border-[#F5E642]/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Status</label>
                  <select
                    value={drawerForm.status}
                    onChange={(e) => setDrawerForm((f) => ({ ...f, status: e.target.value }))}
                    className="w-full h-9 bg-white/5 border border-white/10 rounded-md px-3 text-sm text-white focus:outline-none focus:border-[#F5E642]/50"
                  >
                    <option value="completed" className="bg-[#0A1628]">Completed</option>
                    <option value="active" className="bg-[#0A1628]">Active</option>
                    <option value="pending" className="bg-[#0A1628]">Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  className="text-xs font-bold h-9 px-4"
                  style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
                  onClick={() => {
                    if (!drawerForm.address.trim() || !drawerForm.trade) {
                      toast.error("Address and trade are required");
                      return;
                    }
                    toast.success("Job added to your log");
                    setDrawerOpen(false);
                    setDrawerForm({ customerName: "", address: "", trade: "", jobValue: "", commission: "", date: new Date().toISOString().slice(0, 10), status: "completed" });
                  }}
                >
                  Save Job
                </Button>
                <Button
                  variant="ghost"
                  className="text-xs text-white/50 h-9"
                  onClick={() => setDrawerOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

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
