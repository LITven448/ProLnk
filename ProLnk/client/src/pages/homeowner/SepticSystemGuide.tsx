import { useState } from 'react';
import HomeownerLayout from "@/components/HomeownerLayout";
import { AlertTriangle, CheckCircle, DollarSign, Wrench, ChevronDown, ChevronUp, Droplets } from "lucide-react";
import { Link } from "wouter";

const D = {
  bg: "#0A1628",
  surface: "#0F1E35",
  card: "#162540",
  border: "#1E3050",
  text: "#F0F4FF",
  muted: "#7B8FAD",
  dim: "#4A5E7A",
  teal: "#14B8A6",
  yellow: "#F5E642",
  red: "#EF4444",
  amber: "#F59E0B",
  green: "#10B981",
  blue: "#3B82F6",
};

const MAINTENANCE_SCHEDULE = [
  { task: "Pump the tank", frequency: "Every 3–5 years", note: "Shorter for DFW clay soil — pump every 3 years", icon: "pump" },
  { task: "Professional inspection", frequency: "Annually", note: "Check baffles, risers, distribution box", icon: "inspect" },
  { task: "Water usage audit", frequency: "Twice per year", note: "Excessive use overwhelms the drain field faster", icon: "water" },
  { task: "Drain field visual check", frequency: "Monthly", note: "Look for wet patches, odors, or unusual green growth", icon: "field" },
  { task: "Avoid heavy vehicle traffic", frequency: "Ongoing", note: "Never park or drive over your septic field — it collapses soil", icon: "traffic" },
];

const WARNING_SIGNS = [
  { sign: "Slow drains in multiple fixtures simultaneously", severity: "urgent" },
  { sign: "Gurgling sounds from toilets or drains", severity: "urgent" },
  { sign: "Sewage odors inside the home", severity: "urgent" },
  { sign: "Wet, spongy, or unusually lush patches in the yard", severity: "urgent" },
  { sign: "Sewage backup in lowest drains (basement, ground-floor bath)", severity: "critical" },
  { sign: "Green, fast-growing grass directly over the drain field", severity: "watch" },
  { sign: "Tank alarm going off (if equipped)", severity: "critical" },
];

const WHAT_TO_AVOID = [
  "Flushing wipes (even 'flushable' ones — they don't break down)",
  "Feminine hygiene products",
  "Medications — they kill beneficial bacteria in the tank",
  "Grease, fats, or cooking oils",
  "Antibacterial soaps used heavily — disrupts tank biology",
  "Chemical drain cleaners (Drano, etc.) — kills bacteria",
  "Garbage disposal waste — solids overwhelm the system",
  "Running the dishwasher and laundry simultaneously (surge loading)",
];

const COST_GUIDE = [
  { service: "Tank Pumping", range: "$300 – $500", note: "Every 3–5 years in DFW" },
  { service: "Professional Inspection", range: "$150 – $300", note: "Annual, includes camera inspection" },
  { service: "Baffle Replacement", range: "$150 – $500", note: "Per baffle, inlet or outlet" },
  { service: "Minor Repairs (pipes, lids)", range: "$500 – $3,000", note: "Cracks, broken risers, distribution box" },
  { service: "Drain Field Repair", range: "$3,000 – $10,000", note: "Partial failure, rejuvenation treatment" },
  { service: "Full System Replacement", range: "$8,000 – $25,000", note: "Full drain field + tank replacement" },
];

const DFW_CITIES = ["Celina", "Forney", "Wylie", "Burleson", "Midlothian", "Waxahachie", "Royse City", "Terrell", "Kaufman", "Cleburne"];

