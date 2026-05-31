import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Thermometer, Wind, Sun, Snowflake, Leaf, AlertTriangle,
  CheckCircle, XCircle, DollarSign, Zap, Phone, Calendar,
  ArrowRight, Info,
} from "lucide-react";
import { Link } from "wouter";

const SEASONS = [
  {
    id: "spring",
    label: "Spring",
    icon: Leaf,
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/30",
    tips: ["Schedule AC tune-up before cooling season", "Change filter (post-winter dust)", "Check refrigerant levels with a tech", "Clear debris from outdoor condenser"],
  },
  {
    id: "summer",
    label: "Summer",
    icon: Sun,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/30",
    tips: ["Change filter monthly — DFW dust is relentless", "Set thermostat to 78°F, not 72°F", "Inspect condenser coils monthly", "Keep 2ft clearance around outdoor unit"],
  },
  {
    id: "fall",
    label: "Fall",
    icon: Wind,
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/30",
    tips: ["Test heating mode before first cold night", "Clean furnace burners and heat exchanger", "Replace filter before heating season", "Check carbon monoxide detectors"],
  },
  {
    id: "winter",
    label: "Winter",
    icon: Snowflake,
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/30",
    tips: ["Change filter — heating runs hard in Jan", "Insulate exposed pipes near outdoor unit", "Keep unit clear of ice and snow buildup", "Set emergency heat if temps drop below 30°F"],
  },
];

const FILTERS = [
  {
    size: `1" MERV-8`,
    price: "$8",
    interval: "Change monthly",
    desc: "Basic filtration, low restriction. Good for empty homes or allergy-free households.",
    badge: "Budget",
    badgeColor: "bg-slate-700 text-slate-300",
  },
  {
    size: `4" MERV-11`,
    price: "$28",
    interval: "Change every 3 months",
    desc: "Captures pollen, pet dander, and mold spores. Best balance of airflow and filtration.",
    badge: "Recommended",
    badgeColor: "bg-teal-500/20 text-teal-300",
  },
  {
    size: `5" MERV-13`,
    price: "$45",
    interval: "Change every 6 months",
    desc: "Hospital-grade filtration. Ideal for allergy sufferers. Needs compatible air handler.",
    badge: "Premium",
    badgeColor: "bg-purple-500/20 text-purple-300",
  },
];

const WARNINGS = [
  "Warm or room-temperature air coming from vents",
  "Ice forming on the indoor coil or outdoor unit",
  "Grinding, banging, or squealing sounds at startup",
  "Monthly electric bill spiked 25%+ without explanation",
  "System short-cycling — turns on/off every few minutes",
  "Sweet or chemical smell near vents (refrigerant leak)",
];

const TIPS = [
  { title: "Set to 78°F, not 72°F", detail: "Each degree below 78°F adds ~3% to your cooling bill. In DFW summers that's $40–80/mo in savings." },
  { title: "Close vents in unused rooms", detail: "Redirect airflow to the spaces you occupy. Don't fully seal — leave 20% open to maintain pressure." },
  { title: "Use smart thermostat schedules", detail: "Let it rise to 85°F when you're away. Pre-cool 30 min before you return. Saves ~15% annually." },
  { title: "Run ceiling fans to supplement", detail: "Fans create a wind-chill effect. You can raise the AC setpoint 4°F with no comfort loss." },
  { title: "Add attic insulation", detail: "DFW attics hit 140°F in August. Upgrading from R-19 to R-38 can cut cooling costs 25%." },
];

