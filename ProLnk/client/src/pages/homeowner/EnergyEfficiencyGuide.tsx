import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Zap, Sun, TrendingDown, CheckCircle, DollarSign, Clock,
  Thermometer, Home, Award, ChevronRight, Wrench, Leaf,
  Wind, Snowflake, Droplets, AlertTriangle,
} from "lucide-react";

type Season = "spring" | "summer" | "fall" | "winter";

interface EfficiencyWin {
  rank: number;
  title: string;
  installCost: string;
  annualSavings: string;
  paybackYears: number;
  paybackLabel: string;
  diy: boolean;
  diyCap: string;
  icon: React.ElementType;
  color: string;
}

const TOP_WINS: EfficiencyWin[] = [
  {
    rank: 1,
    title: "Smart Thermostat",
    installCost: "$150",
    annualSavings: "$180/yr",
    paybackYears: 1.2,
    paybackLabel: "1.2 yr payback",
    diy: true,
    diyCap: "Easy DIY",
    icon: Thermometer,
    color: "text-teal-400",
  },
  {
    rank: 2,
    title: "Attic Insulation (R-38)",
    installCost: "$1,800",
    annualSavings: "$540/yr",
    paybackYears: 3.3,
    paybackLabel: "3.3 yr payback",
    diy: false,
    diyCap: "",
    icon: Home,
    color: "text-blue-400",
  },
  {
    rank: 3,
    title: "Window Film (S/W Faces)",
    installCost: "$400",
    annualSavings: "$220/yr",
    paybackYears: 1.8,
    paybackLabel: "1.8 yr payback",
    diy: true,
    diyCap: "DIY possible",
    icon: Sun,
    color: "text-amber-400",
  },
  {
    rank: 4,
    title: "LED Lighting Swap",
    installCost: "$120",
    annualSavings: "$85/yr",
    paybackYears: 1.4,
    paybackLabel: "1.4 yr payback",
    diy: true,
    diyCap: "DIY easy",
    icon: Zap,
    color: "text-yellow-400",
  },
  {
    rank: 5,
    title: "HVAC Tune-Up + Filter",
    installCost: "$150/yr",
    annualSavings: "Prevents $2,800+ repair",
    paybackYears: 0,
    paybackLabel: "Insurance",
    diy: false,
    diyCap: "",
    icon: Wind,
    color: "text-purple-400",
  },
];

const INCENTIVES = [
  {
    title: "Federal 30% Tax Credit",
    detail: "Solar panels, attic insulation, heat pumps, exterior windows/doors qualify. Claim on Form 5695.",
    value: "Up to 30%",
    color: "border-green-500/30 bg-green-500/5",
    badge: "IRS Form 5695",
    badgeColor: "bg-green-500/20 text-green-300",
  },
  {
    title: "Oncor Smart Thermostat Rebate",
    detail: "Install a qualifying smart thermostat and submit proof to Oncor. Simple online form, 6–8 week processing.",
    value: "$100 rebate",
    color: "border-blue-500/30 bg-blue-500/5",
    badge: "Oncor.com",
    badgeColor: "bg-blue-500/20 text-blue-300",
  },
  {
    title: "City of Frisco Efficiency Rebate",
    detail: "Frisco residents qualify for rebates on insulation, HVAC upgrades, and energy audits. Annual cap: $500/household.",
    value: "$250 rebate",
    color: "border-amber-500/30 bg-amber-500/5",
    badge: "FriscoTexas.gov",
    badgeColor: "bg-amber-500/20 text-amber-300",
  },
];

const SEASONAL_TIPS: Record<Season, { icon: React.ElementType; color: string; tips: string[] }> = {
  spring: {
    icon: Leaf,
    color: "text-green-400",
    tips: [
      "Schedule AC tune-up before May — summer wait times hit 2 weeks in DFW.",
      "Set thermostat to 78°F when home, 85°F when away. Every degree saves ~2% on cooling.",
      "Seal attic hatch and pull-down stairs — they're the biggest uninsulated gap in most DFW homes.",
    ],
  },
  summer: {
    icon: Sun,
    color: "text-amber-400",
    tips: [
      "Run ceiling fans counter-clockwise in summer — it creates a wind-chill effect and lets you raise the thermostat 4°F.",
      "Close south- and west-facing blinds from 10am–4pm. Direct sun is the #1 heat gain driver in Texas summer.",
      "Replace AC filters monthly during July–August — clogged filters freeze coils and cost $800+ to repair.",
    ],
  },
  fall: {
    icon: Wind,
    color: "text-teal-400",
    tips: [
      "Reverse ceiling fans to clockwise to push warm air down from ceilings.",
      "Service your furnace in October — HVAC techs book 2–3 weeks out once the first cold front hits DFW.",
      "Check weatherstripping on all exterior doors. Hold a lit match at corners — movement means cold air leak.",
    ],
  },
  winter: {
    icon: Snowflake,
    color: "text-blue-400",
    tips: [
      "Set water heater to 120°F — most come set to 140°F which wastes 4–22% more energy.",
      "Open south-facing blinds on sunny days and close at sunset — free passive solar heat for Texas winters.",
      "Wrap exposed pipes in garage and crawl space with foam insulation. Uri cost DFW homeowners $3B+ in burst pipes.",
    ],
  },
};

