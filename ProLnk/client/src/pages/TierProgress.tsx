import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Star, Trophy, TrendingUp, CheckCircle, Lock, AlertCircle, CreditCard, Loader2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useEffect } from "react";

const TIERS = [
  {
    name: "Scout",
    key: "scout",
    color: "text-slate-600",
    bg: "bg-slate-50",
    border: "border-slate-200",
    icon: "[SEARCH]",
    monthlyFee: 0,
    keepRate: 0.40,
    commissionCap: 500,
    seats: 1,
    perks: [
      "1 user seat",
      "AI opportunity detection",
      "Commission tracking dashboard",
      "FSM integration (all platforms)",
      "Keep 40% of every referral commission",
      "$500/mo commission cap",
    ],
  },
  {
    name: "Pro",
    key: "pro",
    color: "text-[#0A1628]",
    bg: "bg-[#F5E642]/10",
    border: "border-[#0A1628]/20",
    icon: "",
    monthlyFee: 29,
    keepRate: 0.55,
    commissionCap: null,
    seats: 3,
    perks: [
      "Up to 3 user seats",
      "Priority lead routing",
      "FSM integration (all platforms)",
      "Keep 55% of every referral commission",
      "No monthly commission cap",
    ],
  },
  {
    name: "Crew",
    key: "crew",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    icon: "",
    monthlyFee: 79,
    keepRate: 0.65,
    commissionCap: null,
    seats: 5,
    perks: [
      "Up to 5 user seats",
      "Priority lead routing",
      "FSM integration (all platforms)",
      "Keep 65% of every referral commission",
      "Bi-weekly performance report",
    ],
  },
  {
    name: "Company",
    key: "company",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "",
    monthlyFee: 149,
    keepRate: 0.72,
    commissionCap: null,
    seats: 15,
    perks: [
      "Up to 15 user seats",
      "First-priority lead routing",
      "FSM integration (all platforms)",
      "Keep 72% of every referral commission",
      "Dedicated support channel",
    ],
  },
  {
    name: "Enterprise",
    key: "enterprise",
    color: "text-slate-100",
    bg: "bg-slate-900",
    border: "border-slate-700",
    icon: "[AWARD]",
    monthlyFee: 299,
    keepRate: 0.78,
    commissionCap: null,
    seats: 999,
    perks: [
      "Unlimited user seats",
      "First-priority lead routing",
      "FSM integration (all platforms)",
      "Keep 78% of every referral commission",
      "Quarterly strategy review call",
    ],
  },
];

const TIER_ORDER = ["scout", "pro", "crew", "company", "enterprise"];

