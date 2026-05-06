import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Building2,
  Calculator,
  CheckCircle2,
  DollarSign,
  FileText,
  Home,
  Lock,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  Shield,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

// CDN images
const HERO_BG =
  "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/4kBvYpFmoTde_d24a0312.jpg";
const ABOUT_IMG =
  "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/9FJZvhvZxcme_45933d90.jpg";
const AERIAL_IMG =
  "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/NEu2wYCLPuV7_f84a4e52.jpg";
const TRADES_IMG =
  "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/wkaZGwMbBw8r_bace4d06.jpg";

const AD_FORMATS = [
  {
    icon: BarChart3,
    title: "Partner Dashboard Ads",
    desc: "Sponsored placements inside the ProLnk partner dashboard — seen by active, verified contractors every time they log in.",
  },
  {
    icon: Mail,
    title: "Email Digest Placements",
    desc: "Sponsored content in the ProLnk weekly digest — sent to verified pros and homeowners across DFW.",
  },
  {
    icon: Bell,
    title: "Event-Triggered Notifications",
    desc: "Reach pros at the moment of action — job completion, referral sent, payout received — with contextual brand messages.",
  },
  {
    icon: MapPin,
    title: "Neighborhood Targeting",
    desc: "Geo-targeted placements by ZIP code, neighborhood, or service area — reach the exact market you want to own.",
  },
  {
    icon: Shield,
    title: "Homeowner Report Sponsorships",
    desc: "Your brand featured inside property intelligence reports delivered directly to homeowners in your target market.",
  },
  {
    icon: Target,
    title: "Category Exclusivity",
    desc: "Lock out competitors. Own your category across the entire ProLnk network for a defined period.",
  },
];

const CASE_TABS = ["All Formats", "Dashboard Ads", "Email", "Notifications", "Geo-Targeted"];

const CASE_STUDIES = [
  {
    tab: "Dashboard Ads",
    badge: "Dashboard Ad",
    title: "Partner Dashboard Banner — Tool Brand",
    desc: "A national tool brand sponsors the top banner of the ProLnk partner dashboard, reaching 500+ active contractors daily during job management sessions.",
    img: TRADES_IMG,
  },
  {
    tab: "Email",
    badge: "Email Placement",
    title: "Weekly Digest Sponsorship — Home Warranty Co.",
    desc: "A home warranty company sponsors the ProLnk weekly email digest, reaching homeowners who just received a completed job report.",
    img: ABOUT_IMG,
  },
  {
    tab: "Geo-Targeted",
    badge: "Geo-Targeted",
    title: "ZIP-Level Targeting — Real Estate Team",
    desc: "A real estate team targets homeowners in specific DFW ZIP codes where new projects are completing — reaching buyers at peak intent.",
    img: AERIAL_IMG,
  },
  {
    tab: "Notifications",
    badge: "Notification Ad",
    title: "Post-Job Notification — Insurance Partner",
    desc: "An insurance partner reaches homeowners immediately after a home service job is marked complete — the highest-intent moment for coverage upgrades.",
    img: HERO_BG,
  },
];

const PRICING_TIERS = [
  {
    name: "Connect",
    price: "$199",
    period: "/mo",
    desc: "Up to 3 zip codes. Non-exclusive — up to 3 partners per category per zip.",
    featured: false,
    color: "#6366F1",
    badge: null,
    features: [
      "Professional profile card on homeowner dashboard",
      "Up to 3 zip codes",
      "Click & impression analytics",
      "Monthly performance report",
      "Cancel anytime",
    ],
    cta: "Get Started",
  },
  {
    name: "Preferred",
    price: "$349",
    period: "/mo",
    desc: "Up to 8 zip codes. Semi-exclusive — max 2 partners per category per zip.",
    featured: true,
    color: "#00B5B8",
    badge: "Most Popular",
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
  },
  {
    name: "Exclusive",
    price: "$799",
    period: "/mo",
    desc: "Up to 15 zip codes. Fully exclusive — only 1 partner per category per zip.",
    featured: false,
    color: "#7C3AED",
    badge: "Best Value",
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
  },
];

const STATS = [
  { value: "DFW", label: "Hyper-Local Market Focus" },
  { value: "8", label: "Home Service Trade Categories" },
  { value: "Early", label: "Founding Advertiser Pricing" },
  { value: "0", label: "Competitor Ads in Your Category" },
];

