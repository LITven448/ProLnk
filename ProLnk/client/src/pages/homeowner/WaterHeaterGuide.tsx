import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { CheckCircle, AlertCircle, XCircle, Droplets, Flame, Zap, Phone, Calendar, DollarSign, Award } from "lucide-react";

const checks = [
  { label: "Temperature set to 120°F", status: "ok" },
  { label: "Pressure relief valve tested", status: "warn" },
  { label: "Anode rod checked (every 3-5 years)", status: "bad" },
  { label: "Tank flushed this year", status: "bad" },
  { label: "Insulation jacket installed", status: "ok" },
  { label: "No rust or corrosion visible", status: "ok" },
];

const replacementOptions = [
  { type: "Standard Tank", cost: "$800 – $1,500", pros: "Low upfront cost, easy replacement, widely serviced", cons: "Higher energy bills, runs out of hot water", icon: Droplets },
  { type: "Tankless / On-Demand", cost: "$1,500 – $3,500", pros: "Endless hot water, 20% more efficient, longer lifespan (20+ yrs)", cons: "Higher install cost, needs gas line upgrade", icon: Flame },
  { type: "Heat Pump Hybrid", cost: "$1,200 – $3,000", pros: "60% more efficient than standard, qualifies for rebates", cons: "Needs 10 sq ft clearance, slower recovery", icon: Zap },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "ok") return <CheckCircle className="w-5 h-5 text-emerald-400" />;
  if (status === "warn") return <AlertCircle className="w-5 h-5 text-amber-400" />;
  return <XCircle className="w-5 h-5 text-red-400" />;
}

export default function WaterHeaterGuide() {
  const [checked, setChecked] = useState<Set<number>>(new Set([0, 4, 5]));

  const toggle = (i: number) =>
    setChecked(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Water Heater Guide</h1>
          <p className="text-slate-400 mt-1">Never run out of hot water</p>
        </div>

        {/* Your unit card */}
        <div className="bg-[#1A2942] border border-[#2A3F5F] rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 space-y-1">
            <p className="text-xs text-slate-400 uppercase tracking-wide">Your Water Heater</p>
            <p className="text-white font-semibold text-lg">40-Gallon Gas — Bradford White</p>
            <p className="text-slate-300">Installed 2016 · <span className="text-amber-400 font-medium">9 years old</span></p>
            <p className="text-slate-400 text-sm">Avg lifespan: 10–15 years · <span className="text-red-400">Anode rod service overdue</span></p>
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30 font-medium">Service Recommended</span>
          </div>
        </div>

        {/* DFW Water Quality */}
        <div className="bg-[#1A2942] border border-blue-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-blue-400" />
            <h2 className="text-white font-semibold">DFW Water Quality Alert</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            DFW has <span className="text-white font-medium">very hard water (300–500 PPM)</span>. Hard water dramatically reduces water heater lifespan — mineral scale builds up inside the tank and reduces efficiency by up to 30%. <span className="text-blue-300">Flush annually to remove scale and extend life by 3–5 years.</span>
          </p>
        </div>

        {/* Annual Maintenance Checklist */}
        <div className="bg-[#1A2942] border border-[#2A3F5F] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-400" />
              <h2 className="text-white font-semibold">Annual Maintenance Checklist</h2>
            </div>
            <span className="text-xs text-slate-400">{checked.size}/{checks.length} complete</span>
          </div>
          <div className="space-y-3">
            {checks.map((c, i) => (
              <div
                key={i}
                onClick={() => toggle(i)}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#0F1E35] cursor-pointer hover:bg-[#162438] transition-colors"
              >
                <StatusIcon status={checked.has(i) ? "ok" : c.status} />
                <span className={`text-sm flex-1 ${checked.has(i) ? "text-slate-400 line-through" : "text-slate-200"}`}>{c.label}</span>
                {!checked.has(i) && c.status === "bad" && (
                  <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-300 rounded border border-red-500/30">Overdue</span>
                )}
                {!checked.has(i) && c.status === "warn" && (
                  <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">Due Soon</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Replacement Guide */}
        <div>
          <h2 className="text-white font-semibold text-xl mb-2 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" /> Replacement Guide
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            Consider replacing if: <span className="text-white">8+ years old AND (rusty water / rumbling noises / leaks / high energy bills)</span>. At 10+ years, proactive replacement beats emergency weekend call.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {replacementOptions.map((opt) => (
              <div key={opt.type} className="bg-[#1A2942] border border-[#2A3F5F] rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <opt.icon className="w-5 h-5 text-sky-400" />
                  <h3 className="text-white font-medium">{opt.type}</h3>
                </div>
                <p className="text-2xl font-bold text-emerald-400">{opt.cost}</p>
                <div className="space-y-1 text-xs">
                  <p className="text-emerald-300">✓ {opt.pros}</p>
                  <p className="text-red-300">✗ {opt.cons}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Texas Rebates */}
        <div className="bg-[#1A2942] border border-emerald-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h2 className="text-white font-semibold">Texas Utility Rebates</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-[#0F1E35] rounded-lg p-3">
              <p className="text-white font-medium">Oncor Electric</p>
              <p className="text-emerald-400 font-bold text-lg">$300 rebate</p>
              <p className="text-slate-400">Heat pump water heaters</p>
            </div>
            <div className="bg-[#0F1E35] rounded-lg p-3">
              <p className="text-white font-medium">AEP Texas</p>
              <p className="text-emerald-400 font-bold text-lg">$100 rebate</p>
              <p className="text-slate-400">Qualifying energy-efficient units</p>
            </div>
          </div>
        </div>

        {/* Emergency */}
        <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-1">
            <Phone className="w-5 h-5 text-red-400" />
            <h2 className="text-red-300 font-semibold">Emergency: No Hot Water?</h2>
          </div>
          <p className="text-slate-300 text-sm">
            <span className="text-white font-medium">Gas unit:</span> Check pilot light — relight per label instructions.&nbsp;
            <span className="text-white font-medium">Electric unit:</span> Check breaker box — reset 240V double breaker.&nbsp;
            Still nothing? Call a plumber. A water heater service call is typically $75–$150 diagnosis.
          </p>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <button className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Schedule Water Heater Service
          </button>
          <button className="border border-[#2A3F5F] text-slate-300 hover:text-white px-6 py-3 rounded-xl transition-colors">
            Get Replacement Quotes
          </button>
        </div>
      </div>
    </HomeownerLayout>
  );
}
