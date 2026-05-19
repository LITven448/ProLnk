import { useState } from 'react';

export default function DFWHailInsuranceDeductible2026() {
  const [homeValue, setHomeValue] = useState(385000);
  const [deductPct, setDeductPct] = useState(2);
  const [roofType, setRoofType] = useState<"standard" | "impact">("standard");

  const outOfPocket = Math.round(homeValue * (deductPct / 100));
  const premiumSavings = roofType === "impact" ? Math.round(homeValue * 0.0015) : 0;
  const paybackYears = premiumSavings > 0 ? Math.round(2500 / premiumSavings) : null;

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏦</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Hail Deductible Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 14 }}>Texas uses a SEPARATE wind/hail deductible — calculate your out-of-pocket cost</p>
        </div>

        <div style={{ background: "#132240″, borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 8 }}>Home Insured Value</label>
            <input type="range" min={150000} max={900000} step={5000} value={homeValue}
              onChange={e => setHomeValue(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642″ }} />
            <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 22, textAlign: "center", marginTop: 8 }}>{fmt(homeValue)}</div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 8 }}>Wind/Hail Deductible Percentage</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 1.5, 2, 3, 5].map(p => (
                <button key={p} onClick={() => setDeductPct(p)}
                  style={{ flex: 1, padding: "10px 0″, borderRadius: 10, border: `2px solid ${deductPct === p ? "#F5E642" : "#1e3a5f"}`,
                    background: deductPct === p ? "#F5E642″ : "#0f1e38", color: deductPct === p ? "#0A1628" : "#94a3b8", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                  {p}%
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 8 }}>Roof Type</label>
            <div style={{ display: "flex", gap: 10 }}>
              {([["standard", "Standard Shingles", "🏚️"], ["impact", "Impact-Resistant (Class 4)", "🛡️"]] as const).map(([val, lbl, ico]) => (
                <button key={val} onClick={() => setRoofType(val)}
                  style={{ flex: 1, padding: "12px 10px", borderRadius: 12, border: `2px solid ${roofType === val ? "#F5E642" : "#1e3a5f"}`,
                    background: roofType === val ? "#132240″ : "#0f1e38", color: "#e2e8f0", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
                  {ico} {lbl}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          <div style={{ background: "#132240″, borderRadius: 14, padding: 20, border: "2px solid #ef4444", textAlign: "center" }}>
            <div style={{ color: "#ef4444″, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Your Out-of-Pocket</div>
            <div style={{ color: "#F5E642″, fontSize: 28, fontWeight: 800, margin: "8px 0" }}>{fmt(outOfPocket)}</div>
            <div style={{ color: "#94a3b8″, fontSize: 12 }}>{deductPct}% of {fmt(homeValue)}</div>
          </div>
          <div style={{ background: "#132240″, borderRadius: 14, padding: 20, border: `2px solid ${premiumSavings > 0 ? "#22c55e" : "#1e3a5f"}`, textAlign: "center" }}>
            <div style={{ color: "#22c55e", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Annual Premium Savings</div>
            <div style={{ color: "#F5E642″, fontSize: 28, fontWeight: 800, margin: "8px 0" }}>{premiumSavings > 0 ? fmt(premiumSavings) : "—"}</div>
            <div style={{ color: "#94a3b8″, fontSize: 12 }}>{paybackYears ? `~${paybackYears}yr payback on Class 4 upgrade` : "Switch to Class 4 for savings"}</div>
          </div>
        </div>

        <div style={{ background: "#0f1e38″, borderRadius: 14, padding: 20, marginBottom: 16, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>📊 DFW Deductible Reality Check</div>
          <div style={{ display: "grid", gap: 8 }}>
            {[["1% on $300K home", "$3,000 out of pocket"], ["2% on $385K home", "$7,700 out of pocket"], ["3% on $500K home", "$15,000 out of pocket"], ["5% on $600K home", "$30,000 out of pocket"]].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#94a3b8″, fontSize: 13 }}>{label}</span>
                <span style={{ color: "#e2e8f0″, fontWeight: 700, fontSize: 13 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#132240″, borderRadius: 14, padding: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>💡 DFW Insurance Fact</div>
          <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>Most DFW homeowners do not realize they have TWO deductibles. Your all-other-perils deductible (fire, theft) is separate from your wind/hail deductible. Class 4 impact-resistant shingles reduce premiums 10–30% with most TX insurers.</p>
        </div>
      </div>
    </div>
  );
}