export default function HVACGuide() {
  const [activeSeason, setActiveSeason] = useState("spring");
  const active = SEASONS.find(s => s.id === activeSeason)!;
  const ActiveIcon = active.icon;

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Thermometer className="w-6 h-6 text-teal-400" />
            <h1 className="text-2xl font-bold text-white">HVAC Guide</h1>
          </div>
          <p className="text-slate-400 text-sm">Stay cool in Texas heat</p>
        </div>

        {/* Your System Stats */}
        <Card className="bg-[#0F1E35] border-[#1E3A5F]">
          <CardContent className="p-5">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-teal-400" />
              Your System
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Unit", value: "Carrier 5-Ton" },
                { label: "Installed", value: "2018 (7 yrs old)" },
                { label: "Last Service", value: "March 2026" },
                { label: "Next Recommended", value: "May 2026" },
                { label: "Labor Warranty", value: "Expired" },
                { label: "Parts Warranty", value: "Through 2028" },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-slate-400 text-xs mb-0.5">{item.label}</p>
                  <p className={`text-sm font-medium ${item.label === "Labor Warranty" ? "text-red-400" : item.label === "Parts Warranty" ? "text-green-400" : item.label === "Next Recommended" ? "text-yellow-400" : "text-white"}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* DFW Seasonal Calendar */}
        <div>
          <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-400" />
            DFW HVAC Calendar
          </h2>
          <div className="flex gap-2 mb-4 flex-wrap">
            {SEASONS.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSeason(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${activeSeason === s.id ? s.bg + " " + s.color : "border-[#1E3A5F] text-slate-400 hover:border-slate-500"}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>
          <Card className={`border ${active.bg} bg-[#0F1E35]`}>
            <CardContent className="p-5">
              <div className={`flex items-center gap-2 mb-3 ${active.color}`}>
                <ActiveIcon className="w-5 h-5" />
                <span className="font-semibold">{active.label} Tips</span>
              </div>
              <ul className="space-y-2">
                {active.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Filter Guide */}
        <div>
          <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Wind className="w-4 h-4 text-teal-400" />
            Filter Guide
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-3">
            {FILTERS.map(f => (
              <Card key={f.size} className="bg-[#0F1E35] border-[#1E3A5F]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-white font-semibold text-sm">{f.size}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.badgeColor}`}>{f.badge}</span>
                  </div>
                  <p className="text-teal-400 font-bold text-lg mb-0.5">{f.price}</p>
                  <p className="text-yellow-400 text-xs mb-2">{f.interval}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-3 text-sm text-teal-300">
            DFW Recommendation: Use the 4` filter and change every 2 months in summer — dust and pollen loads are 3x higher June through September.
          </div>
        </div>

        {/* Warning Signs */}
        <div>
          <h2 className="text-white font-semibold mb-3 flex items-center gap-2`>
            <AlertTriangle className="w-4 h-4 text-red-400" />
            Warning Signs
          </h2>
          <Card className="bg-[#0F1E35] border-[#1E3A5F]">
            <CardContent className="p-5">
              <div className="grid sm:grid-cols-2 gap-3">
                {WARNINGS.map((w, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    {w}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Efficiency Tips */}
        <div>
          <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-teal-400" />
            Efficiency Tips
          </h2>
          <div className="space-y-2">
            {TIPS.map((tip, i) => (
              <div key={i} className="bg-[#0F1E35] border border-[#1E3A5F] rounded-lg p-4">
                <p className="text-white font-medium text-sm mb-0.5">{tip.title}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{tip.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Guide */}
        <div>
          <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-teal-400" />
            DFW Cost Guide
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "New HVAC System", range: "$3,800 – $8,200", note: "Installed, includes labor + permits" },
              { label: "Emergency Repair", range: "$200 – $800", note: "After-hours or weekend call" },
              { label: "Annual Tune-Up", range: "$89 – $150", note: "Spring or fall inspection" },
            ].map(c => (
              <Card key={c.label} className="bg-[#0F1E35] border-[#1E3A5F]">
                <CardContent className="p-4">
                  <p className="text-slate-400 text-xs mb-1">{c.label}</p>
                  <p className="text-teal-400 font-bold text-base">{c.range}</p>
                  <p className="text-slate-500 text-xs mt-1">{c.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-xl p-6 text-center">
          <Phone className="w-8 h-8 text-teal-400 mx-auto mb-3" />
          <h3 className="text-white font-bold text-lg mb-1">Ready to Schedule?</h3>
          <p className="text-slate-400 text-sm mb-4">Book a vetted HVAC tech in your area - same-day slots available.</p>
          <Link href="/trustypro/book?trade=hvac">
            <Button className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6">
              Schedule HVAC Service
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

      </div>
    </HomeownerLayout>
  );
}
