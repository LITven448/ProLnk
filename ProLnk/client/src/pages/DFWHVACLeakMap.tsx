import { useState } from 'react';

const LEAK_TYPES = ["Refrigerant Leak", "Condensate Leak", "Air Duct Leak"];
const LOCATIONS = ["Outdoor Unit / Condenser", "Indoor Air Handler", "Attic Ductwork", "Crawlspace / Basement", "Walls / Ceilings"];

interface LeakInfo {
  approach: string;
  cost: string;
  dfwNote: string;
}

const LEAK_GUIDANCE: Record<string, Record<string, LeakInfo>> = {
  "Refrigerant Leak": {
    "Outdoor Unit / Condenser": { approach: "Check Schrader valves with refrigerant leak detector — common leak point in DFW heat cycles. Also inspect service port caps and compressor fittings.", cost: "$150–$600 to locate and repair; $200–$800 refrigerant recharge (R-410A)", dfwNote: "DFW heat accelerates rubber seal degradation at Schrader valves — inspect every 3 years." },
    "Indoor Air Handler": { approach: "Inspect evaporator coil connections and TXV fitting. Use UV dye kit or electronic leak detector around coil header and distributor.", cost: "$200–$900 for coil repair; $800–$2,500 coil replacement if corroded", dfwNote: "Formicary corrosion from VOCs is common in DFW — check aluminum coil fins for pitting." },
    "Attic Ductwork": { approach: "Refrigerant lines run through attic — check line set insulation and Schrader valve on line set service port.", cost: "$100–$300 line set re-insulation; $150–$400 fitting repair", dfwNote: "DFW attic temps (150°F+) crack refrigerant line insulation — re-wrap every 5 years." },
    "Crawlspace / Basement": { approach: "Rare — inspect if line set routes underground or through conditioned crawlspace.", cost: "$200–$500 for accessible leak repair", dfwNote: "Uncommon in DFW — most homes are slab foundation; confirm line set routing." },
    "Walls / Ceilings": { approach: "Hidden refrigerant line leak — requires pressure test and possibly opening drywall.", cost: "$400–$1,500 depending on access", dfwNote: "Use nitrogen pressure test first to confirm before opening walls." },
  },
  "Condensate Leak": {
    "Outdoor Unit / Condenser": { approach: "Inspect condensate drain connection on mini-split outdoor unit or check main drain line exit point.", cost: "$50–$200 to clear and reconnect drain", dfwNote: "DFW humidity spikes in spring/fall fill drain pans faster — check monthly." },
    "Indoor Air Handler": { approach: "Check primary drain pan for cracks, inspect float switch, and clear primary PVC drain line. DFW algae growth blocks drains in summer.", cost: "$75–$300 to clear; $200–$500 to replace cracked drain pan", dfwNote: "Add condensate drain tablets every 3 months to prevent algae in DFW humidity." },
    "Attic Ductwork": { approach: "Condensate from sweating ducts or disconnected secondary drain line — check secondary drain pan (required in DFW attic installs).", cost: "$100–$400 to reconnect drain; secondary pan inspection is free", dfwNote: "DFW code requires secondary drain pan and float switch for attic air handlers." },
    "Crawlspace / Basement": { approach: "Check drain line terminus and condensate pump (if needed below grade).", cost: "$150–$400 condensate pump replacement", dfwNote: "Not common in DFW but condensate pumps fail every 3–5 years." },
    "Walls / Ceilings": { approach: "Water stain on ceiling below air handler — condensate overflow from blocked drain. Immediate action required to prevent mold.", cost: "$200–$800 drain repair; $1,000–$5,000 drywall/mold remediation if delayed", dfwNote: "DFW summer: a blocked drain overflows in 24 hours. Don't ignore ceiling stains." },
  },
  "Air Duct Leak": {
    "Outdoor Unit / Condenser": { approach: "Not applicable — outdoor unit does not carry conditioned air.", cost: "N/A", dfwNote: "If outdoor unit is noisy, see Noise Map instead." },
    "Indoor Air Handler": { approach: "Check supply and return plenum connections at air handler — most common duct leak point. Use smoke pencil or feel for air movement.", cost: "$100–$300 to seal plenum; $200–$500 for Aeroseal injection", dfwNote: "Plenum leaks in DFW attic spill conditioned air at 150°F into attic — seal immediately." },
    "Attic Ductwork": { approach: "Test with duct blaster at 25 Pa. Inspect all flex duct connections, elbows, and boots. Look for disconnected runs (squirrels are common in DFW).", cost: "$300–$1,200 duct sealing; $500–$3,000 full duct replacement", dfwNote: "DFW Energy Code requires ducts to be sealed to ≤4% leakage — many older homes fail." },
    "Crawlspace / Basement": { approach: "Check rigid duct connections and insulation under floor — moisture causes joint separation.", cost: "$200–$600 to seal and re-insulate", dfwNote: "DFW homes with crawlspaces should use mastic sealant, not tape, in humid zones." },
    "Walls / Ceilings": { approach: "Wall registers with no airflow suggest disconnected duct behind drywall. Use duct blaster to confirm before opening wall.", cost: "$200–$800 to access and reconnect", dfwNote: "DFW home settlement can disconnect wall duct boots — check registers in older homes." },
  },
};

export default function DFWHVACLeakMap() {
  const [leakType, setLeakType] = useState("");
  const [location, setLocation] = useState("");

  const result = leakType && location ? LEAK_GUIDANCE[leakType]?.[location] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Leak Detection Map 💧</h1>
        <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 32 }}>
          Where DFW HVAC leaks most commonly occur — refrigerant, condensate, and air leaks mapped by system location with detection approach and repair cost.
        </p>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔍 Leak Detection Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Suspected Leak Type</label>
            <select value={leakType} onChange={e => setLeakType(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", fontSize: 14 }}>
              <option value="">Select leak type...</option>
              {LEAK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Leak Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", fontSize: 14 }}>
              <option value="">Select location...</option>
              {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: "#0A1628", borderRadius: 8, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔧 Detection Approach</div>
              <p style={{ color: "#e2e8f0", fontSize: 14, marginBottom: 14 }}>{result.approach}</p>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>💰 Estimated Cost</div>
              <p style={{ color: "#e2e8f0", fontSize: 14, marginBottom: 14 }}>{result.cost}</p>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🌡️ DFW-Specific Note</div>
              <p style={{ color: "#e2e8f0", fontSize: 14 }}>{result.dfwNote}</p>
            </div>
          )}
        </div>

        <div style={{ background: "#0f2040", borderRadius: 10, padding: 20 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 12 }}>⚠️ DFW Leak Warning Signs</div>
          {["Ice on refrigerant lines or indoor coil", "Water stains on ceiling below air handler", "Musty smell from vents — mold from condensate overflow", "Utility bill spike — refrigerant or air leak", "Rooms not cooling below 78°F on 100°F DFW days"].map(w => (
            <div key={w} style={{ color: "#94a3b8", fontSize: 13, padding: "6px 0", borderBottom: "1px solid #1e3a5f" }}>{w}</div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#475569", fontSize: 12 }}>
          ProLnk connects DFW homeowners with certified HVAC leak detection pros. © 2026 ProLnk
        </div>
      </div>
    </div>
  );
}