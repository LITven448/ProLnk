import { useState, useMemo, useEffect, useRef, type ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import ProLnkLogo from "@/components/ProLnkLogo";
import BackToTop from "@/components/BackToTop";
import { motion, useReducedMotion } from "framer-motion";
import { FadeUp, FadeIn, StaggerChildren, StaggerItem, CountUp } from "@/components/ScrollAnimations";
import { trpc } from "@/lib/trpc";
import { track } from "@/lib/analytics";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Users, TrendingUp, DollarSign, Star, CheckCircle, ChevronDown, ChevronUp,
  ArrowRight, Zap, Camera, Menu, X, Shield, BadgeCheck, Play,
  Radar, CloudLightning, Clock, AlertTriangle, Home as HomeIcon, Eye, Repeat,
  Copy, Share2, Twitter, Linkedin, MessageSquare, Lock, Calendar,
  User, Building2, Search, MapPin,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "@/data/serviceCategories";
import { Button } from "@/components/ui/button";

// --- Design tokens ------------------------------------------------------------
// Backgrounds: white #FFFFFF / warm ivory #FAFAF8, soft stone-50 #FAFAF9 / warm sand #F7F2EA tints
// Text: slate-900 headings, slate-600 body
// Accent: bronze family — deep #8A5A24, primary #9A6A2F, mid #B08544, light #C89B5A, tint #F5EDE0, border #D9C7A8. Primary CTAs charcoal #1E293B (hover #0F172A), bronze #C89B5A arrows
// Dark (sparingly, final CTA only): deep slate #1E293B

// --- Pricing -- Core $99/40%, Pro $149/50%, Business $249/60%, Enterprise custom ------
const PRICING_TIERS = [
  {
    name: "Core",
    subtitle: "Start earning",
    monthlyFee: 99,
    keepRate: 0.40,
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
      "Keep 40% of every referral commission",
      "Event-driven leads (storm, aging, recalls)",
      "Mobile app access",
    ],
  },
  {
    name: "Pro",
    subtitle: "Most popular",
    monthlyFee: 149,
    keepRate: 0.50,
    commissionCap: null,
    seats: 3,
    popular: true,
    cta: "Get Pro",
    apiAccess: true,
    tier: "pro",
    features: [
      "Everything in Core, plus:",
      "Up to 3 user seats",
      "Keep 50% of every referral commission",
      "API & webhook access",
      "Priority lead routing",
      "Weekly performance analytics",
    ],
  },
  {
    name: "Business",
    subtitle: "Scale your team",
    monthlyFee: 249,
    keepRate: 0.60,
    commissionCap: null,
    seats: 8,
    popular: false,
    cta: "Get Business",
    apiAccess: true,
    tier: "business",
    features: [
      "Everything in Pro, plus:",
      "Up to 8 user seats",
      "Keep 60% of every referral commission",
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
    description: "Onboard homeowners to TrustyPro and coordinate bids on multi-trade projects on top of your Core, Pro, or Business plan.",
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
  { group: "Outdoor & Lawn", categories: ["Lawn Care & Mowing", "Landscaping & Design", "Tree Trimming & Removal", "Irrigation & Sprinklers", "Hardscaping & Patios", "Outdoor Lighting", "Drainage Solutions"] },
  { group: "Home Maintenance", categories: ["Handyman Services", "Fencing & Gates", "Roofing & Gutters", "HVAC Service & Repair", "Plumbing", "Electrical", "Garage Door Service", "Foundation Repair"] },
  { group: "Cleaning & Restoration", categories: ["House Cleaning", "Pressure Washing", "Window Cleaning", "Carpet Cleaning", "Gutter Cleaning", "Junk Removal", "Mold Remediation"] },
  { group: "Specialty Trades", categories: ["Interior & Exterior Painting", "Pool Service & Repair", "Pest Control", "Security Systems", "Solar Installation", "Kitchen & Bath Remodeling"] },
  { group: "Pet & Animal", categories: ["Pet Waste Removal", "Dog Walking & Pet Sitting", "Pet Grooming"] },
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
    a: "When ProLnk generates a lead that closes, we take a small platform fee (3-12% of job value). You keep your tier's percentage of that fee — never out of what you would normally charge the customer. Core keeps 40% of the fee, Pro keeps 50%, Business keeps 60%. ProLnk always retains a minimum 20% of the commission pool. Commissions are paid monthly and tracked in real time.",
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
      <FadeUp className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Pick Your Plan</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          Flat monthly fee plus a 10% platform fee on closed jobs. No contracts. Upgrade or cancel anytime.
        </p>
      </FadeUp>

      {/* Tier Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
        {PRICING_TIERS.map((tier, idx) => (
          <div
            key={tier.name}
            onClick={() => setActiveTierIdx(idx)}
            className={`relative rounded-2xl p-7 flex flex-col border-2 cursor-pointer transition-all ${
              activeTierIdx === idx
                ? "border-[#9A6A2F] shadow-xl scale-[1.02]"
                : "border-gray-200 shadow-sm hover:border-gray-400"
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 text-xs font-bold tracking-widest uppercase text-[#9A6A2F] border border-[#B08544] bg-[#FAFAF8] rounded-full">
                  Most Popular
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
              <TrendingUp className="h-4 w-4 text-[#9A6A2F]" />
              <span className="text-sm font-bold text-[#9A6A2F]">
                {tier.keepRate != null ? `Keep ${(tier.keepRate * 100).toFixed(0)}% of every referral` : "Negotiated keep rate"}
              </span>
            </div>
            <ul className="space-y-2 mb-6 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#9A6A2F]" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
                onClick={(e) => { e.stopPropagation(); document.dispatchEvent(new CustomEvent("open-pro-waitlist")); }}
                className={`w-full py-3 text-sm font-bold tracking-wide transition-all rounded-none ${
                  activeTierIdx === idx
                    ? "bg-[#1E293B] text-white hover:bg-[#0F172A]"
                    : "border-2 border-[#1E293B] text-slate-900 hover:bg-[#1E293B] hover:text-white"
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
                  isOn ? "border-[#9A6A2F] bg-[#F5EDE0]" : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => toggleAddon(addon.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${ isOn ? "bg-[#9A6A2F] text-white" : "bg-gray-100 text-gray-500" }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{addon.name}</div>
                      <div className="text-xs text-gray-500">${addon.price} {addon.unit}</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    isOn ? "border-[#9A6A2F] bg-[#9A6A2F]" : "border-gray-300"
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
                      aria-label={`Decrease ${addon.unitLabel}`}
                      className="w-6 h-6 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 flex items-center justify-center text-sm font-bold"
                      onClick={() => setAddonQty(addon.id, qty - 1)}
                    >-</button>
                    <span className="text-sm font-bold text-gray-900 w-4 text-center">{qty}</span>
                    <button
                      aria-label={`Increase ${addon.unitLabel}`}
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
          <div className="rounded-2xl bg-gradient-to-r from-[#1E293B] to-[#334155] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
            <button onClick={() => document.dispatchEvent(new CustomEvent("open-pro-waitlist"))} className="px-8 py-3 bg-white text-slate-900 font-bold text-sm tracking-wide hover:opacity-90 transition-all rounded-none shrink-0">
                Join the Waitlist
              </button>
          </div>
        </div>
      )}

      <p className="text-center text-sm text-gray-400 mt-8">All plans include FSM integration. No contracts -- upgrade or cancel anytime.</p>
    </div>
  );
}

// --- Partner Spotlight Section --------------------------------------------------
const TIER_COLORS: Record<string, string> = {
  enterprise: "#8A5A24",
  business: "#9A6A2F",
  pro: "#9A6A2F",
  core: "#B08544",
};
const TIER_LABELS: Record<string, string> = {
  enterprise: "Enterprise",
  business: "Business",
  pro: "Pro",
  core: "Core",
};

function PartnerSpotlightSection() {
  return (
    <section id="spotlight" className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-widest text-[#9A6A2F] uppercase mb-3 px-3 py-1 bg-[#FAFAF8] border border-[#B08544]/50 rounded-full">Founding Cohort</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">The DFW founding cohort is forming</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            We're hand-selecting the first verified pros across the Dallas–Fort Worth metro. Spots are limited — early members get first access when we launch.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-3 text-[#9A6A2F]" />
            <div className="font-heading font-bold text-gray-900 text-sm">Checkr background-verified</div>
            <div className="text-xs text-gray-500 mt-1">Every pro is screened before they join.</div>
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center">
            <HomeIcon className="w-8 h-8 mx-auto mb-3 text-[#9A6A2F]" />
            <div className="font-heading font-bold text-gray-900 text-sm">DFW first</div>
            <div className="text-xs text-gray-500 mt-1">Launching across the Dallas–Fort Worth metro.</div>
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-3 text-[#9A6A2F]" />
            <div className="font-heading font-bold text-gray-900 text-sm">Patent-pending engine</div>
            <div className="text-xs text-gray-500 mt-1">AI finds leads in your job photos automatically.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Tier badge config for success state --------------------------------------
const TIER_BADGE_CONFIG: Record<string, { label: string; badge: string; color: string; bg: string; border: string }> = {
  business:   { label: "Business Member",  badge: "BUSINESS",       color: "#9A6A2F", bg: "bg-[#F5EDE0]",    border: "border-[#D9C7A8]" },
  pro:        { label: "Pro Member",       badge: "PRO MEMBER",     color: "#9A6A2F", bg: "bg-[#F5EDE0]", border: "border-[#D9C7A8]" },
  core:       { label: "Core Member",      badge: "CORE",           color: "#B08544", bg: "bg-[#F5EDE0]", border: "border-[#D9C7A8]" },
  enterprise: { label: "Enterprise Member", badge: "ENTERPRISE",    color: "#8A5A24", bg: "bg-[#F5EDE0]",    border: "border-[#D9C7A8]" },
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
  const linkedinText = `Excited to join ProLnk as a ${tierConf.label}. ProLnk pays contractors up to 60% of every referral commission — AI finds the leads in your job photos automatically. Claim your spot: ${refUrl}`;
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
        <h2 className="text-2xl font-bold text-slate-900 mb-1">You're on the ProLnk waitlist!</h2>
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
            <div className="text-xs text-gray-500 font-medium">Waitlist Position</div>
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
      <div className="bg-gradient-to-br from-[#1E293B] to-[#3B3327] rounded-xl p-4 mb-4">
        <p className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#C89B5A]" /> Your Referral Code
        </p>
        <p className="text-white/50 text-xs mb-3">Share your link and move up the waitlist priority queue.</p>

        {/* Code copy row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 bg-white/10 rounded-lg px-3 py-2 flex items-center justify-between">
            <span className="text-white text-base font-black tracking-widest font-mono">{referralCode}</span>
            <button
              onClick={() => { navigator.clipboard.writeText(referralCode); toast.success("Code copied!"); }}
              aria-label="Copy referral code"
              className="text-white/60 hover:text-white transition-colors ml-2"
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
            aria-label="Copy referral link"
            className="text-white/60 hover:text-white transition-colors flex-shrink-0"
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
            className="flex flex-col items-center gap-1 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
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
                <a href={step.href} aria-label={step.title} className="shrink-0">
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
          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E293B] text-white rounded-xl text-sm font-semibold hover:bg-[#0F172A] transition-colors mb-3"
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
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#9A6A2F]/30 bg-white text-left flex items-center justify-between"
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
                aria-label="Search trades"
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-[#9A6A2F]/30 rounded"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="text-gray-400 hover:text-gray-600 text-base leading-none">&times;</button>
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
                      className="rounded border-gray-300 text-[#9A6A2F] focus:ring-[#9A6A2F]/30 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-sm text-gray-800 font-medium">{cat.name}</span>
                      <p className="text-xs text-gray-400 truncate">{cat.description}</p>
                    </div>
                    {checked && <CheckCircle size={14} className="text-[#9A6A2F] flex-shrink-0" />}
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
                className="rounded border-gray-300 text-[#9A6A2F] focus:ring-[#9A6A2F]/30 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-sm text-gray-800 font-medium">Other (describe below)</span>
                <p className="text-xs text-gray-400">Tell us about your trade in the notes section</p>
              </div>
              {selected.includes("other") && <CheckCircle size={14} className="text-[#9A6A2F] flex-shrink-0" />}
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
      track("pro_waitlist_submitted", { referred: Boolean(vars.referredBy) });
      setStep("success");
    },
    onError: (e: { message?: string }) => toast.error(e.message || "Something went wrong."),
  });
  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#9A6A2F]/30 mb-3";
  const selectCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#9A6A2F]/30 mb-3 text-gray-700 bg-white";

  const toggleTrade = (id: string) => {
    setSelectedTrades(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-5 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none">×</button>
        {step === "success" && join.data ? (
          <SuccessState
            data={join.data}
            referralLink={referralLink}
            email={form.email}
            onClose={onClose}
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Join the ProLnk Waitlist</h2>
            <p className="text-gray-500 text-sm mb-5">Be among the first service pros to get access when we launch in your area.</p>

            {/* Owner(s) Info */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Owner(s) Information</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input placeholder="First name *" aria-label="First name" value={form.firstName} onChange={set("firstName")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#9A6A2F]/30" />
              <input placeholder="Last name" aria-label="Last name" value={form.lastName} onChange={set("lastName")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#9A6A2F]/30" />
            </div>
            <input placeholder="Email address *" aria-label="Email address" type="email" value={form.email} onChange={set("email")} className={inputCls} />
            <input placeholder="Phone number *" aria-label="Phone number" value={form.phone} onChange={set("phone")} className={inputCls} />

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
                      ? "border-[#9A6A2F] bg-[#F5EDE0]/60"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${workStyle === value ? "bg-[#9A6A2F] text-white" : "bg-gray-100 text-gray-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${workStyle === value ? "text-[#8A5A24]" : "text-gray-800"}`}>{label}</div>
                    <div className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</div>
                  </div>
                  {workStyle === value && (
                    <CheckCircle className="w-4 h-4 text-[#9A6A2F] shrink-0 ml-auto mt-1" />
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
                          ? "bg-[#9A6A2F] text-white border-[#9A6A2F]"
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
            <input placeholder="Company name *" aria-label="Company name" value={form.companyName} onChange={set("companyName")} className={inputCls} />

            {/* Trades Multi-Select */}
            <TradeSearchDropdown selected={selectedTrades} onToggle={toggleTrade} />
            {selectedTrades.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedTrades.map(id => {
                  const cat = SERVICE_CATEGORIES.find(c => c.id === id);
                  return (
                    <span key={id} className="inline-flex items-center gap-1 bg-[#F5EDE0] text-[#8A5A24] text-xs font-medium px-2 py-1 rounded-full">
                      {cat ? `${cat.icon} ${cat.name}` : id}
                      <button onClick={() => toggleTrade(id)} aria-label={`Remove ${cat ? cat.name : id}`} className="hover:text-red-500 leading-none">&times;</button>
                    </span>
                  );
                })}
              </div>
            )}

            {/* Business Details */}
            <div className="mb-3">
              <select value={form.yearsInBusiness} onChange={set("yearsInBusiness")} aria-label="Years in business" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#9A6A2F]/30 text-gray-700 bg-white">
                <option value="">Years in business</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1 - 3 years</option>
                <option value="3-5">3 - 5 years</option>
                <option value="5-10">5 - 10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
            <select value={form.estimatedJobsPerMonth} onChange={set("estimatedJobsPerMonth")} aria-label="Estimated jobs per month" className={selectCls}>
              <option value="">Estimated jobs per month</option>
              <option value="1-5">1 - 5</option>
              <option value="6-15">6 - 15</option>
              <option value="16-30">16 - 30</option>
              <option value="31-50">31 - 50</option>
              <option value="50+">50+</option>
            </select>

            {/* Current Software */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Field Software <span className="text-gray-300 font-normal normal-case">(optional)</span></p>
            <select value={form.currentSoftware} onChange={set("currentSoftware")} aria-label="Field service software" className={selectCls}>
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
            <input placeholder="Street address *" aria-label="Street address" value={form.businessAddress} onChange={set("businessAddress")} className={inputCls} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              <input placeholder="City *" aria-label="City" value={form.city} onChange={set("city")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#9A6A2F]/30 col-span-1" />
              <input placeholder="State" aria-label="State" value={form.state} onChange={set("state")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#9A6A2F]/30" maxLength={2} />
              <input placeholder="ZIP *" aria-label="ZIP code" value={form.zip} onChange={set("zip")} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#9A6A2F]/30" />
            </div>

            {/* Service Radius */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-1">Service Radius</p>
            <select value={form.serviceRadiusMiles} onChange={set("serviceRadiusMiles")} aria-label="Service radius in miles" className={selectCls + " mb-3"}>
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
                className="rounded border-gray-300 text-[#9A6A2F] focus:ring-[#9A6A2F]/30 mt-0.5"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                Text me when ProLnk launches in my area. <span className="text-gray-400">Message &amp; data rates may apply. Reply STOP to opt out.</span>
              </span>
            </label>

            <select value={form.hearAboutUs} onChange={set("hearAboutUs")} aria-label="How did you hear about us" className={selectCls + " mb-5"}>
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
              className="w-full py-3 rounded-none text-sm font-bold text-white bg-[#1E293B] hover:bg-[#0F172A] transition-colors disabled:opacity-50"
            >
              {join.isPending ? "Joining..." : "Join the Waitlist"}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">No payment required · Cancel anytime</p>
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

// --- Main Landing Page -------------------------------------------------------------
function StickyMobileCTA({ onJoin }: { onJoin: () => void }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <motion.div
      className="fixed bottom-0 inset-x-0 z-[60] md:hidden"
      initial={prefersReducedMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]" style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}>
        <button
          onClick={onJoin}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-[#1E293B] hover:bg-[#0F172A] transition-colors rounded-none"
        >
          Join the Waitlist <ArrowRight className="h-4 w-4 text-[#C89B5A]" />
        </button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

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
  const prefersReducedMotion = useReducedMotion();
  const { data: publicCounts } = trpc.waitlist.getPublicCounts.useQuery(undefined, { refetchInterval: 60000 });
  const totalSignups = publicCounts?.pros ?? 0;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>ProLnk — Join the AI-Powered Home Services Partner Network</title>
        <meta name="description" content="Join the ProLnk Partner Network. Keep up to 60% of every referral commission. AI finds leads in your job photos automatically. DFW Texas, launching nationally." />
        <meta property="og:title" content="ProLnk — The AI-Powered Home Services Partner Network" />
        <meta property="og:description" content="Join the ProLnk Partner Network. Keep up to 60% of every referral commission. AI finds leads in your job photos automatically. DFW Texas, launching nationally." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prolnk.xyz/pro-waitlist" />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ProLnk — The AI-Powered Home Services Partner Network" />
        <meta name="twitter:description" content="Join the ProLnk Partner Network. Keep up to 60% of every referral commission. AI finds leads in your job photos automatically." />
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
                    ? "text-[#8A5A24] border-b-2 border-[#9A6A2F] pb-0.5"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://trustypro.io">
              <Button variant="ghost" className="text-sm font-medium text-[#9A6A2F] hover:text-[#8A5A24] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                TrustyPro — Homeowners
              </Button>
            </a>
            
            <Button onClick={openWaitlist} className="text-sm font-semibold text-white rounded-none px-5 bg-[#1E293B] hover:bg-[#0F172A]">
              Join the Waitlist
            </Button>
          </div>
          <button className="md:hidden p-2" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                <Button className="w-full text-sm text-white rounded-none font-semibold bg-[#1E293B] hover:bg-[#0F172A]">Join the Waitlist</Button>
              </span>
            </div>
            <a href="https://trustypro.io" className="block">
              <Button variant="ghost" className="w-full text-sm text-[#9A6A2F] flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                TrustyPro — Homeowner Waitlist
              </Button>
            </a>

          </div>
        )}
      </nav>

      {/* -- Urgency Bar -- */}
      <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] py-2 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-white text-xs font-black uppercase tracking-wider whitespace-nowrap">
              Waitlist Open
            </span>
            <span className="text-slate-300 text-xs whitespace-nowrap">
              <CountUp target={totalSignups} duration={1.2} /> pros already on the waitlist · Founding cohort · DFW
            </span>
          </div>
          <span
            onClick={openWaitlist}
            className="cursor-pointer text-xs font-bold text-[#8A5A24] bg-white px-3 py-1 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Join the Waitlist →
          </span>
        </div>
      </div>

      {/* -- 1. Hero -- */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#1E293B" }}>
        <div className="absolute inset-0">
          <motion.img
            src="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp"
            alt="Home service AI analysis"
            width={2048}
            height={1143}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
            initial={false}
            animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.04] }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(30,41,59,0.92) 0%, rgba(30,41,59,0.78) 50%, rgba(30,41,59,0.35) 100%)" }} />
        </div>

        <div className="relative container py-28 md:py-36">
          <div className="max-w-2xl">
            <FadeUp delay={0.1}>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 mb-8 tracking-widest uppercase"
                style={{ backgroundColor: "rgba(200,155,90,0.15)", color: "#C89B5A", border: "1px solid rgba(200,155,90,0.35)" }}>
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
                  className="group inline-flex items-center gap-3 px-8 py-4 text-base font-bold tracking-wide transition-all hover:bg-[#B08544] motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98]"
                  style={{ backgroundColor: "#C89B5A", color: "#1E293B" }}
                >
                  Join the Waitlist <ArrowRight className="h-5 w-5 transition-transform motion-safe:group-hover:translate-x-1" />
                </button>
              </span>
            </FadeUp>

            <FadeIn delay={0.6}>
              <div className="flex flex-wrap items-center gap-6 mt-12 pt-10 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white"><CountUp target={totalSignups} duration={1.6} /></div>
                  <div className="text-xs text-slate-300 mt-0.5 uppercase tracking-wider">pros already on the waitlist</div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white">Patent Pending</div>
                  <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">AI lead-detection engine</div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white">Checkr-Verified</div>
                  <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">Background-checked network · DFW</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* -- 2. How It Works -- */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container">
          <FadeUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Four Steps. Zero Extra Work.</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg">No new workflow. No extra selling. Just photos you're already taking -- and an engine that never stops.</p>
          </FadeUp>
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[#F5EDE0]">
                    <item.icon className="h-6 w-6 text-[#9A6A2F]" />
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
      <section id="the-engine" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FAFAF9 0%, #F7F2EA 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #9A6A2F 0%, transparent 50%), radial-gradient(circle at 80% 70%, #9A6A2F 0%, transparent 50%)" }} />
        <div className="container relative">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9C7A8] bg-white mb-6">
                <Radar className="w-4 h-4 text-[#9A6A2F]" />
                <span className="text-xs font-bold text-[#8A5A24] uppercase tracking-wider">Patent-Pending Technology</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">The ProLnk Engine</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
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
                color: "#9A6A2F",
                stat: "50+",
                statLabel: "Detection Types",
              },
              {
                icon: CloudLightning,
                title: "Storm Watch Engine",
                desc: "Monitors NOAA weather data in real time. When severe weather hits, cross-references your photo database to identify properties at risk.",
                color: "#9A6A2F",
                stat: "24/7",
                statLabel: "Weather Monitoring",
              },
              {
                icon: Clock,
                title: "Asset Aging Engine",
                desc: "Tracks equipment age from photos. When a water heater, HVAC unit, or roof approaches end-of-life, generates proactive replacement leads.",
                color: "#8A5A24",
                stat: "12+",
                statLabel: "Asset Categories",
              },
              {
                icon: AlertTriangle,
                title: "Safety Recall Engine",
                desc: "Monitors CPSC manufacturer recalls. When a recalled product is identified in your photos, generates high-priority safety leads.",
                color: "#B08544",
                stat: "100%",
                statLabel: "Recall Coverage",
              },
            ].map((engine) => (
              <StaggerItem key={engine.title}>
                <div className="rounded-2xl p-6 h-full border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${engine.color}1A` }}>
                    <engine.icon className="w-6 h-6" style={{ color: engine.color }} />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-slate-900 mb-2">{engine.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{engine.desc}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-2xl font-heading font-bold" style={{ color: engine.color }}>{engine.stat}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{engine.statLabel}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeUp>
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">How One Photo Becomes Recurring Revenue</h3>
                  <p className="text-slate-500 text-sm">Your photos don't expire. They keep working inside the engine.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { step: "1", label: "You take a photo", icon: Camera, color: "#9A6A2F" },
                    { step: "2", label: "AI detects 3 opportunities", icon: Eye, color: "#9A6A2F" },
                    { step: "3", label: "6 months later: storm hits", icon: CloudLightning, color: "#8A5A24" },
                    { step: "4", label: "Engine matches your photo", icon: Radar, color: "#B08544" },
                    { step: "5", label: "You earn again", icon: DollarSign, color: "#B08544" },
                  ].map((s) => (
                    <div key={s.step} className="text-center">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${s.color}20` }}>
                        <s.icon className="w-5 h-5" style={{ color: s.color }} />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: s.color }}>Step {s.step}</p>
                      <p className="text-xs text-slate-600 leading-snug">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="text-center mt-12">
            <span onClick={openWaitlist} className="cursor-pointer">
              <button className="group px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#0F172A] motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] rounded-none bg-[#1E293B]">
                Join the Waitlist <ArrowRight className="w-4 h-4 inline ml-2 text-[#C89B5A] transition-transform motion-safe:group-hover:translate-x-1" />
              </button>
            </span>
          </div>
        </div>
      </section>

      {/* -- Partner Spotlight -- */}
      <PartnerSpotlightSection />

      {/* -- 3. Who Can Join -- */}
      <section id="who-can-join" className="py-24" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="container">
          <FadeUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Built for the Trades</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Any licensed, insured home service business in DFW. If you work at people's homes, you belong here.
            </p>
          </FadeUp>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_CAN_JOIN.map((group) => (
              <StaggerItem key={group.group}>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-6 rounded-full flex-shrink-0 bg-[#B08544]" />
                    <h3 className="text-base font-heading font-bold text-gray-900">{group.group}</h3>
                  </div>
                  <div className="space-y-1.5">
                    {group.categories.map((cat) => (
                      <div key={cat} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#9A6A2F]" />
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
              <button className="px-6 py-3 text-sm font-semibold border-2 border-[#1E293B] text-slate-900 hover:bg-[#1E293B] hover:text-white transition-all rounded-none">
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

      {/* -- 5. Guarantee & FAQ -- */}
      <section id="guarantee" className="py-16" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="container max-w-5xl mx-auto">
          <FadeUp>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#3B3327] rounded-2xl p-8 text-white">
              <div className="text-4xl mb-4">🛡️</div>
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
                    <CheckCircle className="h-4 w-4 text-white shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <span onClick={openWaitlist} className="cursor-pointer">
                <button className="w-full py-3 text-sm font-bold bg-white text-slate-900 hover:opacity-90 transition-all rounded-none">
                  Join the Waitlist
                </button>
              </span>
            </div>
            <div id="faq">
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">Common Questions</h3>
              <div className="space-y-2">
                {FAQS.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
          </FadeUp>
        </div>
      </section>

      {/* -- 6. Final CTA -- */}
      <section className="py-24" style={{ backgroundColor: "#1E293B" }}>
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
                className="group inline-flex items-center gap-3 px-10 py-5 text-base font-bold tracking-wide transition-all hover:bg-[#B08544] motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98]"
                style={{ backgroundColor: "#C89B5A", color: "#1E293B" }}
              >
                Join the Waitlist <ArrowRight className="h-5 w-5 transition-transform motion-safe:group-hover:translate-x-1" />
              </button>
            </span>
          </FadeUp>
        </div>
      </section>

      {/* -- Footer -- */}
      <footer className="bg-slate-800 text-slate-400 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <ProLnkLogo height={28} variant="dark" className="shrink-0" />
            <div className="flex gap-6 text-sm">
              <span onClick={openWaitlist} className="hover:text-white transition-colors cursor-pointer">Join the Waitlist</span>
              <Link href="/partners" className="hover:text-white transition-colors">Directory</Link>
              <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
              <Link href="/trustypro/waitlist" className="hover:text-white transition-colors">TrustyPro</Link>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 text-xs text-gray-600">
              <p>&copy; 2026 ProLnk. All rights reserved. &nbsp;&nbsp; <span className="text-[#C89B5A] font-semibold">Patent Pending</span></p>
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
      <StickyMobileCTA onJoin={openWaitlist} />
      <BackToTop />
    </div>
  );
}



