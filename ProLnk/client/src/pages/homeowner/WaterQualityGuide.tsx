import { useState } from 'react';
import HomeownerLayout from "@/components/HomeownerLayout";
import { Droplets, ChevronRight, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

const CITY_HARDNESS = [
  { city: "Frisco", ppm: 380, level: "Very Hard", color: "bg-red-500″ },
  { city: "Plano", ppm: 350, level: "Very Hard", color: "bg-red-500″ },
  { city: "Allen", ppm: 340, level: "Very Hard", color: "bg-red-500″ },
  { city: "Dallas", ppm: 320, level: "Very Hard", color: "bg-red-400″ },
  { city: "McKinney", ppm: 290, level: "Hard", color: "bg-orange-400″ },
  { city: "Fort Worth", ppm: 180, level: "Moderately Hard", color: "bg-yellow-400″ },
];

const SOLUTIONS = [
  { name: "Filter Pitcher", cost: "$35″, ongoing: "$30/yr filters", solves: "Taste, chlorine, minor contaminants", icon: "🫙", hardness: false },
  { name: "Under-Sink Filter", cost: "$200–$400″, ongoing: "$50/yr filters", solves: "Chlorine, lead, VOCs, nitrates", icon: "🚰", hardness: false },
  { name: "Whole-House Filter", cost: "$500–$1,500″, ongoing: "$100/yr", solves: "Sediment, chlorine, odor throughout home", icon: "🏠", hardness: false },
  { name: "Water Softener", cost: "$800–$2,500 installed", ongoing: "$100/yr salt", solves: "Hard water (scale, spot-free dishes, soft skin)", icon: "💧", hardness: true },
];

const DAMAGE = [
  { appliance: "Water Heater", impact: "Scale buildup reduces efficiency by 30% and shortens life by 40%", icon: "🔥" },
  { appliance: "Dishwasher", impact: "Hard water deposits reduce cleaning efficiency by 30% and damage heating elements", icon: "🍽️" },
  { appliance: "Pipes & Fixtures", impact: "Scale narrows pipe diameter, reduces flow, and corrodes fittings over 5–10 years", icon: "🔧" },
  { appliance: "Skin & Hair", impact: "Minerals strip natural oils, causing dryness, itchiness, and dull hair", icon: "🧴" },
];

const CITY_REPORTS = [
  { city: "Dallas", url: "https://dallascityhall.com/departments/waterutilities/Pages/water-quality-reports.aspx", label: "Dallas Water Utilities" },
  { city: "Fort Worth", url: "https://www.fortworthtexas.gov/departments/water/water-quality", label: "Fort Worth Water" },
  { city: "Frisco", url: "https://www.friscotexas.gov/1350/Water-Quality", label: "City of Frisco Water" },
  { city: "Plano", url: "https://www.plano.gov/328/Water-Quality", label: "City of Plano Water Quality" },
];

export default function WaterQualityGuide() {
  const [selectedSolution, setSelectedSolution] = useState<number | null>(null);

  const maxPpm = Math.max(...CITY_HARDNESS.map(c => c.ppm));

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4″>
            <Droplets className="text-blue-400 w-8 h-8″ />
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">DFW Water Quality Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6″>
            DFW Water Quality —<br />What's in Your Tap Water
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            DFW tap water is safe to drink — but it is among the hardest in the United States.
            That hardness damages appliances, clogs pipes, and costs homeowners hundreds per year.
            Here's what’s in your water and what to do about it.
          </p>
        </section>

        {/* City Hardness Chart */}
        <section className="py-14 px-6 bg-[#0F1E35]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-2″>Water Hardness by DFW City</h2>
            <p className="text-slate-400 mb-8″>Measured in Parts Per Million (PPM) of calcium carbonate. Anything above 180 PPM is considered "Hard."</p>
            <div className="space-y-4″>
              {CITY_HARDNESS.map(c => (
                <div key={c.city} className="flex items-center gap-4″>
                  <div className="w-28 text-slate-200 font-semibold">{c.city}</div>
                  <div className="flex-1 bg-slate-800 rounded-full h-7 relative overflow-hidden">
                    <div
                      className={`${c.color} h-full rounded-full flex items-center px-3 text-white text-sm font-bold transition-all`}
                      style={{ width: `${(c.ppm / maxPpm) * 100}%` }}
                    >
                      {c.ppm} PPM
                    </div>
                  </div>
                  <div className="w-28 text-right">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      c.ppm >= 350 ? "bg-red-900 text-red-300″ :
                      c.ppm >= 250 ? "bg-orange-900 text-orange-300″ :
                      "bg-yellow-900 text-yellow-300″
                    }`}>{c.level}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm mt-6″>EPA guideline: ≤500 PPM (secondary standard, not enforceable). WHO guideline: ≤500 PPM. "Ideal" drinking water: 60–120 PPM.</p>
          </div>
        </section>

        {/* What Hardness Does */}
        <section className="py-14 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2″>What Hard Water Does to Your Home</h2>
          <p className="text-slate-400 mb-8″>Hard water isn't just a nuisance — it's a slow, expensive problem.</p>
          <div className="grid md:grid-cols-2 gap-6″>
            {DAMAGE.map(d => (
              <div key={d.appliance} className="bg-[#0F1E35] rounded-2xl p-6 flex gap-4″>
                <div className="text-3xl">{d.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1″>{d.appliance}</h3>
                  <p className="text-slate-400 text-sm">{d.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testing */}
        <section className="py-14 px-6 bg-[#0F1E35]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-2″>How to Test Your Water</h2>
            <p className="text-slate-400 mb-8″>Before buying any treatment system, know what's actually in your water.</p>
            <div className="grid md:grid-cols-3 gap-6″>
              {[
                { title: "Free City Test Kit", desc: "Most DFW utilities offer free annual water test strips. Call your city utility and ask.", cost: "Free", icon: "🏙️" },
                { title: "Home Depot Strip Test", desc: "Multi-parameter strips test hardness, pH, chlorine, iron, and nitrates in seconds.", cost: "$12–$18″, icon: "🏠" },
                { title: "Lab Test", desc: "Mail-in lab kits test 100+ contaminants including lead, PFAS, bacteria, and heavy metals.", cost: "$35–$150″, icon: "🔬" },
              ].map(t => (
                <div key={t.title} className="bg-[#0A1628] rounded-2xl p-6″>
                  <div className="text-3xl mb-3″>{t.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-1″>{t.title}</h3>
                  <p className="text-slate-400 text-sm mb-3″>{t.desc}</p>
                  <span className="text-green-400 font-semibold text-sm">{t.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-14 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2″>Solutions — Ranked by Cost</h2>
          <p className="text-slate-400 mb-8″>Click any solution for details. Only water softeners address hardness; filters address other contaminants.</p>
          <div className="grid md:grid-cols-2 gap-6″>
            {SOLUTIONS.map((s, i) => (
              <div
                key={s.name}
                onClick={() => setSelectedSolution(selectedSolution === i ? null : i)}
                className={`rounded-2xl p-6 border cursor-pointer transition-all ${
                  selectedSolution === i
                    ? "border-blue-500 bg-blue-900/20″
                    : "border-slate-700 bg-[#0F1E35] hover:border-slate-500″
                }`}
              >
                <div className="flex items-start justify-between mb-3″>
                  <div className="flex items-center gap-3″>
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{s.name}</h3>
                      <div className="text-blue-400 font-semibold text-sm">{s.cost}</div>
                    </div>
                  </div>
                  {s.hardness && (
                    <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded font-semibold">Fixes Hardness</span>
                  )}
                </div>
                {selectedSolution === i && (
                  <div className="mt-4 pt-4 border-t border-slate-700 text-sm text-slate-300 space-y-2″>
                    <p><strong className="text-white">Solves:</strong> {s.solves}</p>
                    <p><strong className="text-white">Ongoing cost:</strong> {s.ongoing}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* City Reports */}
        <section className="py-14 px-6 bg-[#0F1E35]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-2″>Official City Water Quality Reports</h2>
            <p className="text-slate-400 mb-8″>All DFW cities publish annual Consumer Confidence Reports (CCR) required by the EPA.</p>
            <div className="grid md:grid-cols-2 gap-4″>
              {CITY_REPORTS.map(r => (
                <a key={r.city} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#0A1628] rounded-xl p-4 hover:border-blue-500 border border-slate-700 transition-colors group">
                  <div>
                    <div className="text-white font-semibold">{r.city}</div>
                    <div className="text-slate-400 text-sm">{r.label}</div>
                  </div>
                  <ExternalLink className="text-slate-500 group-hover:text-blue-400 w-4 h-4″ />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-900/40 to-[#0A1628]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4″>Schedule a Water Quality Inspection</h2>
            <p className="text-slate-300 mb-8″>A TrustyPro plumbing specialist can test your water on-site, recommend the right treatment system, and install it — all in one visit.</p>
            <a href="/apply" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
              Find a Water Quality Pro <ChevronRight className="w-5 h-5″ />
            </a>
          </div>
        </section>
      </div>
    </HomeownerLayout>
  );
}
