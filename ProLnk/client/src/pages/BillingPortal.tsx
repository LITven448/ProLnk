/**
 * Billing Portal — partners can view their plan and manage subscription via Stripe
 */
import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ExternalLink, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const TIER_LABELS: Record<string, { label: string; color: string; amount: string }> = {
  scout:      { label: "Scout (Free)",   color: "bg-gray-100 text-gray-700",    amount: "$0/mo" },
  pro:        { label: "Pro",            color: "bg-blue-100 text-blue-700",    amount: "$29/mo" },
  crew:       { label: "Crew",           color: "bg-indigo-100 text-indigo-700", amount: "$79/mo" },
  company:    { label: "Company",        color: "bg-purple-100 text-purple-700", amount: "$149/mo" },
  enterprise: { label: "Enterprise",    color: "bg-amber-100 text-amber-800",   amount: "$299/mo" },
};

export default function BillingPortal() {
  const [loading, setLoading] = useState(false);
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
      toast.success("Redirecting to Stripe billing portal...");
    } catch (err: any) {
      toast.error(err?.message ?? "Could not open billing portal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tier = subInfo?.tier ?? "scout";
  const tierInfo = TIER_LABELS[tier] ?? TIER_LABELS.scout;
  const isFreeTier = tier === "scout";

  return (
    <PartnerLayout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Billing & Subscription</h1>
            <p className="text-sm text-gray-500">Manage your ProLnk plan and payment method</p>
          </div>
        </div>

        {/* Current Plan Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Current Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={`${tierInfo.color} border-0 font-semibold`}>{tierInfo.label}</Badge>
                <span className="text-sm text-gray-500">{tierInfo.amount}</span>
              </div>
              {subInfo?.trialStatus === "trial" && (
                <Badge className="bg-green-100 text-green-700 border-0 text-xs">Free Trial Active</Badge>
              )}
            </div>

            {subInfo?.trialEndsAt && subInfo.trialStatus === "trial" && (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Trial ends {new Date(subInfo.trialEndsAt).toLocaleDateString()}. Add a payment method to keep your plan.</span>
              </div>
            )}

            {!isFreeTier && (
              <Button
                onClick={openBillingPortal}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {loading ? (
                  <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Opening portal...</>
                ) : (
                  <><ExternalLink className="w-4 h-4 mr-2" /> Manage Subscription in Stripe</>
                )}
              </Button>
            )}

            {isFreeTier && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 mb-3">You're on the free Scout plan.</p>
                <Button
                  variant="outline"
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  onClick={() => window.location.href = "/dashboard/tier"}
                >
                  Upgrade Your Plan
                </Button>
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
          Questions about billing? Contact us through the AI Assistant or email support@prolnk.io
        </p>
      </div>
    </PartnerLayout>
  );
}
