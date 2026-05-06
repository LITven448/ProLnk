import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDomain } from "@/hooks/useDomain";
import { useAuth } from "@/_core/hooks/useAuth";
import ProLnkLogo from "@/components/ProLnkLogo";
import BackToTop from "@/components/BackToTop";
import ProLnkJobSiteVisual from "@/components/ProLnkJobSiteVisual";
import { FadeUp, FadeIn, StaggerChildren, StaggerItem, CountUp } from "@/components/ScrollAnimations";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  Users, TrendingUp, DollarSign, Star, CheckCircle, ChevronDown, ChevronUp,
  ArrowRight, Zap, Camera, Menu, X, Shield, BadgeCheck,
  Radar, CloudLightning, Clock, AlertTriangle, Home as HomeIcon, Eye, Repeat,
  XCircle, Award, Target, Lock, RefreshCw, BarChart3, Megaphone, Wrench, Plug,
  Bot, Brain, CalendarDays, PieChart, MessageSquare, Sparkles,
  MapPin, Layers, TrendingDown, CheckCircle2, ChevronRight, Play, Pause, Briefcase,
  Hammer, TreePine
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// --- Design tokens ------------------------------------------------------------
// Navy: #0A1628  Yellow accent: #F5E642  Off-white bg: #FAFAF9
// Hero/final CTA bg: #050d1a

// --- Pricing — 3 residential tiers (Connect/Growth/Elite) ----------------------------
const PRICING_TIERS = [
  {
    name: "Connect",
    subtitle: "Solo operators & new partners",
    monthlyFee: 79,
    commissionShare: 0.45,
    photoCap: null,
    zipLimit: 5,
    weeklyLeadCap: 20,
    popular: false,
    cta: "Apply Now",
    features: [
      "Free during beta — no credit card required",
      "Unlimited photo uploads",
      "AI opportunity detection on every photo",
      "Partner profile + verification badge",
      "Up to 20 verified leads/month",
      "5 zip code service area",
      "1 service category",
      "Commission tracking dashboard",
      "FieldOS mobile access",
      "Email support",
    ],
  },
  {
    name: "Growth",
    subtitle: "Established businesses",
    monthlyFee: 149,
    commissionShare: 0.55,
    photoCap: null,
    zipLimit: 15,
    weeklyLeadCap: 60,
    popular: true,
    cta: "Apply Now",
    features: [
      "Free during beta — no credit card required",
      "Unlimited photo uploads",
      "Up to 60 verified leads/month",
      "15 zip code service area",
      "All service categories",
      "Higher commission share",
      "FSM integration (Jobber, HCP, ServiceTitan)",
      "Bundle offer matching",
      "Deal Composer access",
      "Review management suite",
      "Priority email support",
    ],
  },
  {
    name: "Elite",
    subtitle: "Multi-location & high-volume",
    monthlyFee: 249,
    commissionShare: 0.65,
    photoCap: null,
    zipLimit: 30,
    weeklyLeadCap: null,
    popular: false,
    cta: "Apply Now",
    features: [
      "Free during beta — no credit card required",
      "Unlimited photo uploads",
      "Unlimited verified leads",
      "30 zip code service area",
      "Priority lead routing (first-look advantage)",
      "Highest commission share",
      "Up to 25 team seats",
      "Multi-location management",
      "API & webhook integrations",
      "Dedicated partner success manager",
      "Quarterly strategy review",
    ],
  },
]

// --- Add-On Modules -----------------------------------------------------------
// Regular add-ons first (available now), then AI Agent add-ons (Coming Soon) at the bottom
const ADD_ONS = [
  // --- Available Now ---
  {
    id: "storm-alert",
    name: "Storm Alert Dispatch",
    price: 59,
    unit: "/mo",
    description: "When a storm hits your service area, you get an instant alert with affected addresses and a one-click outreach template. Included free in Crew.",
    icon: CloudLightning,
    perUnit: false,
  },
  {
    id: "review-accelerator",
    name: "Review Accelerator",
    price: 29,
    unit: "/mo",
    description: "After a job closes, ProLnk automatically sends a review request to the homeowner on your behalf via SMS. Tracked in your dashboard.",
    icon: Star,
    perUnit: false,
  },
  {
    id: "multi-trade",
    name: "Multi-Trade Profile",
    price: 49,
    unit: "/mo",
    description: "Operate multiple trades? Bundle them under one profile. The AI routes each lead to the right trade automatically — no manual sorting.",
    icon: Repeat,
    perUnit: false,
  },
  {
    id: "success-coaching",
    name: "Partner Success Coaching",
    price: 99,
    unit: "/mo",
    description: "Monthly 1-on-1 session with a ProLnk partner success rep to optimize your photo strategy, improve your profile, and maximize your earnings.",
    icon: Award,
    perUnit: false,
    comingSoon: false,
  },
  {
    id: "marketing-advertising",
    name: "Marketing & Advertising Boost",
    price: 149,
    unit: "/mo",
    description: "ProLnk runs paid digital ads in your service area to drive homeowner awareness directly to your profile. We handle the creative, targeting, and spend — you just close the leads.",
    icon: Megaphone,
    perUnit: false,
    comingSoon: false,
  },
  {
    id: "extended-territory",
    name: "Extended Territory",
    price: 29,
    unit: "/zip/mo",
    description: "Expand your service area beyond your plan's included zip codes. Each additional zip code adds $29/month and is covered by the same AI detection and lead routing as your base territory.",
    icon: MapPin,
    perUnit: true,
    comingSoon: false,
  },
  // --- AI Agent Add-Ons (Coming Soon) ---
  {
    id: "smart-glasses",
    name: "ProLnk Smart Glasses",
    price: 0,
    unit: "TBD",
    description: "Hands-free job documentation. Smart glasses (Meta Ray-Ban style) that video the job, auto-capture photos, and use voice-to-text to log notes and descriptions — all synced to your ProLnk profile automatically.",
    icon: Eye,
    perUnit: false,
    comingSoon: true,
  },
  {
    id: "finance-agent",
    name: "Finance Agent",
    price: 79,
    unit: "/mo",
    description: "An AI agent that monitors your earnings, flags payout anomalies, generates monthly P&L summaries, and recommends tier upgrades based on your actual revenue data.",
    icon: PieChart,
    perUnit: false,
    comingSoon: true,
  },
  {
    id: "marketing-agent",
    name: "Marketing Agent",
    price: 49,
    unit: "/mo",
    description: "An AI agent that writes geo-targeted social posts, follow-up email sequences, and seasonal campaign copy based on your trade, service area, and recent jobs — automatically.",
    icon: Sparkles,
    perUnit: false,
    comingSoon: true,
  },
  {
    id: "scheduling-agent",
    name: "Scheduling Agent",
    price: 59,
    unit: "/mo",
    description: "An AI agent that manages your availability window, auto-responds to inbound leads with proposed time slots, and syncs confirmed jobs to your calendar — no back-and-forth.",
    icon: CalendarDays,
    perUnit: false,
    comingSoon: true,
  },
  {
    id: "client-comms-agent",
    name: "Client Comms Agent",
    price: 39,
    unit: "/mo",
    description: "An AI agent that handles post-job follow-ups, review requests, and homeowner check-ins via SMS — so you stay top of mind without lifting a finger.",
    icon: MessageSquare,
    perUnit: false,
    comingSoon: true,
  },
  {
    id: "ops-intelligence-agent",
    name: "Ops Intelligence Agent",
    price: 89,
    unit: "/mo",
    description: "An AI agent that analyzes your job history, photo upload patterns, and lead conversion rates to surface weekly insights and specific actions to grow your earnings.",
    icon: Brain,
    perUnit: false,
    comingSoon: true,
  },
]

// --- Who Can Join -------------------------------------------------------------
const WHO_CAN_JOIN = [
  { group: "Outdoor & Lawn", categories: ["Lawn Care & Mowing", "Landscaping & Design", "Tree Trimming & Removal", "Irrigation & Sprinklers", "Hardscaping & Patios", "Outdoor Lighting", "Drainage Solutions", "Artificial Turf Installation", "Retaining Walls", "Outdoor Kitchen & Fire Pit"] },
  { group: "Home Maintenance & Repair", categories: ["Handyman Services", "Fencing & Gates", "Roofing & Gutters", "HVAC Service & Repair", "Plumbing", "Electrical", "Garage Door Service", "Foundation Repair", "Chimney & Fireplace", "Concrete & Masonry", "Deck & Porch Repair", "Insulation"] },
  { group: "Cleaning & Restoration", categories: ["House Cleaning", "Pressure Washing", "Window Cleaning", "Carpet Cleaning", "Gutter Cleaning", "Junk Removal", "Mold Remediation", "Air Duct Cleaning", "Dryer Vent Cleaning", "Biohazard & Trauma Cleanup"] },
  { group: "Specialty Trades", categories: ["Interior & Exterior Painting", "Pool Service & Repair", "Pest Control", "Security Systems", "Solar Installation", "Kitchen & Bath Remodeling", "Flooring & Tile", "Drywall & Plastering", "Cabinet Refacing", "Waterproofing", "Epoxy Flooring", "Glass & Mirror Installation"] },
  { group: "Home Technology & Energy", categories: ["Smart Home Installation", "EV Charger Installation", "Generator Installation", "Home Theater & AV", "Alarm & Surveillance Systems", "Whole-Home Water Filtration"] },
  { group: "Pet & Animal", categories: ["Pet Waste Removal", "Dog Walking & Pet Sitting", "Pet Grooming", "Animal Control & Wildlife Removal"] },
];

