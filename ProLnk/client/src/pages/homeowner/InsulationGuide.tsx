import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  CheckCircle, AlertTriangle, XCircle, Home, Thermometer,
  DollarSign, Leaf, Zap, Shield, ArrowRight,
} from "lucide-react";

type CheckStatus = "good" | "warning" | "bad";

interface ChecklistItem {
  id: string;
  label: string;
  status: CheckStatus;
}

interface InsulationType {
  name: string;
  cost: string;
  rValue: string;
  bestFor: string;
  color: string;
}

const CHECKLIST: ChecklistItem[] = [
  { id: "attic", label: "Attic insulation R-38+", status: "warning" },
  { id: "fixtures", label: "No visible gaps around fixtures", status: "good" },
  { id: "hatch", label: "Attic hatch insulated and sealed", status: "bad" },
  { id: "knee", label: "Knee walls insulated", status: "good" },
  { id: "crawl", label: "Crawl space vapor barrier", status: "good" },
  { id: "walls", label: "Walls insulated (new builds only)", status: "good" },
];

const INSULATION_TYPES: InsulationType[] = [
  {
    name: "Blown Cellulose",
    cost: "$1.2–2.0/sq ft",
    rValue: "R-3.2 per inch",
    bestFor: "Attic retrofits",
    color: "text-green-400",
  },
  {
    name: "Fiberglass Batt",
    cost: "$0.9–1.8/sq ft",
    rValue: "R-2.9 per inch",
    bestFor: "Wall cavities",
    color: "text-blue-400",
  },
  {
    name: "Spray Foam",
    cost: "$2.5–4.0/sq ft",
    rValue: "R-6.5 per inch",
    bestFor: "Air sealing + insulation",
    color: "text-purple-400",
  },
  {
    name: "Rigid Foam",
    cost: "$1.5–3.0/sq ft",
    rValue: "R-5.0 per inch",
    bestFor: "Basement walls",
    color: "text-amber-400",
  },
];

function StatusIcon({ status }: { status: CheckStatus }) {
  if (status === "good") return <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />;
  if (status === "warning") return <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />;
  return <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />;
}

function statusBg(status: CheckStatus) {
  if (status === "good") return "border-green-700/40 bg-green-900/10";
  if (status === "warning") return "border-amber-700/40 bg-amber-900/10";
  return "border-red-700/40 bg-red-900/10";
}

function statusLabel(status: CheckStatus) {
  if (status === "good") return <span className="text-green-400 text-xs font-medium">✓ Good</span>;
  if (status === "warning") return <span className="text-amber-400 text-xs font-medium">⚠ Needs Upgrade</span>;
  return <span className="text-red-400 text-xs font-medium">✗ Action Required</span>;
}

function calcSavings(rValue: number): { savings: number; payback: number } {
  const baseline = 420;
  const factor = Math.max(0, (rValue - 30)) / 19;
  const savings = Math.round(baseline * factor);
  const cost = Math.round(savings > 0 ? (savings * 9) : 0);
  const payback = savings > 0 ? Math.round((cost / savings) * 10) / 10 : 0;
  return { savings, payback };
}

