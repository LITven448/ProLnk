/**
 * Trusted Professional Algorithm Visualizer
 * 
 * Shows the full scoring model used to rank and validate service professionals
 * on the ProLnk / TrustyPro platform. Two-layer system:
 * 
 * Layer 1: Verification Trust Score (0-100) — "Are you who you say you are?"
 * Layer 2: Partner Priority Score (0-105)   — "How well do you perform?"
 * 
 * Combined = Trusted Professional Rating (TPR)
 */

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import {
  Shield, Star, Camera, Zap, Users, TrendingUp, Award,
  CheckCircle, Clock, BarChart3, Info, ChevronDown, ChevronUp,
  Lock, FileText, User, Building2, Phone, Briefcase, Image,
  AlertTriangle, Crown
} from "lucide-react";

// --- Score Data ---------------------------------------------------------------

const VERIFICATION_CHECKPOINTS = [
  {
    key: "licenseVerified",
    label: "Business License",
    weight: 20,
    icon: FileText,
    color: "#3B82F6",
    bg: "#EFF6FF",
    description: "Valid state contractor license or trade license on file and verified",
    why: "Unlicensed contractors expose homeowners to liability. This is the single highest-weight signal.",
    howVerified: "Admin manually reviews uploaded license document and cross-references state licensing board",
  },
  {
    key: "insuranceVerified",
    label: "Liability Insurance",
    weight: 20,
    icon: Shield,
    color: "#10B981",
    bg: "#ECFDF5",
    description: "Active general liability insurance policy with minimum $1M coverage",
    why: "Protects homeowners from property damage and injury claims. Equal weight to license.",
    howVerified: "Certificate of Insurance (COI) reviewed and expiration date tracked",
  },
  {
    key: "backgroundCheckVerified",
    label: "Background Check",
    weight: 18,
    icon: User,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    description: "Clean criminal background check on business owner and key personnel",
    why: "Homeowners invite these professionals into their homes. Safety is non-negotiable.",
    howVerified: "Third-party background check service (Checkr or equivalent) run on owner",
  },
  {
    key: "businessRegistrationVerified",
    label: "Business Registration",
    weight: 14,
    icon: Building2,
    color: "#F59E0B",
    bg: "#FFFBEB",
    description: "Active LLC, Corp, or DBA registration with state Secretary of State",
    why: "Ensures the business is a legitimate legal entity, not a fly-by-night operation.",
    howVerified: "Secretary of State lookup or uploaded registration document",
  },
  {
    key: "referencesVerified",
    label: "References (3 minimum)",
    weight: 12,
    icon: Phone,
    color: "#06B6D4",
    bg: "#ECFEFF",
    description: "At least 3 verifiable customer references contacted and confirmed",
    why: "Real customers validate real work. References are the oldest form of trust signal.",
    howVerified: "Admin calls or emails references; notes recorded in system",
  },
  {
    key: "portfolioVerified",
    label: "Portfolio / Work Samples",
    weight: 8,
    icon: Image,
    color: "#EC4899",
    bg: "#FDF2F8",
    description: "Minimum 5 before/after job photos uploaded and reviewed",
    why: "Visual proof of quality. Also feeds the AI photo analysis training dataset.",
    howVerified: "Admin reviews uploaded photos for quality and relevance",
  },
  {
    key: "identityVerified",
    label: "Identity Verification",
    weight: 8,
    icon: Lock,
    color: "#6B7280",
    bg: "#F9FAFB",
    description: "Government-issued ID verified for business owner",
    why: "Final identity anchor. Prevents impersonation and fake business profiles.",
    howVerified: "ID document uploaded and reviewed; name matches business registration",
  },
];

const BADGE_LEVELS = [
  { level: "none",     label: "Unverified",   checkpoints: "0",    color: "#9CA3AF", bg: "#F9FAFB",  desc: "Application submitted, no checkpoints completed" },
  { level: "bronze",   label: "Bronze",       checkpoints: "1-2",  color: "#92400E", bg: "#FEF3C7",  desc: "Basic identity confirmed. Proceed with caution." },
  { level: "silver",   label: "Silver",       checkpoints: "3-4",  color: "#6B7280", bg: "#F3F4F6",  desc: "Licensed and insured. Solid foundation." },
  { level: "gold",     label: "Gold",         checkpoints: "5-6",  color: "#D97706", bg: "#FFFBEB",  desc: "Fully vetted professional. Recommended for most projects." },
  { level: "platinum", label: "Platinum",     checkpoints: "7/7",  color: "#7C3AED", bg: "#F5F3FF",  desc: "All 7 checkpoints passed. Highest trust tier on the platform." },
];

