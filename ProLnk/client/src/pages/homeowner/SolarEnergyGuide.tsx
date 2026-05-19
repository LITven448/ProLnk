import { useState } from 'react';
import HomeownerLayout from "@/components/HomeownerLayout";
import { Sun, Zap, DollarSign, Shield, Battery, ChevronRight, CheckCircle, AlertTriangle } from "lucide-react";

const UTILITY_NOTES = [
  { utility: "Oncor", policy: "No net metering — Retail Electric Provider sets buyback rate", rating: "Fair" },
  { utility: "AEP Texas", policy: "Limited net metering, rate varies by REP contract", rating: "Fair" },
  { utility: "Garland Power", policy: "Offers 1:1 net metering credit", rating: "Good" },
  { utility: "Denton MUD", policy: "Full retail net metering available", rating: "Best" },
  { utility: "Irving", policy: "Credit at avoided cost (~4¢/kWh) — lower than retail", rating: "Low" },
];

const BATTERY_COMPARE = [
  { name: "Tesla Powerwall 3", capacity: "13.5 kWh", cost: "$11,500 installed", pros: "All-in-one inverter, app control", cons: "Long lead times", best: "Whole-home backup" },
  { name: "Enphase IQ Battery 10T", capacity: "10.1 kWh", cost: "$9,800 installed", pros: "Modular, reliable, AC-coupled", cons: "Lower round-trip efficiency", best: "Existing solar systems" },
  { name: "Franklin WH5000", capacity: "13.6 kWh", cost: "$8,500 installed", pros: "Fast charge, good warranty", cons: "Newer brand", best: "Budget-conscious buyers" },
];