// --- FAQ ----------------------------------------------------------------------
const FAQS = [
  {
    q: "Is there a money-back guarantee?",
    a: "Yes. If you don't receive at least 3 qualified inbound leads in your first 30 days, we'll refund your first month — no questions asked. Applies to first-time partners who complete onboarding and connect at least one photo source. We're confident enough in the model to back it.",
  },
  {
    q: "How does the AI actually work?",
    a: "You upload before-and-after photos after each job, plus 3 wide-angle shots of the home exterior. Our AI scans every image across 150+ detection categories — overgrown grass, broken fences, dirty windows, aging roofs, drainage problems, HVAC units nearing end-of-life, foundation cracks, gutter damage, and more. When it finds something actionable, it routes the lead automatically to the right partner.",
  },
  {
    q: "How do I earn commissions?",
    a: "When your job photos generate a lead that another partner closes, you earn a referral commission — a share of the platform fee on that job. Your commission share increases with your tier, so you earn more as you grow. Paid monthly, tracked in real time on your dashboard.",
  },
  {
    q: "Do I have to change how I run my business?",
    a: "Minimal change. Take before-and-after photos of your work area and 3 wide-angle shots of the home's front exterior before you leave. That's it — under 60 seconds. The AI handles detection, routing, and tracking automatically. Your scheduling, invoicing, and dispatch stay exactly the same.",
  },
  {
    q: "What if I'm not a home service pro? Can real estate agents or mortgage brokers join?",
    a: "Yes. Real estate agents, mortgage brokers, title companies, home warranty companies, and insurance agents are all welcome. Your commission structure is based on the average deal size for your category. A real estate agent who closes a deal from a ProLnk referral pays a commission that is still 44% cheaper than a Realtor.com lead — and the homeowner was already in project mode, making them far more likely to transact.",
  },
  {
    q: "How long does approval take?",
    a: "Most applications are reviewed within 1-2 business days. Once approved, you can start uploading jobs and receiving leads immediately.",
  },
  {
    q: "What is TrustyPro and how does it connect to ProLnk?",
    a: "TrustyPro is the homeowner side of the ProLnk ecosystem. Homeowners upload photos of their property, log repairs, and track their home's health over time. When they need work done, TrustyPro automatically matches them with a vetted, verified ProLnk partner for that specific job. Your TrustyPro badge is what homeowners see before they see your price — it's the trust signal that makes you the obvious choice.",
  },

  {
    q: "Can I refer other pros and earn from their activity too?",
    a: "Yes. When you refer another pro who joins ProLnk and starts generating leads, you earn a referral bonus. Details are in your partner dashboard under Growth → Referral Hub. The more you grow the network, the more passive income you generate on top of your direct commissions.",
  },
  {
    q: "What happens if a lead doesn't close?",
    a: "You only earn a commission when a job actually closes. ProLnk tracks the full pipeline — photo upload → lead detection → partner match → job close → commission payout. If a lead doesn't close, no commission is charged or earned. Your earnings are always tied to real, verified outcomes.",
  },
  {
    q: "Is my service area exclusive?",
    a: "Service areas are not exclusive by default, but your tier determines how many zip codes you cover. Elite partners get 30 zips, Growth partners get 15, and Connect partners start with 5. Need more coverage? Add extra zip codes with the Extended Territory add-on. Within your zips, leads are routed based on your badge tier, response time, and homeowner match score — so top performers consistently get first access.",
  },
  {
    q: "What integrations are supported?",
    a: "ProLnk integrates with Jobber, Housecall Pro, and ServiceTitan for automatic job sync — no manual uploads required. When a job closes in your FSM, ProLnk captures the photos, runs AI analysis, and routes leads automatically. Additional integrations (Google Calendar, QuickBooks, CompanyCam) are available on the Pro and Crew tiers.",
  },
];

// --- FAQ Item -----------------------------------------------------------------
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.title = "ProLnk — AI-Powered Home Service Partner Network"; }, []);

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