// ─── Advertiser Categories ───────────────────────────────────────────────────
const WHO_ITS_FOR = [
  { icon: Home, label: "Real Estate Agents & Teams" },
  { icon: DollarSign, label: "Mortgage Brokers & Lenders" },
  { icon: FileText, label: "Title Companies" },
  { icon: Shield, label: "Homeowners Insurance Agents" },
  { icon: Building2, label: "Home Warranty Companies" },
  { icon: Target, label: "Home Inspectors" },
  { icon: TrendingUp, label: "Interior Designers & Stagers" },
  { icon: Users, label: "Moving & Storage Companies" },
  { icon: FileText, label: "Real Estate Attorneys" },
];

// ─── ROI Calculator ───────────────────────────────────────────────────────────
const ROI_PRESETS: Record<string, { avgRevenue: number; label: string }> = {
  "Real Estate Agent / Team": { avgRevenue: 9500, label: "avg. commission per sale" },
  "Mortgage Broker / Lender": { avgRevenue: 4200, label: "avg. commission per loan" },
  "Title Company": { avgRevenue: 1800, label: "avg. closing fee per transaction" },
  "Home Warranty Company": { avgRevenue: 600, label: "avg. contract value" },
  "Homeowners Insurance Agent": { avgRevenue: 1100, label: "avg. first-year premium" },
  "Home Inspector": { avgRevenue: 450, label: "avg. inspection fee" },
  "Interior Designer / Stager": { avgRevenue: 3200, label: "avg. project value" },
  "Moving Company": { avgRevenue: 1400, label: "avg. move value" },
};

const AD_TIERS = [
  { id: "connect", name: "Connect", price: 199 },
  { id: "preferred", name: "Preferred", price: 349 },
  { id: "exclusive", name: "Exclusive", price: 799 },
];

