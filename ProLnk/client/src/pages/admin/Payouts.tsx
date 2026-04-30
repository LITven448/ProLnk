/**
 * Wave 48 — Admin Payout Queue
 * Bulk select + bulk approve, partner filter, export CSV, Stripe status badges
 */
import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  DollarSign, CreditCard, Clock, CheckCircle2, AlertCircle,
  Search, RefreshCw, Zap, TrendingUp, Users, ArrowUpRight,
  Download, Filter, ChevronDown, ChevronUp, Loader2, Inbox, XCircle, Send,
} from "lucide-react";

function formatCurrency(val: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);
}

function PayoutMethodBadge({ status }: { status: string }) {
  if (status === "active") return (
    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs gap-1">
      <Zap className="w-3 h-3" /> Stripe Ready
    </Badge>
  );
  if (status === "pending") return (
    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs gap-1">
      <Clock className="w-3 h-3" /> Stripe Pending
    </Badge>
  );
  return (
    <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 text-xs">
      Paper Check
    </Badge>
  );
}

type Commission = {
  id: number;
  receivingPartnerName: string | null;
  receivingPartnerEmail: string | null;
  receivingPartnerStripeStatus: string | null;
  payingPartnerName: string | null;
  payingPartnerEmail: string | null;
  commissionType: string | null;
  description: string | null;
  amount: string | null;
  createdAt: Date | null;
};

