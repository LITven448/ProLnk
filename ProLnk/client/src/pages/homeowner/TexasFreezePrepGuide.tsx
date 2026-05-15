import { useState } from 'react';
import HomeownerLayout from "@/components/HomeownerLayout";
import { Snowflake, ChevronRight, CheckCircle, AlertTriangle, Zap, Wrench } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
  category: string;
}

const CHECKLIST: ChecklistItem[] = [
  { id: "pipes_wrapped", label: "All exposed pipes wrapped with heat tape or pipe insulation", detail: "Focus on pipes in exterior walls, garage, and crawl space. Foam insulation tubes cost $2–5 each at hardware stores.", category: "pipes" },
  { id: "faucet_covers", label: "Outdoor faucet covers installed on all hose bibs", detail: "Foam covers cost $3–6 each. Also disconnect hoses — a connected hose traps water and causes freeze damage even with a cover.", category: "pipes" },
  { id: "main_shutoff", label: "Water main shutoff location known and valve tested", detail: "Usually near the meter at street or inside garage. Turn it off and on annually so it does not seize. Know this BEFORE a freeze.", category: "emergency" },
  { id: "pool_pump", label: "Pool pump winterized or set to run continuously during freeze", detail: "Set pump to run at low speed during freeze events. Do NOT cover pool — circulation is your protection.", category: "pool" },
  { id: "irrigation", label: "Irrigation system winterized / blown out by October", detail: "Hire a pro with a compressor to blow out lines. Residual water in valves and heads will crack them at 28°F or below.", category: "outdoor" },
  { id: "wall_insulation", label: "Exterior wall insulation gaps sealed (attic, crawl space vents)", detail: "Close crawl space vents. Add insulation to attic hatch. Seal gaps around pipes entering from outside with expanding foam.", category: "insulation" },
  { id: "cabinet_doors", label: "Know to open cabinet doors under sinks during freeze", detail: "Open cabinet doors under all sinks on exterior walls to allow warm air to reach pipes.", category: "during" },
  { id: "faucet_drip", label: "Know which faucets to drip during a hard freeze", detail: "At 20°F or below, let a thin stream (pencil-width) of water drip from faucets on exterior walls.", category: "during" },
];

const GENERATOR_OPTIONS = [
  { type: "Portable Generator (Gas)", size: "5,000–7,500W", cost: "$600–$1,200", powers: "Refrigerator, furnace fan, lights, phone charging", cons: "Must run outside — CO risk. Fuel supply uncertainty during storms.", icon: "⛽" },
  { type: "Whole-Home Standby (Natural Gas)", size: "14,000–22,000W", cost: "$4,000–$10,000 installed", powers: "Entire home including HVAC", cons: "High cost. Depends on nat gas supply (which failed in Uri).", icon: "🏭" },
  { type: "Propane Standby", size: "12,000–20,000W", cost: "$5,000–$12,000 installed", powers: "Entire home including HVAC", cons: "Requires large propane tank. But propane did NOT fail in Uri.", icon: "🟠" },
  { type: "Battery Backup (Tesla Powerwall)", size: "13.5 kWh / 5kW continuous", cost: "$11,500 installed", powers: "Fridge, lights, phone, medical devices — 8–24 hrs", cons: "No HVAC support. Best paired with solar.", icon: "🔋" },
];

