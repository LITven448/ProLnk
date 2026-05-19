import { useState } from 'react';
import { Home, ChevronRight, AlertTriangle, Shield, Calculator, DollarSign } from "lucide-react";

const ROOF_TYPES = [
  { name: "Architectural Shingle", tag: "Most Common", low: 8, high: 14, lifespan: "25–30 years", notes: "Best value for DFW. Class 4 impact-resistant shingles may qualify for 20–30% insurance discount." },
  { name: "Metal (Standing Seam)", tag: "Premium", low: 14, high: 22, lifespan: "50+ years", notes: "Excellent hail/wind resistance. High upfront cost often offset by insurance savings and longevity." },
  { name: "Tile (Concrete/Clay)", tag: "Luxury", low: 16, high: 25, lifespan: "50+ years", notes: "Heavy — many DFW homes require structural reinforcement. Beautiful, durable, high resale value." },
  { name: "Flat / TPO (Commercial)", tag: "Flat Roof", low: 7, high: 12, lifespan: "20–30 years", notes: "Common on commercial and modern residential. Requires proper drainage design in DFW." },
];

const BEDROOMS_TO_SQFT: Record<number, { sqft: number; label: string }> = {
  2: { sqft: 1100, label: "~1,100 sqft" },
  3: { sqft: 1600, label: "~1,600 sqft" },
  4: { sqft: 2200, label: "~2,200 sqft" },
  5: { sqft: 3000, label: "~3,000 sqft" },
  6: { sqft: 3800, label: "~3,800 sqft" },
};

const RED_FLAGS = [
  { flag: "Door-to-Door Storm Chasers", desc: "After major hail events, out-of-town contractors flood DFW. Many take deposits and disappear. Always verify Texas contractor license at license.state.tx.us." },
  { flag: "Deductible Waivers", desc: "Illegal in Texas (TX Ins. Code §707.002). Any contractor who offers to 'waive your deductible' is committing insurance fraud. Walk away." },
  { flag: "Cash-Only Contractors", desc: "No checks, no card, no paper trail. If something goes wrong, you have no recourse. Always pay by check or card." },
  { flag: "No Written Contract", desc: "Texas law requires a written contract for projects over $5,000. Demand one. Read it before signing." },
  { flag: "Pressure to Sign Same Day", desc: "Any contractor creating artificial urgency is a red flag. Legitimate contractors give you time to compare quotes." },
];

