import { useState } from 'react';
import HomeownerLayout from "@/components/HomeownerLayout";
import { Wind, Calendar, CheckCircle, ChevronDown, ChevronUp, TrendingDown, Home } from "lucide-react";
import { Link } from "wouter";

const D = {
  bg: "#0A1628″,
  surface: "#0F1E35″,
  card: "#162540″,
  border: "#1E3050″,
  text: "#F0F4FF",
  muted: "#7B8FAD",
  dim: "#4A5E7A",
  teal: "#14B8A6″,
  yellow: "#F5E642″,
  red: "#EF4444″,
  amber: "#F59E0B",
  green: "#10B981″,
  purple: "#A855F7″,
};

const ALLERGY_SEASONS = [
  { months: "Jan – Feb", culprit: "Mountain Cedar", severity: "Extreme", color: D.red, tip: "Keep windows closed. Run HVAC on recirculate. Check pollen count daily at pollen.com." },
  { months: "Mar – Apr", culprit: "Oak & Elm", severity: "High", color: D.amber, tip: "Replace HVAC filter now if you haven't this season. Wipe down surfaces daily. Shower before bed." },
  { months: "May – Sep", culprit: "Grass Pollen", severity: "Moderate–High", color: D.amber, tip: "Mow lawn when pollen counts are lower (mid-day). Remove shoes at the door. Vacuum with HEPA filter." },
  { months: "Aug – Nov", culprit: "Ragweed", severity: "High", color: D.amber, tip: "Peak in September. Run air purifier on high. Dry laundry indoors during peak weeks." },
  { months: "Year-Round", culprit: "Dust Mites, Mold, Pet Dander", severity: "Varies", color: D.purple, tip: "These indoor allergens persist regardless of season. Source reduction in the home is the only solution." },
];

const IMPROVEMENTS = [
  {
    title: "MERV-13 Filter Upgrade",
    reduction: "–58% airborne particles",
    reductionColor: D.green,
    cost: "$20–$40/filter",
    detail: "Standard 1-inch MERV-8 filters capture only 20–30% of sub-micron particles. MERV-13 captures 85%+. Change every 60–90 days (faster if you have pets). Caution: check your HVAC manual — some older systems can't handle MERV-13 restriction.",
    icon: Wind,
  },
  {
    title: "Air Duct Cleaning",
    reduction: "Removes 7–10 lbs of dust on average",
    reductionColor: D.teal,
    cost: "$300–$600 (whole home)",
    detail: "DFW's constant wind and construction activity means ducts accumulate dust faster than most US cities. A professional cleaning every 5–7 years removes allergen reservoirs from inside the duct system. Look for NADCA-certified technicians only.",
    icon: Home,
  },
  {
    title: "Hard Flooring vs Carpet",
    reduction: "–35% allergen retention",
    reductionColor: D.green,
    cost: "$3–$12/sq ft installed",
    detail: "Carpet traps and holds allergens — dust mites, pet dander, pollen — at concentrations 100x higher than hard surfaces. In DFW homes, the highest-impact replacement is bedroom carpet first, where you spend 8 hours breathing per night.",
    icon: Home,
  },
  {
    title: "Whole-Home Dehumidifier",
    reduction: "Eliminates mold growth (RH <50%)",
    reductionColor: D.teal,
    cost: "$1,200–$2,800 installed",
    detail: "DFW's summer humidity spikes to 80–90% during rainstorms. Mold requires >60% relative humidity to grow. A whole-home dehumidifier integrated with your HVAC maintains RH below 50% without compromising comfort. Stand-alone units only help one room.",
    icon: Wind,
  },
  {
    title: "HEPA Air Purifier",
    reduction: "Removes 99.97% of airborne particles",
    reductionColor: D.green,
    cost: "$200–$800/unit",
    detail: "True HEPA filters capture particles down to 0.3 microns — including most pollen, dust mite debris, pet dander, and mold spores. Size your unit to 1.5x the room's square footage for effective filtration. Run continuously during peak seasons.",
    icon: Wind,
  },
  {
    title: "HVAC Air Quality Service",
    reduction: "Full system allergen reset",
    reductionColor: D.amber,
    cost: "$150–$400″,
    detail: "Beyond filter changes, a full HVAC tune-up includes coil cleaning, condensate drain clearing (mold growth point), blower cleaning, and UV light inspection. Dirty coils and drains are prime mold and bacteria breeding grounds that spread through every room.",
    icon: Home,
  },
];

const MONTHLY_CALENDAR = [
  { month: "Jan", action: "HEPA on high. Close windows. Track Mountain Cedar count." },
  { month: "Feb", action: "Change HVAC filter before Oak season. Schedule duct cleaning." },
  { month: "Mar", action: "Wipe down surfaces after outdoor activity. Shower before bed." },
  { month: "Apr", action: "Vacuum all carpets with HEPA vacuum. Wash bedding in hot water." },
  { month: "May", action: "Check AC drainage line for mold. Mow midday only." },
  { month: "Jun", action: "Test and adjust whole-home humidity (target <50%)." },
  { month: "Jul", action: "Change HVAC filter. Check for mold in bathroom ceilings." },
  { month: "Aug", action: "Ragweed season begins. HEPA purifier to max. Remove shoes at door." },
  { month: "Sep", action: "Peak ragweed. Dry laundry inside. Keep windows closed." },
  { month: "Oct", action: "Air out home as temperatures drop and pollen decreases." },
  { month: "Nov", action: "Deep clean HVAC system before winter heating season." },
  { month: "Dec", action: "Check basement/crawlspace for mold from fall moisture." },
];

