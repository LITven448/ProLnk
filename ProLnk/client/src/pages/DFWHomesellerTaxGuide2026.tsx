import { useState } from 'react';

export default function DFWHomesellerTaxGuide2026() {
  const [propType, setPropType] = useState("primary");
  const [salePrice, setSalePrice] = useState(450000);
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [yearsOwned, setYearsOwned] = useState(5);
  const [filingStatus, setFilingStatus] = useState("married");

  const gain = salePrice - purchasePrice;
  const exclusion = filingStatus === "married" ? 500000 : 250000;
  const taxableGain = propType === "primary" && yearsOwned >= 2 ? Math.max(0, gain - exclusion) : gain;
  const ltcgRate = taxableGain > 0 ? (filingStatus === "married" ? 0.15 : 0.15) : 0;
  const taxOwed = Math.round(taxableGain * ltcgRate);
  const qualifies = propType === "primary" && yearsOwned >= 2;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🧾</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW Home Seller Tax Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Texas advantage: no state capital gains tax</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "#132038″, borderRadius: 12, padding: 20 }}>
            <label style={{ color: "#F5E642″, fontSize: 13, display: "block", marginBottom: 8 }}>🏠 Property Type</label>
            {["primary", "investment", "rental"].map(t => (
              <button key={t} onClick={() => setPropType(t)}
                style={{ display: "block", width: "100%", marginBottom: 6, padding: "8px 12px",
                  background: propType === t ? "#F5E642″ : "#1e3a5f", color: propType === t ? "#0A1628" : "#fff",
                  border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, textAlign: "left" }}>
                {t === "primary" ? "🏡 Primary Residence" : t === "investment" ? "📊 Investment Property" : "🏘️ Rental Property"}
              </button>
            ))}
          </div>
          <div style={{ background: "#132038″, borderRadius: 12, padding: 20 }}>
            <label style={{ color: "#F5E642″, fontSize: 13, display: "block", marginBottom: 8 }}>👤 Filing Status</label>
            {["married", "single"].map(s => (
              <button key={s} onClick={() => setFilingStatus(s)}
                style={{ display: "block", width: "100%", marginBottom: 6, padding: "8px 12px",
                  background: filingStatus === s ? "#F5E642″ : "#1e3a5f", color: filingStatus === s ? "#0A1628" : "#fff",
                  border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, textAlign: "left" }}>
                {s === "married" ? "💑 Married Filing Jointly" : "🧍 Single Filer"}
              </button>
            ))}
            <label style={{ color: "#F5E642″, fontSize: 12, display: "block", marginTop: 12, marginBottom: 4 }}>⏳ Years Owned</label>
            <input type="number" value={yearsOwned} min={0} max={40}
              onChange={e => setYearsOwned(Number(e.target.value))}
              style={{ width: "100%", background: "#0A1628″, border: "1px solid #F5E642", borderRadius: 6,
                color: "#F5E642″, padding: "6px 10px", fontSize: 16 }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {[
            { label: "💵 Sale Price", val: salePrice, set: setSalePrice, min: 100000, max: 2000000 },
            { label: "🏷️ Purchase Price", val: purchasePrice, set: setPurchasePrice, min: 50000, max: 1500000 },
          ].map((s, i) => (
            <div key={i} style={{ background: "#132038″, borderRadius: 12, padding: 16 }}>
              <label style={{ color: "#F5E642″, fontSize: 13, display: "block", marginBottom: 6 }}>{s.label}</label>
              <input type="range" min={s.min} max={s.max} step={5000} value={s.val}
                onChange={e => s.set(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#F5E642″ }} />
              <div style={{ color: "#fff", fontWeight: 700, marginTop: 4 }}>${s.val.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#132038″, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, marginBottom: 16 }}>📊 Tax Estimate</h2>
          {[
            { label: "Total Gain", val: `$${gain.toLocaleString()}` },
            { label: "Primary Exclusion", val: qualifies ? `$${Math.min(gain, exclusion).toLocaleString()} (${filingStatus === "married" ? "$500K" : "$250K"} limit)` : "❌ Not eligible" },
            { label: "Taxable Gain (Federal)", val: `$${taxableGain.toLocaleString()}` },
            { label: "TX State Capital Gains Tax", val: "🤘 $0 — Texas has none!" },
            { label: "Estimated Federal Tax (15%)", val: taxOwed > 0 ? `$${taxOwed.toLocaleString()}` : "✅ $0″ },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0″,
              borderBottom: "1px solid #1e3a5f", fontSize: 14 }}>
              <span style={{ color: "#94a3b8″ }}>{r.label}</span>
              <span style={{ color: "#F5E642″, fontWeight: 600 }}>{r.val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#132038″, borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: "#F5E642″, fontSize: 15, marginBottom: 10 }}>📌 Key DFW Seller Tax Rules</h3>
          <ul style={{ color: "#cbd5e1″, fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Primary residence: lived in 2 of last 5 years = exclusion eligible</li>
            <li>1031 exchange: defer gains on investment properties by reinvesting</li>
            <li>Texas = ZERO state capital gains tax (huge advantage over CA, NY)</li>
            <li>Rental property: depreciation recapture taxed at 25% federal</li>
            <li>Consult a CPA — these are estimates, not tax advice</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