const SEASON_LABELS: { key: Season; label: string }[] = [
  { key: "spring", label: "Spring" },
  { key: "summer", label: "Summer" },
  { key: "fall", label: "Fall" },
  { key: "winter", label: "Winter" },
];

export default function EnergyEfficiencyGuide() {
  const [activeSeason, setActiveSeason] = useState<Season>("summer");

  const SeasonIcon = SEASONAL_TIPS[activeSeason].icon;

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Energy Efficiency Guide</h1>
          <p className="text-slate-400 text-sm mt-1">Cut your Texas utility bills</p>
        </div>

        {/* Bill Benchmark */}
        <div className="bg-[#111C30] border border-teal-500/30 rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
                <DollarSign size={20} className="text-teal-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Your Bill Benchmark</div>
                <div className="text-white font-semibold mt-0.5">DFW Average Home: $280/mo in summer</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">$310<span className="text-slate-400 text-sm font-normal">/mo</span></div>
              <div className="text-xs text-slate-400">Your estimate</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5">
            <TrendingDown size={16} className="text-green-400 shrink-0" />
            <span className="text-green-300 text-sm font-medium">Savings opportunity: <strong>$30–$85/mo</strong> — up to $1,020/yr with the upgrades below</span>
          </div>
        </div>

        {/* Top 5 Efficiency Wins */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Top 5 Efficiency Wins — Sorted by ROI</h2>
          <div className="space-y-3">
            {TOP_WINS.map(win => {
              const Icon = win.icon;
              return (
                <div
                  key={win.rank}
                  className="bg-[#111C30] border border-white/10 rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-slate-400">#{win.rank}</span>
                  </div>
                  <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={18} className={win.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white text-sm">{win.title}</span>
                      {win.diy && (
                        <span className="text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                          ✓ {win.diyCap}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 flex-wrap">
                      <span>{win.installCost} install</span>
                      <span className="text-green-400 font-medium">saves {win.annualSavings}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold text-amber-400">{win.paybackLabel}</div>
                    {win.paybackYears > 0 && (
                      <div className="mt-1 w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${Math.min(100, (1 / win.paybackYears) * 50)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Texas Incentives */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Texas Incentives Available to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INCENTIVES.map(inc => (
              <div key={inc.title} className={`border rounded-xl p-5 flex flex-col gap-3 ${inc.color}`}>
                <div className="flex items-start justify-between">
                  <Award size={18} className="text-white/60 mt-0.5" />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${inc.badgeColor}`}>
                    {inc.badge}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{inc.title}</div>
                  <div className="text-2xl font-bold text-white mt-1">{inc.value}</div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{inc.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Tips */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">DFW Seasonal Tips</h2>
          <div className="bg-[#111C30] border border-white/10 rounded-xl overflow-hidden">
            <div className="flex border-b border-white/10">
              {SEASON_LABELS.map(s => {
                const SIcon = SEASONAL_TIPS[s.key].icon;
                return (
                  <button
                    key={s.key}
                    onClick={() => setActiveSeason(s.key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                      activeSeason === s.key
                        ? "bg-white/5 text-white border-b-2 border-teal-400"
                        : "text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    <SIcon size={14} className={activeSeason === s.key ? SEASONAL_TIPS[s.key].color : ""} />
                    {s.label}
                  </button>
                );
              })}
            </div>
            <div className="p-5 space-y-3">
              {SEASONAL_TIPS[activeSeason].tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={16} className={`shrink-0 mt-0.5 ${SEASONAL_TIPS[activeSeason].color}`} />
                  <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Energy Audit CTA */}
        <div className="bg-gradient-to-r from-teal-900/40 to-blue-900/40 border border-teal-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center shrink-0">
              <Wrench size={20} className="text-teal-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Get a Professional Energy Audit</h3>
              <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                Find all your home's efficiency gaps with thermal imaging, blower door test, and duct leakage analysis.
                Most DFW homeowners recover the audit cost in under 6 months.
              </p>
              <div className="mt-3 flex items-center gap-4">
                <span className="text-white font-semibold">Average: $200–$400</span>
                <button className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                  Request an Audit
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
