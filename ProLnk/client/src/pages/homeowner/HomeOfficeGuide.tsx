import { useState } from 'react';
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Thermometer, Sun, Volume2, Wifi, DollarSign, CheckCircle, Home } from "lucide-react";

interface UpgradeItem {
  category: string;
  headline: string;
  detail: string;
  cost: string;
  priority: "high" | "medium" | "low";
  icon: any;
  color: string;
  cta?: { label: string; href: string };
}

interface FiberCity {
  city: string;
  providers: string[];
  maxSpeed: string;
}

const UPGRADES: UpgradeItem[] = [
  {
    category: "Electrical",
    headline: "Dedicated 20-Amp Circuit",
    detail: "A home office pulling monitors, workstation, printer, and charging devices needs its own circuit. Running on a shared circuit causes nuisance trips and can cause data loss. A dedicated 20A circuit runs $200–$450 installed.",
    cost: "$200–$450",
    priority: "high",
    icon: Zap,
    color: "#F59E0B",
    cta: { label: "Get electrical quotes", href: "/trustypro/book" },
  },
  {
    category: "Electrical",
    headline: "Whole-Home Surge Protection",
    detail: "Texas electrical grid fluctuations are real. A whole-home surge protector ($300–$600 installed) protects your $3,000+ workstation. Standard power strips are insufficient for direct lightning protection.",
    cost: "$300–$600",
    priority: "high",
    icon: Zap,
    color: "#EF4444",
    cta: { label: "Get electrical quotes", href: "/trustypro/book" },
  },
  {
    category: "HVAC",
    headline: "Separate Zone for Office",
    detail: "Your office generates heat from equipment and needs to maintain a steady temperature regardless of the rest of the house. A mini-split or zone damper lets you set office temp independently, saves energy, and prevents the \"I\'m working and the house is too hot\" problem.",
    cost: "$1,500–$4,000",
    priority: "medium",
    icon: Thermometer,
    color: "#06B6D4",
    cta: { label: "Get HVAC zone quotes", href: "/trustypro/book" },
  },
  {
    category: "Lighting",
    headline: "4000K LED Supplemental Lighting",
    detail: "Natural light is ideal but not always available. 4000K (cool white) LED lighting mimics daylight and has been shown to improve alertness and productivity compared to warm 2700K lighting. Target 500+ lumens per sqft for task lighting.",
    cost: "$150–$600",
    priority: "medium",
    icon: Sun,
    color: "#10B981",
  },
  {
    category: "Soundproofing",
    headline: "Basic Soundproofing",
    detail: "Even basic soundproofing — acoustic panels on two walls, door sweeps, and mass-loaded vinyl on shared walls — dramatically reduces background noise on calls. In DFW\'s dense suburbs, neighbor and street noise is a real issue.",
    cost: "$500–$2,000",
    priority: "medium",
    icon: Volume2,
    color: "#8B5CF6",
  },
];

const FIBER_CITIES: FiberCity[] = [
  { city: "Frisco", providers: ["AT&T Fiber", "Frontier Fiber"], maxSpeed: "5 Gbps" },
  { city: "Plano", providers: ["AT&T Fiber", "Google Fiber (select areas)"], maxSpeed: "2 Gbps" },
  { city: "Allen", providers: ["AT&T Fiber"], maxSpeed: "2 Gbps" },
  { city: "McKinney", providers: ["AT&T Fiber", "Frontier Fiber"], maxSpeed: "2 Gbps" },
  { city: "Prosper", providers: ["AT&T Fiber", "Cox"], maxSpeed: "1 Gbps" },
];

const PRIORITY_COLOR: Record<string, string> = {
  high: "text-red-400",
  medium: "text-yellow-400",
  low: "text-green-400",
};

const PRIORITY_BG: Record<string, string> = {
  high: "bg-red-500/20",
  medium: "bg-yellow-500/20",
  low: "bg-green-500/20",
};

export default function HomeOfficeGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-4">
              <Home size={14} className="text-indigo-400" />
              <span className="text-indigo-400 text-sm font-medium">DFW Work-From-Home Guide</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Optimize Your Home Office for Texas Life
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              <span className="text-white font-semibold">34% of DFW workers</span> are now remote or hybrid. A dedicated, properly upgraded home office adds an average of <span className="text-white font-semibold">$8,000</span> in home value per room.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { label: "DFW Remote Workers", value: "34%", sub: "remote or hybrid" },
              { label: "Value Added Per Room", value: "$8,000", sub: "dedicated office" },
              { label: "Productivity Boost", value: "21%", sub: "proper lighting & HVAC" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400 mb-0.5">{s.value}</div>
                <div className="text-xs font-semibold text-white mb-0.5">{s.label}</div>
                <div className="text-xs text-gray-500">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Upgrades */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-5">Priority Upgrades</h2>
            <div className="space-y-3">
              {UPGRADES.map((u) => (
                <div
                  key={u.headline}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full text-left p-5 flex items-start gap-4"
                    onClick={() => setExpanded(expanded === u.headline ? null : u.headline)}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: u.color + "22" }}>
                      <u.icon size={18} style={{ color: u.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm">{u.headline}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_BG[u.priority]} ${PRIORITY_COLOR[u.priority]}`}>
                          {u.priority} priority
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{u.category} · {u.cost}</div>
                    </div>
                    <span className="text-gray-500 text-lg">{expanded === u.headline ? "−" : "+"}</span>
                  </button>
                  {expanded === u.headline && (
                    <div className="px-5 pb-5">
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">{u.detail}</p>
                      {u.cta && (
                        <a href={u.cta.href}>
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                            {u.cta.label} →
                          </Button>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Fiber Internet */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Wifi size={20} className="text-indigo-400" />
              Fiber Internet Availability in DFW
            </h2>
            <p className="text-gray-400 text-sm mb-5">Most DFW suburbs have fiber options. If you don't have fiber yet, it's the single best WFH upgrade you can make.</p>
            <div className="space-y-3">
              {FIBER_CITIES.map((fc) => (
                <div key={fc.city} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="w-20 font-semibold text-sm text-white flex-shrink-0">{fc.city}</div>
                  <div className="flex-1 text-xs text-gray-400">{fc.providers.join(", ")}</div>
                  <div className="text-xs font-bold text-green-400 flex-shrink-0">{fc.maxSpeed}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTAs */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-yellow-500/30">
              <CardContent className="p-6">
                <Zap size={24} className="text-yellow-400 mb-3" />
                <h3 className="font-bold mb-1.5">Electrical Circuit Upgrade</h3>
                <p className="text-gray-400 text-sm mb-4">Get a dedicated 20A circuit and whole-home surge protection installed by a licensed electrician.</p>
                <a href="/trustypro/book">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm w-full">
                    Get Electrician Quotes →
                  </Button>
                </a>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-cyan-500/30">
              <CardContent className="p-6">
                <Thermometer size={24} className="text-cyan-400 mb-3" />
                <h3 className="font-bold mb-1.5">HVAC Zone for Your Office</h3>
                <p className="text-gray-400 text-sm mb-4">A mini-split or zone damper lets you control office temperature independently from the rest of the house.</p>
                <a href="/trustypro/book">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm w-full">
                    Get HVAC Quotes →
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
