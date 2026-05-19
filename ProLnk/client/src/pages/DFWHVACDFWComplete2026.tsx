import { useState } from 'react';

const DFW_SITUATIONS = [
  "New homeowner in DFW — no HVAC history",
  "System 10+ years old — considering replacement",
  "High energy bills — want to reduce costs",
  "Uneven temperatures between rooms",
  "System broke down in summer heat",
  "Planning a home addition or renovation",
  "Concerned about air quality and allergies",
  "Rental property owner — need reliable low-maintenance system",
];

const PRIORITIES = [
  "Lowest upfront cost",
  "Lowest long-term operating cost",
  "Best comfort and temperature control",
  "Best indoor air quality",
  "Fastest solution — need AC now",
  "Highest reliability — minimal service calls",
];

interface CompleteGuidance {
  overview: string;
  system: string;
  suburbs: string;
  solution: string;
  timeline: string;
}

const COMPLETE_GUIDANCE: Record<string, Record<string, CompleteGuidance>> = {
  "New homeowner in DFW — no HVAC history": {
    "Lowest upfront cost": {
      overview: "Welcome to DFW homeownership. HVAC is your largest mechanical system and biggest utility cost — up to $300/month in peak summer.",
      system: "Get a full HVAC inspection before anything else ($75-$150). Know your system age, refrigerant type, and filter size. Most DFW homes have gas furnace + electric AC split system.",
      suburbs: "North DFW (Frisco, McKinney, Allen): newer construction, larger homes, often 2-zone systems. South DFW (Mansfield, Midlothian): older construction, single-zone systems more common. All DFW suburbs: expect 3-5 ton units.",
      solution: "1) Get inspection. 2) Replace filter (1-inch or 4-inch media). 3) Set thermostat to 78°F cooling, 68°F heating. 4) Sign up for annual maintenance contract ($150-$300/year).",
      timeline: "Complete inspection within first 30 days of ownership. Annual maintenance every March before cooling season.",
    },
    "Best comfort and temperature control": {
      overview: "DFW has one of the most demanding HVAC climates in the US — 100+ days above 95°F, plus cold snaps below 20°F. Comfort requires the right system, not just any system.",
      system: "Variable-speed air handler + 2-stage or variable compressor outdoor unit gives the best comfort in DFW. Longer run cycles at lower speed maintain more even temperatures and better dehumidification.",
      suburbs: "Two-story homes in Southlake, Colleyville, Flower Mound: upstairs zone often 5-8°F warmer — zoning system or mini-split for upstairs is the best solution.",
      solution: "1) Verify your system is properly sized via Manual J. 2) Add zoning if upstairs is too warm. 3) Consider variable-speed upgrade if system is older than 12 years. 4) Add smart thermostat (ecobee or Nest) for remote control.",
      timeline: "Smart thermostat: install immediately. Zoning or variable-speed: plan for off-season (October-March) to get best pricing.",
    },
    "Lowest long-term operating cost": {
      overview: "DFW energy bills for HVAC average $150-$350/month in summer. Over 10 years, that is $18,000-$42,000. Investing in efficiency now pays back in 3-7 years.",
      system: "SEER2 18+ system reduces cooling costs 30-40% vs. a SEER 14 system. Variable-speed systems with MERV-13 filtration also reduce service calls. Check Oncor and Atmos rebates — up to $1,500 in DFW utility rebates available.",
      suburbs: "All DFW suburbs qualify for Oncor rebates. Check energystar.gov for local utility rebate lookup. Some cities (Plano, Irving) offer additional efficiency incentives.",
      solution: "1) Get current system SEER rating. 2) Calculate annual cooling hours (DFW: 2,500-3,000 hours). 3) Run ROI calculation on SEER 18+ upgrade. 4) Apply for Oncor rebate before installation.",
      timeline: "Install in spring or fall for best contractor pricing. Rebate applications must be submitted within 90 days of installation.",
    },
    "Best indoor air quality": {
      overview: "DFW air quality challenges: cedar fever (Dec-Feb), oak pollen (March-May), grass pollen (May-July), ragweed (Aug-Oct), plus dust and ozone alerts in summer.",
      system: "4-inch media filter (MERV 13) + UV air purifier at coil + ERV or HRV for fresh air exchange gives best IAQ. Standard 1-inch filters at MERV 8 or below miss 40% of airborne particles.",
      suburbs: "North DFW suburbs near construction zones (Celina, Princeton, Prosper): higher dust load. Near Elm Fork or Trinity River: higher mold spore counts in spring. All DFW: cedar pollen peaks December through February.",
      solution: "1) Upgrade to 4-inch MERV-13 filter. 2) Install UV-C light at evaporator coil. 3) Check duct sealing — duct leaks pull attic air (mold, dust) into living space. 4) Consider whole-home air purifier (Aprilaire 5000 or equivalent).",
      timeline: "Filter upgrade: do immediately. UV light: add at next service call. ERV/HRV: plan for fall installation.",
    },
    "Fastest solution — need AC now": {
      overview: "In DFW summer heat, a failed AC is a health emergency — indoor temps can reach 100°F+ within hours.",
      system: "Get a pro on-site within 4 hours. Most failures are: capacitor ($50-$150 part), contactor ($30-$75 part), or low refrigerant ($150-$400 recharge). These are same-day repairs.",
      suburbs: "Most DFW HVAC companies offer 24/7 emergency service. Expect $150-$250 emergency call fee on evenings and weekends. ProLnk connects you with verified DFW HVAC pros available now.",
      solution: "1) Check breaker first. 2) Check filter — a clogged filter causes 30% of no-cooling calls. 3) Check thermostat settings. 4) Call a pro — do not delay in DFW summer.",
      timeline: "Same-day repair expected for most common failures. If compressor failed, expedited replacement can be done in 1-2 days with a stocked distributor.",
    },
    "Highest reliability — minimal service calls": {
      overview: "DFW HVAC runs 10-14 hours/day in summer — equivalent to 3-4 years of northern climate HVAC use in a single Texas summer. Reliability requires proactive maintenance.",
      system: "American Standard, Carrier, and Trane have the best track records in DFW market per installer feedback. Variable-speed systems have more electronics but fewer mechanical wear points. Annual maintenance is non-negotiable in DFW.",
      suburbs: "All DFW suburbs: annual maintenance contract with same company that installed system. Builds relationship, priority service, and discounted parts. Some companies offer labor warranty extensions.",
      solution: "1) Annual tune-up every March. 2) Change 1-inch filter monthly (4-inch every 6-9 months). 3) Clear condensate drain quarterly. 4) Check refrigerant charge every 3 years.",
      timeline: "Maintenance contract: sign before cooling season. First tune-up: this March. Filter schedule: set phone reminder.",
    },
  },
};

