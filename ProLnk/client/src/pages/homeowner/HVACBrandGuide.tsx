import { useState } from 'react';
import HomeownerLayout from "@/components/HomeownerLayout";
import { Star, CheckCircle2, DollarSign, AlertTriangle, ChevronDown, ChevronUp, ThumbsUp } from "lucide-react";
import { Link } from "wouter";

const D = {
  bg: "#0A1628",
  surface: "#0F1E35",
  card: "#162540",
  border: "#1E3050",
  text: "#F0F4FF",
  muted: "#7B8FAD",
  dim: "#4A5E7A",
  teal: "#14B8A6",
  yellow: "#F5E642",
  red: "#EF4444",
  amber: "#F59E0B",
  green: "#10B981",
  blue: "#3B82F6",
};

const BRAND_TIERS = [
  {
    tier: "Tier 1 — Best for DFW",
    tierColor: D.yellow,
    tierBg: "rgba(245,230,66,0.08)",
    tierBorder: "rgba(245,230,66,0.25)",
    brands: [
      {
        name: "Trane",
        seer: "Up to 22 SEER2",
        warranty: "10-year parts + 12-year compressor",
        priceRange: "$4,500–$9,000",
        pros: ["Largest dealer network in DFW — easiest service access", "Parts available at most HVAC supply houses same-day", "Proven in Texas heat: most installed brand in the state", "Variable-speed Comfort-R compressor handles DFW heat swings well"],
        cons: ["Premium pricing — often 15–25% more than mid-tier brands", "Dealer quality varies widely — installation matters as much as brand"],
        dfwVerdict: "Best choice if you want the lowest risk, fastest service, and highest resale value. The Trane dealer network in DFW is unmatched.",
      },
      {
        name: "Carrier",
        seer: "Up to 24 SEER2",
        warranty: "10-year parts + 10-year compressor",
        priceRange: "$4,200–$8,500",
        pros: ["Infinity series variable-speed compressor is excellent for DFW humidity control", "Strong dealer network — second only to Trane in DFW market", "Greenspeed Intelligence adapts output 1–100% based on conditions", "Good parts availability"],
        cons: ["Infinity series requires proprietary thermostat (limits DIY)", "Some dealers are Bryant (same parent company) — quality varies"],
        dfwVerdict: "Excellent alternative to Trane. The Infinity series is arguably the best DFW humidity control system on the market.",
      },
    ],
  },
  {
    tier: "Tier 2 — Excellent Quality",
    tierColor: D.teal,
    tierBg: "rgba(20,184,166,0.08)",
    tierBorder: "rgba(20,184,166,0.25)",
    brands: [
      {
        name: "Lennox",
        seer: "Up to 28 SEER2",
        warranty: "10-year parts (5-year without registration)",
        priceRange: "$4,000–$9,500",
        pros: ["Highest SEER ratings available — best for electricity bill reduction", "iComfort system has excellent smart home integration", "SunSource solar-ready models for DFW solar owners"],
        cons: ["Smaller dealer network in DFW — fewer service options", "Parts can take longer to source vs Trane/Carrier", "Premium pricing on high-efficiency models"],
        dfwVerdict: "Best for homeowners prioritizing long-term energy savings. The higher SEER models pay for themselves in 7–10 years in DFW's long cooling season.",
      },
      {
        name: "Daikin",
        seer: "Up to 23.5 SEER2",
        warranty: "12-year parts + 12-year compressor (registered)",
        priceRange: "$3,800–$7,500",
        pros: ["Japanese engineering — excellent reliability and longevity", "Best warranty in class (12/12 when registered)", "Fit series is excellent value for DFW", "Growing dealer network in North Texas"],
        cons: ["Smaller dealer base vs American brands — may be harder to service in rural DFW", "Less brand recognition can affect resale perception"],
        dfwVerdict: "Underrated option. The 12-year warranty is industry-leading and Daikin's reliability data is excellent. Worth getting a quote.",
      },
    ],
  },
  {
    tier: "Tier 3 — Good Value",
    tierColor: D.blue,
    tierBg: "rgba(59,130,246,0.08)",
    tierBorder: "rgba(59,130,246,0.25)",
    brands: [
      {
        name: "Rheem / Ruud",
        seer: "Up to 20 SEER2",
        warranty: "10-year parts",
        priceRange: "$3,200–$6,500",
        pros: ["Wide availability — sold at Home Depot (contractor division)", "Good mid-range efficiency for DFW", "Reliable with proper installation", "Good parts availability"],
        cons: ["Variable-speed options more limited than Tier 1", "Less prestigious for resale"],
        dfwVerdict: "Solid choice for budget-conscious homeowners who want reliability without Tier 1 pricing.",
      },
      {
        name: "Amana",
        seer: "Up to 24.5 SEER2",
        warranty: "Lifetime compressor (registered) — industry-unique",
        priceRange: "$3,500–$7,000",
        pros: ["Lifetime compressor warranty is genuinely unique in the industry", "Same parent company as Daikin (high quality)", "Good efficiency ratings"],
        cons: ["Smaller dealer network", "Lifetime warranty requires registered installation"],
        dfwVerdict: "Hidden gem — the lifetime compressor warranty makes this a strong long-term value play for DFW homeowners planning to stay 10+ years.",
      },
    ],
  },
  {
    tier: "Budget — Lower Long-Term Value",
    tierColor: D.muted,
    tierBg: "rgba(255,255,255,0.03)",
    tierBorder: "rgba(255,255,255,0.08)",
    brands: [
      {
        name: "Goodman",
        seer: "Up to 19 SEER2",
        warranty: "10-year parts (registered)",
        priceRange: "$2,500–$5,500",
        pros: ["Cheapest installed cost in the market", "Same parent company as Daikin and Amana", "Wide parts availability"],
        cons: ["Lower efficiency ratings — higher electricity bills in DFW long-term", "Shorter expected lifespan (12–15 yrs vs 18–22 for Tier 1)", "Plastic components more prone to failure in heat extremes"],
        dfwVerdict: "Acceptable as a short-term solution or rental property. For a primary residence, the lifetime electricity cost difference vs Tier 1 often exceeds the price gap.",
      },
    ],
  },
];