export default function DFWAllergiesHomeGuide() {
  const [openSection, setOpenSection] = useState<string | null>("seasons");

  const toggle = (id: string) => setOpenSection(openSection === id ? null : id);

  return (
    <HomeownerLayout>
      <div className="min-h-screen px-4 py-8 md:px-8 md:py-12″ style={{ background: D.bg, color: D.text }}>
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="mb-10″>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold mb-5″ style={{ background: "rgba(168,85,247,0.15)", color: D.purple, border: "1px solid rgba(168,85,247,0.3)" }}>
              <Wind className="w-3.5 h-3.5″ />
              DFW ranks #8 worst city for allergies in the US
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              DFW Allergies & Your Home — Reduce Indoor Allergens by 60%
            </h1>
            <p className="text-base leading-relaxed" style={{ color: D.muted }}>
              Mountain Cedar, Oak, Ragweed — Dallas-Fort Worth has one of the longest and most aggressive allergy seasons in the country. But the right home upgrades can dramatically reduce your indoor allergen load regardless of what's happening outside.
            </p>
          </div>

          {/* DFW Allergy Season Overview */}
          <div className="rounded-2xl overflow-hidden mb-4″ style={{ border: `1px solid ${D.border}`, background: D.surface }}>
            <button onClick={() => toggle("seasons")} className="w-full flex items-center justify-between px-6 py-5 text-left">
              <div className="flex items-center gap-2″>
                <Calendar className="w-4 h-4″ style={{ color: D.yellow }} />
                <span className="font-bold text-base">DFW Allergy Season Calendar</span>
              </div>
              {openSection === "seasons" ? <ChevronUp className="w-5 h-5″ style={{ color: D.muted }} /> : <ChevronDown className="w-5 h-5" style={{ color: D.muted }} />}
            </button>
            {openSection === "seasons" && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: D.border }}>
                <div className="mt-5 space-y-3″>
                  {ALLERGY_SEASONS.map((s, i) => (
                    <div key={i} className="rounded-xl p-4″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
                      <div className="flex flex-wrap items-center gap-3 mb-2″>
                        <span className="font-black text-sm" style={{ color: s.color }}>{s.months}</span>
                        <span className="font-bold text-sm">{s.culprit}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${s.color}20`, color: s.color }}>{s.severity}</span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: D.muted }}>{s.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Home Improvements */}
          <div className="rounded-2xl overflow-hidden mb-4″ style={{ border: `1px solid ${D.border}`, background: D.surface }}>
            <button onClick={() => toggle("improvements")} className="w-full flex items-center justify-between px-6 py-5 text-left">
              <div className="flex items-center gap-2″>
                <TrendingDown className="w-4 h-4″ style={{ color: D.green }} />
                <span className="font-bold text-base">Home Improvements That Reduce Allergens</span>
              </div>
              {openSection === "improvements" ? <ChevronUp className="w-5 h-5″ style={{ color: D.muted }} /> : <ChevronDown className="w-5 h-5" style={{ color: D.muted }} />}
            </button>
            {openSection === "improvements" && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: D.border }}>
                <div className="mt-5 space-y-4″>
                  {IMPROVEMENTS.map((imp, i) => {
                    const Icon = imp.icon;
                    return (
                      <div key={i} className="rounded-xl p-5″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3″>
                          <div className="flex items-center gap-3″>
                            <Icon className="w-5 h-5 shrink-0″ style={{ color: D.teal }} />
                            <span className="font-bold text-sm">{imp.title}</span>
                          </div>
                          <div className="flex flex-wrap gap-2″>
                            <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ background: `${imp.reductionColor}20`, color: imp.reductionColor }}>{imp.reduction}</span>
                            <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.05)", color: D.muted }}>{imp.cost}</span>
                          </div>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: D.muted }}>{imp.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Monthly Calendar */}
          <div className="rounded-2xl overflow-hidden mb-8″ style={{ border: `1px solid ${D.border}`, background: D.surface }}>
            <button onClick={() => toggle("calendar")} className="w-full flex items-center justify-between px-6 py-5 text-left">
              <div className="flex items-center gap-2″>
                <Calendar className="w-4 h-4″ style={{ color: D.teal }} />
                <span className="font-bold text-base">Month-by-Month Prevention Guide</span>
              </div>
              {openSection === "calendar" ? <ChevronUp className="w-5 h-5″ style={{ color: D.muted }} /> : <ChevronDown className="w-5 h-5" style={{ color: D.muted }} />}
            </button>
            {openSection === "calendar" && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: D.border }}>
                <div className="mt-5 grid sm:grid-cols-2 gap-2″>
                  {MONTHLY_CALENDAR.map((m, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                      <span className="font-black text-sm w-8 shrink-0 pt-0.5″ style={{ color: D.teal }}>{m.month}</span>
                      <p className="text-xs leading-relaxed" style={{ color: D.muted }}>{m.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))", border: "1px solid rgba(20,184,166,0.3)" }}>
            <CheckCircle className="w-10 h-10 mx-auto mb-4″ style={{ color: D.teal }} />
            <h2 className="text-2xl font-black mb-3″>Schedule HVAC Air Quality Service</h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: D.muted }}>
              A licensed HVAC technician can assess your system's allergen load, replace filters, clean coils, and recommend upgrades specific to your DFW home.
            </p>
            <Link href="/homeowner-signup">
              <span className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl cursor-pointer" style={{ background: D.teal, color: "white" }}>
                Find HVAC Specialists Near Me
              </span>
            </Link>
            <p className="mt-3 text-xs" style={{ color: D.dim }}>Licensed, insured, DFW-verified pros only</p>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
