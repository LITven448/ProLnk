import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import {
  Star, Shield, MapPin, Phone, ExternalLink, Megaphone,
  CheckCircle, Zap, TrendingUp, Eye, Users, DollarSign,
  Award, ChevronRight, Home, Camera, Sparkles, ArrowRight,
  Badge as BadgeIcon, Crown, Building2
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_PREFERRED_PARTNER = {
  businessName: "Premier HVAC Solutions",
  category: "HVAC",
  tagline: "DFW's #1 Rated Heating & Cooling Specialists",
  rating: 4.9,
  reviews: 312,
  badge: "Preferred Partner",
  tier: "Enterprise",
  phone: "(214) 555-0192",
  website: "premierhvac.com",
  serviceArea: "Dallas / Fort Worth",
  logoInitials: "PH",
  logoColor: "#0A1628",
  description: "Family-owned since 1998. Licensed, insured, and TrustyPro Certified. Same-day service available.",
  specialOffer: "Free diagnostic with any repair — mention TrustyPro",
  ctaLabel: "Request a Quote",
};

const MOCK_STANDARD_PARTNER = {
  businessName: "Green Lawn Pros",
  category: "Lawn Care",
  rating: 4.7,
  reviews: 89,
  badge: "TrustyPro Certified",
  tier: "Pro",
  phone: "(972) 555-0147",
  serviceArea: "Plano / Allen",
  logoInitials: "GL",
  logoColor: "#059669",
};

const MOCK_PROS = [
  { name: "Apex Plumbing Co.", type: "Plumbing", rating: 4.8, reviews: 204, tier: "Company", featured: false },
  { name: "Premier HVAC Solutions", type: "HVAC", rating: 4.9, reviews: 312, tier: "Enterprise", featured: true },
  { name: "ShieldPest Control", type: "Pest Control", rating: 4.6, reviews: 156, tier: "Crew", featured: false },
  { name: "BrightSpark Electric", type: "Electrical", rating: 4.9, reviews: 98, tier: "Pro", featured: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function PreviewFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
        <Eye className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}

function PreferredBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
      style={{ background: "linear-gradient(135deg, #F5E642, #FFD700)", color: "#0A1628" }}>
      <Crown className="w-2.5 h-2.5" />
      Preferred Partner
    </span>
  );
}

function TrustyBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00B5B8]/10 text-[#00B5B8]">
      <Shield className="w-2.5 h-2.5" />
      TrustyPro Certified
    </span>
  );
}

