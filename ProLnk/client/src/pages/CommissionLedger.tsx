import PageLoadingSkeleton from "@/components/PageLoadingSkeleton";
import PartnerLayout from "@/components/PartnerLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  DollarSign, CheckCircle, Clock, TrendingUp, Download, Flag,
  Home, Users, Repeat, ChevronRight, Camera, UserPlus, FileText,
  GitBranch, Wallet, CalendarClock, Network
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function downloadCSV(data: any[], filename: string) {
  if (!data.length) return;
  const headers = ["Date", "Description", "Type", "Job Value", "Amount", "Status"];
  const rows = data.map((c) => [
    new Date(c.createdAt).toLocaleDateString(),
    `"${(c.description ?? "Referral commission").replace(/"/g, '""')}"`,
    c.commissionType.replace(/_/g, " "),
    c.jobValue ? Number(c.jobValue).toFixed(2) : "",
    Number(c.amount).toFixed(2),
    c.paid ? "Paid" : "Pending",
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function ProjectedCalculator() {
  const [recruitedPros, setRecruitedPros] = useState(5);
  const [avgJobValue, setAvgJobValue] = useState(2500);
  const [jobsPerMonth, setJobsPerMonth] = useState(4);
  const [documentedHomes, setDocumentedHomes] = useState(10);

  const networkJobComm = recruitedPros * jobsPerMonth * avgJobValue * 0.07;
  const subscriptionOverride = recruitedPros * 149 * 0.12;
  const originationRights = documentedHomes * 200 * 0.015;
  const total = networkJobComm + subscriptionOverride + originationRights;

  return (
    <div className="bg-[#0A1628] rounded-2xl p-6 text-white">
      <h3 className="text-lg font-bold mb-1">Projected Monthly Income</h3>
      <p className="text-sm text-blue-300 mb-6">Adjust the sliders to model your network earnings</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-xs text-blue-300 mb-1 block">Pros you've recruited: <span className="text-[#F5E642] font-bold">{recruitedPros}</span></label>
          <input type="range" min={0} max={50} value={recruitedPros} onChange={e => setRecruitedPros(+e.target.value)}
            className="w-full accent-[#F5E642]" />
        </div>
        <div>
          <label className="text-xs text-blue-300 mb-1 block">Avg job value: <span className="text-[#F5E642] font-bold">${avgJobValue.toLocaleString()}</span></label>
          <input type="range" min={500} max={10000} step={250} value={avgJobValue} onChange={e => setAvgJobValue(+e.target.value)}
            className="w-full accent-[#F5E642]" />
        </div>
        <div>
          <label className="text-xs text-blue-300 mb-1 block">Jobs per pro per month: <span className="text-[#F5E642] font-bold">{jobsPerMonth}</span></label>
          <input type="range" min={1} max={20} value={jobsPerMonth} onChange={e => setJobsPerMonth(+e.target.value)}
            className="w-full accent-[#F5E642]" />
        </div>
        <div>
          <label className="text-xs text-blue-300 mb-1 block">Homes documented: <span className="text-[#F5E642] font-bold">{documentedHomes}</span></label>
          <input type="range" min={0} max={200} value={documentedHomes} onChange={e => setDocumentedHomes(+e.target.value)}
            className="w-full accent-[#F5E642]" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Network Jobs", value: networkJobComm, desc: "7% L1 override" },
          { label: "Subscription", value: subscriptionOverride, desc: "12% recurring" },
          { label: "Origination", value: originationRights, desc: "1.5% perpetual" },
        ].map(item => (
          <div key={item.label} className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-[10px] text-blue-300 mb-1">{item.label}</p>
            <p className="text-lg font-bold text-[#F5E642]">${item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            <p className="text-[10px] text-blue-400">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#F5E642]/10 border border-[#F5E642]/30 rounded-xl p-4 text-center">
        <p className="text-xs text-blue-300 mb-0.5">Projected monthly income</p>
        <p className="text-3xl font-black text-[#F5E642]">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        <p className="text-xs text-blue-400 mt-1">Based on your inputs — actual earnings depend on network activity</p>
      </div>
    </div>
  );
}

function CascadeBreakdown({ commissions }: { commissions: Array<{ commissionType: string; amount: string | number }> }) {
  const levelDepths = [
    {
      level: "L1",
      label: "Direct Recruits",
      jobRate: "7%",
      subRate: "12%",
      color: "#0A1628",
      bg: "bg-[#0A1628]",
      lightBg: "bg-[#0A1628]/8",
      border: "border-[#0A1628]/20",
    },
    {
      level: "L2",
      label: "Their Recruits",
      jobRate: "4%",
      subRate: "6%",
      color: "#1B4FD8",
      bg: "bg-[#1B4FD8]",
      lightBg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      level: "L3",
      label: "3 Levels Deep",
      jobRate: "2%",
      subRate: "3%",
      color: "#7C3AED",
      bg: "bg-purple-600",
      lightBg: "bg-purple-50",
      border: "border-purple-200",
    },
    {
      level: "L4",
      label: "4 Levels Deep",
      jobRate: "1%",
      subRate: "1.5%",
      color: "#059669",
      bg: "bg-emerald-600",
      lightBg: "bg-emerald-50",
      border: "border-emerald-200",
    },
  ];

  const referralCount = commissions.filter(c => c.commissionType === "referral_commission").length;
  const cascadeDepth = referralCount === 0 ? 0 : referralCount < 3 ? 1 : referralCount < 8 ? 2 : referralCount < 20 ? 3 : 4;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-[#0A1628]" />
          <h3 className="text-base font-bold text-gray-900">Commission Cascade Breakdown</h3>
        </div>
        {cascadeDepth > 0 && (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#F5E642]/20 text-[#0A1628]">
            {cascadeDepth}-Level Network Active
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500 mb-5">
          Every pro you recruit expands your income 4 levels deep. You earn a percentage of every job completed and every subscription paid — simultaneously, across all levels.
        </p>

        <div className="relative">
          <div className="absolute left-[2.35rem] top-10 bottom-10 w-px bg-gradient-to-b from-[#0A1628] to-emerald-300 opacity-20 hidden sm:block" />
          <div className="space-y-3">
            {levelDepths.map((lvl, i) => {
              const isActive = i < cascadeDepth;
              return (
                <div key={lvl.level} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${isActive ? `${lvl.lightBg} ${lvl.border}` : "bg-gray-50 border-gray-100 opacity-60"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0 ${isActive ? lvl.bg : "bg-gray-300"}`}>
                    {lvl.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-gray-900">{lvl.label}</p>
                      {isActive && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">ACTIVE</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">{lvl.jobRate}</span> of each job completed &nbsp;·&nbsp;
                      <span className="font-medium">{lvl.subRate}</span> of each $149/mo subscription
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400 leading-snug">Job override</p>
                    <p className="text-base font-black" style={{ color: isActive ? lvl.color : "#9CA3AF" }}>{lvl.jobRate}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400 leading-snug">Sub override</p>
                    <p className="text-base font-black" style={{ color: isActive ? lvl.color : "#9CA3AF" }}>{lvl.subRate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 p-4 rounded-xl bg-[#F5E642]/10 border border-[#F5E642]/30 flex items-start gap-3">
          <GitBranch className="w-4 h-4 text-[#0A1628] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-[#0A1628] mb-0.5">Home Origination Rights — 1.5% perpetual</p>
            <p className="text-xs text-gray-600">Every home you document earns you 1.5% of the platform fee on every future job at that address — forever. This is separate from and stacks on top of the cascade above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommissionExplainer() {
  const streams = [
    {
      icon: <Home className="w-5 h-5" />,
      title: "Home Origination Rights",
      rate: "1.5%",
      desc: "When you document a home and upload job photos, you earn 1.5% of the platform fee on every future job at that address — forever. This is your permanent revenue asset.",
      detail: "A $2,000 roof repair → you earn $30. Perpetually, on every future job at that home.",
      color: "bg-emerald-50 border-emerald-200 text-emerald-800",
      badge: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Network Job Commissions",
      rate: "7% / 4% / 2% / 1%",
      desc: "When pros in your downline complete jobs, you earn a percentage of the platform fee — 4 levels deep. The pro who completes the job keeps their full commission.",
      detail: "L1: 7%  ·  L2: 4%  ·  L3: 2%  ·  L4: 1% — stacks across all levels simultaneously.",
      color: "bg-blue-50 border-blue-200 text-blue-800",
      badge: "bg-blue-100 text-blue-700",
    },
    {
      icon: <Repeat className="w-5 h-5" />,
      title: "Subscription Overrides",
      rate: "12% / 6% / 3% / 1.5%",
      desc: "Every pro you recruit pays $149/mo. You earn 12% of their subscription — every month, recurring. Your L2s pay you 6%, L3s 3%, L4s 1.5%.",
      detail: "5 L1 recruits = $89/mo minimum. 50 recruits across all levels = $890+/mo in pure subscription income.",
      color: "bg-purple-50 border-purple-200 text-purple-800",
      badge: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-5 h-5 text-[#0A1628]" />
        <h3 className="text-base font-bold text-gray-900">How Your Commissions Work</h3>
      </div>
      {streams.map((s) => (
        <div key={s.title} className={`rounded-xl border p-5 ${s.color}`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${s.badge}`}>{s.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-sm">{s.title}</p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${s.badge}`}>{s.rate}</span>
              </div>
              <p className="text-sm opacity-80 leading-relaxed mb-2">{s.desc}</p>
              <p className="text-xs font-medium opacity-70 italic">{s.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EarnFasterSection() {
  const actions = [
    {
      icon: <Camera className="w-5 h-5 text-[#0A1628]" />,
      title: "Upload more job photos",
      desc: "Every photo you upload to a job documents that home — locking in your origination rights on that address forever.",
      cta: "Upload Photos",
      href: "/photo-upload",
    },
    {
      icon: <UserPlus className="w-5 h-5 text-[#0A1628]" />,
      title: "Recruit qualified pros",
      desc: "Every contractor you bring in pays you 12% of their $149/mo subscription — plus 7% of every job they complete.",
      cta: "Get My Referral Link",
      href: "/dashboard/referral",
    },
    {
      icon: <FileText className="w-5 h-5 text-[#0A1628]" />,
      title: "Document more homes",
      desc: "Help homeowners add their home to the Vault. You earn 1.5% on all future platform fees tied to that address — permanently.",
      cta: "Log a Job",
      href: "/job/new",
    },
  ];

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <h3 className="text-base font-bold text-gray-900 mb-1">How to Earn Faster</h3>
      <p className="text-sm text-gray-500 mb-5">Three actions that compound over time</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((a) => (
          <div key={a.title} className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F5E642]/20 flex items-center justify-center">{a.icon}</div>
            <div>
              <p className="font-semibold text-sm text-gray-900 mb-1">{a.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
            </div>
            <a href={a.href}
              className="mt-auto flex items-center gap-1 text-xs font-semibold text-[#0A1628] hover:text-[#1B4FD8] transition-colors">
              {a.cta} <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CommissionLedger() {
  const [disputeTarget, setDisputeTarget] = useState<number | null>(null);
  const [disputeReason, setDisputeReason] = useState("");
  const { data: user } = trpc.auth.me.useQuery();
  const { data: earned, isLoading: loadingEarned, refetch } = trpc.partners.getEarnedCommissions.useQuery();
  const { data: paid, isLoading: loadingPaid } = trpc.partners.getPaidCommissions.useQuery();

  const openDispute = trpc.partners.openDispute.useMutation({
    onSuccess: () => {
      refetch();
      setDisputeTarget(null);
      setDisputeReason("");
      toast.success("Dispute submitted — our team will review within 2 business days");
    },
    onError: (e) => toast.error(e.message),
  });

  const allCommissions = [...(earned ?? []).map((c) => ({ ...c, _type: "earned" as const }))];

  const totalEarned = allCommissions.reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const totalPaid = (paid ?? []).reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const totalPending = totalEarned - totalPaid;

  const isLoading = loadingEarned || loadingPaid;

  if (isLoading) return <PartnerLayout><PageLoadingSkeleton /></PartnerLayout>;

  const hasCommissions = allCommissions.length > 0;

  return (
    <PartnerLayout>
      <div className="space-y-8 pb-12">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Commission Ledger</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {user ? `${user.name ?? "Partner"}'s` : "Your"} full commission history and income breakdown
            </p>
          </div>
          <button
            onClick={() => {
              if (!hasCommissions) { toast.error("No commissions to export"); return; }
              downloadCSV(allCommissions, `prolnk-commissions-${new Date().toISOString().slice(0, 10)}.csv`);
              toast.success(`Exported ${allCommissions.length} commission records`);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Summary cards */}
        {(() => {
          const now = new Date();
          const day = now.getDate();
          const nextPayoutDate = day < 15
            ? new Date(now.getFullYear(), now.getMonth(), 15)
            : new Date(now.getFullYear(), now.getMonth() + 1, 1);
          const daysUntil = Math.ceil((nextPayoutDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          const nextPayoutLabel = nextPayoutDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0A1628] rounded-xl p-4 text-white sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-[#F5E642]" />
                  <span className="text-xs font-medium text-blue-300">Pending Balance</span>
                </div>
                <p className="text-3xl font-black text-[#F5E642]">${totalPending.toFixed(2)}</p>
                <p className="text-xs text-blue-400 mt-1">awaiting next payout cycle</p>
              </div>
              <div className="bg-[#F5E642]/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#0A1628]" />
                  <span className="text-xs font-medium text-gray-600">Lifetime Earned</span>
                </div>
                <p className="text-2xl font-bold text-[#0A1628]">${totalEarned.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">all time</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-gray-600">Total Paid Out</span>
                </div>
                <p className="text-2xl font-bold text-green-700">${totalPaid.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">received to date</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarClock className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-600">Next Payout</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">{nextPayoutLabel}</p>
                <p className="text-xs text-gray-500 mt-1">in {daysUntil} day{daysUntil !== 1 ? "s" : ""}</p>
              </div>
            </div>
          );
        })()}

        {/* Ledger table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">Transaction History</p>
            <span className="text-xs text-gray-400">Date | Type | From | Amount | Status</span>
          </div>

          {!hasCommissions ? (
            <div className="py-16 text-center px-6">
              <div className="w-16 h-16 rounded-2xl bg-[#0A1628]/5 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-[#0A1628]/20" />
              </div>
              <p className="text-gray-700 font-semibold mb-2">No commissions yet</p>
              <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                Once jobs close in your network, earnings will appear here. Your first commission could come from a referral, a job at a home you documented, or a subscription override.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <a href="/dashboard/referral" className="px-4 py-2 bg-[#0A1628] text-[#F5E642] text-sm font-semibold rounded-lg hover:bg-[#0d1e38] transition-colors">
                  Get Referral Link
                </a>
                <a href="/job/new" className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  Log a Job
                </a>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Date</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Description</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Type</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Job Value</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">Amount</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">Status</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">Dispute</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allCommissions.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-xs truncate">
                        {c.description ?? "Referral commission"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          c.commissionType === "referral_commission"
                            ? "bg-[#F5E642]/10 text-[#0A1628]"
                            : c.commissionType === "platform_fee"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-purple-50 text-purple-700"
                        }`}>
                          {c.commissionType.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {c.jobValue ? `$${Number(c.jobValue).toLocaleString()}` : "--"}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        +${Number(c.amount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {c.paid ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                            <CheckCircle className="w-3.5 h-3.5" /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-yellow-600 font-medium">
                            <Clock className="w-3.5 h-3.5" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {(c as any).disputeStatus === 'none' || !(c as any).disputeStatus ? (
                          <button
                            onClick={() => setDisputeTarget(c.id)}
                            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                            title="Flag this commission for review"
                          >
                            <Flag className="w-3.5 h-3.5" /> Flag
                          </button>
                        ) : (
                          <span className="text-xs text-orange-500 font-medium capitalize">
                            {String((c as any).disputeStatus).replace(/_/g, ' ')}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Cascade Breakdown */}
        <CascadeBreakdown commissions={allCommissions} />

        {/* Commission Explainer */}
        <CommissionExplainer />

        {/* Projected Calculator */}
        <ProjectedCalculator />

        {/* Earn Faster Section */}
        <EarnFasterSection />

        {/* Payout info */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm font-medium text-blue-800 mb-1">Payout Schedule</p>
          <p className="text-xs text-blue-600">
            Commissions are processed on the 1st and 15th of each month. Pending commissions are paid once the referred job is marked closed and verified by ProLnk. Questions? Contact support@prolnk.com.
          </p>
        </div>

      </div>

      {/* Dispute Dialog */}
      <Dialog open={disputeTarget !== null} onOpenChange={(o) => { if (!o) { setDisputeTarget(null); setDisputeReason(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Flag Commission for Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">Describe why you believe this commission is incorrect. Our team will review within 2 business days.</p>
            <Textarea
              placeholder="Explain the issue (min 20 characters)..."
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDisputeTarget(null); setDisputeReason(""); }}>Cancel</Button>
            <Button
              disabled={disputeReason.length < 20 || openDispute.isPending}
              onClick={() => disputeTarget && openDispute.mutate({ commissionId: disputeTarget, reason: disputeReason })}
            >
              {openDispute.isPending ? "Submitting..." : "Submit Dispute"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PartnerLayout>
  );
}
