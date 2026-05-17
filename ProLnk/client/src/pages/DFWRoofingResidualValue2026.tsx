import { useState } from 'react';

const shingleLife: Record<string, number> = {
  "3tab": 20,
  "architectural": 30,
  "metal": 50,
  "tile": 50,
};

const conditionFactor: Record<string, number> = {
  "excellent": 1.0,
  "good": 0.85,
  "fair": 0.65,
  "poor": 0.45,
};

const conditionDesc: Record<string, string> = {
  "excellent": "No visible granule loss, no cupping, all flashing intact, gutters clean.",
  "good": "Minor granule loss in valleys, one or two minor repairs made, flashing intact.",
  "fair": "Visible granule loss, some cupping or cracking, minor flashing issues.",
  "poor": "Heavy granule loss, curling or cracked shingles, failed flashing, moss present.",
};

export default function DFWRoofingResidualValue2026() {
  const [installYear, setInstallYear] = useState<string>("");
  const [shingleType, setShingleType] = useState<string>("architectural");
  const [condition, setCondition] = useState<string>("good");
  const [homeValue, setHomeValue] = useState<string>("");

  const currentYear = 2026;
  const age = installYear ? currentYear - parseInt(installYear) : 0;
  const maxLife = shingleLife[shingleType] || 30;
  const adjustedLife = maxLife * conditionFactor[condition];
  const residualYears = Math.max(0, Math.round(adjustedLife - age));
  const pctRemaining = Math.max(0, Math.min(100, Math.round((residualYears / adjustedLife) * 100)));

  const hv = parseFloat(homeValue) || 0;
  const replacementCost = Math.round((hv * 0.015) * 100) / 100;
  const buyerDiscount = residualYears <= 3 ? Math.round(hv * 0.02) : residualYears <= 7 ? Math.round(hv * 0.01) : 0;
  const shouldReplace = residualYears <= 3 && hv > 0;

  const barColor = pctRemaining > 60 ? "#22c55e" : pctRemaining > 30 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ background: "#F5E642", color: "#0A1628", padding: "0.4rem 1rem", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: "1rem" }}>
          🏠 DFW ROOFING 2026
        </div>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.5rem" }}>Roof Residual Life Value Guide</h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", lineHeight: 1.6 }}>
          In DFW real estate, a near-end roof can cost sellers $5,000–$20,000 in concessions or delay a sale entirely. Use this tool to assess remaining life and decide whether to replace before listing.
        </p>

        <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642", marginBottom: "1.25rem" }}>📋 Roof Details</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>INSTALL YEAR</label>
              <input type="number" value={installYear} onChange={e => setInstallYear(e.target.value)}
                placeholder="e.g. 2008" style={{ width: "100%", background: "#0A1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem", color: "#fff", fontSize: 16, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>HOME VALUE ($)</label>
              <input type="number" value={homeValue} onChange={e => setHomeValue(e.target.value)}
                placeholder="e.g. 450000" style={{ width: "100%", background: "#0A1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem", color: "#fff", fontSize: 16, boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>SHINGLE TYPE</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {[{ id:"3tab", label:"3-Tab Asphalt"}, {id:"architectural", label:"Architectural"}, {id:"metal", label:"Metal"}, {id:"tile", label:"Tile/Slate"}].map(s => (
                <button key={s.id} onClick={() => setShingleType(s.id)}
                  style={{ background: shingleType === s.id ? "#F5E642" : "#1e3a5f", color: shingleType === s.id ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>CURRENT CONDITION</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "0.75rem" }}>
              {["excellent","good","fair","poor"].map(c => (
                <button key={c} onClick={() => setCondition(c)}
                  style={{ background: condition === c ? "#F5E642" : "#1e3a5f", color: condition === c ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ background: "#0A1628", borderRadius: 6, padding: "0.75rem", color: "#94a3b8", fontSize: 13 }}>{conditionDesc[condition]}</div>
          </div>
        </div>

        {installYear && (
          <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642", marginBottom: "1rem" }}>📊 Residual Life Assessment</h2>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#94a3b8", fontSize: 13 }}>Remaining Life</span>
                <span style={{ fontWeight: 700, color: barColor }}>{residualYears} years ({pctRemaining}%)</span>
              </div>
              <div style={{ background: "#1e3a5f", borderRadius: 4, height: 12 }}>
                <div style={{ background: barColor, borderRadius: 4, height: 12, width: `${pctRemaining}%`, transition: "width 0.5s" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              {[
                { label: "Roof Age", value: `${age} years` },
                { label: "Expected Life", value: `${maxLife} years` },
                { label: "Adjusted Life", value: `${Math.round(adjustedLife)} years` },
              ].map(item => (
                <div key={item.label} style={{ background: "#0A1628", borderRadius: 8, padding: "0.75rem", textAlign: "center" }}>
                  <div style={{ color: "#94a3b8", fontSize: 12 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, color: "#F5E642" }}>{item.value}</div>
                </div>
              ))}
            </div>

            {hv > 0 && (
              <div style={{ background: shouldReplace ? "#7c3aed22" : "#16a34a22", border: `1px solid ${shouldReplace ? "#7c3aed" : "#16a34a"}`, borderRadius: 8, padding: "1rem" }}>
                <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{shouldReplace ? "⚠️ Consider Pre-Listing Replacement" : "✅ Roof Supports Listing As-Is"}</div>
                <div style={{ color: "#cbd5e1", fontSize: 14 }}>Est. replacement cost: <strong style={{ color: "#F5E642" }}>${replacementCost.toLocaleString()}</strong></div>
                {buyerDiscount > 0 && <div style={{ color: "#fbbf24", fontSize: 14, marginTop: "0.3rem" }}>Estimated buyer discount if not replaced: <strong>${buyerDiscount.toLocaleString()}</strong></div>}
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", color: "#475569", fontSize: 13 }}>
          ProLnk · DFW Roofing Intelligence · 2026
        </div>
      </div>
    </div>
  );
}