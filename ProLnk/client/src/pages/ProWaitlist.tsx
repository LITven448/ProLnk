import { useState, useMemo, useEffect } from "react";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import ProLnkLogo from "@/components/ProLnkLogo";
import { FadeUp, FadeIn, StaggerChildren, StaggerItem, CountUp } from "@/components/ScrollAnimations";
import { trpc } from "@/lib/trpc";
import type React from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Users, TrendingUp, DollarSign, Star, CheckCircle, ChevronDown, ChevronUp,
  ArrowRight, Zap, Camera, Menu, X, Shield, BadgeCheck, Play,
  Radar, CloudLightning, Clock, AlertTriangle, Home as HomeIcon, Eye, Repeat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// --- Design tokens ------------------------------------------------------------
// Navy: #0A1628  Yellow accent: #F5E642  Off-white bg: #FAFAF9
// Hero/final CTA bg: #050d1a

// --- Pricing -- 5 tiers with Network Income -----------------------------------------------
const PRICING_TIERS = [
  {
    name: "Scout",
    subtitle: "Free to join",
    monthlyFee: 0,
    keepRate: 0.40,
    commissionCap: 500,
    seats: 1,
    popular: false,
    cta: "Start Free",
    apiAccess: false,
    tier: "scout",
    networkIncome: false,
    features: [
      "1 user seat",
      "AI opportunity detection on all jobs",
      "Commission tracking dashboard",
      "FSM integration (Jobber, HCP, ServiceTitan)",
      "Keep 40% of every referral",
      "$500/mo earnings cap",
      "Event-driven leads (storm, aging, recalls)",
      "Mobile app access",
    ],
  },
  {
    name: "Pro",
    subtitle: "Build your network",
    monthlyFee: 49,
    keepRate: 0.55,
    commissionCap: null,
    seats: 3,
    popular: false,
    cta: "Get Pro",
    apiAccess: true,
    tier: "pro",
    networkIncome: true,
    networkRate: "0.5% L1",
    features: [
      "Up to 3 user seats",
      "Keep 55% of every referral",
      "No earnings cap",
      "Network income from 1 direct referral",
      "2% bonus on your own completed jobs",
      "API & webhook access",
      "Priority lead routing",
      "Weekly performance analytics",
      "FSM + AI integration",
    ],
  },
  {
    name: "Crew",
    subtitle: "Scale faster",
    monthlyFee: 99,
    keepRate: 0.65,
    commissionCap: null,
    seats: 10,
    popular: false,
    cta: "Get Crew",
    apiAccess: true,
    tier: "crew",
    networkIncome: true,
    networkRate: "1% L4 + bonuses",
    features: [
      "Up to 10 user seats",
      "Keep 65% of every referral",
      "Unlimited earnings",
      "Network income: 1% from 4th-level referrals",
      "2% bonus on your own jobs",
      "API & webhook access",
      "Priority lead routing",
      "Bi-weekly strategy reviews",
      "Custom FSM workflows",
      "Advanced analytics & forecasting",
    ],
  },
  {
    name: "Company",
    subtitle: "Most popular",
    monthlyFee: 149,
    keepRate: 0.72,
    commissionCap: null,
    seats: 25,
    popular: true,
    cta: "Get Company",
    apiAccess: true,
    tier: "company",
    networkIncome: true,
    networkRate: "1.5% L3, 1% L4",
    features: [
      "Up to 25 user seats",
      "Keep 72% of every referral",
      "Unlimited earnings",
      "Network income: 1.5% from L3 + 1% from L4",
      "2% bonus on your own jobs",
      "Dedicated API support",
      "First-priority lead routing",
      "Monthly strategy reviews",
      "Co-marketing opportunities",
      "Custom integrations",
      "Revenue forecasting",
    ],
  },
  {
    name: "Enterprise",
    subtitle: "Unlimited growth",
    monthlyFee: null,
    keepRate: 0.78,
    commissionCap: null,
    seats: 999,
    popular: false,
    cta: "Contact Sales",
    apiAccess: true,
    tier: "enterprise",
    networkIncome: true,
    networkRate: "2% all levels",
    features: [
      "Unlimited user seats",
      "Keep up to 78% of every referral",
      "Unlimited earnings",
      "Network income: 2% from ALL downline levels",
      "2% bonus on your own jobs",
      "Dedicated account manager",
      "White-label portal options",
      "Custom pricing & terms",
      "Integration development support",
      "Predictive revenue forecasting",
      "Exclusive partner events",
      "Strategic partnership opportunities",
    ],
  },
];

// --- Add-On Modules -----------------------------------------------------------
const ADD_ONS = [
  {
    id: "extra-seats",
    name: "Extra Seats",
    price: 15,
    unit: "per seat/mo",
    description: "Add individual technician logins beyond your tier limit.",
    icon: Users,
    perUnit: true,
    unitLabel: "seats",
    unitMin: 1,
    unitMax: 20,
  },
  {
    id: "priority-routing",
    name: "Priority Routing",
    price: 29,
    unit: "/mo",
    description: "Your team receives leads before the general queue in your service area.",
    icon: Zap,
    perUnit: false,
  },
  {
    id: "white-label-reports",
    name: "White-Label Reports",
    price: 19,
    unit: "/mo",
    description: "Branded PDF performance reports to share with clients or franchise owners.",
    icon: BadgeCheck,
    perUnit: false,
  },
  {
    id: "trustypro-connect",
    name: "TrustyPro Connect",
    price: 39,
    unit: "/mo",
    description: "Your profile listed on TrustyPro -- receive inbound homeowner leads directly.",
    icon: Star,
    perUnit: false,
  },
  {
    id: "preferred-routing",
    name: "Preferred Routing",
    price: 99,
    unit: "/mo",
    description: "Get first-look on every lead in your selected zip codes for 24 hours before the general queue. Competitors still receive the same leads.",
    icon: TrendingUp,
    perUnit: false,
  },
  {
    id: "co-marketing",
    name: "Co-Marketing Package",
    price: 149,
    unit: "/mo",
    description: "ProLnk-branded yard signs, door hangers, and digital assets co-branded with your logo.",
    icon: Camera,
    perUnit: false,
  },
];