export default function ProLnkMedia() {
  const [activeTab, setActiveTab] = useState("All Formats");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roiCategory, setRoiCategory] = useState("Real Estate Agent / Team");
  const [roiConversions, setRoiConversions] = useState(1);
  const [roiTier, setRoiTier] = useState<"connect" | "preferred" | "exclusive">("preferred");
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // ROI calculation
  const roiPreset = ROI_PRESETS[roiCategory] ?? { avgRevenue: 5000, label: "avg. revenue per client" };
  const roiTierData = AD_TIERS.find(t => t.id === roiTier) ?? AD_TIERS[1];
  const tierPrice = roiTierData.price;
  const roiRevenue = roiConversions * roiPreset.avgRevenue;
  const roiMultiple = tierPrice > 0 ? (roiRevenue / tierPrice).toFixed(1) : "0";

  const submitMutation = trpc.waitlist.submitAdvertiserWaitlist.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Application received! We'll be in touch within 48 hours.");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.email || !form.contactName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitMutation.mutate(form);
  };

  const filteredCases =
    activeTab === "All Formats"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.tab === activeTab);

  useEffect(() => { document.title = "Media — ProLnk"; }, []);
  return (
    <>
    <Helmet>
      <title>ProLnk Media — Advertise to Homeowners at Peak Intent | ProLnk</title>
      <meta name="description" content="Reach homeowners at the exact moment they need your services. ProLnk Media delivers geo-targeted, intent-based advertising to verified homeowners in DFW." />
    </Helmet>
    <div className="min-h-screen bg-white font-sans">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-black tracking-tight text-slate-900">
              ProLnk <span className="text-sky-500">Media</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#formats" className="hover:text-sky-500 transition-colors">Ad Formats</a>
            <a href="#audience" className="hover:text-sky-500 transition-colors">Our Audience</a>
            <a href="#case-studies" className="hover:text-sky-500 transition-colors">Case Studies</a>
            <a href="#pricing" className="hover:text-sky-500 transition-colors">Pricing</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/">
              <span className="text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">← Back to ProLnk</span>
            </Link>
            <a
              href="#apply"
              className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Advertise With Us
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {["#formats", "#audience", "#case-studies", "#pricing"].map((href, i) => (
              <a key={href} href={href} className="text-slate-700 font-medium py-2 border-b border-gray-50" onClick={() => setMobileOpen(false)}>
                {["Ad Formats", "Our Audience", "Case Studies", "Pricing"][i]}
              </a>
            ))}
            <a href="#apply" className="bg-sky-500 text-white text-center font-bold py-3 rounded-full" onClick={() => setMobileOpen(false)}>
              Advertise With Us
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-slate-900/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-500/30 text-sky-300 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
              <Zap className="w-3.5 h-3.5" />
              Now accepting founding advertisers
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white leading-none mb-6">
              Reach the Trades.{" "}
              <span className="text-sky-400">Own the</span>{" "}
              Neighborhood.
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              ProLnk Media connects your brand with verified home service professionals and homeowners across DFW — at the exact moment they're making buying decisions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors"
              >
                Join Advertiser Waitlist <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#formats"
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors"
              >
                View Ad Formats
              </a>
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-2xl w-52">
              <div className="text-3xl font-black text-slate-900">500+</div>
              <div className="text-sm text-slate-500 font-medium">Verified Trade Partners</div>
              <div className="text-xs text-sky-500 font-semibold mt-1">↑ Growing daily</div>
            </div>
            <div className="bg-sky-500 rounded-2xl p-5 shadow-2xl w-52">
              <div className="text-3xl font-black text-white">94%</div>
              <div className="text-sm text-sky-100 font-medium">Audience Engagement</div>
              <div className="text-xs text-sky-200 font-semibold mt-1">vs. 2% industry avg</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-slate-900 py-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-400 text-xs font-medium mb-5 uppercase tracking-widest">
            Ideal for brands reaching the home services market
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-slate-400 text-sm font-semibold uppercase tracking-wider">
            {WHO_ITS_FOR.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-sky-500" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AD FORMATS ── */}
      <section id="formats" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">Ad Formats</p>
            <h2 className="text-5xl font-black text-slate-900 mb-4">
              Every Touchpoint in the{" "}
              <span className="text-sky-500">Trade Ecosystem</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              ProLnk Media gives you access to every moment in a contractor's and homeowner's journey — from job creation to payment to referral.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AD_FORMATS.map((f) => (
              <div
                key={f.title}
                className="group p-8 border border-slate-100 rounded-2xl hover:border-sky-200 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-sky-50 group-hover:bg-sky-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <f.icon className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / WHY PROLNK MEDIA ── */}
      <section id="audience" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">About ProLnk Media</p>
              <h2 className="text-5xl font-black text-slate-900 mb-6">
                Not Another{" "}
                <span className="text-sky-500">Ad Network.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                ProLnk Media is the advertising arm of the ProLnk partner network — a verified community of licensed, insured home service professionals and the homeowners they serve across DFW.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Every impression is earned. Every touchpoint is contextual. Your brand reaches verified pros and homeowners at the exact moment they're making decisions about tools, materials, insurance, and services.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Zero cold audiences — every user is verified and active",
                  "Hyper-local DFW targeting by ZIP, neighborhood, or service area",
                  "Context-aware placements — not banner blindness",
                  "First-party data from real job activity, not cookies",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-sky-500 font-bold text-lg mt-0.5 flex-shrink-0">+</span>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-semibold px-6 py-3 rounded-full transition-all"
              >
                View Pricing <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative">
              <img
                src={ABOUT_IMG}
                alt="Trade professionals at work"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl">
                <div className="text-4xl font-black text-slate-900">12K+</div>
                <div className="text-sm text-slate-500 font-medium">Monthly homeowner touchpoints</div>
                <div className="text-xs text-sky-500 font-semibold mt-1">↑ Growing with every partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK STATS SECTION ── */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${AERIAL_IMG})` }}
        />
        <div className="absolute inset-0 bg-slate-900/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              The Audience You{" "}
              <span className="text-sky-400">Can't Reach</span>{" "}
              Anywhere Else
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              ProLnk's verified network is built on real job data, real referrals, and real relationships — not scraped lists or demographic guesses.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
                <div className="text-5xl font-black text-white mb-2">{s.value}</div>
                <div className="text-slate-300 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors"
            >
              Get Started Now <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── DRIVE RESULTS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src={TRADES_IMG}
                alt="ProLnk trade professionals"
                className="w-full h-[480px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute top-6 right-6 bg-sky-500 rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-black text-white">47x</div>
                <div className="text-sm text-sky-100 font-medium">Better targeting than</div>
                <div className="text-sm text-sky-100 font-medium">generic display ads</div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">Why It Works</p>
              <h2 className="text-5xl font-black text-slate-900 mb-6">
                <span className="text-sky-500">Drive Results</span>{" "}
                With Precision Advertising
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Unlike broad digital advertising, ProLnk Media placements are contextual — your brand appears when pros are actively managing jobs, reviewing payouts, or when homeowners are reading their property reports.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Verified audience — no bots, no fake accounts",
                  "Intent-based targeting — reach buyers when they're deciding",
                  "First-party job data — target by trade, ZIP, job type",
                  "Transparent reporting — see exactly what you paid for",
                  "Brand safety — every placement reviewed before going live",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-500 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-semibold px-6 py-3 rounded-full transition-all"
              >
                Get Started Now <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">Return on Investment</p>
            <h2 className="text-5xl font-black text-slate-900 mb-4">
              See what one new client is{" "}
              <span className="text-sky-500">worth to you</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              ProLnk placement costs a fraction of what other platforms charge — and delivers homeowners who are already engaged and looking for help.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-sky-500" />
              <span className="font-bold text-slate-900">ROI Calculator</span>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your business category</label>
                <select
                  value={roiCategory}
                  onChange={e => setRoiCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                >
                  {Object.keys(ROI_PRESETS).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  New clients per month from ProLnk: <span className="text-sky-500">{roiConversions}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={roiConversions}
                  onChange={e => setRoiConversions(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>1 client/mo</span><span>10 clients/mo</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your plan</label>
                <div className="grid grid-cols-3 gap-2">
                  {AD_TIERS.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setRoiTier(t.id as "connect" | "preferred" | "exclusive")}
                      className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                        roiTier === t.id
                          ? "border-sky-500 bg-sky-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className={`text-xs font-bold ${roiTier === t.id ? "text-sky-500" : "text-slate-400"}`}>{t.name}</div>
                      <div className="text-sm font-bold text-slate-900">${t.price}<span className="text-xs font-normal text-slate-400">/mo</span></div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Monthly Cost</div>
                    <div className="text-xl font-black text-slate-900">${tierPrice}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Revenue Generated</div>
                    <div className="text-xl font-black text-emerald-600">${roiRevenue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Return Multiple</div>
                    <div className="text-xl font-black text-sky-500">{roiMultiple}×</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-400">
                    Based on {roiConversions} new client{roiConversions > 1 ? "s" : ""}/month at {roiPreset.label} of ${roiPreset.avgRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXCLUSIVITY SECTION ── */}
      <section className="bg-slate-950 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-sky-400" />
            </div>
            <h2 className="text-4xl font-black mb-3">One partner. One category. One zip code.</h2>
            <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
              Unlike platforms where you compete with dozens of others for the same homeowner's attention, ProLnk limits placement to a maximum of one Exclusive partner per category per zip code.
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

      {/* ── CASE STUDIES ── */}
      <section id="case-studies" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">Ad Formats in Action</p>
              <h2 className="text-5xl font-black text-slate-900">
                See How Brands{" "}
                <span className="text-sky-500">Win the Trades</span>
              </h2>
            </div>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-semibold px-6 py-3 rounded-full transition-all whitespace-nowrap"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {CASE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeTab === tab
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredCases.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100">
                <div className="h-52 overflow-hidden">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-sky-50 text-sky-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {c.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{c.desc}</p>
                  <a href="#apply" className="inline-flex items-center gap-1 text-sky-500 font-semibold text-sm hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">Pricing</p>
              <h2 className="text-5xl font-black text-slate-900">
                Simple Plans for{" "}
                <span className="text-sky-500">Every Budget</span>
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl">
                Founding advertiser rates locked in for 12 months. Join the waitlist now to secure your spot and pricing.
              </p>
            </div>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-semibold px-6 py-3 rounded-full transition-all whitespace-nowrap"
            >
              Get Started Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  tier.featured
                    ? "bg-sky-500 text-white shadow-2xl md:-mt-4 md:mb-4"
                    : "bg-slate-50 border border-slate-100"
                }`}
              >
                {tier.badge && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                    style={{ backgroundColor: tier.color }}
                  >
                    {tier.badge}
                  </div>
                )}
                <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${tier.featured ? "text-sky-100" : "text-slate-500"}`}>
                  {tier.name}
                </div>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-black ${tier.featured ? "text-white" : "text-slate-900"}`}>
                    {tier.price}
                  </span>
                  <span className={`text-base font-medium mb-1 ${tier.featured ? "text-sky-100" : "text-slate-400"}`}>
                    {tier.period}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${tier.featured ? "text-sky-100" : "text-slate-500"}`}>
                  {tier.desc}
                </p>
                <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${tier.featured ? "text-sky-200" : "text-slate-400"}`}>
                  What You'll Get
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${tier.featured ? "text-sky-200" : "text-sky-500"}`} />
                      <span className={`text-sm ${tier.featured ? "text-sky-50" : "text-slate-700"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#apply"
                  className={`block text-center font-bold py-3 rounded-full transition-all ${
                    tier.featured
                      ? "bg-white text-sky-500 hover:bg-sky-50"
                      : "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY / WAITLIST FORM ── */}
      <section id="apply" className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sky-400 font-semibold text-sm uppercase tracking-widest mb-3">Founding Advertisers</p>
            <h2 className="text-5xl font-black text-white mb-4">
              Secure Your Spot in the{" "}
              <span className="text-sky-400">ProLnk Network</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We're accepting a limited number of founding advertisers. Lock in your rate and category before we open to the public.
            </p>
          </div>

          {submitted ? (
            <div className="bg-sky-500/20 border border-sky-500/40 rounded-3xl p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-sky-400 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-white mb-2">Application Received!</h3>
              <p className="text-slate-300">
                Our team will review your application and reach out within 48 business hours to discuss your campaign goals and available inventory.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Company Name <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="Acme Tools Co."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Contact Name <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Email Address <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@acmetools.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(214) 555-0100"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Industry / Category</label>
                  <select
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    <option value="">Select your industry</option>
                    <option value="real-estate">Real Estate Agent / Team</option>
                    <option value="mortgage">Mortgage Broker / Lender</option>
                    <option value="title">Title Company</option>
                    <option value="insurance">Homeowners Insurance Agent</option>
                    <option value="home-warranty">Home Warranty Company</option>
                    <option value="home-inspector">Home Inspector</option>
                    <option value="interior-design">Interior Designer / Stager</option>
                    <option value="moving">Moving Company</option>
                    <option value="real-estate-attorney">Real Estate Attorney</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Monthly Ad Budget</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-500">Under $500/mo</option>
                    <option value="500-1500">$500 – $1,500/mo</option>
                    <option value="1500-5000">$1,500 – $5,000/mo</option>
                    <option value="5000-plus">$5,000+/mo</option>
                    <option value="custom">Custom / Enterprise</option>
                  </select>
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Tell us about your campaign goals</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What audience are you trying to reach? What does success look like for your brand?"
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-white font-black text-lg py-4 rounded-full transition-colors"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Advertiser Application →"}
              </button>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <p className="text-slate-500 text-sm">
                  We review all applications within 48 hours. No commitment required.
                </p>
                <a
                  href="mailto:media@prolnk.io?subject=Book%20a%20Call%20-%20ProLnk%20Media"
                  className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold text-sm transition-colors whitespace-nowrap"
                >
                  <Zap className="w-4 h-4" /> Prefer to talk? Email us to book a call
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
            <div>
              <div className="text-2xl font-black text-white mb-2">
                ProLnk <span className="text-sky-400">Media</span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs">
                The advertising network built for the home services industry.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="text-white font-bold mb-3">Ad Formats</div>
                <ul className="space-y-2 text-slate-400">
                  <li>Dashboard Ads</li>
                  <li>Email Placements</li>
                  <li>Notifications</li>
                  <li>Geo-Targeting</li>
                </ul>
              </div>
              <div>
                <div className="text-white font-bold mb-3">Company</div>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">ProLnk Home</Link></li>
                  <li><Link href="/waitlist/pro" className="text-slate-400 hover:text-white transition-colors">Partner Waitlist</Link></li>
                  <li><Link href="/waitlist/homeowner" className="text-slate-400 hover:text-white transition-colors">Homeowner Waitlist</Link></li>
                </ul>
              </div>
              <div>
                <div className="text-white font-bold mb-3">Resources</div>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#apply" className="hover:text-white transition-colors">Advertise With Us</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#formats" className="hover:text-white transition-colors">Ad Formats</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <span>© {new Date().getFullYear()} ProLnk Media. All rights reserved.</span>
            <span>A ProLnk product — Built for the trades.</span>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
