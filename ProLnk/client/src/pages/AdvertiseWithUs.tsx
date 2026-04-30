import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";
import {
  CheckCircle, Shield, Users, TrendingUp,
  Building2, Home, DollarSign, MapPin,
  Star, Award, Lock, ChevronRight, ArrowRight,
  BarChart3, Eye, MousePointerClick, Zap,
  BadgeCheck, Calculator, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProLnkLogo } from "@/components/ProLnkLogo";
import SupportChatWidget from "@/components/SupportChatWidget";

// ─── Revised Tier Definitions ────────────────────────────────────────────────
const TIERS = [
  {
    id: "spotlight",
    name: "Connect",
    price: 199,
    zipCount: "Up to 3 zip codes",
    exclusivity: "Non-exclusive",
    exclusivityNote: "Up to 3 partners per category per zip",
    placements: ["Homeowner Dashboard"],
    color: "#6366F1",
    bg: "#EEF2FF",
    textColor: "text-indigo-600",
    borderColor: "border-indigo-200",
    features: [
      "Professional profile card on homeowner dashboard",
      "Up to 3 zip codes",
      "Click & impression analytics",
      "Monthly performance report",
      "Cancel anytime",
    ],
    cta: "Get Started",
    badge: null,
    popular: false,
  },
  {
    id: "featured",
    name: "Preferred",
    price: 349,
    zipCount: "Up to 8 zip codes",
    exclusivity: "Semi-exclusive",
    exclusivityNote: "Max 2 partners per category per zip",
    placements: ["Homeowner Dashboard", "Scan Results"],
    color: "#00B5B8",
    bg: "#E6FAFA",
    textColor: "text-teal-600",
    borderColor: "border-teal-200",
    features: [
      "Profile card on dashboard + scan results",
      "Up to 8 zip codes",
      "Priority placement rotation",
      "Click & impression analytics",
      "Bi-weekly performance report",
      "Territory exclusivity option",
      "Cancel anytime",
    ],
    cta: "Become Preferred",
    badge: "Most Popular",
    popular: true,
  },
  {
    id: "exclusive",
    name: "Exclusive",
    price: 799,
    zipCount: "Up to 15 zip codes",
    exclusivity: "Fully exclusive",
    exclusivityNote: "Only 1 partner per category per zip",
    placements: ["Homeowner Dashboard", "Scan Results", "Email Campaigns", "New Homeowner Welcome"],
    color: "#7C3AED",
    bg: "#F5F3FF",
    textColor: "text-violet-600",
    borderColor: "border-violet-200",
    features: [
      "All Preferred benefits",
      "Up to 15 zip codes — fully exclusive",
      "No competitor in your category in your zips",
      "Inclusion in homeowner email campaigns",
      "New homeowner welcome placement",
      "Dedicated account manager",
      "Quarterly strategy review",
      "Cancel anytime",
    ],
    cta: "Lock Your Territory",
    badge: "Best Value",
    popular: false,
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { group: "Real Estate & Finance", items: ["Real Estate Agent / Team", "Mortgage Broker / Lender", "Title Company", "Real Estate Attorney"] },
  { group: "Home Protection", items: ["Home Warranty Company", "Homeowners Insurance Agent", "Home Inspector"] },
  { group: "Design & Lifestyle", items: ["Interior Designer / Stager", "Moving Company", "Storage Company"] },
  { group: "Other", items: ["Other"] },
];

const FLAT_CATEGORIES = CATEGORIES.flatMap(g => g.items);

// ─── ROI Calculator Data ──────────────────────────────────────────────────────
const ROI_PRESETS: Record<string, { avgRevenue: number; label: string }> = {
  "Real Estate Agent / Team": { avgRevenue: 9500, label: "avg. commission per sale" },
  "Mortgage Broker / Lender": { avgRevenue: 4200, label: "avg. commission per loan" },
  "Title Company": { avgRevenue: 1800, label: "avg. closing fee per transaction" },
  "Home Warranty Company": { avgRevenue: 600, label: "avg. contract value" },
  "Homeowners Insurance Agent": { avgRevenue: 1100, label: "avg. first-year premium" },
  "Home Inspector": { avgRevenue: 450, label: "avg. inspection fee" },
};

// ─── Testimonial-style social proof ──────────────────────────────────────────
const PROOF_POINTS = [
  { icon: Home, value: "2,400+", label: "Homeowners on Platform" },
  { icon: Users, value: "150+", label: "Active Service Professionals" },
  { icon: TrendingUp, value: "94%", label: "Homeowner Engagement Rate" },
  { icon: DollarSign, value: "$485K+", label: "Home Projects Facilitated" },
];

// ─── How It Works Steps ───────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Apply & Get Approved",
    desc: "Submit your application. We review within 1–2 business days to ensure category fit and territory availability.",
    icon: BadgeCheck,
  },
  {
    step: "02",
    title: "Build Your Profile Card",
    desc: "Upload your logo, write a short introduction, and set your call-to-action. No design skills needed — we provide the template.",
    icon: Star,
  },
  {
    step: "03",
    title: "Appear in Front of Homeowners",
    desc: "Your profile card appears contextually — at the exact moment homeowners are thinking about your service category.",
    icon: Eye,
  },
  {
    step: "04",
    title: "Track Your Performance",
    desc: "See impressions, clicks, and engagement in your partner dashboard. Know exactly what your investment is delivering.",
    icon: BarChart3,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdvertiseWithUs() {
  const [selectedTier, setSelectedTier] = useState<"spotlight" | "featured" | "exclusive">("featured");
  const [step, setStep] = useState<"landing" | "form" | "success">("landing");
  const [roiCategory, setRoiCategory] = useState("Real Estate Agent / Team");
  const [roiConversions, setRoiConversions] = useState(1);
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    category: "",
    website: "",
    zipCodesRaw: "",
    message: "",
  });

  const submit = trpc.featuredAdvertisers.submitApplication.useMutation({
    onSuccess: () => setStep("success"),
    onError: (e) => toast.error(e.message || "Something went wrong. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const zipCodes = form.zipCodesRaw.split(",").map(z => z.trim()).filter(Boolean);
    if (zipCodes.length === 0) { toast.error("Please enter at least one zip code."); return; }
    if (!form.category) { toast.error("Please select a business category."); return; }
    submit.mutate({
      businessName: form.businessName,
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone || undefined,
      category: form.category,
      website: form.website || undefined,
      zipCodes,
      selectedTier,
      message: form.message || undefined,
    });
  };

  const selectedTierData = TIERS.find(t => t.id === selectedTier) ?? TIERS[1];

  // ROI calculation
  const roiPreset = ROI_PRESETS[roiCategory] ?? { avgRevenue: 5000, label: "avg. revenue per client" };
  const tierPrice = selectedTierData.price;
  const roiRevenue = roiConversions * roiPreset.avgRevenue;
  const roiReturn = roiRevenue - tierPrice;
  const roiMultiple = tierPrice > 0 ? (roiRevenue / tierPrice).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-white">
      {/* ── Nav ── */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <ProLnkLogo height={28} />
              <span className="font-bold text-gray-900 text-lg">ProLnk</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">← Back to Home</span>
            </Link>
            <Button
              size="sm"
              className="bg-[#00B5B8] hover:bg-[#009a9d] text-white rounded-xl px-5"
              onClick={() => setStep("form")}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Success State ── */}
      {step === "success" ? (
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Application Received</h1>
          <p className="text-gray-500 mb-2 text-base leading-relaxed">
            Thank you for applying to become a ProLnk Preferred Partner. Our team will review your application and reach out within 1–2 business days to discuss territory availability and next steps.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Selected plan: <span className="font-semibold text-gray-700 capitalize">{selectedTierData.name}</span> — ${selectedTierData.price}/mo
          </p>
          <Link href="/">
            <Button className="bg-[#00B5B8] hover:bg-[#009a9d] text-white rounded-xl px-8">
              Return to Home
            </Button>
          </Link>
        </div>

      ) : step === "form" ? (
        /* ── Application Form ── */
        <div className="max-w-2xl mx-auto px-4 py-12">
          <button
            onClick={() => setStep("landing")}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-8 transition-colors"
          >
            ← Back to plans
          </button>

          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ backgroundColor: selectedTierData.bg, color: selectedTierData.color }}
            >
              <Award className="w-3.5 h-3.5" />
              {selectedTierData.name} Plan — ${selectedTierData.price}/mo
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Tell us about your business</h1>
            <p className="text-gray-500 mt-1 text-sm">
              We review every application to ensure category fit and territory availability. You'll hear from us within 1–2 business days.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Plan selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Selected Plan</label>
              <div className="grid grid-cols-3 gap-2">
                {TIERS.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTier(t.id as "spotlight" | "featured" | "exclusive")}
                    className="p-3 rounded-xl border-2 text-left transition-all"
                    style={
                      selectedTier === t.id
                        ? { borderColor: t.color, backgroundColor: t.bg }
                        : { borderColor: "#E5E7EB", backgroundColor: "#FAFAFA" }
                    }
                  >
                    <div className="text-xs font-bold" style={{ color: selectedTier === t.id ? t.color : "#6B7280" }}>
                      {t.name}
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      ${t.price}<span className="text-xs font-normal text-gray-400">/mo</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Name *</label>
                <input
                  required
                  value={form.businessName}
                  onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]/30 focus:border-[#00B5B8]"
                  placeholder="Your business name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                <input
                  required
                  value={form.contactName}
                  onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]/30 focus:border-[#00B5B8]"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                <input
                  required
                  type="email"
                  value={form.contactEmail}
                  onChange={e => setForm(f => ({ ...f, contactEmail: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]/30 focus:border-[#00B5B8]"
                  placeholder="you@yourbusiness.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                <input
                  value={form.contactPhone}
                  onChange={e => setForm(f => ({ ...f, contactPhone: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]/30 focus:border-[#00B5B8]"
                  placeholder="(555) 000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Category *</label>
                <select
                  required
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]/30 focus:border-[#00B5B8] bg-white"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map(g => (
                    <optgroup key={g.group} label={g.group}>
                      {g.items.map(c => <option key={c} value={c}>{c}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website</label>
                <input
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]/30 focus:border-[#00B5B8]"
                  placeholder="https://yourbusiness.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Target Zip Codes *</label>
              <input
                required
                value={form.zipCodesRaw}
                onChange={e => setForm(f => ({ ...f, zipCodesRaw: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]/30 focus:border-[#00B5B8]"
                placeholder="75201, 75202, 75203 (comma-separated)"
              />
              <p className="text-xs text-gray-400 mt-1">
                {selectedTierData.zipCount}. We'll confirm availability during review.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Anything else we should know?</label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]/30 focus:border-[#00B5B8] resize-none"
                placeholder="Tell us about your business, your target homeowner, or any questions you have..."
              />
            </div>

            <Button
              type="submit"
              disabled={submit.isPending}
              className="w-full bg-[#00B5B8] hover:bg-[#009a9d] text-white rounded-xl py-3 font-semibold text-base"
            >
              {submit.isPending ? "Submitting..." : "Submit Application"}
            </Button>

            <p className="text-xs text-center text-gray-400">
              No payment required to apply. Billing begins only after your application is approved and territory confirmed.
            </p>
          </form>
        </div>

      ) : (
        /* ── Landing Page ── */
        <div>

          {/* ── Hero ── */}
          <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
            <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/80 mb-6">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#00B5B8]" />
                  ProLnk Preferred Partner Program
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                  Be the professional<br />
                  <span className="text-[#00B5B8]">homeowners trust first.</span>
                </h1>
                <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
                  ProLnk connects verified service professionals with homeowners at the exact moment they need help. As a Preferred Partner, your profile appears contextually — not as a banner, but as a trusted recommendation — in front of homeowners in your target zip codes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-[#00B5B8] hover:bg-[#009a9d] text-white rounded-xl px-8 font-semibold"
                    onClick={() => setStep("form")}
                  >
                    Apply to Become a Partner <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <a href="#plans">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl px-8 border-white/20 text-white hover:bg-white/10 font-semibold"
                    >
                      View Plans
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── Social Proof Stats ── */}
          <section className="border-b border-gray-100 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {PROOF_POINTS.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <Icon className="w-5 h-5 text-[#00B5B8]" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{value}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── What It Looks Like (Profile Card Preview) ── */}
          <section className="max-w-6xl mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-xs font-bold text-[#00B5B8] uppercase tracking-wider mb-3">The Experience</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  A trusted introduction,<br />not a banner ad.
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Your profile appears as a professional card — with your name, photo, specialty, and a single call-to-action — in the context where homeowners are already thinking about your service. One partner per category per zip code. No competition for attention.
                </p>
                <ul className="space-y-3">
                  {[
                    "Real estate agents appear when homeowners view their home value",
                    "Mortgage brokers appear in the home equity summary section",
                    "Title companies appear alongside recent neighborhood sales",
                    "Insurance agents appear in the home protection overview",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#00B5B8] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Profile Card Mockup */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Trusted Professionals in Your Area
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B5B8] to-[#6366F1] flex items-center justify-center text-white font-bold text-lg shrink-0">
                      SJ
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-gray-900 text-sm">Sarah Johnson</span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#00B5B8] bg-[#E6FAFA] px-2 py-0.5 rounded-full">
                          <BadgeCheck className="w-2.5 h-2.5" /> ProLnk Preferred
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">Keller Williams — 75201 Specialist</div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">4.9 (127 reviews)</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">
                        "Helping DFW families find their perfect home for 12 years. Specializing in first-time buyers and relocations."
                      </p>
                      <button className="w-full py-2 rounded-lg bg-[#00B5B8] text-white text-xs font-semibold hover:bg-[#009a9d] transition-colors">
                        Connect with Sarah
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center mt-3">
                  This is how your profile card appears to homeowners
                </p>
              </div>
            </div>
          </section>

          {/* ── Exclusivity Section ── */}
          <section className="bg-gray-950 text-white py-20">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-[#00B5B8]" />
                </div>
                <h2 className="text-3xl font-bold mb-3">One partner. One category. One zip code.</h2>
                <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
                  Unlike platforms where you compete with dozens of other professionals for the same homeowner's attention, ProLnk limits placement to a maximum of one Exclusive partner per category per zip code. When a homeowner in 75201 needs a real estate agent, they see you — not a list of competitors.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { tier: "Connect", desc: "Up to 3 partners per category per zip. Great for testing new markets.", color: "#6366F1" },
                  { tier: "Preferred", desc: "Max 2 partners per category per zip. Meaningful differentiation from competitors.", color: "#00B5B8" },
                  { tier: "Exclusive", desc: "Only 1 partner per category per zip. You own the relationship in your territory.", color: "#7C3AED" },
                ].map(({ tier, desc, color }) => (
                  <div key={tier} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="text-sm font-bold mb-2" style={{ color }}>{tier}</div>
                    <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ROI Calculator ── */}
          <section className="max-w-6xl mx-auto px-4 py-20">
            <div className="text-center mb-10">
              <div className="text-xs font-bold text-[#00B5B8] uppercase tracking-wider mb-3">Return on Investment</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">See what one new client is worth</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                ProLnk placement costs a fraction of what other platforms charge — and delivers homeowners who are already engaged and looking for help.
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5 text-[#00B5B8]" />
                <span className="font-semibold text-gray-900">ROI Calculator</span>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your business category</label>
                  <select
                    value={roiCategory}
                    onChange={e => setRoiCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00B5B8]/30 focus:border-[#00B5B8]"
                  >
                    {Object.keys(ROI_PRESETS).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New clients per month from ProLnk: <span className="text-[#00B5B8]">{roiConversions}</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={roiConversions}
                    onChange={e => setRoiConversions(Number(e.target.value))}
                    className="w-full accent-[#00B5B8]"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 client/mo</span><span>10 clients/mo</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your plan</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIERS.map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTier(t.id as "spotlight" | "featured" | "exclusive")}
                        className="p-2.5 rounded-xl border-2 text-center transition-all"
                        style={
                          selectedTier === t.id
                            ? { borderColor: t.color, backgroundColor: t.bg }
                            : { borderColor: "#E5E7EB", backgroundColor: "#FAFAFA" }
                        }
                      >
                        <div className="text-xs font-bold" style={{ color: selectedTier === t.id ? t.color : "#9CA3AF" }}>{t.name}</div>
                        <div className="text-sm font-bold text-gray-900">${t.price}<span className="text-xs font-normal text-gray-400">/mo</span></div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 mt-2">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Monthly Cost</div>
                      <div className="text-xl font-bold text-gray-900">${tierPrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Revenue Generated</div>
                      <div className="text-xl font-bold text-emerald-600">${roiRevenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Return Multiple</div>
                      <div className="text-xl font-bold text-[#00B5B8]">{roiMultiple}×</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">
                      Based on {roiConversions} new client{roiConversions > 1 ? "s" : ""}/month at {roiPreset.label} of ${roiPreset.avgRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Plans ── */}
          <section id="plans" className="bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <div className="text-xs font-bold text-[#00B5B8] uppercase tracking-wider mb-3">Preferred Partner Plans</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose your level of presence</h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                  All plans include a professional profile card, performance analytics, and the ability to cancel anytime. No long-term contracts.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {TIERS.map(tier => (
                  <div
                    key={tier.id}
                    className={`relative bg-white rounded-2xl border-2 p-7 flex flex-col transition-shadow hover:shadow-lg ${
                      tier.popular ? "border-[#00B5B8] shadow-md" : "border-gray-200"
                    }`}
                  >
                    {tier.badge && (
                      <div
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: tier.color }}
                      >
                        {tier.badge}
                      </div>
                    )}

                    <div className="mb-5">
                      <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: tier.color }}>
                        {tier.name}
                      </div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-bold text-gray-900">${tier.price}</span>
                        <span className="text-sm text-gray-400">/month</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">{tier.zipCount}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">{tier.exclusivity} — {tier.exclusivityNote}</span>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Placements</div>
                      <div className="flex flex-wrap gap-1.5">
                        {tier.placements.map(p => (
                          <span
                            key={p}
                            className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{ backgroundColor: tier.bg, color: tier.color }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-7 flex-1">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: tier.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full rounded-xl font-semibold"
                      style={
                        tier.popular
                          ? { backgroundColor: tier.color, color: "#fff" }
                          : { backgroundColor: "transparent", color: tier.color, border: `2px solid ${tier.color}` }
                      }
                      onClick={() => { setSelectedTier(tier.id as "spotlight" | "featured" | "exclusive"); setStep("form"); }}
                    >
                      {tier.cta}
                    </Button>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-gray-400 mt-6">
                No payment required to apply. Billing begins only after your application is approved and territory is confirmed.
              </p>
            </div>
          </section>

          {/* ── How It Works ── */}
          <section className="max-w-6xl mx-auto px-4 py-20">
            <div className="text-center mb-12">
              <div className="text-xs font-bold text-[#00B5B8] uppercase tracking-wider mb-3">The Process</div>
              <h2 className="text-3xl font-bold text-gray-900">From application to homeowners in 48 hours</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }) => (
                <div key={step} className="text-center">
                  <div className="relative inline-flex mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#00B5B8]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#00B5B8] text-white text-[10px] font-bold flex items-center justify-center">
                      {step.replace("0", "")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Who This Is For ── */}
          <section className="bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-10">
                <div className="text-xs font-bold text-[#00B5B8] uppercase tracking-wider mb-3">Who We Accept</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Built for professionals homeowners trust</h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                  The ProLnk Preferred Partner program is designed for professionals who serve homeowners at key moments in the home ownership journey — not general contractors or service trades, which are served through the TrustyPro partner network.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {CATEGORIES.filter(g => g.group !== "Other").map(g => (
                  <div key={g.group} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{g.group}</div>
                    <ul className="space-y-2">
                      {g.items.map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-[#00B5B8] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="bg-gradient-to-br from-[#00B5B8] to-[#6366F1] py-20">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to become the preferred professional in your market?
              </h2>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                Spots are limited by zip code and category. Once a territory is claimed, it's unavailable until the partner cancels.
              </p>
              <Button
                size="lg"
                className="bg-white text-[#00B5B8] hover:bg-gray-50 rounded-xl px-10 font-bold text-base"
                onClick={() => setStep("form")}
              >
                Apply Now — It's Free to Apply
              </Button>
              <p className="text-white/50 text-xs mt-4">
                No payment required to apply. We'll confirm territory availability before any billing begins.
              </p>
            </div>
          </section>

        </div>
      )}

      {/* Existing advertiser CTA */}
      <div className="fixed bottom-4 left-4 z-30">
        <Link href="/my-campaign">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-xs font-medium hover:bg-white/20 transition-colors">
            <BarChart3 className="w-3 h-3" />
            Already a partner? View your campaign
          </button>
        </Link>
      </div>

      <SupportChatWidget mode="advertiser" />
    </div>
  );
}
