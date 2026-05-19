import { useState } from 'react';

const homeAges = ["Pre-1980 (Original wiring likely)", "1980-2000 (100A panel era)", "2000-2015 (200A but needs updates)", "2015+ (Newer construction)"];
const needs = ["Adding EV charger", "Home office setup", "HVAC upgrade / new unit", "General aging concerns", "Selling the home", "Storm / ERCOT protection"];

type Priority = "critical" | "high" | "medium";

interface Upgrade {
  upgrade: string;
  cost: string;
  roi: string;
  priority: Priority;
  note: string;
}

const upgradeMatrix: Record<string, Record<string, Upgrade[]>> = {
  "Pre-1980 (Original wiring likely)": {
    "Adding EV charger": [{ upgrade: "200A Panel Upgrade", cost: "$3,000-5,000", roi: "Required for EV + modern loads", priority: "critical", note: "Pre-1980 homes often have 60-100A panels. EV chargers require 200A." }, { upgrade: "Dedicated 240V Circuit (EV)", cost: "$400-800", roi: "Enables Level 2 charging (7x faster)", priority: "critical", note: "After panel upgrade, add 50A dedicated circuit to garage." }, { upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "Protects $5,000+ EV charger from ERCOT spikes", priority: "high", note: "DFW ERCOT events can spike voltage and damage EV equipment." }],
    "HVAC upgrade / new unit": [{ upgrade: "200A Panel Upgrade", cost: "$3,000-5,000", roi: "Modern HVAC requires 200A service", priority: "critical", note: "New HVAC units often require 40-60A dedicated circuit — impossible on 100A panel." }, { upgrade: "Dedicated HVAC Circuit", cost: "$300-600", roi: "Prevents breaker trips from shared circuits", priority: "high", note: "Pre-1980 DFW homes rarely have dedicated HVAC circuits." }],
    "General aging concerns": [{ upgrade: "Full Electrical Inspection", cost: "$150-300", roi: "Identifies fire hazards before they happen", priority: "critical", note: "Pre-1980 homes may have aluminum wiring, knob-and-tube, or ungrounded outlets." }, { upgrade: "200A Panel Upgrade", cost: "$3,000-5,000", roi: "Eliminates overload risk, required for modern appliances", priority: "critical", note: "100A panels are inadequate for modern DFW homes with AC, EV, and home office." }, { upgrade: "GFCI/AFCI Breaker Upgrade", cost: "$800-1,500", roi: "Arc and ground fault protection — reduces fire risk 70%", priority: "high", note: "Modern code requires GFCI/AFCI protection — add protection without rewiring." }],
    "Storm / ERCOT protection": [{ upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "One ERCOT event can cause $10K+ in appliance damage", priority: "critical", note: "Install at panel. DFW 2021 freeze event caused widespread electrical surges." }, { upgrade: "Generator Transfer Switch", cost: "$500-1,500", roi: "Keep essentials running during Oncor outages", priority: "high", note: "Enables safe generator use without backfeed risk." }],
    "Home office setup": [{ upgrade: "Dedicated 20A Circuit", cost: "$200-400", roi: "Eliminates tripped breakers from shared circuits", priority: "high", note: "Computers, monitors, and printers on shared circuits cause overloads." }, { upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "Protects $3,000+ in computer equipment", priority: "high", note: "ERCOT voltage events can destroy unprotected electronics." }],
    "Selling the home": [{ upgrade: "Full Electrical Inspection", cost: "$150-300", roi: "Prevents buyer inspection surprises", priority: "critical", note: "Pre-1980 electrical issues are common deal-killers in DFW home sales." }, { upgrade: "Panel Assessment", cost: "$150-300", roi: "Buyers and lenders flag 100A panels", priority: "high", note: "Older panels often flagged by home inspectors and insurance companies." }],
  },
  "1980-2000 (100A panel era)": {
    "Adding EV charger": [{ upgrade: "200A Panel Upgrade", cost: "$3,000-5,000", roi: "Required — 100A panels cannot support EV", priority: "critical", note: "Most 1980-2000 DFW homes have 100A service — inadequate for EV plus modern loads." }, { upgrade: "EV Dedicated Circuit", cost: "$400-800", roi: "7x faster charging vs. Level 1", priority: "critical", note: "50A dedicated circuit for Level 2 EVSE after panel upgrade." }],
    "Storm / ERCOT protection": [{ upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "Essential for DFW — ERCOT events frequent", priority: "critical", note: "Most 1980-2000 homes lack any surge protection at panel." }, { upgrade: "AFCI Breaker Upgrade", cost: "$800-1,200", roi: "Arc fault protection — DFW house settling causes arc faults in aging wiring", priority: "high", note: "1980s wiring connections loosen from DFW clay soil foundation movement." }],
    "General aging concerns": [{ upgrade: "200A Panel Upgrade", cost: "$3,000-5,000", roi: "Prepares home for next 20 years", priority: "high", note: "100A panels handle 1980s loads but not 2026 demands." }, { upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "Immediate protection from ERCOT grid events", priority: "high", note: "Best bang-for-buck upgrade for DFW homeowners." }],
    "HVAC upgrade / new unit": [{ upgrade: "Dedicated HVAC Circuit Assessment", cost: "$150-300", roi: "Verify existing circuit can handle new unit", priority: "high", note: "New HVAC units are more efficient but may have different amperage requirements." }],
    "Home office setup": [{ upgrade: "Dedicated 20A Circuit", cost: "$200-400", roi: "Reliable power for home office equipment", priority: "high", note: "1980-2000 homes often lack sufficient outlets in bedroom/office areas." }, { upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "Protects electronics from ERCOT grid events", priority: "high", note: "Grid events in DFW are increasing — protection is essential." }],
    "Selling the home": [{ upgrade: "GFCI Outlet Upgrades", cost: "$200-600", roi: "Required by code — eliminates inspection flags", priority: "high", note: "Bathrooms, kitchens, garage, outdoor outlets must have GFCI protection." }, { upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "Modern buyers expect this — adds perceived value", priority: "medium", note: "Easy upgrade that signals electrical care to buyers." }],
  },
  "2000-2015 (200A but needs updates)": {
    "Adding EV charger": [{ upgrade: "EV Dedicated Circuit", cost: "$400-800", roi: "Fast Level 2 charging at home", priority: "high", note: "200A panel supports EV — just need dedicated 50A circuit to garage." }],
    "Storm / ERCOT protection": [{ upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "Pays for itself in one ERCOT spike event", priority: "critical", note: "2000-2015 homes likely lack panel-level surge protection." }],
    "General aging concerns": [{ upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "Best ROI upgrade available", priority: "high", note: "Install at panel. Protects entire home from grid surges." }, { upgrade: "AFCI Breaker Upgrade", cost: "$600-1,200", roi: "Modern fire protection for 15-year-old wiring", priority: "medium", note: "AFCI protection adds fire safety layer as wiring ages." }],
    "Home office setup": [{ upgrade: "Dedicated 20A Circuit", cost: "$200-400", roi: "Reliable power, no tripped breakers", priority: "medium", note: "Easy to add with 200A service already present." }],
    "HVAC upgrade / new unit": [{ upgrade: "Dedicated Circuit Verification", cost: "$100-200", roi: "Confirm existing circuit meets new unit specs", priority: "medium", note: "Newer homes usually have dedicated HVAC circuits but worth verifying." }],
    "Selling the home": [{ upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "Attractive to tech-savvy buyers", priority: "medium", note: "Low cost, high perceived value signal." }],
  },
  "2015+ (Newer construction)": {
    "Adding EV charger": [{ upgrade: "EV Dedicated Circuit", cost: "$300-600", roi: "Enable Level 2 charging", priority: "high", note: "Newer homes built EV-ready with conduit — cheaper to complete." }],
    "Storm / ERCOT protection": [{ upgrade: "Whole-Home Surge Protector", cost: "$300-500", roi: "Newer smart home devices need surge protection", priority: "high", note: "Smart panels, EV chargers, and home automation are expensive to replace." }],
    "General aging concerns": [{ upgrade: "Electrical Inspection", cost: "$150-300", roi: "Peace of mind and warranty documentation", priority: "low", note: "Newer homes rarely need major work, but inspection validates everything." }],
    "Home office setup": [{ upgrade: "Dedicated Circuit (if needed)", cost: "$200-400", roi: "Reliable power isolation", priority: "medium", note: "Newer homes are better wired but dedicated circuits still worth it for heavy workstations." }],
    "HVAC upgrade / new unit": [{ upgrade: "Verify Circuit Compatibility", cost: "$100-200", roi: "Confirm new unit amperage matches existing circuit", priority: "low", note: "Newer construction typically sized correctly, but confirm before install." }],
    "Selling the home": [{ upgrade: "EV Charger Rough-In", cost: "$300-500", roi: "Major selling point in 2026 DFW market", priority: "high", note: "EV adoption in DFW growing rapidly — homes with EV infrastructure sell faster." }],
  },
};