export default function DFWRoofingCostGuide() {
  const [selectedType, setSelectedType] = useState(0);
  const [bedrooms, setBedrooms] = useState(3);

  const roof = ROOF_TYPES[selectedType];
  const sqftData = BEDROOMS_TO_SQFT[bedrooms];
  const roofSqft = Math.round(sqftData.sqft * 1.25);
  const lowCost = Math.round((roofSqft / 100) * roof.low * 100);
  const highCost = Math.round((roofSqft / 100) * roof.high * 100);
  const stormLow = Math.round(lowCost * 1.20);
  const stormHigh = Math.round(highCost * 1.40);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAF9" }}>
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="text-[#1B2B4B] w-6 h-6" />
          <span className="font-bold text-[#1B2B4B] text-lg">TrustyPro</span>
        </div>
        <a href="/apply" className="bg-[#F5C518] text-[#1B2B4B] font-bold px-5 py-2 rounded-lg text-sm hover:bg-yellow-400 transition-colors">
          Get Free Estimates
        </a>
      </nav>

      {/* Hero */}
      <section className="bg-[#1B2B4B] text-white px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Calculator className="w-4 h-4" /> DFW Roofing Cost Guide 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            DFW Roofing Cost Guide 2026 —<br />What You Should Actually Pay
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            DFW has one of the most active roofing markets in the U.S. — driven by frequent hail, high growth, and aggressive storm chasers.
            Here are real numbers, from licensed contractors who actually work here.
          </p>
        </div>
      </section>

      {/* Storm Pricing Warning */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <div className="bg-orange-50 border border-orange-300 rounded-2xl p-6 flex gap-4">
          <AlertTriangle className="text-orange-500 w-8 h-8 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-orange-800 mb-1">DFW Storm Surge Pricing</h3>
            <p className="text-orange-700">
              After major hail events (common April–June), labor rates increase <strong>20–40%</strong> and wait times extend to
              <strong> 6–8 weeks</strong>. If you see damage, act fast — get estimates within the first 2 weeks before the market floods.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="px-6 py-14 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1B2B4B] mb-2">Roofing Cost Calculator</h2>
          <p className="text-gray-500 mb-10">Select your roof type and home size for a realistic price range.</p>

          {/* Roof Type Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {ROOF_TYPES.map((r, i) => (
              <button key={r.name} onClick={() => setSelectedType(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedType === i
                    ? "bg-[#1B2B4B] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                {r.name}
                {r.tag && <span className="ml-2 text-xs opacity-70">{r.tag}</span>}
              </button>
            ))}
          </div>

          {/* Bedroom Selector */}
          <div className="mb-8">
            <label className="text-gray-600 text-sm font-medium block mb-3">Bedrooms</label>
            <div className="flex gap-3">
              {Object.keys(BEDROOMS_TO_SQFT).map(b => (
                <button key={b} onClick={() => setBedrooms(Number(b))}
                  className={`w-12 h-12 rounded-xl font-bold text-sm transition-colors ${
                    bedrooms === Number(b)
                      ? "bg-[#F5C518] text-[#1B2B4B]"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {b}BR
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-2">Estimated home: {sqftData.label} → approx. {roofSqft.toLocaleString()} sqft roof</p>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="col-span-2 bg-[#1B2B4B] rounded-2xl p-8 text-white">
              <h3 className="text-lg font-semibold text-slate-300 mb-1">{roof.name}</h3>
              <div className="text-4xl font-bold text-[#F5C518] mb-1">
                ${lowCost.toLocaleString()} – ${highCost.toLocaleString()}
              </div>
              <p className="text-slate-400 text-sm mb-4">Normal market conditions · {sqftData.label} home · fully installed</p>
              <div className="border-t border-slate-700 pt-4 space-y-2 text-sm">
                <p><strong className="text-white">Lifespan:</strong> <span className="text-slate-300">{roof.lifespan}</span></p>
                <p><strong className="text-white">DFW Note:</strong> <span className="text-slate-300">{roof.notes}</span></p>
                <p className="text-orange-300 mt-3">⚠ Storm pricing: ${stormLow.toLocaleString()} – ${stormHigh.toLocaleString()} (20–40% higher after hail events)</p>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <DollarSign className="text-yellow-600 w-6 h-6 mb-3" />
              <h3 className="font-bold text-[#1B2B4B] mb-3">Price per Square</h3>
              <div className="text-3xl font-bold text-[#1B2B4B] mb-1">${roof.low}–${roof.high}</div>
              <p className="text-gray-500 text-sm">per sqft installed</p>
              <p className="text-gray-400 text-xs mt-4">Roofing contractors use "squares" (100 sqft). Divide total sqft by 100 for square count.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Guide */}
      <section className="px-6 py-14 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1B2B4B] mb-2">Insurance Claim Guide</h2>
        <p className="text-gray-500 mb-8">Most DFW roof replacements are insurance claims. Here's how to navigate one correctly.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { step: "1", title: "File within your policy deadline", desc: "Most policies require filing within 1–2 years of the storm. Check your policy. Don't wait." },
            { step: "2", title: "Get your own adjuster estimate first", desc: "Have a roofing contractor inspect before your insurance adjuster arrives. Their estimate is your baseline." },
            { step: "3", title: "Understand your scope of work", desc: "The adjuster produces a 'scope' — a line-item estimate. Review it carefully. Missing items are common." },
            { step: "4", title: "Supplement if needed", desc: "If the adjuster misses items (drip edge, ice/water shield, permit fees), your contractor can file a supplemental claim." },
            { step: "5", title: "ACV vs. RCV policies", desc: "ACV (Actual Cash Value) pays depreciated value. RCV (Replacement Cost Value) pays full replacement. Know which you have." },
            { step: "6", title: "Never waive your deductible", desc: "Texas law prohibits deductible waivers. Contractors who offer this are committing fraud that voids your policy." },
          ].map(s => (
            <div key={s.step} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="bg-[#1B2B4B] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">{s.step}</span>
                <div>
                  <h3 className="font-bold text-[#1B2B4B] mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Red Flags */}
      <section className="px-6 py-14 bg-red-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1B2B4B] mb-2">DFW Roofing Red Flags</h2>
          <p className="text-gray-500 mb-8">Avoid these — they cost homeowners millions every storm season.</p>
          <div className="space-y-4">
            {RED_FLAGS.map(r => (
              <div key={r.flag} className="bg-white border border-red-200 rounded-xl p-5 flex gap-4">
                <Shield className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-700 mb-1">{r.flag}</h3>
                  <p className="text-gray-600 text-sm">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#1B2B4B] text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Get 3 Estimates from Verified DFW Roofers</h2>
          <p className="text-slate-300 mb-8">
            TrustyPro contractors are licensed, insured, and background-checked in Texas.
            No storm chasers. No deductible waivers. Just real roofers who stand behind their work.
          </p>
          <a href="/apply" className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-yellow-400 text-[#1B2B4B] font-bold px-8 py-4 rounded-xl text-lg transition-colors">
            Get Free Roofing Estimates <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