// --- Who Can Join -------------------------------------------------------------
const WHO_CAN_JOIN = [
  { group: "Outdoor & Lawn", emoji: "", categories: ["Lawn Care & Mowing", "Landscaping & Design", "Tree Trimming & Removal", "Irrigation & Sprinklers", "Hardscaping & Patios", "Outdoor Lighting", "Drainage Solutions"] },
  { group: "Home Maintenance", emoji: "[TOOL]", categories: ["Handyman Services", "Fencing & Gates", "Roofing & Gutters", "HVAC Service & Repair", "Plumbing", "Electrical", "Garage Door Service", "Foundation Repair"] },
  { group: "Cleaning & Restoration", emoji: "[SPARK]", categories: ["House Cleaning", "Pressure Washing", "Window Cleaning", "Carpet Cleaning", "Gutter Cleaning", "Junk Removal", "Mold Remediation"] },
  { group: "Specialty Trades", emoji: "", categories: ["Interior & Exterior Painting", "Pool Service & Repair", "Pest Control", "Security Systems", "Solar Installation", "Kitchen & Bath Remodeling"] },
  { group: "Pet & Animal", emoji: "", categories: ["Pet Waste Removal", "Dog Walking & Pet Sitting", "Pet Grooming"] },
];

// --- FAQ ----------------------------------------------------------------------
const FAQS = [
  {
    q: "Is there a money-back guarantee?",
    a: "Yes. If you don't receive at least 3 qualified inbound leads in your first 30 days, we'll refund your first month -- no questions asked. Applies to first-time partners who complete onboarding and connect at least one photo source.",
  },
  {
    q: "How does the AI actually work?",
    a: "You upload 1-3 photos after each job. Our AI scans every image for signs of work other partners can do -- overgrown grass, broken fences, dirty windows, drainage problems, and 50+ more. When it finds something, it routes the lead automatically.",
  },
  {
    q: "How do I earn commissions?",
    a: "When your job photos generate a lead that another partner closes, you earn a share of the platform fee: Scout keeps 40%, Pro 55%, Crew 65%, Company 72%, Enterprise 78%. Plus earn network income when partners you refer complete jobs. Paid monthly, tracked in real time.",
  },
  {
    q: "What is network income?",
    a: "When you refer someone to ProLnk, you earn a percentage of their job commissions. Pro earns 0.5% from direct referrals. Crew earns from 4 levels deep. Company earns 1.5% from level 3 + 1% from level 4. Enterprise earns 2% from all downline levels.",
  },
  {
    q: "Do I have to change how I run my business?",
    a: "No. Upload 1-3 photos after each job. It takes 60 seconds. The AI does everything else -- detection, routing, tracking. Your existing workflow stays the same.",
  },
  {
    q: "How long does approval take?",
    a: "Most applications are reviewed within 1-2 business days. Once approved, you can start uploading jobs and receiving leads immediately.",
  },
];

// --- FAQ Item -----------------------------------------------------------------
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 font-heading">{q}</span>
        {open ? <ChevronUp className="h-4 w-4 text-gray-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{a}</div>
      )}
    </div>
  );
}

