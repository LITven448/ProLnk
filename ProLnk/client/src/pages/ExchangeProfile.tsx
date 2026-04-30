import { useState } from "react";
import { useParams } from "wouter";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase, Star, MapPin, Shield, CheckCircle, Globe, Award,
  Phone, Mail, ArrowLeft, Building2, Home, DollarSign, TrendingUp,
  Users, Clock, Zap, ChevronRight, Package, Wrench, Paintbrush,
  Droplets, Wind, Leaf, Check, Send, Eye
} from "lucide-react";
import { Link } from "wouter";

// --- Demo Profile Data --------------------------------------------------------
const DEMO_PARTNER = {
  id: 1,
  businessName: "Apex Commercial Services",
  contactName: "Marcus Webb",
  tagline: "Commercial & Residential GC -- DFW's Most Trusted Broker Partner",
  tier: "Enterprise",
  location: "Arlington, TX",
  serviceArea: "DFW Metroplex + North Texas",
  phone: "(817) 555-0142",
  email: "marcus@apexcommercial.com",
  website: "apexcommercialservices.com",
  memberSince: "Jan 2024",
  trades: ["Roofing", "HVAC", "Electrical", "Pressure Washing", "Flooring", "Concrete"],
  verifications: {
    licenseVerified: true,
    insuranceVerified: true,
    backgroundCheckVerified: true,
    businessRegistrationVerified: true,
    referencesVerified: true,
    portfolioVerified: true,
  },
  rating: 4.9,
  reviewCount: 47,
  description:
    "Apex Commercial Services is a full-service general contractor specializing in large-scale commercial facilities and high-end residential projects across the DFW Metroplex. With over 18 years in the industry and relationships with Fortune 500 facility managers, we bring institutional-grade project management to every job -- and we use the ProLnk Exchange to broker specialized trade work to the best subs in the network.",
  // Leads (Referring Pro) stats
  leadsStats: {
    referralsSent: 84,
    referralsConverted: 61,
    conversionRate: 73,
    totalReferralValue: 412000,
    commissionsEarned: 38200,
    avgJobValue: 4900,
    streak: 14,
  },
  // Exchange (Broker) stats
  exchangeStats: {
    jobsPosted: 23,
    jobsAwarded: 19,
    awardRate: 83,
    totalGMV: 1240000,
    brokerEarnings: 118600,
    avgMargin: 9.6,
    commercialJobs: 14,
    residentialJobs: 9,
    activeBids: 3,
  },
  // Recent Exchange history
  recentExchangeJobs: [
    { title: "AT&T Stadium -- Exterior Pressure Wash", value: 48000, margin: 10, status: "active", type: "commercial", bids: 3 },
    { title: "PepsiCo Campus -- Break Room Renovation", value: 62000, margin: 12, status: "active", type: "commercial", bids: 5 },
    { title: "Office Complex -- HVAC Replacement", value: 85000, margin: 11, status: "active", type: "commercial", bids: 2 },
    { title: "Luxury Home -- Roof Replacement (Frisco)", value: 18500, margin: 8, status: "awarded", type: "residential", bids: 7 },
    { title: "New Build -- Electrical Rough-In (Prosper)", value: 22000, margin: 9, status: "awarded", type: "residential", bids: 4 },
    { title: "Restaurant -- Full Kitchen Renovation", value: 94000, margin: 13, status: "closed", type: "commercial", bids: 6 },
  ],
  // Recent reviews
  reviews: [
    { author: "DFW Home Pros", rating: 5, text: "Marcus posted a roofing job with a clear scope and fair margin. Sub was awarded within 24 hours. Smooth process from start to finish.", date: "Mar 2026" },
    { author: "Lone Star Builders", rating: 5, text: "The PepsiCo job was huge and Apex managed it professionally. Commission paid on time, no disputes.", date: "Feb 2026" },
    { author: "Texas Trade Collective", rating: 5, text: "Best broker on the Exchange. Jobs are always well-scoped, clients are pre-qualified, and the margin is always fair.", date: "Jan 2026" },
  ],
};

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Scout: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },
  Pro: { bg: "bg-[#0A1628]/10", text: "text-[#0A1628]", border: "border-[#0A1628]/30" },
  Crew: { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-300" },
  Company: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300" },
  Enterprise: { bg: "bg-slate-900", text: "text-white", border: "border-slate-700" },
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-blue-100 text-blue-700" },
  awarded: { label: "Awarded", color: "bg-green-100 text-green-700" },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-500" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

type ProfileTab = "overview" | "exchange" | "leads" | "reviews";

export default function ExchangeProfile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const params = useParams<{ id?: string }>();
  const partnerId = params.id ? parseInt(params.id) : null;
  const { data: profileData, isLoading } = trpc.directory.getPublicProfile.useQuery(
    { partnerId: partnerId ?? 0 },
    { enabled: !!partnerId }
  );

  // Fall back to demo data when no real partner is loaded (Exchange listing preview)
  const p = profileData?.partner ? {
    ...DEMO_PARTNER,
    id: profileData.partner.id,
    businessName: profileData.partner.businessName ?? DEMO_PARTNER.businessName,
    tier: (profileData.partner.tier ?? DEMO_PARTNER.tier) as string,
    location: profileData.partner.serviceArea ?? DEMO_PARTNER.location,
    website: profileData.partner.website ?? DEMO_PARTNER.website,
    description: profileData.partner.description ?? DEMO_PARTNER.description,
    rating: profileData.avgRating ?? DEMO_PARTNER.rating,
    reviewCount: profileData.reviews?.length ?? DEMO_PARTNER.reviewCount,
    reviews: profileData.reviews?.map((r: any, _i: number) => ({
      author: r.homeownerName ?? "Homeowner",
      rating: r.rating,
      text: r.reviewText ?? "",
      date: new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    })) ?? DEMO_PARTNER.reviews,
    verifications: {
      licenseVerified: !!profileData.partner.licenseVerified,
      insuranceVerified: !!profileData.partner.insuranceVerified,
      backgroundCheckVerified: !!profileData.partner.backgroundCheckVerified,
      businessRegistrationVerified: !!profileData.partner.businessRegistrationVerified,
      referencesVerified: !!profileData.partner.referencesVerified,
      portfolioVerified: !!profileData.partner.portfolioVerified,
    },
  } : DEMO_PARTNER;
  const tierCfg = TIER_COLORS[p.tier] ?? TIER_COLORS.Scout;

  if (partnerId && isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      {/* Back nav */}
      <Link href="/dashboard/exchange">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-5 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Exchange
        </button>
      </Link>

      {/* -- Profile Hero ------------------------------------------------ */}
      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)" }}
      >
        {/* Cover band */}
        <div className="h-24 relative" style={{ background: "linear-gradient(90deg, #D97706 0%, #B45309 50%, #92400E 100%)", opacity: 0.85 }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 11px)" }} />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar + name row */}
          <div className="flex items-end gap-4 -mt-8 mb-4">
            <div
              className="w-20 h-20 rounded-2xl border-4 border-white/10 flex items-center justify-center text-3xl font-bold text-white flex-shrink-0"
              style={{ backgroundColor: "#D97706" }}
            >
              {p.businessName.charAt(0)}
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-white text-xl font-bold">{p.businessName}</h1>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${tierCfg.bg} ${tierCfg.text} ${tierCfg.border}`}>
                  {p.tier}
                </span>
              </div>
              <p className="text-white/60 text-sm mt-0.5">{p.tagline}</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 mb-5">
            <span className="flex items-center gap-1.5 text-sm text-white/60">
              <MapPin className="w-4 h-4 text-amber-400" /> {p.location}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/60">
              <Globe className="w-4 h-4 text-amber-400" /> {p.website}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/60">
              <Clock className="w-4 h-4 text-amber-400" /> Member since {p.memberSince}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/60">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {p.rating} ({p.reviewCount} reviews)
            </span>
          </div>

          {/* Dual-mode stat pills */}
          <div className="grid grid-cols-2 gap-3">
            {/* Leads side */}
            <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(0,181,184,0.12)", border: "1px solid rgba(0,181,184,0.25)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Send className="w-4 h-4 text-[#0A1628]/70" />
                <span className="text-xs font-bold text-[#0A1628]/70 uppercase tracking-wider">Referring Pro</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xl font-bold text-white">{p.leadsStats.referralsSent}</p>
                  <p className="text-xs text-white/50">Referrals Sent</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{p.leadsStats.conversionRate}%</p>
                  <p className="text-xs text-white/50">Conversion Rate</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">${(p.leadsStats.commissionsEarned / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-white/50">Commissions</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{p.leadsStats.streak}</p>
                  <p className="text-xs text-white/50">Month Streak [FIRE]</p>
                </div>
              </div>
            </div>

            {/* Exchange side */}
            <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(217,119,6,0.12)", border: "1px solid rgba(217,119,6,0.3)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Exchange Broker</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xl font-bold text-white">{p.exchangeStats.jobsPosted}</p>
                  <p className="text-xs text-white/50">Jobs Posted</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{p.exchangeStats.awardRate}%</p>
                  <p className="text-xs text-white/50">Award Rate</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">${(p.exchangeStats.totalGMV / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-white/50">Total GMV</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">${(p.exchangeStats.brokerEarnings / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-white/50">Broker Earnings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -- Tabs -------------------------------------------------------- */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6 w-fit">
        {(["overview", "exchange", "leads", "reviews"] as ProfileTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* -- Tab Content ------------------------------------------------- */}

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left col */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-3">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
            </div>

            {/* Trades */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-3">Trade Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {p.trades.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-50 border border-gray-200 text-gray-700">
                    <Wrench className="w-3.5 h-3.5 text-[#0A1628]" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Verifications */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-3">Verified Credentials</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(p.verifications).map(([key, val]) => {
                  const labels: Record<string, string> = {
                    licenseVerified: "Business License",
                    insuranceVerified: "Liability Insurance",
                    backgroundCheckVerified: "Background Check",
                    businessRegistrationVerified: "Business Registration",
                    referencesVerified: "References",
                    portfolioVerified: "Portfolio",
                  };
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${val ? "text-[#0A1628]" : "text-gray-200"}`} />
                      <span className={`text-sm ${val ? "text-gray-700" : "text-gray-300"}`}>{labels[key]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="space-y-4">
            {/* Contact */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3">Contact</h3>
              <div className="space-y-2">
                <a href={`tel:${p.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0A1628] transition-colors">
                  <Phone className="w-4 h-4 text-gray-400" /> {p.phone}
                </a>
                <a href={`mailto:${p.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0A1628] transition-colors">
                  <Mail className="w-4 h-4 text-gray-400" /> {p.email}
                </a>
                <a href={`https://${p.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0A1628] transition-colors">
                  <Globe className="w-4 h-4 text-gray-400" /> {p.website}
                </a>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                {[
                  { label: "Service Area", value: p.serviceArea, icon: MapPin },
                  { label: "Avg Job Value", value: `$${p.leadsStats.avgJobValue.toLocaleString()}`, icon: DollarSign },
                  { label: "Avg Broker Margin", value: `${p.exchangeStats.avgMargin}%`, icon: TrendingUp },
                  { label: "Active Exchange Bids", value: p.exchangeStats.activeBids.toString(), icon: Briefcase },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <s.icon className="w-4 h-4 text-gray-300" /> {s.label}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button
              className="w-full text-white font-semibold"
              style={{ backgroundColor: "#D97706" }}
              onClick={() => window.location.href = "/dashboard/exchange"}
            >
              <Briefcase className="w-4 h-4 mr-2" /> View Their Exchange Jobs
            </Button>
          </div>
        </div>
      )}

      {/* EXCHANGE TAB */}
      {activeTab === "exchange" && (
        <div className="space-y-6">
          {/* Exchange KPI bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Jobs Posted", value: p.exchangeStats.jobsPosted, suffix: "", color: "#D97706" },
              { label: "Total GMV Brokered", value: `$${(p.exchangeStats.totalGMV / 1000000).toFixed(1)}M`, suffix: "", color: "#D97706" },
              { label: "Broker Earnings", value: `$${(p.exchangeStats.brokerEarnings / 1000).toFixed(0)}K`, suffix: "", color: "#D97706" },
              { label: "Avg Margin", value: `${p.exchangeStats.avgMargin}%`, suffix: "", color: "#D97706" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{s.label}</p>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Commercial vs Residential split */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Job Mix</h3>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1 h-4 rounded-full overflow-hidden bg-gray-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(p.exchangeStats.commercialJobs / p.exchangeStats.jobsPosted) * 100}%`,
                    background: "linear-gradient(90deg, #1a1a2e, #D97706)"
                  }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                {Math.round((p.exchangeStats.commercialJobs / p.exchangeStats.jobsPosted) * 100)}% Commercial
              </span>
            </div>
            <div className="flex gap-6 text-sm">
              <span className="flex items-center gap-2 text-gray-600">
                <Building2 className="w-4 h-4 text-amber-500" /> {p.exchangeStats.commercialJobs} Commercial jobs
              </span>
              <span className="flex items-center gap-2 text-gray-600">
                <Home className="w-4 h-4 text-[#0A1628]" /> {p.exchangeStats.residentialJobs} Residential jobs
              </span>
            </div>
          </div>

          {/* Recent Exchange jobs */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Exchange Jobs</h3>
            <div className="space-y-3">
              {p.recentExchangeJobs.map((job, i) => {
                const statusCfg = STATUS_CONFIG[job.status];
                const earnings = job.value * (job.margin / 100) * 0.92;
                return (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: job.type === "commercial" ? "#FEF3C7" : "#F0FDFA" }}
                    >
                      {job.type === "commercial"
                        ? <Building2 className="w-4 h-4 text-amber-600" />
                        : <Home className="w-4 h-4 text-[#0A1628]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{job.title}</p>
                      <p className="text-xs text-gray-400">{job.bids} bids  {job.margin}% margin</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-gray-900">${job.value.toLocaleString()}</p>
                      <p className="text-xs text-amber-600 font-semibold">+${earnings.toLocaleString(undefined, { maximumFractionDigits: 0 })} earned</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold flex-shrink-0 ${statusCfg.color}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* LEADS TAB */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Referrals Sent", value: p.leadsStats.referralsSent },
              { label: "Converted", value: p.leadsStats.referralsConverted },
              { label: "Conversion Rate", value: `${p.leadsStats.conversionRate}%` },
              { label: "Commissions Earned", value: `$${(p.leadsStats.commissionsEarned / 1000).toFixed(1)}K` },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{s.label}</p>
                <p className="text-2xl font-bold text-[#0A1628]">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#0A1628]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Referring Pro Performance</h3>
                <p className="text-sm text-gray-500">Jobs logged  photos analyzed  leads generated for neighboring partners</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-[#F5E642]/10 border border-teal-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#0A1628]">${p.leadsStats.avgJobValue.toLocaleString()}</p>
                <p className="text-xs text-[#0A1628] mt-0.5">Avg Job Value</p>
              </div>
              <div className="text-center border-x border-[#0A1628]/20">
                <p className="text-2xl font-bold text-[#0A1628]">${(p.leadsStats.totalReferralValue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-[#0A1628] mt-0.5">Total Referral Value</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#0A1628]">{p.leadsStats.streak} mo</p>
                <p className="text-xs text-[#0A1628] mt-0.5">Active Streak [FIRE]</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REVIEWS TAB */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-900">{p.rating}</p>
              <StarRating rating={p.rating} />
              <p className="text-sm text-gray-400 mt-1">{p.reviewCount} reviews</p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = star === 5 ? 85 : star === 4 ? 12 : star === 3 ? 3 : 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-4">{star}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-6">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {p.reviews.map((r: any, i: number) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                    {r.author.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">{r.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={r.rating} />
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </PartnerLayout>
  );
}
