import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Sun, CheckCircle, AlertTriangle, Flame, Droplets, TreePine,
  DollarSign, TrendingUp, ChevronRight, Shield, Thermometer,
  Star, MapPin, Clock,
} from "lucide-react";

interface UpgradeOption {
  title: string;
  costRange: string;
  homeValueAdd: string;
  roi: string;
  roiPct: number;
  icon: typeof Sun;
  color: string;
  bgColor: string;
  description: string;
}

interface DFWTip {
  title: string;
  icon: typeof Sun;
  color: string;
  tips: string[];
}

const UPGRADE_OPTIONS: UpgradeOption[] = [
  {
    title: "Patio Cover",
    costRange: "$3,000–12,000",
    homeValueAdd: "+$8K home value",
    roi: "Reduces cooling 15%",
    roiPct: 67,
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-900/20",
    description: "Aluminum or wood pergola cover extends usability through DFW summers. Solid roof panels add the most value.",
  },
  {
    title: "Outdoor Kitchen",
    costRange: "$5,000–30,000",
    homeValueAdd: "+$15K value",
    roi: "50–70% ROI",
    roiPct: 60,
    icon: Flame,
    color: "text-orange-400",
    bgColor: "bg-orange-900/20",
    description: "Built-in grill, counter space, and mini-fridge. Highest ROI outdoor upgrade in DFW where outdoor entertaining is year-round.",
  },
  {
    title: "Deck Addition",
    costRange: "$6,000–20,000",
    homeValueAdd: "+$12K value",
    roi: "65% ROI",
    roiPct: 65,
    icon: TreePine,
    color: "text-green-400",
    bgColor: "bg-green-900/20",
    description: "Composite decking recommended over wood for DFW UV and heat. Adds defined outdoor living zone and strong appraisal value.",
  },
  {
    title: "Pergola",
    costRange: "$3,000–8,000",
    homeValueAdd: "+$6K value",
    roi: "Immediate enjoyment",
    roiPct: 75,
    icon: Sun,
    color: "text-amber-400",
    bgColor: "bg-amber-900/20",
    description: "Freestanding or attached structure with open roof. Add climbing vines or shade sails to block summer sun while allowing airflow.",
  },
];

const DFW_TIPS: DFWTip[] = [
  {
    title: "Beat the Summer Heat",
    icon: Thermometer,
    color: "text-red-400",
    tips: [
      "Use shade sails or a pergola with 70% shade cloth — makes the space usable even at 100°F",
      "Orient seating areas to face north or east for morning use before peak heat",
      "Misting systems can drop perceived temperature 10–15°F for $300–800 installed",
      "Schedule outdoor projects and entertaining for morning or evening hours May–September",
    ],
  },
  {
    title: "Materials for DFW Climate",
    icon: Star,
    color: "text-yellow-400",
    tips: [
      "Composite decking (Trex, TimberTech) over wood — resists UV fading and doesn't warp in heat",
      "Concrete pavers vs wood deck: concrete lasts 30+ years, lower maintenance in DFW conditions",
      "Light-colored concrete reflects heat; dark surfaces can reach 160°F in summer sun",
      "Stainless steel or powder-coated aluminum for outdoor kitchen frames — resists DFW humidity spikes",
    ],
  },
  {
    title: "Water Features",
    icon: Droplets,
    color: "text-cyan-400",
    tips: [
      "Water features create an evaporative cooling effect — can drop nearby air temp 5–8°F",
      "Pondless waterfalls require minimal maintenance vs traditional ponds",
      "Drip irrigation for landscaping saves 30-50% water vs sprinklers on DFW clay soil",
      "Consider a small reflecting pool — doubles as a visual anchor and cooling element",
    ],
  },
];

function ROIBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full bg-slate-700/50 rounded-full h-1.5 mt-2">
      <div
        className={`h-1.5 rounded-full transition-all duration-700 ${color.replace("text-", "bg-")}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function OutdoorLivingGuide() {
  const [activeTipIdx, setActiveTipIdx] = useState(0);

  const activeTip = DFW_TIPS[activeTipIdx];

  return (
    <HomeownerLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900/40 to-green-900/30 border border-amber-700/40 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Sun className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Outdoor Living Guide</h1>
              <p className="text-amber-300 text-sm">Extend your home into Texas outdoor space</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm mt-4 leading-relaxed">
            DFW averages 234 sunny days/year. An outdoor living space adds $15,000–$50,000 in value
            and is one of the best ROI investments for DFW homes. With year-round entertaining weather
            (outside of July and August peak heat), your backyard is your most underutilized asset.
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-amber-300">
            <MapPin className="w-4 h-4" />
            <span>234 sunny days/year · DFW metro average</span>
          </div>
        </div>

        {/* Current Space */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Your Outdoor Space</h2>
          <div className="bg-slate-800/50 rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-700/60 rounded-xl flex items-center justify-center flex-shrink-0">
              <TreePine className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">Concrete patio (400 sqft), no cover</div>
              <div className="text-slate-400 text-sm mt-0.5">Installed 2017 · Good condition</div>
              <div className="flex gap-3 mt-2">
                <span className="text-xs bg-amber-900/40 text-amber-400 px-2.5 py-1 rounded-full">No shade cover</span>
                <span className="text-xs bg-blue-900/40 text-blue-400 px-2.5 py-1 rounded-full">Upgrade recommended</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-white">400</div>
              <div className="text-xs text-slate-500">sqft</div>
            </div>
          </div>
        </div>

        {/* Upgrade Options */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-semibold text-white">Upgrade Options</h2>
          </div>
          <p className="text-slate-400 text-sm mb-5">Cost ranges and return on investment for your 400 sqft patio</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {UPGRADE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <div key={opt.title} className={`rounded-xl p-5 border border-slate-700/50 ${opt.bgColor}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-slate-800/60 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-5 h-5 ${opt.color}`} />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{opt.title}</div>
                      <div className={`text-lg font-bold ${opt.color}`}>{opt.costRange}</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{opt.description}</p>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-green-400 font-medium">{opt.homeValueAdd}</span>
                    <span className="text-slate-400">{opt.roi}</span>
                  </div>
                  <ROIBar pct={opt.roiPct} color={opt.color} />
                </div>
              );
            })}
          </div>
        </div>

        {/* DFW-Specific Tips */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5">DFW-Specific Tips</h2>
          <div className="flex gap-2 mb-5 flex-wrap">
            {DFW_TIPS.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <button
                  key={tip.title}
                  onClick={() => setActiveTipIdx(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeTipIdx === idx
                      ? "bg-slate-700 text-white"
                      : "bg-slate-800/50 text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${tip.color}`} />
                  {tip.title}
                </button>
              );
            })}
          </div>
          {activeTip && (
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
              <ul className="space-y-3">
                {activeTip.tips.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-0.5 ${activeTip.color}`} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Permit Note */}
        <div className="bg-amber-900/20 border border-amber-700/40 rounded-2xl p-5 flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-amber-300 font-semibold text-sm mb-1">Permit Requirements</div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Decks over 30" high and outdoor kitchens require permits in most DFW cities.
              Plano, Frisco, McKinney, and Allen all require permits for attached structures over 200 sqft.
              Your contractor should pull permits — if they don't offer to, ask why.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">ProLnk pros handle all permit coordination</span>
            </div>
          </div>
        </div>

        {/* Value Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Avg value added", value: "$25K", sub: "full outdoor kitchen + cover" },
            { label: "ROI range", value: "50–75%", sub: "typical DFW projects" },
            { label: "Usable months", value: "9/yr", sub: "with shade + cooling" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0f1f38] border border-slate-700/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-teal-400">{stat.value}</div>
              <div className="text-xs text-white mt-1">{stat.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-900/40 to-green-900/30 border border-amber-700/40 rounded-2xl p-8 text-center">
          <Sun className="w-10 h-10 text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Get Outdoor Living Quotes</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Connect with DFW outdoor living specialists for patio covers, outdoor kitchens, decks,
            and pergolas. Free estimates, licensed and insured pros only.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Get Outdoor Living Quotes
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-medium px-8 py-3 rounded-xl transition-colors">
              View My Upgrade Plan
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>Free quotes · Licensed pros · Typically 2-4 hour response</span>
          </div>
        </div>

      </div>
    </HomeownerLayout>
  );
}