export default function SolarEnergyGuide() {
  const [monthlyBill, setMonthlyBill] = useState(180);
  const [systemKw, setSystemKw] = useState(8);

  const systemCost = systemKw * 3000;
  const federalCredit = systemCost * 0.30;
  const netCost = systemCost - federalCredit;
  const annualSavings = Math.round((systemKw / 8) * 1400);
  const paybackYears = Math.round(netCost / annualSavings);
  const twentyYearReturn = annualSavings * 20 - netCost;

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sun className="text-yellow-400 w-8 h-8" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-widest">DFW Solar Guide 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Solar in DFW —<br />Is It Worth It for Texas Homeowners?
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            DFW gets <strong className="text-white">234 sunny days per year</strong> — more than Los Angeles. But grid tie-in rules, hail risk,
            and post-Uri battery demand make solar decisions here more nuanced than anywhere in America. Here's the full picture.
          </p>
        </section>

        {/* DFW Stats Strip */}
        <section className="bg-[#0F1E35] py-10 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Sunny Days/Year", value: "234", icon: "☀️" },
              { label: "Avg System Size", value: "8 kW", icon: "⚡" },
              { label: "Avg System Cost", value: "$24,000", icon: "💰" },
              { label: "Avg Annual Savings", value: "$1,400", icon: "📉" },
            ].map(s => (
              <div key={s.label} className="bg-[#0A1628] rounded-xl p-5">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl font-bold text-yellow-400">{s.value}</div>
                <div className="text-slate-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Federal Tax Credit */}
        <section className="py-14 px-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-700/10 border border-yellow-600/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <DollarSign className="text-yellow-400 w-8 h-8 mt-1 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-yellow-400 mb-2">Federal Investment Tax Credit (ITC)</h2>
                <p className="text-slate-200 text-lg mb-4">
                  The 30% federal ITC runs through <strong>2032</strong>. On a $24,000 system, that's <strong className="text-yellow-400">$7,200 back on your taxes</strong>.
                  This is a dollar-for-dollar credit against what you owe — not a deduction.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-4 h-4" /> Must own (not lease) the system</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-4 h-4" /> Applies to panels, inverter, battery, and installation labor</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-4 h-4" /> Can carry unused credit forward to future tax years</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="text-yellow-400 w-4 h-4" /> Rate drops to 26% in 2033 and 22% in 2034</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Payback Calculator */}
        <section className="py-14 px-6 bg-[#0F1E35]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Payback Calculator</h2>
            <p className="text-slate-400 mb-10">Adjust the sliders to match your home.</p>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <label className="text-slate-300 text-sm font-medium block mb-2">Monthly Electric Bill</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min={50} max={500} value={monthlyBill}
                      onChange={e => setMonthlyBill(Number(e.target.value))}
                      className="w-full accent-yellow-400" />
                    <span className="text-yellow-400 font-bold text-xl w-20 text-right">${monthlyBill}</span>
                  </div>
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium block mb-2">System Size (kW)</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min={4} max={20} value={systemKw}
                      onChange={e => setSystemKw(Number(e.target.value))}
                      className="w-full accent-yellow-400" />
                    <span className="text-yellow-400 font-bold text-xl w-20 text-right">{systemKw} kW</span>
                  </div>
                </div>
                <div className="bg-[#0A1628] rounded-xl p-4 text-sm text-slate-400">
                  <p>Typical DFW home: 8–12 kW system. Single-story 1,800 sqft = ~8 kW. 2-story 3,000 sqft = ~12 kW.</p>
                </div>
              </div>
              <div className="bg-[#0A1628] rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-200">Your Estimate</h3>
                {[
                  { label: "Gross System Cost", value: `$${systemCost.toLocaleString()}` },
                  { label: "Federal Tax Credit (30%)", value: `-$${federalCredit.toLocaleString()}`, highlight: true },
                  { label: "Net Cost to You", value: `$${netCost.toLocaleString()}`, bold: true },
                  { label: "Estimated Annual Savings", value: `$${annualSavings.toLocaleString()}/yr` },
                  { label: "Payback Period", value: `${paybackYears} years`, bold: true },
                  { label: "20-Year Net Return", value: `$${twentyYearReturn.toLocaleString()}`, positive: true },
                ].map(row => (
                  <div key={row.label} className={`flex justify-between py-2 border-b border-slate-800 ${row.bold ? "font-bold text-white" : "text-slate-300"}`}>
                    <span>{row.label}</span>
                    <span className={row.highlight ? "text-green-400" : row.positive ? "text-yellow-400" : ""}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Net Metering by Utility */}
        <section className="py-14 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Net Metering in Texas</h2>
          <p className="text-slate-400 mb-8">Texas has no statewide net metering mandate. Your utility or Retail Electric Provider determines how much you get paid for excess power.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 text-slate-400">Utility</th>
                  <th className="text-left py-3 text-slate-400">Net Metering Policy</th>
                  <th className="text-left py-3 text-slate-400">Rating</th>
                </tr>
              </thead>
              <tbody>
                {UTILITY_NOTES.map(u => (
                  <tr key={u.utility} className="border-b border-slate-800">
                    <td className="py-3 font-semibold text-white">{u.utility}</td>
                    <td className="py-3 text-slate-300">{u.policy}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        u.rating === "Best" ? "bg-green-900 text-green-300" :
                        u.rating === "Good" ? "bg-blue-900 text-blue-300" :
                        u.rating === "Fair" ? "bg-yellow-900 text-yellow-300" :
                        "bg-red-900 text-red-300"
                      }`}>{u.rating}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hail Risk */}
        <section className="py-14 px-6 bg-[#0F1E35]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-4 bg-red-900/20 border border-red-700/40 rounded-2xl p-8">
              <Shield className="text-red-400 w-8 h-8 shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-red-400 mb-3">DFW Hail Risk — Non-Negotiable</h2>
                <p className="text-slate-200 mb-4">
                  DFW is in "Hail Alley" — one of the highest-frequency large hail zones in North America.
                  Your solar panels <strong>must be rated for 1.25" hail minimum</strong>.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-4 h-4" /> Ask for <strong className="text-white">IEC 61215 certification</strong> — standard hail impact rating</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-4 h-4" /> Premium: <strong className="text-white">IEC 61215 Class D</strong> (2" hail resistance)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-4 h-4" /> Confirm panels are included in your homeowners insurance policy</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="text-yellow-400 w-4 h-4" /> Avoid frameless panels — they are more vulnerable to hail edge damage</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Battery Storage */}
        <section className="py-14 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Battery Storage — Texas Freeze Resilience</h2>
          <p className="text-slate-400 mb-8">Winter Storm Uri (2021) exposed the weakness of grid-tied solar: when the grid goes down, so do your panels — even in sunshine. Battery backup changes that equation.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {BATTERY_COMPARE.map(b => (
              <div key={b.name} className="bg-[#0F1E35] rounded-2xl p-6 border border-slate-700">
                <Battery className="text-yellow-400 w-6 h-6 mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">{b.name}</h3>
                <div className="text-yellow-400 font-semibold text-sm mb-3">{b.cost}</div>
                <div className="text-slate-400 text-sm space-y-1">
                  <p><strong className="text-slate-200">Capacity:</strong> {b.capacity}</p>
                  <p><strong className="text-slate-200">Best for:</strong> {b.best}</p>
                  <p className="text-green-400">✓ {b.pros}</p>
                  <p className="text-red-400">✗ {b.cons}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-6">Grid-tied systems (no battery) are 30-40% cheaper but provide zero backup during outages. In DFW, battery storage is worth serious consideration given freeze and storm risk.</p>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gradient-to-r from-yellow-900/40 to-[#0A1628]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Find a Verified DFW Solar Pro</h2>
            <p className="text-slate-300 mb-8">TrustyPro connects you with licensed, insured solar installers who know DFW hail requirements and net metering nuances.</p>
            <a href="/apply" className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-colors">
              Get Solar Quotes <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </HomeownerLayout>
  );
}