const PPS_SIGNALS = [
  {
    key: "tier",
    label: "Platform Tier",
    maxPts: 30,
    icon: Crown,
    color: "#7C3AED",
    bg: "#F5F3FF",
    description: "Enterprise=30, Company=24, Crew=18, Pro=12, Scout=6",
    why: "Higher-tier partners have made a greater financial and operational commitment to the platform. Skin in the game = higher routing priority.",
    formula: "Tier level → fixed point value",
  },
  {
    key: "closeRate",
    label: "Lead Close Rate",
    maxPts: 20,
    icon: TrendingUp,
    color: "#10B981",
    bg: "#ECFDF5",
    description: "Closed leads ÷ Accepted leads × 20 pts",
    why: "The most important performance signal. A partner who closes leads is generating real revenue for the network and real value for homeowners.",
    formula: "(closed / accepted) × 20",
  },
  {
    key: "acceptanceRate",
    label: "Lead Acceptance Rate",
    maxPts: 15,
    icon: CheckCircle,
    color: "#3B82F6",
    bg: "#EFF6FF",
    description: "Accepted leads ÷ Total leads sent × 15 pts",
    why: "Partners who cherry-pick leads slow the network. High acceptance rate = reliable, responsive partner.",
    formula: "(accepted / sent) × 15",
  },
  {
    key: "photoScore",
    label: "Job Photos Uploaded",
    maxPts: 15,
    icon: Camera,
    color: "#F59E0B",
    bg: "#FFFBEB",
    description: "min(photos / 50, 1) × 15 pts. Full score at 50+ photos.",
    why: "Photos feed the AI analysis engine. Partners who document their work generate data that improves the entire platform.",
    formula: "min(photosUploaded / 50, 1) × 15",
  },
  {
    key: "reviewScore",
    label: "Customer Review Score",
    maxPts: 10,
    icon: Star,
    color: "#EF4444",
    bg: "#FEF2F2",
    description: "(avgRating / 5) × min(reviewCount / 10, 1) × 10 pts",
    why: "Weighted by review volume — 1 review doesn't count the same as 50. Prevents gaming with a single 5-star review.",
    formula: "(avgRating / 5) × min(reviews / 10, 1) × 10",
  },
  {
    key: "networkReferrals",
    label: "Network Referrals",
    maxPts: 5,
    icon: Users,
    color: "#06B6D4",
    bg: "#ECFEFF",
    description: "min(partnersReferred / 5, 1) × 5 pts. Full score at 5+ referrals.",
    why: "Partners who grow the network are rewarded. Referral behavior predicts long-term loyalty and engagement.",
    formula: "min(partnersReferred / 5, 1) × 5",
  },
  {
    key: "responseSpeed",
    label: "Lead Response Speed",
    maxPts: 5,
    icon: Clock,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    description: "<2h=5pts, <6h=4pts, <12h=3pts, <24h=1pt, 24h+=0pts",
    why: "Homeowners expect fast responses. Speed is a proxy for professionalism and hunger.",
    formula: "Tiered: <2h=5, <6h=4, <12h=3, <24h=1, else=0",
  },
  {
    key: "foundingBonus",
    label: "Founding Partner Bonus",
    maxPts: 5,
    icon: Award,
    color: "#D97706",
    bg: "#FFFBEB",
    description: "Flat +5 pts for Founding Partners (first 50 approved partners)",
    why: "Rewards early adopters who took a chance on the platform before it was proven.",
    formula: "isFoundingPartner ? +5 : 0",
  },
];

// --- Simulator ----------------------------------------------------------------

