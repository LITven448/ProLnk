import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, RefreshCw,
  Activity, Zap, Building2, User, Shield, AlertTriangle, XCircle,
  RotateCcw, ChevronRight, ArrowUpRight, Calendar, CreditCard
} from "lucide-react";
import { toast } from "sonner";

const FAILED_PAYMENTS = [
  { id: "pay_001", partner: "Sunrise Plumbing Co.", amount: 1480, reason: "Insufficient funds", attempts: 2, lastAttempt: "May 13, 2:14pm", canRetry: true },
  { id: "pay_002", partner: "Metro Electrical", amount: 620, reason: "Card declined", attempts: 1, lastAttempt: "May 12, 9:00am", canRetry: true },
  { id: "pay_003", partner: "Valley HVAC Services", amount: 3200, reason: "Bank account closed", attempts: 3, lastAttempt: "May 11, 11:30am", canRetry: false },
];

const DISPUTES = [
  { id: "dis_001", partner: "TopRoof Inc.", homeowner: "James Wilson", amount: 2400, reason: "Service not rendered", opened: "May 10", status: "open", dueDate: "May 25" },
  { id: "dis_002", partner: "GreenLawn Pro", homeowner: "Maria Santos", amount: 380, reason: "Quality dispute", opened: "May 8", status: "evidence_submitted", dueDate: "May 23" },
];

const PAYOUT_SCHEDULE = [
  { period: "May 16 (Thu)", type: "Weekly ACH", count: 12, total: 8420, status: "scheduled" },
  { period: "May 19 (Sun)", type: "Weekly Wire", count: 3, total: 14200, status: "scheduled" },
  { period: "May 23 (Thu)", type: "Weekly ACH", count: 9, total: 6140, status: "pending" },
  { period: "May 31 (Fri)", type: "Monthly Bonus", count: 28, total: 22800, status: "pending" },
];

const STATUS_STYLES: Record<string, string> = {
  paid_out: "bg-emerald-500/20 text-emerald-400",
  balance_charged: "bg-teal-500/20 text-teal-400",
  deposit_charged: "bg-blue-500/20 text-blue-400",
  ach_pulled: "bg-violet-500/20 text-violet-400",
  ach_authorized: "bg-indigo-500/20 text-indigo-400",
  pending: "bg-amber-500/20 text-amber-400",
  disputed: "bg-red-500/20 text-red-400",
  failed: "bg-red-500/20 text-red-400",
  refunded: "bg-slate-500/20 text-slate-400",
  voided: "bg-slate-500/20 text-slate-500",
};

