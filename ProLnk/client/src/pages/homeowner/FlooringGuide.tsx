import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, AlertTriangle, XCircle, DollarSign, Layers,
  Thermometer, Droplets, ChevronDown, ChevronUp, Phone,
} from "lucide-react";

interface FlooringType {
  name: string;
  tag: string;
  dfwRating: number;
  costLow: number;
  costHigh: number;
  durability: string;
  maintenance: string;
  diy: string;
  note: string;
  color: string;
}

interface CheckItem {
  id: string;
  label: string;
  status: "ok" | "warn" | "bad";
}

interface CostRow {
  type: string;
  range: string;
}

const FLOORING_TYPES: FlooringType[] = [
  {
    name: "Engineered Hardwood",
    tag: "Best for DFW",
    dfwRating: 5,
    costLow: 6,
    costHigh: 14,
    durability: "High",
    maintenance: "Low",
    diy: "Medium",
    note: "Designed for humidity swings — 3-layer construction resists expansion better than solid wood.",
    color: "#F5E642",
  },
  {
    name: "LVP / LVT",
    tag: "Most Durable",
    dfwRating: 5,
    costLow: 3,
    costHigh: 7,
    durability: "Very High",
    maintenance: "Very Low",
    diy: "Easy",
    note: "100% waterproof, rigid core absorbs minor subfloor movement. Top choice for active households.",
    color: "#3b82f6",
  },
  {
    name: "Tile",
    tag: "Wet Areas",
    dfwRating: 4,
    costLow: 7,
    costHigh: 15,
    durability: "Very High",
    maintenance: "Medium",
    diy: "Hard",
    note: "Ideal for kitchens and baths. DFW foundation movement can crack grout — use flexible grout.",
    color: "#22c55e",
  },
  {
    name: "Carpet",
    tag: "Bedrooms",
    dfwRating: 3,
    costLow: 3,
    costHigh: 8,
    durability: "Medium",
    maintenance: "High",
    diy: "Hard",
    note: "Traps allergens in DFW cedar/ragweed season. Annual deep cleaning essential.",
    color: "#a855f7",
  },
  {
    name: "Solid Hardwood",
    tag: "Use Caution",
    dfwRating: 2,
    costLow: 8,
    costHigh: 20,
    durability: "High",
    maintenance: "High",
    diy: "Very Hard",
    note: "DFW humidity swings from 20% to 80% cause significant expansion and gapping. Requires humidifier in winter.",
    color: "#ef4444",
  },
];

const CHECKLIST: CheckItem[] = [
  { id: "1", label: "Hard floors: No gaps at baseboards", status: "ok" },
  { id: "2", label: "LVP: No moisture infiltration under planks", status: "ok" },
  { id: "3", label: "Tile: Grout sealed annually", status: "warn" },
  { id: "4", label: "Carpet: Deep cleaned annually", status: "bad" },
  { id: "5", label: "Area rugs: Non-slip pads underneath", status: "ok" },
];

const COST_GUIDE: CostRow[] = [
  { type: "LVP Installed", range: "$3 – $7 / sqft" },
  { type: "Tile Installed", range: "$7 – $15 / sqft" },
  { type: "Engineered Hardwood Installed", range: "$6 – $14 / sqft" },
  { type: "Solid Hardwood Installed", range: "$8 – $20 / sqft" },
  { type: "Carpet Installed", range: "$3 – $8 / sqft" },
];

function StatusIcon({ status }: { status: CheckItem["status"] }) {
  if (status === "ok") return <CheckCircle className="w-4 h-4 text-green-400" />;
  if (status === "warn") return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
  return <XCircle className="w-4 h-4 text-red-400" />;
}

function RatingDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i < rating ? "#F5E642" : "#334155" }}
        />
      ))}
    </div>
  );
}

