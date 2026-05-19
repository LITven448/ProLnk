import { useState } from 'react';

const trades = [
  { type: "Electrical", req: "Must hold TDLR Master Electrician license", lien: "Yes — can file mechanic lien", ins: "$300K general liability + workers comp" },
  { type: "Plumbing", req: "Must hold TSBPE Master Plumber license", lien: "Yes — can file mechanic lien", ins: "$300K general liability + workers comp" },
  { type: "HVAC", req: "Must hold TDLR HVAC license", lien: "Yes — can file mechanic lien", ins: "$300K general liability + workers comp" },
  { type: "Framing/Carpentry", req: "No state license required, verify insurance", lien: "Yes — can file mechanic lien", ins: "$100K general liability minimum" },
  { type: "Roofing", req: "No state license, city registration varies", lien: "Yes — can file mechanic lien", ins: "$300K general liability + workers comp" },
];

export default function DFWSubcontractorManagement2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const info = trades.find(t => t.type === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          🏗️ DFW General Contractor Guide 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          DFW Subcontractor Management Guide
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          How GCs manage licensed subs, lien waiver chains, insurance requirements, and credential verification in the Dallas-Fort Worth market.
        </p>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>⚖️ The GC-Sub Rule in Texas</h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
            A General Contractor in Texas <strong style={{ color: "#F5E642" }}>cannot perform licensed trade work</strong> themselves — electrical, plumbing, and HVAC must be done by a separately licensed subcontractor. The GC coordinates and oversees but is legally barred from pulling a master plumber or electrician permit unless they hold that separate license.
          </p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🔗 Lien Waiver Chains</h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
            Every sub who works on your project has the legal right to file a <strong style={{ color: "#F5E642" }}>mechanic lien</strong> on the property if unpaid — even if you paid your GC in full. Always collect lien waivers from every sub at each milestone payment. Conditional waivers at payment, unconditional waivers after funds clear.
          </p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Sub Vetting Guide by Trade</h2>
          <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>Select a trade to see vetting requirements:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {trades.map(t => (
              <button key={t.type} onClick={() => setSelected(t.type)} style={{
                background: selected === t.type ? "#F5E642" : "#0f172a",
                color: selected === t.type ? "#0A1628" : "#fff",
                border: "1px solid #334155", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600
              }}>{t.type}</button>
            ))}
          </div>
          {info && (
            <div style={{ background: "#0f172a", borderRadius: 8, padding: "1rem" }}>
              <div style={{ marginBottom: "0.5rem" }}>📋 <span style={{ color: "#F5E642" }}>License Req:</span> <span style={{ color: "#cbd5e1" }}>{info.req}</span></div>
              <div style={{ marginBottom: "0.5rem" }}>🏠 <span style={{ color: "#F5E642" }}>Lien Risk:</span> <span style={{ color: "#cbd5e1" }}>{info.lien}</span></div>
              <div>🛡️ <span style={{ color: "#F5E642" }}>Insurance:</span> <span style={{ color: "#cbd5e1" }}>{info.ins}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "0.75rem" }}>✅ Verification Checklist</h2>
          {["Verify license on TDLR or TSBPE website before work begins", "Request certificate of insurance naming you as additional insured", "Collect signed lien waiver at every payment milestone", "Confirm sub has pulled their own permit (not riding GC permit)", "Document all subs in writing before project kickoff"].map((item, i) => (
            <div key={i} style={{ color: "#cbd5e1", padding: "0.4rem 0", borderBottom: "1px solid #1e293b" }}>✓ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
