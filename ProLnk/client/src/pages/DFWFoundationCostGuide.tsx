import { useState } from 'react';
import { Home, ChevronRight, AlertTriangle, Shield, CheckCircle } from "lucide-react";

const REPAIR_TYPES = [
  { type: "Perimeter Watering System", cost: "$0–$200/year DIY", description: "Drip irrigation around the foundation perimeter to maintain consistent soil moisture.", bestFor: "Prevention", urgency: "low", savings: "Saves $10,000–$60,000 in future repairs" },
  { type: "Pier Installation (per pier)", cost: "$350–$600 per pier", description: "Steel or concrete piers driven below the active soil zone to stabilize the foundation.", bestFor: "Settling/sinking sections", urgency: "high", savings: null },
  { type: "Slab Repair (Small Crack)", cost: "$500–$2,000", description: "Crack injection, epoxy fill, or surface repair for minor cosmetic or hairline cracks.", bestFor: "Minor cracking only", urgency: "medium", savings: null },
  { type: "Partial Pier System (10–15 piers)", cost: "$5,000–$12,000", description: "The most common repair scope for DFW homes — addresses settling in one or two corners/sides.", bestFor: "One-side settling", urgency: "high", savings: null },
  { type: "Full Foundation Repair", cost: "$15,000–$40,000", description: "Complete pier system around the perimeter and/or interior of the home. Required for severe or whole-home movement.", bestFor: "Whole-home settling", urgency: "critical", savings: null },
  { type: "House Leveling", cost: "$25,000–$80,000", description: "Full raise-and-level of a significantly settled structure. Includes masonry, framing, and interior repairs.", bestFor: "Severe/long-neglected movement", urgency: "critical", savings: null },
];

const SIGNS = [
  { sign: "Doors and windows sticking or not latching", type: "Early" },
  { sign: "Diagonal cracks from corners of door/window frames", type: "Early–Moderate" },
  { sign: "Vertical or stair-step cracks in brick exterior", type: "Moderate" },
  { sign: "Gaps forming at ceiling/wall junction", type: "Moderate" },
  { sign: "Uneven or sloping floors (use a marble test)", type: "Moderate–Severe" },
  { sign: "Cracks wider than 1/4 inch", type: "Severe" },
  { sign: "Doors no longer close at all", type: "Severe" },
  { sign: "Visible separation between foundation and slab", type: "Critical" },
];

const URGENCY_COLORS: Record<string, string> = {
  low: "bg-green-100 text-green-700 border-green-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  critical: "bg-red-100 text-red-700 border-red-200",
};

const TYPE_COLORS: Record<string, string> = {
  "Early": "bg-green-100 text-green-700",
  "Early–Moderate": "bg-yellow-100 text-yellow-700",
  "Moderate": "bg-orange-100 text-orange-700",
  "Moderate–Severe": "bg-orange-200 text-orange-800",
  "Severe": "bg-red-100 text-red-700",
  "Critical": "bg-red-200 text-red-800",
};

