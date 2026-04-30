/**
 * ProLnk Media — Standalone Advertiser Product Site
 *
 * Lives at prolnkmedia.io (or media.prolnk.io until that domain is set up).
 * Clean B2B landing page for businesses wanting to reach verified homeowners.
 *
 * Target advertisers:
 *   - Real estate agents and teams
 *   - Mortgage brokers / lenders
 *   - Title companies
 *   - Home warranty companies
 *   - Insurance agents
 *   - Home inspectors
 *   - Interior designers
 *   - Moving companies
 */

import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  CheckCircle, ArrowRight, BarChart3, Users, MapPin,
  Eye, MousePointerClick, DollarSign, Shield, Star,
  Building2, Home, TrendingUp, Lock, Calculator,
  BadgeCheck, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TIERS = [
  {
    id: "connect",
    name: "Connect",
    price: 199,
    description: "Get discovered by homeowners in your target zip codes.",
    zipCount: "Up to 3 zip codes",
    exclusivity: "Non-exclusive",
    features: [
      "Profile card on homeowner dashboard",
      "Up to 3 zip codes",
      "Click & impression analytics",
      "Monthly performance report",
      "Cancel anytime",
    ],
    color: "indigo",
    cta: "Get Started",
    popular: false,
  },
  {
    id: "preferred",
    name: "Preferred",
    price: 349,
    description: "Priority placement with semi-exclusive territory coverage.",
    zipCount: "Up to 8 zip codes",
    exclusivity: "Semi-exclusive (max 2 per category)",
    features: [
      "Dashboard + scan results placement",
      "Up to 8 zip codes",
      "Priority placement rotation",
      "Bi-weekly performance report",
      "Territory exclusivity option",
      "Inclusion in homeowner emails",
      "Cancel anytime",
    ],
    color: "violet",
    cta: "Become Preferred",
    popular: true,
  },
  {
    id: "exclusive",
    name: "Exclusive",
    price: 799,
    description: "Own your category in your territory. One partner per category per zip.",
    zipCount: "Up to 15 zip codes",
    exclusivity: "Fully exclusive (only 1 per category per zip)",
    features: [
      "All Preferred benefits",
      "Up to 15 zip codes — fully exclusive",
      "Homeowner email campaign inclusion",
      "New homeowner welcome placement",
      "Quarterly strategy review call",
      "Dedicated account manager",
      "Storm alert campaign inclusion",
      "Cancel anytime",
    ],
    color: "purple",
    cta: "Lock Your Territory",
    popular: false,
  },
];

const CATEGORIES = [
  "Real Estate Agent / Team",
  "Mortgage Broker / Lender",
  "Title Company",
  "Home Warranty Company",
  "Homeowners Insurance Agent",
  "Home Inspector",
  "Interior Designer / Stager",
  "Moving Company",
  "Storage Company",
  "Real Estate Attorney",
  "Other",
];

const ROI_DATA: Record<string, { avgRevenue: number; label: string }> = {
  "Real Estate Agent / Team": { avgRevenue: 9500, label: "avg commission per sale" },
  "Mortgage Broker / Lender": { avgRevenue: 4200, label: "avg commission per loan" },
  "Title Company": { avgRevenue: 1800, label: "avg closing fee" },
  "Home Warranty Company": { avgRevenue: 600, label: "avg contract value" },
  "Homeowners Insurance Agent": { avgRevenue: 1100, label: "avg first-year premium" },
  "Home Inspector": { avgRevenue: 450, label: "avg inspection fee" },
};

const STATS = [
  { value: "2,400+", label: "Homeowners on Platform" },
  { value: "150+", label: "Active Service Professionals" },
  { value: "94%", label: "Homeowner Engagement Rate" },
  { value: "DFW", label: "Texas Launch Market" },
];

