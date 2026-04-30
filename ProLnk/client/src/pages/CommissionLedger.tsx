import PageLoadingSkeleton from "@/components/PageLoadingSkeleton";
import PartnerLayout from "@/components/PartnerLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { DollarSign, CheckCircle, Clock, TrendingUp, Download, Flag } from "lucide-react";
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

export default function CommissionLedger() {
  const [disputeTarget, setDisputeTarget] = useState<number | null>(null);
  const [disputeReason, setDisputeReason] = useState("");
  const { data: earned, isLoading: loadingEarned, refetch } = trpc.partners.getEarnedCommissions.useQuery();
  const { data: paid, isLoading: loadingPaid } = trpc.partners.getPaidCommissions.useQuery();

  const openDispute = trpc.partners.openDispute.useMutation({
    onSuccess: () => {
      refetch();
      setDisputeTarget(null);
      setDisputeReason("");
      toast.success("Dispute submitted -- our team will review within 2 business days");
    },
    onError: (e) => toast.error(e.message),
  });

  const allCommissions = [
    ...(earned ?? []).map((c) => ({ ...c, _type: "earned" as const })),
  ];

  const totalEarned = allCommissions.reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const totalPaid = (paid ?? []).reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const totalPending = totalEarned - totalPaid;

  const isLoading = loadingEarned || loadingPaid;

  if (isLoading) return <PartnerLayout><PageLoadingSkeleton /></PartnerLayout>;
  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Commission Ledger</h1>
            <p className="text-sm text-gray-500 mt-0.5">Full history of every commission earned through ProLnk</p>
          </div>
          <button
            onClick={() => {
              if (!allCommissions.length) {
                toast.error("No commissions to export");
                return;
              }
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
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Total Earned",
              value: `$${totalEarned.toFixed(2)}`,
              icon: <TrendingUp className="w-5 h-5 text-[#0A1628]" />,
              bg: "bg-[#F5E642]/10",
              text: "text-[#0A1628]",
            },
            {
              label: "Total Paid Out",
              value: `$${totalPaid.toFixed(2)}`,
              icon: <CheckCircle className="w-5 h-5 text-green-600" />,
              bg: "bg-green-50",
              text: "text-green-700",
            },
            {
              label: "Pending Payout",
              value: `$${totalPending.toFixed(2)}`,
              icon: <Clock className="w-5 h-5 text-yellow-600" />,
              bg: "bg-yellow-50",
              text: "text-yellow-700",
            },
          ].map((card) => (
            <div key={card.label} className={`${card.bg} rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-2">
                {card.icon}
                <span className="text-xs font-medium text-gray-600">{card.label}</span>
              </div>
              <p className={`text-2xl font-bold ${card.text}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Ledger table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Transaction History</p>
          </div>

          {isLoading ? (
            <div className="space-y-0 divide-y divide-gray-100">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-4">
                  <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded flex-1 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-20 animate-pulse" />
                </div>
              ))}
            </div>
          ) : allCommissions.length === 0 ? (
            <div className="py-16 text-center">
              <DollarSign className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No commissions yet</p>
              <p className="text-gray-300 text-xs mt-1">Send your first referral to start earning</p>
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

      <div>
        {/* Payout info */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm font-medium text-blue-800 mb-1">Payout Schedule</p>
          <p className="text-xs text-blue-600">
            Commissions are processed on the 1st and 15th of each month. Pending commissions will be paid once the referred job is marked closed and verified by ProLnk. Questions? Contact support@prolnk.com.
          </p>
        </div>
      </div>
    </PartnerLayout>
  );
}