export default function TexasFreezePrepGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const score = Object.values(checked).filter(Boolean).length;
  const total = CHECKLIST.length;
  const pct = Math.round((score / total) * 100);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Snowflake className="text-blue-300 w-8 h-8" />
            <span className="text-blue-300 font-semibold text-sm uppercase tracking-widest">Texas Freeze Prep Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Texas Freeze Prep Guide —<br />Never Repeat February 2021
          </h1>
          <div className="bg-red-900/30 border border-red-700/50 rounded-2xl p-6 max-w-3xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-400 w-6 h-6 shrink-0 mt-1" />
              <div>
                <p className="text-red-300 font-semibold text-lg mb-1">Winter Storm Uri — February 2021</p>
                <p className="text-slate-300">
                  Uri caused <strong className="text-white">$195 billion in damage</strong> — the costliest Texas disaster in recorded history.
                  <strong className="text-white"> 246 Texans died.</strong> Millions lost power for days at temperatures below 10°F.
                  Most home damage was <strong className="text-white">entirely preventable</strong> with a few hours of preparation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Checklist */}
        <section className="py-14 px-6 bg-[#0F1E35]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Freeze Prep Checklist</h2>
            <p className="text-slate-400 mb-6">Check off each item. Complete before the first freeze warning.</p>

            {/* Score */}
            <div className="bg-[#0A1628] rounded-2xl p-5 mb-8 flex items-center gap-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${pct === 100 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</div>
                <div className="text-slate-400 text-sm">Ready</div>
              </div>
              <div className="flex-1">
                <div className="bg-slate-800 rounded-full h-4 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${pct === 100 ? "bg-green-500" : pct >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${pct}%` }} />
                </div>
                <div className="text-slate-400 text-sm mt-2">{score} of {total} complete</div>
              </div>
            </div>

            <div className="space-y-3">
              {CHECKLIST.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`rounded-xl p-5 border cursor-pointer transition-all ${
                    checked[item.id]
                      ? "border-green-600 bg-green-900/20"
                      : "border-slate-700 bg-[#0A1628] hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      checked[item.id] ? "border-green-400 bg-green-400" : "border-slate-500"
                    }`}>
                      {checked[item.id] && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <p className={`font-semibold ${checked[item.id] ? "text-green-300 line-through" : "text-white"}`}>{item.label}</p>
                      <p className="text-slate-400 text-sm mt-1">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* During Freeze Protocol */}
        <section className="py-14 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">During a Hard Freeze</h2>
          <p className="text-slate-400 mb-8">When temperatures drop below 20°F, take these steps immediately.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Drip Faucets", desc: "Let a pencil-width stream of both hot and cold water drip from faucets on exterior walls. Moving water resists freezing.", icon: "💧", urgency: "When temp < 20°F" },
              { title: "Open Cabinet Doors", desc: "Under all sinks on exterior walls. Allows warm room air to reach the pipes inside the wall.", icon: "🚪", urgency: "When temp < 28°F" },
              { title: "Keep Heat at 68°F Minimum", desc: "Even if you leave town. Set your thermostat no lower than 68°F to protect pipes. Don't let the house go cold.", icon: "🌡️", urgency: "If you leave home" },
            ].map(step => (
              <div key={step.title} className="bg-[#0F1E35] rounded-2xl p-6 border border-blue-900/40">
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{step.desc}</p>
                <span className="text-blue-400 text-xs font-semibold bg-blue-900/30 px-2 py-1 rounded">{step.urgency}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Generator Guide */}
        <section className="py-14 px-6 bg-[#0F1E35]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Generator Guide for DFW Homes</h2>
            <p className="text-slate-400 mb-8">A typical DFW home needs 5,000–8,000W to run essentials. Here are your options.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {GENERATOR_OPTIONS.map(g => (
                <div key={g.type} className="bg-[#0A1628] rounded-2xl p-6">
                  <div className="text-3xl mb-3">{g.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{g.type}</h3>
                  <div className="text-blue-400 font-semibold mb-3">{g.cost}</div>
                  <div className="text-sm text-slate-300 space-y-1">
                    <p><strong className="text-white">Output:</strong> {g.size}</p>
                    <p><strong className="text-white">Powers:</strong> {g.powers}</p>
                    <p className="text-red-400 mt-2">⚠ {g.cons}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* If Pipes Burst */}
        <section className="py-14 px-6 max-w-5xl mx-auto">
          <div className="bg-red-900/20 border border-red-700/40 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <Wrench className="w-6 h-6" /> If Your Pipes Burst — Act in This Order
            </h2>
            <ol className="space-y-3">
              {[
                "Turn off the water main IMMEDIATELY. Water damage multiplies every minute.",
                "Document everything with photos and video before cleanup — your insurance requires it.",
                "Call a water restoration company (24/7 emergency). Water mitigation must start within 24–48h to prevent mold.",
                "Call your homeowners insurance within 24 hours. Most policies require prompt notification.",
                "Save all receipts for hotel, meals, and temporary housing — many policies cover additional living expenses.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="bg-red-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                  <p className="text-slate-200">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-900/40 to-[#0A1628]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Find a TrustyPro Emergency Plumber</h2>
            <p className="text-slate-300 mb-8">When pipes burst, every hour costs thousands. TrustyPro connects you with licensed emergency plumbers who operate 24/7 during freeze events.</p>
            <a href="/apply" className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
              Find Emergency Plumber <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </HomeownerLayout>
  );
}