export default function DFWFoundationCostGuide() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [checkedSigns, setCheckedSigns] = useState<Record<number, boolean>>({});

  const toggleSign = (i: number) => setCheckedSigns(prev => ({ ...prev, [i]: !prev[i] }));
  const signCount = Object.values(checkedSigns).filter(Boolean).length;

  const severity =
    signCount === 0 ? null :
    signCount <= 2 ? "Monitor — Get an inspection within 6 months" :
    signCount <= 4 ? "Act Soon — Schedule an inspection this month" :
    "Urgent — Call a foundation specialist this week";

  const severityColor =
    signCount === 0 ? "" :
    signCount <= 2 ? "text-yellow-700 bg-yellow-50 border-yellow-200" :
    signCount <= 4 ? "text-orange-700 bg-orange-50 border-orange-200" :
    "text-red-700 bg-red-50 border-red-200";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAF9" }}>
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="text-[#1B2B4B] w-6 h-6" />
          <span className="font-bold text-[#1B2B4B] text-lg">TrustyPro</span>
        </div>
        <a href="/apply" className="bg-[#F5C518] text-[#1B2B4B] font-bold px-5 py-2 rounded-lg text-sm hover:bg-yellow-400 transition-colors">
          Find a Foundation Pro
        </a>
      </nav>

      {/* Hero */}
      <section className="bg-[#1B2B4B] text-white px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🏗️ DFW Foundation Cost Guide 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            DFW Foundation Repair Cost Guide —<br />Blackland Prairie Edition
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            DFW sits on the most expansive clay soil in North America. Foundation movement is not a matter of if — it's when.
            Here's what it costs, what it means, and how to avoid the worst of it.
          </p>
        </div>
      </section>

      {/* Why DFW Is Different */}
      <section className="px-6 py-14 max-w-5xl mx-auto">
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Why DFW Is Different — Blackland Prairie Clay</h2>
          <p className="text-amber-800 text-lg mb-4">
            DFW's Blackland Prairie clay soil is among the most expansive in North America.
            It swells dramatically when wet and shrinks when dry — movement that can exceed <strong>4 inches vertically</strong> across seasons.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              { stat: "4"", label: "Max vertical soil movement per season", icon: "📐" },
              { stat: "~70%", label: "of DFW homes will need foundation work", icon: "🏠" },
              { stat: "$200/yr", label: "prevention cost vs. $10K–$60K repair", icon: "💡" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-3xl font-bold text-amber-700">{s.stat}</div>
                <div className="text-amber-600 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-amber-700 mt-6 text-sm">
            <strong>Foundation repair is not optional in DFW — it's maintenance.</strong> The question is whether you catch it early
            ($5K–$12K) or late ($25K–$80K).
          </p>
        </div>
      </section>

      {/* Cost by Repair Type */}
      <section className="px-6 py-14 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1B2B4B] mb-2">Repair Costs by Type</h2>
          <p className="text-gray-500 mb-8">Click any row for details. Costs include licensed labor and materials for DFW market (2026).</p>
          <div className="space-y-3">
            {REPAIR_TYPES.map((r, i) => (
              <div key={r.type}
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-gray-400 transition-colors">
                <div className="flex items-center justify-between px-6 py-4 bg-white">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-bold text-[#1B2B4B]">{r.type}</h3>
                      <p className="text-gray-400 text-sm">{r.bestFor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-[#1B2B4B]">{r.cost}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded border ${URGENCY_COLORS[r.urgency]}`}>
                      {r.urgency.charAt(0).toUpperCase() + r.urgency.slice(1)}
                    </span>
                  </div>
                </div>
                {expanded === i && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 mb-3">{r.description}</p>
                    {r.savings && (
                      <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-700 text-sm font-semibold">
                        💡 {r.savings}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prevention ROI */}
      <section className="px-6 py-14 max-w-5xl mx-auto">
        <div className="bg-green-50 border border-green-300 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" /> Prevention ROI — The Best Investment in DFW
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">What Prevention Costs</h3>
              <ul className="space-y-2 text-green-700">
                <li>• Drip irrigation system install: $300–$800 one-time</li>
                <li>• Annual water cost: $100–$200/year</li>
                <li>• Annual foundation inspection: $0–$300/year</li>
                <li className="font-bold">• Total prevention: ~$200/year ongoing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">What Neglect Costs</h3>
              <ul className="space-y-2 text-green-700">
                <li>• Partial pier system: $5,000–$12,000</li>
                <li>• Full repair: $15,000–$40,000</li>
                <li>• House leveling: $25,000–$80,000</li>
                <li className="font-bold">• Neglect cost: $10,000–$60,000+</li>
              </ul>
            </div>
          </div>
          <p className="text-green-700 mt-6 font-semibold text-lg">
            ROI: Spend $200/year → save $10,000–$60,000. No investment in your DFW home comes close.
          </p>
        </div>
      </section>

      {/* Signs Checker */}
      <section className="px-6 py-14 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1B2B4B] mb-2">Signs You May Need Foundation Repair</h2>
          <p className="text-gray-500 mb-8">Check any signs you've noticed. We'll tell you how urgent it is.</p>
          <div className="space-y-3 mb-8">
            {SIGNS.map((s, i) => (
              <div key={i} onClick={() => toggleSign(i)}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer transition-all ${
                  checkedSigns[i] ? "border-[#1B2B4B] bg-blue-50" : "border-gray-200 hover:border-gray-400"
                }`}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                  checkedSigns[i] ? "border-[#1B2B4B] bg-[#1B2B4B]" : "border-gray-300"
                }`}>
                  {checkedSigns[i] && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="flex-1 text-gray-700">{s.sign}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${TYPE_COLORS[s.type] || "bg-gray-100 text-gray-600"}`}>{s.type}</span>
              </div>
            ))}
          </div>

          {signCount > 0 && (
            <div className={`rounded-xl border px-6 py-4 font-semibold text-lg ${severityColor}`}>
              {signCount} sign{signCount !== 1 ? "s" : ""} checked — {severity}
            </div>
          )}
        </div>
      </section>

      {/* How to Find a Licensed Contractor */}
      <section className="px-6 py-14 max-w-5xl mx-auto">
        <div className="bg-[#1B2B4B] text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">How to Find a Licensed Foundation Contractor in DFW</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Texas License Lookup", desc: "All structural foundation contractors must be licensed in Texas. Verify at license.state.tx.us before signing anything.", icon: "🔍" },
              { title: "SAFA Membership", desc: "Look for SAFA (Structural Waterproofing Association of North America) members — they follow industry best practices.", icon: "🏆" },
              { title: "Get 3+ Estimates", desc: "Foundation repair pricing varies 30–50% between contractors. Always get at least 3 estimates before committing.", icon: "📋" },
              { title: "Ask for a Pier Diagram", desc: "A reputable contractor will provide a diagram showing pier placement, depth, and load calculations — not just a dollar number.", icon: "📐" },
              { title: "Check for a Lifetime Warranty", desc: "Top DFW foundation companies offer lifetime transferable warranties. This adds value at resale.", icon: "✅" },
              { title: "Ask About Drainage First", desc: "Many foundation issues are caused by poor drainage. A good contractor addresses this first, not just the piers.", icon: "💧" },
            ].map(t => (
              <div key={t.title} className="flex items-start gap-3">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <h3 className="font-semibold text-yellow-400 mb-1">{t.title}</h3>
                  <p className="text-slate-300 text-sm">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#1B2B4B] text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Find a TrustyPro Foundation Specialist</h2>
          <p className="text-slate-300 mb-8">
            TrustyPro foundation contractors are licensed in Texas, carry liability and workers' comp insurance,
            and have verifiable reviews from DFW homeowners.
          </p>
          <a href="/apply" className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-yellow-400 text-[#1B2B4B] font-bold px-8 py-4 rounded-xl text-lg transition-colors">
            Get Foundation Estimates <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
