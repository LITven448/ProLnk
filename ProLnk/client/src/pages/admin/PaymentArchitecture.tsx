/**
 * Payment Architecture V12 — Admin Dashboard
 *
 * Provides the admin with a full view of:
 * - Live payment status across all deals
 * - ACH authorization tracking for insurance jobs
 * - Commission math breakdown
 * - Milestone progress per job
 * - Architecture overview (embedded infographic)
 */

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Building2,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  FileText,
  BarChart3,
  Shield,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

// ── Status color helpers ───────────────────────────────────────────────────────
function paymentStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    pending: { label: "Pending", variant: "secondary" },
    deposit_charged: { label: "Deposit Charged", variant: "default" },
    balance_charged: { label: "Balance Charged", variant: "default" },
    ach_authorized: { label: "ACH Authorized", variant: "outline" },
    ach_pulled: { label: "ACH Pulled", variant: "default" },
    paid_out: { label: "Paid Out", variant: "default" },
    disputed: { label: "Disputed", variant: "destructive" },
    refunded: { label: "Refunded", variant: "destructive" },
    failed: { label: "Failed", variant: "destructive" },
    voided: { label: "Voided", variant: "secondary" },
  };
  const cfg = map[status] ?? { label: status, variant: "secondary" };
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

function fmt(val: string | number | null | undefined): string {
  if (val == null) return "—";
  const n = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(n)) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

