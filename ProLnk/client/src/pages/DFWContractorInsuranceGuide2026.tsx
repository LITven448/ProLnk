import { useState } from 'react';

export default function DFWContractorInsuranceGuide2026() {
  const [tradeType, setTradeType] = useState<string>("");
  const [bizSize, setBizSize] = useState<string>("");

  const trades = ["Electrician", "Plumber", "HVAC", "Roofer", "General Contractor", "Handyman"];
  const sizes = ["Solo (just me)", "1-3 employees", "4-10 employees", "10+ employees"];

  const coverageMap: Record<string, { coverage: string; amount: string; note: string }[]> = {
    solo: [
      { coverage: "General Liability", amount: "$1M per occurrence / $2M aggregate", note: "Required for ProLnk verification. Covers property damage and bodily injury on job sites." },
      { coverage: "Commercial Auto", amount: "$500K combined single limit", note: "Personal auto insurance does NOT cover business use. Get commercial auto for your work truck." },
      { coverage: "Tools & Equipment", amount: "$5K-$25K depending on inventory", note: "Covers theft or damage to your tools. Especially important for specialty tools." },
    ],
    small: [
      { coverage: "General Liability", amount: "$1M per occurrence / $2M aggregate", note: "Minimum for ProLnk. Increase to $2M per occurrence for commercial jobs." },
      { coverage: "Workers Compensation", amount: "Required by Texas law if 3+ employees", note: "Texas is the only state where WC is optional for private employers — but clients will require it." },
      { coverage: "Commercial Auto", amount: "$1M CSL for fleet vehicles", note: "If employees drive company vehicles, you need hired and non-owned auto coverage too." },
      { coverage: "Tools & Equipment", amount: "$25K-$100K", note: "Include a blanket endorsement so all tools are covered without itemizing each one." },
    ],
    medium: [
      { coverage: "General Liability", amount: "$2M per occurrence / $4M aggregate", note: "Commercial clients often require $2M minimum. Add umbrella for larger contracts." },
      { coverage: "Workers Compensation", amount: "Required — all employees covered", note: "Audit-based policy — premium adjusts based on actual payroll. Get competitive quotes." },
      { coverage: "Commercial Auto Fleet", amount: "$1M CSL — all vehicles scheduled", note: "List every vehicle. Unscheduled vehicles may not be covered in an accident." },
      { coverage: "Umbrella Policy", amount: "$1M-$5M excess liability", note: "Sits above your GL and auto policies. Relatively cheap for the coverage amount." },
      { coverage: "Errors & Omissions", amount: "$500K-$1M", note: "Covers claims that your work caused economic harm — important for design/build contractors." },
    ],
  };

  const sizeKey = bizSize.includes("Solo") ? "solo" : bizSize.includes("1-3") ? "small" : "medium";
  const coverages = coverageMap[sizeKey];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🛡️</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#F5E642", marginBottom: "0.5rem" }}>DFW Contractor Insurance Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>What insurance you need for ProLnk verification and DFW client work</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
          {[{ emoji: "✅", label: "ProLnk Requires", value: "$1M GL minimum" }, { emoji: "⚖️", label: "Texas WC Law", value: "Optional but expected" }, { emoji: "📄", label: "COI Turnaround", value: "Same day from broker" }].map(s => (
            <div key={s.label} style={{ backgroundColor: "#0F2040", borderRadius: "12px", padding: "1rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{s.emoji}</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#F5E642" }}>{s.value}</div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ backgroundColor: "#0F2040", borderRadius: "12px", padding: "1.5rem", border: "1px solid #1e3a5f" }}>
            <h3 style={{ color: "#F5E642", marginBottom: "0.75rem", fontSize: "1rem" }}>🔨 Your Trade</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {trades.map(t => (
                <button key={t} onClick={() => setTradeType(t)} style={{ backgroundColor: tradeType === t ? "#F5E642" : "#162035", color: tradeType === t ? "#0A1628" : "#fff", border: "1px solid", borderColor: tradeType === t ? "#F5E642" : "#1e3a5f", borderRadius: "6px", padding: "0.5rem 0.75rem", cursor: "pointer", textAlign: "left", fontSize: "0.85rem", fontWeight: tradeType === t ? 700 : 400 }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: "#0F2040", borderRadius: "12px", padding: "1.5rem", border: "1px solid #1e3a5f" }}>
            <h3 style={{ color: "#F5E642", marginBottom: "0.75rem", fontSize: "1rem" }}>👥 Business Size</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {sizes.map(s => (
                <button key={s} onClick={() => setBizSize(s)} style={{ backgroundColor: bizSize === s ? "#F5E642" : "#162035", color: bizSize === s ? "#0A1628" : "#fff", border: "1px solid", borderColor: bizSize === s ? "#F5E642" : "#1e3a5f", borderRadius: "6px", padding: "0.5rem 0.75rem", cursor: "pointer", textAlign: "left", fontSize: "0.85rem", fontWeight: bizSize === s ? 700 : 400 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {bizSize && coverages && (
          <div style={{ backgroundColor: "#0F2040", borderRadius: "12px", padding: "1.5rem", border: "2px solid #F5E642" }}>
            <h2 style={{ color: "#F5E642", marginBottom: "1rem", fontSize: "1.2rem" }}>🛡️ Your Recommended Coverage{tradeType ? ` for ${tradeType}s` : ""}</h2>
            {coverages.map((c, i) => (
              <div key={i} style={{ backgroundColor: "#162035", borderRadius: "8px", padding: "1rem", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <span style={{ fontWeight: 700, color: "#fff" }}>{c.coverage}</span>
                  <span style={{ color: "#F5E642", fontSize: "0.85rem", fontWeight: 600 }}>{c.amount}</span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>{c.note}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "2rem", backgroundColor: "#0F2040", borderRadius: "12px", padding: "1.25rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Properly insured? Upload your COI to get ProLnk verified</p>
          <p style={{ color: "#F5E642", fontWeight: 700, fontSize: "1rem" }}>🛡️ Join ProLnk — Verified pros earn 3x more leads in DFW</p>
        </div>
      </div>
    </div>
  );
}