// ─── Placement 1: Dashboard Banner ───────────────────────────────────────────
function DashboardBannerPreview() {
  const p = MOCK_PREFERRED_PARTNER;
  return (
    <div className="p-4">
      {/* Simulated homeowner dashboard context */}
      <div className="mb-3 text-xs text-gray-400 font-medium">Homeowner Dashboard — Featured Partner Banner</div>
      <div className="rounded-xl border overflow-hidden shadow-sm"
        style={{ borderColor: "#F5E642", background: "linear-gradient(135deg, #FFFEF0 0%, #FFF9C4 50%, #FFFFF0 100%)" }}>
        {/* Label bar */}
        <div className="px-4 py-1.5 flex items-center gap-2"
          style={{ background: "linear-gradient(90deg, #0A1628, #1a3a5c)" }}>
          <Crown className="w-3 h-3 text-[#F5E642]" />
          <span className="text-[10px] font-bold text-[#F5E642] uppercase tracking-widest">Preferred Partner · {p.category}</span>
          <span className="ml-auto text-[10px] text-white/50">Sponsored</span>
        </div>
        {/* Content */}
        <div className="p-4 flex items-center gap-4">
          {/* Logo */}
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm"
            style={{ backgroundColor: p.logoColor }}>
            {p.logoInitials}
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="font-bold text-gray-900 text-sm">{p.businessName}</span>
              <PreferredBadge />
            </div>
            <p className="text-xs text-gray-600 mb-1">{p.tagline}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <strong className="text-gray-800">{p.rating}</strong> ({p.reviews} reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />{p.serviceArea}
              </span>
            </div>
          </div>
          {/* CTA */}
          <div className="flex-shrink-0 flex flex-col gap-2 items-end">
            <button className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #0A1628, #1a3a5c)" }}>
              {p.ctaLabel}
            </button>
            {p.specialOffer && (
              <span className="text-[10px] text-[#059669] font-semibold text-right max-w-[140px]">
                🎁 {p.specialOffer}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Placement 2: Pro Directory Card (Featured) ───────────────────────────────
function ProDirectoryPreview() {
  return (
    <div className="p-4">
      <div className="mb-3 text-xs text-gray-400 font-medium">My Pros Network — Directory Listing (Featured vs Standard)</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Featured Card */}
        <div className="rounded-xl border-2 overflow-hidden shadow-md relative"
          style={{ borderColor: "#F5E642", background: "linear-gradient(135deg, #FFFEF5, #FFFFF0)" }}>
          {/* Top accent */}
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #F5E642, #FFD700, #F5E642)" }} />
          <div className="absolute top-3 right-3">
            <PreferredBadge />
          </div>
          <div className="p-4 pt-3">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm"
                style={{ backgroundColor: MOCK_PREFERRED_PARTNER.logoColor }}>
                {MOCK_PREFERRED_PARTNER.logoInitials}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="font-bold text-gray-900 text-sm leading-tight">{MOCK_PREFERRED_PARTNER.businessName}</p>
                <p className="text-xs text-gray-500">{MOCK_PREFERRED_PARTNER.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-gray-800">{MOCK_PREFERRED_PARTNER.rating}</span>
              <span className="text-xs text-gray-400">({MOCK_PREFERRED_PARTNER.reviews})</span>
            </div>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{MOCK_PREFERRED_PARTNER.description}</p>
            {MOCK_PREFERRED_PARTNER.specialOffer && (
              <div className="rounded-lg px-2.5 py-1.5 mb-3 text-xs font-medium"
                style={{ background: "#ECFDF5", color: "#059669" }}>
                🎁 {MOCK_PREFERRED_PARTNER.specialOffer}
              </div>
            )}
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-lg text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #0A1628, #1a3a5c)" }}>
                Request Quote
              </button>
              <button className="px-3 py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50">
                <Phone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Standard Card */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ backgroundColor: MOCK_STANDARD_PARTNER.logoColor }}>
                {MOCK_STANDARD_PARTNER.logoInitials}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="font-semibold text-gray-900 text-sm leading-tight">{MOCK_STANDARD_PARTNER.businessName}</p>
                <p className="text-xs text-gray-500">{MOCK_STANDARD_PARTNER.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-gray-800">{MOCK_STANDARD_PARTNER.rating}</span>
              <span className="text-xs text-gray-400">({MOCK_STANDARD_PARTNER.reviews})</span>
            </div>
            <div className="mb-3">
              <TrustyBadge />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50">
                View Profile
              </button>
              <button className="px-3 py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50">
                <Phone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mt-2 text-center">Left: Preferred Partner placement · Right: Standard listing</p>
    </div>
  );
}

// ─── Placement 3: Scan Results Injection ─────────────────────────────────────
function ScanResultsPreview() {
  return (
    <div className="p-4">
      <div className="mb-3 text-xs text-gray-400 font-medium">AI Photo Scan Results — Contextual Preferred Partner Injection</div>
      {/* Simulated scan result */}
      <div className="space-y-3">
        <div className="rounded-xl border border-red-200 bg-red-50 p-3">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-[9px] font-bold">!</span>
            </div>
            <div>
              <p className="text-xs font-bold text-red-800">HVAC Filter — Overdue Replacement</p>
              <p className="text-xs text-red-600 mt-0.5">Detected: Filter appears clogged. Estimated replacement needed.</p>
            </div>
          </div>
        </div>

        {/* Preferred partner injection */}
        <div className="rounded-xl border overflow-hidden shadow-sm"
          style={{ borderColor: "#F5E642", background: "linear-gradient(135deg, #FFFEF0, #FFFFF5)" }}>
          <div className="px-3 py-1.5 flex items-center gap-2"
            style={{ background: "linear-gradient(90deg, #0A1628, #1a3a5c)" }}>
            <Zap className="w-3 h-3 text-[#F5E642]" />
            <span className="text-[10px] font-bold text-[#F5E642] uppercase tracking-widest">Recommended Pro · HVAC</span>
          </div>
          <div className="p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: MOCK_PREFERRED_PARTNER.logoColor }}>
              {MOCK_PREFERRED_PARTNER.logoInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-gray-900 text-xs">{MOCK_PREFERRED_PARTNER.businessName}</span>
                <PreferredBadge />
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-500">
                <span className="flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  {MOCK_PREFERRED_PARTNER.rating}
                </span>
                <span>·</span>
                <span>{MOCK_PREFERRED_PARTNER.specialOffer}</span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #0A1628, #1a3a5c)" }}>
              Book Now
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-[9px] font-bold">~</span>
            </div>
            <div>
              <p className="text-xs font-bold text-amber-800">Lawn — Patchy Growth Detected</p>
              <p className="text-xs text-amber-600 mt-0.5">Detected: Uneven lawn coverage. Aeration or overseeding recommended.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Placement 4: Homeowner Offers Page ──────────────────────────────────────
function OffersPagePreview() {
  return (
    <div className="p-4">
      <div className="mb-3 text-xs text-gray-400 font-medium">My Offers Page — Preferred Partner Offer Card</div>
      <div className="space-y-3">
        {/* Featured offer */}
        <div className="rounded-xl border-2 overflow-hidden relative"
          style={{ borderColor: "#F5E642", background: "linear-gradient(135deg, #FFFEF5, #FFFFF0)" }}>
          <div className="absolute top-0 left-0 right-0 h-1"
            style={{ background: "linear-gradient(90deg, #F5E642, #FFD700, #F5E642)" }} />
          <div className="p-4 pt-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: MOCK_PREFERRED_PARTNER.logoColor }}>
                  {MOCK_PREFERRED_PARTNER.logoInitials}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{MOCK_PREFERRED_PARTNER.businessName}</p>
                  <PreferredBadge />
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400">Offer expires</p>
                <p className="text-xs font-bold text-red-500">3 days left</p>
              </div>
            </div>
            <div className="rounded-lg p-3 mb-3"
              style={{ background: "#ECFDF5", border: "1px solid #A7F3D0" }}>
              <p className="text-xs font-bold text-emerald-800">🎁 Exclusive Offer for TrustyPro Members</p>
              <p className="text-sm font-bold text-emerald-700 mt-0.5">{MOCK_PREFERRED_PARTNER.specialOffer}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-lg text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #0A1628, #1a3a5c)" }}>
                Claim Offer
              </button>
              <button className="px-3 py-2 rounded-lg text-xs text-gray-500 border border-gray-200">
                Details
              </button>
            </div>
          </div>
        </div>

        {/* Standard offer */}
        <div className="rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: MOCK_STANDARD_PARTNER.logoColor }}>
              {MOCK_STANDARD_PARTNER.logoInitials}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{MOCK_STANDARD_PARTNER.businessName}</p>
              <TrustyBadge />
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-3">Free lawn assessment with first service booking</p>
          <button className="w-full py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-700">
            View Offer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Pricing Tiers ────────────────────────────────────────────────────────────
function PricingTiers() {
  const tiers = [
    {
      name: "Standard Listing",
      price: "Included",
      priceNote: "with any ProLnk subscription",
      color: "#6B7280",
      bg: "#F9FAFB",
      border: "#E5E7EB",
      features: [
        "Listed in My Pros Network directory",
        "TrustyPro Certified badge",
        "Star rating & reviews visible",
        "Contact button (phone/website)",
      ],
      cta: "Default",
      highlight: false,
    },
    {
      name: "Preferred Partner",
      price: "Add-on",
      priceNote: "contact for pricing",
      color: "#0A1628",
      bg: "linear-gradient(135deg, #FFFEF0, #FFFFF5)",
      border: "#F5E642",
      features: [
        "Gold-bordered featured card (top of directory)",
        "Dashboard banner placement",
        "Contextual injection in AI scan results",
        "Exclusive offer card on Offers page",
        "\"Preferred Partner\" crown badge",
        "Priority phone & quote CTA",
        "Analytics dashboard (impressions, clicks, conversions)",
      ],
      cta: "Contact Sales",
      highlight: true,
    },
    {
      name: "Advertising Spotlight",
      price: "Premium",
      priceNote: "contact for pricing",
      color: "#7C3AED",
      bg: "#F5F3FF",
      border: "#C4B5FD",
      features: [
        "Everything in Preferred Partner",
        "Full-width banner on homeowner dashboard",
        "Featured in weekly homeowner digest email",
        "Co-branded storm/seasonal alert campaigns",
        "Dedicated landing page on TrustyPro",
        "Social proof widget (reviews feed)",
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tiers.map(tier => (
        <div key={tier.name} className="rounded-2xl border-2 overflow-hidden"
          style={{
            borderColor: tier.border,
            background: tier.bg,
          }}>
          {tier.highlight && (
            <div className="py-1.5 text-center text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "linear-gradient(90deg, #0A1628, #1a3a5c)", color: "#F5E642" }}>
              Most Popular
            </div>
          )}
          <div className="p-5">
            <h3 className="font-bold text-gray-900 text-base mb-1">{tier.name}</h3>
            <p className="text-2xl font-bold mb-0.5" style={{ color: tier.color }}>{tier.price}</p>
            <p className="text-xs text-gray-500 mb-4">{tier.priceNote}</p>
            <ul className="space-y-2 mb-5">
              {tier.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
              style={tier.highlight
                ? { background: "linear-gradient(135deg, #0A1628, #1a3a5c)", color: "#fff" }
                : { border: `2px solid ${tier.border}`, color: tier.color, background: "transparent" }
              }
            >
              {tier.cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdvertisingPreview() {
  const [activeTab, setActiveTab] = useState<"placements" | "pricing" | "analytics">("placements");

  const tabs = [
    { id: "placements", label: "Ad Placements" },
    { id: "pricing", label: "Pricing Tiers" },
    { id: "analytics", label: "Analytics Preview" },
  ] as const;

  return (
    <AdminLayout title="Advertising & Preferred Partner Preview" subtitle="Visual mockup of all ad placements on the TrustyPro homeowner platform">
      {/* Intro banner */}
      <div className="rounded-2xl p-5 mb-6 flex items-start gap-4"
        style={{ background: "linear-gradient(135deg, #0A1628, #1a3a5c)", color: "#fff" }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#F5E642" }}>
          <Crown className="w-6 h-6 text-[#0A1628]" />
        </div>
        <div>
          <h2 className="font-bold text-lg mb-1">Preferred Partner Program</h2>
          <p className="text-sm text-white/80 max-w-2xl">
            Preferred Partners get premium visibility across the TrustyPro homeowner platform — from the dashboard banner to contextual injection in AI scan results. Below is a full visual preview of every placement, exactly as homeowners see it.
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-0 mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-3 text-sm font-medium transition-all whitespace-nowrap"
            style={{
              color: activeTab === tab.id ? "#0A1628" : "#9CA3AF",
              borderBottom: activeTab === tab.id ? "2px solid #0A1628" : "2px solid transparent",
              marginBottom: "-1px",
              backgroundColor: "transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "placements" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Placement 1 — Dashboard Banner</h3>
            <p className="text-sm text-gray-500 mb-3">Shown at the bottom of every homeowner's main dashboard. High-visibility, contextual to their zip code.</p>
            <PreviewFrame label="TrustyPro Homeowner Dashboard">
              <DashboardBannerPreview />
            </PreviewFrame>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-1">Placement 2 — Pro Directory (Featured Card)</h3>
            <p className="text-sm text-gray-500 mb-3">Preferred Partners appear at the top of the My Pros Network directory with a gold-bordered card, special offer, and priority CTA.</p>
            <PreviewFrame label="TrustyPro — My Pros Network">
              <ProDirectoryPreview />
            </PreviewFrame>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-1">Placement 3 — AI Scan Results (Contextual Injection)</h3>
            <p className="text-sm text-gray-500 mb-3">When a homeowner scans photos and an issue is detected, the matching Preferred Partner is automatically surfaced directly below the finding.</p>
            <PreviewFrame label="TrustyPro — AI Photo Scan Results">
              <ScanResultsPreview />
            </PreviewFrame>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-1">Placement 4 — My Offers Page</h3>
            <p className="text-sm text-gray-500 mb-3">Preferred Partners can post exclusive offers that appear at the top of the homeowner's Offers page with a featured card and countdown timer.</p>
            <PreviewFrame label="TrustyPro — My Offers">
              <OffersPagePreview />
            </PreviewFrame>
          </div>
        </div>
      )}

      {activeTab === "pricing" && (
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Advertising Tiers</h3>
          <p className="text-sm text-gray-500 mb-6">Three levels of visibility — from standard directory listings included with every ProLnk subscription, to full advertising spotlights with co-branded campaigns.</p>
          <PricingTiers />
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 mb-1">Analytics Dashboard (Preferred Partner View)</h3>
          <p className="text-sm text-gray-500 mb-4">Partners with Preferred status get a real-time analytics dashboard showing impressions, clicks, and conversions from each placement.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Banner Impressions", value: "12,840", trend: "+18%", icon: Eye, color: "#0A1628" },
              { label: "Directory Views", value: "3,210", trend: "+24%", icon: Users, color: "#6366F1" },
              { label: "Scan Injections", value: "847", trend: "+31%", icon: Zap, color: "#F59E0B" },
              { label: "Quote Requests", value: "94", trend: "+12%", icon: DollarSign, color: "#059669" },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <span className="text-xs font-semibold text-emerald-600">{stat.trend} this month</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Conversion Funnel</h4>
            <div className="space-y-3">
              {[
                { label: "Banner Impressions", value: 12840, pct: 100, color: "#0A1628" },
                { label: "Banner Clicks", value: 1026, pct: 8, color: "#6366F1" },
                { label: "Profile Views", value: 847, pct: 6.6, color: "#F59E0B" },
                { label: "Quote Requests", value: 94, pct: 0.7, color: "#059669" },
                { label: "Bookings (est.)", value: 31, pct: 0.24, color: "#00B5B8" },
              ].map(row => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">{row.label}</span>
                    <span className="font-bold text-gray-900">{row.value.toLocaleString()} <span className="text-gray-400 font-normal">({row.pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(row.pct, 0.5)}%`, backgroundColor: row.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