export default function SepticSystemGuide() {
  const [openSection, setOpenSection] = useState<string | null>("basics");

  const toggle = (id: string) => setOpenSection(openSection === id ? null : id);

  return (
    <HomeownerLayout>
      <div className="min-h-screen px-4 py-8 md:px-8 md:py-12" style={{ background: D.bg, color: D.text }}>
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold mb-5" style={{ background: "rgba(20,184,166,0.15)", color: D.teal, border: `1px solid rgba(20,184,166,0.3)` }}>
              <Droplets className="w-3.5 h-3.5" />
              Rural DFW Homeowner Guide
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              Septic System Guide for DFW Rural Homeowners
            </h1>
            <p className="text-base leading-relaxed" style={{ color: D.muted }}>
              Thousands of homes in Celina, Forney, Wylie, Burleson, and the outer DFW ring rely on septic systems. DFW's expansive black clay soil creates unique challenges that most generic guides miss. Here's everything you need to know.
            </p>
          </div>

          {/* DFW Cities Covered */}
          <div className="rounded-2xl p-5 mb-8 flex flex-wrap gap-2" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
            <span className="text-xs font-semibold mr-2" style={{ color: D.muted }}>Common septic zones:</span>
            {DFW_CITIES.map(city => (
              <span key={city} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "rgba(245,230,66,0.1)", color: D.yellow, border: `1px solid rgba(245,230,66,0.2)` }}>{city}</span>
            ))}
          </div>

          {/* How It Works */}
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid ${D.border}`, background: D.surface }}>
            <button onClick={() => toggle("basics")} className="w-full flex items-center justify-between px-6 py-5 text-left">
              <span className="font-bold text-base">How a Septic System Works</span>
              {openSection === "basics" ? <ChevronUp className="w-5 h-5" style={{ color: D.muted }} /> : <ChevronDown className="w-5 h-5" style={{ color: D.muted }} />}
            </button>
            {openSection === "basics" && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: D.border }}>
                <div className="grid md:grid-cols-3 gap-4 mt-5">
                  {[
                    { step: "1", title: "Wastewater Enters Tank", desc: "All household wastewater flows into the buried septic tank. Heavy solids sink to form sludge. Lighter materials (grease, oils) float to form scum. The liquid layer (effluent) in the middle flows out." },
                    { step: "2", title: "Bacterial Digestion", desc: "Naturally occurring anaerobic bacteria in the tank digest and break down organic material. This is why antibiotics, bleach, and antibacterial cleaners damage your system — they kill the bacteria." },
                    { step: "3", title: "Drain Field Absorption", desc: "Effluent flows through a distribution box to perforated pipes in the drain field (leach field). Soil microbes filter remaining contaminants. In DFW clay soil, this process is slower than in sandy soils." },
                  ].map(s => (
                    <div key={s.step} className="rounded-xl p-5" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm mb-3" style={{ background: "rgba(20,184,166,0.2)", color: D.teal }}>{s.step}</div>
                      <div className="font-bold text-sm mb-2">{s.title}</div>
                      <p className="text-xs leading-relaxed" style={{ color: D.muted }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-xl" style={{ background: "rgba(245,230,66,0.08)", border: "1px solid rgba(245,230,66,0.2)" }}>
                  <div className="font-bold text-sm mb-1" style={{ color: D.yellow }}>DFW Clay Soil Warning</div>
                  <p className="text-xs leading-relaxed" style={{ color: D.muted }}>
                    North Texas's expansive black clay soil has very low permeability compared to sandy soils in South Texas or the Hill Country. Effluent absorbs much more slowly, which means your drain field saturates faster. Plan to pump every 3 years rather than the national average of 3–5 years.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Maintenance Schedule */}
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid ${D.border}`, background: D.surface }}>
            <button onClick={() => toggle("maintenance")} className="w-full flex items-center justify-between px-6 py-5 text-left">
              <span className="font-bold text-base">Maintenance Schedule</span>
              {openSection === "maintenance" ? <ChevronUp className="w-5 h-5" style={{ color: D.muted }} /> : <ChevronDown className="w-5 h-5" style={{ color: D.muted }} />}
            </button>
            {openSection === "maintenance" && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: D.border }}>
                <div className="mt-5 space-y-3">
                  {MAINTENANCE_SCHEDULE.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 rounded-xl" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                      <Wrench className="w-5 h-5 shrink-0 mt-0.5" style={{ color: D.teal }} />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <span className="font-bold text-sm">{item.task}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(20,184,166,0.15)", color: D.teal }}>{item.frequency}</span>
                        </div>
                        <p className="text-xs" style={{ color: D.muted }}>{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Warning Signs */}
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid ${D.border}`, background: D.surface }}>
            <button onClick={() => toggle("warnings")} className="w-full flex items-center justify-between px-6 py-5 text-left">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" style={{ color: D.amber }} />
                <span className="font-bold text-base">Warning Signs — Act Immediately</span>
              </div>
              {openSection === "warnings" ? <ChevronUp className="w-5 h-5" style={{ color: D.muted }} /> : <ChevronDown className="w-5 h-5" style={{ color: D.muted }} />}
            </button>
            {openSection === "warnings" && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: D.border }}>
                <div className="mt-5 space-y-2">
                  {WARNING_SIGNS.map((w, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: w.severity === "critical" ? "rgba(239,68,68,0.08)" : w.severity === "urgent" ? "rgba(245,158,11,0.08)" : "rgba(20,184,166,0.05)", border: `1px solid ${w.severity === "critical" ? "rgba(239,68,68,0.2)" : w.severity === "urgent" ? "rgba(245,158,11,0.2)" : "rgba(20,184,166,0.15)"}` }}>
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: w.severity === "critical" ? D.red : w.severity === "urgent" ? D.amber : D.teal }} />
                      <span className="text-sm">{w.sign}</span>
                      {w.severity === "critical" && <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.2)", color: D.red }}>CRITICAL</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* What to Avoid */}
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid ${D.border}`, background: D.surface }}>
            <button onClick={() => toggle("avoid")} className="w-full flex items-center justify-between px-6 py-5 text-left">
              <span className="font-bold text-base">What to Never Flush or Drain</span>
              {openSection === "avoid" ? <ChevronUp className="w-5 h-5" style={{ color: D.muted }} /> : <ChevronDown className="w-5 h-5" style={{ color: D.muted }} />}
            </button>
            {openSection === "avoid" && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: D.border }}>
                <div className="mt-5 grid sm:grid-cols-2 gap-2">
                  {WHAT_TO_AVOID.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg text-sm" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                      <span style={{ color: D.red }}>✕</span>
                      <span style={{ color: D.muted }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cost Guide */}
          <div className="rounded-2xl overflow-hidden mb-8" style={{ border: `1px solid ${D.border}`, background: D.surface }}>
            <button onClick={() => toggle("costs")} className="w-full flex items-center justify-between px-6 py-5 text-left">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" style={{ color: D.green }} />
                <span className="font-bold text-base">DFW Cost Guide (2026)</span>
              </div>
              {openSection === "costs" ? <ChevronUp className="w-5 h-5" style={{ color: D.muted }} /> : <ChevronDown className="w-5 h-5" style={{ color: D.muted }} />}
            </button>
            {openSection === "costs" && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: D.border }}>
                <div className="mt-5 space-y-2">
                  {COST_GUIDE.map((c, i) => (
                    <div key={i} className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                      <div>
                        <div className="font-semibold text-sm">{c.service}</div>
                        <div className="text-xs mt-0.5" style={{ color: D.muted }}>{c.note}</div>
                      </div>
                      <div className="font-black text-base" style={{ color: D.green }}>{c.range}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))", border: `1px solid rgba(20,184,166,0.3)` }}>
            <CheckCircle className="w-10 h-10 mx-auto mb-4" style={{ color: D.teal }} />
            <h2 className="text-2xl font-black mb-3">Find a Verified Septic Specialist</h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: D.muted }}>
              ProLnk connects DFW homeowners with licensed, insured septic contractors — no door-to-door, no scams, verified credentials only.
            </p>
            <Link href="/homeowner-signup">
              <span className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl cursor-pointer" style={{ background: D.teal, color: "white" }}>
                Get Septic Quotes
              </span>
            </Link>
            <p className="mt-3 text-xs" style={{ color: D.dim }}>Free to use · No commitment required</p>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
