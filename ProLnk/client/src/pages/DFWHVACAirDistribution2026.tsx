import { useState } from 'react';

const registers = [
  { type: "Floor Register", icon: "⬇️", desc: "Common in DFW slab homes, distributes cool air low where heat rises" },
  { type: "Wall Register", icon: "↔️", desc: "Mid-wall placement, used in pier-and-beam older DFW homes" },
  { type: "Ceiling Register", icon: "⬆️", desc: "Standard in modern DFW builds, optimal for AC cooling distribution" },
  { type: "Return Air Grille", icon: "🔄", desc: "Often undersized in DFW homes — causes pressure imbalance and hot spots" },
];

const concerns = [
  { label: "Hot rooms despite AC running", guide: "Check return air grille size — undersized returns trap hot air in DFW open-concept rooms. Each return should handle 1 CFM per sq ft of served area." },
  { label: "Weak airflow from registers", guide: "Inspect duct runs from air handler. In DFW slab homes, ducts often run through unconditioned attic — check for disconnections or excessive duct length." },
  { label: "Open concept airflow issues", guide: "Open floor plans disrupt natural air stratification. DFW HVAC systems need properly sized supply registers at ceiling level and return air at multiple zones." },
  { label: "Uneven cooling between floors", guide: "Two-story DFW homes need zoned systems or dampers. Heat rises — upper floor needs 15-20% more cooling capacity than lower floor calculations suggest." },
  { label: "Register whistling or noise", guide: "High-velocity air through undersized registers is common in older DFW duct systems. Measure static pressure — should be under 0.5 inches WC." },
];

export default function DFWHVACAirDistribution2026() {
  const [selectedConcern, setSelectedConcern] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", color: "#F5E642″, fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2 }}>
          PROLNK — DFW HOME SYSTEMS GUIDE 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🌬️ DFW HVAC Air Distribution Guide
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          How conditioned air travels from your air handler to every room — and why DFW homes have unique distribution challenges.
        </p>

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>Supply & Return Register Types</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {registers.map((r, i) => (
            <div key={i} style={{ background: "#0f2040″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{r.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.3rem" }}>{r.type}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem", lineHeight: 1.5 }}>{r.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 10, padding: "1.2rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>⚡ DFW Distribution Path</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem", lineHeight: 1.7 }}>
            Air Handler → Main Supply Trunk → Branch Ducts → Flex Duct → Supply Register → Room → Return Air Grille → Return Plenum → Air Handler
          </div>
          <div style={{ color: "#e2e8f0″, fontSize: "0.85rem", marginTop: "0.5rem" }}>
            ⚠️ DFW attic temps hit 150°F+ in summer — unconditioned attic duct runs lose 20-30% efficiency
          </div>
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Distribution Concern Assessment</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {concerns.map((c, i) => (
            <button key={i} onClick={() => setSelectedConcern(selectedConcern === i ? null : i)}
              style={{ background: selectedConcern === i ? "#1a3a5c" : "#0f2040″, border: `1px solid ${selectedConcern === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#e2e8f0", textAlign: "left", cursor: "pointer", fontWeight: selectedConcern === i ? 700 : 400 }}>
              {c.label}
              {selectedConcern === i && (
                <div style={{ marginTop: "0.6rem", color: "#94a3b8″, fontWeight: 400, fontSize: "0.88rem", lineHeight: 1.6 }}>{c.guide}</div>
              )}
            </button>
          ))}
        </div>
        <div style={{ color: "#475569″, fontSize: "0.8rem", textAlign: "center" }}>ProLnk DFW Home Health Vault — Air Distribution Reference 2026</div>
      </div>
    </div>
  );
}
