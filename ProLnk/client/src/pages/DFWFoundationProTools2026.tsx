import { useState } from 'react';

const repairTypes: Record<string, { tools: { name: string; why: string }[] }> = {
  "Pier & Beam Leveling": {
    tools: [
      { name: "Ziplevel Pro-2000″, why: "Laser-accurate floor levelness measurement — DFW expansive clay causes 2-4 inch differential settlement; document every point" },
      { name: "Hydraulic Bottle Jacks (20-ton)", why: "Lift beam sections incrementally — DFW pier & beam homes need slow controlled raises to avoid cracking" },
      { name: "Helical Pier Driver (torque motor)", why: "Install helical piers to stable strata below DFW black clay — 20-30 ft depth typical in North Dallas" },
      { name: "Rebar Locator (Hilti PS 200)", why: "Locate existing rebar before any drilling or coring in DFW slab homes" },
      { name: "Manometer Set (water level)", why: "Verify relative elevation at all piers — redundant check against Ziplevel readings" },
    ],
  },
  "Slab Foundation Lift": {
    tools: [
      { name: "Hydraulic Lift System (mudjacking pump)", why: "Polyurethane or cement slurry injection — faster cure and lighter than traditional mudjacking in DFW" },
      { name: "Ziplevel Pro-2000″, why: "Pre- and post-lift elevation documentation — required for DFW homeowner insurance claims" },
      { name: "Concrete Core Drill (SDS Max)", why: "Create injection ports in DFW slabs — 2-inch cores at 4-ft grid typical" },
      { name: "Grout Pump (electric, 3000 PSI)", why: "Controlled injection pressure — DFW sandy fill voids require variable pressure to avoid over-lifting" },
      { name: "Rebar Locator", why: "Avoid hitting post-tension cables in DFW post-tension slabs (common after 1990)" },
    ],
  },
  "Drainage Correction": {
    tools: [
      { name: "Laser Level (Spectra HV302)", why: "Grade correction for positive drainage away from DFW foundations — 6-inch drop in 10 ft required" },
      { name: "Trenching Machine (Ditch Witch SK600)", why: "Install French drains alongside DFW foundations — clay soil traps water and accelerates settlement" },
      { name: "Pipe Camera", why: "Inspect existing drainage before adding new lines — DFW clay blocks corrugated pipe in 3-5 years" },
      { name: "Moisture Meter (pin type, 12-inch probe)", why: "Measure soil moisture at foundation depth — DFW clay shrink/swell cycles drive most foundation movement" },
      { name: "Compaction Tester (Humboldt H-4140)", why: "Verify backfill compaction after drainage install — loose fill causes re-settlement in DFW clay" },
    ],
  },
};

export default function DFWFoundationProTools2026() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏗️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.9rem", fontWeight: 800, margin: "0.5rem 0" }}>
            DFW Foundation Repair Pro Tools Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>
            What DFW foundation pros need — pier and beam, slab lift, and drainage correction
          </p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Select DFW Foundation Repair Type</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {Object.keys(repairTypes).map((k) => (
              <button
                key={k}
                onClick={() => setSelected(k)}
                style={{
                  background: selected === k ? "#F5E642″ : "#1e3a5f",
                  color: selected === k ? "#0A1628″ : "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.6rem 1.2rem",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🧰 Priority Tools: {selected}</h3>
            {repairTypes[selected].tools.map((t, i) => (
              <div key={i} style={{ background: "#162d4a", borderRadius: 8, padding: "1rem", marginBottom: "0.75rem" }}>
                <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.25rem" }}>{i + 1}. {t.name}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>{t.why}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>🏆 ProLnk Charter Foundation Pros — First Match Priority in DFW</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>Locked $149/mo · 12% direct commission · Exclusive DFW clay soil settlement lead data</div>
        </div>
      </div>
    </div>
  );
}
