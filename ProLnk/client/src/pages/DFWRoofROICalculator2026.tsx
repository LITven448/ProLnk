import { useState } from 'react';

export default function DFWRoofROICalculator2026() {
  const [roofAge, setRoofAge] = useState(14);
  const [replaceCost, setReplaceCost] = useState(18000);
  const [homeValue, setHomeValue] = useState(420000);
  const [upgradeImpact, setUpgradeImpact] = useState(false);

  const impactPremium = upgradeImpact ? 3500 : 0;
  const totalCost = replaceCost + impactPremium;
  const insuranceDiscount = upgradeImpact ? Math.round(homeValue * 0.0025 * 12 * 10) : Math.round(homeValue * 0.001 * 12 * 10);
  const energySavings = 1200 * 10;
  const valueAdded = Math.round(replaceCost * 0.68);
  const netCostBeforeBenefits = totalCost - valueAdded;
  const totalBenefit10yr = valueAdded + insuranceDiscount + energySavings;
  const roi10yr = Math.round(((totalBenefit10yr - totalCost) / totalCost) * 100);
  const monthlyInsuranceSave = Math.round(insuranceDiscount / 120);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠⛈️</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 700, margin: "8px 0 4px" }}>DFW Roof ROI Calculator 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 14 }}>DFW hail & storm season — know your 10-year roof numbers</p>
        </div>

        {[
          { label: "Current Roof Age (years)", value: roofAge, set: setRoofAge, min: 0, max: 30, step: 1 },
          { label: "Replacement Cost ($)", value: replaceCost, set: setReplaceCost, min: 8000, max: 40000, step: 500 },
          { label: "Current Home Value ($)", value: homeValue, set: setHomeValue, min: 150000, max: 900000, step: 10000 },
        ].map(({ label, value, set, min, max, step }) => (
          <div key={label} style={{ background: "#132038″, borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: "#94a3b8″ }}>{label}</span>
              <span style={{ color: "#F5E642″, fontWeight: 700 }}>{value.toLocaleString()}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value}
              onChange={e => set(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642″ }} />
          </div>
        ))}

        <div style={{ background: "#132038″, borderRadius: 10, padding: "16px 20px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, color: "#94a3b8″ }}>Impact-Resistant Upgrade (+$3,500)</div>
            <div style={{ fontSize: 12, color: "#475569″ }}>Class 4 shingles — 20-30% insurance discount in DFW</div>
          </div>
          <button onClick={() => setUpgradeImpact(!upgradeImpact)}
            style={{ padding: "8px 18px", borderRadius: 8, border: "2px solid", cursor: "pointer", fontWeight: 700, fontSize: 13,
              borderColor: "#F5E642″, background: upgradeImpact ? "#F5E642" : "transparent", color: upgradeImpact ? "#0A1628" : "#F5E642" }}>
            {upgradeImpact ? "✓ Added" : "+ Add"}
          </button>
        </div>

        <div style={{ background: "#132038″, borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 18 }}>📊 10-Year Roof ROI Model</h2>
          {[
            { label: "Total Investment", val: `$${totalCost.toLocaleString()}` },
            { label: "Resale Value Added (68% ROI)", val: `$${valueAdded.toLocaleString()}`, highlight: true },
            { label: "Insurance Savings (10yr)", val: `$${insuranceDiscount.toLocaleString()} ($${monthlyInsuranceSave}/mo)`, highlight: upgradeImpact },
            { label: "Energy Savings (10yr)", val: `$${energySavings.toLocaleString()}` },
            { label: "Total 10-Year Benefits", val: `$${totalBenefit10yr.toLocaleString()}`, highlight: true },
            { label: "10-Year Net ROI", val: `${roi10yr}%`, highlight: true },
          ].map(({ label, val, highlight }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0″, borderBottom: "1px solid #1e3a5f" }}>
              <span style={{ fontSize: 14, color: "#94a3b8″ }}>{label}</span>
              <span style={{ fontWeight: 700, color: highlight ? "#F5E642″ : "#fff", fontSize: highlight ? 18 : 15 }}>{val}</span>
            </div>
          ))}
        </div>

        {roofAge > 15 && (
          <div style={{ background: "#1a0f00″, border: "1px solid #f59e0b", borderRadius: 10, padding: 14, marginTop: 14 }}>
            <p style={{ color: "#f59e0b", fontWeight: 700, margin: "0 0 4px" }}>⚠️ Roof Exceeds 15 Years</p>
            <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>Many DFW insurers non-renew policies on roofs over 15 years. A new roof may be required to maintain coverage — act before renewal date.</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14 }}>
          {[
            { icon: "⛈️", label: "Hail Events", val: "8-12/yr avg in DFW" },
            { icon: "🏷️", label: "Insurance Disc.", val: upgradeImpact ? "20-30% w/ Class 4″ : "5-10% new roof" },
            { icon: "📈", label: "Buyer Appeal", val: "New roof = top 3 feature" },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ background: "#132038″, borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>{icon}</div>
              <div style={{ fontSize: 11, color: "#94a3b8″, margin: "4px 0 2px" }}>{label}</div>
              <div style={{ fontSize: 12, color: "#F5E642″, fontWeight: 700 }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d2444″, border: "1px solid #F5E642", borderRadius: 10, padding: 16, marginTop: 14, textAlign: "center" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, margin: "0 0 6px" }}>🌩️ DFW Roof Fact</p>
          <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>DFW is in Hail Alley — Class 4 impact-resistant roofs can cut your homeowner premium 20-30% and often pay back the upgrade cost in 3-4 years via insurance savings alone.</p>
        </div>
      </div>
    </div>
  );
}
