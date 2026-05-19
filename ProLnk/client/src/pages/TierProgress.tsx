import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import {
  Star, Trophy, TrendingUp, CheckCircle, Lock, AlertCircle,
  CreditCard, Loader2, Users, Home, Briefcase, Network,
  Zap, DollarSign, ChevronRight, CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useEffect } from "react";

const TIERS = [
  {
    name: "Scout",
    key: "scout",
    color: "text-slate-600″,
    bg: "bg-slate-50″,
    border: "border-slate-200″,
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
    bg: "bg-[#F5E642]/10″,
    border: "border-[#0A1628]/20″,
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
    color: "text-indigo-600″,
    bg: "bg-indigo-50″,
    border: "border-indigo-200″,
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
    color: "text-amber-600″,
    bg: "bg-amber-50″,
    border: "border-amber-200″,
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
    color: "text-slate-100″,
    bg: "bg-slate-900″,
    border: "border-slate-700″,
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

const INCOME_STREAMS = [
  {
    icon: DollarSign,
    label: "Direct Commission",
    description: "Keep your tier rate on every matched job you close",
    example: "e.g. 72% of a $2,000 job = $1,440 to you",
    color: "text-teal-400″,
    bg: "bg-teal-500/10″,
    border: "border-teal-500/20″,
  },
  {
    icon: Network,
    label: "Network Override",
    description: "Earn 7% on jobs your Level 1 recruits close, 4% on Level 2, 2% on Level 3, 1% on Level 4″,
    example: "e.g. Your recruit closes $5,000 → $350 passive",
    color: "text-blue-400″,
    bg: "bg-blue-500/10″,
    border: "border-blue-500/20″,
  },
  {
    icon: Users,
    label: "Subscription Override",
    description: "Earn 12% recurring on every $149/mo subscription your referred pros pay",
    example: "e.g. 10 referred pros = $178.80/mo passive",
    color: "text-purple-400″,
    bg: "bg-purple-500/10″,
    border: "border-purple-500/20″,
  },
  {
    icon: Briefcase,
    label: "Homeowner Sourcing",
    description: "Negotiate a per-lead fee with ProLnk for homeowners you bring onto the platform",
    example: "Typical range: $25–$100 per qualified homeowner",
    color: "text-amber-400″,
    bg: "bg-amber-500/10″,
    border: "border-amber-500/20″,
  },
  {
    icon: Home,
    label: "Home Origination Rights",
    description: "1.5% of every future job at homes you document in the Home Health Vault — forever",
    example: "e.g. Help 50 homes → earn on every job booked at those addresses",
    color: "text-rose-400″,
    bg: "bg-rose-500/10″,
    border: "border-rose-500/20″,
  },
];

const LEVEL_UP_TIPS = [
  { icon: Zap, tip: "Close 3 jobs this week to accelerate your match score and get priority routing." },
  { icon: Users, tip: "Invite one qualified pro per week. 10 Level-1 recruits unlocks network income in 10 weeks." },
  { icon: Home, tip: "Document homes after every job visit. Each home = 1.5% perpetual origination rights." },
  { icon: Star, tip: "Maintain a 4.8+ rating. High-rated pros get first look at premium leads." },
  { icon: TrendingUp, tip: "Upgrade your tier to unlock higher keep rates — every % point compounds at scale." },
];

export default function TierProgress() {
  const { data: profile, isLoading } = trpc.partners.getMyProfile.useQuery();
  const partner = profile?.stats;

  const currentTierKey = (partner as any)?.tier ?? "scout";
  const currentTierIdx = TIER_ORDER.indexOf(currentTierKey);
  const currentTier = TIERS[currentTierIdx] ?? TIERS[0];
  const nextTier = currentTierIdx < TIERS.length - 1 ? TIERS[currentTierIdx + 1] : null;

  const isExempt = (partner as any)?.isExempt;
  const monthlyEarned = parseFloat((partner as any)?.monthlyCommissionEarned ?? "0″);
  const cap = currentTier.commissionCap;
  const capUsedPct = cap ? Math.min(100, Math.round((monthlyEarned / cap) * 100)) : 0;

  const joinDate = (partner as any)?.createdAt
    ? new Date((partner as any).createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  const trialActive = (partner as any)?.trialEndsAt
    ? new Date((partner as any).trialEndsAt) > new Date()
    : false;

  const trialEndsAt = (partner as any)?.trialEndsAt
    ? new Date((partner as any).trialEndsAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  const createTierCheckout = trpc.stripe.createTierCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        toast.info("Redirecting to secure checkout...");
        window.open(data.url, "_blank");
      }
    },
    onError: (err) => toast.error(err.message || "Failed to start checkout"),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const upgradeStatus = params.get("upgrade");
    const upgradedTier = params.get("tier");
    if (upgradeStatus === "success" && upgradedTier) {
      toast.success(`Welcome to ${upgradedTier.charAt(0).toUpperCase() + upgradedTier.slice(1)}! Your tier has been upgraded.`);
      window.history.replaceState({}, "", window.location.pathname);
    } else if (upgradeStatus === "cancelled") {
      toast.info("Upgrade cancelled. You can upgrade anytime from this page.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center h-64″>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A1628]" />
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="space-y-8″>

        {/* Hero: Current Tier */}
        <div className="rounded-2xl overflow-hidden border border-slate-700 bg-gradient-to-br from-[#0A1628] to-[#0d1f3c]">
          <div className="p-6 sm:p-8″>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4″>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-widest font-medium mb-1″>Your Current Tier</p>
                <div className="flex items-center gap-3 mb-2″>
                  <h2 className="text-3xl font-heading font-bold text-white">{currentTier.name}</h2>
                  {isExempt && <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30″>Exempt</Badge>}
                  {trialActive && <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30″>Trial Active</Badge>}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400″>
                  {joinDate && (
                    <span className="flex items-center gap-1.5″>
                      <CalendarDays className="h-3.5 w-3.5″ />
                      Joined {joinDate}
                    </span>
                  )}
                  {trialActive && trialEndsAt && (
                    <span className="flex items-center gap-1.5 text-amber-400″>
                      <Zap className="h-3.5 w-3.5″ />
                      90-day trial ends {trialEndsAt}
                    </span>
                  )}
                  {!trialActive && !isExempt && (
                    <span className="text-slate-500″>
                      {currentTier.monthlyFee === 0 ? "Free plan" : `$${currentTier.monthlyFee}/month`}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-5xl font-heading font-bold text-white">
                  {isExempt ? "100%" : `${(currentTier.keepRate * 100).toFixed(0)}%`}
                </div>
                <div className="text-slate-400 text-sm mt-1″>commission keep rate</div>
                {isExempt && <div className="text-teal-400 text-xs mt-1″>No platform fee</div>}
              </div>
            </div>

            {/* Trial notice */}
            {trialActive && trialEndsAt && (
              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-300″>
                Your 90-day Founding Network trial is active. On {trialEndsAt}, billing of $149/mo begins automatically — your rate is locked in permanently.
              </div>
            )}

            {/* Cap bar */}
            {cap && !isExempt && (
              <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20″>
                <div className="flex items-center gap-2 mb-2″>
                  <AlertCircle className="h-4 w-4 text-amber-400″ />
                  <span className="text-sm font-semibold text-amber-300″>Monthly Commission Cap: ${cap}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-2″>
                  <div
                    className="bg-amber-400 h-2 rounded-full transition-all"
                    style={{ width: `${capUsedPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-amber-400″>
                  <span>${monthlyEarned.toFixed(0)} earned this month</span>
                  <span>${cap} cap</span>
                </div>
                <p className="text-xs text-slate-400 mt-2″>
                  Upgrade to Pro ($29/mo) to remove this cap and keep earning without limits.
                </p>
              </div>
            )}

            {/* Current tier perks */}
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-1.5″>
              {currentTier.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-sm text-slate-300″>
                  <CheckCircle className="h-4 w-4 shrink-0 text-teal-400″ />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5 Income Streams */}
        <div>
          <h3 className="text-lg font-heading font-bold text-[#0A1628] mb-1″>Your 5 Income Streams</h3>
          <p className="text-sm text-slate-500 mb-4″>
            ProLnk partners earn through five compounding revenue channels — active and passive.
          </p>
          <div className="grid grid-cols-1 gap-3″>
            {INCOME_STREAMS.map((stream) => {
              const Icon = stream.icon;
              return (
                <div
                  key={stream.label}
                  className={`rounded-xl p-4 border ${stream.bg} ${stream.border} flex items-start gap-4`}
                >
                  <div className={`rounded-lg p-2 ${stream.bg} border ${stream.border} shrink-0`}>
                    <Icon className={`h-5 w-5 ${stream.color}`} />
                  </div>
                  <div className="flex-1 min-w-0″>
                    <p className={`font-semibold text-sm ${stream.color}`}>{stream.label}</p>
                    <p className="text-sm text-slate-700 mt-0.5″>{stream.description}</p>
                    <p className="text-xs text-slate-500 mt-1 italic">{stream.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTier && !isExempt && (
          <div>
            <h3 className="text-lg font-heading font-bold text-[#0A1628] mb-1″>Progress to {nextTier.name}</h3>
            <p className="text-sm text-slate-500 mb-4″>
              Unlock a higher keep rate and more seats by upgrading your plan.
            </p>
            <div className="rounded-2xl p-6 border-2 border-dashed border-[#0A1628]/20 bg-gradient-to-br from-teal-50 to-indigo-50″>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5″>
                <div className="text-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-2xl font-bold text-[#0A1628]">{(nextTier.keepRate * 100).toFixed(0)}%</div>
                  <div className="text-xs text-slate-500 mt-1″>keep rate at {nextTier.name}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-2xl font-bold text-[#0A1628]">
                    {nextTier.seats === 999 ? "∞" : nextTier.seats}
                  </div>
                  <div className="text-xs text-slate-500 mt-1″>team seats</div>
                </div>
                <div className="text-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-2xl font-bold text-[#0A1628]">${nextTier.monthlyFee}/mo</div>
                  <div className="text-xs text-slate-500 mt-1″>platform fee</div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4″>
                <p className="text-sm text-slate-600″>
                  Upgrade to <strong className="text-[#0A1628]">{nextTier.name}</strong> and keep{" "}
                  <strong className="text-[#0A1628]">{(nextTier.keepRate * 100).toFixed(0)}%</strong> of every commission.
                  {currentTier.commissionCap ? " Commission cap removed." : ""}
                </p>
                <Button
                  className="shrink-0 gap-2″
                  style={{ backgroundColor: "#0A1628″, color: "white" }}
                  disabled={createTierCheckout.isPending}
                  onClick={() =>
                    createTierCheckout.mutate({
                      tier: nextTier.key as "pro" | "crew" | "company" | "enterprise",
                      origin: window.location.origin,
                    })
                  }
                >
                  {createTierCheckout.isPending ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    <><CreditCard className="h-4 w-4″ /> Upgrade Now</>
                  )}
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-3″>
                Secure checkout via Stripe. Cancel anytime.
              </p>
            </div>
          </div>
        )}

        {/* How to level up tips */}
        <div>
          <h3 className="text-lg font-heading font-bold text-[#0A1628] mb-1″>How to Level Up</h3>
          <p className="text-sm text-slate-500 mb-4″>
            Actions you can take this week to grow your income and tier standing.
          </p>
          <div className="space-y-2″>
            {LEVEL_UP_TIPS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#0A1628]/20 transition-colors"
                >
                  <div className="rounded-lg p-1.5 bg-[#0A1628]/5 shrink-0″>
                    <Icon className="h-4 w-4 text-[#0A1628]" />
                  </div>
                  <p className="text-sm text-slate-700″>{item.tip}</p>
                  <ChevronRight className="h-4 w-4 text-slate-300 shrink-0 mt-0.5″ />
                </div>
              );
            })}
          </div>
        </div>

        {/* All tiers comparison */}
        <div>
          <h3 className="text-lg font-heading font-bold text-[#0A1628] mb-4″>All Plans</h3>
          <div className="space-y-3″>
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
                      ? "bg-gray-50 border-gray-100 opacity-60″
                      : "bg-white border-gray-100″
                  }`}
                >
                  <div className="flex-1″>
                    <div className="flex items-center gap-2″>
                      <span className={`font-heading text-sm font-semibold ${isActive ? tier.color : "text-gray-700"}`}>
                        {tier.name}
                      </span>
                      {isActive && <Badge className="bg-[#0A1628] text-white text-xs">Current</Badge>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5″>
                      {tier.monthlyFee === 0 ? "Free" : `$${tier.monthlyFee}/mo`}
                      {"  ·  "}Keep {(tier.keepRate * 100).toFixed(0)}%
                      {tier.commissionCap ? `  ·  $${tier.commissionCap}/mo cap` : ""}
                      {"  ·  "}{tier.seats === 999 ? "Unlimited" : `${tier.seats}`} seat{tier.seats !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {isLocked ? (
                    <Lock className="h-4 w-4 text-gray-300″ />
                  ) : isActive ? (
                    <CheckCircle className="h-4 w-4 text-[#0A1628]" />
                  ) : isUpgradeable && tier.key !== "scout" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 px-2 border-[#0A1628]/30 text-[#0A1628] hover:bg-[#F5E642]/10″
                      disabled={createTierCheckout.isPending}
                      onClick={() =>
                        createTierCheckout.mutate({
                          tier: tier.key as "pro" | "crew" | "company" | "enterprise",
                          origin: window.location.origin,
                        })
                      }
                    >
                      {createTierCheckout.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Upgrade"}
                    </Button>
                  ) : (
                    <CheckCircle className="h-4 w-4 text-gray-300″ />
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
