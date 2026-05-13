import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  CreditCard, ExternalLink, RefreshCw, CheckCircle, AlertCircle,
  Lock, Star, Calendar, XCircle,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function BillingPortal() {
  const [loading, setLoading] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const { data: subInfo } = trpc.stripe.getSubscriptionInfo.useQuery();
  const { data: connectStatus } = trpc.stripe.getConnectStatus.useQuery();
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
      toast.error("Could not open cancellation flow. Please contact support@prolnk.io.");
    } finally {
      setCancelling(false);
    }
  };

  const isFoundingMember = !subInfo?.tier || subInfo.tier === "founding" || subInfo.tier === "company";
  const isTrial = subInfo?.trialStatus === "trial";

  const nextBillingLabel = subInfo?.trialEndsAt && isTrial
    ? new Date(subInfo.trialEndsAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : subInfo?.nextBillingDate
    ? new Date(subInfo.nextBillingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

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

            {/* Next billing date */}
            {nextBillingLabel && (
              <div className="flex items-center gap-2 text-blue-300 text-sm">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Next billing date: <span className="font-semibold text-white">{nextBillingLabel}</span></span>
              </div>
            )}

            {/* Manage button */}
            <Button
              onClick={openBillingPortal}
              disabled={loading}
              className="w-full bg-[#F5E642] hover:bg-[#F5E642]/90 text-[#0A1628] font-bold"
            >
              {loading ? (
                <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Opening portal…</>
              ) : (
                <><ExternalLink className="w-4 h-4 mr-2" /> Manage Payment Method</>
              )}
            </Button>

            {/* Cancel (destructive, secondary) */}
            <button
              onClick={() => setCancelOpen(true)}
              className="w-full text-xs text-blue-400/60 hover:text-red-400 transition-colors py-1"
            >
              Cancel subscription
            </button>
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
          Questions about billing? Contact us at support@prolnk.io
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
