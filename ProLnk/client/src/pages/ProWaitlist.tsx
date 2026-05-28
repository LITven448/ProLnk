import { useState, useMemo, useEffect, useRef, type ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import ProLnkLogo from "@/components/ProLnkLogo";
import BackToTop from "@/components/BackToTop";
import { FadeUp, FadeIn, StaggerChildren, StaggerItem, CountUp } from "@/components/ScrollAnimations";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Users, TrendingUp, DollarSign, Star, CheckCircle, ChevronDown, ChevronUp,
  ArrowRight, Zap, Camera, Menu, X, Shield, BadgeCheck, Play,
  Radar, CloudLightning, Clock, AlertTriangle, Home as HomeIcon, Eye, Repeat,
  Copy, Share2, Twitter, Linkedin, MessageSquare, Lock, Calendar,
  User, Building2, Search, MapPin,
} from "lucide-react";
import { SERVICE_CATEGORIES, TIER_LABELS } from "@/data/serviceCategories";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// --- Design tokens ------------------------------------------------------------
// Navy: #0A1628  Yellow accent: #F5E642  Off-white bg: #FAFAF9
// Hero/final CTA bg: #050d1a

// --- Pricing -- Core $99/54%, Pro $149/65%, Business $249/72%, Enterprise custom ------
const PRICING_TIERS = [
  {
    name: "Core",
    subtitle: "Start earning",
    monthlyFee: 99,
    keepRate: 0.54,
    commissionCap: null,
    seats: 1,
    popular: false,
    cta: "Get Core",
    apiAccess: false,
    tier: "core",
    features: [
      "1 user seat",
      "AI opportunity detection on all jobs",
      "Commission tracking dashboard",
      "FSM integration (Jobber, HCP, ServiceTitan)",
      "Keep 54% of every referral commission",
      "Event-driven leads (storm, aging, recalls)",
      "Mobile app access",
    ],
  },
  {
    name: "Pro",
    subtitle: "Most popular",
    monthlyFee: 149,
    keepRate: 0.65,
    commissionCap: null,
    seats: 3,
    popular: true,
    cta: "Get Pro",
    apiAccess: true,
    tier: "pro",
    features: [
      "Everything in Core, plus:",
      "Up to 3 user seats",
      "Keep 65% of every referral commission",
      "API & webhook access",
      "Priority lead routing",
      "Weekly performance analytics",
    ],
  },
  {
    name: "Business",
    subtitle: "Scale your team",
    monthlyFee: 249,
    keepRate: 0.72,
    commissionCap: null,
    seats: 8,
    popular: false,
    cta: "Get Business",
    apiAccess: true,
    tier: "business",
    features: [
      "Everything in Pro, plus:",
      "Up to 8 user seats",
      "Keep 72% of every referral commission",
      "First-priority lead routing",
      "Monthly strategy reviews",
      "Co-marketing opportunities",
      "Custom FSM workflows",
      "Advanced analytics & forecasting",
    ],
  },
  {
    name: "Enterprise",
    subtitle: "Unlimited growth",
    monthlyFee: null,
    keepRate: null,
    commissionCap: null,
    seats: 999,
    popular: false,
    cta: "Contact Sales",
    apiAccess: true,
    tier: "enterprise",
    features: [
      "Everything in Business, plus:",
      "Unlimited user seats",
      "Negotiated keep rate",
      "Dedicated account manager",
      "White-label portal options",
      "Custom pricing & terms",
      "Integration development support",
      "Predictive revenue forecasting",
      "Exclusive partner events",
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
    id: "extra-zipcodes",
    name: "Extra Zip Codes",
    price: 19,
    unit: "per zip/mo",
    description: "Expand your lead coverage beyond your base service area. Each additional zip code opens AI matching and Exchange visibility in that territory.",
    icon: MapPin,
    perUnit: true,
    unitLabel: "zip codes",
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
    price: 49,
    unit: "/mo",
    description: "Unlock Scout capabilities on top of your Core, Pro, or Business plan. Onboard homeowners to TrustyPro, coordinate bids on multi-trade projects, and earn permanent origination rights on every property you bring to the network.",
    icon: Star,
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
  { group: "Home Maintenance", emoji: "", categories: ["Handyman Services", "Fencing & Gates", "Roofing & Gutters", "HVAC Service & Repair", "Plumbing", "Electrical", "Garage Door Service", "Foundation Repair"] },
  { group: "Cleaning & Restoration", emoji: "", categories: ["House Cleaning", "Pressure Washing", "Window Cleaning", "Carpet Cleaning", "Gutter Cleaning", "Junk Removal", "Mold Remediation"] },
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
    a: "When ProLnk generates a lead that closes, we take a small platform fee (3-12% of job value). You keep your tier's percentage of that fee — never out of what you would normally charge the customer. Core keeps 54% of the fee, Pro keeps 65%, Business keeps 72%. ProLnk always retains a minimum 20% of the commission pool. Commissions are paid monthly and tracked in real time.",
  },
  {
    q: "Do I have to change how I run my business?",
    a: "No. Take 3 photos before the job starts and 3 photos when the job is complete — that's it. You can do this directly through your integrated field service management software (Jobber, HCP, ServiceTitan, and others). We also automatically extract photos from your existing job history so the AI starts working from day one, even before your first new job on the platform. The AI handles everything else: detection, opportunity routing, payment tracking.",
  },
  {
    q: "How long does approval take?",
    a: "It depends on your qualifications. If you have an complete application — active trade license, current general liability insurance, a passed background check, and you're applying in an area where your service type is in high demand — you could be approved instantly. In most cases it takes 1–2 business days. Incomplete applications or missing documentation will delay your approval.",
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
  const [tier, setTier] = useState<"core" | "pro" | "business" | "enterprise">("pro");

  const tierData = {
    core: { keep: 0.54, fee: 99, cap: null },
    pro: { keep: 0.65, fee: 149, cap: null },
    business: { keep: 0.72, fee: 249, cap: null },
    enterprise: { keep: 0.72, fee: 0, cap: null },
  };
  const t = tierData[tier];
  const platformFee = 0.10;
  const conversionRate = 0.15;
  const leadsGenerated = Math.round(jobsPerMonth[0] * conversionRate);
  const grossCommission = leadsGenerated * avgJobValue[0] * platformFee * t.keep;
  const capped = grossCommission;
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
        {(["core", "pro", "business", "enterprise"] as const).map((t) => {
          const tierLabel = { core: "Core", pro: "Pro", business: "Business", enterprise: "Enterprise" }[t];
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
  const baseFee = activeTier.monthlyFee ?? 0;

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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
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
              <span className="text-sm font-bold text-[#0A1628]">
                {tier.keepRate != null ? `Keep ${(tier.keepRate * 100).toFixed(0)}% of every referral` : "Negotiated keep rate"}
              </span>
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
  business: "#0A1628",
  pro: "#1D4ED8",
  core: "#059669",
};
const TIER_LABELS: Record<string, string> = {
  enterprise: "Enterprise",
  business: "Business",
  pro: "Pro",
  core: "Core",
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

// --- Tier badge config for success state --------------------------------------
const TIER_BADGE_CONFIG: Record<string, { label: string; badge: string; color: string; bg: string; border: string }> = {
  business:   { label: "Business Member",  badge: "BUSINESS",       color: "#7C3AED", bg: "bg-purple-50",  border: "border-purple-200" },
  pro:        { label: "Pro Member",       badge: "PRO MEMBER",     color: "#0A1628", bg: "bg-[#0A1628]/5", border: "border-[#0A1628]/20" },
  core:       { label: "Core Member",      badge: "CORE",           color: "#1D4ED8", bg: "bg-blue-50",    border: "border-blue-200" },
  enterprise: { label: "Enterprise Member", badge: "ENTERPRISE",    color: "#059669", bg: "bg-emerald-50", border: "border-emerald-200" },
};

// --- Success State Component --------------------------------------------------
function SuccessState({
  data,
  referralLink,
  email,
  onClose,
}: {
  data: { position?: number; tierLabel?: string; referralCode?: string; ownJobRate?: number; spotsRemaining?: { charter: number; founding: number; total: number } };
  referralLink: string;
  email: string;
  onClose: () => void;
}) {
  const tierKey = (() => {
    const label = (data.tierLabel ?? "").toLowerCase();
    if (label.includes("enterprise")) return "enterprise";
    if (label.includes("business")) return "business";
    if (label.includes("pro")) return "pro";
    return "core";
  })();
  const tierConf = TIER_BADGE_CONFIG[tierKey] ?? TIER_BADGE_CONFIG.core;
  const referralCode = data.referralCode ?? "";
  const refUrl = `https://prolnk.xyz/join?ref=${referralCode}`;
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 90);
  const trialEndStr = trialEndDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const twitterText = `Just joined the ProLnk Partner Network! Get your spot at prolnk.xyz — AI-powered home services referrals. Use my link: ${refUrl}`;
  const linkedinText = `Excited to join ProLnk as a ${tierConf.label}. ProLnk pays contractors up to 72% of every referral commission — AI finds the leads in your job photos automatically. Claim your spot: ${refUrl}`;
  const smsText = `Hey! I just reserved my spot in ProLnk — they pay you commissions from photos you already take at jobs. Check it out: ${refUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(refUrl)}&summary=${encodeURIComponent(linkedinText)}`;
  const smsUrl = `sms:?body=${encodeURIComponent(smsText)}`;

  return (
    <div className="py-2">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#0A1628] mb-1">You're on the ProLnk waitlist!</h2>
        <p className="text-gray-500 text-sm">Confirmation sent to {email}</p>
      </div>

      {/* Tier + Position hero card */}
      <div className={`rounded-2xl border-2 p-5 mb-4 ${tierConf.bg} ${tierConf.border}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <span
              className="inline-block text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full text-white mb-2"
              style={{ backgroundColor: tierConf.color }}
            >
              {tierConf.badge}
            </span>
            <div className="text-xl font-heading font-bold text-gray-900">{tierConf.label}</div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-heading font-black" style={{ color: tierConf.color }}>
              #{data.position ?? "—"}
            </div>
            <div className="text-xs text-gray-500 font-medium">Network Position</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200/60">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-900">Rate locked in</div>
              <div className="text-[10px] text-gray-500">Based on your plan</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-900">Trial ends {trialEndStr}</div>
              <div className="text-[10px] text-gray-500">90-day free trial</div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral code + URL */}
      <div className="bg-[#0A1628] rounded-xl p-4 mb-4">
        <p className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#F5E642]" /> Your Referral Code
        </p>
        <p className="text-white/50 text-xs mb-3">Share your link and move up the waitlist priority queue.</p>

        {/* Code copy row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 bg-white/10 rounded-lg px-3 py-2 flex items-center justify-between">
            <span className="text-[#F5E642] text-base font-black tracking-widest font-mono">{referralCode}</span>
            <button
              onClick={() => { navigator.clipboard.writeText(referralCode); toast.success("Code copied!"); }}
              className="text-white/60 hover:text-[#F5E642] transition-colors ml-2"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* URL copy row */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 mb-3">
          <span className="text-white/60 text-xs font-mono truncate flex-1">{refUrl}</span>
          <button
            onClick={() => { navigator.clipboard.writeText(refUrl); toast.success("Link copied!"); }}
            className="text-white/60 hover:text-[#F5E642] transition-colors flex-shrink-0"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-4 gap-2">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <Twitter className="w-4 h-4" />
            <span className="text-[9px] font-semibold">X</span>
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-[9px] font-semibold">LinkedIn</span>
          </a>
          <a
            href={smsUrl}
            className="flex flex-col items-center gap-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-[9px] font-semibold">SMS</span>
          </a>
          <button
            onClick={() => { navigator.clipboard.writeText(refUrl); toast.success("Copied!"); }}
            className="flex flex-col items-center gap-1 py-2 rounded-lg bg-[#F5E642]/20 hover:bg-[#F5E642]/30 transition-colors text-[#F5E642]"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-[9px] font-semibold">Copy</span>
          </button>
        </div>
      </div>

      {/* 3 next steps */}
      <div className="mb-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your 3 Next Steps</p>
        <div className="space-y-2">
          {[
            { num: "1", title: "Complete your profile", desc: "Add your license, trade details, and service area", href: `/waitlist-status?ref=${referralCode}` },
            { num: "2", title: "Add your first home", desc: "Protect your own home in TrustyPro — it's included", href: `/trustypro/waitlist?ref=${btoa(email).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase()}` },
            { num: "3", title: "Invite 5 pros", desc: "Move up the waitlist and unlock priority routing benefits", href: undefined },
          ].map((step) => (
            <div key={step.num} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                style={{ backgroundColor: tierConf.color }}
              >
                {step.num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900">{step.title}</div>
                <div className="text-xs text-gray-500">{step.desc}</div>
              </div>
              {step.href && (
                <a href={step.href} className="shrink-0">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Referral dashboard link */}
      {referralCode && (
        <a
          href={`/waitlist-status?ref=${referralCode}`}
          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0A1628] text-white rounded-xl text-sm font-semibold hover:bg-[#1a2a40] transition-colors mb-3"
        >
          View My Referral Dashboard <ArrowRight className="w-4 h-4" />
        </a>
      )}

      <button onClick={onClose} className="w-full text-xs text-gray-400 hover:text-gray-600 underline">Close</button>
    </div>
  );
}

// --- Pro Waitlist Modal -------------------------------------------------------
const TIERS_ORDERED_PW = [1, 2, 3, 4, 5] as const;

function TradeSearchDropdown({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const q = query.toLowerCase();
  const filtered = q
    ? SERVICE_CATEGORIES.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    : SERVICE_CATEGORIES;

  const grouped = TIERS_ORDERED_PW.map((tier) => ({
    tier,
    label: TIER_LABELS[tier],
    items: filtered.filter((c) => c.tier === tier),
  })).filter((g) => g.items.length > 0);

  return (
    <div ref={ref} className="mb-3 relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 bg-white text-left flex items-center justify-between"
      >
        <span className={selected.length > 0 ? "text-gray-900" : "text-gray-400"}>
          {selected.length > 0
            ? `${selected.length} trade${selected.length > 1 ? "s" : ""} selected`
            : "Select your trades / services *"}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-72 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 p-2">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-md border border-gray-200">
              <Search size={13} className="text-gray-400 flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trades…"
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 text-base leading-none">&times;</button>
              )}
            </div>
          </div>

          {grouped.length === 0 && (
            <p className="text-xs text-center text-gray-400 py-6">No trades found for "{query}"</p>
          )}

          {grouped.map(({ tier, label, items }) => (
            <div key={tier}>
              <div className="px-3 py-1.5 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-[52px]">
                {label}
              </div>
              {items.map((cat) => {
                const checked = selected.includes(cat.id);
                return (
                  <label key={cat.id} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(cat.id)}
                      className="rounded border-gray-300 text-[#0A1628] focus:ring-[#0A1628]/30 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-sm text-gray-800 font-medium">{cat.name}</span>
                      <p className="text-xs text-gray-400 truncate">{cat.description}</p>
                    </div>
                    {checked && <CheckCircle size={14} className="text-[#0A1628] flex-shrink-0" />}
                  </label>
                );
              })}
            </div>
          ))}

          {/* Other — synthetic option for trades we don't list */}
          <div className="border-t border-gray-100">
            <div className="px-3 py-1.5 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-[52px]">
              Other
            </div>
            <label className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes("other")}
                onChange={() => onToggle("other")}
                className="rounded border-gray-300 text-[#0A1628] focus:ring-[#0A1628]/30 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-sm text-gray-800 font-medium">Other (describe below)</span>
                <p className="text-xs text-gray-400">Tell us about your trade in the notes section</p>
              </div>
              {selected.includes("other") && <CheckCircle size={14} className="text-[#0A1628] flex-shrink-0" />}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

function ProWaitlistModal({ onClose, charterCode }: { onClose: () => void; charterCode?: string | null }) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [referralLink, setReferralLink] = useState("");
  const [workStyle, setWorkStyle] = useState<"solo" | "owner" | "scout" | "">("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    companyName: "", businessAddress: "", city: "", state: "TX", zip: "",
    serviceRadiusMiles: "25",
    yearsInBusiness: "", employeeCount: "", estimatedJobsPerMonth: "",
    hearAboutUs: "", currentSoftware: "",
  });
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [licenseFile, setLicenseFile] = useState<{ url: string; name: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  // Capture referral code from URL
  const inboundRefCode = (() => {
    const p = new URLSearchParams(window.location.search);
    return p.get("ref") || localStorage.getItem("prolnk_referral_code") || undefined;
  })();

  const join = trpc.waitlist.joinProWaitlist.useMutation({
    onSuccess: (data, vars) => {
      const base = window.location.origin;
      // Use the server-assigned referral code if available, fallback to email slug
      const code = data?.referralCode || btoa(vars.email).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
      // Store for use across sessions
      localStorage.setItem("prolnk_referral_code", code);
      localStorage.setItem("prolnk_user_email", vars.email);
      setReferralLink(`${base}/join?ref=${code}`);
      setStep("success");
    },
    onError: (e: { message?: string }) => toast.error(e.message || "Something went wrong."),
  });
  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 mb-3";
  const selectCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 mb-3 text-gray-700 bg-white";

  const toggleTrade = (id: string) => {
    setSelectedTrades(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-5 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none">×</button>
        {step === "success" && join.data ? (
          <SuccessState
            data={join.data}
            referralLink={referralLink}
            email={form.email}
            onClose={onClose}
          />
        ) : (
          <>
            {charterCode && (
              <div className="mb-4 rounded-xl bg-[#0A1628] px-4 py-3 flex items-center gap-3">
                <span className="text-xl">🏆</span>
                <div>
                  <div className="text-[#F5E642] text-sm font-black">Charter Member Invite</div>
                  <div className="text-white/70 text-xs">Code: <span className="font-mono text-white/90">{charterCode}</span> — Position #1-25 reserved</div>
                </div>
              </div>
            )}
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

            {/* How Do You Work */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-3">How do you work? *</p>
            <div className="grid grid-cols-1 gap-2 mb-4">
              {([
                {
                  value: "solo" as const,
                  icon: User,
                  label: "Solo Contractor",
                  desc: "I work independently — handyman, single-trade specialist, or solo operator",
                },
                {
                  value: "owner" as const,
                  icon: Building2,
                  label: "Business Owner",
                  desc: "I own a company with employees or subcontractors",
                },
                {
                  value: "scout" as const,
                  icon: Users,
                  label: "Project Manager / Scout",
                  desc: "I manage crews and want to build a network of pros",
                },
              ] as const).map(({ value, icon: Icon, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setWorkStyle(value)}
                  className={`w-full flex items-start gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                    workStyle === value
                      ? "border-[#0A1628] bg-[#0A1628]/5"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${workStyle === value ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${workStyle === value ? "text-[#0A1628]" : "text-gray-800"}`}>{label}</div>
                    <div className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</div>
                  </div>
                  {workStyle === value && (
                    <CheckCircle className="w-4 h-4 text-[#0A1628] shrink-0 ml-auto mt-1" />
                  )}
                </button>
              ))}
            </div>

            {/* Employee Count — only when owner or scout */}
            {(workStyle === "owner" || workStyle === "scout") && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">How many people work under you?</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Just me (1)", value: "Just me" },
                    { label: "2–5 people", value: "2-5" },
                    { label: "6–15 people", value: "6-15" },
                    { label: "16–50 people", value: "16-50" },
                    { label: "50+ people", value: "50+" },
                  ].map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, employeeCount: value }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        form.employeeCount === value
                          ? "bg-[#0A1628] text-white border-[#0A1628]"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Company Info */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Company Information</p>
            <input placeholder="Company name *" value={form.companyName} onChange={set("companyName")} className={inputCls} />

            {/* Trades Multi-Select */}
            <TradeSearchDropdown selected={selectedTrades} onToggle={toggleTrade} />
            {selectedTrades.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedTrades.map(id => {
                  const cat = SERVICE_CATEGORIES.find(c => c.id === id);
                  return (
                    <span key={id} className="inline-flex items-center gap-1 bg-[#0A1628]/10 text-[#0A1628] text-xs font-medium px-2 py-1 rounded-full">
                      {cat ? `${cat.icon} ${cat.name}` : id}
                      <button onClick={() => toggleTrade(id)} className="hover:text-red-500 leading-none">&times;</button>
                    </span>
                  );
                })}
              </div>
            )}

            {/* Business Details */}
            <div className="mb-3">
              <select value={form.yearsInBusiness} onChange={set("yearsInBusiness")} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 text-gray-700 bg-white">
                <option value="">Years in business</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1 - 3 years</option>
                <option value="3-5">3 - 5 years</option>
                <option value="5-10">5 - 10 years</option>
                <option value="10+">10+ years</option>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
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
                if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.companyName) {
                  toast.error("First name, last name, email, phone, and company name are required."); return;
                }
                if (!form.city) {
                  toast.error("City is required."); return;
                }
                const stateNorm = (form.state || "").trim().toUpperCase().slice(0, 2);
                if (stateNorm.length !== 2 || !/^[A-Z]{2}$/.test(stateNorm)) {
                  toast.error("Please enter a valid 2-letter state (e.g. TX)."); return;
                }
                if (form.phone.replace(/\D/g, "").length < 7) {
                  toast.error("Please enter a valid phone number."); return;
                }
                if (selectedTrades.length === 0) {
                  toast.error("Please select at least one trade or service."); return;
                }
                const tradesNote = selectedTrades.length > 1 ? ` | Additional trades: ${selectedTrades.slice(1).join(", ")}` : "";
                const baseNote = charterCode ? `Charter invite: ${charterCode}` : "";
                join.mutate({
                  firstName: form.firstName.trim(),
                  lastName: form.lastName.trim(),
                  email: form.email.trim().toLowerCase(),
                  phone: form.phone,
                  trade: selectedTrades[0],
                  primaryCity: form.city.trim(),
                  primaryState: stateNorm,
                  referredBy: inboundRefCode ?? undefined,
                  workStyle: workStyle || undefined,
                  employeeCount: form.employeeCount || undefined,
                  notes: (baseNote + tradesNote).trim() || undefined,
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

// --- Charter Codes ----------------------------------------------------------------
const VALID_CHARTER_CODES = [
  "CHARTER-F16F40FE", "CHARTER-F5B1F1AF", "CHARTER-839DE8B2", "CHARTER-C246539B", "CHARTER-AAB021AB",
  "CHARTER-601B3AC9", "CHARTER-1A36E2C9", "CHARTER-A20CD22B", "CHARTER-A340874D", "CHARTER-3EDBEC0E",
  "CHARTER-6B0E5F24", "CHARTER-82C5D09C", "CHARTER-2A0C6299", "CHARTER-B73EBBD6", "CHARTER-63DC75AE",
  "CHARTER-58FA78E8", "CHARTER-A7BF7415", "CHARTER-4203A78A", "CHARTER-F90E151D", "CHARTER-2765498B",
  "CHARTER-BCB57B1F", "CHARTER-13A2DA1A", "CHARTER-BA8E75A6", "CHARTER-4A37423B", "CHARTER-71DEB259",
];

// --- Charter Invite Banner --------------------------------------------------------
function CharterInviteBanner({ code }: { code: string }) {
  return (
    <div className="bg-[#0A1628] border-b-4 border-[#F5E642] py-5 px-4">
      <div className="container flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#F5E642] text-lg">🏆</span>
            <span className="text-[#F5E642] text-base font-black tracking-wide">You've been personally invited for a Charter Member spot</span>
          </div>
          <p className="text-white/80 text-sm mb-1">
            This exclusive link reserves your position in the first 25 founding members.
          </p>
          <p className="text-[#F5E642]/90 text-sm font-semibold">
            Charter members get the same $149/mo rate — locked forever with priority position #1-25
          </p>
        </div>
        <div className="shrink-0 bg-[#F5E642]/10 border border-[#F5E642]/30 rounded-lg px-4 py-2 text-center">
          <div className="text-[10px] font-black text-[#F5E642] tracking-widest uppercase mb-0.5">Invite Code</div>
          <div className="text-[#F5E642] font-mono text-xs font-bold">{code}</div>
        </div>
      </div>
    </div>
  );
}

// --- Main Landing Page -------------------------------------------------------------
export default function ProWaitlist() {
  const { user } = useAuth();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const openWaitlist = () => setShowWaitlist(true);

  const charterCode = (() => {
    const p = new URLSearchParams(window.location.search);
    const code = (p.get("charter") ?? "").toUpperCase();
    return VALID_CHARTER_CODES.includes(code) ? code : null;
  })();

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
  const { data: publicCounts } = trpc.waitlist.getPublicCounts.useQuery(undefined, { refetchInterval: 60000 });
  const totalSignups = publicCounts?.pros ?? 0;
  const TOTAL_NETWORK_SPOTS = 2125;
  const spotsUsed = totalSignups;
  const spotsRemaining = Math.max(0, TOTAL_NETWORK_SPOTS - totalSignups);
  const spotsPercent = Math.min(100, Math.round((spotsUsed / TOTAL_NETWORK_SPOTS) * 100));

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>ProLnk — Join the AI-Powered Home Services Partner Network</title>
        <meta name="description" content="Join the ProLnk Partner Network. Keep up to 72% of every referral commission. AI finds leads in your job photos automatically. DFW Texas, launching nationally." />
        <meta property="og:title" content="ProLnk — The AI-Powered Home Services Partner Network" />
        <meta property="og:description" content="Join the ProLnk Partner Network. Keep up to 72% of every referral commission. AI finds leads in your job photos automatically. DFW Texas, launching nationally." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prolnk.xyz/pro-waitlist" />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ProLnk — The AI-Powered Home Services Partner Network" />
        <meta name="twitter:description" content="Join the ProLnk Partner Network. Keep up to 72% of every referral commission. AI finds leads in your job photos automatically." />
        <meta name="twitter:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <link rel="canonical" href="https://prolnk.xyz/pro-waitlist" />
      </Helmet>

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
            <a href="https://trustypro.io">
              <Button variant="ghost" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                TrustyPro — Homeowners
              </Button>
            </a>
            
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
            <a href="https://trustypro.io" className="block">
              <Button variant="ghost" className="w-full text-sm text-blue-600 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                TrustyPro — Homeowner Waitlist
              </Button>
            </a>

          </div>
        )}
      </nav>

      {/* -- Urgency Bar -- */}
      <div className="bg-[#0A1628] border-b border-white/10 py-2 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-[#F5E642] text-xs font-black uppercase tracking-wider whitespace-nowrap">
              Waitlist Open
            </span>
            <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden min-w-0">
              <div
                className="h-1.5 rounded-full transition-all duration-700 bg-[#F5E642]"
                style={{ width: `${spotsPercent}%` }}
              />
            </div>
            <span className="text-white/60 text-xs whitespace-nowrap">
              {totalSignups} / {TOTAL_NETWORK_SPOTS} joined
            </span>
          </div>
          <span
            onClick={openWaitlist}
            className="cursor-pointer text-xs font-bold text-[#0A1628] bg-[#F5E642] px-3 py-1 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Claim Your Spot →
          </span>
        </div>
      </div>

      {/* -- Charter Invite Banner -- */}
      {charterCode && <CharterInviteBanner code={charterCode} />}

      {/* -- 1. Hero -- */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#050d1a" }}>
        <div className="absolute inset-0">
          <img
            src="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp"
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.05] mb-6 tracking-tight">
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
              <div className="flex flex-wrap items-center gap-6 mt-12 pt-10 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white"><CountUp target={148} suffix="+" /></div>
                  <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">Active Partners</div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white"><CountUp target={820} suffix="+" /></div>
                  <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">Leads Detected</div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/10" />
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

              {/* Pricing Tier Summary Sidebar */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-[#0A1628] px-5 py-4">
                  <h4 className="font-heading font-bold text-white text-sm">Choose Your Plan</h4>
                  <p className="text-white/50 text-xs mt-0.5">Flat monthly fee. No contracts. Cancel anytime.</p>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { key: "core",     label: "Core",     fee: "$99/mo",   keep: "54% keep", seats: "1 seat",    color: "#059669" },
                    { key: "pro",      label: "Pro",      fee: "$149/mo",  keep: "65% keep", seats: "3 seats",   color: "#1D4ED8" },
                    { key: "business", label: "Business", fee: "$249/mo",  keep: "72% keep", seats: "8 seats",   color: "#0A1628" },
                    { key: "enterprise", label: "Enterprise", fee: "Custom", keep: "Negotiated", seats: "Unlimited", color: "#7C3AED" },
                  ].map((plan) => (
                    <div key={plan.key} className="rounded-xl p-3 border border-gray-200 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[8px] font-black tracking-wide uppercase px-1.5 py-0.5 rounded text-white leading-tight"
                            style={{ backgroundColor: plan.color }}
                          >
                            {plan.label}
                          </span>
                          <span className="font-semibold text-gray-900 text-sm">{plan.fee}</span>
                        </div>
                        <div className="text-xs text-gray-500 text-right">
                          <span className="font-semibold text-gray-700">{plan.keep}</span>
                          <span className="text-gray-400"> · {plan.seats}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-1">
                    <p className="text-[10px] text-amber-800 leading-snug font-medium">
                      ProLnk retains a minimum 20% of the commission pool on every closed job.
                    </p>
                  </div>
                  <span onClick={openWaitlist} className="cursor-pointer block">
                    <button className="w-full py-2.5 text-sm font-bold bg-[#0A1628] text-white hover:opacity-90 transition-all rounded-lg">
                      Join the Waitlist
                    </button>
                  </span>
                </div>
              </div>

        
      {/* Scout Standalone Subscription */}
      <div className="max-w-4xl mx-auto mb-14">
        <div className="rounded-2xl border-2 border-[#0A1628] overflow-hidden">
          <div className="bg-[#0A1628] px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F5E642]">Scout Subscription</span>
                <span className="bg-[#F5E642]/20 text-[#F5E642] text-xs font-bold px-2.5 py-0.5 rounded-full">$99/mo standalone</span>
              </div>
              <h3 className="text-xl font-bold text-white">Not a service pro? Earn from every job you bring in.</h3>
            </div>
          </div>
          <div className="p-6 md:p-8 bg-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Scouts find opportunities, onboard homeowners, and coordinate bids — without doing the work themselves.
                  You earn origination rights on every property you bring to the network: <strong>1.5% of the platform fee
                  on every job at that address, forever</strong> — even if you never touch it again.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Permanent origination rights", detail: "1.5% of platform fee on every job at properties you onboard — forever" },
                    { label: "Coordinate multi-trade bids", detail: "Scope the job, get homeowner approval, post to the Exchange with your margin built in" },
                    { label: "Onboard homeowners to TrustyPro", detail: "Pre-move-in repairs, new construction walkthroughs, insurance inspections" },
                    { label: "Referral commissions on closed jobs", detail: "Every time a job closes at a property you brought in, you earn" },
                    { label: "Access the ProLnk Exchange job board", detail: "Post and coordinate large residential and commercial projects" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#0A1628]" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Built for</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Real estate agents", "Home inspectors", "Insurance adjusters", "Property managers", "GCs needing subs"].map((who) => (
                      <span key={who} className="bg-white border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full">{who}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#0A1628]/5 rounded-xl p-5 mb-4">
                  <p className="text-xs font-semibold text-[#0A1628] uppercase tracking-wider mb-3">Origination income example</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A Scout who onboards <strong>50 homes</strong>, each generating 2 jobs/year at $3,500 average,
                    earns <strong className="text-[#0A1628]">$9,450/year in passive origination income</strong> — 
                    growing with every property added, compounding for the life of the platform.
                  </p>
                </div>
                <button
                  onClick={() => document.dispatchEvent(new CustomEvent("open-pro-waitlist"))}
                  className="w-full py-3.5 bg-[#0A1628] text-white font-bold text-sm tracking-wide hover:opacity-90 transition-opacity rounded-none mb-3"
                >
                  Apply as Scout — $99/mo
                </button>
                <p className="text-center text-xs text-gray-400">90-day free trial · month-to-month · cancel anytime</p>
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-semibold mb-1">Already a service pro?</p>
                  <p className="text-xs text-gray-500">Add TrustyPro Connect to your existing plan for $49/mo instead of starting a separate subscription.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              Join the waitlist now. Start earning referral commissions from your first job.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <span onClick={openWaitlist} className="cursor-pointer">
              <button
                className="inline-flex items-center gap-3 px-10 py-5 text-base font-bold tracking-wide transition-all hover:opacity-90"
                style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
              >
                Apply Now <ArrowRight className="h-5 w-5" />
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
              <p>&copy; 2026 ProLnk. All rights reserved. &nbsp;&nbsp; <span className="text-[#F5E642] font-semibold">Patent Pending</span></p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/advertise" className="hover:text-white transition-colors">Advertise</Link>
                <a href="mailto:hello@prolnk.xyz" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Pro Waitlist Modal */}
      {showWaitlist && (
        <ProWaitlistModal onClose={() => setShowWaitlist(false)} charterCode={charterCode} />
      )}
      <BackToTop />
    </div>
  );
}


