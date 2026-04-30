/**
 * Wave 114 — Tier Upgrade Flow + Pricing Add-Ons Interactive Selector
 * Multi-step: (1) Select tier, (2) Select add-ons, (3) Confirm + Stripe checkout
 */
import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  Zap, CheckCircle, ArrowRight, Star, TrendingUp,
  DollarSign, Users, Shield, Crown, ChevronRight, X,
  Plus, Minus, Camera, BarChart2, Megaphone, Headphones,
  ArrowLeft, ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// ── Tier Config ───────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "scout",
    name: "Scout",
    icon: Shield,
    color: "#6B7280",
    bg: "#F9FAFB",
    border: "#E5E7EB",
    monthlyFee: 0,
    keepRate: 40,
    commissionCap: "$500/mo",
    seats: 1,
    features: [
      "1 user seat",
      "AI opportunity detection",
      "Commission tracking dashboard",
      "FSM integration (Jobber, HCP)",
      "Keep 40% of every referral",
    ],
    cta: "Current Plan",
  },
  {
    id: "pro",
    name: "Pro",
    icon: Zap,
    color: "#0A1628",
    bg: "#F0F4FF",
    border: "#0A1628",
    monthlyFee: 79,
    keepRate: 65,
    commissionCap: "No cap",
    seats: 5,
    popular: true,
    features: [
      "Up to 5 user seats",
      "Priority lead routing",
      "FSM integration (all platforms)",
      "Keep 65% of every referral",
      "No commission cap",
      "API & webhook access",
      "Bi-weekly performance report",
      "Event-driven leads + residual commissions",
    ],
    cta: "Upgrade to Pro",
  },
  {
    id: "company",
    name: "Company",
    icon: Crown,
    color: "#7C3AED",
    bg: "#FAF5FF",
    border: "#7C3AED",
    monthlyFee: null,
    keepRate: 78,
    commissionCap: "No cap",
    seats: 999,
    features: [
      "Unlimited user seats",
      "First-priority lead routing",
      "Keep up to 78% of every referral",
      "API & webhook access",
      "Dedicated support channel",
      "Quarterly strategy review",
      "Predictive revenue forecasting",
    ],
    cta: "Contact Sales",
  },
];

// ── Add-Ons Config ────────────────────────────────────────────────────────────
const ADD_ONS = [
  {
    id: "ai_photos",
    icon: Camera,
    color: "#0891b2",
    name: "AI Photo Boost",
    desc: "Unlimited AI scans per month (default: 50/mo). Ideal for high-volume crews.",
    price: 29,
    unit: "/mo",
    popular: true,
  },
  {
    id: "analytics_pro",
    icon: BarChart2,
    color: "#059669",
    name: "Analytics Pro",
    desc: "Advanced revenue forecasting, cohort analysis, and weekly PDF performance reports.",
    price: 19,
    unit: "/mo",
  },
  {
    id: "marketing_kit",
    icon: Megaphone,
    color: "#d97706",
    name: "Marketing Kit+",
    desc: "Co-branded digital ads, social media templates, and automated homeowner drip campaigns.",
    price: 39,
    unit: "/mo",
  },
  {
    id: "priority_support",
    icon: Headphones,
    color: "#7C3AED",
    name: "Priority Support",
    desc: "Dedicated Slack channel, 2-hour response SLA, and monthly 1:1 strategy call.",
    price: 49,
    unit: "/mo",
  },
];

