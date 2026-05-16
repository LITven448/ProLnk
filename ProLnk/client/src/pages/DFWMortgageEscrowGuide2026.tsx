import { useState } from 'react';

export default function DFWMortgageEscrowGuide2026() {
  const [situation, setSituation] = useState("with-escrow");
  const [homeValue, setHomeValue] = useState(385000);
  const [taxRate, setTaxRate] = useState(2.1);

  const annualTax = Math.round(homeValue * (taxRate / 100));
  const monthlyEscrow = Math.round(annualTax / 12);
  const annualInsurance = 3204;
  const monthlyInsurance = Math.round(annualInsurance / 12);
  const totalEscrow = monthlyEscrow + monthlyInsurance;

  type ScenarioData = { title: string; icon: string; steps: string[]; tips: string[] };

  const getScenarios = (): Record<string, ScenarioData> => ({
    "with-escrow": {
      title: "Standard Escrow Account",
      icon: "🏦",
      steps: [
        `Lender collects $${monthlyEscrow.toLocaleString()}/mo for property taxes`,
        `Lender collects $${monthlyInsurance.toLocaleString()}/mo for homeowners insurance`,
        `Total escrow payment: $${totalEscrow.toLocaleString()}/mo added to P&I`,
        "DFW tax bills arrive in October each year",
        "Taxes are due by January 31 — lender pays from your escrow account",
        "Annual escrow analysis in January — lender adjusts monthly payment if needed",
        `Cushion: lenders keep 2 months reserve ($${(totalEscrow * 2).toLocaleString()})`,
      ],
      tips: [
        "Escrow shortfalls happen when taxes increase — expect small payment adjustments",
        "Collin County avg rate 2.3% | Dallas County avg 2.0% | Tarrant 2.1%",
        "Request an escrow waiver if you have 20%+ equity and good credit (fee may apply)",
        "Protest your tax appraisal every year — DFW values jumped again in 2026",
      ]
    },
    "no-escrow": {
      title: "Self-Managing Taxes (No Escrow)",
      icon: "📋",
      steps: [
        "Requires 20%+ equity and lender approval (sometimes a fee)",
        `You are responsible for saving $${monthlyEscrow.toLocaleString()}/mo for property taxes`,
        "DCAD, CCAD, or TCAD sends appraisal notice in April/May",
        "Tax bills arrive in October — due January 31 (no penalty if paid by then)",
        "Pay online at your county tax office website or by mail",
        "Half-payment option: pay 50% by Nov 30, 50% by June 30",
        "Late penalty: 6% + 1%/mo starting Feb 1 — avoid at all costs",
      ],
      tips: [
        "Set up auto-transfer to a dedicated tax savings account monthly",
        "Half-payment option helps cash flow — DFW tax offices accept it",
        "No escrow = your responsibility — missed payments have serious consequences",
        "File for homestead exemption — saves over $1,000/yr in most DFW counties",
      ]
    },
    "shortage": {
      title: "Escrow Shortage / Adjustment",
      icon: "⚠️",
      steps: [
        "Lender sends escrow analysis letter every January",
        "If escrow balance is short: you owe the deficit or spread it over 12 months",
        "Common reason: your property tax appraisal increased (DFW up avg 8% in 2026)",
        "One-time payment option: pay full shortage now, keep same monthly payment",
        "Spread option: deficit divided by 12 added to future payments",
        "If escrow has a surplus over $50, lender must refund the overage",
        "New monthly payment: new annual costs divided by 12 plus 2-month cushion divided by 12",
      ],
      tips: [
        "Protest your appraisal — if successful, your next escrow analysis adjusts down",
        "A $5,000 appraisal increase adds roughly $8/mo to your escrow payment",
        "Contact your servicer immediately if you cannot pay a shortage lump sum",
        "DFW 2026: many homeowners seeing $150-300/mo escrow increases",
      ]
    }
  });

  const scenarios = getScenarios();
  const sc = scenarios[situation];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏛️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW Mortgage Escrow Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>How property tax escrow works in DFW — and what to do when it changes</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "#132038", borderRadius: 12, padding: 20 }}>
            <label style={{ color: "#F5E642", fontSize: 13, display: "block", marginBottom: 8 }}>🏠 Home Value</label>
            <input type="range" min={150000} max={900000} step={5000} value={homeValue}
              onChange={e => setHomeValue(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642" }} />
            <div style={{ color: "#fff", fontWeight: 700, marginTop: 6 }}>${homeValue.toLocaleString()}</div>
          </div>
          <div style={{ background: "#132038", borderRadius: 12, padding: 20 }}>
            <label style={{ color: "#F5E642", fontSize: 13, display: "block", marginBottom: 8 }}>🏛️ Tax Rate (%)</label>
            <input type="range" min={1.5} max={3.0} step={0.05} value={taxRate}
              onChange={e => setTaxRate(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642" }} />
            <div style={{ color: "#fff", fontWeight: 700, marginTop: 6 }}>{taxRate.toFixed(2)}% — ${monthlyEscrow.toLocaleString()}/mo</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { icon: "🏛️", label: "Annual Tax", val: `$${annualTax.toLocaleString()}` },
            { icon: "📅", label: "Monthly Escrow (Tax)", val: `$${monthlyEscrow.toLocaleString()}/mo` },
            { icon: "📦", label: "Total Escrow (Tax+Ins)", val: `$${totalEscrow.toLocaleString()}/mo` },
          ].map((c, i) => (
            <div key={i} style={{ background: "#132038", borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{c.icon}</div>
              <div style={{ color: "#F5E642", fontSize: 16, fontWeight: 700, marginTop: 4 }}>{c.val}</div>
              <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 4 }}>{c.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { key: "with-escrow", label: "🏦 With Escrow" },
            { key: "no-escrow", label: "📋 No Escrow" },
            { key: "shortage", label: "⚠️ Escrow Shortage" },
          ].map(b => (
            <button key={b.key} onClick={() => setSituation(b.key)}
              style={{ flex: 1, padding: "10px 14px", background: situation === b.key ? "#F5E642" : "#132038",
                color: situation === b.key ? "#0A1628" : "#fff", border: "none", borderRadius: 8,
                cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              {b.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#132038", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, marginBottom: 16 }}>{sc.icon} {sc.title}</h2>
          {sc.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, color: "#cbd5e1" }}>
              <span style={{ color: "#F5E642", fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>{step}
            </div>
          ))}
        </div>

        <div style={{ background: "#132038", borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: "#F5E642", fontSize: 15, marginBottom: 10 }}>💡 DFW-Specific Tips</h3>
          {sc.tips.map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: "#cbd5e1" }}>
              <span style={{ color: "#F5E642" }}>→</span>{tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
