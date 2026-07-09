import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  CreditCard, ExternalLink, RefreshCw, CheckCircle, AlertCircle,
  Lock, Star, Calendar, XCircle, Users, Gift, Download, Clock,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

function daysUntil(dateStr: string | Date | null | undefined): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function formatCurrency(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function BillingPortal() {
  const [loading, setLoading] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const { data: subInfo } = trpc.stripe.getSubscriptionInfo.useQuery();
  const { data: connectStatus } = trpc.stripe.getConnectStatus.useQuery();
  const { data: myProfile } = trpc.partners.getMyProfile.useQuery();
  const billingPortalMutation = trpc.stripe.createBillingPortalSession.useMutation();

  const openBillingPortal = async () => {
    setLoading(true);
    try {
      const { url } = await billingPortalMutation.mutateAsync({
        returnUrl: window.location.href,
      });
      window.open(url, "_blank");
      toast.success("Redirecting to Stripe billing portal…");
    } catch (err: any) {
      toast.error(err?.message ?? "Could not open billing portal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCancel = async () => {
    setCancelling(true);
    try {
      await billingPortalMutation.mutateAsync({ returnUrl: window.location.href });
      toast.info("Redirecting to Stripe to complete cancellation…");
      setCancelOpen(false);
    } catch {
      toast.error("Could not open cancellation flow. Please contact support@prolnk.xyz.");
    } finally {
      setCancelling(false);
    }
  };

  const isFoundingMember = !subInfo?.tier || subInfo.tier === "founding" || subInfo.tier === "company";
  const isTrial = subInfo?.trialStatus === "trial";

  const nextBillingRaw = (subInfo?.trialEndsAt && isTrial)
    ? subInfo.trialEndsAt
    : subInfo?.nextBillingDate ?? null;

  const nextBillingLabel = nextBillingRaw
    ? new Date(nextBillingRaw).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  const daysLeft = daysUntil(nextBillingRaw);

  const directRecruits: number = (myProfile as any)?.stats?.partnersReferred ?? 0;
  const referralCreditAmount: number = directRecruits * 149 * 0.10;

  const pendingProApps: number = (myProfile as any)?.stats?.referralCount ?? directRecruits;

  const handleDownloadInvoice = () => {
    toast.info("Opening last invoice… (Stripe billing portal will show full invoice history)");
    openBillingPortal();
  };

  return (
    <PartnerLayout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0A1628]/8 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-[#0A1628]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Billing & Subscription</h1>
            <p className="text-sm text-gray-500">Your ProLnk membership and payment details</p>
          </div>
        </div>

        {/* Founding Member Plan Card */}
        <Card className="border-[#F5E642]/40 bg-gradient-to-br from-[#0A1628] to-[#0d2040] text-white overflow-hidden">
          <CardContent className="p-6 space-y-4">

            {/* Tier badge + label */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#F5E642]" fill="#F5E642" />
                <span className="text-lg font-black text-[#F5E642]">Founding Network Member</span>
              </div>
              <Badge className="bg-[#F5E642]/20 text-[#F5E642] border border-[#F5E642]/30 font-bold text-xs">
                $149/mo locked
              </Badge>
            </div>

            {/* Lock-in message */}
            <div className="flex items-start gap-3 bg-[#F5E642]/10 border border-[#F5E642]/20 rounded-xl p-4">
              <Lock className="w-4 h-4 text-[#F5E642] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#F5E642]">Upgrade never needed — you're locked at the founding rate</p>
                <p className="text-xs text-blue-300 mt-1 leading-relaxed">
                  As a Founding Network Member you pay $149/mo for life. This rate is permanently locked regardless of future price increases. Access to all current and future platform features is included.
                </p>
              </div>
            </div>

            {/* Trial status */}
            {isTrial && subInfo?.trialEndsAt && (
              <div className="flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm text-amber-300">
                  Free trial active — ends {new Date(subInfo.trialEndsAt).toLocaleDateString()}. Add a payment method to continue.
                </span>
              </div>
            )}

            {/* Social proof — pending pro applications */}
            {pendingProApps > 0 && (
              <div className="flex items-start gap-3 bg-white/10 border border-white/20 rounded-xl p-3">
                <Users className="w-4 h-4 text-blue-300 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-200 leading-relaxed">
                  Your subscription supports{" "}
                  <span className="font-bold text-white">{pendingProApps.toLocaleString()} pending pro applications</span>{" "}
                  waiting to join the network you helped build.
                </p>
              </div>
            )}

            {/* Next billing date with countdown */}
            {nextBillingLabel && (
              <div className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-blue-300 text-sm">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Next billing: <span className="font-semibold text-white">{nextBillingLabel}</span></span>
                </div>
                {daysLeft !== null && (
                  <div className="flex items-center gap-1 text-xs text-blue-400">
                    <Clock className="w-3 h-3" />
                    <span>{daysLeft}d away</span>
                  </div>
                )}
              </div>
            )}

            {/* Manage button */}
            <div className="flex gap-2">
              <Button
                onClick={openBillingPortal}
                disabled={loading}
                className="flex-1 bg-[#F5E642] hover:bg-[#F5E642]/90 text-[#0A1628] font-bold"
              >
                {loading ? (
                  <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Opening portal…</>
                ) : (
                  <><ExternalLink className="w-4 h-4 mr-2" /> Manage Payment</>
                )}
              </Button>
              <Button
                onClick={handleDownloadInvoice}
                disabled={loading}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                title="Download last invoice"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>

            {/* Cancel (destructive, secondary) */}
            <button
              onClick={() => setCancelOpen(true)}
              className="w-full text-xs text-blue-400/60 hover:text-red-400 transition-colors py-1"
            >
              Cancel subscription
            </button>
          </CardContent>
        </Card>

        {/* Referral Credits Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Gift className="w-4 h-4 text-purple-500" />
              Referral Credits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(referralCreditAmount)}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  From {directRecruits} direct recruit{directRecruits !== 1 ? "s" : ""} · 10% subscription override
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            {directRecruits === 0 ? (
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                <p className="text-xs text-purple-700 leading-relaxed">
                  <span className="font-semibold">Unlock referral credits:</span> Recruit your first pro and earn 10% of their $149/mo subscription — that's $14.90/mo recurring, automatically credited each cycle.
                </p>
              </div>
            ) : (
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                <p className="text-xs text-purple-700 leading-relaxed">
                  You earn <span className="font-semibold">{formatCurrency(directRecruits * 149 * 0.10)}/mo</span> in recurring subscription overrides from your {directRecruits} recruit{directRecruits !== 1 ? "s" : ""}. Each additional recruit adds ${(149 * 0.10).toFixed(2)}/mo.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payout Account Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Payout Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {connectStatus?.stripeConnectStatus === "active" ? (
              <div className="flex items-center gap-3 text-green-700 bg-green-50 rounded-lg p-3">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Bank account connected</p>
                  {connectStatus.bankAccountLast4 && (
                    <p className="text-xs text-green-600">Account ending in {connectStatus.bankAccountLast4}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-amber-700 bg-amber-50 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <div>
                  <p className="text-sm font-medium">No payout account connected</p>
                  <p className="text-xs text-amber-600">Connect your bank account to receive commission payouts.</p>
                </div>
              </div>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.href = "/dashboard/settings"}
            >
              Manage Payout Account
            </Button>
          </CardContent>
        </Card>

        {/* Help */}
        <p className="text-xs text-gray-400 text-center">
          Questions about billing? Contact us at support@prolnk.xyz
        </p>
      </div>

      {/* Cancel Confirmation Modal */}
      <Dialog open={cancelOpen} onOpenChange={(o) => { if (!o) setCancelOpen(false); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              Cancel Subscription
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-gray-700 font-medium">
              Are you sure you want to cancel your Founding Network Membership?
            </p>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 space-y-2 text-sm text-red-700">
              <p className="font-semibold">You will permanently lose:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Your $149/mo locked founding rate — you cannot re-join at this price</li>
                <li>All active origination rights on documented homes</li>
                <li>Your position in the commission cascade network</li>
                <li>Access to the lead feed and partner dashboard</li>
              </ul>
            </div>
            <p className="text-xs text-gray-500">
              Cancellation takes effect at the end of your current billing period. You will continue to have access until then.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              Keep My Membership
            </Button>
            <Button
              variant="destructive"
              disabled={cancelling}
              onClick={handleConfirmCancel}
            >
              {cancelling ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Processing…</> : "Yes, Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PartnerLayout>
  );
}
