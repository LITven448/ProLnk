import { useState } from 'react';

const confusionTypes = [
  { label: "RCV vs ACV", explanation: "RCV (Replacement Cost Value) pays what it costs to replace TODAY. ACV (Actual Cash Value) deducts depreciation. Always confirm your policy is RCV. In DFW, most homeowner policies are RCV but adjusters sometimes issue ACV estimates first. Push back and request RCV." },
  { label: "Depreciation Recovery", explanation: "With RCV policies, the insurance company holds back depreciation until repairs are complete. After your roofer finishes and submits the final invoice, you submit a recoverable depreciation request. In DFW this typically adds 15-30% back to your payout. Do NOT let your roofer skip this step." },
  { label: "Supplement Process", explanation: "Supplementing means going back to insurance for missed or undervalued line items. DFW contractors commonly supplement for: drip edge replacement, pipe boot replacements, redecking damaged sheathing, and haul-away fees. A good ProLnk contractor will handle supplementing on your behalf." },
  { label: "Code Upgrades", explanation: "DFW municipalities (Dallas, Fort Worth, Plano, Frisco, etc.) require code-compliant repairs. This means newer drip edge profiles, updated ventilation ratios, and current felt/underlayment standards. Your insurance company must pay for code upgrades (up to your policy limit). Always request this line item." },
  { label: "O&P", explanation: "Overhead and Profit is a standard contractor markup (10% overhead + 10% profit = 20% O&P). Insurance companies sometimes omit it. If your job involves multiple trades or a general contractor situation, O&P is required. DFW contractors routinely supplement for O&P on larger jobs." },
];

export default function DFWRoofLineItemGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>📄</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Roofing Insurance Estimate Line Item Guide 2026</h1>
          <p style={{ color: "#aaa", fontSize: "0.95rem" }}>Decode your DFW roofing insurance estimate and know what you are owed</p>
        </div>

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>⚡ Select Your Estimate Question</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {confusionTypes.map((c, i) => (
              <button key={i} onClick={() => setSelected(selected === i ? null : i)} style={{ padding: "0.6rem 1.1rem", borderRadius: 8, border: selected === i ? "2px solid #F5E642″ : "2px solid #334", backgroundColor: selected === i ? "#F5E642" : "transparent", color: selected === i ? "#0A1628" : "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}>{c.label}</button>
            ))}
          </div>
        </div>

        {selected !== null && (
          <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", borderLeft: "4px solid #F5E642" }}>
            <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>💡 {confusionTypes[selected].label} Explained</h2>
            <p style={{ color: "#e0e0e0″, lineHeight: 1.7, fontSize: "0.95rem" }}>{confusionTypes[selected].explanation}</p>
          </div>
        )}

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>📊 Typical DFW Insurance Estimate Breakdown</h2>
          {[
            ["Initial ACV Payment", "55-65% of total loss", "#4a9eff"],
            ["Recoverable Depreciation", "15-30% of total loss", "#F5E642″],
            ["Code Upgrade Allowance", "5-15% of total loss", "#4aff8c"],
            ["O&P (if applicable)", "Up to 20% markup on labor/material", "#ff9f4a"],
            ["Your Deductible (your cost)", "Typically 1-2% of home value in DFW", "#ff4a4a"]
          ].map(([label, val, color], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0″, borderBottom: i < 4 ? "1px solid #1e3a5f" : "none" }}>
              <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{label}</span>
              <span style={{ color: color as string, fontWeight: 700, fontSize: "0.9rem" }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📌 DFW Pro Tips</h2>
          {[
            "Always push for RCV policy confirmation before signing with a contractor",
            "Request your adjuster's scope of loss in writing within 24 hours of inspection",
            "Supplement for code upgrades immediately — do not wait until build is complete",
            "O&P is owed on any job requiring a general contractor to coordinate multiple trades",
            "Recoverable depreciation deadline is typically 180 days after claim approval"
          ].map((tip, i) => (
            <div key={i} style={{ padding: "0.55rem 0.75rem", marginBottom: "0.4rem", borderRadius: 6, backgroundColor: "#0d2040″, fontSize: "0.88rem", color: "#ccc", borderLeft: "3px solid #F5E642" }}>✅ {tip}</div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F5E642″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#0A1628″, fontWeight: 700, margin: 0, fontSize: "1.05rem" }}>📋 ProLnk Contractors Know DFW Insurance Supplements — Get Matched Free</p>
        </div>
      </div>
    </div>
  );
}