export default function TierProgress() {
  const { data: profile, isLoading } = trpc.partners.getMyProfile.useQuery();
  const partner = profile?.partner;

  const currentTierKey = partner?.tier ?? "scout";
  const currentTierIdx = TIER_ORDER.indexOf(currentTierKey);
  const currentTier = TIERS[currentTierIdx] ?? TIERS[0];
  const nextTier = currentTierIdx < TIERS.length - 1 ? TIERS[currentTierIdx + 1] : null;

  const isExempt = (partner as any)?.isExempt;
  const monthlyEarned = parseFloat((partner as any)?.monthlyCommissionEarned ?? "0");
  const cap = currentTier.commissionCap;
  const capUsedPct = cap ? Math.min(100, Math.round((monthlyEarned / cap) * 100)) : 0;

  const createTierCheckout = trpc.stripe.createTierCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        toast.info("Redirecting to secure checkout...");
        window.open(data.url, "_blank");
      }
    },
    onError: (err) => toast.error(err.message || "Failed to start checkout"),
  });

  // Handle Stripe redirect back
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const upgradeStatus = params.get("upgrade");
    const upgradedTier = params.get("tier");
    if (upgradeStatus === "success" && upgradedTier) {
      toast.success(`[SUCCESS] Welcome to ${upgradedTier.charAt(0).toUpperCase() + upgradedTier.slice(1)}! Your tier has been upgraded.`);
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
    } else if (upgradeStatus === "cancelled") {
      toast.info("Upgrade cancelled. You can upgrade anytime from this page.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A1628]" />
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading text-gray-900">Your Plan</h1>
          <p className="text-gray-500 text-sm mt-1">
            Your commission keep rate and team seats are determined by your subscription plan.
          </p>
        </div>

        {/* Current tier card */}
        <div className={`rounded-2xl p-6 border-2 ${currentTier.bg} ${currentTier.border}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{currentTier.icon}</span>
                <h2 className={`text-xl font-heading ${currentTier.color}`}>{currentTier.name}</h2>
                {isExempt && (
                  <Badge className="bg-[#0A1628] text-white text-xs">Exempt</Badge>
                )}
              </div>
              <p className={`text-sm ${currentTier.key === "enterprise" ? "text-slate-400" : "text-gray-500"}`}>
                {currentTier.monthlyFee === 0 ? "Free plan" : `$${currentTier.monthlyFee}/month`}
                {isExempt ? "  No fees, no splits" : ""}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-heading font-bold ${currentTier.color}`}>
                {isExempt ? "100%" : `${(currentTier.keepRate * 100).toFixed(0)}%`}
              </div>
              <div className={`text-xs ${currentTier.key === "enterprise" ? "text-slate-400" : "text-gray-500"}`}>
                commission keep rate
              </div>
            </div>
          </div>

          {/* Scout cap warning */}
          {cap && !isExempt && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-700">Monthly Commission Cap: ${cap}</span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2 mb-1">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all"
                  style={{ width: `${capUsedPct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-amber-600">
                <span>${monthlyEarned.toFixed(0)} earned this month</span>
                <span>${cap} cap</span>
              </div>
              <p className="text-xs text-amber-600 mt-2">
                Upgrade to Pro ($29/mo) to remove this cap and keep earning without limits.
              </p>
            </div>
          )}

          {/* Perks list */}
          <ul className="mt-4 space-y-1.5">
            {currentTier.perks.map((perk) => (
              <li key={perk} className={`flex items-center gap-2 text-sm ${currentTier.key === "enterprise" ? "text-slate-300" : "text-gray-700"}`}>
                <CheckCircle className="h-4 w-4 shrink-0 text-[#0A1628]" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Upgrade CTA */}
        {nextTier && !isExempt && (
          <div className="rounded-2xl p-6 border-2 border-dashed border-[#0A1628]/20 bg-gradient-to-br from-teal-50 to-indigo-50">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{nextTier.icon}</span>
                  <h3 className="font-heading text-gray-900">Upgrade to {nextTier.name}</h3>
                  <Badge variant="outline" className="text-xs border-[#0A1628]/30 text-[#0A1628]">
                    ${nextTier.monthlyFee}/mo
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Keep <strong className="text-[#0A1628]">{(nextTier.keepRate * 100).toFixed(0)}%</strong> of every commission
                  {currentTier.commissionCap ? "  No monthly cap" : ""}
                  {nextTier.seats !== 999 ? `  Up to ${nextTier.seats} seats` : "  Unlimited seats"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Secure checkout via Stripe  Cancel anytime  Test card: 4242 4242 4242 4242
                </p>
              </div>
              <Button
                className="shrink-0 gap-2"
                style={{ backgroundColor: "#0A1628", color: "white" }}
                disabled={createTierCheckout.isPending}
                onClick={() => createTierCheckout.mutate({
                  tier: nextTier.key as "pro" | "crew" | "company" | "enterprise",
                  origin: window.location.origin,
                })}
              >
                {createTierCheckout.isPending ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                ) : (
                  <><CreditCard className="h-4 w-4" /> Upgrade Now</>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* All tiers comparison */}
        <div>
          <h3 className="text-lg font-heading text-gray-900 mb-4">All Plans</h3>
          <div className="space-y-3">
            {TIERS.map((tier, idx) => {
              const isActive = tier.key === currentTierKey;
              const isLocked = idx > currentTierIdx;
              const isUpgradeable = !isActive && !isLocked;
              return (
                <div
                  key={tier.key}
                  className={`rounded-xl p-4 border flex items-center gap-4 transition-all ${
                    isActive
                      ? `${tier.bg} ${tier.border} shadow-sm`
                      : isLocked
                      ? "bg-gray-50 border-gray-100 opacity-60"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <span className="text-xl">{tier.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-heading text-sm ${isActive ? tier.color : "text-gray-700"}`}>
                        {tier.name}
                      </span>
                      {isActive && <Badge className="bg-[#0A1628] text-white text-xs">Current</Badge>}
                    </div>
                    <p className="text-xs text-gray-500">
                      {tier.monthlyFee === 0 ? "Free" : `$${tier.monthlyFee}/mo`}
                      {"  "}Keep {(tier.keepRate * 100).toFixed(0)}%
                      {tier.commissionCap ? `  $${tier.commissionCap}/mo cap` : ""}
                      {"  "}{tier.seats === 999 ? "Unlimited" : `${tier.seats}`} seat{tier.seats !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {isLocked ? (
                    <Lock className="h-4 w-4 text-gray-300" />
                  ) : isActive ? (
                    <CheckCircle className="h-4 w-4 text-[#0A1628]" />
                  ) : isUpgradeable && tier.key !== "scout" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 px-2 border-[#0A1628]/30 text-[#0A1628] hover:bg-[#F5E642]/10"
                      disabled={createTierCheckout.isPending}
                      onClick={() => createTierCheckout.mutate({
                        tier: tier.key as "pro" | "crew" | "company" | "enterprise",
                        origin: window.location.origin,
                      })}
                    >
                      {createTierCheckout.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Upgrade"}
                    </Button>
                  ) : (
                    <CheckCircle className="h-4 w-4 text-gray-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