const GENERAL_SUBURBS = [
  { name: "North DFW (Frisco, McKinney, Allen, Prosper)", note: "Newer construction, 2-zone systems common, 3-5 ton units, high attic temps" },
  { name: "West DFW (Southlake, Keller, Colleyville)", note: "Larger homes, premium systems, 2-story zoning needs common" },
  { name: "East DFW (Rockwall, Garland, Mesquite)", note: "Mix of ages, some older systems, standard split systems prevalent" },
  { name: "South DFW (Mansfield, Cedar Hill, Midlothian)", note: "Growing market, newer construction increasing, standard single-zone" },
  { name: "Core DFW (Dallas, Fort Worth, Arlington)", note: "Older housing stock, varied system types, higher replacement rate" },
];

export default function DFWHVACDFWComplete2026() {
  const [situation, setSituation] = useState("");
  const [priority, setPriority] = useState("");

  const result = situation && priority ? COMPLETE_GUIDANCE[situation]?.[priority] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Complete 2026 Guide 🏆</h1>
        <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 32 }}>
          The complete 2026 DFW HVAC guide — all systems, all suburbs, all concerns, all solutions — in one final reference page for every DFW homeowner.
        </p>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🎯 Your 2026 DFW HVAC Guidance</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Your DFW Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", fontSize: 14 }}>
              <option value="">Select your situation...</option>
              {DFW_SITUATIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Your Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", fontSize: 14 }}>
              <option value="">Select your priority...</option>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: "#0A1628", borderRadius: 8, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16, fontStyle: "italic" }}>{result.overview}</p>
              {[["🏗️ System Insight", result.system], ["📍 DFW Suburb Context", result.suburbs], ["✅ Solution Steps", result.solution], ["📅 Timeline", result.timeline]].map(([label, text]) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{label}</div>
                  <p style={{ color: "#e2e8f0", fontSize: 14 }}>{text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 14 }}>📍 DFW Suburb HVAC Overview</div>
          {GENERAL_SUBURBS.map(s => (
            <div key={s.name} style={{ padding: "10px 0", borderBottom: "1px solid #1e3a5f" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{s.name}</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#475569", fontSize: 12 }}>
          ProLnk — connecting every DFW homeowner with the right HVAC pro. © 2026 ProLnk
        </div>
      </div>
    </div>
  );
}
