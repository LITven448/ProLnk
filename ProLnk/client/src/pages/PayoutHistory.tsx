/**
 * PayoutHistory — REV-05
 * Partner payout history: timeline of commissions with pending/paid/method badges.
 * Includes Request Payout dialog and payout request history.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  CheckCircle, Clock, DollarSign, Download,
  TrendingUp, ArrowRight, Building2, CreditCard, Send, XCircle, AlertCircle
} from "lucide-react";

const STATUS_CONFIG = {
  paid: {
    label: "Paid",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-500",
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    iconColor: "text-yellow-500",
  },
};

const REQUEST_STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  pending:  { label: "Under Review", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  approved: { label: "Approved",     color: "bg-blue-100 text-blue-800 border-blue-200",       icon: CheckCircle },
  paid:     { label: "Paid",         color: "bg-green-100 text-green-800 border-green-200",    icon: CheckCircle },
  rejected: { label: "Rejected",     color: "bg-red-100 text-red-800 border-red-200",          icon: XCircle },
};

function formatCurrency(amount: string | number) {
  return `$${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(ts: string | Date | null | undefined) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function PayoutHistory() {
  const [filter, setFilter] = useState<"all" | "paid" | "pending">("all");
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestAmount, setRequestAmount] = useState("");
  const [requestNote, setRequestNote] = useState("");

  const utils = trpc.useUtils();
  const { data: commissions = [], isLoading } = trpc.partners.getPaidCommissions.useQuery();
  const { data: connectStatus } = trpc.stripe.getConnectStatus.useQuery();
  const { data: payoutRequests = [] } = trpc.payments.getMyPayoutRequests.useQuery();

  const requestPayoutMutation = trpc.payments.requestPayout.useMutation({
    onSuccess: () => {
      toast.success("Payout request submitted! You'll be notified once it's reviewed.");
      setShowRequestDialog(false);
      setRequestAmount("");
      setRequestNote("");
      utils.payments.getMyPayoutRequests.invalidate();
    },
    onError: (err: any) => toast.error(err.message),
  });

  const filtered = (commissions as any[]).filter((c) => {
    if (filter === "paid") return c.paid;
    if (filter === "pending") return !c.paid;
    return true;
  });

  const totalPaid = (commissions as any[]).filter((c) => c.paid).reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const totalPending = (commissions as any[]).filter((c) => !c.paid).reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const isConnected = connectStatus?.status === "active";
  const hasPendingRequest = (payoutRequests as any[]).some((r: any) => r.status === "pending");

  const handleExport = () => {
    const rows = [
      ["Date", "Job / Opportunity", "Amount", "Status", "Paid At"],
      ...(commissions as any[]).map((c) => [
        formatDate(c.createdAt),
        c.opportunityType ?? "Commission",
        formatCurrency(c.amount ?? 0),
        c.paid ? "Paid" : "Pending",
        c.paidAt ? formatDate(c.paidAt) : "—",
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payout-history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRequestPayout = () => {
    const amount = parseFloat(requestAmount);
    if (!amount || amount <= 0) { toast.error("Enter a valid amount"); return; }
    if (amount > totalPending) { toast.error(`Amount exceeds your available balance of ${formatCurrency(totalPending)}`); return; }
    requestPayoutMutation.mutate({ requestedAmount: amount, note: requestNote || undefined });
  };

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900">Payout History</h1>
            <p className="text-gray-500 text-sm mt-1">Track all your commission payouts in one place.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="gap-2 border-gray-200 text-gray-600 hover:text-gray-900"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </Button>
            {totalPending > 0 && isConnected && !hasPendingRequest && (
              <Button
                size="sm"
                onClick={() => setShowRequestDialog(true)}
                className="gap-2 bg-[#0A1628] hover:bg-[#1a2d4a] text-white"
              >
                <Send className="w-3.5 h-3.5" /> Request Payout
              </Button>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Total Paid</span>
            </div>
            <div className="text-2xl font-heading font-bold text-gray-900">{formatCurrency(totalPaid)}</div>
            <p className="text-xs text-gray-400 mt-0.5">
              {(commissions as any[]).filter((c) => c.paid).length} payouts completed
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Available Balance</span>
            </div>
            <div className="text-2xl font-heading font-bold text-gray-900">{formatCurrency(totalPending)}</div>
            <p className="text-xs text-gray-400 mt-0.5">
              {(commissions as any[]).filter((c) => !c.paid).length} commissions pending
            </p>
          </div>
        </div>

        {/* Pending request notice */}
        {hasPendingRequest && (
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-800">Payout request under review</p>
              <p className="text-xs text-blue-700 mt-0.5">Your payout request is being reviewed. You'll receive an email once it's processed.</p>
            </div>
          </div>
        )}

        {/* Payout method notice */}
        {!isConnected && (
          <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4 flex items-start gap-3">
            <Building2 className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-yellow-800">Bank account not connected</p>
              <p className="text-xs text-yellow-700 mt-0.5">
                Connect your bank account to receive automatic payouts when commissions are marked paid.
              </p>
            </div>
            <a href="/dashboard/payout-setup" className="flex-shrink-0">
              <Button size="sm" className="bg-yellow-700 hover:bg-yellow-800 text-white text-xs gap-1">
                Setup <ArrowRight className="w-3 h-3" />
              </Button>
            </a>
          </div>
        )}

        {/* Payout Requests History */}
        {(payoutRequests as any[]).length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Payout Requests</h2>
            <div className="space-y-2">
              {(payoutRequests as any[]).map((req: any) => {
                const cfg = REQUEST_STATUS_CONFIG[req.status] ?? REQUEST_STATUS_CONFIG.pending;
                const Icon = cfg.icon;
                return (
                  <div key={req.id} className="rounded-xl border border-gray-100 bg-white p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-50">
                        <Icon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Payout Request — {formatCurrency(req.requestedAmount)}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Submitted {formatDate(req.createdAt)}</p>
                        {req.adminNote && <p className="text-xs text-gray-500 mt-0.5 italic">"{req.adminNote}"</p>}
                      </div>
                    </div>
                    <Badge className={`text-[10px] border flex-shrink-0 ${cfg.color}`}>{cfg.label}</Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Commission Ledger</h2>
          <div className="flex gap-2 mb-4">
            {(["all", "paid", "pending"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filter === f
                    ? "bg-[#0A1628] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Timeline */}
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white p-4 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
              <DollarSign className="w-8 h-8 text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-500">No {filter !== "all" ? filter : ""} payouts yet</p>
              <p className="text-xs text-gray-400 mt-1">
                {filter === "pending"
                  ? "All commissions have been paid out."
                  : "Log jobs and generate referrals to start earning commissions."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((c: any) => {
                const statusKey = c.paid ? "paid" : "pending";
                const cfg = STATUS_CONFIG[statusKey];
                const StatusIcon = cfg.icon;
                return (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl mt-0.5 ${c.paid ? "bg-green-50" : "bg-yellow-50"}`}>
                          <StatusIcon className={`w-4 h-4 ${cfg.iconColor}`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {c.opportunityType
                              ? c.opportunityType.replace(/_/g, " ").replace(/\b\w/g, (ch: string) => ch.toUpperCase())
                              : "Commission"}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Earned {formatDate(c.createdAt)}
                            {c.paidAt ? ` · Paid ${formatDate(c.paidAt)}` : ""}
                          </p>
                          {c.partnerName && (
                            <p className="text-xs text-gray-400 mt-0.5">From: {c.partnerName}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-base font-bold text-gray-900 font-heading">
                          {formatCurrency(c.amount ?? 0)}
                        </p>
                        <Badge className={`text-[10px] border mt-1 ${cfg.color}`}>{cfg.label}</Badge>
                      </div>
                    </div>
                    {isConnected && c.paid && (
                      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1.5 text-xs text-gray-400">
                        <CreditCard className="w-3 h-3" />
                        <span>Transferred via Stripe Connect</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Lifetime earnings footer */}
        {(commissions as any[]).length > 0 && (
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 font-medium">Lifetime earnings</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {formatCurrency(totalPaid + totalPending)}
            </span>
          </div>
        )}
      </div>

      {/* Request Payout Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Payout</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Available balance</p>
              <p className="text-xl font-bold text-gray-900 font-heading">{formatCurrency(totalPending)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Amount to request</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  min="1"
                  max={totalPending}
                  step="0.01"
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(e.target.value)}
                  placeholder={totalPending.toFixed(2)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20"
                />
              </div>
              <button
                onClick={() => setRequestAmount(totalPending.toFixed(2))}
                className="text-xs text-[#0A1628] underline mt-1"
              >
                Request full balance
              </button>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Note (optional)</label>
              <Textarea
                value={requestNote}
                onChange={(e) => setRequestNote(e.target.value)}
                placeholder="Any notes for the admin..."
                rows={2}
                className="text-sm"
              />
            </div>
            <p className="text-xs text-gray-400">
              Payout requests are reviewed within 1–2 business days. You'll receive an email confirmation once processed.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestDialog(false)}>Cancel</Button>
            <Button
              onClick={handleRequestPayout}
              disabled={requestPayoutMutation.isPending || !requestAmount}
              className="bg-[#0A1628] hover:bg-[#1a2d4a] text-white gap-2"
            >
              {requestPayoutMutation.isPending ? "Submitting..." : <><Send className="w-3.5 h-3.5" /> Submit Request</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PartnerLayout>
  );
}