export default function FlooringGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checks, setChecks] = useState<CheckItem[]>(CHECKLIST);

  function toggleCheck(id: string) {
    setChecks((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "ok" ? "bad" : "ok" }
          : c
      )
    );
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white pb-16">
        <div className="max-w-5xl mx-auto px-4 py-10">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-sm text-blue-400 mb-3">
              <Layers className="w-4 h-4" />
              <span>Home Health Vault</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Flooring Guide</h1>
            <p className="text-slate-400 mt-1">Choose what lasts in Texas</p>
          </div>

          {/* DFW Climate Alert */}
          <Card className="bg-amber-900/20 border border-amber-700/40 mb-8">
            <CardContent className="p-5 flex gap-4">
              <Thermometer className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300 mb-1">DFW Climate Considerations</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  DFW's humidity swings (20% in winter to 80% in summer) and foundation movement make flooring
                  choice critical. Hardwood expands and contracts — installation requires DFW climate acclimation
                  of 5–7 days minimum. Foundation movement is the #1 cause of cracked grout lines in DFW homes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Flooring Type Cards */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Flooring Type Comparison</h2>
            <div className="space-y-3">
              {FLOORING_TYPES.map((ft) => (
                <Card key={ft.name} className="bg-[#111C2E] border border-slate-700/50">
                  <CardContent className="p-0">
                    <button
                      className="w-full text-left p-5"
                      onClick={() => setExpanded(expanded === ft.name ? null : ft.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ background: ft.color }}
                          />
                          <div>
                            <p className="font-semibold text-white">{ft.name}</p>
                            <p className="text-xs mt-0.5" style={{ color: ft.color }}>{ft.tag}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="hidden sm:block text-right">
                            <p className="text-xs text-slate-500 mb-1">DFW Suitability</p>
                            <RatingDots rating={ft.dfwRating} />
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-500">Cost / sqft</p>
                            <p className="text-sm font-semibold text-white">
                              ${ft.costLow}–${ft.costHigh}
                            </p>
                          </div>
                          {expanded === ft.name
                            ? <ChevronUp className="w-4 h-4 text-slate-400" />
                            : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </div>
                    </button>

                    {expanded === ft.name && (
                      <div className="px-5 pb-5 border-t border-slate-700/50 pt-4">
                        <p className="text-sm text-slate-300 mb-4">{ft.note}</p>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Durability</p>
                            <p className="text-sm font-medium text-white">{ft.durability}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Maintenance</p>
                            <p className="text-sm font-medium text-white">{ft.maintenance}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">DIY Difficulty</p>
                            <p className="text-sm font-medium text-white">{ft.diy}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Your Flooring */}
          <Card className="bg-[#111C2E] border border-slate-700/50 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Your Flooring</h2>
                <span className="ml-auto text-xs text-slate-500">Est. age: 9 years</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { area: "Bedrooms 2–4", type: "Carpet", color: "#a855f7" },
                  { area: "Living Areas", type: "LVP", color: "#3b82f6" },
                  { area: "Kitchen & Bath", type: "Tile", color: "#22c55e" },
                ].map((row) => (
                  <div key={row.area} className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">{row.area}</p>
                    <p className="font-semibold" style={{ color: row.color }}>{row.type}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Checklist */}
          <Card className="bg-[#111C2E] border border-slate-700/50 mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Maintenance Checklist</h2>
              <div className="space-y-3">
                {checks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className="w-full flex items-center gap-3 text-left hover:bg-slate-700/30 p-2 rounded-lg transition-colors"
                  >
                    <StatusIcon status={item.status} />
                    <span className="text-sm text-slate-200">{item.label}</span>
                    <span className="ml-auto text-xs text-slate-500">
                      {item.status === "ok" ? "✓" : item.status === "warn" ? "⚠" : "✗"}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost Guide */}
          <Card className="bg-[#111C2E] border border-slate-700/50 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-white">DFW Cost Guide</h2>
              </div>
              <div className="space-y-2">
                {COST_GUIDE.map((row) => (
                  <div
                    key={row.type}
                    className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0"
                  >
                    <span className="text-sm text-slate-300">{row.type}</span>
                    <span className="text-sm font-semibold text-green-400">{row.range}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Foundation Note */}
          <Card className="bg-blue-900/20 border border-blue-700/40 mb-10">
            <CardContent className="p-5 flex gap-4">
              <Droplets className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-300 mb-1">Foundation Movement & Grout</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  DFW foundation movement cracks grout lines — this is extremely common in the metroplex.
                  Use flexible (epoxy or polymer-modified) grout in high-movement areas. Re-sealing grout
                  annually prevents moisture infiltration and extends tile life significantly.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-900/40 to-slate-800/40 border border-blue-700/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Need New Flooring?</h3>
            <p className="text-slate-400 text-sm mb-5">
              Get quotes from vetted DFW flooring contractors. Compare prices, read reviews, and book with confidence.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg">
              <Phone className="w-4 h-4 mr-2" />
              Get Flooring Quotes
            </Button>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