const priorityStyle: Record<Priority, string> = { critical: "#ef4444", high: "#f97316", medium: "#eab308" };

export default function DFWElectricalUpgradeROI2026() {
  const [homeAge, setHomeAge] = useState("");
  const [need, setNeed] = useState("");
  const upgrades = homeAge && need ? upgradeMatrix[homeAge]?.[need] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 14, marginBottom: 8 }}>⚡ DFW ELECTRICAL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Electrical Upgrade ROI Guide</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>Best electrical upgrades for DFW homes in 2026 — prioritized by ROI, home age, and your specific needs.</p>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 16, fontSize: 18 }}>🏠 Find Your Priority Upgrades</h2>
          <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#94a3b8" }}>Home Age</label>
          <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 15 }}>
            <option value="">Select home age...</option>
            {homeAges.map(a => <option key={a}>{a}</option>)}
          </select>
          <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#94a3b8" }}>Primary Need</label>
          <select value={need} onChange={e => setNeed(e.target.value)} style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 14px", fontSize: 15 }}>
            <option value="">Select your primary need...</option>
            {needs.map(n => <option key={n}>{n}</option>)}
          </select>

          {upgrades && (
            <div style={{ marginTop: 20 }}>
              {upgrades.map((u, i) => (
                <div key={i} style={{ background: "#0a1628", border: `1px solid ${priorityStyle[u.priority]}`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{u.upgrade}</div>
                    <div style={{ color: priorityStyle[u.priority], fontWeight: 700, fontSize: 12, textTransform: "uppercase" as const }}>{u.priority}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                    <div><div style={{ fontSize: 11, color: "#94a3b8" }}>COST RANGE</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{u.cost}</div></div>
                    <div><div style={{ fontSize: 11, color: "#94a3b8" }}>ROI / VALUE</div><div style={{ color: "#22c55e", fontWeight: 600, fontSize: 13 }}>{u.roi}</div></div>
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{u.note}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 16, fontSize: 18 }}>💡 Top 3 DFW Upgrades by ROI</h2>
          {[["Whole-Home Surge Protector","$300-500","One ERCOT event pays for it 10x over. Best ROI per dollar in DFW."],["200A Panel Upgrade","$3,000-5,000","Required for EV + modern HVAC. Adds $5,000-10,000 to home value in DFW market."],["GFCI/AFCI Breaker Upgrade","$600-1,500","Reduces fire risk 70%. Required for code compliance. Insurance may discount premium."]].map(([name, cost, roi]) => (
            <div key={name as string} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid #1e3a5f" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 700 }}>{name}</span><span style={{ color: "#F5E642", fontWeight: 700 }}>{cost}</span></div>
              <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>{roi}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: 8, padding: 14, fontWeight: 700, textAlign: "center" as const }}>
          🏅 Get Free Quotes — TDLR-Licensed DFW Electricians via ProLnk
        </div>
      </div>
    </div>
  );
}
