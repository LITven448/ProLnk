import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar, CheckCircle, Clock, AlertTriangle, Wrench,
  DollarSign, ChevronRight, Leaf, Snowflake, CalendarDays,
  Zap, Bot, TrendingUp, Shield,
} from "lucide-react";
import { Link } from "wouter";

type Priority = "critical" | "recommended" | "optional";
type Season = "spring" | "summer" | "fall" | "winter";
type Tab = "seasonal" | "monthly" | "ai";

interface Task {
  task: string;
  detail: string;
  priority: Priority;
  trade: string;
  freq: string;
  estimatedCost: string;
  savings: string;
  diy: boolean;
}

const SEASON_TASKS: Record<Season, Task[]> = {
  spring: [
    { task: "HVAC tune-up", detail: "Have system checked before cooling season — coils cleaned, refrigerant verified", priority: "critical", trade: "HVAC", freq: "Annual", estimatedCost: "$89–150″, savings: "Prevents $2,800 emergency repair", diy: false },
    { task: "Roof inspection", detail: "Check for hail/wind damage from winter storms, loose shingles, flashing gaps", priority: "critical", trade: "Roofing", freq: "Annual", estimatedCost: "$150–350″, savings: "Catches leaks before $15K damage", diy: false },
    { task: "Gutter cleaning", detail: "Clear winter debris, ensure proper drainage away from foundation", priority: "recommended", trade: "Gutters", freq: "Quarterly", estimatedCost: "$150–300″, savings: "Prevents fascia rot & foundation issues", diy: true },
    { task: "Irrigation startup", detail: "Check heads, test all zones, adjust for summer watering schedule", priority: "recommended", trade: "Irrigation", freq: "Annual", estimatedCost: "$75–150″, savings: "Protects $10K–$80K foundation investment", diy: false },
    { task: "Foundation perimeter watering", detail: "Start consistent schedule to prevent DFW clay shrinkage — critical before summer heat", priority: "recommended", trade: "Landscaping", freq: "Ongoing", estimatedCost: "$0 (DIY)", savings: "Foundation repair costs $5K–$80K", diy: true },
    { task: "Window & door seals", detail: "Check weatherstripping, caulk gaps for summer cooling efficiency", priority: "optional", trade: "Handyman", freq: "Annual", estimatedCost: "$50–200″, savings: "Reduces cooling bill 10–15%", diy: true },
  ],
  summer: [
    { task: "HVAC filter replacement", detail: "Change monthly July–August during peak cooling — critical for DFW heat", priority: "critical", trade: "HVAC", freq: "Monthly", estimatedCost: "$15–30″, savings: "Prevents coil freeze & $800 repair", diy: true },
    { task: "Foundation watering", detail: "DFW clay soil shrinks severely — consistent watering prevents foundation damage", priority: "critical", trade: "Landscaping", freq: "Ongoing", estimatedCost: "$0 (DIY)", savings: "Foundation repair costs $5K–$80K", diy: true },
    { task: "Outdoor HVAC clearance", detail: "Ensure 2-foot clearance around condenser unit, remove debris blocking airflow", priority: "recommended", trade: "HVAC", freq: "Seasonal", estimatedCost: "$0 (DIY)", savings: "Improves efficiency 10–20%", diy: true },
    { task: "Pest control treatment", detail: "Ants, mosquitoes, and roaches peak in Texas summer heat — quarterly treatment", priority: "recommended", trade: "Pest Control", freq: "Quarterly", estimatedCost: "$100–200″, savings: "Prevents $500–$3K infestation damage", diy: false },
    { task: "Attic ventilation check", detail: "Poor attic ventilation can push attic temps to 150°F, dramatically increasing cooling costs", priority: "optional", trade: "HVAC", freq: "Annual", estimatedCost: "$0 (check)", savings: "Reduces cooling costs 25–30%", diy: true },
  ],
  fall: [
    { task: "Heating system inspection", detail: "Service furnace before first cold snap — DFW cold fronts arrive fast in November", priority: "critical", trade: "HVAC", freq: "Annual", estimatedCost: "$89–150″, savings: "Prevents $1,500+ emergency call", diy: false },
    { task: "Gutter cleaning", detail: "Heavy leaf fall Oct–Nov; clear before winter rains to prevent fascia rot", priority: "critical", trade: "Gutters", freq: "Quarterly", estimatedCost: "$150–300″, savings: "Prevents foundation drainage failures", diy: true },
    { task: "Pipe insulation", detail: "Wrap exposed pipes in garage and crawl space — Texas ice storm prep (Uri 2021 lesson)", priority: "recommended", trade: "Plumbing", freq: "Annual", estimatedCost: "$50–200″, savings: "Burst pipe repair costs $5K–$20K", diy: true },
    { task: "Weatherstripping", detail: "Check all doors and windows before heating season — energy savings start immediately", priority: "recommended", trade: "Handyman", freq: "Annual", estimatedCost: "$50–200″, savings: "Reduces heating bill 10–15%", diy: true },
    { task: "Rodent exclusion", detail: "Mice seek warmth as temps drop — seal foundation gaps, siding penetrations, and vents", priority: "recommended", trade: "Pest Control", freq: "Annual", estimatedCost: "$200–600″, savings: "Prevents wiring/insulation damage", diy: false },
    { task: "Irrigation winterization", detail: "Drain and blow out lines before first freeze to prevent cracked heads and pipes", priority: "optional", trade: "Irrigation", freq: "Annual", estimatedCost: "$75–150″, savings: "Prevents $500–$2K repair", diy: false },
  ],
  winter: [
    { task: "Know your water shutoff", detail: "Texas ice storms cause widespread pipe bursts — locate and tag your main shutoff now", priority: "critical", trade: "Plumbing", freq: "One-time", estimatedCost: "$0 (DIY)", savings: "Stops flooding in minutes vs. hours", diy: true },
    { task: "HVAC filter replacement", detail: "Heating season requires consistent filter changes — monthly during heavy use", priority: "recommended", trade: "HVAC", freq: "Monthly", estimatedCost: "$15–30″, savings: "Maintains peak heating efficiency", diy: true },
    { task: "Exterior faucet covers", detail: "Insulate outdoor hose bibs before freeze events — $5 fix prevents $2K repair", priority: "recommended", trade: "Plumbing", freq: "Annual", estimatedCost: "$10–30 (DIY)", savings: "Prevents outdoor pipe freeze damage", diy: true },
    { task: "Garage door weatherstripping", detail: "Prevent cold air and moisture infiltration — protects cars and stored items", priority: "optional", trade: "Handyman", freq: "Annual", estimatedCost: "$20–80″, savings: "Reduces garage heat loss 30%", diy: true },
    { task: "Fireplace inspection", detail: "Annual chimney inspection if you have a wood-burning fireplace — prevents chimney fires", priority: "optional", trade: "Chimney", freq: "Annual", estimatedCost: "$150–300″, savings: "Prevents chimney fires & CO risk", diy: false },
  ],
};

const RECURRING_MONTHLY: Task[] = [
  { task: "HVAC filter check", detail: "Replace if dirty — 1\" filters monthly, 4\" filters every 3 months", priority: "recommended", trade: "HVAC", freq: "Monthly", estimatedCost: "$15–30″, savings: "Maintains peak HVAC efficiency", diy: true },
  { task: "Test smoke & CO detectors", detail: "Press test button on all units; replace batteries annually in October", priority: "recommended", trade: "Safety", freq: "Monthly", estimatedCost: "$0″, savings: "Life safety — no cost equivalent", diy: true },
  { task: "Check water softener salt", detail: "DFW has hard water (300+ ppm) — keep salt reservoir 1/3 full minimum", priority: "optional", trade: "Plumbing", freq: "Monthly", estimatedCost: "$15–25″, savings: "Extends appliance life 3–5 years", diy: true },
];

const AI_SCHEDULE: Array<{ month: string; tasks: string[]; totalCost: string; urgency: "high" | "medium" | "low" }> = [
  { month: "May", tasks: ["HVAC pre-season tune-up", "Foundation watering schedule start", "Roof post-storm inspection"], totalCost: "$239–500″, urgency: "high" },
  { month: "June", tasks: ["HVAC filter replace (monthly start)", "Pest control treatment", "Outdoor faucet check"], totalCost: "$115–230″, urgency: "medium" },
  { month: "July", tasks: ["HVAC filter replace", "Foundation watering — increase frequency", "Attic ventilation check"], totalCost: "$15–30″, urgency: "high" },
  { month: "August", tasks: ["HVAC filter replace", "Gutter inspection", "Smoke detector batteries"], totalCost: "$15–30″, urgency: "medium" },
  { month: "September", tasks: ["Roof inspection", "Pest prevention — rodent exclusion", "Exterior caulk check"], totalCost: "$350–950″, urgency: "high" },
  { month: "October", tasks: ["Furnace inspection", "Gutter cleaning", "Pipe insulation install"], totalCost: "$289–650″, urgency: "high" },
  { month: "November", tasks: ["Irrigation winterization", "Weatherstripping check", "Exterior faucet covers"], totalCost: "$135–380″, urgency: "medium" },
  { month: "December", tasks: ["Locate water shutoff — tag it", "Garage door weatherstrip", "Chimney inspection"], totalCost: "$170–380″, urgency: "medium" },
];

const PRIORITY_CONFIG: Record<Priority, { color: string; label: string; dot: string }> = {
  critical: { color: "bg-red-500/20 text-red-400 border-red-500/30″, label: "Critical", dot: "bg-red-400" },
  recommended: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30″, label: "Recommended", dot: "bg-yellow-400" },
  optional: { color: "bg-teal-500/20 text-teal-400 border-teal-500/30″, label: "Optional", dot: "bg-teal-400" },
};

const SEASON_CONFIG: Record<Season, { icon: React.ReactNode; label: string; accent: string }> = {
  spring: { icon: <Leaf className="w-4 h-4″ />, label: "Spring", accent: "text-green-400" },
  summer: { icon: <Zap className="w-4 h-4″ />, label: "Summer", accent: "text-yellow-400" },
  fall: { icon: <Leaf className="w-4 h-4″ />, label: "Fall", accent: "text-orange-400" },
  winter: { icon: <Snowflake className="w-4 h-4″ />, label: "Winter", accent: "text-blue-400" },
};

function getCurrentSeason(): Season {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 8) return "summer";
  if (m >= 9 && m <= 10) return "fall";
  return "winter";
}

export default function MaintenanceSchedule() {
  const [activeSeason, setActiveSeason] = useState<Season>(getCurrentSeason());
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<Tab>("seasonal");

  const tasks = tab === "seasonal" ? SEASON_TASKS[activeSeason] : RECURRING_MONTHLY;
  const criticalCount = tasks.filter(t => t.priority === "critical").length;
  const checkedCount = tasks.filter(t => checked.has(`${tab}-${activeSeason}-${t.task}`)).length;
  const totalSavings = tab === "seasonal"
    ? SEASON_TASKS[activeSeason].filter(t => t.priority === "critical").length * 3500
    : 0;

  function toggle(task: string) {
    const key = `${tab}-${activeSeason}-${task}`;
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  function isChecked(task: string) {
    return checked.has(`${tab}-${activeSeason}-${task}`);
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="max-w-2xl mx-auto space-y-6 p-4 pb-10″>

          <div className="pt-2″>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
              <Calendar className="w-6 h-6 text-teal-400″ />
              Maintenance Schedule
            </h1>
            <p className="text-slate-400 text-sm mt-1″>
              DFW-specific home maintenance — AI-tailored for Texas climate risks
            </p>
          </div>

          {tab === "seasonal" && (
            <div className="grid grid-cols-2 gap-3″>
              <Card className="bg-slate-800/60 border-slate-700″>
                <CardContent className="pt-3 pb-3″>
                  <div className="flex items-center gap-2 mb-1″>
                    <Shield className="w-4 h-4 text-teal-400″ />
                    <span className="text-slate-400 text-xs">Critical tasks</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{criticalCount}</p>
                  <p className="text-xs text-red-400 mt-0.5″>This season</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/60 border-slate-700″>
                <CardContent className="pt-3 pb-3″>
                  <div className="flex items-center gap-2 mb-1″>
                    <TrendingUp className="w-4 h-4 text-teal-400″ />
                    <span className="text-slate-400 text-xs">Potential savings</span>
                  </div>
                  <p className="text-2xl font-bold text-white">${(totalSavings / 1000).toFixed(0)}K+</p>
                  <p className="text-xs text-teal-400 mt-0.5″>Damage prevented</p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex gap-2″>
            <Button
              size="sm"
              onClick={() => setTab("seasonal")}
              className={tab === "seasonal" ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600″}
            >
              <CalendarDays className="w-3.5 h-3.5 mr-1.5″ />Seasonal
            </Button>
            <Button
              size="sm"
              onClick={() => setTab("monthly")}
              className={tab === "monthly" ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600″}
            >
              <Clock className="w-3.5 h-3.5 mr-1.5″ />Monthly
            </Button>
            <Button
              size="sm"
              onClick={() => setTab("ai")}
              className={tab === "ai" ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600″}
            >
              <Bot className="w-3.5 h-3.5 mr-1.5″ />AI Schedule
            </Button>
          </div>

          {tab === "ai" && (
            <div className="space-y-3″>
              <Card className="bg-teal-900/30 border-teal-500/40″>
                <CardContent className="pt-4 pb-3″>
                  <div className="flex items-start gap-2″>
                    <Bot className="w-4 h-4 text-teal-400 mt-0.5 shrink-0″ />
                    <div>
                      <p className="text-teal-300 text-sm font-semibold">AI-Generated 8-Month Schedule</p>
                      <p className="text-slate-400 text-xs mt-0.5″>Built for DFW climate patterns — sequenced for maximum protection at minimum cost</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {AI_SCHEDULE.map((month, i) => (
                <Card key={i} className={`bg-slate-800/60 border-slate-700 ${month.urgency === "high" ? "border-l-2 border-l-red-500" : month.urgency === "medium" ? "border-l-2 border-l-yellow-500" : ""}`}>
                  <CardContent className="pt-4 pb-3″>
                    <div className="flex items-start justify-between gap-3″>
                      <div className="flex-1″>
                        <div className="flex items-center gap-2 mb-2″>
                          <p className="text-white font-semibold text-sm">{month.month}</p>
                          <Badge className={`text-xs border ${month.urgency === "high" ? "bg-red-500/20 text-red-400 border-red-500/30" : month.urgency === "medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : "bg-slate-700 text-slate-400 border-slate-600"}`}>
                            {month.urgency === "high" ? "High priority" : month.urgency === "medium" ? "Moderate" : "Light month"}
                          </Badge>
                        </div>
                        <ul className="space-y-1″>
                          {month.tasks.map((task, j) => (
                            <li key={j} className="text-slate-300 text-xs flex items-center gap-1.5″>
                              <ChevronRight className="w-3 h-3 text-teal-500 shrink-0″ />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right shrink-0″>
                        <p className="text-teal-400 text-sm font-semibold">{month.totalCost}</p>
                        <p className="text-slate-500 text-xs">est. cost</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {tab !== "ai" && (
            <>
              {tab === "seasonal" && (
                <div className="grid grid-cols-4 gap-2″>
                  {(["spring", "summer", "fall", "winter"] as Season[]).map(s => {
                    const sc = SEASON_CONFIG[s];
                    return (
                      <button
                        key={s}
                        onClick={() => setActiveSeason(s)}
                        className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border transition-all text-sm font-medium capitalize ${
                          activeSeason === s
                            ? "bg-teal-600 border-teal-600 text-white"
                            : "bg-slate-800/60 border-slate-700 text-slate-400 hover:border-teal-600/50″
                        }`}
                      >
                        <span className={activeSeason === s ? "text-white" : sc.accent}>{sc.icon}</span>
                        {sc.label}
                      </button>
                    );
                  })}
                </div>
              )}

              <Card className="bg-slate-800/60 border-slate-700″>
                <CardContent className="pt-4 pb-3″>
                  <div className="flex items-center justify-between mb-2″>
                    <span className="font-semibold text-sm text-white capitalize">
                      {tab === "seasonal" ? `${activeSeason} Checklist` : "Monthly Tasks"}
                    </span>
                    <span className="text-xs text-slate-400″>{checkedCount}/{tasks.length} done</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all"
                      style={{ width: tasks.length ? `${(checkedCount / tasks.length) * 100}%` : "0%" }}
                    />
                  </div>
                  {criticalCount > 0 && checkedCount < tasks.length && (
                    <p className="text-xs text-red-400 font-medium mt-2 flex items-center gap-1″>
                      <AlertTriangle className="w-3.5 h-3.5″ />
                      {criticalCount} critical item{criticalCount !== 1 ? "s" : ""} this period
                    </p>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-2″>
                {tasks.map((item, i) => {
                  const done = isChecked(item.task);
                  const pc = PRIORITY_CONFIG[item.priority];
                  return (
                    <div
                      key={i}
                      className={`bg-slate-800/60 rounded-xl p-4 border transition-all ${
                        done ? "opacity-50 border-slate-700″ : "border-slate-700 hover:border-teal-600/40"
                      }`}
                    >
                      <div className="flex items-start gap-3″>
                        <button
                          onClick={() => toggle(item.task)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            done ? "bg-teal-500 border-teal-500″ : "border-slate-600 hover:border-teal-500"
                          }`}
                        >
                          {done && <CheckCircle className="w-3 h-3 text-white" />}
                        </button>
                        <div className="flex-1 min-w-0″>
                          <p className={`text-sm font-medium leading-snug ${done ? "line-through text-slate-500" : "text-white"}`}>
                            {item.task}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.detail}</p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge className={`text-xs border font-medium ${pc.color}`}>{pc.label}</Badge>
                            <span className="text-slate-500 text-xs flex items-center gap-1″>
                              <Wrench className="w-3 h-3″ />{item.trade}
                            </span>
                            <span className="text-slate-500 text-xs flex items-center gap-1″>
                              <Clock className="w-3 h-3″ />{item.freq}
                            </span>
                            <span className="text-slate-500 text-xs flex items-center gap-1″>
                              <DollarSign className="w-3 h-3″ />{item.estimatedCost}
                            </span>
                          </div>
                          <p className="text-xs text-teal-400/80 mt-1 flex items-center gap-1″>
                            <TrendingUp className="w-3 h-3″ />
                            {item.savings}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0″>
                          {!item.diy && (
                            <Link href="/trustypro/book">
                              <Button size="sm" className="text-xs h-7 px-2 bg-teal-600 hover:bg-teal-700 text-white">
                                Get a Pro
                              </Button>
                            </Link>
                          )}
                          <ChevronRight className="w-4 h-4 text-slate-600″ />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <p className="text-center text-slate-600 text-xs pb-2″>
            Tailored for DFW climate · AI-powered schedule optimization
          </p>
        </div>
      </div>
    </HomeownerLayout>
  );
}
