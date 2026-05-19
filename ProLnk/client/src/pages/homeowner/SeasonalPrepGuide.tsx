import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Leaf, Sun, Wind, Snowflake, DollarSign, Wrench, ChevronRight,
  CheckCircle, ExternalLink, Thermometer, Droplets, Home, AlertTriangle, TrendingUp,
} from "lucide-react";
import { Link } from "wouter";

type Season = "spring" | "summer" | "fall" | "winter";

interface PrepItem {
  task: string;
  why: string;
  category: string;
  priority: "Critical" | "Recommended" | "Optional";
  estimatedCost: string;
  savings: string;
  diy: boolean;
}

const SEASONAL_DATA: Record<Season, { headline: string; tip: string; storm: string; items: PrepItem[] }> = {
  spring: {
    headline: "Spring Prep — Storm Season Starts",
    tip: "DFW peak storm season runs April–June. Hail, high winds, and flash floods are routine. Prep your exterior and drainage before the first severe cell.",
    storm: "April–June: 73% of annual hail events occur — roof and gutters are priority #1″,
    items: [
      { task: "AC tune-up before cooling season", why: "DFW hits 90°F by May. A spring AC service avoids summer emergency rates ($300/hr) and 2-week wait times.", category: "HVAC", priority: "Critical", estimatedCost: "$89–150″, savings: "Prevents $2,800 emergency repair", diy: false },
      { task: "Foundation perimeter inspection", why: "Check for winter shrinkage cracks. Start consistent watering now — DFW clay needs 2\" per week minimum before summer heat.", category: "Foundation", priority: "Critical", estimatedCost: "$0 (visual check)", savings: "Foundation repair: $5K–$80K", diy: true },
      { task: "Landscaping & tree trimming", why: "Overgrown branches are projectiles in spring storms. Trim anything within 10 feet of the house before peak storm season.", category: "Landscaping", priority: "Recommended", estimatedCost: "$300–1,200″, savings: "Prevents roof/siding damage", diy: false },
      { task: "Irrigation system startup", why: "Test all zones, check heads for winter damage, calibrate for summer schedule before turf stress begins.", category: "Irrigation", priority: "Recommended", estimatedCost: "$75–150″, savings: "Protects $10K–$80K foundation", diy: false },
      { task: "Window & door seal inspection", why: "Weatherstripping degrades after DFW winters. Gaps let allergens and humidity in during spring — and cost 10–15% in cooling efficiency.", category: "Windows", priority: "Optional", estimatedCost: "$50–200″, savings: "Saves $200–400/yr on energy", diy: true },
      { task: "Exterior paint & caulk touch-up", why: "DFW winters crack exterior caulk. Spring is ideal before summer UV accelerates damage to exposed wood and siding.", category: "Exterior", priority: "Optional", estimatedCost: "$500–3,500″, savings: "Prevents moisture intrusion damage", diy: false },
    ],
  },
  summer: {
    headline: "Summer Prep — Heat & Foundation",
    tip: "DFW summers routinely hit 105°F+. Your HVAC and foundation are the two biggest risks. A failed AC or cracked foundation in August can cost $20K+ — both are preventable.",
    storm: "July–August: UV index peaks at 11+, attic temps hit 150°F — insulation and HVAC efficiency are critical",
    items: [
      { task: "HVAC filter replacement — monthly", why: "During peak cooling (July–August), filters clog in 3–4 weeks. A clogged filter drops efficiency 15% and can freeze the coil ($800 repair).", category: "HVAC", priority: "Critical", estimatedCost: "$15–30/mo", savings: "Prevents coil freeze & $800 repair", diy: true },
      { task: "Foundation watering — increase frequency", why: "DFW clay soil shrinks dramatically in 100°F+ heat. Without consistent watering, piers shift and slabs crack. This is the #1 preventable damage in DFW.", category: "Foundation", priority: "Critical", estimatedCost: "$0 (DIY)", savings: "Foundation repair: $5K–$80K", diy: true },
      { task: "Outdoor HVAC condenser clearance", why: "Ensure 2-foot clearance around the condenser unit. Debris blocking airflow reduces efficiency 10–20% and increases compressor wear.", category: "HVAC", priority: "Recommended", estimatedCost: "$0 (DIY)", savings: "Extends compressor life 3–5 years", diy: true },
      { task: "Pest control treatment", why: "Ants, mosquitoes, and roaches peak in Texas summer heat. Quarterly treatment is far cheaper than an infestation response.", category: "Pest Control", priority: "Recommended", estimatedCost: "$100–200″, savings: "Prevents $500–$3K infestation", diy: false },
      { task: "Attic insulation & ventilation check", why: "Attic temps hit 150°F+ in DFW summers. Proper insulation (R-38+) keeps cooling costs 25–35% lower. Check for gaps or damaged batt insulation.", category: "Insulation", priority: "Optional", estimatedCost: "$500–2,500″, savings: "Saves $600–900/yr on energy", diy: false },
      { task: "Window film on south & west faces", why: "South and west-facing windows absorb massive heat load. Window film reduces heat gain 35–50% — immediate energy bill impact.", category: "Windows", priority: "Optional", estimatedCost: "$200–600″, savings: "Reduces cooling load 15–20%", diy: true },
    ],
  },
  fall: {
    headline: "Fall Prep — Heating & Ice Storm Ready",
    tip: "Fall in DFW is mild but brief. The window between summer and the first cold front is short — use September and October to prep your roofing, gutters, and heating before conditions deteriorate.",
    storm: "November: Cold fronts arrive without warning — furnaces not serviced in summer often fail on the coldest day",
    items: [
      { task: "Heating system inspection", why: "Texas furnaces sit idle 6+ months. Service before the first cold front — HVAC technicians book 2–3 weeks out once cold arrives.", category: "HVAC", priority: "Critical", estimatedCost: "$89–150″, savings: "Prevents $1,500+ emergency call", diy: false },
      { task: "Roof inspection post-summer", why: "Check for damage from summer hail and UV degradation. Damaged shingles let water in during fall rains and winter ice.", category: "Roofing", priority: "Critical", estimatedCost: "$150–350″, savings: "Prevents $15K+ water intrusion", diy: false },
      { task: "Gutter cleaning", why: "DFW has significant leaf fall October–November. Clogged gutters cause fascia rot and redirect water toward your foundation.", category: "Gutters", priority: "Critical", estimatedCost: "$150–300″, savings: "Prevents foundation drainage failure", diy: true },
      { task: "Pipe insulation — garage & crawl space", why: "Texas ice storms (February 2021: Uri) cause widespread burst pipes. A $50–200 wrap prevents $5K–$20K in water damage.", category: "Plumbing", priority: "Recommended", estimatedCost: "$50–200″, savings: "Burst pipe repair: $5K–$20K", diy: true },
      { task: "Rodent exclusion sealing", why: "Mice and rats seek warmth as temps drop. Seal foundation gaps, siding penetrations, and utility penetrations in October — before they move in.", category: "Pest Control", priority: "Recommended", estimatedCost: "$200–600″, savings: "Prevents wiring/insulation damage", diy: false },
      { task: "Irrigation system winterization", why: "Blow out and drain irrigation lines before the first freeze. Cracked heads and broken supply lines cost $500–$2K to repair in spring.", category: "Irrigation", priority: "Optional", estimatedCost: "$75–150″, savings: "Prevents $500–$2K spring repair", diy: false },
    ],
  },
  winter: {
    headline: "Winter Prep — Freeze Event Ready",
    tip: "Texas winters are mild most years, but catastrophic ice storms arrive without warning. Winter Storm Uri (February 2021) caused $195 billion in damage — mostly from burst pipes and power failures. Prep now, not during the storm.",
    storm: "February freeze risk is highest — URI-level events have a 15% probability in any given year in DFW",
    items: [
      { task: "Locate & tag your water main shutoff", why: "When pipes burst during a freeze, you have minutes to stop flooding before damage compounds. Know exactly where your shutoff is and confirm it operates.", category: "Plumbing", priority: "Critical", estimatedCost: "$0 (DIY)", savings: "Stops flooding — can save $20K+", diy: true },
      { task: "Pipe insulation — all exposed pipes", why: "The #1 cause of winter home damage in Texas. Wrap exposed pipes in garage, under sinks near exterior walls, and in crawl spaces now.", category: "Plumbing", priority: "Critical", estimatedCost: "$30–200″, savings: "Burst pipe repair: $5K–$20K", diy: true },
      { task: "Heating system service", why: "Furnaces idle for months in Texas. Service before first cold snap. During a freeze, HVAC companies have 3-week wait lists.", category: "HVAC", priority: "Critical", estimatedCost: "$89–150″, savings: "Prevents $1,500+ emergency call", diy: false },
      { task: "Exterior faucet cover installation", why: "Foam faucet covers ($5 each) insulate outdoor hose bibs. Easy DIY install that prevents one of the most common winter pipe failures.", category: "Plumbing", priority: "Recommended", estimatedCost: "$10–30″, savings: "Prevents $200–$800 repair", diy: true },
      { task: "Chimney inspection & cleaning", why: "If you have a wood-burning fireplace, annual inspection prevents chimney fires and carbon monoxide risk. Critical safety item.", category: "Chimney", priority: "Recommended", estimatedCost: "$150–300″, savings: "Prevents chimney fire & CO risk", diy: false },
      { task: "Generator readiness check", why: "Grid failures during Texas ice storms leave homes without heat for days. If you have a generator, test it in December when it's easy — not during a blackout.", category: "Electrical", priority: "Optional", estimatedCost: "$0 (test)", savings: "Prevents $0–$5K cold-weather damage", diy: true },
    ],
  },
};

const SEASON_CONFIG: Record<Season, { label: string; icon: React.ReactNode; accentColor: string; borderColor: string }> = {
  spring: { label: "Spring", icon: <Leaf className="w-4 h-4″ />, accentColor: "text-green-400", borderColor: "border-l-green-500" },
  summer: { label: "Summer", icon: <Sun className="w-4 h-4″ />, accentColor: "text-yellow-400", borderColor: "border-l-yellow-500" },
  fall: { label: "Fall", icon: <Wind className="w-4 h-4″ />, accentColor: "text-orange-400", borderColor: "border-l-orange-500" },
  winter: { label: "Winter", icon: <Snowflake className="w-4 h-4″ />, accentColor: "text-blue-400", borderColor: "border-l-blue-500" },
};

const PRIORITY_COLORS: Record<string, string> = {
  Critical: "bg-red-500/20 text-red-400 border-red-500/30″,
  Recommended: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30″,
  Optional: "bg-teal-500/20 text-teal-400 border-teal-500/30″,
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  HVAC: <Thermometer className="w-3.5 h-3.5″ />,
  Plumbing: <Droplets className="w-3.5 h-3.5″ />,
  Foundation: <Home className="w-3.5 h-3.5″ />,
};

function getCurrentSeason(): Season {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 8) return "summer";
  if (m >= 9 && m <= 10) return "fall";
  return "winter";
}

export default function SeasonalPrepGuide() {
  const [season, setSeason] = useState<Season>(getCurrentSeason());
  const { headline, tip, storm, items } = SEASONAL_DATA[season];
  const config = SEASON_CONFIG[season];
  const criticalCount = items.filter(i => i.priority === "Critical").length;
  const totalMinSavings = items
    .filter(i => i.priority === "Critical")
    .reduce((sum) => sum + 3500, 0);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="max-w-2xl mx-auto space-y-6 p-4 pb-10″>

          <div className="pt-2″>
            <h1 className="text-2xl font-bold text-white">Seasonal Prep Guide</h1>
            <p className="text-slate-400 mt-1 text-sm">Texas-specific home prep — what to do, why it matters, and what it saves.</p>
          </div>

          <div className="grid grid-cols-4 gap-2″>
            {(["spring", "summer", "fall", "winter"] as Season[]).map(s => {
              const sc = SEASON_CONFIG[s];
              return (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all text-sm font-medium ${
                    season === s
                      ? "bg-teal-600 border-teal-600 text-white"
                      : "bg-slate-800/60 border-slate-700 text-slate-400 hover:border-teal-600/50″
                  }`}
                >
                  <span className={season === s ? "text-white" : sc.accentColor}>{sc.icon}</span>
                  {sc.label}
                </button>
              );
            })}
          </div>

          <Card className={`bg-slate-800/60 border-slate-700 border-l-4 ${config.borderColor}`}>
            <CardContent className="pt-4 pb-3 space-y-2″>
              <h2 className={`font-bold text-base ${config.accentColor}`}>{headline}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{tip}</p>
              <div className="flex items-start gap-1.5 pt-1″>
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 shrink-0″ />
                <p className="text-xs text-yellow-400″>{storm}</p>
              </div>
              {criticalCount > 0 && (
                <div className="flex items-center gap-4 pt-1 border-t border-slate-700″>
                  <p className="text-xs text-red-400 font-medium">{criticalCount} critical item{criticalCount !== 1 ? "s" : ""} this season</p>
                  <p className="text-xs text-teal-400 flex items-center gap-1″>
                    <TrendingUp className="w-3 h-3″ />${(totalMinSavings / 1000).toFixed(0)}K+ in protection
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-3″>
            {items.map((item, i) => (
              <Card key={i} className="bg-slate-800/60 border-slate-700 hover:border-teal-600/40 transition-colors">
                <CardContent className="pt-4 pb-3″>
                  <div className="flex items-start gap-3″>
                    <div className="flex-1 min-w-0″>
                      <div className="flex items-center gap-2 flex-wrap mb-1″>
                        <p className="font-semibold text-sm text-white">{item.task}</p>
                        <Badge className={`text-xs border font-medium ${PRIORITY_COLORS[item.priority]}`}>
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2″>{item.why}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1″>
                          {CATEGORY_ICONS[item.category] ?? <Wrench className="w-3 h-3″ />}
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1″>
                          <DollarSign className="w-3 h-3″ />
                          {item.estimatedCost}
                        </span>
                        {item.diy && (
                          <span className="flex items-center gap-1 text-teal-400 font-medium">
                            <CheckCircle className="w-3 h-3″ />DIY possible
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-teal-400/70″>
                          <TrendingUp className="w-3 h-3″ />
                          {item.savings}
                        </span>
                      </div>
                    </div>
                    {!item.diy && (
                      <Link href="/trustypro/book">
                        <Button size="sm" className="shrink-0 text-xs h-7 px-2 bg-teal-600 hover:bg-teal-700 text-white">
                          Book a Pro
                          <ChevronRight className="w-3 h-3 ml-0.5″ />
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pb-2 space-y-3″>
            <Link href="/trustypro/book">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Find a Trusted Pro for Any Task
                <ExternalLink className="w-3.5 h-3.5 ml-2″ />
              </Button>
            </Link>
            <p className="text-xs text-slate-600″>
              TrustyPro connects you with vetted, background-checked professionals in your area
            </p>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