export default function InsulationGuide() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    Object.fromEntries(CHECKLIST.map((i) => [i.id, i.status === "good"]))
  );
  const [rSlider, setRSlider] = useState(30);
  const { savings, payback } = calcSavings(rSlider);

  const toggleItem = (id: string) => setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));

  const completed = Object.values(checklist).filter(Boolean).length;
  const total = CHECKLIST.length;

  return (
    <HomeownerLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-900/40 to-amber-900/30 border border-orange-700/40 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Insulation Guide</h1>
              <p className="text-orange-300 text-sm">Your #1 energy efficiency upgrade</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm mt-4 leading-relaxed">
            Proper insulation is the single highest-ROI home upgrade in DFW. Most homes built to minimum code
            leave hundreds of dollars on the table every year through the attic alone.
          </p>
        </div>

        {/* Your Home */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Home className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-semibold text-white">Your Home</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-slate-400 text-xs mb-1">Size</div>
              <div className="text-white font-semibold">2,400 sq ft</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-slate-400 text-xs mb-1">Built</div>
              <div className="text-white font-semibold">2015</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-slate-400 text-xs mb-1">Attic R-Value</div>
              <div className="text-amber-400 font-semibold">R-30 (est.)</div>
            </div>
          </div>
          <div className="mt-4 bg-amber-900/20 border border-amber-700/40 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-200 text-sm">
                <span className="font-semibold">Below optimal.</span> DFW Climate Zone 3 recommends R-38 to R-49 for maximum efficiency.
                Your current R-30 is meeting minimum code but leaving energy savings on the table.
              </p>
            </div>
          </div>
        </div>

        {/* DFW Context */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-white">DFW Climate Context</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-teal-400 mb-1">Zone 3</div>
              <div className="text-slate-400 text-xs">IECC Climate Zone</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">25–35%</div>
              <div className="text-slate-400 text-xs">Cooling savings with R-49</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">R-25</div>
              <div className="text-slate-400 text-xs">Most DFW homes (code min)</div>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            DFW sits in Climate Zone 3. Attic insulation is the highest-ROI upgrade — saves 25–35% on cooling.
            Most DFW homes were built to minimum code (R-25), well below optimal. The summer heat load through
            an under-insulated attic is the primary driver of high electric bills from June through September.
          </p>
        </div>

        {/* Insulation Checklist */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-white">Insulation Checklist</h2>
              <p className="text-slate-400 text-sm mt-1">Click items to toggle your status</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-400">{completed}/{total}</div>
              <div className="text-slate-400 text-xs">passing</div>
            </div>
          </div>
          <div className="space-y-3">
            {CHECKLIST.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center gap-4 border rounded-xl p-4 text-left transition-colors hover:brightness-110 ${statusBg(item.status)}`}
              >
                <StatusIcon status={item.status} />
                <span className="flex-1 text-slate-200 text-sm">{item.label}</span>
                {statusLabel(item.status)}
              </button>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-semibold text-white">ROI Calculator</h2>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-slate-300 text-sm">Current R-Value</label>
              <span className="text-white font-bold text-lg">R-{rSlider}</span>
            </div>
            <input
              type="range"
              min={15}
              max={50}
              value={rSlider}
              onChange={(e) => setRSlider(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>R-15 (low)</span>
              <span>R-38 (recommended)</span>
              <span>R-50 (max)</span>
            </div>
          </div>
          {savings > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-700/40 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">${savings}/yr</div>
                <div className="text-slate-400 text-sm">Estimated annual savings</div>
                <div className="text-slate-500 text-xs mt-1">Upgrading from R-{rSlider} to R-49</div>
              </div>
              <div className="bg-teal-900/20 border border-teal-700/40 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-teal-400 mb-1">{payback} yrs</div>
                <div className="text-slate-400 text-sm">Estimated payback period</div>
                <div className="text-slate-500 text-xs mt-1">At typical DFW installation cost</div>
              </div>
            </div>
          ) : (
            <div className="bg-teal-900/20 border border-teal-700/40 rounded-xl p-5 text-center">
              <div className="text-teal-400 font-semibold">Already at optimal R-value!</div>
              <div className="text-slate-400 text-sm mt-1">Your insulation is performing at peak efficiency.</div>
            </div>
          )}
        </div>

        {/* Insulation Types */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Leaf className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-semibold text-white">Insulation Types</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INSULATION_TYPES.map((t) => (
              <div key={t.name} className="bg-slate-800/50 rounded-xl p-5">
                <div className={`font-semibold mb-1 ${t.color}`}>{t.name}</div>
                <div className="text-xs text-slate-400 space-y-1 mt-2">
                  <div className="flex justify-between"><span>Cost:</span><span className="text-slate-300">{t.cost}</span></div>
                  <div className="flex justify-between"><span>R-Value:</span><span className="text-slate-300">{t.rValue}</span></div>
                  <div className="flex justify-between"><span>Best for:</span><span className="text-slate-300">{t.bestFor}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax Credit */}
        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-700/40 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-semibold mb-1">Federal Tax Credit Available</div>
              <div className="text-green-300 text-sm leading-relaxed">
                30% Federal tax credit on insulation upgrades through 2032 (Inflation Reduction Act).
                On a $3,000 attic insulation job, that's <span className="font-bold text-green-200">$900 back</span> at tax time.
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-900/40 to-cyan-900/30 border border-teal-700/40 rounded-2xl p-8 text-center">
          <Thermometer className="w-10 h-10 text-teal-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Ready to Cut Your Energy Bills?</h3>
          <p className="text-slate-400 text-sm mb-6">
            Get up to 3 quotes from certified DFW insulation contractors. Average homeowner saves $420/year.
          </p>
          <button className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-3 rounded-xl flex items-center gap-2 mx-auto transition-colors">
            Get Insulation Quotes
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </HomeownerLayout>
  );
}