function ScoreSimulator() {
  const [tier, setTier] = useState("pro");
  const [closeRate, setCloseRate] = useState(60);
  const [acceptanceRate, setAcceptanceRate] = useState(75);
  const [photos, setPhotos] = useState(20);
  const [avgRating, setAvgRating] = useState(4.5);
  const [reviewCount, setReviewCount] = useState(8);
  const [referrals, setReferrals] = useState(2);
  const [responseHours, setResponseHours] = useState(4);
  const [isFoundingPartner, setIsFoundingPartner] = useState(false);

  const tierPts: Record<string, number> = { enterprise: 30, company: 24, crew: 18, pro: 12, scout: 6 };
  const closePts = Math.round((closeRate / 100) * 20 * 10) / 10;
  const acceptPts = Math.round((acceptanceRate / 100) * 15 * 10) / 10;
  const photoPts = Math.round(Math.min(photos / 50, 1) * 15 * 10) / 10;
  const reviewWeight = Math.min(reviewCount / 10, 1);
  const reviewPts = Math.round((avgRating / 5) * reviewWeight * 10 * 10) / 10;
  const referralPts = Math.round(Math.min(referrals / 5, 1) * 5 * 10) / 10;
  const speedPts = responseHours < 2 ? 5 : responseHours < 6 ? 4 : responseHours < 12 ? 3 : responseHours < 24 ? 1 : 0;
  const foundingPts = isFoundingPartner ? 5 : 0;
  const total = (tierPts[tier] ?? 12) + closePts + acceptPts + photoPts + reviewPts + referralPts + speedPts + foundingPts;

  const signals = [
    { label: "Tier", pts: tierPts[tier] ?? 12, max: 30 },
    { label: "Close Rate", pts: closePts, max: 20 },
    { label: "Acceptance Rate", pts: acceptPts, max: 15 },
    { label: "Photos", pts: photoPts, max: 15 },
    { label: "Reviews", pts: reviewPts, max: 10 },
    { label: "Referrals", pts: referralPts, max: 5 },
    { label: "Response Speed", pts: speedPts, max: 5 },
    { label: "Founding Bonus", pts: foundingPts, max: 5 },
  ];

  const ppsColor = total >= 80 ? "#059669" : total >= 55 ? "#D97706" : "#DC2626";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900">PPS Score Simulator</h3>
          <p className="text-sm text-gray-500">Adjust inputs to see how the score changes in real time</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black" style={{ color: ppsColor }}>{total.toFixed(1)}</div>
          <div className="text-xs text-gray-400">out of 105</div>
        </div>
      </div>

      {/* Score bars */}
      <div className="space-y-2">
        {signals.map(s => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="w-28 text-xs text-gray-500 text-right shrink-0">{s.label}</div>
            <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${(s.pts / s.max) * 100}%`, backgroundColor: ppsColor }}
              />
            </div>
            <div className="w-16 text-xs font-semibold text-gray-700 shrink-0">{s.pts}/{s.max}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Tier</label>
          <select value={tier} onChange={e => setTier(e.target.value)} className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-sm">
            {["scout", "pro", "crew", "company", "enterprise"].map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Close Rate: {closeRate}%</label>
          <input type="range" min={0} max={100} value={closeRate} onChange={e => setCloseRate(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Acceptance Rate: {acceptanceRate}%</label>
          <input type="range" min={0} max={100} value={acceptanceRate} onChange={e => setAcceptanceRate(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Photos Uploaded: {photos}</label>
          <input type="range" min={0} max={100} value={photos} onChange={e => setPhotos(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Avg Rating: {avgRating}</label>
          <input type="range" min={1} max={5} step={0.1} value={avgRating} onChange={e => setAvgRating(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Review Count: {reviewCount}</label>
          <input type="range" min={0} max={50} value={reviewCount} onChange={e => setReviewCount(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Referrals: {referrals}</label>
          <input type="range" min={0} max={10} value={referrals} onChange={e => setReferrals(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Avg Response: {responseHours}h</label>
          <input type="range" min={0.5} max={48} step={0.5} value={responseHours} onChange={e => setResponseHours(Number(e.target.value))} className="w-full" />
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <input type="checkbox" id="founding" checked={isFoundingPartner} onChange={e => setIsFoundingPartner(e.target.checked)} className="w-4 h-4" />
          <label htmlFor="founding" className="text-xs font-semibold text-gray-600">Founding Partner (+5 pts)</label>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ----------------------------------------------------------------

export default function TrustedProAlgorithm() {
  const [expandedVerification, setExpandedVerification] = useState<string | null>(null);
  const [expandedPps, setExpandedPps] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "verification" | "pps" | "simulator">("overview");

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h1 className="text-2xl font-black text-gray-900">Trusted Professional Algorithm</h1>
          </div>
          <p className="text-gray-500 text-sm">
            The complete scoring model that determines which service professionals are displayed, ranked, and routed leads on the ProLnk / TrustyPro platform.
          </p>
        </div>

        {/* Two-Layer Architecture Overview */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            Two-Layer Scoring Architecture
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-indigo-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">Layer 1</div>
                  <div className="font-bold text-gray-900 text-sm">Verification Trust Score</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">Answers: <em>"Are you who you say you are?"</em></p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Range</span>
                <span className="font-bold text-gray-900">0 – 100 pts</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">Checkpoints</span>
                <span className="font-bold text-gray-900">7 signals</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">Badge System</span>
                <span className="font-bold text-gray-900">None → Platinum</span>
              </div>
              <div className="mt-3 text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
                Gates platform access. A partner must reach Silver (3+ checkpoints) before being shown to homeowners.
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-purple-600 uppercase tracking-wide">Layer 2</div>
                  <div className="font-bold text-gray-900 text-sm">Partner Priority Score (PPS)</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">Answers: <em>"How well do you perform?"</em></p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Range</span>
                <span className="font-bold text-gray-900">0 – 105 pts</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">Signals</span>
                <span className="font-bold text-gray-900">8 signals</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">Updates</span>
                <span className="font-bold text-gray-900">Real-time</span>
              </div>
              <div className="mt-3 text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
                Determines lead routing order. Higher PPS = first look at new homeowner leads.
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-700 mb-2">Combined: Trusted Professional Rating (TPR)</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-blue-100 rounded-lg p-2 text-center">
                <div className="text-xs text-blue-600 font-semibold">Trust Score</div>
                <div className="text-lg font-black text-blue-700">0-100</div>
              </div>
              <div className="text-gray-400 font-bold">+</div>
              <div className="flex-1 bg-purple-100 rounded-lg p-2 text-center">
                <div className="text-xs text-purple-600 font-semibold">PPS</div>
                <div className="text-lg font-black text-purple-700">0-105</div>
              </div>
              <div className="text-gray-400 font-bold">=</div>
              <div className="flex-1 bg-indigo-100 rounded-lg p-2 text-center">
                <div className="text-xs text-indigo-600 font-semibold">TPR</div>
                <div className="text-lg font-black text-indigo-700">0-205</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {[
            { key: "verification", label: "Verification Checkpoints", icon: Shield },
            { key: "pps", label: "Priority Score Signals", icon: TrendingUp },
            { key: "simulator", label: "Score Simulator", icon: BarChart3 },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab: Verification Checkpoints */}
        {activeTab === "verification" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900">7 Verification Checkpoints</h2>
              <div className="text-sm text-gray-500">Total: 100 pts</div>
            </div>

            {/* Badge levels */}
            <div className="grid grid-cols-5 gap-2">
              {BADGE_LEVELS.map(b => (
                <div key={b.level} className="rounded-xl p-3 text-center border" style={{ backgroundColor: b.bg, borderColor: b.color + "40" }}>
                  <div className="text-xs font-bold mb-0.5" style={{ color: b.color }}>{b.label}</div>
                  <div className="text-xs text-gray-500">{b.checkpoints} ✓</div>
                </div>
              ))}
            </div>

            {/* Checkpoint list */}
            <div className="space-y-2">
              {VERIFICATION_CHECKPOINTS.map(cp => (
                <div key={cp.key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedVerification(expandedVerification === cp.key ? null : cp.key)}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: cp.bg }}>
                      <cp.icon className="w-4 h-4" style={{ color: cp.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm">{cp.label}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: cp.bg, color: cp.color }}>
                          {cp.weight} pts
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{cp.description}</p>
                    </div>
                    <div className="shrink-0">
                      {expandedVerification === cp.key ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </button>
                  {expandedVerification === cp.key && (
                    <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                      <div className="grid md:grid-cols-2 gap-3 mt-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                            <Info className="w-3.5 h-3.5" /> Why this matters
                          </p>
                          <p className="text-xs text-gray-600">{cp.why}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> How it's verified
                          </p>
                          <p className="text-xs text-gray-600">{cp.howVerified}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: PPS Signals */}
        {activeTab === "pps" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900">8 Priority Score Signals</h2>
              <div className="text-sm text-gray-500">Max: 105 pts (100 base + 5 founding bonus)</div>
            </div>

            {/* Visual weight breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-semibold text-gray-600 mb-3">Signal Weight Distribution</p>
              <div className="space-y-2">
                {PPS_SIGNALS.map(s => (
                  <div key={s.key} className="flex items-center gap-3">
                    <div className="w-36 text-xs text-gray-500 text-right shrink-0">{s.label}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(s.maxPts / 30) * 100}%`, backgroundColor: s.color }}
                      />
                    </div>
                    <div className="w-12 text-xs font-bold text-gray-700 shrink-0">{s.maxPts} pts</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal detail cards */}
            <div className="space-y-2">
              {PPS_SIGNALS.map(s => (
                <div key={s.key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedPps(expandedPps === s.key ? null : s.key)}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: s.bg }}>
                      <s.icon className="w-4 h-4" style={{ color: s.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm">{s.label}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: s.bg, color: s.color }}>
                          max {s.maxPts} pts
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{s.description}</p>
                    </div>
                    <div className="shrink-0">
                      {expandedPps === s.key ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </button>
                  {expandedPps === s.key && (
                    <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                      <div className="grid md:grid-cols-2 gap-3 mt-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                            <Info className="w-3.5 h-3.5" /> Why this signal
                          </p>
                          <p className="text-xs text-gray-600">{s.why}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" /> Formula
                          </p>
                          <code className="text-xs text-gray-700 font-mono">{s.formula}</code>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Simulator */}
        {activeTab === "simulator" && <ScoreSimulator />}

        {/* Anti-Gaming Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Anti-Gaming Design</p>
            <p className="text-xs text-amber-700 mt-1">
              The PPS is designed to be hard to game. Close rate requires real closed jobs (not just accepted leads). Review score is weighted by volume — you can't boost it with one review. Response speed requires consistent behavior, not a single fast response. The circumvention detection system flags partners who attempt to route jobs outside the platform.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