export default function ProLnkMediaSite() {
  const [selectedTier, setSelectedTier] = useState<"connect" | "preferred" | "exclusive">("preferred");
  const [step, setStep] = useState<"landing" | "form" | "success">("landing");
  const [roiCategory, setRoiCategory] = useState("Real Estate Agent / Team");
  const [roiConversions, setRoiConversions] = useState(2);
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

  const submitMutation = trpc.featuredAdvertisers.submitApplication.useMutation({
    onSuccess: () => setStep("success"),
    onError: (e) => toast.error(e.message || "Something went wrong. Please try again."),
  });

  const roiCalc = useMemo(() => {
    const data = ROI_DATA[roiCategory];
    if (!data) return null;
    const tierCost = TIERS.find(t => t.id === selectedTier)?.price ?? 199;
    const annualCost = tierCost * 12;
    const neededClients = Math.ceil(annualCost / data.avgRevenue);
    const potentialRevenue = roiConversions * data.avgRevenue;
    const roi = ((potentialRevenue - annualCost) / annualCost * 100).toFixed(0);
    return { annualCost, neededClients, potentialRevenue, roi, label: data.label };
  }, [roiCategory, roiConversions, selectedTier]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const zipCodes = form.zipCodesRaw.split(",").map(z => z.trim()).filter(Boolean);
    if (!zipCodes.length) { toast.error("Enter at least one zip code"); return; }
    if (!form.category) { toast.error("Select your business category"); return; }
    submitMutation.mutate({
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

  if (step === "success") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Application Received!</h2>
          <p className="text-gray-500 mb-8">We'll review your application and reach out within 1–2 business days to confirm your placement and set up billing.</p>
          <Button onClick={() => setStep("landing")} className="bg-violet-600 hover:bg-violet-700 text-white">Back to ProLnk Media</Button>
        </div>
      </div>
    );
  }

  if (step === "form") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-xl mx-auto">
          <button onClick={() => setStep("landing")} className="text-gray-500 text-sm mb-8 flex items-center gap-1 hover:text-gray-700">
            ← Back
          </button>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Apply for {TIERS.find(t => t.id === selectedTier)?.name}</h2>
            <p className="text-gray-500 mb-8">${TIERS.find(t => t.id === selectedTier)?.price}/month · {TIERS.find(t => t.id === selectedTier)?.zipCount}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Business name *" required value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))} />
              <Input placeholder="Your name *" required value={form.contactName} onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))} />
              <Input type="email" placeholder="Email address *" required value={form.contactEmail} onChange={e => setForm(f => ({ ...f, contactEmail: e.target.value }))} />
              <Input placeholder="Phone (optional)" value={form.contactPhone} onChange={e => setForm(f => ({ ...f, contactPhone: e.target.value }))} />
              <select required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-gray-700">
                <option value="">Select business category *</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Input placeholder="Website (optional)" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
              <Input placeholder="Target zip codes (comma-separated) *" required value={form.zipCodesRaw} onChange={e => setForm(f => ({ ...f, zipCodesRaw: e.target.value }))} />
              <textarea placeholder="Anything else you'd like us to know? (optional)" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm resize-none" rows={3} />
              <Button type="submit" disabled={submitMutation.isPending} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold h-12">
                {submitMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-gray-900 text-xl">ProLnk Media</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#how-it-works" className="hover:text-violet-600 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-violet-600 transition-colors">Pricing</a>
            <a href="#roi" className="hover:text-violet-600 transition-colors">ROI Calculator</a>
          </div>
          <Button size="sm" onClick={() => setStep("form")} className="bg-violet-600 hover:bg-violet-700 text-white font-bold">
            Apply Now
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-semibold mb-8">
          <Shield className="w-3.5 h-3.5" />
          DFW Launch · Limited Spots Available
        </div>
        <h1 className="text-6xl font-black text-gray-900 leading-tight mb-6">
          Reach homeowners<br />
          <span className="text-violet-600">at the exact moment</span><br />
          they need you.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          ProLnk Media places your business in front of verified, actively engaged homeowners — right as they're managing repairs, renovations, and real estate decisions.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-gray-900">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
        <Button size="lg" onClick={() => setStep("form")} className="bg-violet-600 hover:bg-violet-700 text-white font-black text-lg px-10 py-4 rounded-xl h-auto">
          Apply for a Spot <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Choose Your Coverage</h2>
            <p className="text-gray-500 text-lg">Three tiers. All include click and impression analytics. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative bg-white rounded-2xl border-2 p-8 cursor-pointer transition-all ${
                  selectedTier === tier.id ? "border-violet-500 shadow-lg shadow-violet-100" : "border-gray-100 hover:border-violet-200"
                } ${tier.popular ? "ring-2 ring-violet-500 ring-offset-2" : ""}`}
                onClick={() => setSelectedTier(tier.id as any)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-black text-gray-900 mb-1">{tier.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{tier.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900">${tier.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>
                <div className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full inline-block mb-4">{tier.exclusivity}</div>
                <ul className="space-y-2.5">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={(e) => { e.stopPropagation(); setSelectedTier(tier.id as any); setStep("form"); }}
                  className={`w-full mt-8 font-bold ${selectedTier === tier.id ? "bg-violet-600 hover:bg-violet-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">ROI Calculator</h2>
            <p className="text-gray-500 text-lg">See what one new client from ProLnk Media is worth to your business.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">My business type</label>
                <select value={roiCategory} onChange={e => setRoiCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  {Object.keys(ROI_DATA).map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New clients per month from ProLnk</label>
                <input type="range" min={1} max={10} value={roiConversions} onChange={e => setRoiConversions(parseInt(e.target.value))} className="w-full accent-violet-600" />
                <div className="text-center text-2xl font-black text-violet-600 mt-1">{roiConversions} clients</div>
              </div>
            </div>
            {roiCalc && (
              <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-6">
                <div>
                  <div className="text-2xl font-black text-gray-900">${roiCalc.annualCost.toLocaleString()}</div>
                  <div className="text-gray-500 text-sm">Annual cost</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-green-600">${roiCalc.potentialRevenue.toLocaleString()}</div>
                  <div className="text-gray-500 text-sm">Potential revenue ({roiCalc.label})</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-violet-600">{roiCalc.roi}%</div>
                  <div className="text-gray-500 text-sm">Return on investment</div>
                </div>
              </div>
            )}
            {roiCalc && (
              <p className="text-center text-gray-400 text-xs mt-4">
                You need just {roiCalc.neededClients} client{roiCalc.neededClients === 1 ? "" : "s"} from ProLnk to cover your entire annual investment.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-violet-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Ready to reach your next client?</h2>
          <p className="text-violet-200 text-lg mb-10">Apply today. We review all applications within 1–2 business days.</p>
          <Button size="lg" onClick={() => setStep("form")} className="bg-white text-violet-600 hover:bg-violet-50 font-black text-lg px-10 py-4 rounded-xl h-auto">
            Apply for a Spot <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <footer className="bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <span className="font-black text-white">ProLnk Media</span>
          <div className="flex gap-6">
            <a href="https://prolnk.io" className="hover:text-gray-300">ProLnk Network</a>
            <a href="https://trustypro.io" className="hover:text-gray-300">TrustyPro</a>
            <a href="mailto:media@prolnk.io" className="hover:text-gray-300">media@prolnk.io</a>
          </div>
          <span>© 2026 ProLnk LLC — DFW, Texas</span>
        </div>
      </footer>
    </div>
  );
}
