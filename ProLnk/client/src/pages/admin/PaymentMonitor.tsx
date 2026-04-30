import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, RefreshCw, Activity, Zap, Building2, User, Shield } from "lucide-react";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, string> = {
  paid_out: "bg-green-100 text-green-700",
  balance_charged: "bg-emerald-100 text-emerald-700",
  deposit_charged: "bg-blue-100 text-blue-700",
  ach_pulled: "bg-violet-100 text-violet-700",
  ach_authorized: "bg-indigo-100 text-indigo-700",
  pending: "bg-amber-100 text-amber-700",
  disputed: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-gray-100 text-gray-600",
  voided: "bg-gray-100 text-gray-400",
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

  const realStats = overview?.stats ?? {};
  const payments = overview?.payments ?? [];
  const adminTriggerPayout = trpc.payments.adminTriggerPayout.useMutation({
    onSuccess: () => { toast.success("Payout triggered"); refetch(); },
    onError: (e: any) => toast.error(e.message),
  });
  const stats = [
    { label: "Total Volume", value: `$${Number(realStats.totalJobVolume ?? 0).toLocaleString()}`, icon: DollarSign, color: "text-green-600", sub: `${realStats.totalPayments ?? 0} jobs` },
    { label: "Pending", value: `${realStats.pendingCount ?? 0}`, icon: Clock, color: "text-amber-500", sub: "awaiting trigger" },
    { label: "Commissions", value: `$${Number(realStats.totalCommissionsCollected ?? 0).toLocaleString()}`, icon: TrendingUp, color: "text-indigo-600", sub: `$${Number(realStats.totalPaidOut ?? 0).toLocaleString()} paid out` },
    { label: "Insurance Jobs", value: `${realStats.insuranceJobCount ?? 0}`, icon: Shield, color: "text-violet-600", sub: `$${Number(realStats.insuranceCommissions ?? 0).toLocaleString()} ACH` },
  ];

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Real-Time Payment Monitor</h1>
            <p className="text-muted-foreground text-sm mt-1">Live Stripe event stream and payment health</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${autoRefresh ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
              <Activity className="w-3 h-3" />
              {autoRefresh ? "Live" : "Paused"}
            </div>
            <Button size="sm" variant="outline" onClick={() => setAutoRefresh(a => !a)}>
              {autoRefresh ? "Pause" : "Resume"}
            </Button>
            <Button size="sm" variant="outline" onClick={() => { refetch(); toast.success("Refreshed"); }}>
              <RefreshCw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat: any) => (
            <Card key={stat.label}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold">{isLoading ? "..." : stat.value}</div>
                {stat.sub && <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Real Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> All Job Payments
              <Badge className="text-xs bg-green-100 text-green-700 ml-auto">Auto-refreshing every 30s</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              </div>
            ) : payments.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-8 h-8 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No payments yet</p>
                <p className="text-xs text-gray-400 mt-1">Payments appear here once homeowners save cards and jobs begin</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Job</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Partners</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Job Value</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Platform Fee</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Created</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {(payments as any[]).map((p: any) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-medium text-gray-900 text-xs">{p.homeownerName || "—"}</div>
                          <div className="text-xs text-gray-400">{p.issueType || p.issueCategory || "—"}</div>
                          {p.isInsuranceJob ? <Badge className="bg-violet-100 text-violet-700 text-[10px] mt-0.5">Insurance</Badge> : null}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Building2 className="w-2.5 h-2.5 text-gray-400" />
                            {p.receivingPartnerName || "—"}
                          </div>
                          {p.referringPartnerName && (
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                              <User className="w-2.5 h-2.5" />
                              via {p.referringPartnerName}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right font-semibold text-gray-900 text-xs">
                          ${Number(p.totalJobValue ?? 0).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right text-xs">
                          <div className="text-gray-900 font-medium">${Number(p.platformFeeAmount ?? 0).toLocaleString()}</div>
                          <div className="text-gray-400">{Number(p.platformFeeRate ?? 0) * 100}%</div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <Badge className={`text-[10px] ${STATUS_COLORS[p.status] ?? "bg-gray-100 text-gray-600"}`}>
                            {p.status?.replace(/_/g, " ")}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-xs text-gray-400">{fmtDate(p.createdAt)}</td>
                        <td className="py-3 px-3 text-center">
                          {(p.status === "balance_charged" || p.status === "ach_pulled") && (
                            <button
                              className="text-xs border border-gray-200 rounded px-2 py-1 hover:bg-gray-50"
                              onClick={() => adminTriggerPayout.mutate({ jobPaymentId: p.id })}
                              disabled={adminTriggerPayout.isPending}
                            >
                              <Zap className="w-2.5 h-2.5 inline mr-1" />Payout
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