const WHAT_MATTERS_MORE = [
  {
    factor: "Proper Sizing",
    importance: "Critical",
    importanceColor: D.red,
    detail: "An oversized unit short-cycles (runs in short bursts) and fails to dehumidify properly — the #1 complaint in DFW. Require a Manual J load calculation before any installation. Never accept 'the same size as your old unit' without verification.",
  },
  {
    factor: "Quality Installation",
    importance: "Critical",
    importanceColor: D.red,
    detail: "Studies show installation quality accounts for 40% of system performance. Poor refrigerant charge, improper duct connections, and incorrect airflow can cost you 15–30% in efficiency. Choose NATE-certified technicians.",
  },
  {
    factor: "Qualified Technician",
    importance: "High",
    importanceColor: D.amber,
    detail: "Texas requires HVAC contractors to be licensed by TDLR (Texas Department of Licensing and Regulation). Verify your technician's license at tdlr.texas.gov before work begins.",
  },
  {
    factor: "Annual Maintenance",
    importance: "High",
    importanceColor: D.amber,
    detail: "A well-maintained mid-tier system will outlast and outperform a neglected premium system. Annual tune-ups run $80–$150 and can add 5+ years to system life.",
  },
];

export default function HVACBrandGuide() {
  const [openTier, setOpenTier] = useState<number | null>(0);
  const [openBrand, setOpenBrand] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleBrand = (key: string) => setOpenBrand(openBrand === key ? null : key);

  return (
    <HomeownerLayout>
      <div className="min-h-screen px-4 py-8 md:px-8 md:py-12" style={{ background: D.bg, color: D.text }}>
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold mb-5" style={{ background: "rgba(20,184,166,0.15)", color: D.teal, border: "1px solid rgba(20,184,166,0.3)" }}>
              <Star className="w-3.5 h-3.5" />
              DFW HVAC Buying Guide 2026
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              HVAC Brand Guide for DFW Homeowners — Which System Is Right for Texas Heat?
            </h1>
            <p className="text-base leading-relaxed" style={{ color: D.muted }}>
              DFW summers regularly exceed 110°F with humidity. Your HVAC system will run 2,000+ hours per year — more than almost any other US climate. Choosing the right brand (and installer) is one of the highest-ROI home decisions you'll make.
            </p>
          </div>

          {/* DFW Requirements Banner */}
          <div className="rounded-2xl p-5 mb-8 grid sm:grid-cols-3 gap-4" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
            {[
              { label: "Minimum Size", value: "5-ton", note: "Most DFW homes over 2,000 sq ft" },
              { label: "SEER Rating", value: "15+ SEER2", note: "Federal minimum; 17+ recommended for DFW" },
              { label: "Compressor", value: "Variable-speed", note: "Required for DFW humidity control" },
            ].map((req, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black mb-1" style={{ color: D.yellow }}>{req.value}</div>
                <div className="font-bold text-sm mb-0.5">{req.label}</div>
                <div className="text-xs" style={{ color: D.muted }}>{req.note}</div>
              </div>
            ))}
          </div>

          {/* Brand Tiers */}
          <h2 className="text-2xl font-black mb-5">Brand Rankings for DFW</h2>
          <div className="space-y-4 mb-10">
            {BRAND_TIERS.map((tier, ti) => (
              <div key={ti} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${tier.tierBorder}`, background: tier.tierBg }}>
                <button onClick={() => setOpenTier(openTier === ti ? null : ti)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="font-black text-base" style={{ color: tier.tierColor }}>{tier.tier}</span>
                  {openTier === ti ? <ChevronUp className="w-5 h-5" style={{ color: D.muted }} /> : <ChevronDown className="w-5 h-5" style={{ color: D.muted }} />}
                </button>
                {openTier === ti && (
                  <div className="px-6 pb-6">
                    <div className="space-y-3">
                      {tier.brands.map((brand, bi) => {
                        const key = `${ti}-${bi}`;
                        return (
                          <div key={bi} className="rounded-xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                            <button onClick={() => toggleBrand(key)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                              <div className="flex items-center gap-4">
                                <span className="font-black text-base">{brand.name}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: D.muted }}>{brand.seer}</span>
                                <span className="text-sm font-semibold" style={{ color: D.green }}>{brand.priceRange}</span>
                              </div>
                              {openBrand === key ? <ChevronUp className="w-4 h-4" style={{ color: D.muted }} /> : <ChevronDown className="w-4 h-4" style={{ color: D.muted }} />}
                            </button>
                            {openBrand === key && (
                              <div className="px-5 pb-5 border-t" style={{ borderColor: D.border }}>
                                <div className="grid sm:grid-cols-2 gap-4 mt-4 mb-4">
                                  <div>
                                    <div className="text-xs font-bold mb-2" style={{ color: D.green }}>Pros</div>
                                    <ul className="space-y-1.5">
                                      {brand.pros.map((p, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs" style={{ color: D.muted }}>
                                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: D.green }} />
                                          <span>{p}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold mb-2" style={{ color: D.red }}>Cons</div>
                                    <ul className="space-y-1.5">
                                      {brand.cons.map((c, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs" style={{ color: D.muted }}>
                                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: D.red }} />
                                          <span>{c}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                <div className="rounded-lg p-3 text-xs leading-relaxed" style={{ background: "rgba(245,230,66,0.08)", border: "1px solid rgba(245,230,66,0.2)", color: D.muted }}>
                                  <span className="font-bold" style={{ color: D.yellow }}>DFW Verdict: </span>{brand.dfwVerdict}
                                </div>
                                <div className="mt-2 text-xs" style={{ color: D.dim }}>Warranty: {brand.warranty}</div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* What Matters More */}
          <div className="rounded-2xl overflow-hidden mb-8" style={{ border: `1px solid ${D.border}`, background: D.surface }}>
            <button onClick={() => setOpenSection(openSection === "matters" ? null : "matters")} className="w-full flex items-center justify-between px-6 py-5 text-left">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" style={{ color: D.teal }} />
                <span className="font-bold text-base">What Matters More Than Brand</span>
              </div>
              {openSection === "matters" ? <ChevronUp className="w-5 h-5" style={{ color: D.muted }} /> : <ChevronDown className="w-5 h-5" style={{ color: D.muted }} />}
            </button>
            {openSection === "matters" && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: D.border }}>
                <div className="mt-5 space-y-3">
                  {WHAT_MATTERS_MORE.map((item, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-sm">{item.factor}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${item.importanceColor}20`, color: item.importanceColor }}>{item.importance}</span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: D.muted }}>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Financing */}
          <div className="rounded-2xl p-5 mb-8" style={{ background: "rgba(245,230,66,0.06)", border: "1px solid rgba(245,230,66,0.2)" }}>
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 shrink-0 mt-0.5" style={{ color: D.yellow }} />
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: D.yellow }}>Financing Available</div>
                <p className="text-xs leading-relaxed" style={{ color: D.muted }}>
                  Most major brands (Trane, Carrier, Lennox, Daikin) offer 0% financing for 12–18 months through dealer programs. Ask your contractor about manufacturer financing before agreeing to a contractor's in-house financing, which often carries higher rates. Also check the Oncor AC rebate program (up to $400) at oncorrebates.com.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))", border: "1px solid rgba(20,184,166,0.3)" }}>
            <Star className="w-10 h-10 mx-auto mb-4" style={{ color: D.teal }} />
            <h2 className="text-2xl font-black mb-3">Get 3 HVAC Quotes from Verified DFW Pros</h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: D.muted }}>
              ProLnk connects you with NATE-certified, licensed, insured HVAC contractors in your DFW zip code. Compare quotes, not guesses.
            </p>
            <Link href="/homeowner-signup">
              <span className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl cursor-pointer" style={{ background: D.teal, color: "white" }}>
                Get HVAC Quotes Near Me
              </span>
            </Link>
            <p className="mt-3 text-xs" style={{ color: D.dim }}>Free · No commitment · Licensed pros only</p>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