// --- Earnings Estimator (single-sided) --------------------------------------
function EarningsEstimator() {
  const [mode, setMode] = useState<"referring" | "receiving">("referring");
  const [photosPerMonth, setPhotosPerMonth] = useState([15]);
  const [avgJobValue, setAvgJobValue] = useState([1500]);
  const [receivedJobs, setReceivedJobs] = useState([5]);
  const [tier, setTier] = useState<"Connect" | "Growth" | "Elite">("Growth");
  const tierData = {
    Connect: { share: 0.45, fee: 79,  earningsCap: 500 as number | null },
    Growth:  { share: 0.55, fee: 149, earningsCap: null as number | null },
    Elite:   { share: 0.65, fee: 249, earningsCap: null as number | null },
  };
  const t = tierData[tier];
  const proLnkRate = 0.10;
  const leadsGenerated = Math.round(photosPerMonth[0] * 0.15);
  const closedJobs = Math.round(leadsGenerated * 0.20);
  const proLnkFeePerJob = avgJobValue[0] * proLnkRate;
  const rawEarnings = closedJobs * proLnkFeePerJob * t.share;
  const partnerEarnings = t.earningsCap ? Math.min(rawEarnings, t.earningsCap) : rawEarnings;
  const atEarningsCap = t.earningsCap !== null && rawEarnings >= (t.earningsCap ?? 0);
  const annualEarnings = partnerEarnings * 12;
  const monthsToOffset = t.fee > 0 && partnerEarnings > 0 ? Math.ceil(t.fee / partnerEarnings) : null;
  // Receiving side
  const platformFeePerJob = avgJobValue[0] * proLnkRate;
  const totalPlatformFees = receivedJobs[0] * platformFeePerJob;
  const netRevenue = receivedJobs[0] * avgJobValue[0] - totalPlatformFees - t.fee;
  const roiPercent = t.fee > 0 ? ((netRevenue / (t.fee + totalPlatformFees)) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-heading text-gray-900">ROI Calculator</h3>
          <p className="text-xs text-gray-400 mt-0.5">Model both sides of the ProLnk network</p>
        </div>
        <div className="flex gap-2">
          {(["Connect", "Growth", "Elite"] as const).map((tName) => (
            <button
              key={tName}
              onClick={() => setTier(tName)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${tier === tName ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {tName}
            </button>
          ))}
        </div>
      </div>
      {/* Mode toggle */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
        <button
          onClick={() => setMode("referring")}
          className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
            mode === "referring" ? "bg-[#0A1628] text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
          }`}
        >
          Referring Pro — Earn Commissions
        </button>
        <button
          onClick={() => setMode("receiving")}
          className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
            mode === "receiving" ? "bg-[#0A1628] text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
          }`}
        >
          Receiving Pro — Platform Fee Cost
        </button>
      </div>

      {mode === "referring" ? (
        <>
          <div className="space-y-5 mb-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">Jobs completed / month</label>
                <div className="flex items-center gap-2">
                  <span className="text-base font-heading font-bold text-[#0A1628]">{photosPerMonth[0]}</span>
                  {atEarningsCap && (
                    <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">
                      Earnings cap reached — upgrade to Pro
                    </span>
                  )}
                </div>
              </div>
              <Slider value={photosPerMonth} onValueChange={setPhotosPerMonth} min={1} max={100} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>~{leadsGenerated} leads detected · ~{closedJobs} jobs closed by the network</span>
                {t.earningsCap && <span className="text-amber-600 font-medium">Connect tier earns up to ${t.earningsCap}/mo — upgrade to Growth to remove cap</span>}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">Avg job value in your trade</label>
                <span className="text-base font-heading font-bold text-[#0A1628]">${avgJobValue[0].toLocaleString()}</span>
              </div>
              <Slider value={avgJobValue} onValueChange={setAvgJobValue} min={200} max={10000} step={100} className="w-full" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">Leads Generated</div>
              <div className="text-2xl font-heading font-bold text-[#0A1628]">{leadsGenerated}</div>
              <div className="text-xs text-gray-400 mt-0.5">per month</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-1">Jobs Closed</div>
              <div className="text-2xl font-heading font-bold text-emerald-700">{closedJobs}</div>
              <div className="text-xs text-gray-400 mt-0.5">by the network</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="text-xs text-yellow-700 font-semibold uppercase tracking-wide mb-1">Your Share</div>
              <div className="text-2xl font-heading font-bold text-yellow-800">{(t.share * 100).toFixed(0)}%</div>
              <div className="text-xs text-gray-400 mt-0.5">of ProLnk fee</div>
            </div>
          </div>
          <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1a2d4a]">
            <div>
              <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Estimated Monthly Earnings</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-heading font-bold tabular-nums text-[#F5E642] transition-all duration-500">
                  ${Math.round(partnerEarnings).toLocaleString()}
                </span>
                <span className="text-white/50 text-sm">/mo</span>
              </div>
              <div className="text-white/50 text-xs mt-1">
                {closedJobs} jobs × ${Math.round(proLnkFeePerJob).toLocaleString()} ProLnk fee × {(t.share * 100).toFixed(0)}% your share
              </div>
              <div className="text-white/30 text-xs mt-1 italic">
                Estimates use 15% AI detection rate &amp; 20% network close rate. Actual results vary.
              </div>
            </div>
            <div className="text-right shrink-0 space-y-2">
              <div>
                <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-0.5">Annual Projection</div>
                <div className="text-2xl font-heading font-bold text-white">${Math.round(annualEarnings).toLocaleString()}</div>
              </div>
              {monthsToOffset !== null && (
                <div className="text-white/50 text-xs">
                  Subscription offset in ~{monthsToOffset} {monthsToOffset === 1 ? "month" : "months"}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-5 mb-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">ProLnk-sourced jobs you receive / month</label>
                <span className="text-base font-heading font-bold text-[#0A1628]">{receivedJobs[0]}</span>
              </div>
              <Slider value={receivedJobs} onValueChange={setReceivedJobs} min={1} max={50} step={1} className="w-full" />
              <p className="text-xs text-gray-400 mt-1">Platform fee only applies to jobs ProLnk verifiably sourced</p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">Avg job value in your trade</label>
                <span className="text-base font-heading font-bold text-[#0A1628]">${avgJobValue[0].toLocaleString()}</span>
              </div>
              <Slider value={avgJobValue} onValueChange={setAvgJobValue} min={200} max={10000} step={100} className="w-full" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">Gross Revenue</div>
              <div className="text-2xl font-heading font-bold text-[#0A1628]">${(receivedJobs[0] * avgJobValue[0]).toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-0.5">per month</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="text-xs text-red-600 font-semibold uppercase tracking-wide mb-1">Platform Fees</div>
              <div className="text-2xl font-heading font-bold text-red-700">${Math.round(totalPlatformFees).toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-0.5">10% per job</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-1">Net Revenue</div>
              <div className="text-2xl font-heading font-bold text-emerald-700">${Math.round(netRevenue).toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-0.5">after fees + sub</div>
            </div>
          </div>
          <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0A1628]">
            <div>
              <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Total Monthly Cost</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-heading font-bold tabular-nums text-[#F5E642] transition-all duration-500">
                  ${Math.round(totalPlatformFees + t.fee).toLocaleString()}
                </span>
                <span className="text-white/50 text-sm">/mo</span>
              </div>
              <div className="text-white/50 text-xs mt-1">
                ${t.fee} subscription + ${Math.round(totalPlatformFees).toLocaleString()} platform fees
              </div>
            </div>
            <div className="text-right shrink-0 space-y-2">
              <div>
                <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-0.5">Cost as % of Revenue</div>
                <div className="text-2xl font-heading font-bold text-white">{receivedJobs[0] > 0 ? ((totalPlatformFees + t.fee) / (receivedJobs[0] * avgJobValue[0]) * 100).toFixed(1) : 0}%</div>
              </div>
              <div className="text-white/50 text-xs">vs. Angi/HomeAdvisor avg 15-25%</div>
            </div>
          </div>
        </>
      )}
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-400">
          {mode === "referring" ? "Estimate based on network averages. Actual results vary by trade, service area, and photo volume." : "Platform fee applies only to ProLnk-verified job sources. Actual results vary."}
        </p>
        <button
          onClick={() => { setPhotosPerMonth([15]); setAvgJobValue([1500]); setReceivedJobs([5]); setTier("Growth"); setMode("referring"); }}
          className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 ml-3 flex-shrink-0"
        >
          Reset
        </button>
      </div>
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
          Earn referral commissions when your leads close — and pay a platform fee only when ProLnk is the verified source of a job you receive. No hidden fees. No contracts. Upgrade or cancel anytime.
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
            style={activeTierIdx === idx ? { boxShadow: "0 0 0 2px #0A1628, 0 8px 32px rgba(10,22,40,0.15), inset 0 3px 0 #F5E642" } : {}}
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
                Earn potential commissions when homes you photograph generate closed jobs
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
            <Link href="/apply">
              <button
                className={`w-full py-3 text-sm font-bold tracking-wide transition-all rounded-none ${
                  activeTierIdx === idx
                    ? "bg-[#0A1628] text-white hover:opacity-90"
                    : "border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {tier.cta}
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Add-On Modules */}
      <div className="max-w-4xl mx-auto mb-14">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-2xl font-heading font-bold text-gray-900">Add-On Modules</h3>
          <span className="text-sm text-gray-400 font-medium">Stack on top of any plan</span>
        </div>
        {/* Available Now add-ons */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {ADD_ONS.filter(a => !(a as any).comingSoon).map((addon) => {
            const Icon = addon.icon;
            return (
              <div
                key={addon.id}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#0A1628]/8 text-[#0A1628] shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{addon.name}</div>
                    <div className="text-xs text-gray-500 font-medium">
                      {(addon as any).perUnit ? `+$${addon.price}${addon.unit}` : `$${addon.price}${addon.unit}`}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{addon.description}</p>
              </div>
            );
          })}
        </div>
        {/* AI Agent Add-Ons — Coming Soon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#0A1628]" />
            <span className="text-sm font-semibold text-gray-700">AI Agent Add-Ons</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0A1628]/10 text-[#0A1628]">
            Coming Soon
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADD_ONS.filter(a => (a as any).comingSoon).map((addon) => {
            const Icon = addon.icon;
            return (
              <div
                key={addon.id}
                className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-5 cursor-default opacity-80"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-lg bg-[#0A1628]/10 text-[#0A1628]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{addon.name}</div>
                    <div className="text-xs text-gray-400">${addon.price}{addon.unit} &middot; Coming soon</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{addon.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Total */}
      {(addOnTotal > 0 || activeTierIdx > 0) && (
        <div className="max-w-4xl mx-auto mb-10">
          <div className="rounded-2xl border-2 border-[#1a2d4a] bg-[#1a2d4a] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Your Estimated Monthly</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-heading font-bold text-white">${monthlyTotal}</span>
                <span className="text-white/50 text-sm">/mo base</span>
              </div>
              <div className="text-white/50 text-xs mt-1">
                {activeTier.name} (${baseFee}/mo)
                {addOnTotal > 0 && ` + $${addOnTotal}/mo in add-ons`}
                 · Earn {(activeTier.commissionShare * 100).toFixed(0)}% of ProLnk's fee on every closed job
              </div>
            </div>
            <Link href="/apply">
              <button className="px-8 py-3 bg-[#F5E642] text-[#0A1628] font-bold text-sm tracking-wide hover:opacity-90 transition-all rounded-none shrink-0">
                Apply Now 
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Earnings Calculator */}
      <EarningsEstimator />

      <p className="text-center text-sm text-gray-400 mt-8">All plans include FSM integration. No contracts — upgrade or cancel anytime.</p>

      {/* ── COMMERCIAL DIVIDER ─────────────────────────────────────────────── */}
      <div className="mt-20 mb-16">
        <div className="relative flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-gray-200" />
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#F5E642]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Commercial &amp; Enterprise</span>
            <div className="w-2 h-2 rounded-full bg-[#F5E642]" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-200 to-gray-200" />
        </div>
      </div>

      {/* ── PROLNK EXCHANGE BANNER ─────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #162844 0%, #1a2e50 60%, #1e1a50 100%)" }}>
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(245,230,66,0.15)", color: "#F5E642" }}>New Platform</div>
                <div className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white/60">Coming Soon</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                ProLnk <span style={{ color: "#F5E642" }}>Exchange</span>
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg">
                The commercial-grade job board and broker network for GCs, property managers, HOAs, and multi-site operators. Post jobs, bid on commercial contracts, and connect with verified commercial-grade trade partners — all in one place.
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                {["General Contractors", "Property Managers", "HOAs", "Multi-Site Operators", "Commercial Brokers"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/10">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
              <Link href="/apply">
                <button
                  className="group flex items-center gap-2 px-7 py-3.5 font-bold text-sm tracking-wide transition-all rounded-none"
                  style={{ background: "#F5E642", color: "#0A1628" }}
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <span className="text-white/40 text-xs">prolnkexchange.com — launching 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── COMMERCIAL PRICING CARDS ───────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">Commercial Plans</h3>
          <p className="text-gray-500 text-base max-w-xl mx-auto">Built for businesses managing multiple crews, properties, or job sites. Volume pricing, dedicated account management, and priority routing included.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">

          {/* Commercial Pro */}
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-7 flex flex-col">
            <div className="mb-5">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Commercial Pro</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-heading font-bold text-gray-900">$499</span>
                <span className="text-gray-400 text-sm">/mo</span>
              </div>
              <p className="text-sm text-gray-500">For growing commercial contractors and property service companies.</p>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {["Up to 5 crew members","150 AI-analyzed jobs/mo","Commercial lead routing","Priority partner matching","Dedicated onboarding call","8% platform fee on closed jobs"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#0A1628] shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
            <Link href="/exchange/commercial">
              <button className="w-full py-3 rounded-none border-2 border-[#0A1628] text-[#0A1628] font-bold text-sm tracking-wide hover:bg-[#0A1628] hover:text-white transition-all">
                Get Early Access
              </button>
            </Link>
          </div>

          {/* Commercial Crew — Featured */}
          <div className="rounded-2xl border-2 bg-[#162844] p-7 flex flex-col relative overflow-hidden" style={{ borderColor: "#F5E642" }}>
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#F5E642" }} />
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "#F5E642", color: "#0A1628" }}>Most Popular</span>
            </div>
            <div className="mb-5">
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#F5E642" }}>Commercial Crew</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-heading font-bold text-white">$899</span>
                <span className="text-white/50 text-sm">/mo</span>
              </div>
              <p className="text-sm text-white/60">For multi-crew operations, HOAs, and property management companies.</p>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {["Up to 15 crew members","Unlimited AI-analyzed jobs","Commercial + residential routing","ProLnk Exchange early access","Dedicated account manager","Volume lead bundles","6% platform fee on closed jobs"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#F5E642" }} />{f}
                </li>
              ))}
            </ul>
            <Link href="/exchange/commercial">
              <button className="w-full py-3 rounded-none font-bold text-sm tracking-wide transition-all" style={{ background: "#F5E642", color: "#0A1628" }}>
                Get Early Access
              </button>
            </Link>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-7 flex flex-col">
            <div className="mb-5">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Enterprise</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-heading font-bold text-gray-900">Custom</span>
              </div>
              <p className="text-sm text-gray-500">For large GCs, multi-market operators, and enterprise service companies.</p>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {["Unlimited crew members","White-label option available","Custom AI detection rules","API access + webhooks","SLA-backed uptime guarantee","Custom commission structure","Dedicated engineering support"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#0A1628] shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
            <Link href="/advertise">
              <button className="w-full py-3 rounded-none border-2 border-[#0A1628] text-[#0A1628] font-bold text-sm tracking-wide hover:bg-[#0A1628] hover:text-white transition-all">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-8">
          Commercial plans include all residential features. Pricing subject to change during beta.{" "}
          <Link href="/apply" className="text-[#0A1628] font-semibold hover:underline">Apply for the Exchange →</Link>
        </p>
      </div>
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
  company: "Elite",
  crew: "Growth",
  pro: "Connect",
  scout: "Connect",
};



// --- Why ProLnk Wins -----------------------------------------------------------
function WhyProLnkSection() {
  const competitors = [
    {
      name: "Angi / HomeAdvisor",
      color: "#EF4444",
      problems: [
        "Avg. cost per booked job: $542",
        "FTC fined $7.2M for fake leads",
        "Same lead sold to 3–5 contractors",
        "You pay whether the job closes or not",
        "Unverified contractors — anyone can list",
      ],
    },
    {
      name: "Thumbtack",
      color: "#F97316",
      problems: [
        "Avg. cost per booked job: $250",
        "Pros pay $50 for leads on $150 jobs",
        "Cold leads — homeowner didn't request you",
        "No quality guarantee on lead validity",
        "Race to the bottom on price",
      ],
    },
    {
      name: "Google Ads / LSA",
      color: "#EAB308",
      problems: [
        "Avg. cost per booked job: $168",
        "Requires constant ad management",
        "Cold intent — homeowner just browsing",
        "No referral network — you're on your own",
        "Budget disappears with no guaranteed ROI",
      ],
    },
  ];

  const advantages = [
    {
      icon: Target,
      title: "Warm Leads Only",
      desc: "Every lead comes from a verified job photo at a real property. The homeowner's neighbor already trusted you enough to let you on their property. That's the warmest lead in the industry.",
      stat: "3–5×",
      statLabel: "projected close rate vs cold leads",
    },
    {
      icon: RefreshCw,
      title: "Photos Keep Earning",
      desc: "On Angi, you pay for a lead once and it's gone. On ProLnk, every photo you upload stays in the engine permanently. Storms, recalls, and aging assets trigger new leads from photos you took months ago.",
      stat: "∞",
      statLabel: "residual earning potential",
    },
    {
      icon: Lock,
      title: "No Risk on Unmatched Jobs",
      desc: "ProLnk charges a flat monthly subscription — not a per-lead fee. If a referral doesn't result in a closed job, you pay nothing beyond your subscription. No wasted spend on homeowners who never respond.",
      stat: "$0",
      statLabel: "extra cost if the job doesn't close",
    },
    {
      icon: Shield,
      title: "Verified Network — No Strangers",
      desc: "Every partner is licensed, insured, and background-checked through our 7-point verification. Homeowners aren't matched with random contractors — they're matched with professionals their neighbors already used.",
      stat: "7-pt",
      statLabel: "verification before any lead",
    },
    {
      icon: BarChart3,
      title: "You Own the Relationship",
      desc: "Angi and Thumbtack own the homeowner. ProLnk gives you the homeowner's contact, the job details, and the full history. You build the relationship. You get the repeat business. We just make the introduction.",
      stat: "100%",
      statLabel: "you own the customer",
    },
    {
      icon: Users,
      title: "Network Effect Compounds",
      desc: "The more partners in your area, the more photos get uploaded, the more leads get generated — for everyone. Angi is a marketplace where you compete. ProLnk is a network where everyone wins together.",
      stat: "150+",
      statLabel: "trade categories covered",
    },
  ];

  return (
    <section id="why-prolnk" className="py-24 relative overflow-hidden" style={{ backgroundColor: "#FAFAF9" }}>
      <div className="container">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: "#0A162812", color: "#0A1628" }}>
              <Award className="w-3.5 h-3.5" /> Why ProLnk Wins
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              The Lead Gen Industry Is<br />
              <span style={{ color: "#EF4444" }}>Broken.</span> We Fixed It.
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Every other platform charges you to compete. ProLnk pays you to collaborate. Here's the difference — in plain numbers.
            </p>
          </div>
        </FadeUp>

        {/* Competitor Pain Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {competitors.map((comp) => (
            <FadeUp key={comp.name}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${comp.color}15` }}>
                    <XCircle className="w-4 h-4" style={{ color: comp.color }} />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900">{comp.name}</h3>
                </div>
                <div className="space-y-2.5">
                  {comp.problems.map((p) => (
                    <div key={p} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: comp.color }} />
                      <p className="text-sm text-gray-600 leading-snug">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ProLnk Advantages Grid */}
        <FadeUp>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">The ProLnk Difference</h3>
            <p className="text-gray-500">Six structural advantages that no lead gen platform can replicate.</p>
          </div>
        </FadeUp>
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {advantages.map((adv) => (
            <StaggerItem key={adv.title}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full hover:shadow-md transition-shadow border-l-4" style={{ borderLeftColor: "#F5E642" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#F5E64220" }}>
                  <adv.icon className="w-6 h-6" style={{ color: "#0A1628" }} />
                </div>
                <h4 className="font-heading font-bold text-gray-900 mb-2">{adv.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{adv.desc}</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-2xl font-heading font-bold text-[#0A1628]">{adv.stat}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{adv.statLabel}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Cost Comparison Bar */}
        <FadeUp>
          <div className="bg-[#1a2d4a] rounded-2xl p-8 text-white">
            <h3 className="text-xl font-heading font-bold mb-2 text-center">Average Cost Per Booked Job — Industry Comparison</h3>
            <p className="text-white/50 text-sm text-center mb-8">Based on 2025–2026 industry data. ProLnk commission-only model shown at 10% on a $1,200 avg job.</p>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { label: "Angi / HomeAdvisor", cost: 542, max: 600, color: "#EF4444" },
                { label: "Thumbtack", cost: 250, max: 600, color: "#F97316" },
                { label: "Google Ads / LSA", cost: 168, max: 600, color: "#EAB308" },
                { label: "ProLnk (commission-only)", cost: 120, max: 600, color: "#F5E642" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-semibold" style={{ color: item.color === "#F5E642" ? "#F5E642" : "white" }}>{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>${item.cost}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all duration-700"
                      style={{ width: `${(item.cost / item.max) * 100}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-white/40 text-xs mt-6">Sources: BlueGrid Media 2026, FTC enforcement action Jan 2023, GhostRep AI 2025, ProLnk commission model</p>
          </div>
        </FadeUp>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/apply">
            <button className="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold tracking-wide transition-all hover:opacity-90 rounded-none" style={{ backgroundColor: "#1a2d4a", color: "white" }}>
              Apply Now — Free During Beta <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- Main Landing Page -------------------------------------------------------------
export default function Home() {
  const { user } = useAuth();
  const { isTrustyPro } = useDomain();
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
  const [urgencyDismissed, setUrgencyDismissed] = useState(false);
  // Waitlist state removed — main site now uses direct apply flow
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);

  // Quick waitlist mutation removed — main site now uses direct apply flow

  const { data: foundingData } = trpc.directory.getFoundingPartnerCount.useQuery();
  // Waitlist counts removed — main site uses founding partner count instead
  const rawSpotsRemaining = foundingData?.spotsRemaining ?? 94;
  const spotsRemaining = rawSpotsRemaining;
  const spotsUsed = 100 - spotsRemaining;
  const spotsPercent = Math.round((spotsUsed / 100) * 100);

  return (
    <div className="min-h-screen bg-white">
      {/* — Urgency Bar — */}
      {!urgencyDismissed && (
        <div className="relative z-[60] flex items-center justify-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#0A1628]" style={{ backgroundColor: "#F5E642" }}>
          <span className="animate-pulse w-2 h-2 rounded-full bg-[#0A1628] shrink-0" />
          <span>
            DFW Beta — Only <strong>100 Founding Partner spots</strong> available network-wide.{" "}
            {spotsRemaining > 0 ? (
              <span className="underline underline-offset-2 cursor-pointer" onClick={() => document.getElementById('guarantee')?.scrollIntoView({ behavior: 'smooth' })}>
                {spotsRemaining} spots remaining →
              </span>
            ) : (
              <span>Apply now to lock in your founding rate.</span>
            )}
          </span>
          <button onClick={() => setUrgencyDismissed(true)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-60 transition-opacity">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <Helmet>
        <title>ProLnk — Your Photos. Their Next Job.</title>
        <meta name="description" content="ProLnk turns your job-site photos into a referral engine. AI finds the neighbors' next project and pays you a commission. Free for home service pros in DFW." />
        <meta property="og:title" content="ProLnk — Your Photos. Their Next Job." />
        <meta property="og:description" content="ProLnk turns your job-site photos into a referral engine. AI finds the neighbors' next project and pays you a commission." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prolnk.io/" />
        <meta property="og:image" content="https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/prolnk-hero-house_ad6a73f1.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ProLnk — Your Photos. Their Next Job." />
        <meta name="twitter:description" content="ProLnk turns your job-site photos into a referral engine. AI finds the neighbors' next project and pays you a commission." />
        <meta name="twitter:image" content="https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/prolnk-hero-house_ad6a73f1.webp" />
        <link rel="canonical" href="https://prolnk.io/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ProLnk",
          "url": "https://prolnk.io",
          "description": "AI-powered referral network for home service professionals in Dallas-Fort Worth. Upload job-site photos, earn commissions on cross-trade referrals.",
          "areaServed": { "@type": "Place", "name": "Dallas-Fort Worth, TX" },
          "sameAs": [],
          "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "email": "support@prolnk.io" }
        })}</script>
      </Helmet>

      {/* — Navigation — */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <ProLnkLogo height={44} variant="light" className="shrink-0" />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            {[
              { href: "#how-it-works", id: "how-it-works", label: "How It Works", isHash: true },
              { href: "#who-can-join", id: "who-can-join", label: "Who Can Join", isHash: true },
              { href: "/pricing", id: "pricing", label: "Pricing", isHash: false },
              { href: "#badge-system", id: "badge-system", label: "TrustyPro Badge", isHash: true },
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`transition-colors font-medium ${
                  activeSection === item.id
                    ? "text-[#0A1628] border-b-2 border-[#0A1628] pb-0.5"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                onClick={item.isHash ? (e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); } : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/trustypro">
              <Button variant="ghost" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                TrustyPro
              </Button>
            </Link>
            <Link href="/advertise">
              <Button variant="ghost" className="text-sm font-medium" style={{ color: "#00B5B8" }}>Advertise</Button>
            </Link>
            {!isTrustyPro && (
              <Link href="/dashboard">
                <Button variant="ghost" className="text-sm font-medium">Partner Login</Button>
              </Link>
            )}
            {!isTrustyPro && (
              <Link href="/admin">
                <Button variant="ghost" className="text-sm font-medium flex items-center gap-1.5" style={{ color: isAdmin ? "#b45309" : "#6b7280" }}>
                  <Lock className="w-3.5 h-3.5" />
                  Admin
                </Button>
              </Link>
            )}
            <Link href="/apply">
              <Button className="text-sm font-semibold text-white rounded-none px-5" style={{ backgroundColor: "#0A1628" }}>
                Apply Now
              </Button>
            </Link>
          </div>
          <button className="md:hidden p-2" aria-label="Toggle mobile menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            {["how-it-works", "who-can-join", "pricing", "badge-system", "faq"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="block text-sm font-medium text-gray-700 py-2 capitalize"
                onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                {id === 'how-it-works' ? 'How It Works' : id === 'who-can-join' ? 'Who Can Join' : id === 'badge-system' ? 'TrustyPro Badge' : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              {!isTrustyPro && (
                <Link href="/dashboard" className="flex-1"><Button variant="outline" className="w-full text-sm">Partner Login</Button></Link>
              )}
              <Link href="/apply" className="flex-1">
                <Button className="w-full text-sm text-white rounded-none font-semibold" style={{ backgroundColor: "#0A1628" }}>Apply Now</Button>
              </Link>
            </div>
            {!isTrustyPro && (
              <Link href="/trustypro" className="block">
                <Button variant="ghost" className="w-full text-sm text-blue-600 flex items-center justify-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  TrustyPro — Homeowner Portal
                </Button>
              </Link>
            )}
            {!isTrustyPro && (
              <Link href="/admin" className="block">
                <Button variant="ghost" className="w-full text-sm flex items-center justify-center gap-1.5" style={{ color: "#92400e", backgroundColor: "#fef3c7", border: "1px solid #fde68a" }}>
                  <Lock className="w-3.5 h-3.5" />
                  Admin Portal
                </Button>
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* — 1. Hero — */}
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
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 mb-8 tracking-widest uppercase animate-pulse"
                style={{ backgroundColor: "rgba(245,230,66,0.15)", color: "#F5E642", border: "1px solid rgba(245,230,66,0.3)" }}>
                DFW Beta Launch — Founding Partner Spots Available
              </span>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h1 className="text-6xl md:text-7xl font-heading font-bold text-white leading-[1.05] mb-6 tracking-tight">
                You're Already Doing<br />the Work. ProLnk Makes<br />Sure You Get Paid Twice.
              </h1>
            </FadeUp>

            <FadeUp delay={0.35}>
              <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-lg">
                You're already taking photos after every job. ProLnk turns those photos into a referral engine that finds your peers' next project — and pays you a commission every time one closes. No cold calls. No ad spend. No extra work.
              </p>
            </FadeUp>

            <FadeUp delay={0.45}>
              <div className="flex flex-col sm:flex-row gap-3 items-start">
                <Link href="/apply">
                  <button
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-wide transition-all hover:brightness-110 rounded-none"
                    style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
                  >
                    Apply for Early Access <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-5 py-4 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                  onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  See How It Works <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <p className="text-xs text-white/40 mt-2">Subscription-based platform. Commission earned only when jobs close. No credit card required during beta.</p>
            </FadeUp>

            <FadeIn delay={0.6}>
              <div className="flex flex-wrap items-center gap-8 mt-12 pt-10 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white tabular-nums">
                    <CountUp target={150} suffix="+" />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">AI Detection Categories</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white tabular-nums">
                    <CountUp target={100} />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">Founding Partner Spots</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-white tabular-nums">
                    <CountUp target={30} suffix="-Day" />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">Guarantee</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 italic">DFW launch — Only 100 Founding Partner spots available. Lock in your rate before we open to the public.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* — 1.5. Trade Selector Micro-Commitment — */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container">
          <FadeUp>
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0A1628]/40 mb-3">Personalize Your Experience</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">What's your primary trade?</h2>
              <p className="text-gray-500 max-w-md mx-auto">Select your trade to see estimated passive commission earnings based on 50 photos/month at the Pro tier.</p>
            </div>
          </FadeUp>
          <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-5xl mx-auto mb-8">
            {[
              { label: "Roofing", roi: 880 },
              { label: "HVAC", roi: 550 },
              { label: "Plumbing", roi: 330 },
              { label: "Electrical", roi: 440 },
              { label: "Landscaping", roi: 220 },
              { label: "Painting", roi: 385 },
              { label: "Flooring", roi: 440 },
              { label: "Windows", roi: 385 },
              { label: "Gutters", roi: 165 },
              { label: "Concrete", roi: 330 },
              { label: "Pest Control", roi: 55 },
              { label: "Cleaning", roi: 33 },
              { label: "Foundation", roi: 1100 },
              { label: "Other", roi: 330 },
            ].map((trade) => (
              <StaggerItem key={trade.label}>
                <button
                  onClick={() => {
                    setSelectedTrade(trade.label);
                    document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`w-full flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                    selectedTrade === trade.label
                      ? 'border-[#0A1628] bg-[#0A1628] text-white shadow-lg'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-[#0A1628]/40 hover:shadow-md'
                  }`}
                >
                  <span className="text-xs font-semibold text-center leading-tight">{trade.label}</span>
                  {selectedTrade === trade.label && (
                    <span className="text-[10px] font-bold text-[#F5E642]">~${trade.roi.toLocaleString()}/mo</span>
                  )}
                </button>
              </StaggerItem>
            ))}
          </StaggerChildren>
          {selectedTrade && (
            <FadeUp>
              <div className="max-w-lg mx-auto text-center p-5 rounded-2xl border border-[#0A1628]/10 bg-[#0A1628]/5">
                <p className="text-sm text-gray-600">
                  <strong className="text-[#0A1628]">{selectedTrade} pros</strong> on the Pro tier uploading ~50 photos/month could earn an estimated{" "}
                  <strong className="text-[#0A1628]">
                    {["Roofing","Foundation"].includes(selectedTrade!) ? "$880–$1,100" :
                     ["HVAC","Electrical","Flooring","Windows","Painting"].includes(selectedTrade!) ? "$385–$550" :
                     "$33–$330"}/month
                  </strong>{" "}
                  in passive commissions — and that scales with every photo you add.
                  <a href="#roi-calculator" className="ml-2 text-[#0A1628] font-bold underline underline-offset-2">See your estimate →</a>
                </p>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* — 2. How It Works — */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Four Steps. Zero Extra Work.</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg">You already take photos after every job. ProLnk turns those photos into a referral engine that runs in the background — no new workflow, no extra selling, no cold calls.</p>
          </div>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Finish a Job", desc: "Complete your normal work. Before you start and after you finish, take before-and-after photos of the work area — plus 3 wide-angle shots of the front of the house. That's the only workflow change.", icon: Camera },
              { step: "02", title: "AI Scans the Photos", desc: "Our AI analyzes every image across 65+ detection categories — aging roofs, HVAC units, cracked driveways, overgrown landscaping, deferred maintenance, and more. Done in seconds.", icon: Zap },
              { step: "03", title: "Collect Your Commission", desc: "When a partner in the network closes a job from your referral lead, you earn a commission. Tracked in real time. Paid monthly. No chasing.", icon: DollarSign },
              { step: "04", title: "It Never Stops Working", desc: "Your photos stay in the engine permanently. A storm hits 6 months later — your old photos generate new leads. Residual income from work you already did.", icon: Repeat },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="relative p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 h-full">
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

      {/* — 2.5. The ProLnk Engine — */}
      <section id="the-engine" className="py-24 relative overflow-hidden" style={{ backgroundColor: "#0d1e38" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #3B82F6 0%, transparent 50%), radial-gradient(circle at 80% 70%, #7C3AED 0%, transparent 50%)" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container relative">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
                <Radar className="w-4 h-4 text-[#F5E642]" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Patent-Pending Technology</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">The ProLnk Engine</h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                Four autonomous AI engines work 24/7 to turn your job photos into a continuous stream of revenue — long after you leave the property.
              </p>
            </div>
          </FadeUp>

          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {[
              {
                icon: Eye,
                title: "Photo Intelligence",
                desc: "Every photo is analyzed across 65+ trade categories. AI identifies aging equipment, damage patterns, deferred maintenance, and upgrade potential invisible to the human eye.",
                color: "#3B82F6",
                stat: "65+",
                statLabel: "Trade Categories",
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
            <Link href="/apply">
              <button className="px-8 py-4 text-sm font-bold text-[#0A1628] transition-all hover:brightness-110 rounded-none" style={{ backgroundColor: "#F5E642" }}>
                Start Building Your Photo Library <ArrowRight className="w-4 h-4 inline ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* — ProLnk Job Site AI Visual — */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <p className="text-xs text-[#0A1628]/70 font-semibold uppercase tracking-widest mb-4">AI Detection in Action</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight">
                One Photo.<br />
                <span className="text-[#0A1628]">Multiple Commission Opportunities.</span>
              </h2>
              <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                When you upload a job-site photo, our AI doesn&apos;t just see your trade — it scans the entire property for issues across <strong className="text-gray-900">65+ categories</strong>. Every detection is a referral opportunity. Every referral is a commission.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { label: "Toggle to Detection View", desc: "See what the AI flags beyond your trade" },
                  { label: "Toggle to Commission View", desc: "See exactly what each detection is worth" },
                  { label: "One photo generates multiple streams", desc: "Roofing job → gutters, paint, HVAC, landscaping, fascia" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#0A1628] text-xs font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">{item.label}</p>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/apply">
                <button className="px-6 py-3 rounded-xl bg-[#1a2d4a] text-white font-bold text-sm hover:bg-[#1a2d4a]/90 transition-colors flex items-center gap-2">
                  Start Detecting Opportunities <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </FadeUp>
            <FadeUp delay={0.15}>
              <ProLnkJobSiteVisual />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* — Passive Income Engine — */}
      <section id="passive-income" className="py-24" style={{ background: "linear-gradient(135deg, #162844 0%, #1a2e50 60%, #162844 100%)" }}>
        <div className="container">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 mb-6">
                <TrendingUp className="w-4 h-4 text-[#F5E642]" />
                <span className="text-xs font-bold text-[#F5E642] uppercase tracking-wider">Multiplied Returns</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">You Do the Job Once.<br />ProLnk Pays You Forever.</h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">Most referral platforms pay you once. ProLnk is built differently — your photos and your network create two compounding income streams that run in the background while you focus on your own work.</p>
            </div>
          </FadeUp>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <FadeUp delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#F5E642] flex items-center justify-center mb-6">
                  <Camera className="w-6 h-6 text-[#0A1628]" />
                </div>
                <div className="text-xs font-bold text-[#F5E642] uppercase tracking-wider mb-2">Stream 1 — Photo Origination</div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">Your Photos. Their Jobs. Your Commission.</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Every time you upload job photos, our AI scans the entire property and generates referral leads for other trades. When any of those leads close — whether it’s a roofer, an HVAC tech, or a landscaper — you earn a commission on that job. You never lifted a finger for it.
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Roofing job photo", result: "AI flags HVAC unit aging → HVAC partner closes $4,200 job → you earn $168" },
                    { label: "Landscaping job photo", result: "AI flags cracked driveway → Concrete partner closes $3,800 job → you earn $152" },
                    { label: "Painting job photo", result: "AI flags gutter damage → Gutter partner closes $900 job → you earn $36" },
                  ].map((ex, i) => (
                    <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <div className="text-xs font-semibold text-[#F5E642] mb-1">{ex.label}</div>
                      <div className="text-xs text-white/60 leading-relaxed">{ex.result}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#F5E642] flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-[#0A1628]" />
                </div>
                <div className="text-xs font-bold text-[#F5E642] uppercase tracking-wider mb-2">Stream 2 — Network Growth</div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">Refer a Pro. Earn From Their Network.</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  When you refer another pro who joins ProLnk, you earn a referral bonus every time they generate a closed job. The more pros you bring in, the more your passive income compounds — without doing any additional work.
                </p>
                <div className="space-y-3">
                  {[
                    { label: "You refer 1 roofer", result: "They close 8 jobs/month at $6,000 avg → you earn a network bonus every month" },
                    { label: "You refer 3 pros", result: "3 active partners generating leads → your passive income triples automatically" },
                    { label: "Your network grows", result: "More pros = more photos = more AI detections = more commissions flowing to you" },
                  ].map((ex, i) => (
                    <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <div className="text-xs font-semibold text-[#F5E642] mb-1">{ex.label}</div>
                      <div className="text-xs text-white/60 leading-relaxed">{ex.result}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={0.3}>
            <div className="max-w-3xl mx-auto rounded-2xl border border-[#F5E642]/20 bg-[#F5E642]/5 p-8 text-center">
              <div className="text-xs font-bold text-[#F5E642] uppercase tracking-wider mb-6">The Compounding Effect</div>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-3xl font-heading font-black text-white mb-1">1 Job</div>
                  <div className="text-xs text-white/50">You complete your trade</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-[#F5E642]" />
                </div>
                <div>
                  <div className="text-3xl font-heading font-black text-[#F5E642] mb-1">5–12 Leads</div>
                  <div className="text-xs text-white/50">AI generates for other trades</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-heading font-black text-white mb-1">$0</div>
                  <div className="text-xs text-white/50">Extra work required</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-[#F5E642]" />
                </div>
                <div>
                  <div className="text-3xl font-heading font-black text-[#F5E642] mb-1">$50–$400</div>
                  <div className="text-xs text-white/50">Passive commissions per job</div>
                </div>
              </div>
              <p className="text-white/40 text-xs mt-6">Estimates based on Pro tier at 10% platform fee. Actual results vary by trade, photo quality, and market density.</p>
            </div>
          </FadeUp>
        </div>
      </section>
      {/* — Why ProLnk Wins — */}
      <WhyProLnkSection />
      {/* — 3. Who Can Join — */}
      <section id="who-can-join" className="py-20" style={{ backgroundColor: "#FAFAF9" }}>
        <div className="container">
          <FadeUp>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0A1628] bg-[#0A1628]/8 px-4 py-2 rounded-full mb-4">
                <Briefcase className="w-3.5 h-3.5" /> 150+ Trade Categories
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Built for the Trades</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-lg">
                Any licensed, insured home service business in DFW. If you work at people’s homes, you belong here.
              </p>
            </div>
          </FadeUp>
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { group: "Outdoor & Lawn", icon: TreePine, color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", count: 10, top: ["Lawn Care", "Landscaping", "Tree Removal", "Irrigation", "Hardscaping"] },
              { group: "Home Maintenance", icon: Wrench, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", count: 12, top: ["Handyman", "Roofing", "HVAC", "Plumbing", "Electrical"] },
              { group: "Cleaning & Restoration", icon: Sparkles, color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", count: 10, top: ["House Cleaning", "Pressure Washing", "Carpet Cleaning", "Mold Remediation", "Junk Removal"] },
              { group: "Specialty Trades", icon: Hammer, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", count: 12, top: ["Painting", "Pool Service", "Pest Control", "Kitchen Remodel", "Flooring & Tile"] },
              { group: "Home Technology", icon: Zap, color: "#d97706", bg: "#fffbeb", border: "#fde68a", count: 6, top: ["Smart Home", "EV Charger", "Generator", "Home Theater", "Solar"] },
              { group: "Pet & Animal", icon: Users, color: "#db2777", bg: "#fdf2f8", border: "#fbcfe8", count: 4, top: ["Pet Waste Removal", "Dog Walking", "Pet Grooming", "Wildlife Removal"] },
            ].map((item) => (
              <StaggerItem key={item.group}>
                <div
                  className="rounded-2xl p-6 h-full flex flex-col"
                  style={{ backgroundColor: item.bg, border: `1.5px solid ${item.border}` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color + "20" }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{item.group}</h3>
                      <p className="text-xs font-medium" style={{ color: item.color }}>{item.count}+ categories</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {item.top.map((cat) => (
                      <span key={cat} className="text-xs font-medium text-gray-700 bg-white/80 border border-white px-2.5 py-1 rounded-full shadow-sm">
                        {cat}
                      </span>
                    ))}
                    <span className="text-xs font-medium text-gray-400 bg-white/50 border border-gray-200 px-2.5 py-1 rounded-full">
                      +{item.count - item.top.length} more
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm mb-4">Don’t see your trade? We review every application individually.</p>
            <Link href="/apply">
              <button className="px-8 py-3 text-sm font-bold border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all rounded-none">
                Apply Anyway — We’ll Review Your Category
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* — 4. Pricing — */}
      <section id="pricing" className="py-24 bg-white">
        <PricingSection />
      </section>

      {/* — 5. FSM Compatibility — */}
      <section id="fsm-compat" className="py-20 bg-white border-t border-gray-100">
        <div className="container">
          <FadeUp>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0A1628] bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full mb-4">
                <Plug className="w-3.5 h-3.5" /> Works With Your Existing Tools
              </div>
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
                ProLnk Adds Revenue.<br />It Doesn't Replace Anything.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Keep running Jobber, Housecall Pro, ServiceTitan, or whatever you use today. ProLnk sits on top of your existing workflow as a passive income layer — no migration, no retraining, no disruption. You log jobs the same way you always have. We just make those photos work harder.
              </p>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {[
              {
                icon: Wrench,
                title: "Keep Your FSM Software",
                body: "Jobber, Housecall Pro, ServiceTitan, FieldEdge — ProLnk doesn't touch your scheduling, invoicing, or dispatch. Your team keeps their existing workflow.",
              },
              {
                icon: Camera,
                title: "Just Upload Job Photos",
                body: "Your techs already take photos at every job. ProLnk's AI scans those photos for opportunity signals in neighboring homes. No new habits required.",
              },
              {
                icon: DollarSign,
                title: "Earn Commissions Passively",
                body: "When a lead from your photos converts into a closed job by another ProLnk partner, you earn a commission. It runs in the background while you focus on your own work.",
              },
            ].map((item) => (
              <FadeUp key={item.title}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-[#F5E642]" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp>
            <div className="max-w-5xl mx-auto bg-[#1a2d4a] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p className="text-white font-heading font-bold text-lg mb-1">Think of ProLnk as a referral network layer on top of your business.</p>
                <p className="text-slate-400 text-sm">Your FSM runs your operations. ProLnk runs your passive referral income. They never conflict.</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                {["Jobber", "Housecall Pro", "ServiceTitan", "FieldEdge", "Workiz", "Kickserv"].map((fsm) => (
                  <span key={fsm} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 text-white border border-white/20">{fsm}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>


      {/* — 5a2. Your Past Jobs Are Still Working For You (FSM Backtrack) — */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <FadeUp>
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0A1628] bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full mb-6">
                    <RefreshCw className="w-3.5 h-3.5" /> FSM Integration
                  </div>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-5">
                    Your Past Jobs Are<br />Still Working for You.
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed mb-6">
                    Connect your Field Service Management software and ProLnk automatically pulls your historical job photos — every job you've ever completed becomes a potential commission. You don't start from zero. You start with years of data already in the engine.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: Camera, title: "Historical Photo Import", desc: "Connect Jobber, HCP, or ServiceTitan and we pull every job photo from your history automatically." },
                      { icon: Zap, title: "Instant AI Backfill", desc: "Every imported photo gets analyzed immediately. Leads start appearing in your dashboard within hours." },
                      { icon: DollarSign, title: "Retroactive Commission Potential", desc: "A roofer with 3 years of job photos could have hundreds of undetected opportunities already waiting." },
                    ].map((item) => (
                      <div key={item.title} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F5E642] flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-[#0A1628]" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/apply">
                    <button className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-[#0A1628] hover:opacity-90 transition-all" style={{ backgroundColor: "#F5E642" }}>
                      Connect Your FSM — It's Free <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-6">Every Photo Has a Strategy</h3>
                  <div className="space-y-5">
                    {[
                      {
                        label: "Before Photos",
                        icon: Camera,
                        color: "#3B82F6",
                        desc: "Document the property condition before you start. AI captures baseline data for the entire home — not just your work area.",
                        badge: "Required",
                        badgeColor: "bg-blue-100 text-blue-800",
                      },
                      {
                        label: "After Photos",
                        icon: CheckCircle,
                        color: "#10B981",
                        desc: "Prove your work quality and capture the finished state. AI compares before/after to track improvements and detect adjacent needs.",
                        badge: "Required",
                        badgeColor: "bg-emerald-100 text-emerald-800",
                      },
                      {
                        label: "FSM Historical Import",
                        icon: RefreshCw,
                        color: "#8B5CF6",
                        desc: "Connect your FSM software and backfill years of job photos automatically. Your history becomes instant commission potential.",
                        badge: "Passive",
                        badgeColor: "bg-purple-100 text-purple-800",
                      },
                      {
                        label: "Current Job Photos",
                        icon: Zap,
                        color: "#F59E0B",
                        desc: "Every job you complete from today forward. Upload at job close and the AI scans immediately.",
                        badge: "Ongoing",
                        badgeColor: "bg-amber-100 text-amber-800",
                      },
                    ].map((item) => (
                      <div key={item.label} className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                          <item.icon className="w-4.5 h-4.5" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900">{item.label}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* — 5b. TrustyPro Badge System — */}
      <section id="badge-system" className="py-24" style={{ backgroundColor: "#FAFAF9" }}>
        <div className="container">
          <FadeUp>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0A1628] bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full mb-4">
                <BadgeCheck className="w-3.5 h-3.5" /> TrustyPro Certified
              </div>
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
                Earn Your Badge.<br />Build Homeowner Trust.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                TrustyPro is the homeowner platform where people upload photos of their home, track its health, and get matched with the right pro automatically. Your TrustyPro badge is what homeowners see before they see your price — earned through verified performance, not purchased.
              </p>
            </div>
          </FadeUp>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-14">
            {[
              {
                tier: "Bronze",
                color: "#CD7F32",
                bg: "bg-orange-50",
                border: "border-orange-200",
                emoji: "",
                tagline: "You're in the network",
                requirements: [
                  "Approved ProLnk partner",
                  "Profile 100% complete",
                  "First 5 job photos uploaded",
                  "Background check on file",
                ],
                unlocks: ["ProLnk partner directory listing", "Inbound AI-detected leads", "Commission earnings"],
              },
              {
                tier: "Silver",
                color: "#A8A9AD",
                bg: "bg-gray-50",
                border: "border-gray-300",
                emoji: "",
                tagline: "You're building momentum",
                requirements: [
                  "25+ job photos uploaded",
                  "3+ closed referral jobs",
                  "4.5+ homeowner rating",
                  "60 days active on platform",
                ],
                unlocks: ["Silver badge on homeowner-facing profile", "Priority placement in partner directory", "Access to homeowner property reports"],
              },
              {
                tier: "Gold",
                color: "#D4AF37",
                bg: "bg-yellow-50",
                border: "border-yellow-300",
                emoji: "",
                tagline: "You're a top performer",
                requirements: [
                  "100+ job photos uploaded",
                  "15+ closed referral jobs",
                  "4.7+ homeowner rating",
                  "Active 6+ months",
                ],
                unlocks: ["Gold badge — highest homeowner trust signal", "Featured in ProLnk marketing campaigns", "Reduced commission share threshold", "Storm Alert included free"],
              },
              {
                tier: "Platinum",
                color: "#E5E4E2",
                bg: "bg-slate-50",
                border: "border-slate-300",
                emoji: "",
                tagline: "Elite. Invite-only.",
                requirements: [
                  "300+ job photos uploaded",
                  "50+ closed referral jobs",  // badge requirement — intentional
                  "4.9+ homeowner rating",
                  "Active 12+ months",
                ],
                unlocks: ["Platinum badge — elite trust designation", "Dedicated account manager", "Co-branded marketing materials", "Priority Routing included free", "First access to new markets"],
              },
            ].map((badge) => (
              <StaggerItem key={badge.tier}>
                <div className={`rounded-2xl border ${badge.border} ${badge.bg} p-6 h-full flex flex-col`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{badge.emoji}</span>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest" style={{ color: badge.color }}>{badge.tier}</div>
                      <div className="text-xs text-gray-500">{badge.tagline}</div>
                    </div>
                  </div>
                  <div className="mb-4 flex-1">
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Requirements</div>
                    <ul className="space-y-1.5">
                      {badge.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: badge.color }} />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">What You Unlock</div>
                    <ul className="space-y-1.5">
                      {badge.unlocks.map((unlock) => (
                        <li key={unlock} className="flex items-start gap-2 text-xs text-gray-600">
                          <Zap className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#0A1628]" />
                          {unlock}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <FadeUp>
            <div className="max-w-3xl mx-auto bg-[#1a2d4a] rounded-2xl p-8 text-center">
              <BadgeCheck className="w-10 h-10 text-[#F5E642] mx-auto mb-3" />
              <h3 className="text-2xl font-heading font-bold text-white mb-2">Your Badge Lives on Your TrustyPro Profile</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-6">
                Every homeowner who scans their home through TrustyPro sees your badge before they see your price. Bronze gets you in the door. Platinum makes you the obvious choice. Badges are earned through verified performance — homeowners know they can't be bought.
              </p>
              <Link href="/apply">
                <button className="px-8 py-3 text-sm font-bold bg-[#F5E642] text-[#0A1628] hover:opacity-90 transition-all rounded-none">
                  Start Earning Your Badge
                </button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* — 5c. ProLnk vs Traditional Lead Gen Comparison — */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container">
          <FadeUp>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0A1628] bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full mb-4">
                <Target className="w-3.5 h-3.5" /> Why ProLnk Is Different
              </div>
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
                Stop Buying Leads.<br />Start Earning From Your Work.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Traditional lead gen charges you for names. ProLnk pays you for photos you're already taking.
              </p>
            </div>
          </FadeUp>
          <FadeUp>
            <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="bg-[#0A1628] text-white">
                    <th className="text-left px-6 py-4 font-bold">Feature</th>
                    <th className="text-center px-6 py-4 font-bold">ProLnk</th>
                    <th className="text-center px-6 py-4 font-bold text-white/60">Angi / HomeAdvisor</th>
                    <th className="text-center px-6 py-4 font-bold text-white/60">Thumbtack</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Cost to join", prolnk: "Monthly subscription (no per-lead fees)", angi: "$300/yr + $15–$85/lead", thumb: "Pay per lead" },
                    { feature: "Lead quality", prolnk: "Warm (neighbor referral)", angi: "Cold (shared leads)", thumb: "Cold (bidding war)" },
                    { feature: "Exclusive leads", prolnk: "Yes — 1:1 match", angi: "No — shared with 3–5 pros", thumb: "No — bidding system" },
                    { feature: "You earn referral commissions", prolnk: "Yes — paid on verified closed jobs", angi: "No", thumb: "No" },
                    { feature: "AI-powered detection", prolnk: "65+ detection categories (and growing)", angi: "None", thumb: "None" },
                    { feature: "Homeowner trust signal", prolnk: "TrustyPro Badge", angi: "Generic rating", thumb: "Generic rating" },
                    { feature: "Photo-based referrals", prolnk: "Core model", angi: "Not available", thumb: "Not available" },
                    { feature: "Money-back guarantee", prolnk: "30-day satisfaction guarantee", angi: "No", thumb: "No" },
                  ].map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-3.5 font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-3.5 text-center">
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                          <CheckCircle className="w-4 h-4" />{row.prolnk}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center text-gray-400">{row.angi}</td>
                      <td className="px-6 py-3.5 text-center text-gray-400">{row.thumb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* — 6. Social Proof & Guarantee — */}
      <section id="guarantee" className="py-24" style={{ backgroundColor: "#FAFAF9" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

            {/* Testimonials */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">What Partners Say</h2>
              <div className="space-y-5">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-dashed border-gray-200 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F5E642]/10 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-[#0A1628]" />
                  </div>
                  <h4 className="font-heading font-bold text-gray-900 mb-2">Be the First to Share Your Story</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    ProLnk is in its founding partner phase — launching in DFW. Real partner results will appear here as the network grows. We don't fabricate social proof.
                  </p>
                  <Link href="/apply">
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-none transition-all hover:opacity-90" style={{ backgroundColor: "#0A1628" }}>
                      Join as a Founding Partner <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
                <div className="bg-[#FAFAF9] rounded-2xl p-6 border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">What to expect</p>
                  <div className="space-y-2.5">
                    {[
                      "Commissions tracked in real time in your dashboard",
                      "Payouts processed monthly — no chasing required",
                      "Every lead tied to a specific photo you uploaded",
                      "Transparent conversion data: photo → lead → close",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#0A1628] shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee + Founding Partner */}
            <div className="space-y-6">
              <div className="bg-[#1a2d4a] rounded-2xl p-8 text-white">
                <div className="text-4xl mb-4"></div>
                <h3 className="text-2xl font-heading font-bold mb-3">30-Day Guarantee</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  If you don't receive at least <strong className="text-white">3 qualified inbound leads</strong> in your first 30 days, we'll refund your first month. No questions asked.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "No contracts — cancel anytime",
                    "Refund issued within 5 business days",
                    "Applies to first-time partners only",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-[#F5E642] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/apply">
                  <button className="w-full py-3 text-sm font-bold bg-[#F5E642] text-[#0A1628] hover:opacity-90 transition-all rounded-none">
                    Claim Your Spot 
                  </button>
                </Link>
              </div>

              {/* Founding Partner Spot Counter */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-[#F5E642]" />
                  <div>
                    <h4 className="font-heading font-bold text-gray-900">Founding Partner Spots</h4>
                    <p className="text-xs text-gray-500">Lock in your current rate forever</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Spots remaining</span>
                  <span className="text-xl font-heading font-bold text-[#0A1628]">{spotsRemaining} <span className="text-sm font-normal text-gray-400">of 100</span></span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mb-3">
                  <div className="h-2 rounded-full transition-all duration-700 bg-[#0A1628]" style={{ width: `${spotsPercent}%` }} />
                </div>
                <ul className="space-y-1.5">
                  {[
                    "Locked-in pricing forever",
                    "Founding Partner badge on your profile",
                    "Priority access to new platform features and markets",
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

      {/* — 6. Final CTA — */}
      <section className="py-24" style={{ backgroundColor: "#0d1e38" }}>
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
            <Link href="/apply">
              <button
                className="inline-flex items-center gap-3 px-10 py-5 text-base font-bold tracking-wide transition-all hover:opacity-90"
                style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
              >
                Apply Now — It's Free <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* — Footer — */}
      <footer className="bg-gray-800 text-gray-400 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <ProLnkLogo height={28} variant="dark" className="shrink-0" />
            <div className="flex flex-wrap gap-5 text-sm">
              <Link href="/apply" className="hover:text-white transition-colors">Apply</Link>
              <Link href="/partners" className="hover:text-white transition-colors">Directory</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Partner Login</Link>
              <Link href="/trustypro" className="hover:text-white transition-colors">TrustyPro</Link>
              <Link href="/advertise" className="hover:text-white transition-colors">Advertise</Link>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <a href="#faq" className="hover:text-white transition-colors">Resources</a>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-2 mb-1 md:mb-0">
                <Link href="/dashboard">
                  <button className="px-3 py-1 rounded text-xs font-medium border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                    Partner Login
                  </button>
                </Link>
                <Link href="/admin">
                  <button className="px-3 py-1 rounded text-xs font-medium border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                    Admin Portal
                  </button>
                </Link>
              </div>
              <p>&copy; {new Date().getFullYear()} ProLnk. DFW, Texas. All rights reserved.</p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/ccpa" className="hover:text-white transition-colors">CCPA Rights</Link>
                <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                <a href="https://instagram.com/prolnk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href="https://facebook.com/prolnk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                <a href="https://linkedin.com/company/prolnk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