// ── Architecture Overview Component ──────────────────────────────────────────
function ArchitectureOverview() {
  const flows = [
    {
      id: "A",
      title: "Flow A — Standard Job",
      subtitle: "Card-on-File Milestone Charges",
      color: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      bgColor: "bg-emerald-500/5",
      steps: [
        { n: "1", label: "Homeowner Accepts Deal", detail: "Saves card via Stripe SetupIntent (off_session)", icon: CreditCard },
        { n: "2", label: "Partner Confirms Job Start", detail: "Platform auto-charges Deposit (30% of job value)", icon: Zap },
        { n: "3", label: "Mid-Job (if > $5,000)", detail: "Platform charges mid-job milestone (40%)", icon: Clock },
        { n: "4", label: "Homeowner Check-In ✦", detail: "Homeowner confirms via email — Patent Claim 20", icon: CheckCircle2 },
        { n: "5", label: "Auto Balance Charge", detail: "Platform charges Final Balance (70%) from saved card", icon: DollarSign },
        { n: "6", label: "Commission Split", detail: "Receiving Pro payout + Referring Pro commission transferred", icon: TrendingUp },
      ],
    },
    {
      id: "B",
      title: "Flow B — Insurance Job",
      subtitle: "ACH Debit Commission Pull",
      color: "text-amber-400",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-500/5",
      steps: [
        { n: "1", label: "Partner Flags Insurance Job", detail: "Records carrier, claim #, adjuster info", icon: FileText },
        { n: "2", label: "Partner Signs ACH Auth ✦", detail: "NACHA-compliant debit mandate — Patent Claim 21", icon: Shield },
        { n: "3", label: "Insurance Pays Partner", detail: "Insurance pays partner directly (outside platform)", icon: Building2 },
        { n: "4", label: "Homeowner Check-In ✦", detail: "Homeowner confirms via email — triggers ACH pull", icon: CheckCircle2 },
        { n: "5", label: "Auto ACH Commission Pull", detail: "Platform pulls commission % from partner's bank", icon: Zap },
        { n: "6", label: "Referring Pro Commission", detail: "Referring partner's share transferred from platform", icon: TrendingUp },
      ],
    },
  ];

  const patentClaims = [
    { id: "20", title: "Auto Commission on Check-In", desc: "Commission collection triggered automatically by homeowner's digital confirmation — no manual intervention.", color: "border-amber-500/40 bg-amber-500/5" },
    { id: "21", title: "ACH Debit for Insurance Jobs", desc: "Platform collects commission via ACH debit from partner's bank, authorized by NACHA-compliant digital mandate.", color: "border-red-500/40 bg-red-500/5" },
    { id: "22", title: "Milestone-Based Payment Scheduling", desc: "Job payments auto-split into milestones based on job value thresholds, each triggered by specific status events.", color: "border-cyan-500/40 bg-cyan-500/5" },
    { id: "23", title: "Zero-Self-Reporting Architecture", desc: "Partners never manually report completion or amounts. All collection driven by homeowner check-in + AI photo verification.", color: "border-emerald-500/40 bg-emerald-500/5" },
  ];

  return (
    <div className="space-y-6">
      {/* Commission Math */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Commission Math — Example: $10,000 Roofing Job · 10% Platform Fee · Scout Tier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Job Value", value: "$10,000", color: "text-white" },
              { label: "Receiving Pro Payout (90%)", value: "$9,000", color: "text-emerald-400" },
              { label: "Referring Pro Earns (40% of fee)", value: "$400", color: "text-purple-400" },
              { label: "Platform Net (60% of fee)", value: "$600", color: "text-cyan-400" },
            ].map((item) => (
              <div key={item.label} className="bg-slate-800 rounded-lg p-3">
                <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                <div className="text-xs text-slate-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Platform fee rate: 8–12% (configurable per industry) · Referring Pro share: 30–50% of platform fee (configurable per tier) · All calculations are automatic — zero manual entry required
          </p>
        </CardContent>
      </Card>

      {/* Two Flows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {flows.map((flow) => (
          <Card key={flow.id} className={`bg-slate-900 border ${flow.borderColor}`}>
            <CardHeader className={`pb-3 ${flow.bgColor} rounded-t-lg`}>
              <CardTitle className={`text-base font-bold ${flow.color}`}>{flow.title}</CardTitle>
              <p className="text-xs text-slate-400">{flow.subtitle}</p>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              {flow.steps.map((step, i) => (
                <div key={step.n} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5 ${
                    flow.id === "A" ? "bg-emerald-600" : "bg-amber-600"
                  }`}>
                    {step.n}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-200">{step.label}</div>
                    <div className="text-xs text-slate-500">{step.detail}</div>
                  </div>
                  {i < flow.steps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-600 mt-1 flex-shrink-0 hidden" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patent Claims */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-purple-400" />
          Patent Claims (V12 Novel Claims)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {patentClaims.map((claim) => (
            <div key={claim.id} className={`rounded-lg border p-4 ${claim.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">Claim {claim.id}</Badge>
                <span className="text-sm font-semibold text-slate-200">{claim.title}</span>
              </div>
              <p className="text-xs text-slate-400">{claim.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Database Tables */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Database Schema (V12 Tables)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: "jobPayments", color: "text-emerald-400", fields: ["dealId · homeownerId · referringPartnerId", "totalJobValue · platformFeeRate · platformFeeAmount", "stripePaymentIntentId · stripeCustomerId · stripeTransferId", "status: pending → deposit_charged → balance_charged → paid_out", "isInsuranceJob · insuranceCarrier · claimNumber"] },
            { name: "paymentMilestones", color: "text-cyan-400", fields: ["jobPaymentId · milestoneType: deposit | mid_job | final_balance", "amountCents · triggerEvent: job_start | checkin | admin", "status: scheduled → triggered → completed", "stripeIntentId · retryCount · failureReason"] },
            { name: "achAuthorizations", color: "text-amber-400", fields: ["partnerId · jobPaymentId · stripePaymentMethodId", "authorizationType: single_job | standing", "authorizationText (NACHA-compliant legal text)", "signedAt · signerName · status: signed → used"] },
            { name: "homeownerPaymentMethods", color: "text-purple-400", fields: ["homeownerId · stripeCustomerId · stripePaymentMethodId", "cardBrand · cardLast4 · isDefault · isActive", "consentText · consentSignedAt (legal record)"] },
          ].map((table) => (
            <div key={table.name} className="bg-slate-900 border border-slate-700 rounded-lg p-3">
              <div className={`text-sm font-bold ${table.color} mb-2 font-mono`}>{table.name}</div>
              {table.fields.map((field) => (
                <div key={field} className="text-xs text-slate-500 font-mono leading-5">{field}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PaymentArchitecture() {
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [payoutId, setPayoutId] = useState<number | null>(null);

  const { data: overview, isLoading, refetch } = trpc.payments.adminGetPaymentOverview.useQuery(undefined, {
    refetchInterval: 30000,
  });

  const triggerPayout = trpc.payments.adminTriggerPayout.useMutation({
    onSuccess: (data) => {
      toast.success(`Payout triggered — $${data.amountPaid.toFixed(2)} transferred. ID: ${data.transferId}`);
      refetch();
      setPayoutId(null);
    },
    onError: (err) => {
      toast.error(`Payout failed: ${err.message}`);
    },
  });

  const payments = overview?.payments ?? [];
  const stats = overview?.stats ?? {};

  const statCards = [
    { label: "Total Job Volume", value: fmt(stats.totalJobVolume), icon: DollarSign, color: "text-emerald-400" },
    { label: "Commissions Collected", value: fmt(stats.totalCommissionsCollected), icon: TrendingUp, color: "text-cyan-400" },
    { label: "Paid Out", value: fmt(stats.totalPaidOut), icon: CheckCircle2, color: "text-purple-400" },
    { label: "Pending Payments", value: stats.pendingCount ?? 0, icon: Clock, color: "text-amber-400" },
    { label: "Insurance Jobs", value: stats.insuranceJobCount ?? 0, icon: Building2, color: "text-blue-400" },
    { label: "Insurance Commissions", value: fmt(stats.insuranceCommissions), icon: Shield, color: "text-red-400" },
  ];

  return (
    <AdminLayout>
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Payment Architecture V12</h1>
          <p className="text-slate-400 text-sm mt-1">
            Zero-Self-Reporting Commission Engine · Stripe Connect Destination Charges · ACH-on-Check-In
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-purple-600 text-white">Patent Pending</Badge>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((card) => (
          <Card key={card.label} className="bg-slate-900 border-slate-700">
            <CardContent className="p-4">
              <card.icon className={`w-4 h-4 ${card.color} mb-2`} />
              <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="payments">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="payments">Live Payments</TabsTrigger>
          <TabsTrigger value="architecture">Architecture Overview</TabsTrigger>
        </TabsList>

        {/* ── Live Payments Tab ── */}
        <TabsContent value="payments" className="mt-4">
          {isLoading ? (
            <div className="text-center py-12 text-slate-500">Loading payment data...</div>
          ) : payments.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <DollarSign className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No payment records yet.</p>
              <p className="text-xs mt-1">Payments are created automatically when homeowners accept deals.</p>
            </div>
          ) : (
            <div className="rounded-lg border border-slate-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-800/50 hover:bg-slate-800/50">
                    <TableHead className="text-slate-400 text-xs">Deal</TableHead>
                    <TableHead className="text-slate-400 text-xs">Homeowner</TableHead>
                    <TableHead className="text-slate-400 text-xs">Referring Pro</TableHead>
                    <TableHead className="text-slate-400 text-xs">Receiving Pro</TableHead>
                    <TableHead className="text-slate-400 text-xs">Job Value</TableHead>
                    <TableHead className="text-slate-400 text-xs">Platform Fee</TableHead>
                    <TableHead className="text-slate-400 text-xs">Type</TableHead>
                    <TableHead className="text-slate-400 text-xs">Status</TableHead>
                    <TableHead className="text-slate-400 text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p: any) => (
                    <TableRow
                      key={p.id}
                      className="hover:bg-slate-800/30 cursor-pointer"
                      onClick={() => setSelectedPayment(p)}
                    >
                      <TableCell className="text-xs font-mono text-slate-300">#{p.dealId}</TableCell>
                      <TableCell className="text-xs text-slate-300">{p.homeownerName || `HO #${p.homeownerId}`}</TableCell>
                      <TableCell className="text-xs text-slate-300">{p.referringPartnerName || `P#${p.referringPartnerId}`}</TableCell>
                      <TableCell className="text-xs text-slate-300">{p.receivingPartnerName || `P#${p.receivingPartnerId}`}</TableCell>
                      <TableCell className="text-xs font-semibold text-white">{fmt(p.totalJobValue)}</TableCell>
                      <TableCell className="text-xs text-cyan-400">{fmt(p.platformFeeAmount)}</TableCell>
                      <TableCell>
                        {p.isInsuranceJob ? (
                          <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-400">Insurance</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs border-emerald-500/50 text-emerald-400">Standard</Badge>
                        )}
                      </TableCell>
                      <TableCell>{paymentStatusBadge(p.status)}</TableCell>
                      <TableCell>
                        {(p.status === "balance_charged" || p.status === "ach_pulled") && p.status !== "paid_out" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPayoutId(p.id);
                            }}
                          >
                            Trigger Payout
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* ── Architecture Tab ── */}
        <TabsContent value="architecture" className="mt-4">
          <ArchitectureOverview />
        </TabsContent>
      </Tabs>

      {/* Payment Detail Dialog */}
      <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Payment Detail — Deal #{selectedPayment?.dealId}
            </DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Job Value", fmt(selectedPayment.totalJobValue)],
                  ["Platform Fee", fmt(selectedPayment.platformFeeAmount)],
                  ["Referring Pro Commission", fmt(selectedPayment.referringPartnerCommission)],
                  ["Receiving Pro Payout", fmt(selectedPayment.receivingPartnerPayout)],
                  ["Deposit Charged", fmt(selectedPayment.depositAmount)],
                  ["Balance Charged", fmt(selectedPayment.balanceAmount)],
                  ["Commission Pull", fmt(selectedPayment.commissionPullAmount)],
                  ["Payment Method", selectedPayment.paymentMethod],
                  ["Status", selectedPayment.status],
                  ["Insurance Job", selectedPayment.isInsuranceJob ? "Yes" : "No"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-slate-800 rounded p-2">
                    <div className="text-xs text-slate-500">{k}</div>
                    <div className="text-sm font-medium text-slate-200">{v}</div>
                  </div>
                ))}
              </div>
              {selectedPayment.stripePaymentIntentId && (
                <div className="bg-slate-800 rounded p-3">
                  <div className="text-xs text-slate-500 mb-1">Stripe IDs</div>
                  <div className="font-mono text-xs text-slate-300 space-y-1">
                    {selectedPayment.stripePaymentIntentId && <div>Payment Intent: {selectedPayment.stripePaymentIntentId}</div>}
                    {selectedPayment.stripeTransferId && <div>Transfer: {selectedPayment.stripeTransferId}</div>}
                    {selectedPayment.stripeAchMandateId && <div>ACH Mandate: {selectedPayment.stripeAchMandateId}</div>}
                  </div>
                </div>
              )}
              {selectedPayment.isInsuranceJob && (
                <div className="bg-amber-500/5 border border-amber-500/30 rounded p-3">
                  <div className="text-xs font-semibold text-amber-400 mb-2">Insurance Details</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <div>Carrier: {selectedPayment.insuranceCarrier || "—"}</div>
                    <div>Claim #: {selectedPayment.insuranceClaimNumber || "—"}</div>
                    <div>Adjuster: {selectedPayment.insuranceAdjusterName || "—"}</div>
                    <div>Approved: {fmt(selectedPayment.insuranceApprovedAmount)}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payout Confirm Dialog */}
      <Dialog open={!!payoutId} onOpenChange={() => setPayoutId(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Payout</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-400">
            This will initiate a Stripe transfer to the receiving partner's Connect account.
            This action cannot be undone.
          </p>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" onClick={() => setPayoutId(null)} className="flex-1">Cancel</Button>
            <Button
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={triggerPayout.isPending}
              onClick={() => payoutId && triggerPayout.mutate({ jobPaymentId: payoutId })}
            >
              {triggerPayout.isPending ? "Processing..." : "Confirm Payout"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </AdminLayout>
  );
}
