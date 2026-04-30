/**
 * PayoutSetup — REV-01
 * Stripe Connect bank account onboarding for partners.
 * Guides partner through connecting their bank account to receive commission payouts.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  DollarSign, CheckCircle, Clock, AlertTriangle, ExternalLink,
  Shield, Zap, ArrowRight, CreditCard, Building2, RefreshCw,
  Info, Lock
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Connect Bank Account", desc: "Securely link your business bank account via Stripe" },
  { id: 2, label: "Verify Identity", desc: "Stripe verifies your business identity (takes 1–2 min)" },
  { id: 3, label: "Activate Payouts", desc: "Start receiving commission payouts automatically" },
];

const STATUS_CONFIG = {
  not_connected: {
    label: "Not Connected",
    color: "bg-gray-100 text-gray-600 border-gray-200",
    icon: AlertTriangle,
    step: 1,
  },
  pending: {
    label: "Verification Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    step: 2,
  },
  active: {
    label: "Payouts Active",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
    step: 3,
  },
  restricted: {
    label: "Action Required",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: AlertTriangle,
    step: 2,
  },
};

export default function PayoutSetup() {
  const [connecting, setConnecting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { data: connectStatus, refetch } = trpc.stripe.getConnectStatus.useQuery();
  const { data: commissions = [] } = trpc.partners.getPaidCommissions.useQuery();
  const createConnectLink = trpc.stripe.createConnectLink.useMutation({
    onSuccess: (data: { url?: string }) => {
      if (data.url) {
        window.open(data.url, "_blank");
        toast.success("Stripe Connect opened — complete setup in the new tab, then return here.");
      }
      setConnecting(false);
    },
    onError: (e: { message?: string }) => {
      toast.error(e.message || "Failed to create Stripe Connect link");
      setConnecting(false);
    },
  });

  const status = (connectStatus?.status as keyof typeof STATUS_CONFIG) ?? "not_connected";
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.not_connected;
  const StatusIcon = cfg.icon;

  const pendingCommissions = (commissions as any[]).filter((c) => !c.paid);
  const pendingTotal = pendingCommissions.reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const paidTotal = (commissions as any[]).filter((c) => c.paid).reduce((s, c) => s + Number(c.amount ?? 0), 0);

  const handleConnect = () => {
    setConnecting(true);
    createConnectLink.mutate({ origin: window.location.origin });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
    toast.success("Status refreshed");
  };

  return (
    <PartnerLayout>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Payout Setup</h1>
          <p className="text-gray-500 text-sm mt-1">
            Connect your bank account to receive commission payouts directly via Stripe.
          </p>
        </div>

        {/* Status Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${status === "active" ? "bg-green-50" : status === "pending" ? "bg-yellow-50" : "bg-gray-50"}`}>
                <StatusIcon className={`w-5 h-5 ${status === "active" ? "text-green-600" : status === "pending" ? "text-yellow-600" : "text-gray-500"}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Stripe Connect Status</p>
                <Badge className={`text-xs border mt-0.5 ${cfg.color}`}>{cfg.label}</Badge>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              title="Refresh status"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>

          {status === "active" ? (
            <div className="rounded-xl bg-green-50 border border-green-100 p-4 text-sm text-green-800">
              <div className="flex items-center gap-2 font-semibold mb-1">
                <CheckCircle className="w-4 h-4" /> Payouts are active
              </div>
              <p className="text-green-700">
                Your bank account is connected. Commissions are automatically transferred within 2–3 business days of being marked paid.
              </p>
              {connectStatus?.bankAccountLast4 && (
                <p className="mt-2 font-mono text-xs text-green-700">
                  Bank account ending in ••••{connectStatus.bankAccountLast4}
                </p>
              )}
            </div>
          ) : status === "pending" ? (
            <div className="rounded-xl bg-yellow-50 border border-yellow-100 p-4 text-sm text-yellow-800">
              <div className="flex items-center gap-2 font-semibold mb-1">
                <Clock className="w-4 h-4" /> Verification in progress
              </div>
              <p className="text-yellow-700">
                Stripe is verifying your account. This usually takes a few minutes. If you haven't completed all steps, click below to continue.
              </p>
              <Button
                onClick={handleConnect}
                disabled={connecting}
                size="sm"
                className="mt-3 bg-yellow-700 hover:bg-yellow-800 text-white"
              >
                {connecting ? <><RefreshCw className="w-3 h-3 mr-1.5 animate-spin" /> Opening...</> : <><ExternalLink className="w-3 h-3 mr-1.5" /> Continue Setup</>}
              </Button>
            </div>
          ) : status === "restricted" ? (
            <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-800">
              <div className="flex items-center gap-2 font-semibold mb-1">
                <AlertTriangle className="w-4 h-4" /> Action required
              </div>
              <p className="text-red-700">
                Stripe requires additional information to activate your payouts. Click below to complete the required steps.
              </p>
              <Button
                onClick={handleConnect}
                disabled={connecting}
                size="sm"
                className="mt-3 bg-red-700 hover:bg-red-800 text-white"
              >
                {connecting ? <><RefreshCw className="w-3 h-3 mr-1.5 animate-spin" /> Opening...</> : <><ExternalLink className="w-3 h-3 mr-1.5" /> Fix Issues</>}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                You haven't connected a bank account yet. Set up Stripe Connect to receive automatic commission payouts.
              </p>
              <Button
                onClick={handleConnect}
                disabled={connecting}
                className="w-full bg-[#0A1628] hover:bg-[#0d1f38] text-white font-semibold py-3"
              >
                {connecting ? (
                  <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Opening Stripe...</>
                ) : (
                  <><Building2 className="w-4 h-4 mr-2" /> Connect Bank Account</>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Payout Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Pending</span>
            </div>
            <div className="text-2xl font-heading font-bold text-gray-900">
              ${pendingTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{pendingCommissions.length} commission{pendingCommissions.length !== 1 ? "s" : ""} awaiting payout</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Total Paid</span>
            </div>
            <div className="text-2xl font-heading font-bold text-gray-900">
              ${paidTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Lifetime commissions received</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-heading font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#0A1628]" /> How Payouts Work
          </h3>
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                  cfg.step > i ? "bg-green-100 text-green-700" : cfg.step === i + 1 ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {cfg.step > i ? <CheckCircle className="w-3.5 h-3.5" /> : step.id}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{step.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security note */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 flex items-start gap-3">
          <Lock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Bank account setup is handled entirely by Stripe — ProLnk never stores your banking credentials. Stripe is a PCI-DSS Level 1 certified payment processor trusted by millions of businesses.
          </p>
        </div>

        {/* Payout History link */}
        {status === "active" && (
          <div className="text-center">
            <a href="/dashboard/commissions" className="inline-flex items-center gap-1.5 text-sm text-[#0A1628] font-medium hover:underline">
              View full payout history <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
