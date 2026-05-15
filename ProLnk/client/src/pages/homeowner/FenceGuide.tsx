import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, AlertTriangle, XCircle, Wind, Shield, DollarSign,
  FileText, Phone, Info, ChevronRight,
} from "lucide-react";

interface CheckItem {
  id: string;
  label: string;
  status: "ok" | "warn" | "fail";
}

interface FenceType {
  name: string;
  price: string;
  pros: string[];
  cons: string[];
  color: string;
}

const CHECKLIST: CheckItem[] = [
  { id: "1", label: "Posts plumb and secure", status: "ok" },
  { id: "2", label: "No rotting boards", status: "ok" },
  { id: "3", label: "Gates swing freely", status: "warn" },
  { id: "4", label: "Stain/seal applied within 3 years", status: "fail" },
  { id: "5", label: "No storm damage", status: "ok" },
  { id: "6", label: "Bottom boards not touching soil", status: "ok" },
];

const FENCE_TYPES: FenceType[] = [
  {
    name: "Cedar",
    price: "$18–25/lin ft",
    pros: ["Natural look", "Pest resistant", "Takes stain well"],
    cons: ["Requires sealing every 2–3 yrs", "Warps if neglected"],
    color: "border-amber-500",
  },
  {
    name: "Vinyl",
    price: "$20–35/lin ft",
    pros: ["Zero maintenance", "Never rots", "Lifetime warranty common"],
    cons: ["Can crack in cold", "Fades over time", "Higher upfront cost"],
    color: "border-blue-500",
  },
  {
    name: "Aluminum",
    price: "$30–45/lin ft",
    pros: ["Rust-proof", "Elegant look", "Low maintenance"],
    cons: ["Not private", "Dents on impact", "Premium price"],
    color: "border-slate-400",
  },
  {
    name: "Chain-link",
    price: "$10–20/lin ft",
    pros: ["Most affordable", "Extremely durable", "Easy repair"],
    cons: ["No privacy", "Industrial look", "HOA often disallows"],
    color: "border-slate-500",
  },
  {
    name: "Board-on-board",
    price: "$22–30/lin ft",
    pros: ["Full privacy", "Wind resistant", "Classic DFW style"],
    cons: ["Heavier than standard cedar", "More lumber cost"],
    color: "border-teal-500",
  },
];

function StatusIcon({ status }: { status: CheckItem["status"] }) {
  if (status === "ok") return <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />;
  if (status === "warn") return <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />;
  return <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />;
}

export default function FenceGuide() {
  const [checklist, setChecklist] = useState<CheckItem[]>(CHECKLIST);

  function cycleStatus(id: string) {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next: CheckItem["status"] = item.status === "ok" ? "warn" : item.status === "warn" ? "fail" : "ok";
        return { ...item, status: next };
      })
    );
  }

  const okCount = checklist.filter((c) => c.status === "ok").length;
  const warnCount = checklist.filter((c) => c.status === "warn").length;
  const failCount = checklist.filter((c) => c.status === "fail").length;

  return (
    <HomeownerLayout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-white">Fence Guide</h1>
          <p className="text-slate-400 mt-1">Define your space, protect your home</p>
        </div>

        {/* Your Fence */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Your Fence</h2>
                <p className="text-slate-300 mt-1">
                  6ft cedar privacy fence, installed 2019 <span className="text-slate-400">(6 years)</span>
                </p>
                <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <p className="text-amber-300 text-sm font-medium">
                    ⚠️ Seal/stain recommended every 2–3 years — yours is overdue.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DFW Specific */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-teal-400" />
              <h2 className="text-white font-bold">DFW-Specific Considerations</h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <p className="text-slate-300 text-sm">
                  <span className="text-white font-medium">Clay soil causes post movement.</span>{" "}
                  Use concrete footings at least 24&quot; deep — standard for DFW installs.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <p className="text-slate-300 text-sm">
                  <span className="text-white font-medium">Wind storms are the #1 fence killer in DFW.</span>{" "}
                  Board-on-board designs handle wind better than standard flat privacy.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <p className="text-slate-300 text-sm">
                  <span className="text-white font-medium">Summer heat.</span>{" "}
                  UV exposure accelerates wood degradation — seal before summer, not after.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Condition Checklist */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">Fence Condition Checklist</h2>
              <div className="flex gap-3 text-xs">
                <span className="text-green-400">{okCount} OK</span>
                <span className="text-amber-400">{warnCount} Warn</span>
                <span className="text-red-400">{failCount} Fail</span>
              </div>
            </div>
            <div className="space-y-2">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => cycleStatus(item.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-left"
                >
                  <StatusIcon status={item.status} />
                  <span className="text-slate-200 text-sm flex-1">{item.label}</span>
                  <span className="text-xs text-slate-500">tap to change</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">Tap any item to cycle status: OK → Warn → Fail</p>
          </CardContent>
        </Card>

        {/* Fence Type Guide */}
        <div>
          <h2 className="text-white font-bold text-xl mb-4">Fence Type Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FENCE_TYPES.map((ft) => (
              <Card key={ft.name} className={`bg-slate-800 border-2 ${ft.color}`}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold">{ft.name}</h3>
                    <span className="text-teal-400 font-mono text-sm">{ft.price}</span>
                  </div>
                  <div className="space-y-1 mt-3">
                    {ft.pros.map((p) => (
                      <p key={p} className="text-xs text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> {p}
                      </p>
                    ))}
                    {ft.cons.map((c) => (
                      <p key={c} className="text-xs text-slate-400 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> {c}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* HOA Note */}
        <Card className="bg-blue-950/40 border-blue-700/40">
          <CardContent className="p-5">
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">HOA Note</h3>
                <p className="text-slate-300 text-sm">
                  Most DFW HOAs restrict fence height (6ft max) and approved materials. Always check your
                  CC&amp;Rs before replacing. Violations can result in fines or mandatory removal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storm Prep */}
        <Card className="bg-red-950/30 border-red-700/40">
          <CardContent className="p-5">
            <div className="flex gap-3">
              <Wind className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">Storm Prep</h3>
                <p className="text-slate-300 text-sm">
                  Before a storm: check that all gates are latched and no loose or rotting boards remain — they
                  become projectiles at 60+ mph winds common in DFW supercells.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-teal-900/40 to-slate-800 border-teal-600/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">Ready to Repair or Replace?</h3>
                <p className="text-slate-400 text-sm mt-1">Get quotes from licensed fence contractors in DFW.</p>
              </div>
              <Button className="bg-teal-500 hover:bg-teal-400 text-black font-bold flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Get Fence Quotes
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cost Reference */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-teal-400" />
              <h2 className="text-white font-bold">Cost Reference</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700">
                    <th className="pb-2 font-medium">Service</th>
                    <th className="pb-2 font-medium text-right">Typical Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {[
                    ["Board replacement (per board)", "$15–40"],
                    ["Gate repair", "$75–200"],
                    ["Post reset (concrete)", "$150–300"],
                    ["Full stain/seal (per linear ft)", "$1.50–3.50"],
                    ["New fence install (100 lin ft cedar)", "$2,500–4,000"],
                    ["Storm damage repair", "$300–1,200"],
                  ].map(([service, range]) => (
                    <tr key={service}>
                      <td className="py-2 text-slate-300">{service}</td>
                      <td className="py-2 text-teal-400 text-right font-mono">{range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeownerLayout>
  );
}