function fmtDate(ts: string | null) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function PaymentMonitor() {
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { data: overview, isLoading, refetch } = trpc.payments.adminGetPaymentOverview.useQuery(undefined, {
    refetchInterval: autoRefresh ? 30000 : false,
  });

  const adminTriggerPayout = trpc.payments.adminTriggerPayout.useMutation({
    onSuccess: () => { toast.success("Payout triggered successfully"); refetch(); },
    onError: (e: any) => toast.error(e.message),
  });

  const triggerPayouts = trpc.stripeConnect.triggerPayouts.useMutation({
    onSuccess: (r: any) => {
      if (r?.enabled === false) {
        toast.info(`Payouts disabled${r.reason ? `: ${r.reason}` : ""}`);
      } else {
        toast.success(`Payout run complete — ${r?.paid ?? 0} paid, ${r?.skipped ?? 0} skipped, ${r?.errors ?? 0} errors`);
      }
      refetch();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const realStats = overview?.stats ?? {};
  const payments = overview?.payments ?? [];

  const kpis = [
    { label: "Total Volume", value: `$${Number(realStats.totalJobVolume ?? 0).toLocaleString()}`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", sub: `${realStats.totalPayments ?? 0} transactions` },
    { label: "Pending", value: realStats.pendingCount ?? 0, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", sub: "awaiting trigger" },
    { label: "Commissions Out", value: `$${Number(realStats.totalCommissionsCollected ?? 0).toLocaleString()}`, icon: TrendingUp, color: "text-teal-400", bg: "bg-teal-500/10", sub: `$${Number(realStats.totalPaidOut ?? 0).toLocaleString()} paid out` },
    { label: "Failed / Disputed", value: `${FAILED_PAYMENTS.length + DISPUTES.length}`, icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10", sub: "needs attention" },
  ];

  return (
    <AdminLayout title="Payment Monitor" subtitle="Live Stripe event stream · Payment health · Payout scheduling">
      {/* Header controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${autoRefresh ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
            <Activity className="w-3 h-3" />
            {autoRefresh ? "Live (30s)" : "Paused"}
          </div>
          <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5" onClick={() => setAutoRefresh(a => !a)}>
            {autoRefresh ? "Pause" : "Resume"}
          </Button>
          <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5" onClick={() => { refetch(); toast.success("Refreshed"); }}>
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
        <Button
          className="gap-2 text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white"
          onClick={() => triggerPayouts.mutate()}
          disabled={triggerPayouts.isPending}
        >
          <Zap className="w-4 h-4" />
          {triggerPayouts.isPending ? "Running..." : "Trigger Manual Payout"}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {kpis.map(k => (
          <div key={k.label} className="rounded-xl border border-white/10 p-4 bg-[#0D1F3C]">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-1.5 rounded-lg ${k.bg}`}>
                <k.icon className={`w-4 h-4 ${k.color}`} />
              </div>
              <ArrowUpRight className="w-3 h-3 text-slate-600" />
            </div>
            <div className="text-xs text-slate-400 mb-1">{k.label}</div>
            <div className={`text-2xl font-bold ${k.color}`}>{isLoading ? "..." : k.value}</div>
            {k.sub && <div className="text-xs text-slate-500 mt-1">{k.sub}</div>}
          </div>
        ))}
      </div>

      {/* Failed Payments */}
      {FAILED_PAYMENTS.length > 0 && (
        <div className="rounded-xl border border-red-500/30 bg-[#0D1F3C] mb-4">
          <div className="flex items-center gap-3 p-4 border-b border-red-500/20">
            <XCircle className="w-4 h-4 text-red-400" />
            <h3 className="font-bold text-white text-sm">Failed Payments</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">{FAILED_PAYMENTS.length} failed</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 ml-auto">Sample data — retry not yet wired</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Partner", "Amount", "Failure Reason", "Attempts", "Last Try", "Action"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FAILED_PAYMENTS.map(p => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/2">
                    <td className="px-4 py-3 font-medium text-white">{p.partner}</td>
                    <td className="px-4 py-3 font-bold text-red-400">${p.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{p.reason}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.attempts >= 3 ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"}`}>{p.attempts}x</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">{p.lastAttempt}</td>
                    <td className="px-4 py-3">
                      {p.canRetry ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1.5 border-amber-600/40 text-amber-400 hover:bg-amber-600/10"
                          onClick={() => toast.info("Per-row retry is not yet wired — use Trigger Manual Payout to run the live disbursement batch")}
                        >
                          <RotateCcw className="w-3 h-3" /> Retry
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-500">Max attempts reached</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dispute Alerts */}
      {DISPUTES.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-[#0D1F3C] mb-4">
          <div className="flex items-center gap-3 p-4 border-b border-amber-500/20">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm">Active Disputes</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">{DISPUTES.length} open</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 ml-auto">Sample data</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Partner", "Homeowner", "Amount", "Reason", "Opened", "Due", "Status", "Action"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DISPUTES.map(d => (
                  <tr key={d.id} className="border-b border-white/5 hover:bg-white/2">
                    <td className="px-4 py-3 font-medium text-white">{d.partner}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{d.homeowner}</td>
                    <td className="px-4 py-3 font-bold text-amber-400">${d.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{d.reason}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{d.opened}</td>
                    <td className="px-4 py-3 text-xs text-red-400 font-medium">{d.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${d.status === "open" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                        {d.status === "open" ? "Open" : "Evidence Submitted"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="outline" className="h-7 text-xs border-white/10 text-slate-300 hover:text-white gap-1" onClick={() => toast.info("Opening dispute center...")}>
                        <Shield className="w-3 h-3" /> Defend
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payout Schedule */}
      <div className="rounded-xl border border-white/10 bg-[#0D1F3C] mb-4">
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Calendar className="w-4 h-4 text-teal-400" />
          <h3 className="font-bold text-white text-sm">Payout Schedule</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {PAYOUT_SCHEDULE.map((s, i) => (
            <div key={i} className="p-4 bg-[#0D1F3C] flex items-center justify-between">
              <div>
                <div className="font-medium text-white text-sm">{s.period}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.type} · {s.count} partners</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-teal-400 text-sm">${s.total.toLocaleString()}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${s.status === "scheduled" ? "bg-teal-500/20 text-teal-400" : "bg-slate-500/20 text-slate-400"}`}>
                  {s.status === "scheduled" ? "Scheduled" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl border border-white/10 bg-[#0D1F3C]">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-teal-400" />
            <h3 className="font-bold text-white text-sm">Recent Transactions</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">Live</span>
          </div>
          <span className="text-xs text-slate-500">Auto-refreshing every 30s</span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400" />
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-8 h-8 mx-auto text-slate-700 mb-3" />
            <p className="text-slate-400 font-medium text-sm">No transactions yet</p>
            <p className="text-xs text-slate-600 mt-1">Payments appear here once jobs begin flowing</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Job / Homeowner", "Partners", "Job Value", "Platform Fee", "Status", "Created", "Action"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(payments as any[]).map((p: any) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-white text-xs">{p.homeownerName || "—"}</div>
                      <div className="text-xs text-slate-400">{p.issueType || p.issueCategory || "—"}</div>
                      {p.isInsuranceJob && <span className="text-xs px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 mt-0.5 inline-block">Insurance</span>}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-xs text-slate-300">
                        <Building2 className="w-2.5 h-2.5 text-slate-500" />
                        {p.receivingPartnerName || "—"}
                      </div>
                      {p.referringPartnerName && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                          <User className="w-2.5 h-2.5" />
                          via {p.referringPartnerName}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-white text-xs">${Number(p.totalJobValue ?? 0).toLocaleString()}</td>
                    <td className="py-3 px-4 text-xs">
                      <div className="text-teal-400 font-medium">${Number(p.platformFeeAmount ?? 0).toLocaleString()}</div>
                      <div className="text-slate-500">{Number(p.platformFeeRate ?? 0) * 100}%</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[p.status] ?? "bg-slate-500/20 text-slate-400"}`}>
                        {p.status?.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-400">{fmtDate(p.createdAt)}</td>
                    <td className="py-3 px-4">
                      {(p.status === "balance_charged" || p.status === "ach_pulled") && (
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-teal-600 hover:bg-teal-700 text-white gap-1"
                          onClick={() => adminTriggerPayout.mutate({ jobPaymentId: p.id })}
                          disabled={adminTriggerPayout.isPending}
                        >
                          <Zap className="w-2.5 h-2.5" /> Payout
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
