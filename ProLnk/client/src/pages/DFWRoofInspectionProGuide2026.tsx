import { useState } from 'react';

const triggers: Record<string, { scope: string[]; flags: string[] }> = {
  "Post-Storm Inspection": {
    scope: [
      "🔲 Full perimeter walk — photograph all elevations",
      "🔲 Granule loss assessment — check gutters and downspout splash areas",
      "🔲 Missing or lifted shingles — document with GPS-tagged photos",
      "🔲 Flashing integrity — chimney, skylights, pipe boots, valleys",
      "🔲 Ridge cap condition — critical uplift zone in DFW storms",
      "🔲 Attic inspection — look for daylight, moisture staining",
      "🔲 Gutter damage and fastener separation",
      "🔲 HVAC equipment on roof — check for displacement",
    ],
    flags: [
      "🚩 Granule loss exceeding 15% of surface area = insurance claim candidate",
      "🚩 Any exposed underlayment = immediate tarp recommendation",
      "🚩 Flashing separation = active leak risk within 30 days",
    ],
  },
  "Annual Maintenance Inspection": {
    scope: [
      "🔲 Full shingle surface scan — granule loss, cracking, cupping",
      "🔲 Flashing inspection all penetrations — re-seal if caulk cracked",
      "🔲 Ridge cap condition — check nailing pattern and alignment",
      "🔲 Valley condition — open vs closed valley integrity",
      "🔲 Pipe boot condition — DFW UV degrades rubber boots fast",
      "🔲 Attic ventilation check — ridge vent, soffit vent, power vent",
      "🔲 Attic inspection for moisture, mold, insulation displacement",
      "🔲 Gutter and downspout attachment and flow",
    ],
    flags: [
      "🚩 Granule pattern showing aging zones = flag for 2-3 year replacement planning",
      "🚩 Attic moisture or staining = active slow leak, requires source identification",
      "🚩 Pipe boot cracked or separated = seal or replace before next rain",
    ],
  },
  "Pre-Listing Inspection": {
    scope: [
      "🔲 Full roof age documentation — original install date, any re-roof dates",
      "🔲 Remaining life estimate — document in writing for disclosure",
      "🔲 All penetration flashing condition",
      "🔲 Ridge and valley condition",
      "🔲 Granule loss documentation with photos",
      "🔲 Attic condition and ventilation adequacy",
      "🔲 Gutter condition and drainage",
      "🔲 Any repairs made in last 5 years — document scope and materials",
    ],
    flags: [
      "🚩 Remaining life under 5 years = seller disclosure required in TX",
      "🚩 Prior storm claim repairs — document all insurance work",
      "🚩 Attic moisture = buyer will flag in inspection — address before listing",
    ],
  },
  "Insurance Claim Support": {
    scope: [
      "🔲 Systematic photo documentation — all four elevations plus close-ups",
      "🔲 Granule loss pattern — distinguish storm damage from aging",
      "🔲 Hail impact marks — circular bruising pattern on soft metals (flashing, gutters) confirms hail",
      "🔲 Wind damage pattern — consistent lift direction indicates storm event",
      "🔲 Document date of inspection vs storm date",
      "🔲 Prepare scope of damage report — itemized by section",
      "🔲 Recommend independent adjuster if carrier scope is low",
    ],
    flags: [
      "🚩 Impact pattern inconsistent with storm = document carefully, avoid overstating",
      "🚩 Pre-existing wear mixed with storm damage — separate clearly in report",
      "🚩 Carrier adjuster discrepancy — recommend public adjuster review",
    ],
  },
};

const triggerKeys = Object.keys(triggers);

export default function DFWRoofInspectionProGuide2026() {
  const [trigger, setTrigger] = useState<string>(triggerKeys[0]);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>🏠</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>
            DFW Roofing Pro Inspection Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 15, maxWidth: 580, margin: "0 auto" }}>
            ProLnk Charter roofers complete a full documented inspection on every visit. DFW hail, heat, and clay movement demand a systematic approach.
          </p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>Select Inspection Trigger → Inspection Scope</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            {triggerKeys.map(t => (
              <button
                key={t}
                onClick={() => setTrigger(t)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: trigger === t ? "#F5E642″ : "#1a2f55",
                  color: trigger === t ? "#0A1628″ : "#e2e8f0",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <h3 style={{ color: "#e2e8f0″, fontSize: 14, marginBottom: 12 }}>Inspection Checklist</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {triggers[trigger].scope.map((item, i) => (
              <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: "11px 16px", fontSize: 14, color: "#e2e8f0", border: "1px solid #1e3a5f" }}>
                {item}
              </div>
            ))}
          </div>
          <h3 style={{ color: "#F5E642″, fontSize: 14, marginBottom: 12 }}>Critical Flags</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {triggers[trigger].flags.map((flag, i) => (
              <div key={i} style={{ background: "#1a0a0a", borderRadius: 8, padding: "11px 16px", fontSize: 14, color: "#fca5a5″, border: "1px solid #7f1d1d" }}>
                {flag}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <p style={{ color: "#0A1628″, fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>ProLnk Charter Roofing Pros — DFW Founding Slots</p>
          <p style={{ color: "#1a2f55″, fontSize: 14, margin: 0 }}>Join at prolnk.io — waitlist closes at 500 Charter members</p>
        </div>
      </div>
    </div>
  );
}