export default function Payouts() {
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [methodFilter, setMethodFilter] = useState<"all" | "stripe" | "check">("all");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [reviewingRequest, setReviewingRequest] = useState<any | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [requestStatusFilter, setRequestStatusFilter] = useState<"pending" | "all">("pending");

  const utils = trpc.useUtils();
  const { data: payoutRequests = [], refetch: refetchRequests } = trpc.payments.adminGetPayoutRequests.useQuery({ status: requestStatusFilter });

  const reviewMutation = trpc.payments.adminReviewPayoutRequest.useMutation({
    onSuccess: (result) => {
      toast.success(result.action === "approved" ? `Payout of $${result.amountPaid?.toFixed(2)} sent via Stripe!` : "Request rejected.");
      setReviewingRequest(null);
      setAdminNote("");
      refetchRequests();
    },
    onError: (err: any) => toast.error(err.message),
  });

  const { data: stats, refetch: refetchStats } = trpc.stripe.getPayoutStats.useQuery();
  const { data: queue, refetch: refetchQueue, isLoading } = trpc.stripe.getPayoutQueue.useQuery();

  const processPayout = trpc.stripe.processPayout.useMutation({
    onSuccess: (result) => {
      if (result.method === "stripe_transfer") {
        toast.success(`Payout Sent via Stripe — Transfer ID: ${result.transferId}`);
      } else {
        toast.success("Marked as Paid — issue paper check manually.");
      }
      refetchQueue();
      refetchStats();
      setProcessingId(null);
    },
    onError: (err) => {
      toast.error(`Payout Failed: ${err.message}`);
      setProcessingId(null);
    },
  });

  const handlePay = (commissionId: number) => {
    setProcessingId(commissionId);
    processPayout.mutate({ commissionId });
  };

  const filtered = useMemo(() => {
    let list = (queue ?? []) as Commission[];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.receivingPartnerName?.toLowerCase().includes(q) ||
        c.payingPartnerName?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      );
    }
    if (methodFilter === "stripe") {
      list = list.filter(c => c.receivingPartnerStripeStatus === "active");
    } else if (methodFilter === "check") {
      list = list.filter(c => c.receivingPartnerStripeStatus !== "active");
    }
    list = [...list].sort((a, b) => {
      const aAmt = parseFloat(a.amount ?? "0");
      const bAmt = parseFloat(b.amount ?? "0");
      return sortDir === "desc" ? bAmt - aAmt : aAmt - bAmt;
    });
    return list;
  }, [queue, search, methodFilter, sortDir]);

  const selectedTotal = useMemo(() => {
    return (queue ?? [])
      .filter((c: Commission) => selected.has(c.id))
      .reduce((sum: number, c: Commission) => sum + parseFloat(c.amount ?? "0"), 0);
  }, [queue, selected]);

  const allSelected = filtered.length > 0 && filtered.every(c => selected.has(c.id));

  const toggleAll = () => {
    if (allSelected) {
      const next = new Set(selected);
      filtered.forEach(c => next.delete(c.id));
      setSelected(next);
    } else {
      const next = new Set(selected);
      filtered.forEach(c => next.add(c.id));
      setSelected(next);
    }
  };

  const toggleOne = (id: number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleBulkPay = async () => {
    if (selected.size === 0) return;
    setBulkProcessing(true);
    const ids = Array.from(selected);
    let successCount = 0;
    let failCount = 0;
    for (const id of ids) {
      try {
        await processPayout.mutateAsync({ commissionId: id });
        successCount++;
      } catch {
        failCount++;
      }
    }
    setBulkProcessing(false);
    setSelected(new Set());
    if (successCount > 0) toast.success(`${successCount} payout${successCount !== 1 ? "s" : ""} processed successfully.`);
    if (failCount > 0) toast.error(`${failCount} payout${failCount !== 1 ? "s" : ""} failed.`);
    refetchQueue();
    refetchStats();
  };

  const exportCSV = () => {
    const rows = [
      ["ID", "Receiving Partner", "Email", "Paying Partner", "Type", "Description", "Amount", "Method"],
      ...filtered.map(c => [
        c.id,
        c.receivingPartnerName ?? "",
        c.receivingPartnerEmail ?? "",
        c.payingPartnerName ?? "",
        c.commissionType ?? "",
        c.description ?? "",
        parseFloat(c.amount ?? "0").toFixed(2),
        c.receivingPartnerStripeStatus === "active" ? "Stripe" : "Paper Check",
      ]),
    ];
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payout-queue-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout title="Payout Center" subtitle="Process partner commission payouts via Stripe or paper check">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Payout Center</h1>
            <p className="text-slate-500 text-sm mt-1">Process partner commission payouts via Stripe or paper check</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV} className="border-slate-300 text-slate-600 hover:bg-slate-50 gap-1">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => { refetchQueue(); refetchStats(); }} className="border-slate-300 text-slate-600 hover:bg-slate-50 gap-1">
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Paid Out",     value: formatCurrency(stats?.totalPaid ?? 0),   icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Pending Payouts",    value: formatCurrency(stats?.totalPending ?? 0), icon: Clock,        color: "text-amber-600",   bg: "bg-amber-50" },
            { label: "Pending Count",      value: stats?.pendingCount ?? 0,                 icon: DollarSign,   color: "text-blue-600",    bg: "bg-blue-50" },
            { label: "Stripe Connected",   value: stats?.connectedPartnerCount ?? 0,        icon: Users,        color: "text-teal-600",    bg: "bg-teal-50" },
          ].map((s) => (
            <Card key={s.label} className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${s.bg}`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-500/20 text-blue-700 border-blue-300">
                {selected.size} selected
              </Badge>
              <span className="text-blue-700 font-semibold text-sm">
                Total: {formatCurrency(selectedTotal)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelected(new Set())}
                className="border-blue-300 text-blue-600 hover:bg-blue-100"
              >
                Clear
              </Button>
              <Button
                size="sm"
                disabled={bulkProcessing}
                onClick={handleBulkPay}
                className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1"
              >
                {bulkProcessing ? (
                  <><Loader2 className="w-3 h-3 animate-spin" /> Processing...</>
                ) : (
                  <><ArrowUpRight className="w-3 h-3" /> Pay All Selected</>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Queue */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-gray-800 text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-500" />
                Pending Commission Queue
                {filtered.length > 0 && (
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200 ml-2">
                    {filtered.length} pending
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                {/* Method filter */}
                <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs">
                  {(["all", "stripe", "check"] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setMethodFilter(f)}
                      className={`px-3 py-1.5 capitalize transition-colors ${methodFilter === f ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-gray-50"}`}
                    >
                      {f === "all" ? "All" : f === "stripe" ? "Stripe" : "Paper Check"}
                    </button>
                  ))}
                </div>
                {/* Search */}
                <div className="relative w-52">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search partner..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 border-gray-200 text-gray-800 placeholder:text-slate-400 text-sm h-8"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <p className="text-gray-700 font-medium">All caught up!</p>
                <p className="text-slate-500 text-sm">No pending commissions to pay out.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 px-2 w-8">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={toggleAll}
                          aria-label="Select all"
                        />
                      </th>
                      <th className="text-left py-3 px-2 text-slate-500 font-medium">Receiving Partner</th>
                      <th className="text-left py-3 px-2 text-slate-500 font-medium">Paying Partner</th>
                      <th className="text-left py-3 px-2 text-slate-500 font-medium">Type</th>
                      <th className="text-left py-3 px-2 text-slate-500 font-medium">Description</th>
                      <th
                        className="text-right py-3 px-2 text-slate-500 font-medium cursor-pointer select-none"
                        onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
                      >
                        <span className="flex items-center justify-end gap-1">
                          Amount
                          {sortDir === "desc" ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                        </span>
                      </th>
                      <th className="text-left py-3 px-2 text-slate-500 font-medium">Method</th>
                      <th className="text-right py-3 px-2 text-slate-500 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => (
                      <tr key={c.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${selected.has(c.id) ? "bg-blue-50/60" : ""}`}>
                        <td className="py-3 px-2">
                          <Checkbox
                            checked={selected.has(c.id)}
                            onCheckedChange={() => toggleOne(c.id)}
                            aria-label={`Select commission ${c.id}`}
                          />
                        </td>
                        <td className="py-3 px-2">
                          <div className="font-medium text-gray-800">{c.receivingPartnerName ?? "ProLnk Platform"}</div>
                          {c.receivingPartnerEmail && (
                            <div className="text-xs text-slate-400">{c.receivingPartnerEmail}</div>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-gray-700">{c.payingPartnerName ?? "—"}</div>
                          {c.payingPartnerEmail && (
                            <div className="text-xs text-slate-400">{c.payingPartnerEmail}</div>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs capitalize">
                            {(c.commissionType ?? "").replace(/_/g, " ")}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-slate-600 max-w-[180px] truncate">
                          {c.description ?? "Commission payout"}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <span className="text-emerald-600 font-bold text-base">
                            {formatCurrency(parseFloat(c.amount ?? "0"))}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <PayoutMethodBadge status={c.receivingPartnerStripeStatus ?? "not_connected"} />
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Button
                            size="sm"
                            disabled={processingId === c.id || bulkProcessing}
                            onClick={() => handlePay(c.id)}
                            className="bg-teal-600 hover:bg-teal-500 text-white text-xs h-7 px-3 gap-1"
                          >
                            {processingId === c.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <><ArrowUpRight className="w-3 h-3" /> Pay</>
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info callout */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="text-sm text-blue-700">
              <strong>Stripe Connect:</strong> Partners with an active Stripe account receive instant transfers.
              Partners without Stripe will be marked paid internally — issue a paper check manually.
              To activate Stripe, partners must complete onboarding via their Partner Portal → Settings.
              Use <strong>Select All + Pay All Selected</strong> to process the full queue in one click.
            </div>
          </CardContent>
        </Card>

        {/* Partner Payout Requests */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-gray-800 text-lg flex items-center gap-2">
                <Inbox className="w-5 h-5 text-purple-500" />
                Partner Payout Requests
                {(payoutRequests as any[]).filter((r: any) => r.status === 'pending').length > 0 && (
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 ml-2">
                    {(payoutRequests as any[]).filter((r: any) => r.status === 'pending').length} pending
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRequestStatusFilter("pending")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    requestStatusFilter === "pending" ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setRequestStatusFilter("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    requestStatusFilter === "all" ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {(payoutRequests as any[]).length === 0 ? (
              <div className="text-center py-10">
                <Inbox className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No {requestStatusFilter === 'pending' ? 'pending ' : ''}payout requests</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(payoutRequests as any[]).map((req: any) => (
                  <div key={req.id} className="rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-50">
                        <DollarSign className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{req.businessName}</p>
                        <p className="text-xs text-gray-500">{req.contactEmail}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Requested {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(req.requestedAmount))}
                          {' · '}{new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        {req.note && <p className="text-xs text-gray-500 italic mt-0.5">"{req.note}"</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {req.status === 'pending' ? (
                        <>
                          <Badge className={`text-[10px] border ${
                            req.stripeConnectStatus === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {req.stripeConnectStatus === 'active' ? 'Stripe Ready' : 'No Stripe'}
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => { setReviewingRequest(req); setAdminNote(""); }}
                            className="bg-[#0A1628] hover:bg-[#1a2d4a] text-white text-xs h-7 px-3 gap-1"
                          >
                            <Send className="w-3 h-3" /> Review
                          </Button>
                        </>
                      ) : (
                        <Badge className={`text-[10px] border ${
                          req.status === 'paid' ? 'bg-green-50 text-green-700 border-green-200' :
                          req.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}>
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Review Payout Request Dialog */}
      <Dialog open={!!reviewingRequest} onOpenChange={(open) => { if (!open) setReviewingRequest(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Review Payout Request</DialogTitle>
          </DialogHeader>
          {reviewingRequest && (
            <div className="space-y-4 py-2">
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 space-y-1">
                <p className="text-xs text-gray-500">Partner</p>
                <p className="text-sm font-semibold text-gray-900">{reviewingRequest.businessName}</p>
                <p className="text-xs text-gray-500">Requested Amount</p>
                <p className="text-xl font-bold text-gray-900">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(reviewingRequest.requestedAmount))}
                </p>
                {reviewingRequest.note && (
                  <>
                    <p className="text-xs text-gray-500">Partner Note</p>
                    <p className="text-xs text-gray-700 italic">"{reviewingRequest.note}"</p>
                  </>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Stripe: {reviewingRequest.stripeConnectStatus === 'active' ? '✅ Active — will transfer automatically' : '❌ Not connected — cannot process'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Admin Note (optional)</label>
                <Textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Reason for approval or rejection..."
                  rows={2}
                  className="text-sm"
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => reviewMutation.mutate({ requestId: reviewingRequest.id, action: 'rejected', adminNote: adminNote || undefined })}
              disabled={reviewMutation.isPending}
              className="border-red-200 text-red-600 hover:bg-red-50 gap-1"
            >
              <XCircle className="w-3.5 h-3.5" /> Reject
            </Button>
            <Button
              onClick={() => reviewMutation.mutate({ requestId: reviewingRequest.id, action: 'approved', adminNote: adminNote || undefined })}
              disabled={reviewMutation.isPending || reviewingRequest?.stripeConnectStatus !== 'active'}
              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1"
            >
              {reviewMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><ArrowUpRight className="w-3.5 h-3.5" /> Approve &amp; Pay</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
