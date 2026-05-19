import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard, ExternalLink, RefreshCw, CheckCircle,
  AlertCircle, Banknote, Clock, DollarSign, ArrowRight,
  Wallet, CalendarDays, Layers, TrendingUp,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const TIER_META: Record<string, { label: string; color: string; amount: number }> = {
  scout:      { label: "Scout",      color: "bg-gray-100 text-gray-700″,     amount: 0 },
  pro:        { label: "Pro",        color: "bg-blue-100 text-blue-700″,     amount: 29 },
  crew:       { label: "Crew",       color: "bg-indigo-100 text-indigo-700″, amount: 79 },
  company:    { label: "Company",    color: "bg-purple-100 text-purple-700″, amount: 149 },
  enterprise: { label: "Enterprise", color: "bg-amber-100 text-amber-800″,   amount: 299 },
};

function fmt(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function PartnerBilling() {
  const [connectLoading, setConnectLoading] = useState(false);
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const { data: billing, refetch } = trpc.stripe.getMyBilling.useQuery();
  const { data: connectStatus } = trpc.stripe.getConnectStatus.useQuery();
  const { data: history } = trpc.stripe.getPayoutHistory.useQuery();

  const createConnectLink = trpc.stripe.createConnectLink.useMutation();
  const createBillingPortal = trpc.stripe.createBillingPortalSession.useMutation();
  const requestPayoutMutation = trpc.stripe.requestPayout.useMutation();

  const tier = billing?.tier ?? "scout";
  const tierMeta = TIER_META[tier] ?? TIER_META.scout;
  const isFreeTier = tier === "scout";
  const connectActive = (billing?.stripeConnectStatus ?? connectStatus?.stripeConnectStatus) === "active";
  const bankLast4 = billing?.bankAccountLast4 ?? connectStatus?.bankAccountLast4;

  const handleConnectBank = async () => {
    setConnectLoading(true);
    try {
      const { url } = await createConnectLink.mutateAsync({ origin: window.location.origin });
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      toast.error(err?.message ?? "Could not start Stripe onboarding. Please try again.");
    } finally {
      setConnectLoading(false);
    }
  };

  const handleOpenPortal = async () => {
    setPortalLoading(true);
    try {
      const { url } = await createBillingPortal.mutateAsync({ returnUrl: window.location.href });
      window.open(url, "_blank");
      toast.success("Redirecting to Stripe billing portal...");
    } catch (err: any) {
      toast.error(err?.message ?? "Could not open billing portal.");
    } finally {
      setPortalLoading(false);
    }
  };

  const handleRequestPayout = async () => {
    if (!billing?.canRequestPayout) return;
    setPayoutLoading(true);
    try {
      const result = await requestPayoutMutation.mutateAsync();
      toast.success(`Payout of ${fmt(result.amountPaid)} sent to your bank account.`);
      await refetch();
    } catch (err: any) {
      if (!billing?.stripeConnectStatus || billing.stripeConnectStatus !== "active") {
        toast.error("Set up your bank account first to receive payouts.");
      } else {
        toast.error(err?.message ?? "Could not submit payout request.");
      }
    } finally {
      setPayoutLoading(false);
    }
  };

  return (
    <PartnerLayout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6″>
        {/* Header */}
        <div className="flex items-center gap-3″>
          <div className="w-10 h-10 rounded-xl bg-[#0f2240] flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900″>Billing & Payouts</h1>
            <p className="text-sm text-gray-500″>Manage your subscription and commission payouts</p>
          </div>
        </div>

        {/* Subscription Card */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3″>
            <CardTitle className="text-base flex items-center gap-2″>
              <Layers className="w-4 h-4 text-gray-500″ />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4″>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3″>
                <Badge className={`${tierMeta.color} border-0 font-semibold px-3 py-1`}>
                  {tierMeta.label}
                </Badge>
                {tierMeta.amount > 0 && (
                  <span className="text-sm text-gray-500″>{fmt(tierMeta.amount)}/mo</span>
                )}
              </div>
              {billing?.trialStatus === "trial" && (
                <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">
                  Trial Active
                </Badge>
              )}
            </div>

            {billing?.trialStatus === "trial" && billing.trialEndsAt && (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg p-3 border border-amber-100″>
                <CalendarDays className="w-4 h-4 shrink-0″ />
                <span>
                  {billing.trialDaysLeft != null && billing.trialDaysLeft > 0
                    ? `Trial ends in ${billing.trialDaysLeft} day${billing.trialDaysLeft !== 1 ? "s" : ""} (${new Date(billing.trialEndsAt).toLocaleDateString()}).`
                    : `Trial ended on ${new Date(billing.trialEndsAt).toLocaleDateString()}.`}
                  {" "}Add a payment method to keep your plan.
                </span>
              </div>
            )}

            {!isFreeTier ? (
              <Button
                onClick={handleOpenPortal}
                disabled={portalLoading}
                className="w-full bg-[#0f2240] hover:bg-[#1a3a6b] text-white"
              >
                {portalLoading
                  ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Opening portal...</>
                  : <><ExternalLink className="w-4 h-4 mr-2″ /> Manage in Stripe Portal</>}
              </Button>
            ) : (
              <div className="text-center py-2″>
                <p className="text-sm text-gray-500 mb-3″>You're on the free Scout plan.</p>
                <Button
                  variant="outline"
                  className="border-[#0f2240] text-[#0f2240] hover:bg-[#0f2240]/5″
                  onClick={() => window.location.href = "/dashboard/tier"}
                >
                  Upgrade Your Plan <ArrowRight className="w-4 h-4 ml-2″ />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Commission Balance Card */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3″>
            <CardTitle className="text-base flex items-center gap-2″>
              <DollarSign className="w-4 h-4 text-gray-500″ />
              Commission Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4″>
            <div className="grid grid-cols-2 gap-4″>
              <div className="bg-[#0f2240]/5 rounded-xl p-4″>
                <p className="text-xs text-gray-500 mb-1″>Pending Payout</p>
                <p className="text-2xl font-bold text-[#0f2240]">
                  {fmt(billing?.pendingBalance ?? 0)}
                </p>
                {(billing?.pendingCount ?? 0) > 0 && (
                  <p className="text-xs text-gray-400 mt-1″>{billing?.pendingCount} commission{billing?.pendingCount !== 1 ? "s" : ""}</p>
                )}
              </div>
              <div className="bg-gray-50 rounded-xl p-4″>
                <p className="text-xs text-gray-500 mb-1″>Lifetime Paid</p>
                <p className="text-2xl font-bold text-gray-700″>
                  {fmt(billing?.lifetimePaid ?? 0)}
                </p>
              </div>
            </div>

            {!connectActive && (billing?.pendingBalance ?? 0) > 0 && (
              <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg p-3 border border-amber-100″>
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5″ />
                <span>Connect your bank account below to receive your pending commissions.</span>
              </div>
            )}

            {(billing?.pendingBalance ?? 0) > 0 && (billing?.pendingBalance ?? 0) < 25 && (
              <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3″>
                <Clock className="w-4 h-4 shrink-0 mt-0.5″ />
                <span>Minimum payout threshold is $25.00. You currently have {fmt(billing?.pendingBalance ?? 0)} pending.</span>
              </div>
            )}

            <Button
              onClick={handleRequestPayout}
              disabled={!billing?.canRequestPayout || payoutLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50″
            >
              {payoutLoading
                ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Requesting...</>
                : <><Banknote className="w-4 h-4 mr-2″ /> Request Payout ({fmt(billing?.pendingBalance ?? 0)})</>}
            </Button>
            {!billing?.canRequestPayout && (
              <p className="text-xs text-center text-gray-400″>
                {!connectActive
                  ? "Bank account required to request payouts"
                  : (billing?.pendingBalance ?? 0) < 25
                  ? "Balance must be at least $25 to request a payout"
                  : "No pending balance"}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Payout Account Card */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3″>
            <CardTitle className="text-base flex items-center gap-2″>
              <Wallet className="w-4 h-4 text-gray-500″ />
              Payout Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3″>
            {connectActive ? (
              <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 rounded-lg p-3 border border-emerald-100″>
                <CheckCircle className="w-4 h-4 shrink-0″ />
                <div>
                  <p className="text-sm font-medium">Bank account connected</p>
                  {bankLast4 && (
                    <p className="text-xs text-emerald-600″>Account ending in {bankLast4}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-amber-700 bg-amber-50 rounded-lg p-3 border border-amber-100″>
                <AlertCircle className="w-4 h-4 shrink-0″ />
                <div>
                  <p className="text-sm font-medium">No payout account connected</p>
                  <p className="text-xs text-amber-600″>Connect your bank account to receive commission payouts.</p>
                </div>
              </div>
            )}

            <Button
              onClick={handleConnectBank}
              disabled={connectLoading}
              variant={connectActive ? "outline" : "default"}
              className={
                connectActive
                  ? "w-full border-gray-200 text-gray-700 hover:bg-gray-50″
                  : "w-full bg-[#0f2240] hover:bg-[#1a3a6b] text-white"
              }
            >
              {connectLoading
                ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Opening Stripe...</>
                : connectActive
                ? <><ExternalLink className="w-4 h-4 mr-2″ /> Update Payout Account</>
                : <><Banknote className="w-4 h-4 mr-2″ /> Connect Bank Account</>}
            </Button>
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3″>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2″>
                <TrendingUp className="w-4 h-4 text-gray-500″ />
                Payout History
              </CardTitle>
              {(history?.totalPaid ?? 0) > 0 && (
                <span className="text-sm text-gray-500″>
                  Total paid: <span className="font-semibold text-gray-700″>{fmt(history?.totalPaid ?? 0)}</span>
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!history || history.payouts.length === 0 ? (
              <div className="text-center py-8 text-gray-400″>
                <Banknote className="w-8 h-8 mx-auto mb-2 opacity-30″ />
                <p className="text-sm">No payouts yet — your first will appear here</p>
              </div>
            ) : (
              <div className="space-y-2″>
                {history.payouts.slice(0, 5).map((payout: any) => (
                  <div key={payout.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0″>
                    <div className="flex items-center gap-3″>
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0″>
                        <CheckCircle className="w-4 h-4 text-emerald-600″ />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800″>
                          {payout.description ?? "Commission payout"}
                        </p>
                        <p className="text-xs text-gray-400″>
                          {payout.paidAt
                            ? new Date(payout.paidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                            : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-emerald-700″>{fmt(parseFloat(payout.amount ?? "0"))}</p>
                      <Badge className="bg-emerald-50 text-emerald-700 border-0 text-xs px-2 py-0″>Paid</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-xs text-gray-400 text-center">
          Questions about billing? Contact support@prolnk.io
        </p>
      </div>
    </PartnerLayout>
  );
}
