import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Shield, DollarSign, AlertTriangle, CheckCircle, Clock, RefreshCw, Bell, ChevronDown, ChevronUp } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  flagged: "border-amber-600 text-amber-400",
  claim_filed: "border-blue-600 text-blue-400",
  adjuster_scheduled: "border-purple-600 text-purple-400",
  approved: "border-emerald-600 text-emerald-400",
  denied: "border-red-600 text-red-400",
  paid: "border-emerald-500 text-emerald-300",
  closed: "border-slate-600 text-slate-400",
};

const STATUS_LABELS: Record<string, string> = {
  flagged: "Flagged",
  claim_filed: "Claim Filed",
  adjuster_scheduled: "Adjuster Scheduled",
  approved: "Approved",
  denied: "Denied",
  paid: "Paid",
  closed: "Closed",
};

export default function InsuranceClaims() {
  const [statusFilter, setStatusFilter] = useState<any>("all");
  const [page, setPage] = useState(1);
  const [expandedClaim, setExpandedClaim] = useState<number | null>(null);
  const [updateStatusOpen, setUpdateStatusOpen] = useState<number | null>(null);
  const [updateForm, setUpdateForm] = useState({ claimStatus: "", claimNumber: "", insuranceCompany: "", jobValue: "", notes: "" });

  const { data: stats, refetch: refetchStats } = trpc.insuranceClaims.getStats.useQuery();
  const { data: claimsData, refetch: refetchClaims } = trpc.insuranceClaims.listClaims.useQuery({ page, limit: 25, status: statusFilter });

  const updateStatus = trpc.insuranceClaims.updateClaimStatus.useMutation({
    onSuccess: () => { toast.success("Status updated"); setUpdateStatusOpen(null); refetchClaims(); refetchStats(); },
  });
  const markCommPaid = trpc.insuranceClaims.markCommissionPaid.useMutation({
    onSuccess: () => { toast.success("Commission marked as paid"); refetchClaims(); refetchStats(); },
  });
  const sendReminder = trpc.insuranceClaims.sendReminder.useMutation({
    onSuccess: (data) => { toast.success(data.message); refetchClaims(); },
  });

  const handleUpdateStatus = (claimId: number) => {
    if (!updateForm.claimStatus) return;
    updateStatus.mutate({
      claimId, claimStatus: updateForm.claimStatus as any,
      claimNumber: updateForm.claimNumber || undefined,
      insuranceCompany: updateForm.insuranceCompany || undefined,
      jobValue: updateForm.jobValue ? Number(updateForm.jobValue) : undefined,
      notes: updateForm.notes || undefined,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Insurance Claims Tracker</h1>
            <p className="text-slate-400 text-sm mt-1">Track insurance-eligible jobs from detection through commission collection</p>
          </div>
          <Button onClick={() => { refetchClaims(); refetchStats(); }} variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Total Claims", value: stats?.totalClaims ?? 0, icon: Shield, color: "text-blue-400" },
            { label: "Flagged", value: stats?.flagged ?? 0, icon: AlertTriangle, color: "text-amber-400" },
            { label: "Approved", value: stats?.approved ?? 0, icon: CheckCircle, color: "text-emerald-400" },
            { label: "Pending Commission", value: stats?.pendingCommissions ?? 0, icon: Clock, color: "text-purple-400" },
            { label: "Unpaid Value", value: `$${Number(stats?.unpaidCommissionValue ?? 0).toLocaleString()}`, icon: DollarSign, color: "text-red-400" },
          ].map((s) => (
            <Card key={s.label} className="bg-slate-800 border-slate-700">
              <CardContent className="p-3 flex items-center gap-2">
                <s.icon className={`w-6 h-6 ${s.color} shrink-0`} />
                <div>
                  <div className="text-lg font-bold text-white">{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Detection Banner */}
        {Number(stats?.aiDetected ?? 0) > 0 && (
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-400 shrink-0" />
            <p className="text-blue-300 text-sm">
              <strong>{stats?.aiDetected}</strong> claims were auto-detected by the TrustyPro AI during photo scans. Review them below to confirm and file.
            </p>
          </div>
        )}

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {["all", "flagged", "claim_filed", "adjuster_scheduled", "approved", "denied", "paid", "closed"].map((s) => (
            <Button key={s} size="sm" variant={statusFilter === s ? "default" : "outline"}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={statusFilter === s ? "bg-blue-600 text-white" : "border-slate-600 text-slate-300 hover:bg-slate-700"}>
              {s === "all" ? "All" : STATUS_LABELS[s]}
            </Button>
          ))}
        </div>

        {/* Claims List */}
        <div className="space-y-3">
          {(!claimsData?.claims || claimsData.claims.length === 0) && (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="py-12 text-center text-slate-400">
                <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No insurance claims found.</p>
                <p className="text-xs mt-1">Claims are auto-flagged when the TrustyPro AI detects storm/hail/flood damage during photo scans.</p>
              </CardContent>
            </Card>
          )}
          {(claimsData?.claims ?? []).map((claim: any) => (
            <Card key={claim.id} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white">{claim.homeownerName || "Unknown Homeowner"}</span>
                      <Badge variant="outline" className={`text-xs ${STATUS_COLORS[claim.claimStatus]}`}>{STATUS_LABELS[claim.claimStatus]}</Badge>
                      {claim.aiDetected && <Badge variant="outline" className="text-xs border-blue-600 text-blue-400">AI Detected</Badge>}
                      {!claim.commissionPaid && claim.claimStatus === "paid" && (
                        <Badge variant="outline" className="text-xs border-red-600 text-red-400">Commission Unpaid</Badge>
                      )}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{claim.propertyAddress || "No address"}</div>
                    <div className="flex gap-4 mt-2 text-xs text-slate-400 flex-wrap">
                      {claim.damageType && <span>Damage: <span className="text-white">{claim.damageType}</span></span>}
                      {claim.estimatedDamageValue && <span>Est. Value: <span className="text-amber-400">${Number(claim.estimatedDamageValue).toLocaleString()}</span></span>}
                      {claim.insuranceCompany && <span>Insurer: <span className="text-white">{claim.insuranceCompany}</span></span>}
                      {claim.claimNumber && <span>Claim #: <span className="text-white">{claim.claimNumber}</span></span>}
                      {claim.partnerName && <span>Partner: <span className="text-white">{claim.partnerName}</span></span>}
                      {claim.platformFeeAmount && <span>Platform Fee: <span className="text-emerald-400">${Number(claim.platformFeeAmount).toLocaleString()}</span></span>}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Flagged {new Date(claim.createdAt).toLocaleDateString()}
                      {claim.reminderCount > 0 && ` · ${claim.reminderCount} reminder${claim.reminderCount > 1 ? "s" : ""} sent`}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Dialog open={updateStatusOpen === claim.id} onOpenChange={(o) => { setUpdateStatusOpen(o ? claim.id : null); if (o) setUpdateForm({ claimStatus: claim.claimStatus, claimNumber: claim.claimNumber || "", insuranceCompany: claim.insuranceCompany || "", jobValue: claim.jobValue || "", notes: "" }); }}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">Update Status</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-slate-700 text-white">
                        <DialogHeader><DialogTitle>Update Claim #{claim.id}</DialogTitle></DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-slate-300">Status</Label>
                            <Select value={updateForm.claimStatus} onValueChange={(v) => setUpdateForm(f => ({ ...f, claimStatus: v }))}>
                              <SelectTrigger className="bg-slate-800 border-slate-600 text-white mt-1"><SelectValue /></SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-700">
                                {Object.entries(STATUS_LABELS).map(([v, l]) => <SelectItem key={v} value={v} className="text-white">{l}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          {["claimNumber", "insuranceCompany"].map((f) => (
                            <div key={f}>
                              <Label className="text-slate-300 capitalize">{f.replace(/([A-Z])/g, " $1")}</Label>
                              <Input value={(updateForm as any)[f]} onChange={(e) => setUpdateForm(prev => ({ ...prev, [f]: e.target.value }))}
                                className="bg-slate-800 border-slate-600 text-white mt-1" />
                            </div>
                          ))}
                          {updateForm.claimStatus === "paid" && (
                            <div>
                              <Label className="text-slate-300">Job Value ($) — used to calculate platform fee</Label>
                              <Input type="number" value={updateForm.jobValue} onChange={(e) => setUpdateForm(f => ({ ...f, jobValue: e.target.value }))}
                                className="bg-slate-800 border-slate-600 text-white mt-1" />
                            </div>
                          )}
                          <div>
                            <Label className="text-slate-300">Notes</Label>
                            <Textarea value={updateForm.notes} onChange={(e) => setUpdateForm(f => ({ ...f, notes: e.target.value }))}
                              className="bg-slate-800 border-slate-600 text-white mt-1" rows={3} />
                          </div>
                          <Button onClick={() => handleUpdateStatus(claim.id)} disabled={updateStatus.isPending} className="w-full bg-blue-600 hover:bg-blue-700">
                            Save Update
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {!claim.commissionPaid && claim.claimStatus === "paid" && (
                      <Button size="sm" variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-900/30 text-xs"
                        onClick={() => markCommPaid.mutate({ claimId: claim.id })}>
                        <DollarSign className="w-3 h-3 mr-1" /> Mark Paid
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white text-xs"
                      onClick={() => sendReminder.mutate({ claimId: claim.id })}>
                      <Bell className="w-3 h-3 mr-1" /> Remind
                    </Button>
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white text-xs"
                      onClick={() => setExpandedClaim(expandedClaim === claim.id ? null : claim.id)}>
                      {expandedClaim === claim.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </Button>
                  </div>
                </div>
                {expandedClaim === claim.id && claim.notes && (
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <p className="text-xs text-slate-400">Notes: <span className="text-slate-300">{claim.notes}</span></p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {(claimsData?.total ?? 0) > 25 && (
          <div className="flex justify-center gap-2">
            <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)} className="border-slate-600 text-slate-300">Previous</Button>
            <span className="text-slate-400 text-sm self-center">Page {page} of {Math.ceil((claimsData?.total ?? 0) / 25)}</span>
            <Button size="sm" variant="outline" disabled={page >= Math.ceil((claimsData?.total ?? 0) / 25)} onClick={() => setPage(p => p + 1)} className="border-slate-600 text-slate-300">Next</Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