// ── Upgrade Reasons ───────────────────────────────────────────────────────────
const UPGRADE_REASONS = [
  { icon: DollarSign, color: "#059669", title: "Earn 62.5% more per referral", desc: "Jump from 40% to 65% commission keep rate immediately." },
  { icon: TrendingUp, color: "#0891b2", title: "No commission cap", desc: "Scout caps at $500/mo. Pro partners earn unlimited commissions." },
  { icon: Zap, color: "#d97706", title: "Priority lead routing", desc: "Your team sees new leads before the general queue in your service area." },
  { icon: Users, color: "#7C3AED", title: "5 technician seats", desc: "Add your whole crew — each tech logs jobs and generates leads independently." },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function TierUpgradeFlow() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<string>("pro");
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());

  const { data: partner } = trpc.partners.getMyProfile.useQuery();
  const currentTier = (partner as any)?.partner?.tier ?? "scout";

  const createCheckout = trpc.stripe.createTierCheckout.useMutation({
    onSuccess: (data) => {
      if (data?.url) {
        toast.success("Redirecting to checkout…", { description: "Opening Stripe in a new tab." });
        window.open(data.url, "_blank");
      }
    },
    onError: (err: { message: string }) => {
      toast.error("Checkout error", { description: err.message });
    },
  });

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedTier = TIERS.find(t => t.id === selected)!;
  const addOnTotal = Array.from(selectedAddOns).reduce((sum, id) => {
    const ao = ADD_ONS.find(a => a.id === id);
    return sum + (ao?.price ?? 0);
  }, 0);
  const totalMonthly = (selectedTier.monthlyFee ?? 0) + addOnTotal;

  const handleFinalConfirm = () => {
    if (selected === "company") {
      navigate("/dashboard/ai");
      return;
    }
    createCheckout.mutate({
      tier: selected as "pro" | "crew" | "company" | "enterprise",
      origin: window.location.origin,
    });
  };

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => step > 1 ? setStep((step - 1) as 1 | 2 | 3) : navigate("/dashboard")} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> {step > 1 ? "Back" : "Dashboard"}
            </button>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-heading font-bold text-gray-900">
              {step === 1 ? "Choose Your Plan" : step === 2 ? "Add-Ons" : "Confirm Order"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  s === step ? "bg-[#0A1628] text-white" : s < step ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {s < step ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* ── STEP 1: Select Tier ── */}
        {step === 1 && (
          <>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full text-xs font-semibold text-yellow-700 mb-4">
                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                You're leaving money on the table
              </div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-3">
                Unlock 62.5% more commission per referral
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Pro partners on average earn <strong>3.2×</strong> more than Scout partners in their first 90 days.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {UPGRADE_REASONS.map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.title} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${r.color}18` }}>
                      <Icon className="w-5 h-5" style={{ color: r.color }} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-0.5">{r.title}</div>
                      <div className="text-xs text-gray-500">{r.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {TIERS.map((tier) => {
                const Icon = tier.icon;
                const isSelected = selected === tier.id;
                const isCurrent = tier.id === currentTier;
                return (
                  <div
                    key={tier.id}
                    onClick={() => !isCurrent && setSelected(tier.id)}
                    className={`relative rounded-2xl border-2 p-6 transition-all cursor-pointer ${
                      isCurrent ? "opacity-60 cursor-not-allowed" : ""
                    } ${isSelected && !isCurrent ? "shadow-lg" : "hover:shadow-md"}`}
                    style={{
                      borderColor: isSelected && !isCurrent ? tier.color : "#E5E7EB",
                      backgroundColor: isSelected && !isCurrent ? tier.bg : "white",
                    }}
                  >
                    {tier.popular && !isCurrent && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: tier.color }}>
                        MOST POPULAR
                      </div>
                    )}
                    {isCurrent && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-600">
                        CURRENT
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tier.color}18` }}>
                        <Icon className="w-5 h-5" style={{ color: tier.color }} />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-gray-900">{tier.name}</div>
                        <div className="text-xs text-gray-400">
                          {tier.monthlyFee === null ? "Custom pricing" : tier.monthlyFee === 0 ? "Free" : `$${tier.monthlyFee}/mo`}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="text-lg font-heading font-bold" style={{ color: tier.color }}>{tier.keepRate}%</div>
                        <div className="text-[10px] text-gray-400">Keep Rate</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="text-sm font-heading font-bold text-gray-700">{tier.commissionCap}</div>
                        <div className="text-[10px] text-gray-400">Cap</div>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {tier.features.slice(0, 5).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                          {f}
                        </li>
                      ))}
                      {tier.features.length > 5 && (
                        <li className="text-xs text-gray-400 pl-5">+{tier.features.length - 5} more features</li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button
                onClick={() => setStep(2)}
                disabled={selected === currentTier}
                className="px-8 py-3 text-base font-bold flex items-center gap-2"
                style={{ backgroundColor: "#0A1628" }}
              >
                Next: Choose Add-Ons <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-gray-400">No contracts. Cancel or downgrade anytime.</p>
            </div>
          </>
        )}

        {/* ── STEP 2: Add-Ons ── */}
        {step === 2 && (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Supercharge Your Plan</h2>
              <p className="text-gray-500 text-sm">Add optional modules to your <strong>{selectedTier.name}</strong> plan. Skip any you don't need.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {ADD_ONS.map((ao) => {
                const Icon = ao.icon;
                const isOn = selectedAddOns.has(ao.id);
                return (
                  <div
                    key={ao.id}
                    onClick={() => toggleAddOn(ao.id)}
                    className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all ${
                      isOn ? "shadow-lg" : "hover:shadow-md border-gray-200 bg-white"
                    }`}
                    style={isOn ? { borderColor: ao.color, backgroundColor: `${ao.color}08` } : {}}
                  >
                    {ao.popular && (
                      <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: ao.color }}>
                        POPULAR
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ao.color}18` }}>
                        <Icon className="w-5 h-5" style={{ color: ao.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">{ao.name}</span>
                          <span className="font-bold text-sm" style={{ color: ao.color }}>${ao.price}{ao.unit}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{ao.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isOn ? "text-white" : "border-2 border-gray-300 text-gray-400 hover:border-gray-500"
                        }`}
                        style={isOn ? { backgroundColor: ao.color } : {}}
                      >
                        {isOn ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary bar */}
            <div className="sticky bottom-4 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-400">Monthly total</p>
                <p className="text-2xl font-heading font-bold text-gray-900">
                  ${totalMonthly}<span className="text-sm font-normal text-gray-400">/mo</span>
                </p>
                {selectedAddOns.size > 0 && (
                  <p className="text-xs text-gray-400">{selectedTier.name} ${selectedTier.monthlyFee} + {selectedAddOns.size} add-on{selectedAddOns.size !== 1 ? "s" : ""} ${addOnTotal}</p>
                )}
              </div>
              <Button
                onClick={() => setStep(3)}
                className="px-6 py-3 font-bold flex items-center gap-2"
                style={{ backgroundColor: "#0A1628" }}
              >
                Review Order <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}

        {/* ── STEP 3: Confirm ── */}
        {step === 3 && (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Review Your Order</h2>
              <p className="text-gray-500 text-sm">Everything looks good? Confirm to proceed to Stripe checkout.</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Tier line */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${selectedTier.color}18` }}>
                    <selectedTier.icon className="w-5 h-5" style={{ color: selectedTier.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedTier.name} Plan</p>
                    <p className="text-xs text-gray-400">{selectedTier.keepRate}% keep rate · {selectedTier.commissionCap} cap</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">${selectedTier.monthlyFee ?? "Custom"}<span className="text-xs font-normal text-gray-400">/mo</span></p>
              </div>

              {/* Add-on lines */}
              {Array.from(selectedAddOns).map(id => {
                const ao = ADD_ONS.find(a => a.id === id)!;
                const Icon = ao.icon;
                return (
                  <div key={id} className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ao.color}18` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: ao.color }} />
                      </div>
                      <p className="text-sm text-gray-700">{ao.name}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">+${ao.price}<span className="text-xs font-normal text-gray-400">/mo</span></p>
                  </div>
                );
              })}

              {/* Total */}
              <div className="p-5 bg-gray-50 flex items-center justify-between">
                <p className="font-heading font-bold text-gray-900">Total</p>
                <p className="text-2xl font-heading font-bold text-gray-900">${totalMonthly}<span className="text-sm font-normal text-gray-400">/mo</span></p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
              <strong>Test card:</strong> 4242 4242 4242 4242 · Any future expiry · Any CVC
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button
                onClick={handleFinalConfirm}
                disabled={createCheckout.isPending}
                className="px-8 py-3 text-base font-bold flex items-center gap-2 w-full max-w-sm justify-center"
                style={{ backgroundColor: "#0A1628" }}
              >
                {createCheckout.isPending ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</span>
                ) : (
                  <><ShoppingCart className="w-4 h-4" /> Proceed to Checkout <ChevronRight className="w-4 h-4" /></>
                )}
              </Button>
              <p className="text-xs text-gray-400">Secure payment via Stripe. No contracts. Cancel anytime.</p>
            </div>
          </>
        )}
      </div>
    </div>

    </PartnerLayout>

  );
}
