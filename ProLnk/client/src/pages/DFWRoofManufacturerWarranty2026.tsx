import { useState } from 'react';

const shingles: Record<string, { warranty: string; prorated: string; labor: string; notes: string }> = {
  "GAF Timberline HD": { warranty: "Limited Lifetime (transferable once)", prorated: "After year 10, prorated to 20% value", labor: "Not included unless GAF certified installer", notes: "Must be installed by GAF Master Elite contractor for full Weatherstop warranty" },
  "Owens Corning Duration": { warranty: "Limited Lifetime (non-prorated first 10yr)", prorated: "Pro-rated 15% value after year 10", labor: "Included years 1-5 with Preferred installer", notes: "SureNail Technology — wind warranty up to 130mph" },
  "CertainTeed Landmark": { warranty: "Lifetime (SureStart Plus first 10yr)", prorated: "50% of replacement cost after year 10", labor: "Covered years 1-5 with ShingleMaster installer", notes: "Transferable twice for a fee — strong resale value protection" },
  "Atlas StormMaster": { warranty: "Limited Lifetime", prorated: "Standard proration after year 10", labor: "Not typically included", notes: "Excellent algae resistance — good for DFW humidity" },
  "Malarkey Vista": { warranty: "Limited Lifetime", prorated: "50% cost after year 10", labor: "1 year included", notes: "SmogReducing granules — eco-forward option" },
};

export default function DFWRoofManufacturerWarranty2026() {
  const [brand, setBrand] = useState("GAF Timberline HD");
  const [age, setAge] = useState(5);

  const info = shingles[brand];
  const inPrime = age <= 10;
  const transferable = age <= 30;

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642", fontSize: 13 }}>🏠 ProLnk Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Roofing Material Warranty Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32, lineHeight: 1.6 }}>
          "Limited Lifetime" does not mean what you think. In DFW, most shingle warranties prorate heavily after year 10 — and installation warranty is entirely separate.
        </p>

        <div style={{ backgroundColor: "#2d1a0f", borderRadius: 12, padding: 16, marginBottom: 28, border: "1px solid #92400e", display: "flex", gap: 12 }}>
          <span style={{ fontSize: 22 }}>⚠️</span>
          <div>
            <div style={{ fontWeight: 800, color: "#fbbf24", marginBottom: 2 }}>"Limited Lifetime" shingles typically have full coverage for only 10 years</div>
            <div style={{ color: "#fde68a", fontSize: 13 }}>After year 10 most warranties prorate down to 15-50% of replacement cost. Read your warranty document carefully.</div>
          </div>
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#F5E642" }}>🔍 Shingle Warranty Coverage Check</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 8 }}>Shingle Brand</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.keys(shingles).map((b) => (
                <button key={b} onClick={() => setBrand(b)}
                  style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12,
                    backgroundColor: brand === b ? "#F5E642" : "#1e3a5f", color: brand === b ? "#0A1628" : "#fff" }}>
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 8 }}>Roof Age: {age} year{age !== 1 ? "s" : ""}</label>
            <input type="range" min={1} max={40} value={age} onChange={(e) => setAge(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642" }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: 12, marginTop: 4 }}>
              <span>New</span><span>10yr</span><span>20yr</span><span>30yr+</span>
            </div>
          </div>
          <div style={{ backgroundColor: inPrime ? "#0f2d1a" : "#2d1a0f", borderRadius: 10, padding: 20, border: `1px solid ${inPrime ? "#4ade80" : "#f59e0b"}` }}>
            <div style={{ fontWeight: 700, color: inPrime ? "#4ade80" : "#fbbf24", marginBottom: 10, fontSize: 15 }}>
              {inPrime ? "✅ Full Coverage Period" : "⚠️ Prorated Coverage Period"}
            </div>
            <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 6 }}>📜 Warranty: <strong>{info.warranty}</strong></div>
            <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 6 }}>📉 Proration: <strong>{info.prorated}</strong></div>
            <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 6 }}>🔧 Labor covered: <strong>{info.labor}</strong></div>
            <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 10, fontStyle: "italic" }}>💡 {info.notes}</div>
            {!transferable && <div style={{ color: "#f87171", fontSize: 13, marginTop: 8 }}>⚠️ Roof is past typical transferability window — verify with manufacturer.</div>}
          </div>
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#F5E642" }}>🚫 Common Warranty Voids</h2>
          {["Improper installation by uncertified contractor", "Poor ventilation causing premature shingle deterioration", "Power washing or pressure cleaning shingles", "Walking on roof without proper technique", "Painting or coating shingles", "Using incompatible flashing materials", "Hail damage not inspected within 12 months of storm"].map((v) => (
            <div key={v} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ color: "#f87171" }}>🚫</span>
              <span style={{ color: "#cbd5e1", fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "#F5E642" }}>🌩️ DFW-Specific: Hail Claims</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>DFW averages 12+ hail events per year. Here is what to know.</p>
          {["Document hail size with photos after every storm", "File homeowner insurance claim (NOT manufacturer warranty) for hail", "Manufacturer warranty covers defects — not storm damage", "Get 3 contractor bids before accepting insurance estimate", "Request a brand-matched replacement — not upgraded materials (avoids disputes)"].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ color: "#F5E642", fontWeight: 700 }}>{i + 1}.</span>
              <span style={{ color: "#cbd5e1", fontSize: 14 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🏠</div>
          <div style={{ fontWeight: 700, color: "#0A1628", marginBottom: 4 }}>Track Your Roof Age and Warranty in ProLnk</div>
          <div style={{ color: "#1e3a5f", fontSize: 13 }}>Home Health Vault stores your roofing documents, tracks warranty windows, and connects you to DFW-certified roofers.</div>
        </div>
      </div>
    </div>
  );
}