// --- ROI Calculator (compact) -------------------------------------------------
function ROICalculator() {
  const [jobsPerMonth, setJobsPerMonth] = useState([20]);
  const [avgJobValue, setAvgJobValue] = useState([1200]);
  const [tier, setTier] = useState<"scout" | "pro" | "crew" | "company" | "enterprise">("pro");

  const tierData = {
    scout: { keep: 0.40, fee: 0, cap: 500 },
    pro: { keep: 0.55, fee: 49, cap: null },
    crew: { keep: 0.65, fee: 99, cap: null },
    company: { keep: 0.72, fee: 149, cap: null },
    enterprise: { keep: 0.78, fee: 0, cap: null } // Custom pricing
  };
  const t = tierData[tier];
  const platformFee = 0.10;
  const conversionRate = 0.15;
  const leadsGenerated = Math.round(jobsPerMonth[0] * conversionRate);
  const grossCommission = leadsGenerated * avgJobValue[0] * platformFee * t.keep;
  const capped = t.cap ? Math.min(grossCommission, t.cap) : grossCommission;
  const net = Math.max(0, capped - t.fee);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-2xl mx-auto">
      <h3 className="text-xl font-heading text-gray-900 mb-6">See What You'd Earn</h3>
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Jobs per month</label>
            <span className="text-lg font-heading font-bold text-[#0A1628]">{jobsPerMonth[0]}</span>
          </div>
          <Slider value={jobsPerMonth} onValueChange={setJobsPerMonth} min={5} max={100} step={5} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Average job value</label>
            <span className="text-lg font-heading font-bold text-[#0A1628]">${avgJobValue[0].toLocaleString()}</span>
          </div>
          <Slider value={avgJobValue} onValueChange={setAvgJobValue} min={200} max={5000} step={100} className="w-full" />
        </div>
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["scout", "pro", "crew", "company", "enterprise"] as const).map((t) => {
          const tierLabel = { scout: "Scout", pro: "Pro", crew: "Crew", company: "Company", enterprise: "Enterprise" }[t];
          return (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`flex-1 min-w-[100px] py-2 rounded-lg text-sm font-semibold transition-all ${tier === t ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {tierLabel}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-heading font-bold text-gray-800">{leadsGenerated}</div>
          <div className="text-xs text-gray-500 mt-1">Leads / Month</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-heading font-bold text-gray-800">${Math.round(capped).toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Gross Commission</div>
        </div>
        <div className="bg-[#0A1628] rounded-xl p-4 text-center">
          <div className="text-2xl font-heading font-bold text-[#F5E642]">${Math.round(net).toLocaleString()}</div>
          <div className="text-xs text-white/70 mt-1">Net Monthly</div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">Estimates only. Based on ~15% photo-to-lead conversion and 10% platform fee.</p>
    </div>
  );
}
// --- Pricing Section (tiers + add-ons) --------------------------------------------
function PricingSection() {
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({});
  const [activeTierIdx, setActiveTierIdx] = useState(1); // Pro by default

  const activeTier = PRICING_TIERS[activeTierIdx];
  const baseFee = activeTier.monthlyFee ?? 299;

  const addOnTotal = ADD_ONS.reduce((sum, addon) => {
    const qty = selectedAddOns[addon.id] ?? 0;
    if (!qty) return sum;
    return sum + addon.price * qty;
  }, 0);

  const monthlyTotal = baseFee + addOnTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddOns((prev) => {
      const current = prev[id] ?? 0;
      if (current > 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: 1 };
    });
  };

  const setAddonQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setSelectedAddOns((prev) => { const next = { ...prev }; delete next[id]; return next; });
    } else {
      setSelectedAddOns((prev) => ({ ...prev, [id]: qty }));
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Pick Your Plan</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          Flat monthly fee plus a 10% platform fee on closed jobs. No contracts. Upgrade or cancel anytime.
        </p>
      </div>

      {/* Tier Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
        {PRICING_TIERS.map((tier, idx) => (
          <div
            key={tier.name}
            onClick={() => setActiveTierIdx(idx)}
            className={`relative rounded-2xl p-7 flex flex-col border-2 cursor-pointer transition-all ${
              activeTierIdx === idx
                ? "border-[#0A1628] shadow-xl scale-[1.02]"
                : "border-gray-200 shadow-sm hover:border-gray-400"
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 text-xs font-bold tracking-widest uppercase text-[#0A1628] bg-[#F5E642]">
                  Recommended
                </span>
              </div>
            )}
            <div className="mb-4">
              <h3 className="text-2xl font-heading font-bold text-gray-900">{tier.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{tier.subtitle}</p>
            </div>
            <div className="mb-4">
              {tier.monthlyFee === null ? (
                <span className="text-3xl font-heading font-bold text-gray-900">Custom</span>
              ) : tier.monthlyFee === 0 ? (
                <span className="text-3xl font-heading font-bold text-gray-900">Free</span>
              ) : (
                <>
                  <span className="text-3xl font-heading font-bold text-gray-900">${tier.monthlyFee}</span>
                  <span className="text-sm text-gray-400">/mo</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1.5 mb-4 pb-4 border-b border-gray-100">
              <TrendingUp className="h-4 w-4 text-[#0A1628]" />
              <span className="text-sm font-bold text-[#0A1628]">Keep {(tier.keepRate * 100).toFixed(0)}% of every referral</span>
            </div>
            <ul className="space-y-2 mb-6 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#0A1628]" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
                onClick={(e) => { e.stopPropagation(); document.dispatchEvent(new CustomEvent("open-pro-waitlist")); }}
                className={`w-full py-3 text-sm font-bold tracking-wide transition-all rounded-none ${
                  activeTierIdx === idx
                    ? "bg-[#0A1628] text-white hover:opacity-90"
                    : "border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white"
                }`}
              >
                {tier.cta}
              </button>
          </div>
        ))}
      </div>

      {/* Add-On Modules */}
      <div className="max-w-4xl mx-auto mb-14">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-2xl font-heading font-bold text-gray-900">Add-On Modules</h3>
          <span className="text-sm text-gray-400 font-medium">Stack on top of any plan</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADD_ONS.map((addon) => {
            const qty = selectedAddOns[addon.id] ?? 0;
            const isOn = qty > 0;
            const Icon = addon.icon;
            const cost = addon.price * (addon.perUnit ? qty : 1);
            return (
              <div
                key={addon.id}
                className={`rounded-xl border-2 p-5 transition-all cursor-pointer ${
                  isOn ? "border-[#0A1628] bg-[#0A1628]/[0.03]" : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => toggleAddon(addon.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${ isOn ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-500" }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{addon.name}</div>
                      <div className="text-xs text-gray-500">${addon.price} {addon.unit}</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    isOn ? "border-[#0A1628] bg-[#0A1628]" : "border-gray-300"
                  }`}>
                    {isOn && <CheckCircle className="h-3 w-3 text-white" />}
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{addon.description}</p>
                {addon.perUnit && isOn && (
                  <div
                    className="flex items-center gap-2 mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-gray-600 font-medium">{addon.unitLabel}:</span>
                    <button
                      className="w-6 h-6 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 flex items-center justify-center text-sm font-bold"
                      onClick={() => setAddonQty(addon.id, qty - 1)}
                    >-</button>
                    <span className="text-sm font-bold text-gray-900 w-4 text-center">{qty}</span>
                    <button
                      className="w-6 h-6 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 flex items-center justify-center text-sm font-bold"
                      onClick={() => setAddonQty(addon.id, Math.min(qty + 1, addon.unitMax ?? 20))}
                    >+</button>
                    <span className="text-xs text-gray-400 ml-1">${cost}/mo</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Total */}
      {(addOnTotal > 0 || activeTierIdx > 0) && (
        <div className="max-w-4xl mx-auto mb-10">
          <div className="rounded-2xl border-2 border-[#0A1628] bg-[#0A1628] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Your Estimated Monthly</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-heading font-bold text-white">${monthlyTotal}</span>
                <span className="text-white/50 text-sm">/mo base</span>
              </div>
              <div className="text-white/50 text-xs mt-1">
                {activeTier.name} (${baseFee}/mo)
                {addOnTotal > 0 && ` + $${addOnTotal}/mo in add-ons`}
                {"  plus 10% platform fee on closed jobs"}
              </div>
            </div>
            <button onClick={() => document.dispatchEvent(new CustomEvent("open-pro-waitlist"))} className="px-8 py-3 bg-[#F5E642] text-[#0A1628] font-bold text-sm tracking-wide hover:opacity-90 transition-all rounded-none shrink-0">
                Apply Now
              </button>
          </div>
        </div>
      )}

      {/* Earnings Calculator */}
      <ROICalculator />

      <p className="text-center text-sm text-gray-400 mt-8">All plans include FSM integration. No contracts -- upgrade or cancel anytime.</p>
    </div>
  );
}

// --- Partner Spotlight Section --------------------------------------------------
const TIER_COLORS: Record<string, string> = {
  enterprise: "#7C3AED",
  company: "#0A1628",
  crew: "#1D4ED8",
  pro: "#059669",
  scout: "#6B7280",
};
const TIER_LABELS: Record<string, string> = {
  enterprise: "Enterprise",
  company: "Company",
  crew: "Crew",
  pro: "Pro",
  scout: "Scout",
};

function PartnerSpotlightSection() {
  const { data: spotlightPartners, isLoading } = trpc.directory.getSpotlightPartners.useQuery();

  return (
    <section id="spotlight" className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest text-[#0A1628] uppercase mb-3 px-3 py-1 bg-[#F5E642] rounded-full">Network Spotlight</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Top Performers in DFW</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            These partners are generating the most referral revenue on the network this month.
          </p>
        </div>
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-gray-100 rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        )}
        {!isLoading && (!spotlightPartners || spotlightPartners.length === 0) && (
          <div className="text-center py-16 text-gray-400">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Partner spotlight coming soon</p>
            <p className="text-sm mt-1">Top performers will appear here once the network launches.</p>
          </div>
        )}
        {!isLoading && spotlightPartners && spotlightPartners.length > 0 && (<>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {spotlightPartners.slice(0, 6).map((p: any, i: number) => {
            const tierColor = TIER_COLORS[p.tier] ?? "#6B7280";
            const tierLabel = TIER_LABELS[p.tier] ?? p.tier;
            const rating = Number(p.avgRating ?? 0).toFixed(1);
            const reviews = Number(p.reviewCount ?? 0);
            const referrals = Number(p.referralCount ?? 0);
            return (
              <StaggerItem key={p.id}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                        style={{ backgroundColor: tierColor }}
                      >
                        {p.businessName?.[0] ?? "P"}
                      </div>
                      <div>
                        <div className="font-heading font-bold text-gray-900 text-sm leading-tight">{p.businessName}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{p.businessType}</div>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0"
                      style={{ backgroundColor: tierColor }}
                    >
                      {tierLabel}
                    </span>
                  </div>
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-base font-heading font-bold text-gray-800">{referrals}</div>
                      <div className="text-[10px] text-gray-400">Referrals</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-base font-heading font-bold text-gray-800">{rating}</div>
                      <div className="text-[10px] text-gray-400">Rating</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-base font-heading font-bold text-gray-800">{reviews}</div>
                      <div className="text-[10px] text-gray-400">Reviews</div>
                    </div>
                  </div>
                  {/* Service area */}
                  <div className="text-xs text-gray-400 mt-auto flex items-center gap-1">
                    <HomeIcon className="w-3 h-3" />
                    <span className="truncate">{p.serviceArea}</span>
                  </div>
                  {/* Rank badge for top 3 */}
                  {i < 3 && (
                    <div className="mt-3 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold text-yellow-600">
                        {i === 0 ? "#1 This Month" : i === 1 ? "#2 This Month" : "#3 This Month"}
                      </span>
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
          <div className="text-center mt-10">
            <Link href="/leaderboard">
              <button className="px-6 py-3 text-sm font-semibold text-[#0A1628] border-2 border-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all rounded-none">
                View Full Leaderboard <ArrowRight className="w-4 h-4 inline ml-1" />
              </button>
            </Link>
          </div>
        </>)}
      </div>
    </section>
  );
}

// --- Pro Waitlist Modal -------------------------------------------------------
const TRADE_OPTIONS = [
  { group: "Lawn & Outdoor", trades: ["Lawn Care & Mowing", "Landscaping & Design", "Tree Service & Removal", "Irrigation & Sprinkler Systems", "Drainage & Grading", "Hardscaping & Patios", "Artificial Turf Installation", "Outdoor & Landscape Lighting", "Fence Installation & Repair"] },
  { group: "Pool & Water", trades: ["Pool Cleaning & Maintenance", "Pool Repair & Renovation", "Water Filtration & Softeners"] },
  { group: "Pest & Wildlife", trades: ["Pest Control", "Wildlife & Rodent Removal", "Mosquito & Tick Control"] },
  { group: "Roofing & Exterior", trades: ["Roofing & Roof Repair", "Gutter Cleaning & Guards", "Siding & Exterior Repair", "Exterior Painting", "Pressure Washing", "Window Cleaning", "Window & Door Repair"] },
  { group: "HVAC, Plumbing & Electrical", trades: ["HVAC & Air Conditioning", "Plumbing", "Electrical Services", "Solar Panel Installation", "Insulation & Energy Efficiency", "Water Heater Installation & Repair", "EV Charging Station Installation", "Generator Installation"] },
  { group: "Interior Remodeling", trades: ["Kitchen Remodeling", "Bathroom Remodeling", "Flooring Installation", "Interior Painting", "Handyman Services", "Garage Door Repair & Installation", "Foundation Repair", "Cabinet Refinishing & Refacing", "Closet & Storage Organization", "Tile Installation & Repair", "Drywall Repair & Finishing", "Epoxy & Garage Floor Coating"] },
  { group: "Cleaning & Maintenance", trades: ["House Cleaning", "Carpet & Upholstery Cleaning", "Junk Removal & Hauling", "Storm Cleanup & Restoration", "Chimney Cleaning & Repair", "Air Duct & Dryer Vent Cleaning", "Concrete & Driveway Cleaning", "Mold Testing & Remediation"] },
  { group: "Animals & Pets", trades: ["Dog Walking & Pet Sitting", "Pet Grooming", "Pet Waste Removal"] },
  { group: "Security & Smart Home", trades: ["Home Security Systems", "Smart Home Installation"] },
  { group: "Specialty Services", trades: ["Holiday & Event Lighting", "Dumpster Rental", "Moving Services", "Home Inspection", "Concrete & Masonry", "Deck Building & Repair", "Stucco & Exterior Plaster", "Awnings & Shade Structures", "Radon Testing & Mitigation", "Fire & Smoke Damage Restoration", "Water Damage Restoration"] },
  { group: "General / Other", trades: ["General Contractor", "Other (describe below)"] },
];

function ProWaitlistModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [referralLink, setReferralLink] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    companyName: "", businessAddress: "", city: "", state: "TX", zip: "",
    serviceRadiusMiles: "25",
    yearsInBusiness: "", employeeCount: "", estimatedJobsPerMonth: "",
    hearAboutUs: "", currentSoftware: "",
  });
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [tradesOpen, setTradesOpen] = useState(false);
  const [customTradeDesc, setCustomTradeDesc] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [licenseFile, setLicenseFile] = useState<{ url: string; name: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const showCustomTrade = selectedTrades.includes("Other (describe below)");

  // Capture referral code from URL
  const inboundRefCode = (() => {
    const p = new URLSearchParams(window.location.search);
    return p.get("ref") || localStorage.getItem("prolnk_ref_code") || undefined;
  })();

  const join = trpc.waitlist.joinProWaitlist.useMutation({
    onSuccess: (_data, vars) => {
      const base = window.location.origin;
      // Generate a simple waitlist referral link using their email as a slug
      const slug = btoa(vars.email).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
      setReferralLink(`${base}/join?ref=${slug}`);
      setStep("success");
    },
    onError: (e: { message?: string }) => toast.error(e.message || "Something went wrong."),
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 mb-3";
  const selectCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 mb-3 text-gray-700 bg-white";

  const toggleTrade = (trade: string) => {
    setSelectedTrades(prev =>
      prev.includes(trade) ? prev.filter(t => t !== trade) : [...prev, trade]
    );
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none">×</button>
        {step === "success" && join.data ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-1">You're on the list!</h2>
            <div className="bg-[#F5E642]/20 border border-[#F5E642] rounded-lg px-4 py-3 mb-5 inline-block">
              <p className="text-[#0A1628] font-bold text-lg">Position: #{join.data.position}</p>
              <p className="text-gray-600 text-xs mt-1">You're #{join.data.position} in the ProLnk network.</p>
            </div>
            <p className="text-gray-500 text-sm mb-5">Welcome to the ProLnk founding network. Check your email for confirmation.</p>

            {/* Step 1: Refer other pros */}
            <div className="bg-[#0A1628] rounded-xl p-4 mb-4 text-left">
              <p className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#F5E642]" /> Your Personal Referral Link
              </p>
              <p className="text-white/60 text-xs mb-3">Share this with other contractors. Every pro you bring in counts toward your founding tier and future network income.</p>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 mb-2">
                <span className="text-white/80 text-xs font-mono truncate flex-1">{referralLink}</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(referralLink); toast.success("Link copied!"); }}
                  className="text-[#F5E642] hover:text-white transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText(referralLink); toast.success("Copied! Share in your group chats."); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#F5E642] text-[#0A1628] text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Copy & Share with Your Network
              </button>
            </div>

            {/* Step 2: TrustyPro for their own home */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-left">
              <p className="text-blue-800 font-semibold text-sm mb-1 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" /> Next: Protect Your Own Home
              </p>
              <p className="text-blue-700 text-xs mb-3">
                As a ProLnk pro, you also get TrustyPro access for your own home — track maintenance, document systems, and get matched with vetted pros in the network.
              </p>
              <a
                href={`/trustypro/waitlist?ref=${btoa(form.email).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase()}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                Sign Up for TrustyPro <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 underline">Close</button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-1">Join the ProLnk Waitlist</h2>
            <p className="text-gray-500 text-sm mb-5">Be among the first service pros to get access when we launch in your area.</p>

            {/* Owner(s) Info */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Owner(s) Information</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input placeholder="First name *" value={form.firstName} onChange={set("firstName")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30" />
              <input placeholder="Last name" value={form.lastName} onChange={set("lastName")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30" />
            </div>
            <input placeholder="Email address *" type="email" value={form.email} onChange={set("email")} className={inputCls} />
            <input placeholder="Phone number *" value={form.phone} onChange={set("phone")} className={inputCls} />

            {/* Company Info */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Company Information</p>
            <input placeholder="Company name *" value={form.companyName} onChange={set("companyName")} className={inputCls} />

            {/* Trades Multi-Select */}
            <div className="mb-3 relative">
              <button
                type="button"
                onClick={() => setTradesOpen(!tradesOpen)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 bg-white text-left flex items-center justify-between"
              >
                <span className={selectedTrades.length > 0 ? "text-gray-900" : "text-gray-400"}>
                  {selectedTrades.length > 0
                    ? `${selectedTrades.length} trade${selectedTrades.length > 1 ? "s" : ""} selected`
                    : "Select your trades / services *"}
                </span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${tradesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {tradesOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                  {TRADE_OPTIONS.map(group => (
                    <div key={group.group}>
                      <div className="px-3 py-1.5 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0">{group.group}</div>
                      {group.trades.map(trade => (
                        <label key={trade} className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={selectedTrades.includes(trade)}
                            onChange={() => toggleTrade(trade)}
                            className="rounded border-gray-300 text-[#0A1628] focus:ring-[#0A1628]/30"
                          />
                          <span className="text-gray-700">{trade}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedTrades.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedTrades.map(t => (
                  <span key={t} className="inline-flex items-center gap-1 bg-[#0A1628]/10 text-[#0A1628] text-xs font-medium px-2 py-1 rounded-full">
                    {t}
                    <button onClick={() => toggleTrade(t)} className="hover:text-red-500 leading-none">&times;</button>
                  </span>
                ))}
              </div>
            )}
            {showCustomTrade && (
              <input
                placeholder="Describe your trade or specialty *"
                value={customTradeDesc}
                onChange={(e) => setCustomTradeDesc(e.target.value)}
                className={inputCls}
              />
            )}

            {/* Business Details */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <select value={form.yearsInBusiness} onChange={set("yearsInBusiness")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 text-gray-700 bg-white">
                <option value="">Years in business</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1 - 3 years</option>
                <option value="3-5">3 - 5 years</option>
                <option value="5-10">5 - 10 years</option>
                <option value="10+">10+ years</option>
              </select>
              <select value={form.employeeCount} onChange={set("employeeCount")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 text-gray-700 bg-white">
                <option value="">Team size</option>
                <option value="Just me">Just me</option>
                <option value="2-5">2 - 5</option>
                <option value="6-15">6 - 15</option>
                <option value="16-50">16 - 50</option>
                <option value="50+">50+</option>
              </select>
            </div>
            <select value={form.estimatedJobsPerMonth} onChange={set("estimatedJobsPerMonth")} className={selectCls}>
              <option value="">Estimated jobs per month</option>
              <option value="1-5">1 - 5</option>
              <option value="6-15">6 - 15</option>
              <option value="16-30">16 - 30</option>
              <option value="31-50">31 - 50</option>
              <option value="50+">50+</option>
            </select>

            {/* Current Software */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Field Software <span className="text-gray-300 font-normal normal-case">(optional)</span></p>
            <select value={form.currentSoftware} onChange={set("currentSoftware")} className={selectCls}>
              <option value="">What software do you use to manage jobs?</option>
              <option value="ServiceTitan">ServiceTitan</option>
              <option value="Jobber">Jobber</option>
              <option value="Housecall Pro">Housecall Pro</option>
              <option value="CompanyCam">CompanyCam</option>
              <option value="FieldEdge">FieldEdge</option>
              <option value="Workiz">Workiz</option>
              <option value="mHelpDesk">mHelpDesk</option>
              <option value="Kickserv">Kickserv</option>
              <option value="None">None / Pen &amp; Paper</option>
              <option value="Other">Other</option>
            </select>
            {/* Business Address */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-1">Business Address</p>
            <input placeholder="Street address *" value={form.businessAddress} onChange={set("businessAddress")} className={inputCls} />
            <div className="grid grid-cols-3 gap-2 mb-3">
              <input placeholder="City *" value={form.city} onChange={set("city")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 col-span-1" />
              <input placeholder="State" value={form.state} onChange={set("state")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30" maxLength={2} />
              <input placeholder="ZIP *" value={form.zip} onChange={set("zip")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30" />
            </div>

            {/* Service Radius */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-1">Service Radius</p>
            <select value={form.serviceRadiusMiles} onChange={set("serviceRadiusMiles")} className={selectCls + " mb-3"}>
              {["10","15","25","35","50","75","100","150","200"].map(r => (
                <option key={r} value={r}>{r} miles</option>
              ))}
            </select>

            {/* License / Insurance Upload (optional) */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">License & Insurance <span className="text-gray-300 font-normal normal-case">(optional)</span></p>
            <div className="mb-3">
              {licenseFile ? (
                <div className="flex items-center gap-2 border border-green-200 bg-green-50 rounded-lg px-3 py-2 text-sm">
                  <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-green-800 truncate flex-1">{licenseFile.name}</span>
                  <button onClick={() => setLicenseFile(null)} className="text-gray-400 hover:text-red-500 text-xs">Remove</button>
                </div>
              ) : (
                <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  <span>{uploading ? "Uploading..." : "Upload license, insurance, or bond (PDF, JPG, PNG — max 10MB)"}</span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    disabled={uploading}
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      if (f.size > 10 * 1024 * 1024) { toast.error("File exceeds 10MB limit."); return; }
                      setUploading(true);
                      try {
                        const reader = new FileReader();
                        reader.onload = async () => {
                          const res = await fetch("/api/upload-license", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ file: { data: reader.result, type: f.type, name: f.name } }),
                          });
                          if (!res.ok) { toast.error("Upload failed. Please try again."); setUploading(false); return; }
                          const { url, fileName } = await res.json();
                          setLicenseFile({ url, name: fileName });
                          setUploading(false);
                        };
                        reader.readAsDataURL(f);
                      } catch { toast.error("Upload failed."); setUploading(false); }
                    }}
                  />
                </label>
              )}
            </div>

            {/* SMS Opt-In */}
            <label className="flex items-start gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="rounded border-gray-300 text-[#0A1628] focus:ring-[#0A1628]/30 mt-0.5"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                Text me when ProLnk launches in my area. <span className="text-gray-400">Message &amp; data rates may apply. Reply STOP to opt out.</span>
              </span>
            </label>

            <select value={form.hearAboutUs} onChange={set("hearAboutUs")} className={selectCls + " mb-5"}>
              <option value="">How did you hear about us?</option>
              <option value="Google Search">Google Search</option>
              <option value="Social Media (Facebook/Instagram)">Social Media (Facebook/Instagram)</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral from another contractor">Referral from another contractor</option>
              <option value="Trade show / event">Trade show / event</option>
              <option value="Flyer / direct mail">Flyer / direct mail</option>
              <option value="Word of mouth">Word of mouth</option>
              <option value="Other">Other</option>
            </select>
            <button
              onClick={() => {
                if (!form.firstName || !form.email || !form.phone || !form.companyName) {
                  toast.error("Name, email, phone, and company name are required."); return;
                }
                if (selectedTrades.length === 0) {
                  toast.error("Please select at least one trade or service."); return;
                }
                if (showCustomTrade && !customTradeDesc.trim()) {
                  toast.error("Please describe your trade or specialty."); return;
                }
                join.mutate({
                  firstName: form.firstName,
                  lastName: form.lastName || "-",
                  email: form.email,
                  phone: form.phone,
                  trade: selectedTrades[0] || "General Contractor",
                  primaryCity: form.city || "Not provided",
                  primaryState: form.state,
                });
              }}
              disabled={join.isPending}
              className="w-full py-3 rounded-none text-sm font-bold text-[#0A1628] bg-[#F5E642] hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {join.isPending ? "Joining..." : "Join the Waitlist"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// --- Main Landing Page -------------------------------------------------------------
export default function ProWaitlist() {
  const { user } = useAuth();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const openWaitlist = () => setShowWaitlist(true);
  useEffect(() => {
    const handler = () => setShowWaitlist(true);
    document.addEventListener("open-pro-waitlist", handler);
    return () => document.removeEventListener("open-pro-waitlist", handler);
  }, []);
  const isAdmin = user?.role === "admin";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["how-it-works", "the-engine", "spotlight", "who-can-join", "pricing", "faq", "guarantee"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const { data: foundingData } = trpc.directory.getFoundingPartnerCount.useQuery();
  const spotsRemaining = foundingData?.spotsRemaining ?? 50;
  const spotsUsed = 50 - spotsRemaining;
  const spotsPercent = Math.round((spotsUsed / 50) * 100);

  return (
    <div className="min-h-screen bg-white">

      {/* -- Navigation -- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <ProLnkLogo height={44} variant="light" className="shrink-0" />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            {[
              { href: "#how-it-works", id: "how-it-works", label: "How It Works" },
              { href: "#the-engine", id: "the-engine", label: "The Engine" },
              { href: "#spotlight", id: "spotlight", label: "Top Partners" },
              { href: "#who-can-join", id: "who-can-join", label: "Who Can Join" },
              { href: "#pricing", id: "pricing", label: "Pricing" },
              { href: "#faq", id: "faq", label: "FAQ" },
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`transition-colors font-medium ${
                  activeSection === item.id
                    ? "text-[#0A1628] border-b-2 border-[#0A1628] pb-0.5"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/trustypro/waitlist">
              <Button variant="ghost" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                TrustyPro — Homeowners
              </Button>
            </Link>
            
            <Button onClick={openWaitlist} className="text-sm font-semibold text-white rounded-none px-5" style={{ backgroundColor: "#0A1628" }}>
              Join Waitlist
            </Button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            <a href="#how-it-works" className="block text-sm font-medium text-gray-700 py-2" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#the-engine" className="block text-sm font-medium text-gray-700 py-2" onClick={() => setMobileMenuOpen(false)}>The Engine</a>
            <a href="#who-can-join" className="block text-sm font-medium text-gray-700 py-2" onClick={() => setMobileMenuOpen(false)}>Who Can Join</a>
            <a href="#pricing" className="block text-sm font-medium text-gray-700 py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" className="block text-sm font-medium text-gray-700 py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="flex gap-3 pt-2">
              
              <span onClick={openWaitlist} className="flex-1 cursor-pointer">
                <Button className="w-full text-sm text-white rounded-none font-semibold" style={{ backgroundColor: "#0A1628" }}>Apply Now</Button>
              </span>
            </div>
            <Link href="/trustypro/waitlist" className="block">
              <Button variant="ghost" className="w-full text-sm text-blue-600 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                TrustyPro — Homeowner Waitlist
              </Button>
            </Link>

          </div>
        )}
      </nav>

      {/* -- 1. Hero -- */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#050d1a" }}>
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/prolnk-hero-house_ad6a73f1.webp"
            alt="Home service AI analysis"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(5,13,26,0.92) 0%, rgba(5,13,26,0.80) 55%, rgba(5,13,26,0.35) 100%)" }} />
        </div>

        <div className="relative container py-28 md:py-36">
          <div className="max-w-2xl">
            <FadeUp delay={0.1}>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 mb-8 tracking-widest uppercase"
                style={{ backgroundColor: "rgba(245,230,66,0.15)", color: "#F5E642", border: "1px solid rgba(245,230,66,0.3)" }}>
                Patent Pending  DFW Launch
              </span>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h1 className="text-6xl md:text-7xl font-heading font-bold text-white leading-[1.05] mb-6 tracking-tight">
                Your Photos.<br />Their Next Job.
              </h1>
            </FadeUp>

            <FadeUp delay={0.35}>
              <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-lg">
                Upload job photos. Our AI finds the next job for your neighbors -- and pays you a commission when it closes.
              </p>
            </FadeUp>

            <FadeUp delay={0.45}>
              <span onClick={openWaitlist} className="cursor-pointer">
                <button
                  className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold tracking-wide transition-all hover:opacity-90"
                  style={{ backgroundColor: "#0A1628", color: "white", border: "2px solid #F5E642" }}
                >
                  Join the Network <ArrowRight className="h-5 w-5" />
                </button>
              </span>
            </FadeUp>

            <FadeIn delay={0.6}>
              <div className="flex items-center gap-6 mt-12 pt-10 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white"><CountUp target={148} suffix="+" /></div>
                  <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">Active Partners</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white"><CountUp target={820} suffix="+" /></div>
                  <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">Leads Detected</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white">$<CountUp target={45} suffix="K+" /></div>
                  <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">Commissions Paid</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* -- 2. How It Works -- */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Four Steps. Zero Extra Work.</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg">No new workflow. No extra selling. Just photos you're already taking -- and an engine that never stops.</p>
          </div>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Finish a Job", desc: "Complete your normal work. Take 1-3 wide-angle photos of the property before you leave.", icon: Camera },
              { step: "02", title: "AI Scans the Photos", desc: "Our AI checks every image for 50+ types of work your neighbors might need -- automatically, in seconds.", icon: Zap },
              { step: "03", title: "Collect Your Commission", desc: "When a partner closes a job from your referral, you earn. Tracked in real time, paid monthly.", icon: DollarSign },
              { step: "04", title: "It Keeps Working", desc: "Your photos stay in our engine. Storms, recalls, and aging assets trigger new leads from old photos -- earning you residual commissions.", icon: Repeat },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="relative p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="absolute top-6 right-6 text-6xl font-heading font-black opacity-[0.04] text-gray-900 select-none">{item.step}</div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "#F5E642" }}>
                    <item.icon className="h-6 w-6 text-[#0A1628]" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* -- 2.5. The ProLnk Engine -- */}
      <section id="the-engine" className="py-24 relative overflow-hidden" style={{ backgroundColor: "#050d1a" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #3B82F6 0%, transparent 50%), radial-gradient(circle at 80% 70%, #7C3AED 0%, transparent 50%)" }} />
        <div className="container relative">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
                <Radar className="w-4 h-4 text-[#F5E642]" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Patent-Pending Technology</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">The ProLnk Engine</h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                Four autonomous AI engines work 24/7 to turn your job photos into a continuous stream of revenue -- long after you leave the property.
              </p>
            </div>
          </FadeUp>

          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {[
              {
                icon: Eye,
                title: "Photo Intelligence",
                desc: "Every photo is analyzed for 50+ opportunity types. AI identifies aging equipment, damage patterns, and upgrade potential invisible to the human eye.",
                color: "#3B82F6",
                stat: "50+",
                statLabel: "Detection Types",
              },
              {
                icon: CloudLightning,
                title: "Storm Watch Engine",
                desc: "Monitors NOAA weather data in real time. When severe weather hits, cross-references your photo database to identify properties at risk.",
                color: "#8B5CF6",
                stat: "24/7",
                statLabel: "Weather Monitoring",
              },
              {
                icon: Clock,
                title: "Asset Aging Engine",
                desc: "Tracks equipment age from photos. When a water heater, HVAC unit, or roof approaches end-of-life, generates proactive replacement leads.",
                color: "#F59E0B",
                stat: "12+",
                statLabel: "Asset Categories",
              },
              {
                icon: AlertTriangle,
                title: "Safety Recall Engine",
                desc: "Monitors CPSC manufacturer recalls. When a recalled product is identified in your photos, generates high-priority safety leads.",
                color: "#EF4444",
                stat: "100%",
                statLabel: "Recall Coverage",
              },
            ].map((engine) => (
              <StaggerItem key={engine.title}>
                <div className="rounded-2xl p-6 h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${engine.color}25` }}>
                    <engine.icon className="w-6 h-6" style={{ color: engine.color }} />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">{engine.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{engine.desc}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-2xl font-heading font-bold" style={{ color: engine.color }}>{engine.stat}</p>
                    <p className="text-xs text-white/40 uppercase tracking-wider">{engine.statLabel}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeUp>
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-heading font-bold text-white mb-2">How One Photo Becomes Recurring Revenue</h3>
                  <p className="text-white/50 text-sm">Your photos don't expire. They keep working inside the engine.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { step: "1", label: "You take a photo", icon: Camera, color: "#F5E642" },
                    { step: "2", label: "AI detects 3 opportunities", icon: Eye, color: "#3B82F6" },
                    { step: "3", label: "6 months later: storm hits", icon: CloudLightning, color: "#8B5CF6" },
                    { step: "4", label: "Engine matches your photo", icon: Radar, color: "#F59E0B" },
                    { step: "5", label: "You earn again", icon: DollarSign, color: "#10B981" },
                  ].map((s) => (
                    <div key={s.step} className="text-center">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${s.color}20` }}>
                        <s.icon className="w-5 h-5" style={{ color: s.color }} />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: s.color }}>Step {s.step}</p>
                      <p className="text-xs text-white/60 leading-snug">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="text-center mt-12">
            <span onClick={openWaitlist} className="cursor-pointer">
              <button className="px-8 py-4 text-sm font-bold text-[#0A1628] transition-all hover:brightness-110 rounded-none" style={{ backgroundColor: "#F5E642" }}>
                Start Building Your Photo Library <ArrowRight className="w-4 h-4 inline ml-2" />
              </button>
            </span>
          </div>
        </div>
      </section>

      {/* -- Partner Spotlight -- */}
      <PartnerSpotlightSection />

      {/* -- 3. Who Can Join -- */}
      <section id="who-can-join" className="py-24" style={{ backgroundColor: "#FAFAF9" }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Built for the Trades</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Any licensed, insured home service business in DFW. If you work at people's homes, you belong here.
            </p>
          </div>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_CAN_JOIN.map((group) => (
              <StaggerItem key={group.group}>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{group.emoji}</span>
                    <h3 className="text-base font-heading font-bold text-gray-900">{group.group}</h3>
                  </div>
                  <div className="space-y-1.5">
                    {group.categories.map((cat) => (
                      <div key={cat} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#0A1628]" />
                        {cat}
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm mb-4">Don't see your trade? We're adding new categories every month.</p>
            <span onClick={openWaitlist} className="cursor-pointer">
              <button className="px-6 py-3 text-sm font-semibold border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all rounded-none">
                Apply Anyway -- We'll Review Your Category
              </button>
            </span>
          </div>
        </div>
      </section>

      {/* -- 4. Pricing -- */}
      <section id="pricing" className="py-24 bg-white">
        <PricingSection />
      </section>

      {/* -- 5. Social Proof & Guarantee -- */}
      <section id="guarantee" className="py-24" style={{ backgroundColor: "#FAFAF9" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

            {/* Testimonials */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">What Partners Say</h2>
              <div className="space-y-5">
                {[
                  {
                    name: "Marcus T.",
                    business: "Green Edge Landscaping",
                    quote: "I uploaded gate photos from a pet waste job and within an hour had a lead for a full backyard landscaping project. Closed it for $2,400.",
                    tier: "Pro",
                  },
                  {
                    name: "Sarah K.",
                    business: "Paws & Play Dog Walking",
                    quote: "My team takes photos at every visit anyway. Now those photos are generating referral income I didn't have before. Completely passive.",
                    tier: "Pro",
                  },
                  {
                    name: "David R.",
                    business: "AquaClear Pool Services",
                    quote: "The AI caught a broken fence panel in a photo I didn't even notice. The fence company closed the job and I got a commission check.",
                    tier: "Starter",
                  },
                ].map((t) => (
                  <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#F5E642] text-[#F5E642]" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.business}</div>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded">{t.tier}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee + Founding Partner */}
            <div className="space-y-6">
              <div className="bg-[#0A1628] rounded-2xl p-8 text-white">
                <div className="text-4xl mb-4"></div>
                <h3 className="text-2xl font-heading font-bold mb-3">30-Day Guarantee</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  If you don't receive at least <strong className="text-white">3 qualified inbound leads</strong> in your first 30 days, we'll refund your first month. No questions asked.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "No contracts -- cancel anytime",
                    "Refund issued within 5 business days",
                    "Applies to first-time partners only",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-[#F5E642] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span onClick={openWaitlist} className="cursor-pointer">
                  <button className="w-full py-3 text-sm font-bold bg-[#F5E642] text-[#0A1628] hover:opacity-90 transition-all rounded-none">
                    Claim Your Spot 
                  </button>
                </span>
              </div>

              {/* Founding Partner Spot Counter */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">[AWARD]</span>
                  <div>
                    <h4 className="font-heading font-bold text-gray-900">Founding Partner Spots</h4>
                    <p className="text-xs text-gray-500">Lock in your current rate forever</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Spots remaining</span>
                  <span className="text-xl font-heading font-bold text-[#0A1628]">{spotsRemaining} <span className="text-sm font-normal text-gray-400">of 50</span></span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mb-3">
                  <div className="h-2 rounded-full transition-all duration-700 bg-[#0A1628]" style={{ width: `${spotsPercent}%` }} />
                </div>
                <ul className="space-y-1.5">
                  {[
                    "Locked-in pricing forever",
                    "Founding Partner badge on your profile",
                    "Priority lead routing -- first look at new leads",
                    "Early access to every new feature",
                  ].map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle className="h-3.5 w-3.5 text-[#0A1628] shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div id="faq">
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">Common Questions</h3>
                <div className="space-y-2">
                  {FAQS.map((faq) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- 6. Final CTA -- */}
      <section className="py-24" style={{ backgroundColor: "#050d1a" }}>
        <div className="container text-center">
          <FadeUp>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Ready to Get Paid<br />for Photos You Already Take?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
              Free to apply. Start earning referral commissions from your first job.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <span onClick={openWaitlist} className="cursor-pointer">
              <button
                className="inline-flex items-center gap-3 px-10 py-5 text-base font-bold tracking-wide transition-all hover:opacity-90"
                style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
              >
                Apply Now -- It's Free <ArrowRight className="h-5 w-5" />
              </button>
            </span>
          </FadeUp>
        </div>
      </section>

      {/* -- Footer -- */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <ProLnkLogo height={28} variant="dark" className="shrink-0" />
            <div className="flex gap-6 text-sm">
              <span onClick={openWaitlist} className="hover:text-white transition-colors cursor-pointer">Join Waitlist</span>
              <Link href="/partners" className="hover:text-white transition-colors">Directory</Link>
              <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
              <Link href="/trustypro/waitlist" className="hover:text-white transition-colors">TrustyPro</Link>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 text-xs text-gray-600">
              <p> 2026 ProLnk. DFW, Texas. &nbsp;&nbsp; <span className="text-[#F5E642] font-semibold">Patent Pending</span></p>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/ccpa" className="hover:text-white transition-colors">CCPA Rights</Link>
                <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Pro Waitlist Modal */}
      {showWaitlist && (
        <ProWaitlistModal onClose={() => setShowWaitlist(false)} />
      )}
    </div>
  );
}
