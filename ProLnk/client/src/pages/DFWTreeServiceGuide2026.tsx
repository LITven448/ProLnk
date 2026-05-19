import { useState } from 'react';

const recMap: Record<string, { service: string; urgency: string; cost: string; note: string; color: string }> = {
  deadtree: { service: "Dead Tree Removal", urgency: "Schedule within 30 days", cost: "$500–$2,000+", note: "Cost varies with height, location to structures, and stump grinding", color: "#ef4444″ },
  stormdamage: { service: "Emergency Storm Cleanup", urgency: "Call same day", cost: "$300–$1,500″, note: "Document with photos for homeowner insurance claim before cleanup", color: "#f97316" },
  pruning: { service: "Structural Pruning", urgency: "Schedule for July–January (avoid Feb–June for oak wilt)", cost: "$200–$800″, note: "Never prune oaks Feb–June — open wounds attract nitidulid beetles", color: "#F5E642" },
  rootintrusion: { service: "Root Barrier Installation", urgency: "Can wait 1–2 months", cost: "$400–$1,200″, note: "Stops roots from damaging foundations, pipes, and driveways", color: "#22c55e" },
  cabling: { service: "Cabling & Bracing", urgency: "Schedule before storm season", cost: "$300–$900″, note: "Supports weak unions in large live oaks common in DFW", color: "#3b82f6" },
  healthcheck: { service: "Arborist Consultation", urgency: "Annual is ideal", cost: "$100–$250″, note: "ISA Certified Arborist can catch issues before they become costly", color: "#8b5cf6" },
};

export default function DFWTreeServiceGuide2026() {
  const [situation, setSituation] = useState("pruning");
  const result = recMap[situation];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏠 ProLnk DFW Home Guide</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>🌳 DFW Tree Service Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem" }}>Live oaks and cedar elms dominate DFW landscapes. Oak wilt is the #1 tree killer — knowing when NOT to prune can save your tree (and thousands of dollars).</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🌳", label: "Top DFW Tree", val: "Live Oak" },
            { icon: "⚠️", label: "Oak Wilt Avoid", val: "Feb – June" },
            { icon: "🌪️", label: "Storm Season", val: "April – Sept" },
            { icon: "🪪", label: "Hire Certified", val: "ISA Arborist" },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ background: "#111d35″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem" }}>{label}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″ }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "0.75rem" }}>🪲 Oak Wilt Alert</h2>
          <p style={{ color: "#94a3b8″, fontSize: "0.9rem", lineHeight: 1.6 }}>
            Oak wilt fungus spreads through wounds made during Feb–June pruning season. Nitidulid beetles carry spores from infected stumps to fresh cuts.
            DFW loses thousands of live oaks annually. Prune only July–January and seal all cuts immediately.
          </p>
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>👷 Licensed Arborist vs Tree Service</h2>
          {[
            { label: "ISA Certified Arborist", when: "Disease diagnosis, structural assessment, high-value trees, expert witness", cost: "$100–$250 consultation" },
            { label: "Tree Service Company", when: "Removal, pruning, storm cleanup, stump grinding", cost: "$200–$2,000+ per job" },
          ].map((t) => (
            <div key={t.label} style={{ marginBottom: "0.75rem", padding: "0.85rem", background: "#0A1628″, borderRadius: 8, border: "1px solid #1e3a5f" }}>
              <div style={{ fontWeight: 700, marginBottom: "0.2rem" }}>{t.label}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.82rem" }}>Use when: {t.when}</div>
              <div style={{ color: "#F5E642″, fontSize: "0.82rem" }}>Typical cost: {t.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🧮 What Service Do I Need?</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>My Situation</label>
            <select value={situation} onChange={(e) => setSituation(e.target.value)} style={{ display: "block", marginTop: "0.25rem", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.5rem 1rem" }}>
              <option value="deadtree">I have a dead or dying tree</option>
              <option value="stormdamage">Storm damaged my tree</option>
              <option value="pruning">Overgrown branches need trimming</option>
              <option value="rootintrusion">Roots damaging foundation/pipes</option>
              <option value="cabling">Large tree has a weak split</option>
              <option value="healthcheck">Just want a health check</option>
            </select>
          </div>
          {result && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontWeight: 700, color: result.color, marginBottom: "0.25rem" }}>{result.service}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Urgency: {result.urgency}</div>
              <div style={{ color: "#22c55e", fontSize: "0.85rem" }}>Estimated cost: {result.cost}</div>
              <div style={{ color: "#cbd5e1″, fontSize: "0.82rem", marginTop: "0.25rem" }}>💡 {result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}