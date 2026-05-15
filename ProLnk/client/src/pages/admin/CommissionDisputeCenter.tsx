/**
 * Admin Commission Dispute Center
 * Route: /admin/commission-disputes
 * Review, investigate, and resolve partner commission disputes.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle, XCircle, Clock, DollarSign, MessageSquare } from "lucide-react";

const DISPUTE_STATUS_CONFIG: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
  none: { color: "bg-gray-700 text-gray-400", label: "No Dispute", icon: null },
  open: { color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", label: "Open", icon: <AlertTriangle className="w-3 h-3" /> },
  under_review: { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Under Review", icon: <Clock className="w-3 h-3" /> },
  resolved_approved: { color: "bg-green-500/10 text-green-400 border-green-500/20", label: "Approved", icon: <CheckCircle className="w-3 h-3" /> },
  resolved_denied: { color: "bg-red-500/10 text-red-400 border-red-500/20", label: "Denied", icon: <XCircle className="w-3 h-3" /> },
};

export default function CommissionDisputeCenter() {
  const [selectedDispute, setSelectedDispute] = useState<any | null>(null);
  const [resolution, setResolution] = useState("");
  const [resolveStatus, setResolveStatus] = useState<"resolved_approved" | "resolved_denied">("resolved_denied");

  const disputes = trpc.admin.getCommissionDisputes.useQuery({ status: "open" });

  const resolveDispute = trpc.admin.resolveCommissionDispute.useMutation({
    onSuccess: () => {
      toast.success("Dispute resolved");
      setSelectedDispute(null);
      disputes.refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-orange-400" />
            Commission Disputes
          </h1>
          <p className="text-gray-400 text-sm mt-1">Review and resolve partner commission disputes</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Dispute list */}
          <div className="lg:col-span-2 space-y-3">
            {disputes.isLoading ? (
              <div className="text-center py-12 text-gray-500">Loading disputes...</div>
            ) : !disputes.data?.length ? (
              <div className="text-center py-16">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-400">No open disputes</p>
              </div>
            ) : (
              disputes.data.map((dispute: any) => {
                const statusConf = DISPUTE_STATUS_CONFIG[dispute.disputeStatus] ?? DISPUTE_STATUS_CONFIG.open;
                return (
                  <div
                    key={dispute.id}
                    onClick={() => setSelectedDispute(dispute)}
                    className={`bg-gray-800 rounded-xl p-4 border cursor-pointer transition-all hover:border-gray-600 ${selectedDispute?.id === dispute.id ? "border-teal-500/50" : "border-gray-700"}`}
                  >
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-white text-sm">Commission #{dispute.id}</span>
                          <Badge className={`text-xs border ${statusConf.color} gap-1`}>
                            {statusConf.icon}
                            {statusConf.label}
                          </Badge>
                          <span className="text-teal-400 font-bold text-sm ml-auto">${parseFloat(dispute.amount).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{dispute.disputeReason}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                          <span>{new Date(dispute.disputeOpenedAt).toLocaleDateString()}</span>
                          {dispute.payingPartnerName && <span>From: {dispute.payingPartnerName}</span>}
                          {dispute.receivingPartnerName && <span>To: {dispute.receivingPartnerName}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Dispute detail */}
          {selectedDispute ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-white text-sm font-bold">Dispute #{selectedDispute.id}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="text-gray-400 text-xs mb-1">Amount Disputed</div>
                  <div className="text-teal-400 text-2xl font-black">${parseFloat(selectedDispute.amount).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Dispute Reason</div>
                  <div className="text-gray-300 text-sm bg-gray-700 rounded-lg p-3">{selectedDispute.disputeReason}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-2">Resolution</div>
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => setResolveStatus("resolved_approved")}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${resolveStatus === "resolved_approved" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-400"}`}
                    >
                      Approve Dispute
                    </button>
                    <button
                      onClick={() => setResolveStatus("resolved_denied")}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${resolveStatus === "resolved_denied" ? "bg-red-500 text-white" : "bg-gray-700 text-gray-400"}`}
                    >
                      Deny Dispute
                    </button>
                  </div>
                  <textarea
                    value={resolution}
                    onChange={e => setResolution(e.target.value)}
                    placeholder="Resolution note..."
                    className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-3 resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-teal-500 hover:bg-teal-400 text-white text-xs"
                    disabled={!resolution.trim() || resolveDispute.isPending}
                    onClick={() => resolveDispute.mutate({
                      commissionId: selectedDispute.id,
                      status: resolveStatus,
                      note: resolution,
                    })}
                  >
                    {resolveDispute.isPending ? "Saving..." : "Submit Resolution"}
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-400 text-xs" onClick={() => setSelectedDispute(null)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center text-gray-500">
                <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Select a dispute to review</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
